import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99
}) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };
  
  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onChange(value);
    }
  };
  
  return (
    <div className="flex items-center rounded-md border border-gray-300">
      <button
        type="button"
        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 disabled:text-gray-300"
        onClick={handleDecrement}
        disabled={quantity <= min}
      >
        <Minus size={16} />
      </button>
      
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        className="w-12 h-10 text-center border-x border-gray-300 focus:outline-none"
      />
      
      <button
        type="button"
        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 disabled:text-gray-300"
        onClick={handleIncrement}
        disabled={quantity >= max}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;