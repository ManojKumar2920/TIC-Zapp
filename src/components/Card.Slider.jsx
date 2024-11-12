import React, { useState } from "react";
import {
  motion, useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import one from "../assets/zapsection/one.png";
import oneGroup from "../assets/zapsection/one-group.png";
import two from "../assets/zapsection/two.png";
import twoGroup from "../assets/zapsection/two-group.png";
import three from "../assets/zapsection/three.png";
import four from "../assets/zapsection/four.png";
import fourGroup from "../assets/zapsection/four-group.png";
import five from "../assets/zapsection/five.png";
import six from "../assets/zapsection/six.png";
import sixGroup from "../assets/zapsection/six-group.png";
import seven from "../assets/zapsection/seven.png";
import sevenGroup from "../assets/zapsection/seven-group.png";
import eight from "../assets/zapsection/eight.png";

// Card data with all properties
const cardData = [
  {
    id: 2,
    url: two,
    groupUrl: twoGroup,
    number: "02",
    heading: "Theacrine",
    subheading:
      "Provides sustained energy and focus, reducing fatigue with a longer-lasting effect than caffeine.",
  },
  {
    id: 3,
    url: three,
    groupUrl: null,
    number: "03",
    heading: "Caffeine",
    subheading:
      "Each shot contains 140mg of caffeine, enhancing alertness and concentration while boosting physical performance.",
  },
  {
    id: 4,
    url: four,
    groupUrl: fourGroup,
    number: "04",
    heading: "Vitamins",
    subheading:
      "Fortified with B vitamins, Zapp supports energy metabolism and overall health, keeping users energized.",
  },
  {
    id: 5,
    url: five,
    groupUrl: null,
    number: "05",
    heading: "BCAAs",
    subheading:
      "These essential nutrients promote muscle growth, reduce fatigue, and aid recovery.",
  },
  {
    id: 6,
    url: six,
    groupUrl: sixGroup,
    number: "06",
    heading: "Non-Carbonated",
    subheading:
      "Offers a smooth, refreshing taste without the bloating of carbonated drinks, making it easy to consume anytime.",
  },
  {
    id: 7,
    url: seven,
    groupUrl: sevenGroup,
    number: "07",
    heading: "Zero Sugar",
    subheading:
      "Crafted without added sugars, providing a clean energy boost without the negative effects of sugar.",
  },
  {
    id: 8,
    url: eight,
    groupUrl: null,
    number: "08",
    heading: "Only 1 Calorie",
    subheading:
      "Each shot contains just 1 calorie, allowing for a flavorful energy boost without excess calories.",
  },
  {
    id: 1,
    url: one,
    groupUrl: oneGroup,
    number: "01",
    heading: "Green Tea Extract",
    subheading:
      "Packed with antioxidants, it boosts metabolism and enhances focus without jitters.",
  },
];

const Card = ({
  id,
  url,
  groupUrl,
  number,
  heading,
  subheading,
  setCards,
  cards,
  exitDirection,
}) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = (event, info) => {
    if (Math.abs(x.get()) > 100) {
      setCards((prev) => prev.filter((card) => card.id !== id));
    } else {
      x.set(0);
      setCards((prev) => [...prev.slice(1), prev[0]]);
    }
  };

  return (
    <div className="absolute w-full flex justify-center items-center">
      <motion.img
        src={url}
        alt="Card image"
        className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-1/2 bg-white p-2 origin-bottom rounded-lg object-cover hover:cursor-grab active:cursor-grabbing"
        style={{
          rotate,
          transition: "0.125s transform",
        }}
        animate={{
          scale: isFront ? 1 : 0.98,
        }}
        whileDrag={{
          scale: 0.9,
          transition: { duration: 0.2 },
        }}
        exit={{
          x: exitDirection,
          opacity: 0,
          transition: { duration: 0.5 },
        }}
        drag={isFront ? "x" : false}
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        onDragEnd={handleDragEnd}
      />

      {isFront && groupUrl && (
        <motion.img
          src={groupUrl}
          alt="Group Image"
          className={`absolute select-none
            ${id === 2 ? "-top-14 left-0" : "bottom-[-20px]"}
            ${id === 6 ? "w-[70%] md:w-[400px]" : ""}
            ${id === 7 ? "w-[80%] md:w-[500px]" : ""}
            ${id === 2 ? "w-[50%] md:w-[300px]" : ""}
            ${id === 4 ? "w-[80%] md:w-[400px]" : "w-3/5 md:w-[250px]"}
          `}
          style={{
            left:
              id === 6
                ? "40%"
                : id === 7
                ? "15%"
                : id === 2
                ? "10%"
                : id === 4
                ? "12%"
                : "50%",
            bottom: id === 4 ? "1%" : id === 7 && "-10%",
            transition: "0.3s ease",
          }}
          draggable="false"
        />
      )}
    </div>
  );
};

const CardDetails = ({ card }) => {
  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 px-4 sm:px-6"
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl sm:text-6xl font-bold text-gray-50">{card.number}</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-green-400">{card.heading}</h2>
      </div>
      <p className="text-lg sm:text-xl text-gray-400">{card.subheading}</p>
    </motion.div>
  );
};

const SwipeCards = () => {
  const [cards, setCards] = useState([...cardData]);
  const [exitDirection, setExitDirection] = useState(null);
  const activeCard = cards[cards.length - 1];

  const swipeLeft = () => {
    setExitDirection(-600);
    setTimeout(() => {
      setExitDirection(null);
      setCards((prev) => {
        const newCards = [...prev];
        const lastCard = newCards.pop();
        newCards.unshift(lastCard);
        return newCards;
      });
    }, 400);
  };

  const swipeRight = () => {
    setExitDirection(800);
    setTimeout(() => {
      setExitDirection(null);
      setCards((prev) => {
        const newCards = [...prev];
        const firstCard = newCards.shift();
        newCards.push(firstCard);
        return newCards;
      });
    }, 400);
  };

  return (
    <div className="w-full min-h-dvh flex flex-col lg:flex-row items-center justify-center md:justify-around gap-32 md:gap-0 px-4 lg:px-16 py-8">
      {/* Card Swiping Section */}
      <div className="relative w-full flex justify-center items-center min-h-[400px] sm:min-h-[500px]">
        {/* Left Arrow */}
        <button
          className="absolute left-2 sm:left-4 md:left-32 z-10 bg-green-400 rounded-full p-2 cursor-pointer hover:bg-green-500 transition-colors"
          onClick={swipeLeft}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <AnimatePresence>
          {cards.map((card) => (
            <Card
              key={card.id}
              cards={cards}
              setCards={setCards}
              exitDirection={exitDirection}
              {...card}
            />
          ))}
        </AnimatePresence>

        {/* Right Arrow */}
        <button
          className="absolute right-2 sm:right-4 md:right-32 z-10 bg-green-400 rounded-full p-2 cursor-pointer hover:bg-green-500 transition-colors"
          onClick={swipeRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Card Details Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <CardDetails card={activeCard} key={activeCard.id} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SwipeCards;