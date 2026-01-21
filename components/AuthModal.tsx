
import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultTab);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobilePrimary: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password });
      } else {
        await signup(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="glass w-full max-w-md p-8 rounded-[2rem] relative z-10 animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-neutral-500 hover:text-white">
          <X size={24} />
        </button>

        <div className="mb-8 text-center">
           <h2 className="text-2xl font-bold mb-2">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
           <p className="text-neutral-500 text-sm">
             {mode === 'login' ? 'Login to continue to your order' : 'Join us for a premium dining experience'}
           </p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl mb-6">
           <button 
             className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'login' ? 'bg-amber-400 text-black shadow-lg' : 'text-neutral-400 hover:text-white'}`}
             onClick={() => setMode('login')}
           >
             Login
           </button>
           <button 
             className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'signup' ? 'bg-amber-400 text-black shadow-lg' : 'text-neutral-400 hover:text-white'}`}
             onClick={() => setMode('signup')}
           >
             Sign Up
           </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
           {mode === 'signup' && (
             <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
             </div>
           )}

           <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
           </div>

           <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
           </div>

           {mode === 'signup' && (
             <>
               <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                    value={formData.mobilePrimary}
                    onChange={e => setFormData({...formData, mobilePrimary: e.target.value})}
                  />
               </div>
               <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Delivery Address" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
               </div>
             </>
           )}

           {error && <p className="text-red-500 text-xs text-center">{error}</p>}

           <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-amber-400 text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-300 transition-all mt-2 disabled:opacity-50"
           >
             {loading ? 'Processing...' : (
               <>
                 {mode === 'login' ? 'Login' : 'Create Account'} <ArrowRight size={18} />
               </>
             )}
           </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
