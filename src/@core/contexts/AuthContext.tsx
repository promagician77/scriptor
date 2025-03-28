'use client'

// React Imports
import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

// Supabase Imports
import type { User } from '@supabase/supabase-js'

import { createClient } from '@/configs/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const { auth } = supabase

    // Check active sessions and sets the user
    auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)

      if (session) {
        router.push('/home')
      } else {
        router.push('/')
      }

      setLoading(false)
    })

    // Listen for changes on auth state (logged in, signed out, etc.)
    const {
      data: { subscription }
    } = auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)

      if (session) {
        router.push('/home')
      } else {
        router.push('/')
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getRedirectURL()}/auth/callback`
      }
    })

    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const getRedirectURL = () => {
  // In development, use localhost
  // In production, use NEXT_PUBLIC_SITE_URL
  return process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SITE_URL : 'http://localhost:3000'
}
