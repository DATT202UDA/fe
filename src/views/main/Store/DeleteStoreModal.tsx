import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

interface DeleteStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  storeName: string;
  isLoading: boolean;
}

const DeleteStoreModal = ({
  isOpen,
  onClose,
  onConfirm,
  storeName,
  isLoading,
}: DeleteStoreModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#9B7B5C]">
                Xác nhận xóa cửa hàng
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="text-2xl text-red-500" />
              </div>
              <div>
                <p className="text-gray-700 mb-2">
                  Bạn có chắc chắn muốn xóa cửa hàng &quot;{storeName}&quot;?
                </p>
                <p className="text-gray-500 text-sm">
                  Hành động này sẽ xóa vĩnh viễn cửa hàng và tất cả sản phẩm của
                  cửa hàng. Không thể hoàn tác sau khi xóa.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  'Xóa cửa hàng'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteStoreModal;
