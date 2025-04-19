'use client';

import ProductCard from './ProductCard';

const recommendedProducts = [
  {
    name: 'PELAGIA LOUNGE',
    description: 'Outdoor Modular Lounge',
    price: 449.0,
    image: '/images/products/lounge1.jpg',
    rating: 5,
    reviews: 150,
    tag: 'hot',
    discount: 30,
  },
  {
    name: 'AVERY BED',
    description: 'Queen Bed',
    price: 599.0,
    image: '/images/products/bed1.jpg',
    rating: 4,
    reviews: 120,
    discount: 20,
  },
  {
    name: 'WHITE BED',
    description: 'King Bed',
    price: 549.0,
    image: '/images/products/bed2.jpg',
    rating: 5,
    reviews: 180,
    tag: 'sale',
    discount: 40,
  },
  {
    name: 'GUYER CHAIR',
    description: 'Queen headboard',
    price: 45.0,
    image: '/images/products/chair1.jpg',
    rating: 4,
    reviews: 160,
    tag: 'new',
    discount: 15,
  },
  {
    name: 'MADELINE SOFA',
    description: 'Fabric Sofa Bed',
    price: 125.0,
    image: '/images/products/sofa1.jpg',
    rating: 5,
    reviews: 140,
    tag: 'hot',
    discount: 25,
  },
  {
    name: 'BIANCO CHAIR',
    description: 'Fabric Accent Chair',
    price: 45.0,
    image: '/images/products/chair2.jpg',
    rating: 4,
    reviews: 130,
    discount: 10,
  },
  {
    name: 'PELAGIA LOUNGE',
    description: 'Outdoor Modular',
    price: 45.0,
    image: '/images/products/chair3.jpg',
    rating: 5,
    reviews: 170,
    discount: 35,
  },
  {
    name: 'BLACK ARCHIE',
    description: 'Black Round Table',
    price: 400.0,
    image: '/images/products/table1.jpg',
    rating: 4,
    reviews: 160,
    tag: 'sale',
    discount: 50,
  },
];

const RecommendedProducts = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">RECOMMENDED FOR YOU</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendedProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
