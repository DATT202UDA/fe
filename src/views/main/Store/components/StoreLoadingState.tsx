import React from 'react';
import { FaStore } from 'react-icons/fa';

const StoreLoadingState: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FDFBF8] to-white">
      {/* Loading UI */}
      <div className="relative flex items-center justify-center">
        <div className="animate-pulse w-20 h-20 rounded-full bg-[#E6A15A]/20 flex items-center justify-center shadow-lg">
          <FaStore className="text-5xl text-[#E6A15A] drop-shadow-lg animate-bounce" />
        </div>
        <div className="absolute w-28 h-28 rounded-full border-4 border-[#E6A15A]/30 animate-ping" />
      </div>
      <div className="mt-8 text-[#B86B2B] text-lg font-semibold tracking-wide animate-pulse">
        Đang tải dữ liệu...
      </div>
    </div>
  );
};

export default StoreLoadingState;
