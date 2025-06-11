import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack }) => {
  const { products, addToCart } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
          <button
            onClick={onBack}
            className="mt-4 text-emerald-600 hover:text-emerald-700"
          >
            ← Back to products
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-slate-300'
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6 font-medium"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Discount Badge */}
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index 
                      ? 'border-emerald-500' 
                      : 'border-slate-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-600 font-medium">{product.category}</span>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Heart className="h-5 w-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Share2 className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="font-medium text-slate-900">{product.rating}</span>
              </div>
              <span className="text-slate-500">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-slate-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="font-medium text-slate-900">
              {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-slate-900">Quantity:</label>
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-2 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          )}

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              <Truck className="h-6 w-6 text-emerald-600" />
              <div>
                <div className="font-medium text-slate-900">Free Shipping</div>
                <div className="text-sm text-slate-600">On orders over $100</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-emerald-600" />
              <div>
                <div className="font-medium text-slate-900">Warranty</div>
                <div className="text-sm text-slate-600">1 year coverage</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-6 w-6 text-emerald-600" />
              <div>
                <div className="font-medium text-slate-900">Easy Returns</div>
                <div className="text-sm text-slate-600">30 day policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};