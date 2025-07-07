"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, TrendingUp, Bot, Zap, Database } from "lucide-react"
import { createClient } from "@/lib/supabase"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  technologies: string[]
  github_url?: string
  live_url?: string
  featured: boolean
}

export default function Projects3D() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          },
        )

        gsap.fromTo(
          ".project-card-3d",
          { opacity: 0, y: 100, rotationY: 45 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.3,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 70%",
            },
          },
        )
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [projects])

  const fetchProjects = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      // Fallback to mock data
      setProjects(mockProjects)
    } else {
      setProjects(data || mockProjects)
    }
    setLoading(false)
  }

  const mockProjects: Project[] = [
    {
      id: "1",
      title: "Multi-Chain DeFi Analytics Platform",
      description:
        "Comprehensive analytics platform tracking DeFi protocols across 7+ blockchains with real-time data visualization and trading insights.",
      image_url: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Dune Analytics", "Web3.js", "D3.js", "Node.js"],
      github_url: "https://github.com/bl4ckh401",
      live_url: "https://example.com",
      featured: true,
    },
    {
      id: "2",
      title: "AI-Powered Trading Bot Suite",
      description:
        "Intelligent trading bots with AI integration for automated strategy optimization across multiple exchanges and blockchains.",
      image_url: "/placeholder.svg?height=400&width=600",
      technologies: ["Python", "TensorFlow", "Telegram API", "Chainlink", "PostgreSQL"],
      github_url: "https://github.com/bl4ckh401",
      live_url: "https://example.com",
      featured: true,
    },
    {
      id: "3",
      title: "Cross-Chain Token Deployment Platform",
      description:
        "Streamlined platform for deploying tokens across multiple blockchains with automated testing and verification.",
      image_url: "/placeholder.svg?height=400&width=600",
      technologies: ["Solidity", "Hardhat", "React", "Ethers.js", "IPFS"],
      github_url: "https://github.com/bl4ckh401",
      featured: true,
    },
    {
      id: "4",
      title: "DeFi Protocol Performance Dashboard",
      description:
        "Real-time dashboard for monitoring DeFi protocol metrics, TVL, and yield opportunities across multiple chains.",
      image_url: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "GraphQL", "The Graph", "Chart.js", "Supabase"],
      github_url: "https://github.com/bl4ckh401",
      featured: false,
    },
  ]

  const getProjectIcon = (index: number) => {
    const icons = [TrendingUp, Bot, Zap, Database]
    return icons[index % icons.length]
  }

  const getProjectColor = (index: number) => {
    const colors = [
      "from-green-500 to-emerald-600",
      "from-purple-500 to-violet-600",
      "from-blue-500 to-cyan-600",
      "from-pink-500 to-rose-600",
    ]
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="h-16 bg-gray-700 rounded-lg animate-pulse mx-auto max-w-md mb-8" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 animate-pulse">
                <div className="h-64 bg-gray-700 rounded-t-lg" />
                <CardContent className="p-8">
                  <div className="h-6 bg-gray-700 rounded mb-4" />
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* CSS-based background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center mb-20 font-playfair">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div ref={projectsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => {
            const IconComponent = getProjectIcon(index)
            const colorClass = getProjectColor(index)

            return (
              <Card
                key={project.id}
                className="project-card-3d bg-gray-900/80 backdrop-blur-xl border-gray-700/50 overflow-hidden group hover:glow-effect transition-all duration-700 transform-gpu hover:border-purple-500/50"
                style={{
                  transform: `perspective(1000px) rotateY(${index % 2 === 0 ? "5deg" : "-5deg"})`,
                }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className={`absolute top-4 right-4 p-3 rounded-xl bg-gradient-to-r ${colorClass} glow-effect`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>

                <CardContent className="p-8 bg-gray-900/50">
                  <h3 className="text-2xl font-bold mb-4 font-playfair group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-white/5 text-gray-300 border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.github_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent group/btn"
                        asChild
                      >
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.live_url && (
                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${colorClass} hover:scale-105 transition-all duration-300 group/btn`}
                        asChild
                      >
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Project Stats */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-12 font-playfair">
            Project <span className="gradient-text">Impact</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "30+", label: "DApps Delivered", description: "High-quality applications for global clients" },
              { number: "7+", label: "Blockchains", description: "Multi-chain expertise and deployment" },
              { number: "100%", label: "Success Rate", description: "All deployments successful and bug-free" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500"
              >
                <CardContent className="p-8 text-center bg-gray-900/30">
                  <div className="text-5xl font-bold gradient-text mb-4">{stat.number}</div>
                  <h4 className="text-xl font-semibold text-white mb-2">{stat.label}</h4>
                  <p className="text-gray-400">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
