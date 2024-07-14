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
      if (typeof window !== "undefined") {
        const orderId = getLocalStorage("orderId");
        if (orderId != null) {
          const getorder = async () => {
            const res = await axios.post("/api/fetchspecificorder", {
              orderId: orderId,
            });
            setresponsecome(true);
            console.log(res.data);
            if (!res.data.success) {
              toast.error(
                "Seems like you haven't yet ordered"
              );
              
                window.location=`/?id=${restaurant_id}&table=${table_number}`;
              
            } else {
                
                const qrres = await axios.post("/api/getqrcodefortip", {
                  url: `${process.env.NEXT_PUBLIC_QR_URL}/Tip?id=${restaurant_id}`,
                });
                console.log(qrres.data);
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
          
            window.location=`/?id=${restaurant_id}&table=${table_number}`;
          
        }
      } else {
        setresponsecome(true);
        toast.error(
          "Failed to generate your bill. Please ask in-person to the waiter"
        );
        
          window.location=`/?id=${restaurant_id}&table=${table_number}`;
        
      }
    } catch (error) {
      //console.error("Failed to generate your bill", error);
      toast.error(
        "Failed to generate your bill. Please ask in-person to the waiter"
      );
      
        window.location=`/?id=${restaurant_id}&table=${table_number}`;
      
      
    }
  }, []);

  

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

        <div className="text-lg flex mt-4 justify-center items-center space-x-4 text-[#661268] w-full">
          <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-transparent to-[#661268]"></div>
          <p className="lg:text-lg text-[18px] uppercase tracking-widest">
            Your Bill
          </p>
          <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-[#661268] to-transparent"></div>
        </div>

        <p className="text-sm text-[#4E0433] mb-6">Happy you! Happy us!</p>

        
        {orderDetails &&<Billcomponent name={restaurant_name} order={orderDetails} qrcode={qrcode}/>}
        <button
          // onClick={() =>
          //   router.push(`/Menu?id=${restaurant_id}&table=${table_number}`)
          // }
          className="mt-10 px-4 py-2 bg-[#661268] text-white rounded-md"
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
