import React from "react";
import HeroSection from "./Home/HeroSection";
import CTASection from "./Home/CTASection";
import FeatureHighlights from "./Home/FeatureHighlights";

function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-6">
      <div className="max-w-6xl text-center space-y-12">
        <HeroSection />
        <CTASection />
        <FeatureHighlights />
      </div>
    </div>
  );
}

export default Home;
