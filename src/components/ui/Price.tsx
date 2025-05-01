import React from 'react';

interface PriceProps {
  value: number;
  discountedValue?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Price: React.FC<PriceProps> = ({ 
  value, 
  discountedValue, 
  size = 'md' 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };
  
  const hasDiscount = discountedValue !== undefined && discountedValue < value;
  
  return (
    <div className="flex items-center gap-2">
      {hasDiscount ? (
        <>
          <span className={`font-semibold ${sizeClasses[size]} text-blue-600`}>
            {formatPrice(discountedValue!)}
          </span>
          <span className={`line-through text-gray-500 ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
            {formatPrice(value)}
          </span>
        </>
      ) : (
        <span className={`font-semibold ${sizeClasses[size]} text-gray-900`}>
          {formatPrice(value)}
        </span>
      )}
    </div>
  );
};

export default Price;