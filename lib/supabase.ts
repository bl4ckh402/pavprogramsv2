import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Separate instances for client and server contexts
let clientInstance: SupabaseClient | null = null
let serverInstance: SupabaseClient | null = null

export function createClient(): SupabaseClient {
  const isServer = typeof window === 'undefined'
  
  // Use different instances for server and client
  if (isServer) {
    if (serverInstance) {
      return serverInstance
    }
    serverInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Server-side config - no localStorage
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          'X-Client-Info': 'pavprograms-server-v1'
        }
      }
    })
    return serverInstance
  } else {
    if (clientInstance) {
      return clientInstance
    }
    clientInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Use a unique storage key to avoid conflicts
        storageKey: 'pavprograms-auth-v1',
        // Persist session in localStorage
        storage: window.localStorage,
        // Auto refresh tokens
        autoRefreshToken: true,
        // Persist user session
        persistSession: true,
        // Detect session in URL
        detectSessionInUrl: true,
        // Flow type
        flowType: 'pkce'
      },
      global: {
        headers: {
          'X-Client-Info': 'pavprograms-client-v1'
        }
      }
    })
    return clientInstance
  }
}

// Export the singleton instance getter for direct use if needed
export function getSupabaseClient(): SupabaseClient {
  return createClient()
}
