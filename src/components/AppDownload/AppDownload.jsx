import React from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div id ="app-download"className="mx-auto mt-24 text-center font-medium">
      <p className="text-xl sm:text-2xl md:text-3xl">
        For Better Experience Download <br /> Swigato App
      </p>
      <div className="flex justify-center gap-4 mt-10">
        <img
          src={assets.play_store}
          alt="Google Play Store"
          className="w-[30vw] sm:w-[120px] max-w-[180px] transition-transform duration-500 cursor-pointer hover:scale-105"
        />
        <img
          src={assets.app_store}
          alt="Apple App Store"
          className="w-[30vw] sm:w-[120px] max-w-[180px] transition-transform duration-500 cursor-pointer hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AppDownload;
