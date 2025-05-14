import { useState, useEffect } from 'react';
import { Product, TopRatedProductsResponse } from '@/types/product';

export const useTopRatedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products/top-rated');
        if (!response.ok) {
          throw new Error('Failed to fetch top-rated products');
        }
        const result: TopRatedProductsResponse = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.error || 'Failed to fetch top-rated products');
        }

        setProducts(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
};
