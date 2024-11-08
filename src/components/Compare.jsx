import React, { useState, useRef, useEffect } from "react";
import ZappRed from "../assets/zapp-red.png";
import ZappGreen from "../assets/zapp-green.png";
import Particles from "./Particles";

const Compare = ({
  firstImage,
  secondImage,
  firstImageClassName,
  secondImageClassName,
  className,
  slideMode,
}) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const newPosition = (x / rect.width) * 100;
      setPosition(Math.min(Math.max(newPosition, 0), 100));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && slideMode === "hover") {
      const handleMouseMove = (e) => handleMove(e.clientX);
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [slideMode]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ touchAction: "none" }}
    >
      <Particles
        className="absolute top-0 left-0 z-30 w-full h-full"
        quantity={150}
        color="#262e2e"
        ease="easeInOutQuad"
      />

      {/* Background colors */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-700 to-red-500 z-10" />
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden bg-gradient-to-r from-lime-500 to-lime-800 z-20"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      {/* Images */}
      <div className="absolute top-0 left-0 w-full h-full z-30">
        <img
          src={secondImage}
          alt="Second"
          className={`absolute top-0 left-0 w-full h-full ${secondImageClassName}`}
        />
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-40"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={firstImage}
          alt="First"
          className={`absolute top-0 left-0 w-full h-full ${firstImageClassName}`}
        />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <h1 className="text-[150px] font-bold text-white text-center opacity-40 leading-tight">
          PICK YOUR <br /> FAVORITE
        </h1>
      </div>

      {/* Slider */}
      {slideMode !== "hover" && (
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-60"
          style={{ left: `${position}%` }}
          onMouseDown={() =>
            document.addEventListener("mousemove", (e) => handleMove(e.clientX))
          }
          onMouseUp={() =>
            document.removeEventListener("mousemove", handleMove)
          }
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        />
      )}
    </div>
  );
};

export function CompareDemo() {
  return (
    <div className="w-full h-[100dvh] overflow-hidden">
      <Compare
        firstImage={ZappRed}
        secondImage={ZappGreen}
        firstImageClassName="object-contain object-center"
        secondImageClassName="object-contain object-center"
        className="w-full h-full"
        slideMode="hover"
      />
    </div>
  );
}

export default CompareDemo;
