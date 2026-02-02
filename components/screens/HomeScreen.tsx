'use client'

import { useAppStore } from '@/lib/store'
import { LEVELS } from '@/lib/levels'
import { StarCounter, StreakCounter, Badge, LevelCard, ProgressBar } from '@/components/ui/LoadingSpinner'
import { Settings, Share2, ChevronRight, Lock } from 'lucide-react'

export function HomeScreen() {
  const { 
    progress, 
    setScreen, 
    setCurrentLevel,
    userName 
  } = useAppStore()

  const handleLevelClick = (levelId: number) => {
    setCurrentLevel(levelId)
    setScreen('level')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 to-red-500 p-4 safe-top safe-bottom">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <StarCounter count={progress.totalStars} />
          <StreakCounter count={progress.currentStreak} />
          <button 
            onClick={() => setScreen('settings')}
            className="p-2 bg-white/20 rounded-full"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Welcome */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-white mb-1 drop-shadow-lg">
            LEVEL UP!
          </h1>
          {userName && (
            <p className="text-white/90">Hey {userName}! 👋</p>
          )}
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {LEVELS.map((level) => {
            const isCompleted = progress.completedLevels.includes(level.id)
            // For now, all levels are unlocked. You can add logic to lock levels
            const isLocked = false
            
            return (
              <LevelCard
                key={level.id}
                id={level.id}
                name={level.name}
                subtitle={level.subtitle}
                icon={level.icon}
                isCompleted={isCompleted}
                isLocked={isLocked}
                onClick={() => handleLevelClick(level.id)}
              />
            )
          })}
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4">
          <ProgressBar 
            current={progress.completedLevels.length} 
            total={8} 
          />
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">Your Badges</h3>
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map((level) => (
              <Badge
                key={level.id}
                icon={level.icon}
                name={`${level.name} Badge`}
                earned={progress.earnedBadges.includes(level.id)}
              />
            ))}
          </div>
        </div>

        {/* Share with Parent - Show after completing some levels */}
        {progress.completedLevels.length >= 2 && (
          <button
            onClick={() => setScreen('share')}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-lg mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Share2 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-800">Share with your parent!</div>
                <div className="text-xs text-gray-500">Help them understand you better</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{progress.totalStars}</div>
            <div className="text-xs text-white/80">Stars</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{progress.completedLevels.length}</div>
            <div className="text-xs text-white/80">Levels</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{progress.longestStreak}</div>
            <div className="text-xs text-white/80">Best Streak</div>
          </div>
        </div>

        {/* Completion Message */}
        {progress.completedLevels.length === 8 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <h2 className="text-xl font-bold text-white mb-1">Champion!</h2>
            <p className="text-white/90 text-sm">
              You've completed all 8 levels! You're amazing!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
