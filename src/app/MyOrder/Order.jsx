"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import success from "../assets/success.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Pageloader from "../loaders/pageloader";
import Footer from "../Menu/Footer";
import OrderHeader from "./OrderHeader";
function Order() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const restaurant_name = searchParams.get("name");
  function getLocalStorage(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const orderId = getLocalStorage("orderId");
        if (orderId != null) {
          const getorder = async () => {
            const res = await axios.post("/api/fetchspecificorder", {
              orderId: orderId,
            });
            setOrderDetails(res.data.data);
            console.log(res.data.data);
            if (!res.data.success) {
              toast.error(
                "Failed to fetch your order. Please ask in-person to the waiter"
              );
              router.push(`/Menu?id=${restaurant_id}&table=${table_number}`); // Redirect to home if there's no order info
            }
          };
          getorder();
        } else {
            router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);        
        }
      } else {
        toast.error(
          "Failed to fetch your order. Please ask in-person to the waiter"
        );
        router.push(`/Menu?id=${restaurant_id}&table=${table_number}`); // Redirect to home if there's no order info
      }
    } catch (error) {
      //console.error("Failed to fetch order details:", error);
      router.push(`/Menu?id=${restaurant_id}&table=${table_number}`); // Redirect to home if there's an error
    }
  }, []);

  if (!orderDetails) {
    return (
      <div>
        <Pageloader />
      </div>
    );
  }

  return (
    <><OrderHeader name={restaurant_name}/>
      <div className="flex flex-col justify-center items-center bg-[#FFF9EA] px-4 mb-32 mt-4">
        <Toaster />
        
        <div className="text-lg flex mt-4 justify-center items-center space-x-4 text-[#661268] w-full">
          <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-transparent to-[#661268]"></div>
          <p className="lg:text-lg text-[15px] uppercase tracking-widest">
            Current order
          </p>
          <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-[#661268] to-transparent"></div>
        </div>

        <p className="text-sm text-[#4E0433] mb-4">Happy food. Happy us!</p>

        <div className="mx-auto bg-white w-full shadow-lg rounded-lg p-4 mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Order Details:
            </h2>
            <hr className="bg-black my-3"/>
            <ul className="list-disc list-inside">
              {orderDetails[0]?.order_items.map((item, i) => (
                <div key={i}>
                  {item.items.map((item1, j) => (
                    <li key={j} className="text-gray-700 flex justify-between border-b border-dotted border-gray-400 py-2">
                      <span>{item1?.food?.name}</span> <span>₹ {item1?.food?.price} x {item1?.quantity}</span>
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          </div>

          <div className="flex justify-between mb-2 mt-6">
            <span className="font-semibold text-gray-700">Sub Total</span>
            <span className="text-gray-700">
              ₹ {orderDetails[0]?.initial_bill}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700">GST (18%)</span>
            <span className="text-gray-700">₹ {orderDetails[0]?.tax}</span>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="flex justify-between mt-2">
            <span className="font-bold text-gray-700">Grand Total</span>
            <span className="font-bold text-gray-700">
              ₹ {orderDetails[0]?.total_bill}
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            router.push(`/Menu?id=${restaurant_id}&table=${table_number}`)
          }
          className="mt-6 px-4 py-2 bg-[#661268] text-white rounded-md"
        >
          Add more items
        </button>
      </div>
      <div className="bottom-0"><Footer /></div>
    </>
  );
}

export default Order;
