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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Font Size', 'font-size')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'font-size',
  title: 'LaTeX Font Size: Commands, Document Options and \\fontsize',
  seoTitle: 'LaTeX Font Size: Commands, Options and \\fontsize',
  description: 'How to change font size in LaTeX: the ten size commands from \\tiny to \\Huge with their point sizes, the 10pt/11pt/12pt class options and extsizes, exact sizes with \\fontsize and \\selectfont, sizing captions, footnotes, headers and section titles, font size in math and Beamer, and fixing "font shape not available" warnings.',
  keywords: 'latex font size, fontsize latex, latex text sizes, latex font size command, latex change font size, latex tiny, latex huge, latex large, latex small, latex fontsize selectfont, latex 14pt, extsizes, extarticle, latex caption font size, latex footnote size, latex section font size, latex math font size, beamer font size, relsize, latex font shape not available',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

export default async function LaTeXFontSizePage() {
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
          <h1>LaTeX Font Size: Commands, Document Options and \fontsize</h1>
          <p className="lead">
            LaTeX controls font size at two levels. The document class option (
            <code>10pt</code>, <code>11pt</code>, <code>12pt</code>) sets the base size for the
            whole document, and ten relative commands from <code>\tiny</code> to{' '}
            <code>\Huge</code> scale individual passages up or down from that base. When neither is
            enough, <code>\fontsize</code> sets an exact point size. This guide covers all three,
            the actual point values behind each command, how to size captions, footnotes, headers
            and section titles, font size in math mode and in Beamer, and the errors that come up
            when a size is not available.
          </p>

          {/* ── Size commands ── */}
          <h2>The Ten Font Size Commands</h2>
          <p>
            Every standard class defines the same ten size commands. They are <em>declarations</em>:
            each one switches the size for everything that follows until the end of the current
            group or environment. The usual way to apply one is inside braces:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

{\\tiny tiny} {\\scriptsize scriptsize} {\\footnotesize footnotesize}
{\\small small} {\\normalsize normalsize} {\\large large}
{\\Large Large} {\\LARGE LARGE} {\\huge huge} {\\Huge Huge}

\\end{document}`}</code></pre>
          <p>
            The commands are relative, not absolute. <code>\large</code> means &ldquo;one step
            above the body size&rdquo;, so the point size it produces depends on the class option.
            The table below gives the exact values for the standard classes (<code>article</code>,{' '}
            <code>report</code>, <code>book</code>); the second number in each cell is the
            baseline skip, the distance between lines.
          </p>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>10pt (default)</th>
                <th>11pt</th>
                <th>12pt</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\tiny</code></td><td>5 / 6</td><td>6 / 7</td><td>6 / 7</td></tr>
              <tr><td><code>\scriptsize</code></td><td>7 / 8</td><td>8 / 9.5</td><td>8 / 9.5</td></tr>
              <tr><td><code>\footnotesize</code></td><td>8 / 9.5</td><td>9 / 11</td><td>10 / 12</td></tr>
              <tr><td><code>\small</code></td><td>9 / 11</td><td>10 / 12</td><td>10.95 / 13.6</td></tr>
              <tr><td><code>\normalsize</code></td><td>10 / 12</td><td>10.95 / 13.6</td><td>12 / 14.5</td></tr>
              <tr><td><code>\large</code></td><td>12 / 14</td><td>12 / 14</td><td>14.4 / 18</td></tr>
              <tr><td><code>\Large</code></td><td>14.4 / 18</td><td>14.4 / 18</td><td>17.28 / 22</td></tr>
              <tr><td><code>\LARGE</code></td><td>17.28 / 22</td><td>17.28 / 22</td><td>20.74 / 25</td></tr>
              <tr><td><code>\huge</code></td><td>20.74 / 25</td><td>20.74 / 25</td><td>24.88 / 30</td></tr>
              <tr><td><code>\Huge</code></td><td>24.88 / 30</td><td>24.88 / 30</td><td>24.88 / 30</td></tr>
            </tbody>
          </table>
          <p>
            The odd-looking numbers (10.95, 14.4, 17.28, 20.74, 24.88) are powers of 1.2 times
            10pt. They are the sizes Donald Knuth prepared for Computer Modern, and the standard
            classes stick to them so that every size has a real font behind it. Note that at
            12pt, <code>\huge</code> and <code>\Huge</code> are the same size: the scale tops out
            at 24.88pt.
          </p>

          {/* ── Class options ── */}
          <h2>Setting the Base Size: Document Class Options</h2>
          <p>
            The body text size is a class option. The standard classes accept <code>10pt</code>{' '}
            (the default), <code>11pt</code> and <code>12pt</code>:
          </p>
          <pre><code>{`\\documentclass[12pt]{article}
\\documentclass[11pt, a4paper]{report}
\\documentclass[10pt, twocolumn]{book}`}</code></pre>
          <p>
            Changing this one option rescales everything at once: body text, headings, footnotes,
            captions and the relative size commands. For most documents this is the only
            font-size setting that needs to change. Anything other than those three values is
            silently ignored by the standard classes, which is the source of many &ldquo;why is my
            14pt option not working&rdquo; questions.
          </p>

          <h3>Sizes from 8pt to 20pt with extsizes</h3>
          <p>
            For a base size outside 10&ndash;12pt, the <code>extsizes</code> bundle provides
            drop-in replacements for the standard classes: <code>extarticle</code>,{' '}
            <code>extreport</code>, <code>extbook</code> and <code>extletter</code>. They accept{' '}
            <code>8pt</code>, <code>9pt</code>, <code>10pt</code>, <code>11pt</code>,{' '}
            <code>12pt</code>, <code>14pt</code>, <code>17pt</code> and <code>20pt</code>:
          </p>
          <pre><code>{`\\documentclass[14pt]{extarticle}
\\begin{document}
Body text is now 14pt, and \\large, \\Large and friends scale with it.
\\end{document}`}</code></pre>
          <p>
            The KOMA-Script classes (<code>scrartcl</code>, <code>scrreprt</code>,{' '}
            <code>scrbook</code>) go further and accept any size, e.g.{' '}
            <code>{`\\documentclass[fontsize=13pt]{scrartcl}`}</code>. The <code>memoir</code>{' '}
            class accepts 9pt to 60pt through its own options. If you are already using one of
            these classes, prefer its option over <code>extsizes</code>.
          </p>

          {/* ── Scoping ── */}
          <h2>Scoping a Size Change: Braces vs. Environments</h2>
          <p>
            Because the size commands are declarations, how far they reach depends on where you put
            them. There are three patterns:
          </p>
          <pre><code>{`% 1. Braces: the change ends at the closing brace
This is normal, {\\large this is large}, and this is normal again.

% 2. Environment form: the same, but clearer for multi-paragraph blocks
\\begin{small}
A long quotation or note set in small type. Several paragraphs
can go here.
\\end{small}

% 3. Bare declaration: lasts until the end of the enclosing group,
%    e.g. the rest of a table cell, a footnote, or the whole document
\\small
Everything from here on is small...
\\normalsize
...until it is explicitly reset.`}</code></pre>
          <p>
            A very common mistake is to write <code>{`\\large{text}`}</code> as if{' '}
            <code>\large</code> took an argument. It compiles, but the braces only group the word{' '}
            <em>text</em>; the <code>\large</code> itself was issued <em>outside</em> them and
            stays active for the rest of the paragraph or group. Always put the command{' '}
            <em>inside</em> the braces: <code>{`{\\large text}`}</code>.
          </p>
          <p>
            One more subtlety: line spacing is decided when a paragraph ends. If you enlarge only
            part of a paragraph, the lines keep the normal baseline skip and the large text may
            collide with the line above. For a whole paragraph in a different size, end the
            paragraph inside the group with <code>\par</code> or a blank line. The environment
            form does not do this for you either, so leave a blank line before{' '}
            <code>\end</code>:
          </p>
          <pre><code>{`{\\Large A heading-like paragraph in Large type.\\par}

\\begin{Large}
The environment form needs the blank line too.

\\end{Large}`}</code></pre>

          {/* ── fontsize ── */}
          <h2>Exact Sizes with \fontsize and \selectfont</h2>
          <p>
            When you need a size that is not on the ten-step scale, use{' '}
            <code>{`\\fontsize{size}{baselineskip}\\selectfont`}</code>. The first argument is the
            font size, the second the distance between baselines; a baseline skip of about
            1.2&times; the size matches LaTeX&apos;s own defaults. Nothing happens until{' '}
            <code>\selectfont</code> is called:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{lmodern}   % scalable fonts: any size works
\\begin{document}

{\\fontsize{14}{17}\\selectfont This is exactly 14pt text on a 17pt
baseline, and it wraps correctly across lines.\\par}

{\\fontsize{40}{48}\\selectfont Poster}

\\end{document}`}</code></pre>
          <p>
            Units are optional and default to points; <code>{`\\fontsize{14pt}{17pt}`}</code> is the
            same as <code>{`\\fontsize{14}{17}`}</code>. The <code>lmodern</code> line matters: the
            default Computer Modern fonts exist only at fixed sizes, so a request for 15pt gets
            substituted with 14.4pt and a warning (see <em>Common Errors</em> below; 14pt is close
            enough to 14.4pt that LaTeX substitutes it silently). Latin Modern
            is the same design in a scalable format.
          </p>

          <h3>How \linespread fits in</h3>
          <p>
            <code>\fontsize</code> sets the baseline skip directly, while{' '}
            <code>{`\\linespread{factor}`}</code> multiplies whatever baseline skip the current size
            defines. <code>{`\\linespread{1.5}`}</code> in the preamble gives roughly one-and-a-half
            spacing throughout, without touching the font size. Like <code>\fontsize</code>, it
            only takes effect at the next <code>\selectfont</code> or size command, which is why
            in the body you write <code>{`\\linespread{1.5}\\selectfont`}</code>. For the usual
            double-spacing requirement, the <code>setspace</code> package is more precise:{' '}
            <code>\onehalfspacing</code>, <code>\doublespacing</code> and the{' '}
            <code>spacing</code> environment handle footnotes and floats correctly, which a bare{' '}
            <code>\linespread</code> does not.
          </p>

          {/* ── Elements ── */}
          <h2>Font Size for Specific Elements</h2>
          <p>
            Most parts of a document have a size baked into the class. Each one has a clean way to
            override it.
          </p>

          <h3>Captions</h3>
          <p>
            Load the <code>caption</code> package and pass the size as an option. Separate
            settings exist for the label (&ldquo;Figure 1:&rdquo;) and the text:
          </p>
          <pre><code>{`\\usepackage[font=small, labelfont=bf]{caption}

% Different sizes for the label and the text
\\usepackage[font=footnotesize, labelfont={bf,small}]{caption}

% Or change it later with \\captionsetup
\\captionsetup{font=scriptsize}`}</code></pre>

          <h3>Footnotes</h3>
          <p>
            Footnotes are set in <code>\footnotesize</code>. To make every footnote larger or
            smaller, redefine that command once in the preamble:
          </p>
          <pre><code>{`\\renewcommand{\\footnotesize}{\\small}   % larger footnotes
\\renewcommand{\\footnotesize}{\\scriptsize}  % smaller footnotes`}</code></pre>
          <p>
            Be aware that <code>\footnotesize</code> is also the default size for captions in
            some classes and for <code>\tablenotes</code>, so this change may reach further than
            the footnotes. See <Link href="/learn/footnotes">LaTeX Footnotes</Link> for the other
            footnote settings.
          </p>

          <h3>Headers and footers</h3>
          <p>
            With <code>fancyhdr</code>, the header and footer fields are ordinary text, so a size
            declaration at the start of each field is all it takes:
          </p>
          <pre><code>{`\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{\\small\\itshape Font Sizes in LaTeX}
\\fancyhead[R]{\\small\\thepage}
\\fancyfoot[C]{\\footnotesize Draft -- do not distribute}`}</code></pre>

          <h3>Section titles</h3>
          <p>
            The <code>titlesec</code> package changes heading formats. Its starred form keeps the
            standard layout and only swaps the font:
          </p>
          <pre><code>{`\\usepackage{titlesec}
\\titleformat*{\\section}{\\large\\bfseries}
\\titleformat*{\\subsection}{\\normalsize\\bfseries}
\\titleformat*{\\subsubsection}{\\normalsize\\itshape}

% Full control, including an exact size via \\fontsize:
\\titleformat{\\section}
  {\\fontsize{16}{19}\\selectfont\\bfseries}{\\thesection}{1em}{}`}</code></pre>
          <p>
            The <code>sectsty</code> package does the same job with{' '}
            <code>{`\\sectionfont{\\large}`}</code>, and KOMA-Script classes have{' '}
            <code>{`\\setkomafont{section}{\\large\\bfseries}`}</code> built in. Do not load{' '}
            <code>titlesec</code> with KOMA or <code>memoir</code>; use their own mechanisms.
          </p>

          <h3>Title, author and date</h3>
          <p>
            The arguments of <code>\title</code> and <code>\author</code> accept size commands
            directly: <code>{`\\title{\\Huge A Big Title}`}</code> or{' '}
            <code>{`\\author{\\large Ada Lovelace}`}</code>. The <code>titling</code> package offers
            a tidier hook, <code>{`\\pretitle{\\begin{center}\\LARGE}`}</code>.
          </p>

          {/* ── Math ── */}
          <h2>Font Size in Math Mode</h2>
          <p>
            Math has its own size system. Every math expression is set in one of four styles:{' '}
            <code>\displaystyle</code> (displayed equations), <code>\textstyle</code> (inline
            math), <code>\scriptstyle</code> (first-level subscripts and superscripts) and{' '}
            <code>\scriptscriptstyle</code> (nested scripts). You can force any of them:
          </p>
          <pre><code>{`$\\displaystyle \\sum_{i=1}^{n} x_i$   % inline math with display-size limits
$\\textstyle \\frac{a}{b}$            % a small fraction in a display
$\\scriptstyle x + y$                % script-size math`}</code></pre>
          <p>
            The text size commands do <strong>not</strong> work inside math mode:{' '}
            <code>{`$\\small x$`}</code> produces the warning <em>Command \small invalid in math
            mode</em> and changes nothing. Apply the size command <em>around</em> the math
            instead; the math fonts follow the surrounding text size:
          </p>
          <pre><code>{`{\\small $E = mc^2$}            % small math, inline
{\\footnotesize \\[ E = mc^2 \\]}  % small displayed equation`}</code></pre>
          <p>
            To change the script sizes globally, use <code>\DeclareMathSizes</code> in the
            preamble. It takes the text size it applies to, then the sizes for text, script and
            scriptscript style. The defaults for a 10pt document are 10/10/7/5:
          </p>
          <pre><code>{`% For 10pt body text, use 7.5pt scripts and 6pt nested scripts
\\DeclareMathSizes{10}{10}{7.5}{6}

% Must be declared for each body size you use, e.g. in a 12pt document:
\\DeclareMathSizes{12}{12}{8}{6}`}</code></pre>

          {/* ── Beamer ── */}
          <h2>Font Size in Beamer</h2>
          <p>
            Beamer frames are 128&times;96&nbsp;mm, so the point sizes are small on paper but large
            on screen. The class accepts <code>8pt</code>, <code>9pt</code>, <code>10pt</code>,{' '}
            <code>11pt</code> (the default), <code>12pt</code>, <code>14pt</code>,{' '}
            <code>17pt</code> and <code>20pt</code>, with the same relative commands inside frames:
          </p>
          <pre><code>{`\\documentclass[14pt]{beamer}
\\begin{document}
\\begin{frame}{Font sizes}
  Normal 14pt text.

  {\\small A smaller remark.}

  {\\tiny Source: fine print that nobody reads.}
\\end{frame}
\\end{document}`}</code></pre>
          <p>
            Beamer also sizes its own elements through fonts you can set in the preamble:{' '}
            <code>{`\\setbeamerfont{frametitle}{size=\\Large}`}</code>,{' '}
            <code>{`\\setbeamerfont{footnote}{size=\\tiny}`}</code> and so on. For a one-off slide
            with a lot of text, <code>{`\\begin{frame}[shrink=10]`}</code> scales the content down
            by 10 percent.
          </p>

          {/* ── relsize ── */}
          <h2>Relative Changes with relsize</h2>
          <p>
            The <code>relsize</code> package changes size relative to the <em>current</em> size
            instead of relative to the body size. <code>{`\\relsize{n}`}</code> moves <em>n</em>{' '}
            steps up or down the ten-step scale; <code>\smaller</code> and <code>\larger</code>{' '}
            are one step each. This is what you want inside macros that may be called at any size:
          </p>
          <pre><code>{`\\usepackage{relsize}

\\newcommand{\\unitlabel}[1]{{\\smaller #1}}   % one step smaller than its number
10\\,\\unitlabel{kg} and {\\Large 10\\,\\unitlabel{kg}}

{\\relsize{2} two steps larger} {\\relsize{-1} one step smaller}
\\textlarger{inline form} and \\textsmaller{its opposite}`}</code></pre>
          <p>
            For a scale factor rather than steps, <code>{`\\relscale{1.25}`}</code> from the same
            package multiplies the current size by 1.25, and the small <code>scalefnt</code>{' '}
            package does the same with <code>{`\\scalefont{1.25}`}</code>.
          </p>

          {/* ── Whole document ── */}
          <h2>Scaling the Whole Document</h2>
          <p>
            From largest effect to smallest, these are the ways to make an entire document bigger
            or smaller:
          </p>
          <ol>
            <li>
              Change the class option: <code>{`\\documentclass[12pt]{article}`}</code>, or switch to{' '}
              <code>extarticle</code> for 8&ndash;20pt. This keeps every element in proportion and
              is the right answer 90% of the time.
            </li>
            <li>
              With a KOMA-Script class, or the <code>scrextend</code> package in a standard
              class, <code>{`\\changefontsizes{13pt}`}</code> sets an arbitrary body size and
              recomputes the relative commands.
            </li>
            <li>
              Issue <code>{`\\fontsize{13}{16}\\selectfont`}</code> right after{' '}
              <code>{`\\begin{document}`}</code>. Body text changes, but headings, footnotes and
              captions keep their own sizes, so they may look out of proportion.
            </li>
            <li>
              Leave the font alone and scale the page: a <code>12pt</code> document printed on a
              smaller paper size, or the <code>geometry</code> package with narrower margins,
              changes how big the text looks without changing the font.
            </li>
          </ol>

          {/* ── Errors ── */}
          <h2>Common Errors and Warnings</h2>
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
                <td><em>Font shape `OT1/cmr/m/n&apos; in size &lt;15&gt; not available, size &lt;14.4&gt; substituted</em></td>
                <td>Computer Modern is only available at fixed sizes; <code>\fontsize</code> asked for one in between</td>
                <td>Load <code>{`\\usepackage{lmodern}`}</code>, or put <code>{`\\RequirePackage{fix-cm}`}</code> before <code>\documentclass</code>, or use <code>anyfontsize</code></td>
              </tr>
              <tr>
                <td><em>Command \small invalid in math mode</em></td>
                <td>A text size command inside <code>$...$</code> or a display</td>
                <td>Move it outside: <code>{`{\\small $x$}`}</code>, or use <code>\scriptstyle</code> for the math itself</td>
              </tr>
              <tr>
                <td><code>14pt</code> class option has no effect</td>
                <td>The standard classes only know 10pt, 11pt and 12pt</td>
                <td>Use <code>extarticle</code>, a KOMA class with <code>fontsize=14pt</code>, or <code>memoir</code></td>
              </tr>
              <tr>
                <td>Text stays large after <code>{`\\large{word}`}</code></td>
                <td>The command is outside the braces, so it applies to the rest of the group</td>
                <td>Write <code>{`{\\large word}`}</code></td>
              </tr>
              <tr>
                <td><code>\fontsize</code> changes nothing</td>
                <td>Missing <code>\selectfont</code></td>
                <td><code>{`\\fontsize{14}{17}\\selectfont`}</code></td>
              </tr>
              <tr>
                <td>Enlarged words overlap the line above</td>
                <td>Baseline skip is fixed per paragraph, and the paragraph ended outside the group</td>
                <td>Put <code>\par</code> or a blank line inside the group (also in the environment form)</td>
              </tr>
              <tr>
                <td><code>\huge</code> and <code>\Huge</code> look the same</td>
                <td>At 12pt both map to 24.88pt, the top of the scale</td>
                <td>Use <code>\fontsize</code> with <code>lmodern</code> for anything larger</td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass[12pt]{article}
\\usepackage{lmodern}
\\usepackage[font=small, labelfont=bf]{caption}
\\usepackage{fancyhdr}
\\setlength{\\headheight}{14pt}
\\usepackage{titlesec}
\\usepackage{relsize}

% Headings one step larger than the body, in bold
\\titleformat*{\\section}{\\Large\\bfseries}
\\titleformat*{\\subsection}{\\large\\bfseries}

% Small running header, footnote-size page number
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{\\small\\itshape Font sizes in LaTeX}
\\fancyfoot[C]{\\footnotesize\\thepage}

% Slightly larger math scripts for a 12pt body
\\DeclareMathSizes{12}{12}{9}{7}

\\title{\\Huge Font Sizes}
\\author{\\large Ada Lovelace}
\\date{\\normalsize \\today}

\\begin{document}
\\maketitle

\\section{Relative sizes}
The body is 12pt. {\\small This sentence is small,} {\\large this one is
large,} and this one is back to normal. A footnote keeps its own
size.\\footnote{Set in \\texttt{\\textbackslash footnotesize}, 10pt here.}

\\begin{footnotesize}
A whole paragraph in footnote size, with the matching line spacing,
because the blank line ends the paragraph inside the group.

\\end{footnotesize}

\\section{Exact sizes}
{\\fontsize{15}{18}\\selectfont This paragraph is exactly 15pt on an
18pt baseline, which is not one of the ten standard steps.\\par}

\\subsection{Relative to the current size}
Prices: 10\\,{\\smaller EUR} and {\\Large 10\\,{\\smaller EUR}} scale together.

\\subsection{Math}
Inline $E = mc^2$, then {\\small $E = mc^2$} in small, and
$\\displaystyle \\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}$ with display-size limits.

\\begin{table}[htbp]
  \\centering
  \\caption{The caption is small and its label bold, via the caption package.}
  \\begin{tabular}{lr}
    Size & Points \\\\
    \\hline
    \\verb|\\small| & 10.95 \\\\
    \\verb|\\large| & 14.4 \\\\
  \\end{tabular}
\\end{table}

\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Command</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Body size for the whole document</td><td><code>{`\\documentclass[12pt]{article}`}</code></td></tr>
              <tr><td>Body size 8&ndash;20pt</td><td><code>{`\\documentclass[14pt]{extarticle}`}</code></td></tr>
              <tr><td>Smaller text</td><td><code>{`{\\small ...}`}</code>, <code>{`{\\footnotesize ...}`}</code>, <code>{`{\\scriptsize ...}`}</code>, <code>{`{\\tiny ...}`}</code></td></tr>
              <tr><td>Larger text</td><td><code>{`{\\large ...}`}</code>, <code>{`{\\Large ...}`}</code>, <code>{`{\\LARGE ...}`}</code>, <code>{`{\\huge ...}`}</code>, <code>{`{\\Huge ...}`}</code></td></tr>
              <tr><td>Back to the body size</td><td><code>\normalsize</code></td></tr>
              <tr><td>Multi-paragraph block</td><td><code>{`\\begin{small} ... \\end{small}`}</code></td></tr>
              <tr><td>Exact size</td><td><code>{`\\fontsize{14}{17}\\selectfont`}</code> (with <code>lmodern</code>)</td></tr>
              <tr><td>Line spacing</td><td><code>{`\\linespread{1.5}`}</code> or <code>setspace</code></td></tr>
              <tr><td>Caption size</td><td><code>{`\\usepackage[font=small]{caption}`}</code></td></tr>
              <tr><td>Footnote size</td><td><code>{`\\renewcommand{\\footnotesize}{\\small}`}</code></td></tr>
              <tr><td>Section title size</td><td><code>{`\\titleformat*{\\section}{\\large\\bfseries}`}</code> (titlesec)</td></tr>
              <tr><td>Header size</td><td><code>{`\\fancyhead[L]{\\small ...}`}</code> (fancyhdr)</td></tr>
              <tr><td>Math style</td><td><code>\displaystyle</code>, <code>\textstyle</code>, <code>\scriptstyle</code>, <code>\scriptscriptstyle</code></td></tr>
              <tr><td>Script sizes in math</td><td><code>{`\\DeclareMathSizes{10}{10}{7}{5}`}</code></td></tr>
              <tr><td>One step smaller/larger than current</td><td><code>\smaller</code>, <code>\larger</code>, <code>{`\\relsize{n}`}</code> (relsize)</td></tr>
              <tr><td>Beamer base size</td><td><code>{`\\documentclass[14pt]{beamer}`}</code></td></tr>
            </tbody>
          </table>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Sizes sorted? The rest of the typography is next:</p>
          <ul>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> &ndash; Font weight and shape commands that combine with the size commands</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; Paper size and margins with the geometry package</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Footnote numbering, placement and spacing</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Display math, fractions and the amsmath environments</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; Colored text with xcolor</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compare font sizes with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix font size problems faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor explains font substitution warnings, suggests the right
              package for the size you want, and compiles your document in seconds.
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
