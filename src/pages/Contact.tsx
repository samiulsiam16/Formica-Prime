import React, { useState } from 'react';
import Chamber from '../components/Chamber';
import Ant from '../components/Ant';
import { motion, AnimatePresence } from 'motion/react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submit sequence
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-20">
      <header className="text-center">
        <h1 className="carved-text text-4xl mb-4">THE ROYAL MAILROOM</h1>
        <p className="font-mono text-xs opacity-50 uppercase tracking-widest">SAY HELLO TO THE SURFACE WORLD</p>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, y: -200 }}
                className="relative"
              >
                <div className="bg-[#F5E6C8] p-12 rounded-3xl text-[#2C1A0E] shadow-2xl relative overflow-hidden">
                  {/* Parchment Texture */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                  
                  <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="handwritten text-xl">Your Name (Surface World)</label>
                      <input required type="text" className="bg-transparent border-b-2 border-[#6B4226] py-2 focus:outline-none focus:border-black transition-colors" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="handwritten text-xl">Your Colony Email</label>
                      <input required type="email" className="bg-transparent border-b-2 border-[#6B4226] py-2 focus:outline-none focus:border-black transition-colors" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="handwritten text-xl">Nature of Your Request</label>
                      <select className="bg-transparent border-b-2 border-[#6B4226] py-2 focus:outline-none focus:border-black transition-colors appearance-none">
                        <option>NEW TUNNEL BUILD (WEB)</option>
                        <option>BRAND PHEROMONES (IDENTITY)</option>
                        <option>COLONY BROADCAST (CAMPAIGN)</option>
                        <option>WAR COUNCIL (STRATEGY)</option>
                        <option>JUST SAYING HI</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="handwritten text-xl">Message to The Queen</label>
                      <textarea required rows={4} className="bg-transparent border-b-2 border-[#6B4226] py-2 focus:outline-none focus:border-black transition-colors resize-none leading-8" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #6B4226 31px, #6B4226 32px)' }}></textarea>
                    </div>

                    <div className="flex justify-center mt-8">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-24 h-24 flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-red-800 rounded-full shadow-xl group-hover:scale-110 transition-transform group-active:scale-95 animate-[waxStamp_2s_infinite_paused] group-hover:animate-none"></div>
                        <div className="relative text-white font-display text-4xl font-bold">C</div>
                        <div className="absolute -bottom-12 text-[10px] font-mono uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                          {isSubmitting ? 'STAMPING...' : 'STAMP & SEND'}
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-800/20 border-4 border-green-500/50 p-12 rounded-3xl text-center flex flex-col items-center gap-8"
              >
                <div className="flex gap-4">
                  <Ant type="worker" className="animate-[celebrationDance_1s_infinite]" />
                  <Ant type="creative" className="animate-[celebrationDance_1.2s_infinite_0.2s]" />
                  <Ant type="tiny" className="animate-[celebrationDance_0.8s_infinite_0.4s]" />
                </div>
                <h2 className="carved-text text-3xl text-green-400">MESSAGE DELIVERED!</h2>
                <p className="font-serif text-xl opacity-80">
                  The Queen has been notified. ETA: 24-48 Ant Hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 rounded-full border-2 border-green-500/50 hover:bg-green-500/20 transition-colors uppercase font-mono text-xs tracking-widest"
                >
                  SEND ANOTHER LETTER
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-8">
          <ContactNote label="📍 COLONY COORDINATES" value="BENEATH THE PARK BENCH, SECTOR 7, BROOKLYN" rotation="-3deg" />
          <ContactNote label="📧 QUEEN'S DIRECT LINE" value="QUEEN@COLONYCREATIVE.CO" rotation="2deg" />
          <ContactNote label="📱 SURFACE COMM" value="+1 (555) ANT-WORK" rotation="-1deg" />
          <ContactNote label="🕐 COLONY HOURS" value="24/7 (WE DO NOT SLEEP)" rotation="4deg" />
          
          <div className="mt-8 flex flex-col items-center gap-4">
            <Ant type="queen" className="scale-75" />
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-center">
              "THE QUEEN IS CURRENTLY READING MAIL.<br/>DO NOT INTERRUPT UNLESS IT IS A CRUMB."
            </p>
          </div>
        </div>
      </div>

      {/* Rain Effect (Contact Page Only) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-blue-400/30 w-[1px] h-[15px] animate-[rainFall_1s_linear_infinite]"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

const ContactNote: React.FC<{ label: string, value: string, rotation: string }> = ({ label, value, rotation }) => (
  <div 
    className="bg-[#FAFAF5] p-6 rounded-lg shadow-xl text-[#2C1A0E] relative group hover:scale-105 transition-transform"
    style={{ transform: `rotate(${rotation})` }}
  >
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md z-10"></div>
    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-2">{label}</div>
    <div className="handwritten text-lg font-bold">{value}</div>
  </div>
);

export default Contact;
