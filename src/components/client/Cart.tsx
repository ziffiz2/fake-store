"use client";
import Image from 'next/image';
import bagIcon from '@/assets/icons/bag.svg'; 

const Cart = () => {
  return (
    <div className="text-slate-500 flex space-x-2">
      <Image src={bagIcon} alt="Cart" width={16} height={16} />
      <span>x 4</span>
    </div>
  );
};

export default Cart
