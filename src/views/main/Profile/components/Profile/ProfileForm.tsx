'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiUser, FiClock, FiHeart, FiLogOut, FiCreditCard, FiMenu } from 'react-icons/fi';

interface AddressFormData {
  fullName: string;
  phoneNumber: string;
  country: string;
  region: string;
  city: string;
  area: string;
  address: string;
}

export const ProfileForm = () => {
  const [activeSection, setActiveSection] = useState('address');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addressData, setAddressData] = useState<AddressFormData>({
    fullName: 'John Doe',
    phoneNumber: '123 456 789',
    country: 'Bangladesh',
    region: 'Dhaka',
    city: 'Dhaka-North',
    area: 'Notun Bazar',
    address: 'Sonmati Loghoi Mosque'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Address data:', addressData);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-md">
        <button onClick={toggleSidebar} className="text-gray-600">
          <FiMenu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">
          <span className="text-[#FF4B91]">RAF</span>
          <span>CART</span>
        </h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>

      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
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
              <p className="text-sm">Hello,</p>
              <p className="font-medium">Russell Ahmed</p>
            </div>
          </div>

          <nav className="space-y-2">
            <div className="mb-4">
              <button
                className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                  activeSection === 'account' ? 'text-pink-500' : ''
                }`}
                onClick={() => setActiveSection('account')}
              >
                <FiUser className="w-5 h-5" />
                <span>Manage My Account</span>
              </button>
              <div className="pl-8 space-y-2 mt-2">
                <button className="text-sm text-gray-600 hover:text-pink-500">Profile Information</button>
                <button className="text-sm text-pink-500">Manage Address</button>
                <button className="text-sm text-gray-600 hover:text-pink-500">Change Password</button>
              </div>
            </div>

            <div className="mb-4">
              <button
                className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                  activeSection === 'orders' ? 'text-pink-500' : ''
                }`}
                onClick={() => setActiveSection('orders')}
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
                activeSection === 'payments' ? 'text-pink-500' : ''
              }`}
              onClick={() => setActiveSection('payments')}
            >
              <FiCreditCard className="w-5 h-5" />
              <span>Payments Methods</span>
            </button>

            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
                activeSection === 'wishlist' ? 'text-pink-500' : ''
              }`}
              onClick={() => setActiveSection('wishlist')}
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

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <span className="text-pink-500">My Account</span>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">Manage Address</span>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl font-semibold mb-6">Manage Address</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={addressData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={addressData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={addressData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select
                  name="region"
                  value={addressData.region}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  name="city"
                  value={addressData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Dhaka-North">Dhaka-North</option>
                  <option value="Dhaka-South">Dhaka-South</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area
                </label>
                <select
                  name="area"
                  value={addressData.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Notun Bazar">Notun Bazar</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Banani">Banani</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={addressData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-pink-500 text-white py-2 px-6 rounded-md hover:bg-pink-600 transition-colors"
            >
              SAVE CHANGES
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}; 