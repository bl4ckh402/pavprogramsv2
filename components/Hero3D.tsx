"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 10
      const y = (clientY / innerHeight - 0.5) * 10
      heroRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="text-center space-y-12">
          <div className="space-y-6">
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-playfair">
              <span className="block text-white mb-4">Hi, I'm</span>
              <span className="block gradient-text">Pavin Kiptoo</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Full-Stack Developer & UI/UX Designer crafting exceptional digital experiences
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="btn-primary px-8 py-4 text-lg">
              View My Work
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-secondary px-8 py-4 text-lg">
              Contact Me
            </Button>
          </div>

          <div className="flex justify-center space-x-6 pt-8">
            {[
              { icon: Github, href: "https://github.com/bl4ckh401", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/kimutai-kiptoo/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:pavkiptoo@gmail.com", label: "Email" }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="glass-card p-4 rounded-full hover:glow-blue transition-all">
                  <Icon className="h-6 w-6 text-blue-400" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div ref={heroRef} className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block transition-transform duration-200">
        <div className="glass-card p-8 rounded-3xl">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
            <span className="text-5xl font-bold text-white">PK</span>
          </div>
        </div>
      </div>
    </section>
  )
}
