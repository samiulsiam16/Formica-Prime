import React from 'react';
import Chamber from '../components/Chamber';
import Ant from '../components/Ant';
import { motion } from 'motion/react';

const Services: React.FC = () => {
  const stalls = [
    { 
      id: 'brand', 
      title: 'BRAND IDENTITY', 
      ant: 'creative', 
      desc: 'We dig deep into your brand\'s soil. We find what\'s there. Then we build something that lasts through three tunnel collapses.',
      tiers: [
        { label: '🪨 PEBBLE PACKAGE', price: '$2,500', features: 'Logo + basic guidelines' },
        { label: '🪨🪨 STONE PACKAGE', price: '$5,000', features: 'Full visual identity' },
        { label: '🏔️ BOULDER PACKAGE', price: '$12,000', features: 'Complete brand system + launch' }
      ]
    },
    { 
      id: 'web', 
      title: 'WEB DEVELOPMENT', 
      ant: 'worker', 
      desc: 'Fast, accessible, and built so well it will outlast the tunnel system itself. Probably.',
      tiers: [
        { label: '🪨 DIG STARTER', price: '$3,500', features: '5-page site' },
        { label: '🪨🪨 COLONY STANDARD', price: '$8,000', features: 'Custom CMS + design' },
        { label: '🏔️ QUEEN\'S BUILD', price: '$18,000+', features: 'Full custom platform' }
      ]
    },
    { 
      id: 'campaigns', 
      title: 'CAMPAIGNS', 
      ant: 'reporter', 
      desc: 'Social, digital, print, and one time we did skywriting. The ants saw it. They were impressed.',
      tiers: [
        { label: '🪨 SURFACE SHOUT', price: '$1,500/mo', features: 'Social content + strategy' },
        { label: '🪨🪨 COLONY BROADCAST', price: '$4,000/mo', features: 'Full campaign management' },
        { label: '🏔️ GLOBAL SIGNAL', price: '$9,000/mo', features: 'Integrated multi-channel' }
      ]
    },
    { 
      id: 'strategy', 
      title: 'STRATEGY', 
      ant: 'strategy', 
      desc: 'Workshops, audits, roadmaps, and a 90-page document that will change how you see everything.',
      tiers: [
        { label: '🪨 SCOUT REPORT', price: '$1,200', features: 'Brand audit' },
        { label: '🪨🪨 WAR COUNCIL', price: '$4,500', features: 'Strategy sprint + roadmap' },
        { label: '🏔️ COLONY MASTER PLAN', price: '$10,000', features: 'Annual partnership' }
      ]
    },
    { 
      id: 'motion', 
      title: 'MOTION & VFX', 
      ant: 'motion', 
      desc: 'Animation, video production, interactive experiences. We once made a crumb look cinematic.',
      tiers: [
        { label: '🪨 WIGGLE PACKAGE', price: '$2,000', features: '3 animated assets' },
        { label: '🪨🪨 MOTION COLONY', price: '$6,000', features: 'Brand motion system' },
        { label: '🏔️ FULL PRODUCTION', price: '$15,000+', features: 'Video + animation suite' }
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center gap-20">
      <header className="text-center">
        <h1 className="carved-text text-4xl mb-4">THE MARKET TUNNELS</h1>
        <p className="font-mono text-xs opacity-50 uppercase tracking-widest">FINEST SERVICES IN ALL THE COLONY</p>
      </header>

      {/* Market Stalls */}
      <div className="w-full flex flex-col gap-12">
        {stalls.map((stall, i) => (
          <motion.div 
            key={stall.id}
            initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Chamber className="flex-row items-stretch p-0 overflow-hidden border-4 border-[#3D200E]">
              <div className="w-1/3 bg-[#1A0F08] p-8 flex flex-col items-center justify-center border-r-4 border-[#3D200E] gap-6">
                <Ant type={stall.ant as any} className="scale-125" />
                <h3 className="carved-text text-xl">{stall.title}</h3>
                <p className="text-xs opacity-60 leading-relaxed">{stall.desc}</p>
              </div>
              <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/20">
                {stall.tiers.map((tier) => (
                  <div key={tier.label} className="bg-[#1A0F08]/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-[var(--amber-glow)] transition-colors">
                    <div className="text-xs font-bold mb-4 opacity-80">{tier.label}</div>
                    <div className="typewriter text-2xl font-bold mb-2 text-[var(--amber-glow)]">{tier.price}</div>
                    <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-6">{tier.features}</p>
                    <button className="mt-auto w-full py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--amber-glow)] hover:text-black transition-all">
                      SELECT CRUMB
                    </button>
                  </div>
                ))}
              </div>
            </Chamber>
          </motion.div>
        ))}
      </div>

      {/* Special Offer */}
      <section className="w-full max-w-4xl">
        <div className="bg-linear-to-r from-orange-600 to-red-600 p-12 rounded-[60px] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 animate-pulse">
            <span className="text-4xl">⚡</span>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="carved-text text-4xl mb-6">LIMITED TIME BUNDLE</h2>
              <p className="text-xl font-serif mb-8 italic opacity-90">
                "BRAND + WEB BUNDLE — Save 20%. Queen-approved. Brainy verified. Artsy cried designing it."
              </p>
              <button 
                onClick={() => alert('CONFETTI EXPLOSION! (In spirit)')}
                className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
              >
                CLAIM THIS CRUMB
              </button>
            </div>
            <div className="flex -space-x-8">
              <Ant type="worker" className="scale-125" />
              <Ant type="creative" className="scale-125" />
              <Ant type="strategy" className="scale-125" />
            </div>
          </div>
          {/* Background Ants jostling */}
          <div className="absolute bottom-[-20px] left-0 w-full flex justify-around opacity-20 pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <Ant key={i} type="worker" className="scale-50" />
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full max-w-4xl text-center py-12 border-t border-white/5">
        <div className="flex items-center justify-center gap-8">
          <Ant type="worker" className="scale-75" />
          <p className="text-xs font-mono opacity-40 uppercase tracking-widest italic">
            "THIS IS THE PRICE LIST. I HAVE BEEN CARRYING IT SINCE 2022."
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
