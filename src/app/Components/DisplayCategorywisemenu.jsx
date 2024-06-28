"use client"
import React, { useState } from "react";
import Accordion from "./Accordian";
import LongCard from "./LongCard";
const items = [
  {
    name: "Chilly Pepper Mushroom",
    price: 80,
    image: "https://via.placeholder.com/100",
    description:
      "Fresh sautéed mushrooms tossed in a chilly sauce and pepper",
  },
  {
    name: "Chilly Pepper Mushroom",
    price: 80,
    image: "https://via.placeholder.com/100",
    description:
      "Fresh sautéed mushrooms tossed in a chilly sauce and pepper",
  }
  ,
  {
    name: "Chilly Pepper Mushroom",
    price: 80,
    image: "https://via.placeholder.com/100",
    description:
      "Fresh sautéed mushrooms tossed in a chilly sauce and pepper",
  }
  // Add more items as needed
];

function DisplayCategorywisemenu() {
    const [openAccordion, setOpenAccordion] = useState(null);

  const handleToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };
  return (
    <div className="container mx-auto space-y-3 py-8">
      <Accordion
        id="veg-biryani"
        title="Veg Biryani"
        isOpen={openAccordion === 'veg-biryani'}
        onToggle={handleToggle}
      >
        {items.map((item, index) => (
          <LongCard key={index} item={item}/>
        ))}
      </Accordion>
      <Accordion
        id="non-veg-biryani"
        title="Non-Veg Biryani"
        isOpen={openAccordion === 'non-veg-biryani'}
        onToggle={handleToggle}
      >
        {/* Repeat the items or add non-veg items */}
        {items.map((item, index) => (
          <LongCard key={index} item={item}/>
        ))}
      </Accordion>
      <Accordion
        id="veg-starter"
        title="Veg Starter"
        isOpen={openAccordion === 'veg-starter'}
        onToggle={handleToggle}
      >
        {/* Repeat the items or add veg starter items */}
        {items.map((item, index) => (
          <LongCard key={index} item={item}/>
        ))}
      </Accordion>
      <Accordion
        id="non-veg-starter"
        title="Non-Veg Starter"
        isOpen={openAccordion === 'non-veg-starter'}
        onToggle={handleToggle}
      >
        {/* Repeat the items or add non-veg starter items */}
        {items.map((item, index) => (
          <LongCard key={index} item={item}/>
        ))}
      </Accordion>
    </div>
  );
}

export default DisplayCategorywisemenu;
