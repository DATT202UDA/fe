'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaChartLine,
  FaStore,
  FaStoreAlt,
  FaExchangeAlt,
  FaTags,
  FaChartBar,
} from 'react-icons/fa';

const menuItems = [
  {
    title: 'Dashboard',
    icon: FaChartLine,
    href: '/admin/dashboard',
  },
  {
    title: 'Yêu cầu cửa hàng',
    icon: FaStore,
    href: '/admin/store-requests',
  },
  {
    title: 'Quản lý cửa hàng',
    icon: FaStoreAlt,
    href: '/admin/stores',
  },
  {
    title: 'Giao dịch',
    icon: FaExchangeAlt,
    href: '/admin/transactions',
  },
  {
    title: 'Danh mục',
    icon: FaTags,
    href: '/admin/categories',
  },
  {
    title: 'Doanh thu',
    icon: FaChartBar,
    href: '/admin/revenue',
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#E5E3DF] min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#E6A15A] text-white'
                      : 'text-[#7A5C3E] hover:bg-[#F8F6F3]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
