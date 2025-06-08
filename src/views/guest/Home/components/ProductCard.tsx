import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { Product } from '@/services/ProductService';
import { AddToCartButton } from '@/components/Common/AddToCartButton';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const rating = product.rate_avg; // Fallback to 4.5 if rating is not provided

  return (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300"
    >
      <Link
        href={`/san-pham/${product._id}`}
        className="block relative h-48 md:h-64 w-full overflow-hidden"
      >
        <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <FaStar className="text-yellow-400 w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">
            {rating.toFixed(1) || 5.0}
          </span>
        </div>
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <Link href={`/san-pham/${product._id}`} className="block flex-grow">
          <h3 className="text-base md:text-lg font-semibold text-[#7A5C3E] mb-2 line-clamp-2 hover:text-[#B86B2B] transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex flex-col gap-3">
          <span className="text-lg md:text-xl font-bold text-[#B86B2B]">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
          <div className="flex flex-col gap-2 justify-between">
            <AddToCartButton
              product={{
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image_url,
              }}
              variant="default"
            />
            {/* <Link
              href={`/san-pham/${product._id}`}
              className="flex items-center justify-center bg-white border-2 border-[#B86B2B] text-[#B86B2B] py-2 px-4 rounded-lg hover:bg-[#B86B2B] hover:text-white transition-all duration-300 text-sm md:text-base"
            >
              Chi tiết
            </Link> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
