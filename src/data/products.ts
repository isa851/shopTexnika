import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'UltraPhone Pro',
    category: 'smartphones',
    price: 999.99,
    discountedPrice: 899.99,
    description: 'The ultimate smartphone with cutting-edge features and powerful performance.',
    features: [
      'Edge-to-edge 6.7" OLED display',
      'Triple camera system with advanced night mode',
      'All-day battery life',
      'Water and dust resistant',
      'Latest chipset for lightning-fast performance'
    ],
    specifications: {
      'Display': '6.7" OLED (2532 x 1170)',
      'Processor': 'A16 Bionic',
      'RAM': '6GB',
      'Storage': '256GB',
      'Battery': '3,700 mAh',
      'Camera': 'Triple 12MP Ultra Wide, Wide, and Telephoto',
      'Operating System': 'iOS 16'
    },
    images: [
      'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
      'https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'
    ],
    stock: 50,
    rating: 4.8,
    reviews: 325,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'PowerBook Air',
    category: 'laptops',
    price: 1299.99,
    description: 'Ultra-thin, ultra-light laptop with exceptional performance and battery life.',
    features: [
      'Stunning 13.6" Liquid Retina display',
      'All-day battery life',
      'Backlit keyboard with comfortable typing experience',
      'Ultra-fast SSD storage',
      'Latest generation processor'
    ],
    specifications: {
      'Display': '13.6" Liquid Retina (2560 x 1664)',
      'Processor': 'M2 chip with 8-core CPU',
      'RAM': '8GB unified memory',
      'Storage': '512GB SSD',
      'Battery': 'Up to 18 hours',
      'Ports': '2 Thunderbolt / USB 4 ports',
      'Operating System': 'macOS Ventura'
    },
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
      'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg'
    ],
    stock: 35,
    rating: 4.9,
    reviews: 187,
    isFeatured: true
  },
  {
    id: '3',
    name: 'SoundPods Pro',
    category: 'audio',
    price: 249.99,
    discountedPrice: 199.99,
    description: 'Wireless earbuds with active noise cancellation and premium sound quality.',
    features: [
      'Active Noise Cancellation',
      'Transparency mode',
      'Wireless charging case',
      'Water and sweat resistant',
      'Up to 6 hours of listening time'
    ],
    specifications: {
      'Type': 'In-ear true wireless',
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': 'Up to 6 hours (24 hours with case)',
      'Charging': 'Wireless Qi-compatible or USB-C',
      'Microphones': 'Dual beamforming',
      'Water Resistance': 'IPX4'
    },
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
      'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg',
      'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg'
    ],
    stock: 120,
    rating: 4.7,
    reviews: 438,
    isNew: true
  },
  {
    id: '4',
    name: 'SmartWatch Series 7',
    category: 'wearables',
    price: 399.99,
    description: 'Advanced smartwatch with health monitoring features and stunning display.',
    features: [
      'Always-On Retina display',
      'ECG app and blood oxygen sensor',
      'Water resistant to 50 meters',
      'Customizable watch faces',
      'Fall detection and emergency SOS'
    ],
    specifications: {
      'Display': '1.9" Always-On Retina LTPO OLED (396 x 484)',
      'Processor': 'S7 SiP 64-bit dual-core',
      'Storage': '32GB',
      'Water Resistance': '50 meters',
      'Battery': 'Up to 18 hours',
      'Connectivity': 'Wi-Fi, Bluetooth 5.0, LTE (optional)'
    },
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg',
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg'
    ],
    stock: 68,
    rating: 4.6,
    reviews: 215,
    isFeatured: true
  },
  {
    id: '5',
    name: 'UltraView 4K TV',
    category: 'tvs',
    price: 1499.99,
    discountedPrice: 1299.99,
    description: 'Immersive 4K TV with brilliant colors and smart features.',
    features: [
      'Stunning 4K resolution',
      'HDR technology for brilliant colors',
      'Smart TV capabilities with built-in streaming apps',
      'Voice control with multiple assistant support',
      'Game mode with low latency'
    ],
    specifications: {
      'Display': '55" LED 4K Ultra HD (3840 x 2160)',
      'HDR': 'Dolby Vision, HDR10, HLG',
      'Refresh Rate': '120Hz',
      'Audio': '20W 2.0 channel with Dolby Atmos',
      'Connectivity': 'Wi-Fi 6, Bluetooth 5.0, HDMI 2.1 x4',
      'Smart Platform': 'WebOS 6.0'
    },
    images: [
      'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg',
      'https://images.pexels.com/photos/6976103/pexels-photo-6976103.jpeg',
      'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg'
    ],
    stock: 25,
    rating: 4.5,
    reviews: 142
  },
  {
    id: '6',
    name: 'PowerTablet Pro',
    category: 'tablets',
    price: 899.99,
    description: 'Powerful tablet for productivity and entertainment with stunning display.',
    features: [
      'Liquid Retina XDR display',
      'Powerful chip for laptop-level performance',
      'All-day battery life',
      'Compatible with stylus',
      'Advanced camera system'
    ],
    specifications: {
      'Display': '12.9" Liquid Retina XDR mini-LED (2732 x 2048)',
      'Processor': 'M2 chip with 8-core CPU',
      'RAM': '8GB',
      'Storage': '256GB',
      'Battery': 'Up to 10 hours',
      'Camera': '12MP Wide, 10MP Ultra Wide (rear), 12MP Ultra Wide (front)'
    },
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
      'https://images.pexels.com/photos/1716158/pexels-photo-1716158.jpeg',
      'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg'
    ],
    stock: 42,
    rating: 4.7,
    reviews: 168,
    isNew: true
  }
];