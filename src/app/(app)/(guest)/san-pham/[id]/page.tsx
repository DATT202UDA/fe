'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheckCircle,
  FiMinus,
  FiPlus,
} from 'react-icons/fi';

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  specifications: {
    brand: string;
    model: string;
    warranty: string;
    origin: string;
    power: string;
    size: string;
    color: string;
  };
  features: string[];
}

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const product: ProductDetail = {
    id: '1',
    name: 'Máy hút bụi thông minh Robot Vacuum Cleaner',
    price: 2500000,
    originalPrice: 3000000,
    discount: 17,
    rating: 4.8,
    reviewCount: 128,
    description:
      'Máy hút bụi thông minh với công nghệ laser mapping, tự động lập bản đồ và làm sạch hiệu quả. Tích hợp ứng dụng điều khiển qua điện thoại, lên lịch dọn dẹp tự động và theo dõi quá trình làm sạch.',
    images: [
      '/images/products/vacuum-1.jpg',
      '/images/products/vacuum-2.jpg',
      '/images/products/vacuum-3.jpg',
      '/images/products/vacuum-4.jpg',
    ],
    specifications: {
      brand: 'SmartHome',
      model: 'VC-2000',
      warranty: '12 tháng',
      origin: 'Hàn Quốc',
      power: '2200W',
      size: '35 x 35 x 10 cm',
      color: 'Đen/Trắng',
    },
    features: [
      'Công nghệ laser mapping chính xác',
      'Điều khiển qua ứng dụng di động',
      'Lên lịch dọn dẹp tự động',
      'Tự động quay về sạc',
      'Chế độ làm sạch thông minh',
      'Bộ lọc HEPA cao cấp',
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E9DA]/30 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5E3DF]">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-[#B86B2B]'
                      : 'border-[#E5E3DF]'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5E3DF]">
              <h1 className="text-2xl font-bold text-[#7A5C3E] mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FiStar className="w-5 h-5 fill-current" />
                  <span className="font-medium text-[#7A5C3E]">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({product.reviewCount} đánh giá)
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#B86B2B]">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm font-medium">
                    -{product.discount}%
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiTruck className="w-5 h-5 text-[#B86B2B]" />
                  <span>Miễn phí vận chuyển cho đơn từ 2 triệu</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiShield className="w-5 h-5 text-[#B86B2B]" />
                  <span>
                    Bảo hành chính hãng {product.specifications.warranty}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiRefreshCw className="w-5 h-5 text-[#B86B2B]" />
                  <span>Đổi trả miễn phí trong 30 ngày</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-[#E5E3DF] rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:text-[#B86B2B] transition-colors"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x border-[#E5E3DF]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-[#B86B2B] transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`p-2 rounded-lg transition-colors ${
                      isWishlist
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <FiHeart
                      className={`w-5 h-5 ${isWishlist ? 'fill-current' : ''}`}
                    />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-[#B86B2B] hover:bg-[#F5E9DA] rounded-lg transition-colors">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>

                <button className="w-full bg-[#B86B2B] text-white py-4 rounded-xl hover:bg-[#E6A15A] transition-colors font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <FiShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5E3DF]">
              <h2 className="text-xl font-bold text-[#7A5C3E] mb-4">
                Mô tả sản phẩm
              </h2>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <h3 className="text-lg font-bold text-[#7A5C3E] mb-4">
                Thông số kỹ thuật
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-[#B86B2B]" />
                    <span className="text-gray-600">
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#7A5C3E] mb-4">
                Tính năng nổi bật
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-[#B86B2B]" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
