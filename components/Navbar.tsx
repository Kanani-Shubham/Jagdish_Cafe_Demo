
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="glass mx-auto mt-4 px-6 py-4 rounded-full max-w-6xl flex justify-between items-center shadow-2xl shadow-black/50">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold group-hover:scale-110 transition-transform">J</div>
            <span className="hidden md:block text-xl font-bold tracking-widest uppercase text-white group-hover:text-amber-400 transition-colors">Jagdish Cafe</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-amber-400 ${location.pathname === link.path ? 'text-amber-400' : 'text-neutral-300'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/cart"
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
            >
              <ShoppingCart className={`w-6 h-6 transition-colors ${location.pathname === '/cart' ? 'text-amber-400' : 'text-neutral-300 group-hover:text-amber-400'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Button */}
            {user ? (
               <div className="hidden md:flex items-center gap-3 bg-white/5 pl-4 pr-2 py-1.5 rounded-full border border-white/10">
                 <span className="text-xs font-bold text-white max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                 <button onClick={logout} className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                   <LogOut size={14} />
                 </button>
               </div>
            ) : (
               <button 
                 onClick={() => setIsAuthModalOpen(true)}
                 className="hidden md:flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white transition-colors"
               >
                 <UserIcon size={18} /> Login
               </button>
            )}
            
            <Link to="/menu" className="hidden md:block bg-amber-400 text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(255,193,7,0.4)] transition-all active:scale-95 text-center">
              Order Now
            </Link>

            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass fixed top-24 left-6 right-6 p-6 rounded-3xl animate-in slide-in-from-top duration-300 shadow-2xl z-50">
            <div className="flex flex-col space-y-4">
              {user ? (
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="font-bold text-amber-400">Hi, {user.name}</span>
                  <button onClick={logout} className="text-xs text-red-400 font-bold uppercase">Logout</button>
                </div>
              ) : (
                <button onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }} className="text-left font-bold text-white border-b border-white/10 pb-4">
                  Login / Sign Up
                </button>
              )}

              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-neutral-300 hover:text-amber-400 flex items-center gap-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-neutral-300 hover:text-amber-400 flex items-center gap-2">
                My Cart ({cartCount})
              </Link>
              <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="bg-amber-400 text-black text-center py-3 rounded-full font-bold">
                Order Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
