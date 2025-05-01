import React from 'react';
import { products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';

const DealsPage: React.FC = () => {
  const dealsProducts = products.filter(product => product.discountedPrice);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Special Deals</h1>
      <ProductGrid products={dealsProducts} columns={4} />
    </div>
  );
};

export default DealsPage;