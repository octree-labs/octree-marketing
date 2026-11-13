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

const breadcrumbs = getLearnBreadcrumbs('Using Colors', 'colors')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'colors',
  title: 'Colors in LaTeX: \\colorbox, \\textcolor and xcolor',
  seoTitle: 'LaTeX Colors: colorbox, textcolor and xcolor',
  description: 'LaTeX colours with xcolor: \\colorbox and \\fcolorbox, \\textcolor, \\definecolor (RGB, HTML), dvipsnames and svgnames, \\rowcolor tables and common errors.',
  keywords: 'colorbox latex, latex colorbox, colorbox colors latex, fcolorbox latex, latex colours, latex colors, latex color names, latex svgnames, latex pagecolor, latex rowcolor, latex cellcolor, undefined color latex, option clash for package xcolor, latex color, latex text color, xcolor latex, latex textcolor, latex definecolor, latex color names, latex background color, latex colorbox, latex color mixing, latex dvipsnames, latex colored text, latex rgb color, latex highlight text',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-13'

const faq: FaqItem[] = [
  {
    question: 'How do I use \\colorbox in LaTeX?',
    answer:
      'Load \\usepackage{xcolor} and write \\colorbox{yellow}{text} for a coloured background. \\fcolorbox{red}{white}{text} adds a red frame around a white box. The colour can be a name, a mix such as yellow!30, or a value: \\colorbox[HTML]{FFE08A}{text}. A colorbox does not break across lines, so wrap long text in a \\parbox or use \\hl from soul.',
  },
  {
    question: 'How do I change the text colour in LaTeX?',
    answer:
      'Load xcolor and write \\textcolor{red}{text} for a few words, or {\\color{blue} ...} to colour everything up to the closing brace. Both take any colour name, a mix such as red!70!black, or a colour you defined with \\definecolor.',
  },
  {
    question: 'What colours are available in LaTeX?',
    answer:
      'xcolor always defines 19 base colours: red, green, blue, cyan, magenta, yellow, black, white, gray, darkgray, lightgray, brown, lime, olive, orange, pink, purple, teal and violet. The dvipsnames option adds 68 more (ForestGreen, RoyalBlue, Maroon), svgnames adds 151 (SteelBlue, Crimson, DarkOrange) and x11names adds 317. Names are case-sensitive.',
  },
  {
    question: 'How do I use a hex colour code in LaTeX?',
    answer:
      'Define it once in the preamble with the HTML model and no # sign: \\definecolor{brand}{HTML}{1A73E8}. Then use the name anywhere, as in \\textcolor{brand}{text} or \\colorbox{brand!15}{text}. For a one-off colour, \\textcolor[HTML]{1A73E8}{text} also works.',
  },
  {
    question: 'How do I colour a table row or cell in LaTeX?',
    answer:
      'Load \\usepackage[table]{xcolor}, which loads colortbl. Then start a row with \\rowcolor{gray!20}, colour one cell with \\cellcolor{green!30}, colour a column with >{\\columncolor{blue!10}}l in the column spec, or alternate rows with \\rowcolors{2}{white}{gray!15} before the tabular; its second argument colors odd rows and its third colors even rows.',
  },
]

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
          <h1>Colors in LaTeX: \colorbox, \textcolor and xcolor</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Load:</strong> <code>{`\\usepackage{xcolor}`}</code>; add{' '}
                <code>{`[dvipsnames,svgnames,table]`}</code> for more names and table colours.
              </li>
              <li>
                <strong>Coloured background:</strong> <code>{`\\colorbox{yellow}{text}`}</code>; with a
                frame, <code>{`\\fcolorbox{red}{white}{text}`}</code>.
              </li>
              <li>
                <strong>Text colour:</strong> <code>{`\\textcolor{blue}{text}`}</code> or{' '}
                <code>{`{\\color{blue} ...}`}</code>.
              </li>
              <li>
                <strong>Custom colour:</strong> <code>{`\\definecolor{brand}{HTML}{1A73E8}`}</code> (also{' '}
                <code>RGB</code>, <code>rgb</code>, <code>gray</code>, <code>cmyk</code>); mix with{' '}
                <code>red!30</code> or <code>blue!50!black</code>.
              </li>
              <li>
                <strong>Page and tables:</strong> <code>{`\\pagecolor{yellow!5}`}</code>,{' '}
                <code>{`\\rowcolor{gray!20}`}</code>, <code>{`\\cellcolor{green!30}`}</code>.
              </li>
            </ul>
          </div>
          <p className="lead">
            Colours in LaTeX come from the <code>xcolor</code> package: <code>\textcolor</code>{' '}
            colours text, <code>\colorbox</code> and <code>\fcolorbox</code> put a coloured
            background (and frame) behind it, <code>\definecolor</code> creates your own colours
            from RGB, HTML hex or gray values, and <code>\pagecolor</code> colours the whole page.
            This guide covers all of them, the <code>dvipsnames</code> and <code>svgnames</code>{' '}
            colour names, colour mixing, coloured tables with <code>\rowcolor</code> and{' '}
            <code>\cellcolor</code>, and the errors (&ldquo;Undefined color&rdquo;, &ldquo;Option
            clash for package xcolor&rdquo;) that stop a compile.
          </p>

          {/* ── Colorbox ── */}
          <h2>Colorbox in LaTeX</h2>
          <p>
            <code>\colorbox&#123;color&#125;&#123;text&#125;</code> sets <em>text</em> on a box filled
            with <em>color</em>. <code>\fcolorbox&#123;frame&#125;&#123;background&#125;&#123;text&#125;</code>{' '}
            does the same with a frame drawn in a second colour. Both come with{' '}
            <code>xcolor</code> and accept any colour name, mix or value:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[dvipsnames]{xcolor}
\\begin{document}

\\colorbox{yellow}{Highlighted text}

\\colorbox{yellow!30}{Softer highlight: 30\\% yellow, 70\\% white}

\\colorbox{ForestGreen!20}{A dvipsnames colour, tinted}

% Colour values without defining a name first
\\colorbox[HTML]{FFE08A}{Hex background}
\\colorbox[rgb]{0.85,0.93,1}{rgb background}

% Frame colour, then background colour
\\fcolorbox{red}{white}{Red frame on white}

% White text on a dark box
\\colorbox{black}{\\textcolor{white}{White on black}}

\\end{document}`}</code></pre>

          <h3>Padding and Frame Width</h3>
          <p>
            The space between the text and the edge of the box is <code>\fboxsep</code> (3pt by
            default) and the frame thickness of <code>\fcolorbox</code> is <code>\fboxrule</code>{' '}
            (0.4pt). Change them inside a group so other boxes keep the defaults:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[dvipsnames]{xcolor}
\\begin{document}

{\\setlength{\\fboxsep}{6pt}%
 \\setlength{\\fboxrule}{1.5pt}%
 \\fcolorbox{RoyalBlue}{RoyalBlue!10}{More padding, thicker frame}}

\\end{document}`}</code></pre>

          <h3>Colorbox Across Several Lines</h3>
          <p>
            Like <code>\mbox</code>, a colorbox never breaks across lines: long text runs into the
            margin. For a coloured paragraph, put a <code>\parbox</code> or <code>minipage</code>{' '}
            inside the box. To highlight text that should wrap normally, use <code>\hl</code> from
            the <code>soul</code> package instead:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{xcolor}
\\usepackage{soul}
\\begin{document}

% A full-width grey paragraph
\\noindent\\colorbox{gray!15}{%
  \\parbox{\\dimexpr\\linewidth-2\\fboxsep}{%
    This paragraph has a light grey background and wraps across
    lines like normal text, because the parbox does the line breaking.}}

% Highlighting that breaks across lines
\\sethlcolor{yellow}
\\hl{This highlighted sentence wraps onto the next line when it
reaches the margin, which a colorbox cannot do.}

\\end{document}`}</code></pre>
          <p>
            For boxes with titles, rounded corners, shadows or page breaks, use{' '}
            <code>tcolorbox</code>; see the <Link href="#colored-boxes-and-frames">tcolorbox example below</Link>{' '}
            and the full{' '}
            <Link href="https://www.useoctree.com/blog/colored-boxes-latex-tcolorbox-guide">
              tcolorbox guide
            </Link>.
          </p>

          <h3>Colorbox in Math Mode</h3>
          <p>
            <code>\colorbox</code> switches to text mode, so put the formula back in{' '}
            <code>$...$</code> inside it, adding <code>\displaystyle</code> in display math to
            keep fractions full size:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{xcolor}
\\begin{document}

The term $\\colorbox{yellow}{$x^2$}$ is highlighted.

\\[
  a + \\colorbox{yellow}{$\\displaystyle\\frac{b}{c}$} = d
\\]

\\end{document}`}</code></pre>

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
            popular colors like <code>ForestGreen</code>, <code>RoyalBlue</code>, and{' '}
            <code>Maroon</code>. The <code>svgnames</code> option adds the 151 web (CSS/SVG)
            colour names, such as <code>SteelBlue</code>, <code>Crimson</code>,{' '}
            <code>DarkOrange</code> and <code>Teal</code>, and <code>x11names</code> adds X11
            variants such as <code>Firebrick3</code>. Colour names are case-sensitive:{' '}
            <code>forestgreen</code> is an undefined colour.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[dvipsnames,svgnames]{xcolor}
\\begin{document}

\\textcolor{ForestGreen}{dvipsnames} and \\textcolor{SteelBlue}{svgnames}
\\colorbox{Crimson!15}{a tinted svgnames background}

\\end{document}`}</code></pre>

          <h2>Predefined Colors</h2>
          <p>
            The <code>xcolor</code> package provides a set of base colors available
            without any additional options:
          </p>
          <div className="overflow-x-auto">
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
          </div>

          <h2>Using Colors for Text</h2>
          <p>
            The most common use of color in LaTeX is to change text color. There are
            several ways to do this:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{xcolor}

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
          <pre><code>{`\\documentclass{article}
\\usepackage{xcolor}
\\begin{document}
% Mix two colors: color1!percentage!color2
\\textcolor{blue!50!red}{50\\% blue + 50\\% red = purple}
\\textcolor{red!70!blue}{70\\% red + 30\\% blue}
\\textcolor{green!30!yellow}{30\\% green + 70\\% yellow}

% Tinting: color!percentage (mixes with white)
\\textcolor{red!30}{30\\% red + 70\\% white = light red}
\\textcolor{blue!80}{80\\% blue + 20\\% white = light blue}
\\textcolor{red!10}{Very light red / pink}

% Shading: color!percentage!black
\\textcolor{blue!50!black}{Dark blue (50\\% blue + 50\\% black)}
\\textcolor{red!70!black}{Dark red}

% Chain mixing
\\textcolor{red!50!blue!50!green}{Mixed from three colors}

% Using in colorbox
\\colorbox{yellow!20}{Soft yellow highlight}
\\colorbox{red!10}{Very light red background}
\\end{document}`}</code></pre>
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
            of a formula. Load <code>amsmath</code> for <code>align</code> and <code>\text</code>
            in this snippet. When coloring a relation, preserve its operator spacing with
            <code>{`a \\mathrel{\\textcolor{red}{=}} b`}</code>.
          </p>

          <h2 id="colored-boxes-and-frames">Colored Boxes and Frames</h2>
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
            The{' '}
            <Link href="https://www.useoctree.com/blog/colored-boxes-latex-tcolorbox-guide">
              tcolorbox guide
            </Link>{' '}
            covers styles, theorem boxes and breakable boxes in detail.
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

% Remove the page background
\\nopagecolor`}</code></pre>
          <p>
            <code>\pagecolor</code> sets the background used when a page is shipped out;
            it is not restricted by ordinary braces. Use <code>\clearpage</code> before changing
            it when the change must start on a new page. <code>\nopagecolor</code> removes the
            background rather than painting it white. The snippet shows alternatives: do not
            immediately reset the background if you want the tint to appear in the PDF.
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
  \\rowcolors{2}{white}{gray!15}  % Start at row 2, alternate gray and white
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
          <div className="overflow-x-auto">
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
          </div>

          <h2>Color Models Reference</h2>
          <p>
            The <code>xcolor</code> package supports several color models for defining
            custom colors:
          </p>
          <div className="overflow-x-auto">
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
          </div>
          <p>
            Use <code>rgb</code> or <code>HTML</code> for screen-oriented documents and
            <code>cmyk</code> for print. The <code>RGB</code> model is convenient when
            working with color values from web design tools, as it uses the familiar
            0–255 range.
          </p>

          <h2>Readable colors and clickable links</h2>
          <p>
            Choose dark text on a light background and check the PDF at normal reading size.
            A pale tint that works behind a table row is usually too faint for the text itself.
            Do not distinguish results only by red versus green: add a word such as “failed” or
            “passed”, or use different line styles in a plot. Print a grayscale sample when
            readers may photocopy the document.
          </p>
          <p>
            Define a small palette with descriptive names such as <code>accent</code> and
            <code>warning</code>, then reuse those names. That lets you change the whole document
            without searching for dozens of numerical color values. Load xcolor before hyperref
            and pass the same named color to its link settings:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{xcolor}
\\definecolor{accent}{HTML}{174A7E}
\\usepackage[colorlinks=true,linkcolor=accent,urlcolor=accent]{hyperref}
\\begin{document}
\\section{Results}\\label{sec:results}
\\textcolor{accent}{A readable accent color.}
See Section~\\ref{sec:results} or
\\href{https://www.useoctree.com/learn}{the learning hub}.
\\end{document}`}</code></pre>
          <p>
            Compile twice to resolve the section reference, then click both links in the PDF.
            For a publisher that wants uncolored text, use hyperref&apos;s <code>hidelinks</code>
            option instead. It hides link decoration without removing the links.
          </p>

          {/* ── Common errors ── */}
          <h2>Common Errors</h2>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Error</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>Undefined control sequence</em> on <code>\textcolor</code> or <code>\colorbox</code></td>
                <td>xcolor is not loaded</td>
                <td><code>{`\\usepackage{xcolor}`}</code></td>
              </tr>
              <tr>
                <td><em>Package xcolor Error: Undefined color `ForestGreen&apos;</em></td>
                <td>The name comes from an option you did not load, or its case is wrong</td>
                <td><code>{`\\usepackage[dvipsnames]{xcolor}`}</code>; check spelling and capitals</td>
              </tr>
              <tr>
                <td><em>LaTeX Error: Option clash for package xcolor</em></td>
                <td>Another package (tikz, pgfplots, a template) loaded xcolor before you passed options</td>
                <td>Put <code>{`\\PassOptionsToPackage{dvipsnames,table}{xcolor}`}</code> before <code>\documentclass</code>; in Beamer use <code>{`\\documentclass[xcolor={dvipsnames,table}]{beamer}`}</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence</em> on <code>\rowcolor</code> or <code>\cellcolor</code></td>
                <td>Table colours need colortbl</td>
                <td><code>{`\\usepackage[table]{xcolor}`}</code></td>
              </tr>
              <tr>
                <td><em>Illegal parameter number in definition</em> after <code>\definecolor</code></td>
                <td>A <code>#</code> in the hex code</td>
                <td><code>{`\\definecolor{brand}{HTML}{1A73E8}`}</code>, no <code>#</code></td>
              </tr>
              <tr>
                <td>Coloured box runs into the margin</td>
                <td><code>\colorbox</code> does not break lines</td>
                <td>A <code>\parbox</code> inside it, <code>\hl</code> from soul, or tcolorbox</td>
              </tr>
            </tbody>
          </table>
          </div>
          <pre><code>{`% Option clash: tikz has already loaded xcolor without options
\\documentclass{article}
\\usepackage{tikz}
\\usepackage[dvipsnames]{xcolor}   % ! Option clash for package xcolor

% Fix: pass the options before anything loads xcolor
\\PassOptionsToPackage{dvipsnames,table}{xcolor}
\\documentclass{article}
\\usepackage{tikz}
\\usepackage{xcolor}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I use \colorbox in LaTeX?</h3>
          <p>
            Load <code>{`\\usepackage{xcolor}`}</code> and write <code>{`\\colorbox{yellow}{text}`}</code>{' '}
            for a coloured background. <code>{`\\fcolorbox{red}{white}{text}`}</code> adds a red frame
            around a white box. The colour can be a name, a mix such as <code>yellow!30</code>, or a
            value: <code>{`\\colorbox[HTML]{FFE08A}{text}`}</code>. A colorbox does not break across
            lines, so wrap long text in a <code>\parbox</code> or use <code>\hl</code> from soul.
          </p>
          <h3>How do I change the text colour in LaTeX?</h3>
          <p>
            Load xcolor and write <code>{`\\textcolor{red}{text}`}</code> for a few words, or{' '}
            <code>{`{\\color{blue} ...}`}</code> to colour everything up to the closing brace. Both
            take any colour name, a mix such as <code>red!70!black</code>, or a colour you defined
            with <code>\definecolor</code>.
          </p>
          <h3>What colours are available in LaTeX?</h3>
          <p>
            xcolor always defines 19 base colours: red, green, blue, cyan, magenta, yellow, black,
            white, gray, darkgray, lightgray, brown, lime, olive, orange, pink, purple, teal and
            violet. The <code>dvipsnames</code> option adds 68 more (ForestGreen, RoyalBlue,
            Maroon), <code>svgnames</code> adds 151 (SteelBlue, Crimson, DarkOrange) and{' '}
            <code>x11names</code> adds 317. Names are case-sensitive.
          </p>
          <h3>How do I use a hex colour code in LaTeX?</h3>
          <p>
            Define it once in the preamble with the HTML model and no # sign:{' '}
            <code>{`\\definecolor{brand}{HTML}{1A73E8}`}</code>. Then use the name anywhere, as in{' '}
            <code>{`\\textcolor{brand}{text}`}</code> or <code>{`\\colorbox{brand!15}{text}`}</code>.
            For a one-off colour, <code>{`\\textcolor[HTML]{1A73E8}{text}`}</code> also works.
          </p>
          <h3>How do I colour a table row or cell in LaTeX?</h3>
          <p>
            Load <code>{`\\usepackage[table]{xcolor}`}</code>, which loads colortbl. Then start a row
            with <code>{`\\rowcolor{gray!20}`}</code>, colour one cell with{' '}
            <code>{`\\cellcolor{green!30}`}</code>, colour a column with{' '}
            <code>{`>{\\columncolor{blue!10}}l`}</code> in the column spec, or alternate rows with{' '}
            <code>{`\\rowcolors{2}{white}{gray!15}`}</code> before the tabular.
          </p>

          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> – Learn text formatting in LaTeX</li>
            <li><Link href="/learn/tables">Tables in LaTeX</Link> – Create tables with colored rows and cells</li>
            <li><Link href="https://www.useoctree.com/blog/colored-boxes-latex-tcolorbox-guide">Colored Boxes with tcolorbox</Link> – Titled, rounded and breakable boxes</li>
            <li><Link href="/learn/framebox">Framed Boxes in LaTeX</Link> – \fbox, \framebox and boxes without colour</li>
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
              Open a color example in Octree and ask AI chat about package options or a color
              definition. Compile the result and check contrast, table shading and PDF links.
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
