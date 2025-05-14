import { NextResponse } from 'next/server';
import { Product, TopRatedProductsResponse } from '@/types/product';

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/top-rated`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch top-rated products');
    }

    const products: Product[] = await response.json();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching top-rated products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch top-rated products' },
      { status: 500 }
    );
  }
}
