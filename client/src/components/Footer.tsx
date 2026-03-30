/*
 * CONTINUUM — Footer
 * Design: Void Cartography — minimal, dark, clean grid
 * Logo + links + copyright. No clutter.
 */
import { motion } from "framer-motion";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 100% at 50% 0%, oklch(0.72 0.14 195 / 0.02) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8 mb-16">
          {/* Brand column */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-md bg-[oklch(0.72_0.14_195)] flex items-center justify-center">
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
              <span
                className="text-[oklch(0.93_0.005_60)] font-semibold tracking-tight text-[1.05rem]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Continuum
              </span>
            </a>
            <p className="font-body text-sm leading-[1.75] text-[oklch(0.4_0.008_260)] max-w-xs">
              A second brain built for speed, clarity, and real thinking.
              Stop managing notes. Start building knowledge.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { label: "Twitter", icon: "𝕏", href: "#" },
                { label: "GitHub", icon: "⌥", href: "#" },
                { label: "Discord", icon: "◈", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-[oklch(0.4_0.008_260)] hover:text-[oklch(0.72_0.14_195)] hover:border-[oklch(0.72_0.14_195/0.3)] transition-all duration-200 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="label-caps text-[oklch(0.55_0.008_260)] mb-5">{category}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-[oklch(0.4_0.008_260)] hover:text-[oklch(0.75_0.005_60)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[oklch(0.3_0.008_260)]">
            © {new Date().getFullYear()} Continuum. All rights reserved.
          </p>
          <p className="font-body text-xs text-[oklch(0.25_0.008_260)]">
            Built for thinkers. Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
