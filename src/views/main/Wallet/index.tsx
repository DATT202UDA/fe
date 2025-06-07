'use client';

import { useForm } from 'react-hook-form';
// import QRCode from 'qrcode.react';
import { motion } from 'framer-motion';
// import axios from 'axios';
// import axiosClient from '@/utils/axiosClient';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import DepositService from '@/services/TransactionService';
import toast from 'react-hot-toast';

const WalletView = () => {
  const { data: session } = useSession();

  console.log(session);
  const qrValue = '/images/qr.png';
  // Giả lập số dư tài khoản
  const balance = 1500000;

  const { register, handleSubmit, reset } = useForm<{
    transactionCode: string;
    amount: number;
  }>();

  const onDeposit = handleSubmit(async (data) => {
    // alert(`Gửi yêu cầu nạp tiền: ${JSON.stringify(data)}`);
    // reset();
    try {
      console.log(data);
      const res = await DepositService.deposit(
        Number(data.amount),
        data.transactionCode,
      );

      if (res.message === 'success') {
        toast.success('Nạp tiền thành công, chờ admin xác nhận');
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  });

  const handleWithdrawClick = () => {
    // TODO: mở modal hoặc chuyển trang rút tiền
    alert('Chuyển đến form rút tiền');
  };

  const handleViewHistory = () => {
    // TODO: mở modal hoặc chuyển trang lịch sử
    alert('Chuyển đến lịch sử thanh toán');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#7A5C3E] mb-6">Ví của bạn</h1>

        {/* Hiển thị số dư */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-2">Số dư tài khoản</p>
            <p className="text-3xl font-bold text-[#7A5C3E]">
              {balance.toLocaleString('vi-VN')} đ
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* 1. QR Code */}
            <Image
              src="/images/qr-code.png"
              alt="QR Code"
              width={300}
              height={300}
              className="w-[500px] h-[480px] object-cover rounded-lg border-2 border-[#E6A15A]"
            />
            <h2 className="text-lg font-semibold text-[#7A5C3E] mb-4">
              Mã QR nạp tiền
            </h2>
            {/* lời nhắn */}
            <p className="mt-4 text-gray-500 text-sm text-center">
              Nhập lời nhắn: {session?.user?.fullName} -{' '}
              <b className="text-red-500">mã giao dịch momo</b>
            </p>
            {/* <QRCode value={qrValue} size={160} /> */}
            <p className="mt-4 text-red-500 text-sm text-start">
              Lưu ý:
              <br />
              - Phải nhập lời nhắn để nhận tiền vào ví
              <br />- Mã giao dịch momo là mã giao dịch của bạn khi nạp tiền vào
              ví
            </p>
          </motion.div>

          {/* 2. Form Nạp tiền */}
          <motion.form
            onSubmit={onDeposit}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-[#7A5C3E] mb-2">
              Nạp tiền vào ví
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã giao dịch
              </label>
              <input
                {...register('transactionCode', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] outline-none"
                placeholder="Nhập mã giao dịch"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số tiền đã nạp
              </label>
              <input
                {...register('amount', { required: true })}
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#E6A15A] outline-none"
                placeholder="Nhập số tiền (đ)"
              />
            </div>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-[#E6A15A] text-white rounded-lg hover:bg-[#F0B97A] transition-colors font-semibold"
            >
              Gửi yêu cầu
            </button>
          </motion.form>

          {/* 3. Nút Rút tiền */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleWithdrawClick}
              className="w-full py-3 bg-[#7A5C3E] text-white rounded-lg hover:bg-[#5a472f] transition-colors font-semibold"
            >
              Rút tiền
            </button>
          </motion.div>

          {/* 4. Nút Xem lịch sử thanh toán */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleViewHistory}
              className="w-full py-3 border-2 border-[#E6A15A] text-[#E6A15A] rounded-lg hover:bg-[#FFFAF5] transition-colors font-semibold"
            >
              Xem lịch sử thanh toán
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
