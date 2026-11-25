import type { Metadata } from 'next/types'

import { learnOgImagePath } from '@/utilities/learnMetadata'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { learnTopics } from '@/data/learn-topics'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs()
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default function LearnPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-2xl mx-auto text-center">
          <h1>Learn</h1>
          <p className="text-lg text-muted-foreground">
            Master LaTeX and its powerful packages with our comprehensive guides. 
            Whether you&apos;re writing your first document or creating complex visualizations, 
            we&apos;ve got you covered.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {learnTopics.map((topic) => (
            <div className="col-span-4" key={topic.slug}>
              <Link href={`/learn/${topic.slug}`} className="block h-full">
                <article className="border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer hover:border-primary/50 transition-colors h-full">
                  <div className={`relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br ${topic.color} flex items-center justify-center p-8`}>
                    {topic.image ? (
                      <Image
                        src={topic.image}
                        alt={topic.title}
                        width={200}
                        height={80}
                        className="object-contain max-h-20"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-foreground/70">{topic.title}</span>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <div className="uppercase text-sm mb-4 text-muted-foreground">
                      Tutorial
                    </div>
                    <div className="prose">
                      <h3 className="not-prose font-semibold text-lg">{topic.title}</h3>
                    </div>
                    <div className="mt-2">
                      <p className="text-muted-foreground">{topic.description}</p>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const learnOgImage = {
  url: learnOgImagePath('Learn LaTeX, TikZ & PGFPlots', 'Free Tutorials'),
  width: 1200,
  height: 630,
  alt: 'Learn LaTeX, TikZ & PGFPlots – Free Tutorials',
}

export function generateMetadata(): Metadata {
  return {
    title: 'Learn LaTeX, TikZ & PGFPlots – Free Tutorials',
    description: 'Master LaTeX and its powerful packages with comprehensive tutorials. Learn document typesetting, diagrams with TikZ, and data visualization with PGFPlots. Free beginner-friendly guides.',
    keywords: 'latex online editor, latex resume template, latex cv template, latex math symbols, latex equations, latex matrix, latex fractions, latex table generator, how to write latex, overleaf tutorial, latex beamer presentation, tikz flowchart examples, pgfplots histogram, learn latex, latex tutorial, latex bold, latex italic, latex underline, latex page margins, latex geometry, latex subscript, latex superscript, latex lists, latex itemize, latex enumerate, latex greek letters, latex colors, xcolor latex, latex math expressions, latex integrals, latex sums, latex limits, latex matrices, latex tables, latex booktabs, laplace transform table, laplace table, derivative rules, trig derivatives, inverse trig derivatives',
    openGraph: mergeOpenGraph({
      title: 'Learn LaTeX, TikZ & PGFPlots – Free Tutorials',
      description: 'Master LaTeX and its powerful packages with comprehensive tutorials. Free beginner-friendly guides for document typesetting, diagrams, and data visualization.',
      type: 'website',
      url: '/learn',
      images: [learnOgImage],
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'Learn LaTeX, TikZ & PGFPlots',
      description: 'Free comprehensive tutorials for LaTeX, TikZ diagrams, and PGFPlots data visualization.',
      images: [learnOgImage],
    },
    alternates: {
      canonical: '/learn',
    },
  }
}
