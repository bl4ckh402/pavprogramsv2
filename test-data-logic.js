#!/usr/bin/env node

import { createClient } from './lib/supabase.js'
import 'dotenv/config'

console.log('🔍 Testing data fetching logic...\n')

const supabase = createClient()

// Test projects
const { data: projects, error: projectsError } = await supabase
  .from('projects')
  .select('*')
  .order('created_at', { ascending: false })

console.log('Projects query result:')
console.log('- Error:', projectsError)
console.log('- Data:', projects)
console.log('- Data length:', projects?.length)
console.log('- Data is truthy:', !!projects)
console.log('- Data || mockData would use:', projects || 'MOCK DATA')

console.log('\n---\n')

// Test blog posts
const { data: posts, error: postsError } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('published', true)
  .order('published_at', { ascending: false })

console.log('Blog posts query result:')
console.log('- Error:', postsError)
console.log('- Data:', posts)
console.log('- Data length:', posts?.length)
console.log('- Data is truthy:', !!posts)
console.log('- Data || mockData would use:', posts || 'MOCK DATA')

console.log('\n🏁 Test complete!')
