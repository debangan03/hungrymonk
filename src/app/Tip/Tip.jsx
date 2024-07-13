"use client";
import React, { useEffect, useState } from "react";
import Team from "./Team";
import Footer from "./Footer";
import vector from "../assets/maskb.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import PaymentLoader from "./PaymentLoader";
import Pageloader from "../loaders/pageloader";

function Tip() {
  const [tipamount, settipamount] = useState("50");
  const [isbuttonloading, setisbuttonloading] = useState(false);
  const [waiternotfound, setwaiternotfound] = useState(false);
  const searchParams = useSearchParams();
  const [selectedwaiters, setselectedwaiters] = useState([]);
  const restaurant_id = searchParams.get("id");
  const router = useRouter();
  const [waiterdata, setwaiterdata] = useState([]);
  const [review, setreview] = useState("");
  const [isProcessingPayment, setisProcessingPayment] = useState(false);
  useEffect(() => {
    const fetchwaiters = async () => {
      const res = await axios.post("/api/fetchwaiters", { restaurant_id });
      console.log(res.data);
      if (res.data.success && res.data.data.length > 0) {
        setwaiterdata(res.data.data);
      } else {
        setwaiternotfound(true);
      }
    };
    fetchwaiters();
  }, []);

  const addandremovewaiter = (waiter_id) => {
    console.log(selectedwaiters);
    if (selectedwaiters.includes(waiter_id)) {
      setselectedwaiters(selectedwaiters.filter((id) => id !== waiter_id));
    } else {
      setselectedwaiters([...selectedwaiters, waiter_id]);
    }
  };

  const handlePayment = async () => {
    const res = await axios.post("/api/tipcreateorder", {
      amount: parseInt(tipamount) * 100,
      reciept: "abcd",
    });
    if (res.data.success) {
      const data = res.data.data;
      console.log(data);
      if (data.id) {
        const initiateTransactionToDatabase = await axios.post(
          "/api/prepaymentDatabase",
          {
            orderId: data.id,
            restaurant_id: restaurant_id,
            employees: selectedwaiters,
            review: review,
            amount: data.amount,
          }
        );

        // if (res_initiateTransactionToDatabase.success) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Baksish",
          description: "Treat from the customer",
          image: "https://i.ibb.co/GdjdKb9/Untitled-design-2.png",
          order_id: data.id,
          handler: async function (response) {
            setisProcessingPayment(true); // Show loader during payment processing
            const verificationRes = await axios.post(
              "/api/tipverifyorderpayment",
              {
                order_id: data.id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }
            );
            if (verificationRes.data.success) {
              router.push("https://baksish.in");
            } else {
              alert("Payment verification failed");
              window.location.reload();
            }
            setisProcessingPayment(false); // Hide loader after payment processing
          },
          prefill: {
            name: "Baksish",
            email: "baksish247@gmail.com",
            contact: 9900990099,
          },
          notes: {
            address: "Razorpay Corporate Office",
            employees: selectedwaiters,
          },
          theme: {
            color: "#fde047",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        setisbuttonloading(false);
        //setIsLoading(false);
      } else {
        alert(
          "Failed to initiate payment. Please reload the page and try again."
        );
      }
    }
  };

  if (!waiterdata || (waiterdata.length == 0 && !waiternotfound)) {
    return (
      <div>
        <Pageloader />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-screen bg-[#FFF9EA] ">
      {isProcessingPayment && (
        <div className="fixed inset-0 flex flex-col z-50 items-center justify-center bg-black/30 backdrop-blur-lg">
          <PaymentLoader />
          <span className="text-white mt-2">
            Verifying your payment <br /> Do not close the window
          </span>
        </div>
      )}
      <div className="bg-[#661268] text-[#FFF9EA] p-4 flex">
        <Image
          src={vector}
          alt=""
          className=" -rotate-180 w-32 -my-7 -mx-5 absolute top-0 left-0 z-0"
        />
        <p className=" text-2xl -my-1 text-center mx-auto">Gratitude Corner</p>
      </div>
      {waiternotfound && (
        <div className="mt-20 text-center mb-10">
          <p className="text-xl">Treat our team !</p>
          <p className="text-lg">Your appreciation matters</p>
          <p className="text-md">Help us improve with your valuable feedback</p>
        </div>
      )}
      {waiterdata && (
        <div className=" justify-items-center gap-2 gap-y-5 items-center mt-8 mb-8 p-2 grid md:grid-cols-4 grid-cols-3">
          {waiterdata.map((waiter, i) => (
            <Team
              key={i}
              data={waiter}
              addandremovewaiter={addandremovewaiter}
            />
          ))}
        </div>
      )}
      <div className="flex  text-stone-800 justify-center mx-4 space-x-2">
        <textarea
          onChange={(e) => {
            setreview(e.target.value);
          }}
          value={review}
          rows="2"
          placeholder="Write your review here..."
          className="px-2 pl-4 text-sm py-1 rounded-lg h-[3.4rem] w-10/12 border-2 border-[#661268] mr-2"
        />
      </div>
      <div className="text-stone-800 mx-3 flex mb-4 justify-between rounded-lg py-4 px-2 drop-shadow-sm shadow-xl">
        <div>
          <p className=" text-[12px]">
            Like our Services ?<br />
            You can gift us for good service!
          </p>
        </div>
        <div className="flex justify-center">
          <span className="relative">
            <input
              type="number"
              value={tipamount}
              onChange={(e) => {
                settipamount(e.target.value);
              }}
              placeholder="100"
              className="px-2 pl-4 rounded-lg  h-14 w-20 border-2 border-[#661268] mr-2"
            />
            <span className="absolute left-2 top-4">
              <p className="z-10 text-stone-800">₹</p>
            </span>
          </span>
          <button
            onClick={() => {
              setisbuttonloading(true);
              handlePayment();
            }}
            disabled={tipamount == "" || isbuttonloading || parseInt(tipamount)<10}
            className="bg-[#661268] w-32 disabled:scale-95 disabled:opacity-45 px-3 rounded-lg text-[#FFF9EA]"
          >
            {isbuttonloading ? "LOADING" : "TREAT"}
          </button>
        </div>
      </div>
      <div className="flex mt-8 mb-10 items-center justify-center">
        <button
          // onClick={() =>
          //   router.push(`/Menu?id=${restaurant_id}&table=${table_number}`)
          // }
          className="px-4 py-2 bg-[#661268] text-white rounded-md"
        >
          Leave a rating
        </button>
      </div>
      <h2 className="text-center text-xl font-sans text-[#661268] italic mx-4 mb-10">
        " Your feedback and generosity are the ingredients that make us better.
        Thank you for your valuable appreciation! "
      </h2>
      <Footer />
    </div>
  );
}

export default Tip;
