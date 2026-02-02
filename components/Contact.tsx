"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, MapPin, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { localData } from "@/lib/local-data"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      localData.saveContactMessage(formData)
      toast({ title: "Message sent!", description: "Thank you for your message. I'll get back to you soon." })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-500/30">Get In Touch</Badge>
          <h2 className="text-5xl md:text-7xl font-bold font-playfair mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="bg-black/50 border-blue-500/30 text-white" />
              </div>
              <div>
                <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="bg-black/50 border-blue-500/30 text-white" />
              </div>
              <div>
                <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required rows={6} className="bg-black/50 border-blue-500/30 text-white resize-none" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4 text-lg">
                {isSubmitting ? "Sending..." : (<><span>Send Message</span><Send className="ml-2 h-5 w-5" /></>)}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Talk</h3>
              <p className="text-gray-400 text-lg mb-8">
                I'm always excited to work on new projects and collaborate with amazing people.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "pavkiptoo@gmail.com", href: "mailto:pavkiptoo@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+254 720 447 239", href: "tel:+254720447239" },
                  { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: "#" }
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <a key={i} href={item.href} className="flex items-center gap-4 p-4 glass-card rounded-xl hover:glow-blue transition-all">
                      <div className="p-3 rounded-xl bg-blue-600">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}