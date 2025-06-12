import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-20 px-4 md:px-10 mx-24">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      <div className="flex flex-col gap-6">
        {data.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-3 md:grid-cols-6 items-center gap-4 md:gap-6 text-sm border border-[#a40404] p-4 rounded text-[#454545]"
          >
            <img src={assets.parcel_icon} alt="parcel" className="w-12" />

            <p className="col-span-2">
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>

            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>

            <p className="flex items-center gap-2">
              <span className="text-[#a40404] text-lg">&#x25cf;</span>
              <b>{order.status}</b>
            </p>

            <button
              onClick={fetchOrders}
              className="col-span-3 md:col-span-1 mt-2 md:mt-0 bg-[#ffe1e1] text-[#454545] text-xs md:text-sm py-2 px-4 rounded hover:bg-[#ffdada] transition"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
