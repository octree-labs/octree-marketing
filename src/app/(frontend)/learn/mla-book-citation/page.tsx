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

const breadcrumbs = getLearnBreadcrumbs('MLA Book Citation', 'mla-book-citation')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'mla-book-citation',
  title: 'MLA Book Citation: How to Cite a Book in MLA 9, Plus LaTeX',
  seoTitle: 'MLA Book Citation: Examples + LaTeX',
  description: 'How to cite a book in MLA 9: Works Cited pattern, examples for several authors, edited, translated, e-book and no-author books, in-text forms, and LaTeX.',
  keywords: 'mla book citation, how to cite a book in mla, mla citation book, mla works cited book, mla book citation example, mla edited book citation, mla chapter citation, mla translated book, mla ebook citation, mla book with two authors, mla et al works cited, mla 9th edition book citation, hanging indent mla, mla citation latex, biblatex mla, bibtex book mla, works cited latex',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-19'

const faq: FaqItem[] = [
  {
    question: 'How do you cite a book in MLA format?',
    answer:
      'The Works Cited entry is Author\'s Last Name, First Name. Title of Book in Italics. Publisher, Year. For example: Okafor, Adaeze. The Reading Mind: Attention in the Age of Screens. Brightwater Press, 2024. Capitalize the title in title case, drop business words such as Inc. and Co. from the publisher, shorten University Press to UP, and give the most recent publication year on the copyright page. The in-text citation is the author\'s last name and page number: (Okafor 23).',
  },
  {
    question: 'How do you cite a book with multiple authors in MLA?',
    answer:
      'Two authors: reverse only the first name and join them with "and": Harrow, Thomas, and Miriam Vance. Three or more: give the first author reversed followed by et al.: Lindqvist, Mikael, et al. The in-text citations follow the same cutoff: (Harrow and Vance 47) and (Lindqvist et al. 112). Never use an ampersand, and never list more than the first author when there are three or more.',
  },
  {
    question: 'How do you cite a chapter from an edited book in MLA?',
    answer:
      'Start with the chapter author and the chapter title in quotation marks, then the book title in italics, "edited by" and the editors\' names in normal order, the publisher, the year, and the page range with pp.: Nakamura, Kenji. "Annotation as Argument." Teaching Literature Online, edited by Thomas Harrow and Miriam Vance, Northfield UP, 2022, pp. 211-38. Cite the chapter author in the text: (Nakamura 215). Cite the whole collection instead only when you are discussing the book as a whole, in which case the editors are the authors and the entry ends their names with "editors".',
  },
  {
    question: 'How do I make an MLA Works Cited list in LaTeX?',
    answer:
      'Use the biblatex-mla package from CTAN: \\usepackage[style=mla]{biblatex}, then \\addbibresource{books.bib} and \\printbibliography[title={Works Cited}] where the list should appear. Books go in the .bib file as @book entries with author, title, publisher and year; chapters of edited collections as @incollection with editor, booktitle and pages; and titled chapters of a single-author book as @inbook. The style alphabetizes the list, applies the 0.5-inch hanging indent, abbreviates University Press to UP and compresses page ranges. It needs the biber backend, which latexmk, Octree and Overleaf run automatically.',
  },
]

export default async function MlaBookCitationPage() {
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
          <h1>MLA Book Citation: How to Cite a Book in MLA 9, Plus LaTeX</h1>
          <p className="lead">
            An <strong>MLA book citation</strong> in the Works Cited list has four parts in a fixed
            order: Author. <em>Title</em>. Publisher, Year. Everything else in this guide, from two
            authors to translated classics, is a variation on that line.
          </p>
          <p>
            This page follows the <em>MLA Handbook</em>, 9th edition (2021). It gives the core
            pattern, then the Works Cited entry and the matching in-text citation for twelve kinds
            of book, the rules for alphabetizing and indenting the list, a ten-row reference table,
            and a way to generate the whole list from a <code>.bib</code> file in LaTeX. The in-text
            side is covered in depth in{' '}
            <Link href="/learn/mla-in-text-citation">MLA In-Text Citation</Link>.
          </p>

          {/* ───────────────────────────── Core pattern ───────────────────────────── */}
          <h2>How to Cite a Book in MLA: The Core Pattern</h2>
          <p className="text-center">
            Last Name, First Name. <em>Title of Book: Subtitle</em>. Publisher, Year.
          </p>
          <blockquote>
            <p>
              Okafor, Adaeze. <em>The Reading Mind: Attention in the Age of Screens</em>.
              Brightwater Press, 2024.
            </p>
          </blockquote>
          <p>In the text, that book is cited as (Okafor 23). Element by element:</p>
          <table>
            <thead>
              <tr>
                <th scope="col">Element</th>
                <th scope="col">Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Author</td>
                <td>
                  Last name, comma, first name (and middle name or initial if the book shows one),
                  then a period. Omit degrees and titles such as PhD or Dr.
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  Italics, title case (capitalize every word except articles, prepositions and
                  coordinating conjunctions in the middle), subtitle after a colon, period at the
                  end.
                </td>
              </tr>
              <tr>
                <td>Publisher</td>
                <td>
                  Drop business words (Inc., Co., Ltd., Press is kept) and initial articles;
                  write University Press as UP (Oxford UP, U of Chicago P). When the author is
                  also the publisher, begin the entry with the title and name the organization
                  only as publisher.
                </td>
              </tr>
              <tr>
                <td>Year</td>
                <td>
                  The most recent year on the copyright page, not the first printing. No place of
                  publication and no medium (&quot;Print&quot;); both were dropped in MLA 8.
                </td>
              </tr>
            </tbody>
          </table>

          {/* ───────────────────────────── Cases ───────────────────────────── */}
          <h2>MLA Book Citation Examples by Type</h2>
          <p>
            Each example is for a fictional book and gives the Works Cited entry followed by its
            in-text citation. Page ranges in Works Cited entries are compressed the way the
            handbook does it: 211-38, not 211-238.
          </p>

          <h3>One author</h3>
          <blockquote>
            <p>
              Okafor, Adaeze. <em>The Reading Mind: Attention in the Age of Screens</em>.
              Brightwater Press, 2024.
            </p>
            <p>In-text: (Okafor 23)</p>
          </blockquote>

          <h3>Two authors</h3>
          <p>Reverse only the first author&apos;s name and join the two with &quot;and&quot;:</p>
          <blockquote>
            <p>
              Harrow, Thomas, and Miriam Vance. <em>Teaching Literature Online</em>. Northfield UP,
              2022.
            </p>
            <p>In-text: (Harrow and Vance 47)</p>
          </blockquote>

          <h3>Three or more authors</h3>
          <p>Give the first author followed by a comma and <em>et al.</em>; the others are not listed:</p>
          <blockquote>
            <p>
              Lindqvist, Mikael, et al. <em>Digital Humanities: A Field Guide</em>. Ridgeline
              Academic, 2021.
            </p>
            <p>In-text: (Lindqvist et al. 112)</p>
          </blockquote>

          <h3>Edited book (citing the whole collection)</h3>
          <p>
            The editors take the author position, followed by the label <em>editor</em> or{' '}
            <em>editors</em>:
          </p>
          <blockquote>
            <p>
              Harrow, Thomas, and Miriam Vance, editors. <em>Teaching Literature Online</em>.
              Northfield UP, 2022.
            </p>
            <p>In-text: (Harrow and Vance 12)</p>
          </blockquote>

          <h3>Chapter in an edited collection</h3>
          <p>
            This is the form you need far more often. The chapter author comes first, the chapter
            title goes in quotation marks, the book title in italics, then &quot;edited by&quot;
            and the editors in normal order, the publisher, the year and the page range with
            &quot;pp.&quot;:
          </p>
          <blockquote>
            <p>
              Nakamura, Kenji. &quot;Annotation as Argument.&quot; <em>Teaching Literature Online</em>,
              edited by Thomas Harrow and Miriam Vance, Northfield UP, 2022, pp. 211-38.
            </p>
            <p>In-text: (Nakamura 215)</p>
          </blockquote>
          <p>
            Note the commas: after the book title and after the editors, because from the title
            onward the entry describes a single container. A titled chapter or essay in a book by
            one author uses the same shape without the editors: Okafor, Adaeze. &quot;The
            Ten-Minute Cliff.&quot; <em>The Reading Mind</em>, Brightwater Press, 2024, pp. 41-66.
          </p>

          <h3>Translated book</h3>
          <p>&quot;Translated by&quot; and the translator&apos;s name follow the title:</p>
          <blockquote>
            <p>
              Reyes, Paloma. <em>The Glass Orchard</em>. Translated by Kenji Nakamura, Brightwater
              Press, 2019.
            </p>
            <p>In-text: (Reyes 90)</p>
          </blockquote>
          <p>
            If your paper is about the translation itself, put the translator first: Nakamura,
            Kenji, translator. <em>The Glass Orchard</em>. By Paloma Reyes, Brightwater Press, 2019.
            Cite it as (Nakamura 90).
          </p>

          <h3>Edition other than the first</h3>
          <p>The edition goes after the title, as an ordinal with &quot;ed.&quot;, followed by a comma:</p>
          <blockquote>
            <p>
              Vance, Miriam. <em>Close Reading in the Classroom</em>. 2nd ed., Northfield UP, 2023.
            </p>
            <p>In-text: (Vance 58)</p>
          </blockquote>
          <p>
            Named editions work the same way, abbreviated as the handbook does: Rev. ed., Expanded
            ed. The edition is required
            because page numbers differ between editions.
          </p>

          <h3>E-book</h3>
          <p>
            MLA 9 treats an e-book as a version of the book. Write &quot;E-book ed.&quot; in the
            edition slot, or the platform&apos;s name if that is more specific (Kindle ed.):
          </p>
          <blockquote>
            <p>
              Okafor, Adaeze. <em>The Reading Mind: Attention in the Age of Screens</em>. E-book
              ed., Brightwater Press, 2024.
            </p>
            <p>In-text: (Okafor, ch. 3)</p>
          </blockquote>
          <p>
            Because e-book &quot;locations&quot; change with the device and font size, cite the
            chapter rather than a page, with a comma after the author. If the e-book has fixed page
            numbers (most PDFs do), cite them as usual.
          </p>

          <h3>Multivolume work</h3>
          <p>When you use one volume, name it after the title; when you use several, give the total after the year:</p>
          <blockquote>
            <p>
              Santos, Julia. <em>A History of the Printed Page</em>. Vol. 2, Ridgeline Academic,
              2020.
            </p>
            <p>In-text: (Santos 140)</p>
            <p>
              Santos, Julia. <em>A History of the Printed Page</em>. Ridgeline Academic, 2020. 4
              vols.
            </p>
            <p>In-text: (Santos 2: 140)</p>
          </blockquote>
          <p>
            The volume number is needed in the text only when the entry covers more than one
            volume; the colon and space separate volume from page.
          </p>

          <h3>Republished or classic work</h3>
          <p>
            The original publication year goes right after the title; the edition you read supplies
            the publisher and year:
          </p>
          <blockquote>
            <p>
              Calloway, Eleanor. <em>The Lamplighters</em>. 1899. Brightwater Press, 2018.
            </p>
            <p>In-text: (Calloway 34)</p>
          </blockquote>
          <p>
            The original date is optional but helpful whenever a reader could mistake a reprint for
            a recent work. For a classic that has been edited, add the editor after the title:{' '}
            <em>The Lamplighters</em>. 1899. Edited by Thomas Harrow, Northfield UP, 2018.
          </p>

          <h3>Corporate author</h3>
          <blockquote>
            <p>
              Ridgeline Literacy Institute. <em>Undergraduate Reading Survey 2025</em>. Northfield
              UP, 2025.
            </p>
            <p>In-text: (Ridgeline Literacy Institute 4)</p>
          </blockquote>
          <p>
            When the organization is also the publisher, skip the author and begin with the title,
            giving the organization only as publisher: <em>Undergraduate Reading Survey 2025</em>.
            Ridgeline Literacy Institute, 2025. The in-text citation then uses the title:
            (<em>Undergraduate Reading Survey</em> 4).
          </p>

          <h3>No author</h3>
          <p>Begin with the title and alphabetize by it, ignoring <em>A</em>, <em>An</em> and <em>The</em>:</p>
          <blockquote>
            <p>
              <em>The Northfield Style Handbook</em>. Northfield UP, 2022.
            </p>
            <p>In-text: (<em>Northfield Style Handbook</em> 12)</p>
          </blockquote>

          {/* ───────────────────────────── List rules ───────────────────────────── */}
          <h2>Formatting the Works Cited List</h2>
          <ul>
            <li>
              <strong>Heading.</strong> &quot;Works Cited&quot; centered at the top of a new page,
              in the same font as the text, not bold, not underlined. Use &quot;Work Cited&quot; if
              there is only one entry.
            </li>
            <li>
              <strong>Spacing.</strong> Double-spaced throughout, with no extra space between
              entries.
            </li>
            <li>
              <strong>Hanging indent.</strong> The first line of each entry starts at the left
              margin; every following line is indented 0.5 inch. This is what lets the reader scan
              the author names.
            </li>
            <li>
              <strong>Alphabetical order</strong> by the first word of each entry, letter by letter.
              Authors sort by last name; titles sort by their first word ignoring <em>A</em>,{' '}
              <em>An</em> and <em>The</em>. &quot;Lindqvist, Mikael, et al.&quot; sorts under L
              regardless of the other authors.
            </li>
            <li>
              <strong>Same author, several works.</strong> Give the name in the first entry only;
              in later entries replace it with three hyphens and a period (---.), or three em
              dashes used consistently, and order those entries alphabetically by title. A work
              the author wrote alone comes before works written with others, and a co-authored
              entry repeats the full name rather than the dashes.
            </li>
            <li>
              <strong>One entry per source.</strong> A book you cite twenty times appears once.
            </li>
          </ul>

          {/* ───────────────────────────── Examples table ───────────────────────────── */}
          <h2>MLA Book Citation Examples: Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Works Cited entry</th>
                <th scope="col">In-text</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>One author</td>
                <td>Okafor, Adaeze. <em>The Reading Mind: Attention in the Age of Screens</em>. Brightwater Press, 2024.</td>
                <td>(Okafor 23)</td>
              </tr>
              <tr>
                <td>Two authors</td>
                <td>Harrow, Thomas, and Miriam Vance. <em>Teaching Literature Online</em>. Northfield UP, 2022.</td>
                <td>(Harrow and Vance 47)</td>
              </tr>
              <tr>
                <td>Three or more</td>
                <td>Lindqvist, Mikael, et al. <em>Digital Humanities: A Field Guide</em>. Ridgeline Academic, 2021.</td>
                <td>(Lindqvist et al. 112)</td>
              </tr>
              <tr>
                <td>Edited book</td>
                <td>Harrow, Thomas, and Miriam Vance, editors. <em>Teaching Literature Online</em>. Northfield UP, 2022.</td>
                <td>(Harrow and Vance 12)</td>
              </tr>
              <tr>
                <td>Chapter in a collection</td>
                <td>Nakamura, Kenji. &quot;Annotation as Argument.&quot; <em>Teaching Literature Online</em>, edited by Thomas Harrow and Miriam Vance, Northfield UP, 2022, pp. 211-38.</td>
                <td>(Nakamura 215)</td>
              </tr>
              <tr>
                <td>Translated</td>
                <td>Reyes, Paloma. <em>The Glass Orchard</em>. Translated by Kenji Nakamura, Brightwater Press, 2019.</td>
                <td>(Reyes 90)</td>
              </tr>
              <tr>
                <td>Later edition</td>
                <td>Vance, Miriam. <em>Close Reading in the Classroom</em>. 2nd ed., Northfield UP, 2023.</td>
                <td>(Vance 58)</td>
              </tr>
              <tr>
                <td>One volume of a set</td>
                <td>Santos, Julia. <em>A History of the Printed Page</em>. Vol. 2, Ridgeline Academic, 2020.</td>
                <td>(Santos 140)</td>
              </tr>
              <tr>
                <td>Republished classic</td>
                <td>Calloway, Eleanor. <em>The Lamplighters</em>. 1899. Brightwater Press, 2018.</td>
                <td>(Calloway 34)</td>
              </tr>
              <tr>
                <td>No author</td>
                <td><em>The Northfield Style Handbook</em>. Northfield UP, 2022.</td>
                <td>(<em>Northfield Style Handbook</em> 12)</td>
              </tr>
            </tbody>
          </table>

          {/* ───────────────────────────── LaTeX ───────────────────────────── */}
          <h2>MLA Book Citations in LaTeX</h2>
          <p>
            In LaTeX the Works Cited list is generated from a <code>.bib</code> file by the{' '}
            <code>biblatex-mla</code> package, which is on CTAN and in every full TeX Live install.
            Load it with <code>\usepackage[style=mla]&#123;biblatex&#125;</code>; it uses the{' '}
            <code>biber</code> backend, so compile with <code>latexmk -pdf</code> or in an editor
            that runs biber between passes.
          </p>

          <h3>The .bib entry types for books</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Book type</th>
                <th scope="col">Entry type</th>
                <th scope="col">Fields MLA needs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Whole book, any number of authors</td>
                <td><code>@book</code></td>
                <td><code>author</code>, <code>title</code>, <code>publisher</code>, <code>year</code>; plus <code>edition</code>, <code>volume</code>, <code>translator</code> or <code>origdate</code> as needed</td>
              </tr>
              <tr>
                <td>Edited collection cited as a whole</td>
                <td><code>@collection</code></td>
                <td><code>editor</code> instead of <code>author</code>, then <code>title</code>, <code>publisher</code>, <code>year</code></td>
              </tr>
              <tr>
                <td>Chapter in an edited collection</td>
                <td><code>@incollection</code></td>
                <td><code>author</code>, <code>title</code> (the chapter), <code>editor</code>, <code>booktitle</code>, <code>publisher</code>, <code>year</code>, <code>pages</code></td>
              </tr>
              <tr>
                <td>Titled chapter of a single-author book</td>
                <td><code>@inbook</code></td>
                <td><code>author</code>, <code>title</code> (the chapter), <code>booktitle</code>, <code>publisher</code>, <code>year</code>, <code>pages</code></td>
              </tr>
            </tbody>
          </table>
          <p>
            Write authors as <code>Last, First and Last, First</code>; the style reverses only the
            first name and switches to &quot;et al.&quot; at three authors, as the handbook does.
            Put a corporate author in double braces, <code>&#123;&#123;Ridgeline Literacy
            Institute&#125;&#125;</code>, so biber does not split it into a first and last name.
            Type the full publisher name; the style replaces &quot;University Press&quot; with
            &quot;UP&quot; itself. Give page ranges with a double hyphen, <code>211--238</code>,
            and the style compresses them to 211-38 with the &quot;pp.&quot; prefix.
          </p>

          <h3>Complete example</h3>
          <pre><code>{`\\documentclass[12pt]{article}
\\usepackage[letterpaper,margin=1in]{geometry}
\\usepackage[american]{babel}
\\usepackage{csquotes}
\\usepackage{setspace}
\\usepackage[style=mla]{biblatex}   % biblatex-mla (MLA 9); needs biber
\\addbibresource{books.bib}
\\doublespacing

\\begin{document}

One author \\autocite[23]{okafor2024}, two authors \\autocite[47]{harrow2022},
three or more \\autocite[112]{lindqvist2021}, a whole edited collection
\\autocite[12]{harrowvance2022}, a chapter in it \\autocite[215]{nakamura2022},
a chapter of a single-author book \\autocite[50]{okafor2024cliff}, a translated
novel \\autocite[90]{reyes2019}, a second edition \\autocite[58]{vance2023},
one volume of a set \\autocite[140]{santos2020}, a republished classic
\\autocite[34]{calloway2018}, and a book with no author
\\autocite[12]{handbook2022}.

\\printbibliography[title={Works Cited}]

\\end{document}`}</code></pre>
          <p>The matching <code>books.bib</code>:</p>
          <pre><code>{`@book{okafor2024,
  shorttitle = {Reading Mind},
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

@collection{harrowvance2022,
  editor    = {Harrow, Thomas and Vance, Miriam},
  title     = {Teaching Literature Online},
  publisher = {Northfield University Press},
  year      = {2022}
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

@inbook{okafor2024cliff,
  shorttitle = {Ten-Minute Cliff},
  author    = {Okafor, Adaeze},
  title     = {The Ten-Minute Cliff},
  booktitle = {The Reading Mind: Attention in the Age of Screens},
  publisher = {Brightwater Press},
  year      = {2024},
  pages     = {41--66}
}

@book{reyes2019,
  author     = {Reyes, Paloma},
  title      = {The Glass Orchard},
  translator = {Nakamura, Kenji},
  publisher  = {Brightwater Press},
  year       = {2019}
}

@book{vance2023,
  author    = {Vance, Miriam},
  title     = {Close Reading in the Classroom},
  edition   = {2},
  publisher = {Northfield University Press},
  year      = {2023}
}

@book{santos2020,
  author    = {Santos, Julia},
  title     = {A History of the Printed Page},
  volume    = {2},
  publisher = {Ridgeline Academic},
  year      = {2020}
}

@book{calloway2018,
  author    = {Calloway, Eleanor},
  title     = {The Lamplighters},
  origdate  = {1899},
  publisher = {Brightwater Press},
  year      = {2018}
}

@book{handbook2022,
  title     = {The Northfield Style Handbook},
  publisher = {Northfield University Press},
  year      = {2022}
}`}</code></pre>
          <p>
            A few field notes. <code>edition = &#123;2&#125;</code> as a bare number is printed as
            &quot;2nd ed.&quot;; a named edition such as <code>&#123;Rev. ed.&#125;</code> is
            printed as typed (the style also rewrites a spelled-out &quot;edition&quot; to
            &quot;ed.&quot;), and there is no separate e-book field, so{' '}
            <code>edition = &#123;E-book ed.&#125;</code> is how the package&apos;s own MLA 9
            examples enter one. <code>origdate</code> supplies the original publication year of a
            republished work, <code>volume</code> prints &quot;Vol. 2&quot; after the title, and{' '}
            <code>volumes = &#123;4&#125;</code> on an entry for a whole set prints &quot;4
            volumes.&quot; after the year (the handbook pattern abbreviates it to &quot;4 vols.&quot;,
            so edit the output if your instructor is strict). Both forms were compiled with
            biblatex-mla 2.1a; the e-book entry renders as &quot;E-book ed., Brightwater P,
            2024.&quot;, which matches the handbook pattern earlier on this page.
            Everything else, including the comma versus period punctuation between elements, comes
            out of the <code>.bib</code> data.
          </p>

          <h3>Printing the Works Cited and the hanging indent</h3>
          <p>
            <code>\printbibliography[title=&#123;Works Cited&#125;]</code> prints every entry that
            was cited, alphabetized by the style&apos;s sorting scheme, under the heading Works
            Cited. The title option is optional with biblatex-mla, whose language file already names
            the list &quot;Works Cited&quot;, but it documents the intent. To start the list on a
            new page, put <code>\clearpage</code> before it. To center the heading as MLA wants
            instead of leaving it as a left-aligned section title, define a heading once in the
            preamble:
          </p>
          <pre><code>{`\\defbibheading{mla}[\\bibname]{\\section*{\\centering #1}}
...
\\printbibliography[heading=mla,title={Works Cited}]`}</code></pre>
          <p>
            The <strong>hanging indent</strong> needs no work: biblatex-mla sets the list&apos;s
            left margin to <code>\bibhang</code> and outdents the first line of each entry, which
            is the 0.5-inch MLA hang. It also sets <code>\bibitemsep</code> to zero so that, with{' '}
            <code>\doublespacing</code>, the list is double-spaced with no extra gap between
            entries. If you are building the list by hand instead, the{' '}
            <Link href="/learn/mla-in-text-citation">in-text citation guide</Link> has a two-line
            fallback using <code>\hangindent</code>. Repeated authors are collapsed for you: write
            the full name in every <code>.bib</code> entry and the style prints the later entries
            with three em dashes (&#8212;&#8212;&#8212;.), which the handbook accepts in place of
            three hyphens as long as a paper uses one form throughout; the package option{' '}
            <code>longdash=false</code> switches to hyphens.
          </p>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you cite a book in MLA format?</h3>
          <p>
            The Works Cited entry is Author&apos;s Last Name, First Name. <em>Title of Book in
            Italics</em>. Publisher, Year. For example: Okafor, Adaeze. <em>The Reading Mind:
            Attention in the Age of Screens</em>. Brightwater Press, 2024. Capitalize the title in
            title case, drop business words such as Inc. and Co. from the publisher, shorten
            University Press to UP, and give the most recent publication year on the copyright
            page. The in-text citation is the author&apos;s last name and page number: (Okafor 23).
          </p>
          <h3>How do you cite a book with multiple authors in MLA?</h3>
          <p>
            Two authors: reverse only the first name and join them with &quot;and&quot;: Harrow,
            Thomas, and Miriam Vance. Three or more: give the first author reversed followed by et
            al.: Lindqvist, Mikael, et al. The in-text citations follow the same cutoff: (Harrow
            and Vance 47) and (Lindqvist et al. 112). Never use an ampersand, and never list more
            than the first author when there are three or more.
          </p>
          <h3>How do you cite a chapter from an edited book in MLA?</h3>
          <p>
            Start with the chapter author and the chapter title in quotation marks, then the book
            title in italics, &quot;edited by&quot; and the editors&apos; names in normal order, the
            publisher, the year, and the page range with pp.: Nakamura, Kenji. &quot;Annotation as
            Argument.&quot; <em>Teaching Literature Online</em>, edited by Thomas Harrow and Miriam
            Vance, Northfield UP, 2022, pp. 211-38. Cite the chapter author in the text: (Nakamura
            215). Cite the whole collection instead only when you are discussing the book as a
            whole, in which case the editors are the authors and the entry ends their names with
            &quot;editors&quot;.
          </p>
          <h3>How do I make an MLA Works Cited list in LaTeX?</h3>
          <p>
            Use the biblatex-mla package from CTAN:{' '}
            <code>\usepackage[style=mla]&#123;biblatex&#125;</code>, then{' '}
            <code>\addbibresource&#123;books.bib&#125;</code> and{' '}
            <code>\printbibliography[title=&#123;Works Cited&#125;]</code> where the list should
            appear. Books go in the .bib file as <code>@book</code> entries with author, title,
            publisher and year; chapters of edited collections as <code>@incollection</code> with
            editor, booktitle and pages; and titled chapters of a single-author book as{' '}
            <code>@inbook</code>. The style alphabetizes the list, applies the 0.5-inch hanging
            indent, abbreviates University Press to UP and compresses page ranges. It needs the
            biber backend, which latexmk, Octree and Overleaf run automatically.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>The Works Cited list is half of MLA documentation; these guides cover the rest:</p>
          <ul>
            <li><Link href="/learn/mla-in-text-citation">MLA In-Text Citation</Link> – Every parenthetical case: et al., no author, no pages, qtd. in, block quotes and repeat citations</li>
            <li><Link href="/learn/ama-citation-format">AMA Citation Format</Link> – The numbered medical style, for comparison or your next course</li>
            <li><Link href="/learn/apa-headings">APA Headings</Link> – The five APA 7 heading levels, if your paper is APA instead</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> – MLA permits content and bibliographic notes; this is how to set them</li>
            <li><Link href="/learn/page-size-margins">Page Size and Margins</Link> – Letter paper and 1-inch margins with the geometry package</li>
            <li><Link href="https://tools.useoctree.com/templates/mla-paper" target="_blank" rel="noopener noreferrer">MLA Paper Template</Link> – A LaTeX template with the MLA heading, running head, spacing and Works Cited already set up</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Try a snippet in the browser without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">LaTeX Templates</Link> – Essay and article templates ready for a bibliography</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Dashes, ellipses and other punctuation MLA papers need</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Generate your Works Cited instead of typing it</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with biber and latexmk already set up: paste the
              example above, add your own books to the .bib file, and the alphabetized,
              hanging-indented list updates on every compile.
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
