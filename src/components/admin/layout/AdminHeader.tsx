'use client';

import { FaBell } from 'react-icons/fa';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/admin/common/Modal';
import { useState } from 'react';

// Extend the session user type
declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
  }
}

export const AdminHeader = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleAdminButtonClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleConfirmProfileNavigation = () => {
    setIsProfileModalOpen(false);
    router.push('/profile');
  };

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
              <button
                className="flex items-center space-x-2 p-2 hover:bg-[#F8F6F3] rounded-lg transition-colors"
                onClick={handleAdminButtonClick}
              >
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

      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Xác nhận chuyển trang"
      >
        <div className="space-y-4">
          <p className="text-[#7A5C3E]">
            Bạn có muốn chuyển tới trang profile không?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2 text-sm text-[#7A5C3E] border border-[#E5E3DF] rounded hover:bg-[#F8F6F3]"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmProfileNavigation}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Chuyển trang
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
};
