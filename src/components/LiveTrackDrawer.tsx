import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, MessageSquare, ChevronDown, Package, CheckCircle, Truck, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LiveTrackDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    { label: 'Synthesis', icon: Zap, active: true },
    { label: 'Calibration', icon: Package, active: true },
    { label: 'Transit', icon: Truck, active: false },
    { label: 'Delivery', icon: CheckCircle, active: false },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 luxury-button px-6 bg-gold text-onyx shadow-[0_10px_40px_#D4AF3766] z-40 group flex items-center gap-3"
      >
        <div className="w-2 h-2 bg-onyx rounded-full animate-ping" />
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Live Tracking</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-onyx/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 glass-card bg-onyx rounded-t-[4rem] rounded-b-none border-t border-white/10 z-[70] max-w-4xl mx-auto h-[500px] flex flex-col"
            >
              <div className="p-12 flex-1 flex flex-col items-center">
                 <div className="w-20 h-1 bg-white/10 rounded-full mb-12" />
                 
                 <div className="w-full flex justify-between items-start mb-12">
                    <div>
                       <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">Order Context: #G8224</span>
                       <h2 className="serif-title text-5xl italic text-paper">Neo Tokyo Ramen Box.</h2>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-mono uppercase opacity-40 mb-1">Estimated Arrival</p>
                       <p className="text-3xl font-bold font-mono text-gold">14:22 <span className="text-sm opacity-60">MIN</span></p>
                    </div>
                 </div>

                 {/* Custom Tracker Progress */}
                 <div className="w-full py-12 relative flex items-center justify-between">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2" />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '40%' }}
                      className="absolute top-1/2 left-0 h-0.5 bg-gold -translate-y-1/2 shadow-[0_0_10px_#D4AF37]" 
                    />
                    
                    {steps.map((step, i) => (
                      <div key={step.label} className="relative z-10 flex flex-col items-center gap-4">
                         <div className={cn(
                           "w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-700",
                           step.active ? "bg-gold border-gold text-onyx shadow-[0_0_30px_#D4AF3744]" : "bg-white/5 border-white/10 opacity-30"
                         )}>
                            <step.icon size={24} />
                         </div>
                         <span className={cn(
                           "text-[9px] font-mono uppercase tracking-[0.2em] font-bold",
                           step.active ? "text-gold" : "opacity-20"
                         )}>{step.label}</span>
                      </div>
                    ))}
                 </div>

                 <div className="w-full grid grid-cols-2 gap-8 mt-auto mb-12">
                    <div className="glass-card p-6 border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-colors">
                       <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden">
                          <img src="https://i.pravatar.cc/100?u=rider" alt="rider" />
                       </div>
                       <div className="flex-1">
                          <p className="text-[9px] font-mono uppercase opacity-40">Agent Coordinate</p>
                          <p className="font-serif italic text-lg leading-none">Rider_ZeroOne</p>
                       </div>
                       <div className="flex gap-2">
                          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-onyx transition-colors"><Phone size={14}/></button>
                          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-onyx transition-colors"><MessageSquare size={14}/></button>
                       </div>
                    </div>
                    <div className="glass-card p-6 border-gold/10 bg-gold/5 flex items-center justify-center gap-4 group cursor-pointer hover:bg-gold/10 transition-all">
                       <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-gold">Open Geospatial Map</span>
                       <ChevronDown className="text-gold -rotate-90" />
                    </div>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
