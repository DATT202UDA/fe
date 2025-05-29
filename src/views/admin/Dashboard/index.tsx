'use client';

import {
  FaStore,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaClock,
} from 'react-icons/fa';
import { StatCard } from '@/components/admin/common/StatCard';

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#B86B2B]">Tổng quan</h2>
        <p className="text-[#7A5C3E] mt-1">
          Thống kê và báo cáo tổng quan về hệ thống
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Yêu cầu đang chờ"
          value={12}
          icon={FaClock}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Tổng số cửa hàng"
          value={45}
          icon={FaStore}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Giao dịch hôm nay"
          value={156}
          icon={FaExchangeAlt}
          trend={{ value: 12, isPositive: false }}
        />
        <StatCard
          title="Doanh thu hôm nay"
          value="12.5M"
          icon={FaMoneyBillWave}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Thêm các biểu đồ và bảng thống kê ở đây */}
    </div>
  );
}
