import React from 'react';
import Chamber from '../components/Chamber';
import Ant from '../components/Ant';
import { BlogPost } from '../types';
import { motion } from 'motion/react';

interface BlogPostDetailProps {
  post: BlogPost;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post }) => {
  return (
    <div className="flex flex-col items-center gap-12">
      <a href="#blog" className="carved-text text-sm hover:text-[var(--amber-glow)] transition-colors self-start">
        ← BACK TO BULLETIN BOARD
      </a>

      <article className="w-full max-w-4xl bg-[#FAFAF5] text-[#2C1A0E] p-12 md:p-20 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Newspaper Masthead Style */}
        <header className="text-center border-b-4 border-double border-[#2C1A0E]/20 pb-12 mb-12">
          <div className="text-[10px] font-mono uppercase tracking-[0.5em] mb-4 opacity-60">THE COLONY GAZETTE — ISSUE #472</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <Ant type={post.author} className="scale-75" />
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-widest font-bold">BY {post.authorName}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-60">{post.date}</div>
              </div>
            </div>
            <div className="w-px h-8 bg-[#2C1A0E]/20"></div>
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-60">{post.readTime}</div>
          </div>
        </header>

        {/* Content */}
        <div className="font-serif text-xl leading-relaxed space-y-8 md:columns-2 gap-12">
          <p className="first-letter:text-7xl first-letter:font-display first-letter:float-left first-letter:mr-4 first-letter:mt-2">
            {post.content}
          </p>
          <p>
            The underground creative scene is evolving faster than we can dig. What used to be a simple matter of carrying crumbs has transformed into a complex ecosystem of brand pheromones and tunnel-resilient design.
          </p>
          
          <div className="bg-[#1A0F08] text-white p-8 rounded-2xl my-8 break-inside-avoid">
            <h4 className="carved-text text-lg mb-4 text-[var(--amber-glow)]">QUEEN'S MEMO</h4>
            <p className="text-sm italic opacity-80">
              "Every pixel must have a purpose. If it doesn't carry its weight, it doesn't belong in the colony."
            </p>
          </div>

          <p>
            As we look toward the surface world, we see a landscape of missed opportunities and shallow strategies. The Colony doesn't just build websites; we build foundations that can withstand the weight of the entire world above.
          </p>
          <p>
            In conclusion, whether you're a senior worker or a new recruit like Tiny, remember: the tunnel is the brand. Dig deep, carry well, and never forget where the crumbs come from.
          </p>
        </div>

        <footer className="mt-16 pt-8 border-t border-[#2C1A0E]/10 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[#2C1A0E] rounded-full flex items-center justify-center text-white text-xs">f</div>
            <div className="w-8 h-8 bg-[#2C1A0E] rounded-full flex items-center justify-center text-white text-xs">t</div>
            <div className="w-8 h-8 bg-[#2C1A0E] rounded-full flex items-center justify-center text-white text-xs">i</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">SHARE THIS CRUMB</span>
            <Ant type="tiny" className="scale-50" />
          </div>
        </footer>

        {/* Marginalia */}
        <div className="absolute top-1/2 -right-12 opacity-10 pointer-events-none">
          <Ant type="worker" className="scale-150 rotate-90" />
        </div>
        <div className="absolute bottom-12 -left-8 opacity-10 pointer-events-none">
          <Ant type="creative" className="scale-125 -rotate-12" />
        </div>
      </article>

      <div className="flex flex-col items-center gap-4 mt-12">
        <h3 className="carved-text text-xl">RELATED TUNNELS</h3>
        <div className="flex gap-8">
          <div className="w-48 h-32 bg-[#1A0F08] rounded-2xl border-2 border-[#3D200E] flex items-center justify-center group cursor-pointer hover:border-[var(--amber-glow)] transition-colors">
            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest group-hover:text-[var(--amber-glow)]">NEXT POST →</span>
          </div>
          <div className="w-48 h-32 bg-[#1A0F08] rounded-2xl border-2 border-[#3D200E] flex items-center justify-center group cursor-pointer hover:border-[var(--amber-glow)] transition-colors">
            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest group-hover:text-[var(--amber-glow)]">PREV POST ←</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
