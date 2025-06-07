import React, { useState } from 'react';
import { FiLock } from 'react-icons/fi';
import ProfileService from '@/services/ProfileService';
import { toast } from 'react-hot-toast';

export const ChangePasswordForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Mật khẩu mới không khớp!');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    try {
      setIsLoading(true);
      await ProfileService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success('Đổi mật khẩu thành công!');
      setIsEditing(false);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Không thể thay đổi mật khẩu');
   
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E5E3DF] mt-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-[#7A5C3E] flex items-center gap-2">
          <FiLock className="w-5 h-5" />
          Đổi mật khẩu
        </h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-[#B86B2B] hover:text-[#E6A15A] flex items-center gap-2 font-medium"
        >
          {isEditing ? 'Hủy' : 'Chỉnh sửa'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiLock className="w-4 h-4 text-[#B86B2B]" />
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiLock className="w-4 h-4 text-[#B86B2B]" />
              Mật khẩu mới
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 border-2 border-[#E5E3DF] rounded-xl focus:outline-none focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 disabled:bg-gray-50 bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiLock className="w-4 h-4 text-[#B86B2B]" />
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              disabled={isLoading}
              className="px-6 py-3 bg-[#B86B2B] text-white rounded-xl hover:bg-[#E6A15A] transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang xử lý...' : 'Lưu thay đổi'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}; 
