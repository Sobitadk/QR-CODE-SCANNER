// src/components/About.jsx
import React from "react";
import { FaGithub } from "react-icons/fa"; // For GitHub icon

const About = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header with Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          About QR Snack System
        </h1>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            The QR Snack System revolutionizes snack management with innovative QR-based tracking. Designed for efficiency, it helps users order, scan, and manage snacks seamlessly, saving time and enhancing the overall snacking experience.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Goal
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Our goal is to reduce wait times and improve the snacking experience using cutting-edge smart technology. By leveraging QR codes, we aim to create a faster, more convenient, and user-friendly solution for snack management.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Technology & Features
          </h2>
          <ul className="list-disc list-inside text-gray-600 text-lg mb-6 space-y-2">
            <li>Instant QR code generation for unique snack tracking</li>
            <li>Real-time status updates for snack availability and orders</li>
            <li>Secure access ensuring only authorized users can scan QR codes</li>
            <li>Intuitive dashboard for managing and monitoring snacks</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Developed By
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Created by <span className="font-medium text-blue-600">Sobit Adhikari</span>, this project is open-source and available on GitHub.
          </p>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/Sobitadk/QR-CODE-SCANNER"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
            aria-label="Visit QR Snack System GitHub repository"
          >
            <FaGithub size={20} className="mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;