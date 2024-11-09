import React from "react";
import ZappBerry from '../assets/zapp-berry.png';
import ZappLime from '../assets/zapp-lime.png';

const DietFocused = () => {
  return (
    <div className=" flex flex-col md:flex-row p-10 justify-around items-center h-screen">
      <div>
        <img src={ZappBerry} alt="" width={300} className=' w-[200px] md:w-[300px]' />
      </div>
      <div className=" w-full max-w-xl">
        <h1 className=" text-xl md:text-3xl my-5">
          Perfect for Diet-Conscious Consumers:
        </h1>
        <p className=" text-[16px] md:text-lg">
          For those watching their sugar intake or managing their weight, Zapp’s
          zero-sugar, low-calorie profile is a dream come true. It’s a
          guilt-free energy boost that won’t interfere with your dietary goals.
        </p>
      </div>
    </div>
  );
};

export default DietFocused;
