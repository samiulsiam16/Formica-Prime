import React, { useState, useEffect, useRef } from 'react';
import { AntType, Mood } from '../types';
import { ANT_DIALOGUES } from '../constants';

interface AntProps {
  type: AntType;
  initialMood?: Mood;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Ant: React.FC<AntProps> = ({ type, initialMood = 'calm', className = '', style = {}, onMouseEnter, onMouseLeave }) => {
  const [mood, setMood] = useState<Mood>(initialMood);
  const [speech, setSpeech] = useState<string | null>(null);
  const [facing, setFacing] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);
  const antRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMood(initialMood);
  }, [initialMood]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mood === 'calm' && Math.random() > 0.8) {
        const dialogues = ANT_DIALOGUES[type];
        setSpeech(dialogues[Math.floor(Math.random() * dialogues.length)]);
        setTimeout(() => setSpeech(null), 3000);
      }
    }, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, [type, mood]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!antRef.current) return;
      const rect = antRef.current.getBoundingClientRect();
      const antX = rect.left + rect.width / 2;
      const antY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - antX, e.clientY - antY);
      
      if (dist < 200) {
        setIsNear(true);
        setMousePos({ x: (e.clientX - antX) / 10, y: (e.clientY - antY) / 10 });
        if (e.clientX < antX) setFacing(-1);
        else setFacing(1);
      } else {
        setIsNear(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getBodyColor = () => {
    switch (type) {
      case 'worker': return 'var(--worker-orange)';
      case 'creative': return 'var(--creative-purple)';
      case 'queen': return 'var(--queen-gold)';
      case 'strategy': return 'var(--strategy-blue)';
      case 'reporter': return 'var(--reporter-yellow)';
      case 'merchant': return 'var(--merchant-green)';
      case 'motion': return '#EC4899';
      case 'tiny': return '#F9A8D4';
      default: return 'var(--worker-orange)';
    }
  };

  const headOffset = isNear ? { x: mousePos.x, y: mousePos.y } : { x: 0, y: 0 };

  return (
    <div 
      ref={antRef}
      className={`ant ant-${type} mood-${mood} ${className} relative inline-block transition-transform duration-300`}
      style={{ 
        ...style, 
        transform: `${(style as any).transform || ''} scaleX(${facing})`,
        width: type === 'tiny' ? '42px' : '60px',
        height: type === 'tiny' ? '56px' : '80px'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {speech && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white p-3 rounded-2xl border-2 border-black z-50 animate-[speechBubblePop_0.3s_ease-out_forwards] min-w-[140px] shadow-xl">
          <p className="speech-bubble-text text-center m-0 leading-tight text-black font-bold text-xs">{speech}</p>
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
        </div>
      )}

      <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg overflow-visible">
        {/* Shadow */}
        <ellipse cx="50" cy="130" rx="25" ry="8" fill="black" opacity="0.2" />

        {/* Legs - Segmented */}
        <g stroke="#1A0F08" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Left Legs */}
          <path d="M35 65 Q20 55 10 75" className="animate-[legWiggle_0.5s_infinite]" />
          <path d="M35 75 Q15 75 5 95" className="animate-[legWiggle_0.5s_infinite_0.1s]" />
          <path d="M35 85 Q20 105 15 125" className="animate-[legWiggle_0.5s_infinite_0.2s]" />
          
          {/* Right Legs */}
          <path d="M65 65 Q80 55 90 75" className="animate-[legWiggle_0.5s_infinite_0.15s]" />
          <path d="M65 75 Q85 75 95 95" className="animate-[legWiggle_0.5s_infinite_0.25s]" />
          <path d="M65 85 Q80 105 85 125" className="animate-[legWiggle_0.5s_infinite_0.35s]" />
        </g>
        
        {/* Abdomen - Large back part */}
        <ellipse cx="50" cy="105" rx="24" ry="32" fill={getBodyColor()} stroke="#1A0F08" strokeWidth="2.5" />
        {/* Abdomen Details */}
        <path d="M35 95 Q50 90 65 95" stroke="black" strokeWidth="1" opacity="0.2" fill="none" />
        <path d="M32 110 Q50 105 68 110" stroke="black" strokeWidth="1" opacity="0.2" fill="none" />
        
        {/* Thorax - Middle part */}
        <ellipse cx="50" cy="70" rx="18" ry="14" fill={getBodyColor()} stroke="#1A0F08" strokeWidth="2.5" />

        {/* Head Group - Moves with mouse */}
        <g style={{ transform: `translate(${headOffset.x}px, ${headOffset.y}px)` }} className="transition-transform duration-100">
          {/* Antennae */}
          <g fill="none" stroke="#1A0F08" strokeWidth="2.5" strokeLinecap="round">
            <path d="M40 25 Q30 0 15 10" className="animate-[antennaeWiggle_2s_infinite]" />
            <path d="M60 25 Q70 0 85 10" className="animate-[antennaeWiggle_2.2s_infinite]" />
          </g>

          {/* Mandibles */}
          <path d="M42 50 Q45 60 40 65" fill="none" stroke="#1A0F08" strokeWidth="2.5" />
          <path d="M58 50 Q55 60 60 65" fill="none" stroke="#1A0F08" strokeWidth="2.5" />

          {/* Head Shape */}
          <ellipse cx="50" cy="38" rx="26" ry="24" fill={getBodyColor()} stroke="#1A0F08" strokeWidth="2.5" />
          
          {/* Eyes */}
          <g>
            <ellipse cx="38" cy="34" rx="8" ry="10" fill="white" stroke="#1A0F08" strokeWidth="1" />
            <circle cx={38 + headOffset.x * 0.2} cy={34 + headOffset.y * 0.2} r="4" fill="black" />
            <circle cx={36 + headOffset.x * 0.2} cy={32 + headOffset.y * 0.2} r="1.5" fill="white" />

            <ellipse cx="62" cy="34" rx="8" ry="10" fill="white" stroke="#1A0F08" strokeWidth="1" />
            <circle cx={62 + headOffset.x * 0.2} cy={34 + headOffset.y * 0.2} r="4" fill="black" />
            <circle cx={60 + headOffset.x * 0.2} cy={32 + headOffset.y * 0.2} r="1.5" fill="white" />
          </g>

          {/* Type Specific Accessories */}
          {type === 'queen' && (
            <g>
              <path d="M30 18 L35 5 L50 15 L65 5 L70 18 Z" fill="#FFD700" stroke="#1A0F08" strokeWidth="1.5" />
              <circle cx="50" cy="10" r="2" fill="red" />
            </g>
          )}

          {type === 'creative' && (
            <g>
              <ellipse cx="50" cy="15" rx="22" ry="10" fill="#2C1A0E" />
              <path d="M65 15 L70 5" stroke="#2C1A0E" strokeWidth="2" />
            </g>
          )}

          {type === 'strategy' && (
            <g stroke="#1A0F08" strokeWidth="1.5" fill="none">
              <circle cx="38" cy="34" r="11" />
              <circle cx="62" cy="34" r="11" />
              <path d="M49 34 L51 34" />
            </g>
          )}

          {type === 'reporter' && (
            <g>
              <rect x="35" y="10" width="30" height="15" fill="#E5E7EB" stroke="#1A0F08" strokeWidth="1.5" />
              <rect x="35" y="20" width="30" height="5" fill="#3B82F6" />
              <text x="40" y="20" fontSize="6" fontWeight="bold" fill="black">PRESS</text>
            </g>
          )}
        </g>

        {/* Body Accessories */}
        {type === 'worker' && (
          <g transform="translate(65, 60) rotate(10)">
            <rect x="0" y="0" width="20" height="15" fill="#4B5563" rx="2" stroke="#1A0F08" strokeWidth="1" />
            <rect x="2" y="2" width="16" height="11" fill="#1F2937" />
            <circle cx="10" cy="13" r="1" fill="#10B981" />
          </g>
        )}

        {type === 'creative' && (
          <g transform="translate(70, 60) rotate(-20)">
            <path d="M0 0 L25 0" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
            <path d="M25 0 L30 -5" stroke="#D1D5DB" strokeWidth="6" strokeLinecap="round" />
            <circle cx="28" cy="-3" r="2" fill="#EC4899" />
          </g>
        )}

        {type === 'merchant' && (
          <g transform="translate(30, 90)">
            <rect x="0" y="0" width="40" height="25" fill="#92400E" rx="4" stroke="#1A0F08" strokeWidth="1.5" />
            <path d="M10 5 L30 5 M10 10 L30 10 M10 15 L30 15" stroke="white" strokeWidth="1" opacity="0.3" />
            <text x="15" y="18" fontSize="10" fill="#FCD34D" fontWeight="bold">$</text>
          </g>
        )}

        {type === 'queen' && (
          <path d="M15 65 Q50 150 85 65" fill="url(#queenRobeGradient)" opacity="0.9" stroke="#4A0072" strokeWidth="1" />
        )}
      </svg>

      <defs>
        <linearGradient id="queenRobeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B21A8" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
    </div>
  );
};

export default Ant;
