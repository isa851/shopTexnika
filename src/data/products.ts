import { Product } from '../types';

// Sample product data
export const products: Product[] = [
  {
    id: '1',
    title: 'Wireless Noise Cancelling Headphones',
    description: 'Premium wireless over-ear headphones with industry-leading noise cancellation, exceptional sound quality, and 30-hour battery life. Perfect for travel, work, or enjoying your favorite music without distractions.',
    price: 349.99,
    rating: 4.6,
    reviewCount: 1245,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    categories: ['Electronics', 'Audio', 'Headphones'],
    brand: 'SoundMaster',
    inStock: true,
    prime: true,
    discount: 15,
  },
  {
    id: '2',
    title: 'Ultra HD 4K Smart TV - 55"',
    description: 'Experience stunning clarity with this 55-inch 4K Ultra HD Smart TV. Features include HDR technology, built-in voice assistant, and streaming apps for endless entertainment options.',
    price: 699.99,
    rating: 4.4,
    reviewCount: 892,
    images: [
      'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    categories: ['Electronics', 'TVs', 'Smart Home'],
    brand: 'VisionTech',
    inStock: true,
    prime: true,
  },
  {
    id: '3',
    title: 'Professional Blender with Variable Speed Control',
    description: 'Commercial-grade blender with aircraft-grade stainless steel blades and variable speed control. Perfect for smoothies, hot soups, frozen desserts, and more.',
    price: 249.95,
    rating: 4.8,
    reviewCount: 3456,
    images: [
      'https://images.pexels.com/photos/175711/pexels-photo-175711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    categories: ['Home & Kitchen', 'Appliances', 'Blenders'],
    brand: 'KitchenPro',
    inStock: true,
    prime: true,
    discount: 10,
  },
  {
    id: '4',
    title: 'Ergonomic Office Chair with Lumbar Support',
    description: 'Adjustable ergonomic office chair with breathable mesh back, customizable lumbar support, and 360-degree swivel. Designed for all-day comfort during long work sessions.',
    price: 189.99,
    rating: 4.3,
    reviewCount: 657,
    images: [
      'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    categories: ['Furniture', 'Office Products', 'Chairs'],
    brand: 'ComfortWorks',
    inStock: true,
    prime: false,
  },
  {
    id: '5',
    title: 'Organic Cotton Bedding Set - Queen',
    description: 'Luxurious 100% organic cotton bedding set including duvet cover, fitted sheet, and two pillowcases. GOTS certified, hypoallergenic, and sustainably made.',
    price: 129.00,
    rating: 4.7,
    reviewCount: 432,
    images: [
      'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    categories: ['Home & Kitchen', 'Bedding', 'Organic'],
    brand: 'EcoHome',
    inStock: true,
    prime: true,
  },
  {
    id: '6',
    title: 'Professional DSLR Camera with 18-55mm Lens',
    description: 'High-performance DSLR camera with 24.1MP sensor, 4K video recording, vari-angle touchscreen, and wireless connectivity. Includes versatile 18-55mm lens.',
    price: 899.00,
    rating: 4.5,
    reviewCount: 723,
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    categories: ['Electronics', 'Cameras', 'Photography'],
    brand: 'PhotoMaster',
    inStock: false,
    prime: true,
    discount: 8,
  },
  {
    id: '7',
    title: 'Smart Fitness Watch with Heart Rate Monitor',
    description: 'Advanced fitness tracker with built-in GPS, 24/7 heart rate monitoring, sleep tracking, and 20+ sport modes. Features a bright AMOLED display and 7-day battery life.',
    price: 199.99,
    rating: 4.4,
    reviewCount: 1089,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    categories: ['Electronics', 'Wearables', 'Fitness'],
    brand: 'FitTech',
    inStock: true,
    prime: true,
  },
  {
    id: '8',
    title: 'Cast Iron Dutch Oven - 6 Quart',
    description: 'Versatile enameled cast iron Dutch oven perfect for slow cooking, roasting, baking, and more. Features superior heat retention and distribution with chip-resistant coating.',
    price: 79.95,
    rating: 4.9,
    reviewCount: 2145,
    images: [
      'https://images.pexels.com/photos/5907619/pexels-photo-5907619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    categories: ['Home & Kitchen', 'Cookware', 'Dutch Ovens'],
    brand: 'CuisinePro',
    inStock: true,
    prime: true,
  },
];

// Get featured products (those with discount)
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.discount !== undefined);
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};