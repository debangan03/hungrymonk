import React from "react";
import veg from '../assets/veg.svg';
import nonveg from '../assets/nonveg.svg';
import Image from "next/image";

function SmallViewItem({ item }) {
  return (
    <div className="relative ">
      <Image src={item.subcategory==='Veg'?veg:nonveg} alt="veg" width={20} height={20} className="absolute bottom-[9px] left-2" />
      <div className="lg:w-52 w-36 h-48  border-[#f1d58f5a] p-2 border-[2px] shadow-md rounded flex flex-col ">
        <img
          src={item?.image}
          className=" object-cover h-36 rounded-lg w-full"
          alt="itembanner"
        />
        <p className="text-left ml-6 mt-2">{(item?.name).slice(0,25)}</p>
      </div>
    </div>
  );
}

export default SmallViewItem;
