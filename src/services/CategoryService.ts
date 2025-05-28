import axiosInstance from '@/lib/axios';

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

class CategoryService {
  static async create(data: CreateCategoryDto): Promise<Category> {
    const res = await axiosInstance.post('/categories', data);
    return res.data;
  }

  static async findAll(): Promise<Category[]> {
    const res = await axiosInstance.get('/categories');
    return res.data;
  }

  static async findOne(id: string): Promise<Category> {
    const res = await axiosInstance.get(`/categories/${id}`);
    return res.data;
  }

  static async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const res = await axiosInstance.patch(`/categories/${id}`, data);
    return res.data;
  }

  static async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/categories/${id}`);
  }
}

export default CategoryService;
