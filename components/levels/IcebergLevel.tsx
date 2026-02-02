'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { ICEBERG_EXAMPLES } from '@/lib/levels'
import { QuizOption } from '@/components/ui/LoadingSpinner'

interface LevelProps {
  onComplete: () => void
}

export function IcebergLevel({ onComplete }: LevelProps) {
  const [step, setStep] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<number[]>([])
  const [icebergEntry, setIcebergEntry] = useState({ behavior: '', feeling: '', need: '' })
  
  const { addStars, addIcebergEntry } = useAppStore()

  const quizOptions = [
    { id: 'A', text: "You're just mean", correct: false },
    { id: 'B', text: "You want people to respect your things", correct: true },
    { id: 'C', text: "You hate your brother", correct: false },
    { id: 'D', text: "Nothing, you're just grumpy", correct: false },
  ]

  const handleQuizSelect = (id: string) => {
    if (quizAnswer) return
    setQuizAnswer(id)
    if (id === 'B') addStars(2)
  }

  const handleMatch = (index: number) => {
    if (!matchedPairs.includes(index)) {
      setMatchedPairs([...matchedPairs, index])
      addStars(1)
    }
  }

  const handleSaveIceberg = () => {
    addIcebergEntry({
      behavior: icebergEntry.behavior,
      feeling: icebergEntry.feeling,
      need: icebergEntry.need,
    })
    addStars(5)
    setStep(4)
  }

  const content = [
    // Step 0: Intro
    <div key="intro" className="text-center">
      <div className="text-8xl mb-6">🧊</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">The Iceberg</h2>
      <p className="text-gray-600 mb-6">What's REALLY going on underneath</p>
      
      <div className="bg-cyan-50 rounded-2xl p-4 text-left mb-6">
        <p className="text-gray-700 mb-3">
          You know how an iceberg is mostly hidden under the water? Only a tiny bit sticks out at the top.
        </p>
        <p className="text-gray-700 mb-3">
          Well, <strong>YOU</strong> are like an iceberg too!
        </p>
        <p className="text-gray-700">
          What people see (like when you slam a door or say "I'm fine" when you're not) is just the little bit at the top. But underneath? That's where the BIG stuff is.
        </p>
      </div>
      
      <button 
        onClick={() => setStep(1)} 
        className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg"
      >
        Let's Learn! →
      </button>
    </div>,

    // Step 1: Quiz
    <div key="quiz">
      <div className="bg-yellow-100 rounded-xl p-3 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        <span className="font-bold text-yellow-800">Quick Quiz!</span>
      </div>
      
      <p className="text-gray-700 mb-4">
        <strong>Picture this:</strong> Your little brother takes your stuff without asking. You yell at him. What's probably going on UNDER your iceberg?
      </p>
      
      <div className="space-y-2 mb-6">
        {quizOptions.map((option) => (
          <QuizOption
            key={option.id}
            id={option.id}
            text={option.text}
            isSelected={quizAnswer === option.id}
            isCorrect={option.correct}
            isRevealed={quizAnswer !== null}
            onSelect={() => handleQuizSelect(option.id)}
          />
        ))}
      </div>
      
      {quizAnswer && (
        <>
          <div className={`p-4 rounded-xl mb-4 ${quizAnswer === 'B' ? 'bg-green-100' : 'bg-orange-100'}`}>
            <p className="font-bold mb-1">{quizAnswer === 'B' ? '🎉 Correct!' : '💡 The answer is B!'}</p>
            <p className="text-sm">The yelling is just the tip. Underneath, you want respect!</p>
          </div>
          <button 
            onClick={() => setStep(2)} 
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-xl font-bold"
          >
            Next Activity →
          </button>
        </>
      )}
    </div>,

    // Step 2: Match Game
    <div key="match">
      <div className="bg-purple-100 rounded-xl p-3 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎮</span>
        <span className="font-bold text-purple-800">Match Game!</span>
      </div>
      
      <p className="text-gray-600 mb-4">Match what people SEE to what's REALLY going on:</p>
      
      <div className="space-y-3 mb-6">
        {ICEBERG_EXAMPLES.map((item, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-xl transition-all ${
              matchedPairs.includes(index) 
                ? 'bg-green-100 border-2 border-green-400' 
                : 'bg-white border-2 border-gray-200'
            }`}
          >
            <div className="font-medium text-gray-800 mb-2">"{item.behavior}"</div>
            <div className="text-sm text-gray-500">↓</div>
            <div className="text-sm text-blue-600">{item.underneath}</div>
            {!matchedPairs.includes(index) && (
              <button
                onClick={() => handleMatch(index)}
                className="mt-2 text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
              >
                Got it! ✓
              </button>
            )}
          </div>
        ))}
      </div>
      
      {matchedPairs.length === ICEBERG_EXAMPLES.length && (
        <button 
          onClick={() => setStep(3)} 
          className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-xl font-bold"
        >
          Draw Your Iceberg →
        </button>
      )}
    </div>,

    // Step 3: Draw Your Iceberg
    <div key="draw">
      <div className="bg-cyan-100 rounded-xl p-3 mb-4 flex items-center gap-2">
        <span className="text-2xl">✏️</span>
        <span className="font-bold text-cyan-800">Your Iceberg</span>
      </div>
      
      <p className="text-gray-600 mb-4">Think about a time you got really upset. Fill in your iceberg:</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🔝 TOP - What did people SEE? (what you did)
          </label>
          <input
            type="text"
            value={icebergEntry.behavior}
            onChange={(e) => setIcebergEntry({ ...icebergEntry, behavior: e.target.value })}
            placeholder="e.g., I slammed my door"
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            💙 MIDDLE - How were you REALLY feeling?
          </label>
          <input
            type="text"
            value={icebergEntry.feeling}
            onChange={(e) => setIcebergEntry({ ...icebergEntry, feeling: e.target.value })}
            placeholder="e.g., Mad and left out"
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🔵 BOTTOM - What did you actually NEED?
          </label>
          <input
            type="text"
            value={icebergEntry.need}
            onChange={(e) => setIcebergEntry({ ...icebergEntry, need: e.target.value })}
            placeholder="e.g., To be included"
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 outline-none"
          />
        </div>
      </div>

      {icebergEntry.behavior && icebergEntry.feeling && icebergEntry.need && (
        <button 
          onClick={handleSaveIceberg}
          className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-xl font-bold"
        >
          Save & Continue →
        </button>
      )}
    </div>,

    // Step 4: Mission
    <div key="mission" className="text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mission!</h2>
      
      <div className="bg-orange-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-700 mb-3">This week, when you catch yourself getting upset:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Stop for a second</li>
          <li>Ask yourself: "What's under MY iceberg right now?"</li>
          <li>Come back and log it in the app</li>
        </ol>
        <p className="mt-3 font-medium text-orange-700">Do this 3 times to complete the mission!</p>
      </div>
      
      <button 
        onClick={onComplete}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg"
      >
        🎉 Complete Level 1! (+10 Stars)
      </button>
    </div>,
  ]

  return content[step]
}
