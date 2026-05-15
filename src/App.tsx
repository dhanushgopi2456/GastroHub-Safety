import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import FoodConcierge from './components/FoodConcierge';
import LiveTrackDrawer from './components/LiveTrackDrawer';
import FloatingCart from './components/FloatingCart';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Reservations from './pages/Reservations';
import Events from './pages/Events';
import Social from './pages/Social';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import { AnimatePresence, motion } from 'motion/react';
import { Toaster } from 'sonner';
import { useAuth } from './context/AuthContext';
import { Utensils, Loader2 } from 'lucide-react';

function AnimatedRoutes() {
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Reveal animation logic
    const elements = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [location]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/social" element={<Social />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={user ? <Profile /> : <Auth />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen relative selection:bg-gold selection:text-onyx">
            <Toaster position="top-center" richColors theme="dark" />
            <AuroraBackground />
            <Navbar />
            
            <main className="relative z-10 pt-20">
              <AnimatedRoutes />
            </main>

            <FoodConcierge />
            <LiveTrackDrawer />
            <FloatingCart />
            
            <footer className="relative z-10 py-32 text-center border-t border-white/5 mt-40 bg-onyx">
               <div className="flex flex-col items-center gap-6 mb-12">
                  <div className="w-14 h-14 bg-white/5 text-gold rounded-2xl flex items-center justify-center border border-white/10 group hover:rotate-12 transition-transform">
                    <Utensils size={24} />
                  </div>
                  <span className="font-serif italic text-4xl font-bold tracking-tighter text-paper">GastroHub</span>
               </div>
               
               <div className="flex gap-8 justify-center mb-12 font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">
                  <a href="#" className="hover:text-gold transition-colors">Privacy</a>
                  <a href="#" className="hover:text-gold transition-colors">Supply Chain</a>
                  <a href="#" className="hover:text-gold transition-colors">AI Ethics</a>
                  <a href="#" className="hover:text-gold transition-colors">Investors</a>
               </div>

               <p className="font-mono text-[9px] uppercase tracking-widest opacity-20">
                 Engineered by Astro-Hospitality Group • 2026 Proto-Build v1.8.0
               </p>
            </footer>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>
  );
}

