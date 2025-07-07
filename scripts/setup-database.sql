-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  read_time INTEGER DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- Insert sample data
INSERT INTO projects (title, description, image_url, technologies, github_url, live_url, featured) VALUES
('E-Commerce Platform', 'A modern e-commerce platform built with Next.js, featuring real-time inventory management, secure payments, and advanced analytics.', '/placeholder.svg?height=400&width=600', ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'], 'https://github.com', 'https://example.com', true),
('AI-Powered Dashboard', 'An intelligent dashboard that uses machine learning to provide insights and predictions for business metrics.', '/placeholder.svg?height=400&width=600', ARRAY['React', 'Python', 'TensorFlow', 'D3.js'], 'https://github.com', 'https://example.com', true),
('Mobile Banking App', 'A secure mobile banking application with biometric authentication and real-time transaction monitoring.', '/placeholder.svg?height=400&width=600', ARRAY['React Native', 'Node.js', 'MongoDB', 'JWT'], 'https://github.com', NULL, false);

INSERT INTO blog_posts (title, slug, excerpt, content, image_url, tags, published, read_time, published_at) VALUES
('Building Modern Web Applications with Next.js 15', 'nextjs-15-features', 'Explore the latest features in Next.js 15 and how they can improve your development workflow.', '# Building Modern Web Applications with Next.js 15\n\nNext.js 15 brings exciting new features...', '/placeholder.svg?height=300&width=500', ARRAY['Next.js', 'React', 'Web Development'], true, 8, NOW()),
('The Art of GSAP Animations in React', 'gsap-react-animations', 'Learn how to create stunning animations using GSAP in React applications.', '# The Art of GSAP Animations in React\n\nGSAP (GreenSock Animation Platform) is one of the most powerful...', '/placeholder.svg?height=300&width=500', ARRAY['GSAP', 'React', 'Animation'], true, 12, NOW()),
('Supabase: The Firebase Alternative', 'supabase-guide', 'A comprehensive guide to using Supabase for your next project.', '# Supabase: The Firebase Alternative\n\nSupabase has emerged as a powerful alternative to Firebase...', '/placeholder.svg?height=300&width=500', ARRAY['Supabase', 'Database', 'Backend'], true, 10, NOW());
