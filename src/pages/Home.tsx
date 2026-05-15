import React from 'react';
import HologramHero from '../components/HologramHero';
import RestaurantFeed from '../components/RestaurantFeed';
import { Utensils, Calendar, Trophy, ArrowUpRight, Users, Zap, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center relative">
        <HologramHero />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.5em] mb-4 text-paper">Scroll to Discover</span>
          <div className="w-px h-20 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* 2. Feature Bento */}
      <section className="px-8 max-w-7xl mx-auto py-32">
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-8 h-auto md:h-[600px]">
          {/* Smart Delivery */}
          <Link to="/discover" className="md:col-span-3 md:row-span-2 glass-card p-12 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-5 transition-opacity duration-700" />
            <motion.div 
              whileHover={{ x: 10, y: -10 }}
              className="relative z-10 h-full flex flex-col"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-20 h-20 bg-gold/10 text-gold rounded-[2rem] flex items-center justify-center border border-gold/20">
                  <Zap size={32} />
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-gold" />
                </div>
              </div>
              <div className="mt-auto">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4 block">Precision Logic 3.0</span>
                <h3 className="serif-title text-6xl italic text-paper mb-6">Neural Delivery.</h3>
                <p className="text-sm text-paper/40 max-w-md leading-relaxed">
                  Real-time swarm intelligence optimizes your delivery path. 
                  Experience the sub-20 minute standard across the metropolitan grid.
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Dine-Out */}
          <Link to="/reservations" className="md:col-span-3 glass-card p-10 group overflow-hidden">
            <div className="flex justify-between items-center h-full">
              <div className="flex-1">
                <div className="w-14 h-14 bg-white/5 text-gold rounded-2xl flex items-center justify-center mb-6">
                  <Calendar size={24} />
                </div>
                <h3 className="serif-title text-4xl italic text-paper mb-2">Atmosphere Preview.</h3>
                <p className="text-xs text-paper/40 font-mono uppercase tracking-widest italic">3D Seat Selection</p>
              </div>
              <div className="w-32 h-32 bg-white/5 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="w-24 h-24 border-2 border-dashed border-gold/40 rounded-full"
                 />
              </div>
            </div>
          </Link>

          {/* Member Club */}
          <Link to="/profile" className="md:col-span-3 glass-card p-10 group bg-gold text-onyx">
            <div className="flex justify-between items-center h-full">
               <div>
                 <div className="flex items-center gap-2 mb-4">
                    <Trophy size={16} />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Loyalty Protocol</span>
                 </div>
                 <h3 className="serif-title text-4xl italic mb-3">Elite Tier Status.</h3>
                 <p className="text-xs opacity-60">Unlock private dining coordinates and chef-exclusive sessions.</p>
               </div>
               <div className="h-full flex items-center justify-center">
                  <span className="text-8xl font-serif italic opacity-10">99.</span>
               </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Personalized Feed Section */}
      <section className="bg-onyx/40 py-32 border-y border-white/5">
        <RestaurantFeed limit={3} />
      </section>

      {/* 4. Social Feed Teaser */}
      <section className="py-40 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gold">Live Connect</span>
                  </div>
                  <div className="flex -space-x-2">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-6 h-6 rounded-full border border-onyx overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" />
                       </div>
                     ))}
                  </div>
                  <span className="text-[10px] opacity-40 font-mono italic">+4.2k active</span>
               </div>
               <h2 className="serif-title text-7xl md:text-8xl italic text-paper leading-none mb-12">
                 Culinary <br />
                 <span className="text-gold">Symmetry.</span>
               </h2>
               <p className="text-xl text-paper/50 leading-relaxed mb-16 max-w-lg">
                 Enter the GastroHub social sphere. Sync your palate with influencers, create hyper-realistic reels, and host multisensory group dining events.
               </p>
               <Link to="/social" className="luxury-button inline-flex items-center gap-4 group">
                  Enter The Collective <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
               </Link>
            </div>

            <div className="w-full lg:w-[500px] aspect-square relative">
               <div className="absolute inset-0 bg-gold blur-[120px] opacity-10 animate-pulse" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border border-white/5 rounded-full" 
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-10 border border-gold/10 rounded-full" 
               />
               <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="w-full h-full glass-card flex flex-col items-center justify-center gap-6 group cursor-pointer hover:bg-white/10 transition-colors">
                     <Users size={80} className="text-gold opacity-40 group-hover:scale-120 group-hover:opacity-100 transition-all duration-700" />
                     <div className="text-center">
                        <p className="font-serif italic text-2xl text-paper mb-1">Global Social Feed</p>
                        <p className="font-mono text-[9px] uppercase tracking-widest opacity-40">Syncing live coordinates...</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. Geospatial Teaser */}
      <section className="px-8 max-w-7xl mx-auto py-40">
        <div className="glass-card p-16 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-br from-white/5 to-gold/5">
          <div>
            <div className="flex items-center gap-2 text-gold mb-6">
              <MapPin size={20} />
              <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">Hyperlocal Discovery</span>
            </div>
            <h2 className="serif-title text-5xl italic mb-6">The Metro Grid.</h2>
            <p className="text-paper/40 max-w-md leading-relaxed">
              Our 2dsphere indexing ensures millimetric precision for restaurant discovery. 
              Find the perfect table in your immediate spatial sector within seconds.
            </p>
          </div>
          <button 
            onClick={() => navigate('/discover?active=near')}
            className="luxury-button bg-gold text-onyx whitespace-nowrap"
          >
            Launch Area Scan
          </button>
        </div>
      </section>
    </div>
  );
}
