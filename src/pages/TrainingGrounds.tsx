import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COLONY_WISDOM } from '../constants';
import Ant from '../components/Ant';

const TrainingGrounds: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [writing, setWriting] = useState(false);
  const [openedFolder, setOpenedFolder] = useState<number | null>(null);

  const handleGetWisdom = () => {
    setIsErasing(true);
    setTimeout(() => {
      setIsErasing(false);
      setCurrentTip(prev => (prev + 1) % COLONY_WISDOM.length);
      setWriting(true);
      setTimeout(() => setWriting(false), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1A0F08] p-8 md:p-16 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#FFD700_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl md:text-7xl font-bangers text-[#FFD700] text-center mb-16 tracking-widest"
      >
        THE TRAINING GROUNDS
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        {/* Brainy's Whiteboard */}
        <div className="relative">
          <div className="bg-white rounded-xl border-8 border-[#6B4226] p-12 shadow-2xl relative min-h-[400px] flex flex-col items-center justify-center">
            {/* Whiteboard Content */}
            <AnimatePresence mode="wait">
              {!isErasing && (
                <motion.div 
                  key={currentTip}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className={`text-3xl md:text-4xl font-mono text-[#1A0F08] font-bold leading-tight ${writing ? 'animate-typewriter' : ''}`}>
                    {COLONY_WISDOM[currentTip].text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Brainy Ant */}
            <div className="absolute -bottom-10 -left-10">
              <Ant type="strategy" mood="neutral" size="lg" />
              <motion.div 
                animate={isErasing ? { x: [0, 100, 0], y: [0, -50, 0] } : {}}
                className="absolute top-0 right-0 w-8 h-8 bg-gray-200 rounded-sm border border-gray-400"
                style={{ display: isErasing ? 'block' : 'none' }}
              />
            </div>

            <button 
              onClick={handleGetWisdom}
              disabled={isErasing || writing}
              className="mt-12 bg-[#FFD700] text-[#1A0F08] font-bangers text-2xl px-8 py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50"
            >
              GET COLONY WISDOM
            </button>
          </div>
          <div className="mt-4 text-center font-mono text-amber-100/40 text-sm">BRAINY'S WHITEBOARD — LIVE TIP GENERATOR</div>
        </div>

        {/* Field Manuals */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bangers text-[#FFD700] border-b-2 border-[#FFD700]/20 pb-4">THE COLONY FIELD MANUAL</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "BRAND BRIEF TEMPLATE — ISSUE 7",
              "COLONY STYLE GUIDE FRAMEWORK",
              "THE 47-POINT LOGO REVIEW CHECKLIST",
              "CAMPAIGN DEBRIEF TEMPLATE"
            ].map((title, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="relative cursor-pointer"
                onClick={() => setOpenedFolder(openedFolder === i ? null : i)}
              >
                <div className={`bg-[#F5E6C8] p-6 rounded-tr-3xl border-2 border-[#8B6914] shadow-lg transition-transform duration-500 origin-bottom ${openedFolder === i ? 'rotate-x-180' : ''}`} style={{ perspective: '1000px' }}>
                  <div className="w-12 h-12 border-4 border-red-900/20 text-red-900/40 flex items-center justify-center font-bold text-xs rotate-12 absolute top-4 right-4">TOP SECRET</div>
                  <h3 className="text-[#8B6914] font-bangers text-xl mt-8">{title}</h3>
                </div>
                <AnimatePresence>
                  {openedFolder === i && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-white p-6 rounded-lg border-2 border-[#FFD700] z-20 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-16 h-16 bg-red-700 text-white flex items-center justify-center font-bold text-xs rotate-[-15deg] mb-4 shadow-lg">DECLASSIFIED</div>
                      <p className="text-[#1A0F08] font-mono text-sm mb-4">PREVIEW OF {title}</p>
                      <button className="bg-[#FFD700] text-[#1A0F08] font-bangers px-4 py-2 rounded text-lg">DOWNLOAD PDF</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Obstacle Course */}
      <div className="mt-32 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bangers text-[#FFD700] text-center mb-12">THE OBSTACLE COURSE</h2>
        <div className="bg-[#2C1A0E] border-4 border-[#6B4226] rounded-2xl p-8 h-[400px] relative overflow-hidden">
          <ObstacleCourse />
        </div>
      </div>
    </div>
  );
};

const ObstacleCourse: React.FC = () => {
  const [pos, setPos] = useState({ x: 50, y: 300 });
  const [currentZone, setCurrentZone] = useState('THE BRIEF');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPos(prev => {
        const next = { ...prev };
        if (e.key === 'ArrowLeft') next.x = Math.max(20, prev.x - 10);
        if (e.key === 'ArrowRight') next.x = Math.min(900, prev.x + 10);
        return next;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (pos.x < 150) setCurrentZone('THE BRIEF');
    else if (pos.x < 300) setCurrentZone('THE FIRST DRAFT');
    else if (pos.x < 450) setCurrentZone('CLIENT FEEDBACK');
    else if (pos.x < 600) setCurrentZone('REVISION HELL');
    else if (pos.x < 750) setCurrentZone('FINAL APPROVAL');
    else setCurrentZone('LAUNCH');
  }, [pos.x]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-12 bg-[#1A0F08]" />
      
      {/* Zones */}
      {[
        { name: 'THE BRIEF', x: 0, joke: 'WATCH FOR: VAGUE DIRECTIONS' },
        { name: 'THE FIRST DRAFT', x: 150, joke: 'DANGER: "MAKE IT POP"' },
        { name: 'CLIENT FEEDBACK', x: 300, joke: '⚠️ ENDLESS LOOP DETECTED' },
        { name: 'REVISION HELL', x: 450, joke: 'FINAL DESTINATION (MAYBE)' },
        { name: 'FINAL APPROVAL', x: 600, joke: 'ALMOST THERE...' },
        { name: 'LAUNCH', x: 750, joke: 'SUCCESS!' }
      ].map((zone, i) => (
        <div key={i} className="absolute bottom-12 h-64 border-l border-white/10 p-4" style={{ left: zone.x, width: 150 }}>
          <div className="text-[10px] font-mono text-amber-100/40 mb-2">{zone.name}</div>
          <div className="bg-[#1A0F08] p-2 rounded border border-amber-100/10 text-[8px] font-mono text-amber-100/60">{zone.joke}</div>
        </div>
      ))}

      {/* Ant Player */}
      <motion.div 
        animate={{ x: pos.x, y: pos.y }}
        className="absolute z-10"
      >
        <Ant type="worker" mood="hurried" size="md" />
      </motion.div>

      {/* HUD */}
      <div className="absolute top-4 right-4 bg-black/40 p-4 rounded-lg border border-white/10 backdrop-blur-sm">
        <div className="text-xs font-mono text-amber-100/60 mb-1">CURRENT PHASE:</div>
        <div className="text-xl font-bangers text-[#FFD700]">{currentZone}</div>
        <div className="text-[10px] font-mono text-amber-100/40 mt-2">USE ARROW KEYS TO NAVIGATE WORKFLOW</div>
      </div>
    </div>
  );
};

export default TrainingGrounds;
