import React, { useState, useEffect } from 'react';
import { NEWS_ITEMS } from '../constants';

interface SurfaceProps {
  onFoodDrop: (x: number, y: number) => void;
}

const Surface: React.FC<SurfaceProps> = ({ onFoodDrop }) => {
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (e.clientY < 120) {
      onFoodDrop(e.clientX, e.clientY);
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full z-[100] cursor-pointer"
      onClick={handleClick}
    >
      {/* News Ticker */}
      <div className="bg-black/80 text-white h-8 flex items-center overflow-hidden border-b border-white/10">
        <div 
          key={newsIndex}
          className="whitespace-nowrap px-4 animate-[newsTickerScroll_15s_linear_infinite] font-mono text-xs uppercase tracking-widest"
        >
          {NEWS_ITEMS[newsIndex]}
        </div>
      </div>

      {/* Sky & Sun */}
      <div className="h-[80px] bg-linear-to-b from-[#87CEEB] to-[#B0E2FF] relative overflow-hidden">
        <div className="absolute top-4 right-12 w-12 h-12 bg-yellow-300 rounded-full shadow-[0_0_30px_#fbbf24] animate-[sunFloat_4s_ease-in-out_infinite]"></div>
        
        {/* Clouds */}
        <div className="absolute top-6 left-[-100px] w-16 h-6 bg-white rounded-full opacity-80 animate-[cloudDrift_25s_linear_infinite]"></div>
        <div className="absolute top-12 left-[-200px] w-24 h-8 bg-white rounded-full opacity-60 animate-[cloudDrift_40s_linear_infinite_5s]"></div>
        <div className="absolute top-4 left-[-150px] w-20 h-7 bg-white rounded-full opacity-70 animate-[cloudDrift_32s_linear_infinite_12s]"></div>
      </div>

      {/* Grass Layer */}
      <div className="h-[40px] bg-[var(--surface-grass)] relative flex items-end justify-around px-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i}
            className="w-1 h-6 bg-[var(--surface-grass)] rounded-t-full origin-bottom animate-[grassSway_3s_ease-in-out_infinite]"
            style={{ 
              animationDelay: `${i * 0.1}s`,
              height: `${15 + Math.random() * 20}px`,
              backgroundColor: i % 3 === 0 ? '#4A7C3F' : i % 3 === 1 ? '#2D5A27' : '#3D6B35'
            }}
          ></div>
        ))}
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white/40 text-[10px] uppercase font-bold tracking-tighter animate-pulse">
            👆 CLICK SURFACE TO DROP FOOD
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surface;
