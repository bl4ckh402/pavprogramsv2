"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.length > 0) {
      const ctx = gsap.context(() => {
        // Title animation
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

        // Projects stagger animation
        gsap.fromTo(
          ".project-card",
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
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
  }

  const mockProjects: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with Next.js, featuring real-time inventory management, secure payments, and advanced analytics.",
      image_url: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      github_url: "https://github.com",
      live_url: "https://example.com",
      featured: true,
    },
    {
      id: "2",
      title: "AI-Powered Dashboard",
      description:
        "An intelligent dashboard that uses machine learning to provide insights and predictions for business metrics.",
      image_url: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Python", "TensorFlow", "D3.js"],
      github_url: "https://github.com",
      live_url: "https://example.com",
      featured: true,
    },
    {
      id: "3",
      title: "Mobile Banking App",
      description:
        "A secure mobile banking application with biometric authentication and real-time transaction monitoring.",
      image_url: "/placeholder.svg?height=400&width=600",
      technologies: ["React Native", "Node.js", "MongoDB", "JWT"],
      github_url: "https://github.com",
      featured: false,
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-gradient-to-b from-black to-gray-900">
      <div className="container-custom">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center mb-16 font-playfair">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div ref={projectsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="project-card glass-effect border-white/20 overflow-hidden group hover:glow-effect transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image_url || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 font-playfair">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-300 border-purple-500/30"
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
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      asChild
                    >
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.live_url && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      asChild
                    >
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
