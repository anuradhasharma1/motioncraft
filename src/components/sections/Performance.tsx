import { useState } from 'react';
import { motion } from "framer-motion";
import { AlertCircle, Zap } from 'lucide-react';
import { cn } from "../../lib/utils";

export default function Performance() {
  const [activeType, setActiveType] = useState<'cpu' | 'gpu'>('gpu');

  return (
    <section className="min-h-screen py-32 px-6 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 font-display">
            04. The <span className="text-zinc-300">GPU</span> Advantage
          </h2>
          <p className="text-lg text-zinc-500 leading-relaxed">
            Every property you animate has a cost. Animating <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-900 font-mono text-sm">width</code> forces the browser to recalculate the layout of every element around it. 
            Animating <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-900 font-mono text-sm">transform</code> happens during the painting phase, bypassing the layout engine entirely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* CPU / Layout Section */}
          <div 
            onClick={() => setActiveType('cpu')}
            className={cn(
              "group p-10 rounded-3xl border transition-all duration-500 cursor-pointer",
              activeType === 'cpu' ? "bg-black border-black text-white shadow-2xl scale-[1.02]" : "bg-white border-zinc-100 text-black grayscale opacity-50 hover:opacity-100 hover:grayscale-0"
            )}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={cn(
                "p-3 rounded-full flex items-center justify-center",
                activeType === 'cpu' ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"
              )}>
                <AlertCircle size={20} />
              </div>
              <h3 className="font-bold uppercase tracking-widest text-sm">Layout Engine (CPU)</h3>
            </div>
            <p className={cn("text-sm mb-12 h-10", activeType === 'cpu' ? "text-zinc-400" : "text-zinc-500")}>
              Triggers: width, height, margin, padding, top, left...
            </p>
            
            <div className="space-y-4 bg-zinc-50/5 p-8 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest mb-4">
                <span>Rendering Pipeline</span>
                <span className="animate-pulse text-red-400">Bottleneck</span>
              </div>
              <motion.div 
                animate={{ width: activeType === 'cpu' ? ["20%", "100%", "20%"] : "20%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="h-12 bg-white rounded-lg flex items-center px-4"
              >
                <div className="w-full h-px bg-zinc-200" />
              </motion.div>
              <div className="flex gap-2">
                <div className="h-8 flex-1 bg-white/10 rounded" />
                <div className="h-8 flex-1 bg-white/10 rounded" />
                <div className="h-8 w-1/4 bg-white/10 rounded" />
              </div>
            </div>
          </div>

          {/* GPU / Composite Section */}
          <div 
            onClick={() => setActiveType('gpu')}
            className={cn(
              "group p-10 rounded-3xl border transition-all duration-500 cursor-pointer",
              activeType === 'gpu' ? "bg-black border-black text-white shadow-2xl scale-[1.02]" : "bg-white border-zinc-100 text-black grayscale opacity-50 hover:opacity-100 hover:grayscale-0"
            )}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={cn(
                "p-3 rounded-full flex items-center justify-center",
                activeType === 'gpu' ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"
              )}>
                <Zap size={20} />
              </div>
              <h3 className="font-bold uppercase tracking-widest text-sm">Composite Layer (GPU)</h3>
            </div>
            <p className={cn("text-sm mb-12 h-10", activeType === 'gpu' ? "text-zinc-400" : "text-zinc-500")}>
              Triggers: transform (translate, rotate, scale), opacity...
            </p>

            <div className="space-y-4 bg-zinc-50/5 p-8 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest mb-4">
                <span>Hardware Accelerated</span>
                <span className="text-green-400">High Efficiency</span>
              </div>
              <div className="h-12 w-full bg-zinc-900 rounded-lg flex items-center px-4 overflow-hidden relative">
                <motion.div 
                  animate={{ scaleX: activeType === 'gpu' ? [0.2, 1, 0.2] : 0.2 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 left-0 w-full bg-white origin-left"
                />
                <div className="relative z-10 w-full h-px bg-zinc-400 mix-blend-difference" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 flex-1 bg-white/10 rounded" />
                <div className="h-8 flex-1 bg-white/10 rounded" />
                <div className="h-8 w-1/4 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
