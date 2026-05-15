import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, Heart, History, LogOut, ChevronRight, Trophy, Zap, ShieldCheck, CreditCard, Sparkles, X, Save, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export default function Profile() {
  const { theme, setTheme, language, setLanguage } = useApp();
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: profile?.displayName || user?.displayName || '',
    bio: profile?.bio || ''
  });

  if (!user) return null;

  const translations: any = {
    en: { visits: 'Visits', context: 'Language Context', polarity: 'Visual Polarity', settings: 'System Preferences.' },
    hi: { visits: 'मुलाकातें', context: 'भाषा संदर्भ', polarity: 'दृश्य ध्रुवीयता', settings: 'सिस्टम प्राथमिकताएं।' },
    te: { visits: 'సందర్శనలు', context: 'భాషా సందర్భం', polarity: 'విజువల్ పోలారిటీ', settings: 'సిస్టమ్ ప్రాధాన్యతలు.' }
  };

  const t = translations[language] || translations.en;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: editForm.displayName,
        bio: editForm.bio
      });
      toast.success("Profile recalibrated successfully.");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Profile sync failed. Check neural link.");
    } finally {
      setSaving(false);
    }
  };

  const handleAction = (label: string) => {
    if (label === 'Terminate Session') {
      logout();
      navigate('/auth');
      toast.info("Neural session terminated.");
      return;
    }
    toast.info(`${label} protocol is currently restricted to Elite members.`);
  };

  const stats = [
    { label: t.visits, value: '24', icon: Zap },
    { label: 'G-Points', value: '1.2k', icon: Trophy },
    { label: 'Precision', value: '98%', icon: ShieldCheck },
    { label: 'Badges', value: 'Elite', icon: Sparkles },
  ];

  return (
    <div className="pt-32 min-h-screen px-8 max-w-4xl mx-auto pb-40">
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-onyx/80 backdrop-blur-2xl"
              onClick={() => setIsEditing(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-card border-white/10 p-10 z-10"
            >
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} className="opacity-40" />
              </button>
              
              <h2 className="serif-title text-4xl italic text-paper mb-8 font-bold">Edit Clearance.</h2>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest opacity-40 mb-3 ml-2">Neural Alias</label>
                  <input 
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                    className="w-full bg-onyx/50 border border-white/10 p-5 rounded-3xl outline-none focus:border-gold/50 transition-all font-serif italic text-xl"
                    placeholder="Enter your alias..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest opacity-40 mb-3 ml-2">Grid Status Bio</label>
                  <textarea 
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full bg-onyx/50 border border-white/10 p-5 rounded-3xl outline-none focus:border-gold/50 transition-all font-serif italic text-lg h-32 resize-none"
                    placeholder="Neural citizen manifest..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full py-6 luxury-button bg-gold text-onyx text-xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02]"
                >
                  {saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Update Grid Profile</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="relative group">
           <div className="absolute inset-[-8px] bg-gradient-to-tr from-gold to-neon-blue rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
           <div className="w-40 h-40 rounded-[3rem] bg-onyx text-gold flex items-center justify-center text-6xl font-serif italic ring-4 ring-white/5 relative z-10 overflow-hidden">
                             <img src={profile?.avatarUrl || user.photoURL || `https://i.pravatar.cc/300?u=${user.uid}`} className="w-full h-full object-cover opacity-80" />
           </div>
           <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gold text-onyx rounded-2xl flex items-center justify-center shadow-2xl z-20 border-4 border-onyx">
              <Trophy size={20} />
           </div>
        </div>
        
        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
             <h1 className="serif-title text-6xl md:text-7xl italic text-paper leading-none">{profile?.displayName || user.displayName || 'Anonymous Oracle'}.</h1>
             <div className="px-3 py-1 bg-gold text-onyx rounded-full font-mono text-[9px] font-bold uppercase tracking-widest translate-y-[-10px]">{profile?.tier || 'Standard'} Tier</div>
          </div>
          <p className="text-paper/40 font-mono text-[10px] uppercase tracking-[0.4em] mb-8">{profile?.bio || 'Neural Citizen of the Metagrid'}</p>
          
          <div className="flex gap-4 justify-center md:justify-start">
             <button 
               onClick={() => {
                 setEditForm({ displayName: profile?.displayName || user.displayName || '', bio: profile?.bio || '' });
                 setIsEditing(true);
               }}
               className="luxury-button border border-white/10 hover:border-gold/50"
             >
               Edit Profile
             </button>
             <button className="w-14 h-14 glass-card border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Settings className="opacity-40" />
             </button>
          </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 reveal-up">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-8 border-white/5 group hover:bg-white/10 transition-all cursor-default">
            <s.icon className="w-5 h-5 text-gold mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">{s.label}</p>
            <p className="font-serif italic text-3xl text-paper leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-12 space-y-6">
           <h3 className="serif-title text-4xl italic text-paper mb-8 px-4 font-bold tracking-tight">{t.settings}</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-up">
             <div className="glass-card p-10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                <div className="flex flex-col gap-1">
                   <span className="font-serif italic text-2xl group-hover:text-gold transition-colors">{t.context}</span>
                   <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Neural Translation Active</span>
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-onyx/50 border border-white/10 rounded-xl px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-gold outline-none"
                >
                   <option value="en">English (US)</option>
                   <option value="hi">Hindi (हिन्दी)</option>
                   <option value="te">Telugu (తెలుగు)</option>
                </select>
             </div>

             <div className="glass-card p-10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                <div className="flex flex-col gap-1">
                   <span className="font-serif italic text-2xl group-hover:text-gold transition-colors">{t.polarity}</span>
                   <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Dynamic UI Theme Switching</span>
                </div>
                <div className="flex gap-2 p-1 bg-onyx/50 border border-white/10 rounded-2xl">
                   <button 
                     onClick={() => setTheme('light')}
                     className={cn("px-4 py-2 rounded-xl text-[9px] font-mono uppercase tracking-widest transition-all", theme === 'light' ? "bg-white text-onyx font-bold" : "opacity-40 hover:opacity-100")}
                   >Light</button>
                   <button 
                     onClick={() => setTheme('dark')}
                     className={cn("px-4 py-2 rounded-xl text-[9px] font-mono uppercase tracking-widest transition-all", theme === 'dark' ? "bg-white text-onyx font-bold" : "opacity-40 hover:opacity-100")}
                   >Dark</button>
                </div>
             </div>

             {[
               { icon: CreditCard, label: 'Payment Protocols', count: '4 Methods' },
               { icon: History, label: 'Spatial History', count: '124 Records' },
               { icon: Heart, label: 'Palate Favorites', count: '8 Entities' },
               { icon: LogOut, label: 'Terminate Session', color: 'text-red-500/60' },
             ].map((item: any) => (
               <button 
                 key={item.label}
                 onClick={() => handleAction(item.label)}
                 className="glass-card p-10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all border border-white/5"
               >
                 <div className="flex items-center gap-6">
                    <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all", item.color)}>
                       {item.icon && <item.icon size={20} />}
                    </div>
                    <div className="text-left flex flex-col gap-1">
                       <span className="font-serif italic text-2xl group-hover:text-gold transition-colors">{item.label}</span>
                       {item.count && <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">{item.count}</span>}
                    </div>
                 </div>
                 <ChevronRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Rewards Teaser Dashboard */}
      <section className="mt-40 reveal-up">
         <div className="glass-card p-12 overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity blur-[100px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
               <div>
                  <h3 className="serif-title text-5xl italic text-paper mb-4 group-hover:text-gold transition-colors tracking-tight">Active Mystery Grid.</h3>
                  <p className="text-paper/40 max-w-md leading-relaxed font-mono text-[11px] uppercase tracking-widest">
                    Your next tier transition is 88% complete. Keep your daily ordering streak to unlock the **Infinite Tasting Protocol**.
                  </p>
               </div>
               <div className="w-56 h-56 relative flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-gold/40 rounded-full" 
                  />
                  <div className="flex flex-col items-center">
                     <span className="text-6xl font-serif italic text-gold font-bold">88<span className="text-2xl font-normal opacity-40">%</span></span>
                     <span className="text-[9px] font-mono uppercase tracking-widest opacity-40">Progress</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
