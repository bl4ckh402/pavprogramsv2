"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, FileText, Eye, Calendar } from "lucide-react"
import { useSupabase } from "@/hooks/use-supabase"

interface Stats {
  totalProjects: number
  totalBlogPosts: number
  publishedPosts: number
  draftPosts: number
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalBlogPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = useSupabase()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch projects count
      const { count: projectsCount } = await supabase.from("projects").select("*", { count: "exact", head: true })

      // Fetch blog posts stats
      const { count: totalPostsCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })

      const { count: publishedCount } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("published", true)

      const { count: draftCount } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("published", false)

      setStats({
        totalProjects: projectsCount || 0,
        totalBlogPosts: totalPostsCount || 0,
        publishedPosts: publishedCount || 0,
        draftPosts: draftCount || 0,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600",
      description: "Active projects",
    },
    {
      title: "Blog Posts",
      value: stats.totalBlogPosts,
      icon: FileText,
      color: "from-blue-500 to-cyan-600",
      description: "Total articles",
    },
    {
      title: "Published",
      value: stats.publishedPosts,
      icon: Eye,
      color: "from-purple-500 to-violet-600",
      description: "Live articles",
    },
    {
      title: "Drafts",
      value: stats.draftPosts,
      icon: Calendar,
      color: "from-orange-500 to-red-600",
      description: "Pending articles",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 animate-pulse">
            <CardContent className="p-8">
              <div className="h-16 bg-gray-700 rounded mb-4" />
              <div className="h-8 bg-gray-700 rounded mb-2" />
              <div className="h-4 bg-gray-700 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500 group hover:border-purple-500/50"
        >
          <CardContent className="p-8 text-center bg-gray-900/30">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} glow-effect mb-6`}>
              <stat.icon className="h-8 w-8 text-white" />
            </div>
            <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.value}
            </div>
            <h3 className="text-xl font-semibold text-white mb-1">{stat.title}</h3>
            <p className="text-gray-400 text-sm">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
