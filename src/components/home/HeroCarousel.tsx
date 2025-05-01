import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const carouselItems = [
  {
    id: 1,
    imageUrl: 'https://images.pexels.com/photos/6214172/pexels-photo-6214172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off seasonal favorites',
    buttonText: 'Shop Now',
    buttonLink: '/deals',
    align: 'left',
  },
  {
    id: 2,
    imageUrl: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'New Electronics',
    subtitle: 'The latest tech at amazing prices',
    buttonText: 'Explore',
    buttonLink: '/category/electronics',
    align: 'right',
  },
  {
    id: 3,
    imageUrl: 'https://images.pexels.com/photos/6214185/pexels-photo-6214185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Home Essentials',
    subtitle: 'Everything you need for your space',
    buttonText: 'Discover',
    buttonLink: '/category/home-kitchen',
    align: 'center',
  },
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  const goToPreviousSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  const goToNextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  const current = carouselItems[currentSlide];
  
  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Carousel slides */}
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${item.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto h-full flex items-center px-6">
            <div className={`text-white max-w-lg ${
              item.align === 'left' 
                ? 'text-left ml-0 mr-auto' 
                : item.align === 'right' 
                  ? 'text-right ml-auto mr-0' 
                  : 'text-center mx-auto'
            }`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-2 animate-fadeIn">
                {item.title}
              </h2>
              <p className="text-xl md:text-2xl mb-6 animate-fadeIn animation-delay-100">
                {item.subtitle}
              </p>
              <Link
                to={item.buttonLink}
                className="inline-block bg-[#FFA41C] hover:bg-[#F59000] text-black font-bold py-2 px-6 rounded-md transition-colors animate-fadeIn animation-delay-200"
              >
                {item.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 transition-all"
        onClick={goToPreviousSlide}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 transition-all"
        onClick={goToNextSlide}
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;