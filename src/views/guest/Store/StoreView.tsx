'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import StoreService, { Store } from '@/services/StoreService';
import ProductService, { Product } from '@/services/ProductService';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaStore,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaShoppingCart,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useCart } from '@/contexts/CartContext';
import { CartProvider } from '@/contexts/CartContext';
import StoreReview from './components/StoreReview';
import StoreReviewList from './components/StoreReviewList';


export default function StoreView() {
  const params = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  console.log(params.id, 'params');

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      const storeId = params.id as string;
      const storeData = await StoreService.getById(storeId);
      setStore(storeData);

      // Fetch store products
      const { data: productsData } = await ProductService.findByStore(storeId);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching store data:', error);
      toast.error('Không thể tải thông tin cửa hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image_url || '/images/default-product.png'
    });
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleReviewAdded = () => {
    // Refresh store data to update rating
    fetchStoreData();
  };

  useEffect(() => {
    if (params.id) {
      fetchStoreData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E6A15A]"></div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#B86B2B] mb-4">
            Không tìm thấy cửa hàng
          </h1>
          <p className="text-gray-600">
            Cửa hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#FDFBF8] to-white">
        {/* Store Header */}
        <div className="relative h-[44vh] md:h-[38vh] bg-[#F8F6F3] flex items-center border-b border-[#E6A15A]/20">
          <Image
            src={store.image_url || '/images/default-store.png'}
            alt="Store Cover"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F3]/80 via-white/60 to-[#F8F6F3]/80" />
          
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-32 h-32 md:w-36 md:h-36 z-10"
              >
                <Image
                  src={store.image_url || '/images/default-store.png'}
                  alt={store.name}
                  fill
                  className="object-cover rounded-2xl border-4 border-white shadow-xl bg-white"
                />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-5xl font-extrabold text-[#B86B2B] drop-shadow mb-2"
                  >
                    {store.name}
                  </motion.h1>
                  <div className="flex items-center gap-1 text-[#E6A15A]">
                    <FaStar />
                    <span className="font-semibold">{store.rate_avg.toFixed(1)}</span>
                  </div>
                </div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl"
                >
                  {store.description}
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Content */}
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="sticky top-8">
                <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-[#E6A15A]/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#E6A15A]/10 flex items-center justify-center">
                      <FaStore className="text-[#E6A15A]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#B86B2B]">
                      Thông tin cửa hàng
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-[#E6A15A] mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Địa chỉ</p>
                        <p className="text-[#7A5C3E]">{store.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaPhone className="text-[#E6A15A] mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Số điện thoại</p>
                        <p className="text-[#7A5C3E]">{store.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaEnvelope className="text-[#E6A15A] mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-[#7A5C3E]">{store.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-8">
              {/* Products Grid */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-[#E6A15A]/10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#B86B2B]">
                      Sản phẩm của cửa hàng
                    </h2>
                  </div>

                  {products.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Cửa hàng chưa có sản phẩm nào</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <motion.div
                          key={product._id}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E6A15A]/10 hover:shadow-md transition-shadow"
                        >
                          <div className="relative h-48">
                            <Image
                              src={product.image_url || '/images/default-product.png'}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-[#B86B2B] mb-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-[#E6A15A]">
                                {product.price.toLocaleString('vi-VN')}đ
                              </span>
                              <button 
                                onClick={() => handleAddToCart(product)}
                                className="p-2 rounded-full bg-[#E6A15A]/10 text-[#E6A15A] hover:bg-[#E6A15A]/20 transition-colors"
                              >
                                <FaShoppingCart />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Reviews Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <StoreReview storeId={params.id as string} onReviewAdded={handleReviewAdded} />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-[#E6A15A]/10">
                  <h2 className="text-2xl font-bold text-[#B86B2B] mb-6">Đánh giá từ khách hàng</h2>
                  <StoreReviewList storeId={params.id as string} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
} 