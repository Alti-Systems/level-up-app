'use client'

import { useState } from 'react'
import { useAuth } from '@/components/Providers'
import { useAppStore } from '@/lib/store'
import { ChevronLeft, User, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Trash2 } from 'lucide-react'

export function SettingsScreen() {
  const { user, signOut } = useAuth()
  const { setScreen, progress, userName, reset } = useAppStore()
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setScreen('home')
  }

  const handleResetProgress = () => {
    reset()
    setShowConfirmReset(false)
  }

  const menuItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: 'Account',
      sublabel: user?.email,
      onClick: () => {},
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Subscription',
      sublabel: 'Manage your plan',
      onClick: () => window.location.href = '/api/portal',
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: 'Notifications',
      sublabel: 'Reminders & alerts',
      onClick: () => {},
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: 'Help & Support',
      sublabel: 'Get help',
      onClick: () => {},
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setScreen('home')} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl text-white font-bold">
              {userName ? userName.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">{userName || 'Player'}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{progress.totalStars}</div>
              <div className="text-xs text-gray-500">Stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{progress.completedLevels.length}</div>
              <div className="text-xs text-gray-500">Levels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{progress.longestStreak}</div>
              <div className="text-xs text-gray-500">Best Streak</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.sublabel}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <button
            onClick={() => setShowConfirmReset(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-medium text-red-600">Reset Progress</div>
                <div className="text-xs text-gray-500">Start over from the beginning</div>
              </div>
            </div>
          </button>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>

        {/* Version */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Level Up! v1.0.0
        </p>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reset Progress?</h3>
            <p className="text-gray-600 mb-6">
              This will delete all your stars, badges, and completed levels. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-3 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="flex-1 py-3 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
