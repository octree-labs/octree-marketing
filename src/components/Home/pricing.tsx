'use client'

import { useState } from 'react'
import { Check, Users } from 'lucide-react'
import { cn } from '@/utilities/ui'
import Compass from '@/components/icons/compass'
import Sparkles from '@/components/icons/sparkles'
import { PrimaryButton } from './primary-button'

export function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true)

  const starterFeatures = [
    '3-day free trial',
    'Unlimited edits',
    'Unlimited documents',
    'Community support',
  ]

  const proFeatures = [
    'AI document generation',
    'Unlimited edits',
    'Unlimited documents',
    'Priority support',
  ]

  const enterpriseFeatures = [
    'Everything in Pro plan',
    'Privately hosted AI model',
    '10+ integrations',
    'Dedicated support',
  ]

  return (
    <div className="py-[34px] md:py-[68px] max-w-[var(--grid-max-width)] mx-auto flex flex-col gap-8 md:gap-12 px-6 md:px-12">
      <div className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Pricing"
          description="Simple, transparent pricing for all your editing needs"
        />

        {/* Weekly/Monthly Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-neutral-100 rounded-full p-1">
            <button
              onClick={() => setIsMonthly(false)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all',
                !isMonthly
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700',
              )}
            >
              Weekly
            </button>
            <button
              onClick={() => setIsMonthly(true)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                isMonthly
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700',
              )}
            >
              Monthly
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                Save 50%
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <PricingCard
          icon={<Compass className="w-4 h-4 md:w-5 md:h-5" />}
          name="Trial"
          description="Try Octree risk-free for 3 days"
          price="Free"
          features={starterFeatures}
          buttonText="Get Started"
          buttonHref="https://github.com/octree-labs/octree"
        />

        <PricingCard
          icon={<Sparkles className="size-4 text-primary" />}
          name="Pro"
          description="Perfect for research teams and power users"
          price={
            <div className="flex items-baseline gap-2">
              <div>
                ${isMonthly ? '2.49' : '4.99'}{' '}
                <span className="text-base md:text-lg font-normal">/ Week</span>
              </div>
              {isMonthly && <span className="text-xs font-normal opacity-70">Billed monthly</span>}
            </div>
          }
          features={proFeatures}
          buttonText="Get Started"
          buttonHref={`https://app.useoctree.com/buy?annual=${isMonthly}`}
          isDark
        />

        <PricingCard
          icon={<Users className="size-4" />}
          name="Enterprise"
          description="For large organizations with custom needs"
          price="Custom"
          features={enterpriseFeatures}
          buttonText="Contact Sales"
          buttonHref="https://cal.com/basilyusuf1709/quick-chat"
        />
      </div>
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
  icon,
  name,
  description,
  price,
  features,
  buttonText,
  buttonHref,
  isDark = false,
}: {
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
      >
        {buttonText}
      </PrimaryButton>
    </div>
  )
}
