import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const EASINGS = [
  { name: "Linear", value: "linear" },
  { name: "Ease-In", value: "easeIn" },
  { name: "Ease-Out", value: "easeOut" },
  { name: "Ease-In-Out", value: "easeInOut" },
] as const;

export default function Intro() {
  const [activeEasing, setActiveEasing] =
    useState<(typeof EASINGS)[number]["value"]>("linear");

  return (
    <section className="min-h-screen py-32 px-6 bg-white flex items-center border-t border-zinc-100">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 font-display">
            01. The Essence of <br />
            <span className="text-zinc-300">Motion</span>
          </h2>
          <p className="text-lg text-zinc-500 mb-8 max-w-md leading-relaxed">
            Animation is the representation of change over time. But in nature,
            nothing moves at a constant speed. Momentum, friction, and gravity
            create the "curves" we see in every movement.
          </p>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Choose an easing style:
            </p>
            <div className="flex flex-wrap gap-2">
              {EASINGS.map((easing) => (
                <button
                  key={easing.value}
                  onClick={() => setActiveEasing(easing.value)}
                  className={cn(
                    "px-5 py-2.5 rounded-full border text-sm font-bold transition-all duration-300",
                    activeEasing === easing.value
                      ? "bg-black border-black text-white"
                      : "bg-white border-zinc-200 text-black hover:border-black",
                  )}
                >
                  {easing.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative aspect-square lg:aspect-video bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100 flex items-center justify-center p-12">
          <div className="absolute inset-x-12 h-px bg-zinc-200" />

          <motion.div
            key={activeEasing}
            animate={{ x: [-200, 200] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: activeEasing,
            }}
            className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center z-10 shadow-xl"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">
            Visualizing: {activeEasing}
          </div>
        </div>
      </div>
    </section>
  );
}
