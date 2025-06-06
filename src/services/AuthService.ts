import axiosInstance from '@/lib/axios';

interface RegisterUser {
  username: string;
  email: string;
  password: string;
  address?: string;
  zalo?: string;
  facebook?: string;
  phone?: string;
  full_name: string;
  gender?: string;
  avatar?: string;
  school?: string;
}
class AuthService {
  static async register(userData: RegisterUser) {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(
        error?.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.',
      );
    }
  }
}

export default AuthService;
