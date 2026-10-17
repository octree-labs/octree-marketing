import type { Metadata } from 'next'

import { GridSection, HatchGround, hatchStyle } from '@/components/grid'
import { cn } from '@/utilities/ui'

export const metadata: Metadata = {
  // The root layout template appends " | Octree"; keep the brand out of the page title.
  title: 'About',
  description:
    'Octree is the AI-native home for technical writing, bringing your entire LaTeX workflow into one fast, intelligent editor.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Octree',
    description:
      'Octree is the AI-native home for technical writing, bringing your entire LaTeX workflow into one fast, intelligent editor.',
    url: '/about',
    type: 'website',
  },
}

// NOTE: stats below are placeholders — adjust the numbers/labels to real figures.
const stats = [
  { value: '+280', label: 'Stars on GitHub' },
  { value: '+50K', label: 'Documents compiled' },
  { value: '10×', label: 'Faster from draft to PDF' },
  { value: '100%', label: 'Browser-based, zero setup' },
]

export default function AboutPage() {
  return (
    <HatchGround>
      <GridSection first last className="px-6 py-16 md:px-12 md:py-24">
        <div className="space-y-8 md:space-y-16">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h1 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Octree is the AI-native home for technical writing.
            </h1>
            <p className="text-lg text-muted-foreground">
              From the first equation to the final, submission-ready PDF, Octree brings your LaTeX
              workflow into one fast, intelligent editor, so you can focus on the ideas instead of
              the syntax.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                We started Octree because writing in LaTeX still felt stuck in the past: brittle
                toolchains, cryptic compile errors, and editors that fight you instead of helping.
                Researchers, students, and engineers deserve{' '}
                <span className="font-medium text-foreground">
                  tools that keep up with their thinking.
                </span>
              </p>
              <p className="text-muted-foreground">
                Today, Octree pairs a powerful in-browser LaTeX engine with an AI collaborator that
                understands your document. It drafts, fixes, and refines alongside you, turning
                hours of formatting into minutes so you can ship better work, sooner.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-5 border border-neutral-300 dark:border-neutral-700 sm:gap-6"
              style={hatchStyle}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    'space-y-2 border-dashed border-neutral-300 bg-background p-5 dark:border-neutral-700 sm:p-6',
                    i % 2 === 0 ? 'border-r' : 'border-l',
                    i < 2 ? 'border-b' : 'border-t',
                  )}
                >
                  <div className="text-4xl font-medium lg:text-5xl">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GridSection>
    </HatchGround>
  )
}
