'use client'

import { Star, Zap, Lock, CheckCircle } from 'lucide-react'

// Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
}

export function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }
  
  const colorClasses = {
    primary: 'border-orange-500',
    white: 'border-white',
    gray: 'border-gray-400',
  }

  return (
    <div className={`${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`} />
  )
}

// Star Counter
interface StarCounterProps {
  count: number
  size?: 'sm' | 'md' | 'lg'
  showAnimation?: boolean
}

export function StarCounter({ count, size = 'md', showAnimation = false }: StarCounterProps) {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className={`flex items-center gap-2 bg-white/20 rounded-full ${sizeClasses[size]}`}>
      <Star 
        className={`${iconSizes[size]} text-yellow-300 fill-yellow-300 ${showAnimation ? 'animate-pulse' : ''}`} 
      />
      <span className="text-white font-bold">{count}</span>
    </div>
  )
}

// Streak Counter
interface StreakCounterProps {
  count: number
  size?: 'sm' | 'md' | 'lg'
}

export function StreakCounter({ count, size = 'md' }: StreakCounterProps) {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className={`flex items-center gap-2 bg-white/20 rounded-full ${sizeClasses[size]}`}>
      <Zap className={`${iconSizes[size]} text-yellow-300`} />
      <span className="text-white font-bold">{count} day streak</span>
    </div>
  )
}

// Badge
interface BadgeProps {
  icon: string
  name: string
  earned: boolean
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function Badge({ icon, name, earned, size = 'md', onClick }: BadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-14 h-14 text-2xl',
  }

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`
        ${sizeClasses[size]} 
        rounded-full flex items-center justify-center
        transition-all
        ${earned 
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg' 
          : 'bg-gray-200'
        }
        ${onClick ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}
      `}
      title={name}
    >
      {earned ? icon : <Lock className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

// Level Card
interface LevelCardProps {
  id: number
  name: string
  subtitle: string
  icon: string
  isCompleted: boolean
  isLocked: boolean
  onClick: () => void
}

export function LevelCard({ id, name, subtitle, icon, isCompleted, isLocked, onClick }: LevelCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        relative p-4 rounded-2xl text-left transition-all transform 
        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
        ${isCompleted ? 'bg-green-400' : 'bg-white'} 
        shadow-lg
      `}
    >
      {isCompleted && (
        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      )}
      {isLocked && (
        <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full p-1">
          <Lock className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`font-bold text-sm ${isCompleted ? 'text-white' : 'text-gray-800'}`}>
        {name}
      </div>
      <div className={`text-xs ${isCompleted ? 'text-white/80' : 'text-gray-500'}`}>
        {subtitle}
      </div>
      <div className="flex items-center gap-1 mt-2">
        <Star className={`w-4 h-4 ${isCompleted ? 'text-yellow-300 fill-yellow-300' : 'text-gray-300'}`} />
        <span className={`text-xs ${isCompleted ? 'text-white' : 'text-gray-400'}`}>10 stars</span>
      </div>
    </button>
  )
}

// Progress Bar
interface ProgressBarProps {
  current: number
  total: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ current, total, showLabel = true, size = 'md' }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)
  
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-white text-sm mb-2">
          <span>Progress</span>
          <span>{current}/{total} Levels</span>
        </div>
      )}
      <div className={`${heightClasses[size]} bg-white/30 rounded-full overflow-hidden`}>
        <div 
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Quiz Option
interface QuizOptionProps {
  id: string
  text: string
  isSelected: boolean
  isCorrect?: boolean
  isRevealed: boolean
  onSelect: () => void
}

export function QuizOption({ id, text, isSelected, isCorrect, isRevealed, onSelect }: QuizOptionProps) {
  let className = 'w-full p-4 rounded-xl text-left transition-all border-2 '
  
  if (!isRevealed) {
    className += 'bg-white border-gray-200 hover:border-blue-400'
  } else if (isSelected) {
    className += isCorrect 
      ? 'bg-green-100 border-green-500' 
      : 'bg-red-100 border-red-500'
  } else if (isCorrect) {
    className += 'bg-green-100 border-green-500'
  } else {
    className += 'bg-gray-100 border-gray-200'
  }

  return (
    <button
      onClick={onSelect}
      disabled={isRevealed}
      className={className}
    >
      <span className="font-bold mr-2">{id})</span> {text}
    </button>
  )
}

// Emoji Button
interface EmojiButtonProps {
  emoji: string
  isSelected: boolean
  onClick: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function EmojiButton({ emoji, isSelected, onClick, size = 'md' }: EmojiButtonProps) {
  const sizeClasses = {
    sm: 'text-2xl p-2',
    md: 'text-4xl p-3',
    lg: 'text-5xl p-4',
  }

  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClasses[size]} 
        rounded-xl transition-all
        ${isSelected ? 'bg-blue-200 scale-110' : 'bg-gray-100 hover:bg-gray-200'}
      `}
    >
      {emoji}
    </button>
  )
}

// Tag/Chip for selection
interface SelectableTagProps {
  text: string
  isSelected: boolean
  onClick: () => void
  colorScheme?: 'orange' | 'blue' | 'green' | 'purple'
}

export function SelectableTag({ text, isSelected, onClick, colorScheme = 'orange' }: SelectableTagProps) {
  const selectedColors = {
    orange: 'from-yellow-400 to-orange-400',
    blue: 'from-blue-400 to-cyan-400',
    green: 'from-green-400 to-teal-400',
    purple: 'from-purple-400 to-pink-400',
  }

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full transition-all text-sm
        ${isSelected 
          ? `bg-gradient-to-r ${selectedColors[colorScheme]} text-white` 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {text}
    </button>
  )
}
