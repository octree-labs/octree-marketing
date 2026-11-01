import Image from 'next/image'
import { FileText, Users } from 'lucide-react'
import { cn } from '@/utilities/ui'
import Sparkles from '@/components/icons/sparkles'

function FeatureVisual({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'w-full h-[250px] md:h-[300px] rounded-2xl md:rounded-3xl border border-neutral-100 flex flex-col items-center justify-center relative',
        className,
      )}
      style={{
        backgroundImage: "url('/images/bg-grid-pattern.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  )
}

function FeatureDescription({
  title,
  description,
}: {
  title: string
  description: string | React.ReactNode
}) {
  return (
    <div className="flex flex-col text-left gap-2 md:gap-3 tracking-tight">
      <h3 className="text-xl md:text-2xl font-medium">{title}</h3>
      <p className="text-base md:text-[18px] leading-tight">{description}</p>
    </div>
  )
}

function FeatureCard({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex flex-col gap-6 md:gap-8">{children}</div>
}

export function Features() {
  return (
    <div className="py-[34px] md:py-[68px] max-w-[var(--grid-max-width)] mx-auto flex flex-col gap-[37px] md:gap-[74px] px-6 md:px-12">
      <p className="text-primary text-lg md:text-xl tracking-[-0.04] text-center">Features</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <FeatureCard>
          <FeatureVisual className="gap-1">
            <div className="bg-white border border-black/10 flex gap-1.5 items-center py-1.5 px-3 rounded-full font-medium text-sm md:text-base">
              <Sparkles className="text-primary w-4 h-4 md:w-5 md:h-5" />
              Edit
            </div>
            <div className="relative">
              <div className="absolute top-0 right-0 w-[120px] md:w-[162px] h-full bg-primary/20" />
              <code className="font-mono text-sm md:text-base">{`\\textbf{Some LaTeX Code}`}</code>
            </div>
          </FeatureVisual>

          <FeatureDescription
            title="AI-Powered Assistance"
            description="Get intelligent suggestions and autocompletions as you write your LaTeX documents."
          />
        </FeatureCard>

        <FeatureCard>
          <FeatureVisual>
            <div className="relative">
              <div className="absolute top-0 -translate-y-6 md:-translate-y-8 left-0 -translate-x-2 md:-translate-x-4 bg-white border border-black/10 flex gap-1.5 items-center py-1.5 px-3 rounded-full font-medium text-sm md:text-base">
                <FileText className="text-primary w-4 h-4 md:w-5 md:h-5" />
                Preview
              </div>
              <Image
                src="/images/formula.png"
                alt="Binomial Theorem"
                width={200}
                height={88}
                className="border border-black/10 rounded-lg md:w-[256px] md:h-[113px]"
              />
            </div>
          </FeatureVisual>

          <FeatureDescription
            title="PDF Preview"
            description="See your changes instantly with our built-in PDF preview feature."
          />
        </FeatureCard>

        <FeatureCard>
          <FeatureVisual>
            <span className="absolute top-3 right-3 md:top-4 md:right-4 bg-primary text-white px-2 py-1 rounded-lg border-[1.5px] border-blue-700/20 text-xs md:text-sm">
              Coming Soon
            </span>
            <div className="flex items-center gap-2">
              <Users className="size-6 md:size-7" />
              <p className="font-medium text-xl tracking-tight">Collaborators</p>
            </div>
          </FeatureVisual>

          <FeatureDescription
            title="Real-time Collaboration"
            description="Work together with your team in real-time, with instant updates and version control."
          />
        </FeatureCard>
      </div>
    </div>
  )
}
