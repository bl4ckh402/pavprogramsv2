'use client'

import { useMemo } from 'react'
import { createClient } from '@/lib/supabase'

/**
 * Hook to ensure we always use the same Supabase client instance
 * This prevents the multiple GoTrueClient instances warning
 */
export function useSupabase() {
  return useMemo(() => createClient(), [])
}

export default useSupabase
