import { useEffect, useRef, useState } from "react";
import { Project } from "../types";
import { ArrowUpRight, Cpu, Layers, Star } from "lucide-react";

interface HorizontalSequenceProps {
  projects: Project[];
}

export default function HorizontalSequence({ projects }: HorizontalSequenceProps) {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current || !scrollSectionRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const totalScrollHeight = triggerRef.current.clientHeight - window.innerHeight;
      
      // Calculate how far we are into the horizontal scroll section (0 to 1)
      const currentProgress = -rect.top / totalScrollHeight;
      const progressClamped = Math.max(0, Math.min(1, currentProgress));

      setScrollProgress(progressClamped);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial position calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Compute translateX percentage for horizontal slide movement
  // Let's scroll through the number of elements: 4 projects, sliding them smoothly.
  const percentageTranslate = scrollProgress * 70; // Adjust translation slider limits

  return (
    <div
      ref={triggerRef}
      className="relative w-full"
      style={{ height: "300vh" }} // 300vh scroll tracks slow vertical scrolling
    >
      {/* Pinned horizontal slider screen */}
      <div 
        ref={scrollSectionRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#05060a] transition-colors duration-1000 z-10"
        style={{
          background: `radial-gradient(circle at ${80 - scrollProgress * 50}% ${20 + scrollProgress * 40}%, rgba(223, 116, 18, ${0.05 + scrollProgress * 0.1}) 0%, rgba(13, 14, 21, 0) 70%), #040407`
        }}
      >
        {/* Background ambient mesh grid lines moving opposite */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none transition-transform duration-100 ease-out"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
            transform: `translateX(${-scrollProgress * 200}px)`
          }}
        />

        {/* Section Title Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 pb-4 z-20">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-1.5">
              <Star className="w-3 h-3 text-tertiary animate-pulse" /> 03 / Scroll Narrative
            </span>
            <h2 className="font-sans text-4xl md:text-5xl font-extrabold pb-2 tracking-tighter text-[#e1e2ec] flex items-baseline gap-2">
              <span className="metallic-text">Horizontal Storytelling</span>
              <span className="font-mono text-sm text-[#ffb786] font-normal border border-[#df7412]/30 px-2 py-0.5 rounded-full bg-[#df7412]/10">
                SCROLL VECTOR
              </span>
            </h2>
          </div>
        </div>

        {/* Horizontal Slider Track */}
        <div className="relative w-full overflow-hidden flex-grow flex items-center">
          <div
            className="flex gap-12 px-6 md:px-12 transition-transform duration-150 ease-out will-change-transform"
            style={{
              transform: `translate3d(-${percentageTranslate}vw, 0px, 0px)`,
            }}
          >
            {/* Introductory statement sliding first card */}
            <div className="w-[85vw] md:w-[45vw] flex-shrink-0 flex flex-col justify-center border-l-2 border-primary/20 pl-8 select-none">
              <span className="font-mono text-tertiary text-sm font-semibold tracking-wider">
                COGNITIVE PATHWAY
              </span>
              <h3 className="font-sans text-3xl md:text-5xl font-bold text-on-surface mt-4 leading-tight tracking-tight">
                Engineering multi-dimensional systems for elite products.
              </h3>
              <p className="font-body text-body-lg text-on-surface-variant mt-6 max-w-lg leading-relaxed">
                We design and implement custom digital workspaces where spatial interfaces, high-density telemetry data, and physics engines fuse seamlessly. Scroll further right to view recent live builds.
              </p>
              
              <div className="flex gap-8 mt-12 text-on-surface-variant font-mono text-xs border-t border-glass-stroke pt-6 max-w-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="text-primary w-4 h-4" />
                  <span>Interactive 3D</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="text-tertiary w-4 h-4" />
                  <span>Continuous Parallax</span>
                </div>
              </div>
            </div>

            {/* Dynamic Project Cards */}
            {projects.map((proj, idx) => {
              // Calculate specific slide entry progress
              const cardOffset = idx * 0.25;
              const isRevealed = scrollProgress > cardOffset;

              return (
                <div
                  key={proj.id}
                  className={`w-[85vw] md:w-[35vw] flex-shrink-0 glass-panel p-6 rounded-2xl flex flex-col justify-between group transition-all duration-700 relative overflow-hidden select-none hover:border-primary/20 hover:shadow-ao ${
                    isRevealed ? "opacity-100 translate-y-0" : "opacity-30 translate-y-12 scale-95"
                  }`}
                >
                  {/* Subtle rim glow overlay on card */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />

                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[16/10] bg-surface-container-low rounded-xl overflow-hidden border border-glass-stroke">
                    <img
                      src={proj.image}
                      alt={proj.mockupAlt}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-primary tracking-widest uppercase border border-white/5">
                      {proj.category}
                    </div>
                  </div>

                  {/* Card Descriptive Content */}
                  <div className="mt-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans text-xl md:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                        {proj.title}
                      </h4>
                      <p className="font-body text-sm text-[#c2c6d6] mt-3 line-clamp-3 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-glass-stroke flex justify-between items-center">
                      {/* Tech Pills */}
                      <div className="flex gap-1.5 flex-wrap max-w-[70%]">
                        {proj.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[9px] text-[#adc6ff] border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Launch indicator */}
                      <a
                        href={proj.link}
                        className="w-10 h-10 rounded-full border border-glass-stroke flex items-center justify-center text-on-surface group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-300"
                      >
                        <ArrowUpRight className="w-4 h-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom indicators */}
        <div className="border-t border-glass-stroke w-full py-4 bg-[#040407]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-xs font-mono text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              <span>Scroll Vertically to Slide</span>
            </div>
            
            {/* Scroll Progress line bar */}
            <div className="flex items-center gap-4 w-40 md:w-60">
              <span>0%</span>
              <div className="h-0.5 flex-grow bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-100 ease-out"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
