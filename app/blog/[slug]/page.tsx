import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
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

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

  if (error) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Creative Portfolio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <article className="container-custom section-padding max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.read_time} min read
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 leading-tight">{post.title}</h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl mb-12">
            <Image
              src={post.image_url || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </header>

        <div className="prose prose-lg prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex justify-between items-center">
            <Link href="/blog">
              <Button variant="outline" className="border-white/20 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                More Articles
              </Button>
            </Link>
            <div className="text-sm text-gray-400">Share this article</div>
          </div>
        </footer>
      </article>
    </div>
  )
}
