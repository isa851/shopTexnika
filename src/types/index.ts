// Define types for the e-commerce application

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  categories: string[];
  brand: string;
  inStock: boolean;
  prime: boolean;
  discount?: number;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}