import React from 'react';
import { Package, Truck, CheckCircle, Clock, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface OrdersProps {
  onNavigate: (page: string) => void;
}

export const Orders: React.FC<OrdersProps> = ({ onNavigate }) => {
  const { orders, user } = useApp();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Please sign in to view your orders</h2>
          <button
            onClick={() => onNavigate('login')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">No orders yet</h2>
          <p className="text-slate-600 mb-8">When you place your first order, it will appear here.</p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-slate-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="px-6 py-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{item.product.name}</h4>
                      <p className="text-sm text-slate-600">
                        Quantity: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">Total:</span>
                <span className="text-lg font-bold text-slate-900">
                  ${order.total.toFixed(2)}
                </span>
              </div>

              {/* Shipping Address */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <h5 className="font-medium text-slate-900 mb-2">Shipping Address:</h5>
                <p className="text-sm text-slate-600">
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};