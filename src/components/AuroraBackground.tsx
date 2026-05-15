import React from 'react';
import { motion } from 'motion/react';

export default function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10" />
      
      <motion.div 
        animate={{
          x: [0, 200, -200, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="aurora-blob bg-neon-blue top-[-40%] left-[-20%] w-[1200px] h-[1200px]" 
      />
      <motion.div 
        animate={{
          x: [0, -300, 300, 0],
          y: [0, 200, -200, 0],
          scale: [1, 0.7, 1.3, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="aurora-blob bg-neon-purple bottom-[-40%] right-[-20%] opacity-15 w-[1400px] h-[1400px]" 
      />
      <motion.div 
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 250, -250, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
        className="aurora-blob bg-gold/30 top-[10%] right-[10%] opacity-10 w-[1000px] h-[1000px]" 
      />
      
      {/* Scanlines Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)',
          backgroundSize: '30px 30px' 
        }} 
      />
    </div>
  );
}
