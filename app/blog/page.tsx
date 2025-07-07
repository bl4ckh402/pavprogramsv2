import type { Metadata } from "next"
import BlogList from "@/components/BlogList"

export const metadata: Metadata = {
  title: "Blog | Creative Portfolio",
  description: "Insights, tutorials, and thoughts on web development and design",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
            My <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on web development, design, and the ever-evolving world of
            technology.
          </p>
        </div>
        <BlogList />
      </div>
    </div>
  )
}
