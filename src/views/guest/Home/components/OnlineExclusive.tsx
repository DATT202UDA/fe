'use client';

import Image from 'next/image';

const OnlineExclusive = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative bg-pink-50 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <span className="text-sm uppercase tracking-wider">
              ONLINE EXCLUSIVE
            </span>
            <h2 className="text-3xl font-bold mt-2">15% OFF</h2>
            <p className="text-gray-600 mt-2 uppercase font-medium">
              ACCENT CHAIRS,
              <br />
              BENCHES & OTTOMANS
            </p>
            <button className="mt-6 bg-[#FF4B91] text-white px-8 py-3 rounded hover:bg-[#ff3381] transition-colors">
              Shop Now
            </button>
          </div>
          <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
            <Image
              src="/images/banners/furniture-banner.jpg"
              alt="Furniture Banner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineExclusive;
