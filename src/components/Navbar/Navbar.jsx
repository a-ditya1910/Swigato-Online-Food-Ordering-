import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { IoCloseOutline } from "react-icons/io5";
import { PiShoppingCartBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const {
    getTotalCartAmount,
    token,
    setToken,
    searchInputValue,
    setSearchInputValue,
    menuRef,
    clearInput,
  } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);

    if (menuRef.current && value.trim() !== "") {
      setTimeout(() => {
        menuRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between py-4 px-6 md:px-10 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-[#a40404] text-2xl font-bold">
          Swigato
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-6 text-[#49557e] text-lg font-medium">
          <li>
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={`hover:text-[#a40404] border-b-2 transition ${
                menu === "home" ? "border-[#a40404]" : "border-transparent"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={() => setMenu("about")}
              className={`hover:text-[#a40404] border-b-2 transition ${
                menu === "about" ? "border-[#a40404]" : "border-transparent"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => setMenu("contact")}
              className={`hover:text-[#a40404] border-b-2 transition ${
                menu === "contact" ? "border-[#a40404]" : "border-transparent"
              }`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="hidden md:flex relative items-center w-[280px] h-[40px] bg-gray-100 rounded-full px-3">
          <CiSearch className="absolute left-3 text-gray-500 text-xl" />
          <input
            type="text"
            value={searchInputValue}
            onChange={handleSearchInput}
            placeholder="Rolls, Pasta"
            className="w-full pl-10 pr-8 bg-gray-100 text-sm rounded-full h-full focus:outline-none focus:bg-white"
          />
          {searchInputValue && (
            <IoCloseOutline
              onClick={clearInput}
              className="absolute right-3 text-gray-500 text-xl cursor-pointer"
            />
          )}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <div className="relative">
            <Link to="/cart">
              <PiShoppingCartBold className="text-[#49557e] text-2xl" />
            </Link>
            {getTotalCartAmount() > 0 && (
              <div className="absolute top-[-4px] right-[-4px] w-2.5 h-2.5 bg-[#a40404] rounded-full" />
            )}
          </div>

          {/* Login/Profile */}
          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="text-[#49557e] border border-[#a40404] px-5 py-2 rounded-full text-sm hover:bg-[#fff4f2] transition"
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-9 cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {showDropdown && (
                <ul className="flex flex-col gap-3 absolute right-0 min-w-[160px] bg-[#fff2ef] border border-[#a40404] px-5 py-4 rounded-xl z-10 mt-2 shadow-lg">
                  <li
                    onClick={() => {
                      navigate("/myorders");
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-2 hover:text-[#a40404] cursor-pointer"
                  >
                    <img src={assets.bag_icon} alt="orders" className="w-5" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-2 hover:text-[#a40404] cursor-pointer"
                  >
                    <img src={assets.logout_icon} alt="logout" className="w-5" />
                    <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
