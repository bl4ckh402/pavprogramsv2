"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo admin credentials
const DEMO_ADMIN = {
  email: "admin@pavinkiptoo.com",
  password: "admin123",
  user: {
    id: "1",
    email: "admin@pavinkiptoo.com", 
    name: "Pavin Kiptoo",
    role: "admin" as const
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    
    // Simple demo authentication
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      setUser(DEMO_ADMIN.user)
      setLoading(false)
      return { error: null }
    }
    
    setLoading(false)
    return { error: { message: "Invalid credentials" } }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true)
    
    // For demo purposes, just create a user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: fullName,
      role: "user"
    }
    
    setUser(newUser)
    setLoading(false)
    return { error: null }
  }

  const signOut = async () => {
    setUser(null)
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
