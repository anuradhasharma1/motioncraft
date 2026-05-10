import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const PRESETS = [
  { name: "Smooth Flow", value: [0.16, 1, 0.3, 1] },
  { name: "Punchy", value: [0.34, 1.56, 0.64, 1] },
  { name: "Subtle", value: [0.4, 0, 0.2, 1] },
  { name: "Mechanical", value: [1, 0, 0, 1] },
] as const;

export default function Easings() {
  const [activeCurve, setActiveCurve] = useState<(typeof PRESETS)[number]>(
    PRESETS[0],
  );

  const curvePath = useMemo(() => {
    const [x1, y1, x2, y2] = activeCurve.value;
    const w = 200;
    const h = 200;
    return `M 0 ${h} C ${x1 * w} ${(1 - y1) * h}, ${x2 * w} ${(1 - y2) * h}, ${w} 0`;
  }, [activeCurve]);

  return (
    <section className="min-h-screen py-32 px-6 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 font-display">
            02. Cubic <span className="text-zinc-300">Bezier</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            The secret to high-end UI motion is custom cubic bezier curves. They
            allow you to define the acceleration and deceleration at any point
            in the timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-12">
            <div className="flex flex-col gap-4">
              {PRESETS.map((curve) => (
                <button
                  key={curve.name}
                  onClick={() => setActiveCurve(curve)}
                  className={cn(
                    "group flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 text-left",
                    activeCurve.name === curve.name
                      ? "bg-black border-black text-white"
                      : "bg-white border-zinc-100 text-black hover:border-black",
                  )}
                >
                  <div>
                    <h3 className="font-bold text-lg">{curve.name}</h3>
                    <p
                      className={cn(
                        "font-mono text-xs mt-1",
                        activeCurve.name === curve.name
                          ? "text-zinc-400"
                          : "text-zinc-500",
                      )}
                    >
                      cubic-bezier({curve.value.join(", ")})
                    </p>
                  </div>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full border flex items-center justify-center transition-transform group-hover:rotate-45",
                      activeCurve.name === curve.name
                        ? "border-zinc-800"
                        : "border-zinc-100",
                    )}
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-square bg-zinc-50 rounded-3xl p-12 flex flex-col items-center justify-center border border-zinc-100 overflow-hidden">
            <div className="relative w-full aspect-square border-b border-l border-zinc-200">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full overflow-visible"
              >
                {/* Background grid lines */}
                <line
                  x1="0"
                  y1="50"
                  x2="200"
                  y2="50"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="100"
                  x2="200"
                  y2="100"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="150"
                  x2="200"
                  y2="150"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <line
                  x1="50"
                  y1="0"
                  x2="50"
                  y2="200"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <line
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="200"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <line
                  x1="150"
                  y1="0"
                  x2="150"
                  y2="200"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />

                <motion.path
                  key={activeCurve.name}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  d={curvePath}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>

              {/* Animated point tracking the curve */}
              <motion.div
                key={activeCurve.name + "-point"}
                animate={{
                  left: ["0%", "100%"],
                  top: ["100%", "0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: activeCurve.value,
                }}
                className="absolute w-4 h-4 bg-[#0380f4] rounded-full -translate-x-1/2 translate-y-1/2 ring-4 ring-zinc-50"
              />
            </div>

            <div className="mt-12 w-full h-8 bg-zinc-100 rounded-full overflow-hidden relative">
              <motion.div
                key={activeCurve.name + "-bar"}
                animate={{ scaleX: [0, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: activeCurve.value,
                }}
                className="absolute inset-0 bg-black origin-left"
              />
            </div>

            <div className="absolute top-6 left-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Ease: {activeCurve.name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
