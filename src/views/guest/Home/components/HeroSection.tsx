import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export const HeroSection = () => {
  return (
    <section className="relative bg-[#F8F6F3] py-8 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="text-[#B86B2B] text-sm font-semibold mb-3 md:mb-4">
            Đồ gia dụng thông minh cho mọi nhà
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 md:mb-6">
            Khám phá{' '}
            <span className="inline-block bg-[#B86B2B] text-white px-2 md:px-3 py-1 rounded-xl text-sm md:text-base">
              không gian sống
            </span>
            <br />
            tiện nghi với{' '}
            <span className="inline-block bg-gradient-to-r from-[#E6A15A] to-[#B86B2B] text-white px-2 md:px-3 py-1 rounded-xl text-sm md:text-base">
              sản phẩm hiện đại
            </span>
          </h1>
          <p className="text-[#7A5C3E] text-base md:text-lg mb-4 md:mb-6 max-w-xl mx-auto md:mx-0">
            Mang đến giải pháp gia dụng thông minh, tiết kiệm thời gian và nâng
            tầm chất lượng cuộc sống cho gia đình bạn.
          </p>
          <ul className="mb-6 md:mb-8 space-y-2">
            <li className="flex items-center gap-2 text-[#3CB371] font-medium text-sm md:text-base">
              <span className="w-2 h-2 bg-[#3CB371] rounded-full inline-block"></span>{' '}
              Sản phẩm chính hãng, bảo hành uy tín
            </li>
            <li className="flex items-center gap-2 text-[#3CB371] font-medium text-sm md:text-base">
              <span className="w-2 h-2 bg-[#3CB371] rounded-full inline-block"></span>{' '}
              Giao hàng nhanh toàn quốc
            </li>
            <li className="flex items-center gap-2 text-[#3CB371] font-medium text-sm md:text-base">
              <span className="w-2 h-2 bg-[#3CB371] rounded-full inline-block"></span>{' '}
              Hỗ trợ tư vấn 24/7
            </li>
          </ul>
          <Link
            href="/products"
            className="inline-flex items-center bg-[#B86B2B] hover:bg-[#E6A15A] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 text-base md:text-lg"
          >
            Khám phá ngay
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>

        {/* Right: Highlight Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 w-full max-w-md mt-8 md:mt-0"
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-[#E5E3DF]">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="text-[#B86B2B] font-bold text-base md:text-lg flex items-center gap-2">
                <span className="inline-block bg-[#B86B2B] text-white rounded-full px-2 md:px-3 py-1 text-sm md:text-base">
                  Ưu đãi hôm nay
                </span>
              </div>
              <span className="text-[#7A5C3E] text-xs md:text-sm">
                26/04/2025
              </span>
            </div>
            <div className="mb-4">
              <div className="text-2xl md:text-3xl font-extrabold text-[#B86B2B] mb-1">
                Giảm đến 20%
              </div>
              <div className="text-[#7A5C3E] text-sm md:text-base">
                Cho các sản phẩm gia dụng thông minh
              </div>
            </div>
            <div className="mt-4 md:mt-6">
              <Link
                href="/promotions"
                className="inline-block bg-[#B86B2B] hover:bg-[#E6A15A] text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 shadow-md text-sm md:text-base"
              >
                Xem ưu đãi
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
