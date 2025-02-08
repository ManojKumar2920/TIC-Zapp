import React from "react";
import ZappRed from "../assets/zapp-red.png";

const DietFocused = () => {
  return (
    <div className=" flex flex-col md:flex-row p-10 justify-around items-center ">
      <div>
        <img src={ZappRed} alt="" width={300} className=' w-[200px] md:w-[400px]' />
      </div>
      <div className=" w-full max-w-3xl">
        <h1 className=" text-xl md:text-4xl my-5">
          Perfect for Diet-Conscious Consumers:
        </h1>
        <p className=" text-[16px] md:text-xl">
          For those watching their sugar intake or managing their weight, Zapp’s
          zero-sugar, low-calorie profile is a dream come true. It’s a
          guilt-free energy boost that won’t interfere with your dietary goals.
        </p>
      </div>
    </div>
  );
};

export default DietFocused;
