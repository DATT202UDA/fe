'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiEdit2, FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
}

export const ProfileInformation = () => {
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123 456 789',
    avatar: '/images/profile.png',
    joinDate: '01/01/2024',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E9DA]/30 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E5E3DF] mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#B86B2B] shadow-lg">
                  <Image
                    src={profile.avatar}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-[#B86B2B] text-white p-2 rounded-full hover:bg-[#E6A15A] transition-colors shadow-md">
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-[#7A5C3E] mb-2">
                {profile.fullName}
              </h2>
              <p className="text-gray-600 flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                Thành viên từ {profile.joinDate}
              </p>
            </div>
          </div>

          {/* Profile Information Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E5E3DF]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-[#7A5C3E] flex items-center gap-2">
                <FiUser className="w-5 h-5" />
                Thông tin cá nhân
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-[#B86B2B] hover:text-[#E6A15A] flex items-center gap-2 font-medium"
              >
                <FiEdit2 className="w-4 h-4" />
                {isEditing ? 'Hủy' : 'Chỉnh sửa'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-[#B86B2B]" />
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={
                      isEditing ? editedProfile.fullName : profile.fullName
                    }
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiMail className="w-4 h-4 text-[#B86B2B]" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={isEditing ? editedProfile.email : profile.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiPhone className="w-4 h-4 text-[#B86B2B]" />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={isEditing ? editedProfile.phone : profile.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#B86B2B] text-white rounded-xl hover:bg-[#E6A15A] transition-colors font-medium shadow-md hover:shadow-lg"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
