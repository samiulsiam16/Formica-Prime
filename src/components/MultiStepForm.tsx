import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AntType } from '../types';

interface MultiStepFormProps {
  onComplete: (data: any) => void;
}

const steps = [
  { id: 'identify', title: 'IDENTIFY YOURSELF', icon: '🆔' },
  { id: 'purpose', title: 'STATE YOUR PURPOSE', icon: '🎯' },
  { id: 'vision', title: 'DESCRIBE YOUR VISION', icon: '👁️' },
  { id: 'stamp', title: 'THE ROYAL STAMP', icon: '👑' }
];

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'branding',
    budget: 5000,
    description: '',
    color: '#3B82F6'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate ant relay
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSubmitting(false);
    setIsDone(true);
    onComplete(formData);
  };

  if (isDone) {
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-12 bg-[#2C1A0E] border-4 border-amber-500 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.2)]"
      >
        <div className="text-6xl mb-6">📜</div>
        <h2 className="text-4xl font-bangers text-amber-500 mb-4 tracking-widest">MESSAGE DELIVERED</h2>
        <p className="text-amber-200/60 font-mono mb-8">THE ROYAL SCRIBE HAS RECORDED YOUR REQUEST. EXPECT A CARRIER ANT SOON.</p>
        <div className="flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              className="text-2xl"
            >
              🐜
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#1A0F08] border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Progress Bar */}
      <div className="bg-black/40 h-2 flex">
        {steps.map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 transition-all duration-500 ${i <= currentStep ? 'bg-amber-500' : 'bg-white/5'}`}
          />
        ))}
      </div>

      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl">{steps[currentStep].icon}</span>
          <div>
            <span className="text-amber-500 font-mono text-xs tracking-widest uppercase">STEP 0{currentStep + 1} / 04</span>
            <h2 className="text-2xl font-bangers text-white tracking-wider">{steps[currentStep].title}</h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="min-h-[300px]"
          >
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-amber-500/60 font-mono text-xs mb-2 uppercase">Your Name / Colony Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/40 border-2 border-white/10 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-colors font-mono"
                    placeholder="e.g. King Arthur of the Red Hills"
                  />
                </div>
                <div className="group">
                  <label className="block text-amber-500/60 font-mono text-xs mb-2 uppercase">Pheromone Address (Email)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/40 border-2 border-white/10 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-colors font-mono"
                    placeholder="queen@colony.com"
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4">
                {['branding', 'web', 'strategy', 'content'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFormData({...formData, projectType: type})}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                      formData.projectType === type 
                        ? 'border-amber-500 bg-amber-500/10 text-amber-500' 
                        : 'border-white/10 bg-black/20 text-white/40 hover:border-white/20'
                    }`}
                  >
                    <span className="text-3xl">
                      {type === 'branding' ? '🎨' : type === 'web' ? '💻' : type === 'strategy' ? '🧠' : '✍️'}
                    </span>
                    <span className="font-bangers tracking-widest uppercase">{type}</span>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-amber-500/60 font-mono text-xs mb-2 uppercase">Project Depth (Budget)</label>
                  <input 
                    type="range" 
                    min="1000" 
                    max="50000" 
                    step="1000"
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: parseInt(e.target.value)})}
                    className="w-full accent-amber-500 bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 font-mono text-xs text-white/40">
                    <span>$1k</span>
                    <span className="text-amber-500 font-bold">${formData.budget.toLocaleString()}</span>
                    <span>$50k+</span>
                  </div>
                </div>
                <div>
                  <label className="block text-amber-500/60 font-mono text-xs mb-2 uppercase">The Vision (Description)</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black/40 border-2 border-white/10 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-colors font-mono h-32 resize-none"
                    placeholder="Tell us about your next big dig..."
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-amber-500/30 rounded-full"
                  />
                  <div className="w-32 h-32 bg-amber-500 rounded-full flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                    👑
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bangers text-white mb-2">READY FOR THE ROYAL SCRIBE?</h3>
                  <p className="text-white/40 font-mono text-sm">BY SUBMITTING, YOU AGREE TO THE COLONY'S TERMS OF SERVICE AND OCCASIONAL CRUMB TAX.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-12">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-8 py-3 rounded-xl font-bangers tracking-widest transition-all ${
              currentStep === 0 ? 'opacity-0 pointer-events-none' : 'bg-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            BACK
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button 
              onClick={nextStep}
              className="px-12 py-3 bg-amber-500 text-black font-bangers tracking-widest rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
            >
              NEXT STEP
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-12 py-3 bg-green-500 text-black font-bangers tracking-widest rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/20 relative overflow-hidden"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ x: [0, 100] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-xl"
                  >
                    🐜
                  </motion.div>
                  <span>RELAYING...</span>
                </div>
              ) : (
                'SUBMIT APPLICATION'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
