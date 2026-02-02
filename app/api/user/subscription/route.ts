import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscriptionStatus: true,
        subscriptionPlan: true,
        subscriptionEndDate: true,
      },
    })

    if (!user) {
      return NextResponse.json({ isActive: false })
    }

    const isActive = user.subscriptionStatus === 'ACTIVE' || user.subscriptionStatus === 'TRIALING'

    return NextResponse.json({
      isActive,
      status: user.subscriptionStatus,
      plan: user.subscriptionPlan,
      endDate: user.subscriptionEndDate,
    })
  } catch (error: any) {
    console.error('Subscription check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
