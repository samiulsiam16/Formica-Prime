import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Surface from './components/Surface';
import TunnelNetwork from './components/TunnelNetwork';
import MiniMap from './components/MiniMap';
import Ant from './components/Ant';
import Chamber from './components/Chamber';
import { PROJECTS, BLOG_POSTS } from './constants';
import { Project, BlogPost, Mood } from './types';

// New Components
import VFXManager from './components/VFXManager';
import DayNightCycle from './components/DayNightCycle';
import AntClicker from './components/AntClicker';
import OracleAnt from './components/OracleAnt';
import TunnelRadio from './components/TunnelRadio';
import AntCustomizer from './components/AntCustomizer';
import CrumbRush from './components/CrumbRush';
import TunnelEscape from './components/TunnelEscape';
import LoadingScreen from './components/LoadingScreen';
import KonamiCode, { ColonyTyping, IdleMode } from './components/EasterEggs';
import MobileSwipeNavigation from './components/MobileSwipeNavigation';

// Page Components
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import ThroneRoom from './pages/ThroneRoom';
import ArchiveVault from './pages/ArchiveVault';
import TrainingGrounds from './pages/TrainingGrounds';
import GraveyardOfConcepts from './pages/GraveyardOfConcepts';
import ColonySimulationPage from './pages/ColonySimulation';

import { AntSocialSystem } from './services/AntSocialSystem';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#home');
  const [isDigging, setIsDigging] = useState(false);
  const [foodItems, setFoodItems] = useState<{ id: number, x: number, y: number, type: string, crumbs?: any[] }[]>([]);
  const [globalMood, setGlobalMood] = useState<Mood>('calm');
  const [population, setPopulation] = useState(1240);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [doodles, setDoodles] = useState<{ id: number, path: string, x: number, y: number }[]>([]);

  useEffect(() => {
    const socialSystem = new AntSocialSystem();
    return () => {};
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPopulation(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const triggerEvent = () => {
      const events = [
        'TUNNEL_COLLAPSE',
        'QUEEN_SPEECH',
        'VISITOR_LADYBUG',
        'RAIN_STORM',
        'CRUMB_FRENZY'
      ];
      const event = events[Math.floor(Math.random() * events.length)];
      setActiveEvent(event);
      
      if (event === 'TUNNEL_COLLAPSE') setGlobalMood('panicked');
      
      setTimeout(() => {
        setActiveEvent(null);
        setGlobalMood('calm');
      }, 6000);
    };

    const eventTimer = setInterval(() => {
      if (Math.random() > 0.7) triggerEvent();
    }, 20000);

    return () => clearInterval(eventTimer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = window.location.hash || '#home';
      setIsDigging(true);
      setTimeout(() => {
        setCurrentRoute(newRoute);
        setIsDigging(false);
        window.scrollTo(0, 0);
      }, 800);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFoodDrop = (x: number, y: number) => {
    const types = ['crumb', 'apple', 'sugar', 'leaf'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Crumb Explosion Logic
    const crumbs = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      rotate: Math.random() * 360
    }));

    const newFood = {
      id: Date.now(),
      x,
      y,
      type,
      crumbs
    };

    setFoodItems(prev => [...prev, newFood]);
    setGlobalMood('panicked');
    
    setTimeout(() => {
      setGlobalMood('calm');
    }, 4000);

    setTimeout(() => {
      setFoodItems(prev => prev.filter(f => f.id !== newFood.id));
    }, 5000);
  };

  // ArtsY Ant Doodles
  useEffect(() => {
    const doodleInterval = setInterval(() => {
      const paths = [
        "M10 10 Q 50 50 90 10",
        "M10 50 L 90 50",
        "M50 10 L 50 90",
        "M20 20 A 30 30 0 1 0 80 80"
      ];
      const newDoodle = {
        id: Date.now(),
        path: paths[Math.floor(Math.random() * paths.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      };
      setDoodles(prev => [...prev, newDoodle].slice(-20)); // Keep last 20
    }, 15000);
    return () => clearInterval(doodleInterval);
  }, []);

  const renderPage = () => {
    const route = currentRoute.split('/')[0];
    const id = currentRoute.split('/')[1];

    switch (route) {
      case '#home': return <Home />;
      case '#portfolio': return <Portfolio />;
      case '#project': 
        const project = PROJECTS.find(p => p.id === id);
        return project ? <ProjectDetail project={project} /> : <Home />;
      case '#about': return <About />;
      case '#services': return <Services />;
      case '#contact': return <Contact />;
      case '#blog': 
        if (id) {
          const post = BLOG_POSTS.find(p => p.id === id);
          return post ? <BlogPostDetail post={post} /> : <Blog />;
        }
        return <Blog />;
      case '#throne-room': return <ThroneRoom />;
      case '#archive': return <ArchiveVault />;
      case '#training': return <TrainingGrounds />;
      case '#graveyard': return <GraveyardOfConcepts />;
      case '#colony': return <ColonySimulationPage />;
      default: return <Home />;
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <LoadingScreen />
      <KonamiCode />
      <ColonyTyping />
      <IdleMode />
      <MobileSwipeNavigation />
      
      {/* Parallax Background Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }} className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <motion.div animate={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }} className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        <motion.div animate={{ x: mousePos.x * 0.6, y: mousePos.y * 0.6 }} className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <motion.div animate={{ x: mousePos.x * 0.8, y: mousePos.y * 0.8 }} className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
        <motion.div animate={{ x: mousePos.x * 1.0, y: mousePos.y * 1.0 }} className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
      </div>

      {/* VFX Systems */}
      <VFXManager />
      <DayNightCycle />
      <AntClicker />
      <OracleAnt />
      <TunnelRadio />
      <AntCustomizer />
      <CrumbRush />
      <TunnelEscape />

      <Surface onFoodDrop={handleFoodDrop} />
      <TunnelNetwork />
      
      {/* Wall Doodles */}
      <div className="fixed inset-0 pointer-events-none z-[2]">
        {doodles.map(d => (
          <motion.svg
            key={d.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="absolute"
            style={{ left: d.x, top: d.y, width: 100, height: 100 }}
            viewBox="0 0 100 100"
          >
            <path d={d.path} stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.svg>
        ))}
      </div>

      <main className="relative z-10 pt-[150px] pb-20 px-4 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <MiniMap currentRoute={currentRoute} onNavigate={(route) => window.location.hash = route} />

      {/* Population Counter */}
      <div className="fixed bottom-8 left-8 z-[200] bg-black/80 border border-white/10 p-4 rounded-2xl backdrop-blur-md flex items-center gap-4 group hover:border-[var(--amber-glow)] transition-colors">
        <div className="w-10 h-10 rounded-full bg-[var(--amber-glow)] flex items-center justify-center text-black font-bold animate-pulse">
          🐜
        </div>
        <div>
          <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">COLONY POPULATION</div>
          <div className="text-xl font-display font-bold text-[var(--amber-glow)]">{population.toLocaleString()}</div>
        </div>
      </div>

      {/* Event Overlays */}
      <AnimatePresence>
        {activeEvent === 'TUNNEL_COLLAPSE' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] pointer-events-none bg-orange-900/20 animate-[screenShake_0.1s_infinite]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <h2 className="carved-text text-6xl text-red-500 mb-4">TUNNEL COLLAPSE!</h2>
              <p className="font-mono text-xl text-white">ALL ANTS TO SECTOR 4!</p>
            </div>
          </motion.div>
        )}

        {activeEvent === 'VISITOR_LADYBUG' && (
          <motion.div
            initial={{ x: -200, y: '50vh', rotate: 90 }}
            animate={{ x: '120vw' }}
            transition={{ duration: 10, ease: 'linear' }}
            className="fixed z-[300] pointer-events-none"
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="red" stroke="black" strokeWidth="4" />
              <circle cx="30" cy="30" r="5" fill="black" />
              <circle cx="70" cy="30" r="5" fill="black" />
              <circle cx="50" cy="50" r="5" fill="black" />
              <circle cx="30" cy="70" r="5" fill="black" />
              <circle cx="70" cy="70" r="5" fill="black" />
              <path d="M50 10 L50 90" stroke="black" strokeWidth="2" />
              <circle cx="50" cy="15" r="10" fill="black" />
            </svg>
          </motion.div>
        )}

        {activeEvent === 'QUEEN_SPEECH' && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[400] bg-white text-black p-8 rounded-3xl shadow-2xl border-4 border-[var(--queen-gold)] max-w-lg"
          >
            <div className="flex items-center gap-6">
              <Ant type="queen" className="scale-125" />
              <div>
                <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-2">ROYAL ANNOUNCEMENT</div>
                <p className="font-serif text-xl italic">"MY LOYAL SUBJECTS! THE CRUMB RESERVES ARE AT AN ALL-TIME HIGH. DIG ON!"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food Items Layer */}
      <div className="fixed inset-0 pointer-events-none z-[150]">
        {foodItems.map(food => (
          <motion.div
            key={food.id}
            initial={{ y: food.y, x: food.x, scale: 0 }}
            animate={{ 
              y: [food.y, 120, 115, 120], 
              scale: 1,
              rotate: [0, 10, -10, 0]
            }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, times: [0, 0.7, 0.85, 1] }}
            className="absolute"
          >
            <FoodGraphic type={food.type} crumbs={food.crumbs} />
          </motion.div>
        ))}
      </div>

      {/* Tunnel Dig Transition Overlay */}
      <AnimatePresence>
        {isDigging && (
          <motion.div 
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="tunnel-dig-overlay flex items-center justify-center"
          >
            <div className="text-center">
              <Ant type="worker" initialMood="excited" className="mb-4" />
              <h2 className="carved-text text-2xl">DIGGING TUNNEL...</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Mood Banner */}
      <AnimatePresence>
        {globalMood === 'panicked' && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 40 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-b-2xl z-[200] shadow-2xl flex items-center gap-4 animate-[screenShake_0.2s_infinite]"
          >
            <span className="text-2xl">🚨</span>
            <span className="font-display font-bold tracking-widest">FOOD DETECTED! COLONY IN FRENZY!</span>
            <span className="text-2xl">🚨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FoodGraphic: React.FC<{ type: string, crumbs?: any[] }> = ({ type, crumbs }) => {
  if (crumbs && type === 'crumb') {
    return (
      <div className="relative">
        {crumbs.map(c => (
          <motion.div
            key={c.id}
            animate={{ 
              x: [0, c.vx * 20], 
              y: [0, c.vy * 20],
              rotate: [0, c.rotate],
              opacity: [1, 0]
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 5 L5 2 L8 5 L5 8 Z" fill="#8B6914" />
            </svg>
          </motion.div>
        ))}
      </div>
    );
  }

  switch (type) {
    case 'crumb':
      return (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path d="M5 15 L10 5 L25 10 L20 25 L8 22 Z" fill="#8B6914" stroke="#5D3317" strokeWidth="2" />
        </svg>
      );
    case 'apple':
      return (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <circle cx="15" cy="15" r="12" fill="#4ade80" />
          <path d="M22 10 Q25 15 22 20" fill="none" stroke="#1A0F08" strokeWidth="2" />
        </svg>
      );
    case 'sugar':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect x="4" y="4" width="12" height="12" fill="white" stroke="#ccc" transform="rotate(45 10 10)" />
        </svg>
      );
    case 'leaf':
      return (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path d="M5 25 Q15 5 25 25 Z" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
};

export default App;
