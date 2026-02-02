import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
interface UserProgress {
  totalStars: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string | null
  completedLevels: number[]
  earnedBadges: number[]
  levelProgress: Record<number, Record<string, any>>
  calmDownKit: {
    mad: string[]
    sad: string[]
    worried: string[]
    stressed: string[]
  }
  myQualities: string[]
}

interface MoodEntry {
  id: string
  emoji: string
  intensity: number
  trigger?: string
  note?: string
  createdAt: string
}

interface IcebergEntry {
  id: string
  behavior: string
  feeling: string
  need: string
  createdAt: string
}

interface AppState {
  // User
  userId: string | null
  userEmail: string | null
  userName: string | null
  isAuthenticated: boolean
  isSubscribed: boolean
  
  // Progress
  progress: UserProgress
  
  // Activity logs
  moodLogs: MoodEntry[]
  icebergEntries: IcebergEntry[]
  
  // UI State
  currentScreen: 'home' | 'level' | 'share' | 'settings' | 'profile'
  currentLevel: number | null
  isLoading: boolean
  
  // Actions
  setUser: (userId: string, email: string, name?: string) => void
  clearUser: () => void
  setSubscribed: (status: boolean) => void
  
  addStars: (amount: number) => void
  completeLevel: (levelId: number) => void
  updateLevelProgress: (levelId: number, data: Record<string, any>) => void
  updateStreak: () => void
  
  addMoodLog: (entry: Omit<MoodEntry, 'id' | 'createdAt'>) => void
  addIcebergEntry: (entry: Omit<IcebergEntry, 'id' | 'createdAt'>) => void
  
  updateCalmDownKit: (kit: UserProgress['calmDownKit']) => void
  updateQualities: (qualities: string[]) => void
  
  setScreen: (screen: AppState['currentScreen']) => void
  setCurrentLevel: (level: number | null) => void
  setLoading: (loading: boolean) => void
  
  // Sync with server
  syncFromServer: (data: Partial<UserProgress>) => void
  reset: () => void
}

const initialProgress: UserProgress = {
  totalStars: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  completedLevels: [],
  earnedBadges: [],
  levelProgress: {},
  calmDownKit: { mad: [], sad: [], worried: [], stressed: [] },
  myQualities: [],
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userId: null,
      userEmail: null,
      userName: null,
      isAuthenticated: false,
      isSubscribed: false,
      progress: initialProgress,
      moodLogs: [],
      icebergEntries: [],
      currentScreen: 'home',
      currentLevel: null,
      isLoading: false,

      // User actions
      setUser: (userId, email, name) => set({
        userId,
        userEmail: email,
        userName: name,
        isAuthenticated: true,
      }),

      clearUser: () => set({
        userId: null,
        userEmail: null,
        userName: null,
        isAuthenticated: false,
        isSubscribed: false,
      }),

      setSubscribed: (status) => set({ isSubscribed: status }),

      // Progress actions
      addStars: (amount) => set((state) => ({
        progress: {
          ...state.progress,
          totalStars: state.progress.totalStars + amount,
        },
      })),

      completeLevel: (levelId) => set((state) => {
        if (state.progress.completedLevels.includes(levelId)) {
          return state
        }
        return {
          progress: {
            ...state.progress,
            completedLevels: [...state.progress.completedLevels, levelId],
            earnedBadges: [...state.progress.earnedBadges, levelId],
            totalStars: state.progress.totalStars + 10,
          },
        }
      }),

      updateLevelProgress: (levelId, data) => set((state) => ({
        progress: {
          ...state.progress,
          levelProgress: {
            ...state.progress.levelProgress,
            [levelId]: {
              ...state.progress.levelProgress[levelId],
              ...data,
            },
          },
        },
      })),

      updateStreak: () => set((state) => {
        const today = new Date().toDateString()
        const lastActive = state.progress.lastActiveDate
        
        if (lastActive === today) {
          return state // Already logged today
        }
        
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const wasYesterday = lastActive === yesterday.toDateString()
        
        const newStreak = wasYesterday ? state.progress.currentStreak + 1 : 1
        
        return {
          progress: {
            ...state.progress,
            currentStreak: newStreak,
            longestStreak: Math.max(state.progress.longestStreak, newStreak),
            lastActiveDate: today,
          },
        }
      }),

      // Activity logs
      addMoodLog: (entry) => set((state) => ({
        moodLogs: [
          {
            ...entry,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
          ...state.moodLogs,
        ],
      })),

      addIcebergEntry: (entry) => set((state) => ({
        icebergEntries: [
          {
            ...entry,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
          ...state.icebergEntries,
        ],
      })),

      updateCalmDownKit: (kit) => set((state) => ({
        progress: {
          ...state.progress,
          calmDownKit: kit,
        },
      })),

      updateQualities: (qualities) => set((state) => ({
        progress: {
          ...state.progress,
          myQualities: qualities,
        },
      })),

      // UI actions
      setScreen: (screen) => set({ currentScreen: screen }),
      setCurrentLevel: (level) => set({ currentLevel: level }),
      setLoading: (loading) => set({ isLoading: loading }),

      // Sync
      syncFromServer: (data) => set((state) => ({
        progress: {
          ...state.progress,
          ...data,
        },
      })),

      reset: () => set({
        progress: initialProgress,
        moodLogs: [],
        icebergEntries: [],
        currentScreen: 'home',
        currentLevel: null,
      }),
    }),
    {
      name: 'level-up-storage',
      partialize: (state) => ({
        progress: state.progress,
        moodLogs: state.moodLogs,
        icebergEntries: state.icebergEntries,
      }),
    }
  )
)

// Selectors
export const selectProgress = (state: AppState) => state.progress
export const selectIsLevelComplete = (levelId: number) => (state: AppState) => 
  state.progress.completedLevels.includes(levelId)
export const selectHasBadge = (levelId: number) => (state: AppState) => 
  state.progress.earnedBadges.includes(levelId)
