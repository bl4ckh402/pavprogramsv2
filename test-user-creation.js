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

async function testUserCreation() {
  try {
    console.log('🧪 Testing user creation and profile trigger...')
    
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'TestPassword123!'
    
    console.log(`Creating test user: ${testEmail}`)
    
    // Create a user via Auth API
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test User'
        }
      }
    })
    
    if (signUpError) {
      console.error('❌ Error creating user:', signUpError.message)
      return false
    }
    
    console.log('✅ User created successfully!')
    
    // Wait a moment for the trigger to execute
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Check if profile was created
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', testEmail)
    
    if (profileError) {
      console.error('❌ Error checking profile:', profileError.message)
      return false
    }
    
    if (profiles && profiles.length > 0) {
      console.log('✅ Profile created successfully via trigger!')
      console.log('Profile data:', profiles[0])
      
      // Clean up - delete the test user's profile
      await supabase
        .from('profiles')
        .delete()
        .eq('email', testEmail)
      
      return true
    } else {
      console.log('❌ Profile was not created by trigger')
      return false
    }
    
  } catch (err) {
    console.error('❌ Test failed:', err.message)
    return false
  }
}

async function checkTrigger() {
  try {
    console.log('🔍 Checking if trigger exists...')
    
    const { data, error } = await supabase
      .rpc('check_trigger_exists')
      .then(result => result)
      .catch(err => {
        // If the function doesn't exist, we'll create a simple check
        return supabase
          .from('information_schema.triggers')
          .select('*')
          .eq('trigger_name', 'on_auth_user_created')
      })
    
    if (error) {
      console.log('⚠️  Could not check trigger status:', error.message)
    } else {
      console.log('✅ Trigger check completed')
    }
    
  } catch (err) {
    console.log('⚠️  Could not check trigger:', err.message)
  }
}

async function main() {
  console.log('🚀 Starting user creation test...\n')
  
  await checkTrigger()
  console.log('')
  
  const success = await testUserCreation()
  
  if (!success) {
    console.log('\n📝 The trigger may not be working properly.')
    console.log('Please run the following SQL in your Supabase SQL Editor:')
    console.log('\n--- Copy and paste this SQL ---')
    console.log(require('fs').readFileSync('./scripts/fix-user-creation.sql', 'utf8'))
    console.log('--- End of SQL ---\n')
  }
  
  console.log('\n🏁 Test complete!')
}

main().catch(console.error)
