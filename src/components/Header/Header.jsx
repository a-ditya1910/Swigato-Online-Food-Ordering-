import React from "react";
import headerHero from "../../assets/headerHero.jpeg"; // Adjust path if needed

const Header = () => {
  return (
    <div className="relative w-full bg-[#feffcb] flex items-center px-4 sm:px-6 lg:px-8 mb-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between w-full gap-10">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left px-2">
          <h1 className="capitalize text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-balance">
            The best
            <span className="text-[#a40404]"> Restaurants </span>
            in your home
          </h1>

          <p className="py-4 text-base sm:text-lg text-slate-600">
            Get ready for a scrumptious adventure filled with unbeatable
            offers on your favourite foods and restaurants.
          </p>

          <p className="text-lg sm:text-xl text-[#a40404] font-bold capitalize pb-4">
            Fast, Fresh & Flavor-Packed
          </p>

          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => {
                const section = document.getElementById("explore-menu");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#a40404] hover:bg-[#f35656] text-white font-medium py-2 px-6 rounded-full transition"
            >
              View Menu
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            className="w-[90%] sm:w-[95%] md:w-[100%] lg:w-[115%] max-h-[500px] object-contain"
            src={headerHero}
            alt="Delivery Boy"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
