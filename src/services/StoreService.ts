import axiosInstance from '@/lib/axios';

export interface Store {
  _id: string;
  name: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  rate_avg: number;
  image_url: string;
  user_id: string;
  status: 'pending' | 'complete';
  created_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreRequest {
  _id: string;
  store_name: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  owner: {
    _id: string;
    full_name: string;
    email: string;
    phone?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateStoreDto {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  image_url?: string;
}

export interface UpdateStoreDto extends Partial<CreateStoreDto> {}

export interface GetStoresParams {
  status?: 'pending' | 'complete';
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

class StoreService {
  // Store Request Methods
  static async getStoreRequests(
    params?: GetStoreRequestsParams,
  ): Promise<{ data: StoreRequest[]; total: number }> {
    try {
      const response = await axiosInstance.get('/stores/admin/requests', {
        params,
      });
      return {
        data: response.data.requests,
        total: response.data.total,
      };
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
  // Get all stores
  static async getAll(params?: GetStoresParams): Promise<Store[]> {
    try {
      const response = await axiosInstance.get('/stores', { params });
      console.log('StoreService: Get all stores response data:', response.data);
      return response.data as Store[];
    } catch (error: any) {
      console.error('Error fetching stores:', error);
      console.error('Error details:', {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
      });
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch stores',
      );
    }
  }

  // Get store by ID
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

  // Get current user's store
  static async getMyStore(): Promise<Store> {
    try {
      const response = await axiosInstance.get('/stores/my-store');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching my store:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch my store',
      );
    }
  }

  // Create store
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

  // Update store
  static async update(
    storeId: string,
    data: FormData | Partial<UpdateStoreDto>,
  ): Promise<Store> {
    try {
      let response;

      if (data instanceof FormData) {
        // If data is FormData, send a PATCH request with FormData body
        console.log('StoreService: Sending PATCH with FormData');
        response = await axiosInstance.patch(`/stores/${storeId}`, data, {
          headers: {
            // Axios sets multipart/form-data header automatically with FormData
            // No need to set Content-Type explicitly here.
          },
        });
      } else {
        // If data is JSON, send a PATCH request with JSON body
        console.log('StoreService: Sending PATCH with JSON data', data);
        response = await axiosInstance.patch(`/stores/${storeId}`, data);
      }

      return response.data;
    } catch (error: any) {
      console.error('Error updating store:', error);
      console.error('Error details:', {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
      });
      throw new Error(
        error?.response?.data?.message || 'Failed to update store',
      );
    }
  }

  // Update store status (admin)
  static async updateStatus(
    storeId: string,
    status: 'pending' | 'complete',
  ): Promise<Store> {
    try {
      const response = await axiosInstance.put(`/stores/${storeId}/status`, {
        status,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating store status:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to update store status',
      );
    }
  }

  // Delete store
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

  // Upload store image
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
}

export default StoreService;
