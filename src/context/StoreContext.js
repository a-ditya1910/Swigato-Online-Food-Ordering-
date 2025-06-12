import { createContext, useEffect, useState, useCallback,useRef } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = process.env.REACT_APP_BASE_URL || "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchedFoodList, setSearchedFoodList] = useState([]);
  const menuRef = useRef(null);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = useCallback(async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  }, [url]);

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  const clearInput = () => {
    setSearchInputValue("");
    setSearchedFoodList(food_list);
  };

  const fetchSearchedFoods = async () => {
    if (!searchInputValue.trim()) {
      setSearchedFoodList(food_list);
      return;
    }

    try {
      const response = await axios.get(url + "/api/food/search", {
        params: { query: searchInputValue },
      });
      setSearchedFoodList(response.data.data || []);
    } catch (error) {
      console.log("Search failed:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [fetchFoodList]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSearchedFoods();
    }, 400);
    return () => clearTimeout(delay);
  }, [searchInputValue]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchFoodList,
    searchInputValue,
    setSearchInputValue,
    searchedFoodList, 
    setSearchedFoodList,
    setFoodList,
    menuRef,
    clearInput
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

