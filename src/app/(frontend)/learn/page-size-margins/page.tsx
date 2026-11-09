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

const breadcrumbs = getLearnBreadcrumbs('Page Size & Margins', 'page-size-margins')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'page-size-margins',
  title: 'LaTeX Margins and Page Size with the geometry Package',
  seoTitle: 'LaTeX Margins and Page Size (geometry Package)',
  description: 'Set margins in LaTeX with the geometry package: a4paper or letterpaper, per-side margins, landscape, \\newgeometry for one page, and the headheight warning.',
  keywords: 'latex margins, margins latex, geometry package latex, latex geometry, latex 1 inch margins, latex change margins, latex newgeometry, latex headheight too small, latex default margins, latex page size, latex margins, latex geometry package, latex a4 paper, latex letter size, latex page layout, latex margin settings, latex landscape, latex page dimensions, set margins in latex, latex paper size',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-08'

const faq: FaqItem[] = [
  {
    question: 'How do I change the margins in LaTeX?',
    answer:
      'Load the geometry package in the preamble with the paper size and the margin you want: \\usepackage[a4paper, margin=2.5cm]{geometry}. For different margins on each side, use left, right, top and bottom, as in \\usepackage[left=3cm, right=2cm, top=2.5cm, bottom=2.5cm]{geometry}.',
  },
  {
    question: 'What are the default margins in LaTeX?',
    answer:
      'Without geometry, a 10pt article on US Letter paper has about 1.875 inches (4.7 cm) of margin on the left and right. The standard classes size the text block for readable line length, not to fill the page, which is why the default margins look wide.',
  },
  {
    question: 'How do I set 1-inch margins in LaTeX?',
    answer:
      'Add \\usepackage[letterpaper, margin=1in]{geometry} to the preamble. On A4 paper use \\usepackage[a4paper, margin=1in]{geometry}; margin sets all four sides at once.',
  },
  {
    question: 'How do I change the margins for one page in LaTeX?',
    answer:
      'Put \\newgeometry{margin=1.5cm} where the page should start and \\restoregeometry where the original margins should come back. Both commands start a new page, so place them at a page break.',
  },
  {
    question: 'How do I fix "\\headheight is too small"?',
    answer:
      'The warning comes from fancyhdr when the header is taller than the space reserved for it. Add the value it suggests, rounded up, to the geometry options, as in \\usepackage[a4paper, margin=2.5cm, headheight=15pt]{geometry}, or write \\setlength{\\headheight}{15pt} in the preamble.',
  },
]

export default async function PageSizeMarginsPage() {
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
          <h1>LaTeX Margins and Page Size with the geometry Package</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>All margins:</strong> <code>{`\\usepackage[a4paper, margin=2.5cm]{geometry}`}</code>{' '}
                in the preamble.
              </li>
              <li>
                <strong>Per side:</strong> <code>{`\\usepackage[left=3cm, right=2cm, top=2.5cm, bottom=2.5cm]{geometry}`}</code>.
              </li>
              <li>
                <strong>US Letter, 1 inch:</strong> <code>{`\\usepackage[letterpaper, margin=1in]{geometry}`}</code>.
              </li>
              <li>
                <strong>Landscape:</strong> add <code>landscape</code> to the options.
              </li>
              <li>
                <strong>One page only:</strong> <code>{`\\newgeometry{margin=1.5cm}`}</code> ...{' '}
                <code>\restoregeometry</code>.
              </li>
            </ul>
          </div>
          <p className="lead">
            To set margins in LaTeX, load the <code>geometry</code> package with the paper size and
            margins you want, for example{' '}
            <code>{`\\usepackage[a4paper, margin=2.5cm]{geometry}`}</code>. This guide covers
            per-side and two-sided margins, A4 versus US Letter, custom page sizes, landscape pages,
            changing margins mid-document with <code>\newgeometry</code>, header spacing and the{' '}
            <code>\headheight</code> warning, and the errors that come up along the way.
          </p>

          <h2>Default Page Layout</h2>
          <p>
            Before you change anything, it helps to understand what LaTeX does out of the box.
            The default page size depends on the document class and your TeX distribution:
          </p>
          <ul>
            <li>
              <strong>US Letter (8.5 &times; 11 in)</strong> &ndash; default for most US-based TeX
              distributions and classes such as <code>article</code>, <code>report</code>, and
              <code>book</code>.
            </li>
            <li>
              <strong>A4 (210 &times; 297 mm)</strong> &ndash; common default when the distribution
              is configured for European or international use, and used by many journal templates.
            </li>
          </ul>
          <p>
            LaTeX&apos;s built-in margin defaults are intentionally wide &mdash; about 1.875 inches
            (4.7&nbsp;cm) on the left and right of a 10pt <code>article</code> on letter paper
            &mdash; because the text width is chosen for a line length of about 66 characters,
            not to fill the page. While this produces pleasant
            body text, most authors need tighter control for submission requirements, institutional
            guidelines, or personal preference.
          </p>

          {/* ── Margins ── */}
          <h2>Set Margins in LaTeX with the geometry Package</h2>
          <p>
            The <code>geometry</code> package is the standard way to set margins in LaTeX. One
            line in the preamble sets the paper size and all four margins, and geometry
            recalculates <code>\textwidth</code>, <code>\textheight</code>,{' '}
            <code>\oddsidemargin</code> and the other internal lengths for you, so you never edit
            them by hand.
          </p>
          <p>
            The <code>geometry</code> package is the standard tool for setting page size and margins
            in LaTeX. It provides a clean, declarative interface that replaces the manual adjustment
            of internal length parameters such as <code>\textwidth</code>, <code>\textheight</code>,
            <code>\oddsidemargin</code>, and others.
          </p>
          <p>Basic usage is straightforward:</p>

          <pre><code>{`\\usepackage[a4paper, margin=2.5cm]{geometry}`}</code></pre>

          <p>
            You can also pass options on a separate line for better readability:
          </p>

          <pre><code>{`\\usepackage{geometry}
\\geometry{
  a4paper,
  left=25mm,
  right=25mm,
  top=30mm,
  bottom=30mm
}`}</code></pre>

          <p>
            Both approaches are equivalent. Use whichever style you find easier to maintain.
          </p>

          <p>
            Margins can be set individually or all at once. The <code>geometry</code> package
            accepts both metric and imperial units (<code>mm</code>, <code>cm</code>,{' '}
            <code>in</code>, <code>pt</code>).
          </p>

          <h3>Per-Side Margins</h3>
          <pre><code>{`\\usepackage{geometry}
\\geometry{
  a4paper,
  left=30mm,
  right=25mm,
  top=25mm,
  bottom=25mm
}`}</code></pre>

          <h3>Uniform Margins</h3>
          <p>
            Use the <code>margin</code> key to set all four margins to the same value:
          </p>
          <pre><code>{`\\usepackage[a4paper, margin=1in]{geometry}`}</code></pre>

          <h3>Horizontal and Vertical Shortcuts</h3>
          <pre><code>{`\\usepackage{geometry}
\\geometry{
  a4paper,
  hmargin=25mm,   % sets left and right
  vmargin=30mm    % sets top and bottom
}`}</code></pre>

          <h3>Two-sided Documents (inner/outer)</h3>
          <p>
            For documents printed on both sides (books, theses), use <code>inner</code> and
            <code>outer</code> instead of <code>left</code> and <code>right</code>. The inner
            margin is the one closest to the binding:
          </p>
          <pre><code>{`\\documentclass[twoside]{book}
\\usepackage{geometry}
\\geometry{
  a4paper,
  inner=30mm,    % binding side
  outer=20mm,    % outside edge
  top=25mm,
  bottom=25mm
}`}</code></pre>

          <h3>a4paper vs letterpaper</h3>
          <p>
            Always name the paper size next to the margins. Without it, <code>geometry</code> uses
            the class default, which is US Letter for the standard classes in most distributions,
            so a document you meant for A4 comes out 6&nbsp;mm narrower and 18&nbsp;mm taller
            than expected. You can give the size to the class or to geometry; geometry picks up
            the class option:
          </p>
          <pre><code>{`% Either of these gives A4 with 2.5 cm margins
\\documentclass[a4paper]{article}
\\usepackage[margin=2.5cm]{geometry}

\\documentclass{article}
\\usepackage[a4paper, margin=2.5cm]{geometry}

% US Letter with 1-inch margins
\\documentclass{article}
\\usepackage[letterpaper, margin=1in]{geometry}`}</code></pre>
          <p>
            With pdfLaTeX, XeLaTeX and LuaLaTeX, geometry also sets the PDF page size, so the PDF
            viewer shows the paper size you asked for.
          </p>

          <h3>Landscape</h3>
          <p>
            There are several ways to use landscape orientation in LaTeX, depending on whether
            you want the entire document or just selected pages in landscape.
          </p>

          <h4>Entire Document in Landscape</h4>
          <p>
            Pass the <code>landscape</code> option to <code>geometry</code>:
          </p>
          <pre><code>{`\\usepackage[a4paper, landscape, margin=1in]{geometry}`}</code></pre>

          <h4>Individual Landscape Pages</h4>
          <p>
            Use the <code>lscape</code> package (or <code>pdflscape</code> for PDF output that
            rotates the view in PDF readers) to insert landscape pages within a portrait document:
          </p>
          <pre><code>{`\\usepackage{pdflscape}

% ... portrait content ...

\\begin{landscape}
  % This content appears on a landscape page
  \\begin{table}[ht]
    \\centering
    \\caption{A wide table that needs landscape orientation}
    \\begin{tabular}{lcccccccc}
      \\toprule
      Item & Jan & Feb & Mar & Apr & May & Jun & Jul & Aug \\\\
      \\midrule
      Sales & 120 & 135 & 150 & 142 & 160 & 175 & 180 & 190 \\\\
      \\bottomrule
    \\end{tabular}
  \\end{table}
\\end{landscape}

% ... portrait content continues ...`}</code></pre>

          <h4>Landscape with Adjusted Margins</h4>
          <p>
            If you need different margins on landscape pages, combine <code>pdflscape</code> with{' '}
            <code>\newgeometry</code>. Call <code>\newgeometry</code> before the landscape
            environment and <code>\restoregeometry</code> after it, not inside:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[a4paper, margin=1in]{geometry}
\\usepackage{pdflscape}
\\begin{document}

Portrait text.

\\newgeometry{margin=15mm}
\\begin{landscape}
  Wide content here.
\\end{landscape}
\\restoregeometry

Portrait again, with the original margins.

\\end{document}`}</code></pre>

          <h3>Change Margins Mid-Document with \newgeometry</h3>
          <p>
            Sometimes you need different margins for different sections of your document &mdash;
            for example, wider margins for an appendix with large figures, or narrower margins
            for a title page. The <code>geometry</code> package provides two commands for this:
          </p>

          <pre><code>{`\\documentclass{article}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}

\\begin{document}

\\section{Normal Section}
This text uses the default 1-inch margins.

% Switch to new margins
\\newgeometry{left=15mm, right=15mm, top=20mm, bottom=20mm}

\\section{Wide Section}
This section has narrower margins for more content space.
Perfect for wide tables or figures.

% Restore original margins
\\restoregeometry

\\section{Back to Normal}
Margins are back to the original 1-inch setting.

\\end{document}`}</code></pre>

          <p>
            <strong>Important notes about <code>\newgeometry</code>:</strong>
          </p>
          <ul>
            <li>
              It always triggers a page break, so place it at natural section boundaries.
            </li>
            <li>
              <code>\restoregeometry</code> returns to whatever was set in the preamble
              <code>\geometry&#123;...&#125;</code> call.
            </li>
            <li>
              You can call <code>\newgeometry</code> multiple times with different settings
              throughout the document.
            </li>
          </ul>

          <h3>Header Height and the fancyhdr Warning</h3>
          <p>
            When using packages like <code>fancyhdr</code> for custom headers and footers, you
            often need to adjust spacing to prevent overlaps. The <code>geometry</code> package
            provides dedicated options for this:
          </p>

          <pre><code>{`\\usepackage{geometry}
\\geometry{
  a4paper,
  margin=1in,
  headheight=14pt,   % height of the header area
  headsep=10mm,      % space between header and body text
  footskip=12mm      % space between body text and footer
}`}</code></pre>

          <p>
            With an 11pt or 12pt document and a <code>fancy</code> page style, the log shows{' '}
            <em>Package fancyhdr Warning: \headheight is too small (12.0pt): Make it at least
            14.49998pt</em>. The header is taller than the space reserved for it, so it pushes
            the body down by a different amount on different pages. Give geometry the number
            from the warning, rounded up:
          </p>

          <pre><code>{`\\usepackage[a4paper, margin=2.5cm, headheight=15pt]{geometry}

% or, after geometry has been loaded
\\geometry{headheight=15pt}`}</code></pre>

          <h4>Including Header and Footer in Margins</h4>
          <p>
            By default, <code>geometry</code> places headers and footers inside the margin area.
            You can change this behaviour with the <code>includeheadfoot</code> option, which
            counts the header and footer as part of the text body:
          </p>
          <pre><code>{`\\usepackage{geometry}
\\geometry{
  a4paper,
  margin=1in,
  includeheadfoot,
  headheight=14pt,
  headsep=10mm,
  footskip=12mm
}`}</code></pre>

          <h2>Setting Page Size</h2>
          <p>
            The <code>geometry</code> package supports every standard paper size as well as fully
            custom dimensions. Pass the paper size as a package option:
          </p>

          <pre><code>{`% Standard sizes
\\usepackage[a4paper]{geometry}
\\usepackage[letterpaper]{geometry}
\\usepackage[a5paper]{geometry}
\\usepackage[b5paper]{geometry}
\\usepackage[legalpaper]{geometry}
\\usepackage[executivepaper]{geometry}

% Custom size
\\usepackage[paperwidth=6in, paperheight=9in]{geometry}`}</code></pre>

          <h3>Common Paper Sizes</h3>
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Width</th>
                <th>Height</th>
                <th>Typical Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>a4paper</code></td>
                <td>210 mm</td>
                <td>297 mm</td>
                <td>International standard, journals</td>
              </tr>
              <tr>
                <td><code>letterpaper</code></td>
                <td>8.5 in</td>
                <td>11 in</td>
                <td>US standard</td>
              </tr>
              <tr>
                <td><code>a5paper</code></td>
                <td>148 mm</td>
                <td>210 mm</td>
                <td>Small booklets, pocket guides</td>
              </tr>
              <tr>
                <td><code>b5paper</code></td>
                <td>176 mm</td>
                <td>250 mm</td>
                <td>Books, textbooks</td>
              </tr>
              <tr>
                <td><code>legalpaper</code></td>
                <td>8.5 in</td>
                <td>14 in</td>
                <td>US legal documents</td>
              </tr>
              <tr>
                <td><code>executivepaper</code></td>
                <td>7.25 in</td>
                <td>10.5 in</td>
                <td>Business correspondence</td>
              </tr>
            </tbody>
          </table>

          <h2>Common Margin Presets</h2>
          <p>
            Here are ready-to-use configurations for the most frequent scenarios:
          </p>

          <h3>1-inch Margins All Around</h3>
          <p>
            The most commonly requested layout for US academic submissions:
          </p>
          <pre><code>{`\\usepackage[letterpaper, margin=1in]{geometry}`}</code></pre>

          <h3>Narrow Margins</h3>
          <p>
            Useful for drafts, internal reports, or maximising content area:
          </p>
          <pre><code>{`\\usepackage[a4paper, margin=15mm]{geometry}`}</code></pre>

          <h3>Wide Margins</h3>
          <p>
            Good for documents with margin notes or for improved readability:
          </p>
          <pre><code>{`\\usepackage{geometry}
\\geometry{
  a4paper,
  left=40mm,
  right=40mm,
  top=35mm,
  bottom=35mm
}`}</code></pre>

          <h3>Thesis-style Layout</h3>
          <p>
            Many universities require a wider binding margin. Here is a typical thesis configuration:
          </p>
          <pre><code>{`\\documentclass[12pt, twoside]{report}
\\usepackage{geometry}
\\geometry{
  a4paper,
  inner=35mm,     % extra space for binding
  outer=25mm,
  top=25mm,
  bottom=30mm,
  headheight=14pt,
  headsep=12mm
}`}</code></pre>

          <h2>Quick Reference</h2>
          <p>
            Here is a summary of the most useful <code>geometry</code> package options:
          </p>
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>margin</code></td>
                <td>Set all four margins equally</td>
                <td><code>margin=1in</code></td>
              </tr>
              <tr>
                <td><code>left / right</code></td>
                <td>Individual horizontal margins</td>
                <td><code>left=30mm</code></td>
              </tr>
              <tr>
                <td><code>top / bottom</code></td>
                <td>Individual vertical margins</td>
                <td><code>top=25mm</code></td>
              </tr>
              <tr>
                <td><code>inner / outer</code></td>
                <td>Margins for two-sided documents</td>
                <td><code>inner=35mm</code></td>
              </tr>
              <tr>
                <td><code>hmargin</code></td>
                <td>Set left and right margins together</td>
                <td><code>hmargin=25mm</code></td>
              </tr>
              <tr>
                <td><code>vmargin</code></td>
                <td>Set top and bottom margins together</td>
                <td><code>vmargin=30mm</code></td>
              </tr>
              <tr>
                <td><code>headheight</code></td>
                <td>Height of the header area</td>
                <td><code>headheight=14pt</code></td>
              </tr>
              <tr>
                <td><code>headsep</code></td>
                <td>Space between header and body</td>
                <td><code>headsep=10mm</code></td>
              </tr>
              <tr>
                <td><code>footskip</code></td>
                <td>Space between body and footer</td>
                <td><code>footskip=12mm</code></td>
              </tr>
              <tr>
                <td><code>landscape</code></td>
                <td>Switch to landscape orientation</td>
                <td><code>landscape</code></td>
              </tr>
              <tr>
                <td><code>includeheadfoot</code></td>
                <td>Include header/footer in body area</td>
                <td><code>includeheadfoot</code></td>
              </tr>
              <tr>
                <td><code>paperwidth / paperheight</code></td>
                <td>Custom paper dimensions</td>
                <td><code>paperwidth=6in</code></td>
              </tr>
              <tr>
                <td><code>textwidth / textheight</code></td>
                <td>Set body text area directly</td>
                <td><code>textwidth=16cm</code></td>
              </tr>
            </tbody>
          </table>

          <h2>Common Paper Sizes</h2>
          <p>
            A complete reference of ISO and North American paper sizes you may encounter:
          </p>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Width (mm)</th>
                <th>Height (mm)</th>
                <th>Width (in)</th>
                <th>Height (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A3</td>
                <td>297</td>
                <td>420</td>
                <td>11.69</td>
                <td>16.54</td>
              </tr>
              <tr>
                <td>A4</td>
                <td>210</td>
                <td>297</td>
                <td>8.27</td>
                <td>11.69</td>
              </tr>
              <tr>
                <td>A5</td>
                <td>148</td>
                <td>210</td>
                <td>5.83</td>
                <td>8.27</td>
              </tr>
              <tr>
                <td>A6</td>
                <td>105</td>
                <td>148</td>
                <td>4.13</td>
                <td>5.83</td>
              </tr>
              <tr>
                <td>B5</td>
                <td>176</td>
                <td>250</td>
                <td>6.93</td>
                <td>9.84</td>
              </tr>
              <tr>
                <td>US Letter</td>
                <td>216</td>
                <td>279</td>
                <td>8.5</td>
                <td>11</td>
              </tr>
              <tr>
                <td>US Legal</td>
                <td>216</td>
                <td>356</td>
                <td>8.5</td>
                <td>14</td>
              </tr>
              <tr>
                <td>US Executive</td>
                <td>184</td>
                <td>267</td>
                <td>7.25</td>
                <td>10.5</td>
              </tr>
            </tbody>
          </table>

          {/* ── Common errors ── */}
          <h2>Common Errors</h2>
          <table>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>LaTeX Error: Option clash for package geometry</em></td>
                <td>geometry is loaded twice with different options, often once by a template</td>
                <td>Load it once; change settings later with <code>{`\\geometry{...}`}</code></td>
              </tr>
              <tr>
                <td><em>\headheight is too small (12.0pt): Make it at least 14.49998pt</em></td>
                <td>fancyhdr header taller than the reserved space</td>
                <td><code>headheight=15pt</code> in the geometry options</td>
              </tr>
              <tr>
                <td>Margins look different from what you set</td>
                <td>Paper size not given, so letter paper is used</td>
                <td>Add <code>a4paper</code> or <code>letterpaper</code></td>
              </tr>
              <tr>
                <td>Margins change after <code>\usepackage&#123;geometry&#125;</code> with no options</td>
                <td>geometry applies its own default layout</td>
                <td>Always pass <code>margin</code> or per-side values</td>
              </tr>
              <tr>
                <td>Unexpected blank page or page break</td>
                <td><code>\newgeometry</code> and <code>\restoregeometry</code> always start a new page</td>
                <td>Call them only at a page or chapter boundary</td>
              </tr>
              <tr>
                <td>Margins ignored in a Beamer or KOMA-Script document</td>
                <td>The class manages its own layout</td>
                <td>Use the class&apos;s own options (e.g. <code>typearea</code> in KOMA-Script)</td>
              </tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I change the margins in LaTeX?</h3>
          <p>
            Load the geometry package in the preamble with the paper size and the margin you want:{' '}
            <code>{`\\usepackage[a4paper, margin=2.5cm]{geometry}`}</code>. For different margins on
            each side, use <code>left</code>, <code>right</code>, <code>top</code> and{' '}
            <code>bottom</code>, as in <code>{`\\usepackage[left=3cm, right=2cm, top=2.5cm, bottom=2.5cm]{geometry}`}</code>.
          </p>
          <h3>What are the default margins in LaTeX?</h3>
          <p>
            Without geometry, a 10pt article on US Letter paper has about 1.875 inches (4.7 cm) of
            margin on the left and right. The standard classes size the text block for readable
            line length, not to fill the page, which is why the default margins look wide.
          </p>
          <h3>How do I set 1-inch margins in LaTeX?</h3>
          <p>
            Add <code>{`\\usepackage[letterpaper, margin=1in]{geometry}`}</code> to the preamble. On
            A4 paper use <code>{`\\usepackage[a4paper, margin=1in]{geometry}`}</code>; margin sets
            all four sides at once.
          </p>
          <h3>How do I change the margins for one page in LaTeX?</h3>
          <p>
            Put <code>{`\\newgeometry{margin=1.5cm}`}</code> where the page should start and{' '}
            <code>\restoregeometry</code> where the original margins should come back. Both commands
            start a new page, so place them at a page break.
          </p>
          <h3>How do I fix &ldquo;\headheight is too small&rdquo;?</h3>
          <p>
            The warning comes from fancyhdr when the header is taller than the space reserved for
            it. Add the value it suggests, rounded up, to the geometry options, as in{' '}
            <code>{`\\usepackage[a4paper, margin=2.5cm, headheight=15pt]{geometry}`}</code>, or write{' '}
            <code>{`\\setlength{\\headheight}{15pt}`}</code> in the preamble.
          </p>

          <h2>Next Steps</h2>
          <p>Now that you can control page layout, explore more LaTeX topics:</p>
          <ul>
            <li><Link href="/learn/page-numbering">LaTeX Page Numbering</Link> &ndash; Roman and arabic numbering, page styles, fancyhdr headers and footers</li>
            <li><Link href="/learn/horizontal-lines">Horizontal Lines in LaTeX</Link> &ndash; Rules in text, tables, headers and under section titles</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial</li>
            <li><Link href="/learn/tikz">Learn TikZ</Link> &ndash; Create diagrams and graphics</li>
            <li><Link href="/learn/pgfplots">Learn PGFPlots</Link> &ndash; Generate publication-quality plots</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test your LaTeX code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> &ndash; Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> &ndash; Generate BibTeX citations from DOIs</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and Greek letters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX page layout" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree – the AI-powered LaTeX editor that makes writing faster and easier.
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
