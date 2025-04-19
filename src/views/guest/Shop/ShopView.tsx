import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  isHot?: boolean;
  discount?: number;
  description?: string;
  oldPrice?: number;
}

const ShopView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const categories = [
    { name: 'Women', count: 16 },
    { name: 'Men', count: 9 },
    { name: 'Shoes', count: 19 },
    { name: 'Computer', count: 35 },
  ];

  const brands = [
    { name: 'Adidas', count: 25 },
    { name: 'Nike', count: 18 },
    { name: 'Easy', count: 15 },
    { name: 'Arong', count: 12 },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'COWIN E7 Active',
      category: 'Headphones',
      price: 45.00,
      oldPrice: 55.45,
      image: 'https://thegioibepnhapkhau.vn/media/product/250_19097_am_sieu_toc_nagakawa_nag032102_xanh_3.jpg',
      rating: 5,
      reviews: 150,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
    },
    {
      id: 2,
      name: 'Apple iPhone XR',
      category: 'Smartphones',
      price: 45.00,
      oldPrice: 55.45,
      image: 'https://thegioibepnhapkhau.vn/media/product/250_19097_am_sieu_toc_nagakawa_nag032102_xanh_3.jpg',
      rating: 5,
      reviews: 150,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
    },
    {
      id: 3,
      name: 'Men Casual Shoes',
      category: 'Footwear',
      price: 45.00,
      oldPrice: 55.45,
      image: 'https://thegioibepnhapkhau.vn/media/product/250_19097_am_sieu_toc_nagakawa_nag032102_xanh_3.jpg',
      rating: 5,
      reviews: 150,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
    }, {
      id: 4,
      name: 'COWIN E7 Active',
      category: 'Headphones',
      price: 45.00,
      oldPrice: 55.45,
      image: 'https://thegioibepnhapkhau.vn/media/product/250_19097_am_sieu_toc_nagakawa_nag032102_xanh_3.jpg',
      rating: 5,
      reviews: 150,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
    },
    {
      id: 5,
      name: 'Apple iPhone XR',
      category: 'Smartphones',
      price: 45.00,
      oldPrice: 55.45,
      image: 'https://thegioibepnhapkhau.vn/media/product/250_19097_am_sieu_toc_nagakawa_nag032102_xanh_3.jpg',
      rating: 5,
      reviews: 150,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
    },
    {
      id: 6,
      name: 'Men Casual Shoes',
      category: 'Footwear',
      price: 45.00,
      oldPrice: 55.45,
      image: 'https://thegioibepnhapkhau.vn/media/product/250_19097_am_sieu_toc_nagakawa_nag032102_xanh_3.jpg',
      rating: 5,
      reviews: 150,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
    }
    , {
      id: 7,
      name: 'Men Casual Shoes',
      category: 'Footwear',
      price: 45.00,
      oldPrice: 55.45,
      image: 'https://thegioibepnhapkhau.vn/media/product/250_19097_am_sieu_toc_nagakawa_nag032102_xanh_3.jpg',
      rating: 5,
      reviews: 150,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
    }
  ];

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const renderProductGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:-translate-y-1 transition-transform duration-200">
          <div className="relative pt-[100%]">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {product.isHot && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                HOT
              </span>
            )}
            {product.discount && (
              <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            <button className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
              <i className="fas fa-heart text-gray-600"></i>
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.category}</p>
            <div className="text-lg font-semibold text-red-500 mt-2">
              ${product.price.toFixed(2)}
            </div>
            <div className="flex items-center mt-2">
              <div className="text-yellow-400">
                {'★'.repeat(product.rating)}
                {'☆'.repeat(5 - product.rating)}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviews})
              </span>
            </div>
            <button className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition-colors">
              ADD TO CART
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProductList = () => (
    <div className="space-y-4">
      {currentProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-64 h-48 sm:h-64 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{product.name}</h3>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(product.rating)}
                      {'☆'.repeat(5 - product.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <span className="text-lg sm:text-xl font-semibold text-red-500">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="ml-2 text-gray-500 line-through">${product.oldPrice}</span>
                  )}
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">{product.description}</p>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="w-full sm:w-auto px-4 sm:px-8 py-2 bg-[#FF4757] text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center">
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Add to Cart
                </button>
                <button className="w-full sm:w-auto px-4 sm:px-8 py-2 border border-[#FF4757] text-[#FF4757] rounded hover:bg-red-50 transition-colors flex items-center justify-center">
                  <i className="far fa-heart mr-2"></i>
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Add Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

      <div className="mb-4 sm:mb-6 text-gray-600">
        <span className="text-gray-800">Home</span> &gt; <span className="text-gray-800">Shop</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">CATEGORIES</h3>
              <ul className="space-y-2 sm:space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
                      <span className="text-sm sm:text-base text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">BRANDS</h3>
              <ul className="space-y-2 sm:space-y-3">
                {brands.map((brand) => (
                  <li key={brand.name}>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
                      <span className="text-sm sm:text-base text-gray-700">{brand.name}</span>
                      <span className="text-sm text-gray-500">({brand.count})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">PRICE</h3>
              <input
                type="range"
                min="150"
                max="500"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>$150</span>
                <span>$500</span>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-md hover:bg-gray-50 text-sm"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">COLOR</h3>
              <div className="flex gap-3">
                <button className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-red-500" />
                <button className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gray-900" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 order-1 lg:order-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto min-w-[200px] px-3 sm:px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            >
              <option value="default">Default sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button
                className={`p-2 border border-gray-200 rounded-md ${viewMode === 'grid' ? 'bg-gray-100' : ''
                  }`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th w-4 sm:w-5 h-4 sm:h-5 text-gray-600"></i>
              </button>
              <button
                className={`p-2 border border-gray-200 rounded-md ${viewMode === 'list' ? 'bg-gray-100' : ''
                  }`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list w-4 sm:w-5 h-4 sm:h-5 text-gray-600"></i>
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? renderProductGrid() : renderProductList()}

          <div className="flex justify-center gap-2 mt-8 sm:mt-12">
            <button 
              className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button 
              className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-md ${
                  currentPage === page 
                    ? 'bg-red-500 text-white' 
                    : 'border border-gray-200 hover:bg-gray-50'
                } text-sm sm:text-base`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button 
              className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button 
              className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopView;
