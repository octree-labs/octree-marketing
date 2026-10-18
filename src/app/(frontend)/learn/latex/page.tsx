import type { Metadata } from 'next/types'

import { learnMetadata } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'
import { RelatedPosts } from '@/components/Learn/related-posts'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('Learn LaTeX', 'latex')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'latex',
  title: 'Learn LaTeX – Complete Beginner Tutorial 2025',
  description: 'Master LaTeX from scratch with this free comprehensive guide. Learn document structure, text formatting, mathematical equations, figures, tables, citations, and bibliography management.',
  keywords: 'latex matrix, latex table generator, latex fractions, latex summation, latex math symbols, latex integral, latex greek letters, latex equations, latex subfigures, how to write latex, latex bibliography, latex figure placement, latex align equations, overleaf tutorial, latex beamer presentation, latex book template, latex poster template, latex resume template, latex cv template, latex thesis template, latex report template, latex letter template, latex booktabs, latex multicolumn table, latex vs word, bibtex tutorial, latex apa citation, latex for thesis, latex for research papers',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

export default async function LearnLatexPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LearnSchema
        slug={page.slug}
        title={page.title}
        description={page.description}
        dateModified={LAST_UPDATED}
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
          <h1>Learn LaTeX</h1>
          <p className="lead">
            LaTeX is the gold standard for academic and scientific document preparation. 
            This guide will take you from complete beginner to confident LaTeX user.
          </p>

          <h2>What is LaTeX?</h2>
          <p>
            LaTeX (pronounced &quot;LAY-tek&quot; or &quot;LAH-tek&quot;) is a document preparation system 
            widely used in academia, especially for scientific and technical documents. Unlike word 
            processors like Microsoft Word, LaTeX separates content from formatting, allowing you to 
            focus on what you&apos;re writing while the system handles how it looks.
          </p>

          <h2>Why Use LaTeX?</h2>
          <ul>
            <li><strong>Beautiful Typography</strong> – LaTeX produces professionally typeset documents with superior handling of mathematical equations, tables, and figures.</li>
            <li><strong>Consistency</strong> – Document styling is consistent throughout, managed by templates and style files.</li>
            <li><strong>Cross-references</strong> – Automatic numbering of sections, figures, tables, and equations with easy cross-referencing.</li>
            <li><strong>Bibliography Management</strong> – Seamless integration with BibTeX for managing citations and references.</li>
            <li><strong>Version Control Friendly</strong> – Plain text files work perfectly with Git and other version control systems.</li>
          </ul>

          <h2>Your First LaTeX Document</h2>
          <p>Every LaTeX document follows a basic structure:</p>
          
          <pre><code>{`\\documentclass{article}

\\title{My First Document}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
Hello, LaTeX! This is my first document.

\\section{Mathematics}
Here's an equation: $E = mc^2$

And a displayed equation:
\\[
  \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
\\]

\\end{document}`}</code></pre>

          <h2>Document Classes</h2>
          <p>LaTeX provides several document classes for different purposes:</p>
          <ul>
            <li><code>article</code> – For short documents, journal articles, and reports</li>
            <li><code>report</code> – For longer documents with chapters</li>
            <li><code>book</code> – For books with front matter, chapters, and back matter</li>
            <li><code>beamer</code> – For presentations and slides</li>
            <li><code>letter</code> – For formal letters</li>
          </ul>

          <h2>Essential Packages</h2>
          <p>Packages extend LaTeX&apos;s functionality. Here are some must-haves:</p>
          
          <pre><code>{`\\usepackage{amsmath}    % Advanced math formatting
\\usepackage{graphicx}   % Include images
\\usepackage{hyperref}   % Clickable links
\\usepackage{geometry}   % Page margins
\\usepackage{listings}   % Code listings
\\usepackage{booktabs}   % Professional tables`}</code></pre>

          <h2>Text Formatting</h2>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\textbf&#123;bold&#125;</code></td>
                <td><strong>bold</strong></td>
              </tr>
              <tr>
                <td><code>\textit&#123;italic&#125;</code></td>
                <td><em>italic</em></td>
              </tr>
              <tr>
                <td><code>\underline&#123;underline&#125;</code></td>
                <td><u>underline</u></td>
              </tr>
              <tr>
                <td><code>\texttt&#123;monospace&#125;</code></td>
                <td><code>monospace</code></td>
              </tr>
            </tbody>
          </table>

          <h2>Lists</h2>
          <p>Create bulleted and numbered lists:</p>
          
          <pre><code>{`% Bulleted list
\\begin{itemize}
  \\item First item
  \\item Second item
  \\item Third item
\\end{itemize}

% Numbered list
\\begin{enumerate}
  \\item First item
  \\item Second item
  \\item Third item
\\end{enumerate}`}</code></pre>

          <h2>Mathematical Expressions</h2>
          <p>LaTeX excels at typesetting mathematics:</p>
          
          <pre><code>{`% Inline math
The equation $a^2 + b^2 = c^2$ is Pythagoras' theorem.

% Display math
\\[
  \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
\\]

% Aligned equations
\\begin{align}
  f(x) &= x^2 + 2x + 1 \\\\
       &= (x + 1)^2
\\end{align}`}</code></pre>

          <h2>Figures and Images</h2>
          <pre><code>{`\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=0.8\\textwidth]{image.png}
  \\caption{A descriptive caption}
  \\label{fig:example}
\\end{figure}

% Reference: See Figure~\\ref{fig:example}`}</code></pre>

          <h2>Tables</h2>
          <pre><code>{`\\begin{table}[htbp]
  \\centering
  \\begin{tabular}{lcc}
    \\toprule
    Name & Score & Grade \\\\
    \\midrule
    Alice & 95 & A \\\\
    Bob & 87 & B \\\\
    Charlie & 92 & A \\\\
    \\bottomrule
  \\end{tabular}
  \\caption{Student grades}
  \\label{tab:grades}
\\end{table}`}</code></pre>

          <h2>Citations and Bibliography</h2>
          <pre><code>{`% In your .bib file:
@article{einstein1905,
  author = {Einstein, Albert},
  title = {On the Electrodynamics of Moving Bodies},
  journal = {Annalen der Physik},
  year = {1905},
  volume = {17},
  pages = {891--921}
}

% In your document:
As shown by Einstein~\\cite{einstein1905}...

\\bibliographystyle{plain}
\\bibliography{references}`}</code></pre>

          <h2>Next Steps</h2>
          <p>Now that you understand the basics, explore more advanced topics:</p>
          <ul>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> – Master text formatting commands</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> – Control your document layout</li>
            <li><Link href="/learn/lists">LaTeX Lists</Link> – Create bulleted and numbered lists</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> – Build professional tables</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> – Add clickable links with hyperref</li>
            <li><Link href="/learn/comments">LaTeX Comments</Link> – Comment out lines and blocks, add todo notes</li>
            <li><Link href="/learn/colors">Using Colors</Link> – Add color to your documents</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> – Write equations and formulas</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Symbols</Link> – Complete symbol reference</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts &amp; Superscripts</Link> – Math and scientific notation</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums &amp; Limits</Link> – Calculus notation</li>
            <li><Link href="/learn/matrices">Matrices</Link> – Linear algebra notation</li>
            <li><Link href="/learn/tikz">Learn TikZ</Link> – Create diagrams and graphics</li>
            <li><Link href="/learn/pgfplots">Learn PGFPlots</Link> – Generate publication-quality plots</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your LaTeX code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> – Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> – Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> – Generate BibTeX citations from DOIs</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> – Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Browse math operators and Greek letters</li>
          </ul>

          <h2>LaTeX Templates</h2>
          <p>Get started quickly with our professional templates:</p>
          <ul>
            <li><Link href="https://tools.useoctree.com/templates/research-paper" target="_blank" rel="noopener noreferrer">Research Paper</Link> – IEEE-style academic paper</li>
            <li><Link href="https://tools.useoctree.com/templates/thesis" target="_blank" rel="noopener noreferrer">PhD Thesis</Link> – Comprehensive thesis template</li>
            <li><Link href="https://tools.useoctree.com/templates/beamer-presentation" target="_blank" rel="noopener noreferrer">Beamer Presentation</Link> – Academic slides</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">View all 71 templates →</Link></li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related LaTeX Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree – the AI-powered LaTeX editor that makes writing faster and easier.
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
  return learnMetadata(page)
}

