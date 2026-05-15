import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import RestaurantFeed from '../components/RestaurantFeed';
import { Search, Filter, Compass, Map, Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function Discover() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('ai');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'ai', label: t('discover.filter_ai'), icon: Sparkles },
    { id: 'trending', label: t('discover.filter_trending'), icon: TrendingUp },
    { id: 'near', label: t('discover.filter_near'), icon: Map },
    { id: 'fastest', label: t('discover.filter_fastest'), icon: Clock },
    { id: 'top', label: t('discover.filter_top'), icon: Star },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const active = params.get('active');
    if (active) setActiveTab(active);
  }, [location]);

  return (
    <div className="pt-32 min-h-screen">
      <div className="px-8 max-w-7xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-gold mb-4 block">Neural Explorer</span>
          <h1 className="serif-title text-7xl md:text-8xl italic text-paper font-bold leading-[0.9]">{t('nav.discover')}.</h1>
        </motion.div>
        
        {/* Futuristic Search & Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="flex-1 relative group">
             <div className="absolute inset-x-0 bottom-0 h-px bg-white/20 group-hover:bg-gold transition-colors" />
             <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <Search size={24} className="text-white/20 group-hover:text-gold transition-colors" />
             </div>
             <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder={t('discover.search_placeholder')}
               className="w-full bg-transparent py-6 pl-12 text-2xl font-serif italic outline-none text-paper placeholder:opacity-40"
             />
          </div>
          <button className="px-8 py-4 glass-card flex items-center gap-4 hover:bg-white/10 transition-colors uppercase font-mono text-[10px] tracking-widest border-white/20">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Category Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "group flex flex-col items-center gap-4 min-w-[120px] p-6 rounded-[2rem] transition-all duration-500 border",
                activeTab === cat.id 
                  ? "bg-gold border-gold text-onyx scale-110 shadow-[0_0_30px_rgba(212,175,55,0.3)]" 
                  : "bg-white/5 border-white/10 text-paper hover:bg-white/10"
              )}
            >
              <cat.icon className={cn("w-6 h-6", activeTab === cat.id ? "animate-bounce" : "opacity-40")} />
              <span className="text-[9px] font-mono uppercase tracking-widest font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-onyx/40 py-20 border-y border-white/5 reveal-up">
        <RestaurantFeed query={searchQuery} category={activeTab} />
      </div>

      {/* Recommended Combos teaser */}
      <section className="px-8 max-w-7xl mx-auto py-32">
        <div className="flex justify-between items-end mb-12">
          <h2 className="serif-title text-4xl italic">AI Suggested Combos.</h2>
          <span className="text-xs font-mono uppercase text-gold">Refreshed 2m ago</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[1,2].map(i => (
             <div key={i} className="glass-card p-10 flex gap-8 items-center group cursor-pointer hover:bg-white/10 transition-colors">
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden rotate-6 group-hover:rotate-0 transition-transform">
                   <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300`} alt="Food" />
                </div>
                <div className="flex-1">
                   <h3 className="font-serif italic text-2xl mb-2">The Zen Plate + Matcha</h3>
                   <p className="text-sm opacity-40 leading-relaxed mb-4">Optimized for high-focus afternoon sessions. Zero sugar spike.</p>
                   <div className="flex items-center justify-between">
                      <span className="font-bold text-xl text-gold">₹890</span>
                      <button className="text-[10px] font-mono tracking-widest uppercase py-2 px-4 rounded-full border border-white/10 group-hover:bg-gold group-hover:text-onyx transition-colors">Order Duo</button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
