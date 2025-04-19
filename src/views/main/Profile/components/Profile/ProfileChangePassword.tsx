'use client';

import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ProfileLayout } from '../Layout/ProfileLayout';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  retypePassword: string;
}

export const ProfileChangePassword = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    retype: false
  });
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    retypePassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.retypePassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Password data:', passwordData);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'retype') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <ProfileLayout 
      activeSection="account" 
      activePage="password"
      title="Change Password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPasswords.current ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPasswords.new ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retype Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.retype ? "text" : "password"}
                name="retypePassword"
                value={passwordData.retypePassword}
                onChange={handleInputChange}
                placeholder="Retype your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('retype')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPasswords.retype ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
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