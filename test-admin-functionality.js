#!/usr/bin/env node

/**
 * Test script to verify admin functionality is working properly
 */

const { createAdminClient } = require('./lib/supabase-admin.js')
require('dotenv').config()

const supabase = createAdminClient()

async function testAdminFunctionality() {
  console.log('🧪 Testing Admin Functionality...\n')
  
  try {
    // Test 1: Check if we can fetch projects
    console.log('📁 Test 1: Fetching projects...')
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(5)
    
    if (projectsError) {
      console.log('❌ Error fetching projects:', projectsError.message)
    } else {
      console.log(`✅ Successfully fetched ${projects?.length || 0} projects`)
    }

    // Test 2: Check if we can fetch blog posts
    console.log('\n📝 Test 2: Fetching blog posts...')
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(5)
    
    if (postsError) {
      console.log('❌ Error fetching blog posts:', postsError.message)
    } else {
      console.log(`✅ Successfully fetched ${posts?.length || 0} blog posts`)
    }

    // Test 3: Check if storage bucket exists
    console.log('\n🗂️ Test 3: Checking storage bucket...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.log('❌ Error checking storage buckets:', bucketsError.message)
    } else {
      const projectImagesBucket = buckets?.find(bucket => bucket.name === 'project-images')
      if (projectImagesBucket) {
        console.log('✅ project-images bucket exists')
      } else {
        console.log('⚠️ project-images bucket not found')
      }
    }

    // Test 4: Check if project_images table exists
    console.log('\n🗃️ Test 4: Checking project_images table...')
    const { data: images, error: imagesError } = await supabase
      .from('project_images')
      .select('*')
      .limit(1)
    
    if (imagesError) {
      console.log('❌ Error accessing project_images table:', imagesError.message)
    } else {
      console.log('✅ project_images table accessible')
    }

    // Test 5: Check RLS policies
    console.log('\n🔒 Test 5: Checking RLS policies...')
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .in('tablename', ['projects', 'blog_posts', 'project_images'])
    
    if (policiesError) {
      console.log('❌ Error checking RLS policies:', policiesError.message)
    } else {
      console.log(`✅ Found ${policies?.length || 0} RLS policies`)
      if (policies && policies.length > 0) {
        policies.forEach((policy) => {
          console.log(`  - ${policy.tablename}: ${policy.policyname}`)
        })
      }
    }

    console.log('\n🎉 Admin functionality tests completed!')
    
  } catch (error) {
    console.error('❌ Unexpected error during testing:', error.message)
  }
}

testAdminFunctionality().catch(console.error)
