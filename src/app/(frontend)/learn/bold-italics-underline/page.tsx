import type { Metadata } from 'next/types'

import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
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

const breadcrumbs = getLearnBreadcrumbs('Bold, Italics & Underline', 'bold-italics-underline')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'bold-italics-underline',
  title: 'Underline, Bold and Italics in LaTeX',
  description: 'Underline in LaTeX with \\underline, \\uline (ulem) or \\ul (soul); double and wavy underlines, math mode, plus bold \\textbf and italics \\textit, \\emph.',
  keywords: 'underline latex, latex underline, underline in latex, how to underline in latex, latex uline, ulem underline, soul ul latex, latex double underline, latex wavy underline, underline math mode latex, bold in latex, latex bold, latex italic, latex underline, textbf latex, textit latex, emph latex, latex text formatting, bold text in latex, italic text in latex, underline in latex, latex font styles, latex emphasis, italic in latex, latex italics, italics in latex, how to italicize in latex, latex italic text, italic text in latex bold italics and underlining, latex bold italic, latex underline text, latex emph vs textit, latex small caps, latex textsc, latex texttt monospace, latex textsf, latex slanted text, latex font style commands, latex text formatting commands, latex mathbf boldsymbol',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-08'

const faq: FaqItem[] = [
  {
    question: 'How do you underline text in LaTeX?',
    answer:
      'Use \\underline{text}. It is built in and needs no package, but the underlined text cannot break across lines. For longer text, add \\usepackage[normalem]{ulem} to the preamble and write \\uline{text}, or load soul and write \\ul{text}; both wrap onto the next line like normal text.',
  },
  {
    question: 'Why does \\underline run into the margin?',
    answer:
      '\\underline puts its argument in a single box, and TeX never breaks a line inside a box, so a long underlined phrase overflows instead of wrapping. Replace it with \\uline from ulem or \\ul from soul. soul can also hyphenate the underlined words.',
  },
  {
    question: 'How do I make a double or wavy underline in LaTeX?',
    answer:
      'Load \\usepackage[normalem]{ulem} and use \\uuline{text} for a double underline and \\uwave{text} for a wavy one. ulem also has \\dashuline and \\dotuline. Without a package, \\underline{\\underline{text}} gives a double underline that does not break across lines.',
  },
  {
    question: 'How do I underline in math mode?',
    answer:
      'Use \\underline inside the math, as in $\\underline{x}$ or $\\underline{\\underline{\\sigma}}$ for a double underline. \\uline and \\ul are text commands. To put a label under the underlined part, use \\underbrace{a+b}_{\\text{label}}.',
  },
  {
    question: 'How do you make text bold in LaTeX?',
    answer:
      'Write \\textbf{text} for a word or phrase, or {\\bfseries ...} for a longer passage. In math mode use \\mathbf{x} for bold upright letters and \\boldsymbol{\\alpha} (amsmath) or \\bm{\\alpha} (bm package) for bold Greek letters and symbols.',
  },
  {
    question: 'What is the difference between \\textit and \\emph?',
    answer:
      '\\textit always sets italic. \\emph means emphasis: in upright text it gives italics, but inside italic text it switches back to upright so the emphasis still shows. Use \\emph for stressed words and \\textit for titles and foreign words.',
  },
]

export default async function BoldItalicsUnderlinePage() {
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
        faq={faq}
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
          <h1>Underline, Bold and Italics in LaTeX</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Underline:</strong> <code>{`\\underline{text}`}</code>, built in, no line breaks.
              </li>
              <li>
                <strong>Underline that wraps:</strong> <code>{`\\usepackage[normalem]{ulem}`}</code> then{' '}
                <code>{`\\uline{text}`}</code>, or <code>{`\\usepackage{soul}`}</code> then{' '}
                <code>{`\\ul{text}`}</code>.
              </li>
              <li>
                <strong>Bold:</strong> <code>{`\\textbf{text}`}</code>; in math <code>{`\\mathbf{x}`}</code>.
              </li>
              <li>
                <strong>Italics:</strong> <code>{`\\textit{text}`}</code>, or <code>{`\\emph{text}`}</code>{' '}
                for emphasis that flips back to upright inside italic text.
              </li>
              <li>
                <strong>Double and wavy underline:</strong> <code>{`\\uuline{text}`}</code> and{' '}
                <code>{`\\uwave{text}`}</code> from ulem.
              </li>
            </ul>
          </div>
          <p className="lead">
            Underline in LaTeX with <code>\underline&#123;&#125;</code>, make text bold with{' '}
            <code>\textbf&#123;&#125;</code> and italic with <code>\textit&#123;&#125;</code> or{' '}
            <code>\emph&#123;&#125;</code>. None of them needs a package. This guide covers when the
            built-in underline is not enough (long text, line breaks, double, wavy and coloured
            underlines with <code>ulem</code> and <code>soul</code>, underlining in math), the bold
            and italic commands and their declaration forms, other font styles, and the errors you
            are likely to meet.
          </p>

          {/* ── Underline ── */}
          <h2>Underline in LaTeX</h2>
          <p>
            To underline in LaTeX, wrap the text in <code>\underline&#123;...&#125;</code>. It is
            built in, needs no package and works in text and math mode. Its one real limit is that
            it puts the text in a single unbreakable box: an underlined phrase cannot wrap onto the
            next line or be hyphenated, so a long one runs into the margin. For anything longer
            than a few words, use <code>\uline</code> from the <code>ulem</code> package or{' '}
            <code>\ul</code> from <code>soul</code>.
          </p>

          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Package</th>
                <th>Breaks across lines</th>
                <th>Hyphenates</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\underline</code></td><td>none</td><td>No</td><td>No</td><td>A word or two, and math</td></tr>
              <tr><td><code>\uline</code></td><td><code>ulem</code> (with <code>[normalem]</code>)</td><td>Yes</td><td>No</td><td>Underlined phrases and sentences</td></tr>
              <tr><td><code>\ul</code></td><td><code>soul</code></td><td>Yes</td><td>Yes</td><td>Long passages, coloured underlines</td></tr>
              <tr><td><code>\uuline</code>, <code>\uwave</code></td><td><code>ulem</code></td><td>Yes</td><td>No</td><td>Double and wavy underlines</td></tr>
            </tbody>
          </table>

          <h3>The \underline Command</h3>
          <pre><code>{`\\documentclass{article}
\\begin{document}

This is \\underline{underlined text} in a sentence.

% The rule is drawn below the lowest letter, so words with
% descenders (g, p, y) get a lower line than words without:
\\underline{word} and \\underline{typography}

% Problem: \\underline never breaks across lines
\\underline{This is a very long underlined passage that you might
want to span several lines, but it stays on one line and runs
into the margin.}

\\end{document}`}</code></pre>
          <p>
            Both quirks, the missing line breaks and the uneven depth, go away with the package
            commands below, which draw the rule at a fixed distance under the baseline.
          </p>

          <h3>\uline from ulem: Underlines That Break Across Lines</h3>
          <pre><code>{`\\documentclass{article}
\\usepackage[normalem]{ulem}
\\begin{document}

\\uline{This underlined passage breaks across lines like normal
text, so it never runs into the margin.}

\\uline{Formatting such as \\textbf{bold} works inside.}

\\end{document}`}</code></pre>
          <p>
            Always load <code>ulem</code> with the <code>[normalem]</code> option. Without it the
            package redefines <code>\emph</code> to underline instead of italicise, which changes
            every emphasised word in the document. <code>\uline</code> breaks lines at spaces but
            does not hyphenate words.
          </p>

          <h3>\ul from soul: Underlines with Hyphenation</h3>
          <pre><code>{`\\documentclass{article}
\\usepackage{xcolor}  % only needed for \\setulcolor
\\usepackage{soul}
\\begin{document}

\\ul{Soul underlines break across lines and can even hyphenate
long words such as internationalization.}

\\setulcolor{red}     % colour of the line
\\ul{Red underline}

\\setul{1.5pt}{0.8pt} % depth below the baseline, thickness
\\ul{Lower, thicker underline}

\\end{document}`}</code></pre>
          <p>
            <code>soul</code> works letter by letter, so it is picky about commands inside its
            argument. If a <code>\cite</code> or <code>\ref</code> inside <code>\ul</code> stops the
            compile, put the command in braces, <code>{`\\ul{see {\\cite{knuth}}}`}</code>, or
            register it once in the preamble with <code>{`\\soulregister{\\cite}{7}`}</code>.
          </p>

          <h3>Double, Wavy, Dashed and Dotted Underlines</h3>
          <pre><code>{`\\documentclass{article}
\\usepackage[normalem]{ulem}
\\begin{document}

\\uuline{Double underline}

\\uwave{Wavy underline}

\\dashuline{Dashed underline}

\\dotuline{Dotted underline}

% A double underline with no package (does not break lines)
\\underline{\\underline{Total: 42}}

\\end{document}`}</code></pre>

          <h3>Coloured, Thicker or Lower Underlines with ulem</h3>
          <pre><code>{`\\documentclass{article}
\\usepackage{xcolor}
\\usepackage[normalem]{ulem}

% A red underline that still breaks across lines
\\newcommand{\\redul}{\\bgroup\\markoverwith{\\textcolor{red}{\\rule[-0.5ex]{2pt}{0.4pt}}}\\ULon}

\\begin{document}

\\redul{Red underline from ulem.}

\\renewcommand{\\ULthickness}{1pt}  % thicker line
\\setlength{\\ULdepth}{2pt}         % further below the baseline
\\uline{Thicker, lower underline.}

\\end{document}`}</code></pre>
          <p>
            For coloured text rather than a coloured line, and for highlighting, see the{' '}
            <Link href="/learn/colors">colors guide</Link>.
          </p>

          <h3>Underline in Math Mode</h3>
          <p>
            In equations use <code>\underline</code>: <code>\uline</code> and <code>\ul</code> are
            text commands. Inside math, <code>\underline</code> underlines the whole expression,
            and <code>\underbrace</code> does the same with a label underneath:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

$\\underline{x}$ and $\\underline{AB}$

% Double underline, used for tensors or a final answer
$\\underline{\\underline{\\sigma}}$

% Underline with a label
\\[
  \\underbrace{a + b + c}_{\\text{three terms}} = \\overline{xyz}
\\]

% An underlined word inside an equation
\\[
  f(x) = 0 \\quad \\text{for \\underline{all} } x
\\]

\\end{document}`}</code></pre>

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

          <h3>Difference Between \textit and \emph</h3>
          <p>
            While <code>\textit&#123;&#125;</code> and <code>\emph&#123;&#125;</code> often produce the same
            visual result, they serve different purposes:
          </p>
          <ul>
            <li><strong>\textit&#123;&#125;</strong> – Forces italic shape regardless of context. Use for foreign words, titles, and stylistic choices.</li>
            <li><strong>\emph&#123;&#125;</strong> – Applies semantic emphasis that adapts to context. Use when you want to stress the meaning of a word or phrase.</li>
          </ul>

          <h3>Italics in Math Mode</h3>
          <p>
            Inside math mode every letter is already italic, because that is how variables are
            set, so <code>\textit</code> has nothing to do there. The two commands you do need are{' '}
            <code>\mathit</code>, which sets a multi-letter name in italic <em>without</em> the
            spacing TeX puts between separate variables, and <code>\mathrm</code> or{' '}
            <code>\text</code> (amsmath), which switch back to upright for words, units and
            labels:
          </p>

          <pre><code>{`\\usepackage{amsmath}

% Variables are italic by default
$ y = mx + c $

% A multi-letter italic name: \\mathit keeps the letters together
$ \\mathit{diff}(x) $   % compare $diff(x)$, set as d, i, f, f

% Upright text inside math
$ x_{\\mathrm{max}} = 3\\,\\mathrm{m} $
$ f(x) = 0 \\text{ for all } x > 1 $`}</code></pre>

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

          <h2>Other Text Styles: Small Caps, Monospace, Sans-Serif and Slanted</h2>
          <p>
            Bold and italic are two settings of three independent font attributes: the{' '}
            <strong>family</strong> (roman, sans-serif, typewriter), the <strong>series</strong>{' '}
            (medium, bold) and the <strong>shape</strong> (upright, italic, slanted, small caps).
            Each attribute has a command form that takes an argument and a declaration form that
            lasts until the end of the group, and settings from different attributes combine
            freely.
          </p>

          <h3>Small Caps</h3>
          <p>
            <code>\textsc</code> sets lowercase letters as small capitals. It is the conventional
            style for author names in bibliographies, for acronyms in running text, and for the
            first words of a chapter:
          </p>

          <pre><code>{`\\textsc{Small Capitals} for names and acronyms: \\textsc{nasa}, \\textsc{unesco}

{\\scshape A declaration form for a longer passage.}

% Combine with italic (needs a font that has the face)
\\textit{\\textsc{italic small caps}}`}</code></pre>

          <p>
            The default Computer Modern (in its default OT1 encoding) and Latin Modern have no
            bold small-caps face, so <code>\textbf&#123;\textsc&#123;...&#125;&#125;</code> prints
            plain bold and writes a &ldquo;Font shape undefined&rdquo; warning to the log. With{' '}
            <code>\usepackage[T1]&#123;fontenc&#125;</code> the Computer Modern fonts do include one,
            and fonts such as TeX Gyre Pagella (<code>\usepackage&#123;tgpagella&#125;</code>) or
            Libertinus provide it in every encoding.
          </p>

          <h3>Typewriter / Monospace</h3>
          <p>
            <code>\texttt</code> switches to the typewriter family, the usual style for code, file
            names, commands and URLs. Backslashes and braces are still special inside it, so
            write <code>\textbackslash</code> for a backslash, or use <code>\verb</code>, which
            prints its argument exactly as typed:
          </p>

          <pre><code>{`Run \\texttt{pdflatex main.tex} twice to resolve references.

The \\texttt{\\textbackslash documentclass} command comes first.

Or verbatim: \\verb|\\documentclass{article}| prints everything literally.

{\\ttfamily A whole passage in typewriter type.}`}</code></pre>

          <h3>Sans-Serif</h3>
          <pre><code>{`\\textsf{Sans-serif text} for labels, UI strings and some headings.

{\\sffamily Everything in this group is sans-serif.}

% Bold sans-serif, by combining attributes
\\textsf{\\textbf{Bold sans-serif}}`}</code></pre>

          <h3>Slanted (Not the Same as Italic)</h3>
          <p>
            Slanted text is the upright design leaned to the right; italic is a separate design
            with different letterforms (compare the <em>a</em> and <em>f</em>). <code>\textsl</code>{' '}
            gives the slanted shape, <code>\textup</code> returns to upright from inside an italic
            or slanted passage, and <code>\textnormal</code> resets family, series and shape at
            once:
          </p>

          <pre><code>{`\\textsl{Slanted text} leans the upright letters.
\\textit{Italic text} uses different letterforms.
\\textit{Italic with an \\textup{upright} word inside.}
{\\bfseries\\itshape Bold italic, then \\textnormal{back to normal}.}`}</code></pre>

          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Command</th>
                <th>Declaration</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Family</td><td><code>\textrm</code></td><td><code>\rmfamily</code></td><td>Roman (serif), the default</td></tr>
              <tr><td>Family</td><td><code>\textsf</code></td><td><code>\sffamily</code></td><td>Sans-serif</td></tr>
              <tr><td>Family</td><td><code>\texttt</code></td><td><code>\ttfamily</code></td><td>Typewriter (monospace)</td></tr>
              <tr><td>Series</td><td><code>\textmd</code></td><td><code>\mdseries</code></td><td>Medium weight, the default</td></tr>
              <tr><td>Series</td><td><code>\textbf</code></td><td><code>\bfseries</code></td><td>Bold</td></tr>
              <tr><td>Shape</td><td><code>\textup</code></td><td><code>\upshape</code></td><td>Upright, the default</td></tr>
              <tr><td>Shape</td><td><code>\textit</code></td><td><code>\itshape</code></td><td>Italic</td></tr>
              <tr><td>Shape</td><td><code>\textsl</code></td><td><code>\slshape</code></td><td>Slanted</td></tr>
              <tr><td>Shape</td><td><code>\textsc</code></td><td><code>\scshape</code></td><td>Small caps</td></tr>
              <tr><td>All</td><td><code>\textnormal</code></td><td><code>\normalfont</code></td><td>Reset to the document font</td></tr>
            </tbody>
          </table>

          <h2>Font Sizes with Bold and Italics</h2>
          <p>
            Size is a fourth, separate setting. The ten size declarations run from{' '}
            <code>\tiny</code> through <code>\normalsize</code> to <code>\Huge</code>, and they
            combine with the style commands in either order. Keep a size change and its styles
            inside one group so neither leaks into the following paragraph:
          </p>

          <pre><code>{`{\\large\\bfseries A large bold heading}

{\\Large\\itshape A larger italic subtitle}

\\textbf{\\small bold and small} and \\textit{\\footnotesize italic and footnote-sized}

% From smallest to largest
{\\tiny tiny} {\\scriptsize scriptsize} {\\footnotesize footnotesize} {\\small small}
{\\normalsize normalsize} {\\large large} {\\Large Large} {\\LARGE LARGE} {\\huge huge} {\\Huge Huge}`}</code></pre>

          <p>
            The <Link href="/learn/font-size">font size guide</Link> covers the class options,{' '}
            <code>\fontsize</code> and why the sizes are relative.
          </p>

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

          <h2>Common Formatting Patterns</h2>
          <p>
            Most documents need only a handful of conventions. Deciding them once, and defining
            a command for each, keeps the formatting consistent and lets you change it in one
            place later.
          </p>

          <h3>Book Titles (Italics)</h3>
          <pre><code>{`Knuth's \\textit{The Art of Computer Programming} is the canonical reference.

% A dedicated command keeps titles consistent and easy to restyle
\\newcommand{\\booktitle}[1]{\\textit{#1}}
See \\booktitle{The TeXbook}, chapter 5.`}</code></pre>
          <p>
            Use <code>\textit</code> rather than <code>\emph</code> for titles: a title inside an
            already-italic sentence should stay italic, not flip to upright.
          </p>

          <h3>Technical Terms on First Use (Italics)</h3>
          <pre><code>{`A \\emph{monad} is a monoid in the category of endofunctors.

% Or a semantic command, so first uses can be indexed or restyled later
\\newcommand{\\term}[1]{\\emph{#1}}
The \\term{kernel} of a linear map is the set of vectors it sends to zero.`}</code></pre>

          <h3>Strong Emphasis (Bold)</h3>
          <pre><code>{`\\textbf{Warning:} this operation cannot be undone.

Run-in headings: \\textbf{Proof.} Suppose, for contradiction, that \\ldots`}</code></pre>
          <p>
            Bold stands out far more than italic, so reserve it for warnings, run-in headings
            and defined terms in a glossary. A paragraph with several bold phrases has no
            emphasis at all.
          </p>

          <h3>Code and Commands (Monospace)</h3>
          <pre><code>{`Save the file as \\texttt{main.tex} and run \\texttt{latexmk -pdf main}.

% Inline code with special characters
Use \\verb|\\section{Title}| to start a section.

% Many commands in one document: define a shorthand
\\newcommand{\\code}[1]{\\texttt{#1}}
The \\code{tabular} environment takes a column specifier.`}</code></pre>

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
                <td><code>\textsc&#123;text&#125;</code></td>
                <td>Small caps</td>
                <td>Names, acronyms; no bold face in Latin Modern or OT1 Computer Modern</td>
              </tr>
              <tr>
                <td><code>\texttt&#123;text&#125;</code></td>
                <td>Typewriter (monospace)</td>
                <td>Code, file names, commands</td>
              </tr>
              <tr>
                <td><code>\textsf&#123;text&#125;</code></td>
                <td>Sans-serif</td>
                <td>Labels, UI strings</td>
              </tr>
              <tr>
                <td><code>\textsl&#123;text&#125;</code></td>
                <td>Slanted</td>
                <td>Leaned upright letters; distinct from italic</td>
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

          <h2>Common Errors</h2>
          <p>
            These are the errors and surprises that come up most with underline, bold and italics,
            with the fix for each:
          </p>

          <table>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>Undefined control sequence</em> on <code>\uline</code> or <code>\ul</code></td>
                <td>The package is not loaded</td>
                <td><code>{`\\usepackage[normalem]{ulem}`}</code> or <code>{`\\usepackage{soul}`}</code></td>
              </tr>
              <tr>
                <td>Every <code>\emph</code> is suddenly underlined</td>
                <td><code>ulem</code> loaded without <code>[normalem]</code></td>
                <td><code>{`\\usepackage[normalem]{ulem}`}</code></td>
              </tr>
              <tr>
                <td>Underlined text runs into the margin</td>
                <td><code>\underline</code> cannot break lines</td>
                <td><code>\uline</code> or <code>\ul</code></td>
              </tr>
              <tr>
                <td><em>Argument of \@citex has an extra &#125;</em> or <em>Reconstruction failed</em> inside <code>\ul</code></td>
                <td>soul cannot split the command</td>
                <td>Brace it, <code>{`\\ul{see {\\cite{key}}}`}</code>, or <code>{`\\soulregister{\\cite}{7}`}</code></td>
              </tr>
              <tr>
                <td><code>\setulcolor</code> or <code>\hl</code> gives no colour</td>
                <td>No colour package</td>
                <td><code>{`\\usepackage{xcolor}`}</code> alongside soul</td>
              </tr>
              <tr>
                <td>Bold Greek letter is not bold</td>
                <td><code>\mathbf</code> ignores Greek</td>
                <td><code>\boldsymbol</code> or <code>\bm</code></td>
              </tr>
            </tbody>
          </table>

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

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you underline text in LaTeX?</h3>
          <p>
            Use <code>{`\\underline{text}`}</code>. It is built in and needs no package, but the
            underlined text cannot break across lines. For longer text, add{' '}
            <code>{`\\usepackage[normalem]{ulem}`}</code> to the preamble and write{' '}
            <code>{`\\uline{text}`}</code>, or load soul and write <code>{`\\ul{text}`}</code>; both
            wrap onto the next line like normal text.
          </p>
          <h3>Why does \underline run into the margin?</h3>
          <p>
            <code>\underline</code> puts its argument in a single box, and TeX never breaks a line
            inside a box, so a long underlined phrase overflows instead of wrapping. Replace it with{' '}
            <code>\uline</code> from ulem or <code>\ul</code> from soul. soul can also hyphenate the
            underlined words.
          </p>
          <h3>How do I make a double or wavy underline in LaTeX?</h3>
          <p>
            Load <code>{`\\usepackage[normalem]{ulem}`}</code> and use <code>{`\\uuline{text}`}</code>{' '}
            for a double underline and <code>{`\\uwave{text}`}</code> for a wavy one. ulem also has{' '}
            <code>\dashuline</code> and <code>\dotuline</code>. Without a package,{' '}
            <code>{`\\underline{\\underline{text}}`}</code> gives a double underline that does not
            break across lines.
          </p>
          <h3>How do I underline in math mode?</h3>
          <p>
            Use <code>\underline</code> inside the math, as in <code>{`$\\underline{x}$`}</code> or{' '}
            <code>{`$\\underline{\\underline{\\sigma}}$`}</code> for a double underline.{' '}
            <code>\uline</code> and <code>\ul</code> are text commands. To put a label under the
            underlined part, use <code>{`\\underbrace{a+b}_{\\text{label}}`}</code>.
          </p>
          <h3>How do you make text bold in LaTeX?</h3>
          <p>
            Write <code>{`\\textbf{text}`}</code> for a word or phrase, or{' '}
            <code>{`{\\bfseries ...}`}</code> for a longer passage. In math mode use{' '}
            <code>{`\\mathbf{x}`}</code> for bold upright letters and{' '}
            <code>{`\\boldsymbol{\\alpha}`}</code> (amsmath) or <code>{`\\bm{\\alpha}`}</code> (bm
            package) for bold Greek letters and symbols.
          </p>
          <h3>What is the difference between \textit and \emph?</h3>
          <p>
            <code>\textit</code> always sets italic. <code>\emph</code> means emphasis: in upright
            text it gives italics, but inside italic text it switches back to upright so the
            emphasis still shows. Use <code>\emph</code> for stressed words and{' '}
            <code>\textit</code> for titles and foreign words.
          </p>

          <h2>Next Steps</h2>
          <p>Now that you know how to format text in LaTeX, explore more topics:</p>
          <ul>
            <li><Link href="/learn/colors">Colors in LaTeX</Link> – \textcolor, \colorbox and highlighted text</li>
            <li><Link href="/learn/strikethrough">Strikethrough &amp; Cross Out</Link> – \sout, \st and \cancel for struck-through text and math</li>
            <li><Link href="/learn/quotes">LaTeX Quotation Marks &amp; Quotes</Link> – Correct quotation marks, csquotes and block quotes</li>
            <li><Link href="/learn/font-size">LaTeX Font Size</Link> – Size commands from \tiny to \Huge, class options and \fontsize, to combine with bold and italics</li>
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
  return learnMetadata(page)
}
