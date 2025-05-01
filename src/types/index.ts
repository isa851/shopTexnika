export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}