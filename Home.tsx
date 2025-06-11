import React from 'react';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';

interface HomeProps {
  onNavigate: (page: string) => void;
  onProductClick: (productId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onProductClick }) => {
  const { products } = useApp();

  // Featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Shop Universe
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Discover amazing products at unbeatable prices. Your premium shopping destination for quality, style, and value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('products')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="border border-white/30 hover:bg-white/10 text-white py-3 px-8 rounded-lg font-medium transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Shop Universe?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Free Shipping</h3>
              <p className="text-slate-600">Free shipping on all orders over $100. Fast and reliable delivery worldwide.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Secure Shopping</h3>
              <p className="text-slate-600">Your data is protected with industry-leading security measures and encryption.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Easy Returns</h3>
              <p className="text-slate-600">30-day hassle-free return policy. Not satisfied? We'll make it right.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products, chosen for their quality and value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => onNavigate('products')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-lg font-medium flex items-center justify-center space-x-2 mx-auto transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-slate-300 mb-8">
            Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive deals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};