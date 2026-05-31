export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  mockupAlt: string;
  techStack: string[];
  link: string;
}

export interface FeatureNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  role: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatar: string;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

