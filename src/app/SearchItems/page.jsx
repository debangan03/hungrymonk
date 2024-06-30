"use client";
import React, { useState, useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Image from 'next/image';
import maskvector from "../assets/Mask_group.png";
import LongCard from '../Components/LongCard';
import Orderviewer from '../Components/Orderviewer';

const foodItems = [
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

function SearchPage() {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(foodItems);
  }, []);

  useEffect(() => {
    const filtered = foodItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="h-[180px] mb-6 relative w-screen bg-gradient-to-b from-[#FFF9EA] mix-blend-multiply to-[#F5EC02]/30">
        <Image
          alt="bgbanner"
          src={maskvector}
          layout="fill"
          className="absolute top-0 left-0 object-cover"
        />
        <div className="flex justify-between items-center p-6">
          <img
            src="https://www.baksish.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbaksish_logo.b18dc14f.png&w=96&q=75"
            alt="BakSish"
          />
        </div>
        <h2 className="text-center mb-2 font-semibold italic text-[#4E0433]">Search your food</h2>
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
          {filteredItems.map((item, i) => (
            <LongCard key={i} item={item} />
          ))}
        </div>
      </div>
      <Orderviewer />
    </div>
  );
}

export default SearchPage;
