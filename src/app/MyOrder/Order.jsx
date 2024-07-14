"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import success from "../assets/success.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingPage from "../loaders/LoadingPage";
import Footer from "../Menu/Footer";
import GenerateBillModal from "./ConfirmGenerateBill";
import OrderHeader from "./OrderHeader";

function Order() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [noorderfound, setnoorderfound] = useState(false);
  const [countdown, setCountdown] = useState(10); // Countdown state
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const restaurant_name = searchParams.get("name");
  const [isOpen, setisOpen] = useState(false);
  const [orderID, setorderID] = useState("")

  const billgenerationconfirmed=async()=>{
    const res=await axios.post('/api/generatebill',{order_id:orderID})
    if(res.data.success){
    router.push(
      `/GenerateBill?id=${restaurant_id}&table=${table_number}&name=${restaurant_name}`
    )
  }
  else{
    toast.error("Failed to generate bill. Please ask the waiter.")
  }
  }

  const checkvalidorderid = async (order_id) => {
    try {
      const resvalid = await axios.post("/api/fetchvalidorder", { order_id });
      console.log(resvalid.data.valid);
      if (resvalid.data.success) {
        if (!resvalid.data.valid) {
          localStorage.removeItem("orderId");
          return null;
        } else {
          return order_id;
        }
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  };
  
  useEffect(() => {
    const getalldata = async () => {
      try {
        if (typeof window !== "undefined") {
          const orid = localStorage.getItem("orderId");
          const orderId = await checkvalidorderid(orid);
          setorderID(orderId);
          if (orderId != null) {
            const res = await axios.post("/api/fetchspecificorder", {
              orderId: orderId,
            });

            console.log(res.data.data);
            if (!res.data.success) {
              toast.error(
                "Failed to fetch your order. Please ask in-person to the waiter"
              );
              setnoorderfound(true);
              setTimeout(() => {
                router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
              }, 10000);
            } else {
              setOrderDetails(res.data.data);
            }
          } else {
            setnoorderfound(true);
            setTimeout(() => {
              router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
            }, 10000);
          }
        } else {
          toast.error(
            "Failed to fetch your order. Please ask in-person to the waiter"
          );
          setnoorderfound(true);
          setTimeout(() => {
            router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
          }, 10000);
        }
      } catch (error) {
        setnoorderfound(true);
        setTimeout(() => {
          router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
        }, 10000);
      }
    };
    getalldata();
  }, []);

  useEffect(() => {
    if (noorderfound) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [noorderfound]);

  useEffect(() => {
    if (countdown === 0) {
      router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
    }
  }, [countdown, restaurant_id, table_number, router]);

  if (!orderDetails && !noorderfound) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <>
      <OrderHeader
        name={restaurant_name}
        id={restaurant_id}
        table={table_number}
      />
      <Toaster />
      {orderDetails && (
        <div className="flex flex-col justify-center items-center bg-[#FFF9EA] px-4 mb-32 mt-4">
          <div className="text-lg flex mt-4 justify-center items-center space-x-4 text-[#441029] w-full">
            <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-transparent to-[#441029]"></div>
            <p className="lg:text-lg text-[15px] uppercase tracking-widest">
              Current order
            </p>
            <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-[#441029] to-transparent"></div>
          </div>

          <p className="text-sm text-[#4E0433] mb-6">Happy you! Happy us!</p>

          <div className="mx-auto bg-white w-full shadow-lg rounded-lg p-4 ">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Order Details:
              </h2>
              <hr className="bg-black my-3" />
              <ul className="list-disc list-inside">
                {orderDetails[0]?.order_items.map((item, i) => (
                  <div key={i}>
                    {item.items.map((item1, j) => (
                      <li
                        key={j}
                        className="text-gray-700 flex justify-between border-b border-dotted border-gray-400 py-2"
                      >
                        <span>
                          {item1?.food?.name}&nbsp;&nbsp;x{item1?.quantity}
                        </span>{" "}
                        <span>
                          ₹
                          {parseFloat(item1?.food?.price) *
                            parseFloat(item1?.quantity)}
                        </span>
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
            Add more items
          </button>
          <button
            onClick={() =>
              setisOpen(true)
            }
            className="mt-6 px-4 py-2 bg-[#441029] text-white rounded-md"
          >
            Generate my Bill
          </button>
        </div>
      )}
      {!orderDetails && noorderfound && (
        <div className="flex flex-col items-center justify-center mt-32 mb-32">
          <div className="text-center mx-8">
            <h1 className="text-4xl font-bold text-[#441029]">
              Welcome!
            </h1>
            <p className="text-lg mt-4 text-gray-700">
              Seems like this is your first time here.
            </p>
            <p className="text-lg text-gray-700">
              Order and enjoy your first meal!
            </p>
            <div className="mt-10">
              <p className="text-lg text-[#441029] font-semibold">
                Redirecting you to home page in{" "}
                <span className="font-bold">{countdown}</span> seconds...
              </p>
            </div>
          </div>
        </div>
      )}
      <GenerateBillModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onConfirm={billgenerationconfirmed}
      />
      <div className="bottom-0">
        <Footer />
      </div>
    </>
  );
}

export default Order;
