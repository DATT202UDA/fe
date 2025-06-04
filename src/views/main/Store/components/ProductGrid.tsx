import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaBox, FaStar, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Product as ProductType } from '@/services/ProductService'; // Import Product type

interface ProductGridProps {
  products: ProductType[];
  productsLoading: boolean;
  handleEdit: (product: ProductType) => void;
  handleDelete: (product: ProductType) => void;
  handleAddProduct: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  productsLoading,
  handleEdit,
  handleDelete,
  handleAddProduct,
}) => {
  return (
    <>
      {productsLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-[#E6A15A] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-[#9B7B5C]">Đang tải sản phẩm...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-[#E6A15A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="text-3xl text-[#E6A15A]" />
          </div>
          <h3 className="text-xl font-semibold text-[#9B7B5C] mb-2">
            Chưa có sản phẩm nào
          </h3>
          <p className="text-gray-600 mb-6">
            Hãy thêm sản phẩm đầu tiên của bạn
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddProduct}
            className="bg-[#E6A15A] hover:bg-[#F0B97A] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 mx-auto"
          >
            <FaPlus />
            Thêm sản phẩm đầu tiên
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <div className="relative pt-[100%]">
                <Image
                  src={product.image_url || '/images/default-product.png'} // Default image if image_url is null/undefined
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(product)}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#E6A15A] hover:text-white transition-colors shadow-lg"
                  >
                    <FaEdit className="text-lg" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(product)}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                  >
                    <FaTrash className="text-lg" />
                  </motion.button>
                </div>
                {product.status === 'active' && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      Đang bán
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#9B7B5C] text-lg mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {product.description || 'Không có mô tả'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-[#E6A15A]">
                      {product.price.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-xs text-gray-400">Đã bán: 0</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <span className="text-sm text-gray-600">5.0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductGrid;
