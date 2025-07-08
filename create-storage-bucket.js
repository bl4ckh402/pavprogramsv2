#!/usr/bin/env node

const { createAdminClient } = require('./lib/supabase-admin.ts')
require('dotenv').config()

const supabase = createAdminClient()

async function createStorageBucket() {
  try {
    console.log('🔧 Creating storage bucket...\n')
    
    // Check if bucket already exists
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.find(bucket => bucket.name === 'project-images')
    
    if (bucketExists) {
      console.log('✅ Storage bucket "project-images" already exists')
      return
    }
    
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('project-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
      fileSizeLimit: 10485760, // 10MB
    })
    
    if (error) {
      console.error('❌ Error creating storage bucket:', error.message)
      console.log('\n💡 You may need to create the bucket manually in the Supabase dashboard:')
      console.log('1. Go to Storage in your Supabase dashboard')
      console.log('2. Click "Create bucket"')
      console.log('3. Name it "project-images"')
      console.log('4. Make it public')
      console.log('5. Set file size limit to 10MB')
    } else {
      console.log('✅ Storage bucket "project-images" created successfully')
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

createStorageBucket().catch(console.error)
