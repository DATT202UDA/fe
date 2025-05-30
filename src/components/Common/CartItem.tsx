"use client";
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  selected,
}) => {
  const { updateQuantity, removeItem, toggleSelect } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      if (window.confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        removeItem(id);
      }
      return;
    }
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200 transition-all duration-300 hover:bg-gray-50">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => toggleSelect(id)}
        className="w-5 h-5 mr-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      
      <div className="relative w-20 h-20 mr-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="mb-1 text-lg font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">
          {price.toLocaleString('vi-VN')}đ
        </p>
      </div>

      <div className="flex items-center mx-4">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FiMinus className="w-5 h-5" />
        </button>
        <span className="mx-2 text-gray-700">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={() => removeItem(id)}
        className="p-1 text-red-600 hover:text-red-700 transition-colors"
      >
        <FiTrash2 className="w-5 h-5" />
      </button>
    </div>
  );
}; 