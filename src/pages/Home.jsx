import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import MobileHeroSection from "../components/MobileHeroSection";
import Footer from "../components/Footer";
import Model from "../components/Model";
import Product from "../components/Product";
import CurvedNav from "../components/CurvedNav";
import Faq from "../components/Faq";
import Roadmap from "../components/Roadmap";

const Home = () => {
  const [showCurvedNav, setShowCurvedNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
    };

    // Initial check
    handleResize();
    // Add resize event listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const heroSectionHeight = heroSection.offsetHeight - 300;
        setShowCurvedNav(window.scrollY > heroSectionHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-full flex flex-col relative justify-center items-center">
        {isMobile ? (
          <MobileHeroSection id="hero-section" />
        ) : (
          <HeroSection id="hero-section" />
        )}
        <Model />
        <Product />
        <Roadmap />
        {showCurvedNav && <CurvedNav />}
        <Faq />
        <Footer />
      </div>
    </>
  );
};

export default Home;
