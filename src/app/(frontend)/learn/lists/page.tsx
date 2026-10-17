import type { Metadata } from 'next/types'
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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Lists', 'lists')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function LaTeXListsPage() {
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
          <h1>LaTeX Lists</h1>
          <p className="lead">
            Lists are fundamental for organizing information in documents. LaTeX provides
            three core list environments &ndash; <code>itemize</code> for bulleted lists,
            <code>enumerate</code> for numbered lists, and <code>description</code> for
            definition-style lists &ndash; along with powerful packages for customization.
          </p>

          {/* ── Unordered Lists (itemize) ── */}
          <h2>Unordered Lists (itemize)</h2>
          <p>
            The <code>itemize</code> environment creates a bulleted (unordered) list. Each
            entry begins with the <code>\item</code> command:
          </p>
          <pre><code>{`\\begin{itemize}
  \\item First item
  \\item Second item
  \\item Third item
\\end{itemize}`}</code></pre>
          <p>
            By default, LaTeX uses a solid bullet (<code>\\textbullet</code>) for
            first-level items. You can add as many <code>\item</code> entries as you need.
          </p>

          <h3>Itemize with Custom Markers</h3>
          <p>
            Override the default bullet for a single item by placing the desired symbol
            in square brackets:
          </p>
          <pre><code>{`\\begin{itemize}
  \\item Default bullet
  \\item[-] Dash marker
  \\item[*] Asterisk marker
  \\item[$\\diamond$] Diamond marker
\\end{itemize}`}</code></pre>

          {/* ── Ordered Lists (enumerate) ── */}
          <h2>Ordered Lists (enumerate)</h2>
          <p>
            The <code>enumerate</code> environment produces a numbered (ordered) list.
            LaTeX automatically handles the numbering:
          </p>
          <pre><code>{`\\begin{enumerate}
  \\item First step
  \\item Second step
  \\item Third step
\\end{enumerate}`}</code></pre>
          <p>
            The default numbering style is Arabic numerals (1, 2, 3, ...) at the first
            level, lowercase letters (a, b, c, ...) at the second, Roman numerals
            (i, ii, iii, ...) at the third, and uppercase letters (A, B, C, ...) at the
            fourth.
          </p>

          {/* ── Description Lists ── */}
          <h2>Description Lists</h2>
          <p>
            A <code>description</code> list highlights a term followed by its explanation.
            Use <code>\item[Term]</code> to set the label:
          </p>
          <pre><code>{`\\begin{description}
  \\item[LaTeX] A document preparation system for high-quality typesetting.
  \\item[TikZ] A package for creating graphics programmatically.
  \\item[BibTeX] A tool for managing bibliographic references.
\\end{description}`}</code></pre>
          <p>
            The term inside the brackets is rendered in bold by default, making
            description lists ideal for glossaries, feature lists, and FAQs.
          </p>

          {/* ── Nested Lists ── */}
          <h2>Nested Lists</h2>
          <p>
            LaTeX supports nesting lists up to four levels deep. You can mix different
            list types freely:
          </p>

          <h3>Nested Itemize</h3>
          <pre><code>{`\\begin{itemize}
  \\item Fruits
    \\begin{itemize}
      \\item Apples
      \\item Bananas
        \\begin{itemize}
          \\item Cavendish
          \\item Plantain
        \\end{itemize}
    \\end{itemize}
  \\item Vegetables
\\end{itemize}`}</code></pre>
          <p>
            Each nesting level automatically uses a different bullet symbol:
            <code>\\textbullet</code>, <code>\\textendash</code>,
            <code>\\textasteriskcentered</code>, and <code>\\textperiodcentered</code>.
          </p>

          <h3>Mixed Nesting (Itemize inside Enumerate)</h3>
          <pre><code>{`\\begin{enumerate}
  \\item Prepare the ingredients
    \\begin{itemize}
      \\item 200g flour
      \\item 100ml milk
      \\item 2 eggs
    \\end{itemize}
  \\item Mix everything together
  \\item Bake at 180\\textdegree C for 25 minutes
\\end{enumerate}`}</code></pre>

          <h3>Enumerate inside Itemize</h3>
          <pre><code>{`\\begin{itemize}
  \\item Morning routine
    \\begin{enumerate}
      \\item Wake up
      \\item Exercise
      \\item Breakfast
    \\end{enumerate}
  \\item Evening routine
    \\begin{enumerate}
      \\item Dinner
      \\item Read
      \\item Sleep
    \\end{enumerate}
\\end{itemize}`}</code></pre>

          {/* ── Customizing Bullet Styles ── */}
          <h2>Customizing Bullet Styles</h2>
          <p>
            You can change bullet symbols on a per-item basis or globally for each
            nesting level.
          </p>

          <h3>Per-Item Symbols</h3>
          <pre><code>{`\\begin{itemize}
  \\item[$\\bullet$] Bullet
  \\item[$\\circ$] Circle
  \\item[$\\star$] Star
  \\item[$\\rightarrow$] Arrow
  \\item[$\\checkmark$] Checkmark
\\end{itemize}`}</code></pre>

          <h3>Global Defaults with renewcommand</h3>
          <p>
            Place these commands in your preamble to change the default markers for all
            itemize lists throughout the document:
          </p>
          <pre><code>{`% Change first-level bullet to a dash
\\renewcommand{\\labelitemi}{--}

% Change second-level bullet to a circle
\\renewcommand{\\labelitemii}{$\\circ$}

% Change third-level bullet to a star
\\renewcommand{\\labelitemiii}{$\\star$}

% Change fourth-level bullet to a diamond
\\renewcommand{\\labelitemiv}{$\\diamond$}`}</code></pre>
          <p>
            The commands <code>\labelitemi</code> through <code>\labelitemiv</code>
            correspond to nesting levels 1 through 4 respectively.
          </p>

          {/* ── Customizing Numbering ── */}
          <h2>Customizing Numbering</h2>
          <p>
            The <strong>enumerate</strong> package (or the more powerful <strong>enumitem</strong>
            package) lets you specify the label format for numbered lists.
          </p>

          <h3>Using the enumitem Package</h3>
          <pre><code>{`\\usepackage{enumitem}

% Lowercase letters in parentheses: (a), (b), (c)
\\begin{enumerate}[label=(\\alph*)]
  \\item First item
  \\item Second item
  \\item Third item
\\end{enumerate}

% Lowercase Roman numerals: (i), (ii), (iii)
\\begin{enumerate}[label=(\\roman*)]
  \\item First item
  \\item Second item
  \\item Third item
\\end{enumerate}

% Custom prefix: Step 1:, Step 2:, Step 3:
\\begin{enumerate}[label=Step \\arabic*:]
  \\item Gather materials
  \\item Assemble components
  \\item Test the result
\\end{enumerate}

% Uppercase letters: A., B., C.
\\begin{enumerate}[label=\\Alph*.]
  \\item Section one
  \\item Section two
  \\item Section three
\\end{enumerate}`}</code></pre>

          <h3>Label Format Tokens</h3>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Output</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\arabic*</code></td>
                <td>1, 2, 3</td>
                <td><code>label=\arabic*.</code></td>
              </tr>
              <tr>
                <td><code>\alph*</code></td>
                <td>a, b, c</td>
                <td><code>label=(\alph*)</code></td>
              </tr>
              <tr>
                <td><code>\Alph*</code></td>
                <td>A, B, C</td>
                <td><code>label=\Alph*)</code></td>
              </tr>
              <tr>
                <td><code>\roman*</code></td>
                <td>i, ii, iii</td>
                <td><code>label=\roman*.</code></td>
              </tr>
              <tr>
                <td><code>\Roman*</code></td>
                <td>I, II, III</td>
                <td><code>label=\Roman*.</code></td>
              </tr>
            </tbody>
          </table>

          {/* ── Compact Lists ── */}
          <h2>Compact Lists</h2>
          <p>
            By default, LaTeX adds vertical spacing between list items. The <strong>enumitem</strong>
            package provides options to remove or reduce this spacing for tighter lists.
          </p>

          <h3>Using nosep</h3>
          <p>
            The <code>nosep</code> option removes all extra vertical spacing (before, after,
            and between items):
          </p>
          <pre><code>{`\\usepackage{enumitem}

\\begin{itemize}[nosep]
  \\item First item
  \\item Second item
  \\item Third item
\\end{itemize}`}</code></pre>

          <h3>Using noitemsep</h3>
          <p>
            The <code>noitemsep</code> option removes spacing between items but preserves
            spacing before and after the list:
          </p>
          <pre><code>{`\\begin{enumerate}[noitemsep]
  \\item Step one
  \\item Step two
  \\item Step three
\\end{enumerate}`}</code></pre>

          <h3>Custom Spacing</h3>
          <p>
            For fine-grained control, set specific spacing values:
          </p>
          <pre><code>{`\\begin{itemize}[
  topsep=4pt,        % Space above/below the list
  itemsep=2pt,       % Space between items
  parsep=0pt,        % Space between paragraphs within an item
  partopsep=0pt,     % Extra space added at top if list starts a paragraph
  leftmargin=1.5em   % Left indent
]
  \\item First item
  \\item Second item
  \\item Third item
\\end{itemize}`}</code></pre>

          {/* ── Inline Lists ── */}
          <h2>Inline Lists</h2>
          <p>
            The <strong>enumitem</strong> package provides starred versions of list
            environments that render items inline (within the running text), perfect for
            short sequences:
          </p>
          <pre><code>{`\\usepackage[inline]{enumitem}

The primary colors are
\\begin{enumerate*}[label=(\\arabic*)]
  \\item red,
  \\item blue, and
  \\item yellow.
\\end{enumerate*}

The requirements are:
\\begin{itemize*}[label=\\textbullet]
  \\item a compiler,
  \\item a text editor, and
  \\item a PDF viewer.
\\end{itemize*}`}</code></pre>
          <p>
            Load <code>enumitem</code> with the <code>[inline]</code> option to enable
            the <code>enumerate*</code> and <code>itemize*</code> environments.
          </p>

          {/* ── Multi-Column Lists ── */}
          <h2>Multi-Column Lists</h2>
          <p>
            Combine the <strong>multicol</strong> package with list environments to
            display items in multiple columns, saving space for long lists:
          </p>
          <pre><code>{`\\usepackage{multicol}

\\begin{multicols}{2}
\\begin{itemize}[nosep]
  \\item Alpha
  \\item Beta
  \\item Gamma
  \\item Delta
  \\item Epsilon
  \\item Zeta
\\end{itemize}
\\end{multicols}`}</code></pre>
          <p>
            You can also use the <code>multicols</code> environment with <code>enumerate</code>
            for numbered multi-column lists:
          </p>
          <pre><code>{`\\begin{multicols}{3}
\\begin{enumerate}[nosep]
  \\item Item 1
  \\item Item 2
  \\item Item 3
  \\item Item 4
  \\item Item 5
  \\item Item 6
  \\item Item 7
  \\item Item 8
  \\item Item 9
\\end{enumerate}
\\end{multicols}`}</code></pre>

          {/* ── Quick Reference Table ── */}
          <h2>Quick Reference Table</h2>
          <table>
            <thead>
              <tr>
                <th>Environment</th>
                <th>Purpose</th>
                <th>Default Style</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>itemize</code></td>
                <td>Unordered (bulleted) list</td>
                <td>Bullet symbols that vary by nesting level</td>
              </tr>
              <tr>
                <td><code>enumerate</code></td>
                <td>Ordered (numbered) list</td>
                <td>1, 2, 3 at level 1; a, b, c at level 2</td>
              </tr>
              <tr>
                <td><code>description</code></td>
                <td>Definition / term list</td>
                <td>Bold label followed by description text</td>
              </tr>
              <tr>
                <td><code>enumerate*</code></td>
                <td>Inline numbered list</td>
                <td>Items rendered within running text</td>
              </tr>
              <tr>
                <td><code>itemize*</code></td>
                <td>Inline bulleted list</td>
                <td>Items rendered within running text</td>
              </tr>
            </tbody>
          </table>

          {/* ── Common Packages ── */}
          <h2>Common Packages</h2>
          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Primary Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>enumitem</code></td>
                <td>Customise labels, spacing, and create inline lists. The most versatile list package.</td>
              </tr>
              <tr>
                <td><code>paralist</code></td>
                <td>Provides compact and inline list environments (<code>compactitem</code>, <code>inparaenum</code>).</td>
              </tr>
              <tr>
                <td><code>tasks</code></td>
                <td>Create horizontally distributed &quot;task&quot; lists, ideal for exercise sheets and exams.</td>
              </tr>
              <tr>
                <td><code>multicol</code></td>
                <td>Render any list in multiple columns for space-efficient layouts.</td>
              </tr>
            </tbody>
          </table>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> &ndash; Master text formatting in LaTeX</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; Create professional tables with booktabs</li>
            <li><Link href="/learn/latex">Learn LaTeX Basics</Link> &ndash; Review core LaTeX fundamentals</li>
            <li><Link href="/learn/tikz">Learn TikZ</Link> &ndash; Create diagrams and graphics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test your list code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> &ndash; Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX lists" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write LaTeX lists faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor helps you generate and format LaTeX lists, nested structures,
              and custom numbering &ndash; so you can focus on your content instead of syntax.
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
    title: 'LaTeX Lists – Itemize, Enumerate & Description Guide 2026',
    description: 'Learn how to create lists in LaTeX: bulleted (itemize), numbered (enumerate), and description lists. Guide covers nesting, custom bullets, compact lists, and the enumitem package.',
    keywords: 'latex list, latex itemize, latex enumerate, latex description list, latex bullet points, latex numbered list, latex nested list, latex list styles, enumitem latex, latex custom bullets, latex list spacing, latex inline list',
    openGraph: {
      title: 'LaTeX Lists – Itemize, Enumerate & Description Guide 2026',
      description: 'Complete guide to creating and customizing lists in LaTeX.',
      type: 'article',
      url: '/learn/lists',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'LaTeX Lists – Complete Guide',
      description: 'Learn to create bulleted, numbered, and description lists in LaTeX.',
    },
    alternates: {
      canonical: '/learn/lists',
    },
  }
}
