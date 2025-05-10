'use client';

import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Button from '@/components/BaseUI/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartView = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Nồi cơm điện thông minh',
      price: 1299000,
      quantity: 1,
      image: 'https://xiaomiworld.vn/upload_images/images/noi-com-dien-thong-minh-xiaomi-mijia-mfb2bm-4l-18-.jpeg',
    },
    {
      id: 2,
      name: 'Máy xay sinh tố đa năng',
      price: 899000,
      quantity: 2,
      image: 'https://s.meta.com.vn/Data/image/2019/09/19/may-xay-sinh-to-da-nang-mini-g.jpg',
    },
  ]);

  // Tính tổng tiền
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0; // Miễn phí vận chuyển
  const total = subtotal + shipping;

  // Xử lý tăng số lượng
  const handleIncreaseQuantity = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Xử lý giảm số lượng
  const handleDecreaseQuantity = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Xử lý xóa sản phẩm
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }
    // TODO: Chuyển hướng đến trang thanh toán
    toast.success('Đang chuyển đến trang thanh toán...');
    // router.push('/checkout');
  };

  // Xử lý tiếp tục mua sắm
  const handleContinueShopping = () => {
    router.push('/shop');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-[#B86B2B] mb-8">Giỏ hàng của bạn</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#7A5C3E] text-lg mb-4">Giỏ hàng của bạn đang trống</p>
              <Button
                theme="primary"
                onClick={handleContinueShopping}
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E3DF] p-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-4 border-b border-[#E5E3DF] last:border-0"
                    >
                      <div className="w-24 h-24 bg-[#F8F6F3] rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#7A5C3E]">{item.name}</h3>
                        <p className="text-[#B86B2B] font-medium mt-1">
                          {item.price.toLocaleString('vi-VN')}đ
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="p-1.5 rounded-lg border border-[#E5E3DF] hover:bg-[#F8F6F3] text-[#7A5C3E] transition-colors"
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[#7A5C3E]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="p-1.5 rounded-lg border border-[#E5E3DF] hover:bg-[#F8F6F3] text-[#7A5C3E] transition-colors"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-[#EF5350] hover:bg-[#FFEBEE] rounded-lg transition-colors"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E3DF] p-6 sticky top-4">
                  <h2 className="text-xl font-semibold text-[#B86B2B] mb-4">
                    Tổng đơn hàng
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[#7A5C3E]">
                      <span>Tạm tính</span>
                      <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between text-[#7A5C3E]">
                      <span>Phí vận chuyển</span>
                      <span>Miễn phí</span>
                    </div>
                    <div className="border-t border-[#E5E3DF] pt-3">
                      <div className="flex justify-between font-semibold text-[#B86B2B]">
                        <span>Tổng cộng</span>
                        <span>{total.toLocaleString('vi-VN')}đ</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    theme="primary"
                    size="l"
                    fullWidth
                    className="mt-6"
                    onClick={handleCheckout}
                  >
                    Thanh toán
                  </Button>
                  <Button
                    theme="secondary"
                    variant="outlined"
                    size="l"
                    fullWidth
                    className="mt-3"
                    onClick={handleContinueShopping}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CartView; 