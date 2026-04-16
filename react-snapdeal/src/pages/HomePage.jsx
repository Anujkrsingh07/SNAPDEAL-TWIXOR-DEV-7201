import React from 'react';
import Carousel from '../components/Carousel';
import ServiceBar from '../components/ServiceBar';
import ProductGrid from '../components/ProductGrid';
import ShowcaseSection from '../components/ShowcaseSection';
import AppBanner from '../components/AppBanner';
import { newArrivals, trendingNow, budgetBuys } from '../data/showcaseData';

const HomePage = ({ isFocusMode, setIsFocusMode, addToCart, setSelectedProduct }) => {
  return (
    <main>
      <Carousel 
        isFocusMode={isFocusMode} 
        setIsFocusMode={setIsFocusMode} 
      />
      
      {!isFocusMode && (
        <div className="container">
          <ServiceBar />
          
          <ProductGrid 
            addToCart={addToCart} 
            onProductClick={(p) => setSelectedProduct(p)} 
          />
          
          <ShowcaseSection 
            id="newArrivals" 
            title="New Arrivals" 
            badge="NEW-IN"
            products={newArrivals}
            onProductClick={(p) => setSelectedProduct(p)}
          />
          
          <ShowcaseSection 
            id="trendingNow" 
            title="Trending Now 🔥" 
            badge="TRENDING"
            type="trending"
            products={trendingNow}
            onProductClick={(p) => setSelectedProduct(p)}
          />
          
          <ShowcaseSection 
            id="budgetBuys" 
            title="Budget Buys Under ₹999" 
            badge="BEST VALUE"
            type="budget"
            products={budgetBuys}
            onProductClick={(p) => setSelectedProduct(p)}
          />
          
          <AppBanner />
        </div>
      )}
    </main>
  );
};

export default HomePage;
