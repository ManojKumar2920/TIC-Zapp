import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import video from "../assets/logo2.mp4";

const LetterPullUp = () => {
  const word = "Minglar";

  const wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };


  return (
    <motion.h1
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className="text-white font-bold flex justify-center w-full text-center text-6xl leading-[5rem] bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text te"
    >
      <div className="w-full flex items-center justify-center">
        <video autoPlay loop muted className="w-3/4 object-cover">
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </motion.h1>
  );
};

const Loader = () => {
  const [animateDone, setAnimateDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimateDone(true);
    }, 2000);
  }, []);

  return (
    <div className="bg-transparent">
      <AnimatePresence>
        <div className="w-screen bg-transparent">
          {/* Background fade-out effect */}
          <motion.div
            className="bg-[#000000] w-full z-[-1] h-screen flex items-center justify-center"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: animateDone ? -1000 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Letter animation */}
            {!animateDone && <LetterPullUp />}
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Loader;
