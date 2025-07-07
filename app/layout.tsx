import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth/AuthProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Pavin Kiptoo",
  description: "A portfolio showcasing my projects and solutions",
  keywords: ["portfolio", "web development", "design", "creative"],
  authors: [{ name: "Pavin Kiptoo" }],
  openGraph: {
    title: "Pavin Kiptoo",
    description: "A portfolio showcasing my projects and solutions",
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
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black text-white`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
