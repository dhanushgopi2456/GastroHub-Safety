import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Clock, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

import { toast } from 'sonner';

export default function RestaurantFeed({ limit, query = '', category = '' }: { limit?: number, query?: string, category?: string }) {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useApp();
  const { t } = useTranslation();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast.success(`${item.name} added to your neural basket.`, {
      description: "Optimized for your consumption profile.",
      icon: <ShoppingBag className="w-4 h-4 text-gold" />
    });
  };

  useEffect(() => {
    setLoading(true);
    fetch('/api/restaurants')
      .then(res => res.json())
      .then(data => {
        let filtered = data;
        if (query) {
          filtered = filtered.filter((r: any) => 
            r.name.toLowerCase().includes(query.toLowerCase()) || 
            r.cuisine.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        switch (category) {
          case 'ai':
            filtered = filtered.filter((r: any) => r.tags.includes('AI Recommended'));
            break;
          case 'trending':
            filtered = filtered.filter((r: any) => r.tags.includes('Trending'));
            break;
          case 'top':
            filtered = filtered.filter((r: any) => r.rating >= 4.7);
            break;
          case 'near':
            // Simulate geo-proximity
            filtered = filtered.sort((a: any, b: any) => a.id.localeCompare(b.id)); 
            break;
          case 'fastest':
            // Sort by avgPrice as a proxy for fast food/quick service or just mock logic
            filtered = filtered.sort((a: any, b: any) => a.avgPrice - b.avgPrice);
            break;
          default:
            break;
        }

        setRestaurants(limit ? filtered.slice(0, limit) : filtered);
      })
      .finally(() => setLoading(false));
  }, [limit, query, category, t]);

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16 px-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">AI Curated Picks</span>
          </div>
          <h2 className="serif-title text-5xl md:text-7xl italic leading-none">The Daily Elite.</h2>
        </div>
        <button className="text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all opacity-40 hover:opacity-100 group">
          Browse Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-40">
           <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-40 opacity-40 font-mono text-sm uppercase tracking-widest text-paper">
           No matching entities found in sector.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {restaurants.map((r, i) => (
            <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.2, 0.6, 0.3, 1] }}
            className="group"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] mb-6 bg-white/5 border border-white/5 group-hover:border-white/20 transition-all duration-500 shadow-2xl">
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              
              {/* Overlays */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-onyx via-onyx/20 to-transparent">
                <div className="flex gap-2 mb-4">
                  {r.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-xl text-[9px] font-mono tracking-widest uppercase rounded-full border border-white/10 text-paper">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1 bg-gold text-onyx px-2 py-0.5 rounded-lg">
                      <Star size={10} className="fill-current" />
                      <span className="text-[10px] font-bold">{r.rating}</span>
                   </div>
                   <div className="flex items-center gap-1 text-[10px] font-mono opacity-60 text-paper">
                      <Clock size={12} />
                      <span>{15 + i * 5} MIN</span>
                   </div>
                </div>
              </div>

              <div className="absolute top-8 right-8 flex flex-col gap-3 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart({ ...r, price: r.avgPrice / 2 });
                  }}
                  className="w-12 h-12 bg-white text-onyx rounded-2xl flex items-center justify-center hover:bg-gold transition-colors shadow-2xl relative z-20"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
            </div>
            
            <div className="px-4">
              <h3 className="font-serif text-3xl group-hover:text-gold transition-colors duration-500 italic mb-2 tracking-tight text-paper">{r.name}</h3>
              <p className="text-xs font-mono uppercase tracking-widest opacity-40 mb-6 text-paper">{r.cuisine} • Fine Dining</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-xl font-bold tracking-tighter text-paper">₹{r.avgPrice}<span className="text-xs opacity-30 font-normal">.00</span></span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.info(`Fetching detailed menu for ${r.name}...`, {
                      description: "Establishing secure link with kitchen logic."
                    });
                  }}
                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold hover:translate-x-1 transition-transform"
                >
                  Detailed Menu
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </section>
  );
}
