import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Price from '../components/ui/Price';
import QuantitySelector from '../components/product/QuantitySelector';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <ShoppingCart size={64} className="mx-auto text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
              Browse our products and find something you like!
            </p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-6 font-medium text-gray-700">Product</div>
                <div className="col-span-2 font-medium text-gray-700">Price</div>
                <div className="col-span-2 font-medium text-gray-700">Quantity</div>
                <div className="col-span-2 font-medium text-gray-700 text-right">Total</div>
              </div>
              
              {/* Cart items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => {
                  const { product, quantity } = item;
                  const price = product.discountedPrice || product.price;
                  const total = price * quantity;
                  
                  return (
                    <div key={product.id} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-wrap">
                      {/* Product */}
                      <div className="col-span-6 flex items-center mb-4 md:mb-0">
                        <Link to={`/product/${product.id}`} className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="ml-4">
                          <Link 
                            to={`/product/${product.id}`} 
                            className="font-medium text-gray-900 hover:text-blue-600"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2 mb-4 md:mb-0">
                        <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Price:</div>
                        <Price value={product.price} discountedValue={product.discountedPrice} />
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2 mb-4 md:mb-0">
                        <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Quantity:</div>
                        <QuantitySelector 
                          quantity={quantity} 
                          onChange={(newQuantity) => handleQuantityChange(product.id, newQuantity)}
                          max={product.stock}
                        />
                      </div>
                      
                      {/* Total & Remove */}
                      <div className="col-span-2 flex items-center justify-between md:justify-end">
                        <div>
                          <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Total:</div>
                          <Price value={total} size="md" />
                        </div>
                        <button
                          className="p-1 text-gray-400 hover:text-red-600 ml-4"
                          onClick={() => handleRemove(product.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Continue shopping */}
            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center"
              >
                <ArrowRight size={18} className="mr-2 rotate-180" />
                Continue Shopping
              </Button>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <Price value={subtotal} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <Price value={subtotal * 0.1} />
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <Price value={subtotal * 1.1} size="lg" />
                  </div>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;