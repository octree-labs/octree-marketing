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

const breadcrumbs = getLearnBreadcrumbs('Glossaries and Acronyms in LaTeX', 'glossaries-acronyms')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'glossaries-acronyms',
  title: 'Glossaries and Acronyms in LaTeX: the glossaries and acronym Packages',
  seoTitle: 'LaTeX Glossaries, Acronyms and Abbreviations',
  description:
    'Build a glossary, list of abbreviations or nomenclature in LaTeX: the glossaries package (\\newglossaryentry, \\newacronym, \\gls, \\printglossaries, makeglossaries and latexmk), the simpler acronym package, nomencl, symbol lists, sorting, hyperref ordering and the errors you will meet.',
  keywords:
    'latex glossary, latex glossaries, glossaries package, latex acronyms, acronym package latex, latex list of abbreviations, latex abbreviations, latex nomenclature, nomencl, makeglossaries, newacronym, newglossaryentry, gls latex, printglossaries, glossaries-extra, latex list of symbols, latexmk glossaries',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'Why is my glossary empty or missing?',
    answer:
      'The glossaries package writes the entries you use to a .glo (and .acn) file and needs the external makeglossaries program to sort them into a .gls file that \\printglossaries can read. If you only run pdflatex, the file never exists and the glossary is blank. Run pdflatex, then makeglossaries, then pdflatex twice; or let latexmk do it with a .latexmkrc rule; or use \\makenoidxglossaries and \\printnoidxglossaries so no external tool is needed.',
  },
  {
    question: 'What is the difference between the glossaries and acronym packages?',
    answer:
      'acronym handles abbreviations only: define them in an acronym environment, use \\ac in the text, and the list is typeset where the environment appears, with no extra build step. glossaries also handles full glossary entries, symbol lists and multiple glossaries, with page references and many styles, but needs makeglossaries (or latexmk) to sort the entries. For a thesis with a glossary and a list of symbols use glossaries; for a paper that only needs abbreviations, acronym is simpler.',
  },
  {
    question: 'How do I make an acronym show its full form on first use only?',
    answer:
      'That is the default behaviour of \\gls with \\newacronym in glossaries and of \\ac in the acronym package: the first use prints "long form (SHORT)" and later uses print only SHORT. To force the long form again, call \\glsresetall (glossaries) or \\acresetall (acronym), for example at the start of each chapter; \\glsreset{label} resets a single entry.',
  },
  {
    question: 'Should hyperref be loaded before or after glossaries?',
    answer:
      'Before. glossaries detects hyperref at load time and turns every \\gls into a link to the glossary entry; if hyperref is loaded afterwards the links are missing and you get a warning. The same order (hyperref first) applies to glossaries-extra and nomencl; the acronym package also hyperlinks when hyperref is already loaded.',
  },
  {
    question: 'How do I sort glossary entries in order of definition or first use instead of alphabetically?',
    answer:
      'Pass the sort package option: \\usepackage[sort=def]{glossaries} sorts in the order entries are defined and sort=use in the order they are first used. The default sort=standard is alphabetical by the sort key, which is the name unless you set sort={...} on the entry, which you should do whenever the name contains a command such as \\ensuremath.',
  },
]

export default async function LaTeXGlossariesAcronymsPage() {
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
          <h1>Glossaries and Acronyms in LaTeX: the glossaries and acronym Packages</h1>
          <p className="lead">
            A thesis needs a glossary, a list of abbreviations and often a list of symbols;
            a paper usually needs abbreviations that are spelled out on first use and
            shortened afterwards. LaTeX has three packages for this: <code>glossaries</code>{' '}
            (the complete solution, with an external sorting step), <code>acronym</code>{' '}
            (abbreviations only, no build step) and <code>nomencl</code> (a list of symbols
            built with makeindex). This guide shows how to set up each one, how the build
            works under makeglossaries and latexmk, how first-use expansion behaves, and the
            errors that catch most people.
          </p>

          {/* ── glossaries basics ── */}
          <h2>The glossaries Package</h2>
          <p>
            Load <code>glossaries</code> after <code>hyperref</code>, call{' '}
            <code>\makeglossaries</code> in the preamble, and define every entry in the
            preamble before <code>\begin{'{document}'}</code>. Terms are defined with{' '}
            <code>\newglossaryentry</code>, abbreviations with <code>\newacronym</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[colorlinks]{hyperref}       % hyperref first
\\usepackage[acronym,toc,nonumberlist]{glossaries}
\\makeglossaries

\\newglossaryentry{latex}{
  name={LaTeX},
  description={A document preparation system built on top of the TeX
    typesetting engine}
}
\\newglossaryentry{matrix}{
  name={matrix},
  plural={matrices},
  description={A rectangular array of numbers arranged in rows and columns}
}
\\newacronym{gcd}{GCD}{greatest common divisor}
\\newacronym{svd}{SVD}{singular value decomposition}

\\begin{document}
\\tableofcontents

\\section{Introduction}
We compute the \\gls{gcd} of two integers, then the \\gls{gcd} again.
Every \\gls{matrix} has an \\gls{svd}; several \\glspl{matrix} share one.
\\Gls{latex} is used throughout.

\\printglossary[type=\\acronymtype, title={List of Abbreviations}]
\\printglossary[title={Glossary}]
\\end{document}`}</code></pre>
          <p>
            The first <code>\gls{'{gcd}'}</code> prints &ldquo;greatest common divisor
            (GCD)&rdquo;; the second prints &ldquo;GCD&rdquo;. <code>\gls{'{matrix}'}</code>{' '}
            prints &ldquo;matrix&rdquo;, <code>\glspl{'{matrix}'}</code> uses the{' '}
            <code>plural</code> key, and <code>\Gls</code> capitalises the first letter for the
            start of a sentence. Every entry that is used gets a page reference in the
            glossary unless you pass <code>nonumberlist</code>, and the <code>toc</code> option
            adds the glossaries to the table of contents.
          </p>
          <p>The package options you will reach for most:</p>
          <ul>
            <li><code>acronym</code> &ndash; put acronyms in their own glossary, <code>\acronymtype</code>, instead of the main one</li>
            <li><code>symbols</code> &ndash; create a <code>symbols</code> glossary for a list of symbols</li>
            <li><code>toc</code>, <code>section=section</code> &ndash; list the glossaries in the contents and set them as sections rather than chapters</li>
            <li><code>nonumberlist</code>, <code>nopostdot</code> &ndash; drop the page numbers and the full stop after each description</li>
            <li><code>sort=def</code> / <code>sort=use</code> &ndash; order by definition or first use instead of alphabetically</li>
            <li><code>style=long</code>, <code>style=tree</code>, <code>style=super</code> &ndash; the glossary layout (<code>list</code> is the default)</li>
          </ul>

          <h3>The commands in the text</h3>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Prints (for <code>\newacronym{'{svd}{SVD}{singular value decomposition}'}</code>)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\gls{'{svd}'}</code></td><td>singular value decomposition (SVD) on first use, then SVD</td></tr>
              <tr><td><code>\Gls{'{svd}'}</code>, <code>\GLS{'{svd}'}</code></td><td>Same, with the first letter or the whole text in capitals</td></tr>
              <tr><td><code>\glspl{'{svd}'}</code>, <code>\Glspl{'{svd}'}</code></td><td>Plural forms (SVDs)</td></tr>
              <tr><td><code>\acrshort{'{svd}'}</code></td><td>SVD, regardless of first use</td></tr>
              <tr><td><code>\acrlong{'{svd}'}</code></td><td>singular value decomposition</td></tr>
              <tr><td><code>\acrfull{'{svd}'}</code></td><td>singular value decomposition (SVD)</td></tr>
              <tr><td><code>\glstext{'{label}'}</code>, <code>\glsname{'{label}'}</code>, <code>\glsdesc{'{label}'}</code></td><td>The text, name or description field without marking the entry as used</td></tr>
              <tr><td><code>\glsreset{'{label}'}</code>, <code>\glsresetall</code></td><td>Make the next <code>\gls</code> expand in full again (one entry or all)</td></tr>
              <tr><td><code>\glsunset{'{label}'}</code>, <code>\glsunsetall</code></td><td>Mark as already used, so <code>\gls</code> gives the short form</td></tr>
            </tbody>
          </table>
          <p>
            The &ldquo;first use&rdquo; flag is global: once <code>\gls{'{svd}'}</code> has
            expanded anywhere in the document, every later use is short. If you want the full
            form repeated at the start of each chapter, put <code>\glsresetall</code> after
            each <code>\chapter</code>. Note that <code>\gls</code> used in an abstract that is
            typeset before the main text counts as the first use, and that a <code>\gls</code>{' '}
            inside a figure caption or a floating table may be &ldquo;used&rdquo; out of
            reading order.
          </p>

          {/* ── Build ── */}
          <h2>The Build Step: makeglossaries, makeindex and latexmk</h2>
          <p>
            This is where most problems come from. When you compile, <code>\gls</code> writes
            each used entry to <code>main.glo</code> (and acronyms to <code>main.acn</code>).
            Those files are unsorted; a separate program has to sort them and produce{' '}
            <code>main.gls</code> and <code>main.acr</code>, which <code>\printglossaries</code>{' '}
            reads on the next run. The full sequence is:
          </p>
          <pre><code>{`pdflatex main
makeglossaries main     % runs makeindex (or xindy) for every glossary
pdflatex main
pdflatex main           % once more to settle page numbers`}</code></pre>
          <p>
            <code>makeglossaries</code> is a Perl script shipped with the package. It reads{' '}
            <code>main.aux</code> to find out which glossaries exist and calls{' '}
            <code>makeindex</code> with the style file <code>main.ist</code> that{' '}
            <code>\makeglossaries</code> wrote, so you never have to type the makeindex
            incantation yourself. If you have no Perl (common on Windows), use{' '}
            <code>makeglossaries-lite main</code>, a Lua version with the same job, or call
            makeindex directly:
          </p>
          <pre><code>{`makeindex -s main.ist -t main.glg -o main.gls main.glo   % main glossary
makeindex -s main.ist -t main.alg -o main.acr main.acn   % acronyms`}</code></pre>
          <p>
            For languages with accented letters or non-Latin scripts, makeindex sorts badly;
            load the package with the <code>xindy</code> option and makeglossaries will call
            xindy instead.
          </p>

          <h3>Letting latexmk do it</h3>
          <p>
            latexmk does not know about glossaries by default, but a few lines in a{' '}
            <code>.latexmkrc</code> file in the project directory teach it when to run
            makeglossaries. This is the rule from the glossaries manual:
          </p>
          <pre><code>{`# .latexmkrc
add_cus_dep('glo', 'gls', 0, 'makeglossaries');
add_cus_dep('acn', 'acr', 0, 'makeglossaries');
sub makeglossaries {
  my ($base_name, $path) = fileparse( $_[0] );
  pushd $path;
  my $return = system "makeglossaries", $base_name;
  popd;
  return $return;
}`}</code></pre>
            <p>
            With that in place, <code>latexmk -pdf main</code> runs the whole sequence and
            repeats it until nothing changes. Overleaf ships an equivalent rule, which is why
            glossaries &ldquo;just work&rdquo; there; Octree&apos;s compiler also runs
            latexmk, which reads a <code>latexmkrc</code> placed next to your main file.
          </p>

          <h3>Two ways to avoid the external tool</h3>
          <p>
            The <code>automake</code> package option makes glossaries call makeindex itself
            during the LaTeX run through shell escape, so a plain{' '}
            <code>pdflatex --shell-escape main</code> twice is enough:
          </p>
          <pre><code>{`\\usepackage[acronym,automake]{glossaries}`}</code></pre>
          <p>
            Where shell escape is not available, the glossary is simply left empty with a
            warning. The second option needs no program at all: replace{' '}
            <code>\makeglossaries</code> with <code>\makenoidxglossaries</code> and{' '}
            <code>\printglossaries</code> with <code>\printnoidxglossaries</code>, and TeX sorts
            the entries itself after two runs. It is slower, has trouble with non-ASCII sort
            keys and offers fewer styles, but it is the easiest route for a short document.
          </p>

          {/* ── Sorting ── */}
          <h2>Sorting and Symbol Glossaries</h2>
          <p>
            Entries are sorted alphabetically by their <code>sort</code> key, which defaults to
            the <code>name</code>. That breaks as soon as the name is a command, so a symbol
            entry should always set <code>sort</code> explicitly. A list of symbols is a
            glossary of type <code>symbols</code> whose names are the symbols themselves:
          </p>
          <pre><code>{`\\usepackage[symbols,sort=def]{glossaries}
\\makeglossaries

\\newglossaryentry{c}{
  type=symbols,
  name={\\ensuremath{c}},
  sort={c},
  description={speed of light in vacuum, $2.998\\times10^{8}$ m/s}
}
\\newglossaryentry{hbar}{
  type=symbols,
  name={\\ensuremath{\\hbar}},
  sort={hbar},
  description={reduced Planck constant}
}

\\begin{document}
Energy $E = \\gls{hbar}\\omega$ and $E = m\\gls{c}^2$.
\\printglossary[type=symbols, title={List of Symbols}]
\\end{document}`}</code></pre>
          <p>
            <code>sort=def</code> keeps the symbols in the order you defined them, which is
            usually what a physics or engineering thesis wants (grouped by topic rather than
            alphabetically). The entry also accepts a <code>symbol</code> key; styles such as{' '}
            <code>long4col</code> and <code>super4col</code> print it in its own column, which
            lets you keep a word as the <code>name</code> and show the symbol beside it.
          </p>

          {/* ── glossaries-extra ── */}
          <h2>glossaries-extra</h2>
          <p>
            <code>glossaries-extra</code> loads glossaries and adds a better abbreviation system,
            categories and the <code>bib2gls</code> workflow. Two things change: abbreviations are
            created with <code>\newabbreviation</code> and have switchable styles, and{' '}
            <code>\newacronym</code> now defaults to the <code>short-nolong</code> style (short
            form only, even on first use), so set the style you want explicitly:
          </p>
          <pre><code>{`\\usepackage[colorlinks]{hyperref}
\\usepackage[abbreviations]{glossaries-extra}
\\makeglossaries
\\setabbreviationstyle[acronym]{long-short}   % first use: long (SHORT)

\\newacronym{cpu}{CPU}{central processing unit}
\\newabbreviation{api}{API}{application programming interface}

\\begin{document}
The \\gls{cpu} and the \\gls{api}; again the \\gls{cpu} and \\gls{api}.
\\printabbreviations
\\printglossaries
\\end{document}`}</code></pre>
          <p>
            Other styles include <code>short-long</code>, <code>long-short-sc</code> (small-caps
            short form), <code>long-short-desc</code> (with a separate description for the
            list) and <code>footnote</code> (long form in a footnote on first use). The
            short/long accessors are <code>\glsxtrshort</code>, <code>\glsxtrlong</code> and{' '}
            <code>\glsxtrfull</code>. For large glossaries, <code>bib2gls</code> keeps the
            entries in a <code>.bib</code> file, sorts them in Java and includes only the ones
            you used, replacing makeglossaries entirely.
          </p>

          {/* ── acronym ── */}
          <h2>The Simpler acronym Package</h2>
          <p>
            If all you need is a list of abbreviations, the <code>acronym</code> package does it
            with no build step. Define the acronyms inside an <code>acronym</code>{' '}
            environment, which also typesets the list at that point; the optional argument is
            the longest short form and sets the column width:
          </p>
          <pre><code>{`\\usepackage[printonlyused,withpage]{acronym}

\\section*{List of Abbreviations}
\\begin{acronym}[LSTM]
  \\acro{api}[API]{application programming interface}
  \\acro{cpu}[CPU]{central processing unit}
  \\acro{lstm}[LSTM]{long short-term memory}
  \\acrodefplural{cpu}[CPUs]{central processing units}
\\end{acronym}

\\section{Text}
The \\ac{cpu} runs the \\ac{api}. Later the \\ac{cpu} is short.
Full again: \\acf{cpu}. Short only: \\acs{cpu}. Long only: \\acl{cpu}.
Plural: \\acp{cpu}. \\acused{lstm} Now \\ac{lstm} is treated as used.
\\acresetall After reset: \\ac{cpu}.`}</code></pre>
          <ul>
            <li><code>\ac</code> &ndash; long form (SHORT) on first use, SHORT afterwards</li>
            <li><code>\acf</code>, <code>\acs</code>, <code>\acl</code> &ndash; full, short and long form on demand</li>
            <li><code>\acp</code>, <code>\acfp</code>, <code>\acsp</code>, <code>\aclp</code> &ndash; plurals</li>
            <li><code>\acused{'{label}'}</code> &ndash; mark as used without printing; <code>\acresetall</code> &ndash; expand everything again</li>
            <li><code>\acrodef</code> &ndash; define an acronym outside the list (no entry is printed)</li>
          </ul>
          <p>
            The <code>printonlyused</code> option drops acronyms that never appear in the text,{' '}
            <code>withpage</code> adds the page of first use, <code>footnote</code> puts the long
            form in a footnote instead of parentheses, and <code>nohyperlinks</code> switches
            off the links that are created when hyperref is loaded. The list is typeset
            wherever the environment sits, so put it where you want it to appear. The
            package has no sorting; entries print in the order you wrote them.
          </p>

          {/* ── nomencl ── */}
          <h2>Nomenclature with nomencl</h2>
          <p>
            <code>nomencl</code> builds a list of symbols from <code>\nomenclature</code>{' '}
            commands scattered through the text, usually right after the equation that
            introduces each symbol:
          </p>
          <pre><code>{`\\usepackage[intoc]{nomencl}
\\makenomenclature
\\renewcommand{\\nomname}{List of Symbols}

\\begin{document}
\\tableofcontents
\\section{Model}
The energy $E = mc^2$ where $m$ is the mass.
\\nomenclature{$c$}{Speed of light in vacuum}
\\nomenclature{$m$}{Mass of the particle}
\\nomenclature[A]{$E$}{Energy}
\\printnomenclature
\\end{document}`}</code></pre>
          <p>
            Like glossaries, it needs makeindex, with the style file that comes with the
            package:
          </p>
          <pre><code>{`pdflatex main
makeindex main.nlo -s nomencl.ist -o main.nls
pdflatex main

# .latexmkrc rule
add_cus_dep('nlo', 'nls', 0, 'makenlo2nls');
sub makenlo2nls {
  system("makeindex -s nomencl.ist -o \\"$_[0].nls\\" \\"$_[0].nlo\\"");
}`}</code></pre>
          <p>
            The optional argument of <code>\nomenclature</code> is a sort prefix: entries are
            sorted by prefix first, then by symbol, so <code>[A]</code> puts a symbol before
            everything without a prefix and prefixes such as <code>[G]</code> for Greek letters
            and <code>[S]</code> for subscripts let you group the list. Redefine{' '}
            <code>\nomgroup</code> to print a heading for each prefix. <code>intoc</code> adds
            the list to the contents, and <code>\printnomenclature[2cm]</code> sets the width of
            the symbol column.
          </p>

          {/* ── Comparison ── */}
          <h2>Which Package Should You Use?</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>glossaries</th>
                <th>acronym</th>
                <th>nomencl</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Glossary of terms</td><td>Yes</td><td>No</td><td>No</td></tr>
              <tr><td>Acronyms with first-use expansion</td><td>Yes</td><td>Yes</td><td>No</td></tr>
              <tr><td>List of symbols</td><td>Yes (<code>symbols</code> glossary)</td><td>No</td><td>Yes</td></tr>
              <tr><td>Several separate lists</td><td>Yes</td><td>No</td><td>No</td></tr>
              <tr><td>Sorting</td><td>Alphabetical, definition or use order</td><td>Order written</td><td>Alphabetical by prefix and symbol</td></tr>
              <tr><td>Page references</td><td>Optional</td><td><code>withpage</code> (first use)</td><td><code>refpage</code> option</td></tr>
              <tr><td>External build step</td><td>makeglossaries (or <code>automake</code> / <code>\makenoidxglossaries</code>)</td><td>None</td><td>makeindex with <code>nomencl.ist</code></td></tr>
              <tr><td>Best for</td><td>Theses, books, anything with a real glossary</td><td>Papers and reports that only need abbreviations</td><td>Engineering and physics symbol lists</td></tr>
            </tbody>
          </table>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
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
                <td>Glossary is empty; log says <em>Glossary `main&apos; has not been generated</em> or <em>is missing</em></td>
                <td>makeglossaries was never run, so there is no <code>.gls</code> file</td>
                <td>Run <code>makeglossaries main</code> between LaTeX runs, add the <code>.latexmkrc</code> rule, or switch to <code>\makenoidxglossaries</code></td>
              </tr>
              <tr>
                <td><em>Package glossaries Error: Glossary entry `foo&apos; has not been defined</em></td>
                <td>Typo in the label, or the entry is defined after it is used (for example in the document body)</td>
                <td>Check the label; move every <code>\newglossaryentry</code> and <code>\newacronym</code> into the preamble</td>
              </tr>
              <tr>
                <td><em>makeglossaries: `main.aux&apos; doesn&apos;t contain \@istfilename</em></td>
                <td><code>\makeglossaries</code> is missing from the preamble, or LaTeX has not been run yet</td>
                <td>Add <code>\makeglossaries</code> after <code>\usepackage{'{glossaries}'}</code> and run LaTeX first</td>
              </tr>
              <tr>
                <td><em>No \printglossary or \printglossaries found</em></td>
                <td>Entries are defined but nothing prints the list</td>
                <td>Add <code>\printglossaries</code> (or <code>\printglossary[type=...]</code>) where the list should appear</td>
              </tr>
              <tr>
                <td><code>\gls</code> does not link, warning about hyperref</td>
                <td>hyperref loaded after glossaries</td>
                <td>Load hyperref first</td>
              </tr>
              <tr>
                <td>Symbols sorted in a strange order</td>
                <td>Sort key is the name, which contains commands</td>
                <td>Give each entry a plain <code>sort={'{...}'}</code> key, or use <code>sort=def</code></td>
              </tr>
              <tr>
                <td>Acronym never expands under glossaries-extra</td>
                <td>Default style for <code>\newacronym</code> is <code>short-nolong</code></td>
                <td><code>{`\\setabbreviationstyle[acronym]{long-short}`}</code> before defining acronyms</td>
              </tr>
              <tr>
                <td><code>\gls</code> in a section heading breaks the bookmark or the contents</td>
                <td>The first-use logic is not expandable</td>
                <td>Use <code>\glsentrytext{'{label}'}</code> or <code>\glsentryshort{'{label}'}</code> in headings</td>
              </tr>
              <tr>
                <td>Accented entries are mis-sorted</td>
                <td>makeindex sorts by byte value</td>
                <td>Use the <code>xindy</code> option (makeglossaries switches to xindy) or bib2gls</td>
              </tr>
            </tbody>
          </table>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>glossaries</th>
                <th>acronym</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Load</td><td><code>{`\\usepackage[acronym]{glossaries}`}</code> + <code>\makeglossaries</code></td><td><code>{`\\usepackage[printonlyused]{acronym}`}</code></td></tr>
              <tr><td>Define a term</td><td><code>{`\\newglossaryentry{label}{name=..., description=...}`}</code></td><td>&ndash;</td></tr>
              <tr><td>Define an acronym</td><td><code>{`\\newacronym{label}{SHORT}{long form}`}</code></td><td><code>{`\\acro{label}[SHORT]{long form}`}</code> inside <code>acronym</code></td></tr>
              <tr><td>Use (expand on first use)</td><td><code>{`\\gls{label}`}</code></td><td><code>{`\\ac{label}`}</code></td></tr>
              <tr><td>Short / long / full on demand</td><td><code>\acrshort</code>, <code>\acrlong</code>, <code>\acrfull</code></td><td><code>\acs</code>, <code>\acl</code>, <code>\acf</code></td></tr>
              <tr><td>Plural</td><td><code>{`\\glspl{label}`}</code></td><td><code>{`\\acp{label}`}</code></td></tr>
              <tr><td>Reset first use</td><td><code>\glsresetall</code></td><td><code>\acresetall</code></td></tr>
              <tr><td>Print the list</td><td><code>\printglossaries</code> or <code>{`\\printglossary[type=\\acronymtype]`}</code></td><td>Where the <code>acronym</code> environment is</td></tr>
              <tr><td>Build</td><td>pdflatex &rarr; makeglossaries &rarr; pdflatex &times; 2</td><td>pdflatex &times; 2</td></tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>Why is my glossary empty or missing?</h3>
          <p>
            The glossaries package writes the entries you use to a <code>.glo</code> (and{' '}
            <code>.acn</code>) file and needs the external makeglossaries program to sort them
            into a <code>.gls</code> file that <code>\printglossaries</code> can read. If you
            only run pdflatex, the file never exists and the glossary is blank. Run pdflatex,
            then makeglossaries, then pdflatex twice; or let latexmk do it with a{' '}
            <code>.latexmkrc</code> rule; or use <code>\makenoidxglossaries</code> and{' '}
            <code>\printnoidxglossaries</code> so no external tool is needed.
          </p>
          <h3>What is the difference between the glossaries and acronym packages?</h3>
          <p>
            acronym handles abbreviations only: define them in an <code>acronym</code>{' '}
            environment, use <code>\ac</code> in the text, and the list is typeset where the
            environment appears, with no extra build step. glossaries also handles full
            glossary entries, symbol lists and multiple glossaries, with page references and
            many styles, but needs makeglossaries (or latexmk) to sort the entries. For a
            thesis with a glossary and a list of symbols use glossaries; for a paper that only
            needs abbreviations, acronym is simpler.
          </p>
          <h3>How do I make an acronym show its full form on first use only?</h3>
          <p>
            That is the default behaviour of <code>\gls</code> with <code>\newacronym</code> in
            glossaries and of <code>\ac</code> in the acronym package: the first use prints
            &ldquo;long form (SHORT)&rdquo; and later uses print only SHORT. To force the long
            form again, call <code>\glsresetall</code> (glossaries) or <code>\acresetall</code>{' '}
            (acronym), for example at the start of each chapter; <code>\glsreset{'{label}'}</code>{' '}
            resets a single entry.
          </p>
          <h3>Should hyperref be loaded before or after glossaries?</h3>
          <p>
            Before. glossaries detects hyperref at load time and turns every <code>\gls</code>{' '}
            into a link to the glossary entry; if hyperref is loaded afterwards the links are
            missing and you get a warning. The same order (hyperref first) applies to
            glossaries-extra and nomencl; the acronym package also hyperlinks when hyperref is
            already loaded.
          </p>
          <h3>How do I sort glossary entries in order of definition or first use instead of alphabetically?</h3>
          <p>
            Pass the <code>sort</code> package option: <code>{`\\usepackage[sort=def]{glossaries}`}</code>{' '}
            sorts in the order entries are defined and <code>sort=use</code> in the order they
            are first used. The default <code>sort=standard</code> is alphabetical by the sort
            key, which is the name unless you set <code>sort={'{...}'}</code> on the entry, which
            you should do whenever the name contains a command such as <code>\ensuremath</code>.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Glossary sorted? These guides cover the other front- and back-matter jobs:</p>
          <ul>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; hyperref options, link colors and why it has to be loaded before glossaries</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Footnotes, including the footnote style of acronym and glossaries-extra</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> &ndash; The symbols you will be listing in a nomenclature</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; Build a hand-made abbreviation table when a package is overkill</li>
            <li><Link href="/learn/page-numbering">LaTeX Page Numbering</Link> &ndash; Roman numerals for the front matter where glossaries usually live</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test acronym and glossary code with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/table-generator" target="_blank" rel="noopener noreferrer">LaTeX Table Generator</Link> &ndash; Build a manual list of abbreviations as a table</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Look up the symbols for your nomenclature</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX packages" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Build glossaries without the build headaches</h3>
            <p className="text-muted-foreground mb-4">
              Octree compiles with latexmk, so glossaries, acronym lists and nomenclatures
              come out right, and its AI editor explains the glossaries errors you hit and
              fixes them in place.
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
