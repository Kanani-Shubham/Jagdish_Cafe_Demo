
import { MenuItem, Order, User } from '../types';
import { DEFAULT_MENU_ITEMS, MOCK_ORDERS } from '../constants';

// Simulated Database Keys
const STORAGE_KEYS = {
  USERS: 'jagdish_users',
  ORDERS: 'jagdish_orders',
  MENU: 'jagdish_menu',
  SESSION: 'jagdish_session'
};

// --- AUTHENTICATION SERVICE ---

export const mockAuth = {
  async signIn(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          const { password, ...safeUser } = user; // Remove password from session
          localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
          resolve(safeUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  },

  async signUp(userData: any): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        
        if (users.find((u: any) => u.email === userData.email)) {
          reject(new Error('Email already exists'));
          return;
        }

        const newUser = {
          uid: `usr_${Date.now()}`,
          ...userData,
          createdAt: new Date().toISOString(),
          isAdmin: false
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        
        const { password, ...safeUser } = newUser;
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
        resolve(safeUser);
      }, 1000);
    });
  },

  async signOut(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  getCurrentUser(): User | null {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  }
};

// --- DATABASE SERVICE ---

export const mockDb = {
  // Menu Operations
  async getMenu(): Promise<MenuItem[]> {
    const stored = localStorage.getItem(STORAGE_KEYS.MENU);
    if (!stored) {
      // Initialize with default if empty
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
      return DEFAULT_MENU_ITEMS;
    }
    return JSON.parse(stored);
  },

  async updateMenu(items: MenuItem[]): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
  },

  // Order Operations
  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      ...order,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const orders = await this.getOrders();
    const updatedOrders = [newOrder, ...orders];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
    return newOrder;
  },

  async getOrders(): Promise<Order[]> {
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return stored ? JSON.parse(stored) : MOCK_ORDERS;
  },

  async updateOrder(orderId: string, updates: Partial<Order>): Promise<void> {
    const orders = await this.getOrders();
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, ...updates } : o);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const orders = await this.getOrders();
    return orders.filter(o => o.userId === userId);
  }
};
