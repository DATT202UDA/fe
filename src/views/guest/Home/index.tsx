'use client';

import { HeroSection } from '@/views/guest/Home/components/HeroSection';
import { CategoriesSection } from '@/views/guest/Home/components/CategoriesSection';
import { FeaturedProducts } from '@/views/guest/Home/components/FeaturedProducts';
import { BrandsSection } from '@/views/guest/Home/components/BrandsSection';
import { FeaturesSection } from '@/views/guest/Home/components/FeaturesSection';

const HomeView = () => {

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <BrandsSection />
      <FeaturesSection />
    </div>
  );
};

export default HomeView;
