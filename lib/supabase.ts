import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Global singleton instance
let supabaseInstance: SupabaseClient | null = null

export function createClient(): SupabaseClient {
  // Return existing instance if it exists
  if (supabaseInstance) {
    return supabaseInstance
  }
  
  // Create a new instance only if one doesn't exist
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Use a unique storage key to avoid conflicts
      storageKey: 'pavprograms-auth-v1',
      // Persist session in localStorage (only in browser)
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      // Auto refresh tokens
      autoRefreshToken: true,
      // Persist user session
      persistSession: true,
      // Detect session in URL
      detectSessionInUrl: typeof window !== 'undefined',
      // Flow type
      flowType: 'pkce'
    },
    global: {
      headers: {
        'X-Client-Info': 'pavprograms-v1'
      }
    }
  })
  
  return supabaseInstance
}

// Export the singleton instance for direct use if needed
export const supabase = createClient()
