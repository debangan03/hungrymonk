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
import LoadingPage from "../loaders/LoadingPage";

function ConfirmOrder() {
  const searchParams = useSearchParams();
  const cart = useSelector((state) => state?.cart);
  //console.log(cart);
  const [isHydrated, setIsHydrated] = useState(false);
  const [notes, setnotes] = useState("");
  const [isbuttonloading, setisbuttonloading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const [sgst, setsgst] = useState("");
  const [cgst, setcgst] = useState("");
  const [tax, settax] = useState("");
  const [nooftables, setnooftables] = useState("")
  const [savedcustomerid, setsavedcustomerid] = useState(null);
  const [savedorderid, setsavedorderid] = useState(null);
  const [savedrestaurantid, setsavedrestaurantid] = useState(null);


  const checkvalidorderid = async (order_id) => {
    try {
      const resvalid = await axios.post("/api/fetchvalidorder", { order_id });
      //
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
    const initialize = async () => {
      if (!cart || cart?.items?.length <= 0) {
        toast.error("Cart is empty, please add items to proceed");
        router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
      }

      const fetchtaxrates = async () => {
        try {
          const res = await axios.post(`/api/fetchrestaurantmenu`, {
            restaurant_id,
          });
          //console.log(res.data.data);
          setcgst(res.data.data.cgst);
          setsgst(res.data.data.sgst);
          setnooftables(res.data.data.nooftables);
          settax(
            (
              0.01 *
              (parseFloat(res.data.data.cgst) + parseFloat(res.data.data.sgst))
            ).toFixed(2)
          );
        } catch (e) {
          toast.error(
            "Failed to fetch details. Please try again after refreshing."
          );
        }
      };

      await fetchtaxrates();

      const checkallids = async () => {
        const customerId = localStorage.getItem("customerId");
        const orderId = localStorage.getItem("orderId");
        const restaurantId = localStorage.getItem("restaurantId");

        const validOrderId = await checkvalidorderid(orderId);
        setsavedcustomerid(customerId);
        setsavedorderid(validOrderId);
        setsavedrestaurantid(restaurantId);
      };

      await checkallids();
    };

    initialize();
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleplaceorder = async () => {
    if(parseFloat(cart.totalPrice)>0 || cart.totalQuantity>0){
    if (savedrestaurantid != restaurant_id) {
      localStorage.removeItem("restaurantId");
      localStorage.removeItem("orderId");
    }

    const customerId =
      savedcustomerid == null || savedcustomerid == ""
        ? ("CUS_" + uuidv4()).toString()
        : savedcustomerid;

    const nettax = (
      0.01 *
      (cart.totalPrice * (parseFloat(cgst) + parseFloat(sgst)))
    ).toFixed(2);
    
    if (
      savedorderid == null ||
      savedrestaurantid == null ||
      savedorderid == "" ||
      savedrestaurantid == ""
    ) {
      if(table_number>=0 && table_number<=parseInt(nooftables)){
      const orderId = ("ORD_" + uuidv4()).toString();
      localStorage.setItem("customerId", customerId);
      localStorage.setItem("orderId", orderId);
      localStorage.setItem("restaurantId", restaurant_id);

      const orderDetails = {
        customer_id: customerId,
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

      const res = await axios.post("api/createneworder", orderDetails);

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
    }
    else{
      toast.error("Invalid Table Number. Please rescan the QR and try creating your order.")
      setisbuttonloading(false)
    }
    } else {
      const orderId = savedorderid;
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
      };
      const res = await axios.post("api/updateexistingorder", orderDetails);

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
  }
  else{
    toast.error("Please select an item before placing an order")
    setisbuttonloading(false)
  }
  };

  if (!isHydrated) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <header>
        <div className="h-16 bg-[#441029] flex justify-between px-4 items-center">
          <div>
            <h1 className="text-xl font-semibold text-[#fff9ea]">Cart</h1>
            <p className="text-white text-sm">
              You pay: ₹ {(
                  parseFloat(cart?.totalPrice) +
                  parseFloat(cart?.totalPrice * tax)
                ).toFixed(2)}
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
          <ConfirmCard key={i} item={item} cart={cart}/>
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
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-[#441029] "
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
                Taxes{" "}
                <sup className="rounded-full text-[#6C0345] ">
                  <InfoOutlinedIcon className="h-[1px] w-[1px]" />
                </sup>
              </span>
              <span className="text-gray-700">
                ₹ {parseFloat(cart?.totalPrice * tax).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between mt-2">
              <span className="font-bold text-gray-700">Grand Total</span>
              <span className="font-bold text-gray-700">
                ₹{" "}
                {(
                  parseFloat(cart?.totalPrice) +
                  parseFloat(cart?.totalPrice * tax)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="h-[100px] fixed bottom-0 w-full bg-[#441029] p-4 text-white flex justify-center items-center">
        <button
          onClick={() => {
            setisbuttonloading(true);
            handleplaceorder();
          }}
          disabled={isbuttonloading}
          className="bg-white border-2 px-4 py-2 w-full rounded-lg text-[#441029] tracking-[0.5rem] font-extrabold relative"
        >
          {isbuttonloading ? (
            <svg
              className="animate-spin h-5 w-5 text-[#441029] absolute left-4"
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
