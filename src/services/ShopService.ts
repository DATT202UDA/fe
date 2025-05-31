import axiosInstance from '@/lib/axios';

export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  location: string;
  store_id: string;
  user_id: string;
  category_id: string;
  price: number;
  status: string;
  created_at: Date;
  deleted_at?: Date;
  updated_at?: Date;
}

export interface ShopInfo {
  _id: string;
  name: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  rate_avg: number;
  image_url: string;
  user_id: string;
  status: string;
  created_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreData {
  _id: string;
  name: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  rate_avg: number;
  image_url: string;
  user_id: string;
  status: string;
  created_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStoreData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  image_url?: string;
}

export interface UpdateStoreDto {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  image_url?: string;
}

class ShopService {
  static async getShopInfo(): Promise<ShopInfo> {
    try {
      const response = await axiosInstance.get('/stores/my-store');
      if (!response.data) {
        throw new Error('Không nhận được dữ liệu từ server');
      }
      return response.data[0];
    } catch (error: any) {
      console.error('Error fetching shop info:', error);
      if (error.response?.status === 401) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw new Error(
        error?.response?.data?.message || 'Không thể lấy thông tin cửa hàng',
      );
    }
  }

  static async getShopProducts(shopId: string): Promise<Product[]> {
    try {
      const response = await axiosInstance.get(`/shops/${shopId}/products`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching shop products:', error);
      throw new Error(
        error?.response?.data?.message || 'Không thể lấy danh sách sản phẩm',
      );
    }
  }

  static async getCategories(): Promise<Category[]> {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      throw new Error(
        error?.response?.data?.message || 'Không thể lấy danh mục sản phẩm',
      );
    }
  }

  static async createProduct(
    data: Omit<Product, '_id' | 'created_at' | 'updated_at' | 'deleted_at'>,
  ): Promise<Product> {
    try {
      const response = await axiosInstance.post('/products', data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating product:', error);
      throw new Error(
        error?.response?.data?.message || 'Không thể tạo sản phẩm mới',
      );
    }
  }

  static async updateProduct(
    productId: string,
    data: Partial<Product>,
  ): Promise<Product> {
    try {
      const response = await axiosInstance.put(`/products/${productId}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating product:', error);
      throw new Error(
        error?.response?.data?.message || 'Không thể cập nhật sản phẩm',
      );
    }
  }

  static async deleteProduct(productId: string): Promise<void> {
    try {
      await axiosInstance.delete(`/products/${productId}`);
    } catch (error: any) {
      console.error('Error deleting product:', error);
      throw new Error(
        error?.response?.data?.message || 'Không thể xóa sản phẩm',
      );
    }
  }

  // Lấy thông tin cửa hàng của người dùng hiện tại
  static async getMyStore(): Promise<StoreData> {
    try {
      const response = await axiosInstance.get('/stores/my-store');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching store:', error);
      throw new Error('Không thể lấy thông tin cửa hàng');
    }
  }

  // Upload single image
  static async uploadImage(file: File): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/upload/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      throw new Error('Không thể tải lên ảnh');
    }
  }

  // Upload multiple images
  static async uploadMultipleImages(
    files: File[],
  ): Promise<{ urls: string[] }> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await axiosInstance.post('/upload/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error uploading images:', error);
      throw new Error('Không thể tải lên ảnh');
    }
  }

  // Create store with image URL
  static async createStore(data: CreateStoreData): Promise<StoreData> {
    try {
      const response = await axiosInstance.post('/stores', data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating store:', error);
      throw new Error('Không thể tạo cửa hàng');
    }
  }

  // Cập nhật thông tin cửa hàng
  static async updateStore(
    storeId: string,
    data: FormData,
  ): Promise<StoreData> {
    try {
      const response = await axiosInstance.put(`/stores/${storeId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating store:', error);
      throw new Error('Không thể cập nhật thông tin cửa hàng');
    }
  }

  // Xóa cửa hàng
  static async deleteStore(storeId: string): Promise<void> {
    try {
      await axiosInstance.delete(`/stores/${storeId}`);
    } catch (error: any) {
      console.error('Error deleting store:', error);
      throw new Error('Không thể xóa cửa hàng');
    }
  }

  // Lấy danh sách cửa hàng (cho admin)
  static async getAllStores(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ data: StoreData[]; total: number }> {
    try {
      const response = await axiosInstance.get('/stores', { params });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching stores:', error);
      throw new Error('Không thể lấy danh sách cửa hàng');
    }
  }

  // Lấy thông tin chi tiết một cửa hàng
  static async getStoreById(storeId: string): Promise<StoreData> {
    try {
      const response = await axiosInstance.get(`/stores/${storeId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching store:', error);
      throw new Error('Không thể lấy thông tin cửa hàng');
    }
  }

  static async update(id: string, data: UpdateStoreDto): Promise<StoreData> {
    const response = await axiosInstance.patch(`/stores/${id}`, data);
    return response.data;
  }
}

export default ShopService;
