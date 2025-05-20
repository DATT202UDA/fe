'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Newsletter Section */}
      {/* <div className="bg-[#F8F6F3] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#B86B2B] mb-4">
              Đăng ký nhận thông tin
            </h3>
            <p className="text-[#7A5C3E] mb-6">
              Nhận thông tin về sản phẩm mới và khuyến mãi đặc biệt
            </p>
            <div className="flex gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-full border border-[#E5E3DF] focus:border-[#B86B2B] focus:ring-2 focus:ring-[#B86B2B]/20 outline-none transition"
              />
              <button className="bg-[#B86B2B] hover:bg-[#E6A15A] text-white font-semibold px-8 py-3 rounded-full transition">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-[#B86B2B]">
                  GiaDụng
                </span>
                <span className="text-xs text-[#7A5C3E] font-medium tracking-wide">
                  Mua sắm tiện nghi mỗi ngày
                </span>
              </div>
            </Link>
            <p className="text-[#7A5C3E] mb-6">
              Chuyên cung cấp các sản phẩm gia dụng chất lượng cao, đa dạng mẫu
              mã, giá cả phải chăng. Cam kết mang đến trải nghiệm mua sắm tốt
              nhất cho khách hàng.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#B86B2B] mb-6">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/promotions"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Khuyến mãi
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Thương hiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-[#B86B2B] mb-6">
              Chăm sóc khách hàng
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/account"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Tài khoản
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Đơn hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Yêu thích
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-[#7A5C3E] hover:text-[#B86B2B] transition"
                >
                  Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#B86B2B] mb-6">
              Liên hệ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#B86B2B] mt-1" />
                <span className="text-[#7A5C3E]">
                  123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-[#B86B2B]" />
                <span className="text-[#7A5C3E]">1900-xxxx</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#B86B2B]" />
                <span className="text-[#7A5C3E]">info@giadung.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E5E3DF]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#7A5C3E] text-sm">
              © 2024 GiaDụng. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-[#7A5C3E] hover:text-[#B86B2B] text-sm transition"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms"
                className="text-[#7A5C3E] hover:text-[#B86B2B] text-sm transition"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="/shipping"
                className="text-[#7A5C3E] hover:text-[#B86B2B] text-sm transition"
              >
                Chính sách vận chuyển
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
