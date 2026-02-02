import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import prisma from '@/lib/prisma'

// GET - Fetch user progress
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const progress = await prisma.userProgress.findUnique({
      where: { userId: user.id },
    })

    if (!progress) {
      // Create default progress
      const newProgress = await prisma.userProgress.create({
        data: { userId: user.id },
      })
      return NextResponse.json(newProgress)
    }

    return NextResponse.json(progress)
  } catch (error: any) {
    console.error('Progress fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Update user progress
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      totalStars,
      currentStreak,
      longestStreak,
      lastActiveDate,
      completedLevels,
      earnedBadges,
      levelProgress,
      calmDownKit,
      myQualities,
    } = body

    const progress = await prisma.userProgress.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        totalStars: totalStars || 0,
        currentStreak: currentStreak || 0,
        longestStreak: longestStreak || 0,
        lastActiveDate: lastActiveDate ? new Date(lastActiveDate) : null,
        completedLevels: completedLevels || [],
        earnedBadges: earnedBadges || [],
        levelProgress: levelProgress || {},
        calmDownKit: calmDownKit || {},
        myQualities: myQualities || [],
      },
      update: {
        ...(totalStars !== undefined && { totalStars }),
        ...(currentStreak !== undefined && { currentStreak }),
        ...(longestStreak !== undefined && { longestStreak }),
        ...(lastActiveDate !== undefined && { lastActiveDate: new Date(lastActiveDate) }),
        ...(completedLevels !== undefined && { completedLevels }),
        ...(earnedBadges !== undefined && { earnedBadges }),
        ...(levelProgress !== undefined && { levelProgress }),
        ...(calmDownKit !== undefined && { calmDownKit }),
        ...(myQualities !== undefined && { myQualities }),
      },
    })

    return NextResponse.json(progress)
  } catch (error: any) {
    console.error('Progress update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
