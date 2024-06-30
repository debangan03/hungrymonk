import React from "react";

function SmallViewItem() {
  return (
    <div>
      {" "}
      <div className="lg:w-64 w-28 h-full p-2 shadow-md rounded ">
        <img
          src="https://t3.ftcdn.net/jpg/05/66/68/36/360_F_566683667_BeBecGFABNQYkZhquqJxhSj7UOcCY7ZJ.jpg"
          className="mix-blend-multiply"
          alt="itembanner"
        />
        <p className="text-center">Biryani</p>
      </div> 
    </div> 
  );
}

export default SmallViewItem;
