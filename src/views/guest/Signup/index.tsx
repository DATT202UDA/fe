'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronRight,
  FaChevronLeft,
  FaSpinner,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
      .regex(/^[A-Za-z0-9_]+$/, 'Chỉ được chứa chữ cái, số và dấu gạch dưới'),
    email: z.string().email('Email không hợp lệ'),
    password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Phải chứa chữ hoa, chữ thường và số',
      ),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu không được để trống'),
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    phone: z.string().regex(/^\d{10}$/, 'Số điện thoại phải có 10 chữ số'),
    address: z
      .string()
      .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
      .regex(/^[a-zA-Z0-9\s,./-]+$/, 'Không chứa ký tự đặc biệt'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu xác nhận không khớp',
  });

type FormData = z.infer<typeof signupSchema>;

export default function SignupView() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        full_name: data.fullName,
        phone: data.phone,
        address: data.address,
      };
      await AuthService.register(payload);
      toast.success('Đăng ký thành công!');
      router.push('/dang-nhap');
    } catch (err: any) {
      toast.error(err.message || 'Đăng ký thất bại.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    // Check password matching first
    if (getValues('confirmPassword') !== getValues('password')) {
      setError('confirmPassword', {
        message: 'Mật khẩu xác nhận không khớp',
      });
      return;
    }

    const fields: (keyof FormData)[] = [
      'username',
      'email',
      'password',
      'confirmPassword',
    ];
    const isValid = await trigger(fields);

    if (isValid) {
      setStep(2);
    }
  };

  const backStep = () => setStep(1);

  // Theo dõi sự thay đổi của password và confirmPassword
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError('confirmPassword', {
        message: 'Mật khẩu xác nhận không khớp',
      });
    }
  }, [password, confirmPassword, setError]);

  return (
    <div className="py-16 flex flex-col items-center bg-gradient-to-b from-[#B86B2B] to-[#E6A15A] relative overflow-hidden">
      {/* Trang trí nền: các vòng tròn lớn mờ */}
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

      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-8">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#B86B2B] mb-1">
              Đăng ký tài khoản
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Vui lòng nhập thông tin để tạo tài khoản của bạn
            </p>
          </div>
          {/* Stepper */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-2xl font-bold ${
                    step === 1
                      ? 'bg-[#B86B2B] text-white border-[#B86B2B]'
                      : 'bg-white text-[#B86B2B] border-[#E6A15A]'
                  }`}
                >
                  1
                </div>
                <span
                  className={`mt-1 text-sm font-semibold ${
                    step === 1 ? 'text-[#B86B2B]' : 'text-[#E6A15A]'
                  }`}
                >
                  Đăng nhập
                </span>
              </div>
              <div className="w-12 h-1 bg-[#E6A15A] rounded" />
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-2xl font-bold ${
                    step === 2
                      ? 'bg-[#B86B2B] text-white border-[#B86B2B]'
                      : 'bg-white text-[#B86B2B] border-[#E6A15A]'
                  }`}
                >
                  2
                </div>
                <span
                  className={`mt-1 text-sm font-semibold ${
                    step === 2 ? 'text-[#B86B2B]' : 'text-[#E6A15A]'
                  }`}
                >
                  Thông tin
                </span>
              </div>
            </div>
          </div>
          {/* Thông báo */}
          <div className="mb-4">
            <div className="bg-[#FFF6ED] border border-[#FFD9B3] text-[#B86B2B] rounded-lg px-4 py-2 text-sm flex items-center gap-2">
              <FaUser className="text-[#E6A15A] text-lg" />
              Thông tin đăng nhập sẽ được sử dụng để bạn đăng nhập vào hệ thống
              sau này
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 text-base" />
                    </span>
                    <input
                      {...register('username')}
                      type="text"
                      placeholder="Tên đăng nhập"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                        errors.username ? 'border-red-500' : 'border-gray-200'
                      } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors bg-white text-base`}
                    />
                    {errors.username && (
                      <p className="mt-0.5 text-xs text-red-500 absolute">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-base" />
                    </span>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Email"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors bg-white text-base`}
                    />
                    {errors.email && (
                      <p className="mt-0.5 text-xs text-red-500 absolute">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-base" />
                    </span>
                    <input
                      {...register('password')}
                      type="password"
                      placeholder="Mật khẩu (ít nhất 6 ký tự)"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors bg-white text-base`}
                    />
                    {errors.password && (
                      <p className="mt-0.5 text-xs text-red-500 absolute">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-base" />
                    </span>
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                        errors.confirmPassword
                          ? 'border-red-500'
                          : 'border-gray-200'
                      } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors bg-white text-base`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-0.5 text-xs text-red-500 absolute">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-[#E6A15A] text-white py-2.5 rounded-lg font-bold text-base hover:bg-[#B86B2B] transition-colors shadow-md mt-1 flex items-center justify-center gap-2"
                >
                  Tiếp theo <FaChevronRight />
                </motion.button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 text-base" />
                    </span>
                    <input
                      {...register('fullName')}
                      type="text"
                      placeholder="Họ và tên"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-200'
                      } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors bg-white text-base`}
                    />
                    {errors.fullName && (
                      <p className="mt-0.5 text-xs text-red-500 absolute">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400 text-base" />
                    </span>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="Số điện thoại"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors bg-white text-base`}
                    />
                    {errors.phone && (
                      <p className="mt-0.5 text-xs text-red-500 absolute">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400 text-base" />
                  </span>
                  <input
                    {...register('address')}
                    type="text"
                    placeholder="Địa chỉ"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                      errors.address ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors bg-white text-base`}
                  />
                  {errors.address && (
                    <p className="mt-0.5 text-xs text-red-500 absolute">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 !mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={backStep}
                    className="flex-1 bg-white border border-[#E6A15A] text-[#B86B2B] py-2.5 rounded-lg font-bold text-base hover:bg-[#FFF6ED] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <FaChevronLeft /> Quay lại
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-[#E6A15A] text-white py-2.5 rounded-lg font-bold text-base hover:bg-[#B86B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <FaSpinner className="animate-spin" />
                        Đang xử lý...
                      </div>
                    ) : (
                      'Đăng ký'
                    )}
                  </motion.button>
                </div>
              </>
            )}
          </form>
          <p className="text-center text-gray-600 text-base mt-4">
            Bạn đã có tài khoản?{' '}
            <Link
              href="/dang-nhap"
              className="text-[#E6A15A] hover:text-[#B86B2B] font-semibold transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
