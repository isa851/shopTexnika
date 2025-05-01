import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  reviews?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Rating: React.FC<RatingProps> = ({
  value,
  reviews,
  showCount = true,
  size = 'md'
}) => {
  const maxStars = 5;
  const filledStars = Math.floor(value);
  const hasHalfStar = value - filledStars >= 0.5;
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(maxStars)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < filledStars
                ? 'text-yellow-400 fill-yellow-400'
                : i === filledStars && hasHalfStar
                ? 'text-yellow-400 fill-yellow-400 half-star'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {(showCount && reviews !== undefined) && (
        <span className={`ml-2 ${textSizeClasses[size]} text-gray-600`}>
          ({reviews})
        </span>
      )}
    </div>
  );
};

export default Rating;