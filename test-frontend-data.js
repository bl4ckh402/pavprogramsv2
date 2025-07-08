#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testFrontendDataFetch() {
  try {
    console.log('🔍 Testing frontend data fetch (using anon key)...\n')
    
    // Test projects fetch (same as frontend)
    console.log('📁 Projects (frontend query):')
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (projectsError) {
      console.log('❌ Error fetching projects:', projectsError.message)
      console.log('❌ Full error:', projectsError)
    } else {
      console.log(`✅ Found ${projects?.length || 0} projects`)
      if (projects && projects.length > 0) {
        projects.forEach((project, index) => {
          console.log(`  ${index + 1}. ${project.title} (ID: ${project.id})`)
        })
      }
    }
    
    // Test blog posts fetch (same as frontend)
    console.log('\n📝 Blog Posts (frontend query):')
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
    
    if (postsError) {
      console.log('❌ Error fetching blog posts:', postsError.message)
      console.log('❌ Full error:', postsError)
    } else {
      console.log(`✅ Found ${posts?.length || 0} blog posts`)
      if (posts && posts.length > 0) {
        posts.forEach((post, index) => {
          console.log(`  ${index + 1}. ${post.title} (Published: ${post.published}) (ID: ${post.id})`)
        })
      }
    }
    
    // Test project images
    console.log('\n🖼️ Project Images:')
    const { data: images, error: imagesError } = await supabase
      .from('project_images')
      .select('*')
      .order('display_order')
    
    if (imagesError) {
      console.log('❌ Error fetching project images:', imagesError.message)
      console.log('❌ Full error:', imagesError)
    } else {
      console.log(`✅ Found ${images?.length || 0} project images`)
      if (images && images.length > 0) {
        images.forEach((image, index) => {
          console.log(`  ${index + 1}. Project ${image.project_id} - ${image.alt_text}`)
        })
      }
    }
    
  } catch (err) {
    console.error('❌ Error testing frontend data fetch:', err.message)
  }
}

testFrontendDataFetch().catch(console.error)
