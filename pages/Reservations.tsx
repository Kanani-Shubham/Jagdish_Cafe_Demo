
import React, { useState } from 'react';
import { Calendar, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const Reservations: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const dates = [
    { day: 'Wed', date: '24', month: 'Oct' },
    { day: 'Thu', date: '25', month: 'Oct', active: true },
    { day: 'Fri', date: '26', month: 'Oct' },
    { day: 'Sat', date: '27', month: 'Oct' },
    { day: 'Sun', date: '28', month: 'Oct' },
  ];

  const times = ['18:00', '19:30', '20:00', '21:30', '22:00'];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 2000);
  };

  if (isConfirmed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="glass max-w-lg w-full p-12 rounded-[3rem] text-center accent-glow">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Reservation Confirmed</h2>
          <p className="text-neutral-400 mb-8">We've sent a confirmation to your email. See you soon at Jagdish Cafe!</p>
          <div className="space-y-4 text-sm bg-white/5 p-6 rounded-2xl mb-8">
            <div className="flex justify-between">
               <span className="text-neutral-500">Date</span>
               <span className="font-bold">Friday, Oct 25, 2024</span>
            </div>
            <div className="flex justify-between">
               <span className="text-neutral-500">Time</span>
               <span className="font-bold">20:00 PM</span>
            </div>
            <div className="flex justify-between">
               <span className="text-neutral-500">Guests</span>
               <span className="font-bold">4 People</span>
            </div>
          </div>
          <button onClick={() => window.location.href = '#/'} className="text-amber-400 font-bold hover:underline">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[90vh]">
      {/* Left: Visual */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" 
          alt="Luxury Restaurant" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-end p-24">
          <div className="max-w-md">
            <h1 className="text-6xl font-bold mb-6">Exquisite Dining <br /><span className="text-amber-400 italic font-serif">Awaits</span></h1>
            <p className="text-neutral-300 text-lg">Experience the perfect blend of luxury and taste in the heart of the city.</p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 blur-[120px] rounded-full"></div>
        
        <div className="glass w-full max-w-xl p-10 lg:p-14 rounded-[3rem] shadow-2xl relative z-10">
          <header className="mb-10">
            <h2 className="text-4xl font-bold mb-3">Secure Your Table</h2>
            <p className="text-neutral-400">Join us for an unforgettable culinary journey.</p>
          </header>

          <form className="space-y-8" onSubmit={handleConfirm}>
            {/* Date Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 block">Select Date</label>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {dates.map((d, i) => (
                  <button 
                    key={i} 
                    type="button" 
                    className={`flex-shrink-0 w-20 py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${d.active ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30' : 'bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                  >
                    <span className="text-[10px] uppercase font-bold opacity-60">{d.month}</span>
                    <span className="text-xl font-bold">{d.date}</span>
                    <span className="text-[10px] uppercase font-bold">{d.day}</span>
                  </button>
                ))}
                <button type="button" className="flex-shrink-0 w-20 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10">
                  <Calendar size={20} />
                </button>
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 block">Preferred Time</label>
              <div className="flex flex-wrap gap-2">
                {times.map((t, i) => (
                  <button 
                    key={i} 
                    type="button"
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${t === '20:00' ? 'bg-amber-400 text-black' : 'border border-white/10 hover:bg-white/5 text-neutral-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest & Occasion */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 block">Party Size</label>
                <div className="relative">
                  <select className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm appearance-none outline-none focus:ring-2 focus:ring-amber-400 transition-all">
                    <option>2 Guests</option>
                    <option selected>4 Guests</option>
                    <option>6 Guests</option>
                    <option>8+ Guests</option>
                  </select>
                  <Users className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 block">Occasion</label>
                <div className="relative">
                   <select className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm appearance-none outline-none focus:ring-2 focus:ring-amber-400 transition-all">
                    <option>Standard Dining</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Business Meeting</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-5 bg-amber-400 text-black font-bold text-xl rounded-full flex items-center justify-center gap-2 hover:bg-amber-300 transition-all shadow-2xl shadow-amber-400/20 active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Confirm Reservation <ArrowRight />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
