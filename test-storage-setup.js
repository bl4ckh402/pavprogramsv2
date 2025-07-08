#!/usr/bin/env node

const { createAdminClient } = require('./lib/supabase-admin.ts')
require('dotenv').config()

const supabase = createAdminClient()

async function checkStorageSetup() {
  try {
    console.log('🔍 Checking storage and database setup...\n')
    
    // Check if project_images table exists
    console.log('📋 Checking project_images table:')
    const { data: tableData, error: tableError } = await supabase
      .from('project_images')
      .select('id')
      .limit(1)
    
    if (tableError) {
      console.log('❌ project_images table not found:', tableError.message)
      console.log('💡 Run the setup-storage-and-images.sql script in your Supabase SQL editor')
    } else {
      console.log('✅ project_images table exists')
    }
    
    // Check storage bucket
    console.log('\n🪣 Checking storage bucket:')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.log('❌ Error checking storage buckets:', bucketsError.message)
    } else {
      const projectImagesBucket = buckets.find(bucket => bucket.name === 'project-images')
      if (projectImagesBucket) {
        console.log('✅ project-images bucket exists')
        console.log(`   - Public: ${projectImagesBucket.public}`)
      } else {
        console.log('❌ project-images bucket not found')
        console.log('💡 Run the setup-storage-and-images.sql script in your Supabase SQL editor')
      }
    }
    
    // Test upload (if bucket exists)
    if (buckets && buckets.find(bucket => bucket.name === 'project-images')) {
      console.log('\n🧪 Testing upload functionality:')
      try {
        // Create a small test file
        const testContent = 'test-image-content'
        const testFile = new Blob([testContent], { type: 'text/plain' })
        const testFileName = `test-${Date.now()}.txt`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(`test/${testFileName}`, testFile)
        
        if (uploadError) {
          console.log('❌ Upload test failed:', uploadError.message)
        } else {
          console.log('✅ Upload test successful')
          
          // Clean up test file
          await supabase.storage
            .from('project-images')
            .remove([`test/${testFileName}`])
          console.log('✅ Test file cleaned up')
        }
      } catch (error) {
        console.log('❌ Upload test error:', error.message)
      }
    }
    
    console.log('\n📊 Summary:')
    console.log('If you see any ❌ above, please:')
    console.log('1. Go to your Supabase project dashboard')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Run the setup-storage-and-images.sql script')
    console.log('4. Re-run this test script')
    
  } catch (err) {
    console.error('❌ Error checking setup:', err.message)
  }
}

checkStorageSetup().catch(console.error)
