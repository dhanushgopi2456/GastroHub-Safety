import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Github, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    // For demo/prototype we use the social login mostly, 
    // but we simulate the email/pass logic
    await login();
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 blur-[150px] rounded-full animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-12 relative z-10 border-white/5"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-onyx text-gold rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-gold/20 shadow-2xl skew-x-[-10deg]">
             <Lock size={32} />
          </div>
          <h1 className="serif-title text-5xl italic text-paper mb-4">{isLogin ? 'Welcome Back.' : 'Join the Grid.'}</h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">Neural Authentication Protocol Active</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest opacity-40 ml-4">Full Identity</label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-paper/20 group-focus-within:text-gold transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full neo-input pl-16"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest opacity-40 ml-4">Neural Address (Email)</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-paper/20 group-focus-within:text-gold transition-colors" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@gastrohub.io" 
                className="w-full neo-input pl-16"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest opacity-40 ml-4">Safety Matrix (Password)</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-paper/20 group-focus-within:text-gold transition-colors" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full neo-input pl-16"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full luxury-button bg-gold text-onyx py-6 flex items-center justify-center gap-4 mt-8 group">
            {isLogin ? 'Establish Link' : 'Initialize Identity'} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="relative my-12">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
           <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-widest bg-transparent px-4 opacity-40">Or Connect Via</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={login}
             className="flex items-center justify-center gap-3 p-4 glass-card border-white/5 hover:bg-white/10 transition-all font-mono text-[10px] uppercase tracking-widest"
           >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale group-hover:grayscale-0" /> Google
           </button>
           <button className="flex items-center justify-center gap-3 p-4 glass-card border-white/5 hover:bg-white/10 transition-all font-mono text-[10px] uppercase tracking-widest">
              <Github size={16} /> GitHub
           </button>
        </div>

        <div className="mt-12 text-center">
           <button 
             onClick={() => setIsLogin(!isLogin)}
             className="text-[10px] font-mono uppercase tracking-widest text-gold hover:opacity-100 opacity-60 transition-opacity"
           >
              {isLogin ? "Don't have a neural link? Initialize here" : "Already registered? Establish link"}
           </button>
        </div>
      </motion.div>
    </div>
  );
}
