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

const breadcrumbs = getLearnBreadcrumbs('MLA In-Text Citation', 'mla-in-text-citation')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'mla-in-text-citation',
  title: 'MLA In-Text Citation: Examples for Every Case, Plus LaTeX',
  seoTitle: 'MLA In-Text Citation: Examples + LaTeX',
  description: 'MLA in-text citation examples: one, two or more authors, no author, no page numbers, qtd. in, block quotes and repeat citations, plus the LaTeX commands.',
  keywords: 'mla in text citation, mla in-text citation, mla in text citation example, mla parenthetical citation, mla citation no author, mla citation no page number, mla et al, mla qtd in, mla block quote citation, mla two authors in text, mla same author multiple works, mla 9th edition in text citation, mla citation latex, biblatex mla, autocite mla, mla works cited',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-19'

const faq: FaqItem[] = [
  {
    question: 'What does an MLA in-text citation look like?',
    answer:
      'An MLA in-text citation is the author\'s last name and the page number in parentheses, with no comma and no "p.": (Okafor 23). It goes at the end of the sentence, after a closing quotation mark and before the period. If you name the author in the sentence, give only the page: Okafor argues that attention fragments on screens (23). The name must match the first word of the entry in the Works Cited list so the reader can find the full source.',
  },
  {
    question: 'How do you cite a source with no author in MLA?',
    answer:
      'Use a shortened version of the title in place of the author, formatted the way it appears in the Works Cited entry: quotation marks for an article or web page, italics for a book or website. Shorten to the first noun phrase, so "Reading on Paper vs. Screen: What the Research Says" becomes ("Reading on Paper" 2). Do not use "Anonymous" unless the work is actually signed that way.',
  },
  {
    question: 'How do you cite in MLA when there are no page numbers?',
    answer:
      'Give the author only: (Harrow). Do not count unnumbered paragraphs or invent page numbers from a printout. If the source itself numbers its paragraphs, sections or chapters, use that with a comma after the author: (Harrow, par. 4), (Nakamura, sec. 2), (Okafor, ch. 3). For audio or video, cite the time stamp: (Okafor 00:02:15-20). The comma appears only when a label like par. or ch. follows the name.',
  },
  {
    question: 'How do I make MLA in-text citations in LaTeX?',
    answer:
      'Use the biblatex-mla package from CTAN. Load it with \\usepackage[style=mla]{biblatex}, add \\addbibresource{refs.bib}, and cite with \\autocite[23]{key}, which prints (Okafor 23); \\autocite*[23]{key} prints (23) for sentences that already name the author, and \\autocite[qtd.\\ in][54]{key} prints (qtd. in Okafor 54). \\printbibliography[title={Works Cited}] prints the hanging-indented list. The style needs the biber backend, so run latexmk or compile in an editor that runs biber for you.',
  },
]

export default async function MlaInTextCitationPage() {
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
          <h1>MLA In-Text Citation: Examples for Every Case, Plus LaTeX</h1>
          <p className="lead">
            An <strong>MLA in-text citation</strong> is the author&apos;s last name and a page
            number in parentheses: (Okafor 23). No comma, no &quot;p.&quot;, no year. It points the
            reader to one entry in the Works Cited list, and the page number tells them where in
            that source to look.
          </p>
          <p>
            This page follows the <em>MLA Handbook</em>, 9th edition (2021). It explains the
            author-page rule, then works through every case that changes the basic form: two or
            more authors, corporate authors, no author, no page numbers, two works by one author,
            two authors with the same last name, indirect quotations, block quotes and repeated
            citations of the same source. It ends with a quick-reference table and a tested way to
            write MLA citations in LaTeX. For the Works Cited side, see{' '}
            <Link href="/learn/mla-book-citation">MLA Book Citation</Link>.
          </p>

          {/* ───────────────────────────── Author-page rule ───────────────────────────── */}
          <h2>The Author-Page Rule</h2>
          <p>
            MLA uses <strong>parenthetical citations</strong> built from two elements: whatever
            begins the Works Cited entry (usually the author&apos;s last name) and the location in
            the source (usually a page number). The citation goes at the end of the sentence or
            clause that uses the source, before the period:
          </p>
          <blockquote>
            <p>
              Sustained reading on a screen fragments attention more than reading on paper
              (Okafor 23).
            </p>
          </blockquote>
          <p>
            When the sentence already names the author, the parentheses hold only the page. This is
            called a <em>signal phrase</em>, and it is the form MLA prefers for anything you discuss
            at length:
          </p>
          <blockquote>
            <p>Okafor argues that the effect is strongest in the first ten minutes (31).</p>
          </blockquote>
          <p>
            Every citation must match a Works Cited entry. If the entry begins &quot;Okafor,
            Adaeze,&quot; the citation says Okafor; if the entry begins with a title because there is
            no author, the citation uses the title. The citation is a label, not a description of
            the source.
          </p>

          <h3>Why there is no comma</h3>
          <p>
            The comma is the first thing APA writers get wrong when they switch to MLA. MLA writes
            (Okafor 23); APA writes (Okafor, 2024, p. 23). The MLA citation is deliberately
            minimal: the reader needs only the two pieces the Works Cited list does not already
            give them, the name to look up and the page to turn to. A comma would make &quot;Okafor,
            23&quot; read like a list of two separate things. MLA uses a comma inside the
            parentheses only when something other than a plain page number follows the name: a
            short title (Okafor, <em>Reading Mind</em> 23) or a label such as par. or ch. (Harrow,
            par. 4). Those cases are covered below.
          </p>

          <h3>Punctuation and placement</h3>
          <ul>
            <li>
              The citation comes <strong>before</strong> the sentence&apos;s period and{' '}
              <strong>after</strong> a closing quotation mark: &hellip;&quot;fragments attention&quot;
              (Okafor 23).
            </li>
            <li>
              If the quotation ends in a question mark or exclamation point, keep it inside the
              quotation marks and still add a period after the citation: &quot;Is anyone still
              reading?&quot; (Okafor 40).
            </li>
            <li>
              Put the citation at the end of the clause the source supports, not necessarily the
              end of the sentence: Reading on paper is slower (Okafor 23), but the gain in recall
              more than makes up for it (Harrow and Vance 50).
            </li>
            <li>
              No &quot;p.&quot; or &quot;pp.&quot; before page numbers, and a hyphen or en dash
              for ranges: (Okafor 23-25).
            </li>
          </ul>

          {/* ───────────────────────────── Number of authors ───────────────────────────── */}
          <h2>One, Two and Three or More Authors</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Authors</th>
                <th scope="col">Parenthetical</th>
                <th scope="col">Signal phrase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>One</td>
                <td>(Okafor 23)</td>
                <td>Okafor shows &hellip; (23).</td>
              </tr>
              <tr>
                <td>Two</td>
                <td>(Harrow and Vance 47)</td>
                <td>Harrow and Vance report &hellip; (47).</td>
              </tr>
              <tr>
                <td>Three or more</td>
                <td>(Lindqvist et al. 112)</td>
                <td>Lindqvist et al. treat &hellip; (112).</td>
              </tr>
            </tbody>
          </table>
          <p>
            Write &quot;and&quot;, never an ampersand. With three or more authors, give the first
            author&apos;s last name followed by <em>et al.</em> with a period after &quot;al&quot;
            and no comma before it. In a signal phrase, &quot;et al.&quot; is treated as plural:
            &quot;Lindqvist et al. argue.&quot; The Works Cited entry uses the same cutoff, so
            &quot;Lindqvist, Mikael, et al.&quot; in the list matches &quot;Lindqvist et al.&quot;
            in the text.
          </p>

          {/* ───────────────────────────── Corporate author ───────────────────────────── */}
          <h2>Corporate or Organizational Author</h2>
          <p>
            When a report or page is written by an organization and no person is named, the
            organization is the author: (Ridgeline Literacy Institute 4). Two refinements from the
            handbook:
          </p>
          <ul>
            <li>
              Shorten long names in the parentheses by abbreviating words the handbook lists as
              abbreviable, such as Natl., Assn. and Dept.: (Natl. Reading Council 15). In a signal
              phrase, spell the name out.
            </li>
            <li>
              If the organization is both author and publisher, MLA drops it from the author
              position in the Works Cited entry and starts with the title. The in-text citation
              then uses the title: (<em>Undergraduate Reading Survey</em> 4).
            </li>
          </ul>

          {/* ───────────────────────────── No author ───────────────────────────── */}
          <h2>No Author: Use a Shortened Title</h2>
          <p>
            A source with no author is listed by title in the Works Cited, so the title replaces
            the name in the citation. Shorten it to the first noun phrase and format it the way the
            entry does: quotation marks for an article, web page or chapter, italics for a book,
            film or whole website.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Works Cited begins</th>
                <th scope="col">In-text citation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&quot;Reading on Paper vs. Screen: What the Research Says.&quot; &hellip;</td>
                <td>(&quot;Reading on Paper&quot; 2)</td>
              </tr>
              <tr>
                <td><em>The Northfield Style Handbook</em>. &hellip;</td>
                <td>(<em>Northfield Style Handbook</em> 12)</td>
              </tr>
            </tbody>
          </table>
          <p>
            Keep the first word of the shortened title the same as the first word of the entry
            (ignoring <em>A</em>, <em>An</em> and <em>The</em>), because that is the word the
            reader will scan for in the alphabetical list. Do not write &quot;Anonymous&quot; unless
            the work is actually signed that way.
          </p>

          {/* ───────────────────────────── No page numbers ───────────────────────────── */}
          <h2>No Page Numbers: Web Sources, Paragraphs and Sections</h2>
          <p>
            Most web pages have no page numbers, and MLA does not want you to invent them. The
            rules:
          </p>
          <ul>
            <li>
              <strong>No numbering at all:</strong> cite the author alone, (Harrow), or name the
              author in the sentence and add nothing in parentheses. Do not count paragraphs
              yourself.
            </li>
            <li>
              <strong>Numbered paragraphs, sections or chapters in the source:</strong> use the
              label and number, with a comma after the author: (Harrow, par. 4), (Nakamura, sec.
              2.1), (Okafor, ch. 3). The comma marks that what follows is not a page.
            </li>
            <li>
              <strong>E-books without fixed pages:</strong> cite the chapter, (Okafor, ch. 3),
              rather than a device-dependent location number.
            </li>
            <li>
              <strong>Audio and video:</strong> cite the time stamp as hours:minutes:seconds,
              (Okafor 00:02:15-20), with no comma because it is a location, like a page.
            </li>
          </ul>

          {/* ───────────────────────────── Same author / same name ───────────────────────────── */}
          <h2>Two or More Works by the Same Author</h2>
          <p>
            If your Works Cited lists two works by Adaeze Okafor, (Okafor 23) is ambiguous. Add a
            shortened title after the name, separated by a comma, with no comma between the title
            and the page:
          </p>
          <blockquote>
            <p>
              The effect is strongest in the first ten minutes (Okafor, <em>Reading Mind</em> 31),
              and it survives when the screen is a tablet rather than a laptop (Okafor,
              &quot;Screens&quot; 5).
            </p>
          </blockquote>
          <p>
            In a signal phrase that names the author, give the title and page in parentheses:
            Okafor&apos;s later study found the same pattern (&quot;Screens&quot; 5).
          </p>

          <h2>Two Authors with the Same Last Name</h2>
          <p>
            When two different authors in your list share a last name, add the first initial:
            (A. Okafor 23) and (C. Okafor 88). If the initials also match, use the full first name:
            (Adaeze Okafor 23). This applies only when the last name alone would be ambiguous;
            otherwise never include first names in a citation.
          </p>

          {/* ───────────────────────────── Indirect sources ───────────────────────────── */}
          <h2>Indirect Sources: &quot;qtd. in&quot;</h2>
          <p>
            If you quote someone whose words you found in another source, cite the source you
            actually read and mark it with <em>qtd. in</em>:
          </p>
          <blockquote>
            <p>
              Earlier researchers concluded that &quot;the page is a machine for attention&quot;
              (qtd. in Okafor 54).
            </p>
          </blockquote>
          <p>
            Name the original speaker in your sentence so the reader knows whose words they are.
            Only the source you read, Okafor, appears in the Works Cited. The handbook recommends
            going to the original whenever you can and reserving &quot;qtd. in&quot; for the times
            you cannot.
          </p>

          {/* ───────────────────────────── Block quotes ───────────────────────────── */}
          <h2>Block Quotes</h2>
          <p>
            A quotation that runs to <strong>more than four lines of prose</strong> or{' '}
            <strong>more than three lines of verse</strong> in your paper is set as a block:
          </p>
          <ul>
            <li>Start it on a new line, after an introducing sentence that usually ends with a colon.</li>
            <li>Indent the whole block <strong>0.5 inch</strong> from the left margin; keep the right margin where it is.</li>
            <li>No quotation marks around the block. Keep it double-spaced like the rest of the paper.</li>
            <li>
              Put the parenthetical citation <strong>after the final period</strong> of the quotation,
              with no period after the citation. This is the reverse of the normal rule, where the
              citation comes before the period.
            </li>
            <li>For verse, keep the original line breaks and cite line numbers: (lines 3-5) the first time, then (6-8).</li>
          </ul>
          <p>Okafor describes what readers lose on a screen:</p>
          <blockquote>
            <p>
              The page is a machine for attention. Its edges tell the eye where to stop, its weight
              tells the hand how far there is to go, and nothing on it moves. A screen offers none
              of these signals, and the reader must supply them from memory, which is exactly the
              resource that reading was supposed to be spending on the text. (Okafor 23)
            </p>
          </blockquote>
          <p>
            Notice that the sentence ends with &quot;text.&quot; and the citation follows the
            period. Text that continues after a block quote starts at the left margin without an
            indent unless it begins a new paragraph.
          </p>

          {/* ───────────────────────────── Repeated citations ───────────────────────────── */}
          <h2>Citing the Same Source Repeatedly</h2>
          <p>
            MLA has no <em>ibid.</em> Every citation repeats the author, with two exceptions the
            handbook allows:
          </p>
          <ul>
            <li>
              <strong>Consecutive citations of one source.</strong> If you cite the same source
              several times in a row with no other source in between, you may give only the page
              after the first citation: (Okafor 23) &hellip; (25) &hellip; (31). As soon as another
              source is cited, the next Okafor citation gets the name back.
            </li>
            <li>
              <strong>One source for the whole paper.</strong> If an essay analyzes a single work,
              say so in the first citation or in a sentence (&quot;All quotations are from the 2024
              Brightwater edition&quot;) and give page numbers only from then on.
            </li>
          </ul>
          <p>
            Two or more sources in one parenthesis are separated by semicolons: (Okafor 23; Harrow
            and Vance 47). Order them however suits the sentence; the handbook does not require
            alphabetical order inside a citation.
          </p>

          {/* ───────────────────────────── Examples table ───────────────────────────── */}
          <h2>MLA In-Text Citation Examples: Quick Reference</h2>
          <p>
            Ten <strong>MLA in-text citation examples</strong> for the cases above, all for
            fictional sources. The Works Cited entries they point to are shown in the LaTeX section
            below.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Case</th>
                <th scope="col">Example</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>One author</td>
                <td>(Okafor 23)</td>
                <td>Last name, space, page. No comma.</td>
              </tr>
              <tr>
                <td>Author named in the sentence</td>
                <td>Okafor argues &hellip; (23).</td>
                <td>Page only.</td>
              </tr>
              <tr>
                <td>Two authors</td>
                <td>(Harrow and Vance 47)</td>
                <td>&quot;and&quot;, not &quot;&amp;&quot;.</td>
              </tr>
              <tr>
                <td>Three or more authors</td>
                <td>(Lindqvist et al. 112)</td>
                <td>Period after &quot;al&quot;, no comma before it.</td>
              </tr>
              <tr>
                <td>Corporate author</td>
                <td>(Ridgeline Literacy Institute 4)</td>
                <td>Abbreviate Natl., Assn., Dept. in parentheses.</td>
              </tr>
              <tr>
                <td>No author</td>
                <td>(&quot;Reading on Paper&quot; 2)</td>
                <td>Shortened title, formatted like the entry.</td>
              </tr>
              <tr>
                <td>No page numbers</td>
                <td>(Harrow) or (Harrow, par. 4)</td>
                <td>Comma only before a label such as par. or ch.</td>
              </tr>
              <tr>
                <td>Two works by one author</td>
                <td>(Okafor, <em>Reading Mind</em> 31)</td>
                <td>Comma after the name, none before the page.</td>
              </tr>
              <tr>
                <td>Indirect source</td>
                <td>(qtd. in Okafor 54)</td>
                <td>List only Okafor in the Works Cited.</td>
              </tr>
              <tr>
                <td>Two sources at once</td>
                <td>(Okafor 23; Harrow and Vance 47)</td>
                <td>Semicolon between sources.</td>
              </tr>
            </tbody>
          </table>

          {/* ───────────────────────────── LaTeX ───────────────────────────── */}
          <h2>MLA In-Text Citations in LaTeX</h2>
          <p>
            The <code>biblatex-mla</code> package on CTAN implements the 9th edition for{' '}
            <code>biblatex</code>, so every case above can be generated from a <code>.bib</code>{' '}
            file rather than typed by hand. It is part of a full TeX Live install, which is what
            Octree, Overleaf and MacTeX ship, and it requires the <code>biber</code> backend:
            compile with <code>latexmk -pdf</code>, or in an editor that runs biber for you, rather
            than with plain <code>pdflatex</code> alone.
          </p>

          <h3>The citation commands</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Command</th>
                <th scope="col">Prints</th>
                <th scope="col">Use for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\autocite&#123;okafor2024&#125;</code></td>
                <td>(Okafor)</td>
                <td>A source with no page numbers.</td>
              </tr>
              <tr>
                <td><code>\autocite[23]&#123;okafor2024&#125;</code></td>
                <td>(Okafor 23)</td>
                <td>The standard author-page citation.</td>
              </tr>
              <tr>
                <td><code>\autocite*[31]&#123;okafor2024&#125;</code></td>
                <td>(31)</td>
                <td>When the sentence already names the author.</td>
              </tr>
              <tr>
                <td><code>\autocite[qtd.\ in][54]&#123;okafor2024&#125;</code></td>
                <td>(qtd. in Okafor 54)</td>
                <td>Indirect sources; the first bracket is a prenote.</td>
              </tr>
              <tr>
                <td><code>\autocites[23]&#123;okafor2024&#125;[47]&#123;harrow2022&#125;</code></td>
                <td>(Okafor 23; Harrow and Vance 47)</td>
                <td>Two sources in one parenthesis.</td>
              </tr>
              <tr>
                <td><code>\cite[23]&#123;okafor2024&#125;</code></td>
                <td>Okafor 23</td>
                <td>Inside parentheses you typed yourself, e.g. (see \cite&hellip;).</td>
              </tr>
            </tbody>
          </table>
          <p>
            The style reads the author count from the <code>.bib</code> entry, so two authors come
            out as &quot;Harrow and Vance&quot; and three or more as &quot;Lindqvist et al.&quot;
            without any change to the command. When two works by one author are cited, it adds the
            title itself: give each entry a <code>shorttitle</code> field so the parenthetical reads
            (Okafor, <em>Reading Mind</em> 23) rather than carrying the full title. A corporate
            author written in double braces,{' '}
            <code>&#123;&#123;Ridgeline Literacy Institute&#125;&#125;</code>, is printed in full.
            The style also tracks repeated citations of the same source, so the output can be
            shorter than the command suggests in a run of consecutive citations; check the compiled
            PDF against the rules above.
          </p>

          <h3>Complete example</h3>
          <pre><code>{`\\documentclass[12pt]{article}
\\usepackage[letterpaper,margin=1in]{geometry}
\\usepackage[american]{babel}
\\usepackage{csquotes}
\\usepackage{setspace}
\\usepackage[style=mla]{biblatex}   % biblatex-mla (MLA 9); needs biber
\\addbibresource{refs.bib}
\\doublespacing

\\begin{document}

Sustained reading on a screen fragments attention more than reading on
paper \\autocite[23]{okafor2024}. Okafor argues that the effect is strongest
in the first ten minutes \\autocite*[31]{okafor2024}. Two instructors report
the same pattern in online seminars \\autocite[47]{harrow2022}, and a larger
team treats it as a design problem \\autocite[112]{lindqvist2021}. A survey
of undergraduates found similar habits \\autocite{ridgeline2025}, and one
chapter calls annotation an argument in itself \\autocite[215]{nakamura2022}.
Earlier researchers had reached the same conclusion
\\autocite[qtd.\\ in][54]{okafor2024}. Several studies agree
\\autocites[23]{okafor2024}[47]{harrow2022}.

\\printbibliography[title={Works Cited}]

\\end{document}`}</code></pre>
          <p>The matching <code>refs.bib</code>:</p>
          <pre><code>{`@book{okafor2024,
  author    = {Okafor, Adaeze},
  title     = {The Reading Mind: Attention in the Age of Screens},
  publisher = {Brightwater Press},
  year      = {2024}
}

@book{harrow2022,
  author    = {Harrow, Thomas and Vance, Miriam},
  title     = {Teaching Literature Online},
  publisher = {Northfield University Press},
  year      = {2022}
}

@book{lindqvist2021,
  author    = {Lindqvist, Mikael and Santos, Julia and Nakamura, Kenji},
  title     = {Digital Humanities: A Field Guide},
  publisher = {Ridgeline Academic},
  year      = {2021}
}

@incollection{nakamura2022,
  author    = {Nakamura, Kenji},
  title     = {Annotation as Argument},
  editor    = {Harrow, Thomas and Vance, Miriam},
  booktitle = {Teaching Literature Online},
  publisher = {Northfield University Press},
  year      = {2022},
  pages     = {211--238}
}

@online{ridgeline2025,
  author  = {{Ridgeline Literacy Institute}},
  title   = {Reading Habits of Undergraduates},
  date    = {2025-03-04},
  url     = {https://www.ridgelineliteracy.example/reading-habits},
  urldate = {2026-10-19}
}`}</code></pre>
          <p>
            Three details worth knowing. The <code>\doublespacing</code> from <code>setspace</code>{' '}
            and the 1-inch margins are MLA page formatting, not citation formatting; drop them if
            your template already sets them. The style maps &quot;University Press&quot; in a
            publisher field to &quot;UP&quot;, as the handbook abbreviates it. And{' '}
            <code>\printbibliography</code> would print the heading &quot;Works Cited&quot; even
            without the <code>title</code> option, because the style&apos;s language file sets it;
            the option just makes the intent visible. The Works Cited entries themselves are
            explained on the <Link href="/learn/mla-book-citation">MLA book citation</Link> page.
          </p>

          <h3>Fallback without biblatex</h3>
          <p>
            TeX Live has no MLA 9 style for classic BibTeX, so if your class forbids{' '}
            <code>biblatex</code> the honest option is to type the citations yourself. A one-line
            macro keeps the form consistent, and a hanging-indent macro builds the list. This
            compiles with any engine and needs no biber run:
          </p>
          <pre><code>{`\\documentclass[12pt]{article}
\\usepackage[letterpaper,margin=1in]{geometry}
\\usepackage{setspace}
\\doublespacing

\\newcommand{\\mlacite}[2]{(#1 #2)}  % \\mlacite{Okafor}{23} -> (Okafor 23)
\\newcommand{\\wcentry}[1]{\\noindent\\hangindent=0.5in\\hangafter=1 #1\\par}

\\begin{document}

Sustained reading on a screen fragments attention more than reading on
paper \\mlacite{Okafor}{23}. Two instructors report the same pattern in
online seminars \\mlacite{Harrow and Vance}{47}.

\\clearpage
\\begin{center}Works Cited\\end{center}
\\wcentry{Harrow, Thomas, and Miriam Vance. \\emph{Teaching Literature Online}. Northfield UP, 2022.}
\\wcentry{Okafor, Adaeze. \\emph{The Reading Mind: Attention in the Age of Screens}. Brightwater Press, 2024.}

\\end{document}`}</code></pre>
          <p>
            <code>\hangindent=0.5in</code> with <code>\hangafter=1</code> indents every line of the
            paragraph after the first by half an inch, which is exactly the MLA hanging indent. You
            are responsible for alphabetizing the entries and for matching each{' '}
            <code>\mlacite</code> name to an entry. If you only need a numbered{' '}
            <code>\cite</code> for a draft, remember that a numeric style is not MLA and will have
            to be replaced before submission.
          </p>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What does an MLA in-text citation look like?</h3>
          <p>
            An MLA in-text citation is the author&apos;s last name and the page number in
            parentheses, with no comma and no &quot;p.&quot;: (Okafor 23). It goes at the end of the
            sentence, after a closing quotation mark and before the period. If you name the author
            in the sentence, give only the page: Okafor argues that attention fragments on screens
            (23). The name must match the first word of the entry in the Works Cited list so the
            reader can find the full source.
          </p>
          <h3>How do you cite a source with no author in MLA?</h3>
          <p>
            Use a shortened version of the title in place of the author, formatted the way it
            appears in the Works Cited entry: quotation marks for an article or web page, italics
            for a book or website. Shorten to the first noun phrase, so &quot;Reading on Paper vs.
            Screen: What the Research Says&quot; becomes (&quot;Reading on Paper&quot; 2). Do not use
            &quot;Anonymous&quot; unless the work is actually signed that way.
          </p>
          <h3>How do you cite in MLA when there are no page numbers?</h3>
          <p>
            Give the author only: (Harrow). Do not count unnumbered paragraphs or invent page
            numbers from a printout. If the source itself numbers its paragraphs, sections or
            chapters, use that with a comma after the author: (Harrow, par. 4), (Nakamura, sec. 2),
            (Okafor, ch. 3). For audio or video, cite the time stamp: (Okafor 00:02:15-20). The
            comma appears only when a label like par. or ch. follows the name.
          </p>
          <h3>How do I make MLA in-text citations in LaTeX?</h3>
          <p>
            Use the biblatex-mla package from CTAN. Load it with{' '}
            <code>\usepackage[style=mla]&#123;biblatex&#125;</code>, add{' '}
            <code>\addbibresource&#123;refs.bib&#125;</code>, and cite with{' '}
            <code>\autocite[23]&#123;key&#125;</code>, which prints (Okafor 23);{' '}
            <code>\autocite*[23]&#123;key&#125;</code> prints (23) for sentences that already name
            the author, and <code>\autocite[qtd.\ in][54]&#123;key&#125;</code> prints (qtd. in
            Okafor 54). <code>\printbibliography[title=&#123;Works Cited&#125;]</code> prints the
            hanging-indented list. The style needs the biber backend, so run latexmk or compile in
            an editor that runs biber for you.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>In-text citations are half of MLA documentation; these guides cover the rest:</p>
          <ul>
            <li><Link href="/learn/mla-book-citation">MLA Book Citation</Link> – The Works Cited entry for every kind of book, with the matching in-text form</li>
            <li><Link href="/learn/ama-citation-format">AMA Citation Format</Link> – The numbered medical style, if your next course switches systems</li>
            <li><Link href="/learn/apa-headings">APA Headings</Link> – The five APA 7 heading levels, for papers that use APA instead</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> – MLA allows content notes; this is how to set them</li>
            <li><Link href="/learn/quotes">Quotation Marks in LaTeX</Link> – Curly quotes and the quote environment for block quotations</li>
            <li><Link href="https://tools.useoctree.com/templates/mla-paper" target="_blank" rel="noopener noreferrer">MLA Paper Template</Link> – A LaTeX template with the MLA heading, header, spacing and Works Cited already set up</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste the fallback example above and see the PDF without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">LaTeX Templates</Link> – Essay and article templates ready for a bibliography</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Dashes, ellipses and other punctuation MLA papers need</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write your MLA paper with citations that format themselves</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with biber and latexmk already set up: paste the
              biblatex-mla example above and watch the parenthetical citations and Works Cited
              update as you write.
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
