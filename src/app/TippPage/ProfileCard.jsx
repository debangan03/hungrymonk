import React from 'react'
import Heading from '../Menu/Heading'

function ProfileCard({member}) {
  return (
    <div  className="  p-[4px] rounded-t-lg relative border-[#661268] border-2 border-b-0 ">
    <img
      src={member.imgSrc}
      alt={member.name}
      className="object-cover w-full h-44 rounded-t-lg"
    />
    <h2 className=" font-bold">{member.name}</h2>
    <div className=' flex justify-center items-center space-x-1'>
        <div className='w-[30%] h-[2px] bg-gradient-to-r from-transparent to-[#666666]'></div>
        <p className='text-[0.7rem] bg-yellow-300 rounded-full px-1'>{"chef"}</p>
        <div className='w-[30%] h-[2px] bg-gradient-to-r from-[#666666] to-transparent'></div>
    </div>
  </div>
  )
}

export default ProfileCard