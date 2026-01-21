
import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, Truck, Home, Phone, MapPin } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Order, OrderStatus } from '../types';

interface OrderTrackingProps {
  orders: Order[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orders }) => {
  const { orderId } = useParams();
  const order = orders.find(o => o.id === orderId) || orders[0]; // Fallback to first order for demo

  const [activeStep, setActiveStep] = useState(0);

  const steps: { status: OrderStatus; label: string; icon: any }[] = [
    { status: 'Pending', label: 'Order Placed', icon: Clock },
    { status: 'Preparing', label: 'Chef Cooking', icon: CheckCircle }, // Using generic icons for simplicity
    { status: 'Out for Delivery', label: 'Out for Delivery', icon: Truck },
    { status: 'Completed', label: 'Arrived', icon: Home }
  ];

  useEffect(() => {
    // Map status to step index
    const statusMap: Record<string, number> = {
      'Pending': 0,
      'Preparing': 1,
      'Ready': 1, // Ready is part of Chef Cooking phase conceptually for this simplified timeline
      'Out for Delivery': 2,
      'Completed': 3,
      'Cancelled': -1
    };
    
    if (order) {
       setActiveStep(statusMap[order.status] ?? 0);
    }
  }, [order]);

  if (!order) return <div className="text-center py-20">Order not found</div>;

  return (
    <div className="pb-12">
      {/* Top Timeline */}
      <div className="bg-neutral-900/50 py-8 border-b border-white/5 overflow-x-auto">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 -z-10"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-amber-400 -translate-y-1/2 -z-10 transition-all duration-1000"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;
              return (
                <div key={index} className="flex flex-col items-center gap-2 bg-[#0a0a0a] px-2 z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive ? 'bg-amber-400 border-amber-400 text-black' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}>
                    <step.icon size={20} />
                  </div>
                  <div className="text-center">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-neutral-600'}`}>{step.label}</p>
                    {isCurrent && <p className="text-[10px] text-amber-400 animate-pulse">In Progress</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Visual Area */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8">
        
        {/* Left: Status Visuals */}
        <div className="space-y-8">
          {activeStep === 1 && (
             <div className="bg-neutral-900 rounded-[2rem] overflow-hidden relative aspect-video shadow-2xl animate-in fade-in duration-700">
               <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 flex flex-col justify-center p-10 bg-gradient-to-r from-black/80 to-transparent">
                  <span className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span> Live Kitchen Cam 04</span>
                  <h2 className="text-3xl font-bold mb-4">Chef Sanjeev is preparing your <span className="text-amber-400 italic font-serif">Order</span></h2>
                  <p className="text-neutral-400 text-sm max-w-sm">Each ingredient is hand-selected and seared to perfection in our private atelier kitchen.</p>
               </div>
             </div>
          )}

          {activeStep >= 2 && (
             <div className="bg-neutral-900 rounded-[2rem] overflow-hidden relative aspect-video shadow-2xl animate-in fade-in duration-700">
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                   {/* Mock Map */}
                   <div className="w-full h-full opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-1 bg-white/10 rounded-full relative overflow-hidden">
                         <div className="absolute top-0 left-0 h-full w-1/2 bg-amber-400 animate-[shimmer_2s_infinite]"></div>
                      </div>
                      <div className="absolute bg-amber-400 p-3 rounded-full text-black shadow-lg shadow-amber-400/50 animate-bounce">
                         <Truck size={24} />
                      </div>
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                         <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-amber-400 uppercase">Your Courier</p>
                         <p className="font-bold">Rahul Sharma</p>
                         <p className="text-[10px] text-neutral-400">Golden Tier Delivery Partner</p>
                      </div>
                   </div>
                   <button className="bg-amber-400 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 text-sm hover:bg-amber-300 transition-all">
                      <Phone size={16} /> Call Rider
                   </button>
                </div>
             </div>
          )}

          {activeStep === 0 && (
             <div className="bg-neutral-900 rounded-[2rem] p-12 text-center border border-white/5 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-400 animate-pulse">
                   <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-neutral-500">The kitchen has received your request. Preparation will begin shortly.</p>
             </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-6">
           <div className="glass p-8 rounded-[2.5rem]">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold">Order Details</h3>
                 <span className="text-xs text-neutral-500 font-mono">#{order.id}</span>
              </div>
              <div className="space-y-4 mb-6">
                 {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start">
                       <div className="flex gap-3">
                          <span className="text-amber-400 font-bold text-sm">x{item.quantity}</span>
                          <div>
                             <p className="text-sm font-bold">{item.name}</p>
                             {item.note && <p className="text-[10px] text-neutral-500 italic">"{item.note}"</p>}
                          </div>
                       </div>
                       <span className="text-sm font-bold text-neutral-400">₹{item.price * item.quantity}</span>
                    </div>
                 ))}
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                 <span className="text-sm text-neutral-500 uppercase font-bold tracking-widest">Total Paid</span>
                 <span className="text-2xl font-bold text-amber-400 font-serif">₹{order.totalPrice}</span>
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
              <div className="flex items-start gap-3 text-neutral-400">
                 <MapPin className="shrink-0 text-amber-400" size={20} />
                 <p className="text-sm leading-relaxed">
                    102, Heritage Heights, <br />
                    Skyline Avenue, Downtown District, <br />
                    Cityville - 400001
                 </p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default OrderTracking;
