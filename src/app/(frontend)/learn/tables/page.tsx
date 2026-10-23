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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Tables', 'tables')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'tables',
  title: 'LaTeX Tables: How to Make a Table in LaTeX and Overleaf',
  seoTitle: 'LaTeX Tables: Make a Table in LaTeX or Overleaf',
  description: 'How to make a table in LaTeX: the tabular environment and table float with caption and label, booktabs rules, multicolumn and multirow, column widths with p/m/b and tabularx, float placement, landscape and multi-page tables, colored rows, decimal alignment with siunitx, footnotes in tables, and fixes for common tabular errors.',
  keywords: 'table in latex, tabular in latex, latex table, latex tabular, how to make a table in latex, latex booktabs, latex multicolumn, latex multirow, latex table generator, latex longtable, latex hline, latex table width, latex tabularx, create table in latex, latex table example, latex table formatting, latex colored table, latex landscape table, latex sidewaystable, latex table caption, latex table placement, latex siunitx table, misplaced noalign, extra alignment tab, latex table spacing, latex table row spacing, latex row height, latex table column spacing, latex arraystretch, latex tabcolsep, latex table padding, latex addlinespace, latex cell padding, latex table row column separation, latex table generator online, excel to latex table, latex table from excel, create latex tables easily, overleaf table, overleaf tabular, table in overleaf, tables in overleaf, how to make a table in overleaf, overleaf insert table, latex table overleaf',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-23'

const faq: FaqItem[] = [
  {
    question: 'How do I make a table in Overleaf?',
    answer:
      'Write a tabular environment inside a table float in main.tex, exactly as in any LaTeX document: declare the columns, separate cells with & and end rows with \\\\. Add \\usepackage{booktabs} to the preamble for \\toprule, \\midrule and \\bottomrule. Overleaf compiles with TeX Live, so booktabs, multirow, tabularx, longtable, xcolor and siunitx are already installed; you only load them. The editor toolbar also has an Insert table button that drops in an empty table skeleton.',
  },
  {
    question: 'Why does \\toprule give "Undefined control sequence" in Overleaf?',
    answer:
      '\\toprule, \\midrule and \\bottomrule come from the booktabs package, and \\multirow from the multirow package. The error means the package is not loaded: add \\usepackage{booktabs} (or \\usepackage{multirow}) to the preamble of main.tex, before \\begin{document}, and recompile.',
  },
]

export default async function TablesPage() {
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
            &larr; Back to Learn
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1>LaTeX Tables: How to Make a Table in LaTeX and Overleaf</h1>
          <p className="lead">
            A table in LaTeX is a <code>tabular</code> environment: you declare the columns, separate
            cells with <code>&amp;</code> and end rows with <code>\\</code>. Wrapping it in a{' '}
            <code>table</code> float adds a caption and a number you can reference. From there,
            packages handle everything else: <code>booktabs</code> for clean rules,{' '}
            <code>multirow</code> and <code>\multicolumn</code> for merged cells,{' '}
            <code>tabularx</code> for fixed widths, <code>longtable</code> for tables that run over
            several pages, <code>xcolor</code> for shaded rows and <code>siunitx</code> for
            decimal-aligned numbers. This guide starts with a complete table you can paste into any
            document and then covers each of those techniques, the float placement rules, landscape
            tables, footnotes inside tables, and the errors a <code>tabular</code> can throw.
            Every example is standard LaTeX, so it works unchanged in Overleaf, Octree or a local
            TeX installation; the <a href="#tables-in-overleaf">Tables in Overleaf</a> section
            covers the Overleaf-specific details.
          </p>

          {/* ── Quick start ── */}
          <h2>Quick Start: A Complete Table</h2>
          <p>
            Most tables in papers and theses look like this one: a <code>table</code> float holding
            a caption, a label and a <code>booktabs</code>-ruled <code>tabular</code>. Copy it, change
            the column specifier and the rows, and you are done.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{booktabs}
\\begin{document}

\\begin{table}[htbp]
  \\centering
  \\caption{Accuracy of three models on the test set.}
  \\label{tab:accuracy}
  \\begin{tabular}{lcc}
    \\toprule
    Model    & Accuracy (\\%) & Parameters (M) \\\\
    \\midrule
    Baseline & 91.2          & 12            \\\\
    Large    & 94.7          & 48            \\\\
    Ours     & 95.3          & 15            \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}

Table~\\ref{tab:accuracy} summarises the results.

\\end{document}`}</code></pre>
          <p>
            The pieces, from the outside in: <code>table</code> is the float that gets a number
            and can move to a good position on the page; <code>[htbp]</code> lists the positions
            you allow; <code>\centering</code> centres the content; <code>\caption</code> gives the
            caption (above the table, by convention) and steps the table counter;{' '}
            <code>\label</code> stores that number for <code>\ref</code>; and{' '}
            <code>{`\\begin{tabular}{lcc}`}</code> declares three columns: left-aligned, centred,
            centred. Everything below walks through these parts in detail.
          </p>

          <h2>Basic Table Structure</h2>
          <p>
            The foundation of every LaTeX table is the <code>tabular</code> environment. It takes a
            column specification that defines how many columns the table has and how each column is
            aligned. Cells in the same row are separated by <code>&amp;</code>, and rows are
            terminated by <code>\\</code>. Horizontal lines are drawn with <code>\hline</code>.
          </p>

          <pre><code>{`\\documentclass{article}
\\begin{document}

\\begin{tabular}{l c r}
  \\hline
  Left & Centre & Right \\\\
  \\hline
  A1   & B1     & C1    \\\\
  A2   & B2     & C2    \\\\
  A3   & B3     & C3    \\\\
  \\hline
\\end{tabular}

\\end{document}`}</code></pre>

          <p>
            The column specifier <code>&#123;l c r&#125;</code> defines three columns: left-aligned,
            centred, and right-aligned respectively. Each <code>&amp;</code> advances to the next
            column, and each <code>\\\\</code> ends the current row.
          </p>

          <h2>The table Environment</h2>
          <p>
            The <code>tabular</code> environment creates the table content itself, but it does not
            make the table &quot;float&quot; or give it a caption. To add those features, wrap the
            tabular inside a <code>table</code> environment. The <code>table</code> environment is a
            floating container that LaTeX can position automatically for optimal page layout.
          </p>

          <pre><code>{`\\begin{table}[htbp]
  \\centering
  \\caption{Experimental results for three samples.}
  \\label{tab:results}
  \\begin{tabular}{l c c}
    \\hline
    Sample & Temperature (\\textdegree C) & Yield (\\%) \\\\
    \\hline
    A      & 100                          & 85         \\\\
    B      & 150                          & 92         \\\\
    C      & 200                          & 78         \\\\
    \\hline
  \\end{tabular}
\\end{table}`}</code></pre>

          <p>Key elements of the <code>table</code> environment:</p>
          <ul>
            <li>
              <strong><code>\centering</code></strong> &ndash; Centres the table horizontally on the
              page.
            </li>
            <li>
              <strong><code>\caption&#123;...&#125;</code></strong> &ndash; Adds a numbered caption.
              Place it above or below the tabular.
            </li>
            <li>
              <strong><code>\label&#123;tab:results&#125;</code></strong> &ndash; Creates a reference
              label so you can use <code>\ref&#123;tab:results&#125;</code> elsewhere.
            </li>
            <li>
              <strong><code>[htbp]</code></strong> &ndash; Placement specifiers: <strong>h</strong>ere,
              <strong>t</strong>op, <strong>b</strong>ottom, <strong>p</strong>age of floats. LaTeX
              tries each in order.
            </li>
          </ul>

          <h3>\centering vs. the center environment</h3>
          <p>
            Inside a float, use the <code>\centering</code> declaration, not{' '}
            <code>{`\\begin{center} ... \\end{center}`}</code>. Both centre the table, but the{' '}
            <code>center</code> environment is a list internally and adds vertical space above and
            below, which produces an uneven gap between the caption and the table. The{' '}
            <code>center</code> environment is the right choice only for a <code>tabular</code>{' '}
            placed directly in the text, outside any float, where that extra space is wanted.
          </p>

          <h3>Float placement: [htbp], [H] and \FloatBarrier</h3>
          <p>
            A <code>table</code> is a float: LaTeX puts it where the page layout works best, which
            is not always where you wrote it. The placement argument lists the positions you
            accept. <code>[htbp]</code> allows all four and is the usual choice; <code>[t]</code>{' '}
            forces the top of a page; <code>[!htb]</code> relaxes LaTeX&apos;s internal limits on
            how much of a page a float may take. If a table <em>must</em> appear exactly where it
            is written, the <code>float</code> package provides <code>[H]</code>:
          </p>
          <pre><code>{`\\usepackage{float}

\\begin{table}[H]   % exactly here, no floating
  ...
\\end{table}`}</code></pre>
          <p>
            <code>[H]</code> can leave large blank areas at page bottoms, so a gentler tool is
            often better: <code>\FloatBarrier</code> from the <code>placeins</code> package stops
            floats from drifting past a given point, typically the end of a section:
          </p>
          <pre><code>{`\\usepackage[section]{placeins}   % barrier at every \\section
% or, manually, wherever needed:
\\FloatBarrier`}</code></pre>
          <p>
            If many tables pile up at the end of a chapter, <code>\clearpage</code> flushes them
            all onto a new page. The warning <em>Too many unprocessed floats</em> means more than
            eighteen floats are waiting; a <code>\clearpage</code> or <code>\FloatBarrier</code>{' '}
            fixes it.
          </p>

          <h2>Column Alignment</h2>
          <p>
            The column specifier string controls alignment and structure. LaTeX provides several
            column types out of the box:
          </p>

          <table>
            <thead>
              <tr>
                <th>Specifier</th>
                <th>Alignment</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>l</code></td>
                <td>Left</td>
                <td>Left-aligned column, natural width</td>
              </tr>
              <tr>
                <td><code>c</code></td>
                <td>Centre</td>
                <td>Centre-aligned column, natural width</td>
              </tr>
              <tr>
                <td><code>r</code></td>
                <td>Right</td>
                <td>Right-aligned column, natural width</td>
              </tr>
              <tr>
                <td><code>p&#123;width&#125;</code></td>
                <td>Top</td>
                <td>Paragraph column with specified width, top-aligned</td>
              </tr>
              <tr>
                <td><code>m&#123;width&#125;</code></td>
                <td>Middle</td>
                <td>Paragraph column, vertically centred (requires <code>array</code> package)</td>
              </tr>
              <tr>
                <td><code>b&#123;width&#125;</code></td>
                <td>Bottom</td>
                <td>Paragraph column, bottom-aligned (requires <code>array</code> package)</td>
              </tr>
            </tbody>
          </table>

          <pre><code>{`% Paragraph columns are useful for wrapping long text
\\begin{tabular}{l p{5cm} r}
  \\hline
  Name  & Description                              & Score \\\\
  \\hline
  Alpha & A long description that wraps within the
          specified 5cm column width.               & 95    \\\\
  Beta  & Another description, also wrapped.        & 88    \\\\
  \\hline
\\end{tabular}`}</code></pre>

          <h3>Column widths with p, m and b</h3>
          <p>
            The <code>l</code>, <code>c</code> and <code>r</code> columns are as wide as their
            widest cell and never wrap. For text that should wrap, give the column a width.{' '}
            <code>{`p{width}`}</code> is built in and aligns cell contents to the top of the row;{' '}
            <code>{`m{width}`}</code> (middle) and <code>{`b{width}`}</code> (bottom) come from the{' '}
            <code>array</code> package. Width can be absolute (<code>3cm</code>) or relative to the
            text width (<code>0.4\textwidth</code>):
          </p>
          <pre><code>{`\\usepackage{array}
\\usepackage{booktabs}

\\begin{tabular}{l m{4cm} b{3cm}}
  \\toprule
  Top-aligned (l) & Middle-aligned (m) & Bottom-aligned (b) \\\\
  \\midrule
  Short & This cell contains enough text to wrap onto a second and
          third line, and the other cells align to its middle. & Last line \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>
          <p>
            Text in a paragraph column is justified by default, which can look ragged in a narrow
            cell. The <code>array</code> package&apos;s <code>&gt;{'{'}...{'}'}</code> prefix runs a
            command at the start of every cell in that column, so{' '}
            <code>{`>{\\raggedright\\arraybackslash}p{4cm}`}</code> gives left-aligned, unjustified
            text. The <code>\arraybackslash</code> restores <code>\\</code> as the row terminator,
            which <code>\raggedright</code> otherwise redefines. The same prefix sets fonts for a
            whole column: <code>{`>{\\bfseries}l`}</code> for a bold first column, or{' '}
            <code>{`>{\\small}c`}</code> for a smaller one.
          </p>
          <p>
            You can also add vertical lines between columns by placing <code>|</code> in the column
            specifier, although modern typographic practice discourages heavy use of vertical rules:
          </p>

          <pre><code>{`% Vertical lines (old style — prefer booktabs instead)
\\begin{tabular}{|l|c|r|}
  \\hline
  Left & Centre & Right \\\\
  \\hline
  A    & B      & C     \\\\
  \\hline
\\end{tabular}`}</code></pre>

          <h2>Adding Lines and Rules</h2>
          <p>
            LaTeX provides several ways to add horizontal and partial lines to tables. The built-in
            commands work but produce results that are typographically inferior to the
            <code>booktabs</code> package.
          </p>

          <h3>Basic Lines</h3>
          <pre><code>{`% \\hline draws a full-width horizontal line
\\begin{tabular}{l c r}
  \\hline
  Header 1 & Header 2 & Header 3 \\\\
  \\hline
  A        & B        & C        \\\\
  D        & E        & F        \\\\
  \\hline
\\end{tabular}

% \\cline{i-j} draws a partial line from column i to column j
\\begin{tabular}{l c r}
  \\hline
  Header 1 & Header 2 & Header 3 \\\\
  \\cline{1-2}
  A        & B        & C        \\\\
  \\cline{2-3}
  D        & E        & F        \\\\
  \\hline
\\end{tabular}`}</code></pre>

          <h3>The booktabs Package</h3>
          <p>
            The <code>booktabs</code> package provides three commands that produce cleaner, more
            professional rules with proper spacing:
          </p>
          <ul>
            <li><code>\toprule</code> &ndash; A thick line at the top of the table</li>
            <li><code>\midrule</code> &ndash; A thinner line separating the header from the body</li>
            <li><code>\bottomrule</code> &ndash; A thick line at the bottom of the table</li>
          </ul>

          <pre><code>{`\\usepackage{booktabs}

\\begin{tabular}{l c r}
  \\toprule
  Header 1 & Header 2 & Header 3 \\\\
  \\midrule
  A        & B        & C        \\\\
  D        & E        & F        \\\\
  G        & H        & I        \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <h2>Professional Tables with booktabs</h2>
          <p>
            The <code>booktabs</code> package is the gold standard for typesetting tables in LaTeX.
            It follows a key principle: <strong>never use vertical rules</strong> and
            <strong>never use double rules</strong>. Compare the two approaches:
          </p>

          <h3>Before: Traditional Style</h3>
          <pre><code>{`% Old-fashioned table with vertical and double lines
\\begin{tabular}{|l|c|r|}
  \\hline\\hline
  Name  & Grade & Score \\\\
  \\hline\\hline
  Alice & A     & 95    \\\\
  \\hline
  Bob   & B+    & 88    \\\\
  \\hline
  Carol & A-    & 91    \\\\
  \\hline\\hline
\\end{tabular}`}</code></pre>

          <h3>After: booktabs Style</h3>
          <pre><code>{`% Clean, professional table with booktabs
\\usepackage{booktabs}

\\begin{tabular}{lcr}
  \\toprule
  Name  & Grade & Score \\\\
  \\midrule
  Alice & A     & 95    \\\\
  Bob   & B+    & 88    \\\\
  Carol & A-    & 91    \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <p>
            The booktabs version is cleaner, more readable, and matches the style used in most
            published journals. The <code>booktabs</code> package also provides
            <code>\cmidrule&#123;i-j&#125;</code> for partial horizontal rules with proper trimming:
          </p>

          <pre><code>{`\\begin{tabular}{lcc}
  \\toprule
              & \\multicolumn{2}{c}{Scores} \\\\
  \\cmidrule(lr){2-3}
  Student     & Midterm & Final \\\\
  \\midrule
  Alice       & 92      & 95   \\\\
  Bob         & 85      & 88   \\\\
  Carol       & 90      & 91   \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <p>
            The <code>(lr)</code> after <code>\cmidrule</code> trims the rule slightly on the left
            and right, creating visual separation between column groups. You can use
            <code>(l)</code>, <code>(r)</code>, or <code>(lr)</code> as needed.
          </p>

          {/* ── Spacing ── */}
          <h2>Row and Column Spacing</h2>
          <p>
            Default tabular spacing is tight: rows sit at the normal line height and each column
            gets 6pt of padding on either side. Four settings control it. <code>\arraystretch</code>{' '}
            scales every row height, <code>\\[6pt]</code> adds space after one row,{' '}
            <code>\tabcolsep</code> sets the padding on each side of every column, and{' '}
            <code>@{'{}'}</code> in the column specifier replaces that padding for one gap.
          </p>

          <h3>Row height: \arraystretch and \\[6pt]</h3>
          <p>
            <code>\arraystretch</code> is a multiplier, so 1.5 makes every row half again as
            tall. Set it with <code>\renewcommand</code> (it is a macro, not a length) and keep the
            change inside the <code>table</code> environment or a group so it does not leak into
            the rest of the document. For extra space after a single row, add an optional length
            to its <code>\\</code>:
          </p>
          <pre><code>{`% Taller rows for the whole table
\\begin{table}[htbp]
  \\centering
  \\renewcommand{\\arraystretch}{1.5}
  \\begin{tabular}{|c|c|}
    \\hline
    Cell 1 & Cell 2 \\\\
    \\hline
    Cell 3 & Cell 4 \\\\
    \\hline
  \\end{tabular}
\\end{table}
% The table environment ends the group, so \\arraystretch is back to 1.0 here

% Extra space after one row
\\begin{tabular}{lr}
  \\toprule
  Item & Price \\\\[6pt]
  \\midrule
  Widget & 5.00 \\\\
  Gadget & 3.50 \\\\[1ex]
  Total & 8.50 \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>
          <p>
            <code>\\[6pt]</code> adds space <em>below</em> the row; it cannot add space above.
            For headroom above a row, or to pad cells symmetrically, use the methods under{' '}
            <em>cell padding</em> below.
          </p>

          <h3>\addlinespace with booktabs</h3>
          <p>
            In a booktabs table, <code>\addlinespace</code> inserts a small vertical gap (0.5em by
            default) between rows, a cleaner way to group rows than <code>\midrule</code> or an
            empty row. It takes an optional length:
          </p>
          <pre><code>{`\\usepackage{booktabs}

\\begin{tabular}{lcc}
  \\toprule
  Item & Qty & Price \\\\
  \\midrule
  Widget A & 10 & 5.00 \\\\
  Widget B & 25 & 3.50 \\\\
  \\addlinespace
  Gadget C & 4 & 12.00 \\\\
  \\addlinespace[1em]
  \\textbf{Total} & 39 & 185.50 \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <h3>Column separation: \tabcolsep, @{'{}'} and \hspace</h3>
          <p>
            <code>\tabcolsep</code> is the padding on <em>each side</em> of a column, so the gap
            between two columns is twice its value (12pt by default). It is a length, so change it
            with <code>\setlength</code>. The <code>@{'{...}'}</code> specifier replaces the padding
            at one position with whatever you put inside the braces: empty braces remove it,
            which is how a table is made flush with the text margin, and <code>\hspace</code>{' '}
            widens one particular gap without touching the others.
          </p>
          <pre><code>{`% Wider gaps between all columns (default is 6pt)
\\setlength{\\tabcolsep}{10pt}

% Remove the padding at the left and right edges
\\begin{tabular}{@{}lcc@{}}
  \\toprule
  Name & Value & Unit \\\\
  \\midrule
  Speed & 100 & km/h \\\\
  Time & 2.5 & h \\\\
  \\bottomrule
\\end{tabular}

% A 1cm gap between the first two columns only
\\begin{tabular}{c@{\\hspace{1cm}}cc}
  a & b & c \\\\
  d & e & f
\\end{tabular}

% Put separator text in the gap: a colon between label and value
\\begin{tabular}{r@{ : }l}
  width & 10cm \\\\
  height & 5cm
\\end{tabular}`}</code></pre>
          <p>
            The <code>@{'{}'}</code> trick matters most in a <code>tabularx</code> or in a table
            that should be exactly <code>\textwidth</code>: without it the rules of a booktabs
            table overhang the text block by <code>\tabcolsep</code> on each side.
          </p>

          <h3>Cell padding: struts, cellspace and array</h3>
          <p>
            To add space above or below the content of a single cell, insert an invisible rule (a
            &ldquo;strut&rdquo;): <code>{`\\rule{0pt}{3ex}`}</code> adds height above the baseline,{' '}
            <code>{`\\rule[-1ex]{0pt}{0pt}`}</code> adds depth below it. The <code>cellspace</code>{' '}
            package automates this for whole columns, and the <code>array</code> package&apos;s{' '}
            <code>&gt;{'{...}'}</code> and <code>&lt;{'{...}'}</code> hooks insert code before and
            after every cell in a column, which also works for horizontal padding:
          </p>
          <pre><code>{`% Struts in individual cells
\\begin{tabular}{|c|c|}
  \\hline
  \\rule{0pt}{3ex}Tall header & Second header \\rule[-1.5ex]{0pt}{0pt} \\\\
  \\hline
  a & b \\\\
  \\hline
\\end{tabular}

% cellspace: minimum vertical padding for every cell in an S-prefixed column
\\usepackage{cellspace}
\\setlength{\\cellspacetoplimit}{4pt}
\\setlength{\\cellspacebottomlimit}{4pt}
\\begin{tabular}{|Sc|Sc|}
  \\hline
  $\\frac{a}{b}$ & $\\frac{c}{d}$ \\\\   % fractions no longer touch the lines
  \\hline
\\end{tabular}

% array: extra horizontal padding before and after a column's content
\\usepackage{array}
\\begin{tabular}{>{\\hspace{1em}}c<{\\hspace{1em}} l}
  padded & plain
\\end{tabular}`}</code></pre>

          <h3>A fully spaced table</h3>
          <pre><code>{`\\usepackage{booktabs}

\\begin{table}[htbp]
  \\centering
  \\renewcommand{\\arraystretch}{1.3}
  \\setlength{\\tabcolsep}{12pt}
  \\begin{tabular}{@{}lcc@{}}
    \\toprule
    \\textbf{Item} & \\textbf{Qty} & \\textbf{Price} \\\\
    \\midrule
    Widget A & 10 & \\$5.00 \\\\
    Widget B & 25 & \\$3.50 \\\\
    \\addlinespace
    \\textbf{Total} & 35 & \\$137.50 \\\\
    \\bottomrule
  \\end{tabular}
  \\caption{Row and column spacing applied together}
\\end{table}`}</code></pre>
          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Table looks cramped</td><td><code>{`\\renewcommand{\\arraystretch}{1.3}`}</code> and a larger <code>\tabcolsep</code></td></tr>
              <tr><td>Header touches the rule below it</td><td><code>\\[0.5ex]</code> after the header row, or <code>\addlinespace</code> with booktabs</td></tr>
              <tr><td>Fractions or tall symbols touch <code>\hline</code></td><td>A strut <code>{`\\rule{0pt}{3ex}`}</code>, or the <code>cellspace</code> package</td></tr>
              <tr><td>Rules stick out past the text margin</td><td><code>@{'{}'}</code> at both ends of the column specifier</td></tr>
              <tr><td>Spacing changes leak into later tables</td><td>Set <code>\arraystretch</code> and <code>\tabcolsep</code> inside the <code>table</code> environment or a <code>{'{...}'}</code> group</td></tr>
              <tr><td>Inconsistent gaps between rows</td><td>Use booktabs rules and <code>\addlinespace</code> instead of empty rows</td></tr>
            </tbody>
          </table>

          <h2>Multi-Column Cells</h2>
          <p>
            The <code>\multicolumn</code> command allows a single cell to span multiple columns.
            This is commonly used for group headers or merged cells:
          </p>

          <pre><code>{`\\multicolumn{number_of_columns}{alignment}{text}`}</code></pre>

          <pre><code>{`\\usepackage{booktabs}

\\begin{tabular}{lccc}
  \\toprule
  \\multicolumn{1}{l}{Name} & \\multicolumn{3}{c}{Scores} \\\\
  \\cmidrule(lr){2-4}
                            & Math & Science & English \\\\
  \\midrule
  Alice                     & 95   & 92      & 88     \\\\
  Bob                       & 82   & 90      & 95     \\\\
  Carol                     & 91   & 88      & 84     \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <p>
            The first argument is the number of columns to span, the second is the alignment
            specifier for the merged cell (e.g., <code>c</code>, <code>l</code>, <code>r</code>),
            and the third is the cell content. You can also use <code>\multicolumn&#123;1&#125;</code>
            to override the alignment of a single cell.
          </p>

          <h2>Multi-Row Cells</h2>
          <p>
            The <code>multirow</code> package provides the <code>\multirow</code> command for cells
            that span multiple rows:
          </p>

          <pre><code>{`\\multirow{number_of_rows}{width}{text}`}</code></pre>

          <pre><code>{`\\usepackage{booktabs}
\\usepackage{multirow}

\\begin{tabular}{llc}
  \\toprule
  Category     & Item     & Price \\\\
  \\midrule
  \\multirow{2}{*}{Fruit}
               & Apple    & \\$1.20 \\\\
               & Banana   & \\$0.80 \\\\
  \\midrule
  \\multirow{3}{*}{Vegetable}
               & Carrot   & \\$0.90 \\\\
               & Potato   & \\$1.10 \\\\
               & Onion    & \\$0.70 \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <p>
            The <code>*</code> for the width argument tells LaTeX to use the natural width of the
            text. You can also specify an explicit width like <code>2cm</code> if needed.
          </p>

          <h2>Table Width Control</h2>
          <p>
            By default, LaTeX tables are only as wide as their content requires. To make a table
            span the full text width (or any specific width), use the <code>tabularx</code> package.
          </p>

          <h3>Using tabularx</h3>
          <pre><code>{`\\usepackage{tabularx}

% Syntax: \\begin{tabularx}{width}{column spec}
% The X column type stretches to fill available space

\\begin{tabularx}{\\textwidth}{l X r}
  \\toprule
  Name  & Description                                & Score \\\\
  \\midrule
  Alpha & This column stretches to fill the remaining
          width of the table.                         & 95   \\\\
  Beta  & The X column type distributes space evenly. & 88   \\\\
  \\bottomrule
\\end{tabularx}`}</code></pre>

          <p>
            You can use multiple <code>X</code> columns, and the available space is divided equally
            among them:
          </p>

          <pre><code>{`\\begin{tabularx}{\\textwidth}{l X X}
  \\toprule
  ID & Title          & Description       \\\\
  \\midrule
  1  & First item     & Detailed info     \\\\
  2  & Second item    & More details here \\\\
  \\bottomrule
\\end{tabularx}`}</code></pre>

          <h3>Full-Width Tables in Two-Column Documents</h3>
          <p>
            If your document uses a two-column layout, use the <code>table*</code> environment to
            create a table that spans both columns:
          </p>

          <pre><code>{`\\documentclass[twocolumn]{article}
\\usepackage{booktabs}

\\begin{document}

% This table spans both columns
\\begin{table*}[t]
  \\centering
  \\caption{Results across all experiments.}
  \\begin{tabular}{lcccccc}
    \\toprule
    Method & Exp 1 & Exp 2 & Exp 3 & Exp 4 & Exp 5 & Average \\\\
    \\midrule
    Ours   & 95.2  & 93.1  & 94.8  & 96.0  & 92.7  & 94.4   \\\\
    Base   & 90.1  & 88.5  & 89.3  & 91.2  & 87.6  & 89.3   \\\\
    \\bottomrule
  \\end{tabular}
\\end{table*}

\\end{document}`}</code></pre>

          <h2>Long Tables</h2>
          <p>
            Standard LaTeX tables cannot break across pages. If your table is longer than a single
            page, use the <code>longtable</code> package. It automatically breaks the table across
            pages and can repeat headers and footers on each page.
          </p>

          <pre><code>{`\\usepackage{longtable}
\\usepackage{booktabs}

\\begin{longtable}{lcc}
  % First header (appears on the first page)
  \\caption{Complete list of experimental results.}
  \\label{tab:longresults} \\\\
  \\toprule
  Experiment & Temperature (\\textdegree C) & Yield (\\%) \\\\
  \\midrule
  \\endfirsthead

  % Continuation header (appears on subsequent pages)
  \\multicolumn{3}{c}{\\textit{Continued from previous page}} \\\\
  \\toprule
  Experiment & Temperature (\\textdegree C) & Yield (\\%) \\\\
  \\midrule
  \\endhead

  % Footer on every page except the last
  \\midrule
  \\multicolumn{3}{r}{\\textit{Continued on next page}} \\\\
  \\endfoot

  % Footer on the last page
  \\bottomrule
  \\endlastfoot

  % Table body
  Trial 1  & 100 & 85 \\\\
  Trial 2  & 110 & 87 \\\\
  Trial 3  & 120 & 90 \\\\
  Trial 4  & 130 & 88 \\\\
  Trial 5  & 140 & 91 \\\\
  Trial 6  & 150 & 93 \\\\
  Trial 7  & 160 & 89 \\\\
  Trial 8  & 170 & 86 \\\\
  Trial 9  & 180 & 82 \\\\
  Trial 10 & 190 & 79 \\\\
  % ... more rows as needed
\\end{longtable}`}</code></pre>

          <p>
            The four sectioning commands control what appears where:
          </p>
          <ul>
            <li><code>\endfirsthead</code> &ndash; Marks the end of the header for the first page</li>
            <li><code>\endhead</code> &ndash; Marks the end of the header for continuation pages</li>
            <li><code>\endfoot</code> &ndash; Marks the end of the footer for all pages except the last</li>
            <li><code>\endlastfoot</code> &ndash; Marks the end of the footer for the final page</li>
          </ul>
          <p>
            A <code>longtable</code> is not a float, so it takes no <code>[htbp]</code> argument and
            no surrounding <code>table</code> environment; the caption goes inside, as shown, and
            counts as a normal table in the list of tables. Because the column widths are computed
            across all pages, LaTeX needs two or three compilation runs before the columns stop
            shifting. A table that is only slightly too tall for one page can often be rescued with{' '}
            <code>\small</code> or <code>\footnotesize</code> before the <code>tabular</code>;
            anything longer belongs in a <code>longtable</code>.
          </p>

          <h2>Landscape Tables</h2>
          <p>
            A table with many columns may fit only when rotated. There are two approaches, and they
            differ in whether the page or just the table rotates.
          </p>
          <p>
            The <code>pdflscape</code> package rotates whole pages: everything inside the{' '}
            <code>landscape</code> environment, including headers, footers and page numbers, is
            typeset in landscape, and in a PDF viewer the page itself is displayed rotated. Floats
            inside the environment stay on those pages:
          </p>
          <pre><code>{`\\usepackage{pdflscape}
\\usepackage{booktabs}

\\begin{landscape}
  \\begin{table}
    \\centering
    \\caption{A wide table on a landscape page.}
    \\begin{tabular}{lcccccccc}
      \\toprule
      Run & Jan & Feb & Mar & Apr & May & Jun & Jul & Aug \\\\
      \\midrule
      A   & 1   & 2   & 3   & 4   & 5   & 6   & 7   & 8   \\\\
      B   & 2   & 3   & 4   & 5   & 6   & 7   & 8   & 9   \\\\
      \\bottomrule
    \\end{tabular}
  \\end{table}
\\end{landscape}`}</code></pre>
          <p>
            The <code>rotating</code> package instead rotates only the float. Its{' '}
            <code>sidewaystable</code> environment is a drop-in replacement for{' '}
            <code>table</code> that turns the table and its caption by 90 degrees, always on a page
            of its own, while the page number and running headers stay upright. This is what most
            journals and theses expect for printed output:
          </p>
          <pre><code>{`\\usepackage{rotating}

\\begin{sidewaystable}
  \\centering
  \\caption{The same table, rotated as a float.}
  \\begin{tabular}{lcccccccc}
    ...
  \\end{tabular}
\\end{sidewaystable}`}</code></pre>
          <p>
            Use <code>pdflscape</code> for documents read on screen, where a rotated page is
            convenient, and <code>sidewaystable</code> for print. Do not combine the two for the
            same table.
          </p>

          <h2>Colored Tables</h2>
          <p>
            The <code>xcolor</code> package (with the <code>table</code> option) and the
            <code>colortbl</code> package let you add background colours to rows, columns, and
            individual cells.
          </p>

          <pre><code>{`\\usepackage[table]{xcolor}
% or: \\usepackage{colortbl}

% Define custom colours
\\definecolor{headerblue}{RGB}{0, 102, 204}
\\definecolor{lightgray}{gray}{0.9}
\\definecolor{lightblue}{RGB}{220, 235, 255}`}</code></pre>

          <h3>Row Colours</h3>
          <pre><code>{`\\usepackage[table]{xcolor}
\\usepackage{booktabs}

\\begin{tabular}{lcc}
  \\toprule
  \\rowcolor{headerblue}
  \\textcolor{white}{Name} &
  \\textcolor{white}{Grade} &
  \\textcolor{white}{Score} \\\\
  \\midrule
  \\rowcolor{lightgray}
  Alice & A  & 95 \\\\
  Bob   & B+ & 88 \\\\
  \\rowcolor{lightgray}
  Carol & A- & 91 \\\\
  Dave  & B  & 84 \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <h3>Alternating Row Colours</h3>
          <pre><code>{`\\usepackage[table]{xcolor}

% Automatically alternate row colours
\\rowcolors{2}{lightgray}{white}

\\begin{tabular}{lcc}
  \\toprule
  Name  & Grade & Score \\\\
  \\midrule
  Alice & A     & 95    \\\\
  Bob   & B+    & 88    \\\\
  Carol & A-    & 91    \\\\
  Dave  & B     & 84    \\\\
  Eve   & A+    & 98    \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <h3>Cell Colours</h3>
          <pre><code>{`\\usepackage[table]{xcolor}

\\begin{tabular}{lcc}
  \\toprule
  Name  & Status                          & Score \\\\
  \\midrule
  Alice & \\cellcolor{green!25}Pass        & 95    \\\\
  Bob   & \\cellcolor{red!25}Fail          & 42    \\\\
  Carol & \\cellcolor{green!25}Pass        & 91    \\\\
  Dave  & \\cellcolor{yellow!25}Borderline & 60    \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <h3>Column Colours</h3>
          <pre><code>{`\\usepackage[table]{xcolor}
\\usepackage{array}

% Apply colour to an entire column using the > directive
\\begin{tabular}{l >{\\columncolor{lightblue}}c c}
  \\toprule
  Name  & Highlighted & Normal \\\\
  \\midrule
  Alice & 95          & A      \\\\
  Bob   & 88          & B+     \\\\
  Carol & 91          & A-     \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <h2>Merging Rows and Columns Together</h2>
          <p>
            For complex table layouts, you can combine <code>\multicolumn</code> and
            <code>\multirow</code> in the same table. This is common in academic papers where you
            need hierarchical headers or grouped data.
          </p>

          <pre><code>{`\\usepackage{booktabs}
\\usepackage{multirow}

\\begin{tabular}{llccc}
  \\toprule
  \\multirow{2}{*}{Department} &
  \\multirow{2}{*}{Employee} &
  \\multicolumn{3}{c}{Quarterly Sales (\\$k)} \\\\
  \\cmidrule(lr){3-5}
  & & Q1 & Q2 & Q3 \\\\
  \\midrule
  \\multirow{3}{*}{Engineering}
    & Alice   & 120 & 135 & 142 \\\\
    & Bob     & 98  & 110 & 105 \\\\
    & Carol   & 115 & 128 & 138 \\\\
  \\midrule
  \\multirow{2}{*}{Marketing}
    & Dave    & 200 & 220 & 245 \\\\
    & Eve     & 180 & 195 & 210 \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <p>
            When combining these commands, remember that:
          </p>
          <ul>
            <li>
              <code>\multicolumn</code> takes effect on a single row and merges cells horizontally.
            </li>
            <li>
              <code>\multirow</code> takes effect starting from the current row and merges cells
              vertically.
            </li>
            <li>
              In the rows spanned by <code>\multirow</code>, leave the corresponding cell empty
              (just use <code>&amp;</code> to skip it).
            </li>
          </ul>

          <h2>Decimal Alignment with siunitx</h2>
          <p>
            Numbers in a column should line up on the decimal point, not on their left or right
            edge, so that 3.5 and 12.25 can be compared at a glance. The <code>siunitx</code>{' '}
            package provides the <code>S</code> column type for exactly this. Each cell is parsed
            as a number, aligned on the decimal marker, and the header is centred over the column
            when wrapped in braces:
          </p>
          <pre><code>{`\\usepackage{siunitx}
\\usepackage{booktabs}

\\begin{tabular}{l S[table-format=2.2] S[table-format=1.3]}
  \\toprule
  Sample & {Mass (g)} & {Error} \\\\
  \\midrule
  A      & 3.5        & 0.012   \\\\
  B      & 12.25      & 0.1     \\\\
  C      & 7          & 0.005   \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>
          <p>
            <code>table-format=2.2</code> reserves space for two digits before the decimal point and
            two after; it sets the column width so all entries align. Any cell that is not a
            number, such as the header or a dash, must be wrapped in <code>{'{'}...{'}'}</code>,
            otherwise siunitx tries to parse it and reports <em>Invalid numerical input</em>.{' '}
            <code>S</code> columns also handle units and uncertainties:{' '}
            <code>{`3.5(2)`}</code> prints as 3.5(2), and <code>{`\\qty{3.5}{\\gram}`}</code> in a
            normal column prints a number with its unit and correct spacing.
          </p>

          <h2>Footnotes in Tables</h2>
          <p>
            <code>\footnote</code> inside a <code>tabular</code> produces the mark but loses the
            text, because a tabular is typeset as a box. The usual fix is the{' '}
            <code>threeparttable</code> package, which puts notes directly under the table:
          </p>
          <pre><code>{`\\usepackage{booktabs, threeparttable}

\\begin{table}[htbp]
  \\centering
  \\begin{threeparttable}
    \\caption{Results with table notes.}
    \\begin{tabular}{lr}
      \\toprule
      Method & Score \\\\
      \\midrule
      Ours\\tnote{a} & 94.7 \\\\
      Baseline     & 91.2 \\\\
      \\bottomrule
    \\end{tabular}
    \\begin{tablenotes}
      \\footnotesize
      \\item[a] Averaged over five runs.
    \\end{tablenotes}
  \\end{threeparttable}
\\end{table}`}</code></pre>
          <p>
            Alternatives, including <code>\footnotemark</code> with <code>\footnotetext</code>{' '}
            after the float and the <code>minipage</code> trick, are covered in{' '}
            <Link href="/learn/footnotes">LaTeX Footnotes</Link>.
          </p>

          <h2>Table Captions and Labels</h2>
          <p>
            Captions and labels are essential for numbered tables and cross-references. The
            <code>\caption</code> command generates a numbered caption (e.g., &quot;Table 1:
            ...&quot;), and <code>\label</code> creates a reference anchor.
          </p>

          <h3>Caption Placement</h3>
          <p>
            In most style guides, the caption for a table goes <strong>above</strong> the table
            (unlike figures, where captions typically go below). This is because readers scan a
            caption before reading the table data:
          </p>

          <pre><code>{`\\begin{table}[htbp]
  \\centering
  \\caption{Summary of experimental results.}
  \\label{tab:summary}
  \\begin{tabular}{lcc}
    \\toprule
    Method & Accuracy & F1 Score \\\\
    \\midrule
    Ours   & 94.5     & 93.2     \\\\
    Base   & 89.1     & 87.8     \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}`}</code></pre>

          <h3>Cross-Referencing Tables</h3>
          <p>
            Once you have labelled a table, you can refer to it anywhere in the document:
          </p>

          <pre><code>{`As shown in Table~\\ref{tab:summary}, our method
outperforms the baseline by 5.4 percentage points.

% Use \\pageref for the page number
The full results are in Table~\\ref{tab:summary}
on page~\\pageref{tab:summary}.`}</code></pre>

          <p>
            Always place <code>\label</code> after <code>\caption</code>, not before. If you place
            it before the caption, the reference number may be incorrect.
          </p>

          <h3>Numbering style and cleveref</h3>
          <p>
            Tables are numbered 1, 2, 3 in <code>article</code> and per chapter (2.1, 2.2) in{' '}
            <code>book</code> and <code>report</code>. To number per section in an article, or to
            change the format, adjust the counter in the preamble; and with{' '}
            <code>cleveref</code>, <code>\cref</code> writes the word &ldquo;Table&rdquo; for you:
          </p>
          <pre><code>{`\\counterwithin{table}{section}            % Table 1.1, 1.2, 2.1, ...
\\renewcommand{\\thetable}{\\Roman{table}}   % Table I, II, III

\\usepackage{cleveref}                      % after hyperref, if used
As shown in \\cref{tab:summary} ...         % table 1
\\Cref{tab:summary} shows ...               % Table 1`}</code></pre>
          <p>
            The caption text itself is styled with the <code>caption</code> package:{' '}
            <code>{`\\usepackage[font=small, labelfont=bf]{caption}`}</code> gives a small caption
            with a bold &ldquo;Table 1:&rdquo; label, which is what many journals ask for.
          </p>

          <h2>Useful Packages for Tables</h2>
          <p>
            Here is a summary of the most important packages for LaTeX tables and what each one provides:
          </p>

          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Purpose</th>
                <th>Key Commands</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>booktabs</code></td>
                <td>Professional horizontal rules</td>
                <td><code>\toprule</code>, <code>\midrule</code>, <code>\bottomrule</code>, <code>\cmidrule</code></td>
              </tr>
              <tr>
                <td><code>multirow</code></td>
                <td>Cells spanning multiple rows</td>
                <td><code>\multirow&#123;rows&#125;&#123;width&#125;&#123;text&#125;</code></td>
              </tr>
              <tr>
                <td><code>tabularx</code></td>
                <td>Tables with automatic-width columns</td>
                <td><code>X</code> column type, <code>\begin&#123;tabularx&#125;&#123;width&#125;</code></td>
              </tr>
              <tr>
                <td><code>longtable</code></td>
                <td>Tables spanning multiple pages</td>
                <td><code>\endfirsthead</code>, <code>\endhead</code>, <code>\endfoot</code>, <code>\endlastfoot</code></td>
              </tr>
              <tr>
                <td><code>colortbl</code></td>
                <td>Coloured rows, columns, and cells</td>
                <td><code>\rowcolor</code>, <code>\cellcolor</code>, <code>\columncolor</code></td>
              </tr>
              <tr>
                <td><code>siunitx</code></td>
                <td>Align numbers by decimal point</td>
                <td><code>S</code> column type</td>
              </tr>
              <tr>
                <td><code>array</code></td>
                <td>Extended column specifiers</td>
                <td><code>m&#123;&#125;</code>, <code>b&#123;&#125;</code>, <code>&gt;&#123;&#125;</code>, <code>&lt;&#123;&#125;</code> directives</td>
              </tr>
            </tbody>
          </table>

          <p>
            A typical preamble for a document with professional tables looks like this:
          </p>

          <pre><code>{`\\usepackage{booktabs}
\\usepackage{multirow}
\\usepackage{tabularx}
\\usepackage{longtable}
\\usepackage[table]{xcolor}
\\usepackage{siunitx}
\\usepackage{array}`}</code></pre>

          {/* ── Generator ── */}
          <h2>Generate Tables Automatically</h2>
          <p>
            Most of the work in a LaTeX table is mechanical: one <code>&amp;</code> per column, one{' '}
            <code>\\</code> per row, and a column specifier that matches. A LaTeX table generator
            does that part for you. You paste cells copied from Excel, Google Sheets, Numbers or a
            CSV file and copy the resulting <code>tabular</code> code into your document, which
            removes the most common source of <em>Extra alignment tab</em> and{' '}
            <em>Misplaced \noalign</em> errors. The free Octree Table to LaTeX converter is one
            such tool; the workflow is the same with any of them:
          </p>
          <ol>
            <li>Select the cells in your spreadsheet, including the header row, and copy them.</li>
            <li>Paste into the generator. Tabs become column separators and line breaks become rows.</li>
            <li>Copy the generated code into your document, inside a <code>table</code> float if it needs a caption and label.</li>
            <li>Finish by hand: apply the spacing commands above, switch numeric columns to <code>siunitx</code>, and merge cells with <code>\multicolumn</code> where needed.</li>
          </ol>

          <div className="not-prose my-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Generate tables automatically</h3>
            <p className="text-muted-foreground mb-4">
              Typing <code>&amp;</code> and <code>\\</code> by hand is where most table errors come
              from. Paste your data from Excel, Google Sheets or CSV into the free Table to LaTeX
              converter and get a <code>booktabs</code> table with the right column specifier,
              ready to drop into a <code>table</code> float.
            </p>
            <Link
              href="https://tools.useoctree.com/tools/table-to-latex"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Open the Table to LaTeX converter &rarr;
            </Link>
          </div>

          {/* ── Overleaf ── */}
          <h2 id="tables-in-overleaf">Tables in Overleaf</h2>
          <p>
            A table in Overleaf is the same <code>tabular</code> code as everywhere else, and every
            example on this page compiles there as-is. Overleaf builds projects with TeX Live, which
            already contains <code>booktabs</code>, <code>multirow</code>, <code>tabularx</code>,{' '}
            <code>longtable</code>, <code>xcolor</code> and <code>siunitx</code>, so there is nothing
            to install: add the <code>\usepackage</code> lines to the preamble of{' '}
            <code>main.tex</code> and use the commands.
          </p>

          <h3>Inserting a table</h3>
          <p>
            The Overleaf editor toolbar has an <em>Insert table</em> button that drops an empty
            table skeleton of the size you pick at the cursor. It is quickest for a small table you
            type by hand. For data that already lives in a spreadsheet, the generator in the
            previous section is faster, and in either case you will usually want to swap{' '}
            <code>\hline</code> for the <code>booktabs</code> rules shown above.
          </p>

          <h3>Keeping tables in separate files</h3>
          <p>
            Large projects are easier to manage with each table in its own file. In Overleaf,
            create a <code>tables</code> folder, add <code>results.tex</code> to it, and pull it
            into the float with <code>\input</code>. Paths are relative to the project root, and
            the <code>.tex</code> extension can be left out:
          </p>
          <pre><code>{`% main.tex
\\documentclass{article}
\\usepackage{booktabs}
\\begin{document}

Table~\\ref{tab:results} lists the results.

\\begin{table}[htbp]
  \\centering
  \\caption{Results on the test set.}
  \\label{tab:results}
  \\input{tables/results}
\\end{table}

\\end{document}`}</code></pre>
          <pre><code>{`% tables/results.tex
\\begin{tabular}{lcc}
  \\toprule
  Model    & Accuracy (\\%) & F1   \\\\
  \\midrule
  Baseline & 91.2          & 0.89 \\\\
  Ours     & 95.3          & 0.94 \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>
          <p>
            Keep <code>\caption</code> and <code>\label</code> in <code>main.tex</code> as shown,
            so the table file holds only data and can be regenerated from a script or the table
            generator without touching the surrounding text.
          </p>

          <h3>Common Overleaf table problems</h3>
          <ul>
            <li>
              <strong>Undefined control sequence on <code>\toprule</code> or{' '}
              <code>\multirow</code>.</strong> The package is not loaded. Add{' '}
              <code>{`\\usepackage{booktabs}`}</code> or <code>{`\\usepackage{multirow}`}</code>{' '}
              to the preamble, before <code>{`\\begin{document}`}</code>.
            </li>
            <li>
              <strong>A PDF appears but the table looks wrong.</strong> Overleaf can still produce
              a PDF after an error, so a half-rendered table often hides one. Open the logs, fix
              the first error listed, and recompile; later errors are frequently knock-on effects
              of the first.
            </li>
            <li>
              <strong>The table runs into the margin.</strong> Use <code>tabularx</code> or
              p-columns as described in <em>Table Width Control</em>, or scale the whole table
              with <code>{`\\resizebox{\\linewidth}{!}{...}`}</code> from <code>graphicx</code>{' '}
              as a last resort, since it also scales the font.
            </li>
          </ul>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I make a table in Overleaf?</h3>
          <p>
            Write a <code>tabular</code> environment inside a <code>table</code> float in{' '}
            <code>main.tex</code>, exactly as in any LaTeX document: declare the columns, separate
            cells with <code>&amp;</code> and end rows with <code>\\</code>. Add{' '}
            <code>{`\\usepackage{booktabs}`}</code> to the preamble for <code>\toprule</code>,{' '}
            <code>\midrule</code> and <code>\bottomrule</code>. Overleaf compiles with TeX Live, so
            booktabs, multirow, tabularx, longtable, xcolor and siunitx are already installed; you
            only load them. The editor toolbar also has an <em>Insert table</em> button that drops
            in an empty table skeleton.
          </p>
          <h3>Why does \toprule give &quot;Undefined control sequence&quot; in Overleaf?</h3>
          <p>
            <code>\toprule</code>, <code>\midrule</code> and <code>\bottomrule</code> come from the{' '}
            <code>booktabs</code> package, and <code>\multirow</code> from the{' '}
            <code>multirow</code> package. The error means the package is not loaded: add{' '}
            <code>{`\\usepackage{booktabs}`}</code> (or <code>{`\\usepackage{multirow}`}</code>) to
            the preamble of <code>main.tex</code>, before <code>{`\\begin{document}`}</code>, and
            recompile.
          </p>

          <h2>Common Errors</h2>
          <p>
            Tables produce some of LaTeX&apos;s least helpful messages. These are the ones that
            come up most, with what they actually mean:
          </p>
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
                <td><em>Misplaced \noalign</em></td>
                <td><code>\hline</code>, <code>\midrule</code> or <code>\cline</code> not at the start of a row, usually because the previous row is missing its <code>\\</code></td>
                <td>Add <code>\\</code> to the end of the previous row</td>
              </tr>
              <tr>
                <td><em>Extra alignment tab has been changed to \cr</em></td>
                <td>A row has more <code>&amp;</code> than the column specifier allows</td>
                <td>Count the columns; check for a missing <code>\\</code> that merged two rows, or an unescaped <code>&amp;</code> in text (write <code>\&amp;</code>)</td>
              </tr>
              <tr>
                <td><em>Illegal character in array arg</em></td>
                <td>Something in the column specifier is not a known column type: <code>X</code> without <code>tabularx</code>, <code>S</code> without <code>siunitx</code>, <code>m</code> without <code>array</code>, or a typo</td>
                <td>Load the package that defines the column type, and check for typos in the specifier</td>
              </tr>
              <tr>
                <td><em>Overfull \hbox</em> and the table runs into the margin</td>
                <td>The natural width of the columns exceeds the text width</td>
                <td>Use <code>{`p{}`}</code> or <code>tabularx</code> to wrap text, a smaller font (<code>\small</code> before the tabular), a landscape page, or as a last resort <code>{`\\resizebox{\\textwidth}{!}{...}`}</code> from <code>graphicx</code></td>
              </tr>
              <tr>
                <td><em>Missing \endgroup inserted</em> or <em>Missing {'}'} inserted</em> at <code>{`\\end{tabular}`}</code></td>
                <td>Unbalanced braces in a cell, often from a <code>\multicolumn</code> or <code>\multirow</code> with the wrong number of arguments</td>
                <td>Check that every <code>\multicolumn</code> has three arguments and every <code>\multirow</code> has three</td>
              </tr>
              <tr>
                <td>Footnote number appears, footnote text does not</td>
                <td><code>\footnote</code> inside <code>tabular</code></td>
                <td><code>threeparttable</code>, or <code>\footnotemark</code> + <code>\footnotetext</code> (see above)</td>
              </tr>
              <tr>
                <td>Table appears pages away from its text</td>
                <td>Float placement</td>
                <td><code>[htbp]</code> or <code>[!htb]</code>; <code>\FloatBarrier</code> from <code>placeins</code>; <code>[H]</code> from <code>float</code></td>
              </tr>
              <tr>
                <td><em>Invalid numerical input</em> in an <code>S</code> column</td>
                <td>Text in a siunitx number column</td>
                <td>Wrap non-numeric cells in braces: <code>{`{Header}`}</code></td>
              </tr>
              <tr>
                <td>Wrong table number from <code>\ref</code></td>
                <td><code>\label</code> placed before <code>\caption</code></td>
                <td>Move <code>\label</code> after <code>\caption</code>, then compile twice</td>
              </tr>
              <tr>
                <td><em>Package xcolor Error: Undefined color</em> or <code>\rowcolor</code> undefined</td>
                <td><code>xcolor</code> loaded without the <code>table</code> option, or a color name not defined</td>
                <td><code>{`\\usepackage[table]{xcolor}`}</code>; define custom colors with <code>\definecolor</code></td>
              </tr>
            </tbody>
          </table>

          <h2>Quick Reference</h2>
          <p>
            A handy reference table for column types and common commands:
          </p>

          <table>
            <thead>
              <tr>
                <th>Column Type</th>
                <th>Alignment</th>
                <th>Package</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>l</code></td>
                <td>Left</td>
                <td>Built-in</td>
                <td>Left-aligned, natural width</td>
              </tr>
              <tr>
                <td><code>c</code></td>
                <td>Centre</td>
                <td>Built-in</td>
                <td>Centre-aligned, natural width</td>
              </tr>
              <tr>
                <td><code>r</code></td>
                <td>Right</td>
                <td>Built-in</td>
                <td>Right-aligned, natural width</td>
              </tr>
              <tr>
                <td><code>p&#123;width&#125;</code></td>
                <td>Top</td>
                <td>Built-in</td>
                <td>Paragraph column, top-aligned</td>
              </tr>
              <tr>
                <td><code>m&#123;width&#125;</code></td>
                <td>Middle</td>
                <td><code>array</code></td>
                <td>Paragraph column, vertically centred</td>
              </tr>
              <tr>
                <td><code>b&#123;width&#125;</code></td>
                <td>Bottom</td>
                <td><code>array</code></td>
                <td>Paragraph column, bottom-aligned</td>
              </tr>
              <tr>
                <td><code>X</code></td>
                <td>Justified</td>
                <td><code>tabularx</code></td>
                <td>Stretches to fill available width</td>
              </tr>
              <tr>
                <td><code>S</code></td>
                <td>Decimal</td>
                <td><code>siunitx</code></td>
                <td>Aligns numbers by decimal point</td>
              </tr>
            </tbody>
          </table>

          <p>Common table commands at a glance:</p>

          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Package</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\hline</code></td>
                <td>Built-in</td>
                <td>Full-width horizontal line</td>
              </tr>
              <tr>
                <td><code>\cline&#123;i-j&#125;</code></td>
                <td>Built-in</td>
                <td>Partial horizontal line from column i to j</td>
              </tr>
              <tr>
                <td><code>\toprule</code></td>
                <td><code>booktabs</code></td>
                <td>Thick top rule</td>
              </tr>
              <tr>
                <td><code>\midrule</code></td>
                <td><code>booktabs</code></td>
                <td>Thin middle rule</td>
              </tr>
              <tr>
                <td><code>\bottomrule</code></td>
                <td><code>booktabs</code></td>
                <td>Thick bottom rule</td>
              </tr>
              <tr>
                <td><code>\cmidrule&#123;i-j&#125;</code></td>
                <td><code>booktabs</code></td>
                <td>Partial rule with optional trimming</td>
              </tr>
              <tr>
                <td><code>\multicolumn&#123;n&#125;&#123;align&#125;&#123;text&#125;</code></td>
                <td>Built-in</td>
                <td>Merge n columns into one cell</td>
              </tr>
              <tr>
                <td><code>\multirow&#123;n&#125;&#123;width&#125;&#123;text&#125;</code></td>
                <td><code>multirow</code></td>
                <td>Merge n rows into one cell</td>
              </tr>
              <tr>
                <td><code>\rowcolor&#123;color&#125;</code></td>
                <td><code>colortbl</code> / <code>xcolor</code></td>
                <td>Set background colour for a row</td>
              </tr>
              <tr>
                <td><code>\cellcolor&#123;color&#125;</code></td>
                <td><code>colortbl</code> / <code>xcolor</code></td>
                <td>Set background colour for a cell</td>
              </tr>
              <tr>
                <td><code>\columncolor&#123;color&#125;</code></td>
                <td><code>colortbl</code> / <code>xcolor</code></td>
                <td>Set background colour for a column</td>
              </tr>
            </tbody>
          </table>

          <h2>Next Steps</h2>
          <p>Now that you can create professional tables in LaTeX, explore more topics:</p>
          <ul>
            <li><Link href="/learn/horizontal-lines">Horizontal Lines in LaTeX</Link> &ndash; \hline, \cline and booktabs rules explained, plus rules outside tables</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Add footnotes inside tables with threeparttable and footnotemark</li>
            <li><Link href="/learn/font-size">LaTeX Font Size</Link> &ndash; Shrink a wide table with \small or \footnotesize and size its caption</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; Define the xcolor names used by \rowcolor and \cellcolor</li>
            <li><Link href="/learn/lists">LaTeX Lists</Link> &ndash; Create ordered, unordered, and description lists</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; Control page layout with the geometry package</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
            <li><Link href="/learn/tikz">Learn TikZ</Link> &ndash; Create diagrams and graphics programmatically</li>
            <li><Link href="/learn/pgfplots">Learn PGFPlots</Link> &ndash; Generate publication-quality plots and charts</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <p>
            Building tables by hand can be tedious. Use our free tools to speed up your workflow:
          </p>
          <ul>
            <li><strong><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Table to LaTeX Converter</Link></strong> &ndash; Paste data from Excel, Google Sheets, or CSV and instantly get LaTeX table code with booktabs formatting</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test your LaTeX code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> &ndash; Generate BibTeX citations from DOIs</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and Greek letters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX tables" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree &ndash; the AI-powered LaTeX editor that makes writing faster and easier.
            </p>
            <Link
              href="https://app.useoctree.com"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Try Octree Free &rarr;
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
