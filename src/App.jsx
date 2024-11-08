import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import lime from './assets/strickers/lime.png';
import berry from './assets/strickers/berry.png';
import zapptick from './assets/strickers/zapp-tick.png';

const App = () => {
  const [stickers, setStickers] = useState([]);
  const images = [lime, berry, zapptick];

  const handleGlobalClick = (event) => {
    // Ignore clicks on interactive elements (buttons, links, inputs) or child elements of those
    const ignoredTags = ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "LABEL"];
    if (ignoredTags.includes(event.target.tagName) || event.target.closest("button, a, input, textarea, select, label")) {
      return;
    }

    const newSticker = {
      id: Date.now(),
      x: event.clientX,
      y: event.clientY,
      image: images[Math.floor(Math.random() * images.length)],
    };

    setStickers((prevStickers) => [...prevStickers, newSticker]);

    setTimeout(() => {
      setStickers((prevStickers) =>
        prevStickers.filter((sticker) => sticker.id !== newSticker.id)
      );
    }, 1000);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Outlet />
      {stickers.map((sticker) => (
        <img
          key={sticker.id}
          src={sticker.image}
          alt="Sticker"
          className="sticker z-0"
          style={{
            position: "fixed",
            top: sticker.y,
            left: sticker.x,
            transform: "translate(-50%, -50%)",
            width: "100px",
            height: "100px",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export default App;
