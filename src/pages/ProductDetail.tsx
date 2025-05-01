import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Truck, Heart, Share2, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || '');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-4">Sorry, we couldn't find the product you're looking for.</p>
          <Link 
            to="/" 
            className="text-[#007185] hover:text-[#00596B] hover:underline flex items-center justify-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Calculate the discounted price if applicable
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex text-sm">
          <li>
            <Link to="/" className="text-[#007185] hover:text-[#00596B] hover:underline">Home</Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link 
              to={`/category/${product.categories[0].toLowerCase()}`} 
              className="text-[#007185] hover:text-[#00596B] hover:underline"
            >
              {product.categories[0]}
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-500 truncate max-w-xs">{product.title}</li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="mb-4 rounded-lg overflow-hidden bg-white flex items-center justify-center h-80">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            {/* Image thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 mt-4">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    className={`w-16 h-16 border-2 rounded overflow-hidden ${
                      selectedImage === index ? 'border-[#FFA41C]' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} - View ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Product Information */}
        <div className="lg:col-span-1">
          <h1 className="text-2xl font-medium text-gray-800 mb-2">{product.title}</h1>
          
          {/* Brand */}
          <div className="mb-2">
            <Link to={`/brand/${product.brand.toLowerCase()}`} className="text-[#007185] hover:underline">
              By {product.brand}
            </Link>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-[#007185] hover:text-[#00596B] hover:underline">
              {product.reviewCount} ratings
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            {discountedPrice ? (
              <div>
                <div className="flex items-baseline">
                  <span className="text-sm text-gray-500 line-through mr-2">${product.price.toFixed(2)}</span>
                  <span className="text-3xl font-medium text-gray-800">${discountedPrice.toFixed(2)}</span>
                </div>
                <div className="text-sm text-red-600 mt-1">
                  Save {product.discount}% (${(product.price - discountedPrice).toFixed(2)})
                </div>
              </div>
            ) : (
              <span className="text-3xl font-medium text-gray-800">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">About this item</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          {/* Availability & Features */}
          <div className="mb-6 space-y-2">
            {product.inStock ? (
              <div className="text-green-600 font-medium">In Stock</div>
            ) : (
              <div className="text-red-600 font-medium">Currently Unavailable</div>
            )}
            
            {product.prime && (
              <div className="flex items-center text-[#007185]">
                <Truck size={18} className="mr-2" />
                <span>Prime Delivery - FREE delivery by tomorrow</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Buy box */}
        <div className="lg:col-span-1 lg:row-start-1 lg:row-end-3">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
            {/* Price display in buy box */}
            <div className="mb-4">
              {discountedPrice ? (
                <div className="flex items-baseline">
                  <span className="text-2xl font-medium text-gray-800">${discountedPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-2xl font-medium text-gray-800">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Stock status */}
            <div className="mb-4">
              {product.inStock ? (
                <div className="text-green-600 font-medium">In Stock</div>
              ) : (
                <div className="text-red-600 font-medium">Currently Unavailable</div>
              )}
            </div>
            
            {/* Quantity selector */}
            {product.inStock && (
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded w-full p-2"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Add to cart button */}
            <div className="space-y-3">
              <Button 
                variant="primary" 
                fullWidth
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                fullWidth
              >
                <Heart size={18} className="mr-2" />
                Add to Wish List
              </Button>
            </div>
            
            {/* Secure transaction */}
            <div className="mt-6 text-sm text-gray-600">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Secure transaction
              </div>
              <div className="ml-6">
                <p>Your transaction is secure</p>
                <p>We work hard to protect your security and privacy</p>
              </div>
            </div>
            
            {/* Share */}
            <div className="mt-4 flex items-center">
              <Share2 size={16} className="mr-2 text-gray-600" />
              <span className="text-sm text-[#007185] hover:text-[#00596B] hover:underline cursor-pointer">
                Share
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;