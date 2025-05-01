import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User, Heart, MapPin, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../data/categories';

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  
  return (
    <header className="sticky top-0 z-50">
      {/* Top navigation bar */}
      <div className="bg-[#232F3E] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            {/* Logo */}
            <Link to="/" className="mr-4 flex-shrink-0">
              <h1 className="text-2xl font-bold">amazify</h1>
            </Link>
            
            {/* Location */}
            <div className="hidden md:flex items-center text-sm mr-4">
              <MapPin size={16} className="mr-1" />
              <div>
                <div className="text-gray-300 text-xs">Deliver to</div>
                <div className="font-bold">Osh</div>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="flex-grow mx-4 relative">
              <div className="flex">
                <div className="relative flex-grow">
                  <select 
                    className="absolute left-0 top-0 bottom-0 px-2 text-black bg-gray-100 border-r border-gray-300 rounded-l text-sm"
                    style={{ width: '80px' }}
                  >
                    <option>All</option>
                    {categories.map(category => (
                      <option key={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full h-10 py-2 pl-24 pr-10 text-black rounded-l focus:outline-none"
                  />
                </div>
                <button className="bg-[#FEBD69] hover:bg-[#F3A847] h-10 px-4 rounded-r flex items-center justify-center">
                  <Search size={20} className="text-black" />
                </button>
              </div>
            </div>
            
            {/* Navigation links */}
            <nav className="flex items-center ml-4">
              {/* Account & Lists */}
              <div className="relative mr-4">
                <button 
                  className="text-white flex flex-col items-start text-sm"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="text-xs text-gray-300">
                    {isAuthenticated ? `Hello, ${user?.name}` : 'Hello, Sign in'}
                  </span>
                  <span className="font-bold flex items-center">
                    Account & Lists
                    <ChevronDown size={14} className="ml-1" />
                  </span>
                </button>
                
                {/* Dropdown menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10">
                    <div className="p-4">
                      {!isAuthenticated ? (
                        <>
                          <Link 
                            to="/signin" 
                            className="block w-full bg-[#FFA41C] text-center text-black py-1 px-3 rounded"
                            onClick={() => setShowDropdown(false)}
                          >
                            Sign In
                          </Link>
                          <div className="text-xs text-center mt-2 text-gray-600">
                            New customer?{' '}
                            <Link 
                              to="/register" 
                              className="text-[#007185]"
                              onClick={() => setShowDropdown(false)}
                            >
                              Start here
                            </Link>
                          </div>
                        </>
                      ) : (
                        <button 
                          className="block w-full bg-[#FFA41C] text-center text-black py-1 px-3 rounded"
                          onClick={() => {
                            logout();
                            setShowDropdown(false);
                          }}
                        >
                          Sign Out
                        </button>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 mt-2">
                      <div className="p-3">
                        <h3 className="font-bold text-sm">Your Account</h3>
                        <ul className="mt-2 space-y-2 text-sm text-gray-700">
                          <li><Link to="/account" className="hover:text-[#007185]" onClick={() => setShowDropdown(false)}>Your Account</Link></li>
                          <li><Link to="/orders" className="hover:text-[#007185]" onClick={() => setShowDropdown(false)}>Orders</Link></li>
                          <li><Link to="/wishlist" className="hover:text-[#007185]" onClick={() => setShowDropdown(false)}>Wish List</Link></li>
                          <li><Link to="/recommendations" className="hover:text-[#007185]" onClick={() => setShowDropdown(false)}>Recommendations</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Returns & Orders */}
              <Link to="/orders" className="hidden md:flex flex-col mr-4 text-sm">
                <span className="text-xs text-gray-300">Returns</span>
                <span className="font-bold">& Orders</span>
              </Link>
              
              {/* Wishlist (Hidden on small screens) */}
              <Link to="/wishlist" className="hidden md:flex items-center mr-4 text-sm">
                <Heart size={22} className="mr-1" />
                <span className="font-bold">Wishlist</span>
              </Link>
              
              {/* Cart */}
              <Link to="/cart" className="flex items-end relative">
                <ShoppingCart size={26} />
                <span className="absolute -top-1 -right-1 bg-[#FFA41C] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
                <span className="font-bold ml-1">Cart</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Secondary navigation - Categories */}
      <div className="bg-[#37475A] text-white py-2 px-4">
        <div className="container mx-auto flex items-center">
          <button 
            className="flex items-center text-sm mr-4"
            onClick={() => setShowCategories(!showCategories)}
          >
            <Menu size={18} className="mr-1" />
            <span>All</span>
          </button>
          
          <div className="overflow-x-auto flex-1 no-scrollbar">
            <div className="flex space-x-4">
              {categories.slice(0, 6).map(category => (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`}
                  className="text-sm whitespace-nowrap hover:text-gray-300 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          
          <Link to="/deals" className="hidden md:block text-sm font-bold whitespace-nowrap ml-4 text-[#FFA41C]">
            Today's Deals
          </Link>
        </div>
      </div>
      
      {/* Category dropdown menu (when expanded) */}
      {showCategories && (
        <div className="absolute left-0 right-0 bg-white shadow-md z-40">
          <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
              <div key={category.id} className="mb-4">
                <h3 className="font-bold text-sm text-gray-800 mb-2">{category.name}</h3>
                <ul className="space-y-1">
                  {category.subcategories?.map(sub => (
                    <li key={sub.id}>
                      <Link 
                        to={`/category/${category.id}/${sub.id}`}
                        className="text-sm text-gray-600 hover:text-[#007185]"
                        onClick={() => setShowCategories(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;