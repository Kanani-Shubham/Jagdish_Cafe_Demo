
import React, { useState } from 'react';
import { Minus, Plus, Trash2, ChevronRight, Tag, ShoppingBag, ArrowLeft, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem, Coupon } from '../types';
import { MOCK_COUPONS } from '../constants';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

interface CartProps {
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onProceedToPay: (total: number, discount: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQty, onRemove, onProceedToPay }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Calculations
  const itemTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = Math.round(itemTotal * 0.05); // 5% GST
  const deliveryFee = itemTotal > 1000 ? 0 : 50;
  
  // Coupon Logic
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (itemTotal < appliedCoupon.minOrderValue) {
      setAppliedCoupon(null); // Auto remove if criteria not met
      return 0;
    }

    if (appliedCoupon.discountType === 'FLAT') {
      return appliedCoupon.value;
    } else {
      return Math.round((itemTotal * appliedCoupon.value) / 100);
    }
  };

  const discount = calculateDiscount();
  const finalTotal = itemTotal + gst + deliveryFee - discount;

  const handleApplyCoupon = () => {
    setCouponError('');
    const coupon = MOCK_COUPONS.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }

    if (itemTotal < coupon.minOrderValue) {
      setCouponError(`Minimum order value of ₹${coupon.minOrderValue} required`);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      onProceedToPay(finalTotal, discount);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-neutral-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-neutral-500 mb-8 max-w-md">Looks like you haven't added any gourmet delights yet. Our chefs are waiting!</p>
        <Link to="/menu" className="bg-amber-400 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/menu" className="inline-flex items-center gap-2 text-neutral-400 hover:text-amber-400 mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Menu
      </Link>
      
      <h1 className="text-4xl font-bold mb-12 flex items-center gap-4">
        Cart Items <span className="text-2xl text-neutral-500 font-normal">({items.length} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="glass p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-xl font-bold text-amber-400">₹{item.price * item.quantity}</span>
                </div>
                <p className="text-neutral-500 text-sm mb-4 line-clamp-1">{item.description}</p>
                {item.note && (
                  <div className="bg-white/5 p-2 rounded-lg text-xs text-neutral-400 mb-4 inline-block text-left">
                    <span className="text-amber-400 font-bold uppercase mr-1">Note:</span> {item.note}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-black/40 rounded-full px-2 py-1 border border-white/10">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"><Minus size={14} /></button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-neutral-500 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] sticky top-28">
            <h3 className="text-2xl font-bold mb-6 font-serif">Bill Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({items.length} items)</span>
                <span className="text-white font-bold">₹{itemTotal}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>GST & Restaurant Charges</span>
                <span className="text-white font-bold">₹{gst}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Delivery Fee</span>
                <span className={`font-bold ${deliveryFee === 0 ? 'text-green-500' : 'text-white'}`}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between items-center bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                  <span className="text-green-500 text-sm font-bold flex items-center gap-2">
                    <Tag size={14} /> {appliedCoupon.code} Applied
                  </span>
                  <button onClick={handleRemoveCoupon} className="text-neutral-500 hover:text-white"><Trash2 size={14} /></button>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-green-500 font-bold">
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Total Amount</span>
                <div className="text-right">
                  <span className="text-4xl font-bold text-amber-400 font-serif">₹{finalTotal}</span>
                  <p className="text-[10px] text-neutral-600 mt-1">Includes all taxes</p>
                </div>
              </div>
            </div>

            {/* Coupon Input */}
            <div className="mb-8">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Apply Coupon</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:ring-1 focus:ring-amber-400 outline-none uppercase placeholder:capitalize"
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-amber-400 text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-300 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-amber-400 text-black py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20 active:scale-95 group"
            >
              {user ? (
                <>Proceed to Payment <ChevronRight className="group-hover:translate-x-1 transition-transform" /></>
              ) : (
                <>Login to Checkout <Lock size={18} /></>
              )}
            </button>
            
            <p className="text-[10px] text-neutral-600 text-center mt-4 flex items-center justify-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full"></span> Secure 256-bit SSL encrypted checkout.
            </p>
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab="login" />
    </div>
  );
};

export default Cart;
