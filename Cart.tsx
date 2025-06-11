import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CartProps {
  onNavigate: (page: string) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const { cart, updateCartQuantity, removeFromCart, user } = useApp();

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!user) {
      onNavigate('login');
    } else {
      onNavigate('checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
          <p className="text-slate-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 mb-1">{item.product.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">{item.product.category}</p>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-emerald-600">
                      ${item.product.price.toFixed(2)}
                    </span>
                    {item.product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ${item.product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-slate-300 rounded-lg">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-slate-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-slate-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-bold text-slate-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping:</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax:</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between">
                <span className="text-lg font-bold text-slate-900">Total:</span>
                <span className="text-lg font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 100 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <span>{user ? 'Proceed to Checkout' : 'Sign In to Checkout'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigate('products')}
              className="w-full mt-3 border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};