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
import { FaFacebook, FaEnvelope, FaLock } from 'react-icons/fa';
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
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError('Có lỗi xảy ra khi đăng nhập bằng ' + provider);
      toast.error('Có lỗi xảy ra khi đăng nhập bằng ' + provider);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F6F3] via-[#F3F4F6] to-[#ECE9E6] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-[#E5E3DF]"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-center text-3xl font-extrabold text-[#B86B2B] mb-2">
            Đăng nhập
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Đăng nhập để trải nghiệm các dịch vụ của Nhân Sinh Quán
          </p>
        </motion.div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <motion.div variants={itemVariants}>
            <FormGroup
              label="Email"
              error={errors.email?.message}
              labelClassName="text-[#B86B2B]"
            >
              <Input
                name="email"
                type="email"
                register={register}
                placeholder="Nhập email của bạn"
                leftIcon={<FaEnvelope />}
                variant="secondary"
              />
            </FormGroup>
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormGroup
              label="Mật khẩu"
              error={errors.password?.message}
              labelClassName="text-[#B86B2B]"
            >
              <Input
                name="password"
                type="password"
                register={register}
                placeholder="Nhập mật khẩu của bạn"
                leftIcon={<FaLock />}
                variant="secondary"
              />
            </FormGroup>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-[#E6A15A] focus:ring-[#E6A15A] border-[#E5E3DF] rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-[#7A5C3E]"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>
            <Link
              href="/quen-mat-khau"
              className="text-sm font-medium text-[#B86B2B] hover:text-[#E6A15A] transition-colors duration-200"
            >
              Quên mật khẩu?
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              theme="primary"
              size="l"
              fullWidth
            >
              Đăng nhập
            </Button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="text-center mt-4">
          <span className="text-[#7A5C3E] text-sm">
            Bạn chưa có tài khoản?{' '}
          </span>
          <Link
            href="/dang-ky"
            className="text-[#B86B2B] font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E3DF]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#B0A99F]">
              Hoặc đăng nhập với
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4">
          <Button
            onClick={() => handleSocialLogin('google')}
            variant="outlined"
            theme="neutral"
            fullWidth
          >
            <div className="flex items-center justify-center gap-2">
              <FcGoogle className="w-5 h-5" />
              Google
            </div>
          </Button>
          <Button
            onClick={() => handleSocialLogin('facebook')}
            fullWidth
            className="!bg-[#1877F2] !text-white !border-none hover:!bg-[#166FE5] active:!bg-[#1459B2]"
            style={{ border: 'none' }}
          >
            <div className="flex items-center justify-center gap-2">
              <FaFacebook className="w-5 h-5" />
              Facebook
            </div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
