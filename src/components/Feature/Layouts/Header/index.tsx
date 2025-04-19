'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState('All category');

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-[#FF4B91]">RAF</span>
                <span>CART</span>
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-[#FF4B91]">
                Home
              </Link>
              <Link href="/shop" className="hover:text-[#FF4B91]">
                Shop
              </Link>
              <Link href="/pages" className="hover:text-[#FF4B91]">
                Pages
              </Link>
              <Link href="/contact" className="hover:text-[#FF4B91]">
                Contact
              </Link>
            </nav>

            {/* Right Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span>Login/Register</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Language</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Currency</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#FF4B91] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            {/* All Categories Button */}
            <button className="bg-[#333] text-white px-4 py-2 flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span>All categories</span>
            </button>

            {/* Search Input */}
            <div className="flex-1 flex">
              <div className="relative flex-1 flex items-center">
                <select
                  className="h-full py-2 px-4 border-r border-gray-300 bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All category">All category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                </select>
                <input
                  type="text"
                  placeholder="Search product..."
                  className="flex-1 py-2 px-4 outline-none"
                />
                <button className="bg-[#333] text-white px-6 py-2">
                  Search
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <Link href="/wishlist" className="flex items-center text-white">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-white text-[#FF4B91] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </div>
                <span className="ml-2">Wish List</span>
              </Link>

              <Link href="/cart" className="flex items-center text-white">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-white text-[#FF4B91] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </div>
                <span className="ml-2">Cart</span>
              </Link>

              <Link href="/account" className="flex items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="ml-2">Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
