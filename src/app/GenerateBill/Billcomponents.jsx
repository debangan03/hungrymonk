"use client";
import {
  DownloadForOffline,
  Print,
  SimCardDownload,
} from "@mui/icons-material";
import { Chip, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import LoadingPage from "../loaders/LoadingPage";

function Billcomponent({name,order,qrcode}) {

  console.log(order);
  const date = new Date(order[0].createdAt);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return (
    <>
      {order && (
        <div>
          <div id="invoice" className=" bg-white mx-0 py-8 mt-4 p-3 shadow-md  ">
            <Typography variant="h6" align="center" className="font-bold mb-4">
              {name.toUpperCase()}
            </Typography>
            
            <div className="my-4 flex items-center justify-center text-center">
              <span className="w-1/4 h-[1px] border-[1px] border-dashed border-black"></span>
              <span>&nbsp;TAX INVOICE&nbsp;</span>
              <span className="w-1/4 h-[1px] border-[1px] border-dashed border-black"></span>
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body2">
                Bill No.: XXX
              </Typography>
              <Typography variant="body2">
                Date: {day}/{month}/{year}
              </Typography>
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body2">
                Table No: {order[0].table_number}
              </Typography>
              <Typography variant="body2">
                Time: {hours}:{minutes}:{seconds}
              </Typography>
            </div>
            <div className="border-t-2 mt-4 border-b-2 py-2 mb-4 border-dotted border-gray-400">
              <div className="flex justify-start mb-2 mr-1 space-x-4 border-b-2 pb-1 border-dotted border-gray-400">
                <Typography variant="body2" className="w-[50%]">
                  Description
                </Typography>
                <Typography variant="body2" className="w-[15%] ">
                  Qty.
                </Typography>
                <Typography variant="body2" className="w-[15%] ">
                  Price
                </Typography>
                <Typography variant="body2" className="w-[15%] ">
                  Value
                </Typography>
              </div>

              {/* Repeat for each item */}
              {order[0].order_items.map((orderitems, j) => (
                <span key={j}>
                  {orderitems.items.map((item, k) => (
                    <div key={k} className="flex justify-start mt-1 space-x-4">
                      <Typography variant="body2" className="w-[50%]">
                        {item.food.name.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" className="w-[15%]">
                        {parseFloat(item.quantity).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" className="w-[15%]">
                        {parseFloat(item.food.price).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" className="w-[15%]">
                        {(
                          parseFloat(item.quantity) *
                          parseFloat(item.food.price)
                        ).toFixed(2)}
                      </Typography>
                    </div>
                  ))}
                </span>
              ))}
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body2" className="">
                SUBTOTAL:
              </Typography>
              <Typography variant="body2" className="">
                {order[0].initial_bill}
              </Typography>
            </div>
            <div className="flex justify-between mb-2">
              <Typography variant="body2">
                Taxes:
              </Typography>
              <Typography variant="body2">{order[0].tax}</Typography>
            </div>
            <div className="flex border-t-2 border-b-2 py-2 border-gray-300 justify-between mb-2">
              <Typography variant="body1" className="font-bold text-xl">
                TOTAL
              </Typography>
              <Typography variant="body1" className="font-bold text-xl">
                ₹ {order[0].total_bill}
              </Typography>
            </div>
            <div className="text-[0.52rem] text-center">
            This is not the official bill. Please obtain the original from the reception desk.</div>
            <div className="flex mt-6 mb-2 items-center  mx-auto justify-center">
              <Image
                src={qrcode}
                alt="qr code"
                width={100}
                height={100}
                className="w-32 h-32 border-2 p-0 border-black"
              />
            </div>
            <Typography variant="body2" align="center" className="mt-2">
              Like our service? Scan to treat our team.
            </Typography>
            <div className="mt-4"><Typography variant="body2" align="center">
              Thank you! Please visit us again.
              <br />
              Have a nice day!
            </Typography>
            </div>
          </div>
          
        </div>
      )}
    </>
    
  );
}

export default Billcomponent;
