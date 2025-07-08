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

async function checkData() {
  try {
    console.log('🔍 Checking data in your database...\n')
    
    // Check projects
    console.log('📁 Projects:')
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (projectsError) {
      console.log('❌ Error fetching projects:', projectsError.message)
    } else {
      console.log(`✅ Found ${projects?.length || 0} projects`)
      if (projects && projects.length > 0) {
        projects.forEach((project, index) => {
          console.log(`  ${index + 1}. ${project.title} (ID: ${project.id})`)
        })
      }
    }
    
    console.log('\n📝 Blog Posts:')
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (postsError) {
      console.log('❌ Error fetching blog posts:', postsError.message)
    } else {
      console.log(`✅ Found ${posts?.length || 0} blog posts`)
      if (posts && posts.length > 0) {
        posts.forEach((post, index) => {
          console.log(`  ${index + 1}. ${post.title} (Published: ${post.published}) (ID: ${post.id})`)
        })
      }
    }
    
    console.log('\n🔒 Row Level Security Status:')
    
    // Check RLS policies
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .in('tablename', ['projects', 'blog_posts'])
    
    if (policiesError) {
      console.log('❌ Error checking RLS policies:', policiesError.message)
    } else {
      console.log(`✅ Found ${policies?.length || 0} RLS policies`)
      if (policies && policies.length > 0) {
        policies.forEach((policy) => {
          console.log(`  - ${policy.tablename}: ${policy.policyname} (${policy.cmd})`)
        })
      }
    }
    
    console.log('\n👤 Profiles:')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
    
    if (profilesError) {
      console.log('❌ Error fetching profiles:', profilesError.message)
    } else {
      console.log(`✅ Found ${profiles?.length || 0} profiles`)
      if (profiles && profiles.length > 0) {
        profiles.forEach((profile, index) => {
          console.log(`  ${index + 1}. ${profile.email} (Role: ${profile.role})`)
        })
      }
    }
    
  } catch (err) {
    console.error('❌ Error checking data:', err.message)
  }
}

checkData().catch(console.error)
