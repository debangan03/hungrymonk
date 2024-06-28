// components/Layout.js
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import goldbg from "../assets/goldbg.jpg";
import maskvector from "../assets/Mask_group.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Layout = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust this value as needed
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div >
      {" "}
      <div
        className={`search px-10 relative ${
          isSticky ? "sticky top-0 bg-[#FFF9EA] text-black shadow-md" : "absolute top-20 w-full text-[#FFF9EA]"
        }`}
      >
        <input
          type="text"
          className="px-4 py-3 shadow-md bg-white w-full rounded-full"
        />
        <SearchIcon className="absolute top-3 text-[#4E0433] h-6 left-12" />
      </div>
      <main isSticky={isSticky}>{children}</main>
    </div>
  );
};

export default Layout;
