const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
}

// Global singleton instance for admin client
let adminSupabaseInstance = null

function createAdminClient() {
  // Return existing admin instance if it exists
  if (adminSupabaseInstance) {
    return adminSupabaseInstance
  }
  
  // Create a new admin instance with service role key
  adminSupabaseInstance = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      // Use a different storage key for admin client
      storageKey: 'pavprograms-admin-auth-node',
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'X-Client-Info': 'pavprograms-admin-node-v1'
      }
    }
  })
  
  return adminSupabaseInstance
}

module.exports = { createAdminClient }
