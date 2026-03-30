/*
 * CONTINUUM — ComparisonSection
 * Design: Void Cartography — table comparison, minimal, dark
 * Shows clearly why Continuum > Notion/Roam for thinking
 */
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { Check, X, Minus } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type CellValue = boolean | "partial";

const rows: { feature: string; continuum: CellValue; notion: CellValue; roam: CellValue }[] = [
  { feature: "Instant capture", continuum: true, notion: "partial", roam: true },
  { feature: "Auto-linking ideas", continuum: true, notion: false, roam: "partial" },
  { feature: "Entity system", continuum: true, notion: false, roam: false },
  { feature: "Sub-50ms response", continuum: true, notion: false, roam: false },
  { feature: "Keyboard-first", continuum: true, notion: "partial", roam: true },
  { feature: "Zero setup friction", continuum: true, notion: false, roam: false },
];

function CellIcon({ value }: { value: boolean | "partial" }) {
  if (value === true) return <Check size={16} className="text-[oklch(0.72_0.14_195)] mx-auto" />;
  if (value === false) return <X size={14} className="text-[oklch(0.35_0.008_260)] mx-auto" />;
  return <Minus size={14} className="text-[oklch(0.45_0.008_260)] mx-auto" />;
}

export default function ComparisonSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="container relative z-10">
        {inView && (
          <>
            <div className="max-w-2xl mb-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mb-6"
              >
                <span className="label-caps text-[oklch(0.72_0.14_195)]">Why Continuum</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
                className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[oklch(0.93_0.005_60)]"
              >
                Not just another{" "}
                <span className="italic text-[oklch(0.72_0.14_195)]">note-taking app.</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left pb-4 pr-8 font-body text-sm text-[oklch(0.35_0.008_260)] font-normal w-1/2">
                      Feature
                    </th>
                    <th className="pb-4 px-6 text-center">
                      <div className="inline-flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-md bg-[oklch(0.72_0.14_195)] flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="2.5" fill="oklch(0.09 0.012 260)" />
                            <circle cx="2" cy="3" r="1.5" fill="oklch(0.09 0.012 260)" opacity="0.8" />
                            <circle cx="12" cy="3" r="1.5" fill="oklch(0.09 0.012 260)" opacity="0.8" />
                            <circle cx="2" cy="11" r="1.5" fill="oklch(0.09 0.012 260)" opacity="0.8" />
                            <circle cx="12" cy="11" r="1.5" fill="oklch(0.09 0.012 260)" opacity="0.8" />
                            <line x1="7" y1="4.5" x2="2" y2="3" stroke="oklch(0.09 0.012 260)" strokeWidth="0.8" opacity="0.6" />
                            <line x1="7" y1="4.5" x2="12" y2="3" stroke="oklch(0.09 0.012 260)" strokeWidth="0.8" opacity="0.6" />
                            <line x1="7" y1="9.5" x2="2" y2="11" stroke="oklch(0.09 0.012 260)" strokeWidth="0.8" opacity="0.6" />
                            <line x1="7" y1="9.5" x2="12" y2="11" stroke="oklch(0.09 0.012 260)" strokeWidth="0.8" opacity="0.6" />
                          </svg>
                        </div>
                        <span className="font-display text-sm font-semibold text-[oklch(0.72_0.14_195)]">Continuum</span>
                      </div>
                    </th>
                    <th className="pb-4 px-6 text-center">
                      <div className="inline-flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-md bg-white/[0.06] flex items-center justify-center text-sm">N</div>
                        <span className="font-body text-sm text-[oklch(0.35_0.008_260)]">Notion</span>
                      </div>
                    </th>
                    <th className="pb-4 px-6 text-center">
                      <div className="inline-flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-md bg-white/[0.06] flex items-center justify-center text-sm">R</div>
                        <span className="font-body text-sm text-[oklch(0.35_0.008_260)]">Roam</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * 0.06 }}
                      className="border-t border-white/[0.05] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 pr-8 font-body text-sm text-[oklch(0.65_0.008_260)]">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-center bg-[oklch(0.72_0.14_195/0.03)]">
                        <CellIcon value={row.continuum} />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CellIcon value={row.notion} />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CellIcon value={row.roam} />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
