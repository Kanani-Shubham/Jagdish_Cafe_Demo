
import React, { useState } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Hardcoded credentials as per request
    setTimeout(() => {
      if (username === 'Jagdish Cafe' && password === 'MadeByShubham') {
        onLogin();
        sessionStorage.setItem('jagdish_admin_auth', 'true');
      } else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="glass max-w-md w-full p-10 lg:p-14 rounded-[3rem] shadow-2xl relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6 shadow-xl shadow-amber-400/20">J</div>
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-neutral-500 text-sm">Protected access for Jagdish Cafe Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block px-2">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition-all text-white"
                  placeholder="Enter username"
                  required
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block px-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition-all text-white"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-amber-400 text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/10 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>Sign In <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-neutral-600 italic">
          &ldquo;Quality is never an accident.&rdquo;
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
