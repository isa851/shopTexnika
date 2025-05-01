import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductImagesProps {
  images: string[];
  productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, productName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };
  
  const handlePrevClick = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };
  
  const handleNextClick = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };
  
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePosition({ x, y });
  };
  
  const handleImageMouseLeave = () => {
    setIsZoomed(false);
  };
  
  return (
    <div className="flex flex-col">
      {/* Main image */}
      <div 
        className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 cursor-crosshair"
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleImageMouseMove}
        onMouseLeave={handleImageMouseLeave}
      >
        <div 
          className={`relative w-full h-full transition-transform duration-200 ${isZoomed ? 'scale-150' : ''}`}
          style={
            isZoomed 
              ? { 
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` 
                } 
              : {}
          }
        >
          <img 
            src={images[currentImage]} 
            alt={`${productName} - View ${currentImage + 1}`} 
            className="w-full h-full object-contain"
          />
        </div>
        
        {!isZoomed && (
          <button 
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md text-gray-700 hover:text-blue-600 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(true);
            }}
          >
            <ZoomIn size={20} />
          </button>
        )}
        
        {/* Navigation arrows */}
        {images.length > 1 && !isZoomed && (
          <>
            <button 
              className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full bg-white/70 shadow-md text-gray-700 hover:text-blue-600 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevClick();
              }}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full bg-white/70 shadow-md text-gray-700 hover:text-blue-600 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handleNextClick();
              }}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImage ? 'border-blue-600 opacity-100' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img 
                src={image} 
                alt={`${productName} - Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;