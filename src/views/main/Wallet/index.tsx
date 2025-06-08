'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import DepositService from '@/services/TransactionService';
import toast from 'react-hot-toast';
import { useInfo } from '@/contexts/InfoContext';
import {
  FaWallet,
  FaQrcode,
  FaHistory,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

const WalletView = () => {
  const { data: session } = useSession();
  const { userInfo } = useInfo();

  const { register, handleSubmit, reset } = useForm<{
    transactionCode: string;
    amount: number;
  }>();

  const onDeposit = handleSubmit(async (data) => {
    try {
      console.log(data);
      const res = await DepositService.deposit(
        Number(data.amount),
        data.transactionCode,
      );

      if (res.message === 'success') {
        toast.success('Nạp tiền thành công, chờ admin xác nhận');
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  });

  const handleWithdrawClick = () => {
    alert('Chuyển đến form rút tiền');
  };

  const handleViewHistory = () => {
    alert('Chuyển đến lịch sử thanh toán');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF8] to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-[#5C3D2E] mb-2">
              Ví của bạn
            </h1>
            <p className="text-gray-600">
              Quản lý tài chính của bạn một cách dễ dàng
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewHistory}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl hover:bg-[#F8F6F3] transition-colors text-[#5C3D2E] font-medium shadow-sm"
          >
            <FaHistory className="text-lg" />
            Lịch sử giao dịch
          </motion.button>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-[#E6A15A] to-[#B86B2B] rounded-2xl shadow-lg p-8 mb-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <FaWallet className="text-2xl" />
              <span className="text-lg font-medium">Số dư khả dụng</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              {userInfo?.balance.toLocaleString('vi-VN')}đ
            </h2>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWithdrawClick}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all font-medium"
              >
                <FaArrowUp />
                Rút tiền
              </motion.button>
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl hover:bg-gray-50 transition-all text-[#B86B2B] font-medium"
              >
                <FaArrowDown />
                Nạp tiền
              </motion.button> */}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Section */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaQrcode className="text-2xl text-[#5C3D2E]" />
              <h2 className="text-xl font-bold text-[#5C3D2E]">
                Mã QR nạp tiền
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-md mb-6">
                <Image
                  src="/images/qr-code.png"
                  alt="QR Code"
                  fill
                  className="object-contain rounded-2xl border-2 border-[#E6A15A]/20"
                />
              </div>
              <div className="w-full p-4 bg-[#FDFBF8] rounded-xl">
                <p className="text-gray-600 text-sm mb-2">
                  Nhập lời nhắn:{' '}
                  <span className="font-medium">{session?.user?.fullName}</span>{' '}
                  -{' '}
                  <span className="text-[#E6A15A] font-medium">
                    mã giao dịch momo
                  </span>
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p className="font-medium text-[#5C3D2E]">Lưu ý:</p>
                  <p>• Phải nhập lời nhắn để nhận tiền vào ví</p>
                  <p>
                    • Mã giao dịch momo là mã giao dịch của bạn khi nạp tiền vào
                    ví
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Deposit Form */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaMoneyBillWave className="text-2xl text-[#5C3D2E]" />
              <h2 className="text-xl font-bold text-[#5C3D2E]">
                Xác nhận nạp tiền
              </h2>
            </div>
            <form onSubmit={onDeposit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã giao dịch Momo
                </label>
                <input
                  {...register('transactionCode', { required: true })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#E6A15A] focus:ring-4 focus:ring-[#E6A15A]/20 outline-none transition-all"
                  placeholder="Nhập mã giao dịch từ Momo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số tiền đã nạp
                </label>
                <input
                  {...register('amount', { required: true })}
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#E6A15A] focus:ring-4 focus:ring-[#E6A15A]/20 outline-none transition-all"
                  placeholder="Nhập số tiền bạn đã chuyển"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-[#E6A15A] text-white rounded-xl hover:bg-[#B86B2B] transition-all duration-300 font-medium shadow-lg shadow-[#E6A15A]/30 hover:shadow-xl hover:shadow-[#B86B2B]/30"
              >
                Xác nhận nạp tiền
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
