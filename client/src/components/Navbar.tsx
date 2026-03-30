/*
 * CONTINUUM — Navbar
 * Design: Void Cartography — minimal, dark, transparent-to-solid on scroll
 * Font: DM Sans for nav items. Logo uses Playfair Display.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.09_0.012_260/0.92)] backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[oklch(0.55_0.008_260)] hover:text-[oklch(0.93_0.005_60)] transition-colors duration-200 text-sm font-medium font-body"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#cta" className="btn-primary text-sm py-2 px-5">
            Get early access
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[oklch(0.55_0.008_260)] hover:text-[oklch(0.93_0.005_60)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[oklch(0.09_0.012_260/0.97)] backdrop-blur-md border-b border-white/[0.06] overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[oklch(0.75_0.005_60)] hover:text-[oklch(0.93_0.005_60)] transition-colors text-sm font-medium py-1"
                >
                  {link.label}
                </a>
              ))}
              <a href="#cta" className="btn-primary text-sm text-center mt-2" onClick={() => setMobileOpen(false)}>
                Get early access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
