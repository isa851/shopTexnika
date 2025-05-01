import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      { id: 'computers', name: 'Computers & Accessories' },
      { id: 'phones', name: 'Cell Phones & Accessories' },
      { id: 'tv-video', name: 'TV & Video' },
      { id: 'audio', name: 'Audio & Home Theater' },
      { id: 'cameras', name: 'Camera & Photo' },
      { id: 'wearables', name: 'Wearable Technology' },
    ]
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    subcategories: [
      { id: 'furniture', name: 'Furniture' },
      { id: 'kitchen', name: 'Kitchen & Dining' },
      { id: 'bedding', name: 'Bedding' },
      { id: 'appliances', name: 'Appliances' },
      { id: 'decor', name: 'Home Décor' },
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing, Shoes & Jewelry',
    subcategories: [
      { id: 'womens', name: 'Women' },
      { id: 'mens', name: 'Men' },
      { id: 'kids', name: 'Kids' },
      { id: 'watches', name: 'Watches' },
      { id: 'luggage', name: 'Luggage' },
    ]
  },
  {
    id: 'books',
    name: 'Books',
    subcategories: [
      { id: 'fiction', name: 'Fiction' },
      { id: 'nonfiction', name: 'Nonfiction' },
      { id: 'kindle', name: 'Kindle eBooks' },
      { id: 'children', name: 'Children\'s Books' },
      { id: 'textbooks', name: 'Textbooks' },
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    subcategories: [
      { id: 'outdoor', name: 'Outdoor Recreation' },
      { id: 'fitness', name: 'Exercise & Fitness' },
      { id: 'hunting', name: 'Hunting & Fishing' },
      { id: 'team-sports', name: 'Team Sports' },
      { id: 'water-sports', name: 'Water Sports' },
    ]
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    subcategories: [
      { id: 'kids-toys', name: 'Kids' },
      { id: 'games', name: 'Games & Puzzles' },
      { id: 'dolls', name: 'Dolls & Accessories' },
      { id: 'learning', name: 'Learning & Education' },
      { id: 'hobbies', name: 'Hobbies' },
    ]
  },
];