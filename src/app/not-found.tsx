'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-8xl md:text-9xl font-extrabold text-[#B86B2B] mb-6">
              404
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#7A5C3E] mb-4">
                Không tìm thấy trang
              </h2>
              <p className="text-[#7A5C3E] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
                không khả dụng.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/"
                className="inline-flex items-center bg-[#B86B2B] hover:bg-[#E6A15A] text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 text-lg"
              >
                Quay về trang chủ
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                href="/san-pham"
                className="inline-flex items-center bg-white hover:bg-gray-50 text-[#B86B2B] px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 text-lg border border-[#B86B2B]"
              >
                Xem sản phẩm
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2">
                  Sản phẩm chính hãng
                </h3>
                <p className="text-gray-600">
                  Cam kết chất lượng, bảo hành uy tín
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2">
                  Giao hàng nhanh chóng
                </h3>
                <p className="text-gray-600">Miễn phí vận chuyển toàn quốc</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2">
                  Hỗ trợ 24/7
                </h3>
                <p className="text-gray-600">Đội ngũ tư vấn nhiệt tình</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
