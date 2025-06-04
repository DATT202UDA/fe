import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import CategoryService from '@/services/CategoryService';
import { Category } from '@/types/category';
const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.findAll();
        setCategories(response.categories.slice(0, 4)); // Access categories from response
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative h-48 md:h-64 rounded-2xl overflow-hidden bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-48 md:h-64 rounded-2xl overflow-hidden"
            >
              <Image
                src={category.image_url || '/images/categories/default.jpg'}
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
                  href={`/san-pham`}
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

export default Categories;
