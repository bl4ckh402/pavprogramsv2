#!/usr/bin/env node

const { createAdminClient } = require('./lib/supabase-admin.ts')
require('dotenv').config()

const supabase = createAdminClient()

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
