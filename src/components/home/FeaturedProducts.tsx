import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import ProductCard from '../product/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  title: string;
  seeAllLink?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  products, 
  title,
  seeAllLink
}) => {
  // Get only the featured products or the first 4
  const displayProducts = products.filter(p => p.isFeatured).slice(0, 4);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          
          {seeAllLink && (
            <Link 
              to={seeAllLink} 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              See All <ArrowRight size={18} className="ml-1" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;