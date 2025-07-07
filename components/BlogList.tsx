"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image_url: string
  tags: string[]
  published_at: string
  read_time: number
  slug: string
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching posts:", error)
      // Fallback to mock data
      setPosts(mockPosts)
    } else {
      setPosts(data || mockPosts)
    }
    setLoading(false)
  }

  const mockPosts: BlogPost[] = [
    {
      id: "1",
      title: "Building Modern Web Applications with Next.js 15",
      excerpt: "Explore the latest features in Next.js 15 and how they can improve your development workflow.",
      content: "",
      image_url: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "React", "Web Development"],
      published_at: "2024-01-15",
      read_time: 8,
      slug: "nextjs-15-features",
    },
    {
      id: "2",
      title: "The Art of GSAP Animations in React",
      excerpt: "Learn how to create stunning animations using GSAP in React applications.",
      content: "",
      image_url: "/placeholder.svg?height=300&width=500",
      tags: ["GSAP", "React", "Animation"],
      published_at: "2024-01-10",
      read_time: 12,
      slug: "gsap-react-animations",
    },
    {
      id: "3",
      title: "Supabase: The Firebase Alternative",
      excerpt: "A comprehensive guide to using Supabase for your next project.",
      content: "",
      image_url: "/placeholder.svg?height=300&width=500",
      tags: ["Supabase", "Database", "Backend"],
      published_at: "2024-01-05",
      read_time: 10,
      slug: "supabase-guide",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 animate-pulse">
            <div className="h-48 bg-gray-700 rounded-t-lg" />
            <CardContent className="p-6">
              <div className="h-4 bg-gray-700 rounded mb-4" />
              <div className="h-4 bg-gray-700 rounded mb-2" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-300 group hover:border-purple-500/50"
        >
          <div className="relative overflow-hidden">
            <Image
              src={post.image_url || "/placeholder.svg"}
              alt={post.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <CardHeader className="p-6 pb-4">
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.read_time} min read
              </div>
            </div>

            <h3 className="text-xl font-bold font-playfair group-hover:gradient-text transition-all duration-300">
              {post.title}
            </h3>
          </CardHeader>

          <CardContent className="p-6 pt-0">
            <p className="text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                  {tag}
                </Badge>
              ))}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
