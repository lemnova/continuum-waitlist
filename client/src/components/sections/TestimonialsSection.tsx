/*
 * CONTINUUM — TestimonialsSection
 * Design: Void Cartography — large quote typography, minimal cards
 * Three testimonials in a staggered grid layout
 */
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";

const EASE = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote: "This changed how I think.",
    body: "I used to lose ideas constantly. Now every thought I capture connects to something. It's like my brain finally has a filing system that works.",
    author: "Marcus Chen",
    role: "Software Engineer, Stripe",
    avatar: "MC",
    featured: true,
  },
  {
    quote: "Better than Notion for thinking.",
    body: "Notion is great for organizing. Continuum is for thinking. The difference is massive once you feel it.",
    author: "Priya Nair",
    role: "Product Designer",
    avatar: "PN",
    featured: false,
  },
  {
    quote: "Feels like my brain got upgraded.",
    body: "I've tried every note-taking app. This is the first one where the tool disappears and only the thinking remains.",
    author: "James O'Brien",
    role: "Founder, Telescope Labs",
    avatar: "JO",
    featured: false,
  },
];

function TestimonialCard({
  quote,
  body,
  author,
  role,
  avatar,
  featured,
  delay,
}: typeof testimonials[0] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={`relative group rounded-2xl p-8 border transition-all duration-300 ${
        featured
          ? "border-[oklch(0.72_0.14_195/0.3)] bg-[oklch(0.72_0.14_195/0.05)] hover:border-[oklch(0.72_0.14_195/0.5)]"
          : "border-white/[0.06] bg-[oklch(0.12_0.01_260)] hover:border-white/[0.12]"
      }`}
    >
      {/* Quote mark */}
      <div
        className="font-display text-[4rem] leading-none font-bold mb-4 select-none"
        style={{ color: featured ? "oklch(0.72 0.14 195 / 0.4)" : "oklch(1 0 0 / 0.08)" }}
      >
        "
      </div>

      {/* Quote */}
      <h3
        className={`font-display text-[1.375rem] font-semibold leading-tight mb-4 ${
          featured ? "text-[oklch(0.93_0.005_60)]" : "text-[oklch(0.85_0.005_60)]"
        }`}
      >
        {quote}
      </h3>

      {/* Body */}
      <p className="font-body text-[0.9375rem] leading-[1.75] text-[oklch(0.45_0.008_260)] mb-8">
        {body}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[0.7rem] font-bold text-[oklch(0.09_0.012_260)]"
          style={{ background: "oklch(0.72 0.14 195)" }}
        >
          {avatar}
        </div>
        <div>
          <p className="font-body text-sm font-medium text-[oklch(0.75_0.005_60)]">{author}</p>
          <p className="label-caps text-[oklch(0.35_0.008_260)]">{role}</p>
        </div>
      </div>

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-6 right-6">
          <span className="label-caps text-[oklch(0.72_0.14_195)] bg-[oklch(0.72_0.14_195/0.1)] border border-[oklch(0.72_0.14_195/0.2)] px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="testimonials" ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, oklch(0.72 0.14 195 / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        {inView && (
          <div className="mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-6"
            >
              <span className="label-caps text-[oklch(0.72_0.14_195)]">Testimonials</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
              className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[oklch(0.93_0.005_60)] max-w-xl"
            >
              What thinkers{" "}
              <span className="italic text-[oklch(0.72_0.14_195)]">are saying.</span>
            </motion.h2>
          </div>
        )}

        {/* Testimonials grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {inView && testimonials.map((t, i) => (
            <TestimonialCard key={t.author} {...t} delay={0.15 + i * 0.12} />
          ))}
        </div>

        {/* Trust signals */}
        {inView && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16"
          >
            {[
              { value: "2,400+", label: "early users" },
              { value: "4.9/5", label: "average rating" },
              { value: "98%", label: "retention rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-[oklch(0.72_0.14_195)]">{stat.value}</div>
                <div className="label-caps text-[oklch(0.35_0.008_260)] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
