'use client'

import { useAppStore } from '@/lib/store'
import { LEVELS } from '@/lib/levels'
import { ChevronLeft, Star } from 'lucide-react'

// Level Components
import { 
  IcebergLevel,
  FeelingsLevel,
  SayItRightLevel,
  TrustLevel,
  AwesomeLevel,
  FriendLevel,
  ChillLevel,
  DealLevel 
} from '@/components/levels'

const levelComponents: Record<number, React.ComponentType<{ onComplete: () => void }>> = {
  1: IcebergLevel,
  2: FeelingsLevel,
  3: SayItRightLevel,
  4: TrustLevel,
  5: AwesomeLevel,
  6: FriendLevel,
  7: ChillLevel,
  8: DealLevel,
}

export function LevelScreen() {
  const { currentLevel, setScreen, setCurrentLevel, progress, completeLevel, addStars } = useAppStore()

  if (!currentLevel) {
    setScreen('home')
    return null
  }

  const level = LEVELS.find(l => l.id === currentLevel)
  if (!level) {
    setScreen('home')
    return null
  }

  const LevelComponent = levelComponents[currentLevel]

  const handleBack = () => {
    setCurrentLevel(null)
    setScreen('home')
  }

  const handleComplete = () => {
    completeLevel(currentLevel)
    setCurrentLevel(null)
    setScreen('home')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${level.gradient} p-4 pb-6`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-white hover:opacity-80"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-white font-bold text-sm">{progress.totalStars}</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl mb-2">{level.icon}</div>
            <h1 className="text-2xl font-bold text-white">{level.name}</h1>
            <p className="text-white/80">{level.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 -mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <LevelComponent onComplete={handleComplete} />
        </div>
      </div>
    </div>
  )
}
