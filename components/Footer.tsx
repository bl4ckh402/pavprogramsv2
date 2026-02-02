import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-blue-500/20">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text font-playfair mb-4">Pavin Kiptoo</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Full-Stack Developer & UI/UX Designer creating exceptional digital experiences across web, mobile, and blockchain.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/bl4ckh401" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass-card hover:glow-blue transition-all">
                <Github className="h-5 w-5 text-blue-400" />
              </a>
              <a href="https://www.linkedin.com/in/kimutai-kiptoo/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass-card hover:glow-blue transition-all">
                <Linkedin className="h-5 w-5 text-blue-400" />
              </a>
              <a href="mailto:pavkiptoo@gmail.com" className="p-2 rounded-full glass-card hover:glow-blue transition-all">
                <Mail className="h-5 w-5 text-blue-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link href="#projects" className="text-gray-400 hover:text-blue-400 transition-colors">Projects</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Expertise</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Web Development</span></li>
              <li><span className="text-gray-400">Mobile Apps</span></li>
              <li><span className="text-gray-400">Blockchain</span></li>
              <li><span className="text-gray-400">UI/UX Design</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/20 mt-12 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Pavin Kiptoo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
