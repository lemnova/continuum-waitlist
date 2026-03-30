/*
 * CONTINUUM — LogoTickerSection
 * Design: Void Cartography — subtle separator between Hero and Problem
 * "Used by people who outgrew:" + scrolling tool names
 */
import { motion } from "framer-motion";

const tools = [
  "Notion",
  "Roam Research",
  "Obsidian",
  "Evernote",
  "Apple Notes",
  "Bear",
  "Logseq",
  "Mem",
  "Notion",
  "Roam Research",
  "Obsidian",
  "Evernote",
  "Apple Notes",
  "Bear",
  "Logseq",
  "Mem",
];

export default function LogoTickerSection() {
  return (
    <section className="relative py-12 overflow-hidden border-y border-white/[0.05]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[oklch(0.09_0.012_260)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[oklch(0.09_0.012_260)] to-transparent pointer-events-none" />

      <div className="flex items-center gap-12 mb-4">
        <div className="flex-shrink-0 pl-8">
          <p className="label-caps text-[oklch(0.3_0.008_260)] whitespace-nowrap">
            Built for people who outgrew
          </p>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-12 items-center flex-shrink-0"
        >
          {tools.map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="font-display text-[1.125rem] font-semibold whitespace-nowrap text-[oklch(0.25_0.008_260)] hover:text-[oklch(0.45_0.008_260)] transition-colors duration-300 flex-shrink-0"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
