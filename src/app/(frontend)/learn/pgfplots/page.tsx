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

const breadcrumbs = getLearnBreadcrumbs('pgfplots in LaTeX', 'pgfplots')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'pgfplots',
  title: 'pgfplots in LaTeX: Plot Data and Functions',
  description: 'pgfplots tutorial: the preamble and compat=1.18, line plots from coordinates and CSV files, function plots, bar charts, legends, and common errors.',
  keywords: 'pgfplots, pgfplots tutorial, pgfplots examples, latex pgfplots, pgfplots csv, pgfplots table, pgfplots bar chart, pgfplots legend, pgfplots axis labels, pgfplots function plot, pgfplots compat, pgfplotsset compat, pgfplots dimension too large, pgfplots multiple plots, pgfplots scatter plot, pgfplots 3d, pgfplots log axis, pgfplots error bars, latex plot, latex graph, latex chart',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I use pgfplots in LaTeX?',
    answer:
      'Put \\usepackage{pgfplots} and \\pgfplotsset{compat=1.18} in the preamble. pgfplots loads TikZ for you. Each plot is an axis environment inside a tikzpicture, and each \\addplot command inside the axis draws one series, from coordinates, a table file or a formula.',
  },
  {
    question: 'What does \\pgfplotsset{compat=1.18} do?',
    answer:
      'It tells pgfplots which version\'s behaviour to use. Without it pgfplots runs in backwards compatibility mode, which places axis labels differently and turns off newer features, and it prints the warning "running in backwards compatibility mode". 1.18 is the current version in TeX Live; use compat=newest only if you accept plots changing when pgfplots is updated.',
  },
  {
    question: 'How do I plot data from a CSV file with pgfplots?',
    answer:
      'Use \\addplot table[x=time, y=temp, col sep=comma] {data.csv}; where time and temp are column names from the header row. Without col sep=comma pgfplots expects whitespace-separated columns. The file path is relative to the main .tex file.',
  },
  {
    question: 'Why does my sine plot look wrong in pgfplots?',
    answer:
      'pgfplots trig functions take degrees, so sin(x) over a domain of 0 to 6 barely moves. Write sin(deg(x)) or add trig format plots=rad to the axis options so that sin(x) uses radians.',
  },
  {
    question: 'How do I fix "Dimension too large" in pgfplots?',
    answer:
      'TeX lengths cannot exceed about 16384pt, and the error usually comes from a \\draw or \\node inside the axis whose coordinates lie far outside the axis limits, or from a formula with a huge spike such as 1/x near zero. Keep annotations within the limits (or use rel axis cs), add restrict y to domain=-10:10 for asymptotes, rescale the data, or switch to a logarithmic axis.',
  },
]

export default async function LearnPgfplotsPage() {
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
          <h1>pgfplots in LaTeX: Plot Data and Functions</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Preamble:</strong> <code>{`\\usepackage{pgfplots}`}</code> and{' '}
                <code>{`\\pgfplotsset{compat=1.18}`}</code>. pgfplots loads TikZ itself.
              </li>
              <li>
                <strong>A plot</strong> is an <code>axis</code> inside a <code>tikzpicture</code>;
                each <code>\addplot</code> draws one series.
              </li>
              <li>
                <strong>Data:</strong> <code>{`\\addplot coordinates {(0,0) (1,1)};`}</code> or{' '}
                <code>{`\\addplot table[col sep=comma] {data.csv};`}</code>.{' '}
                <strong>Function:</strong> <code>{`\\addplot[domain=-2:2] {x^2};`}</code>
              </li>
              <li>
                <strong>Trig functions use degrees:</strong> write <code>sin(deg(x))</code> or set{' '}
                <code>trig format plots=rad</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}

\\begin{document}
\\begin{tikzpicture}
  \\begin{axis}[xlabel={$x$}, ylabel={$y$}]
    \\addplot coordinates {(0,0) (1,1) (2,4) (3,9)};
  \\end{axis}
\\end{tikzpicture}
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            pgfplots is the LaTeX package for plots: line plots, scatter plots, bar charts,
            function graphs and 3D surfaces, drawn in the same fonts as your document and stored
            as code next to the text. This guide starts from a complete document, then covers
            plotting coordinates, reading a CSV or table file, plotting a formula, bar charts,
            legends and axis labels, and the errors (the compat warning, &ldquo;Dimension too
            large&rdquo;, &ldquo;Environment axis undefined&rdquo;) everyone runs into. Every
            snippet compiles with a current TeX Live.
          </p>

          <h2>What is pgfplots?</h2>
          <p>
            pgfplots is built on top of <Link href="/learn/tikz">TikZ</Link>. TikZ draws shapes
            from coordinates you give it; pgfplots adds axes, ticks, scaling, legends and data
            input, so you describe <em>what</em> to plot and it works out where everything goes.
            Because the plot is typeset by LaTeX, axis labels can contain math such as{' '}
            <code>$\sigma^2$</code>, the font matches the body text, and the output is vector
            graphics that stays sharp at any zoom. Journals and theses use it for exactly that
            reason.
          </p>

          <h2>Your First Plot: A Complete Document</h2>
          <p>
            Every pgfplots figure has the same three layers: a <code>tikzpicture</code>, an{' '}
            <code>axis</code> with options in square brackets, and one or more{' '}
            <code>\addplot</code> commands, each ending in a semicolon.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}  % always set this; see Common Errors

\\begin{document}

\\begin{figure}[htbp]
  \\centering
  \\begin{tikzpicture}
    \\begin{axis}[
        title={Simple Function Plot},
        xlabel={$x$},
        ylabel={$y$},
    ]
      \\addplot[blue, thick, domain=-2:2, samples=100] {x^2};
    \\end{axis}
  \\end{tikzpicture}
  \\caption{The parabola $y = x^2$.}
  \\label{fig:parabola}
\\end{figure}

\\end{document}`}</code></pre>
          <p>
            Wrapping the <code>tikzpicture</code> in a <code>figure</code> gives it a caption and
            a number you can <code>\ref</code>, exactly like an image.
          </p>

          <h2>Line Plot from Coordinates</h2>
          <p>
            For a handful of points, type them straight into the document with{' '}
            <code>\addplot coordinates</code>. Each <code>\addplot</code> is one series;{' '}
            <code>\addlegendentry</code> right after it names that series in the legend.
          </p>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      xlabel={Epoch},
      ylabel={Loss},
      legend pos=north east,
      grid=major,
  ]
    \\addplot[blue, mark=*] coordinates {
      (1, 0.92) (2, 0.61) (3, 0.45) (4, 0.38) (5, 0.34)
    };
    \\addlegendentry{Training}

    \\addplot[red, dashed, mark=square*] coordinates {
      (1, 0.95) (2, 0.70) (3, 0.58) (4, 0.55) (5, 0.54)
    };
    \\addlegendentry{Validation}
  \\end{axis}
\\end{tikzpicture}`}</code></pre>
          <p>
            Write <code>\addplot</code> with options in brackets to set the style completely, as
            above. Write <code>\addplot+[...]</code> to keep the automatic colour and marker from
            the cycle list and only add to it, and <code>\addplot</code> with no options to use the
            cycle list as is. Add <code>only marks</code> to the options for a scatter plot, or{' '}
            <code>no marks</code> for a clean line.
          </p>

          <h2>Plot from a CSV or Table File</h2>
          <p>
            For real data, keep the numbers in a file and let pgfplots read it. Columns are named
            by the header row, so you pick them with <code>x=</code> and <code>y=</code>. Use{' '}
            <code>col sep=comma</code> for CSV; without it pgfplots expects columns separated by
            spaces or tabs.
          </p>
          <pre><code>{`% data.csv, in the same folder as main.tex:
% time,temp,pressure
% 0,20.1,101.3
% 1,22.4,101.1
% 2,25.0,100.8
% 3,27.3,100.6
% 4,29.9,100.2

\\begin{tikzpicture}
  \\begin{axis}[xlabel={Time (min)}, ylabel={Temperature ($^\\circ$C)}]
    \\addplot table[x=time, y=temp, col sep=comma] {data.csv};
  \\end{axis}
\\end{tikzpicture}`}</code></pre>
          <p>
            To keep a self-contained example in one file, write the CSV from the preamble with{' '}
            <code>filecontents*</code>, which is built into LaTeX:
          </p>
          <pre><code>{`\\begin{filecontents*}[overwrite]{data.csv}
time,temp,pressure
0,20.1,101.3
1,22.4,101.1
2,25.0,100.8
3,27.3,100.6
4,29.9,100.2
\\end{filecontents*}`}</code></pre>
          <p>
            When several plots use the same file, read it once into a macro with{' '}
            <code>\pgfplotstableread</code>. To plot a computed column, use{' '}
            <code>y expr</code> with <code>\thisrow</code> on the file itself:
          </p>
          <pre><code>{`\\pgfplotstableread[col sep=comma]{data.csv}\\mydata

\\begin{tikzpicture}
  \\begin{axis}[legend pos=outer north east]
    \\addplot table[x=time, y=temp] {\\mydata};
    \\addplot table[x=time, y=pressure] {\\mydata};
    \\legend{Temperature, Pressure}
  \\end{axis}
\\end{tikzpicture}

% A computed column (Celsius to Fahrenheit), inside an axis:
\\addplot table[x=time, y expr=\\thisrow{temp}*9/5+32, col sep=comma] {data.csv};`}</code></pre>
          <p>
            Short tables can also live inline. Give <code>row sep=\\</code> so each row ends with{' '}
            <code>\\</code>:
          </p>
          <pre><code>{`\\addplot table[row sep=\\\\] {
  x  y  \\\\
  0  1  \\\\
  1  3  \\\\
  2  2  \\\\
  3  5  \\\\
};`}</code></pre>
          <p>
            Data in a spreadsheet? The{' '}
            <Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX converter</Link>{' '}
            turns it into rows you can paste, or export the sheet as CSV and read it as above.
          </p>

          <h2>Plot a Function</h2>
          <p>
            Put a formula in braces instead of coordinates. <code>domain</code> sets the x range
            and <code>samples</code> the number of points; raise it for curves with tight bends.
            pgfplots understands <code>+ - * / ^</code>, <code>sqrt</code>, <code>exp</code>,{' '}
            <code>ln</code>, <code>abs</code>, <code>pi</code> and the trig functions.
          </p>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      axis lines=middle,
      xlabel={$x$}, ylabel={$y$},
      domain=-2*pi:2*pi, samples=200,
      trig format plots=rad,   % sin(x) in radians
      legend pos=outer north east,
  ]
    \\addplot[blue, thick] {sin(x)};
    \\addplot[red, thick] {cos(x)};
    \\addplot[green!50!black, thick, domain=-2:2] {x^3 - x};
    \\legend{$\\sin x$, $\\cos x$, $x^3 - x$}
  \\end{axis}
\\end{tikzpicture}`}</code></pre>
          <p>
            Trig functions take <strong>degrees</strong> by default, which is the most common
            surprise in pgfplots. Either set <code>trig format plots=rad</code> as above or
            convert in the formula: <code>{`\\addplot {sin(deg(x))};`}</code>. Parametric curves
            take a pair of formulas in parentheses:
          </p>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[axis equal, trig format plots=rad]
    \\addplot[domain=0:2*pi, samples=100, variable=t] ({cos(t)}, {sin(t)});
  \\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Bar Chart</h2>
          <p>
            Add <code>ybar</code> to the axis for vertical bars or <code>xbar</code> for
            horizontal ones. <code>symbolic x coords</code> lets you use category names as x
            values, <code>xtick=data</code> puts one tick under each bar, and{' '}
            <code>nodes near coords</code> prints the value on top. Two <code>\addplot</code>{' '}
            commands give a grouped bar chart.
          </p>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      ybar,
      bar width=18pt,
      ymin=0,
      enlarge x limits=0.2,
      symbolic x coords={Q1, Q2, Q3, Q4},
      xtick=data,
      nodes near coords,
      ylabel={Revenue (\\$k)},
      legend style={at={(0.5,-0.15)}, anchor=north, legend columns=-1},
  ]
    \\addplot coordinates {(Q1, 45) (Q2, 62) (Q3, 78) (Q4, 91)};
    \\addplot coordinates {(Q1, 38) (Q2, 55) (Q3, 60) (Q4, 84)};
    \\legend{2026, 2025}
  \\end{axis}
\\end{tikzpicture}`}</code></pre>
          <p>
            <code>ymin=0</code> makes the bars start at zero rather than at the smallest value,
            and <code>enlarge x limits</code> stops the outer bars from touching the frame. For
            horizontal bars swap the roles of the axes:
          </p>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      xbar,
      xmin=0,
      symbolic y coords={Python, C++, Rust},
      ytick=data,
      nodes near coords,
      xlabel={Runtime (s)},
  ]
    \\addplot coordinates {(12.4,Python) (1.8,C++) (1.6,Rust)};
  \\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Legends, Axis Labels and Titles</h2>
          <p>
            Labels, limits, ticks and the legend are all axis options. Name each series with{' '}
            <code>\addlegendentry</code> after its <code>\addplot</code>, or list every name at
            once with <code>\legend</code>.
          </p>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      title={Damped oscillation},
      xlabel={Time $t$ (s)},
      ylabel={Displacement $x(t)$ (cm)},
      xmin=0, xmax=10,
      ymin=-1.2, ymax=1.2,
      xtick={0,2,...,10},
      grid=both,
      legend pos=north east,
      legend cell align=left,
      width=0.9\\textwidth, height=6cm,
  ]
    \\addplot[blue, thick, domain=0:10, samples=200] {exp(-0.3*x)*cos(deg(2*x))};
    \\addlegendentry{$e^{-0.3t}\\cos 2t$}
    \\addplot[gray, dashed, domain=0:10] {exp(-0.3*x)};
    \\addlegendentry{envelope}
  \\end{axis}
\\end{tikzpicture}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>What it does</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>title</code>, <code>xlabel</code>, <code>ylabel</code></td><td>Plot title and axis labels; math allowed</td></tr>
                <tr><td><code>xmin</code>, <code>xmax</code>, <code>ymin</code>, <code>ymax</code></td><td>Axis limits</td></tr>
                <tr><td><code>{`xtick={0,2,...,10}`}</code></td><td>Tick positions; <code>xticklabels</code> sets their text</td></tr>
                <tr><td><code>legend pos</code></td><td><code>north east</code>, <code>north west</code>, <code>south east</code>, <code>south west</code>, <code>outer north east</code></td></tr>
                <tr><td><code>{`legend style={at={(0.5,-0.15)}, anchor=north}`}</code></td><td>Legend anywhere, here centred below the plot</td></tr>
                <tr><td><code>legend columns=-1</code></td><td>Legend in one row</td></tr>
                <tr><td><code>axis lines=middle</code></td><td>Axes through the origin instead of a box (<code>left</code> for an open L-shape)</td></tr>
                <tr><td><code>grid=major</code> / <code>both</code></td><td>Grid lines at major (and minor) ticks</td></tr>
                <tr><td><code>width</code>, <code>height</code></td><td>Size of the whole plot, e.g. <code>width=0.9\textwidth</code></td></tr>
                <tr><td><code>domain=a:b</code>, <code>samples=n</code></td><td>x range and resolution for function plots</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Scatter Plots</h2>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      title={Data Points},
      xlabel={Time (s)},
      ylabel={Value},
      only marks,
  ]
    \\addplot coordinates {
      (0, 0.5) (1, 2.1) (2, 3.8) (3, 6.2) (4, 7.9) (5, 10.1)
    };
  \\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Error Bars</h2>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      title={Measurement with Errors},
      xlabel={Sample},
      ylabel={Value},
  ]
    \\addplot+[
        only marks,
        error bars/.cd,
        y dir=both,
        y explicit,
    ] coordinates {
        (1, 2.5) +- (0, 0.3)
        (2, 3.1) +- (0, 0.4)
        (3, 4.2) +- (0, 0.2)
        (4, 3.8) +- (0, 0.5)
    };
  \\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Logarithmic Axes</h2>
          <p>
            Replace <code>axis</code> with <code>semilogyaxis</code>, <code>semilogxaxis</code> or{' '}
            <code>loglogaxis</code>. A log axis is also the cure for data spanning many orders of
            magnitude.
          </p>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{semilogyaxis}[xlabel={$n$}, ylabel={$2^n$}, grid=major]
    \\addplot[blue, thick, domain=0:60, samples=61] {2^x};
  \\end{semilogyaxis}
\\end{tikzpicture}`}</code></pre>

          <h2>3D Plots</h2>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      title={3D Surface},
      view={60}{30},
      colormap/viridis,
  ]
    \\addplot3[
        surf,
        domain=-2:2,
        domain y=-2:2,
        samples=30,
    ] {exp(-x^2-y^2)};
  \\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Customizing Appearance</h2>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      title style={font=\\bfseries\\large},
      xlabel style={font=\\itshape},
      ylabel style={font=\\itshape},
      tick label style={font=\\small},
      legend style={font=\\footnotesize},
      grid=both,
      grid style={line width=.1pt, draw=gray!20},
      major grid style={line width=.2pt, draw=gray!50},
      width=10cm,
      height=7cm,
  ]
    \\addplot[blue, thick] {x^2};
  \\end{axis}
\\end{tikzpicture}`}</code></pre>
          <p>
            To give every plot in the document the same look, put the shared options in the
            preamble with <code>{`\\pgfplotsset{every axis/.append style={...}}`}</code>, and
            colours from <Link href="/learn/colors">xcolor</Link> work in any plot style.
          </p>

          <h2>Common Errors and Fixes</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Cause</th>
                  <th>Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><em>Package pgfplots Warning: running in backwards compatibility mode</em></td>
                  <td>No <code>compat</code> setting in the preamble</td>
                  <td>Add <code>{`\\pgfplotsset{compat=1.18}`}</code> after <code>{`\\usepackage{pgfplots}`}</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Environment axis undefined</em></td>
                  <td>Only <code>tikz</code> is loaded, not <code>pgfplots</code></td>
                  <td>Load <code>{`\\usepackage{pgfplots}`}</code>; it loads TikZ too</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>\pgfplotsset</code></td>
                  <td><code>\pgfplotsset</code> comes before <code>{`\\usepackage{pgfplots}`}</code>, or the package is missing</td>
                  <td>Load the package first, then set <code>compat</code></td>
                </tr>
                <tr>
                  <td><em>Dimension too large</em></td>
                  <td>A <code>\draw</code> or <code>\node</code> far outside the axis limits, or a huge spike such as <code>1/x</code> at 0</td>
                  <td>Keep annotations inside the limits, add <code>restrict y to domain</code>, rescale, or use a log axis</td>
                </tr>
                <tr>
                  <td><em>I do not know the key &apos;/tikz/legend pos&apos;</em></td>
                  <td>An axis option given to <code>tikzpicture</code> instead of the axis, or a misspelled key such as <code>legend position</code></td>
                  <td>Move it to the options of <code>{`\\begin{axis}[...]`}</code></td>
                </tr>
                <tr>
                  <td><em>Could not read table file &apos;data.csv&apos;</em></td>
                  <td>Wrong path, or the file was not uploaded with the project</td>
                  <td>Path is relative to the main <code>.tex</code> file; check the name and folder</td>
                </tr>
                <tr>
                  <td>Sine or cosine curve is almost flat</td>
                  <td>Trig functions take degrees</td>
                  <td><code>sin(deg(x))</code> or <code>trig format plots=rad</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The compat warning in full reads: <em>running in backwards compatibility mode
            (unsuitable tick labels; missing features). Consider writing
            \pgfplotsset&#123;compat=1.18&#125; into your preamble.</em> Older answers online
            suggest <code>compat=newest</code>; that works but lets a pgfplots update change your
            figures silently, so a fixed version is safer for a paper or thesis.
          </p>
          <p>
            For an asymptote, cut the spikes off rather than plotting them, and let pgfplots
            break the line where values are dropped:
          </p>
          <pre><code>{`\\begin{tikzpicture}
  \\begin{axis}[
      domain=-3:3, samples=201,
      restrict y to domain=-10:10,
      unbounded coords=jump,
  ]
    \\addplot {1/x};
  \\end{axis}
\\end{tikzpicture}`}</code></pre>

          <h2>Frequently Asked Questions</h2>
          <h3>How do I use pgfplots in LaTeX?</h3>
          <p>
            Put <code>{`\\usepackage{pgfplots}`}</code> and <code>{`\\pgfplotsset{compat=1.18}`}</code>{' '}
            in the preamble. pgfplots loads TikZ for you. Each plot is an <code>axis</code>{' '}
            environment inside a <code>tikzpicture</code>, and each <code>\addplot</code> command
            inside the axis draws one series, from coordinates, a table file or a formula.
          </p>
          <h3>What does \pgfplotsset&#123;compat=1.18&#125; do?</h3>
          <p>
            It tells pgfplots which version&apos;s behaviour to use. Without it pgfplots runs in
            backwards compatibility mode, which places axis labels differently and turns off
            newer features, and it prints the warning &ldquo;running in backwards compatibility
            mode&rdquo;. 1.18 is the current version in TeX Live; use <code>compat=newest</code>{' '}
            only if you accept plots changing when pgfplots is updated.
          </p>
          <h3>How do I plot data from a CSV file with pgfplots?</h3>
          <p>
            Use <code>{`\\addplot table[x=time, y=temp, col sep=comma] {data.csv};`}</code> where{' '}
            <code>time</code> and <code>temp</code> are column names from the header row. Without{' '}
            <code>col sep=comma</code> pgfplots expects whitespace-separated columns. The file
            path is relative to the main <code>.tex</code> file.
          </p>
          <h3>Why does my sine plot look wrong in pgfplots?</h3>
          <p>
            pgfplots trig functions take degrees, so <code>sin(x)</code> over a domain of 0 to 6
            barely moves. Write <code>sin(deg(x))</code> or add <code>trig format plots=rad</code>{' '}
            to the axis options so that <code>sin(x)</code> uses radians.
          </p>
          <h3>How do I fix &ldquo;Dimension too large&rdquo; in pgfplots?</h3>
          <p>
            TeX lengths cannot exceed about 16384pt, and the error usually comes from a{' '}
            <code>\draw</code> or <code>\node</code> inside the axis whose coordinates lie far
            outside the axis limits, or from a formula with a huge spike such as <code>1/x</code>{' '}
            near zero. Keep annotations within the limits (or use <code>rel axis cs</code>), add{' '}
            <code>restrict y to domain=-10:10</code> for asymptotes, rescale the data, or switch
            to a logarithmic axis.
          </p>

          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/tikz">TikZ in LaTeX</Link> &ndash; Diagrams, arrows and annotations on top of your plots</li>
            <li><Link href="/learn/colors">Colors in LaTeX</Link> &ndash; Define and mix colours for plot styles</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; Show the same data as a booktabs table</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Math in axis labels and legends</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; Figures, captions and the basics</li>
          </ul>

          <h2>Free pgfplots Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/pgfplots-generator" target="_blank" rel="noopener noreferrer">pgfplots Generator</Link> &ndash; Describe a chart and get the pgfplots code</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> &ndash; Convert data tables for your plots</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test your plots with live preview</li>
          </ul>

          <RelatedPosts searchTerm="PGFPlots" title="Related pgfplots Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Generate plots with AI</h3>
            <p className="text-muted-foreground mb-4">
              Describe your data visualization and let Octree&apos;s AI write the pgfplots code,
              compile it and fix the errors for you.
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
