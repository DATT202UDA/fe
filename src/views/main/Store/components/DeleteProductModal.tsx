import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Product as ProductType } from '@/services/ProductService'; // Import Product type

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType | null;
  onConfirm: () => Promise<void>;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#9B7B5C]">Xác nhận xóa</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa sản phẩm &quot;{product?.name}&quot;?
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Xóa
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteProductModal;
