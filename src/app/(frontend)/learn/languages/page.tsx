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

const breadcrumbs = getLearnBreadcrumbs('Languages in LaTeX', 'languages')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'languages',
  title: 'Languages in LaTeX: babel, polyglossia, Spanish, Arabic and More',
  seoTitle: 'Languages in LaTeX: babel, polyglossia, Spanish',
  description: 'LaTeX in any language: babel for pdfLaTeX, polyglossia for XeLaTeX, Spanish, French, German, Arabic and Hebrew, Chinese and Japanese, Russian, Greek.',
  keywords: 'latex languages, latex language, language latex, babel latex, latex babel, polyglossia, latex polyglossia, latex spanish, latex in spanish, spanish latex, babel spanish, latex arabic, arabic latex, latex arabic text, latex hebrew, latex right to left, latex rtl, latex french, latex german, latex chinese, xecjk, ctex, cjkutf8, latex japanese, latex russian, t2a fontenc, latex greek, lgr, selectlanguage, foreignlanguage, otherlanguage, latex hyphenation language, unknown option babel, babel es-tabla, multilingual latex',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I change the language of a LaTeX document?',
    answer:
      'With pdfLaTeX, load babel with the language as an option: \\usepackage[spanish]{babel} (plus \\usepackage[T1]{fontenc} for accented letters). With XeLaTeX or LuaLaTeX, use polyglossia and \\setdefaultlanguage{spanish}. Either way the language sets the captions (“Índice”, “Capítulo”), the date from \\today, hyphenation and typographic rules.',
  },
  {
    question: 'How do I write LaTeX in Spanish?',
    answer:
      'Add \\usepackage[T1]{fontenc} and \\usepackage[spanish]{babel} to the preamble and type accents and ñ directly; UTF-8 input is the default since 2018. Add the es-tabla option if tables should be captioned “Tabla” instead of “Cuadro”, and \\decimalpoint if you want 3.14 rather than 3,14 in math.',
  },
  {
    question: 'How do I write Arabic in LaTeX?',
    answer:
      'Compile with XeLaTeX, load polyglossia, declare \\setotherlanguage{arabic} (or \\setdefaultlanguage{arabic}) and give it a font that has Arabic glyphs with \\newfontfamily\\arabicfont[Script=Arabic]{Amiri}. Then write \\textarabic{...} for a phrase or the Arabic environment for paragraphs; text runs right to left automatically.',
  },
  {
    question: 'Should I use babel or polyglossia?',
    answer:
      'Use babel with pdfLaTeX, which is still the default compiler on most platforms. With XeLaTeX, polyglossia is the traditional choice and handles right-to-left scripts well. Modern babel also works with XeLaTeX and LuaLaTeX and supports more languages, so on LuaLaTeX babel is the usual recommendation today.',
  },
  {
    question: 'How do I write Chinese or Japanese in LaTeX?',
    answer:
      'For Chinese, the simplest route is the ctexart class compiled with XeLaTeX: \\documentclass{ctexart}, then type Chinese directly. For mixed documents, load xeCJK and set a CJK font with \\setCJKmainfont. With pdfLaTeX, the CJKutf8 package and a \\begin{CJK}{UTF8}{gbsn} environment work. Japanese is usually written with LuaLaTeX and luatexja.',
  },
  {
    question: 'How do I use two languages in one LaTeX document?',
    answer:
      'List all languages in the babel options, with the main one last: \\usepackage[french,english]{babel}. Use \\foreignlanguage{french}{...} for a phrase, the otherlanguage environment for a passage, and \\selectlanguage{french} to switch for the rest of the document. Each switch changes hyphenation and, for \\selectlanguage, captions and dates too.',
  },
]

export default async function LearnLanguagesPage() {
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
          <h1>Languages in LaTeX: babel, polyglossia, Spanish, Arabic and More</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>pdfLaTeX:</strong> <code>{`\\usepackage[T1]{fontenc}`}</code> and{' '}
                <code>{`\\usepackage[spanish]{babel}`}</code>. Files are read as UTF-8 by default,
                so type accents directly.
              </li>
              <li>
                <strong>XeLaTeX / LuaLaTeX:</strong> <code>{`\\usepackage{polyglossia}`}</code> with{' '}
                <code>{`\\setdefaultlanguage{spanish}`}</code>, and a font that has the script you need.
              </li>
              <li>
                <strong>Switching:</strong> <code>{`\\selectlanguage{french}`}</code> for the rest of
                the text, <code>{`\\foreignlanguage{french}{...}`}</code> for a phrase.
              </li>
              <li>
                <strong>Hyphenation</strong> follows the active language automatically;
                exceptions go in <code>{`\\babelhyphenation`}</code> or <code>\hyphenation</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}        % accented letters as real glyphs
\\usepackage[spanish]{babel}     % Spanish captions, dates and hyphenation

\\begin{document}

\\tableofcontents                % titled "Índice"

\\section{Introducción}
El niño comió una piña. Hoy es \\today.

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            LaTeX was built for English, but one package switches a document to almost any
            language: the headings it generates (&ldquo;Contents&rdquo;, &ldquo;Chapter&rdquo;,
            &ldquo;Table&rdquo;), the date, hyphenation, quotation marks and spacing rules. Which
            package depends on the compiler: <code>babel</code> for pdfLaTeX,{' '}
            <code>polyglossia</code> (or a modern <code>babel</code>) for XeLaTeX and LuaLaTeX.
            This guide covers both, then Spanish, French and German, Arabic and Hebrew written
            right to left, Chinese, Japanese and Korean, Russian and Greek, and the errors each
            one tends to throw. Every snippet compiles as shown.
          </p>

          {/* ── babel vs polyglossia ── */}
          <h2>babel vs polyglossia: Which Package for Which Compiler</h2>
          <p>
            Both packages do the same job. The difference is the engine: pdfLaTeX works with
            8-bit fonts and needs a font encoding for each alphabet, while XeLaTeX and LuaLaTeX
            use system OpenType fonts, so the language package only has to pick the right font
            and rules.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Compiler</th>
                  <th>Language package</th>
                  <th>Fonts</th>
                  <th>Good for</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>pdfLaTeX</td><td><code>{`\\usepackage[spanish]{babel}`}</code></td><td><code>fontenc</code>: T1 (Latin), T2A (Cyrillic), LGR (Greek)</td><td>European languages, journal templates</td></tr>
                <tr><td>XeLaTeX</td><td><code>polyglossia</code> with <code>\setdefaultlanguage</code></td><td><code>fontspec</code>, any OpenType font</td><td>Arabic, Hebrew, Indic scripts, CJK with <code>xeCJK</code></td></tr>
                <tr><td>LuaLaTeX</td><td><code>babel</code> with <code>\babelprovide</code>, or <code>polyglossia</code></td><td><code>fontspec</code></td><td>Many scripts at once, Japanese with <code>luatexja</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The same Spanish document for XeLaTeX or LuaLaTeX, with English as a second
            language:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{polyglossia}
\\setdefaultlanguage{spanish}
\\setotherlanguage{english}

\\begin{document}

\\section{Introducción}
Texto en español con \\textenglish{a few words in English}. Hoy es \\today.

\\end{document}`}</code></pre>
          <p>
            Do not load <code>inputenc</code> or <code>fontenc</code> with XeLaTeX or LuaLaTeX;
            those are pdfLaTeX packages. In Overleaf and Octree, the compiler is chosen in the
            project settings.
          </p>

          {/* ── Switching ── */}
          <h2>Switching Languages: \selectlanguage, \foreignlanguage and otherlanguage</h2>
          <p>
            Load every language you use as a babel option. The <strong>last</strong> one is the
            main language of the document. Then switch with three commands:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage[french,ngerman,english]{babel}   % English is the main language
\\babelhyphenation[english]{data-base Oct-ree}   % hyphenation exceptions

\\begin{document}

English text, with \\foreignlanguage{french}{une phrase en français} inside it.

\\begin{otherlanguage}{french}
Un paragraphe en français, avec la date : \\today.
\\end{otherlanguage}

\\selectlanguage{ngerman}
Ab hier ist der Text deutsch, mit deutscher Silbentrennung. \\today

\\selectlanguage{english}
Back to English.

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Scope</th>
                  <th>Changes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\selectlanguage{lang}`}</code></td><td>Until the next switch</td><td>Hyphenation, captions, <code>\today</code>, typographic rules</td></tr>
                <tr><td><code>{`\\begin{otherlanguage}{lang}`}</code></td><td>The environment</td><td>Same as <code>\selectlanguage</code></td></tr>
                <tr><td><code>{`\\foreignlanguage{lang}{text}`}</code></td><td>The argument</td><td>Hyphenation and rules, not captions or date</td></tr>
                <tr><td><code>{`\\begin{otherlanguage*}{lang}`}</code></td><td>The environment</td><td>Like <code>\foreignlanguage</code>, for longer passages</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            polyglossia uses the same <code>\selectlanguage</code> and{' '}
            <code>otherlanguage</code>, plus a shortcut per language such as{' '}
            <code>{`\\textfrench{...}`}</code> or <code>{`\\textenglish{...}`}</code>. To rename a
            heading in any language, see{' '}
            <Link href="/learn/table-of-contents">renaming the table of contents</Link>.
          </p>

          {/* ── Spanish ── */}
          <h2>LaTeX in Spanish</h2>
          <p>
            <code>{`\\usepackage[spanish]{babel}`}</code> translates every generated word
            (&ldquo;Índice&rdquo;, &ldquo;Capítulo&rdquo;, &ldquo;Figura&rdquo;,
            &ldquo;Referencias&rdquo;), writes dates as &ldquo;9 de noviembre de 2026&rdquo; and
            loads Spanish hyphenation. A few options change its defaults:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage[spanish, es-tabla]{babel}   % "Tabla" instead of "Cuadro"
\\usepackage{amsmath}

\\begin{document}

\\section{Resultados}
Las comillas latinas se escriben <<así>>, y la ñ y las tildes se escriben
directamente: año, acción, pingüino.

\\begin{table}[h]
  \\centering
  \\caption{Datos del experimento}
  \\begin{tabular}{lr}
    Muestra & Valor \\\\
    A       & $3.14$ \\\\
  \\end{tabular}
\\end{table}

En matemáticas, $3.14$ se imprime con coma decimal y $\\lim$ lleva tilde.
\\decimalpoint
Con \\verb|\\decimalpoint|, $3.14$ vuelve a usar punto.

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Option or command</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>es-tabla</code></td><td>Tables are captioned &ldquo;Tabla&rdquo; and listed in &ldquo;Índice de tablas&rdquo; (the default is &ldquo;Cuadro&rdquo;)</td></tr>
                <tr><td><code>\decimalpoint</code> / <code>es-nodecimaldot</code></td><td>Keep <code>3.14</code> with a point in math (the default prints <code>3,14</code>)</td></tr>
                <tr><td><code>\unaccentedoperators</code></td><td><code>\lim</code>, <code>\max</code>, <code>\min</code> without the accent (lím, máx, mín by default)</td></tr>
                <tr><td><code>es-noshorthands</code></td><td>Turns off the shorthands for <code>&lt;&lt;</code>, <code>&gt;&gt;</code> and <code>&quot;</code>, which can clash with other packages</td></tr>
                <tr><td><code>mexico</code> instead of <code>spanish</code></td><td>Mexican conventions, including the decimal point</td></tr>
                <tr><td><code>es-noindentfirst</code></td><td>No indent on the first paragraph after a heading</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            For accents, ñ, ¿ and ¡ without a Spanish keyboard (<code>{`\\'a`}</code>,{' '}
            <code>{`\\~n`}</code>, <code>?`</code>, <code>!`</code>), see{' '}
            <Link href="/blog/spanish-characters-latex-accents-special-letters">Spanish
            characters in LaTeX</Link> and the{' '}
            <Link href="/learn/special-characters">special characters guide</Link>. If TikZ
            arrows break after loading Spanish, add <code>{`\\usetikzlibrary{babel}`}</code> (see
            the errors table below).
          </p>

          {/* ── French and German ── */}
          <h2>French and German: Quotes, \og and Hyphenation</h2>
          <p>
            French babel adds the thin space French typography puts before{' '}
            <code>;</code> <code>:</code> <code>!</code> <code>?</code>, and{' '}
            <code>\og</code> &hellip; <code>{`\\fg{}`}</code> print guillemets with the right
            spacing. German (<code>ngerman</code> for the reformed spelling) adds shorthands such
            as <code>{`"\``}</code> &hellip; <code>{`"'`}</code> for &bdquo;German quotes&ldquo;
            and <code>{`"-`}</code> for an extra hyphenation point:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage[ngerman,french]{babel}      % French is the main language
\\usepackage[autostyle]{csquotes}        % \\enquote picks the right quotes

\\begin{document}

Il a dit : \\og Bonjour ! \\fg{} Puis il est parti ; quel dommage !

\\enquote{Citation automatique} en français.

\\begin{otherlanguage}{ngerman}
Er sagte: "\`Guten Tag!"' und ging. \\glqq Auch so\\grqq{} geht es.

\\enquote{Automatische Anführungszeichen} auf Deutsch.

Donau"-dampf"-schiff"-fahrt hat zusätzliche Trennstellen.
\\end{otherlanguage}

\\end{document}`}</code></pre>
          <p>
            <code>csquotes</code> is the most portable option: <code>{`\\enquote{...}`}</code>{' '}
            always produces the quotation marks of the current language. More on quotation marks
            in <Link href="/learn/quotes">quotes in LaTeX</Link>.
          </p>

          {/* ── Arabic / Hebrew ── */}
          <h2>Arabic and Hebrew: Right-to-Left Text</h2>
          <p>
            Arabic and Hebrew need XeLaTeX (or LuaLaTeX), a font with the script, and a package
            that handles right-to-left direction. With polyglossia, declaring the language loads{' '}
            <code>bidi</code> for you, and <code>\arabicfont</code> or{' '}
            <code>\hebrewfont</code> tells it which font to use:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{polyglossia}
\\setdefaultlanguage{english}
\\setotherlanguages{arabic, hebrew}

% Amiri and FreeSerif ship with TeX Live; any installed font with the script works,
% e.g. \\newfontfamily\\arabicfont[Script=Arabic]{Amiri}
\\newfontfamily\\arabicfont[Script=Arabic, Extension=.ttf,
  UprightFont=*-Regular, BoldFont=*-Bold]{Amiri}
\\newfontfamily\\hebrewfont[Script=Hebrew]{FreeSerif.otf}

\\begin{document}

English text with an Arabic phrase: \\textarabic{مرحبا بالعالم}.

\\begin{Arabic}
هذه فقرة كاملة باللغة العربية، تُكتب من اليمين إلى اليسار. \\textbf{نص عريض}.
\\end{Arabic}

And Hebrew: \\texthebrew{שלום עולם}.

\\end{document}`}</code></pre>
          <p>
            For a document that is mainly in Arabic, swap the roles:{' '}
            <code>{`\\setdefaultlanguage{arabic}`}</code> and{' '}
            <code>{`\\setotherlanguage{english}`}</code>; headings, numbering and the table of
            contents then run right to left. Older alternatives exist: <code>arabtex</code>{' '}
            works with pdfLaTeX but expects a Latin transliteration as input, and{' '}
            <code>arabxetex</code> is a XeLaTeX package with its own <code>arab</code>{' '}
            environment. With LuaLaTeX, modern babel handles Arabic through{' '}
            <code>{`\\babelprovide[import]{arabic}`}</code> and the <code>bidi=basic</code>{' '}
            option.
          </p>

          {/* ── CJK ── */}
          <h2>Chinese, Japanese and Korean</h2>
          <p>
            Chinese is simplest with the <code>ctex</code> classes, which set up fonts, line
            breaking and Chinese headings in one line. Compile with XeLaTeX:
          </p>
          <pre><code>{`\\documentclass[fontset=fandol]{ctexart}   % Fandol fonts ship with TeX Live

\\begin{document}

\\section{简介}
你好，世界！这是一个中文文档。\\today

\\end{document}`}</code></pre>
          <p>
            Leave out <code>fontset=fandol</code> and ctex picks fonts for your operating
            system. To keep an ordinary class and add CJK text to it, use <code>xeCJK</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{xeCJK}
% With an installed font: \\setCJKmainfont{Noto Serif CJK SC}
\\setCJKmainfont{FandolSong}[Extension=.otf, UprightFont=*-Regular, BoldFont=*-Bold]

\\begin{document}
English and 中文 in one line, with \\textbf{粗体} for bold.
\\end{document}`}</code></pre>
          <p>
            With pdfLaTeX, the <code>CJKutf8</code> package works without font setup: wrap the
            text in <code>{`\\begin{CJK}{UTF8}{gbsn} ... \\end{CJK}`}</code> (<code>gbsn</code>{' '}
            and <code>gkai</code> for simplified Chinese, <code>bsmi</code> for traditional,{' '}
            <code>min</code> for Japanese, <code>mj</code> for Korean). Japanese documents are
            usually written with LuaLaTeX and <code>luatexja</code>, or the{' '}
            <code>bxjsarticle</code> class; Korean with <code>kotex</code>.
          </p>

          {/* ── Cyrillic and Greek ── */}
          <h2>Russian and Greek: T2A and LGR Encodings</h2>
          <p>
            pdfLaTeX needs a font encoding for each non-Latin alphabet: <code>T2A</code> for
            Cyrillic, <code>LGR</code> for Greek. List it in <code>fontenc</code>, with the
            encoding of the main language last:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T2A,T1]{fontenc}             % Cyrillic and Latin (pdfLaTeX)
\\usepackage{PTSerif}                     % a serif font with Cyrillic glyphs
\\usepackage[russian,english]{babel}

\\begin{document}
English text, and then \\foreignlanguage{russian}{Привет, мир!}

\\selectlanguage{russian}
\\section{Введение}
Сегодня \\today.
\\end{document}`}</code></pre>
          <pre><code>{`\\documentclass{article}
\\usepackage[LGR,T1]{fontenc}             % Greek and Latin (pdfLaTeX)
\\usepackage[greek,english]{babel}

\\begin{document}
English, then \\foreignlanguage{greek}{Καλημέρα κόσμε}.
\\end{document}`}</code></pre>
          <p>
            With XeLaTeX or LuaLaTeX, skip the encodings and pick a font that covers Cyrillic and
            Greek. Latin Modern does not, so the default font prints nothing for those letters:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{polyglossia}
\\setdefaultlanguage{russian}
\\setotherlanguages{english, greek}
% FreeSerif ships with TeX Live; an installed font works by name, e.g. \\setmainfont{CMU Serif}
\\setmainfont{FreeSerif}[Extension=.otf, BoldFont=*Bold, ItalicFont=*Italic, BoldItalicFont=*BoldItalic]

\\begin{document}
\\section{Введение}
Текст на русском, \\textgreek{λίγα ελληνικά} и \\textenglish{some English}.
\\end{document}`}</code></pre>
          <p>
            Greek letters in <em>math</em> need none of this: <code>\alpha</code> and{' '}
            <code>\Omega</code> work in any language (see{' '}
            <Link href="/learn/greek-alphabet">the Greek alphabet in LaTeX</Link>).
          </p>

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
                  <td><em>Package babel Error: Unknown option &apos;spansh&apos;. Suggested actions: Make sure you haven&apos;t misspelled it</em></td>
                  <td>Misspelled language name, or a name babel does not know</td>
                  <td>Check the spelling: <code>spanish</code>, <code>ngerman</code>, <code>french</code>, <code>russian</code>; for newer languages use <code>{`\\babelprovide`}</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Unicode character П (U+041F) not set up for use with LaTeX</em></td>
                  <td>Cyrillic or Greek letters under pdfLaTeX without the font encoding</td>
                  <td><code>{`\\usepackage[T2A,T1]{fontenc}`}</code> (or <code>LGR</code> for Greek), or switch to XeLaTeX</td>
                </tr>
                <tr>
                  <td>Arabic, Chinese or Cyrillic text shows boxes or is blank; log says <em>Missing character: There is no &hellip; in font lmroman10-regular</em></td>
                  <td>The font has no glyphs for that script</td>
                  <td>Set a font that has them: <code>\arabicfont</code>, <code>\setCJKmainfont</code>, <code>\setmainfont</code></td>
                </tr>
                <tr>
                  <td><em>Package polyglossia Error: The current main roman font, lmroman10-regular, does not contain the &quot;Arabic&quot; script!</em></td>
                  <td>No <code>\arabicfont</code> defined</td>
                  <td><code>{`\\newfontfamily\\arabicfont[Script=Arabic]{Amiri}`}</code></td>
                </tr>
                <tr>
                  <td><em>Package fontspec Error: The font &quot;Amiri&quot; cannot be found</em></td>
                  <td>The font is not installed under that name, or you compiled with pdfLaTeX</td>
                  <td>Compile with XeLaTeX; use an installed font name or the file name (<code>Amiri-Regular.ttf</code>)</td>
                </tr>
                <tr>
                  <td><em>Argument of \language@active@arg&gt; has an extra &#125;</em> in a TikZ picture</td>
                  <td>babel shorthands (Spanish <code>&lt;</code> <code>&gt;</code>, French <code>:</code> <code>!</code>) clash with TikZ syntax</td>
                  <td><code>{`\\usetikzlibrary{babel}`}</code>, or <code>es-noshorthands</code> for Spanish</td>
                </tr>
                <tr>
                  <td><em>No hyphenation patterns were preloaded for the language &hellip;</em> (babel warning)</td>
                  <td>The TeX installation has no patterns for that language</td>
                  <td>Install the language collection (e.g. <code>collection-langspanish</code>); Overleaf and Octree have all of them</td>
                </tr>
                <tr>
                  <td>Spanish tables are captioned &ldquo;Cuadro&rdquo;</td>
                  <td>babel&apos;s traditional Spanish default</td>
                  <td><code>{`\\usepackage[spanish, es-tabla]{babel}`}</code></td>
                </tr>
                <tr>
                  <td><code>{`\\renewcommand{\\contentsname}{...}`}</code> has no effect</td>
                  <td>babel resets captions when the language starts</td>
                  <td><code>{`\\addto\\captionsspanish{\\renewcommand{\\contentsname}{Contenido}}`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I change the language of a LaTeX document?</h3>
          <p>
            With pdfLaTeX, load babel with the language as an option:{' '}
            <code>{`\\usepackage[spanish]{babel}`}</code> (plus{' '}
            <code>{`\\usepackage[T1]{fontenc}`}</code> for accented letters). With XeLaTeX or
            LuaLaTeX, use polyglossia and <code>{`\\setdefaultlanguage{spanish}`}</code>. Either
            way the language sets the captions (&ldquo;Índice&rdquo;, &ldquo;Capítulo&rdquo;), the
            date from <code>\today</code>, hyphenation and typographic rules.
          </p>
          <h3>How do I write LaTeX in Spanish?</h3>
          <p>
            Add <code>{`\\usepackage[T1]{fontenc}`}</code> and{' '}
            <code>{`\\usepackage[spanish]{babel}`}</code> to the preamble and type accents and ñ
            directly; UTF-8 input is the default since 2018. Add the <code>es-tabla</code> option
            if tables should be captioned &ldquo;Tabla&rdquo; instead of &ldquo;Cuadro&rdquo;, and{' '}
            <code>\decimalpoint</code> if you want 3.14 rather than 3,14 in math.
          </p>
          <h3>How do I write Arabic in LaTeX?</h3>
          <p>
            Compile with XeLaTeX, load polyglossia, declare{' '}
            <code>{`\\setotherlanguage{arabic}`}</code> (or{' '}
            <code>{`\\setdefaultlanguage{arabic}`}</code>) and give it a font that has Arabic
            glyphs with <code>{`\\newfontfamily\\arabicfont[Script=Arabic]{Amiri}`}</code>. Then
            write <code>{`\\textarabic{...}`}</code> for a phrase or the <code>Arabic</code>{' '}
            environment for paragraphs; text runs right to left automatically.
          </p>
          <h3>Should I use babel or polyglossia?</h3>
          <p>
            Use babel with pdfLaTeX, which is still the default compiler on most platforms. With
            XeLaTeX, polyglossia is the traditional choice and handles right-to-left scripts
            well. Modern babel also works with XeLaTeX and LuaLaTeX and supports more languages,
            so on LuaLaTeX babel is the usual recommendation today.
          </p>
          <h3>How do I write Chinese or Japanese in LaTeX?</h3>
          <p>
            For Chinese, the simplest route is the <code>ctexart</code> class compiled with
            XeLaTeX: <code>{`\\documentclass{ctexart}`}</code>, then type Chinese directly. For
            mixed documents, load <code>xeCJK</code> and set a CJK font with{' '}
            <code>\setCJKmainfont</code>. With pdfLaTeX, the <code>CJKutf8</code> package and a{' '}
            <code>{`\\begin{CJK}{UTF8}{gbsn}`}</code> environment work. Japanese is usually written
            with LuaLaTeX and <code>luatexja</code>.
          </p>
          <h3>How do I use two languages in one LaTeX document?</h3>
          <p>
            List all languages in the babel options, with the main one last:{' '}
            <code>{`\\usepackage[french,english]{babel}`}</code>. Use{' '}
            <code>{`\\foreignlanguage{french}{...}`}</code> for a phrase, the{' '}
            <code>otherlanguage</code> environment for a passage, and{' '}
            <code>{`\\selectlanguage{french}`}</code> to switch for the rest of the document. Each
            switch changes hyphenation and, for <code>\selectlanguage</code>, captions and dates
            too.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/blog/spanish-characters-latex-accents-special-letters">Spanish Characters in LaTeX (blog)</Link> &ndash; Accents, ñ, ¿ and ¡ with and without UTF-8</li>
            <li><Link href="/learn/special-characters">Special Characters</Link> &ndash; Accents and symbols that need escaping</li>
            <li><Link href="/learn/quotes">Quotes in LaTeX</Link> &ndash; Quotation marks for every language with csquotes</li>
            <li><Link href="/learn/table-of-contents">Table of Contents in LaTeX</Link> &ndash; Renaming &ldquo;Contents&rdquo; under babel</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics every document builds on</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile any example above and see the result instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a document in any language and get the LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="language" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write LaTeX in any language with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree has the full TeX Live with every language, font and compiler. Ask its AI to
              set up babel or polyglossia, fix right-to-left text or translate your captions,
              with the PDF compiled next to your code.
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
