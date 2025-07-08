"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/hooks/use-supabase"

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  technologies: string[]
  github_url?: string
  live_url?: string
  featured: boolean
  created_at: string
}

export default function ProjectsDebug() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = useSupabase()

  useEffect(() => {
    console.log('ProjectsDebug: Component mounted, fetching projects...')
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      console.log('ProjectsDebug: Starting to fetch projects...')
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

      console.log('ProjectsDebug: Query result:', { data, error })

      if (error) {
        console.error("ProjectsDebug: Error fetching projects:", error)
        setError(error.message)
      } else {
        console.log('ProjectsDebug: Successfully fetched projects:', data)
        setProjects(data || [])
      }
    } catch (err) {
      console.error('ProjectsDebug: Exception during fetch:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  console.log('ProjectsDebug: Rendering with state:', { loading, error, projectsCount: projects.length })

  if (loading) {
    return (
      <section className="section-padding bg-gray-800 text-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-8">Projects Debug</h2>
          <p className="text-center">Loading projects...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-gray-800 text-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-8">Projects Debug</h2>
          <p className="text-center text-red-400">Error: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gray-800 text-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-8">Projects Debug</h2>
        <p className="text-center mb-8">Found {projects.length} projects</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
