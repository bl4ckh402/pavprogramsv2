#!/usr/bin/env node

const { createAdminClient } = require('./lib/supabase-admin.ts')
require('dotenv').config()

const supabase = createAdminClient()

async function checkTables() {
  console.log('🔍 Checking database tables and data...\n')

  // Check if projects table exists and has data
  try {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (projectsError) {
      console.log('❌ Projects table error:', projectsError.message)
    } else {
      console.log(`✅ Projects table exists with ${projects.length} records`)
      if (projects.length > 0) {
        console.log('📋 Sample project:', {
          id: projects[0].id,
          title: projects[0].title,
          created_at: projects[0].created_at,
          technologies: projects[0].technologies
        })
      }
    }
  } catch (err) {
    console.log('❌ Projects table error:', err.message)
  }

  console.log('')

  // Check if blog_posts table exists and has data
  try {
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (postsError) {
      console.log('❌ Blog posts table error:', postsError.message)
    } else {
      console.log(`✅ Blog posts table exists with ${posts.length} records`)
      if (posts.length > 0) {
        console.log('📋 Sample blog post:', {
          id: posts[0].id,
          title: posts[0].title,
          published: posts[0].published,
          slug: posts[0].slug,
          created_at: posts[0].created_at
        })
      }
    }
  } catch (err) {
    console.log('❌ Blog posts table error:', err.message)
  }

  console.log('')

  // Check published blog posts specifically
  try {
    const { data: publishedPosts, error: publishedError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (publishedError) {
      console.log('❌ Published blog posts query error:', publishedError.message)
    } else {
      console.log(`✅ Published blog posts: ${publishedPosts.length} records`)
      if (publishedPosts.length > 0) {
        console.log('📋 Sample published post:', {
          id: publishedPosts[0].id,
          title: publishedPosts[0].title,
          published_at: publishedPosts[0].published_at,
          slug: publishedPosts[0].slug
        })
      }
    }
  } catch (err) {
    console.log('❌ Published blog posts query error:', err.message)
  }

  console.log('')

  // Test the same queries that the frontend uses
  console.log('🔍 Testing frontend queries...\n')

  // Test Projects query (same as Projects.tsx)
  try {
    const { data: frontendProjects, error: frontendProjectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (frontendProjectsError) {
      console.log('❌ Frontend projects query error:', frontendProjectsError.message)
    } else {
      console.log(`✅ Frontend projects query: ${frontendProjects.length} records`)
    }
  } catch (err) {
    console.log('❌ Frontend projects query error:', err.message)
  }

  // Test Blog posts query (same as BlogList.tsx)
  try {
    const { data: frontendPosts, error: frontendPostsError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (frontendPostsError) {
      console.log('❌ Frontend blog posts query error:', frontendPostsError.message)
    } else {
      console.log(`✅ Frontend blog posts query: ${frontendPosts.length} records`)
    }
  } catch (err) {
    console.log('❌ Frontend blog posts query error:', err.message)
  }
}

async function main() {
  console.log('🚀 Starting frontend data diagnostics...\n')
  await checkTables()
  console.log('\n🏁 Diagnostics complete!')
}

main().catch(console.error)
