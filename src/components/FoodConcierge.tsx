import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, X, Mic, Volume2 } from 'lucide-react';
import { aiService } from '../services/ai';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

function Avatar3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#D4AF37" />
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
           <Sphere args={[1, 64, 64]} scale={1.2}>
              <MeshDistortMaterial
                color="#D4AF37"
                speed={4}
                distort={0.3}
                radius={1}
                metalness={1}
                roughness={0.1}
                wireframe
              />
           </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

interface Message {
  role: 'bot' | 'user';
  text: string;
}

export default function FoodConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Welcome to the future of dining. I am G-Astra, your neural hospitality coordinator. How may I optimize your evening?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const result = await aiService.getRecommendations(userMessage);
    
    setIsTyping(false);
    if (result.error) {
      setMessages(prev => [...prev, { role: 'bot', text: result.error }]);
    } else if (!result.recommendations || result.recommendations.length === 0) {
      setMessages(prev => [...prev, { role: 'bot', text: "The Metagrid yielded no matches for that signature. Try adjusting your parameters." }]);
    } else {
      const respLines = result.recommendations.map((r: any) => `* **${r.dish}** @ *${r.restaurant}*\n  > ${r.reason}`).join('\n\n');
      const formattedResponse = `### PROCESSED RECOMMENDATION\n\n${respLines}\n\n---\n*${result.summary}*`;
      setMessages(prev => [...prev, { role: 'bot', text: formattedResponse }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 glass-card bg-onyx text-gold flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <div className="absolute inset-0 bg-gold blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
        <Bot className="w-8 h-8 relative z-10" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center border-2 border-onyx">
           <div className="w-1.5 h-1.5 bg-onyx rounded-full animate-ping" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            className="fixed bottom-28 left-8 w-full max-w-[450px] h-[700px] glass-card flex flex-col z-50 overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
          >
            {/* 3D Avatar Header */}
            <div className="h-48 bg-gradient-to-b from-white/10 to-transparent relative overflow-hidden">
               <Avatar3D />
               <div className="absolute inset-0 bg-onyx/20 backdrop-blur-[2px]" />
               <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="w-3 h-3 bg-gold rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Neural Link Active</span>
               </div>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 opacity-40 hover:opacity-100" />
               </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={cn("flex gap-4", m.role === 'user' && "flex-row-reverse")}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border",
                    m.role === 'bot' ? "bg-onyx border-gold/30 text-gold" : "bg-gold border-onyx text-onyx"
                  )}>
                    {m.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed border",
                    m.role === 'bot' ? "bg-white/5 border-white/10" : "bg-gold text-onyx border-gold"
                  )}>
                    <div className="markdown-content prose prose-invert prose-sm">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-onyx border border-gold/30 text-gold flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-3xl text-[10px] font-mono uppercase tracking-widest text-gold italic">
                    Analyzing Metagrid...
                  </div>
                </div>
              )}
            </div>

            {/* Input Surface */}
            <div className="p-6 bg-white/5 border-t border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gold/5 blur-3xl" />
              <div className="flex gap-3 relative z-10">
                <div className="flex-1 relative">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe your mood or craving..."
                    className="w-full neo-input bg-onyx/50 border-white/10 text-sm focus:border-gold/50"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button className="p-2 hover:text-gold opacity-40 hover:opacity-100 transition-all">
                       <Mic size={18} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  className="w-14 h-14 bg-gold text-onyx rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
                 {['Trending Nearby', 'Date Night', 'Late Night Sushi', 'High Protein'].map(suggestion => (
                   <button 
                     key={suggestion}
                     onClick={() => setInput(suggestion)}
                     className="whitespace-nowrap px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-widest hover:border-gold transition-colors opacity-60 hover:opacity-100"
                   >
                     {suggestion}
                   </button>
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
