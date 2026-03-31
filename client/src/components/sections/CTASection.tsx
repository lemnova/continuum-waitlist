/*
 * CONTINUUM — CTASection
 * Design: Void Cartography — full-width, high contrast, strong typography
 * The final conversion moment. No distractions.
 * WITH: Waitlist integration, email validation, API submission
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "../../const";
import { useInView } from "../../hooks/useInView";

const EASE = [0.16, 1, 0.3, 1] as const;
const WAITLIST_COOKIE = "continuum_waitlist_email";

function getSavedWaitlistEmail() {
  if (typeof document === "undefined") return "";

  const match = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${WAITLIST_COOKIE}=`));

  return match ? decodeURIComponent(match.split("=")[1] ?? "") : "";
}

function saveWaitlistEmail(email: string) {
  if (typeof document === "undefined") return;

  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${WAITLIST_COOKIE}=${encodeURIComponent(email)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export default function CTASection() {
  const { ref, inView } = useInView(0.15);
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedEmail = getSavedWaitlistEmail();

    if (savedEmail) {
      setEmail(savedEmail);
      setSubmittedEmail(savedEmail);
      setState("success");
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setState("error");
      return;
    }

    const existingEmail = getSavedWaitlistEmail();
    if (existingEmail) {
      setSubmittedEmail(existingEmail);
      setState("success");
      return;
    }

    const confirmed = window.confirm(
      `Confirm that you want to join the waitlist with:\n\n${normalizedEmail}`
    );

    if (!confirmed) {
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          saveWaitlistEmail(normalizedEmail);
          setSubmittedEmail(normalizedEmail);
          setState("success");
          return;
        }

        if (response.status === 400) {
          setErrorMessage("Invalid email address.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        setState("error");
        return;
      }

      saveWaitlistEmail(normalizedEmail);
      setSubmittedEmail(normalizedEmail);
      setEmail(normalizedEmail);
      setState("success");
    } catch (_error) {
      setErrorMessage("Something went wrong. Please try again.");
      setState("error");
    }
  };

  return (
    <section id="cta" ref={ref} className="relative py-28 lg:py-40 overflow-hidden">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Background: strong cyan glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.72 0.14 195 / 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, oklch(0.72 0.14 195 / 0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.72 0.14 195) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.72 0.14 195) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {inView && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mb-8"
              >
                <span className="label-caps text-[oklch(0.72_0.14_195)]">Join the waitlist</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[oklch(0.93_0.005_60)] mb-6"
              >
                Stop collecting notes.
                <br />
                <span className="italic text-[oklch(0.72_0.14_195)]">Start building knowledge.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="font-body text-[1.0625rem] leading-[1.75] text-[oklch(0.45_0.008_260)] mb-12 max-w-lg mx-auto"
              >
                Continuum is still being built.
                Leave your email and we’ll notify you when the beta becomes available.
              </motion.p>

              {/* Email form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              >
                {state === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-center justify-center gap-3 py-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[oklch(0.72_0.14_195)] flex items-center justify-center">
                      <Check size={16} className="text-[oklch(0.09_0.012_260)]" />
                    </div>
                    <p className="font-body text-[oklch(0.75_0.005_60)]">
                      {submittedEmail
                        ? `${submittedEmail} is already registered. We’ll let you know when the beta launches.`
                        : "You're on the list. We’ll let you know when the beta launches."}
                    </p>
                  </motion.div>
                ) : (
                  <div>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        disabled={state === "loading"}
                        required
                        className="flex-1 px-4 py-3.5 rounded-lg bg-[oklch(0.14_0.01_260)] border border-white/[0.1] text-[oklch(0.93_0.005_60)] placeholder:text-[oklch(0.35_0.008_260)] font-body text-sm focus:outline-none focus:border-[oklch(0.72_0.14_195/0.5)] focus:ring-1 focus:ring-[oklch(0.72_0.14_195/0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button 
                        type="submit" 
                        disabled={state === "loading"}
                        className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                      >
                        {state === "loading" ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Joining the waitlist...
                          </>
                        ) : (
                          <>
                            Join the waitlist
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </form>
                    {state === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 flex items-center justify-center gap-2 text-sm text-red-400"
                      >
                        <AlertCircle size={14} />
                        {errorMessage}
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Reassurances */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-6"
              >
                {[
                  "No spam",
                  "Launch updates",
                  "Beta invitation by email",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 label-caps text-[oklch(0.35_0.008_260)]">
                    <Check size={10} className="text-[oklch(0.72_0.14_195)]" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
