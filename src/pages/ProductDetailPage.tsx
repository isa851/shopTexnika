import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Check, BarChart2, Share2, Heart, ShieldCheck, TruckIcon, RotateCcw } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import Price from '../components/ui/Price';
import ProductImages from '../components/product/ProductImages';
import QuantitySelector from '../components/product/QuantitySelector';
import ProductGrid from '../components/product/ProductGrid';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useComparison } from '../context/ComparisonContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  
  const { addToCart } = useCart();
  const { addToComparison, isInComparison } = useComparison();
  
  // Find product by id
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }
  
  const isInComp = isInComparison(product.id);
  
  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleAddToComparison = () => {
    addToComparison(product);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to={`/category/${product.category}`} className="hover:text-blue-600 capitalize">{product.category}</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-700 truncate">{product.name}</span>
        </div>
        
        {/* Product main section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Product images */}
          <div>
            <ProductImages images={product.images} productName={product.name} />
          </div>
          
          {/* Right: Product details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <Rating value={product.rating} reviews={product.reviews} />
              <span className="ml-4 text-sm text-gray-500">
                {product.stock > 0 ? (
                  <span className="flex items-center text-green-600">
                    <Check size={16} className="mr-1" /> In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </span>
            </div>
            
            <div className="mb-6">
              <Price 
                value={product.price} 
                discountedValue={product.discountedPrice} 
                size="lg" 
              />
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <QuantitySelector 
                  quantity={quantity} 
                  onChange={setQuantity} 
                  max={product.stock}
                />
              </div>
              
              <Button 
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-grow"
              >
                Add to Cart
              </Button>
            </div>
            
            <div className="flex space-x-3 mb-8">
              <Button variant="outline" onClick={handleAddToComparison} disabled={isInComp}>
                <BarChart2 size={18} className="mr-2" />
                {isInComp ? 'Added to Compare' : 'Add to Compare'}
              </Button>
              
              <Button variant="outline">
                <Heart size={18} className="mr-2" />
                Wishlist
              </Button>
              
              <Button variant="outline">
                <Share2 size={18} className="mr-2" />
                Share
              </Button>
            </div>
            
            {/* Key features */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Delivery & returns */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TruckIcon size={18} className="text-blue-600 mr-2" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ShieldCheck size={18} className="text-blue-600 mr-2" />
                  <span>2-year warranty</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RotateCcw size={18} className="text-blue-600 mr-2" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                className={`pb-4 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`pb-4 font-medium text-sm ${
                  activeTab === 'specifications'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`pb-4 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews})
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p>{product.description}</p>
                {/* More description content would go here */}
                <p className="mt-4">
                  Experience the next level of technology with the {product.name}. 
                  Designed for performance and reliability, this device offers everything 
                  you need for your daily tasks and entertainment.
                </p>
                
                <p className="mt-4">
                  With its sleek design and powerful features, the {product.name} stands out 
                  from the competition. Whether you're a professional looking for a reliable 
                  tool or a tech enthusiast seeking the latest innovations, this product 
                  delivers on all fronts.
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div 
                      key={key} 
                      className={`grid grid-cols-3 py-3 px-4 ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{key}</div>
                      <div className="col-span-2 text-gray-600">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="text-center py-10">
                <p className="text-gray-600">Reviews will be added soon!</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;