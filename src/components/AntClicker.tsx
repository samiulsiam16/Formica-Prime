import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  cps: number; // Crumb Per Second
  count: number;
}

const UPGRADES: Upgrade[] = [
  { id: 'worker', name: 'Worker Ant', description: 'A basic worker to gather crumbs.', cost: 15, cps: 0.1, count: 0 },
  { id: 'soldier', name: 'Soldier Ant', description: 'Protects the colony and gathers more.', cost: 100, cps: 1, count: 0 },
  { id: 'scout', name: 'Scout Ant', description: 'Finds hidden crumb caches.', cost: 1100, cps: 8, count: 0 },
  { id: 'queen', name: 'Queen Ant', description: 'The heart of the colony.', cost: 12000, cps: 47, count: 0 },
  { id: 'oracle', name: 'Oracle Ant', description: 'Gathers crumbs from the future.', cost: 130000, cps: 260, count: 0 },
];

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_crumb', title: 'First Crumb', description: 'Collected your first crumb.', icon: '🍪', unlocked: false },
  { id: 'colony_start', title: 'Colony Start', description: 'Hired your first worker.', icon: '🐜', unlocked: false },
  { id: 'crumb_hoarder', title: 'Crumb Hoarder', description: 'Collected 1,000 crumbs.', icon: '💰', unlocked: false },
  { id: 'ant_army', title: 'Ant Army', description: 'Hired 50 ants.', icon: '🪖', unlocked: false },
];

const AntClicker: React.FC = () => {
  const [crumbs, setCrumbs] = useState<number>(() => Number(localStorage.getItem('ant_clicker_crumbs')) || 0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() => {
    const saved = localStorage.getItem('ant_clicker_upgrades');
    return saved ? JSON.parse(saved) : UPGRADES;
  });
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('ant_clicker_achievements');
    return saved ? JSON.parse(saved) : ACHIEVEMENTS;
  });
  const [showToast, setShowToast] = useState<Achievement | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const totalCPS = upgrades.reduce((acc, u) => acc + u.cps * u.count, 0);

  // Persistence
  useEffect(() => {
    localStorage.setItem('ant_clicker_crumbs', crumbs.toString());
    localStorage.setItem('ant_clicker_upgrades', JSON.stringify(upgrades));
    localStorage.setItem('ant_clicker_achievements', JSON.stringify(achievements));
  }, [crumbs, upgrades, achievements]);

  // CPS Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setCrumbs(prev => prev + totalCPS / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [totalCPS]);

  const clickCrumb = useCallback((e: React.MouseEvent) => {
    setCrumbs(prev => prev + 1);
    checkAchievements();
    
    // Floating text effect
    const floating = document.createElement('div');
    floating.innerText = '+1';
    floating.style.position = 'fixed';
    floating.style.left = `${e.clientX}px`;
    floating.style.top = `${e.clientY}px`;
    floating.style.color = 'var(--amber-glow)';
    floating.style.fontWeight = 'bold';
    floating.style.pointerEvents = 'none';
    floating.style.zIndex = '9999';
    floating.style.animation = 'floatUp 1s forwards';
    document.body.appendChild(floating);
    setTimeout(() => floating.remove(), 1000);
  }, [crumbs]);

  const buyUpgrade = (id: string) => {
    setUpgrades(prev => prev.map(u => {
      if (u.id === id && crumbs >= u.cost) {
        setCrumbs(c => c - u.cost);
        const newCount = u.count + 1;
        const newCost = Math.floor(u.cost * 1.15);
        return { ...u, count: newCount, cost: newCost };
      }
      return u;
    }));
    checkAchievements();
  };

  const checkAchievements = () => {
    setAchievements(prev => prev.map(a => {
      if (a.unlocked) return a;
      
      let shouldUnlock = false;
      if (a.id === 'first_crumb' && crumbs >= 1) shouldUnlock = true;
      if (a.id === 'colony_start' && upgrades[0].count >= 1) shouldUnlock = true;
      if (a.id === 'crumb_hoarder' && crumbs >= 1000) shouldUnlock = true;
      if (a.id === 'ant_army' && upgrades.reduce((acc, u) => acc + u.count, 0) >= 50) shouldUnlock = true;

      if (shouldUnlock) {
        setShowToast(a);
        setTimeout(() => setShowToast(null), 4000);
        return { ...a, unlocked: true };
      }
      return a;
    }));
  };

  return (
    <>
      {/* Mini UI Panel */}
      <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isPanelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-black/90 border border-white/10 p-6 rounded-3xl backdrop-blur-xl w-80 shadow-2xl mb-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="carved-text text-xl">ANT CLICKER</h3>
                <button onClick={() => setIsPanelOpen(false)} className="text-white/40 hover:text-white">✕</button>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-display font-bold text-[var(--amber-glow)] mb-1">
                  {Math.floor(crumbs).toLocaleString()}
                </div>
                <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">CRUMBS COLLECTED</div>
                <div className="text-xs text-white/60 mt-2">({totalCPS.toFixed(1)} CPS)</div>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {upgrades.map(u => (
                  <button
                    key={u.id}
                    onClick={() => buyUpgrade(u.id)}
                    disabled={crumbs < u.cost}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                      crumbs >= u.cost 
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[var(--amber-glow)]' 
                        : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm font-bold">{u.name}</div>
                      <div className="text-[10px] opacity-40">{u.count} owned</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-[var(--amber-glow)]">{u.cost.toLocaleString()}</div>
                      <div className="text-[8px] opacity-40">crumbs</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="w-16 h-16 rounded-full bg-[var(--amber-glow)] flex items-center justify-center text-black text-2xl shadow-2xl hover:scale-110 transition-transform active:scale-95"
        >
          🍪
        </button>
      </div>

      {/* Global Click Area */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none"
        onClick={clickCrumb}
        style={{ pointerEvents: 'none' }} // This will be handled by the main click listener in App
      />

      {/* Achievement Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="achievement-toast"
          >
            <div className="text-3xl">{showToast.icon}</div>
            <div>
              <div className="text-[10px] font-mono text-[var(--queen-gold)] uppercase tracking-widest">ACHIEVEMENT UNLOCKED</div>
              <div className="text-sm font-bold">{showToast.title}</div>
              <div className="text-xs opacity-60">{showToast.description}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--amber-glow);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default AntClicker;
