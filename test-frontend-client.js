#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 Environment Variables Check:\n')
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing')

console.log('\n🔍 Testing Frontend Client Configuration:\n')

// Test with anon key (same as frontend)
if (supabaseUrl && supabaseAnonKey) {
  const frontendClient = createClient(supabaseUrl, supabaseAnonKey)
  
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
} else {
  console.log('❌ Cannot test frontend client - missing environment variables')
}

console.log('\n🏁 Frontend client test complete!')
