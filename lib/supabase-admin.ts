import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
}

// Global singleton instance for admin client
let adminSupabaseInstance: SupabaseClient | null = null

export function createAdminClient(): SupabaseClient {
  // Return existing admin instance if it exists
  if (adminSupabaseInstance) {
    return adminSupabaseInstance
  }
  
  // Create a new admin instance with service role key
  adminSupabaseInstance = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      // Use a different storage key for admin client
      storageKey: 'pavprograms-admin-auth-v1',
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'X-Client-Info': 'pavprograms-admin-v1'
      }
    }
  })
  
  return adminSupabaseInstance
}

// Export the singleton admin instance for direct use if needed
export const adminSupabase = createAdminClient()
