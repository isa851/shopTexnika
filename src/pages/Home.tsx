import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryGrid from '../components/home/CategoryGrid';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  // Get products by various categories for different sections
  const electronics = products.filter(p => p.categories.includes('Electronics')).slice(0, 4);
  const homeKitchen = products.filter(p => p.categories.includes('Home & Kitchen')).slice(0, 4);
  
  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Category Grid */}
      <CategoryGrid />
      
      {/* Electronics Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Top Electronics</h2>
            <Link 
              to="/category/electronics" 
              className="text-[#007185] hover:text-[#00596B] hover:underline flex items-center text-sm"
            >
              See all in Electronics
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {electronics.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner */}
      <section className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Become a Prime Member</h2>
              <p className="text-gray-300 mb-6">
                Fast, FREE delivery on over 100 million products, exclusive deals, 
                streaming of movies, TV shows, and more.
              </p>
              <Link 
                to="/prime" 
                className="bg-[#FFA41C] hover:bg-[#F59000] text-black font-bold py-2 px-6 rounded-md inline-block transition-colors"
              >
                Try Prime Free
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/6214172/pexels-photo-6214172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Prime Delivery" 
                className="max-w-full h-auto rounded-lg shadow-lg" 
                style={{ maxHeight: '200px' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Home & Kitchen Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Home & Kitchen</h2>
            <Link 
              to="/category/home-kitchen" 
              className="text-[#007185] hover:text-[#00596B] hover:underline flex items-center text-sm"
            >
              See all in Home & Kitchen
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {homeKitchen.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;