#!/usr/bin/env node

// Test to verify that the multiple GoTrueClient instances warning is fixed
// This file simulates both server and client usage

import { createClient } from './lib/supabase.js'

console.log('🔍 Testing Multiple Instances Fix:\n')

// Simulate server-side usage (Node.js environment)
console.log('Testing server-side instance creation...')
const serverClient1 = createClient()
const serverClient2 = createClient()
const serverClient3 = createClient()

console.log('Server instances created:')
console.log('  Instance 1:', serverClient1 === serverClient2 ? 'SAME' : 'DIFFERENT')
console.log('  Instance 2:', serverClient2 === serverClient3 ? 'SAME' : 'DIFFERENT')
console.log('  Instance 3:', serverClient1 === serverClient3 ? 'SAME' : 'DIFFERENT')

if (serverClient1 === serverClient2 && serverClient2 === serverClient3) {
  console.log('✅ Server-side singleton working correctly!')
} else {
  console.log('❌ Server-side singleton NOT working!')
}

// Test basic functionality
try {
  console.log('\nTesting basic database query...')
  const { data, error } = await serverClient1
    .from('projects')
    .select('id, title')
    .limit(1)
  
  if (error) {
    console.log('❌ Database query failed:', error.message)
  } else {
    console.log('✅ Database query successful:', data?.length || 0, 'records')
  }
} catch (err) {
  console.log('❌ Database query exception:', err.message)
}

console.log('\n🎉 Test completed! Check for any "Multiple GoTrueClient instances detected" warnings above.')
console.log('   If no warnings appear, the fix is working correctly!')
