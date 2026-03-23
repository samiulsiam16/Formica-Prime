import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MultiStepForm from '../components/MultiStepForm';
import Ant from '../components/Ant';

const Contact: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A0F08] p-8 md:p-16 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bangers text-amber-500 mb-6 tracking-widest">THE DIG</h1>
          <p className="text-xl font-mono text-amber-200/40 uppercase tracking-[0.5em]">READY TO START YOUR NEXT BIG PROJECT?</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-[#2C1A0E] border-2 border-white/5 p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bangers text-white mb-4 tracking-widest">THE ROYAL APPLICATION</h3>
              <p className="text-white/60 font-mono text-sm leading-relaxed mb-8">
                EVERY PROJECT STARTS WITH A SINGLE DIG. OUR MULTI-STEP APPLICATION PROCESS ENSURES YOUR VISION IS HEARD BY THE QUEEN HERSELF.
              </p>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="w-full bg-amber-500 text-black font-bangers py-4 rounded-2xl text-xl tracking-widest hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                BEGIN THE DIG
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                <span className="text-3xl mb-2 block">📍</span>
                <span className="text-amber-500 font-mono text-xs block mb-1">LOCATION</span>
                <span className="text-white font-mono text-sm">DEEP UNDERGROUND, SECTOR 7</span>
              </div>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                <span className="text-3xl mb-2 block">📞</span>
                <span className="text-amber-500 font-mono text-xs block mb-1">PHEROMONE</span>
                <span className="text-white font-mono text-sm">+1 (800) ANT-DIGS</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-amber-500/10 blur-3xl rounded-full animate-pulse" />
            <div className="relative bg-[#2C1A0E] border-4 border-amber-900/50 p-12 rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-amber-900/20" />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-amber-900/20" />
              
              <div className="flex flex-col items-center gap-8">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-amber-500/20 rounded-full"
                  />
                  <Ant type="worker" size="lg" mood="happy" />
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-bangers text-amber-500 tracking-widest">"CARRY" THE WORKER</h4>
                  <p className="text-white/40 font-mono text-xs uppercase tracking-widest">CHIEF OF LOGISTICS & DIGGING</p>
                </div>
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 font-mono text-sm text-amber-200/60 italic text-center">
                  "WE DON'T JUST BUILD WEBSITES. WE DIG DEEP INTO YOUR BRAND'S DNA TO FIND THE GOLD."
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl relative"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute -top-12 right-0 text-white/40 hover:text-white font-mono text-sm tracking-widest"
              >
                [ ABANDON DIG ]
              </button>
              <MultiStepForm onComplete={(data) => console.log('Form Data:', data)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
