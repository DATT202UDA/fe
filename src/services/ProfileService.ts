import axiosInstance from '@/lib/axios';

export interface UserProfile {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  zalo: string;
  facebook: string;
  gender: string;
  school: string;
  joinDate: string;
  totalOrders: number;
  wishlistItems: number;
  savedAddresses: number;
  savedCards: number;
}

export interface UpdateProfileData {
  _id?: string;
  username?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  zalo?: string;
  facebook?: string;
  gender?: string;
  school?: string;
  avatar?: string;
}

class ProfileService {
  static async getProfile(): Promise<UserProfile> {
    try {
      const response = await axiosInstance.get('/users/profile');
      if (!response.data) {
        throw new Error('Không nhận được dữ liệu từ server');
      }

      return {
        ...response.data,
        id: response.data._id as string,
      };
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw new Error(
        error?.response?.data?.message || 'Không thể lấy thông tin cá nhân',
      );
    }
  }

  static async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    try {
      const response = await axiosInstance.patch('/users/profile', data);
      if (!response.data) {
        throw new Error('Không nhận được dữ liệu từ server');
      }
      return {
        username: response.data.username || '',
        fullName: response.data.full_name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        avatar: response.data.avatar || '',
        address: response.data.address || '',
        zalo: response.data.zalo || '',
        facebook: response.data.facebook || '',
        gender: response.data.gender || '',
        school: response.data.school || '',
        joinDate: response.data.created_at || '',
        totalOrders: response.data.totalOrders || 0,
        wishlistItems: response.data.wishlistItems || 0,
        savedAddresses: response.data.savedAddresses || 0,
        savedCards: response.data.savedCards || 0,
      };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      if (error.response?.status === 401) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw new Error(
        error?.response?.data?.message ||
          'Không thể cập nhật thông tin cá nhân',
      );
    }
  }

  static async uploadAvatar(file: File): Promise<UserProfile> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Upload file
      const uploadResponse = await axiosInstance.post(
        '/upload/single',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (!uploadResponse.data?.url) {
        throw new Error('Không nhận được URL ảnh từ server');
      }

      // Update profile with new avatar URL
      const updatedProfile = await this.updateProfile({
        avatar: uploadResponse.data.url,
      });

      return updatedProfile;
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      throw new Error('Không thể tải lên ảnh đại diện');
    }
  }
}

export default ProfileService;
