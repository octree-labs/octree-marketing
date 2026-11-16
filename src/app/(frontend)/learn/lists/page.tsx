import type { Metadata } from 'next/types'

import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('Lists and Bullet Points', 'lists')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'lists',
  title: 'Lists and Bullet Points in LaTeX: itemize, enumerate, description',
  seoTitle: 'Lists and Bullet Points in LaTeX',
  description:
    'Bullet points and numbered lists in LaTeX: itemize, enumerate and description, custom bullets, enumitem labels and spacing, inline lists and Beamer.',
  keywords:
    "bullet points in latex, latex bullet points, latex list, latex itemize, latex enumerate, latex numbered list, latex number list, numbered list latex, numbering latex, numbers in latex, latex enumerate start number, latex enumerate resume, latex nested numbering, latex setcounter enumi, latex description list, latex enumerate letters, enumerate with letters latex, latex lettered list, latex custom bullets, latex nested list, enumitem latex, latex list spacing, latex inline list, latex bullet symbol, latex checkmark bullet, latex change bullet style, latex resume list numbering, latex beamer itemize, something's wrong perhaps a missing item, too deeply nested latex, latex itemize enumerate description, latex star bullet, latex list indentation, latex leftmargin, latex multicolumn list",
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-16'

const faq: FaqItem[] = [
  {
    question: 'How do I make bullet points in LaTeX?',
    answer:
      'Use the itemize environment and start each bullet with \\item: \\begin{itemize} \\item First \\item Second \\end{itemize}. In the standard article, report and book classes, LaTeX draws a round bullet at the first level, a dash at the second, an asterisk at the third and a centred dot at the fourth.',
  },
  {
    question: 'How do I change the bullet symbol in LaTeX?',
    answer:
      'For one item, put the symbol in square brackets: \\item[--] or \\item[$\\circ$]. For the whole document, redefine the level in the preamble: \\renewcommand{\\labelitemi}{$\\bullet$} for level one, \\labelitemii for level two, and so on. With enumitem you can write \\begin{itemize}[label=$\\ast$] or \\setlist[itemize]{label=--}.',
  },
  {
    question: 'How do I make a numbered list in LaTeX?',
    answer:
      'Use enumerate instead of itemize: \\begin{enumerate} \\item First \\item Second \\end{enumerate}. For letters or Roman numerals load enumitem and write \\begin{enumerate}[label=(\\alph*)] or [label=\\roman*.].',
  },
  {
    question: 'How do I make an enumerate list with letters in LaTeX?',
    answer:
      'Load enumitem and write \\begin{enumerate}[label=(\\alph*)] for (a), (b), (c), [label=\\alph*)] for a), b), c) or [label=\\Alph*.] for A., B., C. Without a package, put \\renewcommand{\\theenumi}{\\alph{enumi}} and \\renewcommand{\\labelenumi}{(\\theenumi)} in the preamble. A nested enumerate is lettered (a), (b), (c) by default.',
  },
  {
    question: 'How do I remove the space between list items?',
    answer:
      'Load enumitem and add the noitemsep option to the list (\\begin{itemize}[noitemsep]) to remove the gap between items, or nosep to remove the space above and below the list too. \\setlist{nosep} in the preamble applies it to every list.',
  },
  {
    question: 'How do I continue numbering from a previous list?',
    answer:
      'With enumitem, start the second list with \\begin{enumerate}[resume] and it carries on from where the last enumerate stopped. To start at an arbitrary number use [start=3].',
  },
  {
    question: 'How do I make a numbered list start at a specific number in LaTeX?',
    answer:
      'Load enumitem and write \\begin{enumerate}[start=5]; the first item is then 5. Without a package, put \\setcounter{enumi}{4} right after \\begin{enumerate}: the counter holds the previous number, so set it to one less than the number you want.',
  },
  {
    question: 'How do I get nested numbering like 1.1 and 1.2 in a LaTeX list?',
    answer:
      'Build the label of the inner list from the outer counter with enumitem: \\begin{enumerate}[label=\\arabic{enumi}.\\arabic*.] inside a normal enumerate gives 1.1, 1.2. Add \\arabic{enumii} for a third level (1.2.1), or set it for all lists with \\setlist[enumerate,2]{label=\\arabic{enumi}.\\arabic*.}.',
  },
  {
    question: "What does “Something's wrong––perhaps a missing \\item” mean?",
    answer:
      'LaTeX found text, a table or a blank list before the first \\item inside itemize or enumerate, or the list has no items at all. Move the text after an \\item, or delete the empty list. The same message appears when a tabular or figure sits inside a list without an \\item before it.',
  },
]

export default async function LaTeXListsPage() {
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
        datePublished="2026-11-09"
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
          <h1>Lists and Bullet Points in LaTeX: itemize, enumerate, description</h1>
          <p className="lead">
            Bullet points in LaTeX come from the <code>itemize</code> environment, numbered lists
            from <code>enumerate</code>, and term-and-definition lists from <code>description</code>
            . Every entry starts with <code>\item</code>. This guide covers the three environments,
            custom bullets and nested numbering, the <code>enumitem</code> package for labels,
            spacing and resumed numbering, inline lists, lists in Beamer, and the two errors
            everyone meets: <em>Something&apos;s wrong&ndash;&ndash;perhaps a missing \item</em> and{' '}
            <em>Too deeply nested</em>.
          </p>

          <pre>
            <code>{`\\begin{itemize}
  \\item First point
  \\item Second point
\\end{itemize}

\\begin{enumerate}
  \\item First step
  \\item Second step
\\end{enumerate}

\\begin{description}
  \\item[LaTeX] A typesetting system.
  \\item[Octree] An AI LaTeX editor.
\\end{description}`}</code>
          </pre>
          <h2>Bullet Points with itemize</h2>
          <p>
            The <code>itemize</code> environment creates a bulleted (unordered) list. Each entry
            begins with the <code>\item</code> command:
          </p>
          <pre>
            <code>{`\\begin{itemize}
  \\item First item
  \\item Second item
  \\item Third item
\\end{itemize}`}</code>
          </pre>
          <p>
            By default, LaTeX uses a solid round bullet (<code>\textbullet</code>) for first-level
            items. You can add as many <code>\item</code> entries as you need, and an item can run
            over several paragraphs: leave a blank line inside the item and LaTeX applies the list
            paragraph settings to the second paragraph. Do not insert another item unless you want
            another bullet.
          </p>
          <pre>
            <code>{`\\begin{itemize}
  \\item First paragraph of the item.

        Second paragraph of the same item, still indented.
  \\item Next item.
\\end{itemize}`}</code>
          </pre>

          <h3>Changing the bullet for one item</h3>
          <p>
            Override the default bullet for a single item by placing the desired symbol in square
            brackets after <code>\item</code>. An empty pair of brackets removes the bullet
            entirely:
          </p>
          <pre>
            <code>{`\\begin{itemize}
  \\item Default bullet
  \\item[--] Dash (an en dash)
  \\item[*] Asterisk
  \\item[$\\diamond$] Diamond
  \\item[] No bullet at all
\\end{itemize}`}</code>
          </pre>
          <p>
            Note that an item whose text starts with a square bracket, such as{' '}
            <code>\item [a, b] is an interval</code>, is read as a custom label. Write{' '}
            <code>\item {`{[a, b]}`} is an interval</code> or <code>\item\relax [a, b]</code> to
            keep the bracket in the text.
          </p>
          <h2>Numbered Lists in LaTeX: enumerate, Custom Numbering and Resuming</h2>
          <p>
            The <code>enumerate</code> environment produces a numbered (ordered) list. LaTeX
            automatically handles the numbering:
          </p>
          <pre>
            <code>{`\\begin{enumerate}
  \\item First step
  \\item Second step
  \\item Third step
\\end{enumerate}`}</code>
          </pre>
          <p>
            The default numbering style is Arabic numerals (1., 2., 3.) at the first level,
            lowercase letters in parentheses ((a), (b), (c)) at the second, Roman numerals (i., ii.,
            iii.) at the third, and uppercase letters (A., B., C.) at the fourth. Numbered items can
            be referenced: put <code>\label</code> after the <code>\item</code> and{' '}
            <code>\ref</code> prints the number.
          </p>
          <pre>
            <code>{`\\begin{enumerate}
  \\item Mix the dry ingredients. \\label{step:dry}
  \\item Add the eggs.
\\end{enumerate}
Go back to step~\\ref{step:dry} if the batter is lumpy.`}</code>
          </pre>

          <h3>Enumerate with Letters: (a), (b), (c)</h3>
          <p>
            To number a list with letters instead of numbers, load <code>enumitem</code> and pass a{' '}
            <code>label</code> built from <code>\alph*</code> (lowercase) or <code>\Alph*</code>{' '}
            (uppercase). The characters around it are printed as written, so the same key gives (a),
            a) or A.:
          </p>
          <pre>
            <code>{`\\usepackage{enumitem}

\\begin{enumerate}[label=(\\alph*)]
  \\item First item
  \\item Second item
\\end{enumerate}

\\begin{enumerate}[label=\\alph*)]
  \\item First item
  \\item Second item
\\end{enumerate}

\\begin{enumerate}[label=\\Alph*.]
  \\item First item
  \\item Second item
\\end{enumerate}`}</code>
          </pre>
          <p>
            Two details: when you set a custom <code>label</code> with enumitem, <code>\ref</code>{' '}
            normally includes its punctuation, parentheses included, unless you add{' '}
            <code>ref=\alph*</code>; and letters stop at z, so a 27th item stops the build with{' '}
            <em>LaTeX Error: Counter too large</em>. Switch to numbers or split the list for
            anything longer.
          </p>

          <h3>Start at a number and resume numbering</h3>
          <p>
            A numbered list that is interrupted by a paragraph, a figure or an equation can carry on
            where it stopped. With <code>enumitem</code> use <code>resume</code>; to begin at a
            chosen number use <code>start</code>. Without the package, set the counter{' '}
            <code>enumi</code> by hand right after <code>{`\\begin{enumerate}`}</code>; it holds the
            number of the <em>previous</em> item, so set it to one less than the number you want:
          </p>
          <pre>
            <code>{`\\documentclass{article}
\\usepackage{enumitem}
\\begin{document}

\\begin{enumerate}
  \\item One
  \\item Two
\\end{enumerate}
Some text that interrupts the list.
\\begin{enumerate}[resume]
  \\item Three
  \\item Four
\\end{enumerate}

\\begin{enumerate}[start=5]
  \\item Five
  \\item Six
\\end{enumerate}

\\begin{enumerate}
  \\setcounter{enumi}{9}
  \\item Ten
  \\item Eleven
\\end{enumerate}

\\end{document}`}</code>
          </pre>
          <p>
            The counters are <code>enumi</code>, <code>enumii</code>, <code>enumiii</code> and{' '}
            <code>enumiv</code> for the four levels. <code>\setcounter</code> also works in the
            middle of a list, to skip numbers. To print the current number in the text, use{' '}
            <code>\theenumi</code>, or better <code>\label</code> and <code>\ref</code>.
          </p>

          <h3>Nested numbering: 1.1, 1.2, 1.2.1</h3>
          <p>
            By default a nested list restarts with its own style, (a), (b). For legal-style or
            outline numbering, where each level repeats the numbers above it, build the label from
            the parent counters:
          </p>
          <pre>
            <code>{`\\documentclass{article}
\\usepackage{enumitem}
\\begin{document}

\\begin{enumerate}[label=\\arabic*.]
  \\item Scope
  \\begin{enumerate}[label=\\arabic{enumi}.\\arabic*.]
    \\item Purpose
    \\item Audience
    \\begin{enumerate}[label=\\arabic{enumi}.\\arabic{enumii}.\\arabic*.]
      \\item Students
      \\item Researchers
    \\end{enumerate}
  \\end{enumerate}
  \\item Method
\\end{enumerate}

\\end{document}`}</code>
          </pre>
          <p>
            To apply the same scheme to every list in the document, put it in the preamble with{' '}
            <code>{`\\setlist[enumerate,2]{label=\\arabic{enumi}.\\arabic*.}`}</code> and{' '}
            <code>{`\\setlist[enumerate,3]{label=\\arabic{enumi}.\\arabic{enumii}.\\arabic*.}`}</code>
            . For numbered headings rather than list items, see{' '}
            <Link href="/learn/sections">sections and subsections</Link>; for numbered equations,{' '}
            <Link href="/learn/equation-numbering">equation numbering</Link>.
          </p>
          <h2>Description Lists</h2>
          <p>
            A <code>description</code> list highlights a term followed by its explanation. Use{' '}
            <code>\item[Term]</code> to set the label:
          </p>
          <pre>
            <code>{`\\begin{description}
  \\item[LaTeX] A document preparation system for high-quality typesetting.
  \\item[TikZ] A package for creating graphics programmatically.
  \\item[BibTeX] A tool for managing bibliographic references.
\\end{description}`}</code>
          </pre>
          <p>
            The term inside the brackets is rendered in bold by default, making description lists
            ideal for glossaries, feature lists, and FAQs. With <code>enumitem</code> you can change
            the label font, move a definition below a label that exceeds the available margin, or
            align terms in a column. The nextline style does not force every short label onto its
            own line:
          </p>
          <pre>
            <code>{`\\usepackage{enumitem}

\\begin{description}[style=nextline,leftmargin=2cm]
  \\item[A deliberately long term] This label exceeds the margin, so the definition starts below it.
\\end{description}

\\begin{description}[font=\\normalfont\\itshape, leftmargin=3cm, labelwidth=2.5cm]
  \\item[Term] Italic terms aligned in a 2.5 cm column.
\\end{description}`}</code>
          </pre>
          <h3>Spacing between items: noitemsep and nosep</h3>
          <p>
            By default, LaTeX adds vertical space between items and around the list. The two
            shortcuts most people need are <code>noitemsep</code>, which removes the gap between
            items but keeps the space above and below the list, and <code>nosep</code>, which
            removes all of it:
          </p>
          <pre>
            <code>{`\\begin{itemize}[noitemsep]
  \\item Items touch, list still has space around it
  \\item Second item
\\end{itemize}

\\begin{enumerate}[nosep]
  \\item Fully compact
  \\item Second item
\\end{enumerate}


\\begin{itemize}[
  topsep=4pt,
  itemsep=2pt,
  parsep=0pt,
  partopsep=0pt,
  leftmargin=1.5em
]
  \\item First item
  \\item Second item
\\end{itemize}


\\begin{itemize}[itemsep=0.5em]
  \\item Roomy
  \\item Items
\\end{itemize}`}</code>
          </pre>
          <p>
            Without enumitem you can still add space after a single item with{' '}
            <code>\item Text \vspace{`{4pt}`}</code>, but it is a one-off fix; set{' '}
            <code>itemsep</code> for anything you want to look consistent.
          </p>

          <h3>Margins and wide labels</h3>
          <p>
            The enumitem option <code>leftmargin=*</code> calculates an indent from a sample label,
            not by scanning every item. For a list reaching two digits, also set
            <code>widest=99</code> so the reserved space fits labels such as Step 10. A fixed{' '}
            <code>leftmargin=2cm</code> instead sets the text indent directly. Prefer local options
            while testing; use <code>\setlist</code> in the preamble only when the same formatting
            should apply throughout the document.
          </p>
          <pre>
            <code>{`\\documentclass{article}
\\usepackage{enumitem}
\\begin{document}
\\begin{enumerate}[label=Step \\arabic*:,start=9,widest=99,leftmargin=*]
  \\item Check the input.
  \\item Save the output.
\\end{enumerate}
\\end{document}`}</code>
          </pre>

          <h2>Inline Lists with enumerate*</h2>
          <p>
            Load <code>enumitem</code> with the <code>[inline]</code> option and the starred
            environments <code>enumerate*</code>, <code>itemize*</code> and{' '}
            <code>description*</code> set their items inside the running paragraph. Perfect for
            short sequences:
          </p>
          <pre>
            <code>{`\\usepackage[inline]{enumitem}

The primary colours are
\\begin{enumerate*}[label=(\\roman*)]
  \\item red,
  \\item blue and
  \\item yellow.
\\end{enumerate*}


We need
\\begin{enumerate*}[label=(\\alph*), itemjoin={{, }}, itemjoin*={{, and }}]
  \\item a compiler
  \\item an editor
  \\item a PDF viewer
\\end{enumerate*}.



\\begin{itemize*}[label={}, itemjoin={{; }}, itemjoin*={{; and }}]
  \\item first
  \\item second
  \\item third
\\end{itemize*}`}</code>
          </pre>
          <p>
            <code>itemjoin</code> is placed between items and <code>itemjoin*</code> between the
            last two, which is how you get the serial comma before &ldquo;and&rdquo;. The older{' '}
            <code>paralist</code> package offers <code>inparaenum</code> for the same purpose.
          </p>
          <h2>Lists in Beamer</h2>
          <p>
            Beamer uses the same <code>itemize</code> and <code>enumerate</code> environments, with
            two additions: overlay specifications reveal items one slide at a time, and the bullet
            shape is set by the theme through <code>\setbeamertemplate</code> rather than{' '}
            <code>\labelitemi</code>.
          </p>
          <pre>
            <code>{`\\documentclass{beamer}
\\setbeamertemplate{itemize items}[circle]
\\setbeamertemplate{enumerate items}[default]

\\begin{document}
\\begin{frame}{Plan}
  \\begin{itemize}[<+->]
    \\item First point
    \\item Second point
  \\end{itemize}

  \\begin{enumerate}
    \\item<1-> Visible from the first slide
    \\item<2-> Appears on the second
  \\end{enumerate}

  \\begin{enumerate}[(a)]
    \\item Lettered
  \\end{enumerate}
\\end{frame}
\\end{document}`}</code>
          </pre>
          <p>
            Avoid loading <code>enumitem</code> in a Beamer document: both redefine the list
            environments and the overlay syntax stops working. Use Beamer&apos;s templates and its{' '}
            <code>[(a)]</code>-style optional argument instead. For a single custom glyph,{' '}
            <code>{`\\setbeamertemplate{itemize item}{\\textbullet}`}</code> and{' '}
            <code>{`\\setbeamertemplate{itemize subitem}{--}`}</code> set level one and two.
          </p>
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
                  <td>
                    <em>
                      LaTeX Error: Something&apos;s wrong&ndash;&ndash;perhaps a missing \item
                    </em>
                  </td>
                  <td>
                    Text, a <code>tabular</code>, a figure or a nested list appears before the first{' '}
                    <code>\item</code>; or the list is empty
                  </td>
                  <td>
                    Put an <code>\item</code> before the content, or remove the empty environment
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>LaTeX Error: Too deeply nested</em>
                  </td>
                  <td>More than four levels of the same list type (or six list levels in total)</td>
                  <td>
                    Restructure, or with enumitem: <code>{`\\setlistdepth{9}`}</code> then{' '}
                    <code>{`\\renewlist{itemize}{itemize}{9}`}</code> and{' '}
                    <code>{`\\setlist[itemize]{label=\\textbullet}`}</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>Lonely \item&ndash;&ndash;perhaps a missing list environment</em>
                  </td>
                  <td>
                    <code>\item</code> outside any list, often after a stray <code>\end</code>
                  </td>
                  <td>
                    Check that <code>\begin</code> and <code>\end</code> match
                  </td>
                </tr>
                <tr>
                  <td>Item text swallowed as a label</td>
                  <td>
                    The text starts with <code>[</code>
                  </td>
                  <td>
                    <code>\item {`{[a, b]}`}</code> or <code>\item\relax [a, b]</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>Undefined control sequence \checkmark</em> / <em>\faCheck</em> /{' '}
                    <em>\ding</em>
                  </td>
                  <td>Package not loaded</td>
                  <td>
                    Load <code>amssymb</code>, <code>fontawesome5</code> or <code>pifont</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>[resume]</code> or <code>[label=...]</code> printed as text, or a
                    &ldquo;missing \item&rdquo; error on that line
                  </td>
                  <td>
                    enumitem not loaded, or the old <code>enumerate</code> package is loaded
                    alongside it
                  </td>
                  <td>
                    <code>{`\\usepackage{enumitem}`}</code> and remove{' '}
                    <code>{`\\usepackage{enumerate}`}</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    Beamer overlays like <code>&lt;+-&gt;</code> stop working
                  </td>
                  <td>enumitem loaded in a Beamer document</td>
                  <td>
                    Remove enumitem; use <code>\setbeamertemplate</code> for styling
                  </td>
                </tr>
                <tr>
                  <td>Labels overlap the text (e.g. &ldquo;Step 10:&rdquo;)</td>
                  <td>Fixed default indent is narrower than the label</td>
                  <td>
                    <code>[leftmargin=*, widest=99]</code> for two-digit labels
                  </td>
                </tr>
                <tr>
                  <td>Numbering restarts at 1 after a paragraph</td>
                  <td>
                    Each <code>enumerate</code> is a new list
                  </td>
                  <td>
                    <code>[resume]</code> on the second list
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2>Frequently Asked Questions</h2>
          {faq.map(({ question, answer }) => (
            <React.Fragment key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </React.Fragment>
          ))}

          <h2>Related guides and a place to test</h2>
          <ul>
            <li>
              <Link href="/learn/sections">Sections and headings</Link>
            </li>
            <li>
              <Link href="/learn/tables">LaTeX tables</Link>
            </li>
            <li>
              <Link href="/learn/special-characters">Special characters</Link>
            </li>
          </ul>
          <p>
            Paste a complete example into the{' '}
            <Link href="https://tools.useoctree.com/tools/latex-preview">LaTeX preview tool</Link>{' '}
            to inspect the PDF before adding it to your project.
          </p>

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write LaTeX lists faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor helps you generate and format LaTeX lists, nested structures,
              and custom numbering &ndash; so you can focus on your content instead of syntax.
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
