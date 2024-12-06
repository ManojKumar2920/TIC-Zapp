import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = () => (
    <>
      <a href="/" className="text-white hover:text-[#B9D432]">
        ZAPP
      </a>
      <a href="https://shop.zappenergy.in/" target="__blank" className="text-white hover:text-[#B9D432]">
        PRODUCTS
      </a>
      <a href="/about" className="text-white hover:text-[#B9D432]">
        ABOUT
      </a>
      <a href="/#faq" className="text-white hover:text-[#B9D432]">
        FAQ
      </a>
      <a href="/lazysoul" className="text-white hover:text-[#B9D432]">
        LAZY SOUL?
      </a>
      <a href="https://shop.zappenergy.in/products/zapp-berry-drink" target="__blank" className="text-white hover:text-[#B9D432]">
        SHOP NOW
      </a>
      
    </>
  );

  return (
    <div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex absolute top-0 left-0 w-full z-10 p-8 justify-between items-center bg-gradient-to-b from-black to-transparent">
        <img src={logo} alt="logo" className="h-16 rounded-b-xl" />
        <a href className="flex space-x-10 text-sm font-semibold text-white">
          <NavLinks />
        </a>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden absolute top-0 left-0 w-full z-20 p-4">
        <div className="flex justify-between items-center">
          <img src={logo} alt="logo" className="h-12 rounded-b-xl" />
          <button onClick={toggleMobileMenu} className="text-white z-30">
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/90 z-20 flex flex-col items-center justify-center space-y-6 text-white">
            <NavLinks />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
