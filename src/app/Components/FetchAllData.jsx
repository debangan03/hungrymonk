"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import SomethingNew from "./SomethingNew";
import BestSeller from "./BestSeller";
import DisplayCategorywisemenu from "./DisplayCategorywisemenu";
import Orderviewer from "./Orderviewer";
import Footer from "./Footer";

function FetchAllData() {
  const [menuitems, setmenuitems] = useState();
  const [table_number, settable_number] = useState("");
  const searchParams = useSearchParams();
  const [orderId, setorderId] = useState("");

  function getLocalStorage(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
  useEffect(() => {
    //setorderId(getLocalStorage("orderId"));
    //console.log(getLocalStorage("orderId"));
    const restaurant_id = searchParams.get("id");
    settable_number(searchParams.get("table"));
    const getmenu = async () => {
      const res = await axios.post("/api/fetchrestaurantmenu", {
        restaurant_id,
      });
      setmenuitems(res.data.data);
      console.log(res.data.data);
    };
    getmenu();
    
  }, []);

  return (
    <div>
      {menuitems && (
        <div className="min-h-screen">
          <Header name={menuitems.restaurant_name} />
          {/* <What_your_mood /> */}
          <SomethingNew />
          {/* <BestSeller /> */}
          <DisplayCategorywisemenu menu={menuitems.food_items} />
          <Orderviewer id={menuitems.restaurant_id} table={table_number} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default FetchAllData;
