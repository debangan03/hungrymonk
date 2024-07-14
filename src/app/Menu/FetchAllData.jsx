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
import LoadingPage from "../loaders/LoadingPage";

function FetchAllData() {
  const [menuitems, setmenuitems] = useState();
  const [table_number, settable_number] = useState("");
  const searchParams = useSearchParams();
  const [orderId, setorderId] = useState("");

  useEffect(() => {
    const restaurant_id = searchParams.get("id");
    settable_number(searchParams.get("table"));
    const getmenu = async () => {
      const res = await axios.post("/api/fetchrestaurantmenu", {
        restaurant_id,
      });
     //console.log(res.data.data);
      setmenuitems(res.data.data);
    };
    getmenu();
  }, []);
  if (!menuitems)
    return (
      <>
        <LoadingPage />
      </>
    );

  return (
    <div>
      
      {menuitems&&<div className="min-h-screen">
        <Header
          name={menuitems.restaurant_name}
          restaurant_id={menuitems.restaurant_id}
          table_number={table_number}
        />
        {/* <What_your_mood /> */}
        <SomethingNew />
        {/* <BestSeller /> */}
        <DisplayCategorywisemenu menu={menuitems.food_items} />
        <Orderviewer
          id={menuitems.restaurant_id}
          table={table_number}
        />
        
      </div>}
      <Footer />
    </div>
  );
}

export default FetchAllData;
