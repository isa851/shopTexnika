import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h2 className="text-xl mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="text-[#007185] hover:text-[#00596B] hover:underline flex items-center justify-center">
            <ArrowLeft size={16} className="mr-1" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between">
              <span className="font-medium">Shopping Cart ({itemCount} items)</span>
              <span className="text-gray-600">Price</span>
            </div>
            
            {/* List of items */}
            <div className="divide-y divide-gray-200">
              {items.map((item) => {
                const discountedPrice = item.product.discount 
                  ? item.product.price * (1 - item.product.discount / 100) 
                  : item.product.price;
                
                return (
                  <div key={item.product.id} className="p-4 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="sm:w-32 h-32 flex-shrink-0 mb-4 sm:mb-0">
                      <Link to={`/product/${item.product.id}`}>
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.title} 
                          className="w-full h-full object-contain"
                        />
                      </Link>
                    </div>
                    
                    {/* Product Details */}
                    <div className="sm:ml-4 flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between mb-2">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="text-lg font-medium hover:text-[#007185]"
                        >
                          {item.product.title}
                        </Link>
                        <div className="font-medium mt-2 sm:mt-0">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      
                      {item.product.inStock ? (
                        <div className="text-green-600 text-sm mb-2">In Stock</div>
                      ) : (
                        <div className="text-red-600 text-sm mb-2">Out of Stock</div>
                      )}
                      
                      {item.product.prime && (
                        <div className="text-sm text-gray-700 mb-2">Eligible for FREE Prime Delivery</div>
                      )}
                      
                      {/* Quantity selector and delete */}
                      <div className="flex items-center mt-4">
                        <div className="border border-gray-300 rounded-md inline-flex">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 border-l border-r border-gray-300 bg-gray-50">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="border-l border-gray-200 h-6 mx-3"></div>
                        
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-sm text-[#007185] hover:text-[#00596B] hover:underline flex items-center"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50 text-right">
              <div className="text-lg font-medium">
                Subtotal ({itemCount} items): <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="mb-4">
              <div className="text-lg font-medium">
                Subtotal ({itemCount} items): <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-start mb-2">
                <input type="checkbox" id="gift" className="mt-1 mr-2" />
                <label htmlFor="gift" className="text-sm">This order contains a gift</label>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              fullWidth
              size="lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;