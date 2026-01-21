
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import AboutContact from './pages/AboutContact';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderTracking from './pages/OrderTracking';
import CustomCursor from './components/CustomCursor';
import { CartItem, MenuItem, Order, OrderStatus } from './types';
import { ShieldCheck } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { mockDb } from './services/mockFirebase';

function AppContent() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('jagdish_admin_auth') === 'true';
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentOrderTotal, setCurrentOrderTotal] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // Load initial data from mock DB
  useEffect(() => {
    const loadData = async () => {
      const menu = await mockDb.getMenu();
      const ords = await mockDb.getOrders();
      setMenuItems(menu);
      setOrders(ords);
    };
    loadData();
  }, []);

  const addToCart = (item: MenuItem, quantity: number, note: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity, note: note || i.note } : i);
      }
      return [...prev, { ...item, quantity, note }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const handleProceedToPay = (total: number, discount: number) => {
    setCurrentOrderTotal(total);
    navigate('/payment');
  };

  // This is now triggered from Payment page after success
  const handlePaymentComplete = async (method: string, userId: string, userName: string) => {
    const newOrder = await mockDb.createOrder({
      userId: userId,
      customerName: userName,
      items: [...cartItems],
      totalPrice: currentOrderTotal,
      paymentMethod: method
    });
    
    // Refresh local orders state for Admin view
    const updatedOrders = await mockDb.getOrders();
    setOrders(updatedOrders);
    
    setCartItems([]);
    navigate(`/tracking/${newOrder.id}`);
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    await mockDb.updateOrder(id, { status });
    const updatedOrders = await mockDb.getOrders();
    setOrders(updatedOrders);
  };

  const updateMenuItem = async (item: MenuItem) => {
    const updatedMenu = [...menuItems];
    const index = updatedMenu.findIndex(i => i.id === item.id);
    if (index >= 0) {
      updatedMenu[index] = item;
    } else {
      updatedMenu.push(item);
    }
    await mockDb.updateMenu(updatedMenu);
    setMenuItems(updatedMenu);
  };

  const deleteMenuItem = async (id: string) => {
    const updatedMenu = menuItems.filter(i => i.id !== id);
    await mockDb.updateMenu(updatedMenu);
    setMenuItems(updatedMenu);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {!isAdminRoute && <CustomCursor />}
      {!isAdminRoute && (
        <Navbar 
          cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} 
        />
      )}
      
      <main className={isAdminRoute ? "h-screen overflow-hidden" : "pt-20"}>
        <Routes>
          <Route path="/" element={<Home addToCart={(item) => addToCart(item, 1, '')} />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} items={menuItems} />} />
          <Route path="/cart" element={
            <Cart 
              items={cartItems} 
              onUpdateQty={updateQuantity} 
              onRemove={removeFromCart} 
              onProceedToPay={handleProceedToPay}
            />
          } />
          <Route path="/payment" element={
            <Payment 
              totalAmount={currentOrderTotal} 
              onPaymentComplete={handlePaymentComplete}
            />
          } />
          <Route path="/tracking/:orderId" element={<OrderTracking orders={orders} />} />
          
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/about" element={<AboutContact />} />
          
          <Route path="/admin/login" element={
            isAdminAuthenticated ? <Navigate to="/admin" /> : <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
          } />
          
          <Route path="/admin/*" element={
            isAdminAuthenticated ? (
              <Admin 
                orders={orders} 
                menuItems={menuItems}
                onUpdateStatus={updateOrderStatus}
                onUpdateMenuItem={updateMenuItem}
                onDeleteMenuItem={deleteMenuItem}
                onLogout={() => {
                  setIsAdminAuthenticated(false);
                  sessionStorage.removeItem('jagdish_admin_auth');
                }}
              />
            ) : <Navigate to="/admin/login" />
          } />
        </Routes>
      </main>

      {!isAdminRoute && (
        <footer className="bg-neutral-900 py-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                   <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold">J</div>
                   <span className="text-xl font-bold tracking-widest uppercase">Jagdish Cafe</span>
                </div>
                <p className="text-neutral-500 max-w-sm">Crafting culinary memories since 1994. Quality, heritage, and flavor in every bite.</p>
              </div>
              <div className="flex gap-8">
                <a href="#" className="text-neutral-400 hover:text-amber-400 transition-colors">Instagram</a>
                <a href="#" className="text-neutral-400 hover:text-amber-400 transition-colors">Facebook</a>
                <a href="#" className="text-neutral-400 hover:text-amber-400 transition-colors">Twitter</a>
              </div>
              <div className="flex flex-col items-end gap-3">
                <p className="text-neutral-600 text-sm">© 2024 Jagdish Cafe & Restaurant. All Rights Reserved.</p>
                <Link 
                  to="/admin/login" 
                  className="bg-neutral-800/30 border border-white/5 px-4 py-1.5 rounded-full text-neutral-500 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-neutral-800 hover:text-amber-400 hover:border-amber-400/30 transition-all flex items-center gap-2 group"
                >
                  <ShieldCheck size={12} className="group-hover:scale-110 transition-transform" />
                  Admin Login
                </Link>
              </div>
            </div>
          </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
