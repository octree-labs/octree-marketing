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

const breadcrumbs = getLearnBreadcrumbs('Fonts in LaTeX', 'fonts')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'fonts',
  title: 'Fonts in LaTeX: Families, Sans Serif, and Changing the Font',
  seoTitle: 'Fonts in LaTeX: Sans Serif and Changing the Font',
  description: 'Fonts in LaTeX: serif, sans serif and monospace families, \\textsf and \\sffamily, font packages like newtx and libertine, fontspec with XeLaTeX, and fixes.',
  keywords: 'fonts latex, fonts in latex, latex fonts, latex font, sans serif latex, latex sans serif, latex sans serif font, textsf, sffamily, rmfamily, ttfamily, familydefault sfdefault, latex change font, latex font packages, lmodern, helvet, times new roman latex, newtx, mathptmx, libertine, palatino latex, fontspec, setmainfont, xelatex font, lualatex font, latex font encoding, t1 fontenc, ot1, fontfamily selectfont, latex font not found',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'What is the default font in LaTeX?',
    answer:
      'Computer Modern, designed by Donald Knuth for TeX. It has a serif (roman) family, a sans serif family and a typewriter family, plus matching math fonts. Latin Modern, loaded with \\usepackage{lmodern}, is the same design in a modern scalable format and is the default in XeLaTeX and LuaLaTeX with fontspec.',
  },
  {
    question: 'How do I make text sans serif in LaTeX?',
    answer:
      'For a few words use \\textsf{text}. For a longer passage, switch with \\sffamily inside a group: {\\sffamily text}. For the whole document add \\renewcommand{\\familydefault}{\\sfdefault} to the preamble, optionally after a sans serif package such as \\usepackage[scaled]{helvet}.',
  },
  {
    question: 'How do I use Times New Roman in LaTeX?',
    answer:
      'With pdfLaTeX, load \\usepackage{newtxtext,newtxmath}, which gives a Times clone for text and matching math. With XeLaTeX or LuaLaTeX, load fontspec and write \\setmainfont{Times New Roman} if the font is installed on your system, or use the TeX Gyre Termes files that ship with TeX Live.',
  },
  {
    question: 'How do I change the font of the whole document?',
    answer:
      'Load a font package in the preamble, for example \\usepackage{newtxtext,newtxmath} for Times, \\usepackage{newpxtext,newpxmath} for Palatino or \\usepackage{libertine} for Linux Libertine. With XeLaTeX or LuaLaTeX you can use any OpenType or TrueType font with \\usepackage{fontspec} and \\setmainfont{Font Name}.',
  },
  {
    question: 'What does \\usepackage[T1]{fontenc} do?',
    answer:
      'It switches pdfLaTeX from the old OT1 encoding to T1, whose fonts contain accented letters as single glyphs. Words with accents then hyphenate correctly, copy and paste from the PDF works, and characters such as < and > print correctly in text. Load it together with lmodern or another font package. XeLaTeX and LuaLaTeX do not need it.',
  },
  {
    question: 'Why does fontspec say the font cannot be found?',
    answer:
      'fontspec looks the name up among the fonts installed on the system, and the name must match exactly. Check the spelling, install the font, or load it by file name instead: \\setmainfont{texgyretermes-regular.otf} or \\setmainfont{MyFont}[Path=./fonts/, Extension=.ttf] for a font file uploaded with the project. fontspec also needs XeLaTeX or LuaLaTeX; it fails under pdfLaTeX.',
  },
]

export default async function LearnFontsPage() {
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
          <h1>Fonts in LaTeX: Families, Sans Serif, and Changing the Font</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Sans serif:</strong> <code>{`\\textsf{text}`}</code> for a few words,{' '}
                <code>\sffamily</code> for the rest of a group. Back to serif:{' '}
                <code>\rmfamily</code>; monospace: <code>\ttfamily</code> or{' '}
                <code>{`\\texttt{...}`}</code>.
              </li>
              <li>
                <strong>Whole document sans serif:</strong>{' '}
                <code>{`\\renewcommand{\\familydefault}{\\sfdefault}`}</code>.
              </li>
              <li>
                <strong>Another font (pdfLaTeX):</strong> load a package, e.g.{' '}
                <code>lmodern</code>, <code>helvet</code>, <code>newtxtext</code> (Times),{' '}
                <code>newpxtext</code> (Palatino) or <code>libertine</code>.
              </li>
              <li>
                <strong>Any installed font (XeLaTeX / LuaLaTeX):</strong>{' '}
                <code>{`\\usepackage{fontspec}`}</code> and{' '}
                <code>{`\\setmainfont{Font Name}`}</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}

\\begin{document}
Roman (serif) text, \\textsf{sans serif text} and \\texttt{monospace text}.

{\\sffamily This whole paragraph is sans serif,
until the group ends.}
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Fonts in LaTeX are organized in three families: roman (serif), sans serif and
            typewriter (monospace). Commands switch between the families, and a font package
            or <code>fontspec</code> decides which typeface each family uses. This guide covers
            the family commands, making text or a whole document sans serif, the font packages
            worth knowing for pdfLaTeX, system fonts with XeLaTeX and LuaLaTeX, font encodings,
            and the font errors that come up most. Every snippet compiles as shown.
          </p>

          {/* ── Families ── */}
          <h2>Font Families in LaTeX</h2>
          <p>
            Every font in LaTeX has a family, a series (weight), a shape and a size, and each
            can be changed on its own. The family commands come in two forms: a command with an
            argument for a few words, and a declaration that applies until the end of the
            current group or environment:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Family</th>
                  <th>Command</th>
                  <th>Declaration</th>
                  <th>Default (Computer Modern)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Roman / serif</td><td><code>{`\\textrm{...}`}</code></td><td><code>\rmfamily</code></td><td>CM Roman</td></tr>
                <tr><td>Sans serif</td><td><code>{`\\textsf{...}`}</code></td><td><code>\sffamily</code></td><td>CM Sans Serif</td></tr>
                <tr><td>Typewriter / monospace</td><td><code>{`\\texttt{...}`}</code></td><td><code>\ttfamily</code></td><td>CM Typewriter</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\textrm{Roman}, \\textsf{sans serif} and \\texttt{typewriter} in one line.

{\\sffamily A sans serif paragraph with \\textbf{bold} and \\textit{italic},
which keep the sans serif family.}

\\begin{center}
  \\ttfamily Everything in this environment is monospace.
\\end{center}
\\end{document}`}</code></pre>
          <p>
            Family, series and shape combine: <code>{`\\textsf{\\textbf{...}}`}</code> is bold
            sans serif. Weight and shape are covered in{' '}
            <Link href="/learn/bold-italics-underline">bold, italics and underline</Link>, and
            sizes in <Link href="/learn/font-size">LaTeX font size</Link>.
          </p>

          {/* ── Sans serif ── */}
          <h2>Sans Serif in LaTeX</h2>
          <p>
            To set a heading, a table or a single word in sans serif, use{' '}
            <code>\textsf</code> or <code>\sffamily</code>. To make sans serif the main font of
            the document, redefine <code>\familydefault</code>, which tells LaTeX which family
            the body text uses:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage[scaled=0.92]{helvet}               % Helvetica clone as the sans serif
\\renewcommand{\\familydefault}{\\sfdefault}      % body text in sans serif

\\begin{document}
\\section{A sans serif document}
All body text is now sans serif. \\textrm{\\textbackslash textrm} still gives serif.

Math is unchanged: $f(x) = x^2 + \\sin x$.
\\end{document}`}</code></pre>
          <p>
            Without a package, <code>\sfdefault</code> is Computer Modern Sans; with{' '}
            <code>helvet</code> it is a Helvetica clone (the <code>scaled</code> option matches
            its height to the serif font). Other good sans serif packages are{' '}
            <code>{`\\usepackage[default]{sourcesanspro}`}</code> and{' '}
            <code>{`\\usepackage[sfdefault]{FiraSans}`}</code>, whose <code>default</code> /{' '}
            <code>sfdefault</code> option sets <code>\familydefault</code> for you.
          </p>
          <p>
            Math stays serif, because math fonts are chosen separately. Use{' '}
            <code>{`\\mathsf{x}`}</code> for single sans serif symbols, or the{' '}
            <code>sansmath</code> package for whole formulas:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{sansmath}
\\renewcommand{\\familydefault}{\\sfdefault}

\\begin{document}
Serif math: $f(x) = \\alpha x^2$.

\\sansmath
Sans serif math from here on: $f(x) = \\alpha x^2$.
\\end{document}`}</code></pre>

          {/* ── Packages ── */}
          <h2>Changing the Font with a Package (pdfLaTeX)</h2>
          <p>
            With pdfLaTeX, the usual engine, you change fonts by loading a package in the
            preamble. Most packages replace the roman family, some also the sans serif,
            typewriter and math fonts. Load <code>{`\\usepackage[T1]{fontenc}`}</code> with them
            (see <a href="#font-encoding">font encoding</a> below):
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Typeface</th>
                  <th>Package</th>
                  <th>Replaces</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Latin Modern</td><td><code>{`\\usepackage{lmodern}`}</code></td><td>All families</td><td>The default look, scalable; use with T1</td></tr>
                <tr><td>Times</td><td><code>{`\\usepackage{newtxtext,newtxmath}`}</code></td><td>Text and math</td><td>The modern choice for &ldquo;Times New Roman&rdquo;; <code>mathptmx</code> is the older one</td></tr>
                <tr><td>Palatino</td><td><code>{`\\usepackage{newpxtext,newpxmath}`}</code></td><td>Text and math</td><td>Successor of <code>mathpazo</code></td></tr>
                <tr><td>Helvetica</td><td><code>{`\\usepackage[scaled]{helvet}`}</code></td><td>Sans serif</td><td>Add <code>\familydefault</code> to use it for the body</td></tr>
                <tr><td>Linux Libertine / Biolinum</td><td><code>{`\\usepackage{libertine}`}</code></td><td>Roman, sans, mono</td><td>Pair with <code>libertinust1math</code> for math</td></tr>
                <tr><td>Charter</td><td><code>{`\\usepackage{XCharter}`}</code></td><td>Roman</td><td>Sturdy, very readable on screen</td></tr>
                <tr><td>TeX Gyre Pagella / Termes / Heros</td><td><code>tgpagella</code>, <code>tgtermes</code>, <code>tgheros</code></td><td>One family each</td><td>Palatino, Times and Helvetica clones</td></tr>
                <tr><td>EB Garamond</td><td><code>{`\\usepackage{ebgaramond}`}</code></td><td>Roman</td><td>Classic book typeface</td></tr>
                <tr><td>Source Sans Pro</td><td><code>{`\\usepackage[default]{sourcesanspro}`}</code></td><td>Sans serif, as body</td><td>Clean sans for reports and slides</td></tr>
                <tr><td>Fira Sans</td><td><code>{`\\usepackage[sfdefault]{FiraSans}`}</code></td><td>Sans serif, as body</td><td>Popular with the metropolis Beamer theme</td></tr>
                <tr><td>Inconsolata</td><td><code>{`\\usepackage[varqu]{zi4}`}</code></td><td>Typewriter</td><td>Readable monospace for code listings</td></tr>
                <tr><td>Courier</td><td><code>{`\\usepackage{courier}`}</code></td><td>Typewriter</td><td>The classic typewriter look</td></tr>
              </tbody>
            </table>
          </div>
          <p>A complete preamble with Times text, matching math and a Helvetica sans serif:</p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage{newtxtext,newtxmath}   % Times for text and math
\\usepackage[scaled=0.92]{helvet}   % Helvetica for \\textsf
\\usepackage[varqu]{zi4}            % Inconsolata for \\texttt

\\begin{document}
\\section{Times, Helvetica and Inconsolata}
Body text in Times, with math to match: $\\int_0^1 x^2\\,dx = \\tfrac{1}{3}$.

\\textsf{A sans serif label} and \\texttt{monospace code}.
\\end{document}`}</code></pre>
          <p>
            To use a different font for just one passage, select a family by its internal
            code: <code>{`{\\fontfamily{ppl}\\selectfont ...}`}</code>. Common codes are{' '}
            <code>ptm</code> (Times), <code>ppl</code> (Palatino), <code>phv</code>{' '}
            (Helvetica), <code>pcr</code> (Courier), <code>pbk</code> (Bookman),{' '}
            <code>pag</code> (Avant Garde) and <code>lmss</code> (Latin Modern Sans). The blog
            post on{' '}
            <Link href="/blog/latex-font-packages-lmodern-times-palatino">LaTeX font packages</Link>{' '}
            compares the main typefaces side by side.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\begin{document}
Default font.
{\\fontfamily{ppl}\\selectfont This sentence is in Palatino.}
{\\fontfamily{pbk}\\selectfont This one is in Bookman.}
Back to the default font.
\\end{document}`}</code></pre>

          <div className="not-prose my-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Try a font without installing anything</h3>
            <p className="text-muted-foreground mb-4">
              Paste a preamble into Octree, switch between <code>newtx</code>,{' '}
              <code>libertine</code> and <code>helvet</code>, and compare the PDF in seconds.
              Sign up free; the full TeX Live font collection is already there.
            </p>
            <Link
              href="https://app.useoctree.com"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Open Octree &rarr;
            </Link>
          </div>

          {/* ── fontspec ── */}
          <h2>Fonts in XeLaTeX and LuaLaTeX: fontspec and \setmainfont</h2>
          <p>
            XeLaTeX and LuaLaTeX can use any OpenType (<code>.otf</code>) or TrueType{' '}
            (<code>.ttf</code>) font. The <code>fontspec</code> package sets one font per
            family: <code>\setmainfont</code> (roman), <code>\setsansfont</code> and{' '}
            <code>\setmonofont</code>. Loading a font by its file name works on any
            installation:
          </p>
          <pre><code>{`% Compile with XeLaTeX or LuaLaTeX
\\documentclass{article}
\\usepackage{fontspec}
\\setmainfont{texgyrepagella}[
  Extension      = .otf,
  UprightFont    = *-regular,
  BoldFont       = *-bold,
  ItalicFont     = *-italic,
  BoldItalicFont = *-bolditalic]
\\setsansfont{texgyreheros}[
  Extension      = .otf,
  UprightFont    = *-regular,
  BoldFont       = *-bold,
  ItalicFont     = *-italic,
  BoldItalicFont = *-bolditalic]

\\begin{document}
Body text in TeX Gyre Pagella, with \\textbf{bold} and \\textit{italic}.
\\textsf{Sans serif in TeX Gyre Heros.}
\\end{document}`}</code></pre>
          <p>
            The TeX Gyre files ship with TeX Live, so this example compiles anywhere. For fonts installed in your
            operating system, the family name is shorter:{' '}
            <code>{`\\setmainfont{Times New Roman}`}</code>,{' '}
            <code>{`\\setsansfont{Arial}`}</code> or <code>{`\\setmainfont{Libertinus Serif}`}</code>.
            For a font file uploaded with the project, point <code>Path</code> at its folder:{' '}
            <code>{`\\setmainfont{MyFont}[Path=./fonts/, Extension=.ttf, UprightFont=*-Regular, BoldFont=*-Bold]`}</code>.
          </p>
          <p>
            For math in the same style, load <code>unicode-math</code> and pick a math font
            with <code>\setmathfont</code>, for example{' '}
            <code>{`\\setmathfont{texgyrepagella-math.otf}`}</code>. Do not combine{' '}
            <code>fontspec</code> with <code>fontenc</code> or with pdfLaTeX font packages such
            as <code>newtxtext</code>.
          </p>

          {/* ── Encoding ── */}
          <h2 id="font-encoding">Font Encoding: OT1 vs T1</h2>
          <p>
            pdfLaTeX starts in the old <code>OT1</code> encoding, whose fonts have only 128
            characters. Accented letters are then built from a letter and an accent, which
            breaks hyphenation of words such as &ldquo;Universit&auml;t&rdquo;, makes them
            impossible to search or copy from the PDF, and turns <code>&lt;</code> and{' '}
            <code>&gt;</code> in text into &iexcl; and &iquest;. The <code>T1</code> encoding fixes
            all of that:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}   % 256-glyph fonts with real accented letters
\\usepackage{lmodern}       % scalable fonts in T1 (avoids bitmap fonts)

\\begin{document}
Universität, café, naïve and résumé hyphenate and copy correctly.
Comparisons in text: a < b and c > d.
\\end{document}`}</code></pre>
          <p>
            <code>lmodern</code> matters here: without it, T1 text in Computer Modern may be
            embedded as blurry bitmap (Type 3) fonts on installations without{' '}
            <code>cm-super</code>. XeLaTeX and LuaLaTeX use Unicode fonts and need neither
            line. Special characters that are not on the keyboard are listed in{' '}
            <Link href="/learn/special-characters">special characters in LaTeX</Link>.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Message or symptom</th>
                  <th>Cause</th>
                  <th>Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><em>Package fontspec Error: The font &ldquo;Times New Roman&rdquo; cannot be found</em></td>
                  <td>The font is not installed on the machine that compiles, or the name is misspelled</td>
                  <td>Install or upload the font and load it by file name with <code>Path</code>, or use a TeX Live font such as <code>texgyretermes</code></td>
                </tr>
                <tr>
                  <td><em>Fatal Package fontspec Error: The fontspec package requires either XeTeX or LuaTeX</em></td>
                  <td>Compiling with pdfLaTeX</td>
                  <td>Switch the compiler to XeLaTeX or LuaLaTeX, or use a pdfLaTeX font package instead</td>
                </tr>
                <tr>
                  <td><em>LaTeX Font Warning: Font shape `T1/xyz/m/n&apos; undefined, using `T1/cmr/m/n&apos; instead</em></td>
                  <td>Unknown family code in <code>\fontfamily</code>, or a font package not installed</td>
                  <td>Check the code (<code>ppl</code>, <code>ptm</code>, <code>phv</code>&hellip;) or load the package that provides it</td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Command `\Bbbk&apos; already defined</em></td>
                  <td><code>amssymb</code> loaded after <code>newtxmath</code> (or <code>newpxmath</code>), which already define its symbols</td>
                  <td>Load <code>amssymb</code> before the math font package, or drop it</td>
                </tr>
                <tr>
                  <td>Accented words do not hyphenate, copy as two characters, or &lt; prints as &iexcl;</td>
                  <td>The default OT1 encoding</td>
                  <td><code>{`\\usepackage[T1]{fontenc}`}</code> with <code>lmodern</code></td>
                </tr>
                <tr>
                  <td>Text looks blurry or pixelated in the PDF</td>
                  <td>Bitmap (Type 3) fonts from T1 Computer Modern without <code>cm-super</code></td>
                  <td><code>{`\\usepackage{lmodern}`}</code></td>
                </tr>
                <tr>
                  <td>Bold or small caps silently missing</td>
                  <td>The font has no such shape and LaTeX substituted another (check the log for <em>Font shape &hellip; undefined</em>)</td>
                  <td>Choose a font that has the shape, e.g. <code>newtx</code> or <code>libertine</code> for bold small caps</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What is the default font in LaTeX?</h3>
          <p>
            Computer Modern, designed by Donald Knuth for TeX. It has a serif (roman) family, a
            sans serif family and a typewriter family, plus matching math fonts. Latin Modern,
            loaded with <code>{`\\usepackage{lmodern}`}</code>, is the same design in a modern
            scalable format and is the default in XeLaTeX and LuaLaTeX with{' '}
            <code>fontspec</code>.
          </p>
          <h3>How do I make text sans serif in LaTeX?</h3>
          <p>
            For a few words use <code>{`\\textsf{text}`}</code>. For a longer passage, switch
            with <code>\sffamily</code> inside a group: <code>{`{\\sffamily text}`}</code>. For
            the whole document add <code>{`\\renewcommand{\\familydefault}{\\sfdefault}`}</code>{' '}
            to the preamble, optionally after a sans serif package such as{' '}
            <code>{`\\usepackage[scaled]{helvet}`}</code>.
          </p>
          <h3>How do I use Times New Roman in LaTeX?</h3>
          <p>
            With pdfLaTeX, load <code>{`\\usepackage{newtxtext,newtxmath}`}</code>, which gives a
            Times clone for text and matching math. With XeLaTeX or LuaLaTeX, load{' '}
            <code>fontspec</code> and write <code>{`\\setmainfont{Times New Roman}`}</code> if
            the font is installed on your system, or use the TeX Gyre Termes files that ship
            with TeX Live.
          </p>
          <h3>How do I change the font of the whole document?</h3>
          <p>
            Load a font package in the preamble, for example{' '}
            <code>{`\\usepackage{newtxtext,newtxmath}`}</code> for Times,{' '}
            <code>{`\\usepackage{newpxtext,newpxmath}`}</code> for Palatino or{' '}
            <code>{`\\usepackage{libertine}`}</code> for Linux Libertine. With XeLaTeX or
            LuaLaTeX you can use any OpenType or TrueType font with{' '}
            <code>{`\\usepackage{fontspec}`}</code> and <code>{`\\setmainfont{Font Name}`}</code>.
          </p>
          <h3>What does \usepackage[T1]&#123;fontenc&#125; do?</h3>
          <p>
            It switches pdfLaTeX from the old OT1 encoding to T1, whose fonts contain accented
            letters as single glyphs. Words with accents then hyphenate correctly, copy and
            paste from the PDF works, and characters such as &lt; and &gt; print correctly in
            text. Load it together with <code>lmodern</code> or another font package. XeLaTeX
            and LuaLaTeX do not need it.
          </p>
          <h3>Why does fontspec say the font cannot be found?</h3>
          <p>
            <code>fontspec</code> looks the name up among the fonts installed on the system, and
            the name must match exactly. Check the spelling, install the font, or load it by
            file name instead: <code>{`\\setmainfont{texgyretermes-regular.otf}`}</code> or{' '}
            <code>{`\\setmainfont{MyFont}[Path=./fonts/, Extension=.ttf]`}</code> for a font
            file uploaded with the project. <code>fontspec</code> also needs XeLaTeX or
            LuaLaTeX; it fails under pdfLaTeX.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/font-size">LaTeX Font Size</Link> &ndash; From <code>\tiny</code> to <code>\Huge</code> and exact sizes with <code>\fontsize</code></li>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> &ndash; Font weight and shape</li>
            <li><Link href="/blog/latex-font-packages-lmodern-times-palatino">LaTeX Font Packages (blog)</Link> &ndash; Latin Modern, Times, Palatino and more compared</li>
            <li><Link href="/blog/mathematical-fonts-latex-typography-guide">Math Fonts in LaTeX (blog)</Link> &ndash; Blackboard bold, calligraphic and math font packages</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; Colored text with xcolor</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics every document builds on</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compare font packages with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe the look you want and get the preamble</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">LaTeX Templates</Link> &ndash; Documents with the fonts already set up</li>
          </ul>

          <RelatedPosts searchTerm="Font" title="Related Font Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Get the font right with AI</h3>
            <p className="text-muted-foreground mb-4">
              Tell Octree&apos;s AI which typeface you want and it picks the package, sets up
              the preamble and explains any font warnings, with the PDF compiled next to your
              code.
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
