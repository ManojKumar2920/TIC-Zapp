import React, { useState } from "react";
import Bento1 from "../assets/banner1.png";
import Bento1Group from "../assets/banner1group.png";
import Bento2 from "../assets/banner2.png";
import Bento3 from "../assets/banner3.png";
import Bento4 from "../assets/banner4.png";
import Bento5 from "../assets/banner5.png";
import AnimatedButton from "./AnimatedButton";
import Card from "./Card.Slider"

const Roadmap = () => {

  return (
    <div className="flex flex-col justify-start items-center w-full p-10 bg-black text-white my-20">
      {/* head */}
      <AnimatedButton />

      <Card />

    </div>
  );
};

export default Roadmap;
