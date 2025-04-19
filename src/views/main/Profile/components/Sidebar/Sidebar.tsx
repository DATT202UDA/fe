'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser, FiClock, FiHeart, FiLogOut, FiCreditCard } from 'react-icons/fi';

interface SidebarProps {
  activeSection: string;
  activePage?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, activePage = 'profile' }) => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">Hello,</p>
            <p className="font-medium">Russell Ahmed</p>
          </div>
        </div>

        <nav className="space-y-2">
          <div className="mb-4">
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                activeSection === 'account' ? 'text-pink-500' : 'text-gray-600'
              }`}
            >
              <FiUser className="w-5 h-5" />
              <span>Manage My Account</span>
            </button>
            <div className="pl-8 space-y-2 mt-2">
              <Link 
                href="/profile"
                className={`block text-sm ${activePage === 'profile' ? 'text-pink-500' : 'text-gray-600'} hover:text-pink-500`}
              >
                Profile Information
              </Link>
              <Link 
                href="/profile/address"
                className={`block text-sm ${activePage === 'address' ? 'text-pink-500' : 'text-gray-600'} hover:text-pink-500`}
              >
                Manage Address
              </Link>
              <Link 
                href="/profile/password"
                className={`block text-sm ${activePage === 'password' ? 'text-pink-500' : 'text-gray-600'} hover:text-pink-500`}
              >
                Change Password
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                activeSection === 'orders' ? 'text-pink-500' : 'text-gray-600'
              }`}
            >
              <FiClock className="w-5 h-5" />
              <span>My Order History</span>
            </button>
            <div className="pl-8 space-y-2 mt-2">
              <button className="text-sm text-gray-600 hover:text-pink-500">My Returns</button>
              <button className="text-sm text-gray-600 hover:text-pink-500">My Cancellations</button>
              <button className="text-sm text-gray-600 hover:text-pink-500">My Reviews</button>
            </div>
          </div>

          <button
            className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
              activeSection === 'payments' ? 'text-pink-500' : 'text-gray-600'
            }`}
          >
            <FiCreditCard className="w-5 h-5" />
            <span>Payments Methods</span>
          </button>

          <button
            className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
              activeSection === 'wishlist' ? 'text-pink-500' : 'text-gray-600'
            }`}
          >
            <FiHeart className="w-5 h-5" />
            <span>My Wishlist</span>
          </button>

          <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-600 hover:text-pink-500">
            <FiLogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    </div>
  );
}; 