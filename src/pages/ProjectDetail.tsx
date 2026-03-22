import React from 'react';
import Chamber from '../components/Chamber';
import Ant from '../components/Ant';
import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="carved-text text-5xl mb-8">{project.title}</h1>
        
        <div className="relative group">
          <div className="absolute -inset-4 bg-[var(--amber-glow)] opacity-10 blur-2xl rounded-[40px]"></div>
          <Chamber className="max-w-4xl mx-auto p-4 overflow-hidden border-8 border-[#8B6914]">
            <img 
              src={`https://picsum.photos/seed/${project.id}-hero/1200/600`} 
              alt={project.title}
              className="w-full rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            {/* Straining Ants */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <Ant type="worker" className="scale-75" initialMood="panicked" />
            </div>
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
              <Ant type="worker" className="scale-75" initialMood="panicked" />
            </div>
            <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
              <Ant type="worker" className="scale-75" initialMood="panicked" />
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
              <Ant type="worker" className="scale-75" initialMood="panicked" />
            </div>
          </Chamber>
        </div>
      </section>

      {/* Info Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoBlock label="CLIENT" value={project.client} />
        <InfoBlock label="TIMELINE" value={project.timeline} />
        <InfoBlock label="ROLE" value={project.role} />
        <InfoBlock label="CRUMB LEVEL" value={`${project.crumbLevel}/5`} />
      </div>

      {/* Body Content */}
      <section className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="relative">
          <motion.div 
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="carved-text text-3xl mb-6">THE CHALLENGE</h2>
            <p className="text-lg leading-relaxed opacity-80">
              {project.description}
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div 
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="carved-text text-3xl mb-6">THE SOLUTION</h2>
            <p className="text-lg leading-relaxed opacity-80">
              We implemented a multi-layered strategy that focused on organic growth and tunnel-resilient architecture. By leveraging the colony's unique strengths, we were able to deliver a solution that exceeded all surface-world benchmarks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results Parade */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 bg-black/40 py-12 overflow-hidden border-y border-white/5">
        <div className="flex animate-[paradeWalk_30s_linear_infinite] whitespace-nowrap gap-20">
          {project.results.map((result, i) => (
            <div key={i} className="flex items-center gap-4">
              <Ant type="worker" className="scale-50" />
              <div className="bg-[var(--amber-glow)] text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm">
                {result}
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {project.results.map((result, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-4">
              <Ant type="worker" className="scale-50" />
              <div className="bg-[var(--amber-glow)] text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm">
                {result}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Parade */}
      <section className="w-full max-w-4xl py-20 border-y border-white/5 overflow-hidden">
        <h3 className="carved-text text-2xl mb-12 text-center">THE RESULTS PARADE</h3>
        <div className="flex gap-20 animate-[resultsParade_20s_linear_infinite]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 whitespace-nowrap">
              <Ant type={['worker', 'creative', 'tiny'][i % 3] as any} className="scale-75" />
              <div className="flex flex-col">
                <span className="text-4xl font-display font-bold text-[var(--amber-glow)]">+{(i + 1) * 15}%</span>
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">METRIC GROWTH</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Quote */}
      <section className="max-w-4xl mx-auto w-full">
        <div className="relative bg-[#F5E6C8] p-12 rounded-[60px] text-[#2C1A0E] shadow-2xl">
          <div className="absolute -top-6 -left-6">
            <Ant type="tiny" className="scale-150" />
          </div>
          <blockquote className="text-2xl font-serif italic mb-8 relative z-10">
            "{project.quote.text}"
          </blockquote>
          <div className="text-right">
            <p className="font-bold uppercase tracking-widest">{project.quote.author}</p>
            <p className="text-xs opacity-60">{project.quote.authorTitle}</p>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-10 right-20 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[40px] border-t-[#F5E6C8]"></div>
        </div>
      </section>

      <footer className="text-center mt-20">
        <a href="#portfolio" className="carved-text text-xl hover:text-[var(--amber-glow)] transition-colors">
          ← BACK TO GALLERY TUNNELS
        </a>
      </footer>
    </div>
  );
};

const InfoBlock: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-[#1A0F08] p-6 rounded-3xl border-2 border-[#3D200E] text-center">
    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-2">{label}</div>
    <div className="carved-text text-sm">{value}</div>
  </div>
);

export default ProjectDetail;
