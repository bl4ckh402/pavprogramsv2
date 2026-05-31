import { useEffect, useState } from "react";
import { ArrowDown, Code, ArrowUpRight, Cpu, Radio } from "lucide-react";

interface HeroSectionProps {
  onLoaded: () => void;
  isLoaded: boolean;
}

export default function HeroSection({ onLoaded, isLoaded }: HeroSectionProps) {
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Loader percentage sweep
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          onLoaded();
          // Stagger main graphics load
          setTimeout(() => {
            setShowContent(true);
          }, 350);
        }, 500);
      }
      setLoadPercentage(current);
    }, 45);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <>
      {/* 1. Cinematic Fullscreen Loader Overlay */}
      <div
        className={`fixed inset-0 bg-[#040406] z-[999] flex flex-col justify-between p-12 select-none transition-all duration-1000 ease-in-out ${
          isLoaded ? "pointer-events-none opacity-0 translate-y-[-100%]" : "opacity-100"
        }`}
      >
        {/* Top bar header */}
        <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>KIMUTAI PAVIN KIPTOO // SYSTEM PORTFOLIO DEPLOYMENT</span>
          </div>
          <span>UTC PORTFOLIO_READY // 2026</span>
        </div>

        {/* Big percentage counter */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="font-mono text-[10vw] font-extrabold text-[#e1e2ec] leading-none mb-4 -tracking-wider">
            {loadPercentage.toString().padStart(3, "0")}
            <span className="text-primary font-light text-5xl">%</span>
          </div>
          <div className="space-y-2 text-center h-10 w-96 font-mono text-xs text-on-surface-variant relative overflow-hidden">
            {loadPercentage < 35 && (
              <span className="block animate-pulse">BOOTSTRAPPING MOBILE & WEB ENVIRONMENT...</span>
            )}
            {loadPercentage >= 35 && loadPercentage < 70 && (
              <span className="block animate-pulse text-primary">CONNECTING SECURE DATABASE AND API ROUTING...</span>
            )}
            {loadPercentage >= 70 && loadPercentage < 100 && (
              <span className="block animate-pulse text-tertiary">STREAMING DECENTRALIZED WORKFLOW BUFFERS...</span>
            )}
            {loadPercentage === 100 && (
              <span className="block text-teal-400">KIMUTAI PAVIN KIPTOO Portfolio Connected.</span>
            )}
          </div>

          {/* Loading line bar */}
          <div className="w-64 h-[1px] bg-white/5 rounded-full mt-6 overflow-hidden relative">
            <div
              className="h-full bg-primary ease-out duration-100 transition-all"
              style={{ width: `${loadPercentage}%` }}
            />
          </div>
        </div>

        {/* Bottom system credentials alignment */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-on-surface-variant gap-4">
          <span>PORT INGRESS: PORT 3000 // FULL STACK COMPOSE</span>
          <span>© 2026 KIMUTAI PAVIN KIPTOO. HIGH-PERFORMANCE CODE.</span>
        </div>
      </div>

      {/* 2. Fullscreen Hero content structure */}
      <section className="relative h-screen min-h-[700px] w-full flex flex-col justify-between items-center px-6 md:px-12 py-10 z-10 select-none overflow-hidden">
        
        {/* Empty placeholder block to push center contents */}
        <div className="w-full" />

        {/* Centerpiece Text reveal structure through line masks */}
        <div className="text-center z-10 max-w-5xl">
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-primary uppercase tracking-widest transition-all duration-1000 transform ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-tertiary" /> Full-Stack Mobile & Web3 Specialist
            </span>
          </div>

          <h1 className="font-sans text-5xl md:text-8xl font-black tracking-tighter text-on-surface leading-[0.9] text-mask select-none uppercase">
            <span
              className={`block transition-all duration-1000 delay-300 transform ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
              }`}
            >
              Kimutai Pavin
            </span>
            <span
              className={`block metallic-text transition-all duration-1000 delay-500 transform ${
                showContent ? "opacity-100 translate-y-0 text-glow" : "opacity-0 translate-y-24"
              }`}
            >
              Kiptoo
            </span>
          </h1>

          <div className="mt-8 max-w-xl mx-auto overflow-hidden">
            <p
              className={`font-body text-on-surface-variant text-base md:text-lg leading-relaxed transition-all duration-1000 delay-700 transform ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              Full-Stack Mobile, Web, and Web3 Developer with 4+ years of experience designing, building, and launching production-grade decentralized products.
            </p>
          </div>

          {/* Magnetic CTA buttons group */}
          <div
            className={`mt-10 flex flex-wrap gap-4 justify-center items-center transition-all duration-1000 delay-900 transform ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* CTA 1: Primary portfolio explore */}
            <button
              onClick={() => {
                const doc = document.getElementById("expertise-scroll-hook");
                doc?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-xl bg-white text-[#050508] font-sans font-bold text-sm tracking-tight hover:bg-[#adc6ff] hover:scale-95 duration-200 transition-all flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.06)] cursor-pointer"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* CTA 2: Secondary feedback connection */}
            <button
              onClick={() => {
                const doc = document.getElementById("contact-section");
                doc?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-xl border border-glass-stroke hover:border-primary text-on-surface hover:text-[#040406] hover:bg-[#adc6ff] hover:scale-95 duration-200 transition-all font-sans font-bold text-sm tracking-tight flex items-center gap-2 cursor-pointer"
            >
              <span>Secure Ingress</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator with animate bouncing node */}
        <div
          className={`flex flex-col items-center gap-2 opacity-50 transition-all duration-1000 delay-1000 ${
            showContent ? "opacity-40 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="font-mono text-[9px] text-[#adc6ff] tracking-widest uppercase">
            Scroll to Navigate
          </span>
          <div className="w-5 h-8 rounded-full border border-primary/30 flex items-start justify-center p-1 relative">
            <div className="w-1 h-2 rounded-full bg-primary animate-bounce mt-1" />
          </div>
        </div>

      </section>
    </>
  );
}
