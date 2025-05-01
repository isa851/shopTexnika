import React from 'react';
import Layout from '../components/layout/Layout';
import Banner from '../components/home/Banner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import { banners } from '../data/banners';
import { categories } from '../data/categories';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  const featuredProducts = products.filter(product => product.isFeatured);
  const newArrivals = products.filter(product => product.isNew);
  
  return (
    <Layout>
      <Banner banners={banners} />
      
      <CategorySection categories={categories} />
      
      <FeaturedProducts 
        products={featuredProducts} 
        title="Featured Products" 
        seeAllLink="/featured"
      />
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Latest Technology at Your Fingertips
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover cutting-edge devices that enhance your everyday life. From powerful smartphones to immersive audio, 
              we offer the best tech products at competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#featured" 
                className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Shop Now
              </a>
              <a 
                href="/categories" 
                className="bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                Browse Categories
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <FeaturedProducts 
        products={newArrivals} 
        title="New Arrivals" 
        seeAllLink="/new-arrivals"
      />
    </Layout>
  );
};

export default HomePage;