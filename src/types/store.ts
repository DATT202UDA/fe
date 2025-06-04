import { StoreStatus } from '@/services/StoreService';

export interface Owner {
  _id: string;
  full_name: string;
  email: string;
  phone?: string;
}

export interface StoreRequest {
  _id: string;
  store_name: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  owner: Owner;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
  updated_at?: string;
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

export interface StoreCategory {
  _id: string;
  name: string;
  description?: string;
  image_url?: string;
  createdAt: string;
  updatedAt: string;
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

export interface StoreResponse {
  stores: Store[];
  total: number;
  page: number;
  totalPages: number;
}
