import React from 'react';
import { Cart } from '@/components/Common/Cart';
import { CartProvider } from '@/contexts/CartContext';

export default function CartPage() {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
} 