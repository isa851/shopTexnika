import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BarChart2 } from 'lucide-react';
import { Product } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Price from '../ui/Price';
import Rating from '../ui/Rating';
import { useCart } from '../../context/CartContext';
import { useComparison } from '../../context/ComparisonContext';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  layout = 'grid' 
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToComparison, isInComparison } = useComparison();
  
  const isInComp = isInComparison(product.id);
  
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const handleAddToComparison = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToComparison(product);
  };
  
  if (layout === 'list') {
    return (
      <div 
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
        onClick={handleClick}
      >
        <div className="relative md:w-1/3">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-64 md:h-full object-cover"
          />
          {product.isNew && (
            <Badge variant="info" className="absolute top-2 left-2">
              New
            </Badge>
          )}
          {product.discountedPrice && (
            <Badge variant="danger" className="absolute top-2 right-2">
              Sale
            </Badge>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <Price 
                value={product.price} 
                discountedValue={product.discountedPrice} 
                size="md"
              />
              <div className="text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="primary"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-grow"
              >
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                className="p-2"
                onClick={handleAddToComparison}
                disabled={isInComp}
              >
                <BarChart2 size={20} className={isInComp ? 'text-blue-600' : 'text-gray-600'} />
              </Button>
              
              <Button
                variant="outline"
                className="p-2"
              >
                <Heart size={20} className="text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.isNew && (
          <Badge variant="info" className="absolute top-2 left-2">
            New
          </Badge>
        )}
        {product.discountedPrice && (
          <Badge variant="danger" className="absolute top-2 right-2">
            Sale
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        
        <div className="mb-3">
          <Rating value={product.rating} reviews={product.reviews} size="sm" />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <Price 
            value={product.price} 
            discountedValue={product.discountedPrice} 
            size="md"
          />
          
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              className="p-1"
              onClick={handleAddToComparison}
              disabled={isInComp}
            >
              <BarChart2 size={18} className={isInComp ? 'text-blue-600' : 'text-gray-600'} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="p-1"
            >
              <Heart size={18} className="text-gray-600" />
            </Button>
          </div>
        </div>
        
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          fullWidth
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;