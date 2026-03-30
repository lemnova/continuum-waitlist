/*
 * CONTINUUM — HeroSection
 * Design: Void Cartography — asymmetric layout, Playfair Display headline
 * Left: headline + subheadline + CTAs | Right: animated knowledge graph
 * Background: near-black with subtle radial gradient + grid
 */
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import KnowledgeGraph from "../KnowledgeGraph";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: EASE, delay },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 70% 50%, oklch(0.72 0.14 195 / 0.07) 0%, transparent 55%),
            radial-gradient(ellipse 60% 80% at 15% 30%, oklch(0.72 0.14 195 / 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 50% 100%, oklch(0.09 0.012 260) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(1 0 0 / 0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      <div className="container relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div {...fadeUp(0.1)}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.72_0.14_195/0.3)] bg-[oklch(0.72_0.14_195/0.06)] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.14_195)] animate-pulse" />
                <span className="label-caps text-[oklch(0.72_0.14_195)]">Now in early access</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="font-display text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[oklch(0.93_0.005_60)] mb-6"
            >
              Your thoughts,{" "}
              <em className="not-italic text-[oklch(0.72_0.14_195)] italic">finally</em>
              <br />
              connected.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.3)}
              className="font-body text-[1.0625rem] leading-[1.75] text-[oklch(0.5_0.008_260)] mb-10 max-w-md"
            >
              Continuum is a second brain built for speed, clarity, and real thinking.
              Stop managing notes.{" "}
              <span className="text-[oklch(0.75_0.005_60)] font-medium">Start building knowledge.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3">
              <a href="#cta" className="btn-primary animate-pulse-glow">
                Start building your mind
                <ArrowRight size={16} />
              </a>
              <a href="#how-it-works" className="btn-secondary">
                <Play size={14} className="opacity-70" />
                See how it works
              </a>
            </motion.div>


          </div>

          {/* Right: Knowledge Graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="relative h-[420px] lg:h-[540px]"
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-4 rounded-2xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 80% at 50% 50%, oklch(0.72 0.14 195 / 0.1) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Graph container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.06]">
              <KnowledgeGraph />
            </div>

            {/* Floating label: top right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
              className="absolute -top-3 right-4 bg-[oklch(0.12_0.01_260/0.95)] backdrop-blur-sm border border-white/[0.08] rounded-xl px-3.5 py-2.5 shadow-xl"
            >
              <p className="label-caps text-[oklch(0.72_0.14_195)] mb-1">Knowledge node</p>
              <p className="text-[0.75rem] text-[oklch(0.75_0.005_60)] font-body font-medium">React Hooks → State Management</p>
            </motion.div>

            {/* Floating label: bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
              className="absolute -bottom-3 left-4 bg-[oklch(0.12_0.01_260/0.95)] backdrop-blur-sm border border-white/[0.08] rounded-xl px-3.5 py-2.5 shadow-xl"
            >
              <p className="label-caps text-[oklch(0.72_0.14_195)] mb-1">Connected idea</p>
              <p className="text-[0.75rem] text-[oklch(0.75_0.005_60)] font-body font-medium">Mental Models → Decision Making</p>
            </motion.div>

            {/* Floating counter: top left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8, ease: EASE }}
              className="absolute top-4 left-4 bg-[oklch(0.12_0.01_260/0.95)] backdrop-blur-sm border border-[oklch(0.72_0.14_195/0.2)] rounded-xl px-3 py-2 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.14_195)] animate-pulse" />
                <span className="font-display text-sm font-bold text-[oklch(0.72_0.14_195)]">247</span>
                <span className="label-caps text-[oklch(0.45_0.008_260)]">connections</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-caps text-[oklch(0.3_0.008_260)]">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[oklch(0.72_0.14_195/0.4)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
