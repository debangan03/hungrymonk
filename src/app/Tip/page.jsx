"use client";
import React, { useState } from "react";
import Team from "./Team";
import Footer from "./Footer";
import vector from "../assets/maskb.png";
import Image from "next/image";

function page() {
  const [tipamount, settipamount] = useState("");
  const [isbuttonloading, setisbuttonloading] = useState(false)
  const handlesubmit=()=>{
    //alert("clicked")
  }
  return (
    <div className="min-h-screen max-w-screen bg-[#FFF9EA] ">
      <div className="bg-[#661268] text-[#FFF9EA] p-4 flex">
        <Image
          src={vector}
          alt=""
          className=" -rotate-180 w-32 -my-7 -mx-5 absolute top-0 left-0 z-0"
        />
        <p className=" text-2xl -my-1 text-center mx-auto">Gratitude Corner</p>
      </div>
      <div className=" justify-items-center gap-2 gap-y-5 items-center mt-8 mb-8 p-2 grid md:grid-cols-4 grid-cols-3">
        <Team />
        <Team />
        <Team />
        <Team />
        <Team />
      </div>
      <div className="text-stone-600 mx-4 flex mb-4 justify-between rounded-lg p-4 drop-shadow-sm shadow-xl">
        <p className=" text-[12px]">
          Like our Services ?<br />
          You can gift us for good service
        </p>
        <input
          type="number"
          value={tipamount}
          onChange={(e) => {
            settipamount(e.target.value);
          }}
          placeholder="₹100"
          className="px-2 rounded-lg w-20 border-2 border-[#661268] mr-2"
        />
        <button onClick={()=>{ setisbuttonloading(true);handlesubmit()}} disabled={isbuttonloading} className="bg-[#661268] disabled:scale-95 disabled:opacity-45 px-3 rounded-lg text-[#FFF9EA]">TREAT
        </button>
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
        <h2 className="text-center text-xl font-sans text-[#661268] italic mx-4 mb-10">" Your feedback and generosity are the ingredients that make us better. Thank you for your valuable appreciation! "</h2>
      <Footer />
    </div>
  );
}

export default page;
