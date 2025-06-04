import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaStore,
  FaBox,
  FaChartLine,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaCog,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from 'react-icons/fa';
import { Store } from '@/services/StoreService'; // Import Store type
import { Product as ProductType } from '@/services/ProductService'; // Import Product type
import AddProductModal from './AddProductModal';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';
import ProductGrid from './ProductGrid';

interface ApprovedStoreViewProps {
  shopInfo: Store;
  products: ProductType[];
  productsLoading: boolean;
  categories: { id: string; name: string }[];
  isStoreSettingsOpen: boolean;
  setIsStoreSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleStoreEdit: () => void;
  handleStoreDelete: () => void;
  handleAddProduct: () => void;
  isAddModalOpen: boolean;
  handleCloseModals: () => void;
  handleAddProductSubmit: (data: any) => Promise<void>; // Use appropriate type for data
  isAddingProduct: boolean;
  isDeleteModalOpen: boolean;
  handleDeleteProduct: () => Promise<void>;
  isEditModalOpen: boolean;
  selectedProduct: ProductType | null;
  handleUpdateProduct: (data: any) => Promise<void>; // Use appropriate type for data
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  // Pass form control props if needed within this component
  // For now, assuming form handling is outside this component or passed down
  // If form is used inside, need to pass control, handleSubmit, errors, reset
  handleEdit: (product: ProductType) => void;
  handleDelete: (product: ProductType) => void;
}

const ApprovedStoreView: React.FC<ApprovedStoreViewProps> = ({
  shopInfo,
  products,
  productsLoading,
  categories,
  isStoreSettingsOpen,
  setIsStoreSettingsOpen,
  handleStoreEdit,
  handleStoreDelete,
  handleAddProduct,
  isAddModalOpen,
  handleCloseModals,
  handleAddProductSubmit,
  isAddingProduct,
  isDeleteModalOpen,
  handleDeleteProduct,
  isEditModalOpen,
  selectedProduct,
  handleUpdateProduct,
  imagePreview,
  setImagePreview,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF8] to-white">
      {/* Shop Header */}
      <div className="relative h-[44vh] md:h-[38vh] bg-[#F8F6F3] flex items-center border-b border-[#E6A15A]/20">
        <Image
          src={shopInfo.image_url || '/images/default-store.png'}
          alt="Shop Cover"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F3]/80 via-white/60 to-[#F8F6F3]/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-32 h-32 md:w-36 md:h-36 z-10"
              >
                <Image
                  src={shopInfo.image_url || '/images/default-store.png'}
                  alt={shopInfo.name}
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
                    {shopInfo.name}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setIsStoreSettingsOpen(!isStoreSettingsOpen)
                      }
                      className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#E6A15A] hover:text-white transition-colors shadow-lg"
                    >
                      <FaCog className="text-lg" />
                    </motion.button>
                    <AnimatePresence>
                      {isStoreSettingsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl overflow-hidden z-20 border border-gray-100"
                        >
                          <div className="p-3">
                            <button
                              onClick={handleStoreEdit}
                              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-gray-50 rounded-xl transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-[#E6A15A]/10 flex items-center justify-center group-hover:bg-[#E6A15A] transition-colors">
                                <FaEdit className="text-[#E6A15A] text-lg group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <span className="text-gray-700 font-medium block text-base">
                                  Chỉnh sửa cửa hàng
                                </span>
                                <span className="text-gray-400 text-sm mt-0.5">
                                  Cập nhật thông tin cửa hàng
                                </span>
                              </div>
                            </button>
                            <button
                              onClick={handleStoreDelete}
                              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-red-50 rounded-xl transition-colors group mt-2"
                            >
                              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                                <FaTrash className="text-red-500 text-lg group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <span className="text-red-500 font-medium block text-base">
                                  Xóa cửa hàng
                                </span>
                                <span className="text-gray-400 text-sm mt-0.5">
                                  Xóa vĩnh viễn cửa hàng
                                </span>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex items-center gap-8 mt-2"
                >
                  <div className="flex items-center gap-2 text-[#E6A15A] font-semibold text-lg">
                    <FaStar className="text-[#FFE5A3]" />
                    <span>{(shopInfo.rate_avg || 0).toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#B86B2B] font-medium">
                    <FaBox />
                    <span>{products.length} sản phẩm</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#B86B2B] font-medium">
                    <FaChartLine />
                    <span>0 đơn hàng</span>
                    {/* TODO: Implement actual order count */}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content - Shop Info and Products */}
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
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F6F3] hover:bg-[#F8F6F3]/80 transition-colors">
                    <FaMapMarkerAlt className="text-[#E6A15A] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#B86B2B] mb-1">
                        Địa chỉ
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {shopInfo.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F6F3] hover:bg-[#F8F6F3]/80 transition-colors">
                    <FaPhone className="text-[#E6A15A] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#B86B2B] mb-1">
                        Điện thoại
                      </h3>
                      <p className="text-gray-700 text-sm">{shopInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F6F3] hover:bg-[#F8F6F3]/80 transition-colors">
                    <FaEnvelope className="text-[#E6A15A] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#B86B2B] mb-1">Email</h3>
                      <p className="text-gray-700 text-sm">{shopInfo.email}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F6F3] hover:bg-[#F8F6F3]/80 transition-colors">
                    <h3 className="font-medium text-[#B86B2B] mb-1">Mô tả</h3>
                    <p className="text-gray-700 text-sm">
                      {shopInfo.description || 'Không có mô tả'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="lg:col-span-9">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#9B7B5C]">
                Sản phẩm của cửa hàng
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddProduct}
                className="bg-[#E6A15A] hover:bg-[#F0B97A] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
              >
                <FaPlus />
                Thêm sản phẩm
              </motion.button>
            </div>

            <ProductGrid
              products={products}
              productsLoading={productsLoading}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleAddProduct={handleAddProduct}
            />
          </div>
        </div>
      </div>
      {/* Modals (Always render, visibility controlled by state) */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        categories={categories}
        onSubmit={handleAddProductSubmit}
        isLoading={isAddingProduct}
      />
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        product={selectedProduct}
        onConfirm={handleDeleteProduct}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        product={selectedProduct}
        categories={categories}
        onSubmit={handleUpdateProduct}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        // Pass form control props if EditProductModal handles its own form
        // If form is handled in StoreView, pass control, handleSubmit, errors, reset
        // Assuming form is handled in EditProductModal and receives initial values/onSubmit
      />
    </div>
  );
};

export default ApprovedStoreView;
