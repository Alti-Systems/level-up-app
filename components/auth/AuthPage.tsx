'use client'

import { useState } from 'react'
import { useAuth } from '@/components/Providers'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Check } from 'lucide-react'
import Link from 'next/link'

interface AuthPageProps {
  mode?: 'login' | 'signup'
  showPricing?: boolean
}

export function AuthPage({ mode = 'login', showPricing = false }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(mode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly')
  
  const { signIn, signUp, signInWithMagicLink } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (authMode === 'signup') {
        const { error } = await signUp(email, password, name)
        if (error) {
          setError(error.message)
        } else {
          setSuccessMessage('Check your email to confirm your account!')
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          router.push('/')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLink = async () => {
    if (!email) {
      setError('Please enter your email')
      return
    }
    setIsLoading(true)
    setError(null)
    const { error } = await signInWithMagicLink(email)
    if (error) {
      setError(error.message)
    } else {
      setSuccessMessage('Check your email for a magic link!')
    }
    setIsLoading(false)
  }

  if (showPricing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-400 to-red-500 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Subscribe to Continue
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Start your 7-day free trial
            </p>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  selectedPlan === 'monthly' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  selectedPlan === 'yearly' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl font-black text-gray-800">
                ${selectedPlan === 'monthly' ? '9.99' : '7.99'}
              </div>
              <div className="text-gray-500">
                per month {selectedPlan === 'yearly' && '(billed yearly)'}
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {['All 8 interactive levels', 'Daily mood tracking', 'Progress & achievements', 'Personalized calm-down kit', 'Mission challenges', 'Cancel anytime'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <form action="/api/checkout" method="POST">
              <input type="hidden" name="plan" value={selectedPlan === 'monthly' ? 'CHILD_MONTHLY' : 'CHILD_YEARLY'} />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Start 7-Day Free Trial
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-4">
              You won't be charged until your trial ends
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-red-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-white mb-6 hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
          Back to home
        </Link>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {authMode === 'login' ? 'Sign in to continue your journey' : 'Start your Level Up! adventure'}
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-sm">{error}</div>
          )}

          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 text-sm">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 outline-none"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={handleMagicLink}
            disabled={isLoading}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50"
          >
            Send Magic Link
          </button>

          <p className="text-center mt-6 text-gray-600">
            {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-orange-600 font-medium hover:underline"
            >
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
