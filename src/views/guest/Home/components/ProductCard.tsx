import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { Product } from '@/services/ProductService';
import { AddToCartButton } from '@/components/Common/AddToCartButton';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
    >
      <Link href={`/san-pham/${product._id}`} className="block relative h-48 md:h-64 w-full">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 md:top-4 right-3 md:right-4 flex flex-col gap-2">
          <button className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-[#B86B2B] hover:text-white transition-colors duration-300">
            <FaHeart className="text-sm md:text-base" />
          </button>
        </div>
      </Link>
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <Link href={`/san-pham/${product._id}`} className="block flex-grow">
          <h3 className="text-base md:text-lg font-semibold text-[#7A5C3E] mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex flex-col">
          <span className="text-lg md:text-xl font-bold text-[#B86B2B] mb-2">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
          <div className="flex items-center gap-2">
            <AddToCartButton
              product={{
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image_url,
              }}
            />
            <Link
              href={`/san-pham/${product._id}`}
              className="text-[#B86B2B] hover:text-[#E6A15A] transition-colors duration-300 text-sm md:text-base"
            >
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
