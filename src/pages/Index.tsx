import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CityExplorer from "@/components/CityExplorer";
import ExpenseCalculator from "@/components/ExpenseCalculator";
import GuideProfiles from "@/components/GuideProfiles";
import TravelChatbot from "@/components/TravelChatbot";
import Footer from "@/components/Footer";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  const scrollToCalculator = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      {!showSplash && (
        <>
          <Navbar />
          <HeroSection onExplore={scrollToCalculator} />
          <FeaturesSection />
          <CityExplorer />
          <ExpenseCalculator />
          <GuideProfiles />
          <Footer />
          <TravelChatbot />
        </>
      )}
    </>
  );
};

export default Index;
