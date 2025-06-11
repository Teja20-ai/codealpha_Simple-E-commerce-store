import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Auth } from './components/Auth';
import { Checkout } from './components/Checkout';
import { Orders } from './components/Orders';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    if (page.startsWith('product-')) {
      const productId = page.replace('product-', '');
      setSelectedProductId(productId);
      setCurrentPage('product-detail');
    } else if (page.startsWith('order-confirmation-')) {
      setCurrentPage('order-confirmation');
    } else {
      setCurrentPage(page);
      setSelectedProductId(null);
    }
  };

  const handleProductClick = (productId: string) => {
    handleNavigate(`product-${productId}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} onProductClick={handleProductClick} />;
      case 'products':
        return <ProductList onProductClick={handleProductClick} />;
      case 'product-detail':
        return selectedProductId ? (
          <ProductDetail 
            productId={selectedProductId} 
            onBack={() => handleNavigate('products')} 
          />
        ) : (
          <Home onNavigate={handleNavigate} onProductClick={handleProductClick} />
        );
      case 'cart':
        return <Cart onNavigate={handleNavigate} />;
      case 'login':
        return <Auth mode="login" onNavigate={handleNavigate} />;
      case 'register':
        return <Auth mode="register" onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'orders':
        return <Orders onNavigate={handleNavigate} />;
      case 'order-confirmation':
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Order Confirmed!</h2>
              <p className="text-slate-600 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleNavigate('orders')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  View Orders
                </button>
                <button
                  onClick={() => handleNavigate('home')}
                  className="border border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">About Shop Universe</h1>
            <div className="prose prose-lg text-slate-600 space-y-6">
              <p>
                Welcome to Shop Universe, your premier destination for high-quality products at unbeatable prices. 
                Founded with a vision to make premium shopping accessible to everyone, we've curated an extensive 
                collection of products across multiple categories.
              </p>
              <p>
                Our mission is simple: to provide exceptional products, outstanding customer service, and a 
                seamless shopping experience that exceeds your expectations. From electronics to home goods, 
                we carefully select each item to ensure it meets our high standards of quality and value.
              </p>
              <p>
                At Shop Universe, we believe shopping should be enjoyable, secure, and convenient. That's why 
                we've invested in cutting-edge technology to create a platform that's not only beautiful but 
                also incredibly user-friendly.
              </p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-slate-900">Email</h3>
                    <p className="text-slate-600">support@shopuniverse.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Phone</h3>
                    <p className="text-slate-600">1-800-SHOP-UNI</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Address</h3>
                    <p className="text-slate-600">
                      123 Commerce Street<br />
                      Business District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Send a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                    <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2"></textarea>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg font-medium transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      default:
        return <Home onNavigate={handleNavigate} onProductClick={handleProductClick} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main>
          {renderPage()}
        </main>
        
        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Shop Universe</h3>
                <p className="text-slate-400">
                  Your premier destination for quality products at unbeatable prices.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><button onClick={() => handleNavigate('home')} className="hover:text-white">Home</button></li>
                  <li><button onClick={() => handleNavigate('products')} className="hover:text-white">Products</button></li>
                  <li><button onClick={() => handleNavigate('about')} className="hover:text-white">About</button></li>
                  <li><button onClick={() => handleNavigate('contact')} className="hover:text-white">Contact</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Customer Service</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                  <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-white">Returns</a></li>
                  <li><a href="#" className="hover:text-white">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Connect</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white">Newsletter</a></li>
                  <li><a href="#" className="hover:text-white">Social Media</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Reviews</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2024 Shop Universe. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;