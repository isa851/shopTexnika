import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">TechStore</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for the latest and greatest technology products.
              We offer a wide range of devices at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white">Shop</Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-white">Deals</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-400 hover:text-white">Warranty</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 text-gray-400 shrink-0 mt-1" size={18} />
                <span className="text-gray-400">123 Tech Street, San Francisco, CA 94107, USA</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-gray-400" size={18} />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-gray-400" size={18} />
                <a href="mailto:info@techstore.com" className="text-gray-400 hover:text-white">
                  info@techstore.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TechStore. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <img 
              src="https://images.pexels.com/photos/175679/pexels-photo-175679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Payment methods" 
              className="h-6 opacity-70" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;