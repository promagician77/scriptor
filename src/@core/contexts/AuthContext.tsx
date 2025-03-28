'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import type { User, Session } from '@supabase/supabase-js'

import { createClient } from '@/configs/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true)

      try {
        const {
          data: { session: initialSession }
        } = await supabase.auth.getSession()

        setSession(initialSession)
        setUser(initialSession?.user ?? null)

        const {
          data: { subscription }
        } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          setSession(newSession)
          setUser(newSession?.user ?? null)

          if (event === 'SIGNED_IN') {
            router.push('/home')
          } else if (event === 'SIGNED_OUT') {
            router.push('/')
          }
        })

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)

    try {
      const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || window?.location.origin

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${redirectUrl}auth/callback`
        }
      })

      if (error) throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,

    loading,
    signIn,

    signUp,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
