import React from "react";

function ConfirmCard({item}) {
  return (
    <div className="p-4 ">
      <div className="p-2 shadow-md rounded-2xl flex justify-between items-center ">
        <img
          className="h-24 w-[30%]  -z-10 shadow-md mix-blend-multiply rounded-2xl"
          src="https://t3.ftcdn.net/jpg/05/66/68/36/360_F_566683667_BeBecGFABNQYkZhquqJxhSj7UOcCY7ZJ.jpg"
          alt="item"
        />
        <div className="w-[67%]">
          <div className="px-1">
            <h3 className="text-lg font-bold">{item?.name}</h3>
            <p className="text-[0.7rem]">{item?.description ??'A Crispy And Flavor-Packed Starter With Succulent Paneer Chunks Dipped In A Seasoned Batter And Fried To Golden Crispiness.'}</p>
          </div>
          <div className="flex justify-between items-center mt-2 ">
            <p className="bg-transparent border-2 border-[#dcbb69] p-1 text-sm rounded-lg">
              Quantity : <span className="font-bold">{item?.quantity}</span>
            </p>
            <p>₹ {item?.price * item?.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCard;
