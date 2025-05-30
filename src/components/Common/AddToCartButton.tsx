"use client";
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity?: number;
  variant?: 'default' | 'full';
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product,
  quantity = 1,
  variant = 'default'
}) => {
  const { addItem } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    // Thêm sản phẩm vào giỏ hàng với số lượng đã chọn
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setIsAnimating(true);
    toast.success('Đã thêm vào giỏ hàng');
    setTimeout(() => setIsAnimating(false), 1000);
  };

  if (variant === 'full') {
    return (
      <>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#B86B2B] text-white py-4 rounded-xl hover:bg-[#E6A15A] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <FiShoppingCart className="w-5 h-5" />
          Thêm vào giỏ hàng
        </button>

        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: 0.5,
                opacity: 0,
                x: 100,
                y: -100,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <FiShoppingCart className="w-10 h-10 text-[#B86B2B]" />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="inline-flex items-center px-6 py-3 bg-[#B86B2B] text-white rounded-xl hover:bg-[#E6A15A] transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <FiShoppingCart className="w-5 h-5 mr-2" />
        Thêm vào giỏ
      </button>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: 0.5,
              opacity: 0,
              x: 100,
              y: -100,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <FiShoppingCart className="w-10 h-10 text-[#B86B2B]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 