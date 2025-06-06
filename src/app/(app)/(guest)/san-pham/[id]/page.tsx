'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
  FiMapPin,
  FiPhone,
  FiMail,
} from 'react-icons/fi';
import ProductService, { Product } from '@/services/ProductService';
import ShopService, { StoreData } from '@/services/ShopService';
import { toast } from 'react-hot-toast';
import { AddToCartButton } from '@/components/Common/AddToCartButton';
import Link from 'next/link';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [store, setStore] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productData = await ProductService.findOne(id as string);
        setProduct(productData);
        console.log("productData", productData);
        
        // Fetch store information
        if (productData.store_id) {
          const storeData = await ShopService.getStoreById(productData.store_id);
          setStore(storeData);
        }
      } catch (error) {
        toast.error('Không tìm thấy sản phẩm!');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const formatCurrency = (amount: number) =>
    amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E6A15A]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Sản phẩm không tồn tại hoặc đã bị xóa.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E9DA]/30 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5E3DF]">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.image_url || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Nếu có nhiều ảnh, hiển thị thumbnail */}
            {/* <div className="grid grid-cols-4 gap-4">
              {[product.image_url].map((image, index) => (
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
            </div> */}
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
                    4.8
                  </span>
                </div>
                <span className="text-gray-500">
                  (128 đánh giá)
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#B86B2B]">
                    {formatCurrency(product.price)}
                  </span>
                  {/* Nếu có giá gốc và giảm giá */}
                  {/* <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm font-medium">
                    -17%
                  </span> */}
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
                    Bảo hành chính hãng 12 tháng
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

                <div className="flex gap-4">
                  <AddToCartButton
                    product={{
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image_url,
                    }}
                    quantity={quantity}
                    variant="full"
                  />
                  <button className="flex-1 bg-[#7A5C3E] text-white py-4 rounded-xl hover:bg-[#9B7B5C] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Store Information */}
            {store && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5E3DF]">
                <h2 className="text-xl font-bold text-[#7A5C3E] mb-4">
                  Thông tin cửa hàng
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={store.image_url || '/images/store-placeholder.jpg'}
                      alt={store.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href={`/cua-hang/${store._id}`} className="hover:underline">
                      <h3 className="text-lg font-semibold text-[#7A5C3E]">
                        {store.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FiStar className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600">
                        {store.rate_avg.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiMapPin className="w-5 h-5 text-[#B86B2B]" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiPhone className="w-5 h-5 text-[#B86B2B]" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiMail className="w-5 h-5 text-[#B86B2B]" />
                    <span>{store.email}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Product Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5E3DF]">
              <h2 className="text-xl font-bold text-[#7A5C3E] mb-4">
                Mô tả sản phẩm
              </h2>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Nếu có thông số kỹ thuật */}
              {/* <h3 className="text-lg font-bold text-[#7A5C3E] mb-4">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
