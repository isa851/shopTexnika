import React from 'react';
import { categories } from '../data/categories';
import CategorySection from '../components/home/CategorySection';

const CategoriesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Browse Categories</h1>
      <CategorySection categories={categories} />
    </div>
  );
};

export default CategoriesPage;