import React, { useState, useRef } from "react";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import { BsVolumeMuteFill, BsFillVolumeDownFill } from "react-icons/bs";
import { Menu, X } from "lucide-react";

import herovideo from "../assets/Zapp-3.mp4";
import logo from "../assets/logo.png";
import Navbar from "./Navbar";

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef(null);

  


  const SocialLinks = () => (
    <div className="absolute bottom-[30%] flex flex-col gap-4 left-10 transform -translate-y-1/2">
      <a href="https://x.com/zappenergyshots?t=rveIoAI8FuO-UXaj0pHjLQ&s=09" target="_blank">
        <FaXTwitter className="text-white bg-black p-2 rounded-full text-3xl" />
      </a>
      <a href="https://www.instagram.com/zappenergy/profilecard/?igsh=MzBhazI5bHN4YWhk" target="_blank">
        <FaInstagram className="text-white bg-black p-2 rounded-full text-3xl" />
      </a>
      <a href="https://youtube.com/@zappenergy?si=qp3fuuySFR5OWtwa" target="_blank">
        <FaYoutube className="text-white bg-black p-2 rounded-full text-3xl" />
      </a>
    </div>
  );

  return (
    <div id="hero-section" className="relative w-screen h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-b-xl"
      >
        <source src={herovideo} type="video/mp4" />
      </video>

      <Navbar />

      {/* Social Links for Desktop */}
      <div className="hidden md:block">
        <SocialLinks />
      </div>

      {/* Action Icons */}
      <div className="absolute hidden right-10 bottom-4 md:flex flex-col items-end gap-3 z-10">
        <a href="#" className="p-2 border border-white rounded-full">
          <HiMiniArrowUpRight className="text-white rounded-full text-xl" />
        </a>
        <a href="#" className="p-2 border border-white rounded-full">
          <HiMiniArrowUpRight className="text-black rounded-full text-4xl bg-white" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
