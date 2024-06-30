"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmCard from "./ConfirmCard";
import { useDispatch, useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRouter, useSearchParams } from "next/navigation";
import { clearCart } from "../redux/CartSlice";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

function Page() {
  const searchParams = useSearchParams();
  const cart = useSelector((state) => state?.cart);
  const [isHydrated, setIsHydrated] = useState(false);
  const [restaurant_id, setrestaurant_id] = useState("");
  const [table_number, settable_number] = useState("");
  const [notes, setnotes] = useState("")
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setrestaurant_id(searchParams.get("id"));
    settable_number(searchParams.get("table"));
    setIsHydrated(true);
  }, []);

  const handleplaceorder = async() => {
    const customerId = ("CUS_" + uuidv4()).toString();
    const orderId = ("ORD_" + uuidv4()).toString(); // Replace this with the actual customer ID logic if needed
    localStorage.setItem("customerId", customerId); // Store customer ID in local storage
    localStorage.setItem("orderId", orderId);
    const orderDetails = {
      customer_id: customerId, // Include customer ID in the order details
      order_id: orderId,
      restaurant_id: restaurant_id,
      table_number: table_number,
      order_items: [
        {
          items: cart.items,
          notes:notes,
          item_total: cart.totalPrice.toFixed(2),
          charges: (cart.totalPrice * 0.18).toFixed(2),
          total_price: (cart.totalPrice * 1.18).toFixed(2),
          status:"Ordered"
        },
      ],
      initial_bill:cart.totalPrice.toFixed(2),
      tax:(cart.totalPrice * 0.18).toFixed(2),
      total_bill: (cart.totalPrice * 1.18).toFixed(2),
    };
    const res = await axios.post('api/createneworder', orderDetails);
    console.log(res);
    // Redirect to the success page with order details
    if(res.data.success){
      dispatch(clearCart());
      router.push(`/OrderSuccess?orderId=${orderId}`);
    }
    
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
            <p className="text-white text-sm">
              You pay: ₹ {(cart?.totalPrice * 1.18).toFixed(2)}
            </p>
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
        <section className=" mt-10 mx-4">
          <h2 className="pl-1 text-sm italic font-light">Add notes for the Chef(if any) :</h2>
          <div className="h-fit min-h-10  bg-white">
          <textarea id="message" rows="2" value={notes} onChange={(e)=>setnotes(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-[#661268] " placeholder="Write your thoughts here..."></textarea>
          </div>
        </section>
        <section className="px-4 mt-10">
          <div className="mx-auto bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700">Sub Total</span>
              <span className="text-gray-700">
                ₹ {cart?.totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700">
                GST{" "}
                <sup className="rounded-full text-[#6C0345] ">
                  <InfoOutlinedIcon className="text-sm" />
                </sup>
              </span>
              <span className="text-gray-700">
                ₹ {(cart?.totalPrice * 0.18).toFixed(2)}
              </span>
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
        <button
          onClick={handleplaceorder}
          className="bg-white border-2 px-4 py-2 w-full rounded-lg text-[#661268] tracking-[0.5rem] font-extrabold"
        >
          PLACE ORDER
        </button>
      </footer>
    </div>
  );
}

export default Page;
