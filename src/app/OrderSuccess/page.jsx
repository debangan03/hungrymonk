"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import success from '../assets/success.png'
function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    try {
      const items = JSON.parse(searchParams.get("items"));
      const subTotal = searchParams.get("subTotal");
      const gst = searchParams.get("gst");
      const grandTotal = searchParams.get("grandTotal");

      if (items && subTotal && gst && grandTotal) {
        setOrderDetails({ items, subTotal, gst, grandTotal });
      } else {
        router.push("/"); // Redirect to home if there's no order info
      }
    } catch (error) {
      console.error("Failed to parse order details:", error);
      router.push("/"); // Redirect to home if there's an error
    }
  }, [searchParams, router]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF9EA] px-4">
      <Image height={100} width={100}  alt="success"   src={success}/>
      <h1 className="text-4xl font-bold text-[#661268] mb-4">Order Successful!</h1>
      <p className="text-lg text-[#4E0433] mb-2">Thank you for your purchase.</p>

      <div className="mx-auto bg-white w-full shadow-lg rounded-lg p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Order Details:</h2>
          <ul className="list-disc list-inside">
            {orderDetails.items.map((item, i) => (
              <li key={i} className="text-gray-700">
                {item.name} - ₹ {item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mb-2">
          <span className="font-semibold text-gray-700">Sub Total</span>
          <span className="text-gray-700">₹ {orderDetails.subTotal}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-gray-700">GST</span>
          <span className="text-gray-700">₹ {orderDetails.gst}</span>
        </div>
        <div className="border-t border-gray-300 my-2"></div>
        <div className="flex justify-between mt-2">
          <span className="font-bold text-gray-700">Grand Total</span>
          <span className="font-bold text-gray-700">₹ {orderDetails.grandTotal}</span>
        </div>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-[#661268] text-white rounded-md"
      >
        Back to Home
      </button>
    </div>
  );
}

export default SuccessPage;
