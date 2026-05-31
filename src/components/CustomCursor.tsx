import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clickActive, setClickActive] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  // Smooth position lerping values
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hidden on touchscreen mobile devices automatically
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setHovered(true);
    const handleHoverEnd = () => setHovered(false);

    const onMouseDown = () => setClickActive(true);
    const onMouseUp = () => setClickActive(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Dynamic selector binding for interactive elements
    const updateInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], .interactive-node, .persp-card, input, select, textarea'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    updateInteractiveListeners();

    // Setup inert loop for ring trailing
    let animationFrameId: number;
    const lerpRing = () => {
      const dx = position.x - ringPos.current.x;
      const dy = position.y - ringPos.current.y;
      
      // Interpolate with dynamic inertia factor
      ringPos.current.x += dx * 0.14;
      ringPos.current.y += dy * 0.14;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${
          hovered ? 1.8 : 1
        })`;
      }

      animationFrameId = requestAnimationFrame(lerpRing);
    };

    lerpRing();

    // Periodically re-bind if React renders new dynamic components
    const intervalId = setInterval(updateInteractiveListeners, 2000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, [position, hovered]);

  // If touched on coarse mobile pointer, don't render custom desktop cursor
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* 1. Core Center Pinpoint Dot */}
      <div
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000] mix-blend-screen transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
          hovered 
            ? "bg-tertiary scale-[1.5] shadow-[0_0_10px_#ffb786]" 
            : "bg-primary shadow-[0_0_6px_#adc6ff]"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* 2. Outer Lerping Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border transition-colors duration-300 ${
          clickActive
            ? "border-tertiary bg-tertiary/10"
            : hovered
            ? "border-primary-container bg-primary/5"
            : "border-primary/20 bg-transparent"
        }`}
        style={{
          willChange: "transform",
        }}
      />
    </>
  );
}
