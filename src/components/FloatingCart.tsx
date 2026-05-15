import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import canvasConfetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useApp();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('cart') === 'open') {
      setIsOpen(true);
      // Clean up URL without reload
      params.delete('cart');
      const newSearch = params.toString();
      navigate({ search: newSearch }, { replace: true });
    }
  }, [location, navigate]);

  const handleCheckout = () => {
    canvasConfetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#0F0F0F', '#00F3FF']
    });
    // For demo, we just show a success state
    setIsOpen(false);
    // You could trigger a notification or redirect to a tracking page
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-24 right-8 w-14 h-14 glass-card flex items-center justify-center hover:scale-110 transition-transform z-40 group"
      >
        <ShoppingBag className="w-5 h-5 text-gold group-hover:animate-bounce" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-onyx text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-onyx">
            {totalItems}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-onyx/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-screen glass-card rounded-none border-l border-white/10 z-50 flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-white/10">
                <div>
                  <h2 className="serif-title text-3xl italic">Your Cart.</h2>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gold mt-1">Smart Suggestions Active</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:rotate-90 transition-transform">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-40 text-center">
                    <ShoppingBag size={64} className="mb-4" />
                    <p className="font-serif italic text-xl">{t('cart.title')}</p>
                    <p className="text-xs font-mono uppercase mt-2">{t('cart.subtitle')}</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-serif italic text-lg">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="opacity-0 group-hover:opacity-60 hover:text-red-500 transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs font-mono text-gold mb-3">₹{item.price}</p>
                        <div className="flex items-center gap-4 bg-white/5 w-fit px-2 py-1 rounded-full border border-white/5">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-gold"><Minus size={12}/></button>
                          <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-gold"><Plus size={12}/></button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                
                {/* AI Upsell Card */}
                {cart.length > 0 && (
                  <div className="p-6 bg-gold/10 border border-gold/20 rounded-3xl mt-12">
                    <div className="flex items-center gap-2 text-gold mb-2">
                       <Sparkles size={16} />
                       <span className="text-[10px] font-mono uppercase tracking-widest font-bold">AI Pairing Suggestion</span>
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed mb-4 italic">
                      "Based on your selection, adding a **Truffle Edamame** would balance the textures perfectly."
                    </p>
                    <button className="text-[10px] font-mono uppercase tracking-widest text-gold hover:underline">Add for ₹340</button>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-white/10 bg-white/5">
                <div className="flex justify-between mb-2">
                  <span className="opacity-60 text-sm">{t('cart.subtotal')}</span>
                  <span className="font-mono text-paper">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="opacity-60 text-sm">{t('cart.fee')}</span>
                  <span className="font-mono text-gold">₹45</span>
                </div>
                <div className="flex justify-between items-end mb-8">
                  <span className="serif-title text-2xl italic tracking-wide text-paper">Total</span>
                  <span className="text-3xl font-bold text-paper">₹{totalPrice + 45}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full luxury-button flex items-center justify-center gap-3 py-6"
                >
                  {t('cart.confirm')} <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
