'use client';

import { useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    title: 'Modern Furniture\nCollection 2024',
    description:
      'Discover our curated collection of modern furniture pieces that blend style and comfort perfectly.',
    image: '/images/banners/banner-1.jpg',
  },
  {
    title: 'Quality Comfort\nFor Your Home',
    description:
      'Transform your living space with our premium selection of home furniture and accessories.',
    image: '/images/banners/banner-2.jpg',
  },
  {
    title: 'Designer Picks\nJust For You',
    description:
      'Explore our handpicked designer furniture collection that makes a statement in any room.',
    image: '/images/banners/banner-3.jpg',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative h-[600px] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative">
        <div className="flex items-center h-full">
          <div className="w-full md:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 whitespace-pre-line">
              {slides[currentSlide].title}
            </h1>
            <p className="text-gray-200 mb-8 text-lg">
              {slides[currentSlide].description}
            </p>
            <button className="bg-[#FF4B91] text-white px-8 py-3 rounded hover:bg-[#ff3381] transition-colors">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-[#FF4B91]' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
