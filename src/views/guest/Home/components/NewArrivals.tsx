'use client';

import ProductCard from './ProductCard';

const newArrivals = [
  {
    name: 'GUYER CHAIR',
    description: 'Queen headboard',
    price: 45.0,
    image: '/images/products/chair1.jpg',
    rating: 5,
    reviews: 150,
    tag: 'new',
    discount: 20,
  },
  {
    name: 'MADELINE SOFA',
    description: 'Fabric Sofa Bed',
    price: 120.0,
    image: '/images/products/sofa1.jpg',
    rating: 4,
    reviews: 120,
    discount: 15,
  },
  {
    name: 'BIANCO CHAIR',
    description: 'Fabric Accent Chair',
    price: 45.0,
    image: '/images/products/chair2.jpg',
    rating: 5,
    reviews: 180,
    tag: 'hot',
    discount: 30,
  },
  {
    name: 'PELAGIA LOUNGE',
    description: 'Outdoor Modular',
    price: 45.0,
    image: '/images/products/chair3.jpg',
    rating: 4,
    reviews: 160,
    discount: 25,
  },
];

const NewArrivals = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">TOP NEW ARRIVAL</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {newArrivals.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
