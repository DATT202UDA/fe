import axiosInstance from '@/lib/axios';
import axios from 'axios';

export enum Currency {
  VND = 'VND',
  USD = 'USD',
}

export enum DiscountType {
  PERCENT = 'percent',
  FIXED = 'fixed',
}

export enum ShippingStatus {
  PENDING = 'pending', // Chờ xác nhận
  CONFIRMED = 'confirmed', // Đã xác nhận
  PICKED_UP = 'picked_up', // Đã lấy hàng
  IN_TRANSIT = 'in_transit', // Đang vận chuyển
  DELIVERED = 'delivered', // Đã giao hàng
  FAILED = 'failed', // Giao hàng thất bại
  RETURNED = 'returned', // Đã hoàn trả
}

export interface OrderItem {
  productId: string;
  nameSnapshot: string;
  unitPrice: number;
  discountType?: DiscountType;
  discountValue?: number;
  quantity: number;
  currency: Currency;
}

export interface CreateOrderDto {
  items: OrderItem[];
  currency: Currency;
  note?: string;
}

export interface OrderResponse {
  message: string;
  data: {
    _id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    currency: Currency;
    status: string;
    paymentId: string;
    note?: string;
    createdAt: string;
    updatedAt: string;
  };
}

class OrderService {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL;

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponse> {
    try {
      const response = await axiosInstance.post(
        `${this.API_URL}/orders`,
        orderData,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByShippingStatus(status: ShippingStatus) {
    try {
      const response = await axiosInstance.get(
        `${this.API_URL}/orders/products/shipping-status/${status}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const orderService = new OrderService();
