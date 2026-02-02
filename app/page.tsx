'use client'

import { useEffect } from 'react'
import { useAuth } from '@/components/Providers'
import { useAppStore } from '@/lib/store'
import { LandingPage } from '@/components/LandingPage'
import { AuthPage } from '@/components/auth/AuthPage'
import { HomeScreen } from '@/components/screens/HomeScreen'
import { LevelScreen } from '@/components/screens/LevelScreen'
import { ShareScreen } from '@/components/screens/ShareScreen'
import { SettingsScreen } from '@/components/screens/SettingsScreen'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Home() {
  const { user, isLoading: authLoading } = useAuth()
  const { 
    isSubscribed, 
    currentScreen, 
    updateStreak,
    setScreen 
  } = useAppStore()

  // Update streak on app load
  useEffect(() => {
    if (user && isSubscribed) {
      updateStreak()
    }
  }, [user, isSubscribed, updateStreak])

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-400 to-red-500">
        <LoadingSpinner size="lg" color="white" />
      </div>
    )
  }

  // Show landing page if not logged in
  if (!user) {
    return <LandingPage />
  }

  // Show subscription required page if not subscribed
  if (!isSubscribed) {
    return <AuthPage showPricing />
  }

  // Main app screens
  switch (currentScreen) {
    case 'level':
      return <LevelScreen />
    case 'share':
      return <ShareScreen />
    case 'settings':
      return <SettingsScreen />
    case 'home':
    default:
      return <HomeScreen />
  }
}
