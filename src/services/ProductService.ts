import axiosInstance from '@/lib/axios';

export interface Product {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  store_id: string;
  user_id: string;
  category_id?: string;
  price: number;
  status: string;
  created_at: string;
  deleted_at?: string;
  updated_at?: string;
  image_url: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  location?: string;
  store_id: string;
  category_id?: string;
  price: number;
  status: string;
  image_url?: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

class ProductService {
  static async create(data: CreateProductDto): Promise<Product> {
    const res = await axiosInstance.post('/products', data);
    return res.data;
  }

  static async findAll(
    page = 1,
    limit = 10,
    minPrice?: number,
    maxPrice?: number,
    sort?: string,
    categoryId?: string,
    search?: string,
  ): Promise<{
    products: Product[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const res = await axiosInstance.get('/products', {
      params: { page, limit, minPrice, maxPrice, sort, categoryId, search },
    });
    return res.data;
  }

  static async findByStore(
    storeId: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: Product[]; total: number }> {
    const res = await axiosInstance.get(`/products/store/${storeId}`, {
      params: { page, limit },
    });
    return res.data;
  }

  static async findByCategory(
    categoryId: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: Product[]; total: number }> {
    const res = await axiosInstance.get(`/products/category/${categoryId}`, {
      params: { page, limit },
    });
    return res.data;
  }

  static async findOne(id: string): Promise<Product> {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  }

  static async update(id: string, data: UpdateProductDto): Promise<Product> {
    const res = await axiosInstance.put(`/products/${id}`, data);
    return res.data;
  }

  static async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/products/${id}`);
  }

  static async findByStatus(status: string): Promise<Product[]> {
    const res = await axiosInstance.get(`/products/status/${status}`);
    return res.data;
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const res = await axiosInstance.get('/products/featured');
    return res.data;
  }
}

export default ProductService;
