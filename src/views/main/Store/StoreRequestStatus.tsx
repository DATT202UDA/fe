'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaStore,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';
import Image from 'next/image';
import StoreService, { StoreRequest } from '@/services/StoreService';
import { toast } from 'react-hot-toast';

const StoreRequestStatus = () => {
  const { id } = useParams();
  const [request, setRequest] = useState<StoreRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await StoreService.getUserStoreRequest();
        setRequest(data);
      } catch (error: any) {
        toast.error(error?.message || 'Không thể lấy thông tin yêu cầu');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FDFBF8] to-white">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#E6A15A] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-[#9B7B5C]">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FDFBF8] to-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimesCircle className="text-4xl text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Không tìm thấy yêu cầu
          </h1>
          <p className="text-[#7A5C3E]">
            Yêu cầu tạo cửa hàng không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF8] to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {request.status === 'pending' && (
            <>
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSpinner className="text-4xl text-yellow-500 animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-[#9B7B2B] mb-4">
                Yêu cầu đang chờ duyệt
              </h1>
              <p className="text-[#7A5C3E] mb-6">
                Yêu cầu của bạn đang được xem xét. Vui lòng chờ trong giây lát.
              </p>
            </>
          )}

          {request.status === 'approved' && (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-4xl text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">
                Yêu cầu đã được duyệt
              </h1>
              <p className="text-[#7A5C3E] mb-6">
                Yêu cầu của bạn đã được duyệt. Bạn có thể bắt đầu quản lý cửa
                hàng.
              </p>
            </>
          )}

          {request.status === 'rejected' && (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTimesCircle className="text-4xl text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-red-500 mb-4">
                Yêu cầu bị từ chối
              </h1>
              {request.rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-600">
                    <span className="font-semibold">Lý do từ chối:</span>{' '}
                    {request.rejection_reason}
                  </p>
                </div>
              )}
              <p className="text-[#7A5C3E] mb-6">
                Bạn có thể tạo yêu cầu mới với thông tin khác.
              </p>
            </>
          )}

          {/* Request Details */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-8 mt-8"
          >
            <div className="space-y-6">
              {/* Store Image */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-[#E6A15A]/20">
                  <Image
                    src={request.image_url || '/images/default-store.png'}
                    alt={request.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Store Information */}
              <div>
                <h2 className="text-xl font-bold text-[#9B7B5C] mb-4">
                  Thông tin cửa hàng
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Tên cửa hàng
                    </label>
                    <p className="mt-1 text-[#7A5C3E]">{request.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Mô tả
                    </label>
                    <p className="mt-1 text-[#7A5C3E]">
                      {request.description || 'Không có mô tả'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Địa chỉ
                    </label>
                    <p className="mt-1 text-[#7A5C3E]">{request.address}</p>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="pt-6 border-t">
                <h2 className="text-xl font-bold text-[#9B7B5C] mb-4">
                  Thông tin chủ cửa hàng
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Họ và tên
                    </label>
                    <p className="mt-1 text-[#7A5C3E]">
                      {request.user_id?.full_name || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="mt-1 text-[#7A5C3E]">
                      {request.user_id?.email || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Số điện thoại
                    </label>
                    <p className="mt-1 text-[#7A5C3E]">
                      {request.phone || 'Chưa cập nhật'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Timeline */}
              <div className="pt-6 border-t">
                <div className="text-sm text-gray-500">
                  <p>
                    Ngày gửi yêu cầu:{' '}
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                  {request.updated_at && (
                    <p>
                      Ngày cập nhật:{' '}
                      {new Date(request.updated_at).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoreRequestStatus;
