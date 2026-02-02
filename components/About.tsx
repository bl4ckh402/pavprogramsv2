"use client"

import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Calendar, Code, Zap, Users, Award } from "lucide-react"
import Image from "next/image"

export default function About() {
  const stats = [
    { number: "3+", label: "Years Experience", icon: Code, color: "from-blue-600 to-blue-800" },
    { number: "50+", label: "Projects Completed", icon: Zap, color: "from-blue-500 to-blue-700" },
    { number: "100%", label: "Client Satisfaction", icon: Users, color: "from-blue-600 to-blue-900" },
    { number: "24/7", label: "Support Available", icon: Award, color: "from-blue-400 to-blue-600" }
  ]

  return (
    <section id="about" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-500/30">About Me</Badge>
          <h2 className="text-5xl md:text-7xl font-bold font-playfair mb-6">
            Meet <span className="gradient-text">Pavin Kiptoo</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Full-Stack Developer & UI/UX Designer</h3>
              <div className="space-y-4 text-lg text-gray-400">
                <p>
                  I'm a passionate full-stack developer with over 3 years of experience creating 
                  exceptional digital experiences. I specialize in modern web technologies and 
                  innovative design solutions.
                </p>
                <p>
                  My expertise spans frontend and backend development, with a keen eye for design 
                  and user experience. I love turning complex problems into simple, beautiful solutions.
                </p>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <a href="mailto:pavkiptoo@gmail.com" className="hover:text-blue-400 transition-colors">pavkiptoo@gmail.com</a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <span>Available for opportunities</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl" />
              <div className="relative glass-card p-2 rounded-full">
                <Image src="/Pav.jpg" alt="Pavin Kiptoo" width={400} height={400} className="rounded-full" priority />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="glass-card rounded-2xl p-8 text-center group hover:glow-blue transition-all">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <h4 className="text-lg font-semibold text-white">{stat.label}</h4>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}