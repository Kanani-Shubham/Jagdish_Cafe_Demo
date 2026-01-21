
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  isVeg: boolean;
  isPopular?: boolean;
  spiceLevel?: number; // 0: None, 1: Mild, 2: Medium, 3: Hot, 4: Inferno
  calories?: number;
  prepTime?: string;
  isAvailable: boolean; // Added for availability toggle
}

export interface CartItem extends MenuItem {
  quantity: number;
  note?: string;
}

export interface Coupon {
  code: string;
  discountType: 'FLAT' | 'PERCENTAGE';
  value: number;
  minOrderValue: number;
  description: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Completed' | 'Cancelled';

export interface User {
  uid: string;
  name: string;
  email: string;
  mobilePrimary: string;
  mobileSecondary?: string;
  address: string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  userId: string; // Linked to User
  customerName: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod?: string;
  deliveryLocation?: { lat: number; lng: number }; // For tracking
}

export enum Page {
  Home = 'home',
  Menu = 'menu',
  About = 'about',
  Contact = 'contact',
  Reservations = 'reservations',
  Gallery = 'gallery',
  Admin = 'admin',
  Cart = 'cart',
  Payment = 'payment',
  Tracking = 'tracking'
}
