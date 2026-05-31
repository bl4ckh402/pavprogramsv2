import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowRight, Box, Compass, Cpu, HelpCircle, ShieldAlert } from "lucide-react";

interface FeatureDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  metrics: string;
  icon: React.ReactNode;
  cameraCoords: { x: number; y: number; z: number };
  lightColor: number; // Hex code
}

const SHIELD_FEATURES: FeatureDetail[] = [
  {
    id: "feat-core",
    name: "BetterOS Productivity Suite",
    category: "01 / PRODUCT HABITS",
    description: "Production-grade habit-tracking and workflow productivity engine pushed to Apple TestFlight and Google Play Console, utilizing automated CD pipelines.",
    metrics: "TestFlight Ready",
    icon: <Cpu className="w-5 h-5 text-primary" />,
    cameraCoords: { x: 0, y: 1.5, z: 5.5 },
    lightColor: 0x4d8eff
  },
  {
    id: "feat-optic",
    name: "Quran Guide AI Companion",
    category: "02 / INTELLIGENT COMPANION",
    description: "Intelligent islamic app launched on Apple App Store, incorporating interactive Quran recitation tracking, smart search queries, and customized LLM API integrations.",
    metrics: "App Store Live",
    icon: <Box className="w-5 h-5 text-tertiary" />,
    cameraCoords: { x: -3.5, y: 0.5, z: 4.0 },
    lightColor: 0xffb786
  },
  {
    id: "feat-flux",
    name: "Nairobi Dairy Delivery",
    category: "03 / OFFLINE RECONCILER",
    description: "Multi-layered delivery marketplace platform featuring offline-first data caching capabilities and an API-driven real-time inventory management ledger.",
    metrics: "< 5ms Webhook Response",
    icon: <Compass className="w-5 h-5 text-teal-400" />,
    cameraCoords: { x: 3.5, y: -1.0, z: 4.5 },
    lightColor: 0x2dd4bf
  }
];

export default function ProductVisualization() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const crystalMeshRef = useRef<THREE.Mesh | null>(null);
  const innerMeshRef = useRef<THREE.Mesh | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);

  // Initial and subsequent target camera positions
  const targetCamPos = useRef({ x: 0, y: 0, z: 6 });

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 4. Mesh - Large glass prism sculpture
    const geometry = new THREE.IcosahedronGeometry(2.0, 1); // Low-poly pristine crystal
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.02,
      transparent: true,
      opacity: 0.45,
      transmission: 0.95,
      ior: 1.8,
      thickness: 1.5,
      flatShading: true,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0
    });
    
    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);
    crystalMeshRef.current = crystal;

    // Inner glowing solid
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x4d8eff,
      emissive: 0x002e6a,
      metalness: 0.9,
      flatShading: true
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);
    innerMeshRef.current = innerMesh;

    // Outer skeletal orbital line
    const skeletonGeo = new THREE.IcosahedronGeometry(2.02, 1);
    const skeletonMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const skeleton = new THREE.Mesh(skeletonGeo, skeletonMat);
    scene.add(skeleton);

    // 5. Lighting setups
    const ambientLight = new THREE.AmbientLight(0x0a0a14, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(0x4d8eff, 3.0);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // Pulsing colored spotlight directly inside the core
    const mainSpot = new THREE.PointLight(0x4d8eff, 40, 20);
    mainSpot.position.set(0, 0, 0);
    scene.add(mainSpot);
    pointLightRef.current = mainSpot;

    // 6. Animation tick
    let animationId: number;
    let cameraCurrent = { x: 0, y: 0, z: 6 };

    const animate = () => {
      // Rotate meshes programmatically
      if (crystal) {
        crystal.rotation.y += 0.005;
        crystal.rotation.x += 0.002;
      }
      if (innerMesh) {
        innerMesh.rotation.y -= 0.008;
        innerMesh.rotation.z += 0.004;
      }
      if (skeleton) {
        skeleton.rotation.y += 0.005;
        skeleton.rotation.x += 0.002;
      }

      // Smooth lerp camera coordinates towards current selected targets
      cameraCurrent.x += (targetCamPos.current.x - cameraCurrent.x) * 0.05;
      cameraCurrent.y += (targetCamPos.current.y - cameraCurrent.y) * 0.05;
      cameraCurrent.z += (targetCamPos.current.z - cameraCurrent.z) * 0.05;

      camera.position.set(cameraCurrent.x, cameraCurrent.y, cameraCurrent.z);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        // Safe check to avoid DOM exceptions if component unmounts quickly
        try {
          if (mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
          }
        } catch (e) {
          console.log("Cleanup handled cleanly:", e);
        }
      }
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      skeletonGeo.dispose();
      skeletonMat.dispose();
    };
  }, []);

  // Update target coordinates and lighting scheme when selected tab changes
  useEffect(() => {
    const feat = SHIELD_FEATURES[activeFeatureIndex];
    if (!feat) return;

    // Shift target coords
    targetCamPos.current = feat.cameraCoords;

    // Transition light colors
    if (pointLightRef.current) {
      pointLightRef.current.color.setHex(feat.lightColor);
    }
    if (innerMeshRef.current) {
      // Match inner mesh emissive glow with selected feature theme
      const mat = innerMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(feat.lightColor);
      mat.emissive.setHex(feat.lightColor);
    }
  }, [activeFeatureIndex]);

  const activeFeat = SHIELD_FEATURES[activeFeatureIndex];

  return (
    <section className="relative w-full py-24 bg-[#050508] border-b border-glass-stroke overflow-hidden">
      {/* Background soft glowing blur sphere */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Keynote Feature Detail Sheet */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs text-primary font-semibold tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" /> 04 / Product Visualization
            </span>
            <h3 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface">
              Anatomy of <span className="metallic-text">Production Architectures</span>
            </h3>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              Explore the critical mechanical modules inside our built projects. Dynamic cameras refocus as you switch between deployment architectures.
            </p>
          </div>

          {/* Vertical Toggle Navigation List resembling Apple Keynote HUDs */}
          <div className="space-y-3">
            {SHIELD_FEATURES.map((feat, index) => {
              const isActive = index === activeFeatureIndex;

              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeatureIndex(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group ${
                    isActive
                      ? "bg-white/5 border-primary/30 shadow-[0_4px_20px_rgba(173,198,255,0.08)]"
                      : "bg-transparent border-glass-stroke hover:bg-white/2 hover:border-white/10"
                  }`}
                >
                  {/* Indicator Box */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      isActive ? "bg-primary/20 text-primary" : "bg-white/5 text-on-surface-variant"
                    }`}
                  >
                    {feat.icon}
                  </div>

                  {/* Title */}
                  <div className="flex-grow">
                    <span className="block font-mono text-[9px] text-on-surface-variant tracking-wider uppercase">
                      {feat.category}
                    </span>
                    <span
                      className={`font-sans text-sm font-bold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-on-surface hover:text-white"
                      }`}
                    >
                      {feat.name}
                    </span>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 text-on-surface-variant group-hover:text-primary transform transition-transform duration-300 ${
                      isActive ? "translate-x-0 scale-110" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic WebGL viewport (pivots dynamically) */}
        <div className="lg:col-span-7 relative h-[450px] md:h-[550px] w-full rounded-2xl glass-panel relative flex items-center justify-center overflow-hidden">
          
          {/* Framed overlay indicators */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#adc6ff] uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-white/5 flex items-center gap-1.5 z-20">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span>Interactive WebGL Rendering</span>
          </div>

          <div className="absolute top-4 right-4 font-mono text-[9px] text-on-surface-variant tracking-wider uppercase bg-black/20 px-3 py-1.5 rounded border border-white/5 z-20">
            CAM: LERPING ACTIVE
          </div>

          {/* Floating Contextual Glass Stat Card Overlay (gently tracks active focus point) */}
          <div 
            className="absolute bottom-6 left-6 right-6 lg:left-8 lg:right-8 glass-panel p-5 rounded-xl z-20 animate-fade-in transition-all duration-500 transform translate-y-0"
            key={activeFeatureIndex} // Force remount for beautiful fade transition
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="font-mono text-[10px] text-tertiary tracking-widest uppercase">
                  {activeFeat.category}
                </span>
                <h4 className="font-sans text-lg font-bold text-on-surface mt-1">
                  {activeFeat.name}
                </h4>
                <p className="font-body text-xs text-on-surface-variant mt-2 max-w-lg leading-relaxed">
                  {activeFeat.description}
                </p>
              </div>
              
              {/* Metric Box */}
              <div className="text-right flex-shrink-0">
                <span className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-wider">
                  Telemetry Target
                </span>
                <span className="block font-mono text-sm font-bold text-primary mt-1 bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                  {activeFeat.metrics}
                </span>
              </div>
            </div>
          </div>

          {/* Mount Node for WebGL Canvas */}
          <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
        </div>

      </div>
    </section>
  );
}
