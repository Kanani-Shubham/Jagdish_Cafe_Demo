
import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Clock, Star, Leaf, X, Flame, Minus, Plus, ShoppingBag, Share2, Heart, PenLine } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { MenuItem } from '../types';

interface MenuProps {
  addToCart: (item: MenuItem, quantity: number, note: string) => void;
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ addToCart, items }) => {
  const [activeCategory, setActiveCategory] = useState('Must Try');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [chefNote, setChefNote] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtered = items;
    
    if (activeCategory !== 'Must Try') {
      filtered = filtered.filter(i => i.category === activeCategory);
    } else {
      filtered = filtered.filter(i => i.isPopular);
    }

    if (vegOnly) {
      filtered = filtered.filter(i => i.isVeg);
    }

    if (searchQuery) {
      filtered = filtered.filter(i => 
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        i.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(filtered);

    // Stagger animation on change
    // @ts-ignore
    gsap.from(".menu-item-card", {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    });
  }, [activeCategory, searchQuery, vegOnly, items]);

  useEffect(() => {
    if (selectedItem && modalRef.current) {
      // @ts-ignore
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
    setQuantity(1);
    setChefNote('');
  }, [selectedItem]);

  const handleAddToCartFromModal = () => {
    if (selectedItem) {
      addToCart(selectedItem, quantity, chefNote);
      setSelectedItem(null);
    }
  };

  const getSpiceLabel = (level?: number) => {
    switch(level) {
      case 1: return 'Mild';
      case 2: return 'Medium';
      case 3: return 'Signature';
      case 4: return 'Inferno';
      default: return 'Mild';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore <span className="text-amber-400">Menu</span></h1>
          <p className="text-neutral-500">Delicious food, cozy vibes, made with love.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <div className="flex items-center gap-2 glass px-4 py-3 rounded-full">
            <Leaf size={16} className={vegOnly ? 'text-green-500' : 'text-neutral-500'} />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Veg Only</span>
            <button 
              onClick={() => setVegOnly(!vegOnly)}
              className={`w-10 h-5 rounded-full relative transition-colors ${vegOnly ? 'bg-green-500' : 'bg-white/10'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${vegOnly ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </button>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search dishes..." 
              className="w-full glass py-3 px-12 rounded-full border-none focus:ring-2 focus:ring-amber-400 transition-all outline-none text-sm text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Categories */}
        <aside className="lg:w-64 space-y-4 shrink-0">
          <div className="glass p-6 rounded-[2rem] sticky top-28">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Categories</h3>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeCategory === cat ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'text-neutral-400 hover:bg-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Menu Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="menu-item-card glass rounded-3xl overflow-hidden group hover:border-amber-400/30 transition-all cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase">{item.tag}</span>
                  )}
                  <div className="absolute top-3 right-3 w-6 h-6 bg-black/50 backdrop-blur-md rounded-md flex items-center justify-center border border-white/20">
                     <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                    <span className="font-bold text-amber-400">₹{item.price}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-6 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                       <span className="flex items-center gap-1"><Clock size={12} /> {item.prepTime || '15-20m'}</span>
                       <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> 4.8</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(item, 1, ''); }}
                      className="bg-amber-400 text-black px-5 py-2 rounded-full font-bold text-xs hover:bg-amber-300 transition-colors active:scale-95"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
             <div className="text-center py-20 text-neutral-500">
               <p className="text-xl">No items found matching your criteria.</p>
               <button onClick={() => {setActiveCategory('Must Try'); setSearchQuery(''); setVegOnly(false)}} className="mt-4 text-amber-400 font-bold">Clear Filters</button>
             </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedItem(null)} />
          <div ref={modalRef} className="relative w-full max-w-4xl bg-[#0f0f0f] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/5 my-auto">
            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
              <X size={20} />
            </button>
            <div className="absolute top-6 right-20 z-10 flex gap-2">
               <button className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-amber-400 transition-colors"><Share2 size={18} /></button>
               <button className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors"><Heart size={18} /></button>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative min-h-[300px]">
              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col max-h-[90vh] overflow-y-auto">
              <div className="flex gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${selectedItem.isVeg ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                  {selectedItem.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
                {selectedItem.tag && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    {selectedItem.tag}
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">{selectedItem.name}</h2>
              <p className="text-neutral-400 leading-relaxed mb-6">{selectedItem.description}</p>

              <div className="flex items-center gap-6 mb-8 text-sm text-neutral-500">
                <span className="flex items-center gap-2"><Flame size={16} className="text-orange-500" /> {selectedItem.calories || 450} kcal</span>
                <span className="flex items-center gap-2"><Clock size={16} className="text-blue-500" /> {selectedItem.prepTime || '20-25 mins'}</span>
              </div>

              {/* Spice Level Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Spice Level</span>
                  <span className="text-amber-400 font-bold text-sm">{getSpiceLabel(selectedItem.spiceLevel)}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden relative">
                   <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-red-600 transition-all duration-300"
                      style={{ width: `${((selectedItem.spiceLevel || 0) / 4) * 100}%` }}
                   />
                </div>
              </div>

              {/* Chef Note */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-2">
                  <PenLine size={14} /> Chef's Note (Optional)
                </label>
                <textarea 
                  value={chefNote}
                  onChange={(e) => setChefNote(e.target.value)}
                  placeholder="E.g., No onions, extra spicy, sauce on the side..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:ring-1 focus:ring-amber-400 outline-none resize-none h-20 placeholder:text-neutral-600"
                />
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Total Price</p>
                   <p className="text-3xl font-bold text-amber-400 font-serif">₹{selectedItem.price * quantity}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white/5 rounded-full px-2 py-2 border border-white/10">
                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"><Minus size={14} /></button>
                     <span className="w-8 text-center font-bold">{quantity}</span>
                     <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"><Plus size={14} /></button>
                  </div>
                  <button 
                    onClick={handleAddToCartFromModal}
                    className="bg-amber-400 text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-amber-300 transition-all active:scale-95 shadow-xl shadow-amber-400/20"
                  >
                    Add to Order <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
