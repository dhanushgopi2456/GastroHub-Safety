import React from 'react';
import { motion } from 'motion/react';
import { Ticket, MapPin, Calendar, ArrowRight, Share2, Users, Music } from 'lucide-react';

const EVENTS = [
  {
    id: 1,
    title: "Liquid Neon Gala",
    date: "May 24, 2026",
    location: "Symmetry Sky Lounge",
    price: "₹4,500",
    tags: ["Exclusive", "Open Bar"],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Quantum Dining Session",
    date: "June 02, 2026",
    location: "The Under-Grid",
    price: "₹8,800",
    tags: ["5D Sensory", "Chef Mario"],
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Swarm Music Festival",
    date: "June 15, 2026",
    location: "Metro Plaza Delta",
    price: "₹1,200",
    tags: ["Hologram DJ", "Interactive"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Events() {
  return (
    <div className="pt-32 min-h-screen px-8 max-w-7xl mx-auto pb-40">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-gold mb-6 block">Experience Marketplace</span>
          <h1 className="serif-title text-7xl md:text-9xl italic text-paper leading-none">Vibrations.</h1>
        </motion.div>
        
        <div className="flex gap-4">
           <button className="w-14 h-14 glass-card border-white/5 flex items-center justify-center hover:bg-gold hover:text-onyx transition-all">
              <Calendar size={20} />
           </button>
           <button className="px-8 h-14 glass-card border-white/5 font-mono text-[10px] uppercase tracking-widest flex items-center gap-4 hover:bg-white/10 transition-all">
              <Music size={16} /> Filter Genres
           </button>
        </div>
      </div>

      <div className="space-y-24">
        {EVENTS.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="flex flex-col lg:flex-row gap-12 group"
          >
            <div className="w-full lg:w-5/12 aspect-[16/10] overflow-hidden rounded-[3rem] relative shadow-2xl border border-white/5">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-onyx/20" />
              <div className="absolute top-8 left-8 flex gap-2">
                 {event.tags.map(tag => (
                   <span key={tag} className="px-4 py-1.5 bg-paper/10 backdrop-blur-3xl border border-white/20 rounded-full text-[9px] font-mono tracking-widest uppercase text-paper">
                     {tag}
                   </span>
                 ))}
              </div>
              <div className="absolute bottom-8 left-8 px-6 py-3 bg-gold text-onyx rounded-2xl flex items-center gap-3 shadow-2xl font-mono text-[10px] font-bold uppercase tracking-widest">
                 <Ticket size={14} /> Only {12 + i * 5} Left
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center py-4">
               <div className="flex justify-between items-start mb-8 gap-4">
                  <div>
                    <h3 className="serif-title text-5xl italic group-hover:text-gold transition-colors duration-500 mb-4">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-8 opacity-40 font-mono text-[10px] uppercase tracking-[0.2em]">
                       <span className="flex items-center gap-2"><Calendar size={14} /> {event.date}</span>
                       <span className="flex items-center gap-2"><MapPin size={14} /> {event.location}</span>
                       <span className="flex items-center gap-2 text-gold"><Users size={14} /> Elite Access Only</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest mb-1">Pass Category</p>
                    <p className="text-3xl font-bold tracking-tighter text-paper">{event.price}</p>
                  </div>
               </div>
               
               <p className="text-paper/40 text-lg leading-relaxed mb-12 max-w-xl">
                 Experience a multisensory journey curated by the Metro Group. Sub-quantum soundscapes meet ultra-high fidelity dining.
               </p>

               <div className="flex items-center gap-6">
                  <button className="luxury-button flex-1 lg:flex-none border border-white/10 hover:border-white/30">
                    Acquire Neural Pass
                  </button>
                  <button className="w-14 h-14 glass-card border-white/5 flex items-center justify-center hover:bg-white/10 transition-all opacity-40 group-hover:opacity-100">
                    <Share2 size={20} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommended for you horizontal scroll */}
      <section className="mt-40 reveal-up">
        <h2 className="serif-title text-4xl italic mb-12">Next Sector Vibes.</h2>
        <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar">
           {[1,2,3,4].map(i => (
             <div key={i} className="min-w-[350px] aspect-[16/10] glass-card overflow-hidden group relative">
                <img src={`https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=600&u=${i}`} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-onyx to-transparent">
                   <p className="font-serif italic text-2xl mb-1">Hologram Sunset</p>
                   <p className="text-[10px] font-mono uppercase opacity-60">June 14 • Rooftop Grid</p>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
