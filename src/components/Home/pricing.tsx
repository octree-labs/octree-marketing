'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, GraduationCap, Users, Zap } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { BEFORE_NAVIGATION, EVENTS, track } from '@/lib/analytics'
import Compass from '@/components/icons/compass'
import Sparkles from '@/components/icons/sparkles'
import { PrimaryButton } from './primary-button'

const APP_URL = 'https://app.useoctree.com'

/** Keep in sync with data/constants.ts (PRO_PLANS, CREDIT_PACKS) in the app. */
const PLANS = {
  monthly: { price: '9.99', per: '/ month', note: 'Billed monthly · cancel anytime' },
  annual: { price: '79', per: '/ year', note: '$6.58/mo · save 34% · cancel anytime' },
} as const

/** Fires pricing_viewed once per page load, when at least half of the section is visible. */
function usePricingViewed(ref: React.RefObject<HTMLElement | null>, section: string) {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    let seen = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (seen || !entries.some((entry) => entry.isIntersecting)) return
        seen = true
        observer.disconnect()
        track(EVENTS.PRICING_VIEWED, { section })
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, section])
}

/** "https://app.useoctree.com/buy?plan=annual" -> "/buy?plan=annual"; never the origin. */
function pathOf(href: string): string {
  try {
    const url = new URL(href, 'https://www.useoctree.com')
    return url.pathname + url.search
  } catch {
    return href
  }
}

/** Plan links navigate away: send the event instantly, never await it. */
function trackPlanClick(plan: string, cta: string, href: string) {
  track(EVENTS.PRICING_PLAN_CLICKED, { plan, cta, href: pathOf(href) }, BEFORE_NAVIGATION)
}

export function Pricing({ section = 'home' }: { section?: string }) {
  const [isAnnual, setIsAnnual] = useState(false)
  const plan = isAnnual ? PLANS.annual : PLANS.monthly
  const sectionRef = useRef<HTMLDivElement>(null)
  usePricingViewed(sectionRef, section)

  const starterFeatures = [
    '5 AI edits per day',
    'Unlimited projects and files',
    'Fast PDF preview',
    'Community support',
  ]

  const proFeatures = [
    '500 AI edits per month',
    'AI document generation',
    'Export as PDF or ZIP',
    'Unlimited projects and files',
    'Priority support',
  ]

  const enterpriseFeatures = [
    'Everything in Pro plan',
    'Privately hosted AI model',
    '10+ integrations',
    'Dedicated support',
  ]

  return (
    <div
      ref={sectionRef}
      className="py-[34px] md:py-[68px] max-w-[var(--grid-max-width)] mx-auto flex flex-col gap-8 md:gap-12 px-6 md:px-12"
    >
      <div className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Pricing"
          description="Simple, transparent pricing for all your editing needs"
        />

        {/* Monthly/Annual Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-neutral-100 rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all',
                !isAnnual
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700',
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                isAnnual
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700',
              )}
            >
              Annual
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                Save 34%
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <PricingCard
          icon={<Compass className="w-4 h-4 md:w-5 md:h-5" />}
          plan="free"
          name="Free"
          description="Everything you need to start writing in LaTeX"
          price="$0"
          features={starterFeatures}
          buttonText="Get Started"
          buttonHref={`${APP_URL}/auth/sign-up`}
        />

        <PricingCard
          icon={<Sparkles className="size-4 text-primary" />}
          plan={isAnnual ? 'annual' : 'monthly'}
          name="Pro"
          description="Perfect for research teams and power users"
          price={
            <div className="flex flex-col gap-1">
              <div>
                ${plan.price}{' '}
                <span className="text-base md:text-lg font-normal">{plan.per}</span>
              </div>
              <span className="text-xs font-normal opacity-70">{plan.note}</span>
            </div>
          }
          features={proFeatures}
          buttonText="Get Started"
          buttonHref={`${APP_URL}/buy?plan=${isAnnual ? 'annual' : 'monthly'}`}
          isDark
        />

        <PricingCard
          icon={<Users className="size-4" />}
          plan="enterprise"
          name="Enterprise"
          description="For large organizations with custom needs"
          price="Custom"
          features={enterpriseFeatures}
          buttonText="Contact Sales"
          buttonHref="https://cal.com/basilyusuf1709/quick-chat"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <OfferRow
          plan="semester"
          icon={<GraduationCap className="size-5" />}
          title="Semester pass · $29 for 4 months"
          description="Students: all of Pro for the term, billed once every 4 months. Cancel anytime."
          href={`${APP_URL}/buy?plan=semester`}
          cta="Get the Semester pass"
        />
        <OfferRow
          plan="credits_100"
          icon={<Zap className="size-5" />}
          title="100 AI edits · $5"
          description="Out of edits? Buy a pack on any plan. Credits never expire and are used after your plan's edits."
          href={`${APP_URL}/buy?plan=credits_100`}
          cta="Buy edits"
        />
      </div>
    </div>
  )
}

function OfferRow({
  plan,
  icon,
  title,
  description,
  href,
  cta,
}: {
  plan: string
  icon: React.ReactNode
  title: string
  description: string
  href: string
  cta: string
}) {
  return (
    <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 border-2 border-neutral-100 rounded-2xl md:rounded-3xl shadow-sm">
      <div className="size-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <p className="text-base md:text-lg font-medium">{title}</p>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
      <a
        href={href}
        className="text-sm font-medium text-primary whitespace-nowrap hover:underline"
        data-location="pricing"
        onClick={() => trackPlanClick(plan, cta, href)}
      >
        {cta} →
      </a>
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-4 md:gap-5 max-w-[675px] mx-auto">
      <h3 className="text-primary text-lg md:text-xl tracking-[-0.04] text-center font-heading">
        {title}
      </h3>
      <p className="text-center tracking-tight text-2xl md:text-3xl lg:text-4xl font-heading">
        {description}
      </p>
    </div>
  )
}

function FeatureItem({ text, isDark = false }: { text: string; isDark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'size-5 rounded-[7px] flex items-center justify-center',
          isDark ? 'bg-white' : 'bg-primary',
        )}
      >
        <Check className={cn('size-3.5', isDark ? 'text-black' : 'text-white')} />
      </div>
      <p className={cn('text-base font-medium', isDark && 'text-white')}>{text}</p>
    </div>
  )
}

function PricingCard({
  plan,
  icon,
  name,
  description,
  price,
  features,
  buttonText,
  buttonHref,
  isDark = false,
}: {
  plan: string
  icon: React.ReactNode
  name: string
  description: string
  price: React.ReactNode
  features: string[]
  buttonText: string
  buttonHref?: string
  isDark?: boolean
}) {
  return (
    <div
      className={cn(
        'p-5 md:p-7 flex flex-col gap-6 md:gap-8 border-2 rounded-2xl md:rounded-3xl shadow-sm',
        isDark ? 'bg-primary border-neutral-100' : 'border-neutral-100',
      )}
    >
      <div className="flex flex-col gap-4 md:gap-6">
        <span
          className={cn(
            'flex items-center gap-1.5 py-2 pl-2.5 pr-3 rounded-full w-fit font-medium text-sm md:text-base',
            isDark ? 'bg-white text-black' : 'bg-primary text-white',
          )}
        >
          {icon}
          {name}
        </span>

        <p className={cn('text-base md:text-lg', isDark && 'text-white')}>{description}</p>

        <div className={cn('text-2xl md:text-3xl font-medium', isDark && 'text-white')}>
          {price}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {features.map((feature) => (
          <FeatureItem key={feature} text={feature} isDark={isDark} />
        ))}
      </div>

      <PrimaryButton
        className={isDark ? 'from-white to-white text-black' : undefined}
        href={buttonHref}
        location="pricing"
        onClick={() => trackPlanClick(plan, buttonText, buttonHref ?? APP_URL)}
      >
        {buttonText}
      </PrimaryButton>
    </div>
  )
}
