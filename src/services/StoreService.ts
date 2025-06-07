import axiosInstance from '@/lib/axios';

export enum StoreStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}

export interface Store {
  _id: string;
  name: string;
  address: string;
  description?: string;
  phone: string;
  email: string;
  rate_avg: number;
  image_url?: string;
  user_id: string;
  status: StoreStatus;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  processed_by?: string;
  processed_at?: string;
  rejection_reason?: string;
  note?: string;
}

export interface StoreRequest {
  _id: string;
  name: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  image_url?: string;
  user_id: {
    _id: string;
    full_name: string;
    email: string;
    username: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
  updated_at?: string;
  processed_by?: {
    _id: string;
    username: string;
    full_name: string;
  };
  processed_at?: string;
}

export interface CreateStoreDto {
  name: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
  image_url?: string;
}

export interface UpdateStoreDto extends Partial<CreateStoreDto> {}

export interface UpdateStoreStatusDto {
  status: StoreStatus;
  note?: string;
  rejection_reason?: string;
}

export interface GetStoresParams {
  status?: StoreStatus;
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetStoreRequestsParams {
  status?: StoreRequest['status'];
  page?: number;
  limit?: number;
  search?: string;
}

// Define interface for the actual backend response structure for store requests
export interface StoreRequestsApiResponse {
  requests: StoreRequest[];
  total: number;
  page: number;
  totalPages: number;
}

export interface StoreResponse {
  stores: Store[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateStoreRequestDto extends CreateStoreDto {}

export interface PopulatedUser {
  avatar: string;
  _id: string;
  username: string;
  full_name: string;
}

export interface StoreReview {
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
  _id: string;
  store_id: string;
  user_id: string | PopulatedUser;
  rating: number;
  comment: string;
  
}

export interface StoreReviewResponse {
  reviews: StoreReview[];
  total: number;
  page: number;
  totalPages: number;
}

class StoreService {
  // Store Request Methods
  static async getUserStoreRequest(): Promise<StoreRequest | null> {
    try {
      const response = await axiosInstance.get('/stores/requests');
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return null;
      }
      console.error('Error fetching user store request:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch store request',
      );
    }
  }

  static async getStoreRequests(
    params?: GetStoreRequestsParams,
  ): Promise<StoreRequestsApiResponse> {
    try {
      const response = await axiosInstance.get<StoreRequestsApiResponse>(
        '/stores/admin/requests',
        {
          params,
        },
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching store requests:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch store requests',
      );
    }
  }

  static async processStoreRequest(
    requestId: string,
    data: {
      status: 'approved' | 'rejected';
      rejection_reason?: string;
    },
  ): Promise<StoreRequest> {
    try {
      const response = await axiosInstance.put(
        `/stores/admin/requests/${requestId}/process`,
        data,
      );
      return response.data;
    } catch (error: any) {
      console.error('Error processing store request:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to process store request',
      );
    }
  }

  // Store Methods
  static async getAll(params?: GetStoresParams): Promise<StoreResponse> {
    try {
      const response = await axiosInstance.get('/stores', { params });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching stores:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch stores',
      );
    }
  }

  static async getPendingStores(
    params?: GetStoresParams,
  ): Promise<StoreResponse> {
    try {
      const response = await axiosInstance.get('/stores/pending', { params });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching pending stores:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch pending stores',
      );
    }
  }

  static async getById(storeId: string): Promise<Store> {
    try {
      const response = await axiosInstance.get(`/stores/${storeId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching store:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch store',
      );
    }
  }

  static async getMyStore(): Promise<Store | null> {
    try {
      const response = await axiosInstance.get('/stores/my-store');
      if (
        response.data &&
        response.data.stores &&
        response.data.stores.length > 0
      ) {
        return response.data.stores[0];
      }
      return null;
    } catch (error: any) {
      console.error('Error fetching my store:', error);
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error(
        error?.response?.data?.message ||
          'Không thể lấy thông tin cửa hàng của bạn',
      );
    }
  }

  static async create(data: CreateStoreDto): Promise<Store> {
    try {
      const response = await axiosInstance.post('/stores', data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating store:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to create store',
      );
    }
  }

  static async update(storeId: string, data: UpdateStoreDto): Promise<Store> {
    try {
      const response = await axiosInstance.put(`/stores/${storeId}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating store:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to update store',
      );
    }
  }

  static async updateStatus(
    storeId: string,
    data: UpdateStoreStatusDto,
  ): Promise<Store> {
    try {
      const response = await axiosInstance.put(
        `/stores/${storeId}/status`,
        data,
      );
      return response.data;
    } catch (error: any) {
      console.error('Error updating store status:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to update store status',
      );
    }
  }

  static async delete(storeId: string): Promise<void> {
    try {
      await axiosInstance.delete(`/stores/${storeId}`);
    } catch (error: any) {
      console.error('Error deleting store:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to delete store',
      );
    }
  }

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
      throw new Error(
        error?.response?.data?.message || 'Failed to upload image',
      );
    }
  }

  static async createStoreRequest(
    data: CreateStoreRequestDto,
  ): Promise<StoreRequest> {
    try {
      const response = await axiosInstance.post('/stores/requests', data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating store request:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to create store request',
      );
    }
  }

  static async createReview(
    storeId: string,
    data: { rating: number; comment: string },
  ): Promise<StoreReview> {
    const response = await axiosInstance.post(
      `/stores/${storeId}/reviews`,
      data,
    );
    return response.data;
  }

  static async getStoreReviews(
    storeId: string,
    page = 1,
    limit = 10,
  ): Promise<StoreReviewResponse> {
    const response = await axiosInstance.get(`/stores/${storeId}/reviews`, {
      params: { page, limit },
    });
    return response.data;
  }

  static async deleteReview(reviewId: string): Promise<void> {
    await axiosInstance.delete(`/stores/reviews/${reviewId}`);
  }
}

export default StoreService;
