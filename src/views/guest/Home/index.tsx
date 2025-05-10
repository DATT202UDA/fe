'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';

const HomeView = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Máy hút bụi thông minh',
      price: '2.990.000đ',
      image: '/images/products/vacuum.jpg',
      rating: 4.5,
      discount: 15,
    },
    {
      id: 2,
      name: 'Nồi cơm điện cao cấp',
      price: '1.890.000đ',
      image: '/images/products/rice-cooker.jpg',
      rating: 4.8,
      discount: 10,
    },
    {
      id: 3,
      name: 'Máy giặt lồng đôi',
      price: '12.990.000đ',
      image: '/images/products/washer.jpg',
      rating: 4.7,
      discount: 20,
    },
    {
      id: 4,
      name: 'Tủ lạnh Side by Side',
      price: '25.990.000đ',
      image: '/images/products/fridge.jpg',
      rating: 4.9,
      discount: 12,
    },
  ];

  const categories = [
    {
      id: 1,
      name: 'Đồ gia dụng nhà bếp',
      image: '/images/categories/kitchen.jpg',
    },
    {
      id: 2,
      name: 'Đồ gia dụng phòng tắm',
      image: '/images/categories/bathroom.jpg',
    },
    {
      id: 3,
      name: 'Đồ gia dụng phòng khách',
      image: '/images/categories/living.jpg',
    },
    {
      id: 4,
      name: 'Đồ gia dụng phòng ngủ',
      image: '/images/categories/bedroom.jpg',
    },
  ];

  const brands = [
    { id: 1, name: 'Samsung', logo: '/images/brands/samsung.png' },
    { id: 2, name: 'LG', logo: '/images/brands/lg.png' },
    { id: 3, name: 'Panasonic', logo: '/images/brands/panasonic.png' },
    { id: 4, name: 'Electrolux', logo: '/images/brands/electrolux.png' },
    { id: 5, name: 'Sharp', logo: '/images/brands/sharp.png' },
  ];

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
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
              Mang đến giải pháp gia dụng thông minh, tiết kiệm thời gian và
              nâng tầm chất lượng cuộc sống cho gia đình bạn.
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

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#7A5C3E] mb-3 md:mb-4">
              Danh mục sản phẩm
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Lựa chọn từ nhiều danh mục đa dạng
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-48 md:h-64 rounded-2xl overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                  <Link
                    href={`/categories/${category.id}`}
                    className="inline-flex items-center text-white hover:text-[#FFD600] transition-colors duration-300 text-sm md:text-base"
                  >
                    Xem thêm
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#7A5C3E] mb-3 md:mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Những sản phẩm được yêu thích nhất
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48 md:h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.discount && (
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-[#B86B2B] text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 flex flex-col gap-2">
                    <button className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-[#B86B2B] hover:text-white transition-colors duration-300">
                      <FaHeart className="text-sm md:text-base" />
                    </button>
                    <button className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-[#B86B2B] hover:text-white transition-colors duration-300">
                      <FaShoppingCart className="text-sm md:text-base" />
                    </button>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-[#FFD600]">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm md:text-base ${
                            i < Math.floor(product.rating)
                              ? 'fill-current'
                              : 'fill-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs md:text-sm text-gray-600">
                      ({product.rating})
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-[#7A5C3E] mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl font-bold text-[#B86B2B]">
                      {product.price}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="text-[#B86B2B] hover:text-[#E6A15A] transition-colors duration-300 text-sm md:text-base"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#7A5C3E] mb-3 md:mb-4">
              Thương hiệu nổi bật
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Hợp tác với các thương hiệu uy tín hàng đầu
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-4 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-12 md:h-20">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 md:p-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#B86B2B]/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <FaShoppingCart className="text-xl md:text-2xl text-[#B86B2B]" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#7A5C3E] mb-3 md:mb-4">
                Giao hàng toàn quốc
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Miễn phí vận chuyển cho đơn hàng từ 2 triệu đồng
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 md:p-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#B86B2B]/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <FaStar className="text-xl md:text-2xl text-[#B86B2B]" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#7A5C3E] mb-3 md:mb-4">
                Chất lượng đảm bảo
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Cam kết sản phẩm chính hãng, bảo hành tận tâm
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 md:p-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#B86B2B]/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <FaHeart className="text-xl md:text-2xl text-[#B86B2B]" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#7A5C3E] mb-3 md:mb-4">
                Hỗ trợ 24/7
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Đội ngũ tư vấn nhiệt tình, chuyên nghiệp
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
