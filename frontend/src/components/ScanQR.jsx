
import React, { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";
import { scanQr } from "../api";

function ScanQR() {
  const [scannedData, setScannedData] = useState("");
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameId = useRef(null);
  const lastScanTime = useRef(0);

  useEffect(() => {
    let mounted = true;

    const initializeScanner = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMessage("Camera API not supported in this browser.");
        setIsScanning(false);
        return;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        console.log("Previous stream stopped.");
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.pause();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      console.log("Requesting camera access...");
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: 640, height: 480 }
        });
        if (!mounted) return;

        console.log("Camera access granted. Stream tracks:", mediaStream.getTracks());
        streamRef.current = mediaStream;
        videoRef.current.srcObject = mediaStream;

        await videoRef.current.play();
        console.log("Video playing.");

        const scanFrame = () => {
          if (!mounted || !isScanning) return;

          const now = Date.now();
          if (now - lastScanTime.current < 500) {
            animationFrameId.current = requestAnimationFrame(scanFrame);
            return;
          }

          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
              console.log("QR code detected:", code.data);
              handleScan(code.data);
              lastScanTime.current = now;
              return;
            } else {
              console.log("Scanning... no QR code detected yet.");
            }
          }
          animationFrameId.current = requestAnimationFrame(scanFrame);
        };

        console.log("Starting QR scanning loop...");
        animationFrameId.current = requestAnimationFrame(scanFrame);
      } catch (err) {
        console.error("Camera Error:", err.name, err.message || "Unknown error");
        if (err.name === "NotAllowedError") {
          setMessage("Camera access denied. Please allow camera permissions.");
        } else if (err.name === "NotFoundError") {
          setMessage("No camera found. Please connect a camera.");
        } else {
          setMessage(`Camera error: ${err.message || "Unknown error"}`);
        }
        setIsScanning(false);
      }
    };

    if (isScanning) {
      initializeScanner();
    }

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        console.log("Camera stream stopped.");
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.pause();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isScanning]);

  const handleScan = async (data) => {
    if (data) {
      console.log("Scanned QR Data:", data);
      try {
        const response = await scanQr(data);
        console.log("Scan Response:", response);
        setScannedData(data);
        setMessage(response.message || "QR code scanned successfully");
        setIsScanning(false);
      } catch (error) {
        console.error("API Call Error:", error.message || error);
        setMessage(`Error scanning QR code: ${error.message || error}`);
        setScannedData("");
        setIsScanning(false);
      }
    }
  };

  const handleManualSubmit = async () => {
    const data = inputRef.current.value;
    if (data) {
      console.log("Manual QR Data:", data);
      try {
        const response = await scanQr(data);
        console.log("Scan Response:", response);
        setScannedData(data);
        setMessage(response.message || "QR code scanned successfully");
      } catch (error) {
        console.error("API Call Error:", error.message || error);
        setMessage(`Error scanning QR code: ${error.message || error}`);
      }
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setMessage("");
    setScannedData("");
    console.log("Started scanning...");
  };

  const stopScanning = () => {
    setIsScanning(false);
    setMessage("Scanning stopped.");
    console.log("Stopped scanning.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-md">
          {isScanning ? "Scanning..." : "Scan QR Code"}
        </h2>
        <div className="relative mb-6">
          {isScanning ? (
            <div className="rounded-lg overflow-hidden border-4 border-blue-600 shadow-lg">
              <video ref={videoRef} autoPlay playsInline className="w-full" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-1 bg-red-500 opacity-60 animate-pulse rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border-2 border-gray-300">
              <svg
                className="w-20 h-20 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 4h12M6 4v16M18 4v16M4 6h16M4 18h16"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="flex justify-center">
            {!isScanning ? (
              <button
                onClick={startScanning}
                className="w-full max-w-xs py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Start Scanning
              </button>
            ) : (
              <button
                onClick={stopScanning}
                className="w-full max-w-xs py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Stop Scanning
              </button>
            )}
          </div>
          <div className="space-y-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter QR data manually"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={handleManualSubmit}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Manual Data
            </button>
          </div>
        </div>
        {(message || scannedData) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
            {message && (
              <p
                className={`text-center font-medium ${
                  message.includes("Error") ? "text-red-600" : "text-green-600"
                } animate-fade-in`}
              >
                {message}
              </p>
            )}
            {scannedData && (
              <p className="mt-2 text-center text-gray-700 break-all animate-fade-in">
                Scanned Data: <span className="font-semibold">{scannedData}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScanQR;