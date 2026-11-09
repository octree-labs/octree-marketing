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

const breadcrumbs = getLearnBreadcrumbs('Quotes in LaTeX', 'quotes')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'quotes',
  title: 'Quotes in LaTeX: Quotation Marks, Block Quotes and csquotes',
  seoTitle: 'Quotes in LaTeX: Quotation Marks and csquotes',
  description: 'Quotes in LaTeX: type ``double\'\' and `single\' marks, why "text" fails, csquotes \\enquote and \\textquote, and block quotes with quote, quotation and verse.',
  keywords: 'quotes in latex, quotes latex, quote latex, latex quote, latex quotes, latex quotation marks, quotation marks latex, latex double quotes, latex single quotes, latex quote environment, latex block quote, latex quotation, csquotes, latex enquote, beamer quotes, latex german quotes, latex guillemets, latex straight quotes, latex apostrophe, latex verse environment, latex epigraph',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do you write quotation marks in LaTeX?',
    answer:
      "Type two backticks to open and two apostrophes to close: ``text'' gives “text”. Single quotes are `text'. Do not use the straight \" key for quotes in running text: LaTeX prints it as a closing mark, or as a straight typewriter mark with T1 encoding.",
  },
  {
    question: 'Why are my quotes backwards in LaTeX?',
    answer:
      "Both marks come out as closing marks when the opening one is typed with \" or '. The opening mark must be the backtick key (`), usually below Esc. Write ``like this'' instead of \"like this\" or ''like this''.",
  },
  {
    question: 'What does \\enquote do in LaTeX?',
    answer:
      '\\enquote{text} comes from the csquotes package. It prints the correct opening and closing marks for the document language and switches to the inner marks automatically when one \\enquote is nested in another. Load it with \\usepackage[autostyle]{csquotes}.',
  },
  {
    question: 'How do I make a block quote in LaTeX?',
    answer:
      'Put the passage in \\begin{quote} ... \\end{quote} for a short block, quotation for several paragraphs with first-line indents, or verse for poetry. These environments indent both margins and add no quotation marks. The csquotes command \\blockquote chooses between an inline quote and a block by length.',
  },
  {
    question: 'How do I type nested quotes in LaTeX?',
    answer:
      "Put single quotes inside double ones and separate the closing marks with a thin space: ``She said `yes'\\,''. Without \\, the three apostrophes run together. With csquotes, nest \\enquote inside \\enquote and the inner marks are chosen for you.",
  },
  {
    question: 'What is the difference between \\enquote and \\textquote?',
    answer:
      '\\enquote{text} only adds quotation marks. \\textquote[source]{text} also takes an optional citation that is printed after the closing mark, and \\textcquote does the same with a biblatex key. Use \\textquote when you quote a source inline.',
  },
]

export default async function LaTeXQuotesPage() {
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
          <h1>Quotes in LaTeX: Quotation Marks, Block Quotes and csquotes</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Double quotes:</strong> <code>{"``text''"}</code> gives &ldquo;text&rdquo;
                (two backticks, two apostrophes).
              </li>
              <li>
                <strong>Single quotes:</strong> <code>{"`text'"}</code> gives &lsquo;text&rsquo;.
              </li>
              <li>
                <strong>Not</strong> <code>&quot;text&quot;</code>: the straight key prints two closing
                marks, or straight typewriter marks with T1 encoding.
              </li>
              <li>
                <strong>By command:</strong> <code>{`\\textquotedblleft text\\textquotedblright`}</code>,{' '}
                <code>\textquoteleft</code> and <code>\textquoteright</code>.
              </li>
              <li>
                <strong>Automatic:</strong> <code>{`\\usepackage[autostyle]{csquotes}`}</code>, then{' '}
                <code>{`\\enquote{text}`}</code>, or <code>{`\\textquote[source]{text}`}</code> with a
                citation.
              </li>
              <li>
                <strong>Block quotes:</strong> the <code>quote</code>, <code>quotation</code> and{' '}
                <code>verse</code> environments.
              </li>
            </ul>
          </div>
          <p className="lead">
            Quotes in LaTeX are typed with the backtick and apostrophe keys, not with the{' '}
            <code>&quot;</code> key you use everywhere else: typing <code>&quot;text&quot;</code>{' '}
            gives you two closing marks. This guide covers that convention, the commands for each
            quote character, the <code>csquotes</code> package that picks the marks for you,
            German and French styles, block quotes with the <code>quote</code>,{' '}
            <code>quotation</code> and <code>verse</code> environments, attribution, Beamer,
            straight quotes in code, and the errors that come from pasted smart quotes.
          </p>

          {/* ── Why " fails ── */}
          <h2>Why &quot;text&quot; Comes Out Wrong</h2>
          <p>
            LaTeX&apos;s default fonts have no straight double-quote character in the text font.
            In the classic OT1 encoding the <code>&quot;</code> key prints a <em>closing</em>{' '}
            double quote, so <code>&quot;text&quot;</code> is typeset as &rdquo;text&rdquo;. With{' '}
            <code>{`\\usepackage[T1]{fontenc}`}</code> you get a straight typewriter-style{' '}
            <code>&quot;</code> on both sides, which is still not a typographic quotation mark.
            Either way the glyphs are wrong; LaTeX simply has no idea whether a given{' '}
            <code>&quot;</code> is opening or closing.
          </p>

          {/* ── Conventions ── */}
          <h2>Quotation Marks in LaTeX: ``double&apos;&apos; and `single&apos;</h2>
          <p>
            Opening marks are typed with the backtick (grave accent) key, closing marks with the
            apostrophe. The font&apos;s ligatures turn two backticks into &ldquo; and two
            apostrophes into &rdquo;:
          </p>
          <pre><code>{`\`\`A double-quoted phrase.''
\`A single-quoted phrase.'
She said \`\`the word \`quote' is overused.''   % nested`}</code></pre>
          <p>
            When a single closing quote meets a double closing quote, three apostrophes in a row
            are ambiguous. Insert a thin space with <code>\,</code> between them:
          </p>
          <pre><code>{`\`\`He shouted \`run'\\,'' and we did.      % ' then thin space then ''
\`\`\\,\`Nested at the start' is rarer.''      % opening marks: \`\` then thin space then \``}</code></pre>
          <p>
            British style reverses the roles (single quotes outside, double inside):{' '}
            <code>{`\`She said \`\`hello'' to me'`}</code>. Apostrophes inside words need no
            special handling at all: <code>don&apos;t</code>, <code>Lamport&apos;s</code>.
          </p>

          <h3>Quote Characters by Command: \textquotedblleft and Friends</h3>
          <p>
            Every quotation mark also has a command name. You rarely need them in running text,
            but they are useful inside macros, in places where a backtick is awkward to type, and
            when a quote must sit directly against another symbol:
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Mark</th>
                <th>Shortcut</th>
                <th>Command</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>&ldquo;</td><td><code>``</code></td><td><code>\textquotedblleft</code></td></tr>
              <tr><td>&rdquo;</td><td><code>&apos;&apos;</code></td><td><code>\textquotedblright</code></td></tr>
              <tr><td>&lsquo;</td><td><code>`</code></td><td><code>\textquoteleft</code></td></tr>
              <tr><td>&rsquo;</td><td><code>&apos;</code></td><td><code>\textquoteright</code></td></tr>
              <tr><td>&bdquo;</td><td>none</td><td><code>\quotedblbase</code> (T1)</td></tr>
              <tr><td>&sbquo;</td><td>none</td><td><code>\quotesinglbase</code> (T1)</td></tr>
              <tr><td>&quot; (straight)</td><td>none</td><td><code>\textquotedbl</code> (T1)</td></tr>
            </tbody>
          </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\begin{document}

\\textquotedblleft Double\\textquotedblright{} and
\\textquoteleft single\\textquoteright{} by command.

\\quotedblbase low-high\\textquotedblleft{} for German style.

\\end{document}`}</code></pre>
          <p>
            Add <code>{'{}'}</code> after a closing command such as{' '}
            <code>\textquotedblright</code> when a space follows, or TeX swallows the space.
          </p>

          {/* ── csquotes ── */}
          <h2>Quotes in LaTeX with csquotes: \enquote and \textquote</h2>
          <p>
            Typing backticks is fine for a short paper, but a book with hundreds of quotations in
            several languages is better served by <code>csquotes</code>. Its{' '}
            <code>\enquote</code> command picks the correct marks for the current language and
            nests automatically:
          </p>
          <pre><code>{`\\usepackage[english]{babel}
\\usepackage[autostyle]{csquotes}

\\enquote{A quotation with \\enquote{a nested quotation} inside.}
% "A quotation with 'a nested quotation' inside."

\\enquote*{Inner-level marks on demand}       % 'single' in English`}</code></pre>
          <p>
            To quote a source inline, use <code>\textquote</code>. It adds the marks like{' '}
            <code>\enquote</code> and prints an optional citation after the closing mark; the
            second optional argument holds punctuation that belongs inside the quotation:
          </p>
          <pre><code>{`\\textquote[Knuth 1974]{Premature optimization is the root of all evil}
% "Premature optimization is the root of all evil" (Knuth 1974)

\\textquote[Knuth][.]{We should forget about small efficiencies}
% with biblatex: \\textcquote[671]{knuth1974}{...} takes a bibliography key`}</code></pre>
          <p>
            The <code>autostyle</code> option makes the quote style follow <code>babel</code>{' '}
            (or <code>polyglossia</code>) whenever the language changes, so one source file
            produces &ldquo;English&rdquo;, &bdquo;Deutsch&ldquo; and &laquo;&nbsp;fran&ccedil;ais&nbsp;&raquo; without
            touching the markup. You can also pin a style explicitly with the <code>style</code>{' '}
            option or <code>\setquotestyle</code>:
          </p>
          <pre><code>{`% Load csquotes once, with one of these styles:
\\usepackage[style=british]{csquotes}   % 'single outside', "double inside"
\\usepackage[style=german]{csquotes}    % „German“ quotes
\\usepackage[style=french]{csquotes}    % « French » guillemets with spacing

% change the style for a passage
\\setquotestyle{german}
\\enquote{Zitat}
\\setquotestyle*            % back to following the document language`}</code></pre>

          <h3>Making straight quotes smart: \MakeOuterQuote</h3>
          <p>
            If your text already contains plain <code>&quot;</code> characters, or you prefer to
            type them, tell csquotes to treat <code>&quot;</code> as an active quote that toggles
            between opening and closing marks:
          </p>
          <pre><code>{`\\usepackage{csquotes}
\\MakeOuterQuote{"}

"Now straight quotes become proper quotation marks."`}</code></pre>
          <p>
            Do not do this with German <code>babel</code>, which already uses <code>&quot;</code>{' '}
            as a shorthand for umlauts and hyphenation. For a foreign-language quotation that
            should also switch hyphenation patterns, use{' '}
            <code>{`\\foreignquote{french}{texte}`}</code>.
          </p>

          {/* ── German / French ── */}
          <h2>German and French Quotation Marks</h2>
          <p>
            The low-high German style and the French guillemets are available without csquotes
            through <code>babel</code> and the T1 font encoding:
          </p>
          <pre><code>{`\\usepackage[T1]{fontenc}
\\usepackage[ngerman]{babel}

\\glqq Anführungszeichen\\grqq{}      % „…“ (German low-9 / high-6)
\\glq einfach\\grq{}                   % ‚…‘
\\frqq Französisch\\flqq{}             % »…« (German style with guillemets)

\\guillemotleft\\,texte\\,\\guillemotright   % «…» (T1 encoding, any language)`}</code></pre>
          <p>
            With <code>{`\\usepackage[french]{babel}`}</code> the commands <code>\og</code> and{' '}
            <code>\fg{'{}'}</code> produce guillemets with the correct non-breaking spaces:{' '}
            <code>{`\\og texte\\fg{}`}</code>. Note the empty braces after <code>\grqq</code> and{' '}
            <code>\fg</code>; without them LaTeX swallows the following space.
          </p>
          <p>
            If you would rather type the characters directly, that works too: with UTF-8 input
            and T1 encoding, <code>&bdquo;</code>, <code>&ldquo;</code>, <code>&laquo;</code>,{' '}
            <code>&raquo;</code>, <code>&lsquo;</code> and <code>&rdquo;</code> typed into the
            source are mapped to the right glyphs by <code>inputenc</code> (loaded automatically
            since LaTeX 2018). XeLaTeX and LuaLaTeX accept them natively.
          </p>

          {/* ── Environments ── */}
          <h2>Block Quotes in LaTeX: quote, quotation and verse</h2>
          <p>
            For a displayed passage, LaTeX offers three environments. They differ in how they
            handle paragraphs:
          </p>
          <pre><code>{`\\begin{quote}
  Indented on both sides. Paragraphs are separated by vertical space
  and have no first-line indent. Best for one or two short paragraphs.
\\end{quote}

\\begin{quotation}
  Indented on both sides. Each paragraph starts with a first-line indent
  and there is no extra space between paragraphs, as in a book.

  So a second paragraph looks like this.
\\end{quotation}

\\begin{verse}
  Lines are broken with a double backslash, \\\\
  and a line that runs too long to fit \\\\
  is wrapped with a hanging indent.

  A blank line starts a new stanza.
\\end{verse}`}</code></pre>
          <p>
            None of them adds quotation marks: a displayed quotation is marked by its indentation
            alone. The indent is <code>\leftmargin</code> of the enclosing list; to make all
            quotes italic or smaller, redefine the environment once with <code>etoolbox</code>:
          </p>
          <pre><code>{`\\usepackage{etoolbox}
\\AtBeginEnvironment{quote}{\\itshape\\small}`}</code></pre>

          {/* ── Attribution ── */}
          <h2>Block Quotes with Attribution</h2>
          <p>
            The simplest attribution is a right-aligned line after the quotation. A{' '}
            <code>\par</code> followed by <code>\hfill</code> pushes the author to the right
            margin of the quote block:
          </p>
          <pre><code>{`\\begin{quote}
  Premature optimization is the root of all evil.
  \\par\\medskip\\hfill--- Donald Knuth, \\emph{Computer Programming as an Art}
\\end{quote}`}</code></pre>
          <p>
            csquotes provides <code>\blockquote</code>, which typesets short quotations inline
            with marks and long ones (more than three lines, by default) as a block without marks,
            and takes the citation as an optional argument:
          </p>
          <pre><code>{`\\blockquote[Knuth 1974, p.~671]{Premature optimization is the root of all evil.}

% change the threshold: quotations longer than two lines become block quotes
\\SetBlockThreshold{2}`}</code></pre>
          <p>
            With <code>biblatex</code>, <code>\blockcquote</code> takes a bibliography key
            instead and prints a proper citation. For a motto at the start of a chapter, the{' '}
            <code>epigraph</code> package puts the quotation in a narrow right-aligned box with
            the source underneath:
          </p>
          <pre><code>{`\\usepackage{epigraph}
\\setlength{\\epigraphwidth}{0.55\\textwidth}
\\setlength{\\epigraphrule}{0pt}        % no rule between text and source

\\chapter{Beginnings}
\\epigraph{The best way to predict the future is to invent it.}{--- Alan Kay}`}</code></pre>

          {/* ── Beamer ── */}
          <h2>Quotes in Beamer</h2>
          <p>
            Everything above works in Beamer frames; the <code>quote</code> environment is
            typeset in the theme&apos;s quote font and color. For a highlighted quotation, a{' '}
            <code>block</code> with the speaker as title is the idiomatic choice:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usepackage{csquotes}
\\setbeamerfont{quote}{shape=\\itshape}
\\setbeamercolor{quote}{fg=gray}

\\begin{document}
\\begin{frame}{On Optimization}
  \\begin{block}{Donald Knuth, 1974}
    \\enquote{Premature optimization is the root of all evil.}
  \\end{block}

  \\begin{quote}
    A plain displayed quotation, italic and gray via the templates above.
  \\end{quote}
\\end{frame}
\\end{document}`}</code></pre>

          {/* ── Code ── */}
          <h2>Straight Quotes in Code and Verbatim</h2>
          <p>
            In program listings you want the straight ASCII characters, not curly ones.{' '}
            <code>\verb</code>, <code>verbatim</code> and <code>lstlisting</code> use the
            typewriter font, which has a straight <code>&quot;</code>; for straight quotes in
            ordinary text use the text symbol commands:
          </p>
          <pre><code>{`\\verb|print("hello")|            % straight " in typewriter
\\texttt{\\textquotedbl hello\\textquotedbl}   % straight " (needs \\usepackage[T1]{fontenc})
\\textquotesingle                 % straight '
\\textasciigrave                  % straight \``}</code></pre>
          <p>
            By default <code>verbatim</code> still turns <code>&apos;</code> and{' '}
            <code>`</code> into curly marks in some fonts. The <code>upquote</code> package fixes
            that so that quotes in verbatim and <code>\verb</code> are always straight:
          </p>
          <pre><code>{`\\usepackage{upquote}   % straight ' and \` in verbatim and \\verb (listings: upquote=true)`}</code></pre>

          {/* ── Math ── */}
          <h2>Apostrophes vs Primes in Math</h2>
          <p>
            In math mode the apostrophe is not a quote at all: <code>$f&apos;(x)$</code> typesets
            a prime, <code>$f&apos;&apos;$</code> a double prime. This is correct and intended;
            you do not need <code>^\prime</code>. Only in <em>text</em> inside math, such as{' '}
            <code>{`\\text{Alice's}`}</code>, does the apostrophe revert to its text meaning.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors</h2>
          <p>
            Most quote problems are one of three things: backwards marks, a straight{' '}
            <code>&quot;</code> in the source, or nested marks that run together.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Symptom or message</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Opening quote is backwards (&rdquo;text&rdquo; or &rsquo;text&rsquo;)</td>
                <td>Opening mark typed with <code>&apos;</code> or <code>&quot;</code></td>
                <td>Open with backticks: <code>{"``text''"}</code>, <code>{"`text'"}</code></td>
              </tr>
              <tr>
                <td>Closing quote is backwards (&ldquo;text&ldquo;)</td>
                <td>Closing mark typed with backticks</td>
                <td>Close with apostrophes: <code>{"''"}</code></td>
              </tr>
              <tr>
                <td>Straight typewriter <code>&quot;</code> marks in the PDF</td>
                <td><code>&quot;</code> typed with <code>{`\\usepackage[T1]{fontenc}`}</code> loaded</td>
                <td>Same fixes as below; T1 makes <code>&quot;</code> straight instead of curly</td>
              </tr>
              <tr>
                <td>Both quotation marks look the same (&rdquo;text&rdquo;)</td>
                <td>Straight <code>&quot;</code> typed in the source</td>
                <td>Type <code>``text&apos;&apos;</code>, use <code>\enquote</code>, or add <code>{`\\MakeOuterQuote{"}`}</code></td>
              </tr>
              <tr>
                <td>Opening mark missing after a paste from Word</td>
                <td>The editor converted <code>``</code> to a single curly <code>&ldquo;</code> or to <code>&quot;</code></td>
                <td>Turn off smart quotes in the editor; curly characters are fine only with UTF-8 input and T1 encoding</td>
              </tr>
              <tr>
                <td><em>Unicode character &ldquo; (U+201C) not set up for use with LaTeX</em></td>
                <td>Curly quotes in the source with an old LaTeX or non-UTF-8 input encoding</td>
                <td>Update TeX Live or add <code>{`\\usepackage[utf8]{inputenc}`}</code> and <code>{`\\usepackage[T1]{fontenc}`}</code></td>
              </tr>
              <tr>
                <td><em>Command \guillemotleft unavailable in encoding OT1</em></td>
                <td>Guillemets need the T1 font encoding</td>
                <td><code>{`\\usepackage[T1]{fontenc}`}</code></td>
              </tr>
              <tr>
                <td>Nested quotes run together (&rsquo;&rdquo; looks like three marks)</td>
                <td>Single and double closing quotes adjacent</td>
                <td>Separate them with <code>\,</code>, or nest <code>\enquote</code></td>
              </tr>
              <tr>
                <td>Umlauts break after <code>{`\\MakeOuterQuote{"}`}</code></td>
                <td>German babel also uses <code>&quot;</code> as a shorthand</td>
                <td>Use <code>\enquote</code> instead of active quotes, or choose another character</td>
              </tr>
              <tr>
                <td>Space missing after <code>\grqq</code> or <code>\fg</code></td>
                <td>TeX swallows the space after a command name</td>
                <td>Write <code>{`\\grqq{}`}</code> / <code>{`\\fg{}`}</code></td>
              </tr>
            </tbody>
          </table>
          </div>

          <h3>Backwards Quotes</h3>
          <pre><code>{`\\documentclass{article}
\\begin{document}

% Wrong: both marks print as closing marks
"quoted text" and ''quoted text''

% Right: backticks open, apostrophes close
\`\`quoted text'' and \`single'

\\end{document}`}</code></pre>

          <h3>Nested Quotes</h3>
          <pre><code>{`\\documentclass{article}
\\usepackage{csquotes}
\\begin{document}

% By hand: thin space between the closing marks
\`\`She said \`yes'\\,'' and left.

% With csquotes: the inner level is automatic
\\enquote{She said \\enquote{yes} and left.}

\\end{document}`}</code></pre>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage[french, ngerman, english]{babel}   % last language (english) is the default
\\usepackage[autostyle]{csquotes}
\\usepackage{upquote}
\\usepackage{epigraph}
\\setlength{\\epigraphwidth}{0.5\\textwidth}

\\begin{document}

\\section{Quotation Marks}
Typed by hand: \`\`double'' and \`single', nested as
\`\`she said \`go'\\,'' and done.

With csquotes: \\enquote{outer with \\enquote{inner} marks}.

\\selectlanguage{ngerman}
Auf Deutsch: \\enquote{Zitat mit \\enquote{innerem} Zitat} oder
\\glqq von Hand\\grqq{} gesetzt.
\\selectlanguage{english}

French marks on demand: \\foreignquote{french}{bonjour}.

\\section{Displayed Quotations}
\\epigraph{The best way to predict the future is to invent it.}{--- Alan Kay}

\\begin{quote}
  Premature optimization is the root of all evil.
  \\par\\medskip\\hfill--- Donald Knuth
\\end{quote}

\\blockquote[Knuth 1974, p.~671]{We should forget about small efficiencies,
say about 97\\% of the time: premature optimization is the root of all evil.
Yet we should not pass up our opportunities in that critical 3\\%.}

\\section{Code}
A straight quote in code: \\verb|s = "text"|, and a prime in math: $f'(x)$.

\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quote LaTeX Quick Reference</h2>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Command</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>&ldquo;Double quotes&rdquo;</td><td><code>``text&apos;&apos;</code></td></tr>
              <tr><td>&lsquo;Single quotes&rsquo;</td><td><code>`text&apos;</code></td></tr>
              <tr><td>Nested quotes</td><td><code>``outer `inner&apos;\,&apos;&apos;</code></td></tr>
              <tr><td>Language-aware quotes</td><td><code>{`\\enquote{text}`}</code> (csquotes)</td></tr>
              <tr><td>Inner-level marks</td><td><code>{`\\enquote*{text}`}</code></td></tr>
              <tr><td>Follow babel language</td><td><code>{`\\usepackage[autostyle]{csquotes}`}</code></td></tr>
              <tr><td>Make <code>&quot;</code> smart</td><td><code>{`\\MakeOuterQuote{"}`}</code></td></tr>
              <tr><td>German &bdquo;&hellip;&ldquo;</td><td><code>\glqq text\grqq{'{}'}</code> (babel ngerman) or <code>{`\\usepackage[style=german]{csquotes}`}</code></td></tr>
              <tr><td>French &laquo;&nbsp;&hellip;&nbsp;&raquo;</td><td><code>\og text\fg{'{}'}</code> (babel french) or <code>\guillemotleft</code>/<code>\guillemotright</code> with T1</td></tr>
              <tr><td>Indented quotation</td><td><code>{`\\begin{quote}...\\end{quote}`}</code></td></tr>
              <tr><td>Multi-paragraph quotation</td><td><code>{`\\begin{quotation}...\\end{quotation}`}</code></td></tr>
              <tr><td>Poetry</td><td><code>{`\\begin{verse}...\\end{verse}`}</code></td></tr>
              <tr><td>Quote with attribution</td><td><code>{`\\par\\hfill--- Author`}</code> inside <code>quote</code></td></tr>
              <tr><td>Automatic inline/block quote</td><td><code>{`\\blockquote[cite]{text}`}</code></td></tr>
              <tr><td>Chapter epigraph</td><td><code>{`\\epigraph{text}{--- Author}`}</code> (epigraph)</td></tr>
              <tr><td>Straight quotes in verbatim</td><td><code>{`\\usepackage{upquote}`}</code></td></tr>
              <tr><td>Straight <code>&quot;</code> in text</td><td><code>\textquotedbl</code></td></tr>
              <tr><td>Quote with inline citation</td><td><code>{`\\textquote[source]{text}`}</code> (csquotes)</td></tr>
            </tbody>
          </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you write quotation marks in LaTeX?</h3>
          <p>
            Type two backticks to open and two apostrophes to close:{' '}
            <code>{"``text''"}</code> gives &ldquo;text&rdquo;. Single quotes are{' '}
            <code>{"`text'"}</code>. Do not use the straight <code>&quot;</code> key for quotes in
            running text: LaTeX prints it as a closing mark, or as a straight typewriter mark with
            T1 encoding.
          </p>
          <h3>Why are my quotes backwards in LaTeX?</h3>
          <p>
            Both marks come out as closing marks when the opening one is typed with{' '}
            <code>&quot;</code> or <code>&apos;</code>. The opening mark must be the backtick key
            (<code>`</code>), usually below Esc. Write <code>{"``like this''"}</code> instead of{' '}
            <code>&quot;like this&quot;</code> or <code>{"''like this''"}</code>.
          </p>
          <h3>What does \enquote do in LaTeX?</h3>
          <p>
            <code>{`\\enquote{text}`}</code> comes from the csquotes package. It prints the correct
            opening and closing marks for the document language and switches to the inner marks
            automatically when one <code>\enquote</code> is nested in another. Load it with{' '}
            <code>{`\\usepackage[autostyle]{csquotes}`}</code>.
          </p>
          <h3>How do I make a block quote in LaTeX?</h3>
          <p>
            Put the passage in <code>{`\\begin{quote} ... \\end{quote}`}</code> for a short block,{' '}
            <code>quotation</code> for several paragraphs with first-line indents, or{' '}
            <code>verse</code> for poetry. These environments indent both margins and add no
            quotation marks. The csquotes command <code>\blockquote</code> chooses between an
            inline quote and a block by length.
          </p>
          <h3>How do I type nested quotes in LaTeX?</h3>
          <p>
            Put single quotes inside double ones and separate the closing marks with a thin space:{' '}
            <code>{"``She said `yes'\\,''"}</code>. Without <code>\,</code> the three apostrophes
            run together. With csquotes, nest <code>\enquote</code> inside <code>\enquote</code>{' '}
            and the inner marks are chosen for you.
          </p>
          <h3>What is the difference between \enquote and \textquote?</h3>
          <p>
            <code>{`\\enquote{text}`}</code> only adds quotation marks.{' '}
            <code>{`\\textquote[source]{text}`}</code> also takes an optional citation that is
            printed after the closing mark, and <code>\textcquote</code> does the same with a
            biblatex key. Use <code>\textquote</code> when you quote a source inline.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Quotation marks sorted? These guides cover the rest of the apparatus:</p>
          <ul>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Footnotes for sources and asides, including inside tables and headings</li>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> &ndash; Emphasis inside and around quotations</li>
            <li><Link href="/learn/strikethrough">Strikethrough and Cross Out</Link> &ndash; Mark deleted text with ulem, soul and the changes package</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; Link quoted sources with hyperref</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check how your quotation marks render with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> &ndash; Generate BibTeX entries for the works you quote</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse text symbols and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix quotation marks faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor converts pasted smart quotes, picks the right csquotes
              setup for your languages, and compiles your document in seconds.
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
