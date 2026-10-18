import { ChevronRight, Ellipsis } from 'lucide-react'
import { OctreeLogo } from '@/components/icons/octree'
import Link from 'next/link'
import { SectionHeader } from '../section-header'

function StepContent({
  stepNumber,
  title,
  description,
}: {
  stepNumber: number
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3 md:gap-4 flex-1">
      <div className="flex flex-col gap-2 md:gap-3">
        <p className="text-primary text-base md:text-lg">Step {stepNumber}</p>
        <h3 className="text-2xl md:text-3xl font-medium">{title}</h3>
      </div>
      <p className="text-base md:text-lg">{description}</p>
    </div>
  )
}

function StepDemo({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full min-h-[250px] md:min-h-[320px] bg-primary rounded-2xl md:rounded-3xl relative flex-1 flex items-center justify-center"
      style={{
        backgroundImage: "url('/api/media/file/bg-grid-light.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  )
}

function Step({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col md:flex-row gap-6 md:gap-10">{children}</div>
}

export function HowItWorks() {
  return (
    <div className="py-[34px] md:py-[68px] max-w-[var(--grid-max-width)] mx-auto flex flex-col gap-[37px] md:gap-[74px] px-6 md:px-12">
      <SectionHeader
        title="How it works"
        description="Seamlessly transform your academic writing experience"
      />

      <Step>
        <StepContent
          stepNumber={1}
          title="Create account"
          description="Create your account and import existing documents in minutes."
        />
        <StepDemo>
          <Link
            href="https://app.useoctree.com/auth/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="how_it_works"
            className="rounded-xl px-4 py-2 md:px-5 md:py-2.5 shadow-sm flex items-center justify-center bg-white w-fit cursor-pointer text-sm md:text-base hover:shadow-md transition-shadow"
          >
            Create Account
          </Link>
        </StepDemo>
      </Step>

      <Step>
        <StepContent
          stepNumber={2}
          title="Write and edit"
          description="Use AI assistance to write faster and better LaTeX documents for all types of use cases."
        />
        <StepDemo>
          <div className="rounded-2xl md:rounded-3xl shadow-sm bg-white w-[280px] md:w-[300px]">
            <div className="flex p-2 md:p-3 justify-between border-b border-neutral-100">
              <div className="flex items-center gap-1 text-sm md:text-base">
                <span className="bg-primary rounded-full p-0.5">
                  <OctreeLogo className="size-5 md:size-6" />
                </span>
                Octra
              </div>

              <div className="rounded-full bg-blue-50 p-1">
                <Ellipsis className="text-primary size-4 md:size-5" />
              </div>
            </div>

            <div className="py-8 md:py-12 flex items-center justify-center text-xs md:text-sm text-center text-neutral-500">
              Ask about LaTeX
              <br /> or select text & press ⌘B to improve.
            </div>

            <div className="flex justify-between items-center p-3 md:p-4">
              <p className="text-xs md:text-sm text-neutral-700">Prompt to edit your text...</p>
              <div className="bg-blue-50 rounded-full p-1">
                <ChevronRight className="text-primary size-3 md:size-3.5" />
              </div>
            </div>
          </div>
        </StepDemo>
      </Step>

      <Step>
        <StepContent
          stepNumber={3}
          title="Export and share"
          description="Download your documents as PDF or share with others for collaboration."
        />
        <StepDemo>
          <div className="rounded-lg md:rounded-xl px-4 py-2 md:px-5 md:py-2.5 shadow-sm flex gap-4 md:gap-6 items-center justify-center bg-white w-fit cursor-pointer text-sm md:text-base">
            <span>Compile</span>
            <span>Export</span>
          </div>
        </StepDemo>
      </Step>
    </div>
  )
}
