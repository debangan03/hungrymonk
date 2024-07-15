"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingPage from "../loaders/LoadingPage";
import Footer from "../Menu/Footer";
import BillHeader from "./BillHeader";
import Billcomponent from "./Billcomponents";
function Bill() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const restaurant_name = searchParams.get("name");
  const [responsecome, setresponsecome] = useState(false);
  const [qrcode, setqrcode] = useState("");
  const [noorderfound, setnoorderfound] = useState(false);
  const [countdown, setCountdown] = useState(10); // Countdown state
  const checkvalidorderid = async (order_id) => {
    try {
      const resvalid = await axios.post("/api/fetchvalidorder", { order_id });
      //console.log(resvalid.data.valid);
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
    const getalldata=async()=>{
    try {
      if (typeof window !== "undefined") {
        const orid = localStorage.getItem("orderId");
        const orderId = await checkvalidorderid(orid);
        if (orderId != null) {
          const getorder = async () => {
            const res = await axios.post("/api/fetchspecificorder", {
              orderId: orderId,
            });
            setresponsecome(true);
            //console.log(res.data);
            if (!res.data.success) {
              toast.error(
                "Seems like you haven't yet ordered"
              );
                setnoorderfound(true);
                setTimeout(() => {
                  router.push(`/?id=${restaurant_id}&table=${table_number}`);
                }, 10000);              
            } else {
                
                const qrres = await axios.post("/api/getqrcodefortip", {
                  url: `${process.env.NEXT_PUBLIC_QR_URL}/Tip?id=${restaurant_id}&table=${table_number}`,
                });
                //
                //console.log(qrres.data);
                setqrcode(qrres.data.qrCodeDataURL);
                setOrderDetails(res.data.data);
            }
          };
          getorder();
        } else {
          setresponsecome(true);
          toast.error(
            "Seems like you haven't yet ordered"
          );
          setnoorderfound(true);
                setTimeout(() => {
                  router.push(`/?id=${restaurant_id}&table=${table_number}`);
                }, 10000); 
          
        }
      } else {
        setresponsecome(true);
        toast.error(
          "Failed to generate your bill. Please ask in-person to the waiter"
        );
        setnoorderfound(true);
                setTimeout(() => {
                  router.push(`/?id=${restaurant_id}&table=${table_number}`);
                }, 10000); 
      }
    } catch (error) {
      //console.error("Failed to generate your bill", error);
      toast.error(
        "Failed to generate your bill. Please ask in-person to the waiter"
      );
      setresponsecome(true);
      setnoorderfound(true);
                setTimeout(() => {
                  router.push(`/?id=${restaurant_id}&table=${table_number}`);
                }, 10000); 
    }
  }
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
      router.push(`/?id=${restaurant_id}&table=${table_number}`);
    }
  }, [countdown, restaurant_id, table_number, router]);
  

  if (!responsecome) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <>
      <BillHeader name={restaurant_name} id={restaurant_id} table={table_number}/>
      <div className="flex flex-col justify-center items-center bg-[#FFF9EA] px-4 mb-20 mt-6">
        <Toaster />

        <div className="text-lg flex mt-4 justify-center items-center space-x-4 text-[#441029] w-full">
          <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-transparent to-[#441029]"></div>
          <p className="lg:text-lg text-[18px] uppercase tracking-widest">
            Your Bill
          </p>
          <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-[#441029] to-transparent"></div>
        </div>

        <p className="text-sm text-[#4E0433] mb-6">Happy you! Happy us!</p>
        {orderDetails &&<Billcomponent name={restaurant_name} order={orderDetails} qrcode={qrcode}/>}
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
        <button
          // onClick={() =>
          //   router.push(`/Menu?id=${restaurant_id}&table=${table_number}`)
          // }
          className="mt-10 px-4 py-2 bg-[#441029] text-white rounded-md"
        >
          Leave a review
        </button>
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </>
  );
}

export default Bill;
