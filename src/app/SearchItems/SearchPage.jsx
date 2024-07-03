"use client";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import maskvector from "../assets/Mask_group.png";
import LongCard from "../Menu/LongCard";
import Orderviewer from "../Menu/Orderviewer";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Pageloader from "../loaders/pageloader";


function SearchPage() {
  const [foodItems, setfoodItems] = useState();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const name = searchParams.get("name");
  useEffect(() => {
    // console.log(restaurant_id);
    const getmenu = async () => {
      const res = await axios.post("/api/fetchrestaurantmenu", {
        restaurant_id,
      });
      setfoodItems(res.data.data.food_items);
      // console.log(res.data.data);
      setFilteredItems(res.data.data.food_items);
    };
    getmenu();
  }, []);

  useEffect(() => {
    const filtered = foodItems?.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      {!filteredItems && (
        <div>
          <Pageloader />
        </div>
      )}
      {filteredItems && (
        <div className="min-h-screen pb-32">
          <div className="h-[180px] mb-6 relative w-screen bg-gradient-to-b from-[#FFF9EA] mix-blend-multiply to-[#F5EC02]/30">
            <Image
              alt="bgbanner"
              src={maskvector}
              layout="fill"
              className="absolute top-0 left-0 object-cover"
            />
            <div className="flex justify-between items-center p-6">
              
              <span className="text-2xl">{name}</span>
            </div>
            <h2 className="text-center mb-2 font-semibold italic text-[#4E0433]">
              Search your food
            </h2>
            <div className="search px-10 relative">
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Type 'butter naan'"
                className="pr-8 pl-10 h-10 focus:ring-0 shadow-md bg-[#FFF9EA] w-full rounded-full"
              />
              <SearchIcon className="absolute top-[10px] text-[#4E0433] h-6 left-12" />
            </div>
          </div>
          <div className="mx-auto px-4">
            <div className="grid grid-cols-1 gap-4 shadow-md">
              {filteredItems?.map((item, i) => (
                <LongCard key={i} item={item} />
              ))}
            </div>
          </div>
          <div className="bottom-0 max-w-screen"><Orderviewer id={restaurant_id} table={table_number} /></div>
        </div>
      )}
    </>
  );
}

export default SearchPage;
