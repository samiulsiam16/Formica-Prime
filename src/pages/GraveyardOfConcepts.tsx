import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REJECTED_CONCEPTS } from '../constants';
import { RejectedConcept } from '../types';
import Ant from '../components/Ant';

const GraveyardOfConcepts: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<RejectedConcept | null>(null);

  return (
    <div className="min-h-screen bg-[#0D0705] p-8 md:p-16 relative overflow-hidden">
      {/* Bioluminescent Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-64 h-64 rounded-full blur-[100px]"
            style={{ 
              backgroundColor: i % 2 === 0 ? '#3B82F6' : '#10B981',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2
            }}
          />
        ))}
      </div>

      {/* Fireflies */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full shadow-[0_0_5px_#fff]"
            style={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bangers text-blue-300 mb-4 tracking-widest">
            THE GRAVEYARD OF CONCEPTS
          </h1>
          <p className="text-xl font-mono text-blue-200/40 italic">
            "ABANDON ALL HOPE (NOT REALLY) (MAYBE A LITTLE)"
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-24">
          {REJECTED_CONCEPTS.map((concept, i) => (
            <Tombstone 
              key={concept.id} 
              concept={concept} 
              index={i} 
              onClick={() => setSelectedConcept(concept)}
            />
          ))}
        </div>

        {/* Special Tombstone */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 flex flex-col items-center"
        >
          <div className="relative group cursor-help">
            <div className="absolute -inset-8 bg-amber-500/20 blur-2xl rounded-full animate-pulse" />
            <svg width="120" height="160" viewBox="0 0 120 160" className="relative">
              <path d="M 10 160 L 10 40 Q 10 0 60 0 Q 110 0 110 40 L 110 160 Z" fill="#2C1A0E" stroke="#FFD700" strokeWidth="4" />
              <text x="60" y="60" textAnchor="middle" fill="#FFD700" className="font-bangers text-xl">THE NEXT</text>
              <text x="60" y="90" textAnchor="middle" fill="#FFD700" className="font-bangers text-xl">GREAT IDEA</text>
              <text x="60" y="130" textAnchor="middle" fill="#FFD700" className="font-mono text-[10px]" opacity="0.6">NOT YET BORN.</text>
              <text x="60" y="145" textAnchor="middle" fill="#FFD700" className="font-mono text-[10px]" opacity="0.6">COMING SOON.</text>
            </svg>
          </div>
        </motion.div>

        {/* Historian Ant */}
        <div className="mt-32 flex flex-col items-center">
          <Ant type="historian" mood="neutral" size="lg" />
          <p className="text-blue-200/20 font-mono text-sm mt-4">THE HISTORIAN IS TAKING NOTES ON OUR FAILURES.</p>
        </div>
      </div>

      {/* Concept Modal */}
      <AnimatePresence>
        {selectedConcept && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedConcept(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#2C1A0E] border-4 border-blue-400 p-8 rounded-2xl max-w-lg w-full shadow-[0_0_50px_rgba(59,130,246,0.3)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bangers text-blue-300 mb-2">{selectedConcept.title}</h2>
                <p className="text-red-400 font-mono italic">{selectedConcept.causeOfDeath}</p>
              </div>
              
              <div className="aspect-video bg-[#1A0F08] rounded-lg border-2 border-white/10 flex items-center justify-center overflow-hidden relative">
                <MockupPreview type={selectedConcept.mockupType} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">REJECTED ARTIFACT #00{selectedConcept.id}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedConcept(null)}
                className="w-full mt-8 bg-blue-500 text-white font-bangers py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                CLOSE VAULT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tombstone: React.FC<{ concept: RejectedConcept; index: number; onClick: () => void }> = ({ concept, index, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        {/* Ghost Ant */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            delay: index * 0.5
          }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className={index === 2 ? 'relative' : ''}>
            <Ant type="worker" mood="neutral" size="sm" className="opacity-50 invert brightness-200 grayscale" />
            {index === 2 && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">🧙‍♂️</div>
            )}
          </div>
        </motion.div>

        {/* Stone SVG */}
        <svg width="100" height="120" viewBox="0 0 100 120" className="group-hover:scale-105 transition-transform duration-300">
          <defs>
            <radialGradient id={`glow-${concept.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.circle 
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            cx="50" cy="60" r="40" fill={`url(#glow-${concept.id})`} 
            className="hidden group-hover:block"
          />
          <path d="M 10 120 L 10 30 Q 10 0 50 0 Q 90 0 90 30 L 90 120 Z" fill="#1A0F08" stroke="#3D200E" strokeWidth="2" />
          <text x="50" y="45" textAnchor="middle" fill="#3D200E" className="font-bangers text-xl">R.I.P.</text>
          <text x="50" y="75" textAnchor="middle" fill="#3D200E" className="font-mono text-[8px]" opacity="0.8">{concept.title}</text>
        </svg>
      </div>
    </motion.div>
  );
};

const MockupPreview: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'logo':
      return (
        <div className="w-32 h-32 border-4 border-dashed border-white/20 flex items-center justify-center rotate-12">
          <div className="text-4xl font-bold text-white/10">BAD LOGO</div>
        </div>
      );
    case 'gradient':
      return <div className="w-full h-full bg-gradient-to-br from-pink-500 via-yellow-500 to-cyan-500 opacity-30" />;
    case 'mascot':
      return (
        <div className="text-8xl grayscale opacity-20 animate-bounce">
          👹
        </div>
      );
    case 'website':
      return (
        <div className="w-full p-4 space-y-2 opacity-20">
          <div className="h-4 bg-white/20 w-3/4" />
          <div className="h-20 bg-white/10 w-full" />
          <div className="flex gap-2">
            <div className="h-12 bg-white/10 w-1/3" />
            <div className="h-12 bg-white/10 w-1/3" />
            <div className="h-12 bg-white/10 w-1/3" />
          </div>
          <div className="text-[8px] font-mono text-center">🔊 [AUTOPLAYING LOUD JAZZ]</div>
        </div>
      );
    default:
      return <div className="w-24 h-24 bg-white/5 rounded-full border-2 border-white/10" />;
  }
};

export default GraveyardOfConcepts;
