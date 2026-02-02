import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Pavin Kiptoo - Full-Stack Developer & UI/UX Designer",
  description: "Portfolio showcasing modern web development, innovative design, and cutting-edge technologies by Pavin Kiptoo",
  keywords: ["portfolio", "web development", "UI/UX design", "full-stack developer", "modern design"],
  authors: [{ name: "Pavin Kiptoo" }],
  openGraph: {
    title: "Pavin Kiptoo - Full-Stack Developer & UI/UX Designer",
    description: "Portfolio showcasing modern web development, innovative design, and cutting-edge technologies",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen`}>
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
