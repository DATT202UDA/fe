'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiEdit2, FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiFacebook, FiInstagram } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import ProfileService, { UserProfile } from '@/services/ProfileService';

interface CustomSession {
  user: {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    role: string;
  };
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const ProfileInformation = () => {
  const { data: session } = useSession() as { data: CustomSession | null };
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    avatar: '',
    address: '',
    zalo: '',
    facebook: '',
    gender: '',
    school: '',
    joinDate: '',
    totalOrders: 0,
    wishlistItems: 0,
    savedAddresses: 0,
    savedCards: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchUserProfile();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await ProfileService.getProfile();
      setProfile(userData);
      setEditedProfile(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile data');
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await ProfileService.updateProfile({
        username: editedProfile.username,
        full_name: editedProfile.fullName,
        email: editedProfile.email,
        phone: editedProfile.phone,
        address: editedProfile.address,
        zalo: editedProfile.zalo,
        facebook: editedProfile.facebook,
        gender: editedProfile.gender,
        school: editedProfile.school,
      });
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const updatedProfile = await ProfileService.uploadAvatar(file);
      setProfile(updatedProfile);
      setEditedProfile(updatedProfile);
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5E9DA]/30 flex items-center justify-center">
        <div className="text-[#B86B2B] text-xl">Đang tải thông tin...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5E9DA]/30 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

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
                    src={profile.avatar || '/images/default-avatar.png'}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 bg-[#B86B2B] text-white p-2 rounded-full hover:bg-[#E6A15A] transition-colors shadow-md cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <FiEdit2 className="w-4 h-4" />
                </label>
              </div>

              <h2 className="text-2xl font-bold text-[#7A5C3E] mb-2">
                {profile.fullName}
              </h2>
              <p className="text-gray-600 flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                Thành viên từ {formatDate(profile.joinDate)}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-[#B86B2B]" />
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={isEditing ? editedProfile.username : profile.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-[#B86B2B]" />
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={isEditing ? editedProfile.fullName : profile.fullName}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-[#B86B2B]" />
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={isEditing ? editedProfile.address : profile.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiFacebook className="w-4 h-4 text-[#B86B2B]" />
                    Facebook
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={isEditing ? editedProfile.facebook : profile.facebook}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiInstagram className="w-4 h-4 text-[#B86B2B]" />
                    Zalo
                  </label>
                  <input
                    type="text"
                    name="zalo"
                    value={isEditing ? editedProfile.zalo : profile.zalo}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-[#B86B2B]" />
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    value={isEditing ? editedProfile.gender : profile.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-[#B86B2B]" />
                    Trường học
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={isEditing ? editedProfile.school : profile.school}
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
