"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "nav-glass" : "bg-transparent"}`}>
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-blue-600 group-hover:bg-blue-700 transition-colors">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-playfair">Pavin Kiptoo</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-300 hover:text-blue-400 transition-colors font-medium">
                {item.name}
              </Link>
            ))}
            <Button className="btn-primary">Let's Talk</Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 glass-card rounded-lg mt-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="block py-3 px-4 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button className="btn-primary w-full">Let's Talk</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
