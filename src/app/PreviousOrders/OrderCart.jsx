import React from 'react';
import icon from '../assets/Rectangle 27.png';
import Image from 'next/image';

function OrderCart() {
  return (
    <div className='min-w-[220px] p-2 flex justify-center items-center space-x-4 border-[1px] border-[#966729] rounded-lg'>
      <Image src={icon} width={50} height={70} alt='icon' className='h-14 w-10' />
      <div className='lg:text-base text-sm space-y-1 relative'>
        <p>Pepper Barbecue Chicken</p>
        <p className='text-[.8rem]'>₹255</p>
        <button className='absolute right-0 bottom-0 border-[1px] px-3 border-[#DCBB69] rounded-md text-[#966729] font-semibold py-[1px] text-sm'>
          Add <sup>+</sup>
        </button>
      </div>
    </div>
  );
}

export default OrderCart;
