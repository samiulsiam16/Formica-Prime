import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface TrailPoint {
  x: number;
  y: number;
  color: string;
  opacity: number;
}

const VFXManager: React.FC = () => {
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const [shockwaves, setShockwaves] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const trails = useRef<TrailPoint[]>([]);
  const dustMotes = useRef<Particle[]>([]);
  
  // Initialize dust motes
  useEffect(() => {
    const count = 100;
    for (let i = 0; i < count; i++) {
      dustMotes.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: 'rgba(255, 255, 255, 0.2)',
        life: 1,
        maxLife: 1
      });
    }
  }, []);

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    
    const render = () => {
      const trailCtx = trailCanvasRef.current?.getContext('2d');
      const dustCtx = dustCanvasRef.current?.getContext('2d');
      
      if (trailCtx && trailCanvasRef.current) {
        trailCtx.clearRect(0, 0, trailCanvasRef.current.width, trailCanvasRef.current.height);
        
        // Update and draw trails
        trails.current = trails.current.filter(p => p.opacity > 0.01);
        trails.current.forEach(p => {
          p.opacity -= 0.005;
          trailCtx.beginPath();
          trailCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          trailCtx.fillStyle = p.color.replace(')', `, ${p.opacity})`).replace('rgb', 'rgba');
          trailCtx.fill();
        });
      }
      
      if (dustCtx && dustCanvasRef.current) {
        dustCtx.clearRect(0, 0, dustCanvasRef.current.width, dustCanvasRef.current.height);
        
        dustMotes.current.forEach(m => {
          m.x += m.vx;
          m.y += m.vy;
          
          if (m.x < 0) m.x = window.innerWidth;
          if (m.x > window.innerWidth) m.x = 0;
          if (m.y < 0) m.y = window.innerHeight;
          if (m.y > window.innerHeight) m.y = 0;
          
          dustCtx.beginPath();
          dustCtx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          dustCtx.fillStyle = m.color;
          dustCtx.fill();
        });
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle double click for shockwaves
  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      const newShockwave = { id: Date.now(), x: e.clientX, y: e.clientY };
      setShockwaves(prev => [...prev, newShockwave]);
      
      // Disturb dust motes
      dustMotes.current.forEach(m => {
        const dx = m.x - e.clientX;
        const dy = m.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const force = (250 - dist) / 250;
          m.vx += (dx / dist) * force * 10;
          m.vy += (dy / dist) * force * 10;
        }
      });

      setTimeout(() => {
        setShockwaves(prev => prev.filter(s => s.id !== newShockwave.id));
      }, 6000);
    };

    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, []);

  // Listen for ant movement to create trails
  useEffect(() => {
    const handleAntMove = (e: any) => {
      const { x, y, color } = e.detail;
      trails.current.push({ x, y, color, opacity: 0.8 });
    };
    
    window.addEventListener('ant-move', handleAntMove);
    return () => window.removeEventListener('ant-move', handleAntMove);
  }, []);

  return (
    <>
      <canvas 
        ref={trailCanvasRef} 
        className="pheromone-trail" 
        width={window.innerWidth} 
        height={window.innerHeight} 
      />
      <canvas 
        ref={dustCanvasRef} 
        className="fixed inset-0 pointer-events-none z-[100]" 
        width={window.innerWidth} 
        height={window.innerHeight} 
      />
      
      {/* Lava Layer */}
      <div className="lava-layer">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="lava-bubble" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 5}s`
            }} 
          />
        ))}
      </div>

      {/* Shockwaves */}
      {shockwaves.map(s => (
        <div 
          key={s.id} 
          className="shockwave" 
          style={{ left: s.x, top: s.y }} 
        />
      ))}
    </>
  );
};

export default VFXManager;
