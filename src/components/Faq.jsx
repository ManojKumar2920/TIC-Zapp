import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterEffectSmooth } from "../components/writer";
import VendingMachineVideo from "../assets/vending-machine.mp4";

const faqData = [
  {
    question: "1. What is Zapp Energy Shot?",
    answer:
      "Zapp is a compact, 60ml energy shot designed for a quick, effective, and healthier energy boost. It’s non-carbonated, zero-sugar, and just one calorie per serving.",
  },
  {
    question: "2. How is Zapp different from traditional energy drinks?",
    answer:
      "Zapp is non-carbonated, zero-sugar, and includes unique ingredients like green tea extract and theacrine, providing long-lasting energy without the crash or bloating associated with traditional drinks.",
  },
  {
    question: "3. Who can benefit from Zapp?",
    answer:
      "Zapp is ideal for busy professionals, students, athletes, and anyone looking for a clean, convenient energy boost without excess sugar or calories.",
  },
  {
    question: "4. Does Zapp require refrigeration?",
    answer:
      "No, Zapp’s formula is stable at room temperature, making it perfect for carrying in your bag, purse, or pocket without needing refrigeration.",
  },
  {
    question: "5. What ingredients are in Zapp?",
    answer:
      "Zapp contains high caffeine content, green tea extract, and theacrine, along with minimal preservatives, ensuring a healthy and effective energy boost.",
  },
  {
    question: "6. Is Zapp available in different flavors?",
    answer:
      "Yes, Zapp comes in two delicious flavors that cater to different taste preferences, ensuring there’s a choice for everyone.",
  },
  {
    question: "7. Where can I buy Zapp Energy Shot?",
    answer:
      "Zapp is available on Amazon and Flipkart, and through our exclusive vending machines in high-traffic locations like office complexes and airports.",
  },
  {
    question: "8. How should I consume Zapp?",
    answer:
      "Enjoy one 60ml shot whenever you need a quick energy boost, whether it’s before a workout, during a busy workday, or for a late-night study session.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="faq" className="flex flex-col md:flex-row w-full h-auto items-center bg-black text-white overflow-hidden">
      
      {/* FAQ Section */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-start px-6 sm:px-10 lg:px-16 py-8 ">
        <h2 className="text-6xl md:text-[150px] font-bold mb-6">FAQ</h2>
        <div className="space-y-4 w-full">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                backgroundColor: activeIndex ===  index ? "transparent" : "transparent",
              }}
              className="rounded-lg overflow-hidden border-b border-lime-500"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 focus:outline-none"
              >
                <div className="flex w-full justify-between items-center gap-3">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p>{activeIndex === index ? "-" : "+"}</p>
                </div>
              </motion.button>
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <div className="p-4 text-gray-300">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <video
          src={VendingMachineVideo}
          autoPlay
          loop
          playsInline
          muted
          className="w-full max-w-[800px] h-auto md:max-w-[1500px]"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Faq;