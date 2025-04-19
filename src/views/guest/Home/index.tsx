'use client';

import HeroSlider from './components/HeroSlider';
import Services from './components/Services';
import Promotions from './components/Promotions';
import Categories from './components/Categories';
import NewArrivals from './components/NewArrivals';
import OnlineExclusive from './components/OnlineExclusive';
import RecommendedProducts from './components/RecommendedProducts';

const HomeView = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <Services />
      <Promotions />
      <Categories />
      <NewArrivals />
      <OnlineExclusive />
      <RecommendedProducts />
    </div>
  );
};

export default HomeView;
