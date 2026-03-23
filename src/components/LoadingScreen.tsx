import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('DIGGING TUNNELS...');
  const [show, setShow] = useState(true);

  const statuses = [
    'DIGGING TUNNELS...',
    'REINFORCING WALLS...',
    'GATHERING CRUMBS...',
    'WAKING UP THE QUEEN...',
    'SHARPENING MANDIBLES...',
    'CONSULTING THE ARCHIVES...',
    'ORGANIZING THE WORKERS...',
    'PREPARING THE THRONE...',
    'ALMOST THERE...',
    'COLONY READY.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShow(false), 500);
          return 100;
        }
        const next = prev + Math.random() * 15;
        const statusIndex = Math.min(
          Math.floor((next / 100) * statuses.length),
          statuses.length - 1
        );
        setStatus(statuses[statusIndex]);
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[#1A0F08] flex flex-col items-center justify-center p-8"
        >
          {/* Digging Ant Animation */}
          <div className="relative w-48 h-48 mb-12">
            <motion.div 
              animate={{ 
                x: [-20, 20, -20],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-8xl flex items-center justify-center"
            >
              🐜
            </motion.div>
            
            {/* Dirt Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                  opacity: [1, 0],
                  scale: [1, 0]
                }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#3D200E] rounded-full"
              />
            ))}
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-amber-500 font-bangers text-2xl tracking-widest">{status}</span>
              <span className="text-amber-500/40 font-mono text-sm">{Math.floor(progress)}%</span>
            </div>
            
            <div className="h-4 bg-black/40 rounded-full overflow-hidden border-2 border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-amber-700 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              />
            </div>
            
            <p className="text-center text-white/20 font-mono text-[10px] uppercase tracking-[0.3em] mt-8">
              ANT COLONY CREATIVE AGENCY © 2026
            </p>
          </div>

          {/* Background Texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
