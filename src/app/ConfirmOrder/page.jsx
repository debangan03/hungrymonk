"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmCard from "./ConfirmCard";
import { useDispatch, useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRouter } from "next/navigation";
import { clearCart } from "../redux/CartSlice";
import { uuid } from 'uuidv4';

function Page() {
  const cart = useSelector((state) => state?.cart);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleplaceorder = () => {
    const customerId = ("CUS_"+uuid()).toString(); // Replace this with the actual customer ID logic if needed
    localStorage.setItem("customerId", customerId); // Store customer ID in local storage

    const orderDetails = {
      customer_id, // Include customer ID in the order details
      items: JSON.stringify(cart.items),
      subTotal: cart.totalPrice.toFixed(2),
      gst: (cart.totalPrice * 0.18).toFixed(2),
      grandTotal: (cart.totalPrice * 1.18).toFixed(2),
    };

    // Redirect to the success page with order details
    const query = new URLSearchParams(orderDetails).toString();
    dispatch(clearCart());
    router.push(`/OrderSuccess?${query}`);
  };


  if (!isHydrated) {
    return <div>Loading...</div>; // You can replace this with a skeleton loader or a spinner
  }

  return (
    <div>
      <header>
        <div className="h-16 bg-[#661268] flex justify-between px-4 items-center">
          <div>
            <h1 className="text-xl font-semibold text-[#fff9ea]">Cart</h1>
            <p className="text-white text-sm">You pay: ₹ {(cart?.totalPrice * 1.18).toFixed(2)}</p>
          </div>
          <Link
            href={"/"}
            className="px-4 font-bold py-2 tracking-widest bg-white border-2 rounded-md text-[#6C0345] border-[#6C0345]"
          >
            EDIT
          </Link>
        </div>
      </header>
      <main className="min-h-[72vh] pb-32">
        {cart?.items?.map((item, i) => (
          <ConfirmCard key={i} item={item} />
        ))}

        <section className="px-4 mt-10">
          <div className="mx-auto bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700">Sub Total</span>
              <span className="text-gray-700">₹ {cart?.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700">
                GST{" "}
                <sup className="rounded-full text-[#6C0345] ">
                  <InfoOutlinedIcon className="text-sm" />
                </sup>
              </span>
              <span className="text-gray-700">₹ {(cart?.totalPrice * 0.18).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between mt-2">
              <span className="font-bold text-gray-700">Grand Total</span>
              <span className="font-bold text-gray-700">
                ₹ {(cart?.totalPrice * 1.18).toFixed(2)}
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="h-[100px] fixed bottom-0 w-full bg-[#661268] p-4 text-white flex justify-center items-center">
        <button onClick={handleplaceorder} className="bg-white border-2 px-4 py-2 w-full rounded-lg text-[#661268] tracking-[0.5rem] font-extrabold">
          PLACE ORDER
        </button>
      </footer>
    </div>
  );
}

export default Page;
