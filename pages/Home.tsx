
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Heart } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';

interface HomeProps {
  addToCart: (item: MenuItem) => void;
}

const Home: React.FC<HomeProps> = ({ addToCart }) => {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const ctx = gsap.context(() => {
      // Hero Animation
      // @ts-ignore
      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      });

      // @ts-ignore
      gsap.from(heroImageRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      });

      // Scroll reveal for cards
      // @ts-ignore
      gsap.utils.toArray('.featured-card').forEach((card: any) => {
        // @ts-ignore
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,rgba(255,193,7,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div ref={heroTextRef}>
            <span className="reveal inline-block text-amber-400 font-bold uppercase tracking-[0.2em] text-sm mb-4">Premium Culinary Art</span>
            <h1 className="reveal text-5xl md:text-7xl font-bold leading-tight mb-6">
              Flavor That <br />
              <span className="font-serif italic text-amber-400 text-glow">Defines Legacy</span>
            </h1>
            <p className="reveal text-neutral-400 text-lg mb-8 max-w-lg leading-relaxed">
              Experience the finest ingredients and authentic flavors at Jagdish Cafe. Your favorite destination for comfort food with a cinematic touch.
            </p>
            <div className="reveal flex flex-wrap gap-4">
              <Link to="/menu" className="bg-amber-400 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-300 hover:shadow-2xl hover:shadow-amber-400/20 transition-all flex items-center gap-2 group">
                Explore Menu
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/reservations" className="glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Book Table
              </Link>
            </div>
          </div>

          <div ref={heroImageRef} className="relative">
            <div className="absolute -inset-4 bg-amber-400/10 blur-[80px] rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" 
              alt="Delicious Burger" 
              className="relative w-full h-auto rounded-[3rem] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 glass p-6 rounded-3xl animate-bounce shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-xl">4.9</div>
                <div>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#FFC107" className="text-amber-400" />)}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">10k+ Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-24 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Customer <span className="text-amber-400 italic font-serif">Favorites</span></h2>
              <p className="text-neutral-500">Hand-picked selections from our culinary masters.</p>
            </div>
            <Link to="/menu" className="text-amber-400 font-bold hover:underline underline-offset-8 flex items-center gap-2">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.filter(item => item.isPopular).map((item) => (
              <div key={item.id} className="featured-card group glass rounded-[2rem] overflow-hidden hover:border-amber-400/30 transition-all">
                <div className="h-64 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {item.tag && (
                    <span className="absolute top-4 left-4 bg-amber-400 text-black px-4 py-1 rounded-full text-xs font-bold uppercase">{item.tag}</span>
                  )}
                  <button className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:text-amber-400 transition-colors">{item.name}</h3>
                    <span className="text-2xl font-bold text-amber-400">₹{item.price}</span>
                  </div>
                  <p className="text-neutral-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <div className="flex items-center gap-1"><Clock size={14} /> 15-20m</div>
                      <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-white/5 hover:bg-amber-400 hover:text-black px-6 py-2 rounded-full font-bold text-sm transition-all active:scale-95"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-neutral-900/50 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="featured-card">
            <div className="w-20 h-20 bg-amber-400/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-400">
              <Star size={40} />
            </div>
            <h4 className="text-xl font-bold mb-4">Master Chefs</h4>
            <p className="text-neutral-500">Experienced culinary experts crafting every dish with precision and passion.</p>
          </div>
          <div className="featured-card">
            <div className="w-20 h-20 bg-amber-400/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-400">
              <Heart size={40} />
            </div>
            <h4 className="text-xl font-bold mb-4">Fresh Ingredients</h4>
            <p className="text-neutral-500">Sourcing only the finest, organic produce to ensure the healthiest gourmet experience.</p>
          </div>
          <div className="featured-card">
            <div className="w-20 h-20 bg-amber-400/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-400">
              <Clock size={40} />
            </div>
            <h4 className="text-xl font-bold mb-4">Quick Delivery</h4>
            <p className="text-neutral-500">Piping hot meals delivered to your doorstep with our lightning-fast logistics.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
