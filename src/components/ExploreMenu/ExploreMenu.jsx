import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div id="explore-menu" className="flex flex-col gap-5">
      <h1 className="text-[#262626] text-3xl font-bold">Best Food For You</h1>
      <p className="max-w-[100%] text-[#808080]">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      {/* Horizontally scrollable menu bar */}
      <div className="overflow-x-auto scroll-smooth custom-scroll py-4">
        <div className="flex gap-8 w-max">
          {menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="cursor-pointer text-center flex-shrink-0"
            >
              <img
                className={`w-[120px] h-[120px] object-cover rounded-full transition-all duration-200 ${
                  category === item.menu_name ? "border-4 border-[#a40404] p-1" : ""
                }`}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p className="mt-2 text-[#747474] text-base font-medium select-none">
                {item.menu_name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-2 h-[2px] bg-[#e2e2e2] border-none" />
    </div>
  );
};

export default ExploreMenu;
