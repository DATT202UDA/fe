'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
import ProductService, { Product } from '@/services/ProductService';
import CategoryService from '@/services/CategoryService';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Category } from '@/types/category';
import { useCart } from '@/contexts/CartContext';

const ProductView = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [isPriceFilterEnabled, setIsPriceFilterEnabled] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState([0, 50000000]);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const { addItem } = useCart();

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.findAll();
      setCategories(data);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tải danh mục');
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductService.findAll(
        currentPage,
        9,
        isPriceFilterEnabled ? priceRange[0] : undefined,
        isPriceFilterEnabled ? priceRange[1] : undefined,
        sortBy,
        selectedCategory !== 'all' ? selectedCategory : undefined,
        searchQuery || undefined
      );
      setProducts(response.products);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tải sản phẩm');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when any filter changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortBy, selectedCategory, searchQuery, priceRange, isPriceFilterEnabled]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    });
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApplyPriceFilter = () => {
    setPriceRange(tempPriceRange);
    fetchProducts();
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchProducts();
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
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                  />
                  <button 
                    type="submit" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E6A15A] transition-colors"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <h3 className="font-semibold text-[#B86B2B] mb-4">Danh mục</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#E6A15A] text-white'
                        : 'hover:bg-[#F8F6F3] text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FaHome className="text-lg" />
                      <span>Tất cả sản phẩm</span>
                    </div>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategory(category._id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category._id
                          ? 'bg-[#E6A15A] text-white'
                          : 'hover:bg-[#F8F6F3] text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{category.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#B86B2B]">
                    Khoảng giá
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isPriceFilterEnabled}
                      onChange={(e) => {
                        setIsPriceFilterEnabled(e.target.checked);
                        if (!e.target.checked) {
                          setPriceRange([0, 50000000]);
                          setTempPriceRange([0, 50000000]);
                          fetchProducts();
                        }
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E6A15A]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E6A15A]"></div>
                  </label>
                </div>
                
                {isPriceFilterEnabled && (
                  <div className="space-y-6">
                    {/* Min Price */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Giá tối thiểu</span>
                        <span>{tempPriceRange[0].toLocaleString('vi-VN')}đ</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000000"
                        step="1000000"
                        value={tempPriceRange[0]}
                        onChange={(e) =>
                          setTempPriceRange([Number(e.target.value), tempPriceRange[1]])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Max Price */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Giá tối đa</span>
                        <span>{tempPriceRange[1].toLocaleString('vi-VN')}đ</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000000"
                        step="1000000"
                        value={tempPriceRange[1]}
                        onChange={(e) =>
                          setTempPriceRange([tempPriceRange[0], Number(e.target.value)])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <button
                      onClick={handleApplyPriceFilter}
                      className="w-full bg-[#B86B2B] text-white py-2 rounded-lg hover:bg-[#E6A15A] transition-colors"
                    >
                      Áp dụng
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {/* Sort Options */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-transparent border border-gray-200 rounded-lg px-4 py-2 focus:border-[#E6A15A] focus:ring-2 focus:ring-[#E6A15A]/20 outline-none transition-colors"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price_asc">Giá tăng dần</option>
                  <option value="price_desc">Giá giảm dần</option>
                </select>
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-[#B86B2B] transition-colors"
              >
                <FaFilter />
                <span>Bộ lọc</span>
              </button>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-sm p-4 animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <Link href={`/san-pham/${product._id}`}>
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-[#B86B2B] font-medium mb-4">
                        {product.price.toLocaleString('vi-VN')}đ
                      </p>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#B86B2B] text-white py-2 rounded-lg hover:bg-[#E6A15A] transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart />
                      Thêm vào giỏ
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      currentPage === index + 1
                        ? 'bg-[#B86B2B] text-white'
                        : 'bg-white text-gray-600 hover:bg-[#F8F6F3]'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;