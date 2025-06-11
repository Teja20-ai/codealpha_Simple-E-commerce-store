import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    description: 'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 324,
    inStock: true,
    stockCount: 45,
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    features: ['Active Noise Cancellation', '30-hour Battery', 'Quick Charge', 'Premium Materials']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    description: 'Track your fitness goals with advanced health monitoring, GPS, and smart notifications in a sleek design.',
    images: [
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Wearables',
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    stockCount: 32,
    tags: ['fitness', 'health', 'smartwatch'],
    features: ['Heart Rate Monitor', 'GPS Tracking', '7-day Battery', 'Water Resistant']
  },
  {
    id: '3',
    name: 'Professional Camera',
    price: 899.99,
    originalPrice: 1199.99,
    description: 'Capture stunning photos and videos with this professional-grade camera featuring 4K recording and advanced autofocus.',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Photography',
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    stockCount: 18,
    tags: ['camera', '4k', 'professional'],
    features: ['4K Video Recording', '24MP Sensor', 'Image Stabilization', 'Weather Sealed']
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    description: 'Premium ergonomic office chair with lumbar support and breathable mesh back for all-day comfort.',
    images: [
      'https://images.pexels.com/photos/586024/pexels-photo-586024.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Furniture',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    stockCount: 25,
    tags: ['ergonomic', 'office', 'furniture'],
    features: ['Lumbar Support', 'Breathable Mesh', 'Height Adjustable', '5-Year Warranty']
  },
  {
    id: '5',
    name: 'Wireless Charging Stand',
    price: 79.99,
    description: 'Fast wireless charging stand compatible with all Qi-enabled devices. Sleek design fits any desk setup.',
    images: [
      'https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    rating: 4.4,
    reviewCount: 98,
    inStock: true,
    stockCount: 67,
    tags: ['wireless', 'charging', 'qi'],
    features: ['Fast Charging', 'Qi Compatible', 'LED Indicator', 'Non-slip Base']
  },
  {
    id: '6',
    name: 'Premium Coffee Maker',
    price: 199.99,
    description: 'Programmable coffee maker with thermal carafe and precision brewing for the perfect cup every time.',
    images: [
      'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Kitchen',
    rating: 4.5,
    reviewCount: 145,
    inStock: true,
    stockCount: 41,
    tags: ['coffee', 'kitchen', 'appliance'],
    features: ['Programmable Timer', 'Thermal Carafe', 'Auto Shut-off', '12-Cup Capacity']
  },
  {
    id: '7',
    name: 'Bluetooth Speaker',
    price: 89.99,
    originalPrice: 129.99,
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design for any adventure.',
    images: [
      'https://images.pexels.com/photos/1193942/pexels-photo-1193942.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Audio',
    rating: 4.3,
    reviewCount: 267,
    inStock: true,
    stockCount: 89,
    tags: ['bluetooth', 'speaker', 'waterproof'],
    features: ['360° Sound', 'Waterproof IPX7', '12-hour Battery', 'Voice Assistant']
  },
  {
    id: '8',
    name: 'Gaming Mechanical Keyboard',
    price: 159.99,
    description: 'RGB mechanical gaming keyboard with tactile switches and programmable keys for competitive gaming.',
    images: [
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Gaming',
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
    stockCount: 54,
    tags: ['gaming', 'mechanical', 'rgb'],
    features: ['Mechanical Switches', 'RGB Lighting', 'Programmable Keys', 'N-Key Rollover']
  }
];