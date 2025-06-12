import React, { useState, useEffect } from "react";
import TopOrder from "./TopOrder";
import Client from "../../assets/client.png";

const MostOrder = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === TopOrder.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TopOrder.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TopOrder.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleClickImage = () => {
    const section = document.getElementById("food-display");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-100 py-12 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl font-bold leading-10 text-[#a40404] mb-4">
            Here's what our customers Order Most
          </h2>
          <img
            src={Client}
            alt="client"
            className="w-2/5 mx-auto lg:mx-0 mb-4"
          />
          <p className="text-gray-600 text-lg">
            We believe in quality and taste. Check out real stories from our
            happy customers and see why they keep coming back for more!
          </p>
        </div>

        {/* Right Carousel */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center">
          <div
            onClick={handleClickImage}
            className="cursor-pointer w-full max-w-xl relative"
          >
            <img
              src={TopOrder[currentIndex].localImage}
              alt={TopOrder[currentIndex].category}
              className="rounded-2xl shadow-2xl w-full h-80 object-cover transition duration-500"
            />
            <p className="text-center mt-3 font-semibold text-xl text-gray-700">
              {TopOrder[currentIndex].category}
            </p>

            {/* Arrows Overlapping the image */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md z-10"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md z-10"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostOrder;


