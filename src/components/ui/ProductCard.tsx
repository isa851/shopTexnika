import React from 'react';
import { Product } from '../../types';
import { Star, ShoppingCart, Check, Truck } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  // Calculate the discounted price if applicable
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };
  
  return (
    <div className="bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded px-2 py-1">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-base font-medium text-gray-800 mb-1 line-clamp-2">{product.title}</h3>
        
        {/* Ratings */}
        <div className="flex items-center mb-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="mb-2">
          {discountedPrice ? (
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-gray-800">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Availability & Prime */}
        <div className="text-sm mt-auto space-y-1 mb-3">
          {product.inStock ? (
            <div className="flex items-center text-green-600">
              <Check size={14} className="mr-1" />
              <span>In Stock</span>
            </div>
          ) : (
            <div className="text-red-500">Out of Stock</div>
          )}
          
          {product.prime && (
            <div className="flex items-center text-[#007185]">
              <Truck size={14} className="mr-1" />
              <span>Prime Delivery</span>
            </div>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <Button 
          variant="primary" 
          size="sm" 
          fullWidth
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className="mt-2"
        >
          <ShoppingCart size={16} className="mr-1" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;