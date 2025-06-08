import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { Store } from '@/services/StoreService';
import StoreService from '@/services/StoreService';

const TopRatedStores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchTopRatedStores = async () => {
      try {
        const data = await StoreService.getTopRatedStores();
        setStores(data);
      } catch (error) {
        console.error('Error fetching top rated stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedStores();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === stores.length - 1 ? 0 : prevIndex + 1,
    );
  }, [stores.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stores.length - 1 : prevIndex - 1,
    );
  }, [stores.length]);

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause auto slide on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Title Skeleton */}
          <div className="text-center mb-8 md:mb-12">
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-64 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-80 mx-auto"></div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Button Skeletons */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>

            {/* Main Content Skeleton */}
            <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image Section Skeleton */}
                <div className="relative h-full bg-gray-200 animate-pulse"></div>

                {/* Content Section Skeleton */}
                <div className="bg-white p-8 md:p-12 flex flex-col justify-center relative">
                  {/* Rating Skeleton */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>

                  {/* Store Name Skeleton */}
                  <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4 mb-6"></div>

                  {/* Description Skeleton */}
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                  </div>

                  {/* Contact Info Skeletons */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/5"></div>
                    </div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="h-14 bg-gray-200 rounded-xl animate-pulse w-40"></div>
                </div>
              </div>
            </div>

            {/* Dots Navigation Skeleton */}
            <div className="flex justify-center gap-3 mt-6">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-2 w-2 rounded-full bg-gray-200 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#7A5C3E] mb-3 md:mb-4">
            Cửa hàng nổi bật22
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Những cửa hàng được đánh giá cao nhất
          </p>
        </motion.div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <FaChevronLeft className="text-[#B86B2B] text-xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <FaChevronRight className="text-[#B86B2B] text-xl" />
          </button>

          {/* Main Content */}
          <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl">
            <AnimatePresence mode="wait">
              {stores.map(
                (store, index) =>
                  index === currentIndex && (
                    <motion.div
                      key={store._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                        {/* Image Section */}
                        <div className="relative h-full">
                          <Image
                            src={store.image_url || '/default-store.jpg'}
                            alt={store.name}
                            fill
                            className="object-cover"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:from-transparent" />
                        </div>

                        {/* Content Section */}
                        <div className="bg-white p-8 md:p-12 flex flex-col justify-center relative">
                          <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#B86B2B]/10 px-3 py-1 rounded-full">
                            <FaStar className="text-[#B86B2B] text-lg" />
                            <span className="text-[#B86B2B] font-bold">
                              {store.rate_avg.toFixed(1)}
                            </span>
                          </div>

                          <h3 className="text-3xl font-bold text-[#7A5C3E] mb-6">
                            {store.name}
                          </h3>

                          {store.description && (
                            <p className="text-gray-600 mb-6 line-clamp-3">
                              {store.description}
                            </p>
                          )}

                          <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                              <FaMapMarkerAlt className="text-[#B86B2B] text-lg" />
                              <span className="text-gray-700">
                                {store.address}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaPhone className="text-[#B86B2B] text-lg" />
                              <span className="text-gray-700">
                                {store.phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaEnvelope className="text-[#B86B2B] text-lg" />
                              <span className="text-gray-700">
                                {store.email}
                              </span>
                            </div>
                          </div>

                          <Link
                            href={`/cua-hang/${store._id}`}
                            className="inline-block bg-[#B86B2B] text-white px-8 py-4 rounded-xl hover:bg-[#E6A15A] transition-all duration-300 hover:scale-105 text-center font-semibold"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            {stores.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#B86B2B] w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRatedStores;
