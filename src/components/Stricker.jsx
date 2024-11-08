// Stricker.jsx
import React, { useState } from "react";
import lime from '../assets/strickers/lime.png';
import berry from '../assets/strickers/berry.png';
import zapptick from '../assets/strickers/zapp-tick.png';

const Stricker = () => {
  const [stickers, setStickers] = useState([]);

  const images = [lime, berry, zapptick]; // Array of images to pick from

  const handleClick = (event) => {
    const newSticker = {
      id: Date.now(), // Unique ID for each sticker
      x: event.clientX,
      y: event.clientY,
      image: images[Math.floor(Math.random() * images.length)], // Randomly pick an image
    };

    setStickers((prevStickers) => [...prevStickers, newSticker]);

    // Remove the sticker after 1 second
    setTimeout(() => {
      setStickers((prevStickers) =>
        prevStickers.filter((sticker) => sticker.id !== newSticker.id)
      );
    }, 1000);
  };

  return (
    <div onClick={handleClick} style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>
      {stickers.map((sticker) => (
        <img
          key={sticker.id}
          src={sticker.image}
          alt="Sticker"
          className="sticker" // Add animation class
          style={{
            position: "absolute",
            top: sticker.y,
            left: sticker.x,
            transform: "translate(-50%, -50%)",
            width: "100px", // Adjust size as needed
            height: "100px",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export default Stricker;
