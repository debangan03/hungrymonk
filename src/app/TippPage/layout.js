import { Inter } from "next/font/google";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

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
