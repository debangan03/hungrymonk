"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import success from "../assets/success.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingPage from "../loaders/LoadingPage";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";

function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const restaurant_id=searchParams.get("id");
  const table_number=searchParams.get("table");
  const orderId = searchParams.get("orderId");
  useEffect(() => {
    try {
      //const items = JSON.parse(searchParams.get("items"));

      //const gst = searchParams.get("gst");
      //const grandTotal = searchParams.get("grandTotal");
      
      const getorder = async () => {
        
        //console.log(orderId);
        if (orderId) {
          const res = await axios.post("/api/fetchspecificorder", {
            orderId: orderId,
          });
          //
          
          console.log(res.data.data)
          setOrderDetails(res.data.data);
          if (!res.data.success) {
            toast.error(
              "Failed to place your order. Please place your order in-person to the waiter"
            );
            router.push(`/Menu?id=${restaurant_id}&table=${table_number}`); // Redirect to home if there's no order info
          }
        } else {
          router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
        }
      };
      getorder();
    } catch (error) {
      //console.error("Failed to parse order details:", error);
      router.push(`/Menu?id=${restaurant_id}&table=${table_number}`); // Redirect to home if there's an error
    }
  }, []);

  if (!orderDetails) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 flex flex-col justify-center items-center bg-[#FFF9EA] px-4">
      <Toaster />
      <Image height={100} width={100} alt="success" src={success} />
      <h1 className="text-4xl font-bold text-[#441029] mb-4">
        Order Successful!
      </h1>
      <div className="flex relative justify-center items-center mb-2">
        <button
        type="button"
        onClick={()=>{router.push(`/Tip?id=${restaurant_id}&table=${table_number}`)}}
          className="bg-[#6C0345] rounded-full py-1 px-4 text-[#FFF9EA] flex justify-center items-center hover:scale-90 "
        >
          Treat the team
          
          <ArrowRightAltIcon />
        </button>
      </div>
      <p className="text-lg text-[#4E0433] mb-4">Happy you! Happy us!</p>

      <div className="mx-auto bg-white w-full shadow-lg rounded-lg p-4">
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
                    <span>{item1?.food?.name} &nbsp;&nbsp;x{item1?.quantity}</span><span> ₹ {parseFloat(item1?.food?.price)*parseFloat(item1?.quantity)} </span>
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
          <span className="font-semibold text-gray-700">Taxes</span>
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
        className="mt-6 px-4 py-2 bg-[#441029] text-white rounded-md"
      >
        Add more items / Go Home
      </button>
    </div>
  );
}

export default SuccessPage;
