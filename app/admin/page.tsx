"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import ProjectManager from "@/components/admin/ProjectManager"
import BlogManager from "@/components/admin/BlogManager"
import AdminStats from "@/components/admin/AdminStats"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { useAuth } from "@/components/auth/AuthProvider"
import { Shield, Database, BarChart3, LogOut, User } from "lucide-react"

function AdminDashboard() {
  const { profile, signOut } = useAuth()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* CSS-based background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-20">
        <div className="container-custom section-padding">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 glow-effect">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold font-playfair">
                  Admin <span className="gradient-text">Dashboard</span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Manage your portfolio content with this powerful admin interface
              </p>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{profile?.full_name || profile?.email}</p>
                <p className="text-sm text-purple-400 capitalize">{profile?.role}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 glow-effect">
                <User className="h-6 w-6 text-white" />
              </div>
              <Button
                variant="outline"
                onClick={signOut}
                className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:text-white bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <AdminStats />

          {/* Main Content */}
          <div className="mt-16">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/80 backdrop-blur-xl border-gray-700/50 p-2 rounded-2xl">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-xl py-4 px-8 text-lg font-semibold transition-all duration-300"
                >
                  <Database className="h-5 w-5 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="blog"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-xl py-4 px-8 text-lg font-semibold transition-all duration-300"
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Blog Posts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-12">
                <ProjectManager />
              </TabsContent>

              <TabsContent value="blog" className="mt-12">
                <BlogManager />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
