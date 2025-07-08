"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Upload, ExternalLink, Github } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import useSupabase from "@/hooks/use-supabase"
import ImageUploader from "./ImageUploader"

interface Project {
  id?: string
  title: string
  description: string
  image_url: string
  images?: ProjectImage[]
  technologies: string[]
  github_url?: string
  live_url?: string
  featured: boolean
}

interface ProjectImage {
  id?: string
  image_url: string
  alt_text: string
  caption: string
  display_order: number
  is_featured: boolean
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const supabase = useSupabase()

  const emptyProject: Project = {
    title: "",
    description: "",
    image_url: "",
    images: [],
    technologies: [],
    github_url: "",
    live_url: "",
    featured: false,
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (projectsError) {
      console.error("Error fetching projects:", projectsError)
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Fetch images for each project
    const projectsWithImages = await Promise.all(
      (projects || []).map(async (project) => {
        const { data: images } = await supabase
          .from("project_images")
          .select("*")
          .eq("project_id", project.id)
          .order("display_order")

        return { ...project, images: images || [] }
      }),
    )

    setProjects(projectsWithImages)
    setLoading(false)
  }

  const handleSave = async (project: Project) => {
    console.log('Saving project:', project)
    
    // Validation
    if (!project.title.trim()) {
      toast({
        title: "Error",
        description: "Project title is required",
        variant: "destructive",
      })
      return
    }
    
    if (!project.description.trim()) {
      toast({
        title: "Error",
        description: "Project description is required",
        variant: "destructive",
      })
      return
    }

    try {
      if (project.id) {
        // Update existing project
        console.log('Updating existing project:', project.id)
        const { error: projectError } = await supabase
          .from("projects")
          .update({
            title: project.title,
            description: project.description,
            image_url: project.images?.[0]?.image_url || project.image_url,
            technologies: project.technologies,
            github_url: project.github_url,
            live_url: project.live_url,
            featured: project.featured,
          })
          .eq("id", project.id)

        if (projectError) {
          console.error('Project update error:', projectError)
          toast({
            title: "Error",
            description: `Failed to update project: ${projectError.message}`,
            variant: "destructive",
          })
          return
        }

        // Update project images
        if (project.images && project.images.length > 0) {
          // Delete existing images
          await supabase.from("project_images").delete().eq("project_id", project.id)

          // Insert new images
          const imagesToInsert = project.images.map((img, index) => ({
            project_id: project.id,
            image_url: img.image_url,
            alt_text: img.alt_text,
            caption: img.caption,
            display_order: index,
            is_featured: img.is_featured,
          }))

          const { error: imagesError } = await supabase.from("project_images").insert(imagesToInsert)
          if (imagesError) {
            console.error('Images update error:', imagesError)
          }
        }

        toast({
          title: "Success",
          description: "Project updated successfully",
        })
        fetchProjects()
      } else {
        // Create new project
        console.log('Creating new project')
        const { data: newProject, error: projectError } = await supabase
          .from("projects")
          .insert([
            {
              title: project.title,
              description: project.description,
              image_url: project.images?.[0]?.image_url || project.image_url,
              technologies: project.technologies,
              github_url: project.github_url,
              live_url: project.live_url,
              featured: project.featured,
            },
          ])
          .select()
          .single()

        if (projectError || !newProject) {
          console.error('Project creation error:', projectError)
          toast({
            title: "Error",
            description: `Failed to create project: ${projectError?.message}`,
            variant: "destructive",
          })
          return
        }

        // Insert project images
        if (project.images && project.images.length > 0) {
          const imagesToInsert = project.images.map((img, index) => ({
            project_id: newProject.id,
            image_url: img.image_url,
            alt_text: img.alt_text,
            caption: img.caption,
            display_order: index,
            is_featured: img.is_featured,
          }))

          const { error: imagesError } = await supabase.from("project_images").insert(imagesToInsert)
          if (imagesError) {
            console.error('Images creation error:', imagesError)
          }
        }

        toast({
          title: "Success",
          description: "Project created successfully",
        })
        fetchProjects()
      }

      setEditingProject(null)
      setIsCreating(false)
    } catch (error) {
      console.error('Unexpected error saving project:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving the project",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    console.log('Deleting project:', id)
    
    try {
      // First delete associated images
      const { error: imagesError } = await supabase
        .from("project_images")
        .delete()
        .eq("project_id", id)
      
      if (imagesError) {
        console.error('Error deleting project images:', imagesError)
      }

      // Then delete the project
      const { error } = await supabase.from("projects").delete().eq("id", id)

      if (error) {
        console.error('Project deletion error:', error)
        toast({
          title: "Error",
          description: `Failed to delete project: ${error.message}`,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        })
        fetchProjects()
      }
    } catch (error) {
      console.error('Unexpected error deleting project:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting the project",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold gradient-text">Manage Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-700 rounded mb-4" />
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-700 rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text">Manage Projects</h2>
        <Button
          onClick={() => {
            setEditingProject(emptyProject)
            setIsCreating(true)
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl glow-effect transition-all duration-300"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </Button>
      </div>

      {(editingProject || isCreating) && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500">
          <CardHeader className="bg-gray-900/30">
            <CardTitle className="text-2xl gradient-text">
              {isCreating ? "Create New Project" : "Edit Project"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6 bg-gray-900/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Project Title"
                value={editingProject?.title || ""}
                onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
              <div>
                <label className="text-white font-medium mb-2 block">Project Images</label>
                <ImageUploader
                  images={editingProject?.images || []}
                  onChange={(images) => setEditingProject((prev) => (prev ? { ...prev, images } : null))}
                  maxImages={20}
                />
              </div>
            </div>

            <Textarea
              placeholder="Project Description"
              value={editingProject?.description || ""}
              onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, description: e.target.value } : null))}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 min-h-[120px]"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="GitHub URL (optional)"
                value={editingProject?.github_url || ""}
                onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, github_url: e.target.value } : null))}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
              <Input
                placeholder="Live URL (optional)"
                value={editingProject?.live_url || ""}
                onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, live_url: e.target.value } : null))}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
            </div>

            <Input
              placeholder="Technologies (comma separated)"
              value={editingProject?.technologies.join(", ") || ""}
              onChange={(e) =>
                setEditingProject((prev) =>
                  prev
                    ? {
                        ...prev,
                        technologies: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      }
                    : null,
                )
              }
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
            />

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                checked={editingProject?.featured || false}
                onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, featured: e.target.checked } : null))}
                className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="featured" className="text-white font-medium">
                Featured Project
              </label>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => {editingProject && handleSave(editingProject)}}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl glow-effect transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Project
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingProject(null)
                  setIsCreating(false)
                }}
                className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500 group hover:border-purple-500/50"
          >
            <CardContent className="p-6 bg-gray-900/30">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white mb-2">Featured</Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingProject(project)}
                    className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => project.id && handleDelete(project.id)}
                    className="bg-red-600/80 hover:bg-red-600 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
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

              <div className="flex space-x-2">
                {project.github_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                  >
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </Button>
                )}
                {project.live_url && (
                  <Button
                    size="sm"
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 text-center py-16">
          <CardContent>
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
            <p className="text-gray-400 mb-6">Create your first project to get started</p>
            <Button
              onClick={() => {
                setEditingProject(emptyProject)
                setIsCreating(true)
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
