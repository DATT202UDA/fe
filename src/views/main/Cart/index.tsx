'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Button from '@/components/BaseUI/Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

const CartView = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Nồi cơm điện cao tần',
      price: 1299000,
      quantity: 1,
      image: '/images/products/product1.jpg',
      selected: true,
    },
    {
      id: '2',
      name: 'Máy xay sinh tố đa năng',
      price: 899000,
      quantity: 2,
      image: '/images/products/product2.jpg',
      selected: true,
    },
  ]);

  const [showQR, setShowQR] = useState(false);

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleSelectItem = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    console.log('Checkout clicked');
    console.log('Selected items:', selectedItems);
    
    if (selectedItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }
    
    try {
      setShowQR(true);
      console.log('QR modal should be visible now');
    } catch (error) {
      console.error('Error showing QR:', error);
      toast.error('Có lỗi xảy ra khi hiển thị mã QR');
    }
  };

  const handleComplete = () => {
    try {
      setShowQR(false);
      toast.success('Đặt hàng thành công!');
      setCartItems((prev) => prev.filter((item) => !item.selected));
    } catch (error) {
      console.error('Error completing order:', error);
      toast.error('Có lỗi xảy ra khi hoàn tất đơn hàng');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#7A5C3E] mb-8">
          Giỏ hàng của bạn
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#7A5C3E] text-lg mb-4">Giỏ hàng của bạn đang trống</p>
            <Button theme="primary" size="l" onClick={() => window.history.back()}>
              Tiếp tục mua sắm
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={cartItems.every((item) => item.selected)}
                    onChange={handleSelectAll}
                    className="h-5 w-5 text-[#E6A15A] focus:ring-[#E6A15A] border-[#E5E3DF] rounded"
                  />
                  <span className="ml-2 text-[#7A5C3E] font-medium">
                    Chọn tất cả ({cartItems.length})
                  </span>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-4 p-4 bg-[#F5E9DA] rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleSelectItem(item.id)}
                        className="h-5 w-5 text-[#E6A15A] focus:ring-[#E6A15A] border-[#E5E3DF] rounded"
                      />
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[#7A5C3E] font-medium">{item.name}</h3>
                        <p className="text-[#B86B2B] font-bold mt-1">
                          {item.price.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-2 text-[#7A5C3E] hover:bg-[#E6A15A] hover:text-white rounded-full transition-colors"
                        >
                          <FaMinus />
                        </button>
                        <span className="w-8 text-center text-[#7A5C3E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-2 text-[#7A5C3E] hover:bg-[#E6A15A] hover:text-white rounded-full transition-colors"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-[#7A5C3E] hover:text-red-500 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-[#7A5C3E] mb-4">
                  Tổng thanh toán
                </h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-[#7A5C3E]">
                    <span>Tạm tính</span>
                    <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-[#7A5C3E]">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="border-t border-[#E5E3DF] my-2"></div>
                  <div className="flex justify-between text-[#B86B2B] font-bold">
                    <span>Tổng cộng</span>
                    <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
                <Button
                  theme="primary"
                  size="l"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                >
                  Thanh toán ngay
                </Button>
              </div>
            </div>
          </div>
        )}

        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-[#7A5C3E] mb-4 text-center">
                Quét mã QR để thanh toán
              </h2>
              <div className="relative w-64 h-64 mx-auto mb-6">
                <Image
                  src="/images/qr-code.png"
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[#7A5C3E] text-center mb-6">
                Tổng tiền: {totalAmount.toLocaleString('vi-VN')}đ
              </p>
              <Button
                theme="primary"
                size="l"
                fullWidth
                onClick={handleComplete}
              >
                Hoàn thành
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CartView; 