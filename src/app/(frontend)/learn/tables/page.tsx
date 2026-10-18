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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Tables', 'tables')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function TablesPage() {
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
            &larr; Back to Learn
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1>LaTeX Tables</h1>
          <p className="lead">
            Tables are essential for presenting structured data in academic papers, reports, and
            presentations. LaTeX provides a powerful set of tools for creating everything from simple
            data grids to complex, publication-quality tables with merged cells, colour, and
            multi-page support. This guide covers every technique you need.
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
\\begin{tabular}{l >{\columncolor{lightblue}}c c}
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
  return {
    title: 'LaTeX Tables \u2013 Complete Guide 2026',
    description: 'Learn how to create tables in LaTeX. Guide covers tabular, booktabs, multicolumn, multirow, longtable, colored tables, and professional formatting techniques.',
    keywords: 'latex table, latex tabular, latex booktabs, latex multicolumn, latex multirow, latex table generator, latex longtable, latex table of contents, latex hline, latex table width, create table in latex, latex table example, latex table formatting, latex colored table',
    openGraph: mergeOpenGraph({
      title: 'LaTeX Tables \u2013 Complete Guide 2026',
      description: 'Complete guide to creating professional tables in LaTeX.',
      type: 'article',
      url: '/learn/tables',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'LaTeX Tables \u2013 Complete Guide',
      description: 'Learn to create professional tables in LaTeX with booktabs and more.',
    },
    alternates: {
      canonical: '/learn/tables',
    },
  }
}
