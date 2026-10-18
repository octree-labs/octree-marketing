import type { Metadata } from 'next/types'

import { learnMetadata } from '@/utilities/learnMetadata'
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

const breadcrumbs = getLearnBreadcrumbs('Using Colors', 'colors')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'colors',
  title: 'Using Colors in LaTeX – xcolor Package Guide 2026',
  description: 'Learn how to use colors in LaTeX with the xcolor package. Guide covers text color, background color, custom colors, color mixing, colored tables, and the dvipsnames palette.',
  keywords: 'latex color, latex text color, xcolor latex, latex textcolor, latex definecolor, latex color names, latex background color, latex colorbox, latex color mixing, latex dvipsnames, latex colored text, latex rgb color, latex highlight text',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

export default async function LearnColorsPage() {
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
          <h1>Using Colors in LaTeX</h1>
          <p className="lead">
            Colors can improve readability, highlight important information, and create
            visual hierarchy in your LaTeX documents. Whether you need colored text,
            backgrounds, or tables, LaTeX&apos;s <code>xcolor</code> package provides
            everything you need.
          </p>

          <h2>The xcolor Package</h2>
          <p>
            The <code>xcolor</code> package is the standard way to use colors in LaTeX.
            It extends the older <code>color</code> package with additional features like
            color mixing, named color palettes, and multiple color models.
          </p>
          <p>Basic setup in your preamble:</p>
          <pre><code>{`\\usepackage{xcolor}`}</code></pre>
          <p>
            You can load additional named color palettes by passing options:
          </p>
          <pre><code>{`% Load the dvipsnames color palette (68 named colors)
\\usepackage[dvipsnames]{xcolor}

% Load the svgnames palette (150+ named colors)
\\usepackage[svgnames]{xcolor}

% Load the x11names palette (300+ named colors)
\\usepackage[x11names]{xcolor}

% Combine multiple palettes
\\usepackage[dvipsnames, svgnames, x11names]{xcolor}`}</code></pre>
          <p>
            The <code>dvipsnames</code> option is the most commonly used and provides
            popular colors like <code>ForestGreen</code>, <code>RoyalBlue</code>, and
            <code>Maroon</code>. The <code>svgnames</code> and <code>x11names</code> options
            add even more named colors based on SVG and X11 color standards.
          </p>

          <h2>Predefined Colors</h2>
          <p>
            The <code>xcolor</code> package provides a set of base colors available
            without any additional options:
          </p>
          <table>
            <thead>
              <tr>
                <th>Color Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>red</code></td>
                <td>Pure red</td>
              </tr>
              <tr>
                <td><code>green</code></td>
                <td>Pure green</td>
              </tr>
              <tr>
                <td><code>blue</code></td>
                <td>Pure blue</td>
              </tr>
              <tr>
                <td><code>cyan</code></td>
                <td>Cyan (light blue-green)</td>
              </tr>
              <tr>
                <td><code>magenta</code></td>
                <td>Magenta (pinkish-purple)</td>
              </tr>
              <tr>
                <td><code>yellow</code></td>
                <td>Pure yellow</td>
              </tr>
              <tr>
                <td><code>black</code></td>
                <td>Pure black</td>
              </tr>
              <tr>
                <td><code>white</code></td>
                <td>Pure white</td>
              </tr>
              <tr>
                <td><code>orange</code></td>
                <td>Orange</td>
              </tr>
              <tr>
                <td><code>purple</code></td>
                <td>Purple</td>
              </tr>
              <tr>
                <td><code>brown</code></td>
                <td>Brown</td>
              </tr>
              <tr>
                <td><code>lime</code></td>
                <td>Lime green</td>
              </tr>
              <tr>
                <td><code>olive</code></td>
                <td>Olive green</td>
              </tr>
              <tr>
                <td><code>pink</code></td>
                <td>Pink</td>
              </tr>
              <tr>
                <td><code>teal</code></td>
                <td>Teal (dark cyan)</td>
              </tr>
              <tr>
                <td><code>violet</code></td>
                <td>Violet</td>
              </tr>
              <tr>
                <td><code>darkgray</code></td>
                <td>Dark gray</td>
              </tr>
              <tr>
                <td><code>gray</code></td>
                <td>Medium gray</td>
              </tr>
              <tr>
                <td><code>lightgray</code></td>
                <td>Light gray</td>
              </tr>
            </tbody>
          </table>

          <h2>Using Colors for Text</h2>
          <p>
            The most common use of color in LaTeX is to change text color. There are
            several ways to do this:
          </p>
          <pre><code>{`\\usepackage{xcolor}

\\begin{document}

% Method 1: \\textcolor{color}{text}
This is \\textcolor{red}{red text} in a sentence.

% Method 2: \\color{color} — changes all following text
{\\color{blue} This entire block is blue.}

% Method 3: Scoped color change
Normal text, {\\color{green} green text here}, back to normal.

% Using with bold and italic
\\textcolor{purple}{\\textbf{Bold purple text}}
\\textcolor{orange}{\\textit{Italic orange text}}

% Colored text with custom colors
\\textcolor{red!70!black}{Dark red text}

\\end{document}`}</code></pre>
          <p>
            The <code>\textcolor</code> command is the most straightforward approach. It
            takes two arguments: the color name and the text to color. The <code>\color</code> command
            changes the color for all subsequent text, so it&apos;s best used inside braces
            to limit its scope.
          </p>

          <h2>Background Colors</h2>
          <p>
            You can add background colors to text using <code>\colorbox</code> and
            <code>\fcolorbox</code>:
          </p>
          <pre><code>{`% Colored background
\\colorbox{yellow}{Highlighted text}

% Colored background with a border
\\fcolorbox{red}{white}{Text with red border on white background}

% Nested: colored text on colored background
\\colorbox{black}{\\textcolor{white}{White text on black}}

% Light highlight effect
\\colorbox{yellow!30}{Softly highlighted text}

% Multi-line colored box (use minipage)
\\colorbox{blue!10}{%
  \\begin{minipage}{0.8\\textwidth}
    This is a longer block of text with a
    light blue background that spans
    multiple lines.
  \\end{minipage}
}`}</code></pre>
          <p>
            <code>\colorbox&#123;bg-color&#125;&#123;text&#125;</code> sets the background color.
            <code>\fcolorbox&#123;border-color&#125;&#123;bg-color&#125;&#123;text&#125;</code> adds
            a colored frame (border) around the box as well.
          </p>

          <h2>Defining Custom Colors</h2>
          <p>
            You can define your own colors using <code>\definecolor</code> with various
            color models:
          </p>
          <pre><code>{`% RGB model (values 0 to 1)
\\definecolor{myblue}{rgb}{0.1, 0.3, 0.8}

% RGB model (values 0 to 255)
\\definecolor{mygreen}{RGB}{34, 139, 34}

% HTML/hex model
\\definecolor{mypurple}{HTML}{6A0DAD}

% CMYK model (values 0 to 1)
\\definecolor{myorange}{cmyk}{0, 0.5, 1, 0}

% Gray model (0 = black, 1 = white)
\\definecolor{mygray}{gray}{0.6}

% Using custom colors
\\textcolor{myblue}{This text is my custom blue.}
\\colorbox{mygreen!20}{Highlighted with custom green}

% Redefining an existing color
\\colorlet{alertcolor}{red!80!black}
\\textcolor{alertcolor}{This is an alert!}`}</code></pre>
          <p>
            The <code>\definecolor</code> command takes three arguments: the name you want
            to give your color, the color model, and the color values. The
            <code>\colorlet</code> command is useful for creating aliases or derived colors
            from existing ones.
          </p>

          <h2>Color Mixing</h2>
          <p>
            One of <code>xcolor</code>&apos;s most powerful features is color mixing
            using the <code>!</code> operator:
          </p>
          <pre><code>{`% Mix two colors: color1!percentage!color2
\\textcolor{blue!50!red}{50% blue + 50% red = purple}
\\textcolor{red!70!blue}{70% red + 30% blue}
\\textcolor{green!30!yellow}{30% green + 70% yellow}

% Tinting: color!percentage (mixes with white)
\\textcolor{red!30}{30% red + 70% white = light red}
\\textcolor{blue!80}{80% blue + 20% white = light blue}
\\textcolor{red!10}{Very light red / pink}

% Shading: color!percentage!black
\\textcolor{blue!50!black}{Dark blue (50% blue + 50% black)}
\\textcolor{red!70!black}{Dark red}

% Chain mixing
\\textcolor{red!50!blue!50!green}{Mixed from three colors}

% Using in colorbox
\\colorbox{yellow!20}{Soft yellow highlight}
\\colorbox{red!10}{Very light red background}`}</code></pre>
          <p>
            The expression <code>red!30</code> means &quot;30% red mixed with 70% white&quot; —
            when only one color is specified with a percentage, it&apos;s mixed with white
            by default. The expression <code>blue!50!red</code> means &quot;50% blue mixed
            with 50% red.&quot; You can chain multiple mixes together to create complex colors.
          </p>

          <h2>Colors in Math Mode</h2>
          <p>
            You can colorize individual terms in equations to draw attention to specific
            parts:
          </p>
          <pre><code>{`% Color individual terms in an equation
\\[
  \\textcolor{red}{a}x^2 + \\textcolor{blue}{b}x + \\textcolor{green}{c} = 0
\\]

% Color larger expressions
\\[
  E = \\textcolor{red}{m} \\textcolor{blue}{c^2}
\\]

% Color with alignment environments
\\begin{align}
  f(x) &= \\textcolor{red}{3x^2} + \\textcolor{blue}{2x} + \\textcolor{green}{1} \\\\
  f'(x) &= \\textcolor{red}{6x} + \\textcolor{blue}{2}
\\end{align}

% Define colors for readability
\\definecolor{termA}{HTML}{E74C3C}
\\definecolor{termB}{HTML}{3498DB}
\\[
  \\textcolor{termA}{\\underbrace{\\int_0^1 f(x)\\,dx}_{\\text{integral}}} =
  \\textcolor{termB}{\\underbrace{F(1) - F(0)}_{\\text{antiderivative}}}
\\]`}</code></pre>
          <p>
            Using colors in math mode is especially useful for teaching materials,
            presentations, and anywhere you need to visually distinguish different parts
            of a formula.
          </p>

          <h2>Colored Boxes and Frames</h2>
          <p>
            For more advanced colored boxes, the <code>tcolorbox</code> package provides
            beautiful, customizable boxes:
          </p>
          <pre><code>{`\\usepackage{tcolorbox}

% Simple colored box
\\begin{tcolorbox}
  This is a default tcolorbox.
\\end{tcolorbox}

% Customized box
\\begin{tcolorbox}[
  colback=blue!5!white,
  colframe=blue!75!black,
  title=My Title
]
  Content inside a styled box.
\\end{tcolorbox}

% Warning box
\\begin{tcolorbox}[
  colback=red!5!white,
  colframe=red!75!black,
  title=Warning
]
  This is important information!
\\end{tcolorbox}

% Info box with rounded corners
\\begin{tcolorbox}[
  colback=green!5!white,
  colframe=green!50!black,
  arc=4mm,
  title=Tip
]
  Here is a helpful tip.
\\end{tcolorbox}

% Box without title
\\begin{tcolorbox}[
  colback=yellow!10!white,
  colframe=yellow!50!black
]
  A simple note box.
\\end{tcolorbox}`}</code></pre>
          <p>
            The <code>tcolorbox</code> package is extremely versatile. The
            <code>colback</code> option sets the background color, <code>colframe</code> sets
            the border color, and you can add titles, rounded corners, shadows, and more.
          </p>

          <h2>Page and Section Colors</h2>
          <p>
            You can also apply colors to section headings and even the page background:
          </p>
          <pre><code>{`\\usepackage{xcolor}
\\usepackage{titlesec}

% Colored section headings
\\titleformat{\\section}
  {\\normalfont\\Large\\bfseries\\color{blue!80!black}}
  {\\thesection}{1em}{}

\\titleformat{\\subsection}
  {\\normalfont\\large\\bfseries\\color{blue!60!black}}
  {\\thesubsection}{1em}{}

% Set page background color
\\pagecolor{yellow!5}  % Very light yellow background

% Set default text color for the entire document
\\color{darkgray}

% Reset page color back to white
\\nopagecolor`}</code></pre>
          <p>
            Using <code>\pagecolor</code> sets the background color for all pages. Use
            very light tints (like <code>yellow!5</code>) to avoid readability issues.
            The <code>titlesec</code> package lets you customize how section headings are
            formatted, including their color.
          </p>

          <h2>Color in Tables</h2>
          <p>
            The <code>colortbl</code> package (automatically loaded by <code>xcolor</code> with
            the <code>table</code> option) lets you color rows, columns, and cells:
          </p>
          <pre><code>{`\\usepackage[table]{xcolor}

% Alternating row colors
\\begin{table}[h]
  \\centering
  \\rowcolors{2}{gray!15}{white}  % Start at row 2, alternate gray and white
  \\begin{tabular}{lcc}
    \\hline
    \\rowcolor{blue!30} \\textbf{Name} & \\textbf{Score} & \\textbf{Grade} \\\\
    \\hline
    Alice   & 95 & A \\\\
    Bob     & 87 & B \\\\
    Charlie & 92 & A \\\\
    Diana   & 78 & C \\\\
    Eve     & 88 & B \\\\
    \\hline
  \\end{tabular}
\\end{table}

% Color individual cells
\\begin{tabular}{|l|c|c|}
  \\hline
  Item & Status & Priority \\\\
  \\hline
  Task 1 & \\cellcolor{green!30} Done & Low \\\\
  Task 2 & \\cellcolor{yellow!30} In Progress & \\cellcolor{red!30} High \\\\
  Task 3 & \\cellcolor{red!30} Blocked & Medium \\\\
  \\hline
\\end{tabular}

% Color an entire column
\\begin{tabular}{|>{\\columncolor{blue!10}}l|c|c|}
  \\hline
  Name & Value & Unit \\\\
  \\hline
  Length & 5.2 & m \\\\
  Width  & 3.1 & m \\\\
  Height & 2.0 & m \\\\
  \\hline
\\end{tabular}`}</code></pre>
          <p>
            Key commands: <code>\rowcolor&#123;color&#125;</code> colors an entire row,
            <code>\cellcolor&#123;color&#125;</code> colors a single cell,
            <code>\columncolor&#123;color&#125;</code> colors an entire column (used in the
            column specification), and <code>\rowcolors&#123;start&#125;&#123;odd&#125;&#123;even&#125;</code> sets
            up alternating row colors automatically.
          </p>

          <h2>dvipsnames Color Table</h2>
          <p>
            When you load <code>\usepackage[dvipsnames]&#123;xcolor&#125;</code>, you get access
            to 68 named colors. Here are some of the most commonly used:
          </p>
          <table>
            <thead>
              <tr>
                <th>Color Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ForestGreen</code></td>
                <td>Deep green, great for nature themes</td>
              </tr>
              <tr>
                <td><code>RoyalBlue</code></td>
                <td>Rich medium blue</td>
              </tr>
              <tr>
                <td><code>Maroon</code></td>
                <td>Dark brownish-red</td>
              </tr>
              <tr>
                <td><code>NavyBlue</code></td>
                <td>Dark blue</td>
              </tr>
              <tr>
                <td><code>RubineRed</code></td>
                <td>Vivid pinkish-red</td>
              </tr>
              <tr>
                <td><code>Cerulean</code></td>
                <td>Sky blue</td>
              </tr>
              <tr>
                <td><code>Aquamarine</code></td>
                <td>Blue-green</td>
              </tr>
              <tr>
                <td><code>Emerald</code></td>
                <td>Bright green</td>
              </tr>
              <tr>
                <td><code>Goldenrod</code></td>
                <td>Warm golden yellow</td>
              </tr>
              <tr>
                <td><code>Orchid</code></td>
                <td>Light purple</td>
              </tr>
              <tr>
                <td><code>Salmon</code></td>
                <td>Pinkish-orange</td>
              </tr>
              <tr>
                <td><code>Sepia</code></td>
                <td>Warm brown</td>
              </tr>
              <tr>
                <td><code>Peach</code></td>
                <td>Light pinkish-orange</td>
              </tr>
              <tr>
                <td><code>Plum</code></td>
                <td>Dark purple</td>
              </tr>
              <tr>
                <td><code>Periwinkle</code></td>
                <td>Soft blue-violet</td>
              </tr>
              <tr>
                <td><code>Tan</code></td>
                <td>Light brown</td>
              </tr>
              <tr>
                <td><code>Violet</code></td>
                <td>Blue-purple</td>
              </tr>
              <tr>
                <td><code>BrickRed</code></td>
                <td>Earthy red</td>
              </tr>
              <tr>
                <td><code>Thistle</code></td>
                <td>Pale purple</td>
              </tr>
              <tr>
                <td><code>MidnightBlue</code></td>
                <td>Very dark blue</td>
              </tr>
            </tbody>
          </table>

          <h2>Color Models Reference</h2>
          <p>
            The <code>xcolor</code> package supports several color models for defining
            custom colors:
          </p>
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Values</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>rgb</code></td>
                <td>3 values, each 0–1</td>
                <td><code>\definecolor&#123;myred&#125;&#123;rgb&#125;&#123;0.9, 0.1, 0.1&#125;</code></td>
              </tr>
              <tr>
                <td><code>RGB</code></td>
                <td>3 values, each 0–255</td>
                <td><code>\definecolor&#123;myred&#125;&#123;RGB&#125;&#123;230, 25, 25&#125;</code></td>
              </tr>
              <tr>
                <td><code>HTML</code></td>
                <td>6-digit hex (no #)</td>
                <td><code>\definecolor&#123;myred&#125;&#123;HTML&#125;&#123;E61919&#125;</code></td>
              </tr>
              <tr>
                <td><code>cmyk</code></td>
                <td>4 values, each 0–1</td>
                <td><code>\definecolor&#123;myred&#125;&#123;cmyk&#125;&#123;0, 0.9, 0.9, 0.1&#125;</code></td>
              </tr>
              <tr>
                <td><code>gray</code></td>
                <td>1 value, 0–1</td>
                <td><code>\definecolor&#123;mygray&#125;&#123;gray&#125;&#123;0.5&#125;</code></td>
              </tr>
            </tbody>
          </table>
          <p>
            Use <code>rgb</code> or <code>HTML</code> for screen-oriented documents and
            <code>cmyk</code> for print. The <code>RGB</code> model is convenient when
            working with color values from web design tools, as it uses the familiar
            0–255 range.
          </p>

          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> – Learn text formatting in LaTeX</li>
            <li><Link href="/learn/tables">Tables in LaTeX</Link> – Create tables with colored rows and cells</li>
            <li><Link href="/learn/latex">Learn LaTeX Basics</Link> – Review fundamentals</li>
            <li><Link href="/learn/tikz">Learn TikZ</Link> – Create diagrams with colorful graphics</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your color code with live preview</li>
            <li><Link href="https://tools.useoctree.com/tools/tikz-generator" target="_blank" rel="noopener noreferrer">TikZ Generator</Link> – Generate colorful TikZ diagrams with AI</li>
            <li><Link href="https://tools.useoctree.com/tools/image-to-tikz" target="_blank" rel="noopener noreferrer">Image to TikZ</Link> – Convert images and diagrams to TikZ code</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX colors" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write LaTeX with AI assistance</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI can help you write LaTeX with beautiful colors, formatting, and more. Just describe what you want!
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
