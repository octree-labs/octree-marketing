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

const breadcrumbs = getLearnBreadcrumbs('Lists and Bullet Points', 'lists')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'lists',
  title: 'Lists and Bullet Points in LaTeX: itemize, enumerate, description',
  seoTitle: 'Lists and Bullet Points in LaTeX',
  description: 'Bullet points and numbered lists in LaTeX: itemize, enumerate and description, custom bullets, enumitem labels and spacing, inline lists and Beamer.',
  keywords: 'bullet points in latex, latex bullet points, latex list, latex itemize, latex enumerate, latex numbered list, latex description list, latex enumerate letters, enumerate with letters latex, latex lettered list, latex custom bullets, latex nested list, enumitem latex, latex list spacing, latex inline list, latex bullet symbol, latex checkmark bullet, latex change bullet style, latex resume list numbering, latex beamer itemize, something\'s wrong perhaps a missing item, too deeply nested latex, latex itemize enumerate description, latex star bullet, latex list indentation, latex leftmargin, latex multicolumn list',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-24'

const faq: FaqItem[] = [
  {
    question: 'How do I make bullet points in LaTeX?',
    answer:
      'Use the itemize environment and start each bullet with \\item: \\begin{itemize} \\item First \\item Second \\end{itemize}. LaTeX draws a round bullet at the first level, a dash at the second, an asterisk at the third and a centred dot at the fourth.',
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
    question: 'What does "Something\'s wrong--perhaps a missing \\item" mean?',
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
            from <code>enumerate</code>, and term-and-definition lists from{' '}
            <code>description</code>. Every entry starts with <code>\item</code>. This guide
            covers the three environments, custom bullets (dashes, circles, checkmarks, icons),
            nesting and the default bullet sequence, the <code>enumitem</code> package for labels,
            spacing and resumed numbering, inline lists, lists in Beamer, a cheat sheet, and the
            two errors everyone meets: <em>Something&apos;s wrong&ndash;&ndash;perhaps a missing
            \item</em> and <em>Too deeply nested</em>.
          </p>

          <pre><code>{`\\begin{itemize}          % bullet points
  \\item First point
  \\item Second point
\\end{itemize}

\\begin{enumerate}        % numbered list
  \\item First step
  \\item Second step
\\end{enumerate}

\\begin{description}      % term : definition
  \\item[LaTeX] A typesetting system.
  \\item[Octree] An AI LaTeX editor.
\\end{description}`}</code></pre>

          {/* ── Unordered Lists (itemize) ── */}
          <h2>Bullet Points with itemize</h2>
          <p>
            The <code>itemize</code> environment creates a bulleted (unordered) list. Each
            entry begins with the <code>\item</code> command:
          </p>
          <pre><code>{`\\begin{itemize}
  \\item First item
  \\item Second item
  \\item Third item
\\end{itemize}`}</code></pre>
          <p>
            By default, LaTeX uses a solid round bullet (<code>\textbullet</code>) for
            first-level items. You can add as many <code>\item</code> entries as you need, and an
            item can run over several paragraphs: leave a blank line inside the item and the
            second paragraph is indented to the same text edge.
          </p>
          <pre><code>{`\\begin{itemize}
  \\item First paragraph of the item.

        Second paragraph of the same item, still indented.
  \\item Next item.
\\end{itemize}`}</code></pre>

          <h3>Changing the bullet for one item</h3>
          <p>
            Override the default bullet for a single item by placing the desired symbol in
            square brackets after <code>\item</code>. An empty pair of brackets removes the
            bullet entirely:
          </p>
          <pre><code>{`\\begin{itemize}
  \\item Default bullet
  \\item[--] Dash (an en dash)
  \\item[*] Asterisk
  \\item[$\\diamond$] Diamond
  \\item[] No bullet at all
\\end{itemize}`}</code></pre>
          <p>
            Note that an item whose text starts with a square bracket, such as{' '}
            <code>\item [a, b] is an interval</code>, is read as a custom label. Write{' '}
            <code>\item {`{[a, b]}`} is an interval</code> or <code>\item\relax [a, b]</code> to
            keep the bracket in the text.
          </p>

          {/* ── Ordered Lists (enumerate) ── */}
          <h2>Numbered Lists with enumerate</h2>
          <p>
            The <code>enumerate</code> environment produces a numbered (ordered) list.
            LaTeX automatically handles the numbering:
          </p>
          <pre><code>{`\\begin{enumerate}
  \\item First step
  \\item Second step
  \\item Third step
\\end{enumerate}`}</code></pre>
          <p>
            The default numbering style is Arabic numerals (1., 2., 3.) at the first
            level, lowercase letters in parentheses ((a), (b), (c)) at the second, Roman numerals
            (i., ii., iii.) at the third, and uppercase letters (A., B., C.) at the
            fourth. Numbered items can be referenced: put <code>\label</code> after the{' '}
            <code>\item</code> and <code>\ref</code> prints the number.
          </p>
          <pre><code>{`\\begin{enumerate}
  \\item Mix the dry ingredients. \\label{step:dry}
  \\item Add the eggs.
\\end{enumerate}
Go back to step~\\ref{step:dry} if the batter is lumpy.`}</code></pre>

          <h3>Enumerate with Letters: (a), (b), (c)</h3>
          <p>
            To number a list with letters instead of numbers, load <code>enumitem</code> and
            pass a <code>label</code> built from <code>\alph*</code> (lowercase) or{' '}
            <code>\Alph*</code> (uppercase). The characters around it are printed as written, so
            the same key gives (a), a) or A.:
          </p>
          <pre><code>{`\\usepackage{enumitem}   % in the preamble

\\begin{enumerate}[label=(\\alph*)]   % (a), (b), (c)
  \\item First item
  \\item Second item
\\end{enumerate}

\\begin{enumerate}[label=\\alph*)]    % a), b), c)
  \\item First item
  \\item Second item
\\end{enumerate}

\\begin{enumerate}[label=\\Alph*.]    % A., B., C.
  \\item First item
  \\item Second item
\\end{enumerate}`}</code></pre>
          <p>
            With the <code>shortlabels</code> option, <code>enumitem</code> also accepts the
            shorter syntax of the old <code>enumerate</code> package, where the first a, A, i, I
            or 1 in the argument stands for the counter:
          </p>
          <pre><code>{`\\usepackage[shortlabels]{enumitem}

\\begin{enumerate}[(a)]     % (a), (b), (c)
  \\item First item
\\end{enumerate}

\\begin{enumerate}[A.]      % A., B., C.
  \\item First item
\\end{enumerate}

\\begin{enumerate}[i)]      % i), ii), iii)
  \\item First item
\\end{enumerate}`}</code></pre>
          <p>
            Without any package, redefine the counter format and the label for the first level.
            Changing <code>\theenumi</code> as well as <code>\labelenumi</code> keeps{' '}
            <code>\ref</code> in step with the letters:
          </p>
          <pre><code>{`\\renewcommand{\\theenumi}{\\alph{enumi}}     % the counter prints as a, b, c
\\renewcommand{\\labelenumi}{(\\theenumi)}    % the label is (a), (b), (c)

\\begin{enumerate}
  \\item First item \\label{it:first}
  \\item Second item
\\end{enumerate}
See item~(\\ref{it:first}).   % prints "(a)"`}</code></pre>
          <p>
            For lettered sub-parts, as in exam questions, you need nothing at all: a nested{' '}
            <code>enumerate</code> is lettered (a), (b), (c) by default, and <code>\ref</code> to
            a sub-item prints the parent number with the letter, such as 1a:
          </p>
          <pre><code>{`\\begin{enumerate}
  \\item Answer all parts.
  \\begin{enumerate}            % second level: (a), (b), (c) by default
    \\item Define the term. \\label{q:1a}
    \\item Give an example.
  \\end{enumerate}
  \\item Next question.
\\end{enumerate}
Part~\\ref{q:1a} is worth five marks.   % prints "1a"`}</code></pre>
          <p>
            Two details: with <code>enumitem</code>, <code>\ref</code> prints the whole label,
            parentheses included, unless you add <code>ref=\alph*</code>; and letters stop at z,
            so a 27th item stops the build with <em>LaTeX Error: Counter too large</em>. Switch to
            numbers or split the list for anything longer.
          </p>

          {/* ── Description Lists ── */}
          <h2>Description Lists</h2>
          <p>
            A <code>description</code> list highlights a term followed by its explanation.
            Use <code>\item[Term]</code> to set the label:
          </p>
          <pre><code>{`\\begin{description}
  \\item[LaTeX] A document preparation system for high-quality typesetting.
  \\item[TikZ] A package for creating graphics programmatically.
  \\item[BibTeX] A tool for managing bibliographic references.
\\end{description}`}</code></pre>
          <p>
            The term inside the brackets is rendered in bold by default, making
            description lists ideal for glossaries, feature lists, and FAQs. With{' '}
            <code>enumitem</code> you can change the label font, put the definition on the next
            line, or align the terms in a column:
          </p>
          <pre><code>{`\\usepackage{enumitem}

\\begin{description}[style=nextline]
  \\item[Term] The definition starts on the line below the term.
\\end{description}

\\begin{description}[font=\\normalfont\\itshape, leftmargin=3cm, labelwidth=2.5cm]
  \\item[Term] Italic terms aligned in a 2.5 cm column.
\\end{description}`}</code></pre>

          {/* ── Nested Lists ── */}
          <h2>Nested Lists and the Default Bullet Sequence</h2>
          <p>
            LaTeX supports nesting lists up to four levels deep (and six levels for mixed list
            types in total). You can mix different list types freely. Each itemize level has its
            own bullet, and each enumerate level its own numbering:
          </p>
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>itemize bullet</th>
                <th>Macro</th>
                <th>enumerate label</th>
                <th>Macro</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>&bull; <code>\textbullet</code></td><td><code>\labelitemi</code></td><td>1., 2., 3.</td><td><code>\labelenumi</code></td></tr>
              <tr><td>2</td><td>&ndash; <code>\textendash</code> (bold)</td><td><code>\labelitemii</code></td><td>(a), (b), (c)</td><td><code>\labelenumii</code></td></tr>
              <tr><td>3</td><td>&lowast; <code>\textasteriskcentered</code></td><td><code>\labelitemiii</code></td><td>i., ii., iii.</td><td><code>\labelenumiii</code></td></tr>
              <tr><td>4</td><td>&middot; <code>\textperiodcentered</code></td><td><code>\labelitemiv</code></td><td>A., B., C.</td><td><code>\labelenumiv</code></td></tr>
            </tbody>
          </table>

          <h3>Nested itemize</h3>
          <pre><code>{`\\begin{itemize}
  \\item Fruits
    \\begin{itemize}
      \\item Apples
      \\item Bananas
        \\begin{itemize}
          \\item Cavendish
          \\item Plantain
        \\end{itemize}
    \\end{itemize}
  \\item Vegetables
\\end{itemize}`}</code></pre>

          <h3>Mixed nesting (itemize inside enumerate)</h3>
          <pre><code>{`\\begin{enumerate}
  \\item Prepare the ingredients
    \\begin{itemize}
      \\item 200g flour
      \\item 100ml milk
      \\item 2 eggs
    \\end{itemize}
  \\item Mix everything together
  \\item Bake at 180\\textdegree C for 25 minutes
\\end{enumerate}`}</code></pre>

          <h3>Enumerate inside itemize</h3>
          <pre><code>{`\\begin{itemize}
  \\item Morning routine
    \\begin{enumerate}
      \\item Wake up
      \\item Exercise
      \\item Breakfast
    \\end{enumerate}
  \\item Evening routine
    \\begin{enumerate}
      \\item Dinner
      \\item Read
      \\item Sleep
    \\end{enumerate}
\\end{itemize}`}</code></pre>
          <p>
            The inner <code>\begin</code> must come after an <code>\item</code> of the outer
            list; a nested list placed before the first <code>\item</code> triggers the
            &ldquo;missing \item&rdquo; error described below.
          </p>

          {/* ── Custom Bullets ── */}
          <h2>Custom Bullets: Dashes, Circles, Checkmarks and Icons</h2>
          <p>
            Any symbol that works in text or math can be a bullet. The usual candidates are the
            math symbols <code>\bullet</code>, <code>\circ</code>, <code>\ast</code>,{' '}
            <code>\cdot</code>, <code>\diamond</code> and <code>\star</code>, the text symbols{' '}
            <code>\textbullet</code> and <code>\textendash</code>, <code>\checkmark</code> and{' '}
            <code>\square</code> from <code>amssymb</code>, Zapf Dingbats from <code>pifont</code>,
            and icons from <code>fontawesome5</code>.
          </p>

          <h3>Per-item symbols</h3>
          <pre><code>{`\\usepackage{amssymb}      % \\checkmark, \\square, \\blacksquare
\\usepackage{pifont}       % \\ding{...}
\\usepackage{fontawesome5} % \\faCheck, \\faTimes, \\faStar, ...

\\begin{itemize}
  \\item[$\\bullet$] Bullet (the default)
  \\item[$\\circ$] Open circle
  \\item[$\\ast$] Asterisk
  \\item[$\\cdot$] Centred dot
  \\item[$\\diamond$] Diamond
  \\item[$\\star$] Star
  \\item[$\\rightarrow$] Arrow
  \\item[$\\checkmark$] Checkmark (amssymb)
  \\item[$\\square$] Empty box, for checklists (amssymb)
  \\item[$\\blacksquare$] Filled box (amssymb)
  \\item[\\ding{51}] Tick (pifont)
  \\item[\\ding{55}] Cross (pifont)
  \\item[\\faCheck] FontAwesome check
  \\item[\\faTimes] FontAwesome cross
  \\item[\\faStar] FontAwesome star
\\end{itemize}`}</code></pre>

          <h3>Changing the bullet for the whole document</h3>
          <p>
            Place these commands in your preamble to change the default markers for all
            itemize lists. <code>\labelitemi</code> through <code>\labelitemiv</code>{' '}
            correspond to nesting levels 1 through 4:
          </p>
          <pre><code>{`% Level 1: dash instead of bullet
\\renewcommand{\\labelitemi}{--}

% Level 1: explicit bullet (the default, written out)
\\renewcommand{\\labelitemi}{\\textbullet}
\\renewcommand{\\labelitemi}{$\\bullet$}   % same glyph, from math

% Level 2: circle, level 3: asterisk, level 4: dot
\\renewcommand{\\labelitemii}{$\\circ$}
\\renewcommand{\\labelitemiii}{$\\ast$}
\\renewcommand{\\labelitemiv}{$\\cdot$}

% Icon bullets throughout
\\renewcommand{\\labelitemi}{\\faCheck}

% The same for numbered lists
\\renewcommand{\\labelenumi}{\\Roman{enumi}.}
\\renewcommand{\\labelenumii}{(\\alph{enumii})}`}</code></pre>
          <p>
            With <code>enumitem</code> loaded, the <code>label</code> key does the same job per
            list or, through <code>\setlist</code>, globally; see the next section.
          </p>

          {/* ── enumitem ── */}
          <h2>The enumitem Package in Depth</h2>
          <p>
            <code>enumitem</code> is the package to load whenever you want to change how a list
            looks. It adds an optional argument to every list environment, so labels, spacing,
            margins and numbering can be set per list, and <code>\setlist</code> sets defaults
            for the whole document. Load it once in the preamble:
          </p>
          <pre><code>{`\\usepackage{enumitem}`}</code></pre>

          <h3>Labels and numbering styles</h3>
          <p>
            The <code>label</code> key takes a template in which <code>\arabic*</code>,{' '}
            <code>\alph*</code>, <code>\Alph*</code>, <code>\roman*</code> and{' '}
            <code>\Roman*</code> stand for the item number:
          </p>
          <pre><code>{`% Lowercase letters in parentheses: (a), (b), (c)
\\begin{enumerate}[label=(\\alph*)]
  \\item First item
  \\item Second item
\\end{enumerate}

% Lowercase Roman numerals: i., ii., iii.
\\begin{enumerate}[label=\\roman*.]
  \\item First item
  \\item Second item
\\end{enumerate}

% Uppercase letters with a closing parenthesis: A), B)
\\begin{enumerate}[label=\\Alph*)]
  \\item Section one
  \\item Section two
\\end{enumerate}

% Custom prefix in bold: Step 1:, Step 2:
\\begin{enumerate}[label=\\textbf{Step \\arabic*:}]
  \\item Gather materials
  \\item Assemble components
\\end{enumerate}

% Prefix with a letter: Q1., Q2.
\\begin{enumerate}[label=Q\\arabic*.]
  \\item What is LaTeX?
\\end{enumerate}

% Section-aware numbering: 2.1, 2.2 inside section 2
\\begin{enumerate}[label=\\arabic{section}.\\arabic*]
  \\item First
\\end{enumerate}

% Label shown in the list vs. label printed by \\ref
\\begin{enumerate}[label=(\\roman*), ref=\\roman*]
  \\item Something \\label{it:first}
\\end{enumerate}
See item~\\ref{it:first}.   % prints "i", not "(i)"`}</code></pre>

          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Output</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\arabic*</code></td><td>1, 2, 3</td><td><code>label=\arabic*.</code></td></tr>
              <tr><td><code>\alph*</code></td><td>a, b, c</td><td><code>label=(\alph*)</code></td></tr>
              <tr><td><code>\Alph*</code></td><td>A, B, C</td><td><code>label=\Alph*)</code></td></tr>
              <tr><td><code>\roman*</code></td><td>i, ii, iii</td><td><code>label=\roman*.</code></td></tr>
              <tr><td><code>\Roman*</code></td><td>I, II, III</td><td><code>label=\Roman*.</code></td></tr>
            </tbody>
          </table>

          <p>
            The same key sets the bullet for an itemize list, so you do not need to repeat{' '}
            <code>\item[...]</code> on every line:
          </p>
          <pre><code>{`\\usepackage{amssymb}
\\begin{itemize}[label=$\\star$]
  \\item Every item gets a star
\\end{itemize}

% Other common labels: $\\bullet$ $\\circ$ $\\diamond$ $\\checkmark$ (amssymb) and --
\\begin{itemize}[label=$\\checkmark$, leftmargin=*]
  \\item Checklist item
\\end{itemize}
\\begin{itemize}[label=--]
  \\item Dash bullet
\\end{itemize}`}</code></pre>

          <h3>Resuming and starting at a number</h3>
          <pre><code>{`\\begin{enumerate}
  \\item One
  \\item Two
\\end{enumerate}
A paragraph of explanation between the two halves.
\\begin{enumerate}[resume]      % continues: 3., 4.
  \\item Three
  \\item Four
\\end{enumerate}

\\begin{enumerate}[start=10]    % starts at 10.
  \\item Ten
\\end{enumerate}

\\begin{enumerate}[label=\\alph*), start=3]   % c), d)
  \\item c
  \\item d
\\end{enumerate}`}</code></pre>
          <p>
            <code>resume</code> continues from the last list of the same type; use{' '}
            <code>resume*</code> to also reuse that list&apos;s options, or a named{' '}
            <code>series</code> when two unrelated numbered lists are interleaved.
          </p>

          <h3>Spacing between items: noitemsep and nosep</h3>
          <p>
            By default, LaTeX adds vertical space between items and around the list. The two
            shortcuts most people need are <code>noitemsep</code>, which removes the gap between
            items but keeps the space above and below the list, and <code>nosep</code>, which
            removes all of it:
          </p>
          <pre><code>{`\\begin{itemize}[noitemsep]
  \\item Items touch, list still has space around it
  \\item Second item
\\end{itemize}

\\begin{enumerate}[nosep]
  \\item Fully compact
  \\item Second item
\\end{enumerate}

% Fine control (all lengths are optional)
\\begin{itemize}[
  topsep=4pt,        % space above and below the list
  itemsep=2pt,       % space between items
  parsep=0pt,        % space between paragraphs inside an item
  partopsep=0pt,     % extra space when the list starts a paragraph
  leftmargin=1.5em   % indent of the item text
]
  \\item First item
  \\item Second item
\\end{itemize}

% Add space, for a spaced-out list
\\begin{itemize}[itemsep=0.5em]
  \\item Roomy
  \\item Items
\\end{itemize}`}</code></pre>
          <p>
            Without enumitem you can still add space after a single item with{' '}
            <code>\item Text \vspace{`{4pt}`}</code>, but it is a one-off fix; set{' '}
            <code>itemsep</code> for anything you want to look consistent.
          </p>

          <h3>Margins: leftmargin=* and fixed indents</h3>
          <p>
            <code>leftmargin=*</code> tells enumitem to compute the indent from the width of the
            label, so wide labels such as &ldquo;Step 10:&rdquo; do not collide with the text and
            narrow ones do not leave a gap. <code>leftmargin=0pt</code> with{' '}
            <code>itemindent</code> aligns the bullets with the surrounding paragraph:
          </p>
          <pre><code>{`\\begin{enumerate}[label=Step \\arabic*:, leftmargin=*]
  \\item The label width sets the indent
\\end{enumerate}

\\begin{itemize}[leftmargin=0pt, itemindent=1em]
  \\item Bullet flush with the margin
\\end{itemize}

\\begin{itemize}[leftmargin=2cm]
  \\item A fixed 2 cm indent, whatever the label width
\\end{itemize}

\\begin{enumerate}[label=\\alph*), leftmargin=*, nosep]
  \\item Keys combine freely
\\end{enumerate}`}</code></pre>

          <h3>Document-wide defaults with \setlist</h3>
          <pre><code>{`\\usepackage{enumitem}

\\setlist{nosep}                          % every list compact
\\setlist[itemize]{label=--}              % every itemize level uses a dash
\\setlist[itemize,1]{label=\\textbullet}   % ...except level 1
\\setlist[itemize,2]{label=--}
\\setlist[enumerate,1]{label=\\arabic*.}
\\setlist[enumerate,2]{label=\\alph*)}
\\setlist[enumerate]{leftmargin=*}
\\setlist[description]{font=\\normalfont\\bfseries}`}</code></pre>

          <h3>Your own list environments</h3>
          <pre><code>{`\\newlist{steps}{enumerate}{1}            % name, base type, max depth
\\setlist[steps]{label=Step \\arabic*:, leftmargin=*}

\\begin{steps}
  \\item Install TeX Live
  \\item Open Octree
\\end{steps}

\\newlist{checklist}{itemize}{2}
\\setlist[checklist]{label=$\\square$}
\\begin{checklist}
  \\item Proofread the abstract
\\end{checklist}`}</code></pre>

          {/* ── Inline Lists ── */}
          <h2>Inline Lists with enumerate*</h2>
          <p>
            Load <code>enumitem</code> with the <code>[inline]</code> option and the starred
            environments <code>enumerate*</code>, <code>itemize*</code> and{' '}
            <code>description*</code> set their items inside the running paragraph. Perfect for
            short sequences:
          </p>
          <pre><code>{`\\usepackage[inline]{enumitem}

The primary colours are
\\begin{enumerate*}[label=(\\roman*)]
  \\item red,
  \\item blue and
  \\item yellow.
\\end{enumerate*}

% Let enumitem insert the separators
We need
\\begin{enumerate*}[label=(\\alph*), itemjoin={{, }}, itemjoin*={{, and }}]
  \\item a compiler
  \\item an editor
  \\item a PDF viewer
\\end{enumerate*}.
% -> (a) a compiler, (b) an editor, and (c) a PDF viewer.

% No labels at all
\\begin{itemize*}[label={}, itemjoin={{; }}, itemjoin*={{; and }}]
  \\item first
  \\item second
  \\item third
\\end{itemize*}`}</code></pre>
          <p>
            <code>itemjoin</code> is placed between items and <code>itemjoin*</code> between the
            last two, which is how you get the serial comma before &ldquo;and&rdquo;. The older{' '}
            <code>paralist</code> package offers <code>inparaenum</code> for the same purpose.
          </p>

          {/* ── Multi-Column Lists ── */}
          <h2>Multi-Column Lists</h2>
          <p>
            Combine the <code>multicol</code> package with list environments to
            display items in multiple columns, saving space for long lists:
          </p>
          <pre><code>{`\\usepackage{multicol}
\\usepackage{enumitem}

\\begin{multicols}{2}
\\begin{itemize}[nosep]
  \\item Alpha
  \\item Beta
  \\item Gamma
  \\item Delta
  \\item Epsilon
  \\item Zeta
\\end{itemize}
\\end{multicols}

\\begin{multicols}{3}
\\begin{enumerate}[nosep]
  \\item Item 1
  \\item Item 2
  \\item Item 3
  \\item Item 4
  \\item Item 5
  \\item Item 6
\\end{enumerate}
\\end{multicols}`}</code></pre>

          {/* ── Beamer ── */}
          <h2>Lists in Beamer</h2>
          <p>
            Beamer uses the same <code>itemize</code> and <code>enumerate</code> environments,
            with two additions: overlay specifications reveal items one slide at a time, and the
            bullet shape is set by the theme through <code>\setbeamertemplate</code> rather than{' '}
            <code>\labelitemi</code>.
          </p>
          <pre><code>{`\\documentclass{beamer}
\\setbeamertemplate{itemize items}[circle]   % circle, square, ball or triangle
\\setbeamertemplate{enumerate items}[default] % or [circle], [square], [ball]

\\begin{document}
\\begin{frame}{Plan}
  \\begin{itemize}[<+->]        % one item per click
    \\item First point
    \\item Second point
  \\end{itemize}

  \\begin{enumerate}
    \\item<1-> Visible from the first slide
    \\item<2-> Appears on the second
  \\end{enumerate}

  \\begin{enumerate}[(a)]       % Beamer's own label syntax
    \\item Lettered
  \\end{enumerate}
\\end{frame}
\\end{document}`}</code></pre>
          <p>
            Avoid loading <code>enumitem</code> in a Beamer document: both redefine the list
            environments and the overlay syntax stops working. Use Beamer&apos;s templates and
            its <code>[(a)]</code>-style optional argument instead. For a single custom glyph,{' '}
            <code>{`\\setbeamertemplate{itemize item}{\\textbullet}`}</code> and{' '}
            <code>{`\\setbeamertemplate{itemize subitem}{--}`}</code> set level one and two.
          </p>

          {/* ── Cheat sheet ── */}
          <h2>Cheat Sheet</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Code</th>
                <th>Needs</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Bullet points</td><td><code>{`\\begin{itemize} \\item ... \\end{itemize}`}</code></td><td>&ndash;</td></tr>
              <tr><td>Numbered list</td><td><code>{`\\begin{enumerate} \\item ... \\end{enumerate}`}</code></td><td>&ndash;</td></tr>
              <tr><td>Term list</td><td><code>{`\\begin{description} \\item[Term] ... \\end{description}`}</code></td><td>&ndash;</td></tr>
              <tr><td>One custom bullet</td><td><code>{`\\item[--]`}</code>, <code>{`\\item[$\\circ$]`}</code></td><td>&ndash;</td></tr>
              <tr><td>No bullet on one item</td><td><code>{`\\item[]`}</code></td><td>&ndash;</td></tr>
              <tr><td>Change level-1 bullet everywhere</td><td><code>{`\\renewcommand{\\labelitemi}{$\\bullet$}`}</code></td><td>&ndash;</td></tr>
              <tr><td>Checkmark bullet</td><td><code>{`\\item[$\\checkmark$]`}</code></td><td>amssymb</td></tr>
              <tr><td>Icon bullet</td><td><code>{`\\item[\\faCheck]`}</code></td><td>fontawesome5</td></tr>
              <tr><td>(a), (b), (c)</td><td><code>{`\\begin{enumerate}[label=(\\alph*)]`}</code></td><td>enumitem</td></tr>
              <tr><td>i., ii., iii.</td><td><code>{`[label=\\roman*.]`}</code></td><td>enumitem</td></tr>
              <tr><td>Step 1:, Step 2:</td><td><code>{`[label=Step \\arabic*:]`}</code></td><td>enumitem</td></tr>
              <tr><td>Compact list</td><td><code>[noitemsep]</code> or <code>[nosep]</code></td><td>enumitem</td></tr>
              <tr><td>Indent from label width</td><td><code>[leftmargin=*]</code></td><td>enumitem</td></tr>
              <tr><td>Continue numbering</td><td><code>[resume]</code></td><td>enumitem</td></tr>
              <tr><td>Start at 3</td><td><code>[start=3]</code></td><td>enumitem</td></tr>
              <tr><td>Defaults for every list</td><td><code>{`\\setlist{nosep}`}</code></td><td>enumitem</td></tr>
              <tr><td>Inline list</td><td><code>{`\\begin{enumerate*}`}</code></td><td>enumitem [inline]</td></tr>
              <tr><td>Two columns</td><td><code>{`\\begin{multicols}{2} ... \\end{multicols}`}</code></td><td>multicol</td></tr>
              <tr><td>Reveal items one by one (Beamer)</td><td><code>{`\\begin{itemize}[<+->]`}</code></td><td>beamer</td></tr>
              <tr><td>Bullet shape (Beamer)</td><td><code>{`\\setbeamertemplate{itemize items}[circle]`}</code></td><td>beamer</td></tr>
              <tr><td>More than 4 nesting levels</td><td><code>{`\\setlistdepth{9}`}</code> + <code>{`\\renewlist{itemize}{itemize}{9}`}</code></td><td>enumitem</td></tr>
            </tbody>
          </table>

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
                <td><em>LaTeX Error: Something&apos;s wrong&ndash;&ndash;perhaps a missing \item</em></td>
                <td>Text, a <code>tabular</code>, a figure or a nested list appears before the first <code>\item</code>; or the list is empty</td>
                <td>Put an <code>\item</code> before the content, or remove the empty environment</td>
              </tr>
              <tr>
                <td><em>LaTeX Error: Too deeply nested</em></td>
                <td>More than four levels of the same list type (or six list levels in total)</td>
                <td>Restructure, or with enumitem: <code>{`\\setlistdepth{9}`}</code> then <code>{`\\renewlist{itemize}{itemize}{9}`}</code> and <code>{`\\setlist[itemize]{label=\\textbullet}`}</code></td>
              </tr>
              <tr>
                <td><em>Lonely \item&ndash;&ndash;perhaps a missing list environment</em></td>
                <td><code>\item</code> outside any list, often after a stray <code>\end</code></td>
                <td>Check that <code>\begin</code> and <code>\end</code> match</td>
              </tr>
              <tr>
                <td>Item text swallowed as a label</td>
                <td>The text starts with <code>[</code></td>
                <td><code>\item {`{[a, b]}`}</code> or <code>\item\relax [a, b]</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \checkmark</em> / <em>\faCheck</em> / <em>\ding</em></td>
                <td>Package not loaded</td>
                <td>Load <code>amssymb</code>, <code>fontawesome5</code> or <code>pifont</code></td>
              </tr>
              <tr>
                <td><code>[resume]</code> or <code>[label=...]</code> printed as text, or a &ldquo;missing \item&rdquo; error on that line</td>
                <td>enumitem not loaded, or the old <code>enumerate</code> package is loaded alongside it</td>
                <td><code>{`\\usepackage{enumitem}`}</code> and remove <code>{`\\usepackage{enumerate}`}</code></td>
              </tr>
              <tr>
                <td>Beamer overlays like <code>&lt;+-&gt;</code> stop working</td>
                <td>enumitem loaded in a Beamer document</td>
                <td>Remove enumitem; use <code>\setbeamertemplate</code> for styling</td>
              </tr>
              <tr>
                <td>Labels overlap the text (e.g. &ldquo;Step 10:&rdquo;)</td>
                <td>Fixed default indent is narrower than the label</td>
                <td><code>[leftmargin=*]</code></td>
              </tr>
              <tr>
                <td>Numbering restarts at 1 after a paragraph</td>
                <td>Each <code>enumerate</code> is a new list</td>
                <td><code>[resume]</code> on the second list</td>
              </tr>
            </tbody>
          </table>

          {/* ── Quick Reference Table ── */}
          <h2>Environment Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Environment</th>
                <th>Purpose</th>
                <th>Default Style</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>itemize</code></td>
                <td>Unordered (bulleted) list</td>
                <td>Bullet symbols that vary by nesting level</td>
              </tr>
              <tr>
                <td><code>enumerate</code></td>
                <td>Ordered (numbered) list</td>
                <td>1., 2., 3. at level 1; (a), (b), (c) at level 2</td>
              </tr>
              <tr>
                <td><code>description</code></td>
                <td>Definition / term list</td>
                <td>Bold label followed by description text</td>
              </tr>
              <tr>
                <td><code>enumerate*</code></td>
                <td>Inline numbered list (enumitem)</td>
                <td>Items rendered within running text</td>
              </tr>
              <tr>
                <td><code>itemize*</code></td>
                <td>Inline bulleted list (enumitem)</td>
                <td>Items rendered within running text</td>
              </tr>
            </tbody>
          </table>

          {/* ── Common Packages ── */}
          <h2>Common Packages</h2>
          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Primary Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>enumitem</code></td>
                <td>Customise labels, spacing, and create inline lists. The most versatile list package.</td>
              </tr>
              <tr>
                <td><code>paralist</code></td>
                <td>Provides compact and inline list environments (<code>compactitem</code>, <code>inparaenum</code>).</td>
              </tr>
              <tr>
                <td><code>tasks</code></td>
                <td>Create horizontally distributed &quot;task&quot; lists, ideal for exercise sheets and exams.</td>
              </tr>
              <tr>
                <td><code>multicol</code></td>
                <td>Render any list in multiple columns for space-efficient layouts.</td>
              </tr>
              <tr>
                <td><code>amssymb</code>, <code>pifont</code>, <code>fontawesome5</code></td>
                <td>Extra bullet symbols: <code>\checkmark</code>, <code>\square</code>, Dingbats, icons.</td>
              </tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I make bullet points in LaTeX?</h3>
          <p>
            Use the <code>itemize</code> environment and start each bullet with <code>\item</code>:{' '}
            <code>{`\\begin{itemize} \\item First \\item Second \\end{itemize}`}</code>. LaTeX draws a
            round bullet at the first level, a dash at the second, an asterisk at the third and a
            centred dot at the fourth.
          </p>
          <h3>How do I change the bullet symbol in LaTeX?</h3>
          <p>
            For one item, put the symbol in square brackets: <code>\item[--]</code> or{' '}
            <code>\item[$\circ$]</code>. For the whole document, redefine the level in the
            preamble: <code>{`\\renewcommand{\\labelitemi}{$\\bullet$}`}</code> for level one,{' '}
            <code>\labelitemii</code> for level two, and so on. With enumitem you can write{' '}
            <code>{`\\begin{itemize}[label=$\\ast$]`}</code> or <code>{`\\setlist[itemize]{label=--}`}</code>.
          </p>
          <h3>How do I make a numbered list in LaTeX?</h3>
          <p>
            Use <code>enumerate</code> instead of <code>itemize</code>:{' '}
            <code>{`\\begin{enumerate} \\item First \\item Second \\end{enumerate}`}</code>. For letters
            or Roman numerals load enumitem and write{' '}
            <code>{`\\begin{enumerate}[label=(\\alph*)]`}</code> or <code>[label=\roman*.]</code>.
          </p>
          <h3>How do I remove the space between list items?</h3>
          <p>
            Load enumitem and add the <code>noitemsep</code> option to the list
            (<code>{`\\begin{itemize}[noitemsep]`}</code>) to remove the gap between items, or{' '}
            <code>nosep</code> to remove the space above and below the list too.{' '}
            <code>{`\\setlist{nosep}`}</code> in the preamble applies it to every list.
          </p>
          <h3>How do I continue numbering from a previous list?</h3>
          <p>
            With enumitem, start the second list with <code>{`\\begin{enumerate}[resume]`}</code> and
            it carries on from where the last enumerate stopped. To start at an arbitrary number
            use <code>[start=3]</code>.
          </p>
          <h3>What does &ldquo;Something&apos;s wrong&ndash;&ndash;perhaps a missing \item&rdquo; mean?</h3>
          <p>
            LaTeX found text, a table or a blank list before the first <code>\item</code> inside{' '}
            <code>itemize</code> or <code>enumerate</code>, or the list has no items at all. Move
            the text after an <code>\item</code>, or delete the empty list. The same message
            appears when a <code>tabular</code> or figure sits inside a list without an{' '}
            <code>\item</code> before it.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> &ndash; Format the text inside your items</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; When a list is really a table, use booktabs</li>
            <li><Link href="/learn/sections">Sections and Headings</Link> &ndash; Structure the document around your lists</li>
            <li><Link href="/learn/special-characters">Special Characters</Link> &ndash; Symbols you can use as bullets and in item text</li>
            <li><Link href="/learn/glossaries-acronyms">Glossaries and Acronyms</Link> &ndash; An automated alternative to a description list of terms</li>
            <li><Link href="/learn/latex">LaTeX Tutorial for Beginners</Link> &ndash; Review core LaTeX fundamentals</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test your list code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> &ndash; Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse symbols you can use as bullets</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX lists" title="Related Articles" />

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
