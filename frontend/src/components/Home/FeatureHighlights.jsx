import React from "react";

const features = [
  {
    title: "Instant QR Generation",
    description: "Generate unique QR codes instantly for snacks and tracking.",
    img: "https://cdn-icons-png.flaticon.com/512/3767/3767265.png", // QR Code icon from Flaticon
  },
  {
    title: "Custom Snack Status",
    description: "Track snack availability, status, and logs in real-time.",
    img: "https://cdn-icons-png.flaticon.com/512/724/724941.png", // Data adding icon from Flaticon
  },
  {
    title: "Secure Access",
    description: "Ensure only authorized personnel can access and scan QR codes.",
    img: "https://play-lh.googleusercontent.com/LJ5imEGeWpS0QYq-dDtSmlMcPohaAiZVXPffNrwC_iy1JgKJJxjnS2DhJ2L5q4pAuok", // Google Play icon (can be replaced with something else)
  },
];

function FeatureHighlight() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-center mb-4">
            <img
              src={feature.img}
              alt={feature.title}
              className="w-16 h-16 object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FeatureHighlight;
