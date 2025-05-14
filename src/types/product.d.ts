interface Store {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  status: 'in_stock' | 'out_of_stock';
  category_id: Category;
  store_id: Store;
  rate_avg: number;
  image?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type TopRatedProductsResponse = ApiResponse<Product[]>;
