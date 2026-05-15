import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Shield, Users, Calendar, Clock, MapPin, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Admin() {
  const { profile, loading: authLoading } = useAuth();
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role !== 'admin') return;

    const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profile]);

  if (authLoading) return <div className="h-screen flex items-center justify-center text-gold">Loading Neural Clearances...</div>;
  if (!profile || profile.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status });
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const deleteReservation = async (id: string) => {
    if (window.confirm("Purge this coordinate log?")) {
      try {
        await deleteDoc(doc(db, 'reservations', id));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <div className="pt-32 min-h-screen px-8 max-w-7xl mx-auto pb-40">
      <div className="flex justify-between items-end mb-16">
        <div>
          <div className="flex items-center gap-2 mb-4 text-gold">
            <Shield size={16} />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Admin Hub</span>
          </div>
          <h1 className="serif-title text-6xl italic text-paper">Metagrid Control.</h1>
        </div>
        <div className="text-right">
           <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-1">Total Logs</p>
           <p className="text-4xl font-serif italic text-gold">{reservations.length}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-40 opacity-40 font-mono text-sm uppercase tracking-widest text-paper">
             Scanning sectors...
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-40 opacity-40 font-mono text-sm uppercase tracking-widest text-paper">
             No active coordinate logs found.
          </div>
        ) : (
          reservations.map((res) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={res.id}
              className="glass-card p-8 border-white/5 hover:border-gold/30 transition-all flex flex-col md:flex-row md:items-center gap-8 justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                  <span className="text-2xl font-serif italic">{res.guests}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif italic text-paper mb-1">{res.userName}</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">{res.userEmail}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 flex-1 md:justify-center">
                 <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold" />
                    <div>
                       <p className="text-[8px] font-mono uppercase opacity-30">Venue</p>
                       <p className="text-sm font-serif italic text-paper">{res.restaurantName}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gold" />
                    <div>
                       <p className="text-[8px] font-mono uppercase opacity-30">Date</p>
                       <p className="text-sm font-serif italic text-paper">{res.date}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gold" />
                    <div>
                       <p className="text-[8px] font-mono uppercase opacity-30">Time</p>
                       <p className="text-sm font-serif italic text-paper">{res.time}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold" />
                    <div>
                       <p className="text-[8px] font-mono uppercase opacity-30">Sector</p>
                       <p className="text-sm font-serif italic text-paper tracking-widest">{res.tableSector}</p>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className={cn(
                   "px-4 py-1.5 rounded-full border text-[9px] font-mono uppercase tracking-widest",
                   res.status === 'confirmed' ? "bg-green-500/10 border-green-500/30 text-green-500" :
                   res.status === 'pending' ? "bg-gold/10 border-gold/30 text-gold" :
                   "bg-red-500/10 border-red-500/30 text-red-500"
                 )}>
                   {res.status}
                 </div>
                 <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                    <button 
                      onClick={() => updateStatus(res.id, 'confirmed')}
                      className="p-2 hover:bg-green-500/10 text-green-500 rounded-lg transition-colors opacity-40 hover:opacity-100"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button 
                      onClick={() => updateStatus(res.id, 'cancelled')}
                      className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors opacity-40 hover:opacity-100"
                    >
                      <XCircle size={18} />
                    </button>
                    <button 
                      onClick={() => deleteReservation(res.id)}
                      className="p-2 hover:bg-white/10 text-paper rounded-lg transition-colors opacity-20 hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
