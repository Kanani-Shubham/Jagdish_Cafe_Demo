
import React, { useEffect, useRef } from 'react';
import { Maximize2 } from 'lucide-react';

const IMAGES = [
  { id: '1', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop', title: 'Craft Cocktails', category: 'Drinks' },
  { id: '2', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop', title: 'Authentic Pasta', category: 'Food' },
  { id: '3', url: 'https://images.unsplash.com/photo-1550966842-30ca245847e6?q=80&w=1000&auto=format&fit=crop', title: 'Main Dining Hall', category: 'Ambiance' },
  { id: '4', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop', title: 'Gourmet Plating', category: 'Food' },
  { id: '5', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop', title: 'Evening Vibe', category: 'Ambiance' },
  { id: '6', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop', title: 'Wood Fired Pizza', category: 'Food' },
  { id: '7', url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1000&auto=format&fit=crop', title: 'Fresh Salad', category: 'Food' },
  { id: '8', url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000&auto=format&fit=crop', title: 'Mixology Art', category: 'Drinks' },
  { id: '9', url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000&auto=format&fit=crop', title: 'Dessert Heaven', category: 'Food' },
];

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const ctx = gsap.context(() => {
      // @ts-ignore
      gsap.utils.toArray('.gallery-item').forEach((item: any, i: number) => {
        // @ts-ignore
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          duration: 1,
          delay: i % 3 * 0.1,
          ease: 'power3.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12" ref={containerRef}>
      <header className="text-center mb-16">
        <span className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-4 block">Our Visual Story</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Cinematic <span className="font-serif italic text-amber-400">Atmosphere</span></h1>
        <p className="text-neutral-500 max-w-2xl mx-auto">Take a glimpse into our world of culinary excellence and elegant interiors.</p>
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {IMAGES.map((img) => (
          <div key={img.id} className="gallery-item group relative glass rounded-3xl overflow-hidden break-inside-avoid shadow-xl">
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{img.category}</span>
              <h3 className="text-xl font-bold text-white mb-4">{img.title}</h3>
              <button className="w-12 h-12 glass rounded-full flex items-center justify-center text-white self-end hover:bg-amber-400 hover:text-black transition-colors">
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <div className="glass inline-block p-12 rounded-[3rem] max-w-2xl">
           <h3 className="text-2xl font-bold mb-4">Host Your Event</h3>
           <p className="text-neutral-400 mb-8">Looking for the perfect venue for your next celebration or corporate dinner? Our space is available for private bookings.</p>
           <button className="bg-amber-400 text-black px-10 py-4 rounded-full font-bold hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/10">Inquire Now</button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
