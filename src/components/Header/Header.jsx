import React from "react";
import headerHero from "../../assets/headerHero.jpeg"; // Adjust path if needed

const Header = () => {
  return (
    <div className="relative h-[500px] w-full bg-[#feffcb] flex items-center px-6 lg:px-8 mb-12 mt-20 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-col lg:flex-row w-full ml-20">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2">
          <h1 className="capitalize text-4xl lg:text-6xl font-extrabold leading-tight text-center lg:text-left">
            The best
            <span className="text-[#a40404]"> Restaurants </span>
            in your home
          </h1>

          <p className="py-5 text-lg text-slate-500 text-center lg:text-left">
            Get ready for a scrumptious adventure filled with unbeatable
            offers on your favourite foods and restaurants.
          </p>

          <p className="text-center lg:text-left text-lg pb-6 capitalize text-[#a40404] font-bold">
            Fast, Fresh & Flavor-Packed
          </p>

          {/* Optional: View Menu Button */}
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
        <div className="w-full lg:w-1/2 flex justify-end lg:mt-0 -mr-20">
          <img
            className="w-[95%] lg:w-[115%] object-contain h-[600px]"
            src={headerHero}
            alt="Delivery Boy"
          />
        </div>


      </div>
    </div>
  );
};

export default Header;
