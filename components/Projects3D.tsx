"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Star, Smartphone, Globe, Blocks } from "lucide-react"
import { localData } from "@/lib/local-data"
import Image from "next/image"

export default function Projects3D() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'blockchain'>('all')
  const allProjects = localData.getProjects()
  const projects = filter === 'all' ? allProjects : localData.getProjectsByCategory(filter)

  const categories = [
    { id: 'all', label: 'All Projects', icon: Star, count: allProjects.length },
    { id: 'web', label: 'Web Apps', icon: Globe, count: localData.getProjectsByCategory('web').length },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone, count: localData.getProjectsByCategory('mobile').length },
    { id: 'blockchain', label: 'Blockchain', icon: Blocks, count: localData.getProjectsByCategory('blockchain').length }
  ]

  return (
    <section id="projects" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-500/30">Portfolio</Badge>
          <h2 className="text-5xl md:text-7xl font-bold font-playfair mb-6">
            <span className="gradient-text">My Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            {allProjects.length}+ production-ready applications across web, mobile, and blockchain
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    filter === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'glass-card text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {cat.label}
                  <Badge className="ml-2 bg-black/30">{cat.count}</Badge>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden group"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {hoveredId === project.id && (
                  <div className="absolute inset-0 bg-black/90 flex items-center justify-center gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="btn-secondary">
                          <Github className="h-4 w-4 mr-2" />Code
                        </Button>
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="btn-primary">
                          <ExternalLink className="h-4 w-4 mr-2" />Demo
                        </Button>
                      </a>
                    )}
                  </div>
                )}
                
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600 text-white border-0">
                      <Star className="h-3 w-3 mr-1" />Featured
                    </Badge>
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/70 text-white border-0 capitalize backdrop-blur-sm">
                    {project.category === 'web' && <Globe className="h-3 w-3 mr-1" />}
                    {project.category === 'mobile' && <Smartphone className="h-3 w-3 mr-1" />}
                    {project.category === 'blockchain' && <Blocks className="h-3 w-3 mr-1" />}
                    {project.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 line-clamp-2 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in working together?</h3>
            <p className="text-gray-400 mb-6">I'm available for freelance projects and full-time opportunities</p>
            <Button className="btn-primary px-8 py-4 text-lg">
              Let's Talk
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}