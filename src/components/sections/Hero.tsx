import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white px-6">
      <nav className="absolute top-0 left-0 w-full z-20 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-base font-black uppercase tracking-[0.3em]"
          >
            MotionCraft
          </motion.h1>
        </div>
      </nav>
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-black rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-zinc-800 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center"
      >
        <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-6 text-zinc-400">
          Interaction Design & Learning
        </span>
        <h1 className="text-6xl md:text-[8vw] leading-[1.1] md:leading-[0.9] font-black tracking-tighter uppercase font-display max-w-5xl mx-auto">
          CSS Animations <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-zinc-300"
          >
            Feel Alive
          </motion.span>
        </h1>
        <p className="mt-8 text-lg font-medium text-zinc-500 max-w-xl mx-auto leading-relaxed">
          An interactive scrollytelling journey that breaks down the physics,
          the code, and the art of modern motion design.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      {/* Decorative floating lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-10 w-24 h-px bg-zinc-100 rotate-45"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-20 w-32 h-px bg-zinc-100 -rotate-12"
        />
      </div>
    </section>
  );
}
