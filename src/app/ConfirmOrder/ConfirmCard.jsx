import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from "../redux/CartSlice";
import toast, { Toaster } from "react-hot-toast";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
function ConfirmCard({ item }) {
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();


  const handleUpdateQuantity = (quantity) => {
    if (quantity < 0) {
      dispatch(updateQuantity({ _id: item._id, quantity: 0 }));
    } else if (quantity > 50) {
      toast.error("Quantity cannot be more than 50");
    } else {
      dispatch(updateQuantity({ _id: item._id, quantity }));
    }
    //
    //console.log(cart);
  };
  const cartItem = cart.items.find((cartItem) => cartItem._id === item._id);

  return (
    <div className="p-4 ">
      <div className="p-2 shadow-md rounded-2xl flex justify-between items-center ">
        <div className="px-1 w-64">
          <h3 className="text-lg font-bold">{item?.name}</h3>
          <p className="text-[0.7rem]">
            {item?.description ??
              "A Crispy And Flavor-Packed Starter With Succulent Paneer Chunks Dipped In A Seasoned Batter And Fried To Golden Crispiness."}
          </p>
        </div>
        <div className="mt-2 ">
          <div>
            {cartItem?.quantity > 0 && (
              <div className="flex bg-[#3a0920] rounded-md  justify-center text-center w-24 h-8 items-center">
                <span
                  onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
                  className="cursor-pointer h-full pt-1 w-1/3  text-white"
                >
                  <RemoveIcon />
                </span>
                <span className="text-base h-full pt-1 text-center bg-[#FFF9EA] w-1/3 text-black">{cartItem.quantity}</span>
                <span
                  onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                  className="cursor-pointer w-1/3  text-white"
                >
                  <AddIcon />
                </span>
              </div>
            )}
          </div>
          <div className="mt-2 text-right">
            <p>₹ {item?.price * item?.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCard;
