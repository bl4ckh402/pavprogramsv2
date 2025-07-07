"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./AuthProvider"
import { Card, CardContent } from "@/components/ui/card"
import { Lock } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, profile, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login")
        return
      }

      if (requireAdmin && !isAdmin) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, profile, loading, isAdmin, requireAdmin, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 glow-effect">
          <CardContent className="p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-300">Verifying access...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-700/50 glow-effect max-w-md">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-gray-400 mb-6">You don't have admin privileges to access this area.</p>
            <button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
            >
              Go Home
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
