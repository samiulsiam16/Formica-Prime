import React, { useState } from 'react';
import Chamber from '../components/Chamber';
import Ant from '../components/Ant';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const categories = ['ALL', 'BRANDING', 'WEB', 'CAMPAIGNS', 'IDENTITY'];

  const filteredProjects = filter === 'ALL' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toUpperCase() === filter);

  return (
    <div className="flex flex-col items-center gap-12">
      <header className="text-center mb-8">
        <h1 className="carved-text text-4xl mb-4">THE GALLERY TUNNELS</h1>
        <p className="font-mono text-xs opacity-50 uppercase tracking-widest">OUR FINEST WORK (WE CARRIED IT OURSELVES)</p>
      </header>

      {/* Filter System */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat, i) => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex flex-col items-center gap-2 group transition-all duration-300 ${filter === cat ? 'scale-110' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}
          >
            <Ant 
              type={['worker', 'creative', 'strategy', 'reporter', 'merchant'][i % 5] as any} 
              className="scale-75"
              initialMood={filter === cat ? 'excited' : 'calm'}
            />
            <div className={`px-4 py-1 rounded-full border-2 text-[10px] font-bold tracking-widest uppercase ${filter === cat ? 'bg-[var(--amber-glow)] text-black border-white' : 'border-white/20'}`}>
              {cat}
            </div>
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <a href={`#project/${project.id}`} className="group block">
                <Chamber className="h-full min-h-[400px] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_50px_rgba(255,140,0,0.3)]">
                  <div className="absolute top-4 right-4 flex gap-1">
                    {Array.from({ length: project.crumbLevel }).map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-[var(--amber-glow)] rounded-full shadow-[0_0_5px_var(--amber-glow)]"></div>
                    ))}
                  </div>
                  
                  <div className="w-full aspect-square bg-[#1A0F08] rounded-2xl mb-6 overflow-hidden border-4 border-[#3D200E] relative">
                    <img 
                      src={`https://picsum.photos/seed/${project.id}/400/400`} 
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <h3 className="carved-text text-xl mb-1">{project.title}</h3>
                      <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest">{project.category}</p>
                    </div>
                  </div>

                  <p className="text-xs opacity-70 line-clamp-3 mb-6">{project.description}</p>

                  <div className="mt-auto flex items-center justify-between w-full">
                    <div className="flex -space-x-4">
                      <Ant type="worker" className="scale-50" />
                      <Ant type="creative" className="scale-50" />
                    </div>
                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest group-hover:text-[var(--amber-glow)] transition-colors">EXPLORE TUNNEL →</span>
                  </div>
                </Chamber>
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Portfolio;
