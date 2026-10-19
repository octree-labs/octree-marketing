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

const breadcrumbs = getLearnBreadcrumbs('APA Headings', 'apa-headings')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'apa-headings',
  title: 'APA Headings: The Five Heading Levels in APA 7 (With LaTeX Examples)',
  seoTitle: 'APA Headings: 5 Heading Levels in APA 7 + LaTeX',
  description: 'APA headings explained: all five APA 7 heading levels with exact formatting, the rules for using them, a worked outline, and the LaTeX (apa7) to match.',
  keywords: 'apa headings, apa heading levels, apa 7 headings, apa headings in latex, apa heading format, apa level 1 heading, apa level 2 heading, apa level 3 heading, apa level 4 heading, apa level 5 heading, apa 7th edition headings, apa subheadings, apa section headings, apa title case, apa introduction heading, apa7 latex class, apa headings latex, titlesec apa',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-19'

const faq: FaqItem[] = [
  {
    question: 'How many heading levels does APA 7 have, and how many should I use?',
    answer:
      'APA 7 defines five heading levels. Use only as many as your paper needs, always starting at Level 1 and working down in order: a short student paper often needs just Levels 1 and 2, and a journal-length empirical paper rarely needs more than three. Every section begins with a Level 1 heading, even if one section has fewer subsections than another.',
  },
  {
    question: 'Does an APA paper have an "Introduction" heading?',
    answer:
      'No. The first paragraphs of a paper are understood to be introductory, so APA 7 says not to begin with an "Introduction" heading. The paper title, repeated in bold and centered at the top of the first page of text, acts as the de facto Level 1 heading. Subsections inside the introduction therefore start at Level 2.',
  },
  {
    question: 'What changed in APA headings between the 6th and 7th editions?',
    answer:
      'Levels 1 and 2 are unchanged. In APA 6, Level 3 was an indented, bold, sentence-case paragraph heading ending with a period, Level 4 was the same in bold italic, and Level 5 was indented italic. APA 7 moved Level 3 to a flush-left, bold italic, title case heading on its own line and made Levels 4 and 5 the indented, title case, run-in paragraph headings. All five levels are now in title case.',
  },
  {
    question: 'How do I make APA headings in LaTeX?',
    answer:
      'Use the apa7 document class: \\documentclass[stu,12pt]{apa7} for a student paper or [man,12pt] for a manuscript. Its \\section, \\subsection, \\subsubsection, \\paragraph and \\subparagraph commands produce Levels 1 to 5 with the correct alignment, bold or bold italic font, run-in layout and terminal period, and headings are unnumbered by default. Without apa7, the titlesec package can restyle the standard article headings to match.',
  },
]

export default async function ApaHeadingsPage() {
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
          <h1>APA Headings: The Five Heading Levels in APA 7 (With LaTeX Examples)</h1>
          <p className="lead">
            APA headings organize a paper into sections and subsections, and the 7th edition of
            the <em>Publication Manual</em> (section 2.27) prescribes exactly how each of its five
            heading levels looks: where it sits on the line, whether it is bold or bold italic,
            whether it ends with a period, and whether the text starts on the same line or the
            next one.
          </p>
          <p>
            This guide is the complete reference: a table of the five APA heading levels with
            their formatting, the rules that decide which level a heading gets, a worked outline
            of a student paper, and two ways to produce the same headings in LaTeX, with the{' '}
            <code>apa7</code> class, which does it automatically, and with <code>titlesec</code>{' '}
            when you cannot use <code>apa7</code>. The heading rules are the same for student and
            professional papers.
          </p>

          {/* ───────────────────────────── Heading Levels ───────────────────────────── */}
          <h2>APA Heading Levels: The Five Levels in APA 7</h2>
          <p>
            Every heading uses the same font and size as the body text (for example 12-point
            Times New Roman or 11-point Calibri) and is double-spaced like the rest of the paper.
            The levels differ only in alignment, emphasis and whether the text runs in.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">Format</th>
                <th scope="col">Where the text begins</th>
                <th scope="col">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Centered, <strong>bold</strong>, title case</td>
                <td>On the next line, as a new indented paragraph</td>
                <td className="text-center"><strong>Method</strong></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Flush left, <strong>bold</strong>, title case</td>
                <td>On the next line, as a new indented paragraph</td>
                <td><strong>Participants</strong></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Flush left, <strong><em>bold italic</em></strong>, title case</td>
                <td>On the next line, as a new indented paragraph</td>
                <td><strong><em>Working Memory Task</em></strong></td>
              </tr>
              <tr>
                <td>4</td>
                <td>Indented, <strong>bold</strong>, title case, ending with a period</td>
                <td>On the same line, immediately after the period</td>
                <td>&emsp;<strong>Stimuli.</strong> Letters were presented in black&hellip;</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Indented, <strong><em>bold italic</em></strong>, title case, ending with a period</td>
                <td>On the same line, immediately after the period</td>
                <td>&emsp;<strong><em>Practice Trials.</em></strong> Ten practice trials&hellip;</td>
              </tr>
            </tbody>
          </table>
          <p>
            Levels 1 to 3 stand on their own line and the paragraph that follows starts on a new,
            indented line. Levels 4 and 5 are <em>run-in</em> headings: they are indented like a
            normal paragraph, end with a period, and the text of the paragraph continues right
            after that period on the same line. The period is part of the heading, so it is set
            in bold (Level 4) or bold italic (Level 5) along with the words before it.
          </p>
          <p>
            Do not add blank lines above or below a heading, even if the heading falls at the
            bottom of a page; the double spacing of the paper is the only spacing a heading gets.
            A few bold, centered labels look like Level 1 headings but are classed separately as{' '}
            <em>section labels</em> (section 2.28): the paper title on the first page of text, and
            the words Abstract, References, Footnotes and Appendix. Each of those starts a new
            page.
          </p>

          {/* ───────────────────────────── Rules ───────────────────────────── */}
          <h2>Rules for Using APA 7 Headings</h2>
          <p>
            The formatting table answers &quot;what does a Level 3 heading look like?&quot;. These
            rules answer &quot;which headings should be Level 3?&quot;.
          </p>
          <ul>
            <li>
              <strong>No &quot;Introduction&quot; heading.</strong> The first paragraphs of a paper
              are understood to be introductory, so the manual says not to begin with an
              &quot;Introduction&quot; heading. The paper title, repeated in bold and centered at
              the top of the first page of text, acts as the de facto Level 1 heading of the
              introduction. Any subsections inside the introduction therefore use Level 2, and
              their subsections use Level 3.
            </li>
            <li>
              <strong>Use the levels in order.</strong> Every main section begins with a Level 1
              heading, its subsections are Level 2, their subsections are Level 3, and so on. Never
              skip a level (a Level 3 directly under a Level 1) and never pick a level because you
              like how it looks. The number of levels used in one section does not have to match
              another: Method might go down to Level 4 while Discussion has only a Level 1.
            </li>
            <li>
              <strong>Two subsections or none.</strong> As in an outline, avoid having only one
              subsection heading within a section. If Method would contain a single Level 2
              heading, drop the heading and write the material as part of Method.
            </li>
            <li>
              <strong>Headings are never numbered or lettered.</strong> Use plain headings at
              every level, with no numbers, letters or outline labels in front of them. In LaTeX
              this means turning off section numbering, which <code>apa7</code> does for you.
            </li>
            <li>
              <strong>Use title case.</strong> Capitalize the first word, the first word after a
              colon or em dash, and every major word (nouns, verbs including short ones such as{' '}
              <em>Is</em> and <em>Are</em>, adjectives, adverbs and pronouns). Capitalize every
              word of four letters or more, including prepositions such as <em>With</em> and{' '}
              <em>From</em>. Lowercase only short conjunctions, prepositions and articles of three
              letters or fewer (<em>and</em>, <em>of</em>, <em>the</em>, <em>for</em>) unless they
              start the heading. Capitalize both halves of a hyphenated major word
              (<em>Self-Report</em>).
            </li>
            <li>
              <strong>Headings describe content.</strong> Short noun phrases such as Participants,
              Materials and Procedure are the norm in empirical papers. Keep headings concise, and
              do not let a heading do the work of the first sentence of the paragraph beneath it.
            </li>
          </ul>

          {/* ───────────────────────────── Worked Example ───────────────────────────── */}
          <h2>Worked Example: Headings in an APA Student Paper</h2>
          <p>
            Here is the heading outline of a short empirical student paper, with the level of
            each heading marked. The same outline is typeset in the LaTeX documents below.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Heading as it appears</th>
                <th scope="col">Level</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="text-center"><strong>Effects of Sleep Deprivation on Working Memory in Undergraduates</strong></td><td>Title (acts as Level 1)</td></tr>
              <tr><td><strong>Working Memory Under Stress</strong></td><td>2</td></tr>
              <tr><td><strong>The Present Study</strong></td><td>2</td></tr>
              <tr><td className="text-center"><strong>Method</strong></td><td>1</td></tr>
              <tr><td><strong>Participants</strong></td><td>2</td></tr>
              <tr><td><strong>Materials</strong></td><td>2</td></tr>
              <tr><td><strong><em>Working Memory Task</em></strong></td><td>3</td></tr>
              <tr><td>&emsp;<strong>Stimuli.</strong> Letters were presented in black 36-point Arial&hellip;</td><td>4</td></tr>
              <tr><td>&emsp;<strong>Procedure.</strong> Each block lasted four minutes&hellip;</td><td>4</td></tr>
              <tr><td>&emsp;<strong><em>Practice Trials.</em></strong> Ten practice trials preceded&hellip;</td><td>5</td></tr>
              <tr><td>&emsp;<strong><em>Test Trials.</em></strong> Four test blocks followed&hellip;</td><td>5</td></tr>
              <tr><td><strong><em>Sleep Diary</em></strong></td><td>3</td></tr>
              <tr><td className="text-center"><strong>Results</strong></td><td>1</td></tr>
              <tr><td className="text-center"><strong>Discussion</strong></td><td>1</td></tr>
              <tr><td className="text-center"><strong>References</strong></td><td>Section label</td></tr>
            </tbody>
          </table>
          <p>
            Notice how the rules play out. The introduction has no heading of its own; its two
            subsections sit at Level 2 directly under the title. Method, Results and Discussion
            are Level 1. Materials has two Level 3 subsections, Working Memory Task and Sleep
            Diary, and the first of those is detailed enough to need two Level 4 run-in headings,
            one of which splits again into two Level 5 run-in headings. Results and Discussion
            need no subsections at all, which is fine: each section uses only as many levels as
            it needs, starting from Level 1.
          </p>

          {/* ───────────────────────────── LaTeX: apa7 ───────────────────────────── */}
          <h2>APA Headings in LaTeX with the apa7 Class</h2>
          <p>
            The <code>apa7</code> document class implements the 7th-edition rules, headings
            included, so you write ordinary LaTeX sectioning commands and the class takes care of
            the formatting. The mapping is simply the five standard commands in order:
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">LaTeX command</th>
                <th scope="col">APA level</th>
                <th scope="col">What apa7 produces</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\section&#123;Method&#125;</code></td><td>1</td><td>Centered, bold, text on the next line</td></tr>
              <tr><td><code>\subsection&#123;Participants&#125;</code></td><td>2</td><td>Flush left, bold, text on the next line</td></tr>
              <tr><td><code>\subsubsection&#123;Working Memory Task&#125;</code></td><td>3</td><td>Flush left, bold italic, text on the next line</td></tr>
              <tr><td><code>\paragraph&#123;Stimuli&#125;</code></td><td>4</td><td>Indented, bold, period added, text runs in</td></tr>
              <tr><td><code>\subparagraph&#123;Practice Trials&#125;</code></td><td>5</td><td>Indented, bold italic, period added, text runs in</td></tr>
            </tbody>
          </table>
          <p>
            Use <code>\documentclass[stu,12pt]&#123;apa7&#125;</code> for a student paper and{' '}
            <code>\documentclass[man,12pt]&#123;apa7&#125;</code> for a professional manuscript;
            headings are formatted identically in both modes. Headings are unnumbered by default,
            the title is repeated at the top of the first text page as the de facto Level 1
            heading (add the <code>donotrepeattitle</code> option if your instructor does not want
            that), and for Levels 4 and 5 the class appends the period itself, so write{' '}
            <code>\paragraph&#123;Stimuli&#125;</code> rather than{' '}
            <code>\paragraph&#123;Stimuli.&#125;</code>; if you do type the period, apa7 notices and
            does not double it. Title case is your job: the class does not change the
            capitalization of what you type.
          </p>
          <p>
            This is a complete, compilable student paper containing every heading from the worked
            outline. Compile it with <code>pdflatex</code>.
          </p>
          <pre><code>{`\\documentclass[stu,12pt]{apa7}
\\usepackage[american]{babel}

\\title{Effects of Sleep Deprivation on Working Memory in Undergraduates}
\\authorsnames{Jordan A. Rivera}
\\authorsaffiliations{{Department of Psychology, University of Michigan}}
\\course{PSY 240: Cognitive Psychology}
\\professor{Dr. Maria Lopez}
\\duedate{October 19, 2026}

\\begin{document}
\\maketitle

% The title is repeated here as the Level 1 heading of the introduction.
Sleep deprivation is one of the most common stressors reported by
undergraduates, yet its effect on working memory remains contested.

\\section{Method}                     % Level 1
\\subsection{Participants}            % Level 2
Forty-eight undergraduates took part in exchange for course credit.

\\subsection{Materials}               % Level 2
\\subsubsection{Working Memory Task}  % Level 3
Participants completed a visual 2-back task.

\\paragraph{Stimuli}                  % Level 4 (run-in)
Letters were presented in black 36-point Arial on a grey background.

\\paragraph{Procedure}                % Level 4 (run-in)
Each block lasted four minutes.

\\subparagraph{Practice Trials}       % Level 5 (run-in)
Ten practice trials preceded the first block.

\\subparagraph{Test Trials}           % Level 5 (run-in)
Four test blocks followed.

\\subsubsection{Sleep Diary}          % Level 3
Participants logged bedtime and wake time for seven nights.

\\section{Results}                    % Level 1
Accuracy was lower after 24 hours of wakefulness.

\\section{Discussion}                 % Level 1
The results extend earlier findings to a student sample.

\\end{document}`}</code></pre>
          <p>
            The class also sets the 1-inch margins, double spacing and page numbers, and{' '}
            <code>\maketitle</code> builds the student title page from the <code>\course</code>,{' '}
            <code>\professor</code> and <code>\duedate</code> fields; the{' '}
            <Link href="/learn/apa-title-page">APA title page guide</Link> covers those commands
            and the professional-paper equivalents (<code>\shorttitle</code>, <code>\authornote</code>,{' '}
            <code>\abstract</code>). If you would rather not install anything, the{' '}
            <Link href="https://tools.useoctree.com/templates/apa-title-page" target="_blank" rel="noopener noreferrer">Octree APA template</Link>{' '}
            opens an <code>apa7</code> student paper ready to edit in your browser.
          </p>

          {/* ───────────────────────────── LaTeX: titlesec ───────────────────────────── */}
          <h2>APA Headings Without apa7: The titlesec Package</h2>
          <p>
            Sometimes you are stuck with <code>article</code>: a departmental template, a co-author
            who will not change class, or a journal that wants APA-style headings but its own
            layout. The <code>titlesec</code> package can restyle the five standard headings to
            match the APA levels. The preamble below does that and nothing else; it does not build
            a title page or format references.
          </p>
          <pre><code>{`\\documentclass[12pt]{article}
\\usepackage[letterpaper,margin=1in]{geometry}
\\usepackage{setspace}
\\usepackage{titlesec}

\\doublespacing
\\setlength{\\parindent}{0.5in}

% APA headings are not numbered.
\\setcounter{secnumdepth}{0}

% Level 1: centered, bold, title case
\\titleformat{\\section}{\\normalfont\\normalsize\\bfseries\\centering}{}{0pt}{}
% Level 2: flush left, bold, title case
\\titleformat{\\subsection}{\\normalfont\\normalsize\\bfseries}{}{0pt}{}
% Level 3: flush left, bold italic, title case
\\titleformat{\\subsubsection}{\\normalfont\\normalsize\\bfseries\\itshape}{}{0pt}{}
% Level 4: indented, bold, ends with a period, text runs in on the same line
\\titleformat{\\paragraph}[runin]{\\normalfont\\normalsize\\bfseries}{}{0pt}{}[.]
% Level 5: indented, bold italic, ends with a period, text runs in
\\titleformat{\\subparagraph}[runin]{\\normalfont\\normalsize\\bfseries\\itshape}{}{0pt}{}[.]

% No extra space around headings: APA papers are double-spaced throughout.
\\titlespacing*{\\section}{0pt}{0pt}{0pt}
\\titlespacing*{\\subsection}{0pt}{0pt}{0pt}
\\titlespacing*{\\subsubsection}{0pt}{0pt}{0pt}
\\titlespacing*{\\paragraph}{\\parindent}{0pt}{\\wordsep}
\\titlespacing*{\\subparagraph}{\\parindent}{0pt}{\\wordsep}

\\begin{document}

\\section{Method}
\\subsection{Participants}
Forty-eight undergraduates took part in exchange for course credit.

\\subsection{Materials}
\\subsubsection{Working Memory Task}
Participants completed a visual 2-back task.

\\paragraph{Stimuli}
Letters were presented in black 36-point Arial on a grey background.

\\paragraph{Procedure}
Each block lasted four minutes.

\\subparagraph{Practice Trials}
Ten practice trials preceded the first block.

\\subparagraph{Test Trials}
Four test blocks followed.

\\section{Results}
Accuracy was lower after 24 hours of wakefulness.

\\end{document}`}</code></pre>
          <p>
            Line by line: <code>\setcounter&#123;secnumdepth&#125;&#123;0&#125;</code> switches off
            numbering at every level. Each <code>\titleformat</code> takes the font for the heading
            (<code>\normalsize</code> keeps it at body size, <code>\bfseries</code> and{' '}
            <code>\itshape</code> give bold and bold italic, <code>\centering</code> centers Level
            1), an empty label since there is no number, and for Levels 4 and 5 the{' '}
            <code>[runin]</code> shape plus a trailing <code>[.]</code> that appends the period
            after the heading text. The <code>\titlespacing*</code> lines remove the vertical
            space <code>article</code> normally adds around headings, so the double spacing
            carries through, and set the left indent of the run-in headings to{' '}
            <code>\parindent</code> with a normal word space (<code>\wordsep</code>) between the
            period and the first word of the paragraph. Margins, paper size and line spacing come
            from <code>geometry</code> and <code>setspace</code>; the{' '}
            <Link href="/learn/page-size-margins">page size and margins guide</Link> explains those
            options.
          </p>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How many heading levels does APA 7 have, and how many should I use?</h3>
          <p>
            APA 7 defines five heading levels. Use only as many as your paper needs, always
            starting at Level 1 and working down in order: a short student paper often needs just
            Levels 1 and 2, and a journal-length empirical paper rarely needs more than three.
            Every section begins with a Level 1 heading, even if one section has fewer subsections
            than another.
          </p>
          <h3>Does an APA paper have an &quot;Introduction&quot; heading?</h3>
          <p>
            No. The first paragraphs of a paper are understood to be introductory, so APA 7 says
            not to begin with an &quot;Introduction&quot; heading. The paper title, repeated in
            bold and centered at the top of the first page of text, acts as the de facto Level 1
            heading. Subsections inside the introduction therefore start at Level 2.
          </p>
          <h3>What changed in APA headings between the 6th and 7th editions?</h3>
          <p>
            Levels 1 and 2 are unchanged. In APA 6, Level 3 was an indented, bold, sentence-case
            paragraph heading ending with a period, Level 4 was the same in bold italic, and Level
            5 was indented italic. APA 7 moved Level 3 to a flush-left, bold italic, title case
            heading on its own line and made Levels 4 and 5 the indented, title case, run-in
            paragraph headings. All five levels are now in title case.
          </p>
          <h3>How do I make APA headings in LaTeX?</h3>
          <p>
            Use the <code>apa7</code> document class: <code>\documentclass[stu,12pt]&#123;apa7&#125;</code>{' '}
            for a student paper or <code>[man,12pt]</code> for a manuscript. Its <code>\section</code>,{' '}
            <code>\subsection</code>, <code>\subsubsection</code>, <code>\paragraph</code> and{' '}
            <code>\subparagraph</code> commands produce Levels 1 to 5 with the correct alignment,
            bold or bold italic font, run-in layout and terminal period, and headings are
            unnumbered by default. Without <code>apa7</code>, the <code>titlesec</code> package can
            restyle the standard <code>article</code> headings to match.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>Headings are one part of an APA paper; these guides cover the rest:</p>
          <ul>
            <li><Link href="/learn/apa-title-page">APA Title Page Format</Link> – Student and professional title pages, running heads and the full apa7 preamble</li>
            <li><Link href="/learn/sections">Sections in LaTeX</Link> – How \section and friends work in any document class, numbering and the table of contents</li>
            <li><Link href="/learn/page-size-margins">Page Size and Margins</Link> – Letter paper and 1-inch margins with the geometry package</li>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics and Underline</Link> – The emphasis commands behind each heading level</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> – APA-style tables with booktabs</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/templates/apa-title-page" target="_blank" rel="noopener noreferrer">APA Template</Link> – A ready-to-edit apa7 student paper, headings included</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste either document above and see the PDF without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> – Describe your paper and get a starting document</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write your APA paper in Octree</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor: paste the apa7 document above, ask it to add
              a Results subsection or switch to a professional manuscript, and see the compiled
              PDF update as you type.
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
