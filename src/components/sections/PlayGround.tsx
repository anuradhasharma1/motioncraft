import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw, Check } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Playground() {
  const [copied, setCopied] = useState(false);
  const [params, setParams] = useState<{
    duration: number;
    delay: number;
    rotate: number;
    scale: number;
    y: number;
    ease: EasingType;
  }>({
    duration: 1.5,
    delay: 0,
    rotate: 0,
    scale: 1,
    y: 0,
    ease: "easeInOut",
  });

  const easingOptions = [
    "linear",
    "easeIn",
    "easeOut",
    "easeInOut",
    "backInOut",
    "circInOut",
  ] as const;

  type EasingType = (typeof easingOptions)[number];

  const cssCode = `@keyframes customAnimation {
  0% { transform: scale(1) rotate(0deg) translateY(0px); }
  100% { transform: scale(${params.scale}) rotate(${params.rotate}deg) translateY(${params.y}px); }
}

.element {
  animation: customAnimation ${params.duration}s ${params.ease} ${params.delay}s infinite alternate;
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen py-32 px-6 bg-black text-white selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 font-display">
                05. Final <span className="text-zinc-600">Playground</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Connect the dots. Experiment with durations, delays, and
                transforms to see how they come together in real CSS.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  label: "Duration (s)",
                  key: "duration",
                  min: 0.1,
                  max: 5,
                  step: 0.1,
                },
                { label: "Delay (s)", key: "delay", min: 0, max: 2, step: 0.1 },
                {
                  label: "Rotate (deg)",
                  key: "rotate",
                  min: -360,
                  max: 360,
                  step: 1,
                },
                { label: "Scale", key: "scale", min: 0.2, max: 2, step: 0.1 },
                {
                  label: "Y-Offset (px)",
                  key: "y",
                  min: -200,
                  max: 200,
                  step: 1,
                },
              ].map((control) => (
                <div key={control.key} className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                    <span>{control.label}</span>
                    <span className="text-white font-mono">
                      {params[control.key as keyof typeof params]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={params[control.key as keyof typeof params] as number}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        [control.key]: parseFloat(e.target.value),
                      })
                    }
                    className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white"
                  />
                </div>
              ))}

              <div className="space-y-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                  Easing Function
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {easingOptions.map((e) => (
                    <button
                      key={e}
                      onClick={() => setParams({ ...params, ease: e })}
                      className={cn(
                        "px-3 py-2 rounded-lg border text-[10px] font-bold tracking-wider uppercase transition-all duration-300",
                        params.ease === e
                          ? "bg-white border-white text-black"
                          : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-500",
                      )}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex-1 bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-center p-20 relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-[0.02]">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-white" />
                ))}
              </div>

              <motion.div
                key={JSON.stringify(params)}
                animate={{
                  scale: [1, params.scale],
                  rotate: [0, params.rotate],
                  y: [0, params.y],
                }}
                transition={{
                  duration: params.duration,
                  delay: params.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: params.ease,
                }}
                className="w-40 h-40 bg-white rounded-[2rem] shadow-[0_0_80px_rgba(255,255,255,0.1)] flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </motion.div>

              <button
                onClick={() =>
                  setParams({
                    duration: 1.5,
                    delay: 0,
                    rotate: 0,
                    scale: 1,
                    y: 0,
                    ease: "easeInOut",
                  })
                }
                className="absolute top-6 right-6 p-2 rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-white transition-all duration-300"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                  CSS Output
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-zinc-300 transition-colors"
                >
                  {copied ? (
                    <Check size={12} className="text-green-500" />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copied ? "Copied" : "Copy Code"}
                </button>
              </div>
              <pre className="font-mono text-sm overflow-x-auto text-zinc-300 bg-zinc-950 p-6 rounded-xl border border-zinc-800 leading-relaxed">
                {cssCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
