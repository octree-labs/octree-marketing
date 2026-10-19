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

const breadcrumbs = getLearnBreadcrumbs('AMA Citation Format', 'ama-citation-format')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'ama-citation-format',
  title: 'AMA Citation Format: In-Text Citations, Reference Examples and LaTeX',
  seoTitle: 'AMA Citation Format: Examples + LaTeX',
  description: 'AMA citation format: superscript in-text citations, numbered reference list rules, journal, book and website examples, and AMA citations in LaTeX.',
  keywords: 'ama citation, ama citation format, ama citation example, ama reference format, ama citation latex, ama style, ama in-text citation, ama reference list, ama manual of style 11th edition, ama journal article citation, ama book citation, ama website citation, superscript citations, biblatex ama, vancouver bst natbib, jama citation style, ama vs apa, ama vs vancouver',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-19'

const faq: FaqItem[] = [
  {
    question: 'How do you cite in AMA format?',
    answer:
      'In the text, put a superscript Arabic numeral at the point you use a source, numbered in the order sources first appear: the first source cited is 1, the second is 2, and a source cited again keeps its original number. The numeral goes after a period or comma and before a colon or semicolon. In the reference list, titled References and ordered by those numbers, each entry gives the authors as Surname Initials (Okafor AB), the article title in sentence case, the NLM-abbreviated journal title in italics, then year;volume(issue):pages and the DOI as doi:10.xxxx/xxxxx.',
  },
  {
    question: 'How many authors do you list in an AMA reference?',
    answer:
      'List every author when there are six or fewer. When there are seven or more, list the first three followed by et al (no period after al in AMA style). Author names are written as surname followed by initials with no periods and no spaces between the initials, separated by commas, with no "and" before the last name: Okafor AB, Lindqvist M, Santos JP, et al.',
  },
  {
    question: 'What is the difference between AMA and Vancouver citation styles?',
    answer:
      'Both are numbered styles that order the reference list by first citation and write authors as Surname Initials with NLM journal abbreviations, so they look similar. AMA always uses superscript numerals, lists up to six authors (first three plus et al beyond that), closes a page range in full (312-320), writes the DOI as doi:10.xxxx with no space, and sets journal titles in italics. Vancouver (the NLM/ICMJE style) usually puts numbers in square brackets or parentheses, truncates the end page (312-20), writes "et al." with a period, and does not italicize journal titles. Many journals that say Vancouver accept either.',
  },
  {
    question: 'How do I make AMA citations in LaTeX?',
    answer:
      'TeX Live has no built-in AMA style. The closest is the community biblatex-ama style: download ama.bbx and ama.cbx from the dli-stats/biblatex-ama repository on GitHub into your project folder, load biblatex with \\usepackage[backend=biber,style=ama]{biblatex}, point \\addbibresource at your .bib file, cite with \\supercite{key} for superscript numbers and print the list with \\printbibliography. A few preamble lines fix the page-range dash, the DOI prefix and the spacing in the journal line. If you must use BibTeX, \\usepackage[super,comma,sort&compress]{natbib} with \\bibliographystyle{vancouver} gives superscript numbering and Surname Initials authors.',
  },
]

export default async function AmaCitationFormatPage() {
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
          <h1>AMA Citation Format: In-Text Citations, Reference Examples and LaTeX</h1>
          <p className="lead">
            An <strong>AMA citation</strong> is a superscript number in the text that points to a
            numbered entry in the reference list. The number is assigned the first time a source is
            cited and never changes, so a reader can glance from the text to the list without
            hunting for an author name or a year.
          </p>
          <p>
            This page covers the rules from the <em>AMA Manual of Style</em>, 11th edition (2020):
            where the superscripts go, how the reference list is built, a worked example for each
            common source type, how AMA differs from APA and Vancouver, and two tested ways to
            produce AMA citations in LaTeX.
          </p>

          {/* ───────────────────────────── What is AMA ───────────────────────────── */}
          <h2>What Is AMA Citation Style?</h2>
          <p>
            AMA style is the house style of the American Medical Association, published as the{' '}
            <em>AMA Manual of Style: A Guide for Authors and Editors</em>. The 11th edition is the
            current one. It is the required style for the JAMA Network journals (<em>JAMA</em>,{' '}
            <em>JAMA Internal Medicine</em>, <em>JAMA Pediatrics</em> and the rest) and for many
            other US medical, nursing, pharmacy and public health journals, and it is the style
            medical and health science students are often asked to use for coursework.
          </p>
          <p>
            Three things distinguish it from the author-date styles used in the social sciences:
          </p>
          <ul>
            <li>
              <strong>Citation-order numbering.</strong> Sources are numbered 1, 2, 3 in the order
              they are first cited, and the reference list is in that order, not alphabetical.
            </li>
            <li>
              <strong>Superscript in-text numerals.</strong> The citation is a small raised number,
              not a parenthetical name and year.
            </li>
            <li>
              <strong>Compact references.</strong> Authors are written as surname plus initials
              without periods, journal titles are abbreviated the way the National Library of
              Medicine abbreviates them, and the year, volume, issue and pages are run together
              without spaces.
            </li>
          </ul>

          {/* ───────────────────────────── In-text ───────────────────────────── */}
          <h2>AMA In-Text Citation Rules</h2>
          <p>
            Every in-text <strong>AMA citation</strong> is a superscript Arabic numeral. The rules
            that govern it:
          </p>
          <ol>
            <li>
              <strong>Number in order of first appearance.</strong> The first source you cite is 1,
              the second is 2, and so on through the paper. Tables and figures count: a source first
              cited in a table takes its number from where the table is first mentioned in the text.
            </li>
            <li>
              <strong>Reuse the number.</strong> If you cite source 3 again on page 9, it is still
              3. Never give one source two numbers.
            </li>
            <li>
              <strong>Place it after periods and commas, before colons and semicolons.</strong>{' '}
              The numeral sits outside a closing period or comma and inside a colon or semicolon.
            </li>
            <li>
              <strong>Separate multiple citations with commas and no spaces,</strong> and collapse
              three or more consecutive numbers into a range with a hyphen: <sup>2,5,7</sup> or{' '}
              <sup>2-4</sup>, not <sup>2, 3, 4</sup>.
            </li>
            <li>
              <strong>Put the number right after an author name</strong> when the author is named
              in the sentence, and write <em>et al</em> without a period: &quot;Okafor et al<sup>1</sup>{' '}
              reported&hellip;&quot;
            </li>
            <li>
              <strong>Cite a page as <sup>4(p211)</sup></strong> when you quote or point to a specific
              place in a long source.
            </li>
          </ol>
          <p>Here is a paragraph that uses all of these:</p>
          <blockquote>
            <p>
              Statin therapy lowers the rate of major cardiovascular events in adults older than 75
              years.<sup>1</sup> Dose adjustment for reduced renal clearance is covered in standard
              pharmacology references,<sup>2,3</sup> and current blood pressure targets for this age
              group are published online.<sup>4</sup> Chronic kidney disease now affects roughly one
              in seven adults<sup>5</sup>; the pooled analysis<sup>1</sup> did not stratify by kidney
              function. Harrow and Vance<sup>2(p188)</sup> give the dosing table.
            </p>
          </blockquote>
          <p>
            Note the semicolon case: the <sup>5</sup> goes <em>before</em> the semicolon, while the{' '}
            <sup>1</sup> and <sup>4</sup> go <em>after</em> their periods. Source 1 keeps its number
            on the second use.
          </p>

          {/* ───────────────────────────── Reference list ───────────────────────────── */}
          <h2>AMA Reference Format: The Reference List</h2>
          <p>
            The list is titled <strong>References</strong>, placed at the end of the paper, and
            numbered with Arabic numerals followed by a period, in citation order. The{' '}
            <strong>AMA reference format</strong> for a journal article, which is the pattern every
            other source type is a variation of, is:
          </p>
          <p className="text-center">
            Author AA, Author BB, Author CC. Title of article in sentence case.{' '}
            <em>J Abbrev</em>. Year;Volume(Issue):Pages. doi:10.xxxx/yyyyy
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Element</th>
                <th scope="col">Rule</th>
                <th scope="col">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Authors</td>
                <td>
                  Surname then initials, no periods and no spaces between initials, names separated
                  by commas, no &quot;and&quot;. List all authors up to 6; for 7 or more, list the
                  first 3 followed by <em>et al</em> (no period).
                </td>
                <td>Okafor AB, Lindqvist M, Santos JP, et al.</td>
              </tr>
              <tr>
                <td>Article title</td>
                <td>
                  Sentence case: capitalize only the first word, proper nouns and abbreviations.
                  Ends with a period. Subtitles follow a colon.
                </td>
                <td>Statin therapy and major cardiovascular events in older adults: a pooled analysis.</td>
              </tr>
              <tr>
                <td>Journal title</td>
                <td>
                  Abbreviated per the NLM Catalog (the Index Medicus abbreviations), in italics, no
                  periods inside the abbreviation, period after it. Single-word titles are not
                  abbreviated.
                </td>
                <td><em>N Engl J Med</em>. &nbsp; <em>JAMA</em>. &nbsp; <em>Lancet</em>.</td>
              </tr>
              <tr>
                <td>Year, volume, issue, pages</td>
                <td>
                  Year, semicolon, volume, issue in parentheses, colon, full page range with a
                  hyphen. No spaces anywhere. Keep both page numbers in full (312-320, not 312-20).
                </td>
                <td>2024;58(4):312-320.</td>
              </tr>
              <tr>
                <td>DOI</td>
                <td>
                  Lowercase <code>doi:</code> with no space, then the DOI. Nothing after it: AMA 11
                  puts no period after a DOI or URL. Include it whenever one exists.
                </td>
                <td>doi:10.1000/njim.2024.0412</td>
              </tr>
              <tr>
                <td>Book edition and publisher</td>
                <td>
                  Edition as an ordinal plus &quot;ed&quot; (2nd ed, 3rd ed), then publisher,
                  semicolon, year. The 11th edition dropped the city of publication.
                </td>
                <td>3rd ed. Brightwater Press; 2022.</td>
              </tr>
              <tr>
                <td>Access date</td>
                <td>
                  Required for anything read online that is not a journal article with a DOI:
                  &quot;Accessed Month Day, Year.&quot; followed by the URL.
                </td>
                <td>Accessed October 19, 2026. https://&hellip;</td>
              </tr>
            </tbody>
          </table>
          <p>
            Finding the journal abbreviation is the step people get wrong most often. Search the
            journal in the{' '}
            <Link href="https://www.ncbi.nlm.nih.gov/nlmcatalog/journals/" target="_blank" rel="noopener noreferrer">
              NLM Catalog
            </Link>{' '}
            and copy the &quot;NLM Title Abbreviation&quot; field; do not invent one.
          </p>

          {/* ───────────────────────────── Examples ───────────────────────────── */}
          <h2>AMA Citation Examples by Source Type</h2>
          <p>
            Each <strong>AMA citation example</strong> below is for a fictional source, formatted as
            it would appear in the reference list. The numbers match the paragraph in the in-text
            section above.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Source type</th>
                <th scope="col">AMA reference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Journal article</td>
                <td>
                  1. Okafor AB, Lindqvist M, Santos JP. Statin therapy and major cardiovascular
                  events in adults aged 75 years and older: a pooled analysis.{' '}
                  <em>Northfield J Intern Med</em>. 2024;58(4):312-320. doi:10.1000/njim.2024.0412
                </td>
              </tr>
              <tr>
                <td>Book</td>
                <td>
                  2. Harrow TL, Vance MR. <em>Principles of Clinical Pharmacology in the Elderly</em>.
                  3rd ed. Brightwater Press; 2022.
                </td>
              </tr>
              <tr>
                <td>Chapter in an edited book</td>
                <td>
                  3. Nakamura K. Renal dosing of antimicrobials. In: Harrow TL, Vance MR, eds.{' '}
                  <em>Principles of Clinical Pharmacology in the Elderly</em>. 3rd ed. Brightwater
                  Press; 2022:211-238.
                </td>
              </tr>
              <tr>
                <td>Website</td>
                <td>
                  4. Ridgeline Health Institute. Hypertension management guidelines for adults aged
                  65 and older. Ridgeline Health Institute. Published March 4, 2025. Updated June 12,
                  2025. Accessed October 19, 2026. https://www.ridgelinehealth.example/guidelines/hypertension-65
                </td>
              </tr>
              <tr>
                <td>Government report</td>
                <td>
                  5. National Health Data Bureau. <em>Chronic Kidney Disease Prevalence Among
                  Adults: 2024 Annual Summary</em>. Department of Public Health; 2025. Report
                  NHDB-25-0117. Accessed October 19, 2026. https://www.nhdb.example/reports/ckd-2024
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Things to notice: the book title is in italics and title case while the article and
            chapter titles are sentence case and roman; the chapter entry puts the editors after
            &quot;In:&quot; with &quot;eds&quot; and gives the chapter pages after the year with a
            colon; the website entry names the author or organization first, repeats the site name,
            and carries both a published date and an accessed date; and no entry ends with a period
            after a URL or DOI. A journal article with seven or more authors would begin
            &quot;Okafor AB, Lindqvist M, Santos JP, et al.&quot;
          </p>

          {/* ───────────────────────────── Comparison ───────────────────────────── */}
          <h2>AMA vs APA vs Vancouver</h2>
          <p>
            AMA is often confused with Vancouver, the numbered style maintained by the National
            Library of Medicine and the ICMJE, and medical students coming from a psychology or
            nursing background often have APA habits. The differences that matter:
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">AMA (11th ed)</th>
                <th scope="col">APA (7th ed)</th>
                <th scope="col">Vancouver (NLM/ICMJE)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>In-text citation</td>
                <td>Superscript number: years.<sup>1</sup></td>
                <td>Author-date: (Okafor et al., 2024)</td>
                <td>Number in brackets or superscript, per journal: years [1] or years.<sup>1</sup></td>
              </tr>
              <tr>
                <td>Reference list order</td>
                <td>Order of first citation</td>
                <td>Alphabetical by first author</td>
                <td>Order of first citation</td>
              </tr>
              <tr>
                <td>Author format</td>
                <td>Okafor AB, Lindqvist M, Santos JP.</td>
                <td>Okafor, A. B., Lindqvist, M., &amp; Santos, J. P.</td>
                <td>Okafor AB, Lindqvist M, Santos JP.</td>
              </tr>
              <tr>
                <td>Author cutoff</td>
                <td>All up to 6; first 3 + et al when 7 or more</td>
                <td>All up to 20; first 19, ellipsis, last author beyond that</td>
                <td>All up to 6; first 6 + et al. when 7 or more</td>
              </tr>
              <tr>
                <td>Journal title</td>
                <td>NLM abbreviation, italic: <em>N Engl J Med</em>.</td>
                <td>Full title, italic: <em>The New England Journal of Medicine</em>,</td>
                <td>NLM abbreviation, roman: N Engl J Med.</td>
              </tr>
              <tr>
                <td>Year, volume, pages</td>
                <td>2024;58(4):312-320.</td>
                <td>(2024). &hellip; <em>58</em>(4), 312&ndash;320.</td>
                <td>2024;58(4):312-20.</td>
              </tr>
              <tr>
                <td>DOI</td>
                <td>doi:10.1000/njim.2024.0412</td>
                <td>https://doi.org/10.1000/njim.2024.0412</td>
                <td>doi: 10.1000/njim.2024.0412</td>
              </tr>
            </tbody>
          </table>
          <p>
            If you are writing for a journal that says &quot;Vancouver&quot; but gives JAMA-style
            examples in its author instructions, follow the examples. The two styles are close
            enough that the instructions, not the label, decide.
          </p>

          {/* ───────────────────────────── LaTeX ───────────────────────────── */}
          <h2>AMA Citations in LaTeX</h2>
          <p>
            TeX Live ships no AMA style, so an <strong>AMA citation in LaTeX</strong> takes one
            extra step. There are two working routes: a community <code>biblatex</code> style that
            gets close to the manual, and a BibTeX fallback that gets the numbering and author
            format right.
          </p>

          <h3>Option 1: biblatex with the biblatex-ama style</h3>
          <p>
            <code>biblatex-ama</code> is not on CTAN. It is a two-file project on GitHub,{' '}
            <Link href="https://github.com/dli-stats/biblatex-ama" target="_blank" rel="noopener noreferrer">
              dli-stats/biblatex-ama
            </Link>, whose citation commands come from the <code>biblatex-ext</code> package.
            Download <code>ama.bbx</code> and <code>ama.cbx</code> into the folder that holds your{' '}
            <code>.tex</code> file, and <code>style=ama</code> will be found. It needs{' '}
            <code>biblatex-ext</code> and the <code>biber</code> backend, which Octree, Overleaf and
            every full TeX Live install provide; <code>latexmk -pdf</code> runs biber for you.
          </p>
          <p>
            Three things to know about the style. Its <code>\cite</code> prints a parenthesized
            number, (1), so for AMA superscripts use <code>\supercite</code>. Its citation style
            does not collapse <sup>1,2,3</sup> into <sup>1-3</sup>; loading the bibliography half
            on its own (<code>bibstyle=ama</code>) with biblatex-ext&apos;s{' '}
            <code>ext-numeric-comp</code> citation style does, at the cost of the two name-format
            lines that <code>ama.cbx</code> would otherwise supply. And out of the box it prints an
            en dash in page ranges, a space after the semicolon in the journal line and no DOI. The
            preamble below handles all of that; with it, the journal article entry comes out exactly
            as the manual specifies.
          </p>
          <pre><code>{`\\documentclass[11pt]{article}
\\usepackage[backend=biber,bibstyle=ama,citestyle=ext-numeric-comp,doi=true,dateabbrev=false,urldate=long]{biblatex}
\\addbibresource{refs.bib}

% Name format that ama.cbx would set; needed because citestyle replaces it.
\\DeclareNameAlias{default}{family-given}            % Okafor AB, not AB Okafor
\\renewcommand*{\\revsdnamepunct}{}                   % no comma between surname and initials

% Corrections so the output follows the AMA Manual of Style, 11th ed.
\\renewcommand*{\\multicitedelim}{\\addcomma}            % 2,3 not 2, 3
\\AtBeginDocument{\\renewcommand*{\\bibrangedash}{-}}    % 312-320 not 312–320
\\DeclareFieldFormat{doi}{doi:#1}                      % doi:10.xxxx, lowercase, no space
\\DefineBibliographyStrings{english}{urlseen={Accessed}}
\\renewbibmacro*{journal+issuetitle}{%                 % Year;Vol(Issue):Pages with no spaces
  \\usebibmacro{journal}%
  \\setunit*{\\addperiod\\addspace}%
  \\usebibmacro{issue+date}%
  \\setunit{\\addsemicolon}%
  \\printfield{volume}%
  \\iffieldundef{number}{}{(\\printfield{number})}%
  \\newunit}

\\begin{document}

\\section*{Background}
Statin therapy lowers the rate of major cardiovascular events in adults
older than 75 years.\\supercite{okafor2024} Dose adjustment for reduced renal
clearance is covered in standard pharmacology references,\\supercite{harrow2022,nakamura2022}
and current blood pressure targets for this age group are published
online.\\supercite{ridgeline2025} Chronic kidney disease now affects roughly one
in seven adults\\supercite{nhdb2025}; the pooled analysis\\supercite{okafor2024}
did not stratify by kidney function.

\\printbibliography

\\end{document}`}</code></pre>
          <p>
            Write the superscript command directly after the punctuation,{' '}
            <code>years.\supercite&#123;okafor2024&#125;</code>, and the number lands after the
            period as AMA wants. The matching <code>refs.bib</code>, with the journal abbreviation
            typed straight into the <code>journal</code> field:
          </p>
          <pre><code>{`@article{okafor2024,
  author  = {Okafor, Adaeze B. and Lindqvist, Mikael and Santos, Julia P.},
  title   = {Statin therapy and major cardiovascular events in adults aged 75 years and older: a pooled analysis},
  journal = {Northfield J Intern Med},
  year    = {2024},
  volume  = {58},
  number  = {4},
  pages   = {312--320},
  doi     = {10.1000/njim.2024.0412}
}

@book{harrow2022,
  author    = {Harrow, Thomas L. and Vance, Miriam R.},
  title     = {Principles of Clinical Pharmacology in the Elderly},
  edition   = {3},
  publisher = {Brightwater Press},
  year      = {2022}
}

@incollection{nakamura2022,
  author    = {Nakamura, Kenji},
  title     = {Renal dosing of antimicrobials},
  editor    = {Harrow, Thomas L. and Vance, Miriam R.},
  booktitle = {Principles of Clinical Pharmacology in the Elderly},
  edition   = {3},
  publisher = {Brightwater Press},
  year      = {2022},
  pages     = {211--238}
}

@online{ridgeline2025,
  author  = {{Ridgeline Health Institute}},
  title   = {Hypertension management guidelines for adults aged 65 and older},
  date    = {2025-03-04},
  url     = {https://www.ridgelinehealth.example/guidelines/hypertension-65},
  urldate = {2026-10-19}
}

@report{nhdb2025,
  author      = {{National Health Data Bureau}},
  title       = {Chronic Kidney Disease Prevalence Among Adults: 2024 Annual Summary},
  institution = {Department of Public Health},
  year        = {2025},
  number      = {NHDB-25-0117},
  type        = {Report}
}`}</code></pre>
          <p>
            Compiled, the text reads &quot;75 years.<sup>1</sup> &hellip; references,<sup>2,3</sup>{' '}
            &hellip; adults<sup>5</sup>; the pooled analysis<sup>1</sup>&quot; and the first reference
            is &quot;Okafor AB, Lindqvist M, Santos JP. Statin therapy &hellip; <em>Northfield J
            Intern Med</em>. 2024;58(4):312-320. doi:10.1000/njim.2024.0412.&quot; The double braces
            around the organization names keep biber from splitting them into given name and
            surname.
          </p>
          <p>
            What the style still gets slightly wrong, so you can hand-check before submission: it
            puts a comma rather than a semicolon between publisher and year in book entries, writes
            &quot;Ed. by&quot; instead of &quot;In: &hellip; eds&quot; for chapters, prefixes the
            website URL with &quot;url:&quot; and puts the accessed date in parentheses, and ends the
            DOI with a period. It also sets the web page title in italics and leaves out the site
            name and the &quot;Published&quot; label. Those are a few minutes of editing in a short
            reference list.
          </p>

          <h3>Option 2: BibTeX with natbib and the vancouver style</h3>
          <p>
            If your class or journal template forbids <code>biblatex</code>, the <code>natbib</code>{' '}
            package in <code>super</code> mode gives the superscript numbering, and the{' '}
            <code>vancouver</code> bibliography style (in TeX Live) formats authors as Surname
            Initials with NLM abbreviations. It is Vancouver, not AMA, so the end page is truncated
            (312-20), chapters say &quot;editors&quot; and &quot;p. 211-38&quot;, and the DOI is
            not printed; the author list and ordering are right.
          </p>
          <pre><code>{`\\documentclass[11pt]{article}
\\usepackage[super,comma,sort&compress]{natbib}
\\usepackage{url}   % vancouver.bst wraps URLs in \\url

% The style labels entries [1]; AMA wants 1.
\\makeatletter
\\renewcommand{\\@biblabel}[1]{#1.}
\\makeatother

\\begin{document}

Statin therapy lowers the rate of major cardiovascular events in adults
older than 75 years.\\cite{okafor2024} Dose adjustment is covered in standard
references,\\cite{harrow2022,nakamura2022} and the pooled analysis\\cite{okafor2024}
did not stratify by kidney function.

\\bibliographystyle{vancouver}
\\bibliography{refs}

\\end{document}`}</code></pre>
          <p>
            <code>comma</code> separates multiple citations with a comma instead of natbib&apos;s
            default semicolon, and <code>sort&amp;compress</code> turns <sup>2,3,4</sup> into{' '}
            <sup>2-4</sup>. The example cites only the first three entries of <code>refs.bib</code>{' '}
            because BibTeX styles do not know the <code>@online</code> and <code>@report</code>{' '}
            entry types from the biblatex example; for those, use <code>@misc</code>{' '}
            with a <code>howpublished</code> or <code>note</code> field for web pages and{' '}
            <code>@techreport</code> for reports. As a last resort, <code>\bibliographystyle&#123;unsrt&#125;</code>{' '}
            also keeps citation order but prints full first names and &quot;and&quot;, which you
            would have to fix by hand. Avoid the <code>ama.bst</code> file on CTAN: it is a 2002
            alpha that prints given names in full and runs the publisher and edition together.
          </p>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you cite in AMA format?</h3>
          <p>
            In the text, put a superscript Arabic numeral at the point you use a source, numbered in
            the order sources first appear: the first source cited is 1, the second is 2, and a
            source cited again keeps its original number. The numeral goes after a period or comma
            and before a colon or semicolon. In the reference list, titled References and ordered by
            those numbers, each entry gives the authors as Surname Initials (Okafor AB), the article
            title in sentence case, the NLM-abbreviated journal title in italics, then
            year;volume(issue):pages and the DOI as doi:10.xxxx/xxxxx.
          </p>
          <h3>How many authors do you list in an AMA reference?</h3>
          <p>
            List every author when there are six or fewer. When there are seven or more, list the
            first three followed by <em>et al</em> (no period after al in AMA style). Author names
            are written as surname followed by initials with no periods and no spaces between the
            initials, separated by commas, with no &quot;and&quot; before the last name: Okafor AB,
            Lindqvist M, Santos JP, et al.
          </p>
          <h3>What is the difference between AMA and Vancouver citation styles?</h3>
          <p>
            Both are numbered styles that order the reference list by first citation and write
            authors as Surname Initials with NLM journal abbreviations, so they look similar. AMA
            always uses superscript numerals, lists up to six authors (first three plus et al beyond
            that), closes a page range in full (312-320), writes the DOI as doi:10.xxxx with no
            space, and sets journal titles in italics. Vancouver (the NLM/ICMJE style) usually puts
            numbers in square brackets or parentheses, truncates the end page (312-20), writes
            &quot;et al.&quot; with a period, and does not italicize journal titles. Many journals
            that say Vancouver accept either.
          </p>
          <h3>How do I make AMA citations in LaTeX?</h3>
          <p>
            TeX Live has no built-in AMA style. The closest is the community biblatex-ama style:
            download <code>ama.bbx</code> and <code>ama.cbx</code> from the dli-stats/biblatex-ama
            repository on GitHub into your project folder, load biblatex with{' '}
            <code>\usepackage[backend=biber,style=ama]&#123;biblatex&#125;</code>, point{' '}
            <code>\addbibresource</code> at your .bib file, cite with{' '}
            <code>\supercite&#123;key&#125;</code> for superscript numbers and print the list with{' '}
            <code>\printbibliography</code>. A few preamble lines fix the page-range dash, the DOI
            prefix and the spacing in the journal line. If you must use BibTeX,{' '}
            <code>\usepackage[super,comma,sort&amp;compress]&#123;natbib&#125;</code> with{' '}
            <code>\bibliographystyle&#123;vancouver&#125;</code> gives superscript numbering and
            Surname Initials authors.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>The citations are one part of a medical manuscript; these guides cover the rest:</p>
          <ul>
            <li><Link href="/learn/apa-title-page">APA Title Page Format</Link> – If your course switches you to APA 7 for the next assignment</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> – Make the DOIs and URLs in your reference list clickable with hyperref</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> – Superscript footnote markers, and how to keep them apart from citation numbers</li>
            <li><Link href="/learn/sections">Sections in LaTeX</Link> – Unnumbered headings such as References and Acknowledgments</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">LaTeX Templates</Link> – Journal article and thesis templates to drop the examples into</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste the natbib example above and see the PDF without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">LaTeX Templates</Link> – Article and report templates ready for a bibliography</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Every symbol you might need in a methods section</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write your manuscript with AMA citations built in</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with biber and latexmk already set up: paste the
              example above, drop in the two style files, and see the compiled reference list update
              as you cite.
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
