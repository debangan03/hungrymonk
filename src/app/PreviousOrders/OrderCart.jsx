import React from 'react';
import icon from '../assets/Rectangle 27.png';
import Image from 'next/image';

function OrderCart({item}) {
  return (
    <div className='min-w-[270px] min-h-[100px] p-2 flex justify-start items-center space-x-4 border-[1px] border-[#966729] rounded-lg'>
      <Image src={icon} width={50} height={70} alt='icon' className='h-14 w-10' />
      <div className='lg:text-base w-[200px] text-sm space-y-1 relative'>
        <p className='text-[1rem]'>{item.food.name.slice(0,22)}</p>
        <p className='text-[.8rem]'>Price : ₹{item.food.price}</p>
        <p className='text-[.8rem]'>Qty : {item.quantity}</p>
        <button className='absolute right-0 bottom-0 border-[1px] px-5 border-[#DCBB69] rounded-md text-[#966729] font-semibold py-[2px] text-sm'>
          Add <sup>+</sup>
        </button>
      </div>
    </div>
  );
}

export default OrderCart;
