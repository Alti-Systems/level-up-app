import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const plan = session.metadata?.plan

        if (userId && session.subscription) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              stripeCustomerId: session.customer as string,
              subscriptionId: session.subscription as string,
              subscriptionStatus: 'ACTIVE',
              subscriptionPlan: plan as any,
            },
          })

          // Create initial progress record if it doesn't exist
          await prisma.userProgress.upsert({
            where: { userId },
            create: { userId },
            update: {},
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        })

        if (user) {
          let status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'TRIALING' | 'INACTIVE' = 'INACTIVE'
          
          switch (subscription.status) {
            case 'active':
              status = 'ACTIVE'
              break
            case 'past_due':
              status = 'PAST_DUE'
              break
            case 'canceled':
              status = 'CANCELLED'
              break
            case 'trialing':
              status = 'TRIALING'
              break
          }

          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: status,
              subscriptionEndDate: new Date(subscription.current_period_end * 1000),
            },
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: subscription.customer as string },
        })

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: 'CANCELLED',
              subscriptionId: null,
            },
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: invoice.customer as string },
        })

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: 'PAST_DUE',
            },
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
