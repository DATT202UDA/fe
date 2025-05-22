'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

// Define validation schema
const signupSchema = z
  .object({
    username: z.string().min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
    fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Mật khẩu phải chứa chữ hoa, chữ thường và số',
      ),
    confirmPassword: z.string(),
    phone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số'),
    address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log(data, 'cpolafdsaf');
    setIsLoading(true);
    try {
      const registerData = {
        username: data.username,
        full_name: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
      };

      await AuthService.register(registerData);
      toast.success('Đăng ký thành công!');
      router.push('/dang-nhap');
    } catch (error: any) {
      toast.error(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF8] to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#B86B2B] mb-2">
                Đăng ký tài khoản
              </h1>
              <p className="text-gray-600">
                Tham gia cùng chúng tôi để mua sắm đồ gia dụng chất lượng
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    {...register('username')}
                    type="text"
                    placeholder="Tên đăng nhập"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.username ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder="Họ và tên"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Mật khẩu"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.confirmPassword
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Số điện thoại"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    {...register('address')}
                    type="text"
                    placeholder="Địa chỉ"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.address ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#E6A15A] text-white py-3 rounded-lg font-semibold hover:bg-[#B86B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
              </motion.button>

              <p className="text-center text-gray-600">
                Đã có tài khoản?{' '}
                <Link
                  href="/dang-nhap"
                  className="text-[#E6A15A] hover:text-[#B86B2B] font-semibold"
                >
                  Đăng nhập
                </Link>
              </p>
            </form>
          </motion.div>

          {/* Right side - Image and Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/images/register.png"
                alt="Đăng ký tài khoản"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">Lợi ích khi đăng ký</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E6A15A] flex items-center justify-center">
                      <span className="text-lg">✓</span>
                    </div>
                    <span>Mua sắm với giá tốt nhất</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E6A15A] flex items-center justify-center">
                      <span className="text-lg">✓</span>
                    </div>
                    <span>Nhận thông báo khuyến mãi sớm nhất</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E6A15A] flex items-center justify-center">
                      <span className="text-lg">✓</span>
                    </div>
                    <span>Tích điểm và đổi quà</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E6A15A] flex items-center justify-center">
                      <span className="text-lg">✓</span>
                    </div>
                    <span>Hỗ trợ tư vấn 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
