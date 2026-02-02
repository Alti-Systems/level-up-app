import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const PLANS = {
  CHILD_MONTHLY: {
    id: 'child_monthly',
    name: 'Level Up! (Monthly)',
    description: 'Full access to the Level Up! program for kids',
    priceId: process.env.STRIPE_PRICE_CHILD_MONTHLY!,
    price: 9.99,
    interval: 'month' as const,
  },
  CHILD_YEARLY: {
    id: 'child_yearly',
    name: 'Level Up! (Yearly)',
    description: 'Full access to the Level Up! program for kids - Save 20%!',
    priceId: process.env.STRIPE_PRICE_CHILD_YEARLY!,
    price: 95.99,
    interval: 'year' as const,
  },
  PARENT_MONTHLY: {
    id: 'parent_monthly',
    name: 'Speak Teen: Parent Program (Monthly)',
    description: 'Full access to the parent program',
    priceId: process.env.STRIPE_PRICE_PARENT_MONTHLY!,
    price: 14.99,
    interval: 'month' as const,
  },
  PARENT_YEARLY: {
    id: 'parent_yearly',
    name: 'Speak Teen: Parent Program (Yearly)',
    description: 'Full access to the parent program - Save 20%!',
    priceId: process.env.STRIPE_PRICE_PARENT_YEARLY!,
    price: 143.99,
    interval: 'year' as const,
  },
  BUNDLE_MONTHLY: {
    id: 'bundle_monthly',
    name: 'Family Bundle (Monthly)',
    description: 'Both programs for the whole family - Save 25%!',
    priceId: process.env.STRIPE_PRICE_BUNDLE_MONTHLY!,
    price: 18.99,
    interval: 'month' as const,
  },
  BUNDLE_YEARLY: {
    id: 'bundle_yearly',
    name: 'Family Bundle (Yearly)',
    description: 'Both programs for the whole family - Best Value!',
    priceId: process.env.STRIPE_PRICE_BUNDLE_YEARLY!,
    price: 179.99,
    interval: 'year' as const,
  },
}

export type PlanKey = keyof typeof PLANS

export async function createCheckoutSession({
  priceId,
  customerId,
  customerEmail,
  successUrl,
  cancelUrl,
  metadata,
}: {
  priceId: string
  customerId?: string
  customerEmail?: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    ...(customerId ? { customer: customerId } : { customer_email: customerEmail }),
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    subscription_data: {
      metadata,
    },
    allow_promotion_codes: true,
  })

  return session
}

export async function createCustomerPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}

export async function getSubscription(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId)
}

export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId)
}
