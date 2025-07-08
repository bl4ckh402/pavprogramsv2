"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Twitter, Mail } from "lucide-react"

export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [particles, setParticles] = useState<Array<{
    left: string
    top: string
    animationDelay: string
    animationDuration: string
  }>>([])
  const [shapes, setShapes] = useState<Array<{
    left: string
    top: string
    width: string
    height: string
    animationDelay: string
    animationDuration: string
  }>>([])

  useEffect(() => {
    setIsClient(true)
    
    // Generate particles only on client side
    const newParticles = Array.from({ length: 100 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }))
    
    // Generate shapes only on client side
    const newShapes = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${20 + Math.random() * 40}px`,
      height: `${20 + Math.random() * 40}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }))
    
    setParticles(newParticles)
    setShapes(newShapes)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, socialRef.current], {
        opacity: 0,
        y: 50,
      })

      const tl = gsap.timeline({ delay: 1 })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToExperience = () => {
    const experienceSection = document.getElementById("experience")
    experienceSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Animated CSS Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient && particles.length > 0 && particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient && shapes.length > 0 && shapes.map((shape, i) => (
          <div
            key={i}
            className="absolute border border-purple-500/20 rounded-lg animate-float"
            style={{
              left: shape.left,
              top: shape.top,
              width: shape.width,
              height: shape.height,
              animationDelay: shape.animationDelay,
              animationDuration: shape.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container-custom section-padding text-center">
          <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-bold font-playfair mb-6">
            <span className="gradient-text">KIMUTAI</span>
            <br />
            <span className="text-white">KIPTOO</span>
          </h1>

          <p ref={subtitleRef} className="text-2xl md:text-3xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
            DeFi Analyst & Blockchain Developer
          </p>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Optimizing trading strategies across 7+ blockchains • On-chain analysis expert • Building the future of DeFi
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full glow-effect transition-all duration-300 text-lg"
              onClick={scrollToExperience}
            >
              Explore My Work
              <ArrowDown className="ml-3 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-full transition-all duration-300 bg-transparent text-lg"
            >
              View Resume
            </Button>
          </div>

          <div ref={socialRef} className="flex justify-center space-x-8">
            <a
              href="https://github.com/bl4ckh401"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full glass-effect hover:glow-effect transition-all duration-300 group"
            >
              <Github className="h-7 w-7 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://x.com/@0xpandazz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full glass-effect hover:glow-effect transition-all duration-300 group"
            >
              <Twitter className="h-7 w-7 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="mailto:pavkiptoo@gmail.com"
              className="p-4 rounded-full glass-effect hover:glow-effect transition-all duration-300 group"
            >
              <Mail className="h-7 w-7 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
