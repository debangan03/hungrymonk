import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Menu/Header";
import Footer from "./Menu/Footer";
import CartProvider from "./redux/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </CartProvider>
  );
}
