import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase"
import ImageCarousel from "@/components/ImageCarousel"

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

interface ProjectImage {
  id: string
  image_url: string
  alt_text: string
  caption: string
  display_order: number
  is_featured: boolean
}

async function getProject(id: string): Promise<{ project: Project; images: ProjectImage[] } | null> {
  const supabase = createClient()

  const { data: project, error: projectError } = await supabase.from("projects").select("*").eq("id", id).single()

  if (projectError || !project) {
    return null
  }

  const { data: images } = await supabase.from("project_images").select("*").eq("project_id", id).order("display_order")

  return { project, images: images || [] }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const result = await getProject(params.id)

  if (!result) {
    notFound()
  }

  const { project, images } = result

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>

      <div className="container-custom section-padding relative z-10">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Project Images */}
          <div className="space-y-6">
            {images.length > 0 ? (
              <ImageCarousel images={images} />
            ) : (
              <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400">No images available for this project</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(project.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                {project.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Featured</Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 leading-tight">{project.title}</h1>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">{project.description}</p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-bold mb-4 font-playfair">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-base px-4 py-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.github_url && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent flex-1"
                  asChild
                >
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    View Source Code
                  </a>
                </Button>
              )}
              {project.live_url && (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1"
                  asChild
                >
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    View Live Demo
                  </a>
                </Button>
              )}
            </div>

            {/* Additional Project Info */}
            <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-white">Project Highlights</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Built with modern technologies and best practices</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Responsive design optimized for all devices</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Performance optimized and accessibility focused</span>
                  </li>
                  {images.length > 0 && (
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{images.length} high-quality screenshots and demos</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
