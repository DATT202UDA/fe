'use client';

import { useState } from 'react';
import {
  FaWallet,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaHistory,
  FaChevronRight,
  FaFilter,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import ModernLoader from '@/components/Common/ModernLoader';

const WalletView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [balance] = useState(1500000);
  const [showFilter, setShowFilter] = useState(false);

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 500000,
      date: '2024-03-20',
      description: 'Nạp tiền qua ngân hàng',
      status: 'completed',
    },
    {
      id: 2,
      type: 'withdraw',
      amount: 200000,
      date: '2024-03-19',
      description: 'Rút tiền về tài khoản',
      status: 'completed',
    },
    {
      id: 3,
      type: 'purchase',
      amount: 300000,
      date: '2024-03-18',
      description: 'Mua sản phẩm gia dụng',
      status: 'completed',
    },
  ];

  const renderTransactionStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full border border-green-100">
            Hoàn thành
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 text-xs font-medium text-yellow-600 bg-yellow-50 rounded-full border border-yellow-100">
            Đang xử lý
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full border border-red-100">
            Thất bại
          </span>
        );
      default:
        return null;
    }
  };

  const renderTransactionType = (type: string) => {
    switch (type) {
      case 'deposit':
        return <span className="text-green-600">+</span>;
      case 'withdraw':
        return <span className="text-red-600">-</span>;
      case 'purchase':
        return <span className="text-red-600">-</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header with Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-[#7A5C3E]">
                  Quản lý ví tiền
                </h1>
                <div className="w-12 h-12 bg-[#F5E9DA] rounded-full flex items-center justify-center">
                  <FaWallet className="text-[#B86B2B]" size={20} />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-bold text-[#B86B2B]">
                  {balance.toLocaleString('vi-VN')}đ
                </h2>
                <span className="text-sm text-gray-500">Số dư hiện tại</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-[#7A5C3E] mb-4">
                Thống kê
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Tổng nạp tiền</p>
                  <p className="text-xl font-semibold text-green-600">
                    +2,500,000đ
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tổng chi tiêu</p>
                  <p className="text-xl font-semibold text-red-600">
                    -1,000,000đ
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center space-x-4 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#F5E9DA] rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="text-[#B86B2B]" size={24} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#7A5C3E] text-lg">Nạp tiền</p>
                <p className="text-sm text-gray-500">Thêm tiền vào ví</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center space-x-4 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#F5E9DA] rounded-full flex items-center justify-center">
                <FaExchangeAlt className="text-[#B86B2B]" size={24} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#7A5C3E] text-lg">Rút tiền</p>
                <p className="text-sm text-gray-500">Chuyển về tài khoản</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center space-x-4 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#F5E9DA] rounded-full flex items-center justify-center">
                <FaHistory className="text-[#B86B2B]" size={24} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#7A5C3E] text-lg">Lịch sử</p>
                <p className="text-sm text-gray-500">Xem giao dịch</p>
              </div>
            </motion.button>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#7A5C3E]">
                Lịch sử giao dịch
              </h3>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <FaFilter className="text-[#7A5C3E]" size={14} />
                <span className="text-sm text-[#7A5C3E]">Lọc</span>
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-gray-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#F5E9DA] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        {transaction.type === 'deposit' ? (
                          <FaMoneyBillWave
                            className="text-[#B86B2B]"
                            size={18}
                          />
                        ) : transaction.type === 'withdraw' ? (
                          <FaExchangeAlt className="text-[#B86B2B]" size={18} />
                        ) : (
                          <FaWallet className="text-[#B86B2B]" size={18} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[#7A5C3E] group-hover:text-[#B86B2B] transition-colors">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {renderTransactionType(transaction.type)}
                          {transaction.amount.toLocaleString('vi-VN')}đ
                        </p>
                        {renderTransactionStatus(transaction.status)}
                      </div>
                      <FaChevronRight
                        className="text-gray-400 group-hover:text-[#B86B2B] transition-colors"
                        size={14}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
