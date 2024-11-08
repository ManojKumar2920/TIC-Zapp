import { useEffect, useRef, useState } from "react";

const AnimatedButton = () => {
  const buttonRef = useRef(null);
  const [revealedLetters, setRevealedLetters] = useState(0); // Track how many letters are revealed

  // Handle scroll-based text reveal
  const handleScroll = () => {
    const section = buttonRef.current;
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startReveal = windowHeight * 0.4; // Start at 40% of viewport height
      const endReveal = windowHeight * 0.9; // End at 90% of viewport height

      if (sectionRect.top <= endReveal && sectionRect.bottom >= startReveal) {
        const progress = Math.min(
          Math.max((endReveal - sectionRect.top) / (endReveal - startReveal), 0),
          1
        );
        const totalLetters = text.length;
        setRevealedLetters(Math.floor(progress * totalLetters)); // Reveal letters progressively
      } else if (sectionRect.top > endReveal) {
        setRevealedLetters(0); // Reset if above viewport
      } else if (sectionRect.bottom < startReveal) {
        setRevealedLetters(text.length); // Fully reveal if scrolled past
      }
    }
  };

  // Attach scroll listener on mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define the text to be revealed
  const text = "Features";

  // Create a span for each letter, revealing them sequentially
  const letters = text.split("").map((letter, index) => (
    <span
      key={index}
      className={`inline-block transition-all duration-300 ease-out ${
        index < revealedLetters ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }} // Control typing speed with delay
    >
      {letter}
    </span>
  ));

  return (
    <div className="relative mb-20">
      <h1 className="text-9xl uppercase font-bold">Zapp</h1>

      {/* Green Button Wrapper */}
      <div
        ref={buttonRef}
        className="absolute p-3 -bottom-3 left-28 bg-[#B9D432] transform -skew-x-[20deg] overflow-hidden"
      >
        <div className="px-3 py-2">
          <span className="text-2xl font-semibold text-black">{letters}</span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedButton;
