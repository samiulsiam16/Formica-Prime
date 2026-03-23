import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TunnelRadio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('CRUMB_Lofi_Beats');
  const [volume, setVolume] = useState(0.5);
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(16).fill(0));
  
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const oscillators = useRef<OscillatorNode[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const tracks = [
    'CRUMB_Lofi_Beats',
    'TUNNEL_DUBSTEP',
    'QUEEN_SYMPHONY',
    'ANT_JAZZ_COLLECTIVE',
    'DEEP_EARTH_AMBIENT'
  ];

  const initAudio = () => {
    if (audioContext.current) return;
    
    audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyser.current = audioContext.current.createAnalyser();
    gainNode.current = audioContext.current.createGain();
    
    analyser.current.fftSize = 64;
    gainNode.current.gain.value = volume;
    
    gainNode.current.connect(analyser.current);
    analyser.current.connect(audioContext.current.destination);
  };

  const playProceduralMusic = () => {
    if (!audioContext.current || !gainNode.current) return;
    
    // Simple procedural lo-fi beat
    const now = audioContext.current.currentTime;
    
    // Bass line
    const bass = audioContext.current.createOscillator();
    const bassGain = audioContext.current.createGain();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(55, now);
    bassGain.gain.setValueAtTime(0.2, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    bass.connect(bassGain);
    bassGain.connect(gainNode.current);
    bass.start(now);
    bass.stop(now + 0.5);
    
    // Melody
    const melody = audioContext.current.createOscillator();
    const melodyGain = audioContext.current.createGain();
    melody.type = 'triangle';
    const freqs = [261.63, 329.63, 392.00, 523.25];
    melody.frequency.setValueAtTime(freqs[Math.floor(Math.random() * freqs.length)], now);
    melodyGain.gain.setValueAtTime(0.1, now);
    melodyGain.gain.exponentialRampToValueAtTime(0.01, now + 1);
    melody.connect(melodyGain);
    melodyGain.connect(gainNode.current);
    melody.start(now);
    melody.stop(now + 1);
    
    oscillators.current.push(bass, melody);
  };

  useEffect(() => {
    let beatInterval: number;
    if (isPlaying) {
      initAudio();
      beatInterval = window.setInterval(playProceduralMusic, 1000);
      
      const updateVisualizer = () => {
        if (analyser.current) {
          const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
          analyser.current.getByteFrequencyData(dataArray);
          setVisualizerData(Array.from(dataArray.slice(0, 16)).map(v => v / 255));
        }
        animationFrameId.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();
    } else {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }
    
    return () => {
      clearInterval(beatInterval);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (gainNode.current) {
      gainNode.current.gain.value = volume;
    }
  }, [volume]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-4 bg-black/80 border border-white/10 p-4 rounded-3xl backdrop-blur-xl shadow-2xl group hover:border-[var(--amber-glow)] transition-all">
      <div className="w-12 h-12 rounded-full bg-[var(--amber-glow)] flex items-center justify-center text-black text-xl animate-pulse">
        📻
      </div>
      
      <div className="flex flex-col">
        <div className="text-[8px] font-mono opacity-40 uppercase tracking-widest">TUNNEL RADIO FM</div>
        <div className="text-sm font-bold text-[var(--amber-glow)] truncate w-32">{currentTrack}</div>
        
        <div className="radio-visualizer mt-2">
          {visualizerData.map((v, i) => (
            <div 
              key={i} 
              className="visualizer-bar" 
              style={{ height: `${v * 100}%`, opacity: 0.3 + v * 0.7 }} 
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>
        
        <button 
          onClick={() => setCurrentTrack(tracks[(tracks.indexOf(currentTrack) + 1) % tracks.length])}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          ⏭
        </button>

        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 accent-[var(--amber-glow)]"
        />
      </div>
    </div>
  );
};

export default TunnelRadio;
