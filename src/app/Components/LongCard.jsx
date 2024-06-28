import React from "react";

function LongCard({item}) {
  return (
  
      <div className="flex items-center space-x-12 p-2 bg-transparent border-b-2 border-dotted border-[#966729]  ">
        <div className="flex-grow w-3/5">
          <h2 className="text-base font-semibold text-[#2f2f2f]">{item?.name}</h2>
          <p className="">₹ {item?.price}</p>
          <p className="text-[9px] text-[#565556]">{item.description}</p>
        </div>
        <div className="w-2/5 flex justify-end relative">
        <img className="h-24 w-40   -z-10 shadow-md" src="https://t3.ftcdn.net/jpg/05/66/68/36/360_F_566683667_BeBecGFABNQYkZhquqJxhSj7UOcCY7ZJ.jpg" alt="item" />
        <button className="absolute  rounded-lg px-[6px] py-[1px] -bottom-2 lg:right-24 lg:left-[60%] -left-8 bg-[#FFF9EA] text-[#966729] border-[#966729] border-2 hover:scale-90 duration-200 font-semibold mb-2">ADD <sup>+</sup></button>
            
        </div>
       
      </div>
    
  );
}

export default LongCard;
