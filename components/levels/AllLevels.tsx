'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { BODY_CLUES, FEELING_WORDS, COMMUNICATION_EXAMPLES, COPING_TOOLS, QUALITIES, GOOD_FRIEND_SIGNS } from '@/lib/levels'
import { EmojiButton, SelectableTag } from '@/components/ui/LoadingSpinner'

interface LevelProps {
  onComplete: () => void
}

// ========================================
// LEVEL 2: FEELINGS DETECTIVE
// ========================================
export function FeelingsLevel({ onComplete }: LevelProps) {
  const [step, setStep] = useState(0)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(5)
  const { addStars, addMoodLog } = useAppStore()

  const emojis = ['😊', '😢', '😠', '😰', '😴']

  const handleMoodSubmit = () => {
    if (selectedEmoji) {
      addMoodLog({ emoji: selectedEmoji, intensity })
      addStars(5)
      setStep(4)
    }
  }

  const content = [
    // Intro
    <div key="intro" className="text-center">
      <div className="text-8xl mb-6">🔍</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Feelings Detective</h2>
      <p className="text-gray-600 mb-6">Learn to understand your emotions</p>
      <div className="bg-pink-50 rounded-2xl p-4 text-left mb-6">
        <p className="text-gray-700 mb-3">Feelings aren't good or bad — they're like <strong>clues!</strong></p>
        <p className="text-gray-700">Your <strong>BODY</strong> often knows how you feel before your brain figures it out!</p>
      </div>
      <button onClick={() => { addStars(1); setStep(1); }} className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold">
        Start Detecting! →
      </button>
    </div>,

    // Body Clues
    <div key="body">
      <div className="bg-pink-100 rounded-xl p-3 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎮</span>
        <span className="font-bold text-pink-800">Body Clues Game</span>
      </div>
      <div className="space-y-3 mb-6">
        {BODY_CLUES.slice(0, 4).map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <div className="font-medium text-gray-800">{item.clue}</div>
                <div className="text-sm text-pink-600">= {item.feeling}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { addStars(3); setStep(2); }} className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold">
        Learn More Words →
      </button>
    </div>,

    // Feeling Words
    <div key="words">
      <div className="bg-purple-100 rounded-xl p-3 mb-4 flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <span className="font-bold text-purple-800">Feelings Word Power-Up!</span>
      </div>
      {Object.entries(FEELING_WORDS).slice(0, 3).map(([cat, words]) => (
        <div key={cat} className="mb-4">
          <div className="font-medium text-gray-700 mb-2">Instead of just "{cat}":</div>
          <div className="flex flex-wrap gap-2">
            {words.slice(0, 5).map((word) => (
              <span key={word} className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm">
                {word}
              </span>
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => { addStars(2); setStep(3); }} className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold mt-4">
        Try Mood Check-In →
      </button>
    </div>,

    // Mood Check
    <div key="mood">
      <div className="bg-blue-100 rounded-xl p-3 mb-4 flex items-center gap-2">
        <span className="text-2xl">😊</span>
        <span className="font-bold text-blue-800">How are you feeling right now?</span>
      </div>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {emojis.map((emoji) => (
          <EmojiButton key={emoji} emoji={emoji} isSelected={selectedEmoji === emoji} onClick={() => setSelectedEmoji(emoji)} />
        ))}
      </div>
      {selectedEmoji && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">How big is this feeling? ({intensity})</label>
            <input type="range" min="1" max="10" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500"><span>Small</span><span>Medium</span><span>BIG!</span></div>
          </div>
          <button onClick={handleMoodSubmit} className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold">
            Save & Complete →
          </button>
        </>
      )}
    </div>,

    // Complete
    <div key="complete" className="text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mission!</h2>
      <div className="bg-pink-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-700">Do the Daily Mood Check-In for <strong>7 days</strong> in a row!</p>
      </div>
      <button onClick={onComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold">
        🎉 Complete Level 2! (+10 Stars)
      </button>
    </div>,
  ]
  return content[step]
}

// ========================================
// LEVEL 3: SAY IT RIGHT
// ========================================
export function SayItRightLevel({ onComplete }: LevelProps) {
  const [step, setStep] = useState(0)
  const [reframeInput, setReframeInput] = useState('')
  const { addStars } = useAppStore()

  const content = [
    <div key="intro" className="text-center">
      <div className="text-8xl mb-6">💬</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Say It Right</h2>
      <div className="bg-blue-50 rounded-2xl p-4 text-left mb-6">
        <p className="text-gray-700"><strong>HOW</strong> you say something matters just as much as <strong>WHAT</strong> you say!</p>
      </div>
      <button onClick={() => setStep(1)} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold">
        Learn the Secret →
      </button>
    </div>,

    <div key="examples">
      <div className="bg-blue-100 rounded-xl p-3 mb-4"><span className="font-bold">🔄 Works vs. Doesn't Work</span></div>
      <div className="space-y-3 mb-6">
        {COMMUNICATION_EXAMPLES.map((ex, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-start gap-2 mb-2"><span className="text-red-500">❌</span><span className="text-gray-600 line-through text-sm">{ex.bad}</span></div>
            <div className="flex items-start gap-2"><span className="text-green-500">✓</span><span className="text-gray-800 text-sm">{ex.good}</span></div>
          </div>
        ))}
      </div>
      <button onClick={() => { addStars(3); setStep(2); }} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold">
        Learn The Magic Sentence →
      </button>
    </div>,

    <div key="formula">
      <div className="bg-yellow-100 rounded-xl p-3 mb-4"><span className="font-bold">✨ The Magic Sentence</span></div>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 mb-6">
        <p className="text-white text-lg font-bold text-center">"I feel [FEELING] when [WHAT HAPPENED] because [WHY]."</p>
      </div>
      <div className="bg-white rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-600 mb-2">Example:</p>
        <p className="text-gray-800 text-sm">"I feel <span className="text-blue-600 font-medium">left out</span> when <span className="text-green-600 font-medium">I can't go to my friend's house</span> because <span className="text-purple-600 font-medium">I really wanted to see them</span>."</p>
      </div>
      <button onClick={() => { addStars(3); setStep(3); }} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold">
        Try It Yourself →
      </button>
    </div>,

    <div key="practice">
      <div className="bg-green-100 rounded-xl p-3 mb-4"><span className="font-bold">✏️ Your Turn!</span></div>
      <p className="text-gray-600 mb-2">Turn this into a Magic Sentence:</p>
      <div className="bg-red-100 rounded-xl p-3 mb-4"><p className="text-red-700">"You're always picking on me!"</p></div>
      <textarea value={reframeInput} onChange={(e) => setReframeInput(e.target.value)} placeholder="I feel... when... because..." className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 outline-none mb-4 h-24" />
      {reframeInput.length > 10 && (
        <button onClick={() => { addStars(4); setStep(4); }} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold">
          Great Job! Continue →
        </button>
      )}
    </div>,

    <div key="complete" className="text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mission!</h2>
      <div className="bg-blue-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-700">Use the Magic Sentence <strong>ONE time</strong> this week for real!</p>
      </div>
      <button onClick={onComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold">
        🎉 Complete Level 3! (+10 Stars)
      </button>
    </div>,
  ]
  return content[step]
}

// ========================================
// LEVEL 4: TRUST BUILDER
// ========================================
export function TrustLevel({ onComplete }: LevelProps) {
  const [step, setStep] = useState(0)
  const [coins, setCoins] = useState(5)
  const [scenarioChoice, setScenarioChoice] = useState<string | null>(null)
  const { addStars } = useAppStore()

  const content = [
    <div key="intro" className="text-center">
      <div className="text-8xl mb-6">🏦</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trust Builder</h2>
      <div className="bg-green-50 rounded-2xl p-4 text-left mb-6">
        <p className="text-gray-700">Trust is like a piggy bank. You have to put coins IN before you can take them OUT!</p>
      </div>
      <button onClick={() => setStep(1)} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold">
        Start Building Trust →
      </button>
    </div>,

    <div key="piggy">
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">🐷</div>
        <div className="flex justify-center gap-1">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center ${i < coins ? 'bg-yellow-400' : 'bg-gray-200'}`}>
              {i < coins && <span className="text-xs">🪙</span>}
            </div>
          ))}
        </div>
        <p className="text-lg font-bold text-gray-800 mt-2">{coins} coins</p>
      </div>
      <div className="space-y-2 mb-6">
        <button onClick={() => { setCoins(c => Math.min(10, c + 1)); addStars(1); }} className="w-full bg-green-100 p-3 rounded-xl text-left flex justify-between">
          <span>✓ Coming home when you said</span><span className="text-green-600 font-bold">+1</span>
        </button>
        <button onClick={() => { setCoins(c => Math.min(10, c + 1)); addStars(1); }} className="w-full bg-green-100 p-3 rounded-xl text-left flex justify-between">
          <span>✓ Telling the truth</span><span className="text-green-600 font-bold">+1</span>
        </button>
        <button onClick={() => setCoins(c => Math.max(0, c - 2))} className="w-full bg-red-100 p-3 rounded-xl text-left flex justify-between">
          <span>✗ Telling a lie</span><span className="text-red-600 font-bold">-2</span>
        </button>
      </div>
      <button onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold">
        Try a Scenario →
      </button>
    </div>,

    <div key="scenario">
      <p className="text-gray-700 mb-4"><strong>You're at a friend's house.</strong> Your parent said be home by 5pm. It's 4:45. What do you do?</p>
      <div className="space-y-2 mb-6">
        {[
          { id: 'A', text: 'Stay and hope no one notices', result: 'bad' },
          { id: 'B', text: 'Text to ask if you can stay longer', result: 'ok' },
          { id: 'C', text: 'Leave now to be home on time', result: 'good' },
          { id: 'D', text: 'Come home at 5:30', result: 'bad' },
        ].map((opt) => (
          <button key={opt.id} onClick={() => { setScenarioChoice(opt.id); if (opt.result === 'good') addStars(3); }}
            disabled={!!scenarioChoice}
            className={`w-full p-4 rounded-xl text-left border-2 ${
              !scenarioChoice ? 'bg-white border-gray-200' :
              scenarioChoice === opt.id ? (opt.result === 'good' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') : 'bg-gray-50 border-gray-200'
            }`}>
            <span className="font-bold mr-2">{opt.id})</span> {opt.text}
          </button>
        ))}
      </div>
      {scenarioChoice && (
        <button onClick={() => setStep(3)} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold">
          Continue →
        </button>
      )}
    </div>,

    <div key="complete" className="text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mission!</h2>
      <div className="bg-green-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-700">This week, add <strong>3 coins</strong> to your trust piggy bank!</p>
      </div>
      <button onClick={onComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold">
        🎉 Complete Level 4! (+10 Stars)
      </button>
    </div>,
  ]
  return content[step]
}

// ========================================
// LEVEL 5: YOU'RE AWESOME
// ========================================
export function AwesomeLevel({ onComplete }: LevelProps) {
  const [step, setStep] = useState(0)
  const [selectedQualities, setSelectedQualities] = useState<string[]>([])
  const { addStars, updateQualities } = useAppStore()

  const toggleQuality = (q: string) => {
    if (selectedQualities.includes(q)) {
      setSelectedQualities(selectedQualities.filter(x => x !== q))
    } else {
      setSelectedQualities([...selectedQualities, q])
      addStars(1)
    }
  }

  const content = [
    <div key="intro" className="text-center">
      <div className="text-8xl mb-6">⭐</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">You're Awesome!</h2>
      <div className="bg-yellow-50 rounded-2xl p-4 text-left mb-6">
        <p className="text-gray-700">You're not just your grades or how you look. You're so much <strong>MORE</strong>!</p>
      </div>
      <button onClick={() => setStep(1)} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-bold">
        Discover Your Awesomeness →
      </button>
    </div>,

    <div key="qualities">
      <div className="bg-yellow-100 rounded-xl p-3 mb-4"><span className="font-bold">✨ What Makes You, YOU?</span></div>
      <p className="text-gray-600 mb-4">Tap all the ones that sound like you:</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {QUALITIES.map((q) => (
          <SelectableTag key={q} text={q} isSelected={selectedQualities.includes(q)} onClick={() => toggleQuality(q)} />
        ))}
      </div>
      {selectedQualities.length >= 3 && (
        <button onClick={() => { updateQualities(selectedQualities); setStep(2); }} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-bold">
          Continue →
        </button>
      )}
    </div>,

    <div key="brain">
      <div className="bg-purple-100 rounded-xl p-3 mb-4"><span className="font-bold">🧠 The Tricky Brain Thing</span></div>
      <div className="bg-white rounded-xl p-4 mb-4">
        <p className="text-gray-700 mb-3">Your brain notices <strong>BAD</strong> stuff way more than good stuff.</p>
        <p className="text-gray-800 font-bold">That's normal — but it's not fair to you!</p>
      </div>
      <button onClick={() => setStep(3)} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-bold">
        Continue →
      </button>
    </div>,

    <div key="complete" className="text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mission!</h2>
      <div className="bg-yellow-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-700">For <strong>5 days</strong>, write ONE thing you did that shows who you are.</p>
      </div>
      <div className="bg-purple-100 rounded-xl p-4 mb-6">
        <p className="text-purple-800 font-medium text-sm">Your qualities: {selectedQualities.join(', ')}</p>
      </div>
      <button onClick={onComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold">
        🎉 Complete Level 5! (+10 Stars)
      </button>
    </div>,
  ]
  return content[step]
}

// ========================================
// LEVEL 6: FRIEND ZONE
// ========================================
export function FriendLevel({ onComplete }: LevelProps) {
  const [step, setStep] = useState(0)
  const [scenarioChoice, setScenarioChoice] = useState<string | null>(null)
  const { addStars } = useAppStore()

  const content = [
    <div key="intro" className="text-center">
      <div className="text-8xl mb-6">👥</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Friend Zone</h2>
      <div className="bg-purple-50 rounded-2xl p-4 text-left mb-6">
        <p className="text-gray-700">This level helps you deal with the hard parts of friendship.</p>
      </div>
      <button onClick={() => setStep(1)} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold">
        Let's Go →
      </button>
    </div>,

    <div key="leftout">
      <div className="bg-purple-100 rounded-xl p-3 mb-4"><span className="font-bold">😔 The Left-Out Feeling</span></div>
      <div className="bg-white rounded-xl p-4 mb-6">
        <p className="text-gray-700 mb-3">That feeling is real and it's okay to feel it.</p>
        <p className="text-gray-700 italic">Most of the time, friends aren't leaving you out on purpose.</p>
      </div>
      <button onClick={() => { addStars(2); setStep(2); }} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold">
        Try a Scenario →
      </button>
    </div>,

    <div key="scenario">
      <p className="text-gray-700 mb-4"><strong>Your friends want to do something you're not comfortable with.</strong> What do you do?</p>
      <div className="space-y-2 mb-6">
        {[
          { id: 'A', text: 'Do it anyway', good: false },
          { id: 'B', text: '"Not my thing" and suggest something else', good: true },
          { id: 'C', text: 'Leave without saying anything', good: false },
          { id: 'D', text: '"I don\'t want to do that"', good: true },
        ].map((opt) => (
          <button key={opt.id} onClick={() => { setScenarioChoice(opt.id); if (opt.good) addStars(3); }}
            disabled={!!scenarioChoice}
            className={`w-full p-4 rounded-xl text-left border-2 ${
              !scenarioChoice ? 'bg-white border-gray-200' :
              scenarioChoice === opt.id ? (opt.good ? 'bg-green-100 border-green-500' : 'bg-orange-100 border-orange-500') : 'bg-gray-50 border-gray-200'
            }`}>
            <span className="font-bold mr-2">{opt.id})</span> {opt.text}
          </button>
        ))}
      </div>
      {scenarioChoice && (
        <>
          <div className="bg-blue-100 rounded-xl p-4 mb-4"><p className="text-blue-800 text-sm">💡 Good friends will be okay if you say no!</p></div>
          <button onClick={() => setStep(3)} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold">Continue →</button>
        </>
      )}
    </div>,

    <div key="complete" className="text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mission!</h2>
      <div className="bg-purple-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-700">Think about: Who can you be 100% yourself with?</p>
      </div>
      <button onClick={onComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold">
        🎉 Complete Level 6! (+10 Stars)
      </button>
    </div>,
  ]
  return content[step]
}

// ========================================
// LEVEL 7: CHILL OUT
// ========================================
export function ChillLevel({ onComplete }: LevelProps) {
  const [step, setStep] = useState(0)
  const [selectedTools, setSelectedTools] = useState<Record<string, string[]>>({ mad: [], sad: [], worried: [], stressed: [] })
  const { addStars, updateCalmDownKit } = useAppStore()

  const toggleTool = (emotion: string, tool: string) => {
    const current = selectedTools[emotion]
    if (current.includes(tool)) {
      setSelectedTools({ ...selectedTools, [emotion]: current.filter(t => t !== tool) })
    } else {
      setSelectedTools({ ...selectedTools, [emotion]: [...current, tool] })
      addStars(1)
    }
  }

  const content = [
    <div key="intro" className="text-center">
      <div className="text-8xl mb-6">😌</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Chill Out</h2>
      <div className="bg-teal-50 rounded-2xl p-4 text-left mb-6">
        <p className="text-gray-700">What matters is what you <strong>DO</strong> when big feelings hit.</p>
      </div>
      <button onClick={() => setStep(1)} className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-bold">
        Learn to Chill →
      </button>
    </div>,

    <div key="stop">
      <div className="bg-teal-100 rounded-xl p-3 mb-4"><span className="font-bold">🛑 The STOP Method</span></div>
      <div className="space-y-3 mb-6">
        {[
          { letter: 'S', color: 'red', text: 'Stop! Don\'t do or say anything yet' },
          { letter: 'T', color: 'orange', text: 'Take a breath. In for 4, out for 4' },
          { letter: 'O', color: 'yellow', text: 'Observe. What am I feeling?' },
          { letter: 'P', color: 'green', text: 'Pick. Choose what to do next' },
        ].map((item) => (
          <div key={item.letter} className={`bg-${item.color}-100 p-4 rounded-xl`}>
            <span className={`text-2xl font-bold text-${item.color}-600`}>{item.letter}</span>
            <span className="ml-2 text-gray-800">- {item.text}</span>
          </div>
        ))}
      </div>
      <button onClick={() => { addStars(3); setStep(2); }} className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-bold">
        Build Your Kit →
      </button>
    </div>,

    <div key="kit">
      <div className="bg-blue-100 rounded-xl p-3 mb-4"><span className="font-bold">🧰 Build Your Calm-Down Kit</span></div>
      {Object.entries(COPING_TOOLS).map(([emotion, tools]) => (
        <div key={emotion} className="mb-4">
          <div className="font-medium text-gray-700 mb-2 capitalize">When I'm {emotion}:</div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <SelectableTag key={tool} text={tool} isSelected={selectedTools[emotion].includes(tool)} onClick={() => toggleTool(emotion, tool)} colorScheme="blue" />
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => { updateCalmDownKit(selectedTools as any); setStep(3); }} className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-bold mt-4">
        Complete Level →
      </button>
    </div>,

    <div key="complete" className="text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mission!</h2>
      <div className="bg-teal-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-700">Use the <strong>STOP</strong> method <strong>3 times</strong> this week!</p>
      </div>
      <button onClick={onComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold">
        🎉 Complete Level 7! (+10 Stars)
      </button>
    </div>,
  ]
  return content[step]
}

// ========================================
// LEVEL 8: MAKE A DEAL
// ========================================
export function DealLevel({ onComplete }: LevelProps) {
  const [step, setStep] = useState(0)
  const [scenarioChoice, setScenarioChoice] = useState<string | null>(null)
  const [dealPlan, setDealPlan] = useState({ want: '', why: '', concern: '', compromise: '' })
  const { addStars } = useAppStore()

  const content = [
    <div key="intro" className="text-center">
      <div className="text-8xl mb-6">🤝</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Make a Deal</h2>
      <div className="bg-yellow-50 rounded-2xl p-4 text-left mb-6">
        <p className="text-gray-700">Instead of just asking and hoping, there's a smarter way: <strong>making a deal!</strong></p>
      </div>
      <button onClick={() => setStep(1)} className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-4 rounded-xl font-bold">
        Learn to Deal →
      </button>
    </div>,

    <div key="steps">
      <div className="bg-yellow-100 rounded-xl p-3 mb-4"><span className="font-bold">📝 The Deal-Making Steps</span></div>
      <div className="space-y-3 mb-6">
        {['Listen first - Understand why they might say no', 'Explain your side - Say what you want AND why', 'Find the middle - What could work for both?', 'Make the deal - Agree on something together'].map((text, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border-2 border-gray-200">
            <span className="font-bold text-yellow-600">{i + 1}.</span> {text}
          </div>
        ))}
      </div>
      <button onClick={() => { addStars(3); setStep(2); }} className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-4 rounded-xl font-bold">
        Try a Scenario →
      </button>
    </div>,

    <div key="scenario">
      <p className="text-gray-700 mb-4"><strong>You want to play games for another hour.</strong> Your parent says stop. What do you try?</p>
      <div className="space-y-2 mb-6">
        {[
          { id: 'A', text: '"That\'s not fair!"', best: false, good: false },
          { id: 'B', text: '"Can I ask why?"', best: false, good: true },
          { id: 'C', text: '"What if I do homework first?"', best: true, good: true },
          { id: 'D', text: 'Ignore them', best: false, good: false },
        ].map((opt) => (
          <button key={opt.id} onClick={() => { setScenarioChoice(opt.id); if (opt.best) addStars(5); else if (opt.good) addStars(3); }}
            disabled={!!scenarioChoice}
            className={`w-full p-4 rounded-xl text-left border-2 ${
              !scenarioChoice ? 'bg-white border-gray-200' :
              scenarioChoice === opt.id ? (opt.best ? 'bg-green-100 border-green-500' : opt.good ? 'bg-blue-100 border-blue-500' : 'bg-red-100 border-red-500') : 'bg-gray-50 border-gray-200'
            }`}>
            <span className="font-bold mr-2">{opt.id})</span> {opt.text}
          </button>
        ))}
      </div>
      {scenarioChoice && (
        <>
          <div className="bg-green-100 rounded-xl p-4 mb-4"><p className="text-green-800 text-sm">💡 Option C is deal-making! You're offering something in return.</p></div>
          <button onClick={() => setStep(3)} className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-4 rounded-xl font-bold">Plan Your Own Deal →</button>
        </>
      )}
    </div>,

    <div key="plan">
      <div className="bg-green-100 rounded-xl p-3 mb-4"><span className="font-bold">✏️ Plan Your Deal</span></div>
      <div className="space-y-3 mb-6">
        {[
          { key: 'want', label: 'What I want:', placeholder: 'e.g., Stay up later' },
          { key: 'why', label: 'Why I want it:', placeholder: 'e.g., To watch a movie' },
          { key: 'concern', label: 'Why they might say no:', placeholder: 'e.g., Worried I\'ll be tired' },
          { key: 'compromise', label: 'A deal that might work:', placeholder: 'e.g., I\'ll sleep in tomorrow' },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input type="text" value={dealPlan[field.key as keyof typeof dealPlan]} onChange={(e) => setDealPlan({ ...dealPlan, [field.key]: e.target.value })} placeholder={field.placeholder} className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 outline-none" />
          </div>
        ))}
      </div>
      {dealPlan.want && dealPlan.compromise && (
        <button onClick={() => { addStars(5); setStep(4); }} className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-4 rounded-xl font-bold">
          Complete Level →
        </button>
      )}
    </div>,

    <div key="complete" className="text-center">
      <div className="text-6xl mb-4">🏆</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">FINAL Mission!</h2>
      <div className="bg-yellow-100 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-700">Try making a <strong>real deal</strong> with your parent this week!</p>
      </div>
      <button onClick={onComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold">
        🎉 Complete Level 8! GAME COMPLETE!
      </button>
    </div>,
  ]
  return content[step]
}
