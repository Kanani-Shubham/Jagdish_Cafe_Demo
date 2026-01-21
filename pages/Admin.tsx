
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Upload,
  Image as ImageIcon,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Order, MenuItem, OrderStatus } from '../types';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface AdminProps {
  orders: Order[];
  menuItems: MenuItem[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onUpdateMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ 
  orders, 
  menuItems, 
  onUpdateStatus, 
  onUpdateMenuItem, 
  onDeleteMenuItem, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // AI Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [itemNameForAI, setItemNameForAI] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingItem) {
      setPreviewImage(editingItem.image);
      setItemNameForAI(editingItem.name);
      setGeneratedDescription(editingItem.description);
    } else if (isAddingItem) {
      setPreviewImage(null);
      setItemNameForAI('');
      setGeneratedDescription('');
    }
  }, [editingItem, isAddingItem]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!itemNameForAI) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, mouth-watering, cinematic description (max 25 words) for a gourmet menu item named "${itemNameForAI}" in a luxury restaurant context. Emphasize textures and premium ingredients.`,
      });
      if (response.text) {
        setGeneratedDescription(response.text.trim());
      }
    } catch (error) {
      console.error("Failed to generate description", error);
      alert("Failed to generate description. Please check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleAvailability = (item: MenuItem) => {
    onUpdateMenuItem({ ...item, isAvailable: !item.isAvailable });
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length,
    completedToday: orders.filter(o => o.status === 'Completed').length,
    revenue: orders.filter(o => o.status === 'Completed').reduce((acc, curr) => acc + curr.totalPrice, 0)
  };

  const statusColors: Record<OrderStatus, string> = {
    Pending: 'text-amber-500 bg-amber-500/10',
    Preparing: 'text-blue-500 bg-blue-500/10',
    Ready: 'text-green-500 bg-green-500/10',
    'Out for Delivery': 'text-purple-500 bg-purple-500/10',
    Completed: 'text-neutral-500 bg-neutral-500/10',
    Cancelled: 'text-red-500 bg-red-500/10'
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 bg-[#0a0a0a]">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-black font-bold">J</div>
          <span className="text-lg font-bold tracking-widest uppercase">Admin Hub</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-amber-400 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-amber-400 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}
          >
            <ShoppingBag size={20} />
            <span>Live Orders</span>
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'menu' ? 'bg-amber-400 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}
          >
            <UtensilsCrossed size={20} />
            <span>Menu Manager</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-amber-400 text-black font-bold' : 'text-neutral-400 hover:bg-white/5'}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <div className="pt-8 border-t border-white/5 mt-8">
            <Link 
              to="/"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-neutral-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Globe size={20} />
              <span>Public Site</span>
            </Link>
          </div>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center space-x-3 px-4 py-3 rounded-xl text-neutral-500 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-amber-400">Jagdish</span></h1>
              <p className="text-neutral-500">Here's what's happening at your restaurant today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Orders', val: stats.totalOrders, icon: ShoppingBag, color: 'text-amber-400' },
                { label: 'Pending', val: stats.pendingOrders, icon: Clock, color: 'text-blue-400' },
                { label: 'Completed Today', val: stats.completedToday, icon: CheckCircle, color: 'text-green-400' },
                { label: 'Total Revenue', val: `₹${stats.revenue}`, icon: DollarSign, color: 'text-emerald-400' }
              ].map((s, i) => (
                <div key={i} className="glass p-6 rounded-3xl border-white/5 hover:border-white/10 transition-colors">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${s.color}`}>
                    <s.icon size={24} />
                  </div>
                  <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="text-3xl font-bold">{s.val}</p>
                </div>
              ))}
            </div>
            
            <div className="glass rounded-[2.5rem] p-8">
              <h3 className="text-xl font-bold mb-6">Recent Customers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...new Set(orders.map(o => o.customerName))].slice(0, 6).map((name, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                      <div className="w-10 h-10 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center font-bold">{(name as string).charAt(0)}</div>
                      <div>
                        <p className="font-bold">{name as string}</p>
                        <p className="text-xs text-neutral-500">Regular Customer</p>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders View */}
        {activeTab === 'orders' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Order Management</h1>
                <p className="text-neutral-500">Live updates of incoming culinary requests.</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="relative">
                   <input 
                    type="text" 
                    placeholder="Search orders..." 
                    className="glass pl-10 pr-6 py-3 rounded-full text-sm outline-none focus:ring-1 focus:ring-amber-400 transition-all text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                 </div>
              </div>
            </header>

            <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    <th className="px-8 py-6">Order ID</th>
                    <th className="px-8 py-6">Customer</th>
                    <th className="px-8 py-6">Items</th>
                    <th className="px-8 py-6">Total</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.filter(o => o.id.includes(searchTerm) || o.customerName.toLowerCase().includes(searchTerm.toLowerCase())).map((order) => (
                    <tr key={order.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-8 py-6 font-mono text-xs text-amber-400/70">{order.id}</td>
                      <td className="px-8 py-6 font-bold">
                        {order.customerName}
                        <div className="text-[10px] text-neutral-500 font-normal">{order.paymentMethod || 'COD'}</div>
                      </td>
                      <td className="px-8 py-6 max-w-xs truncate text-xs text-neutral-400">
                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </td>
                      <td className="px-8 py-6 font-bold">₹{order.totalPrice}</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <select 
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-neutral-800 border-none rounded-lg text-xs px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-amber-400 text-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Menu Management View */}
        {activeTab === 'menu' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Menu Inventory</h1>
                <p className="text-neutral-500">Manage items, prices, and availability.</p>
              </div>
              <button 
                onClick={() => setIsAddingItem(true)}
                className="bg-amber-400 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20 active:scale-95"
              >
                <Plus size={20} /> Add New Item
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuItems.map((item) => (
                <div key={item.id} className={`glass rounded-[2rem] overflow-hidden group border border-white/5 hover:border-white/20 transition-all ${!item.isAvailable ? 'opacity-50' : ''}`}>
                  <div className="h-40 relative">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                        onClick={() => setEditingItem(item)}
                        className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-amber-400"
                       >
                         <Edit2 size={16} />
                       </button>
                       <button 
                        onClick={() => onDeleteMenuItem(item.id)}
                        className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-red-500"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-bold leading-tight">{item.name}</h3>
                       <span className="text-amber-400 font-bold">₹{item.price}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                          <span className={item.isVeg ? 'text-green-500' : 'text-red-500'}>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                       </div>
                       <button 
                         onClick={() => toggleAvailability(item)}
                         className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full ${item.isAvailable ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                       >
                         {item.isAvailable ? 'In Stock' : 'Sold Out'}
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder for Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl">
            {/* Same settings content as before */}
             <div className="glass p-8 rounded-[2rem] space-y-6">
                 <h3 className="font-bold flex items-center gap-2"><UtensilsCrossed size={18} className="text-amber-400" /> Operations</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-neutral-500 mb-2 block uppercase">Opening Hours</label>
                      <input type="text" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white" defaultValue="11:00 AM - 11:30 PM" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-500 mb-2 block uppercase">Service Status</label>
                      <select className="w-full glass rounded-xl px-4 py-3 outline-none text-sm text-white">
                        <option>Operational</option>
                        <option>Kitchen Closed</option>
                        <option>Full Shutdown</option>
                      </select>
                    </div>
                 </div>
               </div>
          </div>
        )}
      </main>

      {/* Menu Modals */}
      {(isAddingItem || editingItem) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => {setIsAddingItem(false); setEditingItem(null);}} />
           <div className="glass max-w-2xl w-full p-10 rounded-[3rem] relative z-10 animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
              {/* Form Content - Same as previous but with isAvailable default true */}
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-bold">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                 <button onClick={() => {setIsAddingItem(false); setEditingItem(null);}}><X /></button>
              </div>
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const itemImage = previewImage || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop';
                  
                  const newItem: MenuItem = {
                    id: editingItem?.id || Date.now().toString(),
                    name: formData.get('name') as string,
                    description: generatedDescription || (formData.get('description') as string),
                    price: Number(formData.get('price')),
                    category: formData.get('category') as string,
                    image: itemImage,
                    isVeg: formData.get('isVeg') === 'on',
                    calories: Number(formData.get('calories')) || undefined,
                    spiceLevel: Number(formData.get('spiceLevel')) || 0,
                    prepTime: formData.get('prepTime') as string,
                    isAvailable: editingItem ? editingItem.isAvailable : true
                  };
                  onUpdateMenuItem(newItem);
                  setIsAddingItem(false);
                  setEditingItem(null);
                  setPreviewImage(null);
                  setGeneratedDescription('');
                  setItemNameForAI('');
                }}
              >
                {/* ... (Existing form fields for name, image, description, price) ... */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase mb-2 block">Item Image</label>
                    <div className="flex gap-4 items-center">
                      <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                        {previewImage ? (
                          <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <ImageIcon className="text-neutral-700" size={32} />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden" 
                        />
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-all"
                        >
                          <Upload size={14} /> Upload Image
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1 block">Item Name</label>
                    <input 
                      name="name" 
                      value={itemNameForAI}
                      onChange={(e) => setItemNameForAI(e.target.value)}
                      required 
                      className="w-full glass rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-amber-400" 
                    />
                  </div>
                  
                  <div className="col-span-2 relative">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block">Description</label>
                      <button 
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={isGenerating || !itemNameForAI}
                        className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1 hover:text-amber-300 disabled:opacity-50"
                      >
                         <Sparkles size={10} />
                         {isGenerating ? 'Dreaming...' : 'AI Generate'}
                      </button>
                    </div>
                    <textarea 
                      name="description" 
                      value={generatedDescription}
                      onChange={(e) => setGeneratedDescription(e.target.value)}
                      required 
                      className="w-full glass rounded-xl px-4 py-3 text-sm text-white h-24 resize-none outline-none focus:ring-1 focus:ring-amber-400" 
                    />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1 block">Price (₹)</label>
                    <input name="price" type="number" defaultValue={editingItem?.price} required className="w-full glass rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-amber-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1 block">Category</label>
                    <select name="category" defaultValue={editingItem?.category || 'Gourmet Pizzas'} className="w-full glass rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-amber-400">
                      {CATEGORIES.filter(c => c !== 'Must Try').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  
                   {/* Calories & Time */}
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1 block">Calories (kcal)</label>
                    <input name="calories" type="number" defaultValue={editingItem?.calories} className="w-full glass rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-amber-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase mb-1 block">Prep Time</label>
                    <input name="prepTime" type="text" defaultValue={editingItem?.prepTime} className="w-full glass rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-amber-400" />
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <input type="checkbox" name="isVeg" defaultChecked={editingItem?.isVeg} className="w-4 h-4 accent-amber-400" />
                    <label className="text-xs font-bold text-neutral-400">Vegetarian</label>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-amber-400 text-black font-bold rounded-2xl hover:bg-amber-300 transition-all mt-4 active:scale-95">
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
