import React, { useState } from "react";
import Image from "next/image";
import "./border.css";
import tick from "../assets/icons8-tick.gif"
import { SiTicktick } from "react-icons/si";

function Team({data,addandremovewaiter}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    addandremovewaiter(data.username);
  };

  return (
    <div onClick={handleClick} className={`relative lg:w-64 w-[104px] p-[0.15rem] rounded-xl rounded-b-none borderbox ${isSelected ? 'selected scale-105' : ''}`}>
      {isSelected && (
        <div className="bg-[#e093e1]  bg-opacity-50 p-1 rounded-full tick-mark-container text-white text-2xl">
          <SiTicktick/>
          {/* <img src="/src/app/assets/icons8-tick.gif" alt="Selected" className="tick-mark" /> */}
        </div>
      )}
      <div className="flex justify-center items-center pb-1">
        <Image
          src={data?.image}
          className="rounded-xl rounded-b-none object-cover object-center"
          alt="itembanner"
          loading="lazy"
          width={100}
          height={160}
        />
      </div>
      <p className="text-center pb-1 uppercase tracking-tight font-semibold text-[10px]">{data?.username}</p>
      <div className="flex justify-center items-center">
        <div className='lg:w-24 w-24 h-[1px] bg-gradient-to-r from-[#666666] to-transparent'></div>
        <p className="text-center text-[0.7rem] px-3 mx-2 bg-amber-200 text-stone-950 rounded-lg tracking-wider">{data?.profession}</p>
        <div className='lg:w-24 w-24 h-[1px] bg-gradient-to-r from-transparent to-[#666666]'></div>
      </div> 
    </div>
  );
}

export default Team;
