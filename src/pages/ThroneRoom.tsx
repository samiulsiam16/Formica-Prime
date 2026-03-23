import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ROYAL_CLIENTS } from '../constants';
import { AntType } from '../types';
import Ant from '../components/Ant';

const ThroneRoom: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [stamping, setStamping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStamping(true);
      setTimeout(() => setStamping(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCrownClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 5) {
      setShowEasterEgg(true);
      setClickCount(0);
      setTimeout(() => setShowEasterEgg(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0F08] relative overflow-hidden p-8 md:p-16">
      {/* Stained Glass Window */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 opacity-40 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
          <defs>
            <radialGradient id="glassGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#2C1A0E" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="48" fill="none" stroke="url(#glassGrad)" strokeWidth="0.5" />
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d="M 50 50 L 50 2 L 60 10 Z"
              fill={i % 2 === 0 ? '#FFD700' : '#8B5CF6'}
              transform={`rotate(${i * 30} 50 50)`}
              opacity="0.6"
            />
          ))}
        </svg>
        <div className="absolute inset-0 blur-3xl bg-amber-500/20 rounded-full" />
      </div>

      {/* Gold Veins */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"
            style={{
              top: `${i * 15}%`,
              left: '-20%',
              width: '140%',
              transform: 'rotate(15deg)',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bangers text-[#FFD700] text-center mb-12 tracking-widest"
        >
          THE QUEEN'S THRONE ROOM
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Royal Clientele Tablet */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#2C1A0E] border-4 border-[#FFD700] p-8 rounded-lg shadow-[0_0_30px_rgba(255,215,0,0.2)] relative"
          >
            <h2 className="text-3xl font-bangers text-[#FFD700] mb-6 text-center border-b-2 border-[#FFD700]/30 pb-4">
              ROYAL CLIENTELE
            </h2>
            <ul className="space-y-4">
              {ROYAL_CLIENTS.map((client, i) => (
                <motion.li 
                  key={client}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-xl font-mono text-amber-200/80 italic flex items-center gap-3"
                >
                  <span className="text-[#FFD700]">✦</span> {client}
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 text-center">
              <p className="text-amber-100/60 mb-4 font-mono text-sm">INTERESTED IN JOINING THE ROYAL ROSTER?</p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,215,0,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFD700] text-[#1A0F08] font-bangers text-2xl px-8 py-3 rounded-full"
                onClick={() => window.location.hash = '#contact?subject=ROYAL CLIENT INQUIRY'}
              >
                APPLY FOR AUDIENCE
              </motion.button>
            </div>
          </motion.div>

          {/* The Queen and Scribe */}
          <div className="relative h-96 flex flex-col items-center justify-center">
            {/* Red Carpet */}
            <div className="absolute bottom-0 w-32 h-64 bg-red-900/40 blur-sm rounded-t-full -z-10" />
            
            <div className="relative group">
              <div 
                className="cursor-pointer"
                onClick={handleCrownClick}
              >
                <Ant 
                  type="queen" 
                  mood="commanding" 
                  size="lg"
                  className="scale-150"
                />
              </div>
              
              {/* Contract Scroll */}
              <motion.div 
                animate={{ rotate: stamping ? [0, -5, 0] : 0 }}
                className="absolute -bottom-10 -right-10 w-24 h-32 bg-[#F5E6C8] border-2 border-[#8B6914] rounded-sm p-2 origin-top-left"
              >
                <div className="w-full h-full border border-[#8B6914]/30 flex flex-col gap-1 overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-px bg-[#8B6914]/40 w-full" />
                  ))}
                  <AnimatePresence>
                    {stamping && (
                      <motion.div 
                        initial={{ scale: 2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-2 right-2 w-6 h-6 bg-red-700 rounded-full border-2 border-red-900 shadow-inner"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Royal Scribe */}
            <div className="absolute bottom-0 right-0">
              <Ant type="scribe" mood="neutral" size="sm" />
              <div className="text-[8px] font-mono text-amber-100/40 mt-1">ROYAL SCRIBE</div>
            </div>

            {/* Royal Guards */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-24">
              <RoyalGuard side="left" />
              <RoyalGuard side="left" />
              <RoyalGuard side="left" />
            </div>
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col gap-24">
              <RoyalGuard side="right" />
              <RoyalGuard side="right" />
              <RoyalGuard side="right" />
            </div>
          </div>
        </div>
      </div>

      {/* Easter Egg Overlay */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-[#FFD700] text-[#1A0F08] p-12 rounded-3xl border-8 border-white shadow-[0_0_100px_#FFD700] text-center"
            >
              <h3 className="text-6xl font-bangers mb-4">I SEE YOU.</h3>
              <p className="text-2xl font-mono font-bold">YOU FOUND THE THRONE ROOM. CLEVER. YOU ARE HIRED. (CONDITIONS APPLY.)</p>
            </motion.div>
            <Confetti />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RoyalGuard: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const [saluting, setSaluting] = useState(false);

  return (
    <motion.div 
      onViewportEnter={() => {
        setSaluting(true);
        setTimeout(() => setSaluting(false), 2000);
      }}
      className="relative"
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-t-full border border-gray-600" />
      <Ant 
        type="guard" 
        mood="alert" 
        size="md" 
        className={side === 'right' ? 'scale-x-[-1]' : ''}
        style={{ animation: saluting ? 'salute 0.5s ease infinite' : 'none' }}
      />
    </motion.div>
  );
};

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          top: '50%', 
          left: '50%', 
          scale: 0,
          rotate: 0
        }}
        animate={{ 
          top: `${Math.random() * 100}%`, 
          left: `${Math.random() * 100}%`, 
          scale: Math.random() * 1.5,
          rotate: Math.random() * 360
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute w-4 h-4"
        style={{ backgroundColor: ['#FFD700', '#8B5CF6', '#FF6B35', '#FFFFFF'][i % 4] }}
      />
    ))}
  </div>
);

export default ThroneRoom;
