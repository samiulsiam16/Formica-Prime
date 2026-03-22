import React from 'react';

const TunnelNetwork: React.FC = () => {
  return (
    <svg 
      className="fixed inset-0 w-full h-full pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="tunnelGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="var(--amber-glow)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--amber-glow)" stopOpacity="0" />
        </radialGradient>
        <filter id="innerShadow">
          <feOffset dx="0" dy="0" />
          <feGaussianBlur stdDeviation="3" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.5" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComponentAlpha in="shadow" result="shadow-alpha" />
          <feGaussianBlur stdDeviation="2" in="shadow-alpha" result="shadow-blur" />
          <feComposite operator="over" in="shadow-blur" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* Main Tunnels */}
      <path 
        d="M 500 0 Q 520 200 500 400 Q 480 600 500 800 Q 520 1000 500 1200" 
        fill="none" stroke="var(--tunnel-inner)" strokeWidth="60" strokeLinecap="round" filter="url(#innerShadow)"
      />
      
      <path 
        d="M 0 400 Q 250 380 500 400 Q 750 420 1000 400" 
        fill="none" stroke="var(--tunnel-inner)" strokeWidth="50" strokeLinecap="round" filter="url(#innerShadow)"
      />

      <path 
        d="M 200 400 Q 180 600 200 800 Q 220 1000 200 1200" 
        fill="none" stroke="var(--tunnel-inner)" strokeWidth="40" strokeLinecap="round" filter="url(#innerShadow)"
      />

      <path 
        d="M 800 400 Q 820 600 800 800 Q 780 1000 800 1200" 
        fill="none" stroke="var(--tunnel-inner)" strokeWidth="40" strokeLinecap="round" filter="url(#innerShadow)"
      />

      {/* Junction Glows */}
      <circle cx="500" cy="400" r="60" fill="url(#tunnelGlow)" />
      <circle cx="200" cy="400" r="40" fill="url(#tunnelGlow)" />
      <circle cx="800" cy="400" r="40" fill="url(#tunnelGlow)" />

      {/* Root Structures */}
      <g stroke="#2C1A0E" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 100 80 Q 110 150 90 250" />
        <path d="M 90 250 Q 70 300 100 350" />
        <path d="M 300 80 Q 280 180 310 280" />
        <path d="M 700 80 Q 720 200 690 320" />
        <path d="M 900 80 Q 910 160 880 240" />
      </g>
    </svg>
  );
};

export default TunnelNetwork;
