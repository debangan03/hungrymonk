"use client"
import React, { useState } from "react";
import Accordion from "./Accordian";
import LongCard from "./LongCard";
import LeafIcon from '@mui/icons-material/Grass'; // Importing MUI icons for veg
import MeatIcon from '@mui/icons-material/Restaurant'; // Importing MUI icons for non-veg
import Image from "next/image";
import vegicon from '../assets/veg.png'
import nonvegicon from '../assets/nonveg.png'

const food_items = [
  {
    name: 'Pizza',
    description: 'It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum, red paprika & mint mayo',
    quantity: '1',
    price: '200',
    category: 'bread',
    subcategory: 'nonveg',
    image: 'https://via.placeholder.com/100',
    status: true,
    _id: '667ed9d54f283d55f696772e',
    createdAt: '2024-06-28T15:42:13.241Z',
    updatedAt: '2024-06-28T15:42:13.241Z'
  },
  {
    name: 'Pizza',
    description: 'It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum, red paprika & mint mayo',
    quantity: '1',
    price: '200',
    category: 'bread',
    subcategory: 'veg',
    image: 'https://via.placeholder.com/100',
    status: true,
    _id: '667ed9d54f2y83d55f696772e',
    createdAt: '2024-06-28T15:42:13.241Z',
    updatedAt: '2024-06-28T15:42:13.241Z'
  },
  {
    name: 'Pizza',
    description: 'It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum, red paprika & mint mayo',
    quantity: '1',
    price: '200',
    category: 'bread',
    subcategory: 'nonveg',
    image: 'https://via.placeholder.com/100',
    status: true,
    _id: '667edrt9d54f283d55f696772e',
    createdAt: '2024-06-28T15:42:13.241Z',
    updatedAt: '2024-06-28T15:42:13.241Z'
  },
  {
    name: 'Butter chicken(half)',
    description: 'Nice',
    quantity: '1',
    price: '140',
    category: 'maincourse',
    subcategory: 'nonveg',
    image: 'https://via.placeholder.com/100',
    status: true,
    _id: '667ed9d54f283d55f696772f',
    createdAt: '2024-06-28T15:42:13.242Z',
    updatedAt: '2024-06-28T15:42:13.242Z'
  },
  {
    name: 'Roti',
    description: 'Nice',
    quantity: '1',
    price: '10',
    category: 'tandoor',
    subcategory: 'veg',
    image: 'https://via.placeholder.com/100',
    status: true,
    _id: '667ed9d54f283d55f6967730',
    createdAt: '2024-06-28T15:42:13.242Z',
    updatedAt: '2024-06-28T15:42:13.242Z'
  }
];

function DisplayCategorywisemenu({menu}) {
  console.log(menu);
  const [food_items, setfood_items] = useState(menu)
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const categories = Array.from(new Set(food_items.map(item => item.category)));

  return (
    <div className="container mx-auto space-y-3 py-8">
      {categories.map(category => (
        <Accordion
          key={category}
          id={category}
          title={category.charAt(0).toUpperCase() + category.slice(1)}
          isOpen={openAccordion === category}
          onToggle={() => handleToggle(category)}
        >
          {['veg', 'nonveg'].map(subcategory => {
            const subcategoryItems = food_items.filter(item => item.category === category && item.subcategory === subcategory);
            if (subcategoryItems.length === 0) return null;

            return (
              <div key={`${category}-${subcategory} `} className='border-b-2 border-dotted border-[#966729] py-4'>
                <h3 className="text-lg font-semibold flex items-center">
                  {subcategory === 'veg' ? <Image src={vegicon} alt="vegicon" className="h-8 w-8"/> : <Image src={nonvegicon} alt="nonvegicon" className="h-6 w-6 mr-1"/>}
                  {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                </h3>
                {subcategoryItems.map(item => (
                  <LongCard key={item._id} item={item} />
                ))}

              </div>
            );
          })}
        </Accordion>
      ))}
    </div>
  );
}

export default DisplayCategorywisemenu;
