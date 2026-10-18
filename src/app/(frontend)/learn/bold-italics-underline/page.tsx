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

const breadcrumbs = getLearnBreadcrumbs('Bold, Italics & Underline', 'bold-italics-underline')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function BoldItalicsUnderlinePage() {
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
          <h1>Bold, Italics and Underlining in LaTeX</h1>
          <p className="lead">
            Text formatting is fundamental to creating readable, well-structured documents in LaTeX.
            Whether you need to emphasise a key term, highlight a definition, or draw attention to
            important information, LaTeX provides a rich set of commands for bold, italic, and underlined
            text. This guide covers every method available, from basic commands to advanced packages.
          </p>

          <h2>Bold Text in LaTeX</h2>
          <p>
            Making text bold in LaTeX is straightforward. The most common command is <code>\textbf&#123;&#125;</code>,
            which wraps the text you want to appear in bold. LaTeX also provides a declaration form that
            affects all subsequent text within its scope.
          </p>

          <h3>Using \textbf&#123;&#125;</h3>
          <p>
            The <code>\textbf&#123;&#125;</code> command is the standard way to make text bold in LaTeX.
            It takes one argument — the text to be bolded — and can be used anywhere in your document.
          </p>

          <pre><code>{`\\documentclass{article}
\\begin{document}

This is \\textbf{bold text} in a sentence.

You can also make \\textbf{entire phrases bold} easily.

\\end{document}`}</code></pre>

          <h3>Using \bfseries</h3>
          <p>
            The <code>\bfseries</code> declaration switches all following text to bold within the
            current group or environment. This is useful when you need a longer passage of bold text
            without wrapping everything in <code>\textbf&#123;&#125;</code>.
          </p>

          <pre><code>{`% \\bfseries as a declaration
{\\bfseries This entire sentence is bold.}

% Within an environment
\\begin{center}
  \\bfseries
  This centred paragraph is entirely bold.
  It continues on the next line, still bold.
\\end{center}`}</code></pre>

          <h3>Bold in Math Mode</h3>
          <p>
            The <code>\textbf&#123;&#125;</code> command does not work inside math mode.
            Instead, use <code>\mathbf&#123;&#125;</code> for bold math symbols and letters.
          </p>

          <pre><code>{`% Bold letters in math mode
$ \\mathbf{F} = m \\mathbf{a} $

% Bold Greek letters require \\boldsymbol from amsmath
\\usepackage{amsmath}
$ \\boldsymbol{\\alpha} + \\boldsymbol{\\beta} = \\boldsymbol{\\gamma} $`}</code></pre>

          <h2>Italic Text in LaTeX</h2>
          <p>
            Italic text is commonly used for emphasis, book titles, foreign words, and variable names.
            LaTeX offers several ways to produce italic text, each with slightly different behaviour.
          </p>

          <h3>Using \textit&#123;&#125;</h3>
          <p>
            The <code>\textit&#123;&#125;</code> command is the most direct way to set text in italics.
            It switches the font shape to italic for the enclosed argument.
          </p>

          <pre><code>{`\\documentclass{article}
\\begin{document}

This is \\textit{italic text} in a sentence.

The word \\textit{ad hoc} is a Latin phrase.

\\end{document}`}</code></pre>

          <h3>Using \emph&#123;&#125;</h3>
          <p>
            The <code>\emph&#123;&#125;</code> command provides <em>semantic</em> emphasis rather than
            just visual formatting. In normal (upright) text, <code>\emph&#123;&#125;</code> produces
            italics. But inside already-italic text, it switches back to upright — making it context-aware.
          </p>

          <pre><code>{`% \\emph in normal text produces italics
This is \\emph{emphasised text}.

% \\emph inside italic text reverts to upright
\\textit{This is italic and \\emph{this is upright} again.}

% Nested emphasis
\\emph{This is emphasised and \\emph{this is doubly emphasised}.}`}</code></pre>

          <h3>Using \itshape</h3>
          <p>
            Similar to <code>\bfseries</code> for bold, the <code>\itshape</code> declaration switches
            all subsequent text within the current scope to italic.
          </p>

          <pre><code>{`{\\itshape This entire sentence is in italics.}

\\begin{quote}
  \\itshape
  This quoted passage appears entirely in italics,
  spanning multiple lines.
\\end{quote}`}</code></pre>

          <h3>Italic vs Emphasis</h3>
          <p>
            While <code>\textit&#123;&#125;</code> and <code>\emph&#123;&#125;</code> often produce the same
            visual result, they serve different purposes:
          </p>
          <ul>
            <li><strong>\textit&#123;&#125;</strong> – Forces italic shape regardless of context. Use for foreign words, titles, and stylistic choices.</li>
            <li><strong>\emph&#123;&#125;</strong> – Applies semantic emphasis that adapts to context. Use when you want to stress the meaning of a word or phrase.</li>
          </ul>

          <h2>Underlining in LaTeX</h2>
          <p>
            Underlining is less common in typeset documents than in handwritten or typewritten text.
            LaTeX provides a basic underlining command, but it has limitations. For more flexible
            underlining, specialised packages are recommended.
          </p>

          <h3>Using \underline&#123;&#125;</h3>
          <p>
            The built-in <code>\underline&#123;&#125;</code> command adds a line beneath the enclosed text.
            However, it has notable limitations: it does not break across lines, and it does not adjust
            for descenders (letters like g, p, and y).
          </p>

          <pre><code>{`\\documentclass{article}
\\begin{document}

This is \\underline{underlined text} in a sentence.

% Problem: \\underline does not break across lines
% This will NOT work well for long passages:
\\underline{This is a very long underlined text that you might
want to span across multiple lines but it will not break.}

\\end{document}`}</code></pre>

          <h3>Using the soul Package</h3>
          <p>
            The <code>soul</code> package provides the <code>\ul&#123;&#125;</code> command, which supports
            line breaking and offers better typographic results than <code>\underline&#123;&#125;</code>.
          </p>

          <pre><code>{`\\documentclass{article}
\\usepackage{soul}
\\begin{document}

This is \\ul{underlined text that can break across
multiple lines without any problems}.

% soul also provides other commands:
\\st{This text is struck through.}
\\hl{This text is highlighted.}   % requires color package
\\caps{Small Caps Text}

\\end{document}`}</code></pre>

          <h3>Using the ulem Package</h3>
          <p>
            The <code>ulem</code> package replaces <code>\emph&#123;&#125;</code> with underlining by default.
            Load it with the <code>[normalem]</code> option to prevent this behaviour. It provides
            several underlining styles.
          </p>

          <pre><code>{`\\documentclass{article}
\\usepackage[normalem]{ulem}
\\begin{document}

\\uline{Single underline that breaks across lines.}

\\uuline{Double underline.}

\\uwave{Wavy underline.}

\\sout{Strikethrough text.}

\\xout{Crossed-out text with slashes.}

\\dashuline{Dashed underline.}

\\dotuline{Dotted underline.}

\\end{document}`}</code></pre>

          <h2>Combining Formatting</h2>
          <p>
            LaTeX allows you to nest formatting commands to apply multiple styles simultaneously.
            You can combine bold, italic, and underline in any combination.
          </p>

          <pre><code>{`% Bold and italic
\\textbf{\\textit{Bold and italic text}}

% Italic and bold (same result, different nesting)
\\textit{\\textbf{Also bold and italic text}}

% Bold and underlined
\\textbf{\\underline{Bold and underlined}}

% Italic and underlined
\\textit{\\underline{Italic and underlined}}

% All three combined
\\textbf{\\textit{\\underline{Bold, italic, and underlined}}}

% Using soul package with bold and italic
\\textbf{\\textit{\\ul{Bold, italic, and underlined with soul}}}`}</code></pre>

          <p>
            You can also use declaration forms together inside a group:
          </p>

          <pre><code>{`% Declaration forms combined
{\\bfseries\\itshape This text is bold italic.}

% Inside an environment
\\begin{center}
  \\bfseries\\itshape
  This centred text is bold and italic.
\\end{center}`}</code></pre>

          <h2>Formatting in Math Mode</h2>
          <p>
            Math mode uses its own set of font commands. The standard text formatting commands
            (<code>\textbf</code>, <code>\textit</code>) do not work inside math environments.
            Instead, use the dedicated math font commands.
          </p>

          <pre><code>{`\\usepackage{amsmath}
\\usepackage{amssymb}

% Bold in math
$ \\mathbf{A} \\mathbf{x} = \\mathbf{b} $

% Italic in math (default for variables, but explicit:)
$ \\mathit{diff} $

% Bold italic (for vectors, tensors)
$ \\boldsymbol{\\sigma} = \\boldsymbol{C} : \\boldsymbol{\\varepsilon} $

% Roman (upright) in math — for operators, units
$ \\mathrm{pH} = -\\log[\\mathrm{H}^+] $

% Sans-serif in math
$ \\mathsf{T} $

% Calligraphic
$ \\mathcal{L} $

% Blackboard bold
$ \\mathbb{R}, \\mathbb{Z}, \\mathbb{N} $

% Bold symbol — works with Greek and symbols
$ \\boldsymbol{\\nabla} \\times \\boldsymbol{E} = -\\frac{\\partial \\boldsymbol{B}}{\\partial t} $`}</code></pre>

          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Result</th>
                <th>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\mathbf&#123;x&#125;</code></td>
                <td>Bold upright</td>
                <td>Vectors, matrices</td>
              </tr>
              <tr>
                <td><code>\mathit&#123;x&#125;</code></td>
                <td>Italic (math italic)</td>
                <td>Multi-letter variables</td>
              </tr>
              <tr>
                <td><code>\boldsymbol&#123;x&#125;</code></td>
                <td>Bold italic</td>
                <td>Bold Greek letters, symbols</td>
              </tr>
              <tr>
                <td><code>\mathrm&#123;x&#125;</code></td>
                <td>Upright (roman)</td>
                <td>Units, operators, chemical formulae</td>
              </tr>
              <tr>
                <td><code>\mathsf&#123;x&#125;</code></td>
                <td>Sans-serif</td>
                <td>Categories, tensors</td>
              </tr>
              <tr>
                <td><code>\mathcal&#123;L&#125;</code></td>
                <td>Calligraphic</td>
                <td>Lagrangians, sets</td>
              </tr>
              <tr>
                <td><code>\mathbb&#123;R&#125;</code></td>
                <td>Blackboard bold</td>
                <td>Number sets</td>
              </tr>
            </tbody>
          </table>

          <h2>Using the emph Command</h2>
          <p>
            The <code>\emph&#123;&#125;</code> command deserves special attention because it provides
            semantic emphasis rather than purely visual formatting. This distinction matters for
            accessibility, maintainability, and correct typographic practice.
          </p>

          <h3>Context-Aware Behaviour</h3>
          <p>
            Unlike <code>\textit&#123;&#125;</code>, which always produces italic text, <code>\emph&#123;&#125;</code>
            adapts to its surrounding context:
          </p>

          <pre><code>{`% In normal (upright) text, \\emph produces italics
This is normal text with \\emph{emphasis}.

% In italic text, \\emph produces upright text
\\textit{This is italic with \\emph{emphasis} back to upright.}

% In bold text, \\emph produces bold italics
\\textbf{Bold text with \\emph{bold italic emphasis}.}`}</code></pre>

          <h3>Why Prefer \emph Over \textit</h3>
          <ul>
            <li><strong>Semantic meaning</strong> – <code>\emph</code> conveys that the text is being stressed, not just styled.</li>
            <li><strong>Context adaptation</strong> – It automatically toggles between italic and upright depending on surrounding text.</li>
            <li><strong>Customisability</strong> – Packages and class files can redefine what <code>\emph</code> does (e.g., use bold instead of italic).</li>
            <li><strong>Accessibility</strong> – Screen readers and assistive tools can interpret semantic emphasis more meaningfully.</li>
          </ul>

          <h3>Redefining \emph</h3>
          <p>
            You can customise how <code>\emph</code> behaves by redefining it:
          </p>

          <pre><code>{`% Make \\emph produce bold instead of italic
\\renewcommand{\\emph}[1]{\\textbf{#1}}

% Make \\emph produce bold italic
\\renewcommand{\\emph}[1]{\\textbf{\\textit{#1}}}

% Make \\emph underline text
\\usepackage{soul}
\\renewcommand{\\emph}[1]{\\ul{#1}}`}</code></pre>

          <h2>Common Packages for Advanced Formatting</h2>
          <p>
            Beyond the basic commands, several packages extend LaTeX&apos;s text formatting capabilities.
          </p>

          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Commands</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>soul</code></td>
                <td><code>\ul&#123;&#125;</code>, <code>\st&#123;&#125;</code>, <code>\hl&#123;&#125;</code>, <code>\caps&#123;&#125;</code></td>
                <td>Underline, strikethrough, highlight, small caps with line-breaking support</td>
              </tr>
              <tr>
                <td><code>ulem</code></td>
                <td><code>\uline&#123;&#125;</code>, <code>\uuline&#123;&#125;</code>, <code>\uwave&#123;&#125;</code>, <code>\sout&#123;&#125;</code></td>
                <td>Multiple underline styles, strikethrough, wavy underline</td>
              </tr>
              <tr>
                <td><code>contour</code></td>
                <td><code>\contour&#123;&#125;</code></td>
                <td>Outlines text with a coloured contour for visual emphasis</td>
              </tr>
              <tr>
                <td><code>xcolor</code></td>
                <td><code>\textcolor&#123;&#125;&#123;&#125;</code></td>
                <td>Coloured text formatting</td>
              </tr>
              <tr>
                <td><code>bm</code></td>
                <td><code>\bm&#123;&#125;</code></td>
                <td>Bold math symbols (better than <code>\boldsymbol</code> in some cases)</td>
              </tr>
            </tbody>
          </table>

          <pre><code>{`% soul package examples
\\usepackage{soul}
\\ul{Underlined text that wraps across lines.}
\\st{Strikethrough text.}
\\so{L e t t e r s p a c i n g.}

% ulem package examples
\\usepackage[normalem]{ulem}
\\uline{Underline}
\\uuline{Double underline}
\\uwave{Wavy underline}
\\dashuline{Dashed underline}
\\dotuline{Dotted underline}

% xcolor for coloured text
\\usepackage{xcolor}
\\textcolor{red}{Red text}
\\textcolor{blue}{\\textbf{Bold blue text}}
\\colorbox{yellow}{Highlighted text}

% bm package for bold math
\\usepackage{bm}
$ \\bm{\\alpha} + \\bm{\\beta} = \\bm{\\gamma} $`}</code></pre>

          <h2>Quick Reference Table</h2>
          <p>
            Here is a summary of all the key formatting commands covered in this guide:
          </p>

          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Result</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\textbf&#123;text&#125;</code></td>
                <td><strong>Bold text</strong></td>
                <td>Standard bold in text mode</td>
              </tr>
              <tr>
                <td><code>\bfseries</code></td>
                <td><strong>Bold (declaration)</strong></td>
                <td>Affects all text in current scope</td>
              </tr>
              <tr>
                <td><code>\textit&#123;text&#125;</code></td>
                <td><em>Italic text</em></td>
                <td>Standard italic in text mode</td>
              </tr>
              <tr>
                <td><code>\itshape</code></td>
                <td><em>Italic (declaration)</em></td>
                <td>Affects all text in current scope</td>
              </tr>
              <tr>
                <td><code>\emph&#123;text&#125;</code></td>
                <td><em>Emphasised text</em></td>
                <td>Context-aware; toggles italic/upright</td>
              </tr>
              <tr>
                <td><code>\underline&#123;text&#125;</code></td>
                <td><u>Underlined text</u></td>
                <td>Built-in; does not break across lines</td>
              </tr>
              <tr>
                <td><code>\ul&#123;text&#125;</code></td>
                <td><u>Underlined text</u></td>
                <td>From soul package; supports line breaks</td>
              </tr>
              <tr>
                <td><code>\uline&#123;text&#125;</code></td>
                <td><u>Underlined text</u></td>
                <td>From ulem package; supports line breaks</td>
              </tr>
              <tr>
                <td><code>\uuline&#123;text&#125;</code></td>
                <td>Double underline</td>
                <td>From ulem package</td>
              </tr>
              <tr>
                <td><code>\uwave&#123;text&#125;</code></td>
                <td>Wavy underline</td>
                <td>From ulem package</td>
              </tr>
              <tr>
                <td><code>\sout&#123;text&#125;</code></td>
                <td><s>Strikethrough</s></td>
                <td>From ulem package</td>
              </tr>
              <tr>
                <td><code>\mathbf&#123;x&#125;</code></td>
                <td>Bold (math mode)</td>
                <td>Bold upright letters in math</td>
              </tr>
              <tr>
                <td><code>\boldsymbol&#123;x&#125;</code></td>
                <td>Bold (math mode)</td>
                <td>Bold italic, works with Greek letters</td>
              </tr>
              <tr>
                <td><code>\mathrm&#123;x&#125;</code></td>
                <td>Upright (math mode)</td>
                <td>Roman text in math for operators/units</td>
              </tr>
            </tbody>
          </table>

          <h2>Common Mistakes</h2>
          <p>
            Here are frequent errors that LaTeX beginners make with text formatting, along with their fixes:
          </p>

          <h3>Using \textbf in Math Mode</h3>
          <p>
            The <code>\textbf&#123;&#125;</code> command is designed for text mode. Using it in math mode
            will either produce an error or incorrect output. Use <code>\mathbf&#123;&#125;</code> instead.
          </p>

          <pre><code>{`% Wrong — \\textbf in math mode
$ \\textbf{F} = m \\textbf{a} $     % May cause errors

% Correct — \\mathbf in math mode
$ \\mathbf{F} = m \\mathbf{a} $     % Produces bold upright`}</code></pre>

          <h3>Double Emphasis</h3>
          <p>
            Nesting <code>\emph</code> inside <code>\emph</code> does not produce &quot;more emphasis.&quot;
            Instead, it toggles back to upright text due to the context-aware behaviour of <code>\emph</code>.
          </p>

          <pre><code>{`% This does NOT produce bold or extra emphasis
\\emph{This is emphasised \\emph{and this is NOT doubly emphasised}.}

% The inner \\emph reverts to upright text.
% If you want bold italic, combine commands explicitly:
\\textbf{\\textit{Truly bold and italic text}}`}</code></pre>

          <h3>Forgetting [normalem] with ulem</h3>
          <p>
            Loading the <code>ulem</code> package without the <code>[normalem]</code> option replaces
            <code>\emph&#123;&#125;</code> with underlining throughout your entire document. This is
            almost never what you want.
          </p>

          <pre><code>{`% Wrong — \\emph now underlines instead of italicising
\\usepackage{ulem}

% Correct — preserves normal \\emph behaviour
\\usepackage[normalem]{ulem}`}</code></pre>

          <h3>Underline Not Breaking Across Lines</h3>
          <p>
            The built-in <code>\underline&#123;&#125;</code> command does not support line breaking.
            If your underlined text is long, it will overflow into the margin.
          </p>

          <pre><code>{`% Problem — overflows the margin
\\underline{This is a very long piece of underlined text that will
not break across lines and will overflow.}

% Solution — use soul or ulem
\\usepackage{soul}
\\ul{This is a very long piece of underlined text that will
break across lines correctly.}`}</code></pre>

          <h3>Bold Greek Letters in Math</h3>
          <p>
            The <code>\mathbf&#123;&#125;</code> command does not work with Greek letters.
            Use <code>\boldsymbol&#123;&#125;</code> from <code>amsmath</code> or <code>\bm&#123;&#125;</code> from the <code>bm</code> package instead.
          </p>

          <pre><code>{`% Wrong — \\mathbf does not affect Greek letters
$ \\mathbf{\\alpha} $    % Produces normal (non-bold) alpha

% Correct — use \\boldsymbol or \\bm
\\usepackage{amsmath}
$ \\boldsymbol{\\alpha} $  % Produces bold alpha

\\usepackage{bm}
$ \\bm{\\alpha} $          % Also produces bold alpha`}</code></pre>

          <h2>Next Steps</h2>
          <p>Now that you know how to format text in LaTeX, explore more topics:</p>
          <ul>
            <li><Link href="/learn/strikethrough">Strikethrough &amp; Cross Out</Link> – \sout, \st and \cancel for struck-through text and math</li>
            <li><Link href="/learn/quotes">LaTeX Quotation Marks &amp; Quotes</Link> – Correct quotation marks, csquotes and block quotes</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> – Complete beginner tutorial covering all the basics</li>
            <li><Link href="/learn/tikz">Learn TikZ</Link> – Create diagrams and graphics programmatically</li>
            <li><Link href="/learn/pgfplots">Learn PGFPlots</Link> – Generate publication-quality plots and charts</li>
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

          <RelatedPosts searchTerm="LaTeX formatting" title="Related Articles" />

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
  return {
    title: 'Bold, Italics and Underlining in LaTeX – Guide 2026',
    description: 'Learn how to use bold, italic, and underline text in LaTeX. Complete guide covering \\textbf, \\textit, \\underline, \\emph, and advanced formatting with soul and ulem packages.',
    keywords: 'latex bold, latex italic, latex underline, textbf latex, textit latex, emph latex, latex text formatting, bold text in latex, italic text in latex, underline in latex, latex font styles, latex emphasis',
    openGraph: mergeOpenGraph({
      title: 'Bold, Italics and Underlining in LaTeX – Guide 2026',
      description: 'Complete guide to bold, italic, and underline text formatting in LaTeX with examples.',
      type: 'article',
      url: '/learn/bold-italics-underline',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'Bold, Italics and Underlining in LaTeX',
      description: 'Learn bold, italic, and underline formatting in LaTeX with practical examples.',
    },
    alternates: {
      canonical: '/learn/bold-italics-underline',
    },
  }
}
