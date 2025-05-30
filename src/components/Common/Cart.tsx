"use client";
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from './CartItem';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const Cart: React.FC = () => {
  const router = useRouter();
  const {
    items,
    toggleSelectAll,
    getTotalAmount,
    getSelectedItems,
  } = useCart();

  const handleCheckout = () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Giỏ hàng</h2>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={items.every(item => item.selected)}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Chọn tất cả</span>
              </label>
            </div>

            <div className="mb-6">
              {items.map(item => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <div className="text-xl font-semibold">
                Tổng tiền: {getTotalAmount().toLocaleString('vi-VN')}đ
              </div>
              <button
                onClick={handleCheckout}
                disabled={getSelectedItems().length === 0}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-colors
                  ${getSelectedItems().length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                Thanh toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 