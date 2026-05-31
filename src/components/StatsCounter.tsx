import { useEffect, useRef, useState } from "react";
import { StatItem } from "../types";
import { Activity, ShieldCheck, Zap } from "lucide-react";

interface CounterProp {
  target: number;
  suffix: string;
}

function AnimateCounter({ target, suffix }: CounterProp) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const startCount = () => {
      let start = 0;
      const duration = 1500; // ms
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quad out easing count
        const easedProgress = progress * (2 - progress);
        const currentCount = Math.floor(easedProgress * target);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(update);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCount();
          if (observerRef.current && elementRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [target]);

  return (
    <span ref={elementRef} className="font-sans font-extrabold text-[#e1e2ec] tracking-tighter text-5xl md:text-7xl">
      {count}
      <span className="text-[#ffb786]">{suffix}</span>
    </span>
  );
}

interface StatsCounterProps {
  stats: StatItem[];
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  return (
    <section className="relative w-full py-24 bg-[#0a0a0f] border-b border-glass-stroke overflow-hidden">
      {/* Background neon laser grid accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #4d8eff 1px, transparent 1px), linear-gradient(to bottom, #4d8eff 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />
      <div className="absolute -bottom-48 right-12 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header content with luxury text alignment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-tertiary animate-pulse" /> 05 / Immersive Telemetry
            </span>
            <h3 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface">
              Performance Metrology <br />& <span className="metallic-text">Scale Parameters</span>
            </h3>
          </div>
          <p className="font-body text-on-surface-variant text-base max-w-md leading-relaxed">
            All deployments undergo rigorous profiling protocols. We ensure absolute frame-pacing and deterministic timing so complex physics models operate with perfect inertia.
          </p>
        </div>

        {/* Dynamic Responsive Stats Grid resembling highly technical engineering consoles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {stats.map((item, index) => (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between hover:border-primary/20 transition-all duration-300 shadow-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-[40px] group-hover:bg-primary/5 transition-colors" />

              {/* Icon / Top Metadata Bar */}
              <div className="flex justify-between items-center text-on-surface-variant border-b border-glass-stroke pb-4 mb-4 font-mono text-[9px] tracking-wider uppercase">
                <span className="text-primary font-bold">NODE // 0{index + 1}</span>
                <span className="text-on-surface-variant flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  <Activity className="w-2.5 h-2.5 text-tertiary" /> ACTIVE FEED
                </span>
              </div>

              {/* Number presentation */}
              <div>
                <AnimateCounter target={item.value} suffix={item.suffix} />
                
                {/* Horizontal Growing Line Gauge */}
                <div className="h-1 bg-white/5 rounded-full mt-4 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-container transition-all duration-[2000ms] ease-out flex items-center justify-end"
                    style={{
                      width: `${item.value > 100 ? 100 : item.value}%`,
                    }}
                  />
                </div>
              </div>

              {/* Descriptive Content */}
              <div className="mt-6 space-y-2">
                <h4 className="font-sans text-sm font-bold text-on-surface tracking-tight">
                  {item.label}
                </h4>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Console System Status Footer bar resembling mission control terminals */}
        <div className="mt-12 p-4 rounded-xl border border-glass-stroke bg-white/2 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-on-surface-variant">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span>METRIC TELEMETRY: ENGINE REPORT STATUS INBOUND [ONLINE]</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED DEPLOYMENTS
            </span>
            <span className="hidden md:inline">SYSTEM LOAD: DETERMINISTIC // LEVEL_00</span>
          </div>
        </div>

      </div>
    </section>
  );
}
