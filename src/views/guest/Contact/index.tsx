'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';

const SUBJECTS = [
  { value: '', label: 'Chọn chủ đề' },
  { value: 'order', label: 'Đơn hàng' },
  { value: 'warranty', label: 'Bảo hành' },
  { value: 'support', label: 'Hỗ trợ kỹ thuật' },
  { value: 'other', label: 'Khác' },
];

const PRIORITIES = [
  { value: 'low', label: 'Thấp - Câu hỏi chung' },
  { value: 'medium', label: 'Trung bình - Cần phản hồi sớm' },
  { value: 'high', label: 'Cao - Gấp/Khẩn cấp' },
];

const contactSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 ký tự'),
  subject: z.string().min(1, 'Vui lòng chọn chủ đề'),
  priority: z.enum(['low', 'medium', 'high']),
  message: z.string().min(10, 'Tin nhắn phải có ít nhất 10 ký tự'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      priority: 'low',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div className="bg-[#F5E9DA] min-h-screen py-10 px-2">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-[#B86B2B] to-[#E6A15A] rounded-2xl shadow-lg p-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Liên hệ với{' '}
            <span className="text-[#E6A15A] underline decoration-4 decoration-[#E6A15A] underline-offset-4">
              chúng tôi
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và
            lắng nghe ý kiến đóng góp của bạn.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="bg-[#F5E9DA] rounded-2xl p-8 shadow-lg flex flex-col justify-between min-h-[420px] border border-[#E6A15A]">
          <div>
            <h2 className="text-[#7A5C3E] text-2xl font-bold mb-2">
              Thông Tin Liên Hệ
            </h2>
            <p className="text-[#7A5C3E]/80 mb-6">
              Bạn có thể liên hệ với chúng tôi bằng một trong những cách sau:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#B86B2B] text-xl mt-1" />
                <div>
                  <span className="text-[#7A5C3E] font-semibold">Địa chỉ</span>
                  <div className="text-[#7A5C3E]/80 text-sm">
                    Tầng 1-2, Tòa nhà ABC Plaza, 123 Nguyễn Văn Linh, Quận 7,
                    TP. Hồ Chí Minh
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="text-[#B86B2B] text-xl mt-1" />
                <div>
                  <span className="text-[#7A5C3E] font-semibold">
                    Điện thoại
                  </span>
                  <div className="text-[#7A5C3E]/80 text-sm">1900 1234</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-[#B86B2B] text-xl mt-1" />
                <div>
                  <span className="text-[#7A5C3E] font-semibold">Email</span>
                  <div className="text-[#7A5C3E]/80 text-sm">
                    support@bansanpham.com
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="text-[#B86B2B] text-xl mt-1" />
                <div>
                  <span className="text-[#7A5C3E] font-semibold">
                    Giờ làm việc
                  </span>
                  <div className="text-[#7A5C3E]/80 text-sm">
                    Thứ 2 - Thứ 6: 8:00 - 21:00
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="text-[#7A5C3E] font-semibold mb-2">
              Kết nối với chúng tôi
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-[#E6A15A]/30 hover:bg-[#E6A15A]/60 rounded-full p-2 transition-colors"
              >
                <FaFacebookF className="text-lg text-[#B86B2B] hover:text-[#7A5C3E]" />
              </a>
              <a
                href="#"
                className="bg-[#E6A15A]/30 hover:bg-[#E6A15A]/60 rounded-full p-2 transition-colors"
              >
                <FaInstagram className="text-lg text-[#B86B2B] hover:text-[#7A5C3E]" />
              </a>
              <a
                href="#"
                className="bg-[#E6A15A]/30 hover:bg-[#E6A15A]/60 rounded-full p-2 transition-colors"
              >
                <FaYoutube className="text-lg text-[#B86B2B] hover:text-[#7A5C3E]" />
              </a>
            </div>
          </div>
        </div>
        {/* Contact Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E6A15A]">
          <h2 className="text-xl font-bold text-[#7A5C3E] mb-6">
            Gửi tin nhắn cho chúng tôi
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-[#7A5C3E] font-medium mb-1"
                  htmlFor="email"
                >
                  Email <span className="text-[#B86B2B]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-lg border border-[#E6A15A] focus:ring-2 focus:ring-[#B86B2B] focus:border-[#B86B2B] outline-none transition-colors bg-[#F5E9DA] placeholder-[#7A5C3E]/60"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-[#7A5C3E] font-medium mb-1"
                  htmlFor="phone"
                >
                  Số điện thoại <span className="text-[#B86B2B]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Nhập số điện thoại của bạn"
                  {...register('phone')}
                  className="w-full px-4 py-3 rounded-lg border border-[#E6A15A] focus:ring-2 focus:ring-[#B86B2B] focus:border-[#B86B2B] outline-none transition-colors bg-[#F5E9DA] placeholder-[#7A5C3E]/60"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-[#7A5C3E] font-medium mb-1"
                  htmlFor="subject"
                >
                  Chủ đề <span className="text-[#B86B2B]">*</span>
                </label>
                <select
                  id="subject"
                  {...register('subject')}
                  className="w-full px-4 py-3 rounded-lg border border-[#E6A15A] focus:ring-2 focus:ring-[#B86B2B] focus:border-[#B86B2B] outline-none transition-colors bg-[#F5E9DA] text-[#7A5C3E]"
                >
                  {SUBJECTS.map((s) => (
                    <option
                      key={s.value}
                      value={s.value}
                      disabled={s.value === ''}
                    >
                      {s.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-[#7A5C3E] font-medium mb-1"
                  htmlFor="priority"
                >
                  Mức độ ưu tiên
                </label>
                <select
                  id="priority"
                  {...register('priority')}
                  className="w-full px-4 py-3 rounded-lg border border-[#E6A15A] focus:ring-2 focus:ring-[#B86B2B] focus:border-[#B86B2B] outline-none transition-colors bg-[#F5E9DA] text-[#7A5C3E]"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                className="block text-[#7A5C3E] font-medium mb-1"
                htmlFor="message"
              >
                Tin nhắn <span className="text-[#B86B2B]">*</span>
              </label>
              <textarea
                id="message"
                placeholder="Nhập nội dung tin nhắn của bạn"
                {...register('message')}
                className="w-full px-4 py-3 rounded-lg border border-[#E6A15A] focus:ring-2 focus:ring-[#B86B2B] focus:border-[#B86B2B] outline-none transition-colors min-h-[100px] bg-[#F5E9DA] placeholder-[#7A5C3E]/60"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#B86B2B] hover:bg-[#7A5C3E] text-white font-semibold px-8 py-3 rounded-lg shadow transition-colors duration-200 flex items-center gap-2"
              >
                Gửi tin nhắn <span className="text-lg">&gt;</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
