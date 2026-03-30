/*
 * CONTINUUM — Home Page
 * Design: Void Cartography — Bauhaus Digital / Scientific Minimalism
 * Dark mode first. Playfair Display headlines. DM Sans body.
 * Asymmetric layouts. Cyan accent. Framer Motion animations.
 */
import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";

import ProblemSection from "../components/sections/ProblemSection";
import SolutionSection from "../components/sections/SolutionSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";


import CTASection from "../components/sections/CTASection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.09_0.012_260)] text-[oklch(0.93_0.005_60)] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
