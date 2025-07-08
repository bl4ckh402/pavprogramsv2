#!/usr/bin/env node

const { createAdminClient } = require('./lib/supabase-admin.ts')
require('dotenv').config()

const supabase = createAdminClient()

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test connection by checking if profiles table exists
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('Profiles table does not exist or is not accessible:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    console.log('✅ Profiles table exists and is accessible')
    return true
    
  } catch (err) {
    console.error('❌ Connection test failed:', err.message)
    return false
  }
}

async function createProfile() {
  try {
    console.log('Creating test profile...')
    
    // Try to create a test profile
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        full_name: 'Test User',
        role: 'user'
      }])
      .select()
    
    if (error) {
      console.log('Error creating test profile:', error.message)
      return false
    }
    
    console.log('✅ Test profile created successfully!')
    
    // Clean up - delete the test profile
    await supabase
      .from('profiles')
      .delete()
      .eq('id', '123e4567-e89b-12d3-a456-426614174000')
    
    return true
    
  } catch (err) {
    console.error('❌ Profile creation test failed:', err.message)
    return false
  }
}

async function main() {
  console.log('🚀 Starting database diagnostics...\n')
  
  const connectionOk = await testConnection()
  
  if (connectionOk) {
    await createProfile()
  } else {
    console.log('\n📝 To fix this issue:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to the SQL Editor')
    console.log('3. Run the contents of scripts/setup-complete-database.sql')
    console.log('4. Then run the contents of scripts/fix-user-creation.sql')
  }
  
  console.log('\n🏁 Diagnostics complete!')
}

main().catch(console.error)
