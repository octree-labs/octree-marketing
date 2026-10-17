import type { Metadata } from 'next/types'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'
import { RelatedPosts } from '@/components/Learn/related-posts'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('Learn PGFPlots', 'pgfplots')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function LearnPgfplotsPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container">
        <div className="mb-8 max-w-4xl mx-auto">
          <Link 
            href="/learn" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Back to Learn
          </Link>
        </div>
        
        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1>Learn PGFPlots</h1>
          <p className="lead">
            PGFPlots is a powerful package for creating publication-quality plots and charts 
            directly in your LaTeX documents.
          </p>

          <h2>What is PGFPlots?</h2>
          <p>
            PGFPlots is built on top of TikZ and provides a high-level interface for 
            creating 2D and 3D plots. It&apos;s widely used in academic papers because it 
            produces consistent, professional-looking visualizations that match your 
            document&apos;s typography.
          </p>

          <h2>Why Use PGFPlots?</h2>
          <ul>
            <li><strong>Publication Quality</strong> – Generate plots that meet journal standards out of the box.</li>
            <li><strong>Consistent Styling</strong> – Fonts and colors match your document automatically.</li>
            <li><strong>Vector Graphics</strong> – Plots scale perfectly at any size.</li>
            <li><strong>Data Integration</strong> – Import data from CSV files or compute functions directly.</li>
            <li><strong>Reproducibility</strong> – Plots are defined in code, not generated externally.</li>
          </ul>

          <h2>Getting Started</h2>
          <pre><code>{`\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}  % Use latest features`}</code></pre>

          <h2>Your First Plot</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{axis}[
    title={Simple Function Plot},
    xlabel={$x$},
    ylabel={$y$},
]
\\addplot[blue, thick, domain=-2:2, samples=100] {x^2};
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Line Plots</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{axis}[
    title={Multiple Functions},
    xlabel={$x$},
    ylabel={$f(x)$},
    legend pos=north west,
    grid=major,
]
\\addplot[blue, thick, domain=0:6] {sin(deg(x))};
\\addplot[red, thick, domain=0:6] {cos(deg(x))};
\\addplot[green!60!black, thick, domain=0:6] {sin(deg(x))*cos(deg(x))};
\\legend{$\\sin(x)$, $\\cos(x)$, $\\sin(x)\\cos(x)$}
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Scatter Plots</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{axis}[
    title={Data Points},
    xlabel={Time (s)},
    ylabel={Value},
    only marks,
]
\\addplot coordinates {
    (0, 0.5)
    (1, 2.1)
    (2, 3.8)
    (3, 6.2)
    (4, 7.9)
    (5, 10.1)
};
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Bar Charts</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{axis}[
    ybar,
    title={Quarterly Sales},
    xlabel={Quarter},
    ylabel={Sales (\\$1000)},
    symbolic x coords={Q1, Q2, Q3, Q4},
    xtick=data,
    nodes near coords,
    bar width=20pt,
]
\\addplot coordinates {(Q1, 45) (Q2, 62) (Q3, 78) (Q4, 91)};
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Grouped Bar Charts</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{axis}[
    ybar,
    title={Product Comparison},
    xlabel={Category},
    ylabel={Score},
    symbolic x coords={Speed, Quality, Price},
    xtick=data,
    legend style={at={(0.5,-0.15)}, anchor=north},
    bar width=15pt,
]
\\addplot coordinates {(Speed, 85) (Quality, 92) (Price, 78)};
\\addplot coordinates {(Speed, 72) (Quality, 88) (Price, 95)};
\\legend{Product A, Product B}
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Importing Data from CSV</h2>
          <pre><code>{`% data.csv:
% x,y
% 0,0
% 1,1
% 2,4
% 3,9

\\begin{tikzpicture}
\\begin{axis}[
    title={Data from CSV},
    xlabel={$x$},
    ylabel={$y$},
]
\\addplot table[col sep=comma]{data.csv};
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Error Bars</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{axis}[
    title={Measurement with Errors},
    xlabel={Sample},
    ylabel={Value},
]
\\addplot+[
    only marks,
    error bars/.cd,
    y dir=both,
    y explicit,
] coordinates {
    (1, 2.5) +- (0, 0.3)
    (2, 3.1) +- (0, 0.4)
    (3, 4.2) +- (0, 0.2)
    (4, 3.8) +- (0, 0.5)
};
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>3D Plots</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{axis}[
    title={3D Surface},
    view={60}{30},
    colormap/viridis,
]
\\addplot3[
    surf,
    domain=-2:2,
    domain y=-2:2,
    samples=30,
] {exp(-x^2-y^2)};
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Logarithmic Axes</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{semilogyaxis}[  % or loglogaxis, semilogxaxis
    title={Exponential Growth},
    xlabel={Time},
    ylabel={Population},
    grid=major,
]
\\addplot[blue, thick, domain=0:10] {exp(x)};
\\end{semilogyaxis}
\\end{tikzpicture}`}</code></pre>

          <h2>Customizing Appearance</h2>
          <pre><code>{`\\begin{tikzpicture}
\\begin{axis}[
    title style={font=\\bfseries\\large},
    xlabel style={font=\\itshape},
    ylabel style={font=\\itshape},
    tick label style={font=\\small},
    legend style={font=\\footnotesize},
    grid=both,
    grid style={line width=.1pt, draw=gray!20},
    major grid style={line width=.2pt, draw=gray!50},
    width=10cm,
    height=7cm,
]
\\addplot[blue, thick] {x^2};
\\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Useful Options Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>domain=a:b</code></td>
                <td>Set x range for functions</td>
              </tr>
              <tr>
                <td><code>samples=n</code></td>
                <td>Number of sample points</td>
              </tr>
              <tr>
                <td><code>grid=major|minor|both</code></td>
                <td>Show grid lines</td>
              </tr>
              <tr>
                <td><code>legend pos=</code></td>
                <td>Legend position</td>
              </tr>
              <tr>
                <td><code>width, height</code></td>
                <td>Plot dimensions</td>
              </tr>
              <tr>
                <td><code>xmin, xmax, ymin, ymax</code></td>
                <td>Axis limits</td>
              </tr>
            </tbody>
          </table>

          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/tikz">Learn TikZ</Link> – Create custom diagrams</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> – Customize colors in your plots</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> – Typeset equations for plot labels</li>
            <li><Link href="/learn/latex">Learn LaTeX Basics</Link> – Review fundamentals</li>
          </ul>

          <h2>Free PGFPlots Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/pgfplots-generator" target="_blank" rel="noopener noreferrer">Pgfplots Generator</Link> – Generate plot code with AI from descriptions</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> – Convert data tables for your plots</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your plots with live preview</li>
          </ul>

          <RelatedPosts searchTerm="PGFPlots" title="Related PGFPlots Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Generate plots with AI</h3>
            <p className="text-muted-foreground mb-4">
              Describe your data visualization and let Octree&apos;s AI generate the PGFPlots code for you.
            </p>
            <Link 
              href="https://app.useoctree.com" 
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Try Octree Free →
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Learn PGFPlots – Create Plots in LaTeX Tutorial 2025',
    description: 'Create publication-quality plots and charts in LaTeX with PGFPlots. Free tutorial covering line plots, bar charts, scatter plots, 3D surfaces, error bars, and CSV data import.',
    keywords: 'pgfplots histogram, pgfplots multiple plots, pgfplots legend, pgfplots from csv, pgfplots axis labels, learn pgfplots, pgfplots tutorial, pgfplots examples, latex plots, latex graphs, latex charts, pgfplots bar chart, pgfplots scatter plot, pgfplots 3d, latex data visualization',
    openGraph: mergeOpenGraph({
      title: 'Learn PGFPlots – Create Plots in LaTeX Tutorial 2025',
      description: 'Create publication-quality plots and charts in LaTeX with PGFPlots. Free comprehensive tutorial.',
      type: 'article',
      url: '/learn/pgfplots',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'Learn PGFPlots – Create Plots in LaTeX',
      description: 'Free PGFPlots tutorial. Create publication-quality data visualizations in LaTeX.',
    },
    alternates: {
      canonical: '/learn/pgfplots',
    },
  }
}

