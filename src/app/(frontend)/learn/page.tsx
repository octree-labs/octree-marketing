import type { Metadata } from 'next/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs()
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const learnTopics = [
  {
    slug: 'latex',
    title: 'Learn LaTeX',
    description: 'Master the fundamentals of LaTeX for professional document typesetting. From basic syntax to advanced formatting techniques.',
    image: '/logos/LaTeX_logo.svg.png',
    color: 'from-blue-500/10 to-blue-600/5',
  },
  {
    slug: 'tikz',
    title: 'Learn TikZ',
    description: 'Create stunning diagrams, graphs, and illustrations directly in your LaTeX documents with the powerful TikZ package.',
    image: '/logos/tikz.webp',
    color: 'from-purple-500/10 to-purple-600/5',
  },
  {
    slug: 'pgfplots',
    title: 'Learn PGFPlots',
    description: 'Generate publication-quality plots and charts for scientific papers. Perfect for data visualization in academic documents.',
    image: '/logos/PGF.png',
    color: 'from-green-500/10 to-green-600/5',
  },
  {
    slug: 'bold-italics-underline',
    title: 'Bold, Italics & Underline',
    description: 'Master text formatting in LaTeX with bold, italic, underline commands and advanced packages like soul and ulem.',
    color: 'from-rose-500/10 to-rose-600/5',
  },
  {
    slug: 'page-size-margins',
    title: 'Page Size & Margins',
    description: 'Control page layout in LaTeX with the geometry package. Set paper size, margins, headers, and landscape mode.',
    color: 'from-amber-500/10 to-amber-600/5',
  },
  {
    slug: 'subscripts-superscripts',
    title: 'Subscripts & Superscripts',
    description: 'Write subscripts and superscripts in LaTeX for math, chemistry, and scientific notation with practical examples.',
    color: 'from-cyan-500/10 to-cyan-600/5',
  },
  {
    slug: 'lists',
    title: 'LaTeX Lists',
    description: 'Create bulleted, numbered, and description lists in LaTeX. Customize bullets, numbering, and spacing with enumitem.',
    color: 'from-teal-500/10 to-teal-600/5',
  },
  {
    slug: 'greek-letters-math-symbols',
    title: 'Greek Letters & Math Symbols',
    description: 'Complete reference for Greek letters and math symbols in LaTeX. Find every symbol with copy-paste commands.',
    color: 'from-indigo-500/10 to-indigo-600/5',
  },
  {
    slug: 'colors',
    title: 'Using Colors in LaTeX',
    description: 'Add colors to your LaTeX documents with the xcolor package. Text color, backgrounds, custom colors, and color mixing.',
    color: 'from-pink-500/10 to-pink-600/5',
  },
  {
    slug: 'mathematical-expressions',
    title: 'Mathematical Expressions',
    description: 'Write fractions, roots, aligned equations, and more in LaTeX. Complete guide to math typesetting with amsmath.',
    color: 'from-violet-500/10 to-violet-600/5',
  },
  {
    slug: 'integrals-sums-limits',
    title: 'Integrals, Sums & Limits',
    description: 'Typeset integrals, summations, products, and limits in LaTeX. From basic notation to advanced series and big operators.',
    color: 'from-orange-500/10 to-orange-600/5',
  },
  {
    slug: 'matrices',
    title: 'Matrices in LaTeX',
    description: 'Create matrices, determinants, and augmented matrices in LaTeX with amsmath. All matrix types with practical examples.',
    color: 'from-emerald-500/10 to-emerald-600/5',
  },
  {
    slug: 'tables',
    title: 'LaTeX Tables',
    description: 'Create professional tables in LaTeX with booktabs, multicolumn, multirow, longtable, and colored table formatting.',
    color: 'from-sky-500/10 to-sky-600/5',
  },
  {
    slug: 'footnotes',
    title: 'LaTeX Footnotes',
    description: 'Add footnotes in LaTeX with \\footnote, put footnotes in tables and captions, use symbols instead of numbers, and style them with footmisc.',
    color: 'from-lime-500/10 to-lime-600/5',
  },
  {
    slug: 'greek-alphabet',
    title: 'The Greek Alphabet',
    description: 'All 24 Greek letters in order with uppercase, lowercase, pronunciation, Unicode, math and science uses, and LaTeX commands.',
    color: 'from-red-500/10 to-red-600/5',
  },
  {
    slug: 'apa-title-page',
    title: 'APA Title Page Format',
    description: 'APA 7 student and professional title pages: exact elements, formatting rules, worked examples, and the apa7 LaTeX class.',
    color: 'from-fuchsia-500/10 to-fuchsia-600/5',
  },
]

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

export function generateMetadata(): Metadata {
  return {
    title: 'Learn LaTeX, TikZ & PGFPlots – Free Tutorials',
    description: 'Master LaTeX and its powerful packages with comprehensive tutorials. Learn document typesetting, diagrams with TikZ, and data visualization with PGFPlots. Free beginner-friendly guides.',
    keywords: 'latex online editor, latex resume template, latex cv template, latex math symbols, latex equations, latex matrix, latex fractions, latex table generator, how to write latex, overleaf tutorial, latex beamer presentation, tikz flowchart examples, pgfplots histogram, learn latex, latex tutorial, latex bold, latex italic, latex underline, latex page margins, latex geometry, latex subscript, latex superscript, latex lists, latex itemize, latex enumerate, latex greek letters, latex colors, xcolor latex, latex math expressions, latex integrals, latex sums, latex limits, latex matrices, latex tables, latex booktabs',
    openGraph: {
      title: 'Learn LaTeX, TikZ & PGFPlots – Free Tutorials',
      description: 'Master LaTeX and its powerful packages with comprehensive tutorials. Free beginner-friendly guides for document typesetting, diagrams, and data visualization.',
      type: 'website',
      url: '/learn',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Learn LaTeX, TikZ & PGFPlots',
      description: 'Free comprehensive tutorials for LaTeX, TikZ diagrams, and PGFPlots data visualization.',
    },
    alternates: {
      canonical: '/learn',
    },
  }
}

