import React from "react";
import ZappGenie from "../assets/Zapp_Jenie.png";
import logo from "../assets/logo.png";
import { RiInstagramLine as Insta } from "react-icons/ri";
import { BsTwitterX as XIcon } from "react-icons/bs";
import { FaDiscord as Discord } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full min-h-[80dvh] flex flex-col items-center justify-between tracking-wider px-4 sm:px-6 lg:px-20 text-white pb-6 sm:pb-10 mt-[10%]">
      {/* Main Logo */}
      <div className="w-full flex items-center justify-center py-8">
        <img
          src={logo}
          alt="Zapp Logo"
          className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px]"
        />
      </div>

      {/* Footer Content */}
      <div className="w-full flex flex-col gap-8 sm:gap-6">
        {/* Mobile Layout (stacked) */}
        <div className="flex flex-col gap-6 sm:hidden">
          {/* Social Icons */}
          <div className="flex justify-center gap-6 text-2xl">
            <a href="#" aria-label="Instagram" className="hover:text-green-400 transition-colors">
              <Insta />
            </a>
            <a href="#" aria-label="Twitter X" className="hover:text-green-400 transition-colors">
              <XIcon />
            </a>
            <a href="#" aria-label="Discord" className="hover:text-green-400 transition-colors">
              <Discord />
            </a>
          </div>

          {/* Credits and Copyright */}
          <div className="flex flex-col items-center gap-2 text-xs">
            <p>SITE BY TIC Global</p>
            <p className="uppercase">&copy; {currentYear} ZAPP. All rights reserved.</p>
          </div>

          {/* Privacy Links */}
          <div className="text-xs flex gap-6 uppercase justify-center">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>

        {/* Tablet/Desktop Layout */}
        <div className="hidden sm:flex flex-col md:flex-row justify-between w-full gap-6">
          {/* Left Side */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Social Icons */}
            <div className="flex gap-6 text-2xl">
              <a href="#" aria-label="Instagram" className="hover:text-green-400 transition-colors">
                <Insta />
              </a>
              <a href="#" aria-label="Twitter X" className="hover:text-green-400 transition-colors">
                <XIcon />
              </a>
              <a href="#" aria-label="Discord" className="hover:text-green-400 transition-colors">
                <Discord />
              </a>
            </div>

            {/* Divider for desktop */}
            <div className="hidden md:block w-px h-4 bg-white/20"></div>

            {/* Credits */}
            <p className="text-xs whitespace-nowrap">SITE BY TIC Global</p>

            {/* Divider for desktop */}
            <div className="hidden md:block w-px h-4 bg-white/20"></div>

            {/* Copyright */}
            <p className="text-xs uppercase whitespace-nowrap">
              &copy; {currentYear} ZAPP. All rights reserved.
            </p>
          </div>

          {/* Right Side - Privacy Links */}
          <div className="text-xs flex gap-6 uppercase justify-center md:justify-end items-center">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;