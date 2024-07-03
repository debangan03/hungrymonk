import { Inter } from "next/font/google";

import Header from "../Menu/Header";
import Footer from "../Menu/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Treat The Team | Baksish",
};

export default function TippLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header/> */}
        {children}
        {/* <Footer/> */}
        </body>
    </html>
  );
}
