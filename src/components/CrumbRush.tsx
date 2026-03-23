import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  type: string;
  color: string;
}

const CrumbRush: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const player = useRef<Entity>({ x: 50, y: 300, width: 30, height: 20, vx: 0, vy: 0, type: 'player', color: '#FF6B35' });
  const crumbs = useRef<Entity[]>([]);
  const enemies = useRef<Entity[]>([]);
  const platforms = useRef<{ x: number; y: number; width: number; height: number }[]>([]);
  const keys = useRef<{ [key: string]: boolean }>({});

  const initGame = () => {
    setScore(0);
    setLives(3);
    setIsGameOver(false);
    player.current = { x: 50, y: 300, width: 30, height: 20, vx: 0, vy: 0, type: 'player', color: '#FF6B35' };
    crumbs.current = [];
    enemies.current = [];
    platforms.current = [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 200, y: 280, width: 150, height: 20 },
      { x: 450, y: 220, width: 150, height: 20 },
      { x: 100, y: 150, width: 150, height: 20 },
    ];
    
    for (let i = 0; i < 5; i++) {
      crumbs.current.push({
        x: Math.random() * 700 + 50,
        y: Math.random() * 300 + 50,
        width: 15,
        height: 15,
        vx: 0,
        vy: 0,
        type: 'crumb',
        color: '#8B6914'
      });
    }

    for (let i = 0; i < 2; i++) {
      enemies.current.push({
        x: Math.random() * 700 + 50,
        y: Math.random() * 300 + 50,
        width: 40,
        height: 40,
        vx: (Math.random() - 0.5) * 4,
        vy: 0,
        type: 'spider',
        color: '#000'
      });
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    initGame();
    
    const handleKeyDown = (e: KeyboardEvent) => keys.current[e.code] = true;
    const handleKeyUp = (e: KeyboardEvent) => keys.current[e.code] = false;
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    let animationFrameId: number;
    const render = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !canvasRef.current) return;
      
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      if (!isGameOver) {
        // Player Movement
        if (keys.current['ArrowLeft']) player.current.vx = -5;
        else if (keys.current['ArrowRight']) player.current.vx = 5;
        else player.current.vx *= 0.8;
        
        if (keys.current['Space'] && player.current.vy === 0) player.current.vy = -12;
        
        player.current.vy += 0.6; // Gravity
        player.current.x += player.current.vx;
        player.current.y += player.current.vy;
        
        // Collision with platforms
        platforms.current.forEach(p => {
          if (player.current.x < p.x + p.width && player.current.x + player.current.width > p.x &&
              player.current.y < p.y + p.height && player.current.y + player.current.height > p.y) {
            if (player.current.vy > 0) {
              player.current.y = p.y - player.current.height;
              player.current.vy = 0;
            }
          }
        });
        
        // Boundaries
        if (player.current.x < 0) player.current.x = 0;
        if (player.current.x > canvasRef.current.width - player.current.width) player.current.x = canvasRef.current.width - player.current.width;
        if (player.current.y > canvasRef.current.height) {
          setLives(l => l - 1);
          player.current.x = 50;
          player.current.y = 300;
          player.current.vy = 0;
        }
        
        // Crumb Collection
        crumbs.current = crumbs.current.filter(c => {
          const hit = player.current.x < c.x + c.width && player.current.x + player.current.width > c.x &&
                      player.current.y < c.y + c.height && player.current.y + player.current.height > c.y;
          if (hit) setScore(s => s + 100);
          return !hit;
        });
        
        // Enemy Movement & Collision
        enemies.current.forEach(e => {
          e.x += e.vx;
          if (e.x < 0 || e.x > canvasRef.current!.width - e.width) e.vx *= -1;
          
          const hit = player.current.x < e.x + e.width && player.current.x + player.current.width > e.x &&
                      player.current.y < e.y + e.height && player.current.y + player.current.height > e.y;
          if (hit) {
            setLives(l => l - 1);
            player.current.x = 50;
            player.current.y = 300;
            player.current.vy = 0;
          }
        });
        
        if (lives <= 0) setIsGameOver(true);
        if (crumbs.current.length === 0) {
          // Next Level
          initGame();
          setScore(s => s + 500);
        }
      }
      
      // Draw Platforms
      ctx.fillStyle = '#5D3317';
      platforms.current.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
      
      // Draw Crumbs
      ctx.fillStyle = '#8B6914';
      crumbs.current.forEach(c => ctx.fillRect(c.x, c.y, c.width, c.height));
      
      // Draw Enemies
      ctx.fillStyle = '#000';
      enemies.current.forEach(e => ctx.fillRect(e.x, e.y, e.width, e.height));
      
      // Draw Player
      ctx.fillStyle = player.current.color;
      ctx.fillRect(player.current.x, player.current.y, player.current.width, player.current.height);
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, isGameOver, lives]);

  return (
    <>
      {/* Game Trigger */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed top-44 left-8 z-[200] group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl shadow-2xl hover:scale-110 transition-transform active:scale-95 border-2 border-red-400">
          🎮
        </div>
        <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-red-900/80 text-white px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-red-400 backdrop-blur-md">
          Play Crumb Rush
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="game-overlay"
          >
            <div className="bg-stone-900 border-4 border-red-600 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
              <div className="flex justify-between w-full mb-6">
                <div className="flex gap-8">
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">SCORE</div>
                    <div className="text-2xl font-display font-bold text-[var(--amber-glow)]">{score.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">LIVES</div>
                    <div className="text-2xl font-display font-bold text-red-500">{'❤️'.repeat(lives)}</div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white text-2xl">✕</button>
              </div>

              <canvas 
                ref={canvasRef} 
                width={800} 
                height={400} 
                className="game-canvas"
              />

              <div className="mt-8 flex gap-12 text-white/60 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-white/10 px-2 py-1 rounded">ARROWS</span> Move
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/10 px-2 py-1 rounded">SPACE</span> Jump
                </div>
              </div>

              {isGameOver && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-3xl">
                  <h2 className="carved-text text-6xl text-red-500 mb-4">GAME OVER</h2>
                  <p className="text-2xl mb-8">Final Score: {score}</p>
                  <button 
                    onClick={initGame}
                    className="bg-red-600 hover:bg-red-500 text-white px-12 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                  >
                    TRY AGAIN
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CrumbRush;
