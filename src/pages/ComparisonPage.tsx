import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, BarChart2, ShoppingCart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Price from '../components/ui/Price';
import Rating from '../components/ui/Rating';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';

const ComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const { comparisonItems, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();
  
  // Get all unique specification keys across all products
  const specKeys = comparisonItems.length > 0 
    ? [...new Set(comparisonItems.flatMap(item => Object.keys(item.specifications)))]
    : [];
  
  if (comparisonItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <BarChart2 size={64} className="mx-auto text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold mb-4">No Products to Compare</h1>
            <p className="text-gray-600 mb-8">
              You haven't added any products to compare yet.
              Browse our products and add items to comparison.
            </p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Browse Products
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Product Comparison</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearComparison}
          >
            Clear All
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 p-4 text-left font-medium text-gray-700 w-1/4">Product</th>
                  {comparisonItems.map(item => (
                    <th key={item.id} className="border-b border-gray-200 p-4 text-center relative">
                      <button 
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600"
                        onClick={() => removeFromComparison(item.id)}
                      >
                        <X size={16} />
                      </button>
                      <div className="pt-4"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Product Image */}
                <tr>
                  <td className="border-b border-gray-200 p-4 font-medium text-gray-700">Image</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="border-b border-gray-200 p-4 text-center">
                      <div className="w-32 h-32 mx-auto">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                          onClick={() => navigate(`/product/${item.id}`)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
                
                {/* Product Name */}
                <tr>
                  <td className="border-b border-gray-200 p-4 font-medium text-gray-700">Name</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="border-b border-gray-200 p-4 text-center">
                      <a 
                        href={`/product/${item.id}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {item.name}
                      </a>
                    </td>
                  ))}
                </tr>
                
                {/* Price */}
                <tr>
                  <td className="border-b border-gray-200 p-4 font-medium text-gray-700">Price</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="border-b border-gray-200 p-4 text-center">
                      <div className="flex justify-center">
                        <Price 
                          value={item.price} 
                          discountedValue={item.discountedPrice} 
                        />
                      </div>
                    </td>
                  ))}
                </tr>
                
                {/* Rating */}
                <tr>
                  <td className="border-b border-gray-200 p-4 font-medium text-gray-700">Rating</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="border-b border-gray-200 p-4 text-center">
                      <div className="flex justify-center">
                        <Rating value={item.rating} reviews={item.reviews} />
                      </div>
                    </td>
                  ))}
                </tr>
                
                {/* Category */}
                <tr>
                  <td className="border-b border-gray-200 p-4 font-medium text-gray-700">Category</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="border-b border-gray-200 p-4 text-center capitalize">
                      {item.category}
                    </td>
                  ))}
                </tr>
                
                {/* Description */}
                <tr>
                  <td className="border-b border-gray-200 p-4 font-medium text-gray-700">Description</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="border-b border-gray-200 p-4 text-center">
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </td>
                  ))}
                </tr>
                
                {/* Specifications */}
                <tr className="bg-gray-50">
                  <td colSpan={comparisonItems.length + 1} className="border-b border-gray-200 p-4 font-bold text-gray-900">
                    Specifications
                  </td>
                </tr>
                
                {specKeys.map(key => (
                  <tr key={key}>
                    <td className="border-b border-gray-200 p-4 font-medium text-gray-700">{key}</td>
                    {comparisonItems.map(item => (
                      <td key={item.id} className="border-b border-gray-200 p-4 text-center">
                        {item.specifications[key] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Actions */}
                <tr>
                  <td className="p-4 font-medium text-gray-700">Actions</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="p-4 text-center">
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="mr-2"
                        onClick={() => addToCart(item, 1)}
                        disabled={item.stock === 0}
                      >
                        <ShoppingCart size={16} className="mr-1" />
                        Add to Cart
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComparisonPage;