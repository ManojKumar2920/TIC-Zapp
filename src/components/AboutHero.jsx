import React from "react";
import Navbar from "./Navbar";

const AboutHero = () => {
  return (
    <div>
      <Navbar />
      <div className=" p-10 mt-20 md:mt-32 text-center h-screen">
        <h1 className=" text-7xl md:text-9xl tracking-tighter my-10">ZAPP</h1>
        <p className=" text-[16px] md:text-lg">
          Forget everything you know about energy drinks. Zapp isn’t here to
          just wake you up; it’s here to fuel the revolution. This 60ml shot is
          a no-nonsense boost, made for the people who have things to do, places
          to be, and no time for watered-down, sugar-loaded cans. Packed with
          140 mg of caffeine, zero sugar, and a 1 calorie, Zapp doesn’t mess
          around.
        </p>
        <p className=" text-[16px] md:text-lg my-4">
          We built it with Green Tea Extract and Theacrine to smooth out the
          caffeine’s kick and keep you alert without the dreaded crash. It’s
          designed to keep you locked in and laser-focused. Plus, BCAAs are here
          to back you up with a little recovery edge, because we’re not just
          here to amp you up; we’re here to keep you going.
        </p>
        <p className=" text-[16px] md:text-lg my-4">
        No crash, no jitters—just raw, clean energy in a pocket-sized bottle that’s as relentless as you are.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;
