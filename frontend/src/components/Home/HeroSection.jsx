
import React from "react";

const HeroSection = () => {
  return (
    <div className="animate-slide-up">
      <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
        Revolutionize Snack Management with
        <span className="block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          QR Technology
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Streamline your snack distribution process with real-time tracking, 
        secure QR codes, and comprehensive analytics.
      </p>
    </div>
  );
};

export default HeroSection;
