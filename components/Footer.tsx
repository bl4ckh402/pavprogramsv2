import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text font-playfair mb-4">Portfolio</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Creating digital experiences that inspire and engage. Let's build something amazing together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full glass-effect hover:glow-effect transition-all duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full glass-effect hover:glow-effect transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full glass-effect hover:glow-effect transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full glass-effect hover:glow-effect transition-all duration-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Web Development</span>
              </li>
              <li>
                <span className="text-gray-400">UI/UX Design</span>
              </li>
              <li>
                <span className="text-gray-400">Consulting</span>
              </li>
              <li>
                <span className="text-gray-400">Mentoring</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
