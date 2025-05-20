'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import {
  FaStar,
  FaShoppingCart,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaHome,
  FaUtensils,
  FaBath,
  FaTv,
  FaSnowflake,
  FaTshirt,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ProductView = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data - replace with real data later
  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', count: 120, icon: FaHome },
    { id: 'kitchen', name: 'Đồ dùng nhà bếp', count: 45, icon: FaUtensils },
    { id: 'bathroom', name: 'Đồ dùng phòng tắm', count: 30, icon: FaBath },
    { id: 'electronics', name: 'Điện gia dụng', count: 25, icon: FaTv },
    { id: 'refrigerator', name: 'Tủ lạnh', count: 15, icon: FaSnowflake },
    { id: 'washing', name: 'Máy giặt', count: 20, icon: FaTshirt },
  ];

  const products = [
    {
      id: 1,
      name: 'Nồi cơm điện cao tần Panasonic',
      price: 2500000,
      image: '/images/product1.jpg',
      rating: 4.8,
      sold: 1200,
      store: 'Điện Máy Xanh',
      category: 'kitchen',
      discount: 15,
    },
    {
      id: 2,
      name: 'Máy giặt Samsung Inverter',
      price: 8500000,
      image: '/images/product2.jpg',
      rating: 4.5,
      sold: 800,
      store: 'Điện Máy Chợ Lớn',
      category: 'washing',
      discount: 10,
    },
    {
      id: 3,
      name: 'Tủ lạnh Side by Side LG',
      price: 25000000,
      image: '/images/product3.jpg',
      rating: 4.9,
      sold: 500,
      store: 'Điện Máy Xanh',
      category: 'refrigerator',
      discount: 20,
    },
    // Add more products...
  ];

  const handleAddToCart = (productId: number) => {
    toast.success('Đã thêm vào giỏ hàng');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF8] to-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#F8F6F3] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F3]/80 via-white/60 to-[#F8F6F3]/80" />
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#B86B2B] mb-4"
          >
            Đồ gia dụng chất lượng
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl"
          >
            Khám phá các sản phẩm gia dụng cao cấp với giá tốt nhất
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-8">
              {/* Search */}
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <h3 className="font-semibold text-[#B86B2B] mb-4">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#E6A15A] text-white'
                          : 'hover:bg-[#F8F6F3] text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className="text-lg" />
                        <span>{category.name}</span>
                      </div>
                      <span className="text-sm opacity-75">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <h3 className="font-semibold text-[#B86B2B] mb-4">
                  Khoảng giá
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="1000000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString('vi-VN')}đ</span>
                    <span>{priceRange[1].toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-9">
            {/* Sort and Filter */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex items-center justify-between">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#E6A15A] transition-colors"
              >
                <FaFilter />
                <span>Bộ lọc</span>
                {isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
              >
                <option value="newest">Mới nhất</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
                <option value="popular">Phổ biến</option>
              </select>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative pt-[100%]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.discount && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                          -{product.discount}%
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(product.id)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-[#E6A15A] px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2"
                    >
                      <FaShoppingCart />
                      Thêm vào giỏ
                    </motion.button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#9B7B5C] text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span>{product.store}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-[#E6A15A]">
                        <FaStar className="text-[#FFE5A3]" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-[#E6A15A]">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        {product.discount && (
                          <span className="text-sm text-gray-500 line-through">
                            {(
                              (product.price * (100 + product.discount)) /
                              100
                            ).toLocaleString('vi-VN')}
                            đ
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        Đã bán: {product.sold}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E6A15A] hover:text-[#E6A15A] transition-colors">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E6A15A] hover:text-[#E6A15A] transition-colors">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E6A15A] hover:text-[#E6A15A] transition-colors">
                  3
                </button>
                <span className="text-gray-500">...</span>
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#E6A15A] hover:text-[#E6A15A] transition-colors">
                  10
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
