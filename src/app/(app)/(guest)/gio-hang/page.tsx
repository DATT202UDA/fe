'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { FiTrash2, FiMinus, FiPlus, FiX, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import { useState } from 'react';
import { orderService, Currency, OrderItem } from '@/services/OrderService';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInfo } from '@/contexts/InfoContext';

export default function CartPage() {
  const router = useRouter();
  const session = useSession();
  const { refreshUserInfo } = useInfo();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    toggleSelect,
    toggleSelectAll,
    getSelectedItems,
  } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const selectedTotal = items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const selectedItemsList = items.filter((item) => item.selected);

  const handleSelectAll = () => {
    toggleSelectAll();
  };

  const handleSelectItem = (id: string) => {
    toggleSelect(id);
  };

  const handleDeleteSelected = () => {
    const selectedIds = items
      .filter((item) => item.selected)
      .map((item) => item.id);
    selectedIds.forEach((id) => removeItem(id));
  };

  const handleCheckout = () => {
    if (selectedItemsList.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirmOrder = async () => {
    try {
      setIsSubmitting(true);

      if (session.status === 'unauthenticated') {
        redirect('/dang-nhap');
      }

      const orderItems: OrderItem[] = selectedItemsList.map((item) => ({
        productId: item.id,
        nameSnapshot: item.name,
        unitPrice: item.price,
        quantity: item.quantity,
        currency: Currency.VND,
      }));

      const orderData = {
        items: orderItems,
        currency: Currency.VND,
      };

      console.log(orderData, 'orderData');

      const response = await orderService.createOrder(orderData);

      if (response.message === 'success') {
        toast.success('Đặt hàng thành công!');
        selectedItemsList.forEach((item) => removeItem(item.id));
        setShowConfirmationModal(false);
        await refreshUserInfo();
        router.push('/mua'); // Redirect to orders page
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E9DA]/30 to-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:border-[#E6A15A] hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col items-center space-y-6">
              {/* Shopping Cart Icon */}
              <div className="w-24 h-24 bg-[#F5E9DA] rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[#B86B2B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-[#7A5C3E]">
                Giỏ hàng trống
              </h1>

              <p className="text-[#7A5C3E]/70 text-center">
                Hãy thêm một vài sản phẩm vào giỏ hàng của bạn và quay lại đây
                nhé!
              </p>

              <Link
                href="/san-pham"
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#B86B2B] text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-[#E6A15A]"
              >
                <span className="relative z-10">Khám phá sản phẩm</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#E6A15A] transition-transform duration-300 ease-in-out"></div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E9DA]/30 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#7A5C3E] mb-8">
          Giỏ hàng của bạn
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header với checkbox chọn tất cả */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#F5E9DA] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={items.every((item) => item.selected)}
                  onChange={handleSelectAll}
                  className="w-5 h-5 text-[#B86B2B] rounded border-[#E6A15A] focus:ring-[#B86B2B]"
                />
                <span className="text-[#7A5C3E]">Chọn tất cả</span>
              </div>
              <button
                onClick={handleDeleteSelected}
                className="text-[#B86B2B] hover:text-[#E6A15A] transition-colors flex items-center gap-2"
              >
                <FiTrash2 className="w-5 h-5" />
                <span>Xóa sản phẩm đã chọn</span>
              </button>
            </div>

            {/* Danh sách sản phẩm */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-[#F5E9DA]"
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox chọn sản phẩm */}
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-5 h-5 text-[#B86B2B] rounded border-[#E6A15A] focus:ring-[#B86B2B]"
                  />

                  {/* Ảnh sản phẩm */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#7A5C3E] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-[#B86B2B] font-medium mb-2">
                      {formatCurrency(item.price)}
                    </p>

                    {/* Điều chỉnh số lượng */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border-2 border-[#F5E9DA] rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-[#7A5C3E] hover:text-[#B86B2B] transition-colors"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 border-x border-[#F5E9DA] text-[#7A5C3E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-[#7A5C3E] hover:text-[#B86B2B] transition-colors"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Nút xóa */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#B86B2B] hover:text-[#E6A15A] transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Tổng tiền cho sản phẩm */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-[#7A5C3E]">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng kết đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#F5E9DA] sticky top-8">
              <h2 className="text-xl font-bold text-[#7A5C3E] mb-6">
                Tổng kết đơn hàng
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#7A5C3E]/70">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(selectedTotal)}</span>
                </div>
                <div className="flex justify-between text-[#7A5C3E]/70">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="border-t border-[#F5E9DA] pt-4">
                  <div className="flex justify-between text-lg font-semibold text-[#7A5C3E]">
                    <span>Tổng cộng</span>
                    <span>{formatCurrency(selectedTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  className="block w-full bg-[#B86B2B] text-white py-3 rounded-xl hover:bg-[#E6A15A] transition-colors text-center"
                >
                  Tiến hành thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#7A5C3E]">
                Xác nhận đặt hàng
              </h2>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="text-[#7A5C3E]/70 hover:text-[#7A5C3E]"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-[#7A5C3E]">
                Chi tiết đơn hàng:
              </h3>
              <div className="max-h-60 overflow-y-auto">
                {selectedItemsList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-2 border-b border-[#F5E9DA]"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#7A5C3E]">
                        {item.name}
                      </h4>
                      <p className="text-sm text-[#7A5C3E]/70">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-[#B86B2B]">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F5E9DA] pt-4">
                <div className="flex justify-between text-lg font-semibold text-[#7A5C3E]">
                  <span>Tổng thanh toán:</span>
                  <span>{formatCurrency(selectedTotal)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="flex-1 py-3 border-2 border-[#B86B2B] text-[#B86B2B] rounded-xl hover:bg-[#B86B2B] hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-[#B86B2B] text-white rounded-xl hover:bg-[#E6A15A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Đang xử lý...
                  </div>
                ) : (
                  'Xác nhận đặt hàng'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
