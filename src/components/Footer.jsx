import React from "react";
import ZappGenie from "../assets/Zapp_Jenie.png";
import logo from "../assets/logo.png";
import { RiInstagramLine as Insta } from "react-icons/ri";
import { BsTwitterX as XIcon } from "react-icons/bs";
import { FaDiscord as Discord } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full h-[80dvh] flex flex-col items-center justify-between tracking-wider px-6 sm:px-10 lg:px-20 text-white pb-10 mt-[10%]">
      {/* Main Logo and Genie Image */}
      <div className="w-full flex items-center justify-center">
        {/* <h1 className="text-6xl sm:text-8xl md:text-[100px] lg:text-[150px] text-center z-0">
          ZAPP
        </h1> */}
        <img
          src={logo}
          alt="Zapp Genie"
          className="z-30"
          style={{ maxWidth: "700px", width: "100%" }}
        />
      </div>

      {/* Footer Content */}
      <div className="flex flex-col md:flex-row justify-between w-full md:items-center text-center md:text-left space-y-6 md:space-y-0">
        <div className=" flex  items-center gap-6">
          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 text-2xl">
            <a href="#" aria-label="Instagram">
              <Insta />
            </a>
            <a href="#" aria-label="Twitter X">
              <XIcon />
            </a>
            <a href="#" aria-label="Discord">
              <Discord />
            </a>
          </div>

          {/* Site Credit */}
          <div>
            <p className="text-xs">SITE BY TIC Global</p>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-xs uppercase">
              &copy; {currentYear} ZAPP. All rights reserved.
            </p>
          </div>
        </div>

        {/* Privacy Links */}
        <div className="text-xs flex gap-4 uppercase justify-center md:justify-end">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
