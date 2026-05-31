import React, { useEffect, useState, useRef } from "react";
import { 
  ArrowUpRight, 
  Briefcase, 
  ChevronRight, 
  Compass, 
  Github, 
  Globe, 
  HelpCircle, 
  Linkedin, 
  Mail, 
  MessageSquare, 
  Terminal, 
  Layers, 
  CheckCircle,
  FileText
} from "lucide-react";
import { EXPERTISES, PROJECTS, STATS, TESTIMONIALS, BLOGS, WORK_EXPERIENCES } from "./data";
import ThreeCanvas from "./components/ThreeCanvas";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import HorizontalSequence from "./components/HorizontalSequence";
import ProductVisualization from "./components/ProductVisualization";
import StatsCounter from "./components/StatsCounter";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0.5, y: 0.5 });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [consoleCommand, setConsoleCommand] = useState("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "KIPTOO SYSTEM TERMINAL CONNECTED // V4.2.1",
    "Secure full-stack environment loaded successfully.",
    'Type "help" to view interactive commands'
  ]);

  // Form states
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / (scrollHeight || 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tracking proportional mouse coordinates globally to rotate central Core geometry
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // card dynamic tilt state management
  const [activeTiltCard, setActiveTiltCard] = useState<string | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8; // Pitch
    const rotateY = ((x - centerX) / centerX) * 8;  // Yaw

    setActiveTiltCard(cardId);
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(173, 198, 255, 0.15)`
    });
  };

  const handleCardMouseLeave = () => {
    setActiveTiltCard(null);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      boxShadow: "none"
    });
  };

  // Diagnostic terminal processor
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleCommand.trim()) return;

    const cmd = consoleCommand.toLowerCase().trim();
    let response = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;

    if (cmd === "help") {
      response = "Available codes: 'status', 'diagnostics', 'clear', 'resume', 'exit'.";
    } else if (cmd === "status") {
      response = "SYSTEM STATUS: ACTIVE // EXPERIMENTING AT 60 FPS // PORTFOLIO COMPLETED";
    } else if (cmd === "diagnostics") {
      response = "EXPERT LANGUAGES: TypeScript, Rust, Solidity, SQL, C++ // FRAMEWORKS: React Native, NextJS, Express/Node.js, Postgres";
    } else if (cmd === "clear") {
      setConsoleLogs([]);
      setConsoleCommand("");
      return;
    } else if (cmd === "resume") {
      response = "RECONCILING OPERATOR: Kimutai Pavin Kiptoo // EMAIL: pavkiptoo@gmail.com // GIT: github.com/bl4ckh401";
    } else if (cmd === "exit") {
      setTerminalOpen(false);
      return;
    }

    setConsoleLogs((prev) => [...prev, `> ${consoleCommand}`, response]);
    setConsoleCommand("");
  };

  // Feedback form handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Cinematic Film noise layer */}
      <div className="film-grain" />

      {/* Precision Double Follower Pointer */}
      <CustomCursor />

      {/* Embedded High Performance WebGL Canvas Core */}
      <ThreeCanvas scrollProgress={scrollProgress} cursorPos={cursorPos} />

      {/* Top Fixed Layer Header Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-glass-stroke">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
          
          {/* Logo Brand Brandmark */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#adc6ff]" />
            <span className="font-sans text-lg font-black tracking-tighter text-on-surface uppercase">
              Pavin <span className="text-[#ffb786]">Kiptoo</span>
            </span>
          </div>

          {/* Nav Interactive Anchor Links (with subtle line underlines) */}
          <ul className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <li>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-primary font-bold hover:opacity-80 transition-opacity cursor-pointer border-b-2 border-primary pb-1"
              >
                01 / HOME
              </button>
            </li>
            <li>
              <button 
                onClick={() => document.getElementById("expertise-scroll-hook")?.scrollIntoView({ behavior: "smooth" })}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer"
              >
                02 / SKILLS
              </button>
            </li>
            <li>
              <button 
                onClick={() => document.getElementById("timeline-section")?.scrollIntoView({ behavior: "smooth" })}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer"
              >
                03 / TIMELINE
              </button>
            </li>
            <li>
              <button 
                onClick={() => document.getElementById("recent-deployments")?.scrollIntoView({ behavior: "smooth" })}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer"
              >
                04 / WORK
              </button>
            </li>
            <li>
              <button 
                onClick={() => document.getElementById("insight-sections")?.scrollIntoView({ behavior: "smooth" })}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer"
              >
                05 / INSIGHTS
              </button>
            </li>
            <li>
              <button 
                onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer"
              >
                06 / CONTACT
              </button>
            </li>
          </ul>

          {/* Action pills buttons alignment */}
          <div className="flex items-center gap-4">
            
            {/* Terminal Diagnostic Shell Indicator */}
            <button
              onClick={() => setTerminalOpen(!terminalOpen)}
              className="relative w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
              title="Toggle Interactive CLI"
            >
              <Terminal className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-teal-400 rounded-full animate-ping" />
            </button>

            {/* Resume Callout */}
            <a
              href="https://github.com/bl4ckh401"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-lg bg-surface-container-highest font-mono text-xs text-primary border-t border-glass-stroke hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform hover:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Immersive Main Body */}
      <main className="relative z-10">
        
        {/* SECTION 1: Breathtaking Cinematic Hero Intro Overlay */}
        <HeroSection onLoaded={() => setIsLoaded(true)} isLoaded={isLoaded} />

        {/* SECTION 2: Organic Column Manifest Statement */}
        <section id="expertise-scroll-hook" className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-glass-stroke select-none">
          <div className="lg:col-span-4 max-w-sm">
            <span className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-tertiary rounded-full" /> 01 / DEVELOPMENT PHILOSOPHY
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-black text-on-surface uppercase leading-tight tracking-tighter">
              ENGINEERING <span className="metallic-text">HIGH-PERFORMANCE PRODUCTS</span>
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <p className="font-body text-xl md:text-2xl font-light text-[#c2c6d6] leading-relaxed">
              Modern software moves at breakneck speeds. I engineer robust, production-ready web and mobile products that bridge high-frequency Web3 protocols, intelligent AI microservices, and seamless offline-first mobile synchronization.
            </p>

            {/* Visual dynamic system tags */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-glass-stroke text-on-surface-variant">
              <div>
                <span className="block font-mono text-xs text-primary uppercase font-bold">OFFLINE-FIRST</span>
                <p className="font-body text-xs mt-2 leading-relaxed text-[#c2c6d6]">
                  SQLite queues and robust caching pipelines keep transactional applications active without network bottlenecks.
                </p>
              </div>

              <div>
                <span className="block font-mono text-xs text-tertiary uppercase font-bold">AUTOMATED</span>
                <p className="font-body text-xs mt-2 leading-relaxed text-[#c2c6d6]">
                  Orchestrated enterprise workflows utilizing n8n, Make.com, and custom Telegram telemetry hooks.
                </p>
              </div>

              <div>
                <span className="block font-mono text-xs text-[#2dd4bf] uppercase font-bold">DECENTRALIZED</span>
                <p className="font-body text-xs mt-2 leading-relaxed text-[#c2c6d6]">
                  Clean smart contracts and low-latency dashboards deployed across Ethereum, Solana, and BSC ecosystems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Featured Deployments & Work Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 select-none">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-glass-stroke pb-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-tertiary" /> 02 / SKILL VECTORS
              </span>
              <h3 className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-on-surface">
                Technical <span className="metallic-text">Capabilities</span>
              </h3>
            </div>
            <p className="font-body text-[#c2c6d6] text-sm md:text-base max-w-sm leading-relaxed">
              Curated capabilities demonstrating production-ready backend stacks, cross-chain Web3 scripts, mobile environments, and high-performance user interfaces.
            </p>
          </div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {EXPERTISES.map((node, idx) => {
              const colSpan = idx === 0 ? "md:col-span-5" : idx === 1 ? "md:col-span-7" : idx === 2 ? "md:col-span-8" : "md:col-span-4";
              
              return (
                <div
                  key={node.id}
                  onMouseMove={(e) => handleCardMouseMove(e, node.id)}
                  onMouseLeave={handleCardMouseLeave}
                  style={activeTiltCard === node.id ? tiltStyle : {}}
                  className={`${colSpan} glass-panel rounded-2xl p-8 relative overflow-hidden group transition-all duration-300 border border-glass-stroke flex flex-col justify-between min-h-[280px]`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/2 rounded-full blur-[50px] group-hover:bg-primary/5 transition-colors" />

                  {/* Header metadata */}
                  <div className="flex justify-between items-start z-10">
                    <span className="font-mono text-[9px] text-[#adc6ff] font-bold tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase">
                      {node.role}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      NODE_V.0{idx + 1}
                    </span>
                  </div>

                  {/* Content middle */}
                  <div className="space-y-3 mt-8 z-10">
                    <h4 className="font-sans text-2xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                      {node.title}
                    </h4>
                    <p className="font-body text-sm text-[#c2c6d6] leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  {/* Footer tech tags */}
                  <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-glass-stroke z-10">
                    {node.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-surface-container/50 border border-glass-stroke rounded-full font-mono text-[10px] text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3.5: Professional Career History Timeline */}
        <section id="timeline-section" className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 select-none">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-glass-stroke pb-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-tertiary" /> 03 / CAREER HISTORY
              </span>
              <h3 className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-on-surface">
                Professional <span className="metallic-text">Timeline</span>
              </h3>
            </div>
            <p className="font-body text-[#c2c6d6] text-sm md:text-base max-w-sm leading-relaxed">
              Tracking custom software development, automated business workflows, and smart contracts engineered for Kenyan and international operations.
            </p>
          </div>

          {/* Elegant vertical tree timeline structure */}
          <div className="relative border-l border-glass-stroke ml-4 md:ml-8 space-y-12">
            {WORK_EXPERIENCES.map((work) => (
              <div key={work.id} className="relative pl-8 md:pl-10 group">
                
                {/* Visual node dot indicator */}
                <div className="absolute -left-[6px] top-6 w-3 h-3 rounded-full bg-primary border-4 border-[#040406] group-hover:scale-125 duration-300 transition-transform shadow-[0_0_8px_#adc6ff]" />

                {/* Main Content card */}
                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-glass-stroke hover:border-primary/25 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-[45px] pointer-events-none" />

                  <div className="space-y-4 max-w-3xl">
                    <div className="space-y-1">
                      <span className="font-sans text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300 block">
                        {work.role}
                      </span>
                      <span className="font-mono text-xs text-tertiary font-medium block">
                        {work.company} • <span className="text-[#a1b0cb]">{work.location}</span>
                      </span>
                    </div>

                    <ul className="space-y-3.5 mt-4">
                      {work.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="font-body text-xs md:text-sm text-[#c2c6d6] leading-relaxed flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#2dd4bf] mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Period badge details */}
                  <div className="md:text-right mt-2 md:mt-0 flex-shrink-0">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 font-mono text-[10px] text-primary whitespace-nowrap select-none uppercase tracking-widest">
                      {work.period}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: sticky translation Horizontal sequence */}
        <HorizontalSequence projects={PROJECTS} />

        {/* SECTION 5: interactive Product Keynote Visualization */}
        <ProductVisualization />

        {/* SECTION 6: immersive Telemetry metrics & counters */}
        <StatsCounter stats={STATS} />

        {/* SECTION 7: Luxury Quotes & Client feedbacks */}
        <section className="relative w-full py-24 bg-[#050508] border-b border-glass-stroke select-none">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            {/* Header layout */}
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase">
                06 / TRUST CREDENTIALS
              </span>
              <h3 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tighter text-on-surface">
                Client <span className="metallic-text">Reciprocities</span>
              </h3>
              <p className="font-body text-on-surface-variant text-sm sm:text-base">
                Refined testimonials from product directors and creative studios.
              </p>
            </div>

            {/* Grid display layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {TESTIMONIALS.map((test) => (
                <div
                  key={test.id}
                  className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden hover:border-primary/20 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-[40px]" />
                  
                  {/* Big quotation sign block */}
                  <span className="block font-mono text-[80px] text-primary/10 leading-none h-12 -mt-4">
                    “
                  </span>

                  <p className="font-body text-base text-[#c2c6d6] leading-relaxed relative z-10 italic">
                    {test.quote}
                  </p>

                  {/* Profile info footer */}
                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-glass-stroke relative z-10">
                    <img
                      src={test.avatar}
                      alt={test.author}
                      className="w-12 h-12 rounded-full object-cover border border-[#adc6ff]/20 bg-surface-container"
                    />
                    <div>
                      <span className="block font-sans text-sm font-bold text-on-surface">
                        {test.author}
                      </span>
                      <span className="block font-mono text-[10px] text-on-surface-variant mt-0.5">
                        {test.role} // <span className="text-primary">{test.organization}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 8: Volumetric spatial thoughts & blog articles */}
        <section id="insight-sections" className="max-w-7xl mx-auto px-6 md:px-12 py-24 select-none">
          <div className="mb-16 border-b border-glass-stroke pb-6">
            <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <Layers className="w-3.5 h-3.5 text-tertiary" /> 07 / ENGINEERING INSIGHTS
            </span>
            <h3 className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-on-surface">
              Engineering <span className="metallic-text">Insights</span>
            </h3>
            <p className="font-body text-on-surface-variant text-sm sm:text-base mt-2 max-w-lg">
              Deep dives across offline mobile sync systems, high-density Web3 API channels, and automation workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Post Card */}
            <article 
              onClick={() => {
                const logsCmd = document.getElementById("terminal-diagnostic-hook");
                logsCmd?.scrollIntoView({ behavior: "smooth" });
                setTerminalOpen(true);
              }}
              className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden cursor-pointer group hover:border-[#adc6ff]/30 transition-all duration-300 hover:shadow-ao"
            >
              <div className="aspect-[16/10] w-full relative overflow-hidden border-b border-glass-stroke">
                <img
                  src={BLOGS[0].image}
                  alt={BLOGS[0].title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#ffb786] tracking-widest uppercase border border-white/5">
                  Featured Article
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 font-mono text-[10px] text-on-surface-variant mb-3">
                  <span className="text-primary">{BLOGS[0].category}</span>
                  <span>•</span>
                  <span>{BLOGS[0].date}</span>
                  <span>•</span>
                  <span>{BLOGS[0].readTime}</span>
                </div>
                <h4 className="font-sans text-2xl md:text-3xl font-extrabold text-on-surface group-hover:text-primary transition-colors duration-300">
                  {BLOGS[0].title}
                </h4>
                <p className="font-body text-sm text-[#c2c6d6] mt-4 leading-relaxed line-clamp-3">
                  {BLOGS[0].excerpt}
                </p>
                <div className="mt-8 flex items-center gap-1 font-mono text-xs text-primary group-hover:translate-x-2 transition-transform duration-300">
                  <span>Deconstruct Thesis</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </article>

            {/* List entries Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {BLOGS.slice(1).map((item) => (
                <article
                  key={item.id}
                  onClick={() => {
                    const logsCmd = document.getElementById("terminal-diagnostic-hook");
                    logsCmd?.scrollIntoView({ behavior: "smooth" });
                    setTerminalOpen(true);
                  }}
                  className="glass-panel p-6 rounded-2xl group cursor-pointer hover:border-primary/20 transition-all duration-300 flex gap-4 md:gap-6 justify-between items-center"
                >
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center gap-2 font-mono text-[9px] text-on-surface-variant">
                      <span className="text-primary">{item.category}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                    <h5 className="font-sans text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-300 leading-snug">
                      {item.title}
                    </h5>
                    <p className="font-body text-xs text-[#c2c6d6] line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transform group-hover:translate-x-1.5 transition-transform flex-shrink-0" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Diagnostic Terminal Console Workspace */}
        <section id="terminal-diagnostic-hook" className="relative max-w-4xl mx-auto px-6 py-12 select-none">
          <div className="rounded-2xl border border-glass-stroke bg-[#08080a] shadow-ao overflow-hidden">
            
            {/* Header toolbar */}
            <div className="px-5 py-4 border-b border-glass-stroke bg-[#050507] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs font-bold text-[#e1e2ec] tracking-widest uppercase">
                  INTERACTIVE KIPTOO SHELL
                </span>
              </div>

              {/* Window indicators */}
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>

            {/* Terminal logs canvas */}
            <div className="p-6 h-64 overflow-y-auto font-mono text-xs space-y-2.5 bg-[#030304] border-b border-glass-stroke">
              {consoleLogs.map((log, lidx) => (
                <div 
                  key={lidx} 
                  className={
                    log.startsWith(">") 
                      ? "text-tertiary" 
                      : log.includes("STATUS") || log.includes("EXPERT") || log.includes("RECONCILING")
                      ? "text-teal-400 font-semibold" 
                      : "text-on-surface-variant"
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Input CLI bar form */}
            <form onSubmit={handleTerminalSubmit} className="flex bg-[#050507]">
              <span className="p-4 font-mono text-xs text-primary bg-[#030304] border-r border-glass-stroke">
                KIPTOO:~$
              </span>
              <input
                type="text"
                value={consoleCommand}
                onChange={(e) => setConsoleCommand(e.target.value)}
                placeholder="Type 'status', 'diagnostics', or 'resume' to load PDF files..."
                className="flex-grow p-4 font-mono text-xs text-[#e1e2ec] bg-transparent outline-none border-none placeholder-white/20"
              />
              <button
                type="submit"
                className="px-6 bg-primary/10 border-l border-glass-stroke hover:bg-primary/20 text-primary font-mono text-xs uppercase cursor-pointer"
              >
                EXEC
              </button>
            </form>
          </div>
        </section>

        {/* SECTION 10: Final Secure Ingress Contact Form */}
        <section id="contact-section" className="relative w-full py-24 bg-[#050508] border-t border-b border-glass-stroke overflow-hidden select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/2 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
            <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase mb-2">
              08 // INTAKE FORM
            </span>
            <h3 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface text-center uppercase">
              Establish <span className="metallic-text">Secure Ingress</span>
            </h3>
            <p className="font-body text-on-surface-variant text-sm sm:text-base text-center max-w-lg mt-3">
              Message dispatch systems synchronized. File vectors securely encrypted inside transactional channels in real time.
            </p>

            {formSubmitted ? (
              <div className="mt-12 w-full max-w-lg glass-panel p-8 text-center rounded-2xl border border-teal-500/20 shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                <CheckCircle className="w-12 h-12 text-teal-400 mx-auto animate-bounce mb-4" />
                <h4 className="font-sans text-xl font-bold text-on-surface uppercase">
                  Telemetry Transmitted
                </h4>
                <p className="font-body text-xs text-[#c2c6d6] mt-2 mb-6">
                  Message securely logged inside DevOS state buffer. A telemetry technician will reconcile contacts shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactForm({ name: "", email: "", message: "" });
                  }}
                  className="font-mono text-xs uppercase tracking-wider text-primary border-b border-primary pb-0.5 hover:opacity-80 transition-opacity"
                >
                  Stream New Vector
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-12 w-full max-w-xl space-y-6">
                
                {/* Two inputs row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] uppercase text-[#adc6ff] tracking-widest">
                      Operator Pseudonym
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena V"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full p-4 rounded-xl border border-glass-stroke bg-[#08080c] focus:border-[#adc6ff]/50 outline-none text-sm text-[#e1e2ec] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] uppercase text-[#adc6ff] tracking-widest">
                      Digital Inbound Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. operator@aether.io"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full p-4 rounded-xl border border-glass-stroke bg-[#08080c] focus:border-[#adc6ff]/50 outline-none text-sm text-[#e1e2ec] transition-colors"
                    />
                  </div>
                </div>

                {/* Textarea block */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase text-[#adc6ff] tracking-widest">
                    Message Payload
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter structural metrics or agency cooperation details..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-4 rounded-xl border border-glass-stroke bg-[#08080c] focus:border-[#adc6ff]/50 outline-none text-sm text-[#e1e2ec] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-white text-[#050508] hover:bg-[#adc6ff] hover:scale-95 duration-200 transition-all font-sans font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Transmit Vector</span>
                </button>

              </form>
            )}
          </div>
        </section>

      </main>

      {/* SECTION 11: Volumetric immersive design system Footer */}
      <footer className="w-full py-16 bg-[#040407] border-t border-glass-stroke relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
            {/* Column 1 Logo details */}
            <div className="md:col-span-4 space-y-4">
              <span className="font-sans text-xl font-black text-on-surface tracking-tighter uppercase">
                Pavin<span className="text-[#ffb786]">/Kiptoo</span>
              </span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed max-w-sm">
                Premium full-stack web, mobile, and Web3 developer portfolio showcasing production-grade experiences, active automation chains, and high-performance codebases.
              </p>
            </div>

            {/* Column 2 Navigation Links list */}
            <div className="md:col-span-4 space-y-3">
              <span className="block font-mono text-[9px] uppercase tracking-widest text-[#adc6ff] font-bold">
                SYSTEM NAVIGATION
              </span>
              <ul className="space-y-2 font-body text-xs text-[#c2c6d6]">
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-tertiary" />
                    <span>01 // Home</span>
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById("expertise-scroll-hook")?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-primary transition-colors flex items-center gap-1.5 group cursor-pointer border-none bg-transparent p-0"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-tertiary" />
                    <span>02 // Core Skills</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById("timeline-section")?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-primary transition-colors flex items-center gap-1.5 group cursor-pointer border-none bg-transparent p-0"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-tertiary" />
                    <span>03 // Career Timeline</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById("recent-deployments")?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-primary transition-colors flex items-center gap-1.5 group cursor-pointer border-none bg-transparent p-0"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-tertiary" />
                    <span>04 // Built Work</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 External anchors */}
            <div className="md:col-span-4 space-y-3">
              <span className="block font-mono text-[9px] uppercase tracking-widest text-[#adc6ff] font-bold">
                COMMUNITY NETWORKS
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/bl4ckh401"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg glass-pill flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/40 transition-colors"
                  title="Github Profiles"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/kimutai-kiptoo/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg glass-pill flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/40 transition-colors"
                  title="LinkedIn Vector"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href="mailto:pavkiptoo@gmail.com"
                  className="w-10 h-10 rounded-lg glass-pill flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/40 transition-colors"
                  title="Contact Mail Relay"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <div className="pt-2">
                <span className="block font-mono text-[10px] text-on-surface-variant">
                  OPERATOR EMAIL: pavkiptoo@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Underlay legal metadata row */}
          <div className="border-t border-glass-stroke pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-on-surface-variant">
            <span>© 2026 Kimutai Pavin Kiptoo. High-Performance Digital Craft.</span>
            <div className="flex gap-6">
              <span className="text-primary">AWWWARDS LEVEL RESUME</span>
              <span>DETERMINISTIC CLOCK: LOCAL_STABLE</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating System Console Terminal modal */}
      {terminalOpen && (
        <div className="fixed bottom-24 right-6 w-96 z-50 rounded-xl border border-glass-stroke bg-[#08080c] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in select-none">
          <div className="px-4 py-3 border-b border-glass-stroke bg-[#050507] flex justify-between items-center text-xs font-mono">
            <div className="flex items-center gap-1.5 text-primary">
              <Terminal className="w-3.5 h-3.5" />
              <span>KIPTOO CONSOLE</span>
            </div>
            <button
              onClick={() => setTerminalOpen(false)}
              className="text-on-surface-variant hover:text-white cursor-pointer hover:bg-white/5 w-6 h-6 rounded flex items-center justify-center"
            >
              ×
            </button>
          </div>

          <div className="p-4 h-48 overflow-y-auto font-mono text-[10px] space-y-1.5 bg-[#030304]">
            {consoleLogs.map((log, lidx) => (
              <div key={lidx} className="text-[#adc6ff]/80">
                {log}
              </div>
            ))}
          </div>

          <form onSubmit={handleTerminalSubmit} className="flex bg-[#050507] border-t border-glass-stroke">
            <input
              type="text"
              value={consoleCommand}
              onChange={(e) => setConsoleCommand(e.target.value)}
              placeholder="Type command ('status', 'resume')..."
              className="flex-grow p-3 font-mono text-[10px] text-[#e1e2ec] bg-transparent outline-none border-none"
            />
            <button
              type="submit"
              className="px-4 bg-primary/10 border-l border-glass-stroke hover:bg-primary/20 text-primary font-mono text-[10px] uppercase cursor-pointer"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
