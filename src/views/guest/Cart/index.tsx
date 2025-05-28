'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiCreditCard,
  FiTruck,
  FiShield,
  FiCheck,
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  selected: boolean;
}

const CartView = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Máy hút bụi thông minh',
      price: 2500000,
      quantity: 1,
      image: '/images/products/vacuum.jpg',
      category: 'Đồ gia dụng',
      selected: false,
    },
    {
      id: '2',
      name: 'Nồi cơm điện cao cấp',
      price: 1800000,
      quantity: 1,
      image: '/images/products/rice-cooker.jpg',
      category: 'Đồ gia dụng',
      selected: false,
    },
  ]);

  const [showQR, setShowQR] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const toggleSelectItem = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);
    setCartItems(
      cartItems.map((item) => ({ ...item, selected: !allSelected })),
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = selectedItems.length > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }
    setShowQR(true);
  };

  const handleComplete = () => {
    setShowQR(false);
    setCartItems(cartItems.filter((item) => !item.selected));
    toast.success('Thanh toán thành công!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E9DA]/30 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#7A5C3E] mb-8 flex items-center gap-3">
          <FiShoppingBag className="w-8 h-8" />
          Giỏ hàng của bạn
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5E3DF]">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Giỏ hàng của bạn đang trống
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-[#F8F6F3] rounded-lg">
                    <input
                      type="checkbox"
                      checked={cartItems.every((item) => item.selected)}
                      onChange={toggleSelectAll}
                      className="h-5 w-5 text-[#E6A15A] focus:ring-[#E6A15A] border-[#E5E3DF] rounded"
                    />
                    <span className="text-[#7A5C3E]">Chọn tất cả</span>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 p-4 border-2 border-[#E5E3DF] rounded-xl hover:shadow-md transition-shadow"
                    >
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelectItem(item.id)}
                        className="h-5 w-5 text-[#E6A15A] focus:ring-[#E6A15A] border-[#E5E3DF] rounded"
                      />
                      <div className="w-24 h-24 bg-[#F5E9DA] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#7A5C3E]">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border-2 border-[#E5E3DF] rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-2 text-gray-600 hover:text-[#B86B2B] transition-colors"
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-x border-[#E5E3DF]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-2 text-gray-600 hover:text-[#B86B2B] transition-colors"
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#7A5C3E]">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(item.price)}/sản phẩm
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5E3DF] sticky top-8">
              <h2 className="text-xl font-bold text-[#7A5C3E] mb-6">
                Tổng đơn hàng
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sản phẩm đã chọn ({selectedItems.length})</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="border-t border-[#E5E3DF] pt-4 flex justify-between font-bold text-[#7A5C3E]">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className={`w-full py-4 rounded-xl font-medium shadow-md hover:shadow-lg mb-4 flex items-center justify-center gap-2 transition-all ${
                  selectedItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#B86B2B] text-white hover:bg-[#E6A15A]'
                }`}
              >
                <FiCreditCard className="w-5 h-5" />
                Thanh toán ngay
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiTruck className="w-5 h-5 text-[#B86B2B]" />
                  <span>Miễn phí vận chuyển cho đơn từ 500.000đ</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiShield className="w-5 h-5 text-[#B86B2B]" />
                  <span>Bảo hành chính hãng 12 tháng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-[#B86B2B] mb-4">
              Quét mã QR để thanh toán
            </h2>
            <div className="aspect-square w-full max-w-[300px] mx-auto bg-[#F5E9DA] rounded-xl mb-4 flex items-center justify-center">
              {/* Replace with actual QR code */}
              <div className="text-[#7A5C3E] text-center">
                <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-2">
                  <span className="text-sm">QR Code Placeholder</span>
                </div>
                <p className="text-sm font-medium">{formatCurrency(total)}</p>
              </div>
            </div>
            <p className="text-[#7A5C3E] text-center mb-6">
              Vui lòng quét mã QR bằng ứng dụng ngân hàng của bạn để thanh toán
            </p>
            <button
              onClick={handleComplete}
              className="w-full bg-[#B86B2B] text-white py-4 rounded-xl hover:bg-[#E6A15A] transition-colors font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <FiCheck className="w-5 h-5" />
              Hoàn thành
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;