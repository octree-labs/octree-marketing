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

const breadcrumbs = getLearnBreadcrumbs('Bibliography Examples', 'bibliography-examples')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'bibliography-examples',
  title: 'Bibliography Examples: APA, MLA, Chicago and IEEE, with the LaTeX That Produces Them',
  seoTitle: 'Bibliography Examples: APA, MLA, Chicago, IEEE + LaTeX',
  description:
    'Bibliography examples in APA 7, MLA 9, Chicago and IEEE, each with its BibTeX source, plus thebibliography, BibTeX and biblatex documents that compile.',
  keywords:
    'bibliography example, bibliography examples, latex bibliography example, bibtex example, thebibliography example, biblatex example, annotated bibliography example, apa bibliography example, mla bibliography example, chicago bibliography example, ieee bibliography example, reference list example, works cited example, bib file example, bibtex entry types, bibliographystyle, printbibliography, addbibresource, bibtex book entry, bibtex article entry, bibtex inproceedings, bibtex misc, latex references',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-20'

const faq: FaqItem[] = [
  {
    question: 'What does a bibliography look like?',
    answer:
      'An alphabetical list of sources at the end of a document, one entry per source, giving author, title, publisher or journal and year in the order the style prescribes. In APA 7 a book is Knuth, D. E. (1984). The TeXbook. Addison-Wesley.; in MLA 9 it is Knuth, Donald E. The TeXbook. Addison-Wesley, 1984. Entries hang indented, except in numbered styles such as IEEE, which label them [1], [2] in citation order.',
  },
  {
    question: 'What is the difference between a bibliography and a reference list?',
    answer:
      'A reference list (APA, IEEE) contains only the sources you cited; a bibliography (Chicago) may also include sources you read but did not cite. MLA calls its cited-only list Works Cited. In LaTeX the difference is a heading and a \\nocite: \\printbibliography[title={Bibliography}] with \\nocite{*} lists everything in the .bib file.',
  },
  {
    question: 'How do I write a bibliography in LaTeX?',
    answer:
      'For a handful of sources, type them in a thebibliography environment with one \\bibitem per source and cite them with \\cite{key}. For more, put them in a .bib file and run BibTeX (\\bibliographystyle{plain} and \\bibliography{refs} in the body) or biblatex (\\usepackage[style=apa]{biblatex} and \\addbibresource{refs.bib} in the preamble, \\printbibliography in the body, compiled with biber). latexmk runs the extra passes for you.',
  },
  {
    question: 'What is a BibTeX example?',
    answer:
      'A .bib file holds entries such as @book{knuth1984, author = {Donald E. Knuth}, title = {The {\\TeX}book}, publisher = {Addison-Wesley}, year = {1984}}. The word after @ is the entry type, the first word inside the braces is the citation key for \\cite, and the rest are field = {value} pairs separated by commas. A complete document, with the .bib file written by a filecontents block, is in the BibTeX section of this page.',
  },
  {
    question: 'Why does my bibliography show [?] or a question mark instead of a citation?',
    answer:
      'The key in \\cite matches no entry, or the bibliography has not been built yet. The log says "LaTeX Warning: Citation `key\' undefined" and, for BibTeX, the .blg says "Warning--I didn\'t find a database entry for "key"". Fix the key, then run pdflatex, bibtex (or biber), pdflatex, pdflatex; latexmk does the sequence for you.',
  },
  {
    question: 'Should I use BibTeX or biblatex?',
    answer:
      'Use biblatex with biber when the document must follow a named style exactly: biblatex-apa, biblatex-mla, biblatex-chicago and biblatex-ieee implement the current editions and give you \\textcite, \\parencite and \\footcite. Use classic BibTeX when a journal or thesis template hands you a .bst file. The .bib file is the same for both, so switching later costs almost nothing.',
  },
]

export default async function BibliographyExamplesPage() {
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
          <h1>Bibliography Examples: APA, MLA, Chicago and IEEE, with the LaTeX That Produces Them</h1>
          <p className="lead">
            A <strong>bibliography example</strong> is only useful if you can see both sides of it:
            the entry as it appears on the page and the source that generates it. This guide shows
            the same sources, Knuth&apos;s <em>TeXbook</em>, his article on literate programming
            and a website, in APA 7, MLA 9, Chicago and IEEE, each with the BibTeX entry that
            produces it, then three complete LaTeX documents (<code>thebibliography</code>, BibTeX,
            biblatex), an annotated bibliography example and the errors you will meet.
          </p>
          <p>
            Every document on this page was compiled with pdfLaTeX 1.40.28, BibTeX 0.99d and biber
            2.21 on TeX Live 2025 (biblatex 3.21, biblatex-apa 9.20, biblatex-mla 2.1a,
            biblatex-chicago 3.18), and the rendered entries were read back from the PDFs. Where a document
            needs a <code>.bib</code> file, a <code>filecontents</code> block writes it for you, so
            each example is a single file that compiles in one run.
          </p>

          {/* ───────────────────────────── Definitions ───────────────────────────── */}
          <h2>Bibliography, Reference List or Works Cited?</h2>
          <p>
            A <strong>bibliography</strong> is a list of the sources behind a piece of writing,
            alphabetized by author, and it may include works you consulted but never cited. Chicago
            uses the term and the broader rule.
          </p>
          <p>
            A <strong>reference list</strong> contains only the sources you actually cited; every
            entry matches at least one citation in the text and vice versa. APA and IEEE use this
            term, and IEEE numbers the entries in the order they are first cited.
          </p>
          <p>
            <strong>Works Cited</strong> is the MLA name for the same cited-only list. The three
            differ in what goes in and in formatting, not in purpose: each entry must let a reader
            find the exact source.
          </p>

          {/* ───────────────────────────── By style ───────────────────────────── */}
          <h2>Bibliography Examples by Style</h2>
          <p>
            The entries below are real, public works plus one clearly fictional workshop paper for
            the IEEE conference example. Each style section shows the rendered entries first, then
            the <code>.bib</code> source. The source is almost the same across styles; that is the
            point of keeping sources in a <code>.bib</code> file and letting the style do the
            formatting.
          </p>

          <h3>APA 7 bibliography example</h3>
          <p>
            Author surname and initials, year in parentheses, sentence-case title, italics for the
            book or journal name. The DOI is printed as a link and the website entry gets a
            retrieval date because the page has no publication date.
          </p>
          <blockquote>
            <p>Knuth, D. E. (1984a). <em>The TeXbook</em>. Addison-Wesley.</p>
            <p>
              Knuth, D. E. (1984b). Literate programming. <em>The Computer Journal, 27</em>(2),
              97–111. https://doi.org/10.1093/comjnl/27.2.97
            </p>
            <p>
              CTAN. (n.d.). <em>Comprehensive TeX archive network</em>. Retrieved October 20,
              2026, from https://ctan.org/
            </p>
            <p>In-text: (Knuth, 1984a), Knuth (1984b), (CTAN, n.d.)</p>
          </blockquote>
          <p>
            The <em>a</em> and <em>b</em> are added by the style because one author has two works
            in the same year; a single Knuth entry would print as (Knuth, 1984). The BibTeX source:
          </p>
          <pre><code>{`@book{knuth1984,
  author    = {Knuth, Donald E.},
  title     = {The {\\TeX}book},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  year      = {1984}
}

@article{knuth1984lp,
  author  = {Knuth, Donald E.},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
  year    = {1984},
  doi     = {10.1093/comjnl/27.2.97}
}

@online{ctan,
  author  = {{CTAN}},
  title   = {Comprehensive {\\TeX} Archive Network},
  url     = {https://ctan.org/},
  urldate = {2026-10-20}
}`}</code></pre>
          <p>
            <code>{'{\\TeX}'}</code> is braced so the APA style, which lowercases titles to
            sentence case, leaves it alone; the corporate author is double-braced so it is not split
            into a first and last name. <code>@online</code> with <code>urldate</code> is a biblatex
            entry type; classic BibTeX styles want <code>@misc</code> with{' '}
            <code>howpublished = {'{\\url{...}}'}</code> and the access date in <code>note</code>.
          </p>

          <h3>MLA 9 bibliography example (Works Cited)</h3>
          <p>
            Full first names, title-case titles, the journal&apos;s volume and issue spelled out
            as <em>vol.</em> and <em>no.</em>, the year after the issue, pages with <em>pp.</em>,
            and a DOI or URL at the end. A second work by the same author replaces the name with
            three em dashes.
          </p>
          <blockquote>
            <p>
              CTAN. &quot;Comprehensive TeX Archive Network,&quot; ctan.org/. Accessed 20 Oct.
              2026.
            </p>
            <p>
              Knuth, Donald E. &quot;Literate Programming.&quot; <em>The Computer Journal</em>, vol.
              27, no. 2, 1984, pp. 97–111, https://doi.org/10.1093/comjnl/27.2.97.
            </p>
            <p>———. <em>The TeXbook</em>. Addison-Wesley, 1984.</p>
            <p>In-text: (Knuth, <em>The TeXbook</em> 3), (Knuth, &quot;Literate Programming&quot; 98), (CTAN)</p>
          </blockquote>
          <p>
            The source is the same three entries as APA. The only change in the LaTeX is the style
            line, <code>\usepackage[style=mla]&#123;biblatex&#125;</code>, which also adds the
            short title to in-text citations when an author has several works. Author names are
            typed <code>Last, First</code>:
          </p>
          <pre><code>{`@book{knuth1984,
  author    = {Knuth, Donald E.},
  title     = {The {\\TeX}book},
  publisher = {Addison-Wesley},
  year      = {1984}
}

@article{knuth1984lp,
  author  = {Knuth, Donald E.},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
  year    = {1984},
  doi     = {10.1093/comjnl/27.2.97}
}

@online{ctan,
  author  = {{CTAN}},
  title   = {Comprehensive {\\TeX} Archive Network},
  url     = {https://ctan.org/},
  urldate = {2026-10-20}
}`}</code></pre>
          <p>
            MLA book citations in every variation (editors, translators, editions, e-books) are in{' '}
            <Link href="/learn/mla-book-citation">MLA Book Citation</Link>, and the parenthetical
            rules in <Link href="/learn/mla-in-text-citation">MLA In-Text Citation</Link>.
          </p>

          <h3>Chicago notes-bibliography example</h3>
          <p>
            Chicago&apos;s humanities style has two parts: a footnote at the point of citation and
            a bibliography entry at the end. The note gives the first name first and wraps the
            publication details in parentheses; the bibliography entry inverts the name and uses
            periods. Place of publication is kept.
          </p>
          <blockquote>
            <p>
              Knuth, Donald E. &quot;Literate Programming.&quot; <em>The Computer Journal</em> 27, no.
              2 (1984): 97–111. https://doi.org/10.1093/comjnl/27.2.97.
            </p>
            <p>———. <em>The TeXbook</em>. Reading, MA: Addison-Wesley, 1984.</p>
            <p>
              Lamport, Leslie. <em>LaTeX: A Document Preparation System</em>. 2nd ed. Reading, MA:
              Addison-Wesley, 1994.
            </p>
            <p>Note 1: 1. Donald E. Knuth, <em>The TeXbook</em> (Reading, MA: Addison-Wesley, 1984), 42.</p>
            <p>
              Note 3: 3. Donald E. Knuth, &quot;Literate Programming,&quot; <em>The Computer Journal</em>{' '}
              27, no. 2 (1984): 98, https://doi.org/10.1093/comjnl/27.2.97.
            </p>
          </blockquote>
          <p>
            The source adds <code>address</code> (biblatex also accepts <code>location</code>) and
            a numeric <code>edition</code>, which the style prints as &quot;2nd ed.&quot;:
          </p>
          <pre><code>{`@book{knuth1984,
  author    = {Knuth, Donald E.},
  title     = {The {\\TeX}book},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  year      = {1984}
}

@book{lamport1994,
  author    = {Lamport, Leslie},
  title     = {{\\LaTeX}: A Document Preparation System},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  edition   = {2},
  year      = {1994}
}

@article{knuth1984lp,
  author  = {Knuth, Donald E.},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
  year    = {1984},
  doi     = {10.1093/comjnl/27.2.97}
}`}</code></pre>

          <h3>IEEE bibliography example</h3>
          <p>
            Numbered in order of first citation, initials before the surname, article titles in
            quotation marks with a lowercase first word after the first, the journal in italics,{' '}
            <em>vol.</em>, <em>no.</em>, <em>pp.</em>, and the year last. Conference papers start
            with &quot;in&quot; and the proceedings title.
          </p>
          <blockquote>
            <p>[1] D. E. Knuth, <em>The TeXbook</em>. Reading, MA: Addison-Wesley, 1984.</p>
            <p>
              [2] D. E. Knuth, &quot;Literate programming,&quot; <em>The Computer Journal</em>, vol. 27,
              no. 2, pp. 97–111, 1984. doi: 10.1093/comjnl/27.2.97
            </p>
            <p>
              [3] A. Okafor and M. Vance, &quot;Streaming compilation of large documents,&quot; in{' '}
              <em>Proceedings of the 12th Workshop on Document Tools</em>, DocTools Press, 2023, pp.
              45–52.
            </p>
            <p>In-text: [1], [2], [1], [3]</p>
          </blockquote>
          <p>
            The conference paper is an <code>@inproceedings</code> entry; <code>booktitle</code> is
            the proceedings title and <code>publisher</code> is optional:
          </p>
          <pre><code>{`@book{knuth1984,
  author    = {Knuth, Donald E.},
  title     = {The {\\TeX}book},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  year      = {1984}
}

@article{knuth1984lp,
  author  = {Knuth, Donald E.},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
  year    = {1984},
  doi     = {10.1093/comjnl/27.2.97}
}

@inproceedings{okafor2023,
  author    = {Okafor, Adaeze and Vance, Miriam},
  title     = {Streaming Compilation of Large Documents},
  booktitle = {Proceedings of the 12th Workshop on Document Tools},
  publisher = {DocTools Press},
  year      = {2023},
  pages     = {45--52}
}`}</code></pre>
          <p>
            For the medical numbered style, which looks similar but uses superscripts and no
            brackets, see <Link href="/learn/ama-citation-format">AMA Citation Format</Link>.
          </p>

          {/* ───────────────────────────── LaTeX ───────────────────────────── */}
          <h2>A Bibliography in LaTeX, Three Ways</h2>
          <p>
            The three methods differ in where the formatting lives. With <code>thebibliography</code>{' '}
            you type the formatted entries yourself. With BibTeX a <code>.bst</code> style file
            formats entries from a <code>.bib</code> database. With biblatex a LaTeX package does
            the formatting and biber does the sorting; the current APA, MLA, Chicago and IEEE
            styles are biblatex styles.
          </p>

          <h3>thebibliography example: no external file</h3>
          <p>
            The argument is the widest label you expect (<code>9</code> for up to nine entries,{' '}
            <code>99</code> for up to 99); each <code>\bibitem&#123;key&#125;</code> becomes a
            numbered entry that <code>\cite&#123;key&#125;</code> refers to. <code>\newblock</code>{' '}
            is an optional separator that some classes turn into a line break:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

Knuth designed \\TeX{} for typesetting mathematics \\cite{knuth1984} and
Lamport built \\LaTeX{} on top of it \\cite{lamport1994}; the DOI system
is described in \\cite{knuth1984lp}.

\\begin{thebibliography}{9}

\\bibitem{knuth1984}
Donald E. Knuth.
\\newblock \\emph{The \\TeX book}.
\\newblock Addison-Wesley, Reading, MA, 1984.

\\bibitem{lamport1994}
Leslie Lamport.
\\newblock \\emph{\\LaTeX: A Document Preparation System}.
\\newblock Addison-Wesley, Reading, MA, 2nd edition, 1994.

\\bibitem{knuth1984lp}
Donald E. Knuth.
\\newblock Literate programming.
\\newblock \\emph{The Computer Journal}, 27(2):97--111, 1984.

\\end{thebibliography}

\\end{document}`}</code></pre>
          <p>
            Two pdflatex runs are needed: the first writes the labels to the <code>.aux</code>{' '}
            file, the second reads them, so citations show as [?] after a single run. Entries print
            in the order you typed them, so alphabetize by hand. The heading is
            &quot;References&quot; in <code>article</code> and &quot;Bibliography&quot; in{' '}
            <code>book</code> and <code>report</code>; change it with{' '}
            <code>\renewcommand&#123;\refname&#125;&#123;Works Cited&#125;</code> (<code>\bibname</code>{' '}
            in the book classes).
          </p>

          <h3>BibTeX example: .bib file plus a .bst style</h3>
          <p>
            Put the sources in <code>refs.bib</code>, pick a style with{' '}
            <code>\bibliographystyle</code> and print the list with <code>\bibliography</code>. The
            compile sequence is pdflatex, bibtex, pdflatex, pdflatex; latexmk runs it for you. The{' '}
            <code>filecontents</code> block writes <code>refs.bib</code> for you, so the example is
            one file; in a real project delete the block and keep <code>refs.bib</code> next to the
            document.
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{filecontents}[overwrite]{refs.bib}
@book{knuth1984,
  author    = {Donald E. Knuth},
  title     = {The {\\TeX}book},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  year      = {1984}
}

@book{lamport1994,
  author    = {Leslie Lamport},
  title     = {{\\LaTeX}: A Document Preparation System},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  edition   = {2nd},
  year      = {1994}
}

@article{knuth1984lp,
  author  = {Donald E. Knuth},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
  year    = {1984},
  doi     = {10.1093/comjnl/27.2.97}
}
\\end{filecontents}

\\begin{document}

Knuth designed \\TeX{} for typesetting mathematics \\cite{knuth1984} and
Lamport built \\LaTeX{} on top of it \\cite{lamport1994}. Literate programming
came out of the same project \\cite{knuth1984lp}.

\\bibliographystyle{apalike}
\\bibliography{refs}

\\end{document}`}</code></pre>
          <p>
            Only entries you cite are printed; add <code>\nocite&#123;*&#125;</code> before{' '}
            <code>\bibliography</code> to print the whole file. Swapping the style line changes
            every entry at once. The Knuth book under each of the standard styles, as compiled:
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Style line</th>
                <th scope="col">Citation</th>
                <th scope="col">Entry as printed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\bibliographystyle&#123;plain&#125;</code></td>
                <td>[1], alphabetical</td>
                <td>[1] Donald E. Knuth. <em>The TeXbook</em>. Addison-Wesley, Reading, MA, 1984.</td>
              </tr>
              <tr>
                <td><code>\bibliographystyle&#123;unsrt&#125;</code></td>
                <td>[1], in citation order</td>
                <td>Same entry as plain, numbered in the order first cited</td>
              </tr>
              <tr>
                <td><code>\bibliographystyle&#123;ieeetr&#125;</code></td>
                <td>[1], in citation order</td>
                <td>[1] D. E. Knuth, <em>The TeXbook</em>. Reading, MA: Addison-Wesley, 1984.</td>
              </tr>
              <tr>
                <td><code>\bibliographystyle&#123;apalike&#125;</code></td>
                <td>[Knuth, 1984a]</td>
                <td>[Knuth, 1984a] Knuth, D. E. (1984a). <em>The TeXbook</em>. Addison-Wesley, Reading, MA.</td>
              </tr>
              <tr>
                <td><code>\bibliographystyle&#123;plainnat&#125;</code> + natbib</td>
                <td>(Knuth, 1984a) or Knuth (1984a)</td>
                <td>Donald E. Knuth. <em>The TeXbook</em>. Addison-Wesley, Reading, MA, 1984a.</td>
              </tr>
            </tbody>
          </table>
          <p>
            <code>apalike</code> is APA-like, not APA 7: it keeps the place of publication and
            brackets the citation. For author-year citations in parentheses load natbib, which
            adds <code>\citep</code> and <code>\citet</code>:
          </p>
          <pre><code>{`\\usepackage[round]{natbib}   % preamble
...
\\citet{knuth1984} designed \\TeX{}, and Lamport built \\LaTeX{} on top of it \\citep{lamport1994}.
...
\\bibliographystyle{plainnat}
\\bibliography{refs}`}</code></pre>

          <h3>biblatex example: style=apa with biber</h3>
          <p>
            biblatex moves the setup into the preamble: the style is a package option, the{' '}
            <code>.bib</code> file is registered with <code>\addbibresource</code>, and{' '}
            <code>\printbibliography</code> prints the list. <code>biblatex-apa</code> needs the{' '}
            <strong>biber</strong> backend, not bibtex, so compile with <code>latexmk -pdf</code>{' '}
            or an editor that runs biber; it also wants <code>babel</code> and <code>csquotes</code>{' '}
            for language-specific punctuation.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[american]{babel}
\\usepackage{csquotes}
\\usepackage[style=apa]{biblatex}   % APA 7; needs biber
\\begin{filecontents}[overwrite]{refs.bib}
@book{knuth1984,
  author    = {Knuth, Donald E.},
  title     = {The {\\TeX}book},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  year      = {1984}
}

@book{lamport1994,
  author    = {Lamport, Leslie},
  title     = {{\\LaTeX}: A Document Preparation System},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  edition   = {2},
  year      = {1994}
}

@article{knuth1984lp,
  author  = {Knuth, Donald E.},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
  year    = {1984},
  doi     = {10.1093/comjnl/27.2.97}
}

@online{ctan,
  author  = {{CTAN}},
  title   = {Comprehensive {\\TeX} Archive Network},
  url     = {https://ctan.org/},
  urldate = {2026-10-20}
}
\\end{filecontents}
\\addbibresource{refs.bib}

\\begin{document}

Knuth designed \\TeX{} for typesetting mathematics \\parencite{knuth1984}, and
\\textcite{lamport1994} built \\LaTeX{} on top of it. Literate programming came
out of the same project \\parencite{knuth1984lp}; every package is archived online
\\parencite{ctan}.

\\printbibliography

\\end{document}`}</code></pre>
          <p>
            This document produced the APA entries shown at the top of the page. The same{' '}
            <code>.bib</code> file gives the other styles by changing one line; each of these was
            compiled with the same body:
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Style</th>
                <th scope="col">Preamble line</th>
                <th scope="col">Cite with</th>
                <th scope="col">Package</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>APA 7</td>
                <td><code>\usepackage[style=apa]&#123;biblatex&#125;</code></td>
                <td><code>\parencite</code>, <code>\textcite</code></td>
                <td>biblatex-apa</td>
              </tr>
              <tr>
                <td>MLA 9</td>
                <td><code>\usepackage[style=mla]&#123;biblatex&#125;</code></td>
                <td><code>\autocite[page]&#123;key&#125;</code></td>
                <td>biblatex-mla</td>
              </tr>
              <tr>
                <td>Chicago notes</td>
                <td><code>\usepackage[notes]&#123;biblatex-chicago&#125;</code></td>
                <td><code>\autocite[page]&#123;key&#125;</code> (becomes a footnote)</td>
                <td>biblatex-chicago</td>
              </tr>
              <tr>
                <td>IEEE</td>
                <td><code>\usepackage[style=ieee]&#123;biblatex&#125;</code></td>
                <td><code>\cite</code></td>
                <td>biblatex-ieee</td>
              </tr>
            </tbody>
          </table>
          <p>
            All four packages are in a full TeX Live; on a minimal installation,{' '}
            <code>tlmgr install biblatex-apa biblatex-mla biblatex-chicago biblatex-ieee</code>{' '}
            adds them.
          </p>

          <h3>The .bib entry types</h3>
          <p>
            The entry type decides which fields a style expects. The required fields are the ones
            the classic BibTeX styles warn about when missing; biblatex also accepts{' '}
            <code>journaltitle</code>, <code>location</code> and <code>date</code> as aliases.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Entry type</th>
                <th scope="col">Use for</th>
                <th scope="col">Required fields</th>
                <th scope="col">Common optional fields</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>@article</code></td>
                <td>Journal or magazine article</td>
                <td><code>author</code>, <code>title</code>, <code>journal</code>, <code>year</code></td>
                <td><code>volume</code>, <code>number</code>, <code>pages</code>, <code>doi</code></td>
              </tr>
              <tr>
                <td><code>@book</code></td>
                <td>Book with a publisher</td>
                <td><code>author</code> or <code>editor</code>, <code>title</code>, <code>publisher</code>, <code>year</code></td>
                <td><code>address</code>, <code>edition</code>, <code>volume</code>, <code>isbn</code></td>
              </tr>
              <tr>
                <td><code>@inproceedings</code></td>
                <td>Paper in conference proceedings</td>
                <td><code>author</code>, <code>title</code>, <code>booktitle</code>, <code>year</code></td>
                <td><code>pages</code>, <code>publisher</code>, <code>address</code>, <code>doi</code></td>
              </tr>
              <tr>
                <td><code>@incollection</code></td>
                <td>Chapter in an edited book</td>
                <td><code>author</code>, <code>title</code>, <code>booktitle</code>, <code>publisher</code>, <code>year</code></td>
                <td><code>editor</code>, <code>pages</code>, <code>chapter</code></td>
              </tr>
              <tr>
                <td><code>@phdthesis</code></td>
                <td>Doctoral thesis (<code>@mastersthesis</code> for a master&apos;s)</td>
                <td><code>author</code>, <code>title</code>, <code>school</code>, <code>year</code></td>
                <td><code>address</code>, <code>month</code>, <code>url</code></td>
              </tr>
              <tr>
                <td><code>@misc</code></td>
                <td>Anything else: web pages, datasets, software</td>
                <td>none</td>
                <td><code>author</code>, <code>title</code>, <code>howpublished</code>, <code>year</code>, <code>note</code></td>
              </tr>
            </tbody>
          </table>
          <p>
            Separate authors with <code>and</code>, never commas; write page ranges with a double
            hyphen, <code>97--111</code>; and brace anything whose capitalization must survive,{' '}
            <code>{'{DNA}'}</code>, <code>{'{\\LaTeX}'}</code>. A deeper treatment of the file, with the
            warnings each mistake produces, is in{' '}
            <Link href="/blog/bibtex-errors-automatic-fix-guide">BibTeX Errors and How to Fix Them</Link>;
            exporting a <code>.bib</code> from a reference manager is in the{' '}
            <Link href="/blog/zotero-citation-guide-reference-management">Zotero citation guide</Link>.
          </p>

          {/* ───────────────────────────── Annotated ───────────────────────────── */}
          <h2>Annotated Bibliography Example</h2>
          <p>
            An annotated bibliography adds a short paragraph under each entry: a summary of the
            source, an assessment, and how it serves your project. The entry follows whatever style
            the course uses; the annotation is plain prose, usually 100 to 150 words. One APA entry
            with a three-sentence annotation:
          </p>
          <blockquote>
            <p>Knuth, D. E. (1984). <em>The TeXbook</em>. Addison-Wesley.</p>
            <p>
              Knuth&apos;s manual is the primary source for every rule TeX follows when it breaks
              lines and pages. It is written for two audiences at once: the first chapters teach
              plain TeX to a new user, and the &quot;dangerous bend&quot; sections give the
              algorithms a package author needs. This paper draws on chapters 14 and 15 for the
              line-breaking parameters discussed in Section 3.
            </p>
          </blockquote>
          <p>
            With <code>thebibliography</code>, the annotation is a paragraph after the entry; the
            blank line starts it and the <code>\itemsep</code> keeps entries apart:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

\\begin{thebibliography}{9}
\\setlength{\\itemsep}{1em}

\\bibitem{knuth1984}
Knuth, D. E. (1984). \\emph{The \\TeX book}. Addison-Wesley.

Knuth's manual is the primary source for every rule \\TeX{} follows when it
breaks lines and pages. It is written for two audiences at once: the first
chapters teach plain \\TeX{} to a new user, and the \`\`dangerous bend''
sections give the algorithms a package author needs. This paper draws on
chapters 14 and 15 for the line-breaking parameters discussed in Section 3.

\\end{thebibliography}

\\end{document}`}</code></pre>
          <p>
            With biblatex, put the text in the <code>annotation</code> field of the entry.{' '}
            <code>biblatex-apa</code> prints that field by itself, directly under the entry, so
            this document needs nothing beyond the field:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[american]{babel}
\\usepackage{csquotes}
\\usepackage[style=apa]{biblatex}
\\begin{filecontents}[overwrite]{refs.bib}
@book{knuth1984,
  author     = {Knuth, Donald E.},
  title      = {The {\\TeX}book},
  publisher  = {Addison-Wesley},
  year       = {1984},
  annotation = {Knuth's manual is the primary source for every rule \\TeX{}
    follows when it breaks lines and pages. It is written for two audiences
    at once: the first chapters teach plain \\TeX{} to a new user, and the
    \`\`dangerous bend'' sections give the algorithms a package author needs.
    This paper draws on chapters 14 and 15 for the line-breaking parameters
    discussed in Section 3.}
}
\\end{filecontents}
\\addbibresource{refs.bib}

\\begin{document}

\\nocite{*}
\\printbibliography[title={Annotated Bibliography}]

\\end{document}`}</code></pre>
          <p>
            The standard biblatex styles (<code>authoryear</code>, <code>numeric</code>, and the
            MLA and IEEE packages) ignore <code>annotation</code>. Two preamble lines print it as
            an indented paragraph after each entry; compiled with <code>style=authoryear</code>:
          </p>
          <pre><code>{`\\DeclareFieldFormat{annotation}{\\par\\vspace{0.5\\baselineskip}\\noindent #1}
\\renewbibmacro*{finentry}{\\finentry\\printfield{annotation}}`}</code></pre>
          <p>
            A full document with the APA heading, double spacing and hanging indents already set
            up is the{' '}
            <Link href="https://tools.useoctree.com/templates/annotated-bibliography" target="_blank" rel="noopener noreferrer">
              annotated bibliography template
            </Link>
            ; a plain reference list is the{' '}
            <Link href="https://tools.useoctree.com/templates/bibliography" target="_blank" rel="noopener noreferrer">
              bibliography template
            </Link>
            .
          </p>

          {/* ───────────────────────────── Errors ───────────────────────────── */}
          <h2 id="common-errors">Common Bibliography Errors</h2>
          <p>
            Each message was reproduced on TeX Live 2025. BibTeX and biber write to the{' '}
            <code>.blg</code> file; LaTeX&apos;s own warnings are in the <code>.log</code>.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">What you see</th>
                <th scope="col">Cause</th>
                <th scope="col">Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>I found no \citation commands---while reading file main.aux</code> (BibTeX) and <code>LaTeX Warning: Empty `thebibliography&apos; environment</code></td>
                <td>The document has <code>\bibliography</code> but no <code>\cite</code>, so nothing was requested, or pdflatex has not run yet and the <code>.aux</code> is empty.</td>
                <td>Cite something, or add <code>\nocite&#123;*&#125;</code> to print every entry; run pdflatex before bibtex.</td>
              </tr>
              <tr>
                <td><code>Warning--empty journal in knuth1984lp</code> (BibTeX), entry printed without the journal</td>
                <td>A required field is missing from an <code>@article</code> entry. The same message names <code>publisher</code>, <code>year</code> or <code>booktitle</code> for the other types.</td>
                <td>Add the field from the entry-type table above. BibTeX still produces output, so the warning is easy to miss.</td>
              </tr>
              <tr>
                <td><code>LaTeX Warning: Citation `knuth84&apos; on page 1 undefined</code>, printed as [?], with <code>Warning--I didn&apos;t find a database entry for &quot;knuth84&quot;</code> in the .blg</td>
                <td>The key in <code>\cite</code> matches no entry in the <code>.bib</code> file, or the bibliography pass has not run yet.</td>
                <td>Fix the key (keys are case-sensitive), then run pdflatex, bibtex or biber, pdflatex, pdflatex.</td>
              </tr>
              <tr>
                <td><code>! Package biblatex Error: &apos;\bibliographystyle&apos; invalid for &apos;biblatex&apos;.</code></td>
                <td>BibTeX commands in a biblatex document.</td>
                <td>Delete <code>\bibliographystyle</code> and use the package option: <code>\usepackage[style=apa]&#123;biblatex&#125;</code>.</td>
              </tr>
              <tr>
                <td><code>! LaTeX Error: Can be used only in preamble.</code> at <code>\bibliography&#123;refs&#125;</code></td>
                <td>With biblatex loaded, <code>\bibliography</code> is a preamble-only alias of <code>\addbibresource</code>.</td>
                <td>Put <code>\addbibresource&#123;refs.bib&#125;</code> in the preamble and <code>\printbibliography</code> where the list goes.</td>
              </tr>
              <tr>
                <td><code>Package biblatex Warning: Please (re)run Biber on file: main</code>, empty bibliography</td>
                <td>bibtex was run instead of biber, or no backend ran at all.</td>
                <td>Run <code>biber main</code> (no extension) and pdflatex twice, or use <code>latexmk -pdf</code>, which picks the backend from the document.</td>
              </tr>
              <tr>
                <td><code>! Undefined control sequence.</code> at <code>\autocite</code></td>
                <td>Chicago loaded as <code>style=chicago-notes</code> rather than through the wrapper package.</td>
                <td><code>\usepackage[notes]&#123;biblatex-chicago&#125;</code>, or cite with <code>\footcite</code>.</td>
              </tr>
            </tbody>
          </table>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What does a bibliography look like?</h3>
          <p>
            An alphabetical list of sources at the end of a document, one entry per source, giving
            author, title, publisher or journal and year in the order the style prescribes. In APA 7
            a book is Knuth, D. E. (1984). <em>The TeXbook</em>. Addison-Wesley.; in MLA 9 it is
            Knuth, Donald E. <em>The TeXbook</em>. Addison-Wesley, 1984. Entries hang indented,
            except in numbered styles such as IEEE, which label them [1], [2] in citation order.
          </p>
          <h3>What is the difference between a bibliography and a reference list?</h3>
          <p>
            A reference list (APA, IEEE) contains only the sources you cited; a bibliography
            (Chicago) may also include sources you read but did not cite. MLA calls its cited-only
            list Works Cited. In LaTeX the difference is a heading and a <code>\nocite</code>:{' '}
            <code>\printbibliography[title=&#123;Bibliography&#125;]</code> with{' '}
            <code>\nocite&#123;*&#125;</code> lists everything in the <code>.bib</code> file.
          </p>
          <h3>How do I write a bibliography in LaTeX?</h3>
          <p>
            For a handful of sources, type them in a <code>thebibliography</code> environment with
            one <code>\bibitem</code> per source and cite them with <code>\cite&#123;key&#125;</code>.
            For more, put them in a <code>.bib</code> file and run BibTeX
            (<code>\bibliographystyle&#123;plain&#125;</code> and <code>\bibliography&#123;refs&#125;</code>{' '}
            in the body) or biblatex (<code>\usepackage[style=apa]&#123;biblatex&#125;</code> and{' '}
            <code>\addbibresource&#123;refs.bib&#125;</code> in the preamble,{' '}
            <code>\printbibliography</code> in the body, compiled with biber). latexmk runs the
            extra passes for you.
          </p>
          <h3>What is a BibTeX example?</h3>
          <p>
            A <code>.bib</code> file holds entries such as{' '}
            <code>@book&#123;knuth1984, author = &#123;Donald E. Knuth&#125;, title = &#123;The &#123;\TeX&#125;book&#125;, publisher = &#123;Addison-Wesley&#125;, year = &#123;1984&#125;&#125;</code>.
            The word after <code>@</code> is the entry type, the first word inside the braces is the
            citation key for <code>\cite</code>, and the rest are <code>field = &#123;value&#125;</code>{' '}
            pairs separated by commas. A complete document, with the <code>.bib</code> file written
            by a <code>filecontents</code> block, is in the BibTeX section of this page.
          </p>
          <h3>Why does my bibliography show [?] or a question mark instead of a citation?</h3>
          <p>
            The key in <code>\cite</code> matches no entry, or the bibliography has not been built
            yet. The log says <code>LaTeX Warning: Citation `key&apos; undefined</code> and, for
            BibTeX, the <code>.blg</code> says{' '}
            <code>Warning--I didn&apos;t find a database entry for &quot;key&quot;</code>. Fix the
            key, then run pdflatex, bibtex (or biber), pdflatex, pdflatex; latexmk does the sequence
            for you.
          </p>
          <h3>Should I use BibTeX or biblatex?</h3>
          <p>
            Use biblatex with biber when the document must follow a named style exactly:
            biblatex-apa, biblatex-mla, biblatex-chicago and biblatex-ieee implement the current
            editions and give you <code>\textcite</code>, <code>\parencite</code> and{' '}
            <code>\footcite</code>. Use classic BibTeX when a journal or thesis template hands you
            a <code>.bst</code> file. The <code>.bib</code> file is the same for both, so switching
            later costs almost nothing.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>The bibliography is one half of citing; these guides cover the rest:</p>
          <ul>
            <li><Link href="/learn/mla-book-citation">MLA Book Citation</Link> – Editors, translators, editions and e-books in MLA 9</li>
            <li><Link href="/learn/mla-in-text-citation">MLA In-Text Citation</Link> – Every parenthetical case, from et al. to block quotes</li>
            <li><Link href="/learn/ama-citation-format">AMA Citation Format</Link> – The numbered medical style and its reference list</li>
            <li><Link href="/blog/bibtex-errors-automatic-fix-guide">BibTeX Errors and How to Fix Them</Link> – Every warning a .bib file can produce</li>
            <li><Link href="/blog/zotero-citation-guide-reference-management">Zotero Citation Guide</Link> – Exporting a .bib file that stays in sync</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> – The mechanism Chicago notes are built on</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/templates/bibliography" target="_blank" rel="noopener noreferrer">Bibliography Template</Link> – A document with a .bib file, biblatex and a printed reference list ready to edit</li>
            <li><Link href="https://tools.useoctree.com/templates/annotated-bibliography" target="_blank" rel="noopener noreferrer">Annotated Bibliography Template</Link> – APA heading, double spacing and annotation paragraphs already set up</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste any example above and see the PDF without installing TeX</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="Citation" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Generate the bibliography instead of typing it</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with bibtex, biber and latexmk already set up:
              paste any example above, add your own sources to the .bib file, and the formatted
              list updates on every compile.
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
