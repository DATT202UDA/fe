'use client';

import { useEffect, useState } from 'react';
import { orderService, ShippingStatus } from '@/services/OrderService';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

// Set Vietnamese locale
dayjs.locale('vi');

interface Store {
  _id: string;
  name: string;
  address: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  sold_quantity: number;
  store: Store;
}

interface Customer {
  _id: string;
  email: string;
}

interface Order {
  order_id: string;
  quantity: number;
  subTotal: number;
  order_date: string;
  customer: Customer;
}

interface ProductOrder {
  product: Product;
  total_orders: number;
  total_quantity: number;
  total_revenue: number;
  orders: Order[];
}

interface OrderResponse {
  message: string;
  data: ProductOrder[];
}

const STATUS_TABS = [
  //   { label: 'Tất cả', value: '' },
  { label: 'Chờ xác nhận', value: ShippingStatus.PENDING },
  { label: 'Đã xác nhận', value: ShippingStatus.CONFIRMED },
  { label: 'Đã lấy hàng', value: ShippingStatus.PICKED_UP },
  { label: 'Đang vận chuyển', value: ShippingStatus.IN_TRANSIT },
  { label: 'Đã giao hàng', value: ShippingStatus.DELIVERED },
  { label: 'Giao hàng thất bại', value: ShippingStatus.FAILED },
  { label: 'Đã hoàn trả', value: ShippingStatus.RETURNED },
];

const statusColor = {
  [ShippingStatus.PENDING]: 'text-yellow-600',
  [ShippingStatus.CONFIRMED]: 'text-blue-600',
  [ShippingStatus.PICKED_UP]: 'text-blue-600',
  [ShippingStatus.IN_TRANSIT]: 'text-blue-600',
  [ShippingStatus.DELIVERED]: 'text-green-600',
  [ShippingStatus.FAILED]: 'text-red-500',
  [ShippingStatus.RETURNED]: 'text-gray-400',
};

const PurchaseView = () => {
  const session = useSession();
  const [productOrders, setProductOrders] = useState<ProductOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(ShippingStatus.PENDING);

  useEffect(() => {
    if (session.status === 'unauthenticated') redirect('/dang-nhap');
    const fetchOrders = async () => {
      setLoading(true);
      try {
        if (tab) {
          const res = await orderService.getProductsByShippingStatus(
            tab as ShippingStatus,
          );
          setProductOrders(res.data || []);
        } else {
          setProductOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setProductOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [session.status, tab]);

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex gap-4 border-b overflow-x-auto">
            {STATUS_TABS.map((t) => (
              <button
                key={t.value}
                className={`py-2 px-4 font-medium border-b-2 whitespace-nowrap ${
                  tab === t.value
                    ? 'border-[#B86B2B] text-[#B86B2B]'
                    : 'border-transparent text-gray-600'
                }`}
                onClick={() => setTab(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="text-center py-10">Đang tải đơn hàng...</div>
        ) : productOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Không có đơn hàng nào.
          </div>
        ) : (
          productOrders.map((productOrder) => (
            <div
              key={productOrder.product._id}
              className="bg-white rounded-2xl shadow-lg mb-6 p-4"
            >
              <div className="flex items-start gap-4 border-b pb-4 mb-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={productOrder.product.image_url}
                    alt={productOrder.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#B86B2B]">
                    {productOrder.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {productOrder.product.description}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="font-medium">Giá: </span>
                      {formatCurrency(productOrder.product.price)}
                    </div>
                    <div>
                      <span className="font-medium">Đã bán: </span>
                      {productOrder.product.sold_quantity}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">Cửa hàng: </span>
                    {productOrder.product.store.name}
                  </div>
                  <div>
                    <span className="font-medium">Tổng đơn hàng: </span>
                    {productOrder.total_orders}
                  </div>
                  <div>
                    <span className="font-medium">Tổng số lượng: </span>
                    {productOrder.total_quantity}
                  </div>
                  <div className="font-semibold text-[#B86B2B]">
                    <span className="font-medium">Tổng doanh thu: </span>
                    {formatCurrency(productOrder.total_revenue)}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Chi tiết đơn hàng:</h4>
                  <div className="space-y-3">
                    {productOrder.orders.map((order) => (
                      <div
                        key={order.order_id}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm">
                            <span className="font-medium">Mã đơn: </span>
                            {order.order_id}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Ngày đặt: </span>
                            {formatDate(order.order_date)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">Khách hàng: </span>
                            {order.customer.email}
                          </div>
                          <div>
                            <span className="font-medium">Số lượng: </span>
                            {order.quantity}
                          </div>
                          <div className="font-semibold text-[#B86B2B]">
                            <span className="font-medium">Thành tiền: </span>
                            {formatCurrency(order.subTotal)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PurchaseView;
