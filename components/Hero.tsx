"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

gsap.registerPlugin(TextPlugin)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, socialRef.current], {
        opacity: 0,
        y: 50,
      })

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        )

      // Floating animation for the hero section
      gsap.to(heroRef.current, {
        y: -10,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    projectsSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div ref={heroRef} className="container-custom section-padding text-center relative z-10">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold font-playfair mb-6">
          Creative
          <span className="gradient-text block">Developer</span>
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Crafting digital experiences that blend innovation with artistry. Specializing in modern web development and
          interactive design.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full glow-effect transition-all duration-300"
            onClick={scrollToProjects}
          >
            View My Work
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
          >
            Download Resume
          </Button>
        </div>

        <div ref={socialRef} className="flex justify-center space-x-6">
          <a href="#" className="p-3 rounded-full glass-effect hover:glow-effect transition-all duration-300 group">
            <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </a>
          <a href="#" className="p-3 rounded-full glass-effect hover:glow-effect transition-all duration-300 group">
            <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </a>
          <a href="#" className="p-3 rounded-full glass-effect hover:glow-effect transition-all duration-300 group">
            <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
