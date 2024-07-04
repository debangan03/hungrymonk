"use client";
import React from "react";
import OrderCart from "./OrderCart";
import image from '../assets/Mask_group.png'
import Image from "next/image";

function Orders() {
  function Heading({ heading }) {
    return (
      <div className="text-base flex mt-4 px-2 justify-center items-center space-x-2 text-[#565556] w-full">
        <p className="lg:text-lg text-[14px] uppercase tracking-widest">
          {heading}
        </p>
        <div className="lg:w-40 w-24 h-[2px] bg-gradient-to-r from-[#666666] to-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9EA] min-h-screen relative">
        <Image src={image} alt="topvector" className="absolute top-0 left-0" />
      <Heading heading={"Previously Ordered Items"} />
      <div className="px-2 mt-6">
        <p className="text-stone-600 px-2">23-11-2024</p>
        <section className="flex noscroll overflow-x-auto space-x-2 p-2">
          <OrderCart />
          <OrderCart />
          <OrderCart />
          <OrderCart />
          <OrderCart />
        </section>
        
      </div>
      <div className="px-2 mt-6">
        <p className="text-stone-600 px-2">23-11-2024</p>
        <section className="flex noscroll overflow-x-auto space-x-2 p-2">
          <OrderCart />
          <OrderCart />
          <OrderCart />
          <OrderCart />
          <OrderCart />
        </section>
        
      </div>
      <div className="px-2 mt-6">
        <p className="text-stone-600 px-2">23-11-2024</p>
        <section className="flex noscroll overflow-x-auto space-x-2 p-2">
          <OrderCart />
          <OrderCart />
          <OrderCart />
          <OrderCart />
          <OrderCart />
        </section>
        
      </div>
      <div className="px-2 mt-6">
        <p className="text-stone-600 px-2">23-11-2024</p>
        <section className="flex noscroll overflow-x-auto space-x-2 p-2">
          <OrderCart />
          <OrderCart />
          <OrderCart />
          <OrderCart />
          <OrderCart />
        </section>
        
      </div>
    </div>
  );
}

export default Orders;
