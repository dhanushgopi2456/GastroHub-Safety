import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MessageCircle, Heart, Share2, Play, Users, Sparkles, TrendingUp, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const REELS = [
  { id: 1, title: 'Umami Fusion', views: '2.4M', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Night Grid Ramen', views: '1.8M', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Wagyu Precision', views: '4.9M', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'Liquid Nitrogen Cocktails', views: '1.1M', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400' },
];

const POSTS = [
  { id: 1, user: 'Nova Sky', avatar: '15', image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=800', text: 'Achieved complete Umami symmetry at Neo Tokyo. The neural feedback was off the charts. 🪐🥢', likes: '1.2k', time: '2m' },
  { id: 2, user: 'Chef Zenith', avatar: '12', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', text: 'Prepping the Summer Solstice menu. Expect refractive flavors and zero-gravity textures. ✨', likes: '4.8k', time: '14m' },
  { id: 3, user: 'Palate Oracle', avatar: '22', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800', text: 'Is the Under-Grid lounge truly following the Zen Protocol? Reviewing tonight.', likes: '840', time: '1h' },
];

export default function Social() {
  const [activeTab, setActiveTab] = useState('Global');

  return (
    <div className="pt-32 min-h-screen pb-40">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Feed */}
          <div className="flex-1 space-y-16">
            <div className="flex justify-between items-end mb-16">
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-gold mb-4 block">The Neural Social</span>
                  <h1 className="serif-title text-7xl md:text-8xl italic text-paper">Collective.</h1>
               </motion.div>
               <button className="w-16 h-16 bg-gold text-onyx rounded-3xl flex items-center justify-center shadow-[0_10px_30px_#D4AF3744] hover:scale-110 transition-transform">
                  <Camera size={24} />
               </button>
            </div>

            {/* Content Tabs */}
            <div className="flex gap-12 border-b border-white/5 pb-6 overflow-x-auto no-scrollbar">
               {['Global', 'Following', 'Palate Circles', 'Live Events'].map(tab => (
                 <button 
                   key={tab} 
                   onClick={() => setActiveTab(tab)}
                   className={cn(
                     "font-mono text-[10px] uppercase tracking-widest transition-all relative overflow-hidden",
                     activeTab === tab ? "text-gold opacity-100" : "opacity-30 hover:opacity-60"
                   )}
                 >
                   {tab}
                   {activeTab === tab && <motion.div layoutId="socialTab" className="absolute -bottom-6 left-0 right-0 h-1 bg-gold rounded-full" />}
                 </button>
               ))}
            </div>

            <div className="space-y-24">
               {POSTS.map((post, i) => (
                 <motion.div 
                   key={post.id}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8, delay: i * 0.1 }}
                   className="group"
                 >
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-gold/20 ring-4 ring-gold/5 ring-offset-4 ring-offset-onyx">
                             <img src={`https://i.pravatar.cc/150?u=${post.avatar}`} alt={post.user} />
                          </div>
                          <div>
                             <h4 className="font-serif italic text-2xl text-paper leading-none">{post.user}</h4>
                             <p className="text-[9px] font-mono uppercase tracking-widest text-gold mt-1 opacity-60">Verified Oracle • {post.time} ago</p>
                          </div>
                       </div>
                       <button className="px-6 py-2 rounded-full border border-white/10 text-[9px] font-mono tracking-widest uppercase hover:bg-gold hover:text-onyx transition-all">Follow</button>
                    </div>
                    
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] shadow-2xl border border-white/5 group-hover:border-gold/20 transition-colors">
                       <img src={post.image} alt="post" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                       <div className="absolute inset-0 bg-onyx/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play size={64} className="text-paper fill-paper shadow-2xl shadow-gold/20" />
                       </div>
                    </div>

                    <div className="pt-8 flex gap-12 items-start">
                       <div className="flex flex-col gap-6">
                          <button className="flex flex-col items-center gap-2 group/btn">
                             <Heart size={28} className="text-paper/20 group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-all" />
                             <span className="text-[10px] font-mono font-bold opacity-40">{post.likes}</span>
                          </button>
                          <button className="flex flex-col items-center gap-2 group/btn">
                             <MessageCircle size={28} className="text-paper/20 group-hover/btn:text-gold transition-all" />
                             <span className="text-[10px] font-mono font-bold opacity-40">42</span>
                          </button>
                          <button className="flex flex-col items-center gap-2 group/btn">
                             <Share2 size={28} className="text-paper/20 group-hover/btn:text-gold transition-all" />
                          </button>
                       </div>
                       <div className="flex-1">
                          <p className="text-xl font-serif italic text-paper/80 leading-relaxed max-w-2xl">
                            "{post.text}"
                          </p>
                          <div className="mt-8 flex gap-3 overflow-x-auto no-scrollbar">
                             {['#GastroFuture', '#UmamiSymmetry', '#NeuralLink'].map(tag => (
                               <span key={tag} className="text-[9px] font-mono text-gold px-3 py-1 bg-gold/5 border border-gold/10 rounded-full">{tag}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Right Column: Trending Reels/Influencers */}
          <div className="hidden lg:block w-96 space-y-16">
             <div className="glass-card p-10 border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                <div className="flex items-center gap-2 mb-8 text-gold">
                   <TrendingUp size={18} />
                   <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold">Trending Food Reels</h3>
                </div>
                <div className="space-y-6">
                   {REELS.map(reel => (
                     <div key={reel.id} className="flex gap-4 group cursor-pointer">
                        <div className="w-20 h-24 rounded-2xl overflow-hidden relative shrink-0 border border-white/10 group-hover:border-gold/30 transition-colors">
                           <img src={reel.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120" />
                           <div className="absolute inset-0 bg-onyx/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play size={16} className="text-paper fill-paper" />
                           </div>
                        </div>
                        <div className="flex flex-col justify-center">
                           <h4 className="font-serif italic text-lg leading-tight mb-1 group-hover:text-gold transition-colors">{reel.title}</h4>
                           <p className="text-[9px] font-mono opacity-40 uppercase tracking-widest">{reel.views} Views</p>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-10 py-4 border border-white/10 rounded-2xl font-mono text-[9px] uppercase tracking-widest hover:bg-white/5 transition-colors">Discover Reels</button>
             </div>

             <div className="glass-card p-10 border-white/5">
                <div className="flex items-center gap-2 mb-8 text-gold">
                   <Users size={18} />
                   <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold">Palate Oracles Nearby</h3>
                </div>
                <div className="space-y-6">
                   {[1,2,3].map(i => (
                     <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                              <img src={`https://i.pravatar.cc/100?u=${i+30}`} alt="user" />
                           </div>
                           <p className="font-serif italic text-lg leading-none">Oracle_{i+42}</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center hover:bg-gold hover:text-onyx transition-colors">+</button>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
