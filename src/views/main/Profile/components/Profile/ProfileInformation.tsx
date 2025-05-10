'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FiEdit2,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiCreditCard,
  FiStar,
  FiUser,
  FiClock,
  FiLogOut,
} from 'react-icons/fi';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  totalOrders: number;
  wishlistItems: number;
  savedAddresses: number;
  savedCards: number;
}

export const ProfileInformation = () => {
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123 456 789',
    avatar: '/images/profile.png',
    joinDate: '01/01/2024',
    totalOrders: 12,
    wishlistItems: 8,
    savedAddresses: 3,
    savedCards: 2,
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
    <div className="min-h-screen bg-[#F5E9DA]/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white/60 backdrop-blur-xl rounded-lg shadow-sm p-6 border border-white/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B86B2B]">
                  <Image
                    src={profile.avatar}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Xin chào,</p>
                  <p className="font-medium">{profile.fullName}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-[#B86B2B] bg-[#F5E9DA]">
                  <FiUser className="w-5 h-5" />
                  <span>Thông tin cá nhân</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-[#F5E9DA]/50">
                  <FiClock className="w-5 h-5" />
                  <span>Lịch sử đơn hàng</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-[#F5E9DA]/50">
                  <FiHeart className="w-5 h-5" />
                  <span>Sản phẩm yêu thích</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-[#F5E9DA]/50">
                  <FiMapPin className="w-5 h-5" />
                  <span>Địa chỉ của tôi</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-[#F5E9DA]/50">
                  <FiCreditCard className="w-5 h-5" />
                  <span>Phương thức thanh toán</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-[#F5E9DA]/50">
                  <FiLogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            {/* Profile Header */}
            <div className="bg-white/60 backdrop-blur-xl rounded-lg shadow-sm p-6 border border-white/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#B86B2B]">
                    <Image
                      src={profile.avatar}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-[#B86B2B] text-white p-2 rounded-full hover:bg-[#E6A15A] transition-colors">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {profile.fullName}
                  </h2>
                  <p className="text-gray-600">
                    Thành viên từ {profile.joinDate}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiShoppingBag className="w-5 h-5 text-[#B86B2B]" />
                      <span>{profile.totalOrders} đơn hàng</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiHeart className="w-5 h-5 text-[#B86B2B]" />
                      <span>{profile.wishlistItems} sản phẩm yêu thích</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 backdrop-blur-xl rounded-lg shadow-sm p-6 border border-white/30">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F5E9DA] p-3 rounded-full">
                    <FiMapPin className="w-6 h-6 text-[#B86B2B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {profile.savedAddresses}
                    </h3>
                    <p className="text-gray-600">Địa chỉ đã lưu</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-lg shadow-sm p-6 border border-white/30">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F5E9DA] p-3 rounded-full">
                    <FiCreditCard className="w-6 h-6 text-[#B86B2B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {profile.savedCards}
                    </h3>
                    <p className="text-gray-600">Thẻ thanh toán</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-lg shadow-sm p-6 border border-white/30">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F5E9DA] p-3 rounded-full">
                    <FiStar className="w-6 h-6 text-[#B86B2B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">4.8</h3>
                    <p className="text-gray-600">Đánh giá trung bình</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Information Form */}
            <div className="bg-white/60 backdrop-blur-xl rounded-lg shadow-sm p-6 border border-white/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Thông tin cá nhân
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-[#B86B2B] hover:text-[#E6A15A] flex items-center gap-2"
                >
                  <FiEdit2 className="w-4 h-4" />
                  {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full px-3 py-2 border border-[#B86B2B]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B86B2B] disabled:bg-gray-50 bg-white/70 backdrop-blur"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? editedProfile.email : profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-[#B86B2B]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B86B2B] disabled:bg-gray-50 bg-white/70 backdrop-blur"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? editedProfile.phone : profile.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-[#B86B2B]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B86B2B] disabled:bg-gray-50 bg-white/70 backdrop-blur"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#B86B2B] text-white rounded-md hover:bg-[#E6A15A] transition-colors"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white/60 backdrop-blur-xl rounded-lg shadow-sm p-6 border border-white/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Đơn hàng gần đây
                </h3>
                <button className="text-[#B86B2B] hover:text-[#E6A15A]">
                  Xem tất cả
                </button>
              </div>

              <div className="space-y-4">
                {/* Sample Order Items - Replace with actual data */}
                <div className="flex items-center justify-between p-4 border border-[#B86B2B]/10 rounded-lg bg-white/50 backdrop-blur">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#F5E9DA] rounded-md"></div>
                    <div>
                      <h4 className="font-medium">Máy hút bụi thông minh</h4>
                      <p className="text-sm text-gray-600">Đơn hàng #12345</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">2.500.000đ</p>
                    <p className="text-sm text-green-600">Đã giao</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-[#B86B2B]/10 rounded-lg bg-white/50 backdrop-blur">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#F5E9DA] rounded-md"></div>
                    <div>
                      <h4 className="font-medium">Nồi cơm điện cao cấp</h4>
                      <p className="text-sm text-gray-600">Đơn hàng #12344</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">1.800.000đ</p>
                    <p className="text-sm text-yellow-600">Đang giao</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
