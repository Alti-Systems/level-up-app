'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { ChevronLeft, Share2, Copy, Check, ExternalLink } from 'lucide-react'

export function ShareScreen() {
  const { setScreen, progress } = useAppStore()
  const [copied, setCopied] = useState(false)
  
  const shareUrl = 'www.speakteen.com/parents'
  const discountCode = 'LEVELUP'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`Check out Speak Teen: The Parent Program! ${shareUrl} - Use code ${discountCode} for 20% off!`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Speak Teen: Parent Program',
          text: `I've been learning cool skills in Level Up! There's a program for parents too. Use code ${discountCode} for 20% off!`,
          url: `https://${shareUrl}`,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <button 
          onClick={() => setScreen('home')} 
          className="text-white mb-4 flex items-center gap-2 hover:opacity-80"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">One More Thing...</h2>
          </div>
          
          <p className="text-gray-700 mb-4">
            You've learned some really cool skills! But it works even <strong>BETTER</strong> when your parents learn some of this stuff too.
          </p>
          
          <p className="text-gray-700 mb-4">Imagine if your parent:</p>
          
          <ul className="space-y-2 mb-6">
            {[
              "Really understood what's going on under YOUR iceberg",
              "Knew how to listen without jumping straight to telling you what to do",
              "Understood why friend stuff feels like such a big deal",
              "Was better at making deals with you"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-gray-700 mb-6">That would make things easier at home, right?</p>
          
          {/* Share Link Box */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6">
            <p className="text-gray-800 font-medium mb-2">Share this link with your parent:</p>
            <div className="bg-white rounded-xl p-3 flex items-center justify-between">
              <p className="text-purple-600 font-bold">{shareUrl}</p>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-purple-600">
                Use code <strong>{discountCode}</strong> for 20% off!
              </span>
            </div>
          </div>
          
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Share2 className="w-5 h-5" />
            Share Link
          </button>
        </div>
        
        {/* Tips Card */}
        <div className="bg-white/20 rounded-2xl p-4 mb-6">
          <p className="text-white text-sm mb-3">💡 Not sure what to say? Try:</p>
          <div className="space-y-2">
            {[
              '"Hey, I\'ve been doing this program and it said there\'s one for parents too. Can you check it out?"',
              '"I learned some cool stuff about feelings and talking. There\'s a parent version that might help us get along even better."'
            ].map((script, i) => (
              <p key={i} className="text-white/90 italic text-sm bg-white/10 rounded-lg p-3">
                {script}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-4">
          <p className="text-gray-700 text-sm text-center">
            You've completed <strong>{progress.completedLevels.length}</strong> levels and earned <strong>{progress.totalStars}</strong> stars! 
            Share your progress with your parent! ⭐
          </p>
        </div>
      </div>
    </div>
  )
}
