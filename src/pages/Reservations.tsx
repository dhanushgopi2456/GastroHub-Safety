import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Users, Clock, CheckCircle, MapPin, Box, Layers, Target, Loader2 } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Reservations() {
  const { profile } = useAuth();
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    restaurantName: 'Neo Tokyo Eats',
    guests: 2,
    time: '19:30',
    date: new Date().toISOString().split('T')[0]
  });

  const handleBook = async () => {
    if (!profile) {
      alert("Please login to the Neural Grid to coordinate your table.");
      return;
    }
    if (selectedTable === null) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'reservations'), {
        userId: profile.uid,
        userEmail: profile.email,
        userName: profile.displayName,
        restaurantName: formData.restaurantName,
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        tableSector: `G-${selectedTable + 101}`,
        status: 'confirmed',
        createdAt: serverTimestamp()
      });

      setBooked(true);
      canvasConfetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#0F0F0F', '#00F3FF']
      });
    } catch (error) {
      console.error("Coordinate log failure:", error);
      alert("Neural sync failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 min-h-screen px-8 max-w-7xl mx-auto pb-40">
      <div className="text-center mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-gold mb-6 block">Atmosphere Portal</span>
          <h1 className="serif-title text-7xl md:text-8xl italic text-paper mb-6">Coordinate.</h1>
          <p className="text-paper/40 max-w-lg mx-auto font-mono text-[10px] uppercase tracking-widest leading-loose">
            Precision table allocation across all premier sectors. 
            Select your spatial coordinates below.
          </p>
        </motion.div>
      </div>

      {!booked ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: 3D Preview Placeholder */}
          <div className="lg:col-span-7">
             <div className="glass-card aspect-[16/10] relative flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-colors" />
                <div className="relative z-10 text-center space-y-6">
                   <div className="w-24 h-24 rounded-full border-2 border-dashed border-gold/40 flex items-center justify-center mx-auto animate-spin-slow">
                      <Box className="text-gold" size={32} />
                   </div>
                   <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">Initializing 3D Spatial Render...</p>
                   <button className="px-6 py-2 border border-white/10 rounded-full text-[9px] font-mono tracking-widest uppercase hover:bg-gold hover:text-onyx transition-colors">Enter Preview Mode</button>
                </div>
                
                {/* Table Map Simulation */}
                <div className="absolute inset-0 p-12 grid grid-cols-4 grid-rows-3 gap-6 opacity-20 group-hover:opacity-100 transition-opacity">
                   {[...Array(12)].map((_, i) => (
                     <button 
                       key={i} 
                       onClick={() => setSelectedTable(i)}
                       className={cn(
                         "border border-white/20 rounded-2xl transition-all duration-500",
                         selectedTable === i ? "bg-gold border-gold scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]" : "hover:border-gold/50"
                       )}
                     />
                   ))}
                </div>
             </div>
             <div className="mt-8 flex gap-6">
                <div className="flex-1 glass-card p-6 border-white/5 flex items-center gap-4">
                   <Target size={20} className="text-gold" />
                   <div>
                      <p className="text-[9px] font-mono uppercase opacity-40">Precision Seat</p>
                      <p className="font-serif italic text-lg leading-none">{selectedTable !== null ? `Sector G-${selectedTable + 101}` : 'Not Selected'}</p>
                   </div>
                </div>
                <div className="flex-1 glass-card p-6 border-white/5 flex items-center gap-4">
                   <Layers size={20} className="text-gold" />
                   <div>
                      <p className="text-[9px] font-mono uppercase opacity-40">Atmosphere</p>
                      <p className="font-serif italic text-lg leading-none">High-Altitude</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right: Advanced Booking Form */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-10 space-y-10"
            >
              <div className="space-y-4">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 flex items-center gap-2">
                   <MapPin size={10} /> Venue Destination
                </label>
                <select 
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                  className="w-full bg-onyx/50 border border-white/10 p-5 rounded-3xl outline-none focus:border-gold/50 transition-all text-paper italic font-serif text-xl"
                >
                  <option>Neo Tokyo Eats</option>
                  <option>The Italian Garden</option>
                  <option>Spice Route</option>
                  <option>Cyber Ramen Box</option>
                  <option>Zen Garden Sushi</option>
                  <option>The Under-Grid</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Guests</label>
                    <div className="flex items-center gap-4 bg-onyx/50 p-5 rounded-3xl border border-white/10 group focus-within:border-gold/50 transition-all">
                      <Users size={18} className="text-gold" />
                      <input 
                        type="number" 
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                        min={1} max={12}
                        className="bg-transparent outline-none w-full text-paper" 
                      />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Time Sector</label>
                    <div className="flex items-center gap-4 bg-onyx/50 p-5 rounded-3xl border border-white/10 group focus-within:border-gold/50 transition-all">
                      <Clock size={18} className="text-gold" />
                      <input 
                        type="time" 
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="bg-transparent outline-none w-full text-paper" 
                      />
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Date Parameter</label>
                <div className="flex items-center gap-4 bg-onyx/50 p-5 rounded-3xl border border-white/10 group focus-within:border-gold/50 transition-all">
                  <CalendarIcon size={18} className="text-gold" />
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="bg-transparent outline-none w-full text-paper invert" 
                  />
                </div>
              </div>

              <button 
                onClick={handleBook}
                disabled={selectedTable === null || loading}
                className={cn(
                  "w-full luxury-button py-6 text-xl flex items-center justify-center gap-4",
                  (selectedTable === null || loading) ? "opacity-30 cursor-not-allowed" : "bg-gold text-onyx"
                )}
              >
                {loading ? <Loader2 className="animate-spin" /> : selectedTable !== null ? 'Confirm Table' : 'Select a Table Sector'}
              </button>
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto py-20 text-center glass-card border-gold/20"
        >
          <div className="w-32 h-32 rounded-full border-4 border-gold/20 flex items-center justify-center mx-auto mb-10">
             <CheckCircle size={64} className="text-gold" />
          </div>
          <h2 className="serif-title text-6xl italic mb-6">Synchronized.</h2>
          <p className="text-paper/60 px-20 leading-relaxed font-mono text-[10px] uppercase tracking-widest">
            Your spatial request for <span className="text-gold">Neo Tokyo Eats</span> has been logged into the grid. 
            Expect a neural confirmation within 12 seconds.
          </p>
          <button 
            onClick={() => setBooked(false)}
            className="mt-12 text-gold font-mono text-[10px] uppercase tracking-widest border-b border-gold/30 pb-1"
          >
            New Destination Request
          </button>
        </motion.div>
      )}
    </div>
  );
}
