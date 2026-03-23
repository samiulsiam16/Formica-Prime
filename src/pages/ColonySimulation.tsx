import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ColonySimulation, AntAgent, ColonyTimeClock } from '../services/ColonySimulation';
import Ant from '../components/Ant';

const ColonySimulationPage: React.FC = () => {
  const [ants, setAnts] = useState<AntAgent[]>([]);
  const [time, setTime] = useState(0);
  const [selectedAnt, setSelectedAnt] = useState<AntAgent | null>(null);
  const [isDay, setIsDay] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<ColonySimulation | null>(null);
  const clockRef = useRef<ColonyTimeClock | null>(null);

  useEffect(() => {
    simulationRef.current = new ColonySimulation(1200, 1000, setAnts);
    clockRef.current = new ColonyTimeClock((t) => {
      setTime(t);
      simulationRef.current?.updateTime(t);
      setIsDay(clockRef.current?.getIsDay() || true);
    });

    return () => {
      // Cleanup
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Tunnels (Simplified for simulation view)
      ctx.strokeStyle = '#3D200E';
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Draw Ants
      ants.forEach(ant => {
        ctx.fillStyle = ant.type === 'royal' ? '#FFD700' : '#1A0F08';
        ctx.beginPath();
        ctx.arc(ant.x, ant.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        if (selectedAnt?.id === ant.id) {
          ctx.strokeStyle = '#3B82F6';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ant.x, ant.y, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [ants, selectedAnt]);

  const getTimeString = () => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isDay ? 'bg-[#1A0F08]' : 'bg-[#0D0705]'} p-4 md:p-8 overflow-hidden flex flex-col`}>
      {/* HUD Header */}
      <div className="flex justify-between items-center mb-8 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 z-20">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <span className="text-amber-500 font-mono text-xs block mb-1 uppercase tracking-widest">COLONY TIME</span>
            <span className="text-4xl font-bangers text-white tracking-widest">{getTimeString()}</span>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-center">
            <span className="text-amber-500 font-mono text-xs block mb-1 uppercase tracking-widest">POPULATION</span>
            <span className="text-4xl font-bangers text-white tracking-widest">{ants.length}</span>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-center">
            <span className="text-amber-500 font-mono text-xs block mb-1 uppercase tracking-widest">STATUS</span>
            <span className="text-xl font-bangers text-green-500 tracking-widest uppercase">THRIVING</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`w-4 h-4 rounded-full ${isDay ? 'bg-yellow-400 shadow-[0_0_10px_#fbbf24]' : 'bg-blue-400 shadow-[0_0_10px_#60a5fa]'}`} />
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">{isDay ? 'DAY CYCLE' : 'NIGHT CYCLE'}</span>
        </div>
      </div>

      {/* Simulation Viewport */}
      <div className="flex-1 relative bg-black/20 rounded-3xl border-2 border-white/5 overflow-hidden group">
        <canvas 
          ref={canvasRef} 
          width={1200} 
          height={1000} 
          className="w-full h-full object-contain cursor-crosshair"
          onClick={(e) => {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = (e.clientX - rect.left) * (1200 / rect.width);
            const y = (e.clientY - rect.top) * (1000 / rect.height);
            
            const clickedAnt = ants.find(ant => Math.hypot(ant.x - x, ant.y - y) < 15);
            setSelectedAnt(clickedAnt || null);
          }}
        />

        {/* Ambient Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        {/* Ant Profile Panel */}
        <AnimatePresence>
          {selectedAnt && (
            <motion.div 
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="absolute top-8 right-8 w-80 bg-[#2C1A0E] border-2 border-amber-500/30 p-8 rounded-3xl shadow-2xl z-30"
            >
              <button 
                onClick={() => setSelectedAnt(null)}
                className="absolute top-4 right-4 text-white/20 hover:text-white"
              >
                ✕
              </button>
              
              <div className="flex flex-col items-center mb-8">
                <Ant type={selectedAnt.type} size="lg" mood={selectedAnt.mood as any} />
                <h3 className="text-2xl font-bangers text-amber-500 mt-4 tracking-widest">{selectedAnt.name}</h3>
                <span className="text-white/40 font-mono text-xs uppercase tracking-widest">{selectedAnt.type}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono text-amber-500/60 mb-2 uppercase tracking-widest">
                    <span>ENERGY</span>
                    <span>{selectedAnt.energy}%</span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedAnt.energy}%` }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>

                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <span className="text-amber-500 font-mono text-[10px] block mb-1 uppercase tracking-widest">CURRENT TASK</span>
                  <span className="text-white font-bangers tracking-widest">{selectedAnt.currentTask}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-amber-500 font-mono text-[10px] block mb-2 uppercase tracking-widest">DAILY SCHEDULE</span>
                  {selectedAnt.schedule.map((slot, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2 last:border-0">
                      <span className="text-white/40">{slot.startTime}</span>
                      <span className="text-white">{slot.activity}</span>
                      <span className="text-amber-500/40">{slot.location}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full mt-8 bg-amber-500 text-black font-bangers py-3 rounded-xl hover:bg-amber-400 transition-all">
                FOLLOW ANT
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Event Log */}
      <div className="mt-8 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 h-32 overflow-y-auto font-mono text-xs text-white/40 space-y-2">
        <p className="text-amber-500/60">[06:00] MORNING RUSH: WORKERS ARE LEAVING RESIDENTIAL DISTRICT.</p>
        <p>[06:15] FOOD DELIVERY ARRIVED AT THE MARKET.</p>
        <p>[06:30] GUARD ROTATION COMPLETE IN THE GRAND HALL.</p>
        <p className="text-blue-400/60">[06:45] RANDOM EVENT: A BEETLE HAS BEEN SPOTTED NEAR THE ENTRANCE.</p>
      </div>
    </div>
  );
};

export default ColonySimulationPage;
