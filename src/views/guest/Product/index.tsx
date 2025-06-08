'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
  FaCheckCircle,
  FaTimesCircle,
  FaStore,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import ProductService from '@/services/ProductService';
import CategoryService from '@/services/CategoryService';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Category } from '@/types/category';
import { useCart } from '@/contexts/CartContext';

// Custom hook for debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface Store {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image_url?: string;
  status?: string;
  store_id: Store | string;
}

const ProductView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [tempPriceRange, setTempPriceRange] = useState([0, 50000000]);
  const [isPriceFilterEnabled, setIsPriceFilterEnabled] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { addItem } = useCart();
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);

  // Function to update URL params
  const updateUrlParams = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    router.push(`?${params.toString()}`);
  };

  // Handle category selection with URL update
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateUrlParams(category);
  };

  // Update search with URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchQuery) {
      params.set('search', debouncedSearchQuery);
    } else {
      params.delete('search');
    }
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`);
  }, [debouncedSearchQuery, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.findAll();
      setCategories(response.categories);
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
        debouncedSearchQuery || undefined,
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
  }, [
    currentPage,
    sortBy,
    selectedCategory,
    debouncedSearchQuery,
    priceRange,
    isPriceFilterEnabled,
  ]);

  // Reset price filter when changing category or search
  useEffect(() => {
    setIsPriceFilterEnabled(false);
    setPriceRange([0, 50000000]);
    setTempPriceRange([0, 50000000]);
  }, [selectedCategory, debouncedSearchQuery]);

  const handleAddToCart = (product: Product) => {
    if (!product.image_url) return;
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
    setIsPriceFilterEnabled(true);
    setCurrentPage(1);
    fetchProducts();
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to call fetchProducts here as it will be triggered by the useEffect
  };

  return (
    <div className="min-h-screen bg-[#FDFBF8]">
      {/* Hero Section */}
      <div className="relative h-[45vh] bg-gradient-to-br from-[#F8F6F3] to-[#E6A15A]/10 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F3] via-white/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C3D2E] mb-6 leading-tight">
              Đồ Gia Dụng <span className="text-[#B86B2B]">Chất Lượng</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Khám phá bộ sưu tập đồ gia dụng cao cấp với thiết kế hiện đại và
              chất lượng vượt trội
            </p>
          </motion.div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-[url('/home-decor.jpg')] bg-cover bg-center opacity-20 md:opacity-30" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-8 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-2xl shadow-sm p-4 backdrop-blur-xl bg-white/80">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset to first page when searching
                    }}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#E6A15A] focus:ring-4 focus:ring-[#E6A15A]/20 outline-none transition-all"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaSearch className="text-lg" />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-sm p-4 backdrop-blur-xl bg-white/80">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <h3 className="font-bold text-[#5C3D2E] text-xl">Danh Mục</h3>
                  <motion.div
                    animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaAngleDown className="text-xl text-[#5C3D2E]" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <button
                        onClick={() => handleCategorySelect('all')}
                        className={`w-full mt-6 flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                          selectedCategory === 'all'
                            ? 'bg-[#E6A15A] text-white shadow-[#E6A15A]/30 font-medium'
                            : 'bg-white hover:bg-[#E6A15A]/10 text-gray-700 hover:text-[#B86B2B] hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FaHome
                            className={`text-lg ${
                              selectedCategory === 'all'
                                ? 'text-white'
                                : 'text-[#E6A15A] group-hover:text-[#B86B2B]'
                            }`}
                          />
                          <span className="font-medium">Tất cả sản phẩm</span>
                        </div>
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category._id}
                          onClick={() => handleCategorySelect(category._id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                            selectedCategory === category._id
                              ? 'bg-[#E6A15A] text-white shadow-[#E6A15A]/30 font-medium'
                              : 'bg-white hover:bg-[#E6A15A]/10 text-gray-700 hover:text-[#B86B2B]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-2xl shadow-sm p-4 backdrop-blur-xl bg-white/80">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
                >
                  <h3 className="font-bold text-[#5C3D2E] text-xl">
                    Khoảng Giá
                  </h3>
                  <motion.div
                    animate={{ rotate: isPriceRangeOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaAngleDown className="text-xl text-[#5C3D2E]" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {isPriceRangeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8 mt-6 overflow-hidden"
                    >
                      {/* Min Price */}
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm font-medium text-gray-600">
                          <span>Giá tối thiểu</span>
                          <span className="text-[#E6A15A]">
                            {tempPriceRange[0].toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50000000"
                          step="1000000"
                          value={tempPriceRange[0]}
                          onChange={(e) =>
                            setTempPriceRange([
                              Number(e.target.value),
                              tempPriceRange[1],
                            ])
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E6A15A]"
                        />
                      </div>

                      {/* Max Price */}
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm font-medium text-gray-600">
                          <span>Giá tối đa</span>
                          <span className="text-[#E6A15A]">
                            {tempPriceRange[1].toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50000000"
                          step="1000000"
                          value={tempPriceRange[1]}
                          onChange={(e) =>
                            setTempPriceRange([
                              tempPriceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E6A15A]"
                        />
                      </div>

                      {/* Price Range Display */}
                      <div className="flex items-center justify-between text-sm font-medium bg-[#F8F6F3] p-4 rounded-xl">
                        <span className="text-gray-600">Khoảng giá:</span>
                        <span className="text-[#B86B2B]">
                          {tempPriceRange[0].toLocaleString('vi-VN')}đ -{' '}
                          {tempPriceRange[1].toLocaleString('vi-VN')}đ
                        </span>
                      </div>

                      {/* Apply Filter Button */}
                      <button
                        onClick={handleApplyPriceFilter}
                        className="w-full bg-[#E6A15A] text-white py-4 rounded-xl hover:bg-[#B86B2B] transition-all duration-300 font-medium shadow-lg shadow-[#E6A15A]/30 hover:shadow-xl hover:shadow-[#B86B2B]/30"
                      >
                        Áp dụng bộ lọc
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="lg:col-span-9 space-y-8">
            {/* Sort Options */}
            <div className="bg-white rounded-2xl shadow-sm p-6 backdrop-blur-xl bg-white/80 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-[#F8F6F3] border-2 border-gray-100 rounded-xl px-6 py-3 focus:border-[#E6A15A] focus:ring-4 focus:ring-[#E6A15A]/20 outline-none transition-all text-gray-700 font-medium"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price_asc">Giá tăng dần</option>
                  <option value="price_desc">Giá giảm dần</option>
                </select>
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center gap-3 text-gray-600 hover:text-[#B86B2B] transition-colors bg-[#F8F6F3] px-6 py-3 rounded-xl font-medium"
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
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  >
                    <div className="relative pt-[100%] bg-gray-100 animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-100 rounded-full animate-pulse w-3/4" />
                      <div className="h-4 bg-gray-100 rounded-full animate-pulse w-1/2" />
                      <div className="flex items-center justify-between pt-4">
                        <div className="h-6 bg-gray-100 rounded-full animate-pulse w-1/3" />
                        <div className="h-6 bg-gray-100 rounded-full animate-pulse w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center w-full gap-4">
                <FaSearch className="text-2xl text-gray-500" />
                <h1 className="text-xl text-gray-500">Không có sản phẩm nào</h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-sm group relative overflow-hidden hover:shadow-xl transition-all duration-500"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative h-full"
                    >
                      <Link
                        href={`/san-pham/${product._id}`}
                        className="block h-full"
                      >
                        <div className="relative pt-[100%] overflow-hidden bg-[#F8F6F3]">
                          <Image
                            src={product.image_url || '/placeholder.png'}
                            alt={product.name}
                            fill
                            className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-[#5C3D2E] text-lg line-clamp-2 group-hover:text-[#B86B2B] transition-colors duration-300">
                              {product.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-2">
                              <FaStore className="text-[#E6A15A]" />
                              {typeof product.store_id === 'object'
                                ? product.store_id.name
                                : 'Cửa hàng'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <motion.span
                              initial={{ scale: 0.95 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="text-xl font-bold text-[#B86B2B]"
                            >
                              {product.price.toLocaleString('vi-VN')}đ
                            </motion.span>

                            {product.status && (
                              <span
                                className={`text-sm px-3 py-1.5 rounded-full flex items-center gap-2 font-medium ${
                                  product.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {product.status === 'active' ? (
                                  <>
                                    <FaCheckCircle className="text-green-600" />
                                    Còn hàng
                                  </>
                                ) : (
                                  <>
                                    <FaTimesCircle className="text-gray-500" />
                                    Hết hàng
                                  </>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#E6A15A] hover:text-white transition-all duration-300 z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <FaShoppingCart className="text-lg" />
                      </motion.button>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-3">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePageChange(page)}
                        className={`w-12 h-12 rounded-xl border-2 font-medium ${
                          currentPage === page
                            ? 'border-[#E6A15A] bg-[#E6A15A] text-white shadow-lg shadow-[#E6A15A]/30'
                            : 'border-gray-200 text-gray-700 hover:border-[#E6A15A] hover:text-[#E6A15A]'
                        } flex items-center justify-center transition-all duration-300`}
                      >
                        {page}
                      </motion.button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
