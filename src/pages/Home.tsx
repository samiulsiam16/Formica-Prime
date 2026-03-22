import React from 'react';
import Chamber from '../components/Chamber';
import Ant from '../components/Ant';
import { motion } from 'motion/react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-20">
      {/* Grand Hall */}
      <Chamber className="w-full max-w-3xl min-h-[400px]">
        <div className="mb-8">
          <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto">
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="carved-text text-4xl fill-[var(--text-sepia)]">
              COLONY CREATIVE CO.
            </text>
            <path d="M20 70 L380 70" stroke="var(--text-sepia)" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
          </svg>
        </div>

        <div className="relative mb-12">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-[var(--queen-gold)] opacity-10 blur-3xl rounded-full"></div>
          <Ant type="queen" className="scale-150" />
          <div className="mt-4">
            <h3 className="carved-text text-xl opacity-80 italic">"THE QUEEN"</h3>
          </div>
        </div>

        <p className="font-display text-2xl tracking-widest mb-12 opacity-90">
          WE BUILD BRANDS. WE DIG DEEP. WE CARRY THE WORK.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Ant type="worker" className="scale-75" />
            <span className="text-[10px] font-mono opacity-50 uppercase tracking-tighter">Welcome Unit #1</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Ant type="worker" className="scale-75" />
            <span className="text-[10px] font-mono opacity-50 uppercase tracking-tighter">Welcome Unit #2</span>
          </div>
        </div>
      </Chamber>

      {/* Navigation Tunnels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <NavTunnel href="#portfolio" label="THE GALLERY" sub="OUR FINEST WORK" icon="🎨" />
        <NavTunnel href="#services" label="THE MARKET" sub="SERVICES & TIERS" icon="💰" />
        <NavTunnel href="#about" label="THE COUNCIL" sub="MEET THE ANTS" icon="👑" />
        <NavTunnel href="#contact" label="THE MAILROOM" sub="SAY HELLO" icon="✉️" />
      </div>

      {/* Metrics Section */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <Metric label="PROJECTS COMPLETED" value="147" />
        <Metric label="CRUMBS CARRIED" value="4.2 TB" />
        <Metric label="TUNNELS DUG" value="8 YRS" />
        <Metric label="CAFFEINATED ANTS" value="12,847" />
      </div>
    </div>
  );
};

const NavTunnel: React.FC<{ href: string, label: string, sub: string, icon: string }> = ({ href, label, sub, icon }) => (
  <a href={href} className="group">
    <div className="bg-[#1A0F08] border-2 border-[#3D200E] p-6 rounded-3xl transition-all duration-300 group-hover:border-[var(--amber-glow)] group-hover:shadow-[0_0_30px_rgba(255,140,0,0.2)] flex items-center gap-6">
      <div className="text-4xl">{icon}</div>
      <div className="text-left">
        <h4 className="carved-text text-lg group-hover:text-[var(--amber-glow)]">{label}</h4>
        <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{sub}</p>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <Ant type="worker" className="scale-50" />
      </div>
    </div>
  </a>
);

const Metric: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-[#1A0F08]/50 p-4 rounded-2xl border border-white/5 text-center">
    <div className="typewriter text-xl font-bold mb-1">{value}</div>
    <div className="text-[8px] font-mono opacity-40 uppercase tracking-tighter">{label}</div>
  </div>
);

export default Home;
