"use client";
import Image from "next/image";
import logo from "../assets/baksish1.png";
import group from "../assets/Group.svg";
import chefHat from "../assets/Chef Hat Icon.svg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Footer from "./Footer";

// function Landing() {

//   return (<>
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F2EA] relative">

//       <div className="absolute top-0 left-0 bg-[#F8F2EA] p-2 rounded-md">
//         <Image src={chefHat} alt="Chef Hat Icon" width={200} height={200} />
//       </div>
//       <div className="relative z-10 text-center" style={{ marginBottom: '2rem' }}>
//         <div className="bg-[#F8F2EA] p-2 rounded-md mb-4" style={{ marginBottom: '2rem' }}>
//           <div className="border-2 border-[#5D203A] bg-white rounded-lg flex items-center justify-center mx-auto" style={{ maxWidth: '240px', height: '80px', marginTop: '-100px' }}>
//             <Image src={logo} alt="BakSish Logo" width={220} height={70} />
//           </div>
//         </div>
//         <div className="flex flex-col space-y-4">
//           <Link className="bg-[#5D203A] text-white py-3 px-5 rounded-full mx-auto text-sm " href={`/PreviousOrders?id=${id}&table=${table_number}`}>Previous Orders</Link>
//           <Link className="bg-[#5D203A]  text-white py-3 px-9 rounded-full mx-auto text-sm " href={`/Menu?id=${id}&table=${table_number}`}>New Order</Link>
//           <Link className="bg-[#5D203A] text-white py-3 px-12 rounded-full mx-auto text-sm " href={`/GenerateBill?id=${id}&table=${table_number}`}>Get Bill</Link>
//         </div>
//       </div>
//       <div className="absolute left-0 top-1/2 transform -translate-y-1/2  flex items-center justify-center h-[200px]" >
//         <div className="text-center text-[#7F2A3A] font-bold border-2 pr-3 rounded-e-xl border-l-transparent border-[#7F2A3A] px-2 py-4 text-lg leading-tight bg-white">
//           <span className="block">T</span>
//           <span className="block">R</span>
//           <span className="block">E</span>
//           <span className="block">A</span>
//           <span className="block">T</span>
//           <div style={{ height: '10px' }}></div>
//           <div style={{ height: '10px' }}></div> {/* Added space */}
//           <span className="block">U</span>
//           <span className="block">S</span>
//         </div>
//       </div>
//       <div className="absolute right-0 top-1/2 transform -translate-y-1/2  flex items-center justify-center h-[200px]">
//         <div className="text-center text-[#7F2A3A] font-bold pl-3 border-r-transparent border-2 border-[#7F2A3A] p-2 rounded-s-xl text-lg leading-tight bg-white">
//           <span className="block">R</span>
//           <span className="block">E</span>
//           <span className="block">V</span>
//           <span className="block">I</span>
//           <span className="block">E</span>
//           <span className="block">W</span>
//           <div style={{ height: '10px' }}></div>
//           <div style={{ height: '10px' }}></div> {/* Added space */}
//           <span className="block">U</span>
//           <span className="block">S</span>
//         </div>
//       </div>
//       <div className="absolute bottom-0 object-cover object-bottom left-0 w-screen">
//         <Image src={group}  alt="Group Image" layout="responsive"  />
//       </div>

//     </div>
//     <Footer/>
//     </>
//   );
// }

// export default Landing;

import border from "../assets/Group_32.png";
// import Image from "next/image";
import cheif from "../assets/iconfood.png";
import heading from "../assets/heading.png";
const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const table_number = searchParams.get("table");
  return (
    <>
      <div className="w-screen h-screen relative bg-gradient-to-bl overflow-hidden  from-[#430123] to-[#5A0132]">
        <Image
          src={border}
          className="  absolute  top-3 left-3 lg:hidden block   h-[93%] w-[94%] "
          alt="bg"
          priority
          width={300}
          height={3000}
        />
        {/*  */}
        <div className="relative h-64 flex justify-center items-center lg:mt-32 mt-10">
          <Image
          alt="heading"
            src={heading}
            height={500}
            width={500}
            className="h-72 w-72 mx-auto  centered-axis-x "
          />
          <h1 className=" tracking-widest text-center -mt-3 poppins-bold uppercase text-white text-3xl ">
            test of china
          </h1>
        </div>
        <div className="flex justify-center  items-center lg:flex-row  flex-col lg:space-y-0 lg:space-x-4 space-y-6 mt-8">
          <Link href={`/PreviousOrders?id=${id}&table=${table_number}`}  className="border-2 poppins-semibold text-center w-40 z-50 border-[#FFF9EA] bg-[#440129] px-4 rounded-full text-[#FFF9EA] py-3">
            Previous Order
          </Link>
          <Link href={`/Menu?id=${id}&table=${table_number}`}  className="border-2 text-center poppins-semibold w-40 border-[#FFF9EA] z-50 bg-[#440129] px-4 rounded-full text-[#FFF9EA] py-3">
            New Order
          </Link>
          <Link href={`/GenerateBill?id=${id}&table=${table_number}`}  className="border-2 text-center poppins-semibold w-40 border-[#FFF9EA] bg-[#440129] px-4 z-50 rounded-full text-[#FFF9EA] py-3">
            Get Bill
          </Link>
        </div>
        <Image
          className="absolute z-10  bottom-6 w-[80%]  -right-2 lg:hidden block "
          src={cheif}
          alt="bottomimg"
          width={1000}
          height={1000}
        />
      </div>
    </>
  );
};

export default page;
