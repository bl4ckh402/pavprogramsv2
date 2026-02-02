// Local data management system - replaces Supabase
export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  demo?: string
  featured: boolean
  category: 'web' | 'mobile' | 'blockchain'
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  tags: string[]
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  date: string
}

// Real projects data
export const projects: Project[] = [
  // Web Applications
  {
    id: "1",
    title: "JABA Automobiles",
    description: "Complete automotive marketplace with admin dashboard, RBAC, real-time metrics, and comprehensive management systems",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "Next.js", "Firebase", "React"],
    github: "https://github.com/bl4ckh401/jautomotives",
    demo: "",
    featured: true,
    category: 'web'
  },
  {
    id: "2",
    title: "AppVisor",
    description: "Professional application monitoring and analytics platform for tracking app performance metrics and user insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "Next.js", "React"],
    github: "https://github.com/bl4ckh401/appvisor",
    demo: "https://appvisorz.vercel.app",
    featured: true,
    category: 'web'
  },
  {
    id: "3",
    title: "Hearts On TikTok",
    description: "Engagement tracker and analytics platform for TikTok creators built on Firebase",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "Next.js", "Firebase"],
    github: "https://github.com/bl4ckh401/heartsontiktok",
    demo: "https://heartsontiktok.vercel.app",
    featured: false,
    category: 'web'
  },
  // Blockchain & Fintech
  {
    id: "4",
    title: "Blipp.Watch",
    description: "Web3 creator monetization protocol - streaming platform built on Movement Network with blockchain integration",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "Move", "PostgreSQL", "Web3"],
    github: "https://github.com/bl4ckh405/blipp.watch",
    featured: true,
    category: 'blockchain'
  },
  {
    id: "5",
    title: "ChamaConnect",
    description: "Community financial empowerment platform enabling collective investment, savings, and micro-lending",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "Solidity", "Ethereum", "MongoDB", "PostgreSQL"],
    github: "https://github.com/muiruri-associates/chamaconnect.io",
    featured: true,
    category: 'blockchain'
  },
  // Mobile Applications
  {
    id: "6",
    title: "CoupleUp",
    description: "Gamified relationship RPG - couples create characters, complete challenges, and unlock achievements together",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
    technologies: ["React Native", "Firebase", "Gamification"],
    featured: true,
    category: 'mobile'
  },
  {
    id: "7",
    title: "Baby Bliss",
    description: "Complete motherhood companion - track breastfeeding, growth, health records, and developmental milestones",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop",
    technologies: ["React Native", "Firebase", "Cloud Storage"],
    featured: true,
    category: 'mobile'
  },
  {
    id: "8",
    title: "Quran Guide",
    description: "AI-powered Islamic companion with intelligent verse interpretation, translations, and personalized learning",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=600&fit=crop",
    technologies: ["React Native", "AI/ML", "NLP", "Firebase"],
    featured: true,
    category: 'mobile'
  },
  {
    id: "9",
    title: "Sober Steps",
    description: "Gamified sobriety tracker with achievement system, community support, and craving management tools",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    technologies: ["React Native", "Firebase", "Real-time DB"],
    featured: true,
    category: 'mobile'
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Applications",
    excerpt: "Exploring the latest trends in web development and best practices",
    content: "Full blog content here...",
    image: "/placeholder.jpg",
    date: "2024-01-15",
    tags: ["Web Development", "React", "Next.js"]
  }
]

// Local storage helpers
export const localData = {
  getProjects: (): Project[] => projects,
  getProjectsByCategory: (category: 'web' | 'mobile' | 'blockchain'): Project[] => 
    projects.filter(p => p.category === category),
  getFeaturedProjects: (): Project[] => projects.filter(p => p.featured),
  getBlogPosts: (): BlogPost[] => blogPosts,
  
  saveContactMessage: (message: Omit<ContactMessage, 'id' | 'date'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      date: new Date().toISOString()
    }
    console.log('Contact message saved:', newMessage)
    return newMessage
  }
}