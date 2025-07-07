import Hero3D from "@/components/Hero3D"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Projects3D from "@/components/Projects3D"
import Skills3D from "@/components/Skills3D"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero3D />
      <About />
      <Experience />
      <Skills3D />
      <Projects3D />
      <Contact />
    </main>
  )
}
