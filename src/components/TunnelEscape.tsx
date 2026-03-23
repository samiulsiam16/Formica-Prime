import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TunnelEscape: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const mazeSize = 15;
  const cellSize = 30;
  const maze = useRef<number[][]>([]);
  const player = useRef({ x: 1, y: 1 });
  const goal = useRef({ x: mazeSize - 2, y: mazeSize - 2 });

  const generateMaze = () => {
    const grid = Array(mazeSize).fill(0).map(() => Array(mazeSize).fill(1));
    
    const stack: [number, number][] = [[1, 1]];
    grid[1][1] = 0;
    
    while (stack.length > 0) {
      const [cx, cy] = stack[stack.length - 1];
      const neighbors: [number, number, number, number][] = [];
      
      [[0, 2], [0, -2], [2, 0], [-2, 0]].forEach(([dx, dy]) => {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx > 0 && nx < mazeSize - 1 && ny > 0 && ny < mazeSize - 1 && grid[ny][nx] === 1) {
          neighbors.push([nx, ny, cx + dx / 2, cy + dy / 2]);
        }
      });
      
      if (neighbors.length > 0) {
        const [nx, ny, mx, my] = neighbors[Math.floor(Math.random() * neighbors.length)];
        grid[ny][nx] = 0;
        grid[my][mx] = 0;
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }
    
    maze.current = grid;
    player.current = { x: 1, y: 1 };
    goal.current = { x: mazeSize - 2, y: mazeSize - 2 };
  };

  const initGame = () => {
    setIsGameOver(false);
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    generateMaze();
  };

  useEffect(() => {
    if (!isOpen) return;
    initGame();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      const { x, y } = player.current;
      let nx = x, ny = y;
      
      if (e.code === 'ArrowUp') ny--;
      else if (e.code === 'ArrowDown') ny++;
      else if (e.code === 'ArrowLeft') nx--;
      else if (e.code === 'ArrowRight') nx++;
      
      if (maze.current[ny][nx] === 0) {
        player.current = { x: nx, y: ny };
        if (nx === goal.current.x && ny === goal.current.y) {
          setScore(s => s + 1000 + timeLeft * 10);
          setLevel(l => l + 1);
          setTimeLeft(t => t + 30);
          generateMaze();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    let timer: number;
    if (!isGameOver) {
      timer = window.setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setIsGameOver(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    
    let animationFrameId: number;
    const render = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !canvasRef.current) return;
      
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw Maze
      maze.current.forEach((row, y) => {
        row.forEach((cell, x) => {
          ctx.fillStyle = cell === 1 ? '#2C1A0E' : '#5D3317';
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
          if (cell === 1) {
            ctx.strokeStyle = '#1A0F08';
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
        });
      });
      
      // Draw Goal
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(goal.current.x * cellSize + cellSize / 2, goal.current.y * cellSize + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFD700';
      
      // Draw Player
      ctx.fillStyle = '#FF6B35';
      ctx.shadowBlur = 0;
      ctx.fillRect(player.current.x * cellSize + 5, player.current.y * cellSize + 5, cellSize - 10, cellSize - 10);
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(timer);
    };
  }, [isOpen, isGameOver]);

  return (
    <>
      {/* Game Trigger */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed top-64 left-8 z-[200] group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-2xl hover:scale-110 transition-transform active:scale-95 border-2 border-emerald-400">
          🌀
        </div>
        <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-emerald-900/80 text-white px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-emerald-400 backdrop-blur-md">
          Tunnel Escape
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
            <div className="bg-stone-900 border-4 border-emerald-600 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
              <div className="flex justify-between w-full mb-6">
                <div className="flex gap-8">
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">LEVEL</div>
                    <div className="text-2xl font-display font-bold text-emerald-400">{level}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">TIME</div>
                    <div className="text-2xl font-display font-bold text-red-500">{timeLeft}s</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">SCORE</div>
                    <div className="text-2xl font-display font-bold text-[var(--amber-glow)]">{score.toLocaleString()}</div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white text-2xl">✕</button>
              </div>

              <canvas 
                ref={canvasRef} 
                width={mazeSize * cellSize} 
                height={mazeSize * cellSize} 
                className="game-canvas"
              />

              <div className="mt-8 flex gap-12 text-white/60 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-white/10 px-2 py-1 rounded">ARROWS</span> Navigate
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/10 px-2 py-1 rounded">GOAL</span> Reach the Gold
                </div>
              </div>

              {isGameOver && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-3xl">
                  <h2 className="carved-text text-6xl text-red-500 mb-4">TIME'S UP</h2>
                  <p className="text-2xl mb-8">Final Score: {score}</p>
                  <button 
                    onClick={initGame}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
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

export default TunnelEscape;
