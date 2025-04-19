'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  tag?: string;
  discount?: number;
}

const ProductCard = ({
  name,
  description,
  price,
  image,
  rating,
  reviews,
  tag,
  discount,
}: ProductCardProps) => {
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className="group">
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="w-full transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {tag && (
            <span className="bg-green-500 text-white px-2 py-1 text-xs uppercase rounded">
              {tag}
            </span>
          )}
          {discount && discount > 0 && (
            <span className="bg-[#FF4B91] text-white px-2 py-1 text-xs uppercase rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlist(!isWishlist)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors z-10"
        >
          <svg
            className={`w-5 h-5 ${
              isWishlist ? 'text-[#FF4B91] fill-current' : 'text-gray-600'
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={isWishlist ? '0' : '2'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-[#FF4B91] px-6 py-2 rounded hover:bg-[#FF4B91] hover:text-white transition-colors transform -translate-y-2 group-hover:translate-y-0 transition-transform">
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold group-hover:text-[#FF4B91] transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'fill-current' : 'fill-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-2">({reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-[#FF4B91] font-semibold">
            ${((price * (100 - (discount || 0))) / 100).toFixed(2)}
          </p>
          {discount && discount > 0 && (
            <p className="text-gray-500 text-sm line-through">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
