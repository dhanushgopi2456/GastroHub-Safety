import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, UtensilsCrossed, Settings, Globe, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export default function Navbar() {
  const { totalItems, theme, setTheme, language, setLanguage } = useApp();
  const { user, profile, login, logout } = useAuth();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.discover'), path: '/discover' },
    { label: t('nav.reservations'), path: '/reservations' },
    { label: t('nav.events'), path: '/events' },
    { label: t('nav.social'), path: '/social' },
    ...(profile?.role === 'admin' ? [{ label: 'Admin', path: '/admin' }] : []),
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 h-24 z-[100] transition-all duration-700 px-8",
      scrolled ? "h-20" : "h-24 pt-4"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto h-full flex items-center justify-between px-8 transition-all duration-700",
        scrolled ? "glass-card border-white/5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)]" : "bg-transparent border-transparent"
      )}>
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-onyx text-gold rounded-2xl flex items-center justify-center shadow-2xl transform skew-x-[-12deg] group-hover:skew-x-0 transition-transform duration-500 border border-gold/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <UtensilsCrossed size={22} className="relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic text-3xl font-bold tracking-tighter text-paper group-hover:text-gold transition-colors leading-[0.8]">GastroHub.</span>
              <span className="text-[8px] font-mono tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-all mt-1">Hospitality Grid 2.0</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "hover:text-gold transition-all relative py-2 group",
                  isActive ? "text-gold" : "text-paper/40"
                )}
              >
                {item.label}
                <motion.div 
                  className={cn(
                    "absolute -bottom-1 left-0 right-0 h-px bg-gold origin-left",
                    location.pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  )}
                />
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
           {/* Utils */}
           <div className="hidden md:flex items-center gap-2 mr-6 border-r border-white/10 pr-6">
              <button 
                onClick={() => {
                  const langs: ('en'|'hi'|'te')[] = ['en', 'hi', 'te'];
                  const next = langs[(langs.indexOf(language) + 1) % langs.length];
                  setLanguage(next);
                  toast.info(`Language switched to ${next === 'en' ? 'English' : next === 'hi' ? 'Hindi' : 'Telugu'}`);
                }}
                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors group"
                title="Switch Language"
              >
                 <Globe size={18} className="opacity-30 group-hover:opacity-100 group-hover:text-gold transition-all" />
              </button>
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors group"
                title="Toggle Theme"
              >
                 {theme === 'dark' ? 
                   <Sun size={18} className="opacity-30 group-hover:opacity-100 group-hover:text-gold transition-all" /> : 
                   <Moon size={18} className="opacity-30 group-hover:opacity-100 group-hover:text-gold transition-all" />
                 }
              </button>
           </div>

          <div className="flex items-center gap-2">
            <button className="w-12 h-12 rounded-2xl hover:bg-white/5 flex items-center justify-center transition-all group">
              <Search size={22} className="opacity-40 group-hover:opacity-100 group-hover:text-gold transition-all" />
            </button>
            
            <Link to="/discover?cart=open" className="w-12 h-12 rounded-2xl hover:bg-white/5 flex items-center justify-center transition-all group relative">
              <ShoppingBag size={22} className="opacity-40 group-hover:opacity-100 group-hover:text-gold transition-all" />
              {totalItems > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-gold text-onyx rounded-full flex items-center justify-center text-[8px] font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="h-8 w-px bg-white/10 mx-2" />
            
            {user ? (
              <NavLink to="/profile" className="flex items-center gap-4 pl-2 pr-4 py-2 hover:bg-white/5 rounded-full transition-all group">
                <div className="w-10 h-10 rounded-2xl bg-onyx text-gold flex items-center justify-center font-serif italic text-lg shadow-2xl ring-2 ring-white/5 group-hover:ring-gold transition-all relative overflow-hidden">
                  <img src={profile?.avatarUrl || `https://i.pravatar.cc/100?u=${user.uid}`} alt="GA" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="hidden xl:flex flex-col text-left">
                   <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-paper/80 leading-none mb-1 text-paper">{profile?.displayName?.split(' ')[0] || 'Member'}</span>
                   <span className="text-[8px] font-mono uppercase tracking-widest opacity-30">{profile?.tier || 'Standard'} Tier</span>
                </div>
              </NavLink>
            ) : (
              <button 
                onClick={login}
                className="luxury-button border border-white/10 hover:border-gold/50 !px-6 !py-3"
              >
                {t('nav.access_hub')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
