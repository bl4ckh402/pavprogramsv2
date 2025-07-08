-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create project_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_display_order ON project_images(display_order);
CREATE INDEX IF NOT EXISTS idx_project_images_featured ON project_images(is_featured);

-- Enable RLS on project_images table
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Create policies for project_images
CREATE POLICY "Allow public read access to project_images" ON project_images
FOR SELECT USING (true);

CREATE POLICY "Allow admin users to manage project_images" ON project_images
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Storage policies for the project-images bucket
CREATE POLICY "Allow public read access to project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Allow admin users to upload project images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Allow admin users to update project images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-images' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Allow admin users to delete project images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_project_images_updated_at ON project_images;
CREATE TRIGGER update_project_images_updated_at
    BEFORE UPDATE ON project_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
