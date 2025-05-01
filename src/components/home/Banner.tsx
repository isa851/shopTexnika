import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Banner as BannerType } from '../../types';
import Button from '../ui/Button';

interface BannerProps {
  banners: BannerType[];
  autoPlay?: boolean;
  interval?: number;
}

const Banner: React.FC<BannerProps> = ({ 
  banners, 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, banners.length, interval]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  };
  
  const banner = banners[currentSlide];
  
  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
      {/* Banner image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out transform scale-105"
        style={{ backgroundImage: `url(${banner.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-xl text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 animate-fadeIn">
            {banner.title}
          </h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90 animate-fadeIn animation-delay-200">
            {banner.subtitle}
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => {}}
            className="animate-fadeIn animation-delay-300"
          >
            <Link to={banner.link}>Shop Now</Link>
          </Button>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
        onClick={goToPrevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
        onClick={goToNextSlide}
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;