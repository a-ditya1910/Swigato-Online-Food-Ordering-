import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Delivery from "../About/delievery";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="flex flex-col gap-10">
      <Header />
      <div className="w-[80%] mx-auto">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
      <Delivery/>
      <div className="w-[80%] mx-auto">
        <AppDownload />
      </div>
    </div>
  );
};

export default Home;
