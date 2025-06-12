import React, { useState, useContext } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const endpoint =
      currState === "Login" ? `${url}/api/user/login` : `${url}/api/user/register`;

    try {
      const response = await axios.post(endpoint, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Login/Register failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <form
        onSubmit={onLogin}
        className="w-[90%] max-w-sm bg-white text-gray-700 rounded-2xl shadow-lg px-6 py-8 flex flex-col gap-6 animate-fadeIn"
      >
        {/* Header */}
        <div className="flex justify-between items-center text-lg font-semibold text-black">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            className="w-4 cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Your name"
              required
              className="border border-gray-300 rounded-md px-3 py-2 outline-none"
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Your email"
            required
            className="border border-gray-300 rounded-md px-3 py-2 outline-none"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Password"
            required
            className="border border-gray-300 rounded-md px-3 py-2 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#a40404] text-white py-2 rounded-md font-semibold hover:bg-[#8c0303] transition"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Terms */}
       <div className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 w-4 h-4 accent-[#a40404] cursor-pointer"
          />
          <label htmlFor="terms" className="cursor-pointer">
            By continuing, I agree to the{" "}
            <span className="text-[#a40404] font-semibold hover:underline">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="text-[#a40404] font-semibold hover:underline">
              Privacy Policy
            </span>.
          </label>
        </div>



        {/* Switch Mode */}
        {currState === "Login" ? (
          <p className="text-center text-sm">
            Create a new account?{" "}
            <span
              className="text-[#a40404] font-medium cursor-pointer"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-[#a40404] font-medium cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
