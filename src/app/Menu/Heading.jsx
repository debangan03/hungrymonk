import React from 'react'

function Heading({heading}) {
  return (
    <div className='text-lg flex mt-4 p-4 justify-center items-center space-x-4 text-[#565556] w-full'>
        <div className='lg:w-40 w-24 h-[2px] bg-gradient-to-r from-transparent to-[#666666]'></div>
        <p className='lg:text-lg text-[14px] uppercase tracking-widest'>{heading}</p>
        <div className='lg:w-40 w-24 h-[2px] bg-gradient-to-r from-[#666666] to-transparent'></div>
        </div>
  )
}

export default Heading