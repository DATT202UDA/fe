'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'Bedroom', image: '/images/categories/bedroom.jpg' },
  { name: 'Mattresses', image: '/images/categories/mattress.jpg' },
  { name: 'Office', image: '/images/categories/office.jpg' },
  { name: 'Outdoor', image: '/images/categories/outdoor.jpg' },
  { name: 'Lounges & Sofas', image: '/images/categories/sofa.jpg' },
  { name: 'Living & Dining', image: '/images/categories/dining.jpg' },
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">SHOP BY CATEGORY</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Link
            href={`/category/${category.name.toLowerCase()}`}
            key={index}
            className="relative block w-full h-0 pb-[75%] overflow-hidden group"
          >
            <div className="absolute inset-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                priority={index < 2}
                className="object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                <h3 className="text-white text-xl font-semibold transform group-hover:scale-110 transition-transform">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
