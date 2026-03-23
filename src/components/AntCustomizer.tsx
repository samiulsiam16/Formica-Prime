import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Ant from './Ant';

interface AntCustomization {
  color: string;
  accessory: string;
  name: string;
}

const COLORS = [
  { name: 'Worker Orange', value: '#FF6B35' },
  { name: 'Strategy Blue', value: '#3B82F6' },
  { name: 'Creative Purple', value: '#8B5CF6' },
  { name: 'Merchant Green', value: '#10B981' },
  { name: 'Royal Gold', value: '#FFD700' },
  { name: 'Deep Crimson', value: '#DC2626' },
];

const ACCESSORIES = [
  { name: 'None', value: 'none', icon: '🐜' },
  { name: 'Tiny Hat', value: 'hat', icon: '🎩' },
  { name: 'Backpack', value: 'backpack', icon: '🎒' },
  { name: 'Crown', value: 'crown', icon: '👑' },
  { name: 'Sword', value: 'sword', icon: '⚔️' },
  { name: 'Glasses', value: 'glasses', icon: '👓' },
];

const AntCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customization, setCustomization] = useState<AntCustomization>(() => {
    const saved = localStorage.getItem('player_ant_customization');
    return saved ? JSON.parse(saved) : { color: '#FF6B35', accessory: 'none', name: 'New Ant' };
  });

  useEffect(() => {
    localStorage.setItem('player_ant_customization', JSON.stringify(customization));
    window.dispatchEvent(new CustomEvent('player-ant-updated', { detail: customization }));
  }, [customization]);

  return (
    <>
      {/* Customizer Trigger */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed top-24 left-8 z-[200] group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center text-white text-2xl shadow-2xl hover:scale-110 transition-transform active:scale-95 border-2 border-orange-400">
          🎨
        </div>
        <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-orange-900/80 text-white px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-orange-400 backdrop-blur-md">
          Customize Your Ant
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -100 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          >
            <div className="bg-stone-900 border-4 border-orange-600 w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col max-h-[80vh] shadow-2xl">
              <div className="p-6 border-b border-orange-600/30 flex justify-between items-center bg-orange-950/20">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🐜🎨</div>
                  <div>
                    <h3 className="carved-text text-2xl text-orange-300">ANT CUSTOMIZER</h3>
                    <p className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">EXPRESS YOURSELF IN THE COLONY</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-orange-300 hover:text-white text-2xl">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col md:flex-row gap-8 custom-scrollbar">
                {/* Preview Section */}
                <div className="flex-1 bg-black/40 rounded-2xl p-8 flex flex-col items-center justify-center border border-white/5">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
                    <Ant 
                      type="worker" 
                      className="scale-[3]" 
                      style={{ filter: `drop-shadow(0 0 10px ${customization.color})` }}
                    />
                    {customization.accessory !== 'none' && (
                      <div className="absolute -top-4 -right-4 text-4xl animate-bounce">
                        {ACCESSORIES.find(a => a.value === customization.accessory)?.icon}
                      </div>
                    )}
                  </div>
                  <div className="mt-8 text-center">
                    <div className="text-2xl font-display font-bold text-orange-300 mb-2">{customization.name}</div>
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">PLAYER ANT PREVIEW</div>
                  </div>
                </div>

                {/* Controls Section */}
                <div className="flex-1 space-y-8">
                  <div>
                    <label className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-4 block">ANT NAME</label>
                    <input
                      type="text"
                      value={customization.name}
                      onChange={(e) => setCustomization({ ...customization, name: e.target.value })}
                      className="w-full bg-black/40 border border-orange-600/30 rounded-xl px-6 py-4 text-orange-100 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-4 block">EXOSKELETON COLOR</label>
                    <div className="grid grid-cols-3 gap-3">
                      {COLORS.map(c => (
                        <button
                          key={c.value}
                          onClick={() => setCustomization({ ...customization, color: c.value })}
                          className={`h-12 rounded-xl border-2 transition-all ${
                            customization.color === c.value ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60'
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-4 block">ACCESSORIES</label>
                    <div className="grid grid-cols-3 gap-3">
                      {ACCESSORIES.map(a => (
                        <button
                          key={a.value}
                          onClick={() => setCustomization({ ...customization, accessory: a.value })}
                          className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                            customization.accessory === a.value ? 'border-orange-400 bg-orange-600/20 shadow-lg' : 'border-white/5 bg-black/20 opacity-60'
                          }`}
                        >
                          <span className="text-2xl">{a.icon}</span>
                          <span className="text-[8px] font-bold uppercase">{a.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-orange-900/20 border-t border-orange-600/30 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-orange-600 hover:bg-orange-500 text-white px-12 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                >
                  SAVE & EXIT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AntCustomizer;
