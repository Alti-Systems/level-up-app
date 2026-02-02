'use client'

import { useState } from 'react'
import { Star, Check, ArrowRight, Sparkles, Heart, Brain, Users, Shield } from 'lucide-react'
import Link from 'next/link'

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)

  const features = [
    { icon: <Brain className="w-6 h-6" />, title: 'Understand Emotions', description: 'Learn to recognize and manage feelings' },
    { icon: <Heart className="w-6 h-6" />, title: 'Build Self-Esteem', description: 'Discover your unique strengths' },
    { icon: <Users className="w-6 h-6" />, title: 'Handle Friendships', description: 'Navigate peer pressure and drama' },
    { icon: <Shield className="w-6 h-6" />, title: 'Manage Stress', description: 'Build a toolkit for tough times' },
  ]

  const levels = [
    { icon: '🧊', name: 'The Iceberg', description: "What's really going on underneath" },
    { icon: '🔍', name: 'Feelings Detective', description: 'Understand your emotions' },
    { icon: '💬', name: 'Say It Right', description: 'Talk so people listen' },
    { icon: '🏦', name: 'Trust Builder', description: 'Get more freedom' },
    { icon: '⭐', name: "You're Awesome", description: 'Feel good about yourself' },
    { icon: '👥', name: 'Friend Zone', description: 'Handle friend stuff' },
    { icon: '😌', name: 'Chill Out', description: 'Calm down when stressed' },
    { icon: '🤝', name: 'Make a Deal', description: 'Ask for what you want' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-400 via-orange-500 to-red-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">For ages 10-12</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg">
              LEVEL UP!
            </h1>
            <p className="text-xl md:text-2xl mb-2 opacity-90">
              Your Guide to Feeling Good & Getting Along
            </p>
            <p className="text-lg opacity-80 mb-8">
              8 Levels. Cool Skills. You've Got This!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signup"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auth/login"
                className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Sign In
              </Link>
            </div>
            
            <p className="mt-4 text-sm opacity-70">
              7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="h-16 bg-white" style={{
          clipPath: 'ellipse(70% 100% at 50% 100%)',
          marginBottom: '-1px'
        }} />
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Skills That Actually Help
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Based on 15+ years of experience working with young people. Real skills for real life.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            8 Levels to Master
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Complete challenges, earn stars, collect badges
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {levels.map((level, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-4xl mb-3">{level.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{level.name}</h3>
                <p className="text-gray-500 text-sm">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Play Through Levels</h3>
              <p className="text-gray-600">Interactive games, quizzes, and activities that teach real skills</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Complete Missions</h3>
              <p className="text-gray-600">Practice what you learn with real-world challenges</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Level Up!</h3>
              <p className="text-gray-600">Earn stars, badges, and build skills that last a lifetime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Simple Pricing
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Start with a free 7-day trial
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
              <h3 className="font-bold text-gray-800 text-xl mb-2">Monthly</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-gray-800">$9.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" /> All 8 levels
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" /> Progress tracking
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" /> Daily activities
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" /> Cancel anytime
                </li>
              </ul>
              <Link
                href="/auth/signup?plan=monthly"
                className="block w-full bg-gray-800 text-white py-3 rounded-xl font-bold text-center hover:bg-gray-700 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
            
            {/* Yearly */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                SAVE 20%
              </div>
              <h3 className="font-bold text-gray-800 text-xl mb-2">Yearly</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-gray-800">$7.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Billed as $95.99/year</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" /> All 8 levels
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" /> Progress tracking
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" /> Daily activities
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" /> Priority support
                </li>
              </ul>
              <Link
                href="/auth/signup?plan=yearly"
                className="block w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-center hover:bg-orange-600 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Parent CTA */}
      <section className="py-16 px-4 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Parents: Want to Understand Your Tween Better?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Check out Speak Teen: The Parent Program
          </p>
          <Link
            href="/parents"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Level Up!</h3>
              <p className="text-gray-400 text-sm">
                Helping pre-teens build emotional intelligence, communication skills, and resilience.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/parents" className="hover:text-white">For Parents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Level Up! All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
