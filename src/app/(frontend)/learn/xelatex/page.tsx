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

const breadcrumbs = getLearnBreadcrumbs('XeLaTeX', 'xelatex')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'xelatex',
  title: 'XeLaTeX: Unicode, System Fonts and When to Use It',
  description: 'XeLaTeX vs pdfLaTeX vs LuaLaTeX, system fonts with fontspec and \\setmainfont, Unicode input, polyglossia for RTL languages, xeCJK and common errors.',
  keywords: 'xelatex, xelatex vs pdflatex, xelatex vs lualatex, pdflatex vs xelatex, xelatex fontspec, fontspec, setmainfont, xelatex times new roman, xelatex system fonts, xelatex unicode, xelatex polyglossia, xelatex arabic, xelatex hebrew, xelatex right to left, xecjk, xelatex chinese, xelatex japanese, unicode-math, latexmk xelatex, xelatex synctex, fontspec requires xetex or luatex, fontspec font cannot be found, xelatex missing character, xelatex inputenc',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'What is XeLaTeX?',
    answer:
      'XeLaTeX is LaTeX running on the XeTeX engine instead of pdfTeX. It reads the source as Unicode and can use any OpenType or TrueType font installed on the system through the fontspec package. The LaTeX you write is the same; only the font setup and a few engine-specific packages differ.',
  },
  {
    question: 'Should I use XeLaTeX or pdfLaTeX?',
    answer:
      'Use pdfLaTeX for English and European-language documents with the standard fonts, for journal submissions and for arXiv, which expect it. Use XeLaTeX when you need a specific system font such as Times New Roman or Arial, a non-Latin script such as Arabic, Hebrew, Chinese or Japanese, or a lot of Unicode characters typed directly. LuaLaTeX does the same as XeLaTeX and adds Lua scripting, at some cost in speed.',
  },
  {
    question: 'How do I use Times New Roman in XeLaTeX?',
    answer:
      'Load fontspec and set the main font by name: \\usepackage{fontspec} and \\setmainfont{Times New Roman}, then compile with XeLaTeX or LuaLaTeX. The font must be installed where the document is compiled. On Octree, Times New Roman and Arial are installed; elsewhere, TeX Gyre Termes is a free Times clone that ships with TeX Live.',
  },
  {
    question: 'Do I need \\usepackage[utf8]{inputenc} with XeLaTeX?',
    answer:
      'No. XeLaTeX reads UTF-8 natively, and inputenc is ignored with the warning “inputenc package ignored with utf8 based engines”. Remove it, and remove \\usepackage[T1]{fontenc} as well: fontspec sets up the font encoding itself.',
  },
  {
    question: 'Why do I get “The fontspec package requires either XeTeX or LuaTeX”?',
    answer:
      'The document loads fontspec but was compiled with pdfLaTeX, which cannot load system fonts. Switch the compiler to XeLaTeX (or LuaLaTeX): latexmk -xelatex on the command line, or the compiler setting in your editor. Octree switches to XeLaTeX automatically when the document uses fontspec.',
  },
  {
    question: 'Does SyncTeX work with XeLaTeX?',
    answer:
      'Yes. XeLaTeX writes a .synctex.gz file when you pass -synctex=1, exactly like pdfLaTeX, so clicking in the PDF jumps to the source and back. Most editors pass the option for you; on the command line add it to xelatex or latexmk yourself. Octree compiles with it on every engine for its PDF-to-source sync.',
  },
]

export default async function LearnXelatexPage() {
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
          <h1>XeLaTeX: Unicode, System Fonts and When to Use It</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>What it is:</strong> LaTeX on the XeTeX engine, with native Unicode input and
                any installed OpenType/TrueType font.
              </li>
              <li>
                <strong>Fonts:</strong> <code>{`\\usepackage{fontspec}`}</code> and{' '}
                <code>{`\\setmainfont{Times New Roman}`}</code> (also <code>\setsansfont</code>,{' '}
                <code>\setmonofont</code>).
              </li>
              <li>
                <strong>Languages:</strong> <code>polyglossia</code> (or babel) for hyphenation and
                right-to-left scripts; <code>xeCJK</code> for Chinese, Japanese and Korean.
              </li>
              <li>
                <strong>Drop from pdfLaTeX preambles:</strong>{' '}
                <code>{`\\usepackage[utf8]{inputenc}`}</code> and{' '}
                <code>{`\\usepackage[T1]{fontenc}`}</code>.
              </li>
              <li>
                <strong>Compile:</strong> <code>latexmk -xelatex main.tex</code>. Octree picks
                XeLaTeX automatically when the document uses <code>fontspec</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{fontspec}
\\setmainfont{Times New Roman}

\\begin{document}
Unicode typed directly: café, naïve, Straße, Ελληνικά, Привет, €, ½.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            XeLaTeX is one of the three engines that turn LaTeX into a PDF, alongside pdfLaTeX
            and LuaLaTeX. Its two strengths are Unicode and fonts: you can type any character
            straight into the source and set the document in any font installed on the system,
            which pdfLaTeX cannot do. This guide compares the three engines, shows how to set
            fonts with <code>fontspec</code>, write in other scripts with{' '}
            <code>polyglossia</code> and <code>xeCJK</code>, what to change when moving a
            pdfLaTeX document to XeLaTeX, and how to fix the errors you will meet.
          </p>

          {/* ── comparison ── */}
          <h2>XeLaTeX vs pdfLaTeX vs LuaLaTeX</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>pdfLaTeX</th>
                  <th>XeLaTeX</th>
                  <th>LuaLaTeX</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Input</td><td>UTF-8, but only characters the font encoding covers</td><td>Full Unicode</td><td>Full Unicode</td></tr>
                <tr><td>Fonts</td><td>TeX fonts via packages (<code>lmodern</code>, <code>newtx</code>)</td><td>Any installed OpenType/TrueType font via <code>fontspec</code></td><td>Same as XeLaTeX via <code>fontspec</code></td></tr>
                <tr><td>Non-Latin scripts</td><td>Limited (Cyrillic, Greek with setup)</td><td>Arabic, Hebrew, Indic, CJK and more</td><td>Same, plus advanced shaping control</td></tr>
                <tr><td>Speed</td><td>Fastest</td><td>Fast</td><td>Slowest</td></tr>
                <tr><td><code>microtype</code></td><td>Protrusion and font expansion</td><td>Protrusion only</td><td>Protrusion and font expansion</td></tr>
                <tr><td>Scripting</td><td>No</td><td>No</td><td>Lua inside the document</td></tr>
                <tr><td>Best for</td><td>Journal and arXiv submissions, standard fonts</td><td>System fonts, multilingual and CJK documents</td><td>Like XeLaTeX, plus Lua and complex font features</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The LaTeX markup itself does not change between engines: sections, math, tables and
            references work the same. What changes is the font setup in the preamble and a
            handful of packages tied to one engine. If a document compiles with pdfLaTeX and you
            do not need other fonts or scripts, there is no reason to switch.
          </p>

          {/* ── compiling ── */}
          <h2>How to Compile with XeLaTeX</h2>
          <p>
            On the command line, run <code>xelatex</code> instead of <code>pdflatex</code>, or let{' '}
            <code>latexmk</code> handle the reruns. <code>-synctex=1</code> writes the SyncTeX file
            that links PDF and source, the same as with pdfLaTeX:
          </p>
          <pre><code>{`xelatex -synctex=1 main.tex          # one run
latexmk -xelatex -synctex=1 main.tex  # all runs, plus bibliography`}</code></pre>
          <p>
            In <Link href="https://app.useoctree.com" target="_blank" rel="noopener noreferrer">Octree</Link>{' '}
            there is no setting to change: the compiler scans the project&apos;s <code>.tex</code>,{' '}
            <code>.sty</code> and <code>.cls</code> files and switches to XeLaTeX when it finds{' '}
            <code>{`\\usepackage{fontspec}`}</code>, <code>\setmainfont</code> (or{' '}
            <code>\setsansfont</code>, <code>\setmonofont</code>, <code>\newfontfamily</code>),{' '}
            <code>{`\\usepackage{polyglossia}`}</code>, <code>{`\\usepackage{xeCJK}`}</code>,{' '}
            <code>\setCJKmainfont</code> or <code>{`\\usepackage{unicode-math}`}</code>. LuaLaTeX
            takes precedence when the source uses <code>\directlua</code> or{' '}
            <code>luacode</code>. Anything else, including a document that only uses the{' '}
            <code>ctex</code> classes, compiles with pdfLaTeX; add{' '}
            <code>{`\\usepackage{fontspec}`}</code> to switch it. To print the engine&apos;s
            logo, load <code>metalogo</code> and write <code>\XeLaTeX</code>.
          </p>

          {/* ── fontspec ── */}
          <h2>System Fonts with fontspec</h2>
          <p>
            <code>fontspec</code> loads fonts by their name. Set the three document families once
            in the preamble; bold and italic are found automatically when the font family has
            them:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{fontspec}
\\setmainfont{Times New Roman}      % serif body text
\\setsansfont{Arial}                % \\textsf and sans headings
\\setmonofont{Courier New}          % \\texttt and verbatim

% An extra family with its own command
\\newfontfamily\\headingfont{Arial}[LetterSpace=5]

\\begin{document}
{\\headingfont\\Large REPORT}

Body text in Times New Roman, \\textbf{bold}, \\textit{italic},
\\textsf{sans serif} and \\texttt{monospaced}.
\\end{document}`}</code></pre>
          <p>
            A font name works only if the font is installed where the document compiles. On
            Octree, the Microsoft core fonts (Times New Roman, Arial, Courier New, Georgia,
            Verdana) and the TeX Gyre and Noto families, including Noto CJK, are installed, and
            any font in TeX Live can be loaded by its file name. To use a font that is not
            available, upload the font files to the project and load them by file name with{' '}
            <code>Path</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{fontspec}

% Loading by file name. For files uploaded to the project, add Path=./fonts/
\\setmainfont{texgyretermes}[
  Extension      = .otf,
  UprightFont    = *-regular,
  BoldFont       = *-bold,
  ItalicFont     = *-italic,
  BoldItalicFont = *-bolditalic,
  Numbers        = OldStyle,
]

\\begin{document}
TeX Gyre Termes, a free Times clone, with old-style figures: 1234567890.
\\textbf{Bold} and \\textit{italic} come from the files named above.
\\end{document}`}</code></pre>
          <p>
            Font features go in the brackets after the name: <code>Numbers=OldStyle</code>,{' '}
            <code>Scale=MatchLowercase</code> to match a second font&apos;s x-height,{' '}
            <code>Color=blue</code>, <code>LetterSpace=5</code>. For sizes, the usual commands
            still apply; see <Link href="/learn/font-size">font size</Link>.
          </p>

          {/* ── Unicode ── */}
          <h2>Unicode Input and Math</h2>
          <p>
            With XeLaTeX the source file is read as UTF-8 and every character goes straight to
            the font. Accented letters, Greek, Cyrillic, symbols such as € and ½ can be typed
            directly, as long as the font has them. Latin Modern, the default, covers
            Latin-script languages but not Greek, Cyrillic, Chinese or Arabic; for those, set a
            font that has them, such as Times New Roman or Noto Serif. For math in Unicode, <code>unicode-math</code>{' '}
            replaces the old math fonts with an OpenType math font and lets you type symbols such
            as α, ≤ or ∫ in math mode:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{unicode-math}
\\setmathfont{latinmodern-math.otf}   % or {STIX Two Math}, {TeX Gyre Termes Math}

\\begin{document}
Unicode in text: Ångström, Dvořák, Łódź, Þórr, œuvre.

Unicode in math: $α + β ≤ ∑_{i=1}^{n} x_i^2$ and $∫_0^1 f(x)\\,dx ≠ ∞$.

The same with commands: $\\alpha + \\beta \\le \\sum_{i=1}^{n} x_i^2$.
\\end{document}`}</code></pre>
          <p>
            Load <code>unicode-math</code> after amsmath and do not load <code>amssymb</code> or
            other math font packages with it; the OpenType math font already contains those
            symbols. For the commands behind each symbol, see{' '}
            <Link href="/learn/greek-letters-math-symbols">Greek letters and math symbols</Link>.
          </p>

          {/* ── polyglossia ── */}
          <h2>Languages and Right-to-Left Text: polyglossia</h2>
          <p>
            <code>polyglossia</code> sets hyphenation, captions (&ldquo;Inhaltsverzeichnis&rdquo;
            for German) and text direction for each language. For a script that the main font
            lacks, give the language its own font with <code>\newfontfamily</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{fontspec}
\\usepackage{polyglossia}
\\setdefaultlanguage{english}
\\setotherlanguages{arabic,german}
\\newfontfamily\\arabicfont[Script=Arabic]{Amiri-Regular.ttf}

\\begin{document}
English text with a German phrase: \\textgerman{Grüße aus München}.

\\begin{Arabic}
مرحبا بالعالم. هذا نص عربي من اليمين إلى اليسار.
\\end{Arabic}

Inline Arabic: \\textarabic{السلام عليكم}.
\\end{document}`}</code></pre>
          <p>
            Babel works with XeLaTeX too and is now the more actively developed option; its{' '}
            <code>{`\\babelprovide`}</code> and <code>{`\\babelfont`}</code> commands do the same job.
            Pick one of the two, not both.
          </p>

          {/* ── xeCJK ── */}
          <h2>Chinese, Japanese and Korean: xeCJK</h2>
          <p>
            <code>xeCJK</code> handles CJK text inside a Latin document: it switches font
            automatically for CJK characters and applies the right line-breaking rules. Set a CJK
            font with <code>\setCJKmainfont</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{xeCJK}
\\setCJKmainfont{FandolSong-Regular.otf}   % on Octree also {Noto Serif CJK SC}

\\begin{document}
English and 中文 in the same paragraph. 这是一个使用 XeLaTeX 编译的中文示例，
标点符号和换行由 xeCJK 处理。
\\end{document}`}</code></pre>
          <p>
            For a document mainly in Chinese, the <code>ctex</code> classes (
            <code>{`\\documentclass{ctexart}`}</code>) build on xeCJK and also translate headings
            and dates. Without a CJK font, XeLaTeX does not stop: it writes &ldquo;Missing
            character: There is no 中 (U+4E2D) in font&rdquo; to the log and leaves a gap.
          </p>

          {/* ── what breaks ── */}
          <h2>What Breaks When You Switch from pdfLaTeX</h2>
          <p>
            Most documents compile unchanged. These are the parts of a pdfLaTeX preamble to
            remove or replace:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>pdfLaTeX preamble</th>
                  <th>Under XeLaTeX</th>
                  <th>Do instead</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\usepackage[utf8]{inputenc}`}</code></td><td>Ignored, with a warning</td><td>Remove it</td></tr>
                <tr><td><code>{`\\usepackage[T1]{fontenc}`}</code></td><td>Switches back to 8-bit TeX fonts</td><td>Remove it; fontspec sets the encoding</td></tr>
                <tr><td><code>{`\\usepackage{times}`}</code>, <code>mathptmx</code>, <code>lmodern</code></td><td>Work, but bypass fontspec</td><td><code>{`\\setmainfont{...}`}</code>; <code>unicode-math</code> for math</td></tr>
                <tr><td><code>{`\\usepackage[pdftex]{graphicx}`}</code>, <code>[pdftex]{`{hyperref}`}</code></td><td>Errors: the pdftex driver needs pdfTeX</td><td>Drop the driver option; it is detected</td></tr>
                <tr><td><code>\pdf...</code> primitives such as <code>\pdfminorversion</code></td><td>Undefined control sequence</td><td>Remove, or test the engine with the <code>iftex</code> package</td></tr>
                <tr><td><code>microtype</code> font expansion</td><td>Not available</td><td>Protrusion still works; use LuaLaTeX if you need expansion</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            To keep one source that compiles with either engine, branch on the engine with{' '}
            <code>iftex</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{iftex}
\\ifPDFTeX
  \\usepackage[T1]{fontenc}
  \\usepackage{lmodern}
\\else
  \\usepackage{fontspec}       % XeLaTeX or LuaLaTeX
  \\setmainfont{texgyretermes}[Extension=.otf, UprightFont=*-regular,
    BoldFont=*-bold, ItalicFont=*-italic, BoldItalicFont=*-bolditalic]
\\fi

\\begin{document}
This compiles with pdfLaTeX, XeLaTeX and LuaLaTeX.
\\end{document}`}</code></pre>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
          <div className="overflow-x-auto">
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
                  <td><em>Fatal Package fontspec Error: The fontspec package requires either XeTeX or LuaTeX</em></td>
                  <td>The document was compiled with pdfLaTeX</td>
                  <td>Compile with XeLaTeX or LuaLaTeX (<code>latexmk -xelatex</code>); Octree switches automatically</td>
                </tr>
                <tr>
                  <td><em>Package fontspec Error: The font &ldquo;Times New Roman&rdquo; cannot be found</em></td>
                  <td>The font is not installed on the machine that compiles, or the name is misspelled</td>
                  <td>Check the exact name (<code>fc-list</code> on Linux), upload the font files and load them with <code>Path</code>, or use a TeX Live font such as TeX Gyre Termes</td>
                </tr>
                <tr>
                  <td><em>Missing character: There is no 中 (U+4E2D) in font &hellip;</em> (in the log, gaps in the PDF)</td>
                  <td>The current font has no glyph for that character</td>
                  <td>Pick a font that covers the script: <code>xeCJK</code> with a CJK font, <code>\newfontfamily</code> for Arabic or Hebrew</td>
                </tr>
                <tr>
                  <td><em>Package inputenc Warning: inputenc package ignored with utf8 based engines</em></td>
                  <td><code>inputenc</code> left over from a pdfLaTeX preamble</td>
                  <td>Remove the line</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> inside <code>graphicx</code>, or <em>hyperref Error: Wrong driver option `pdftex&apos;</em></td>
                  <td>An explicit <code>pdftex</code> driver option</td>
                  <td>Remove the option: <code>{`\\usepackage{graphicx}`}</code>, <code>{`\\usepackage{hyperref}`}</code></td>
                </tr>
                <tr>
                  <td>Bold or italic falls back to regular</td>
                  <td>The font family has no bold or italic file under the name fontspec expects</td>
                  <td>Name the files: <code>{`[BoldFont=..., ItalicFont=...]`}</code></td>
                </tr>
                <tr>
                  <td>Compilation is slow on the first run</td>
                  <td>XeLaTeX builds its font cache</td>
                  <td>Later runs are faster; nothing to fix</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What is XeLaTeX?</h3>
          <p>
            XeLaTeX is LaTeX running on the XeTeX engine instead of pdfTeX. It reads the source as
            Unicode and can use any OpenType or TrueType font installed on the system through the
            fontspec package. The LaTeX you write is the same; only the font setup and a few
            engine-specific packages differ.
          </p>
          <h3>Should I use XeLaTeX or pdfLaTeX?</h3>
          <p>
            Use pdfLaTeX for English and European-language documents with the standard fonts, for
            journal submissions and for arXiv, which expect it. Use XeLaTeX when you need a
            specific system font such as Times New Roman or Arial, a non-Latin script such as
            Arabic, Hebrew, Chinese or Japanese, or a lot of Unicode characters typed directly.
            LuaLaTeX does the same as XeLaTeX and adds Lua scripting, at some cost in speed.
          </p>
          <h3>How do I use Times New Roman in XeLaTeX?</h3>
          <p>
            Load fontspec and set the main font by name: <code>{`\\usepackage{fontspec}`}</code> and{' '}
            <code>{`\\setmainfont{Times New Roman}`}</code>, then compile with XeLaTeX or LuaLaTeX.
            The font must be installed where the document is compiled. On Octree, Times New Roman
            and Arial are installed; elsewhere, TeX Gyre Termes is a free Times clone that ships
            with TeX Live.
          </p>
          <h3>Do I need \usepackage[utf8]{`{inputenc}`} with XeLaTeX?</h3>
          <p>
            No. XeLaTeX reads UTF-8 natively, and inputenc is ignored with the warning
            &ldquo;inputenc package ignored with utf8 based engines&rdquo;. Remove it, and remove{' '}
            <code>{`\\usepackage[T1]{fontenc}`}</code> as well: fontspec sets up the font encoding
            itself.
          </p>
          <h3>Why do I get &ldquo;The fontspec package requires either XeTeX or LuaTeX&rdquo;?</h3>
          <p>
            The document loads fontspec but was compiled with pdfLaTeX, which cannot load system
            fonts. Switch the compiler to XeLaTeX (or LuaLaTeX): <code>latexmk -xelatex</code> on
            the command line, or the compiler setting in your editor. Octree switches to XeLaTeX
            automatically when the document uses fontspec.
          </p>
          <h3>Does SyncTeX work with XeLaTeX?</h3>
          <p>
            Yes. XeLaTeX writes a <code>.synctex.gz</code> file when you pass{' '}
            <code>-synctex=1</code>, exactly like pdfLaTeX, so clicking in the PDF jumps to the
            source and back. Most editors pass the option for you; on the command line add it to
            xelatex or latexmk yourself. Octree compiles with it on every engine for its
            PDF-to-source sync.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/font-size">LaTeX Font Size</Link> &ndash; Size commands that work with any engine</li>
            <li><Link href="/learn/special-characters">Special Characters</Link> &ndash; Accents and symbols, with and without Unicode</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> &ndash; Commands behind the Unicode symbols</li>
            <li><Link href="/learn/commands-macros">LaTeX Commands and Macros</Link> &ndash; \newcommand, \renewcommand and \def</li>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics and Underline</Link> &ndash; Font styles inside the text</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile a snippet and see the PDF instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">XeLaTeX without the setup</h3>
            <p className="text-muted-foreground mb-4">
              Octree detects fontspec and compiles with XeLaTeX automatically, with Times New
              Roman, Arial and Noto CJK installed. Its AI editor fixes font and engine errors for
              you.
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
