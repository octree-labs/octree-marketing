import type { Metadata } from 'next/types'

import { learnOgImagePath } from '@/utilities/learnMetadata'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
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
    title: 'Learn LaTeX: Tutorial for Beginners',
    description: 'Your first LaTeX document in minutes, a step-by-step learning path, what to install (or not), the preamble, math, tables, figures, citations and reading the error log.',
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
    title: 'pgfplots in LaTeX',
    description: 'Plot data and functions in LaTeX with pgfplots: line plots from coordinates and CSV files, function graphs, bar charts, legends and common errors.',
    image: '/logos/PGF.png',
    color: 'from-green-500/10 to-green-600/5',
  },
  {
    slug: 'bold-italics-underline',
    title: 'Bold, Italics & Underline',
    description: 'Bold, italic and underlined text in LaTeX with \\textbf, \\textit, \\emph and \\underline, plus small caps, monospace, font sizes and the soul and ulem packages.',
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
    title: 'Lists and Bullet Points',
    description: 'Bullet points and numbered lists in LaTeX with itemize, enumerate and description. Custom bullets, enumitem labels and spacing, inline lists and Beamer.',
    color: 'from-teal-500/10 to-teal-600/5',
  },
  {
    slug: 'document-classes',
    title: 'LaTeX Document Classes: article, report, book and Options',
    description: 'LaTeX document classes compared: article, report, book, KOMA-Script and memoir, and the options 12pt, a4paper, twoside, twocolumn, draft and landscape.',
    color: 'from-blue-500/10 to-sky-600/5',
  },
  {
    slug: 'title-page',
    title: 'Title Page in LaTeX: \\maketitle, titlepage and Custom Designs',
    description: 'Make a title page in LaTeX: \\title, \\author, \\date and \\maketitle, the titlepage environment for custom designs with a logo, a thesis example and fixes.',
    color: 'from-fuchsia-500/10 to-pink-600/5',
  },
  {
    slug: 'fonts',
    title: 'Fonts in LaTeX: Families, Sans Serif, and Changing the Font',
    description: 'Fonts in LaTeX: serif, sans serif and monospace families, \\textsf and \\sffamily, font packages like newtx and libertine, fontspec with XeLaTeX, and fixes.',
    color: 'from-amber-500/10 to-yellow-600/5',
  },
  {
    slug: 'paragraphs-indentation',
    title: 'Indentation in LaTeX: \\indent, \\noindent, parindent and Tabs',
    description: 'Indent in LaTeX: the default first-line indent, \\noindent, \\parindent and parskip, \\indent, hanging indents, indented blocks and tabs with \\hspace.',
    color: 'from-stone-500/10 to-stone-600/5',
  },
  {
    slug: 'environments',
    title: 'Environments in LaTeX: \\begin, \\end and Defining Your Own',
    description: 'LaTeX environments explained: \\begin and \\end, common environments, \\newenvironment, a numbered example environment with amsthm, arguments and fixes.',
    color: 'from-teal-500/10 to-cyan-600/5',
  },
  {
    slug: 'commands-macros',
    title: 'LaTeX Commands and Macros: \\newcommand, \\renewcommand and \\def',
    description: 'LaTeX commands and macros: define your own with \\newcommand, arguments and defaults, \\renewcommand, \\DeclareMathOperator, \\def, and 40 common LaTeX codes.',
    color: 'from-violet-500/10 to-indigo-600/5',
  },
  {
    slug: 'greek-letters-math-symbols',
    title: 'Greek Letters in LaTeX',
    description: 'All 24 Greek letters in LaTeX with uppercase, variants and Unicode, \\epsilon vs \\varepsilon, lambda, bold and upright Greek, plus every common math symbol.',
    color: 'from-indigo-500/10 to-indigo-600/5',
  },
  {
    slug: 'colors',
    title: 'Using Colors in LaTeX',
    description: 'Add colors to your LaTeX documents with the xcolor package. Text color, backgrounds, custom colors, and color mixing.',
    color: 'from-pink-500/10 to-pink-600/5',
  },
  {
    slug: 'framebox',
    title: 'Framebox and Boxed Text',
    description: 'Draw a box around text with \\fbox and \\framebox: fixed widths and alignment, empty boxes and checkboxes for forms, multi-line boxes with \\parbox and minipage, \\boxed equations and colored frames.',
    color: 'from-slate-500/10 to-slate-600/5',
  },
  {
    slug: 'mathematical-expressions',
    title: 'Inline and Display Math in LaTeX',
    description: 'Inline math with $...$ and \\(...\\), display math with \\[...\\] and equation, why $$ is discouraged, \\text in math, fractions, roots and common math errors.',
    color: 'from-violet-500/10 to-violet-600/5',
  },
  {
    slug: 'piecewise-functions',
    title: 'Piecewise Functions in LaTeX: the cases Environment',
    description: 'Write piecewise functions in LaTeX with \\begin{cases} (amsmath): \\text{if} conditions, dcases for full-size fractions, right braces, numbering and fixes.',
    color: 'from-orange-500/10 to-red-600/5',
  },
  {
    slug: 'integrals-sums-limits',
    title: 'Integrals, Sums & Limits',
    description: 'Typeset integrals, sums (\\sum), products and limits in LaTeX. From basic sigma notation to series, big operators and partial derivatives.',
    color: 'from-orange-500/10 to-orange-600/5',
  },
  {
    slug: 'matrices',
    title: 'Matrices in LaTeX',
    description: 'Matrices in LaTeX with amsmath: pmatrix and bmatrix, 2x2, 3x3 and 4x4 examples, determinants, inverse and transpose, augmented and block matrices.',
    color: 'from-emerald-500/10 to-emerald-600/5',
  },
  {
    slug: 'tables',
    title: 'LaTeX Tables',
    description: 'Make tables in LaTeX and Overleaf with booktabs, multicolumn, multirow, longtable, row and column spacing, colored tables and a table generator.',
    color: 'from-sky-500/10 to-sky-600/5',
  },
  {
    slug: 'images',
    title: 'Figures in LaTeX: \\includegraphics, Captions and References',
    description: 'Figures in LaTeX: \\includegraphics with width and scale, the figure environment, [htbp] and [H] placement, captions, \\label and \\ref, wrapfig and errors.',
    color: 'from-emerald-500/10 to-green-600/5',
  },
  {
    slug: 'subfigures',
    title: 'Subfigures in LaTeX: Side-by-Side Figures with subcaption',
    description: 'LaTeX subfigures with the subcaption package: two figures side by side, a 2×2 grid, panel captions and labels, \\ref and \\subref, legacy subfig and fixes.',
    color: 'from-green-500/10 to-emerald-600/5',
  },
  {
    slug: 'multiple-columns',
    title: 'Two Columns in LaTeX: twocolumn, multicol and \\multicolumn in Tables',
    description: 'Two columns in LaTeX: the twocolumn option, the multicol package with \\columnbreak and \\columnsep, figure* across columns, and \\multicolumn in tables.',
    color: 'from-sky-500/10 to-indigo-600/5',
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
  {
    slug: 'hyperlinks',
    title: 'LaTeX Hyperlinks',
    description: 'Clickable links in LaTeX with hyperref: \\url, \\href, email links, internal references, link colors, removing link boxes, and PDF metadata.',
    color: 'from-yellow-500/10 to-yellow-600/5',
  },
  {
    slug: 'comments',
    title: 'LaTeX Comments',
    description: 'Single-line comments with %, block comments with the comment package and \\iffalse, editor shortcuts, todonotes, and draft/final switches.',
    color: 'from-slate-500/10 to-slate-600/5',
  },
  {
    slug: 'page-numbering',
    title: 'LaTeX Page Numbering',
    description: 'Roman and arabic page numbers, starting at a given page, removing the number on the title page, fancyhdr footers, "Page X of Y" and Beamer frame numbers.',
    color: 'from-stone-500/10 to-stone-600/5',
  },
  {
    slug: 'horizontal-lines',
    title: 'Horizontal Line in LaTeX',
    description: '\\hrule, \\rule and \\hrulefill, partial and centred lines, colored and dashed rules, table rules with booktabs, header rules and signature lines.',
    color: 'from-zinc-500/10 to-zinc-600/5',
  },
  {
    slug: 'quotes',
    title: 'Quotes in LaTeX',
    description: 'The ``double\'\' and `single\' convention, csquotes \\enquote and \\textquote, German and French quotes, quote and quotation environments, block quotes with attribution and Beamer.',
    color: 'from-neutral-500/10 to-neutral-600/5',
  },
  {
    slug: 'strikethrough',
    title: 'Strikethrough & Cross Out',
    description: 'Strike through text with ulem \\sout and soul \\st, cancel terms in math with the cancel package, cross out in tables and Beamer, and track changes.',
    color: 'from-gray-500/10 to-gray-600/5',
  },
  {
    slug: 'font-size',
    title: 'Font Size in LaTeX',
    description: 'Change font size in LaTeX: the ten size commands from \\tiny to \\Huge with exact point sizes, class options, extsizes, \\fontsize, and sizes for captions, footnotes and headings.',
    color: 'from-orange-500/10 to-amber-600/5',
  },
  {
    slug: 'equation-numbering',
    title: 'Equation Numbering & Referencing',
    description: 'Number, label and reference equations with \\label, \\eqref and cleveref, number per section, add custom tags, and break long equations with align, split and multline.',
    color: 'from-blue-500/10 to-indigo-600/5',
  },
  {
    slug: 'special-characters',
    title: 'Special Characters in LaTeX',
    description: 'Print the reserved characters # $ % & _ { } ~ ^ \\, the pipe, < and >, underscores in URLs and file names, inverted ?/!, degree, copyright and currency signs, and fix the errors they cause.',
    color: 'from-rose-500/10 to-pink-600/5',
  },
  {
    slug: 'brackets',
    title: 'Brackets & Parentheses',
    description: 'Every delimiter from ( ) to \\langle \\rangle, curly braces (accolades) in text, automatic sizing with \\left \\right, manual \\big to \\Bigg, matrix brackets, cases and \\underbrace.',
    color: 'from-cyan-500/10 to-sky-600/5',
  },
  {
    slug: 'underbrace-overbrace',
    title: 'Underbrace and Overbrace in LaTeX: \\underbrace, \\overbrace and Annotations',
    description: 'Underbrace in LaTeX: \\underbrace{a+b}_{\\text{sum}}, \\overbrace with labels, nested and overlapping braces, \\underset, \\overset, \\underbracket and errors.',
    color: 'from-cyan-500/10 to-blue-600/5',
  },
  {
    slug: 'multiline-equations',
    title: 'Multiline Equations in LaTeX',
    description: 'New lines in equations, align math with align and align*, split, multline, gather and cases, nest aligned blocks, add text between lines, allow page breaks, and retire eqnarray.',
    color: 'from-violet-500/10 to-purple-600/5',
  },
  {
    slug: 'sections',
    title: 'Sections & Headings',
    description: 'The heading hierarchy per class, unnumbered sections that still appear in the TOC, secnumdepth and tocdepth, custom numbering, titlesec formatting, \\appendix and hyperref links.',
    color: 'from-lime-500/10 to-green-600/5',
  },
  {
    slug: 'appendix',
    title: 'Appendix in LaTeX: \\appendix, Numbering and the appendix Package',
    description: 'Appendix in LaTeX: \\appendix for lettered sections and chapters, the appendix package, appendices in the table of contents, equation numbering and errors.',
    color: 'from-lime-500/10 to-lime-600/5',
  },
  {
    slug: 'code-listings',
    title: 'Code Listings in LaTeX: listings, minted and verbatim',
    description: 'Code in LaTeX: lstlisting with language=Python, \\lstinputlisting, \\lstset styling, minted and -shell-escape, verbatim, \\verb and \\lstinline, plus errors.',
    color: 'from-slate-500/10 to-zinc-600/5',
  },
  {
    slug: 'algorithms',
    title: 'Algorithms in LaTeX: algorithm2e, algorithmic and algpseudocode',
    description: 'Write pseudocode in LaTeX: algorithm with algpseudocode (\\State, \\If, \\For), algorithm2e, the old algorithmic, line numbers, captions and errors.',
    color: 'from-purple-500/10 to-violet-600/5',
  },
  {
    slug: 'theorems-proofs',
    title: 'Theorems, Lemmas & Proofs',
    description: 'Set up amsthm and \\newtheorem, share theorem and lemma counters, write proofs, and set the end of proof symbol (∎) with \\qedsymbol and \\qedhere.',
    color: 'from-emerald-500/10 to-teal-600/5',
  },
  {
    slug: 'glossaries-acronyms',
    title: 'Glossaries, Acronyms & Abbreviations',
    description: 'The glossaries package (\\newacronym, \\gls, \\printglossaries, makeglossaries and latexmk), the simpler acronym package, nomencl for symbol lists, sorting and common errors.',
    color: 'from-violet-500/10 to-purple-600/5',
  },
  {
    slug: 'math-functions',
    title: 'Math Functions: log, exp, argmax, abs, norm',
    description: '\\log, \\ln, \\exp and every predefined operator, argmax with \\DeclareMathOperator*, floor and ceiling, absolute value and norms with mathtools, roots, fractions and function notation.',
    color: 'from-sky-500/10 to-cyan-600/5',
  },
  {
    slug: 'molecular-orbital-diagrams',
    title: 'Molecular Orbital Diagrams',
    description: 'Read and fill MO diagrams for H2, O2, N2 and CO with bond orders, then draw them with the modiagram package, pure TikZ, chemfig Lewis structures and mhchem formulas.',
    color: 'from-lime-500/10 to-green-600/5',
  },
  {
    slug: 'laplace-transform-table',
    title: 'Laplace Transform Table',
    description: '26 Laplace transform pairs with regions of convergence, every property and theorem, worked inverse transforms by partial fractions, and the LaTeX source for the table.',
    color: 'from-indigo-500/10 to-blue-600/5',
  },
  {
    slug: 'derivative-rules',
    title: 'Derivative Rules',
    description: 'Power, product, quotient and chain rules, a table of common and trig derivatives, the six inverse trig derivatives, worked examples and the LaTeX for every formula.',
    color: 'from-amber-500/10 to-orange-600/5',
  },
  {
    slug: 'apa-headings',
    title: 'APA Headings',
    description: 'The five APA 7 heading levels with exact formatting, the rules for choosing a level, a worked outline of a student paper, and the headings in LaTeX with apa7 or titlesec.',
    color: 'from-rose-500/10 to-red-600/5',
  },
  {
    slug: 'ama-citation-format',
    title: 'AMA Citation Format',
    description: 'Superscript in-text citations, the numbered reference list, examples for journal articles, books, chapters, websites and reports, AMA vs APA vs Vancouver, and AMA citations in LaTeX.',
    color: 'from-rose-500/10 to-red-600/5',
  },
  {
    slug: 'mla-in-text-citation',
    title: 'MLA In-Text Citation',
    description: 'The author-page rule, one to three-plus authors, corporate and missing authors, no page numbers, qtd. in, block quotes, repeat citations, a ten-example table and MLA citations in LaTeX with biblatex-mla.',
    color: 'from-rose-500/10 to-red-600/5',
  },
  {
    slug: 'mla-book-citation',
    title: 'MLA Book Citation',
    description: 'The Works Cited pattern for a book, examples for one or more authors, edited, translated, later-edition, e-book, multivolume and no-author books with their in-text forms, and a generated Works Cited in LaTeX.',
    color: 'from-rose-500/10 to-red-600/5',
  },
  {
    slug: 'bibliography-examples',
    title: 'Bibliography Examples',
    description: 'APA 7, MLA 9, Chicago and IEEE bibliography entries with the BibTeX source for each, complete thebibliography, BibTeX and biblatex documents, an annotated bibliography example and the common errors.',
    color: 'from-rose-500/10 to-fuchsia-600/5',
  },
  {
    slug: 'blackboard-bold',
    title: 'Blackboard Bold in LaTeX',
    description: '\\mathbb{R} with amssymb, all 26 letters with their Unicode code points, lowercase letters and the indicator 1 with dsfont, bbm and bbold, \\symbb with unicode-math, bold vs blackboard bold, and the common mistakes.',
    color: 'from-indigo-500/10 to-indigo-600/5',
  },
  {
    slug: 'approximately-equal',
    title: 'Approximately Equal Symbol (≈)',
    description: 'What ≈ means, ≈ vs ~ vs ≃ vs ≅ with Unicode code points, how to type it on Windows, Mac, iPhone, Android and in HTML, and \\approx, \\not\\approx, \\sim and the amssymb variants in LaTeX.',
    color: 'from-teal-500/10 to-emerald-600/5',
  },
  {
    slug: 'table-of-contents',
    title: 'Table of Contents in LaTeX',
    description: 'A complete table of contents example, \\tableofcontents and the .toc file, tocdepth vs secnumdepth, unnumbered entries, hyperref links, renaming, tocloft styling, lists of figures and Beamer outlines.',
    color: 'from-lime-500/10 to-green-600/5',
  },
  {
    slug: 'beamer-footnote',
    title: 'Footnotes in Beamer',
    description: 'Footnotes on Beamer slides: \\footnote[frame] in columns, footnotes without a number, smaller size and color, per-frame numbering, overlays, title-page \\thanks and \\footcite.',
    color: 'from-lime-500/10 to-lime-600/5',
  },
  {
    slug: 'beamer',
    title: 'Beamer Presentations',
    description: 'Slides in LaTeX with Beamer: frames, themes and color themes, overlays with \\pause and \\only, columns and blocks, title page and sections, handouts and speaker notes.',
    color: 'from-sky-500/10 to-blue-600/5',
  },
  {
    slug: 'spacing',
    title: 'Spacing in LaTeX',
    description: 'Horizontal and vertical spacing: \\hspace, \\vspace, \\quad, the math spaces \\, \\: \\; \\! with their widths, line spacing with setspace and paragraph spacing.',
    color: 'from-stone-500/10 to-zinc-600/5',
  },
  {
    slug: 'xelatex',
    title: 'XeLaTeX: Unicode, System Fonts and When to Use It',
    description: 'XeLaTeX vs pdfLaTeX vs LuaLaTeX, system fonts with fontspec and \\setmainfont, Unicode input, polyglossia for RTL languages, xeCJK and common errors.',
    color: 'from-rose-500/10 to-orange-600/5',
  },
  {
    slug: 'languages',
    title: 'Languages in LaTeX: babel, polyglossia, Spanish, Arabic and More',
    description: 'LaTeX in any language: babel for pdfLaTeX, polyglossia for XeLaTeX, Spanish, French, German, Arabic and Hebrew, Chinese and Japanese, Russian, Greek.',
    color: 'from-yellow-500/10 to-amber-600/5',
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

