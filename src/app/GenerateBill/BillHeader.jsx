import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import goldbg from "../assets/goldbg.png";
import maskvector from "../assets/Mask_group.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useRouter } from 'next/navigation';
function BillHeader({name,id,table}) {
  const router = useRouter();
  return (
    <div><div className="h-[170px] relative w-screen bg-gradient-to-b from-[#FFF9EA] mix-blend-multiply to-[#F5EC02]/30">
    <Image
      alt="bgbanner"
      src={maskvector}
      className="absolute top-0 left-0"
    />
    <h1 className="text-4xl pt-14 text-center font-semibold text-[#3d3d3d] ">
          {name}
        </h1>
        <div className="mb-6 w-48 text-center mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#a09fa0] to-transparent"></div>
    
    <div className="flex relative justify-center items-center mt-4">
      <button
      type="button"
        onClick={()=>{router.push(`/Tip?id=${id}&table=${table}`)}}
        className="bg-[#6C0345] rounded-full py-1 px-4 text-[#FFF9EA] flex justify-center items-center hover:scale-90 duration-700"
      >
        Treat the team
        
        <ArrowRightAltIcon />
      </button>
    </div>
  </div></div>
  )
}

export default BillHeader