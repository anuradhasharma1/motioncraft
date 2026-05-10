import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const TRANSFORM_TYPES = [
  { id: 'translate', name: 'Translate', desc: 'Moves an element along the X or Y axis.' },
  { id: 'rotate', name: 'Rotate', desc: 'Turns an element clockwise or counter-clockwise.' },
  { id: 'scale', name: 'Scale', desc: 'Resizes an element without affecting its layout.' },
  { id: 'skew', name: 'Skew', desc: 'Tilts an element in two-dimensional space.' },
];

export default function Transforms() {
  const [active, setActive] = useState(TRANSFORM_TYPES[0]);

  const getAnimation = (id: string) => {
    switch (id) {
      case 'translate': return { x: [-30, 30] };
      case 'rotate': return { rotate: [0, 180] };
      case 'scale': return { scale: [0.8, 1.2] };
      case 'skew': return { skewX: [-20, 20] };
      default: return {};
    }
  };

  return (
    <section className="min-h-screen py-32 px-6 bg-white border-t border-zinc-100 flex items-center">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1 relative aspect-square bg-white border border-zinc-100 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-[0.03]">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-black" />
            ))}
          </div>

          <motion.div
            key={active.id}
            animate={getAnimation(active.id)}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-40 h-40 bg-black rounded-3xl flex items-center justify-center p-8 group overflow-hidden"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full transition-transform duration-500 group-hover:scale-[10]" />
          </motion.div>

          <div className="absolute top-8 left-8 text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
            CSS Property: {active.id === 'rotate' ? 'rotate' : active.id === 'scale' ? 'scale' : `transform: ${active.id}`}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 font-display">
            03. Geometric <br />
            <span className="text-zinc-300">Transforms</span>
          </h2>
          <p className="text-lg text-zinc-500 mb-12 max-w-sm leading-relaxed">
            Unlike layout properties, transforms are cheap to animate. 
            They are calculated on the GPU, allowing for smooth 60fps motion 
            even on complex web pages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRANSFORM_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActive(type)}
                className={cn(
                  "p-6 rounded-2xl border text-left transition-all duration-300",
                  active.id === type.id 
                    ? "bg-black border-black text-white" 
                    : "bg-white border-zinc-100 text-black hover:border-black"
                )}
              >
                <h3 className="font-bold uppercase tracking-tight">{type.name}</h3>
                <p className={cn(
                  "text-xs mt-2 transition-colors",
                  active.id === type.id ? "text-zinc-400" : "text-zinc-500"
                )}>
                  {type.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
