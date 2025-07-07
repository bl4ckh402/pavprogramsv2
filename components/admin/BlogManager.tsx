"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, Upload, Calendar, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"
import EnhancedWYSIWYGEditor from "./EnhancedWYSIWYGEditor"

interface BlogPost {
  id?: string
  title: string
  excerpt: string
  content: string
  image_url: string
  tags: string[]
  published: boolean
  slug: string
  read_time: number
  published_at?: string
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const emptyPost: BlogPost = {
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    tags: [],
    published: false,
    slug: "",
    read_time: 5,
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching posts:", error)
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      })
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleSave = async (post: BlogPost) => {
    const supabase = createClient()

    // Generate slug if not provided
    if (!post.slug && post.title) {
      post.slug = generateSlug(post.title)
    }

    if (post.id) {
      // Update existing post
      const { error } = await supabase.from("blog_posts").update(post).eq("id", post.id)

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update blog post",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        })
        fetchPosts()
      }
    } else {
      // Create new post
      const { error } = await supabase.from("blog_posts").insert([
        {
          ...post,
          published_at: post.published ? new Date().toISOString() : null,
        },
      ])

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create blog post",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Blog post created successfully",
        })
        fetchPosts()
      }
    }

    setEditingPost(null)
    setIsCreating(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    const supabase = createClient()
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })
      fetchPosts()
    }
  }

  const togglePublished = async (post: BlogPost) => {
    const supabase = createClient()
    const newPublishedState = !post.published

    const { error } = await supabase
      .from("blog_posts")
      .update({
        published: newPublishedState,
        published_at: newPublishedState ? new Date().toISOString() : null,
      })
      .eq("id", post.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Post ${newPublishedState ? "published" : "unpublished"} successfully`,
      })
      fetchPosts()
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold gradient-text">Manage Blog Posts</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, i) => (
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
        <h2 className="text-3xl font-bold gradient-text">Manage Blog Posts</h2>
        <Button
          onClick={() => {
            setEditingPost(emptyPost)
            setIsCreating(true)
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl glow-effect transition-all duration-300"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Post
        </Button>
      </div>

      {(editingPost || isCreating) && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500">
          <CardHeader className="bg-gray-900/30">
            <CardTitle className="text-2xl gradient-text">{isCreating ? "Create New Post" : "Edit Post"}</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6 bg-gray-900/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Post Title"
                value={editingPost?.title || ""}
                onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
              <Input
                placeholder="Slug (auto-generated if empty)"
                value={editingPost?.slug || ""}
                onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, slug: e.target.value } : null))}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
            </div>

            <Textarea
              placeholder="Post Excerpt"
              value={editingPost?.excerpt || ""}
              onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, excerpt: e.target.value } : null))}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
            />

            <div>
              <label className="text-white font-medium mb-2 block">Content</label>
              <EnhancedWYSIWYGEditor
                value={editingPost?.content || ""}
                onChange={(content) => setEditingPost((prev) => (prev ? { ...prev, content } : null))}
                placeholder="Write your blog post content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Featured Image URL"
                value={editingPost?.image_url || ""}
                onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, image_url: e.target.value } : null))}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
              <Input
                type="number"
                placeholder="Read Time (minutes)"
                value={editingPost?.read_time || 5}
                onChange={(e) =>
                  setEditingPost((prev) => (prev ? { ...prev, read_time: Number.parseInt(e.target.value) } : null))
                }
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
            </div>

            <Input
              placeholder="Tags (comma separated)"
              value={editingPost?.tags.join(", ") || ""}
              onChange={(e) =>
                setEditingPost((prev) =>
                  prev
                    ? {
                        ...prev,
                        tags: e.target.value
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
                id="published"
                checked={editingPost?.published || false}
                onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, published: e.target.checked } : null))}
                className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="published" className="text-white font-medium">
                Publish immediately
              </label>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => editingPost && handleSave(editingPost)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl glow-effect transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Post
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingPost(null)
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

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 hover:glow-effect transition-all duration-500 group hover:border-purple-500/50"
          >
            <CardContent className="p-6 bg-gray-900/30">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                      {post.title}
                    </h3>
                    {post.published ? (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <Eye className="h-3 w-3 mr-1" />
                        Published
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                        <EyeOff className="h-3 w-3 mr-1" />
                        Draft
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Slug: {post.slug}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.read_time} min read
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePublished(post)}
                    className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
                  >
                    {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingPost(post)}
                    className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => post.id && handleDelete(post.id)}
                    className="bg-red-600/80 hover:bg-red-600 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 text-center py-16">
          <CardContent>
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-400 mb-6">Create your first blog post to get started</p>
            <Button
              onClick={() => {
                setEditingPost(emptyPost)
                setIsCreating(true)
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write Your First Post
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
