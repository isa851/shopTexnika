import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Globe, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-[#232F3E] text-white">
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] py-3 text-sm font-medium transition-colors"
      >
        <div className="flex items-center justify-center">
          <ArrowUp size={16} className="mr-2" />
          Back to top
        </div>
      </button>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white">Press Releases</Link></li>
              <li><Link to="/impact" className="hover:text-white">Community Impact</Link></li>
              <li><Link to="/sustainability" className="hover:text-white">Sustainability</Link></li>
            </ul>
          </div>
          
          {/* Make Money with Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/sell" className="hover:text-white">Sell products</Link></li>
              <li><Link to="/associates" className="hover:text-white">Become an Affiliate</Link></li>
              <li><Link to="/partner" className="hover:text-white">Advertise Your Products</Link></li>
              <li><Link to="/publish" className="hover:text-white">Self-Publish with Us</Link></li>
              <li><Link to="/host" className="hover:text-white">Host on our platform</Link></li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/help" className="hover:text-white">Your Account</Link></li>
              <li><Link to="/shipping" className="hover:text-white">Shipping Rates & Policies</Link></li>
              <li><Link to="/returns" className="hover:text-white">Returns & Replacements</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/help-center" className="hover:text-white">Help Center</Link></li>
            </ul>
          </div>
          
          {/* Stay Connected */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-[#FFA41C] transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-[#FFA41C] transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-[#FFA41C] transition-colors">
                <Instagram size={24} />
              </a>
            </div>
            
            {/* Language selector */}
            <div className="flex items-center text-sm border border-gray-600 rounded p-2 w-fit">
              <Globe size={16} className="mr-2" />
              <select className="bg-transparent outline-none">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="bg-[#131A22] py-4 text-sm text-gray-400">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <span>© 2025 Amazify. All Rights Reserved.</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Use</Link>
            <Link to="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;