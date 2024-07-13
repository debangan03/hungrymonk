"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmCard from "./ConfirmCard";
import { useDispatch, useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRouter, useSearchParams } from "next/navigation";
import { clearCart } from "../redux/CartSlice";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Pageloader from "../loaders/pageloader";

function ConfirmOrder() {
  const searchParams = useSearchParams();
  const cart = useSelector((state) => state?.cart);
  console.log(cart);
  const [isHydrated, setIsHydrated] = useState(false);
  const [notes, setnotes] = useState("");
  const [isbuttonloading, setisbuttonloading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const [sgst, setsgst] = useState("");
  const [cgst, setcgst] = useState("");
  function setLocalStorage(key, value, hours) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + hours * 60 * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  useEffect(() => {
    if (!cart || cart?.items?.length <= 0) {
      toast.error("Cart is empty, please add items to proceed");
      router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
    }
    const fetchtaxrates = async () => {
      try {
        const res = await axios.post(`/api/fetchrestaurantmenu`, {
          restaurant_id,
        });
        console.log(res.data.data);
        setcgst(res.data.data.cgst);
        setsgst(res.data.data.sgst);
      } catch (e) {
        toast.error(
          "Failed to fetch details. Please try again after refreshing."
        );
      }
    };
    fetchtaxrates();
  }, []);

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

  let savedcustomerid;
  let savedorderid;
  let savedrestaurantid;
  if (typeof window !== "undefined") {
    savedcustomerid = localStorage.getItem("customerId");
    savedorderid = getLocalStorage("orderId");
    savedrestaurantid = localStorage.getItem("restaurantId");
  } else {
    return (
      <div>
        <Pageloader />
      </div>
    );
  }

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleplaceorder = async () => {
    if (savedrestaurantid != restaurant_id) {
      localStorage.removeItem("restaurantId");
      localStorage.removeItem("orderId");
    }
    console.log(savedrestaurantid, savedorderid, savedcustomerid);
    const customerId =
      savedcustomerid == null || savedcustomerid == ""
        ? ("CUS_" + uuidv4()).toString()
        : savedcustomerid;
    const nettax = (0.01*(
      cart.totalPrice *
      (parseFloat(cgst) + parseFloat(sgst))
    )).toFixed(2);
    if (
      savedorderid == null ||
      savedrestaurantid == null ||
      savedorderid == "" ||
      savedrestaurantid == ""
    ) {
      const orderId = ("ORD_" + uuidv4()).toString(); // Replace this with the actual customer ID logic if needed
      localStorage.setItem("customerId", customerId); // Store customer ID in local storage
      setLocalStorage("orderId", orderId, 4);
      localStorage.setItem("restaurantId", restaurant_id);

      const orderDetails = {
        customer_id: customerId, // Include customer ID in the order details
        order_id: orderId,
        restaurant_id: restaurant_id,
        table_number: table_number,
        order_items: [
          {
            items: cart.items,
            notes: notes,
            item_total: cart.totalPrice.toFixed(2),
            charges: nettax,
            total_price: (
              parseFloat(cart.totalPrice) + parseFloat(nettax)
            ).toFixed(2),
            status: "Ordered",
          },
        ],
        total_quantity: cart.totalQuantity,
        initial_bill: cart.totalPrice.toFixed(2),
        tax: nettax,
        total_bill: (parseFloat(cart.totalPrice) + parseFloat(nettax)).toFixed(
          2
        ),
      };
      console.log(cgst,sgst,nettax);
      const res = await axios.post("api/createneworder", orderDetails);

      // Redirect to the success page with order details
      if (res.data.success) {
        setTimeout(() => {
          dispatch(clearCart());
        }, 2000);

        router.push(
          `/OrderSuccess?id=${restaurant_id}&table=${table_number}&orderId=${orderId}`
        );
      } else {
        localStorage.removeItem("restaurantId");
        localStorage.removeItem("orderId");
        setisbuttonloading(false);
        toast.error(res.data.error);
      }
    } else {
      const orderId = savedorderid; // Replace this with the actual customer ID logic if needed
      const orderDetails = {
        order_id: orderId,
        new_order_items: {
          items: cart.items,
          notes: notes,
          item_total: cart.totalPrice.toFixed(2),
          charges: nettax,
          total_price: (
            parseFloat(cart.totalPrice) + parseFloat(nettax)
          ).toFixed(2),
          status: "Ordered",
        },
        cgst: cgst,
        sgst: sgst,
        new_total_quantity: cart.totalQuantity,
        new_initial_bill: cart.totalPrice.toFixed(2),
        // tax:(cart.totalPrice * 0.18).toFixed(2),
        // total_bill: (cart.totalPrice * 1.18).toFixed(2),
      };
      const res = await axios.post("api/updateexistingorder", orderDetails);

      // Redirect to the success page with order details
      if (res.data.success) {
        setTimeout(() => {
          dispatch(clearCart());
        }, 2000);
        router.push(
          `/OrderSuccess?id=${restaurant_id}&table=${table_number}&orderId=${orderId}`
        );
      } else {
        setisbuttonloading(false);
        toast.error(res.data.error);
      }
    }
  };

  if (!isHydrated) {
    return (
      <div>
        <Pageloader />
      </div>
    ); // You can replace this with a skeleton loader or a spinner
  }

  return (
    <div>
      <Toaster />
      <header>
        <div className="h-16 bg-[#661268] flex justify-between px-4 items-center">
          <div>
            <h1 className="text-xl font-semibold text-[#fff9ea]">Cart</h1>
            <p className="text-white text-sm">
              You pay: ₹ {(cart?.totalPrice * 1.18).toFixed(2)}
            </p>
          </div>
          <Link
            href={`/Menu?id=${restaurant_id}&table=${table_number}`}
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
          <h2 className="pl-1 text-sm italic font-light">
            Add notes for the Chef (if you want any) :
          </h2>
          <div className="h-fit min-h-10  bg-white">
            <textarea
              id="message"
              rows="2"
              value={notes}
              onChange={(e) => setnotes(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-[#661268] "
              placeholder="Write your thoughts here..."
            ></textarea>
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
                  <InfoOutlinedIcon className="h-[1px] w-[1px]" />
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
          onClick={() => {
            setisbuttonloading(true);
            handleplaceorder();
          }}
          disabled={isbuttonloading}
          className="bg-white border-2 px-4 py-2 w-full rounded-lg text-[#661268] tracking-[0.5rem] font-extrabold relative"
        >
          {isbuttonloading ? (
            <svg
              className="animate-spin h-5 w-5 text-[#661268] absolute left-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
          {isbuttonloading ? "PLACING ORDER" : "PLACE ORDER"}
        </button>
      </footer>
    </div>
  );
}

export default ConfirmOrder;
