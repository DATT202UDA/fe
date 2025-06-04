import axiosInstance from '@/lib/axios';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/types/category';

interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CategoryResponse {
  categories: Category[];
  total: number;
  page: number;
  totalPages: number;
}

class CategoryService {
  // Get all categories
  static async findAll(
    params?: GetCategoriesParams,
  ): Promise<CategoryResponse> {
    try {
      const response = await axiosInstance.get('/categories', {
        params,
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch categories',
      );
    }
  }

  // Get category by ID
  static async getById(id: string): Promise<Category> {
    try {
      const response = await axiosInstance.get(`/categories/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching category:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to fetch category',
      );
    }
  }

  // Create category
  static async create(data: CreateCategoryDto): Promise<Category> {
    try {
      const response = await axiosInstance.post('/categories', data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating category:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to create category',
      );
    }
  }

  // Update category
  static async update(
    id: string,
    data: FormData | Partial<UpdateCategoryDto>,
  ): Promise<Category> {
    try {
      let response;

      if (data instanceof FormData) {
        // If data is FormData, send a PATCH request with FormData body
        console.log('CategoryService: Sending PATCH with FormData');
        response = await axiosInstance.patch(`/categories/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data', // Explicitly set for FormData
          },
        });
      } else {
        // If data is JSON, send a PATCH request with JSON body
        console.log('CategoryService: Sending PATCH with JSON data', data);
        response = await axiosInstance.patch(`/categories/${id}`, data);
      }

      return response.data;
    } catch (error: any) {
      console.error('Error updating category:', error);
      console.error('Error details:', {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
      });
      throw new Error(
        error?.response?.data?.message || 'Failed to update category',
      );
    }
  }

  // Delete category
  static async delete(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/categories/${id}`);
    } catch (error: any) {
      console.error('Error deleting category:', error);
      throw new Error(
        error?.response?.data?.message || 'Failed to delete category',
      );
    }
  }

  // Upload category image
  static async uploadImage(file: File): Promise<CloudinaryResponse> {
    try {
      console.log('Preparing to upload image:', file.name);
      const formData = new FormData();
      formData.append('file', file);

      console.log('Sending upload request to /upload/single');
      const response = await axiosInstance.post<CloudinaryResponse>(
        '/upload/single',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Upload response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error uploading category image:', error);
      console.error('Error details:', {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
      });
      throw new Error(
        error?.response?.data?.message || 'Failed to upload category image',
      );
    }
  }
}

export default CategoryService;
