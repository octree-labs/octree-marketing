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

const breadcrumbs = getLearnBreadcrumbs('TikZ in LaTeX', 'tikz')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'tikz',
  title: 'TikZ in LaTeX: Draw Diagrams, Shapes and Number Lines',
  seoTitle: 'TikZ in LaTeX: Diagrams, Shapes and Number Lines',
  description: 'How to draw in LaTeX with TikZ: rectangles, circles, lines, a number line with ticks, nodes and arrows, flowcharts, \\tikzset vs \\tikzstyle and errors.',
  keywords: 'tikz, tikz latex, latex tikz, how to draw in latex, draw in latex, diagrams in latex, latex diagrams, rectangle latex, latex rectangle, tikz rectangle, tikz circle, tikz line, number line latex, latex number line, tikz number line, tikzstyle latex, tikzstyle, tikzset, tikz style, tikz nodes, tikz arrows, arrows.meta, tikz positioning, tikz libraries, tikz flowchart, tikz tree, tikz tutorial, tikz examples, learn tikz, latex graphics',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I draw in LaTeX?',
    answer:
      'Load TikZ with \\usepackage{tikz} and put drawing commands inside a tikzpicture environment. \\draw (0,0) -- (2,1); draws a line, \\draw (0,0) rectangle (3,2); a rectangle and \\draw (0,0) circle (1); a circle. Coordinates are in centimetres by default, and every command ends with a semicolon.',
  },
  {
    question: 'How do I draw a rectangle in LaTeX?',
    answer:
      'With TikZ, give two opposite corners: \\draw (0,0) rectangle (3,2); draws a 3 cm by 2 cm rectangle. Add options for style, such as \\draw[fill=blue!20, thick] or rounded corners. For a rectangle around text, use a node: \\node[draw, minimum width=3cm, minimum height=1cm] {Text};. Outside TikZ, \\fbox{text} draws a box around text and \\rule{3cm}{2cm} a filled black rectangle.',
  },
  {
    question: 'How do I draw a number line in LaTeX?',
    answer:
      'Draw the axis with \\draw[<->] (-5,0) -- (5,0); then add ticks and labels in a loop: \\foreach \\x in {-5,...,5} \\draw (\\x,0.15) -- (\\x,-0.15) node[below] {$\\x$};. Mark points with \\fill (2,0) circle (3pt); for a closed dot or \\draw[fill=white] for an open one.',
  },
  {
    question: 'What is the difference between \\tikzstyle and \\tikzset?',
    answer:
      'Both define a reusable style. \\tikzstyle{box}=[draw, fill=blue!10] is the old syntax and is deprecated in the TikZ manual; it still works but cannot take parameters cleanly. The current form is \\tikzset{box/.style={draw, fill=blue!10}}, or box/.style={...} in the options of one tikzpicture to keep the style local.',
  },
  {
    question: 'Which TikZ libraries do I need?',
    answer:
      'For most diagrams: positioning (below=of a placement), arrows.meta (Stealth and Latex arrow tips) and shapes.geometric (diamond, ellipse, regular polygon). Add calc for coordinate arithmetic, decorations.pathreplacing for braces, and matrix for grids of nodes. Load them in the preamble with \\usetikzlibrary{positioning, arrows.meta, shapes.geometric}.',
  },
  {
    question: 'Why does TikZ say "Giving up on this path. Did you forget a semicolon?"',
    answer:
      'Every TikZ path command (\\draw, \\fill, \\node, \\path, \\coordinate) must end with a semicolon. Without it, TikZ keeps reading into the next command or the end of the picture and stops with this error. Add the missing ; at the end of the line the error points to.',
  },
]

export default async function LearnTikzPage() {
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
          <h1>TikZ in LaTeX: Draw Diagrams, Shapes and Number Lines</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Load:</strong> <code>{`\\usepackage{tikz}`}</code>, then draw inside{' '}
                <code>{`\\begin{tikzpicture} ... \\end{tikzpicture}`}</code>.
              </li>
              <li>
                <strong>Line, rectangle, circle:</strong> <code>{`\\draw (0,0) -- (2,1);`}</code>,{' '}
                <code>{`\\draw (0,0) rectangle (3,2);`}</code>, <code>{`\\draw (0,0) circle (1);`}</code>.
              </li>
              <li>
                <strong>Text and arrows:</strong> <code>{`\\node[draw] (a) {Text};`}</code> then{' '}
                <code>{`\\draw[->] (a) -- (b);`}</code>.
              </li>
              <li>
                <strong>Styles:</strong> <code>{`\\tikzset{box/.style={draw, fill=blue!10}}`}</code>{' '}
                (<code>\tikzstyle</code> is deprecated). Every command ends with <code>;</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{tikz}

\\begin{document}

\\begin{tikzpicture}
  \\draw (0,0) rectangle (3,2);                 % rectangle from corner to corner
  \\draw[blue, thick] (4.5,1) circle (1);       % circle: center and radius
  \\draw[->, red] (0,-0.5) -- (5.5,-0.5);      % line with an arrow
  \\node at (1.5,1) {Hello, TikZ};             % text placed at a point
\\end{tikzpicture}

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            TikZ is how you draw in LaTeX. Diagrams, shapes, number lines, flowcharts and trees
            are written as code inside your document, so they use the same fonts as the text,
            scale without blurring and live under version control with everything else. This
            guide starts from a complete picture and covers rectangles, circles and lines, a full
            number line, nodes and arrows, flowcharts and trees, styles with{' '}
            <code>\tikzset</code> (and why <code>\tikzstyle</code> is deprecated), the libraries
            worth loading, and the errors TikZ throws most. Every snippet compiles as shown.
          </p>

          {/* ── What is TikZ ── */}
          <h2>What is TikZ?</h2>
          <p>
            TikZ (pronounced &quot;teeks&quot;) stands for &quot;TikZ ist kein Zeichenprogramm&quot;
            (German for &quot;TikZ is not a drawing program&quot;). It is a LaTeX package, built on
            the PGF graphics layer, that turns short commands into vector graphics. It ships with
            every TeX distribution and works with pdfLaTeX, XeLaTeX and LuaLaTeX alike.
          </p>
          <ul>
            <li><strong>Vector graphics</strong> &ndash; Crisp at any zoom level and in print.</li>
            <li><strong>Consistent styling</strong> &ndash; Labels use the document&apos;s fonts and math.</li>
            <li><strong>Programmable</strong> &ndash; Loops and calculations generate repetitive drawings.</li>
            <li><strong>Reproducible</strong> &ndash; A diagram is text, so it diffs, merges and reviews like code.</li>
          </ul>

          {/* ── How to draw ── */}
          <h2>How to Draw in LaTeX: the tikzpicture Environment</h2>
          <p>
            Everything TikZ draws goes inside a <code>tikzpicture</code>. A drawing is a list of{' '}
            <em>paths</em>: a command such as <code>\draw</code>, optional settings in square
            brackets, then coordinates joined by operations, and a closing semicolon.
            Coordinates are <code>(x,y)</code> in centimetres by default; <code>--</code> joins
            two points with a straight line and <code>cycle</code> closes the shape:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\begin{document}

\\begin{tikzpicture}
  \\draw[help lines, step=0.5] (0,0) grid (4,3);   % a light grid to see coordinates
  \\draw (0,0) -- (4,0) -- (2,3) -- cycle;         % a triangle
  \\fill[red] (2,3) circle (2pt);                  % a dot at the top corner
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            The path commands differ only in what they do with the path:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>What it does</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\draw</code></td><td>Strokes the path (draws its outline)</td></tr>
                <tr><td><code>\fill</code></td><td>Fills the path, no outline</td></tr>
                <tr><td><code>\filldraw</code></td><td>Fills and strokes</td></tr>
                <tr><td><code>\node</code></td><td>Places text, optionally in a shape</td></tr>
                <tr><td><code>\coordinate</code></td><td>Names a point for later use</td></tr>
                <tr><td><code>\path</code></td><td>Builds a path without drawing it (for nodes and coordinates)</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            To scale a whole picture, pass <code>scale=0.8</code> to the environment; to put a
            drawing next to the text, use <code>\tikz</code> inline, as in{' '}
            <code>{`\\tikz \\draw (0,0) circle (1ex);`}</code>. A picture inside a{' '}
            <code>figure</code> float gets a caption and number like any image.
          </p>

          {/* ── Shapes ── */}
          <h2>Draw a Rectangle, Circle and Line</h2>
          <p>
            A rectangle is given by two opposite corners. <code>++</code> makes the second
            coordinate relative to the first, which is the easiest way to say &ldquo;2 cm wide,
            1 cm high&rdquo;:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\begin{document}

\\begin{tikzpicture}
  % Rectangle from corner (0,0) to corner (3,2)
  \\draw (0,0) rectangle (3,2);

  % Filled rectangle, size given relative to its corner
  \\draw[draw=blue, fill=blue!20, thick] (4,0) rectangle ++(2,1);

  % Rounded corners and a dashed outline
  \\draw[rounded corners=6pt, dashed] (7,0) rectangle (9,2);

  % A rectangle around text: a node with a minimum size
  \\node[draw, minimum width=3cm, minimum height=1cm] at (1.5,-1.5) {Text in a box};
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            Circles, ellipses and arcs follow the same pattern, and lines take arrow tips and
            dash patterns as options:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\begin{document}

\\begin{tikzpicture}
  \\draw (0,0) circle (1);                       % circle, radius 1 cm
  \\draw[fill=orange!30] (3,0) circle [radius=0.6];   % current key syntax, same result
  \\draw (6,0) ellipse (1.2 and 0.6);             % x radius and y radius
  \\draw (9,-0.5) arc (0:180:1);                  % start angle : end angle : radius

  \\draw (0,-2) -- (3,-2);                        % straight line
  \\draw[->, thick] (4,-2) -- (6,-1.5);           % arrow
  \\draw[<->, dashed, red] (7,-2) -- (9.5,-2);    % double arrow, dashed
  \\draw[line width=2pt, dotted] (0,-3) -- (9.5,-3);
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Shape</th>
                  <th>Syntax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Line</td><td><code>{`\\draw (0,0) -- (3,1);`}</code></td></tr>
                <tr><td>Polyline / polygon</td><td><code>{`\\draw (0,0) -- (2,0) -- (1,2) -- cycle;`}</code></td></tr>
                <tr><td>Rectangle</td><td><code>{`\\draw (0,0) rectangle (3,2);`}</code></td></tr>
                <tr><td>Square of side 2</td><td><code>{`\\draw (0,0) rectangle ++(2,2);`}</code></td></tr>
                <tr><td>Circle</td><td><code>{`\\draw (0,0) circle [radius=1];`}</code> (or the older, still valid <code>{`circle (1)`}</code>)</td></tr>
                <tr><td>Ellipse</td><td><code>{`\\draw (0,0) ellipse (2 and 1);`}</code></td></tr>
                <tr><td>Arc</td><td><code>{`\\draw (1,0) arc (0:90:1);`}</code></td></tr>
                <tr><td>Grid</td><td><code>{`\\draw[step=1] (0,0) grid (4,3);`}</code></td></tr>
                <tr><td>Curve</td><td><code>{`\\draw (0,0) .. controls (1,2) and (2,2) .. (3,0);`}</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Without TikZ, <code>{`\\fbox{text}`}</code> draws a rectangle around text (see{' '}
            <Link href="/learn/framebox">boxes and frames</Link>) and{' '}
            <code>{`\\rule{3cm}{1cm}`}</code> a filled black rectangle.
          </p>

          {/* ── Styling ── */}
          <h2>Styling Lines and Fills</h2>
          <p>
            Options in square brackets set color, thickness, dash pattern and fill. Colors use the{' '}
            <Link href="/learn/colors">xcolor</Link> syntax, so <code>blue!20</code> is 20% blue
            mixed with white:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\begin{document}

\\begin{tikzpicture}
  \\draw[blue, thick, fill=blue!20] (0,0) rectangle (2,1);   % colored and filled
  \\draw[dashed, red] (3,0) -- (5,1);                        % dashed line
  \\draw[dotted, ->, thick] (6,0) -- (8,1);                  % dotted with arrow
  \\draw[line width=2pt] (9,0) -- (11,1);                    % custom line width
  \\fill[green!50!black, opacity=0.5] (12,0.5) circle (0.5); % semi-transparent fill
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            Line widths have names: <code>ultra thin</code>, <code>very thin</code>,{' '}
            <code>thin</code> (the default), <code>semithick</code>, <code>thick</code>,{' '}
            <code>very thick</code> and <code>ultra thick</code>.
          </p>

          {/* ── Number line ── */}
          <h2>Number Line in TikZ</h2>
          <p>
            A number line is an axis, a tick at each integer and a label under each tick. The{' '}
            <code>\foreach</code> loop draws all the ticks in one line, and the node at the end of
            each tick places its label:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\begin{document}

\\begin{tikzpicture}
  % The axis, with arrows at both ends
  \\draw[<->, thick] (-5.5,0) -- (5.5,0);

  % Ticks and labels from -5 to 5
  \\foreach \\x in {-5,...,5}
    \\draw (\\x,0.15) -- (\\x,-0.15) node[below] {$\\x$};

  % The interval -2 <= x < 3: closed dot at -2, open dot at 3
  \\draw[blue, ultra thick] (-2,0) -- (3,0);
  \\fill[blue] (-2,0) circle (3pt);
  \\draw[blue, thick, fill=white] (3,0) circle (3pt);
  \\node[above, blue] at (0.5,0.25) {$-2 \\le x < 3$};
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            For fractions or decimals, stretch the x unit and loop over value/label pairs. Minor
            ticks are a second, shorter loop:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\begin{document}

\\begin{tikzpicture}[x=8cm]                 % 1 unit = 8 cm
  \\draw[->, thick] (0,0) -- (1.1,0);
  \\foreach \\x in {0,0.125,...,1}            % minor ticks every 1/8
    \\draw (\\x,0.08) -- (\\x,-0.08);
  \\foreach \\x/\\lab in {0/0, 0.25/\\frac{1}{4}, 0.5/\\frac{1}{2}, 0.75/\\frac{3}{4}, 1/1}
    \\draw[thick] (\\x,0.15) -- (\\x,-0.15) node[below] {$\\lab$};
  \\fill[red] (0.625,0) circle (2.5pt) node[above=3pt] {$\\frac{5}{8}$};
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            For a number line with a data plot on top, or axes in two dimensions, the{' '}
            <Link href="/learn/pgfplots">pgfplots</Link> package computes ticks and labels for
            you.
          </p>

          {/* ── Nodes and arrows ── */}
          <h2>Nodes and Arrows</h2>
          <p>
            A node is text placed at a point, optionally inside a shape. Give it a name in
            parentheses and you can connect it to other nodes; TikZ starts and ends the arrows at
            the node border, not at its center:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\usetikzlibrary{positioning, arrows.meta}
\\begin{document}

\\begin{tikzpicture}[box/.style={draw, rounded corners, minimum width=2cm, minimum height=8mm}]
  \\node[box] (in) {Input};
  \\node[box, right=2cm of in] (model) {Model};
  \\node[box, right=2cm of model] (out) {Output};

  \\draw[-{Stealth}] (in) -- node[above] {data} (model);
  \\draw[-{Latex[length=3mm]}, thick, blue] (model) -- node[below] {prediction} (out);
  \\draw[-{Stealth}, dashed] (out.south) -- ++(0,-1) -| node[near start, below] {feedback} (in.south);

  \\node[draw, circle, label=above:{a label}] at (0,-2.5) {A};
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            <code>right=2cm of in</code> comes from the <code>positioning</code> library and
            measures the gap between node borders. Anchors such as <code>in.south</code> pick a
            point on the border: <code>north</code>, <code>south</code>, <code>east</code>,{' '}
            <code>west</code>, the four corners like <code>north east</code>, and{' '}
            <code>center</code>. <code>-|</code> draws a horizontal then a vertical segment, and{' '}
            <code>|-</code> the reverse, which is how flowchart arrows turn corners.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Arrow</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>-&gt;</code>, <code>&lt;-</code>, <code>&lt;-&gt;</code></td><td>Default tip at the end, start or both ends</td></tr>
                <tr><td><code>{`-{Stealth}`}</code></td><td>Filled, swept tip (needs <code>arrows.meta</code>)</td></tr>
                <tr><td><code>{`-{Latex}`}</code></td><td>Filled triangular tip, as in many papers</td></tr>
                <tr><td><code>{`-{Triangle[open]}`}</code></td><td>Hollow triangle, as in UML</td></tr>
                <tr><td><code>{`-{Stealth[length=4mm, width=3mm]}`}</code></td><td>Tip with an explicit size</td></tr>
                <tr><td><code>{`>={Stealth}`}</code> on the picture</td><td>Makes every <code>-&gt;</code> use that tip</td></tr>
              </tbody>
            </table>
          </div>

          {/* ── Diagrams ── */}
          <h2>Diagrams in LaTeX: Flowcharts and Trees</h2>
          <p>
            Flowcharts combine nodes, styles and the <code>positioning</code> library. Define one
            style per kind of box, place each node relative to the one before, then connect them:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\usetikzlibrary{positioning, shapes.geometric, arrows.meta}
\\begin{document}

\\begin{tikzpicture}[
  node distance=8mm,
  >={Stealth},
  startstop/.style={rectangle, rounded corners, draw, fill=red!20, minimum width=2.5cm, minimum height=8mm},
  process/.style={rectangle, draw, fill=blue!20, minimum width=2.5cm, minimum height=8mm},
  decision/.style={diamond, draw, fill=green!20, aspect=2, inner sep=2pt},
]
  \\node[startstop] (start) {Start};
  \\node[process, below=of start] (step) {Process};
  \\node[decision, below=of step] (check) {Decision?};
  \\node[process, below=of check] (act) {Action};
  \\node[startstop, below=of act] (stop) {End};

  \\draw[->] (start) -- (step);
  \\draw[->] (step) -- (check);
  \\draw[->] (check) -- node[right] {Yes} (act);
  \\draw[->] (act) -- (stop);
  \\draw[->] (check.east) -- ++(1,0) node[above, near start] {No} |- (step.east);
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            Trees are built from <code>child</code> operations; each level can have its own
            spacing:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\begin{document}

\\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=3cm},
  level 2/.style={sibling distance=1.5cm},
  every node/.style={draw, circle, minimum size=8mm},
]
  \\node {R}
    child { node {A}
      child { node {A1} }
      child { node {A2} } }
    child { node {B} }
    child { node {C}
      child { node {C1} } };
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            The <code>graphdrawing</code> library can lay trees and graphs out automatically, but
            it needs LuaLaTeX. For chemistry diagrams see{' '}
            <Link href="/learn/molecular-orbital-diagrams">molecular orbital diagrams</Link>.
          </p>

          {/* ── Coordinates and loops ── */}
          <h2>Coordinates and Loops</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\begin{document}

\\begin{tikzpicture}
  \\draw (0,0) -- (2,1);                                   % Cartesian
  \\draw (0,0) -- (45:2);                                  % polar: angle:radius
  \\draw (3,0) -- ++(1,0) -- ++(0,1) -- ++(-1,0) -- cycle; % relative steps

  \\coordinate (A) at (6,0);                               % named coordinates
  \\coordinate (B) at (8,1);
  \\draw (A) -- (B);

  \\foreach \\x in {0,1,2,3,4}                              % repeated shapes
    \\draw (\\x,-1.5) circle (0.3);

  \\foreach \\i in {1,...,5}                                % a pentagon
    \\draw ({7+cos(90+72*\\i)},{-1.5+sin(90+72*\\i)})
       -- ({7+cos(90+72*(\\i+1))},{-1.5+sin(90+72*(\\i+1))});
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <p>
            Braces around a coordinate, as in <code>{`({cos(30)},1)`}</code>, let TikZ evaluate
            math; angles are in degrees.
          </p>

          {/* ── tikzstyle vs tikzset ── */}
          <h2>\tikzstyle vs \tikzset</h2>
          <p>
            Older examples define styles with <code>\tikzstyle</code>. It still works, but the
            TikZ manual marks it as deprecated: it cannot take arguments cleanly and it does not
            follow the key syntax used everywhere else. Use <code>\tikzset</code> in the
            preamble for document-wide styles, or <code>/.style</code> in the picture options for
            local ones:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}

% Deprecated form (avoid in new documents):
% \\tikzstyle{box}=[draw, rectangle, fill=blue!10]

% Current form, for every picture in the document:
\\tikzset{
  box/.style={draw, rectangle, fill=blue!10, minimum height=8mm},
  tinted/.style={box, fill=#1!20},     % a style with a parameter
  tinted/.default=green,               % value used when none is given
}

\\begin{document}

\\begin{tikzpicture}[
  big/.style={minimum width=3cm},      % local to this picture only
]
  \\node[box] at (0,0) {Box};
  \\node[tinted] at (2.5,0) {Green};
  \\node[tinted=orange, big] at (6,0) {Orange and wide};
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Old</th>
                  <th>Current</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\tikzstyle{box}=[draw]`}</code></td><td><code>{`\\tikzset{box/.style={draw}}`}</code></td></tr>
                <tr><td><code>{`\\tikzstyle{box}+=[fill=red]`}</code></td><td><code>{`\\tikzset{box/.append style={fill=red}}`}</code></td></tr>
                <tr><td><code>{`\\tikzstyle{every node}=[font=\\small]`}</code></td><td><code>{`\\tikzset{every node/.style={font=\\small}}`}</code></td></tr>
                <tr><td>No clean parameters</td><td><code>{`box/.style={fill=#1}`}</code>, used as <code>box=red</code></td></tr>
              </tbody>
            </table>
          </div>

          {/* ── Libraries ── */}
          <h2>Libraries</h2>
          <p>
            Many features live in libraries that you load in the preamble with{' '}
            <code>{`\\usetikzlibrary{...}`}</code>, separated by commas:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tikz}
\\usetikzlibrary{positioning, arrows.meta, shapes.geometric, calc, decorations.pathreplacing}
\\begin{document}

\\begin{tikzpicture}
  \\node[draw, ellipse] (a) {Ellipse};
  \\node[draw, regular polygon, regular polygon sides=6, right=of a] (b) {Hex};
  \\draw[-{Stealth}] (a) -- (b);
  \\coordinate (m) at ($(a)!0.5!(b)$);                     % calc: midpoint
  \\fill[red] (m) circle (1.5pt);
  \\draw[decorate, decoration={brace, amplitude=5pt}] (a.north west) -- (b.north east)
    node[midway, above=6pt] {a brace};
\\end{tikzpicture}

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Library</th>
                  <th>Adds</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>positioning</code></td><td><code>below=of a</code>, <code>right=1cm of a</code>: placement relative to other nodes</td></tr>
                <tr><td><code>arrows.meta</code></td><td>Arrow tips <code>Stealth</code>, <code>Latex</code>, <code>Triangle</code> with size options</td></tr>
                <tr><td><code>shapes.geometric</code></td><td><code>diamond</code>, <code>ellipse</code>, <code>trapezium</code>, <code>regular polygon</code>, <code>star</code></td></tr>
                <tr><td><code>shapes.misc</code></td><td><code>rounded rectangle</code>, <code>cross out</code>, <code>strike out</code></td></tr>
                <tr><td><code>calc</code></td><td>Coordinate math: <code>{`($(a)!0.5!(b)$)`}</code>, <code>{`($(a)+(1,0)$)`}</code></td></tr>
                <tr><td><code>decorations.pathreplacing</code></td><td>Curly braces along a path</td></tr>
                <tr><td><code>patterns</code></td><td>Hatched and dotted fills</td></tr>
                <tr><td><code>matrix</code></td><td>Grids of nodes, commutative diagrams</td></tr>
                <tr><td><code>fit</code>, <code>backgrounds</code></td><td>A box around several nodes, drawn behind them</td></tr>
                <tr><td><code>babel</code></td><td>Fixes conflicts with languages whose babel shorthands change <code>&lt;</code>, <code>&gt;</code> or <code>:</code></td></tr>
              </tbody>
            </table>
          </div>

          {/* ── Errors ── */}
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
                  <td><em>Package tikz Error: Giving up on this path. Did you forget a semicolon?</em></td>
                  <td>A <code>\draw</code>, <code>\node</code> or other path has no closing <code>;</code></td>
                  <td>Add the semicolon at the end of the path</td>
                </tr>
                <tr>
                  <td><em>Package pgf Error: Unknown arrow tip kind &apos;Stealth&apos;</em></td>
                  <td>Arrow tip from <code>arrows.meta</code> without the library</td>
                  <td><code>{`\\usetikzlibrary{arrows.meta}`}</code></td>
                </tr>
                <tr>
                  <td><em>Package pgfkeys Error: I do not know the key &apos;/tikz/diamond&apos;</em></td>
                  <td>Shape from a library that is not loaded, or a misspelled option (e.g. <code>fil=red</code>)</td>
                  <td><code>{`\\usetikzlibrary{shapes.geometric}`}</code>, or fix the spelling</td>
                </tr>
                <tr>
                  <td><em>Package PGF Math Error: Unknown function `of&apos; (in &apos;of a&apos;)</em></td>
                  <td><code>right=of a</code> without the <code>positioning</code> library</td>
                  <td><code>{`\\usetikzlibrary{positioning}`}</code></td>
                </tr>
                <tr>
                  <td><em>Package pgf Error: No shape named `b&apos; is known</em></td>
                  <td>A node name used before it is defined, misspelled, or a coordinate typed with <code>;</code> instead of <code>,</code></td>
                  <td>Define the node first; write coordinates as <code>(x,y)</code></td>
                </tr>
                <tr>
                  <td><em>You need to run LuaTeX to use the graph drawing library</em></td>
                  <td><code>graphdrawing</code> only works under LuaLaTeX</td>
                  <td>Compile with LuaLaTeX, or build the tree with <code>child</code> as shown above</td>
                </tr>
                <tr>
                  <td>Arrows or <code>-|</code> fail only after loading a language</td>
                  <td>babel shorthands (Spanish, French, Turkish and others) redefine <code>&lt;</code>, <code>&gt;</code>, <code>:</code> or <code>!</code></td>
                  <td><code>{`\\usetikzlibrary{babel}`}</code>; see <Link href="/learn/languages">languages in LaTeX</Link></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I draw in LaTeX?</h3>
          <p>
            Load TikZ with <code>{`\\usepackage{tikz}`}</code> and put drawing commands inside a{' '}
            <code>tikzpicture</code> environment. <code>{`\\draw (0,0) -- (2,1);`}</code> draws a
            line, <code>{`\\draw (0,0) rectangle (3,2);`}</code> a rectangle and{' '}
            <code>{`\\draw (0,0) circle (1);`}</code> a circle. Coordinates are in centimetres by
            default, and every command ends with a semicolon.
          </p>
          <h3>How do I draw a rectangle in LaTeX?</h3>
          <p>
            With TikZ, give two opposite corners: <code>{`\\draw (0,0) rectangle (3,2);`}</code>{' '}
            draws a 3 cm by 2 cm rectangle. Add options for style, such as{' '}
            <code>{`\\draw[fill=blue!20, thick]`}</code> or <code>rounded corners</code>. For a
            rectangle around text, use a node:{' '}
            <code>{`\\node[draw, minimum width=3cm, minimum height=1cm] {Text};`}</code>. Outside
            TikZ, <code>{`\\fbox{text}`}</code> draws a box around text and{' '}
            <code>{`\\rule{3cm}{2cm}`}</code> a filled black rectangle.
          </p>
          <h3>How do I draw a number line in LaTeX?</h3>
          <p>
            Draw the axis with <code>{`\\draw[<->] (-5,0) -- (5,0);`}</code> then add ticks and
            labels in a loop:{' '}
            <code>{`\\foreach \\x in {-5,...,5} \\draw (\\x,0.15) -- (\\x,-0.15) node[below] {$\\x$};`}</code>.
            Mark points with <code>{`\\fill (2,0) circle (3pt);`}</code> for a closed dot or{' '}
            <code>{`\\draw[fill=white]`}</code> for an open one.
          </p>
          <h3>What is the difference between \tikzstyle and \tikzset?</h3>
          <p>
            Both define a reusable style. <code>{`\\tikzstyle{box}=[draw, fill=blue!10]`}</code>{' '}
            is the old syntax and is deprecated in the TikZ manual; it still works but cannot
            take parameters cleanly. The current form is{' '}
            <code>{`\\tikzset{box/.style={draw, fill=blue!10}}`}</code>, or{' '}
            <code>{`box/.style={...}`}</code> in the options of one <code>tikzpicture</code> to
            keep the style local.
          </p>
          <h3>Which TikZ libraries do I need?</h3>
          <p>
            For most diagrams: <code>positioning</code> (<code>below=of a</code> placement),{' '}
            <code>arrows.meta</code> (Stealth and Latex arrow tips) and{' '}
            <code>shapes.geometric</code> (diamond, ellipse, regular polygon). Add{' '}
            <code>calc</code> for coordinate arithmetic, <code>decorations.pathreplacing</code>{' '}
            for braces, and <code>matrix</code> for grids of nodes. Load them in the preamble with{' '}
            <code>{`\\usetikzlibrary{positioning, arrows.meta, shapes.geometric}`}</code>.
          </p>
          <h3>Why does TikZ say &quot;Giving up on this path. Did you forget a semicolon?&quot;</h3>
          <p>
            Every TikZ path command (<code>\draw</code>, <code>\fill</code>, <code>\node</code>,{' '}
            <code>\path</code>, <code>\coordinate</code>) must end with a semicolon. Without it,
            TikZ keeps reading into the next command or the end of the picture and stops with
            this error. Add the missing <code>;</code> at the end of the line the error points to.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/pgfplots">Learn PGFPlots</Link> &ndash; Plots and charts from data and functions</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; The xcolor package for colorful diagrams</li>
            <li><Link href="/learn/molecular-orbital-diagrams">Molecular Orbital Diagrams</Link> &ndash; Chemistry diagrams drawn in TikZ</li>
            <li><Link href="/learn/beamer">Beamer in LaTeX</Link> &ndash; Diagrams that build up step by step on slides</li>
            <li><Link href="/blog/tikz-package-drawing-graphics-latex">The TikZ Package (blog)</Link> &ndash; A longer walk through drawing graphics</li>
            <li><Link href="/learn/latex">Learn LaTeX Basics</Link> &ndash; Review fundamentals</li>
          </ul>

          <h2>Free TikZ Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/tikz-generator" target="_blank" rel="noopener noreferrer">TikZ Generator</Link> &ndash; Generate TikZ code with AI from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/tools/image-to-tikz" target="_blank" rel="noopener noreferrer">Image to TikZ</Link> &ndash; Convert images and diagrams to TikZ code</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test your TikZ code with live preview</li>
          </ul>

          <RelatedPosts searchTerm="TikZ" title="Related TikZ Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Create TikZ diagrams with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI can help you generate TikZ code from descriptions. Just describe what you want!
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
