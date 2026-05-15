import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  language: 'en' | 'hi' | 'te';
  setLanguage: (lang: 'en' | 'hi' | 'te') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  totalItems: number;
  totalPrice: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  const changeLanguage = (lang: 'en' | 'hi' | 'te') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, 
      language, setLanguage: changeLanguage, theme, setTheme,
      totalItems, totalPrice
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
