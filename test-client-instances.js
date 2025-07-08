#!/usr/bin/env node

// Test to verify single client instance pattern
import { createClient } from './lib/supabase.js'
import 'dotenv/config'

console.log('🔍 Testing Single Client Instance Pattern...\n')

// Create multiple clients to test singleton behavior
console.log('1. Creating first client instance...')
const client1 = createClient()

console.log('2. Creating second client instance...')
const client2 = createClient()

console.log('3. Creating third client instance...')
const client3 = createClient()

// Check if they're the same instance
console.log('\n📊 Instance Comparison:')
console.log('client1 === client2:', client1 === client2)
console.log('client2 === client3:', client2 === client3)
console.log('client1 === client3:', client1 === client3)

if (client1 === client2 && client2 === client3) {
  console.log('\n✅ SUCCESS: All client calls return the same singleton instance!')
  console.log('✅ This should eliminate the "Multiple GoTrueClient instances" warning.')
} else {
  console.log('\n❌ FAILED: Different instances detected! This will cause multiple client warnings.')
}

// Test a simple query to ensure the singleton works
try {
  console.log('\n🔧 Testing singleton functionality...')
  const { data, error } = await client1
    .from('projects')
    .select('count')
    .limit(1)
  
  if (error) {
    console.log('⚠️ Query error (might be expected):', error.message)
  } else {
    console.log('✅ Singleton client works correctly!')
  }
} catch (err) {
  console.log('⚠️ Query exception (might be expected):', err.message)
}

console.log('\n🏁 Client instance test complete!')
