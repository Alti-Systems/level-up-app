'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import { useAppStore } from '@/lib/store'
import type { Session, User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a Providers component')
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createBrowserClient())
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const { setUser: setStoreUser, clearUser, setSubscribed } = useAppStore()

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        setStoreUser(
          session.user.id,
          session.user.email!,
          session.user.user_metadata?.name
        )
        // Fetch subscription status
        await checkSubscription(session.user.id)
      }
      
      setIsLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          setStoreUser(
            session.user.id,
            session.user.email!,
            session.user.user_metadata?.name
          )
          await checkSubscription(session.user.id)
        } else {
          clearUser()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, setStoreUser, clearUser])

  const checkSubscription = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/subscription?userId=${userId}`)
      const data = await response.json()
      setSubscribed(data.isActive)
    } catch (error) {
      console.error('Error checking subscription:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error: error as Error | null }
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })
    return { error: error as Error | null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    clearUser()
  }

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { error: error as Error | null }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        signInWithMagicLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
