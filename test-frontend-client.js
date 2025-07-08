#!/usr/bin/env node

import { createClient } from './lib/supabase.js'
import 'dotenv/config'

console.log('🔍 Testing Frontend Client Configuration:\n')

// Test with client (same as frontend)
const frontendClient = createClient()

try {
  console.log('Testing projects query with frontend client...')
  const { data: projects, error: projectsError } = await frontendClient
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (projectsError) {
    console.log('❌ Frontend projects query error:', projectsError.message)
    console.log('Error details:', projectsError)
  } else {
    console.log(`✅ Frontend projects query successful: ${projects.length} records`)
  }
} catch (err) {
  console.log('❌ Frontend projects query exception:', err.message)
}

try {
  console.log('\nTesting blog posts query with frontend client...')
  const { data: posts, error: postsError } = await frontendClient
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (postsError) {
    console.log('❌ Frontend blog posts query error:', postsError.message)
    console.log('Error details:', postsError)
  } else {
    console.log(`✅ Frontend blog posts query successful: ${posts.length} records`)
  }
} catch (err) {
  console.log('❌ Frontend blog posts query exception:', err.message)
}

console.log('\n🏁 Frontend client test complete!')
