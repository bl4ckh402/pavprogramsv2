-- Complete database setup script for portfolio project
-- This script sets up all necessary tables, triggers, and policies

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

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create project_images table for multiple images per project
CREATE TABLE IF NOT EXISTS project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_order ON project_images(project_id, display_order);

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin can manage projects" ON projects;
DROP POLICY IF EXISTS "Admin can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can manage project images" ON project_images;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public can read published projects" ON projects;
DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can read project images" ON project_images;

-- RLS Policies for admin-only access
CREATE POLICY "Admin can manage projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admin can manage blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admin can manage project images" ON project_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Profile policies
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Public read access for published content
CREATE POLICY "Public can read published projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public can read published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public can read project images" ON project_images
  FOR SELECT USING (true);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert sample data only if tables are empty
INSERT INTO projects (title, description, image_url, technologies, github_url, live_url, featured) 
SELECT * FROM (VALUES
  ('E-Commerce Platform', 'A modern e-commerce platform built with Next.js, featuring real-time inventory management, secure payments, and advanced analytics.', '/placeholder.svg?height=400&width=600', ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'], 'https://github.com', 'https://example.com', true),
  ('AI-Powered Dashboard', 'An intelligent dashboard that uses machine learning to provide insights and predictions for business metrics.', '/placeholder.svg?height=400&width=600', ARRAY['React', 'Python', 'TensorFlow', 'D3.js'], 'https://github.com', 'https://example.com', true),
  ('Mobile Banking App', 'A secure mobile banking application with biometric authentication and real-time transaction monitoring.', '/placeholder.svg?height=400&width=600', ARRAY['React Native', 'Node.js', 'MongoDB', 'JWT'], 'https://github.com', NULL, false)
) AS t(title, description, image_url, technologies, github_url, live_url, featured)
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

INSERT INTO blog_posts (title, slug, excerpt, content, image_url, tags, published, read_time, published_at) 
SELECT * FROM (VALUES
  ('Building Modern Web Applications with Next.js 15', 'nextjs-15-features', 'Explore the latest features in Next.js 15 and how they can improve your development workflow.', '# Building Modern Web Applications with Next.js 15\n\nNext.js 15 brings exciting new features...', '/placeholder.svg?height=300&width=500', ARRAY['Next.js', 'React', 'Web Development'], true, 8, NOW()),
  ('The Art of GSAP Animations in React', 'gsap-react-animations', 'Learn how to create stunning animations using GSAP in React applications.', '# The Art of GSAP Animations in React\n\nGSAP (GreenSock Animation Platform) is one of the most powerful...', '/placeholder.svg?height=300&width=500', ARRAY['GSAP', 'React', 'Animation'], true, 12, NOW()),
  ('Supabase: The Firebase Alternative', 'supabase-guide', 'A comprehensive guide to using Supabase for your next project.', '# Supabase: The Firebase Alternative\n\nSupabase has emerged as a powerful alternative to Firebase...', '/placeholder.svg?height=300&width=500', ARRAY['Supabase', 'Database', 'Backend'], true, 10, NOW())
) AS t(title, slug, excerpt, content, image_url, tags, published, read_time, published_at)
WHERE NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1);

-- Insert sample project images
INSERT INTO project_images (project_id, image_url, alt_text, caption, display_order, is_featured) 
SELECT 
  p.id,
  '/placeholder.svg?height=600&width=800&text=Image' || generate_series(1, 3),
  'Project screenshot ' || generate_series(1, 3),
  'Screenshot showing key features of ' || p.title,
  generate_series(1, 3),
  generate_series(1, 3) = 1
FROM projects p
WHERE EXISTS (SELECT 1 FROM projects LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM project_images LIMIT 1);
