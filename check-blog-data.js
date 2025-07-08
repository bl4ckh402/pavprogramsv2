#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkDetailedBlogData() {
  try {
    console.log('🔍 Checking detailed blog post data...\n')
    
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.log('❌ Error fetching blog posts:', error.message)
      return
    }
    
    console.log(`✅ Found ${posts?.length || 0} blog posts:`)
    
    posts?.forEach((post, index) => {
      console.log(`\n${index + 1}. ${post.title}`)
      console.log(`   - ID: ${post.id}`)
      console.log(`   - Published: ${post.published}`)
      console.log(`   - Published At: ${post.published_at}`)
      console.log(`   - Slug: ${post.slug}`)
      console.log(`   - Read Time: ${post.read_time}`)
      console.log(`   - Tags: ${JSON.stringify(post.tags)}`)
      console.log(`   - Excerpt: ${post.excerpt ? post.excerpt.substring(0, 100) + '...' : 'No excerpt'}`)
      console.log(`   - Content: ${post.content ? post.content.substring(0, 100) + '...' : 'No content'}`)
      console.log(`   - Image URL: ${post.image_url || 'No image'}`)
      console.log(`   - Created At: ${post.created_at}`)
    })
    
  } catch (err) {
    console.error('❌ Error checking blog data:', err.message)
  }
}

checkDetailedBlogData().catch(console.error)
