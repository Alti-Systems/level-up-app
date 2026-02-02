import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, PLANS } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const plan = formData.get('plan') as string
    
    // Get the plan details
    const planDetails = PLANS[plan as keyof typeof PLANS]
    if (!planDetails) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get the current user from Supabase
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Check if user exists in our database, if not create them
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name,
        }
      })
    }

    // Create checkout session
    const session = await createCheckoutSession({
      priceId: planDetails.priceId,
      customerId: dbUser.stripeCustomerId || undefined,
      customerEmail: dbUser.stripeCustomerId ? undefined : user.email!,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
      metadata: {
        userId: user.id,
        plan: plan,
      },
    })

    return NextResponse.redirect(session.url!, { status: 303 })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
