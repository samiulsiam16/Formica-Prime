import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { TIMELINE_ENTRIES } from '../constants';
import { TimelineEntry } from '../types';
import Ant from '../components/Ant';

const ArchiveVault: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const soilColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['#5C3D1E', '#4A2810', '#3D200E', '#2C1A0E', '#1A0F08', '#0D0705']
  );

  return (
    <motion.div 
      ref={containerRef}
      style={{ backgroundColor: soilColor }}
      className="min-h-[400vh] relative transition-colors duration-1000"
    >
      {/* Header */}
      <div className="h-screen flex flex-col items-center justify-center text-center p-8 sticky top-0 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bangers text-[#FFD700] mb-4 tracking-widest drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
        >
          THE ARCHIVE VAULT
        </motion.h1>
        <p className="text-xl font-mono text-amber-100/60 max-w-2xl">
          PROCEED WITH CAUTION. THE DEEPER YOU GO, THE FURTHER BACK IN TIME YOU TRAVEL.
        </p>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 text-[#FFD700] text-4xl"
        >
          ↓
        </motion.div>
      </div>

      {/* Timeline Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gradient-to-b from-transparent via-[#FFD700]/30 to-transparent" />

      {/* Timeline Entries */}
      <div className="relative z-10 max-w-6xl mx-auto py-32 space-y-96">
        {TIMELINE_ENTRIES.map((entry, i) => (
          <TimelineItem key={entry.year} entry={entry} index={i} />
        ))}
      </div>

      {/* Footer Ant */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Ant type="historian" mood="neutral" size="lg" />
          <p className="text-amber-100/40 font-mono mt-4">THE HISTORIAN IS WATCHING...</p>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineItem: React.FC<{ entry: TimelineEntry; index: number }> = ({ entry, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`flex items-center justify-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-12`}
    >
      {/* Tablet */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -100 : 100, clipPath: 'inset(50%)' }}
        animate={isInView ? { opacity: 1, x: 0, clipPath: 'inset(0%)' } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 bg-[#2C1A0E] border-4 border-[#8B6914] p-8 rounded-lg relative overflow-hidden group"
      >
        {/* Cracks Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 0 0 L 100 100 M 100 0 L 0 100" stroke="#8B6914" strokeWidth="0.5" />
            <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="#8B6914" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-4xl font-bangers text-[#FFD700] mb-2">{entry.year}</div>
          <h3 className="text-2xl font-bangers text-amber-100 mb-4 tracking-wider">{entry.title}</h3>
          <p className="text-lg font-mono text-amber-100/70 leading-relaxed">{entry.description}</p>
        </div>

        {/* Chisel Animation */}
        <AnimatePresence>
          {isInView && (
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute inset-0 bg-white/10 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.4, type: "spring" }}
        className="w-48 h-48 bg-[#1A0F08] rounded-full border-4 border-[#FFD700]/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.1)]"
      >
        <TimelineIllustration type={entry.illustration} />
      </motion.div>
    </div>
  );
};

const TimelineIllustration: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'laptop':
      return (
        <svg width="60" height="40" viewBox="0 0 20 14" className="text-[#FFD700]">
          <rect x="2" y="1" width="16" height="10" rx="1" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
          <rect x="0" y="11" width="20" height="2" rx="1" fill="currentColor"/>
          <rect x="3" y="2" width="14" height="8" fill="#87CEEB" opacity="0.6"/>
        </svg>
      );
    case 'logo_stack':
      return (
        <div className="relative">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-12 h-12 bg-white/10 border border-white/20 rounded-sm"
              style={{ top: i * -4, left: i * 4, transform: `rotate(${i * 5}deg)` }}
            />
          ))}
          <div className="relative w-12 h-12 bg-[#FFD700] flex items-center justify-center text-[#1A0F08] font-bold">A</div>
        </div>
      );
    case 'counter_100':
      return <div className="text-6xl font-bangers text-[#FFD700]">100</div>;
    default:
      return <Ant type="worker" mood="neutral" size="md" />;
  }
};

export default ArchiveVault;
