'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import FormGroup from '@/components/BaseUI/Form/FormGroup';
import Input from '@/components/BaseUI/Form/Input';
import Button from '@/components/BaseUI/Button';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError('Email hoặc mật khẩu không đúng');
        toast.error('Email hoặc mật khẩu không đúng');
        return;
      }
      toast.success('Đăng nhập thành công!');
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Có lỗi xảy ra, vui lòng thử lại');
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      toast.success('Chức năng đang được phát triển');
      // await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError('Có lỗi xảy ra khi đăng nhập bằng ' + provider);
      toast.error('Có lỗi xảy ra khi đăng nhập bằng ' + provider);
    }
  };

  return (
    <div className="pt-16 pb-20 flex flex-col items-center bg-gradient-to-b from-[#B86B2B] to-[#E6A15A] relative overflow-hidden">
      {/* Trang trí nền: sóng trắng */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.2"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10 px-4">
        <div className="bg-white rounded-3xl shadow-xl px-6 py-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#B86B2B] mb-2">
              Đăng nhập
            </h1>
            <p className="text-gray-600 text-sm">
              Đăng nhập để trải nghiệm các dịch vụ của chúng tôi
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="">
              <div className="relative mb-5">
                <label className="block text-sm font-medium text-[#B86B2B] mb-1">
                  Email
                </label>
                <div className="relative flex flex-col items-center">
                  <div className="flex items-center w-full">
                    <span className="absolute left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FaEnvelope className="w-5 h-5" />
                    </span>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Nhập email của bạn"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#E6A15A]/20 focus:border-[#E6A15A] outline-none transition-colors bg-white text-base`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-start w-full text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative mb-5">
                <div className="flex flex-col items-start">
                  <label className="block text-sm font-medium text-[#B86B2B] mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FaLock className="w-5 h-5" />
                    </span>
                    <input
                      {...register('password')}
                      type="password"
                      placeholder="Nhập mật khẩu của bạn"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#E6A15A]/20 focus:border-[#E6A15A] outline-none transition-colors bg-white text-base`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-start w-full text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-[#E6A15A] focus:ring-[#E6A15A] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Link
                href="/quen-mat-khau"
                className="text-sm font-medium text-[#E6A15A] hover:text-[#B86B2B]"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E6A15A] text-white py-2 rounded-lg font-medium text-base hover:bg-[#B86B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  Đang xử lý...
                </div>
              ) : (
                'Đăng nhập'
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <FcGoogle className="w-5 h-5" />
                Google
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Bạn chưa có tài khoản?{' '}
            <Link
              href="/dang-ky"
              className="font-medium text-[#E6A15A] hover:text-[#B86B2B]"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
