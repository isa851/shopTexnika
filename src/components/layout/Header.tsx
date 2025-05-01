import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingCart, X, GitCompare as Compare } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useComparison } from '../../context/ComparisonContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { comparisonItems } = useComparison();
  const location = useLocation();
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TechStore
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium">
              Categories
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-blue-600 font-medium">
              Deals
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100">
              <Search size={20} />
            </Link>
            
            <Link to="/compare" className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100 relative">
              <Compare size={20} />
              {comparisonItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-blue-600 text-white text-xs rounded-full">
                  {comparisonItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-blue-600 text-white text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Button 
              variant="primary" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => console.log('Sign in clicked')}
            >
              Sign In
            </Button>
            
            {/* Mobile menu button */}
            <button 
              className="p-2 md:hidden text-gray-700 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 hover:bg-gray-50">
                Home
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 hover:bg-gray-50">
                Categories
              </Link>
              <Link to="/deals" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 hover:bg-gray-50">
                Deals
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 hover:bg-gray-50">
                About
              </Link>
              <div className="px-4 pt-2">
                <Button variant="primary" fullWidth>
                  Sign In
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;