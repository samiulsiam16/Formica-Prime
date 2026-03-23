import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AntType, Mood } from '../types';
import { carryItemSVGs, antCarryingItems } from '../services/AntSocialSystem';

interface AntProps {
  type: AntType;
  mood?: Mood;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
  page?: string;
}

const Ant: React.FC<AntProps> = ({ 
  type, 
  mood = 'neutral', 
  size = 'md', 
  className = '', 
  id = Math.random().toString(36).substr(2, 9),
  page = 'home'
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isMuralMode, setIsMuralMode] = useState(false);
  const [isRoyalMode, setIsRoyalMode] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showDialogue, setShowDialogue] = useState<string | null>(null);

  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount + 1 >= 10) {
      triggerSpecialInteraction();
      setClickCount(0);
    }
  };

  const triggerSpecialInteraction = () => {
    switch (type) {
      case 'worker':
        setIsSleeping(true);
        setShowDialogue("Zzz... 5 minute break...");
        setTimeout(() => setIsSleeping(false), 5000);
        break;
      case 'creative':
        setIsMuralMode(true);
        setShowDialogue("MURAL TIME!");
        setTimeout(() => setIsMuralMode(false), 5000);
        break;
      case 'strategy':
        setIsThinking(true);
        setShowDialogue("E = MC^CRUMB");
        setTimeout(() => setIsThinking(false), 5000);
        break;
      case 'queen':
        setIsRoyalMode(true);
        setShowDialogue("ALL HAIL!");
        setTimeout(() => setIsRoyalMode(false), 5000);
        break;
    }
  };

  const carriedItem = antCarryingItems[page]?.[type];

  return (
    <div 
      className={`ant-agent relative cursor-pointer group select-none ${className} ${sizeMap[size]}`}
      data-ant-id={id}
      data-ant-type={type}
      onClick={handleClick}
    >
      <AnimatePresence>
        {showDialogue && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black px-3 py-1 rounded-full text-[10px] font-bold shadow-lg z-20"
          >
            {showDialogue}
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        animate={isSleeping ? { rotate: 90, opacity: 0.7 } : {}}
        className="relative w-full h-full"
      >
        {/* Ant Body SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Ant Legs */}
          <motion.g 
            animate={{ rotate: isSleeping ? 0 : [0, 5, -5, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            <path d="M 30 60 L 10 80" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M 50 65 L 50 90" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M 70 60 L 90 80" stroke="currentColor" strokeWidth="4" fill="none" />
          </motion.g>

          {/* Ant Segments */}
          <circle cx="30" cy="50" r="15" fill="currentColor" />
          <circle cx="55" cy="45" r="12" fill="currentColor" />
          <circle cx="75" cy="40" r="18" fill="currentColor" />

          {/* Ant Eyes */}
          <circle cx="25" cy="45" r="3" fill="white" />
          <circle cx="35" cy="45" r="3" fill="white" />
          
          {/* Ant Antennae */}
          <path d="M 25 35 Q 20 20 10 15" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M 35 35 Q 40 20 50 15" stroke="currentColor" strokeWidth="2" fill="none" />

          {/* Special Decorations */}
          {type === 'queen' && (
            <path d="M 20 30 L 30 15 L 40 30 Z" fill="#FFD700" filter="url(#glow)" />
          )}
          {type === 'creative' && (
            <circle cx="55" cy="45" r="6" fill="#8B5CF6" opacity="0.5" />
          )}
          {type === 'strategy' && (
            <rect x="22" y="42" width="16" height="6" rx="1" fill="#3B82F6" opacity="0.3" />
          )}
        </svg>

        {/* Carried Item */}
        {carriedItem && !isSleeping && (
          <motion.div 
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none"
            dangerouslySetInnerHTML={{ __html: carryItemSVGs[carriedItem] }}
          />
        )}

        {/* Special Effects */}
        {isRoyalMode && (
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl"
          />
        )}
        {isThinking && (
          <div className="absolute -top-8 right-0 text-xl">💡</div>
        )}
        {isMuralMode && (
          <div className="absolute -top-8 left-0 text-xl">🎨</div>
        )}
      </motion.div>
    </div>
  );
};

export default Ant;
