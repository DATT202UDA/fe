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
} from 'react-icons/fi';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
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
    },
    {
      id: '2',
      name: 'Nồi cơm điện cao cấp',
      price: 1800000,
      quantity: 1,
      image: '/images/products/rice-cooker.jpg',
      category: 'Đồ gia dụng',
    },
  ]);

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
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = 30000;
  const total = subtotal + shipping;

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
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 p-4 border-2 border-[#E5E3DF] rounded-xl hover:shadow-md transition-shadow"
                    >
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
                  <span>Tạm tính</span>
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

              <button className="w-full bg-[#B86B2B] text-white py-4 rounded-xl hover:bg-[#E6A15A] transition-colors font-medium shadow-md hover:shadow-lg mb-4 flex items-center justify-center gap-2">
                <FiCreditCard className="w-5 h-5" />
                Thanh toán ngay
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiTruck className="w-5 h-5 text-[#B86B2B]" />
                  <span className="text-sm">
                    Miễn phí vận chuyển cho đơn từ 2 triệu
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiShield className="w-5 h-5 text-[#B86B2B]" />
                  <span className="text-sm">Bảo hành chính hãng 12 tháng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
