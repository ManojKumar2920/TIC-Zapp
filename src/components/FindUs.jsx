import React from "react";
import ZappIcon from "../assets/zapp-icon.png";

const FindUs = () => {
  return (
    <div className=" relative flex p-10 items-center justify-center h-[60dvh] md:h-screen">
      <div className="absolute top-0 md:top-[10%] z-0 opacity-30">
        <img
          src={ZappIcon}
          alt="Zapp"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>
      <div className="  text-center max-w-3xl">
        <h1 className=" text-xl md:text-3xl my-5">Where to Find Us:</h1>
        <p className=" text-[16px] md:text-lg">
          You can purchase Zapp Energy Shot online through Amazon and Flipkart.
          Look for us in the health drinks section or search directly for “Zapp
          Energy Shot” to find your preferred flavor. Additionally, our
          innovative vending machines, designed specifically for Zapp, can be
          found in high-traffic locations like office complexes and airports,
          making it easier than ever to grab an energy boost on the go.
        </p>
      </div>
    </div>
  );
};

export default FindUs;
