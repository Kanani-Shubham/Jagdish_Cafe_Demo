
import { MenuItem, Order, Coupon } from './types';

export const COLORS = {
  accent: '#FFC107',
  secondaryAccent: '#FF9F1C',
  background: '#0a0a0a',
  glass: 'rgba(255, 255, 255, 0.03)'
};

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Pizza',
    description: 'Shiitake & button mushrooms, truffle oil, roasted garlic, and fresh mozzarella.',
    price: 499,
    category: 'Gourmet Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
    isVeg: true,
    isPopular: true,
    tag: 'Popular',
    spiceLevel: 1,
    calories: 720,
    prepTime: '20-25 mins',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Paneer Tikka Burger',
    description: 'Succulent marinated paneer cubes, mint mayo, and onion rings on a brioche bun.',
    price: 259,
    category: 'Signature Burgers',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop',
    isVeg: true,
    isPopular: false,
    spiceLevel: 2,
    calories: 540,
    prepTime: '15-20 mins',
    isAvailable: true
  },
  {
    id: '3',
    name: 'Peri Peri Fries',
    description: 'Double-fried crispy potatoes tossed in our signature spicy peri-peri blend.',
    price: 189,
    category: 'Quick Snacks',
    image: 'https://images.unsplash.com/photo-1630384066252-192138582311?q=80&w=1000&auto=format&fit=crop',
    isVeg: true,
    isPopular: false,
    tag: 'Trending',
    spiceLevel: 3,
    calories: 380,
    prepTime: '10-15 mins',
    isAvailable: true
  },
  {
    id: '4',
    name: 'Classic Garlic Bread',
    description: 'Oven-baked baguette brushed with house-made garlic butter and herbs.',
    price: 149,
    category: 'Quick Snacks',
    image: 'https://images.unsplash.com/photo-1573140401552-390e248b71e8?q=80&w=1000&auto=format&fit=crop',
    isVeg: true,
    isPopular: true,
    tag: 'Best Seller',
    spiceLevel: 0,
    calories: 220,
    prepTime: '10-15 mins',
    isAvailable: true
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7721',
    userId: 'mock-user-1',
    customerName: 'Rahul Sharma',
    totalPrice: 688,
    status: 'Pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    items: [
      { ...DEFAULT_MENU_ITEMS[0], quantity: 1 },
      { ...DEFAULT_MENU_ITEMS[2], quantity: 1 }
    ]
  },
  {
    id: 'ORD-7722',
    userId: 'mock-user-2',
    customerName: 'Anjali Gupta',
    totalPrice: 259,
    status: 'Preparing',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    items: [
      { ...DEFAULT_MENU_ITEMS[1], quantity: 1 }
    ]
  },
  {
    id: 'ORD-7723',
    userId: 'mock-user-3',
    customerName: 'Vikram Singh',
    totalPrice: 149,
    status: 'Completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    items: [
      { ...DEFAULT_MENU_ITEMS[3], quantity: 1 }
    ]
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'JAGDISH20',
    discountType: 'PERCENTAGE',
    value: 20,
    minOrderValue: 500,
    description: '20% OFF on orders above ₹500'
  },
  {
    code: 'WELCOME50',
    discountType: 'FLAT',
    value: 150,
    minOrderValue: 300,
    description: 'Flat ₹150 OFF on your first order'
  },
  {
    code: 'GOLD20',
    discountType: 'PERCENTAGE',
    value: 20,
    minOrderValue: 1000,
    description: 'Gold Member Exclusive: 20% OFF'
  }
];

export const CATEGORIES = [
  'Must Try',
  'Gourmet Pizzas',
  'Signature Burgers',
  'Quick Snacks',
  'Beverages',
  'Desserts'
];

export const MENU_ITEMS = DEFAULT_MENU_ITEMS;
