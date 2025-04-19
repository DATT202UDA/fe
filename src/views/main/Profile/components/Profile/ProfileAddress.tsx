'use client';

import React, { useState } from 'react';
import { ProfileLayout } from '../Layout/ProfileLayout';

interface AddressFormData {
  fullName: string;
  phoneNumber: string;
  country: string;
  region: string;
  city: string;
  area: string;
  address: string;
}

export const ProfileAddress = () => {
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

  return (
    <ProfileLayout 
      activeSection="account" 
      activePage="address"
      title="Manage Address"
    >
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={addressData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            >
              <option value="Notun Bazar">Notun Bazar</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Banani">Banani</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={addressData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
        >
          SAVE CHANGES
        </button>
      </form>
    </ProfileLayout>
  );
}; 