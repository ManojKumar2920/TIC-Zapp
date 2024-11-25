import React, { useState } from "react";
import ZappRed from "../assets/zapp-red.png";
import ZappGreen from "../assets/zapp-lime.png";
import CurvedNav from "./CurvedNav";

const Product = () => {
  const [mouseX, setMouseX] = useState(50); // Initial split in the middle (50%)

  const handleMouseMove = (e) => {
    const { clientX, currentTarget } = e;
    const newMouseX = (clientX / currentTarget.offsetWidth) * 100;
    setMouseX(newMouseX);
  };

  const handleTouchMove = (e) => {
    const touchX = e.touches[0].clientX;
    const newMouseX = (touchX / e.currentTarget.offsetWidth) * 100;
    setMouseX(newMouseX);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-[70dvh] md:h-dvh relative overflow-hidden"
      onMouseMove={handleMouseMove} // Track mouse movement
      onTouchMove={handleTouchMove} // Track touch movement for mobile
      id="your-fav" 
    >
      {/* Split background with dynamic widths */}
      <div className="absolute inset-0 flex">
        <div
          className="bg-[#B9D432]"
          style={{ width: `${mouseX}%` }} // Left side width based on mouse position
        ></div>
        <div
          className="bg-[#C10000]"
          style={{ width: `${100 - mouseX}%` }} // Right side takes the remaining width
        ></div>
      </div>

      {/* Centered text */}
      <div className="z-10 text-center absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl md:text-9xl font-bold text-white drop-shadow-lg uppercase opacity-40">
          Pick <br /> your <br /> favorite
        </h1>
      </div>

      {/* Bottles above text */}
      <div className="z-20 flex items-center justify-center space-x-4 md:space-x-6 mt-4 md:mt-0">
        <a href="https://zappdrink.myshopify.com/collections/frontpage/products/zapp-berry-drink">
          <img src={ZappRed} alt="Zapp Red" className="w-36 md:w-96" />
        </a>
        <a href="https://zappdrink.myshopify.com/collections/frontpage/products/zapp-lime-drink">
          <img src={ZappGreen} alt="Zapp Green" className="w-36 md:w-96" />
        </a>
      </div>

      {/* CurvedNav component */}
      <CurvedNav />
    </div>
  );
};

export default Product;


