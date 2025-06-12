import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div id="footer" className="text-gray-300 bg-[#323232] flex flex-col items-center gap-5 px-[8vw] pt-20 mt-24">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* Left Section */}
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-2xl font-bold text-[#a40404]">Swigato</h1>
          <p>
            Hungry? Don’t wait. Swigato it.
            <br/>
            Quick delivery, fresh bites, and endless options.
            <br/>
            Your next favorite meal is just a tap away.
          </p>
          <div className="flex items-center">
            <img src={assets.facebook_icon} alt="Facebook" className="w-10 mr-4 cursor-pointer" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-10 mr-4 cursor-pointer" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-10 cursor-pointer" />
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white text-xl font-semibold">COMPANY</h2>
          <ul>
            {["Home", "About Us", "Delivery", "Privacy Policy"].map((item, idx) => (
              <li key={idx} className="mb-2 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white text-xl font-semibold">Contact Details</h2>
          <ul>
            <li className="mb-2">Phone No: +91 7703987646</li>
            <li>Email: contact@swigato.com</li>
          </ul>
        </div>
      </div>

      <hr className="w-full h-[2px] my-5 bg-gray-500 border-none" />
      <p className="text-center text-sm mb-12">
        Copyright 2024 © Swigato - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
