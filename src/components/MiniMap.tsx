import React from 'react';

interface MiniMapProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const MiniMap: React.FC<MiniMapProps> = ({ currentRoute, onNavigate }) => {
  const routes = [
    { id: 'home', label: 'GRAND HALL', x: 100, y: 80 },
    { id: 'portfolio', label: 'GALLERY', x: 40, y: 140 },
    { id: 'services', label: 'MARKET', x: 160, y: 140 },
    { id: 'about', label: 'COUNCIL', x: 40, y: 40 },
    { id: 'contact', label: 'MAILROOM', x: 100, y: 220 },
    { id: 'blog', label: 'BULLETIN', x: 160, y: 40 },
    { id: 'throne-room', label: 'THRONE', x: 40, y: 220 },
    { id: 'archive', label: 'ARCHIVE', x: 160, y: 220 },
    { id: 'training', label: 'GROUNDS', x: 40, y: 100 },
    { id: 'graveyard', label: 'GRAVEYARD', x: 160, y: 100 },
    { id: 'colony', label: 'CITY', x: 100, y: 10 },
  ];

  return (
    <div className="fixed bottom-6 right-6 w-[200px] h-[280px] bg-[#1A0F08] border-2 border-[#6B4226] rounded-xl z-[500] p-4 shadow-2xl hidden md:block">
      <div className="text-[10px] font-mono text-white/40 mb-4 uppercase tracking-widest text-center">Colony Map</div>
      
      <svg viewBox="0 0 200 280" className="w-full h-full">
        {/* Tunnels */}
        <path d="M 100 80 L 40 140" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 80 L 160 140" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 80 L 40 40" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 80 L 160 40" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 80 L 100 220" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 220 L 40 220" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 220 L 160 220" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 80 L 40 100" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 80 L 160 100" stroke="#3D200E" strokeWidth="8" fill="none" />
        <path d="M 100 80 L 100 10" stroke="#3D200E" strokeWidth="8" fill="none" />

        {routes.map((route) => (
          <g 
            key={route.id} 
            className="cursor-pointer group"
            onClick={() => onNavigate(`#${route.id}`)}
          >
            <rect 
              x={route.x - 25} 
              y={route.y - 15} 
              width="50" 
              height="30" 
              rx="8" 
              fill={currentRoute.includes(route.id) ? '#4A2810' : '#2C1A0E'}
              stroke={currentRoute.includes(route.id) ? 'var(--amber-glow)' : '#1A0F08'}
              strokeWidth="2"
              className="transition-all duration-300 group-hover:fill-[#3D200E]"
            />
            <text 
              x={route.x} 
              y={route.y + 4} 
              textAnchor="middle" 
              fill="white" 
              fontSize="6" 
              className="pointer-events-none uppercase font-bold opacity-60"
            >
              {route.label}
            </text>
          </g>
        ))}

        {/* You Are Here Ant */}
        {(() => {
          const current = routes.find(r => currentRoute.includes(r.id)) || routes[0];
          return (
            <circle 
              cx={current.x} 
              cy={current.y - 20} 
              r="4" 
              fill="var(--worker-orange)" 
              className="animate-bounce"
            />
          );
        })()}
      </svg>
    </div>
  );
};

export default MiniMap;
