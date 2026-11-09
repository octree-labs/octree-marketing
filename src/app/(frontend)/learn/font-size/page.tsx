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

const breadcrumbs = getLearnBreadcrumbs('Font Size in LaTeX', 'font-size')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'font-size',
  title: 'Font Size in LaTeX: \\tiny to \\Huge, Document Size and Custom Sizes',
  seoTitle: 'Font Size in LaTeX: \\tiny to \\Huge and \\fontsize',
  description: 'Change font size in LaTeX: \\documentclass[12pt], ten commands from \\tiny to \\Huge with point sizes, \\fontsize{}{}\\selectfont, and 14pt+ with extarticle.',
  keywords: 'latex font size, font size latex, text size latex, latex text size, size latex font, latex font size commands, latex change font size, latex tiny, latex huge, latex large, latex small, latex normalsize, latex fontsize selectfont, fontsize latex, latex 12pt, latex 14pt, extsizes, extarticle, scrartcl fontsize, latex caption font size, latex footnote size, latex section font size, latex math font size, beamer font size, relsize, latex font shape not available',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

/** The ten size commands: point size and baseline skip at 10pt, 11pt and 12pt. */
const sizes: { cmd: string; pt10: string; pt11: string; pt12: string; render: number }[] = [
  { cmd: '\\tiny', pt10: '5 / 6', pt11: '6 / 7', pt12: '6 / 7', render: 5 },
  { cmd: '\\scriptsize', pt10: '7 / 8', pt11: '8 / 9.5', pt12: '8 / 9.5', render: 7 },
  { cmd: '\\footnotesize', pt10: '8 / 9.5', pt11: '9 / 11', pt12: '10 / 12', render: 8 },
  { cmd: '\\small', pt10: '9 / 11', pt11: '10 / 12', pt12: '10.95 / 13.6', render: 9 },
  { cmd: '\\normalsize', pt10: '10 / 12', pt11: '10.95 / 13.6', pt12: '12 / 14.5', render: 10 },
  { cmd: '\\large', pt10: '12 / 14', pt11: '12 / 14', pt12: '14.4 / 18', render: 12 },
  { cmd: '\\Large', pt10: '14.4 / 18', pt11: '14.4 / 18', pt12: '17.28 / 22', render: 14.4 },
  { cmd: '\\LARGE', pt10: '17.28 / 22', pt11: '17.28 / 22', pt12: '20.74 / 25', render: 17.28 },
  { cmd: '\\huge', pt10: '20.74 / 25', pt11: '20.74 / 25', pt12: '24.88 / 30', render: 20.74 },
  { cmd: '\\Huge', pt10: '24.88 / 30', pt11: '24.88 / 30', pt12: '24.88 / 30', render: 24.88 },
]

const faq: FaqItem[] = [
  {
    question: 'How do you change the font size in LaTeX?',
    answer:
      'For the whole document, set the class option: \\documentclass[12pt]{article} (the standard classes accept 10pt, 11pt and 12pt). For a passage, use one of the ten size commands inside braces, such as {\\large text} or {\\small text}. For an exact size, write {\\fontsize{14}{17}\\selectfont text}.',
  },
  {
    question: 'What are the font sizes in LaTeX?',
    answer:
      'From smallest to largest: \\tiny, \\scriptsize, \\footnotesize, \\small, \\normalsize, \\large, \\Large, \\LARGE, \\huge and \\Huge. In a 10pt document they are 5, 7, 8, 9, 10, 12, 14.4, 17.28, 20.74 and 24.88pt. They are relative to the body size, so in a 12pt document each one is larger.',
  },
  {
    question: 'How do I get 14pt or larger text in LaTeX?',
    answer:
      'The standard classes ignore 14pt. Use \\documentclass[14pt]{extarticle} from the extsizes bundle (8pt to 20pt), or a KOMA-Script class with any size: \\documentclass[fontsize=14pt]{scrartcl}. For a single passage, {\\fontsize{14}{17}\\selectfont text} works in any class.',
  },
  {
    question: 'What does \\fontsize{}{}\\selectfont do?',
    answer:
      '\\fontsize{size}{baselineskip} sets the font size and the distance between lines, and \\selectfont applies it. Without \\selectfont nothing changes. A baseline skip about 1.2 times the size matches LaTeX defaults, e.g. \\fontsize{14}{17}. Load lmodern so every size is available.',
  },
  {
    question: 'Why does \\large{text} make the rest of my paragraph large?',
    answer:
      'The size commands are declarations and take no argument. In \\large{text} the command sits outside the braces, so it stays active until the end of the enclosing group. Put it inside: {\\large text}. End a resized paragraph with \\par inside the braces so the line spacing matches.',
  },
  {
    question: 'How do I change font size in math mode?',
    answer:
      'Text size commands are not allowed inside math and give "Command \\small invalid in math mode". Put the command outside: {\\small $x^2$}. To change the style of the math itself, use \\displaystyle, \\textstyle, \\scriptstyle or \\scriptscriptstyle.',
  },
]

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
          <h1>Font Size in LaTeX: \tiny to \Huge, Document Size and Custom Sizes</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Whole document:</strong> <code>{`\\documentclass[12pt]{article}`}</code>{' '}
                (standard classes: 10pt, 11pt or 12pt).
              </li>
              <li>
                <strong>A passage:</strong> <code>{`{\\large text}`}</code>, with the command inside
                the braces. The ten sizes are <code>\tiny</code>, <code>\scriptsize</code>,{' '}
                <code>\footnotesize</code>, <code>\small</code>, <code>\normalsize</code>,{' '}
                <code>\large</code>, <code>\Large</code>, <code>\LARGE</code>, <code>\huge</code>,{' '}
                <code>\Huge</code>.
              </li>
              <li>
                <strong>An exact size:</strong> <code>{`{\\fontsize{14}{17}\\selectfont text}`}</code>{' '}
                with <code>{`\\usepackage{lmodern}`}</code>.
              </li>
              <li>
                <strong>14pt and up:</strong> <code>{`\\documentclass[14pt]{extarticle}`}</code>{' '}
                (8&ndash;20pt), or <code>{`\\documentclass[fontsize=13pt]{scrartcl}`}</code> for any size.
              </li>
            </ul>
          </div>
          <p className="lead">
            LaTeX font size works at two levels. The class option (<code>10pt</code>,{' '}
            <code>11pt</code>, <code>12pt</code>) sets the body size for the whole document, and
            ten commands from <code>\tiny</code> to <code>\Huge</code> scale a passage up or down
            from that body size. For anything off that scale, <code>\fontsize</code> sets an exact
            size. This guide gives the point value of every command, shows how to size captions,
            footnotes, headers, section titles, math and Beamer slides, and fixes the errors you
            will hit along the way.
          </p>

          {/* ── Size commands ── */}
          <h2>Text Size in LaTeX: The Ten Size Commands</h2>
          <p>
            To change text size in LaTeX, use one of the ten size commands. They are{' '}
            <em>declarations</em>, not commands with an argument: each one switches the size for
            everything that follows until the end of the current group, so you put the command
            inside braces together with the text.
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

{\\tiny tiny} {\\scriptsize scriptsize} {\\footnotesize footnotesize}
{\\small small} {\\normalsize normalsize} {\\large large}
{\\Large Large} {\\LARGE LARGE} {\\huge huge} {\\Huge Huge}

\\end{document}`}</code></pre>
          <p>
            The commands are relative: <code>\large</code> means one step above the body size, so
            its point size depends on the class option. The table shows each size rendered at its
            10pt value, then the exact numbers for the standard classes (<code>article</code>,{' '}
            <code>report</code>, <code>book</code>). The second number in each cell is the baseline
            skip, the distance from one line to the next.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Rendered (10pt document)</th>
                <th>10pt (default)</th>
                <th>11pt</th>
                <th>12pt</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row) => (
                <tr key={row.cmd}>
                  <td><code>{row.cmd}</code></td>
                  <td style={{ fontSize: `${row.render}pt`, lineHeight: 1.2, whiteSpace: 'nowrap' }}>Sample text</td>
                  <td>{row.pt10}</td>
                  <td>{row.pt11}</td>
                  <td>{row.pt12}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <p>
            The odd-looking numbers (10.95, 14.4, 17.28, 20.74, 24.88) are powers of 1.2 times
            10pt. They are the sizes Donald Knuth prepared for Computer Modern, and the standard
            classes stick to them so that every size has a real font behind it. Note that at
            12pt, <code>\huge</code> and <code>\Huge</code> are the same size: the scale tops out
            at 24.88pt.
          </p>

          {/* ── Class options ── */}
          <h2>LaTeX Font Size for the Whole Document: Class Options</h2>
          <p>
            The document font size is a class option. The standard classes accept{' '}
            <code>10pt</code> (the default), <code>11pt</code> and <code>12pt</code>:
          </p>
          <pre><code>{`\\documentclass[12pt]{article}
% or: \\documentclass[11pt, a4paper]{report}
% or: \\documentclass[10pt, twocolumn]{book}
\\begin{document}
Body text is 12pt; headings and footnotes scale with it.
\\end{document}`}</code></pre>
          <p>
            Changing this one option rescales everything at once: body text, headings, footnotes,
            captions and the relative size commands. For most documents this is the only
            font-size setting that needs to change. Anything other than those three values is
            silently ignored by the standard classes, which is the source of many &ldquo;why is my
            14pt option not working&rdquo; questions.
          </p>

          <h2>Font Size Above 12pt: extarticle and scrartcl</h2>
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
            <code>scrbook</code>) accept any size through the <code>fontsize=</code> option, not
            just fixed steps:
          </p>
          <pre><code>{`\\documentclass[fontsize=13pt]{scrartcl}
\\usepackage{lmodern}
\\begin{document}
Body text is 13pt. KOMA computes \\small, \\large and the rest from it.
\\end{document}`}</code></pre>
          <p>
            The <code>memoir</code> class accepts 9pt to 60pt through its own options. If you
            already use KOMA-Script or memoir, prefer their option over <code>extsizes</code>.
          </p>

          {/* ── Scoping ── */}
          <h2>Scoping a Size Change: Braces vs Environments</h2>
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
          <h2>Custom Size of the LaTeX Font: \fontsize and \selectfont</h2>
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
          <h2>Common Errors</h2>
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
          </div>

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
          <div className="overflow-x-auto">
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
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you change the font size in LaTeX?</h3>
          <p>
            For the whole document, set the class option:{' '}
            <code>{`\\documentclass[12pt]{article}`}</code> (the standard classes accept 10pt, 11pt
            and 12pt). For a passage, use one of the ten size commands inside braces, such as{' '}
            <code>{`{\\large text}`}</code> or <code>{`{\\small text}`}</code>. For an exact size,
            write <code>{`{\\fontsize{14}{17}\\selectfont text}`}</code>.
          </p>
          <h3>What are the font sizes in LaTeX?</h3>
          <p>
            From smallest to largest: <code>\tiny</code>, <code>\scriptsize</code>,{' '}
            <code>\footnotesize</code>, <code>\small</code>, <code>\normalsize</code>,{' '}
            <code>\large</code>, <code>\Large</code>, <code>\LARGE</code>, <code>\huge</code> and{' '}
            <code>\Huge</code>. In a 10pt document they are 5, 7, 8, 9, 10, 12, 14.4, 17.28, 20.74
            and 24.88pt. They are relative to the body size, so in a 12pt document each one is
            larger.
          </p>
          <h3>How do I get 14pt or larger text in LaTeX?</h3>
          <p>
            The standard classes ignore 14pt. Use <code>{`\\documentclass[14pt]{extarticle}`}</code>{' '}
            from the extsizes bundle (8pt to 20pt), or a KOMA-Script class with any size:{' '}
            <code>{`\\documentclass[fontsize=14pt]{scrartcl}`}</code>. For a single passage,{' '}
            <code>{`{\\fontsize{14}{17}\\selectfont text}`}</code> works in any class.
          </p>
          <h3>What does \fontsize&#123;&#125;&#123;&#125;\selectfont do?</h3>
          <p>
            <code>{`\\fontsize{size}{baselineskip}`}</code> sets the font size and the distance
            between lines, and <code>\selectfont</code> applies it. Without{' '}
            <code>\selectfont</code> nothing changes. A baseline skip about 1.2 times the size
            matches LaTeX defaults, e.g. <code>{`\\fontsize{14}{17}`}</code>. Load{' '}
            <code>lmodern</code> so every size is available.
          </p>
          <h3>Why does \large&#123;text&#125; make the rest of my paragraph large?</h3>
          <p>
            The size commands are declarations and take no argument. In{' '}
            <code>{`\\large{text}`}</code> the command sits outside the braces, so it stays active
            until the end of the enclosing group. Put it inside: <code>{`{\\large text}`}</code>. End
            a resized paragraph with <code>\par</code> inside the braces so the line spacing
            matches.
          </p>
          <h3>How do I change font size in math mode?</h3>
          <p>
            Text size commands are not allowed inside math and give &quot;Command \small invalid
            in math mode&quot;. Put the command outside: <code>{`{\\small $x^2$}`}</code>. To change
            the style of the math itself, use <code>\displaystyle</code>, <code>\textstyle</code>,{' '}
            <code>\scriptstyle</code> or <code>\scriptscriptstyle</code>.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>With the size settled, the rest of the typography is next:</p>
          <ul>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> &ndash; Font weight and shape commands that combine with the size commands</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; Paper size and margins with the geometry package</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Footnote numbering, placement and spacing</li>
            <li><Link href="/learn/mathematical-expressions">Inline and Display Math</Link> &ndash; Math mode, display styles and the equation environment</li>
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
