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

const breadcrumbs = getLearnBreadcrumbs('APA Title Page', 'apa-title-page')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function ApaTitlePagePage() {
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
          <h1>APA Title Page Format (7th Edition): Student and Professional Examples</h1>
          <p className="lead">
            The title page (sometimes called the cover page) is the first page of every APA
            paper. The 7th edition of the <em>Publication Manual</em> defines two versions: a{' '}
            <strong>student</strong> title page for coursework and a{' '}
            <strong>professional</strong> title page for manuscripts submitted for
            publication. This guide lists the exact elements and order for each, the
            formatting rules, two full worked examples, and how to build the page in LaTeX,
            Word, or Google Docs.
          </p>

          {/* ───────────────────────────── Student vs Professional ───────────────────────────── */}
          <h2>Student vs. Professional Title Page</h2>
          <p>
            The two versions share the same title, author, and affiliation block but differ
            in what surrounds it. Use the student version unless your instructor or
            institution tells you otherwise; use the professional version when submitting to
            a journal.
          </p>
          <table>
            <thead>
              <tr>
                <th>Element</th>
                <th>Student paper</th>
                <th>Professional paper</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Page number (top right)</td><td>Yes</td><td>Yes</td></tr>
              <tr><td>Running head (top left, all caps)</td><td>No (unless required by instructor)</td><td>Yes, on every page</td></tr>
              <tr><td>Title (bold, centered)</td><td>Yes</td><td>Yes</td></tr>
              <tr><td>Author name(s)</td><td>Yes</td><td>Yes</td></tr>
              <tr><td>Affiliation (department, university)</td><td>Yes</td><td>Yes</td></tr>
              <tr><td>Course number and name</td><td>Yes</td><td>No</td></tr>
              <tr><td>Instructor name</td><td>Yes</td><td>No</td></tr>
              <tr><td>Assignment due date</td><td>Yes</td><td>No</td></tr>
              <tr><td>Author note</td><td>No</td><td>Yes</td></tr>
            </tbody>
          </table>

          <h3>Student Title Page Elements, in Order</h3>
          <ol>
            <li><strong>Page number</strong> — &quot;1&quot; in the top right corner of the header.</li>
            <li><strong>Title</strong> — bold, centered, in title case, three or four double-spaced lines below the top margin.</li>
            <li><strong>Author name(s)</strong> — one blank double-spaced line below the title. Use first name, middle initial, and last name; omit titles and degrees (no &quot;Dr.&quot;, no &quot;PhD&quot;).</li>
            <li><strong>Affiliation</strong> — the department and institution, e.g. &quot;Department of Psychology, University of Michigan&quot;.</li>
            <li><strong>Course number and name</strong> — exactly as it appears in course materials, e.g. &quot;PSY 101: Introduction to Psychology&quot;.</li>
            <li><strong>Instructor name</strong> — in the form the instructor prefers, e.g. &quot;Dr. Maria Lopez&quot;.</li>
            <li><strong>Assignment due date</strong> — spelled out, e.g. &quot;October 17, 2026&quot;.</li>
          </ol>
          <p>
            Lines 3–7 are centered and double spaced with no extra blank lines between them.
          </p>

          <h3>Professional Title Page Elements, in Order</h3>
          <ol>
            <li><strong>Running head</strong> — an abbreviated title of no more than 50 characters (including spaces), in all capital letters, flush left in the header of every page. Do <em>not</em> prefix it with the words &quot;Running head:&quot; — that was an APA 6 rule.</li>
            <li><strong>Page number</strong> — flush right in the same header line.</li>
            <li><strong>Title</strong> — bold, centered, title case, three or four lines from the top.</li>
            <li><strong>Author name(s)</strong> — one blank line below the title. Two authors are joined with &quot;and&quot;; three or more are separated by commas with &quot;and&quot; before the last. If authors have different affiliations, add superscript numerals after each name.</li>
            <li><strong>Affiliation(s)</strong> — one line per distinct affiliation, numbered to match the superscripts.</li>
            <li><strong>Author note</strong> — the bold, centered heading &quot;Author Note&quot; in the bottom half of the page, followed by up to four left-aligned, indented paragraphs: (1) ORCID iDs, (2) changes of affiliation, (3) disclosures and acknowledgments (funding, conflicts of interest, registration), (4) contact information for the corresponding author. Omit any paragraph that does not apply.</li>
          </ol>

          {/* ───────────────────────────── Formatting Rules ───────────────────────────── */}
          <h2>Formatting Rules That Apply to Both</h2>
          <ul>
            <li><strong>Margins:</strong> 1 inch (2.54 cm) on all four sides.</li>
            <li><strong>Spacing:</strong> double spaced everywhere, including the title page. Do not add extra space before or after paragraphs.</li>
            <li><strong>Font:</strong> one accepted font used consistently throughout the paper. APA 7 lists 12-pt Times New Roman, 11-pt Calibri, 11-pt Arial, 11-pt Georgia, 10-pt Lucida Sans Unicode, and 10-pt Computer Modern (the LaTeX default).</li>
            <li><strong>Title position:</strong> centered and bold, three to four double-spaced lines below the top margin. Press Enter three or four times at double spacing, then type the title.</li>
            <li><strong>Title case:</strong> capitalise the first word, all major words, and any word of four or more letters. Do not use all caps, italics, underlining, or quotation marks.</li>
            <li><strong>Title length:</strong> APA 6 capped titles at 12 words; APA 7 removed the cap but asks for a title that is &quot;focused and succinct&quot;. Around 12 words remains a sensible target. A title longer than one line is split across two centered lines.</li>
            <li><strong>Page number:</strong> top right corner of every page, starting at 1 on the title page, in the same font as the text.</li>
            <li><strong>Running head:</strong> professional papers only. All caps, at most 50 characters, flush left on every page including the title page.</li>
            <li><strong>No labels:</strong> never write &quot;Title:&quot;, &quot;By&quot;, &quot;Author:&quot;, or &quot;Date:&quot; before the elements.</li>
          </ul>

          {/* ───────────────────────────── Student Example ───────────────────────────── */}
          <h2>Example 1: Student Title Page</h2>
          <p>
            Every line below is centered and double spaced. The page number sits in the header
            on the right; there is no running head.
          </p>
          <pre><code>{`                                                                   1



              Effects of Sleep Deprivation on Working Memory in Undergraduates

                                   Jordan A. Rivera

                   Department of Psychology, University of Michigan

                             PSY 240: Cognitive Psychology

                                   Dr. Maria Lopez

                                  October 17, 2026`}</code></pre>
          <p>
            Note the single blank double-spaced line between the title and the author name,
            and that the remaining lines run together without blank lines.
          </p>

          {/* ───────────────────────────── Professional Example ───────────────────────────── */}
          <h2>Example 2: Professional Title Page</h2>
          <p>
            The header now carries the running head on the left and the page number on the
            right. Two authors from different institutions get superscript numerals, and the
            author note sits in the bottom half of the page.
          </p>
          <pre><code>{`SLEEP DEPRIVATION AND WORKING MEMORY                                1



              Effects of Sleep Deprivation on Working Memory in Undergraduates

                        Jordan A. Rivera¹ and Priya S. Natarajan²

                  ¹ Department of Psychology, University of Michigan

                 ² School of Cognitive Science, University of Toronto





                                    Author Note

     Jordan A. Rivera  https://orcid.org/0000-0002-1825-0097

     Priya S. Natarajan  https://orcid.org/0000-0001-5109-3700

     Priya S. Natarajan is now at the Department of Psychology, McGill
University.

     This research was supported by Grant 123-456 from the National Science
Foundation. We have no conflicts of interest to disclose.

     Correspondence concerning this article should be addressed to Jordan A.
Rivera, Department of Psychology, University of Michigan, 530 Church Street,
Ann Arbor, MI 48109, United States. Email: jrivera@umich.edu`}</code></pre>

          {/* ───────────────────────────── LaTeX ───────────────────────────── */}
          <h2>APA Title Page in LaTeX with the apa7 Class</h2>
          <p>
            The <code>apa7</code> document class implements the 7th-edition rules, including
            the title page, so you never place elements by hand. The <code>stu</code> option
            produces a student title page and <code>man</code> produces a professional
            (manuscript) one. The class defaults to Computer Modern, which APA accepts; add{' '}
            <code>\usepackage&#123;mathptmx&#125;</code> if your instructor insists on Times New Roman.
          </p>

          <h3>Student Version</h3>
          <p>
            This is a complete, compilable document. The <code>donotrepeattitle</code> option
            stops the title from being printed again at the top of the first text page, which
            many instructors prefer.
          </p>
          <pre><code>{`\\documentclass[stu,12pt,donotrepeattitle]{apa7}
\\usepackage[american]{babel}
\\usepackage{csquotes}
\\usepackage[style=apa,backend=biber]{biblatex}
\\addbibresource{references.bib}

\\title{Effects of Sleep Deprivation on Working Memory in Undergraduates}
\\authorsnames{Jordan A. Rivera}
\\authorsaffiliations{{Department of Psychology, University of Michigan}}
\\course{PSY 240: Cognitive Psychology}
\\professor{Dr. Maria Lopez}
\\duedate{October 17, 2026}

\\begin{document}
\\maketitle

Sleep deprivation is one of the most common stressors reported by
undergraduates, yet its effect on working memory capacity remains
contested \\parencite{lim2010}.

\\printbibliography
\\end{document}`}</code></pre>
          <p>
            Compile with <code>pdflatex</code> (or run <code>biber</code> between two{' '}
            <code>pdflatex</code> passes once you cite something). If you have no references
            yet, delete the three <code>biblatex</code> lines and the{' '}
            <code>\printbibliography</code> call.
          </p>

          <h3>Professional Version</h3>
          <p>
            In manuscript mode you supply the running head with <code>\shorttitle</code>, list
            authors and affiliations with <code>\authorsnames</code> and{' '}
            <code>\authorsaffiliations</code>, and write the author note with{' '}
            <code>\authornote</code>. The class prints &quot;Author Note&quot; and positions
            it for you.
          </p>
          <pre><code>{`\\documentclass[man,12pt]{apa7}
\\usepackage[american]{babel}
\\usepackage{csquotes}
\\usepackage[style=apa,backend=biber]{biblatex}
\\addbibresource{references.bib}

\\title{Effects of Sleep Deprivation on Working Memory in Undergraduates}
\\shorttitle{Sleep Deprivation and Working Memory}
\\authorsnames[1,2]{Jordan A. Rivera, Priya S. Natarajan}
\\authorsaffiliations{
  {Department of Psychology, University of Michigan},
  {School of Cognitive Science, University of Toronto}}
\\authornote{
  \\addORCIDlink{Jordan A. Rivera}{0000-0002-1825-0097}

  Priya S. Natarajan is now at the Department of Psychology, McGill University.

  This research was supported by Grant 123-456 from the National Science
  Foundation. We have no conflicts of interest to disclose.

  Correspondence concerning this article should be addressed to
  Jordan A. Rivera, Department of Psychology, University of Michigan,
  530 Church Street, Ann Arbor, MI 48109, United States.
  Email: jrivera@umich.edu}

\\abstract{Forty-eight undergraduates completed an n-back task after
either a full night of sleep or 24 hours of wakefulness.}
\\keywords{sleep deprivation, working memory, n-back}

\\begin{document}
\\maketitle

Sleep deprivation is one of the most common stressors reported by
undergraduates \\parencite{lim2010}.

\\printbibliography
\\end{document}`}</code></pre>
          <p>
            The numbers in <code>\authorsnames[1,2]</code> map each author to an entry in{' '}
            <code>\authorsaffiliations</code>; authors who share an affiliation share a
            number. <code>\shorttitle</code> is converted to uppercase automatically. If you
            would rather not install anything, the{' '}
            <Link href="https://tools.useoctree.com/templates/apa-title-page" target="_blank" rel="noopener noreferrer">Octree APA title page template</Link>{' '}
            opens the student version ready to edit in your browser.
          </p>

          {/* ───────────────────────────── Word / Google Docs ───────────────────────────── */}
          <h2>Building the Title Page in Word or Google Docs</h2>
          <h3>Microsoft Word</h3>
          <ol>
            <li><em>Layout → Margins → Normal</em> sets 1-inch margins.</li>
            <li>Select the font and size (e.g. Times New Roman 12), then <em>Home → Line and Paragraph Spacing → 2.0</em>. Open <em>Line Spacing Options</em> and set <em>Before</em> and <em>After</em> to 0 pt.</li>
            <li><em>Insert → Page Number → Top of Page → Plain Number 3</em> places the number top right. For a professional paper, with the header still open, type the running head in capitals at the left and press Tab until the number sits at the right margin. Do not tick &quot;Different First Page&quot; — APA 7 uses the same header on every page.</li>
            <li>Close the header, press Enter three or four times, click <em>Center</em> and <em>Bold</em>, and type the title.</li>
            <li>Press Enter twice (one blank line), turn bold off, and type the author, affiliation, course, instructor, and due date on consecutive lines.</li>
            <li><em>Insert → Page Break</em> to start page 2.</li>
          </ol>
          <h3>Google Docs</h3>
          <ol>
            <li><em>File → Page setup</em>: set all margins to 1 inch.</li>
            <li>Choose the font, then <em>Format → Line &amp; paragraph spacing → Double</em> and remove space before/after paragraphs under <em>Custom spacing</em>.</li>
            <li><em>Insert → Page numbers</em> and pick the option with the number in the top right of every page. For a running head, <em>Insert → Headers &amp; footers → Header</em>, type the uppercase short title, and use a right tab stop or Tab to push the number to the margin.</li>
            <li>Press Enter three or four times, center and bold the title, add one blank line, then the remaining lines.</li>
            <li><em>Insert → Break → Page break</em>.</li>
          </ol>

          {/* ───────────────────────────── Common Mistakes ───────────────────────────── */}
          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Adding a running head to a student paper.</strong> Student papers have only a page number unless the instructor asks for more.</li>
            <li><strong>Writing &quot;Running head:&quot; before the running head.</strong> The label was removed in APA 7; the header shows only the uppercase short title.</li>
            <li><strong>Leaving the title in regular weight.</strong> APA 7 made the title bold (it was plain in APA 6).</li>
            <li><strong>Placing the title at the very top of the page.</strong> It belongs three or four double-spaced lines down, in the upper half of the page.</li>
            <li><strong>Forgetting the blank line between the title and the author.</strong> It is the only extra blank line on the page.</li>
            <li><strong>Including degrees or titles with author names</strong> (&quot;Jordan Rivera, BSc&quot;). Names only.</li>
            <li><strong>Adding labels</strong> such as &quot;By&quot;, &quot;Submitted to&quot;, or &quot;Date:&quot;, or decorating the page with a logo or border.</li>
            <li><strong>Mixing fonts</strong> between the title page and the body, or using a decorative font for the title.</li>
            <li><strong>Single spacing the title page</strong> to make it look tidier. It must be double spaced like everything else.</li>
            <li><strong>Putting the page number at the bottom</strong> or starting numbering on page 2. The title page is page 1 and the number goes top right.</li>
          </ul>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>Is an APA cover page the same as an APA title page?</h3>
          <p>
            Yes. &quot;Cover page&quot; is the informal name; the <em>Publication Manual</em>{' '}
            calls it the title page. There is no separate cover sheet in APA style.
          </p>
          <h3>Does APA 7 require a running head?</h3>
          <p>
            Only for professional papers. Student papers omit it. If your instructor asks for
            one, format it the professional way: uppercase, at most 50 characters, flush left
            on every page, without the words &quot;Running head&quot;.
          </p>
          <h3>Does the title page count as page 1?</h3>
          <p>
            Yes. Numbering starts at 1 on the title page and continues through the abstract,
            body, references, and appendices.
          </p>
          <h3>What if the authors have different affiliations?</h3>
          <p>
            Use superscript numerals after each author&apos;s name and list each affiliation on
            its own line, preceded by the matching numeral. If every author shares one
            affiliation, no numerals are needed.
          </p>
          <h3>Can I use Arial or Calibri instead of Times New Roman?</h3>
          <p>
            Yes. APA 7 accepts 11-pt Arial, 11-pt Calibri, 11-pt Georgia, 10-pt Lucida Sans
            Unicode, 10-pt Computer Modern, and 12-pt Times New Roman. Use the same font for
            the whole paper.
          </p>
          <h3>Do I need an abstract after the title page?</h3>
          <p>
            Professional papers always include an abstract on page 2. Student papers include
            one only if the assignment asks for it. In <code>apa7</code>, the abstract is
            printed automatically when you supply <code>\abstract&#123;...&#125;</code>.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>With the title page in place, finish the rest of the document:</p>
          <ul>
            <li><Link href="/learn/page-size-margins">Page Size and Margins in LaTeX</Link> – Set 1-inch margins and letter paper with the geometry package</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> – The fundamentals you need to write the body of an APA paper</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> – APA-style tables with booktabs</li>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics and Underline</Link> – Emphasis rules that match APA headings</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/templates/apa-title-page" target="_blank" rel="noopener noreferrer">APA Title Page Template</Link> – A ready-to-edit apa7 student title page</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Compile the examples above with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> – Describe your paper and get a starting document</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="APA" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree – the AI-powered LaTeX editor that makes writing faster and easier.
              Start from an APA template and compile to PDF in one click.
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
    title: 'APA Title Page Format (7th Edition): Student and Professional Examples',
    description: 'How to format an APA 7 title page: exact elements and order for student and professional papers, fonts, margins, spacing, running head rules, two full examples, and complete LaTeX (apa7), Word, and Google Docs instructions.',
    keywords: 'apa title page format, apa format title page, apa title page example, apa 7 title page, apa cover page, apa title page latex, apa 7th edition title page, apa student title page, apa professional title page, apa running head, apa7 latex class, apa title page word, apa title page google docs',
    openGraph: mergeOpenGraph({
      title: 'APA Title Page Format (7th Edition): Student and Professional Examples',
      description: 'Exact APA 7 title page elements, formatting rules, worked examples, and LaTeX, Word, and Google Docs instructions.',
      type: 'article',
      url: '/learn/apa-title-page',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'APA Title Page Format (7th Edition)',
      description: 'Student and professional APA 7 title page examples with LaTeX, Word, and Google Docs how-tos.',
    },
    alternates: {
      canonical: '/learn/apa-title-page',
    },
  }
}
