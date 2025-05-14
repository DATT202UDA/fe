import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Product } from '@/types/product';
import { useTopRatedProducts } from '@/hooks/Products/useTopRatedProducts';

const ProductCard = ({ product }: { product: Product }) => (
  <motion.div
    key={product._id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="group bg-white rounded-2xl shadow-lg overflow-hidden"
  >
    <div className="relative h-48 md:h-64">
      <Image
        src={product.image || '/images/placeholder.jpg'}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {product.status === 'out_of_stock' && (
        <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
          Hết hàng
        </div>
      )}
      <div className="absolute top-3 md:top-4 right-3 md:right-4 flex flex-col gap-2">
        <button className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-[#B86B2B] hover:text-white transition-colors duration-300">
          <FaHeart className="text-sm md:text-base" />
        </button>
        <button
          className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-[#B86B2B] hover:text-white transition-colors duration-300"
          disabled={product.status === 'out_of_stock'}
        >
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
                i < Math.floor(product.rate_avg)
                  ? 'fill-current'
                  : 'fill-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <h3 className="text-base md:text-lg font-semibold text-[#7A5C3E] mb-2">
        {product.name}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-lg md:text-xl font-bold text-[#B86B2B]">
          {product.price.toLocaleString('vi-VN')}đ
        </span>
        <Link
          href={`/products/${product._id}`}
          className="text-[#B86B2B] hover:text-[#E6A15A] transition-colors duration-300 text-sm md:text-base"
        >
          Chi tiết
        </Link>
      </div>
      <div className="mt-2 text-sm text-gray-500">{product.store_id.name}</div>
    </div>
  </motion.div>
);

export const FeaturedProducts = () => {
  const { products, isLoading, error } = useTopRatedProducts();

  return (
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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 md:h-64 rounded-2xl"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-[#B86B2B] hover:text-[#E6A15A]"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
