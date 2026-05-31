import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  scrollProgress: number; // 0 to 1
  cursorPos: { x: number; y: number };
}

export default function ThreeCanvas({ scrollProgress, cursorPos }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coreRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const dynamicLightRef = useRef<THREE.PointLight | null>(null);

  // FIX 1: Use refs for live values instead of closing over props in useEffect deps.
  // This lets the animation loop always read the latest values WITHOUT triggering
  // scene teardown/rebuild on every mouse move or scroll.
  const cursorRef = useRef(cursorPos);
  const scrollRef = useRef(scrollProgress);

  // Keep refs in sync with props — no re-renders, no scene rebuilds
  useEffect(() => {
    cursorRef.current = cursorPos;
  }, [cursorPos]);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  // FIX 2: Scene is built ONCE. Empty dependency array [].
  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x040406, 0.015);

    // --- Camera ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 18;
    cameraRef.current = camera;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    // FIX 3: Cap pixel ratio at 1.5 instead of 2.
    // At ratio 2 a 1080p screen renders at 4K — 4x the GPU fill rate for minimal visual gain.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0x06060c, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x4d8eff, 5.0);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xffb786, 3.5);
    rimLight.position.set(-8, -5, -4);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 15, 30);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    dynamicLightRef.current = pointLight;

    // --- Core Group ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    coreRef.current = coreGroup;

    const sphereGeo = new THREE.IcosahedronGeometry(2.5, 3);
    // Use MeshStandardMaterial instead of MeshPhysicalMaterial with transmission.
    // Transmission triggers a full extra render pass AND hides geometry behind the sphere
    // because the transmission framebuffer doesn't include background objects.
    // This achieves the same holographic glass look in a single render pass.
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xadc6ff,
      metalness: 0.15,
      roughness: 0.1,
      transparent: true,
      opacity: 0.22,
      flatShading: true,
      side: THREE.DoubleSide,   // render inner faces too — gives depth/glass illusion
      depthWrite: false,        // don't occlude objects behind it
    });
    const subSphere = new THREE.Mesh(sphereGeo, sphereMat);
    subSphere.renderOrder = 1;  // draw after opaque objects so transparency composites correctly
    coreGroup.add(subSphere);

    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.04, 8, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffb786,
      emissive: 0x723600,
      metalness: 0.9,
      roughness: 0.2,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI / 3;
    coreGroup.add(orbitRing1);

    const ringGeo2 = new THREE.TorusGeometry(4.0, 0.03, 8, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xadc6ff,
      emissive: 0x004395,
      metalness: 0.9,
      roughness: 0.1,
    });
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.y = Math.PI / 4;
    coreGroup.add(orbitRing2);

    const wireGeo = new THREE.IcosahedronGeometry(2.52, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    const innerGeo = new THREE.OctahedronGeometry(1.0, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x4d8eff,
      emissive: 0x002e6a,
      metalness: 0.9,
      flatShading: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    const nodeCount = 12;
    const spikeMat = new THREE.MeshStandardMaterial({
      color: 0xadc6ff,
      metalness: 0.8,
      roughness: 0.2,
    });
    // FIX 4: Share a single geometry and material across all spike instances.
    // Previously each spike got its own allocation — 12x the GPU memory.
    const spikeGeo = new THREE.CylinderGeometry(0, 0.15, 0.8, 4);
    const _up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = 2.4;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const spike = new THREE.Mesh(spikeGeo, spikeMat); // shared geo + mat
      spike.position.set(x, y, z);
      const pos = new THREE.Vector3(x, y, z).normalize();
      spike.quaternion.setFromUnitVectors(_up, pos);
      coreGroup.add(spike);
    }

    // --- Particles ---
    // FIX 5: Reduced particle count from 1200 → 700.
    // Particles with AdditiveBlending bypass depth culling — every single one is drawn.
    // 700 is visually indistinguishable but ~42% cheaper on the GPU fill rate.
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 6 + Math.random() * 24;
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      const ratio = Math.random();
      if (ratio < 0.6) {
        colors[i] = 0.61; colors[i + 1] = 0.77; colors[i + 2] = 1.0;
      } else {
        colors[i] = 1.0; colors[i + 1] = 0.71; colors[i + 2] = 0.52;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const canvasPoint = document.createElement("canvas");
    canvasPoint.width = 16;
    canvasPoint.height = 16;
    const ctx = canvasPoint.getContext("2d")!;
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvasPoint);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Pre-allocate reusable objects OUTSIDE the render loop — no per-frame GC pressure
    const lookAtTarget = new THREE.Vector3(0, 0, 0);

    // --- Animation Loop ---
    let animationFrameId: number;
    // Smoothed cursor influence (lerped each frame)
    let currentX = 0;
    let currentY = 0;
    // Separate accumulator for the base auto-spin — keeps spin independent of tilt
    let baseRotY = 0;
    let baseRotX = 0;

    const tick = () => {
      const cursor = cursorRef.current;
      const scroll = scrollRef.current;

      // Lerp cursor toward target — smooth inertia follow
      const targetX = (cursor.x - 0.5) * 2.5;
      const targetY = (cursor.y - 0.5) * 2.5;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Advance base spin independently
      baseRotY += 0.004;
      baseRotX += 0.0015;

      // Apply: base spin + cursor tilt as separate additive layers.
      // Cursor tilt uses a larger multiplier (0.4) so it's clearly visible.
      coreGroup.rotation.y = baseRotY + currentX * 0.4;
      coreGroup.rotation.x = baseRotX + currentY * 0.4;
      coreGroup.position.y = -scroll * 2;

      // Independent sub-object rotations — each spins on its OWN axis
      // ON TOP of the parent coreGroup spin, creating layered orbital motion
      orbitRing1.rotation.z += 0.008;   // ring 1 spins fast on Z
      orbitRing2.rotation.x += 0.005;   // ring 2 spins on X — counter to ring 1
      wireMesh.rotation.y  -= 0.006;    // wireframe counter-rotates on Y
      wireMesh.rotation.z  += 0.003;
      innerCore.rotation.x += 0.012;    // inner octahedron tumbles quickly
      innerCore.rotation.z -= 0.008;

      particles.rotation.y += 0.0007;
      particles.rotation.x -= 0.0002;

      camera.position.z = 18 - scroll * 11;
      camera.position.x = currentX * 1.2;
      camera.position.y = -currentY * 1.2;
      camera.lookAt(lookAtTarget);

      pointLight.intensity = 15 + Math.sin(Date.now() * 0.003) * 6;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // --- Resize ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      // FIX 8: Dispose ALL GPU resources explicitly, including renderer.
      // Missing renderer.dispose() previously left the WebGL context alive — a significant GPU memory leak.
      geometry.dispose();
      particleMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      spikeGeo.dispose();
      spikeMat.dispose();
      texture.dispose();
      renderer.dispose(); // ← was missing: releases the WebGL context itself

      try {
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      } catch (e) {
        console.log("Cleanup handled cleanly:", e);
      }
    };
  }, []); // FIX 2 continued: empty deps — scene is built once, never rebuilt

  return (
    <div
      id="three-webgl-wrapper"
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}