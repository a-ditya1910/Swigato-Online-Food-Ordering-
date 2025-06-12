import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const FoodDisplay = ({ category }) => {
  const { fetchFoodList, food_list, searchedFoodList, searchInputValue, menuRef } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodItems = async () => {
      setLoading(true);
      await fetchFoodList();
      setLoading(false);
    };
    loadFoodItems();
  }, [fetchFoodList]);

  const displayList = searchInputValue ? searchedFoodList : food_list;

  return (
    <div className="mt-8" id="food-display" ref={menuRef}>
      <h2 className="text-[max(2vw,24px)] font-semibold">Best dishes in your vicinity</h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-y-[50px] gap-[30px] mt-[30px]">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : displayList.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                );
              }
              return null;
            })}
      </div>
    </div>
  );
};

export default FoodDisplay;
