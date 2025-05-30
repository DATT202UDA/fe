'use client';

import { FaBell } from 'react-icons/fa';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

// Extend the session user type
declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
  }
}

export const AdminHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-[#E5E3DF]">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-[#B86B2B]">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-[#F8F6F3] rounded-lg transition-colors">
              <FaBell className="text-[#7A5C3E]" />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 hover:bg-[#F8F6F3] rounded-lg transition-colors">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#F8F6F3]">
                  <div className="w-full h-full flex items-center justify-center bg-[#E6A15A] text-white font-medium">
                    {session?.user?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                </div>
                <span className="text-[#7A5C3E]">
                  {session?.user?.name || 'admin'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
