import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

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

export const CategoriesSection = () => {
  return (
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
  );
};
