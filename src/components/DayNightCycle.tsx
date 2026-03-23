import React, { useEffect, useState } from 'react';

const DayNightCycle: React.FC = () => {
  const [isNight, setIsNight] = useState(false);
  const [time, setTime] = useState(0); // 0 to 480 seconds (8 minutes)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev + 1) % 480);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Night is from 240 to 480 seconds
    const night = time >= 240;
    if (night !== isNight) {
      setIsNight(night);
      document.body.classList.toggle('night-mode', night);
    }
  }, [time, isNight]);

  return (
    <div className={`day-night-overlay ${isNight ? 'night-mode' : ''}`}>
      {/* Time Indicator */}
      <div className="fixed top-4 right-4 z-[2000] bg-black/60 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-3">
        <span className="text-xl">{isNight ? '🌙' : '☀️'}</span>
        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--amber-glow)] transition-all duration-1000" 
            style={{ width: `${(time / 480) * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default DayNightCycle;
