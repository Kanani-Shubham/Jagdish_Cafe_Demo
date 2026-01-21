
import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PaymentProps {
  totalAmount: number;
  onPaymentComplete: (method: string, userId: string, userName: string) => void;
}

const Payment: React.FC<PaymentProps> = ({ totalAmount, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePay = () => {
    if (!user) return; // Should not happen due to guard in Cart
    setIsProcessing(true);
    // Simulate Stripe/Gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(selectedMethod, user.uid, user.name);
    }, 2000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,193,7,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12">
        {/* Left: Summary */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4 font-serif">Secure Payment</h1>
          <p className="text-neutral-400 mb-12 max-w-md">Complete your transaction to begin your culinary experience. Your connection is encrypted.</p>
          
          <div className="glass p-8 rounded-[2rem] border-l-4 border-amber-400 max-w-md">
             <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Total Amount Payable</span>
             <div className="text-5xl font-bold text-white mt-2 mb-1">₹{totalAmount}</div>
             <div className="text-green-500 text-sm font-bold flex items-center gap-2">
                <CheckCircle2 size={14} /> Price inclusive of all taxes
             </div>
          </div>
          
          {user && (
            <div className="mt-8">
              <p className="text-neutral-500 text-sm uppercase font-bold tracking-widest mb-2">Billing Details</p>
              <div className="glass p-6 rounded-2xl inline-block min-w-[300px]">
                <p className="font-bold text-white">{user.name}</p>
                <p className="text-neutral-400 text-sm">{user.mobilePrimary}</p>
                <p className="text-neutral-400 text-sm truncate max-w-xs">{user.address}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Payment Methods */}
        <div className="glass p-8 rounded-[3rem] border border-white/5 relative z-10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lock size={18} className="text-amber-400" /> Choose Payment Mode
          </h3>
          
          <div className="space-y-4 mb-8">
            <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all border ${selectedMethod === 'UPI' ? 'bg-amber-400/10 border-amber-400 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
               <input type="radio" name="payment" className="hidden" checked={selectedMethod === 'UPI'} onChange={() => setSelectedMethod('UPI')} />
               <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-amber-400">
                  <Smartphone size={20} />
               </div>
               <div className="flex-1">
                  <div className="font-bold">UPI Payment</div>
                  <div className="text-xs opacity-70">Google Pay, PhonePe, Paytm</div>
               </div>
               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'UPI' ? 'border-amber-400' : 'border-neutral-600'}`}>
                  {selectedMethod === 'UPI' && <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>}
               </div>
            </label>

            <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all border ${selectedMethod === 'CARD' ? 'bg-amber-400/10 border-amber-400 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
               <input type="radio" name="payment" className="hidden" checked={selectedMethod === 'CARD'} onChange={() => setSelectedMethod('CARD')} />
               <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-blue-400">
                  <CreditCard size={20} />
               </div>
               <div className="flex-1">
                  <div className="font-bold">Credit/Debit Card</div>
                  <div className="text-xs opacity-70">Visa, Mastercard, Amex</div>
               </div>
               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'CARD' ? 'border-amber-400' : 'border-neutral-600'}`}>
                  {selectedMethod === 'CARD' && <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>}
               </div>
            </label>

            <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all border ${selectedMethod === 'NETBANKING' ? 'bg-amber-400/10 border-amber-400 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
               <input type="radio" name="payment" className="hidden" checked={selectedMethod === 'NETBANKING'} onChange={() => setSelectedMethod('NETBANKING')} />
               <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-green-400">
                  <Building size={20} />
               </div>
               <div className="flex-1">
                  <div className="font-bold">Net Banking</div>
                  <div className="text-xs opacity-70">All Indian Banks Supported</div>
               </div>
               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'NETBANKING' ? 'border-amber-400' : 'border-neutral-600'}`}>
                  {selectedMethod === 'NETBANKING' && <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>}
               </div>
            </label>
          </div>

          <button 
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-5 bg-amber-400 text-black font-bold text-lg rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                 Processing Stripe Payment...
               </div>
            ) : (
               <>Pay Securely <Lock size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
