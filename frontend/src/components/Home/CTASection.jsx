import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CTASection = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
      <Link
        to="/generate"
        className="flex items-center gap-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <span className="text-lg">Get Started Now</span>
        <FiArrowRight className="text-xl" />
      </Link>
    </div>
  );
};

export default CTASection;
