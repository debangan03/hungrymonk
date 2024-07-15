"use client";
import React from "react";
import SmallViewItem from "./SmallViewItem";
import Heading from "./Heading";

function SomethingNew({ menu }) {
  // Sort menu items by createdAt timestamp in descending order (latest first)
  const sortedMenu = menu.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Limit the number of items to 5
  const limitedMenu = sortedMenu.slice(0, 5);

  return (
    <>
      <Heading heading={"What's New"} />
      <div className="px-4 -mt-2">
        <section className="flex  noscroll overflow-x-auto space-x-4 p-4">
          {limitedMenu.map((item) => (
            <SmallViewItem item={item} key={item._id} />
          ))}
        </section>
      </div>
    </>
  );
}

export default SomethingNew;
