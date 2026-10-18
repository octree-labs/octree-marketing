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

const breadcrumbs = getLearnBreadcrumbs('Special Characters in LaTeX', 'special-characters')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'special-characters',
  title: 'Special Characters in LaTeX: Underscore, Tilde, Pipe, Percent, Dollar, Hash',
  seoTitle: 'Special Characters in LaTeX: _ ~ | % $ # and More',
  description: 'How to print LaTeX\'s reserved characters # $ % & _ { } ~ ^ \\, the pipe, < and >, underscores in URLs, inverted ?/!, degree and currency signs, and errors.',
  keywords: 'underscore in latex, latex underscore, latex vertical line, latex pipe symbol, tilde in latex, latex tilde, latex percent sign, latex dollar sign, latex hashtag, latex hash symbol, latex backslash, latex braces, latex curly braces text, latex ampersand, latex caret, latex special characters, latex reserved characters, latex question mark upside down, latex less than, latex greater than, latex degree symbol, latex copyright symbol, latex euro symbol',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do I type an underscore in LaTeX?',
    answer:
      'Write \\_ in text or math. A bare _ is the subscript operator and gives "Missing $ inserted" in text. In URLs use \\url{...} from hyperref or url, and in file names or code use \\verb|file_name| or \\texttt{file\\_name}.',
  },
  {
    question: 'How do I write a tilde (~) in LaTeX?',
    answer:
      'Use \\textasciitilde for a proper tilde character. A bare ~ is a non-breaking space, and \\~{} produces a small raised tilde accent, which is usually not what you want. In math mode, \\sim gives the "similar to" relation.',
  },
  {
    question: 'How do I get a vertical bar or pipe in LaTeX?',
    answer:
      'In math mode type | directly, or use \\lvert ... \\rvert from amsmath for absolute values and \\mid for the "such that" or "divides" relation. In text use \\textbar; with the default OT1 font encoding, a bare | in text prints as an em dash.',
  },
  {
    question: 'Why does a percent sign make my text disappear?',
    answer:
      'Because % starts a comment: LaTeX ignores everything from the % to the end of the line. Write \\% to print a percent sign. If the comment swallows a closing brace you get "Runaway argument?" or "File ended while scanning use of ...".',
  },
  {
    question: 'How do I write less-than and greater-than signs in text?',
    answer:
      'Use \\textless and \\textgreater, or switch to the T1 font encoding with \\usepackage[T1]{fontenc} and type < and > directly. With the default OT1 encoding they print as inverted exclamation and question marks. In math mode, $<$ and $>$ always work.',
  },
  {
    question: 'How do I print a backslash in LaTeX?',
    answer:
      'Use \\textbackslash in text and \\backslash in math. The sequence \\\\ is a line break, not a backslash. For a backslash in code or a file path, \\verb|C:\\path| or the listings package is simpler.',
  },
]

export default async function LaTeXSpecialCharactersPage() {
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
          <h1>Special Characters in LaTeX: Underscore, Tilde, Pipe, Percent, Dollar, Hash</h1>
          <p className="lead">
            Ten characters have a special meaning in LaTeX source: <code>#</code>,{' '}
            <code>$</code>, <code>%</code>, <code>&amp;</code>, <code>_</code>,{' '}
            <code>{'{'}</code>, <code>{'}'}</code>, <code>~</code>, <code>^</code> and{' '}
            <code>\</code>. Type one of them as ordinary text and you get a comment, a
            subscript, a table column or an error instead of the character. This guide shows how
            to print each one, how to handle the pipe, angle brackets and quotes, how to put
            underscores in URLs and file names, and how to typeset the degree, copyright,
            section, currency and inverted punctuation signs that are not on the keyboard.
          </p>

          {/* ── Reserved characters ── */}
          <h2>The Ten Reserved Characters</h2>
          <p>
            Seven of the ten are printed by putting a backslash in front of them. The other
            three (<code>~</code>, <code>^</code> and <code>\</code>) are different, because{' '}
            <code>\~</code> and <code>\^</code> are accent commands and <code>\\</code> is a line
            break, so they have named commands instead:
          </p>
          <table>
            <thead>
              <tr>
                <th>Character</th>
                <th>Meaning in LaTeX source</th>
                <th>To print it</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>#</code></td><td>Macro parameter (<code>#1</code>)</td><td><code>\#</code></td></tr>
              <tr><td><code>$</code></td><td>Starts and ends inline math</td><td><code>\$</code></td></tr>
              <tr><td><code>%</code></td><td>Comment to the end of the line</td><td><code>\%</code></td></tr>
              <tr><td><code>&amp;</code></td><td>Column separator in tables and align</td><td><code>\&amp;</code></td></tr>
              <tr><td><code>_</code></td><td>Subscript (math only)</td><td><code>\_</code></td></tr>
              <tr><td><code>{'{'}</code> <code>{'}'}</code></td><td>Grouping and command arguments</td><td><code>{`\\{`}</code> <code>{`\\}`}</code></td></tr>
              <tr><td><code>~</code></td><td>Non-breaking space</td><td><code>\textasciitilde</code></td></tr>
              <tr><td><code>^</code></td><td>Superscript (math only)</td><td><code>\textasciicircum</code></td></tr>
              <tr><td><code>\</code></td><td>Starts every command</td><td><code>\textbackslash</code></td></tr>
            </tbody>
          </table>
          <pre><code>{`\\# \\$ \\% \\& \\_ \\{ \\} \\textasciitilde{} \\textasciicircum{} \\textbackslash{}

50\\% of \\$100 is \\$50. Item \\#3. Tom \\& Jerry. my\\_file. \\{braces\\}.`}</code></pre>
          <p>
            The empty braces after <code>\textasciitilde{'{}'}</code> and the other word-like
            commands matter when text follows: a command name made of letters swallows the space
            after it, so <code>\textbackslash n</code> prints <code>\n</code> with no gap, while{' '}
            <code>{`\\textbackslash{} n`}</code> keeps the space. The single-character commands
            such as <code>\%</code> do not have this problem.
          </p>
          <p>
            All of these work in math mode too. <code>$x\_y$</code> prints an underscore between
            the letters where <code>$x_y$</code> would set <em>y</em> as a subscript, and{' '}
            <code>{`$\\{1, 2, 3\\}$`}</code> gives the braces of a set.
          </p>

          {/* ── Tilde, caret, backslash ── */}
          <h2>Tilde, Caret and Backslash in Detail</h2>
          <p>
            These three cause the most confusion because there are several similar commands and
            only one is right for a given job:
          </p>
          <pre><code>{`Tilde:     \\textasciitilde{}   % proper ~ character
           \\~{}                % a small accent-sized tilde, raised
           $\\sim$              % math "similar to" relation
           Fig.~3              % bare ~ is a non-breaking space, nothing printed

Caret:     \\textasciicircum{}  % proper ^ character
           \\^{}                % a small circumflex accent
           $x^2$               % superscript in math

Backslash: \\textbackslash{}    % in text
           $\\backslash$        % in math
           $A \\setminus B$     % set difference, with relation spacing`}</code></pre>
          <p>
            Many older answers suggest <code>\~{'{}'}</code> and <code>\^{'{}'}</code> for the
            tilde and caret. They compile, but they produce the accent glyphs, which are smaller
            and sit above the baseline. Use <code>\textasciitilde</code> and{' '}
            <code>\textasciicircum</code> for the characters themselves; the output is also
            correct when copied from the PDF. For a tilde in a URL or path, see the section on{' '}
            <code>\url</code> below.
          </p>

          {/* ── Pipe ── */}
          <h2>The Vertical Bar (Pipe)</h2>
          <p>
            <code>|</code> is not reserved, but it is still a trap. In math mode it works as
            typed. In text mode with the default OT1 font encoding, the <code>|</code> slot of the
            Computer Modern font holds an em dash, so <code>a|b</code> prints as{' '}
            <em>a&mdash;b</em>. The same encoding quirk turns <code>&lt;</code> and{' '}
            <code>&gt;</code> into inverted exclamation and question marks. There are two fixes:
            use the named commands, or switch to T1 encoding, which puts the ASCII characters in
            their expected places.
          </p>
          <pre><code>{`\\usepackage[T1]{fontenc}   % then | < > work directly in text

\\textbar{} in text, \\textless{} and \\textgreater{} work in any encoding.

$|x|$                     % plain bars, ordinary symbols
$\\lvert x \\rvert$          % amsmath: correct open/close spacing
$\\{\\, x \\mid x > 0 \\,\\}$    % \\mid is the relation "such that" or "divides"
$a \\vert b$                % \\vert is the same as |
$\\| v \\|$                   % double bar, same as \\Vert
$\\lVert v \\rVert$          % amsmath norm with correct spacing`}</code></pre>
          <p>
            The difference between <code>|</code> and <code>\lvert ... \rvert</code> is spacing.
            TeX treats <code>|</code> as an ordinary symbol, so it cannot tell an opening bar
            from a closing one, and expressions such as <code>$|{'-'}x|$</code> get uneven space
            around the minus sign. <code>\lvert</code> and <code>\rvert</code> from amsmath are
            declared as opening and closing delimiters and also work with <code>\left</code> and{' '}
            <code>\right</code>. Use <code>\mid</code> when the bar is a relation, as in
            set-builder notation and conditional probability <code>$P(A \mid B)$</code>. The
            full set of delimiters, with sizing, is in our{' '}
            <Link href="/learn/brackets">brackets and parentheses guide</Link> and in the{' '}
            <Link href="https://tools.useoctree.com/symbols/brackets" target="_blank" rel="noopener noreferrer">brackets symbol reference</Link>.
          </p>

          {/* ── Quotes ── */}
          <h2>Quotation Marks</h2>
          <p>
            The straight double quote <code>&quot;</code> on the keyboard is not reserved, but it
            prints a closing quote in both positions. LaTeX builds opening quotes from backticks:{' '}
            <code>``double&apos;&apos;</code> and <code>`single&apos;</code>. The{' '}
            <code>csquotes</code> package&apos;s <code>\enquote</code> handles nesting and
            language conventions automatically. This has its own guide:{' '}
            <Link href="/learn/quotes">quotation marks in LaTeX</Link>.
          </p>

          {/* ── verb and url ── */}
          <h2>Verbatim Text, URLs and File Names</h2>
          <p>
            When a whole string is full of special characters, escaping each one is tedious and
            error-prone. Three tools print text exactly as typed:
          </p>
          <pre><code>{`\\usepackage{hyperref}      % provides \\url (or \\usepackage{url} for \\url only)

\\verb|# $ % & _ { } ~ ^ \\|    % inline, any delimiter that is not in the text
\\verb+a|b+                   % use + when the text contains |

\\begin{verbatim}
# $ % & _ { } ~ ^ \\
\\end{verbatim}

\\url{https://example.com/my_page?a=1&b=2#top}
\\url{~user/file_name.txt}

\\texttt{my\\_file.tex}        % escaped by hand, in typewriter font`}</code></pre>
          <ul>
            <li>
              <code>\verb</code> takes any character as its delimiter and repeats it to close.
              It cannot be used inside the argument of another command (a footnote, caption or
              section title); use <code>\texttt</code> with escaped characters there, or{' '}
              <code>\cprotect</code> from the cprotect package.
            </li>
            <li>
              <code>\url</code> prints the address in typewriter font, allows line breaks after
              slashes and dots, and makes it clickable when hyperref is loaded. Underscores,
              tildes, percent signs, hashes and ampersands need no escaping inside it. The
              exception is <code>\url</code> inside the argument of another command (a footnote
              or caption), where <code>%</code> and <code>#</code> lose their protection; move the
              address out with <code>\urldef</code> or escape those two characters there. <code>\href{'{url}{text}'}</code>{' '}
              is the same for linked text, covered in the{' '}
              <Link href="/learn/hyperlinks">hyperlinks guide</Link>.
            </li>
            <li>
              For code listings, the <code>listings</code> or <code>minted</code> packages give
              verbatim blocks with syntax highlighting.
            </li>
          </ul>
          <p>
            If a document has many underscores in plain prose, the <code>underscore</code>{' '}
            package makes a bare <code>_</code> print as an underscore in text while keeping its
            subscript meaning in math. It can interfere with packages that parse underscores in
            arguments (file names passed to <code>\includegraphics</code>, for example), so
            prefer <code>\_</code> unless the count is overwhelming. <code>\textunderscore</code>{' '}
            is the long name of the same character as <code>\_</code>.
          </p>

          {/* ── Inverted punctuation ── */}
          <h2>Inverted Question and Exclamation Marks</h2>
          <p>
            Spanish-style <em>&iquest;</em> and <em>&iexcl;</em> are ligatures built from a
            question or exclamation mark followed by a backtick, and also have named commands:
          </p>
          <pre><code>{`?\`Qu\\'e tal? !\`Hola!
\\textquestiondown Qu\\'e tal? \\textexclamdown Hola!`}</code></pre>
          <p>
            The ligature form (<code>?`</code> and <code>!`</code>) works in the standard Computer
            Modern fonts and in T1 encoding. With babel or polyglossia and Spanish selected, the
            characters <em>&iquest;</em> and <em>&iexcl;</em> can also be typed directly in a
            UTF-8 file.
          </p>

          {/* ── Symbols ── */}
          <h2>Degree, Copyright, Section, Currency and Other Signs</h2>
          <p>
            These symbols are available in any document; the ones that used to need{' '}
            <code>\usepackage{'{textcomp}'}</code> have been part of the LaTeX kernel since the
            2020 release, and loading textcomp is harmless on older installations:
          </p>
          <pre><code>{`\\usepackage[T1]{fontenc}
\\usepackage{eurosym}        % only for \\euro; \\texteuro needs no package

90\\textdegree{} and 20\\textcelsius{}
\\textregistered{} \\copyright{} \\texttrademark{}
\\S\\,3 and \\P\\,2            % section and paragraph (pilcrow) signs
\\dag{} \\ddag{}               % dagger and double dagger
\\pounds{}5 \\texteuro{}5 \\euro{5} \\textyen{} \\textcent{}
\\textbullet{} \\textperiodcentered{} \\textendash{} \\textemdash{} \\textellipsis{} \\dots`}</code></pre>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Command</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>&deg;</td><td><code>\textdegree</code></td><td>Math: <code>{`$90^{\\circ}$`}</code>; the <code>siunitx</code> package gives <code>{`\\ang{90}`}</code> and <code>{`\\qty{20}{\\celsius}`}</code></td></tr>
              <tr><td>&reg;</td><td><code>\textregistered</code></td><td></td></tr>
              <tr><td>&copy;</td><td><code>\copyright</code></td><td></td></tr>
              <tr><td>&trade;</td><td><code>\texttrademark</code></td><td></td></tr>
              <tr><td>&sect;</td><td><code>\S</code></td><td>Section sign</td></tr>
              <tr><td>&para;</td><td><code>\P</code></td><td>Pilcrow</td></tr>
              <tr><td>&dagger; &Dagger;</td><td><code>\dag</code>, <code>\ddag</code></td><td>Also <code>\dagger</code>, <code>\ddagger</code> in math</td></tr>
              <tr><td>&pound;</td><td><code>\pounds</code></td><td>Same as <code>\textsterling</code></td></tr>
              <tr><td>&euro;</td><td><code>\texteuro</code></td><td>Glyph depends on the font; <code>\euro</code> from <code>eurosym</code> draws its own</td></tr>
              <tr><td>&yen; &cent;</td><td><code>\textyen</code>, <code>\textcent</code></td><td></td></tr>
              <tr><td>&bull; &middot;</td><td><code>\textbullet</code>, <code>\textperiodcentered</code></td><td>Math: <code>\bullet</code>, <code>\cdot</code></td></tr>
              <tr><td>&ndash; &mdash;</td><td><code>--</code>, <code>---</code></td><td>Also <code>\textendash</code>, <code>\textemdash</code></td></tr>
              <tr><td>&hellip;</td><td><code>\dots</code></td><td>Math: <code>\ldots</code>, <code>\cdots</code></td></tr>
            </tbody>
          </table>
          <p>
            Under XeLaTeX or LuaLaTeX with <code>fontspec</code>, every one of these can also be
            typed directly as a Unicode character, provided the chosen font contains the glyph.
            Under pdfLaTeX, a UTF-8 file can contain the common ones (&deg;, &copy;, &pound;,{' '}
            &euro;, accented letters) and they are translated to the commands above; a character
            that has no mapping stops with <em>Unicode character ... not set up for use with
            LaTeX</em>. Greek letters and math symbols have their own reference in the{' '}
            <Link href="/learn/greek-letters-math-symbols">Greek letters and math symbols guide</Link>{' '}
            and the <Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">symbols reference</Link>.
          </p>

          {/* ── Ampersand and hash in context ── */}
          <h2>Ampersand and Hash in Tables and Macros</h2>
          <p>
            Two of the reserved characters are reserved for a reason you will use constantly:{' '}
            <code>&amp;</code> separates the columns of a <code>tabular</code> or an{' '}
            <code>align</code>, and <code>#1</code> to <code>#9</code> stand for the arguments of
            a macro. Inside those structures the characters do their job; everywhere else they
            need the backslash:
          </p>
          <pre><code>{`\\begin{tabular}{ll}
  Tom \\& Jerry & cartoon \\\\      % \\& prints, & separates
  R\\&D         & department \\\\
\\end{tabular}

\\newcommand{\\twice}[1]{#1 #1}    % #1 is the argument
\\twice{hi}                        % hi hi
\\newcommand{\\hashtag}[1]{\\##1}   % prints #tag`}</code></pre>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
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
                <td><em>Missing $ inserted</em></td>
                <td>A bare <code>_</code> or <code>^</code> in text, which LaTeX reads as a subscript or superscript and tries to enter math mode for</td>
                <td>Write <code>\_</code> or <code>\textasciicircum</code>; for file names use <code>\verb</code> or <code>\url</code></td>
              </tr>
              <tr>
                <td><em>Misplaced alignment tab character &amp;</em></td>
                <td>A bare <code>&amp;</code> outside a table or align</td>
                <td>Write <code>\&amp;</code>; in a bibliography entry, escape it in the <code>.bib</code> file too</td>
              </tr>
              <tr>
                <td><em>You can&apos;t use `macro parameter character #&apos; in horizontal mode</em></td>
                <td>A bare <code>#</code> in text</td>
                <td>Write <code>\#</code></td>
              </tr>
              <tr>
                <td><em>Illegal parameter number in definition of \foo</em></td>
                <td><code>#</code> inside a <code>\newcommand</code> body that is not a valid argument number</td>
                <td>Use <code>\#</code> for a literal hash, and only <code>#1</code>…<code>#n</code> with n declared in <code>[n]</code></td>
              </tr>
              <tr>
                <td>Text vanishes after a certain word, or <em>Runaway argument?</em> / <em>File ended while scanning use of ...</em></td>
                <td>A bare <code>%</code> commented out the rest of the line, often including a closing brace</td>
                <td>Write <code>\%</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence</em> pointing at a backslash followed by text</td>
                <td>A bare <code>\</code> in a path or expression read as a command, e.g. <code>C:\Users</code></td>
                <td>Use <code>\textbackslash</code> or put the path in <code>\verb</code></td>
              </tr>
              <tr>
                <td><em>Too many {'}'}&apos;s</em> or <em>Missing {'}'} inserted</em></td>
                <td>Unbalanced braces, often from <code>{'{'}</code> or <code>{'}'}</code> meant as literal characters</td>
                <td>Write <code>{`\\{`}</code> and <code>{`\\}`}</code></td>
              </tr>
              <tr>
                <td>A dash where a pipe should be; &iexcl; or &iquest; instead of &lt; or &gt;</td>
                <td>OT1 font encoding in text mode</td>
                <td><code>\textbar</code>, <code>\textless</code>, <code>\textgreater</code>, or <code>{`\\usepackage[T1]{fontenc}`}</code></td>
              </tr>
              <tr>
                <td>Words glued together after a command: <em>\textbackslash n</em> prints <em>\n</em></td>
                <td>The command name swallowed the following space</td>
                <td>Add <code>{'{}'}</code> or <code>\ </code> after the command</td>
              </tr>
              <tr>
                <td><em>\verb ended by end of line</em> or <em>\verb illegal in command argument</em></td>
                <td><code>\verb</code> inside a footnote, caption, section title or macro argument</td>
                <td>Escape by hand inside <code>\texttt</code>, or use the <code>cprotect</code> package</td>
              </tr>
              <tr>
                <td>A mysterious space is missing or no line break happens between two words</td>
                <td>A bare <code>~</code> where a tilde was meant</td>
                <td>Write <code>\textasciitilde</code></td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath, amssymb}
\\usepackage{hyperref}

\\begin{document}

\\section{Reserved characters}
Escaped: \\# \\$ \\% \\& \\_ \\{ \\} \\textasciitilde{} \\textasciicircum{} \\textbackslash{}

A 50\\% discount on a \\$20 item saves \\$10 (see item \\#4, R\\&D budget).

\\section{Pipes and angle brackets}
In text: \\textbar{} \\textless{} \\textgreater{} (or | < > with T1 encoding).
In math: $\\lvert x \\rvert$, $\\{\\, n \\in \\mathbb{N} \\mid n > 0 \\,\\}$, $\\lVert v \\rVert$.

\\section{URLs, paths and code}
Source: \\url{https://example.com/data_set?id=7&v=2#results} \\\\
Path: \\verb|C:\\Users\\me\\my_file.tex| \\\\
Macro: \\texttt{\\textbackslash newcommand\\{\\textbackslash foo\\}[1]\\{\\#1\\}}

\\section{Symbols}
90\\textdegree{} \\quad \\copyright{} 2026 \\quad \\textregistered{} \\quad \\texttrademark{} \\quad
\\S\\,2 \\quad \\P\\,3 \\quad \\dag{} \\quad \\pounds{}5 \\quad \\texteuro{}5 \\quad
?\`Por qu\\'e? \\quad !\`Claro!

\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Character</th>
                <th>Text mode</th>
                <th>Math mode</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>#</td><td><code>\#</code></td><td><code>\#</code></td></tr>
              <tr><td>$</td><td><code>\$</code></td><td><code>\$</code></td></tr>
              <tr><td>%</td><td><code>\%</code></td><td><code>\%</code></td></tr>
              <tr><td>&amp;</td><td><code>\&amp;</code></td><td><code>\&amp;</code></td></tr>
              <tr><td>_</td><td><code>\_</code>, <code>\textunderscore</code></td><td><code>\_</code> (bare <code>_</code> is a subscript)</td></tr>
              <tr><td>{'{ }'}</td><td><code>{`\\{ \\}`}</code></td><td><code>{`\\{ \\}`}</code>, <code>\lbrace \rbrace</code></td></tr>
              <tr><td>~</td><td><code>\textasciitilde</code></td><td><code>\sim</code> (relation), <code>\tilde{'{x}'}</code> (accent)</td></tr>
              <tr><td>^</td><td><code>\textasciicircum</code></td><td><code>\hat{'{x}'}</code> (accent), <code>\wedge</code> (logic)</td></tr>
              <tr><td>\</td><td><code>\textbackslash</code></td><td><code>\backslash</code>, <code>\setminus</code></td></tr>
              <tr><td>|</td><td><code>\textbar</code></td><td><code>|</code>, <code>\lvert \rvert</code>, <code>\mid</code>, <code>\|</code></td></tr>
              <tr><td>&lt; &gt;</td><td><code>\textless</code>, <code>\textgreater</code></td><td><code>&lt;</code>, <code>&gt;</code></td></tr>
              <tr><td>&quot; &quot;</td><td><code>``...&apos;&apos;</code> or <code>\enquote</code></td><td><code>\text{'{``...\'\'}'}</code></td></tr>
              <tr><td>&iquest; &iexcl;</td><td><code>?`</code>, <code>!`</code>, <code>\textquestiondown</code>, <code>\textexclamdown</code></td><td></td></tr>
              <tr><td>&deg;</td><td><code>\textdegree</code></td><td><code>^\circ</code></td></tr>
              <tr><td>&copy; &reg; &trade;</td><td><code>\copyright</code>, <code>\textregistered</code>, <code>\texttrademark</code></td><td></td></tr>
              <tr><td>&sect; &para; &dagger; &Dagger;</td><td><code>\S</code>, <code>\P</code>, <code>\dag</code>, <code>\ddag</code></td><td><code>\dagger</code>, <code>\ddagger</code></td></tr>
              <tr><td>&pound; &euro;</td><td><code>\pounds</code>, <code>\texteuro</code> / <code>\euro</code> (eurosym)</td><td></td></tr>
              <tr><td>Literal string</td><td><code>\verb|...|</code>, <code>\url{'{...}'}</code></td><td></td></tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I type an underscore in LaTeX?</h3>
          <p>
            Write <code>\_</code> in text or math. A bare <code>_</code> is the subscript
            operator and gives <em>Missing $ inserted</em> in text. In URLs use{' '}
            <code>\url{'{...}'}</code> from hyperref or url, and in file names or code use{' '}
            <code>\verb|file_name|</code> or <code>\texttt{'{file\\_name}'}</code>.
          </p>
          <h3>How do I write a tilde (~) in LaTeX?</h3>
          <p>
            Use <code>\textasciitilde</code> for a proper tilde character. A bare <code>~</code>{' '}
            is a non-breaking space, and <code>\~{'{}'}</code> produces a small raised tilde
            accent, which is usually not what you want. In math mode, <code>\sim</code> gives the
            &ldquo;similar to&rdquo; relation.
          </p>
          <h3>How do I get a vertical bar or pipe in LaTeX?</h3>
          <p>
            In math mode type <code>|</code> directly, or use <code>\lvert ... \rvert</code> from
            amsmath for absolute values and <code>\mid</code> for the &ldquo;such that&rdquo; or
            &ldquo;divides&rdquo; relation. In text use <code>\textbar</code>; with the default
            OT1 font encoding, a bare <code>|</code> in text prints as an em dash.
          </p>
          <h3>Why does a percent sign make my text disappear?</h3>
          <p>
            Because <code>%</code> starts a comment: LaTeX ignores everything from the{' '}
            <code>%</code> to the end of the line. Write <code>\%</code> to print a percent sign.
            If the comment swallows a closing brace you get <em>Runaway argument?</em> or{' '}
            <em>File ended while scanning use of ...</em>.
          </p>
          <h3>How do I write less-than and greater-than signs in text?</h3>
          <p>
            Use <code>\textless</code> and <code>\textgreater</code>, or switch to the T1 font
            encoding with <code>{`\\usepackage[T1]{fontenc}`}</code> and type <code>&lt;</code>{' '}
            and <code>&gt;</code> directly. With the default OT1 encoding they print as inverted
            exclamation and question marks. In math mode, <code>$&lt;$</code> and{' '}
            <code>$&gt;$</code> always work.
          </p>
          <h3>How do I print a backslash in LaTeX?</h3>
          <p>
            Use <code>\textbackslash</code> in text and <code>\backslash</code> in math. The
            sequence <code>\\</code> is a line break, not a backslash. For a backslash in code or
            a file path, <code>\verb|C:\path|</code> or the <code>listings</code> package is
            simpler.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Reserved characters sorted? These guides cover the related territory:</p>
          <ul>
            <li><Link href="/learn/brackets">Brackets and Parentheses in LaTeX</Link> &ndash; Sizing delimiters with <code>\left</code> and <code>\right</code>, angle brackets and absolute value bars</li>
            <li><Link href="/learn/quotes">LaTeX Quotation Marks and Quotes</Link> &ndash; Opening and closing quotes, csquotes and block quotations</li>
            <li><Link href="/learn/hyperlinks">Hyperlinks in LaTeX</Link> &ndash; <code>\url</code>, <code>\href</code> and hyperref options</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> &ndash; What <code>_</code> and <code>^</code> do in math mode</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> &ndash; Every operator, relation and arrow with its command</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check how a special character renders with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse every symbol by category with copy-paste commands</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX symbols" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix special-character errors faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor spots the unescaped underscore or ampersand behind a
              &ldquo;Missing $ inserted&rdquo; error, fixes it in place, and compiles your document
              in seconds.
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
