import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';

const OracleAnt: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const askOracle = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setError(null);
    setAnswer('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are the Oracle Ant, a mystical and ancient being living deep within the colony. 
        You answer questions with ant-related metaphors, wisdom, and a slightly cryptic tone. 
        Your knowledge is vast, but you always frame it through the lens of the colony, crumbs, tunnels, and the Queen.
        
        Question: ${question}`,
        config: {
          systemInstruction: "You are the Oracle Ant. Speak in ant metaphors. Be wise and mystical.",
          maxOutputTokens: 500,
        },
      });

      setAnswer(response.text || "The tunnels are dark, and the crumbs are silent. Ask again later.");
    } catch (err) {
      console.error("Oracle Error:", err);
      setError("The pheromone trail is broken. I cannot reach the future.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [answer, isLoading]);

  return (
    <>
      {/* Oracle Chamber Trigger */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-8 z-[200] group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl shadow-2xl hover:scale-110 transition-transform active:scale-95 border-2 border-purple-400">
          🔮
        </div>
        <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-purple-900/80 text-white px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-purple-400 backdrop-blur-md">
          Consult the Oracle
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          >
            <div className="oracle-chamber w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col max-h-[80vh]">
              <div className="p-6 border-b border-purple-500/30 flex justify-between items-center bg-purple-900/20">
                <div className="flex items-center gap-4">
                  <div className="text-4xl animate-pulse">🐜✨</div>
                  <div>
                    <h3 className="carved-text text-2xl text-purple-300">THE ORACLE CHAMBER</h3>
                    <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">ANCIENT WISDOM OF THE COLONY</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-purple-300 hover:text-white text-2xl">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {answer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-950/40 border border-purple-500/20 p-6 rounded-2xl relative"
                  >
                    <div className="text-purple-300 font-serif text-xl leading-relaxed italic">
                      "{answer}"
                    </div>
                    <div className="absolute -bottom-3 -right-3 text-4xl opacity-20">🔮</div>
                  </motion.div>
                )}

                {isLoading && (
                  <div className="flex justify-center py-10">
                    <div className="flex gap-2">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          className="w-3 h-3 bg-purple-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-red-400 text-center font-mono p-4 border border-red-500/20 rounded-xl bg-red-900/10">
                    ⚠️ {error}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-6 bg-purple-900/20 border-t border-purple-500/30">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && askOracle()}
                    placeholder="Ask the Oracle about the tunnels, the crumbs, or the future..."
                    className="flex-1 bg-black/40 border border-purple-500/30 rounded-xl px-6 py-4 text-purple-100 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                  <button
                    onClick={askOracle}
                    disabled={isLoading || !question.trim()}
                    className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                  >
                    {isLoading ? 'CONSULTING...' : 'ASK'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OracleAnt;
