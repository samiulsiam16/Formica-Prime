import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const MobileSwipeNavigation: React.FC = () => {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showIndicator, setShowIndicator] = useState(false);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe || isRightSwipe) {
      handleSwipe(isLeftSwipe ? 'left' : 'right');
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const paths = ['/', '/portfolio', '/services', '/blog', '/contact', '/archive', '/training', '/graveyard', '/colony'];
    const currentPath = window.location.pathname;
    const currentIndex = paths.indexOf(currentPath);
    
    let nextIndex = currentIndex;
    if (direction === 'left') {
      nextIndex = (currentIndex + 1) % paths.length;
    } else {
      nextIndex = (currentIndex - 1 + paths.length) % paths.length;
    }
    
    navigate(paths[nextIndex]);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowIndicator(true), 2000);
    const hideTimer = setTimeout(() => setShowIndicator(false), 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[40] md:hidden pointer-events-auto"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence>
        {showIndicator && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-24 right-8 flex flex-col items-center gap-2 pointer-events-none"
          >
            <div className="flex gap-4">
              <motion.div 
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl"
              >
                👈
              </motion.div>
              <motion.div 
                animate={{ x: [10, -10, 10] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl"
              >
                👉
              </motion.div>
            </div>
            <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">SWIPE TO TUNNEL</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSwipeNavigation;
