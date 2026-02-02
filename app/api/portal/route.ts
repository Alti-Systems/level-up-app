import { NextRequest, NextResponse } from 'next/server'
import { createCustomerPortalSession } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true },
    })

    if (!dbUser?.stripeCustomerId) {
      return NextResponse.redirect(new URL('/?error=no_subscription', request.url))
    }

    const session = await createCustomerPortalSession({
      customerId: dbUser.stripeCustomerId,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    })

    return NextResponse.redirect(session.url, { status: 303 })
  } catch (error: any) {
    console.error('Portal error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
