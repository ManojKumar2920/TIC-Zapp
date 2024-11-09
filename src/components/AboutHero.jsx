import React from "react";
import Navbar from "./Navbar";

const AboutHero = () => {
  return (
    <div>
      <Navbar />
      <div className=" p-10 mt-20 md:mt-32 text-center h-screen">
        <h1 className=" text-7xl md:text-9xl tracking-tighter my-10">ZAPP</h1>
        <p className=" text-[16px] md:text-lg">
          If you’re tired of sugary, carbonated energy drinks that leave you
          bloated and sluggish, it’s time to make the switch to Zapp Energy
          Shot. This compact, 60ml powerhouse is packed with energy-boosting
          ingredients but has zero sugar and just one calorie. Plus, it’s
          non-carbonated, making it gentle on your stomach and ideal for
          on-the-go consumption. Whether you’re hitting the gym, studying late,
          or powering through a busy workday, Zapp is the perfect solution for a
          healthy, sustained energy boost.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;
