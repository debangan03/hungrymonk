"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import goldbg from "../assets/gbg.png";
import EastIcon from '@mui/icons-material/East';
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity, hydrate } from "../redux/CartSlice";
import Link from "next/link";

function Orderviewer({id,table}) {
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if(typeof window !== 'undefined'){
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = JSON.parse(localStorage.getItem('totalQuantity')) || 0;
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;
    
    // Dispatch an action to hydrate the cart state
    if (items.length > 0 || totalQuantity > 0 || totalPrice > 0) {
      dispatch(hydrate({ items, totalQuantity, totalPrice }));
    }
    setIsHydrated(true);
   } // Mark as hydrated after initial load
  }, [dispatch]);

  if (!isHydrated || cart.totalQuantity === 0) {
    return null; // Don't render the component if not hydrated or cart is empty
  }

  return (
    <section>
      <main className="fixed bottom-[8px] w-full border-t-2 border-[#6C0345] z-50">
        <div className="flex justify-between lg:px-10 px-4 relative items-center h-16 p-2">
          <Image
            src={goldbg}
            alt="bg"
            width={10000}
            priority
            className="-z-10 absolute top-0 left-0"
            height={1000}
          />
          <h2 className="text-[#6C0345] font-bold text-xl mt-2">
            {cart?.totalQuantity} item added <EastIcon />
          </h2>
          <Link href={`/ConfirmOrder?id=${id}&table=${table}`} className="px-6 py-2 mt-2 bg-white border-2 rounded-md text-[#6C0345] border-[#6C0345]">
            Review order
          </Link>
        </div>
      </main>
    </section>
  );
}

export default Orderviewer;
