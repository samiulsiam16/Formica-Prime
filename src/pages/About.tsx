import React from 'react';
import Chamber from '../components/Chamber';
import Ant from '../components/Ant';
import { motion } from 'motion/react';

const About: React.FC = () => {
  const team = [
    { name: 'CARRY', role: 'Creative Director', type: 'worker', bio: '12 years in the industry. Has not slept since 2019. Still delivers on time.' },
    { name: 'ARTSY', role: 'Lead Designer', type: 'creative', bio: 'Communicates primarily through color theory. Won\'t explain the logo. Trust the logo.' },
    { name: 'BRAINY', role: 'Strategy Lead', type: 'strategy', bio: 'Has predicted every market trend since 2018 by watching crumb migration patterns.' },
    { name: 'SCOOP', role: 'Content Director', type: 'reporter', bio: 'Wrote 47 viral posts last year. Doesn\'t know how. Cannot replicate it. Won\'t try.' },
    { name: 'DEALS', role: 'Business Dev', type: 'merchant', bio: 'Has never lost a pitch. Has lost several friends explaining what a \'brand ecosystem\' is.' },
    { name: 'TINY', role: 'Junior Everything', type: 'tiny', bio: 'Day 47. Still finding new tunnels. Once got lost in the CSS for 6 hours.' }
  ];

  return (
    <div className="flex flex-col items-center gap-20">
      <header className="text-center">
        <h1 className="carved-text text-4xl mb-4">THE QUEEN'S COUNCIL ROOM</h1>
        <p className="font-mono text-xs opacity-50 uppercase tracking-widest">WHERE STRATEGY MEETS SOIL</p>
      </header>

      {/* Council Table */}
      <section className="relative w-full max-w-5xl aspect-video bg-[#1A0F08] rounded-[100px] border-8 border-[#3D200E] shadow-2xl flex items-center justify-center overflow-visible">
        <div className="absolute inset-8 border-4 border-dashed border-white/5 rounded-[80px]"></div>
        
        {/* The Queen */}
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center group">
          <Ant type="queen" className="scale-125" />
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            <p className="speech-bubble-text">"PROCEED. DO NOT DISAPPOINT ME."</p>
          </div>
        </div>

        {/* Team Members around table */}
        <div className="grid grid-cols-3 gap-x-32 gap-y-20">
          {team.map((member, i) => (
            <div key={member.name} className="relative group flex flex-col items-center">
              <Ant type={member.type as any} className="scale-110 hover:scale-125 transition-transform cursor-help" />
              <div className="mt-2 text-center">
                <h4 className="carved-text text-xs">{member.name}</h4>
                <p className="text-[8px] font-mono opacity-40 uppercase">{member.role}</p>
              </div>
              
              {/* Bio Bubble */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white text-black p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100 pointer-events-none z-50 w-48 shadow-2xl">
                <p className="speech-bubble-text text-center leading-tight">{member.bio}</p>
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Origin Story */}
      <section className="max-w-3xl w-full">
        <motion.div 
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="bg-[#F5E6C8] p-12 rounded-3xl text-[#2C1A0E] relative shadow-2xl"
        >
          <div className="absolute -top-8 -right-8">
            <Ant type="reporter" className="scale-125" />
          </div>
          <h2 className="font-display text-3xl mb-6 border-b-2 border-[#2C1A0E]/20 pb-4">COLONY ORIGINS</h2>
          <div className="font-serif text-lg space-y-4 leading-relaxed">
            <p>Founded in 2018 beneath a park bench in Brooklyn, Colony Creative Co. started with a single goal: to carry more than our body weight in creative excellence.</p>
            <p>What began as a small tunnel system for local crumb analysis quickly expanded into a multi-sector creative empire. We've survived three major tunnel collapses, two surface-world floods, and one very confusing incident involving a discarded donut.</p>
            <p>Today, we represent the pinnacle of underground strategy. We don't just build brands; we dig into their DNA, find the core nutrients, and help them grow toward the light.</p>
          </div>
          <div className="mt-8 flex justify-end">
            <Ant type="tiny" className="scale-75" />
          </div>
        </motion.div>
      </section>

      {/* Stats Wall */}
      <Chamber className="w-full max-w-4xl">
        <h2 className="carved-text text-2xl mb-12">COLONY METRICS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <StatItem icon="📁" label="PROJECTS COMPLETED" value="147" ant="worker" />
          <StatItem icon="📅" label="YEARS UNDERGROUND" value="8" ant="reporter" />
          <StatItem icon="💻" label="DATA PROCESSED" value="4.2 TB" ant="strategy" />
          <StatItem icon="☕" label="COFFEE CONSUMED" value="12,847" ant="tiny" />
          <StatItem icon="🏗️" label="TUNNEL COLLAPSES" value="3" ant="worker" />
          <StatItem icon="✅" label="MISSED DEADLINES" value="0" ant="queen" />
        </div>
      </Chamber>
    </div>
  );
};

const StatItem: React.FC<{ icon: string, label: string, value: string, ant: string }> = ({ icon, label, value, ant }) => (
  <div className="flex flex-col items-center gap-4 group">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="typewriter text-2xl font-bold">{value}</div>
    <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{label}</div>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      <Ant type={ant as any} className="scale-50" />
    </div>
  </div>
);

export default About;
