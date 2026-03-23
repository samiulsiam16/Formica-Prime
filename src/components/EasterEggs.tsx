import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const KonamiCode: React.FC = () => {
  const [input, setInput] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key].slice(-10);
      setInput(newInput);
      
      if (newInput.join(',') === code.join(',')) {
        triggerKonami();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  const triggerKonami = () => {
    setIsActivated(true);
    setTimeout(() => setIsActivated(false), 10000);
  };

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
        >
          {/* Gold Flash */}
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-amber-400"
          />

          {/* Crumb Rain */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -50, x: Math.random() * window.innerWidth }}
              animate={{ y: window.innerHeight + 50 }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
              className="absolute w-4 h-4 bg-amber-700 rounded-sm"
              style={{ rotate: `${Math.random() * 360}deg` }}
            />
          ))}

          {/* Giant Queen */}
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <div className="text-9xl mb-4">👑</div>
            <div className="bg-white text-black p-6 rounded-3xl text-2xl font-bangers tracking-widest shadow-2xl relative">
              "YOU HAVE FOUND THE ANCIENT CODE. ALL HAIL THE DEVELOPER!"
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 -translate-y-2" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ColonyTyping: React.FC = () => {
  const [typed, setTyped] = useState('');
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newTyped = (typed + e.key).slice(-6).toUpperCase();
      setTyped(newTyped);
      
      if (newTyped === 'COLONY') {
        setIsActivated(true);
        setTimeout(() => setIsActivated(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typed]);

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10001] pointer-events-none"
        >
          <div className="flex gap-8 items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="text-6xl"
              >
                🐜
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-4xl font-bangers text-amber-500 tracking-[1em] animate-pulse">COLONY ALERT!</h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const IdleMode: React.FC = () => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsIdle(false);
    timeoutRef.current = setTimeout(() => setIsIdle(true), 180000); // 3 minutes
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);
    resetTimeout();
    return () => {
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10002] bg-black/90 flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl mb-8"
          >
            💤
          </motion.div>
          <h2 className="text-6xl font-bangers text-white tracking-widest mb-4">CLOSING TIME</h2>
          <p className="text-white/40 font-mono uppercase tracking-[0.5em]">THE COLONY IS ASLEEP. MOVE MOUSE TO WAKE.</p>
          
          <div className="absolute bottom-20 border-4 border-red-500 p-8 rotate-12">
            <span className="text-8xl font-bangers text-red-500">CLOSED</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { useRef } from 'react';
export default KonamiCode;
