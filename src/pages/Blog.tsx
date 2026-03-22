import React from 'react';
import Chamber from '../components/Chamber';
import Ant from '../components/Ant';
import { BLOG_POSTS } from '../constants';
import { motion } from 'motion/react';

const Blog: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-16">
      <header className="text-center">
        <h1 className="carved-text text-4xl mb-4">THE COLONY BULLETIN BOARD</h1>
        <p className="font-mono text-xs opacity-50 uppercase tracking-widest">LATEST NEWS FROM THE DEEP EARTH</p>
      </header>

      {/* Corkboard */}
      <div className="w-full bg-[#B5832A] p-12 rounded-3xl border-[20px] border-[#8B6914] shadow-2xl relative">
        {/* Cork Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')]"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 relative z-10">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <a href={`#blog/${post.id}`} className="group block">
                <div 
                  className="p-8 shadow-2xl relative transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2"
                  style={{ 
                    backgroundColor: post.color, 
                    transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (2 + Math.random() * 3)}deg)`,
                    color: '#2C1A0E'
                  }}
                >
                  {/* Push Pin */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full shadow-lg z-10 border-2 border-black/10"></div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <Ant type={post.author} className="scale-75" />
                    <div>
                      <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">BY {post.authorName}</div>
                      <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{post.date} • {post.readTime}</div>
                    </div>
                  </div>

                  <h3 className="handwritten text-2xl font-bold mb-4 group-hover:underline underline-offset-4">{post.title}</h3>
                  <p className="font-serif text-sm opacity-80 leading-relaxed mb-6">{post.teaser}</p>
                  
                  <div className="flex justify-end">
                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest group-hover:text-red-700 transition-colors">READ MORE →</span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Librarian Ant */}
      <div className="flex flex-col items-center gap-4 group">
        <Ant type="tiny" className="scale-110" />
        <div className="bg-white text-black p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl relative">
          <p className="speech-bubble-text">"HM! YES! EXCELLENT CHOICE OF READING MATERIAL."</p>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
        </div>
        <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest italic">THE COLONY LIBRARIAN (CURRENTLY NAPPING)</p>
      </div>
    </div>
  );
};

export default Blog;
