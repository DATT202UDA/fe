'use client';

import Image from 'next/image';

const Promotions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative bg-pink-50 p-8 rounded-lg overflow-hidden group">
          <div className="relative z-10">
            <span className="text-[#FF4B91] font-semibold">20% offer</span>
            <h3 className="text-xl font-bold mt-2">Free Shipping</h3>
            <p className="text-gray-600 mt-1">Attractive Natural Furniture</p>
            <button className="mt-4 bg-[#FF4B91] text-white px-6 py-2 rounded hover:bg-[#ff3381] transition-colors">
              SHOP NOW
            </button>
          </div>
          <div className="absolute right-0 bottom-0 transform group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/promotions/chair1.png"
              alt="Promotion chair"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
        <div className="relative bg-blue-50 p-8 rounded-lg overflow-hidden group">
          <div className="relative z-10">
            <span className="text-[#FF4B91] font-semibold">50% offer</span>
            <h3 className="text-xl font-bold mt-2">Flash Sale</h3>
            <p className="text-gray-600 mt-1">Attractive Natural Furniture</p>
            <button className="mt-4 bg-[#FF4B91] text-white px-6 py-2 rounded hover:bg-[#ff3381] transition-colors">
              SHOP NOW
            </button>
          </div>
          <div className="absolute right-0 bottom-0 transform group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/promotions/sofa1.png"
              alt="Promotion sofa"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
