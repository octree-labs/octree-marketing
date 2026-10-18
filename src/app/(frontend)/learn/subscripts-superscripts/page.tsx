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

const breadcrumbs = getLearnBreadcrumbs('Subscripts & Superscripts', 'subscripts-superscripts')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'subscripts-superscripts',
  title: 'Subscripts and Superscripts in LaTeX: ^, _, \\textsuperscript and Exponents',
  seoTitle: 'LaTeX Subscript and Superscript: ^, _ and Exponents',
  description: 'Subscripts and superscripts in LaTeX: ^ and _ in math, \\textsuperscript and \\textsubscript in text, squared and cubed, x^{10} vs x^10, \\limits and mhchem.',
  keywords: 'latex subscript, latex superscript, subscript in latex, superscript in latex, how to do superscripts in latex, latex squared, latex exponent, latex power, latex x squared, latex underscore, latex caret, textsuperscript latex, textsubscript latex, latex ordinal, latex limits nolimits, latex prescript, latex chemistry formulas, mhchem, latex double superscript error, latex math notation',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do you do superscripts in LaTeX?',
    answer:
      'In math mode use the caret: $x^2$ gives x squared and $x^{10}$ gives x to the tenth. Wrap anything longer than one character in braces. In normal text use \\textsuperscript{...}, for example 1\\textsuperscript{st}.',
  },
  {
    question: 'How do you write a subscript in LaTeX?',
    answer:
      'Use the underscore in math mode: $x_i$ or, for more than one character, $x_{i+1}$. In running text use \\textsubscript{...}, so water is H\\textsubscript{2}O. Both text commands are built into LaTeX since 2015.',
  },
  {
    question: 'How do I write squared in LaTeX?',
    answer:
      'Type $x^2$ for x squared and $x^3$ for x cubed. For units write $5\\,\\mathrm{m}^2$, or load siunitx and write \\qty{5}{\\metre\\squared}. In plain text, m\\textsuperscript{2} also works.',
  },
  {
    question: 'Why does $x^10$ only raise the 1?',
    answer:
      'The ^ and _ operators take exactly one token. In $x^10$ that token is the digit 1, so the 0 is typeset at normal size next to it. Write $x^{10}$ with braces so the whole number is the exponent.',
  },
  {
    question: 'What does "Double superscript" mean?',
    answer:
      'You attached two superscripts to the same base, as in $x^a^b$. LaTeX cannot tell whether you mean x^{ab} or (x^a)^b, so you have to group one of them: $x^{ab}$ or ${x^a}^b$. "Double subscript" is the same problem with underscores.',
  },
  {
    question: 'How do I put a subscript and a superscript on the same symbol?',
    answer:
      'Write both after the base in either order: $x_i^2$ and $x^2_i$ give the same result, with the two scripts stacked. For a prescript on the left, as in isotope notation, use ${}^{14}_{6}\\mathrm{C}$ or \\prescript{14}{6}{\\mathrm{C}} from mathtools.',
  },
]

export default async function SubscriptsSuperscriptsPage() {
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
          <h1>Subscripts and Superscripts in LaTeX: ^, _, \textsuperscript and Exponents</h1>
          <p className="lead">
            A superscript in LaTeX is <code>^</code> and a subscript is <code>_</code>, both in math
            mode: <code>$x^2$</code> is x squared and <code>$x_i$</code> is x sub i. Anything longer
            than one character goes in braces, so <code>{`$x^{10}$`}</code>, not <code>$x^10$</code>.
            In running text use <code>{`\\textsuperscript{st}`}</code> and{' '}
            <code>{`\\textsubscript{2}`}</code>. This guide covers all of that plus exponents and
            powers, squared units, stacked and nested scripts, <code>\limits</code> on sums,
            prescripts for isotopes, chemical formulas with mhchem, ordinals, and the errors
            (&ldquo;Double superscript&rdquo;, &ldquo;Missing &#123; inserted&rdquo;) you will meet.
          </p>

          <table>
            <thead>
              <tr>
                <th>You want</th>
                <th>Write</th>
                <th>Where</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>x squared, x cubed</td><td><code>$x^2$</code>, <code>$x^3$</code></td><td>math mode</td></tr>
              <tr><td>x to the power 10</td><td><code>{`$x^{10}$`}</code></td><td>math mode</td></tr>
              <tr><td>x sub i, x sub i+1</td><td><code>$x_i$</code>, <code>{`$x_{i+1}$`}</code></td><td>math mode</td></tr>
              <tr><td>both at once</td><td><code>$x_i^2$</code></td><td>math mode</td></tr>
              <tr><td>1st, 2nd in a sentence</td><td><code>{`1\\textsuperscript{st}`}</code></td><td>text mode</td></tr>
              <tr><td>H₂O in a sentence</td><td><code>{`H\\textsubscript{2}O`}</code></td><td>text mode</td></tr>
              <tr><td>limits above and below Σ</td><td><code>{`$\\sum\\limits_{i=1}^{n}$`}</code></td><td>math mode</td></tr>
              <tr><td>carbon-14 prescripts</td><td><code>{`$${'{}'}^{14}_{6}\\mathrm{C}$`}</code></td><td>math mode</td></tr>
            </tbody>
          </table>

          {/* ── Superscripts ── */}
          <h2>Basic Superscripts</h2>
          <p>
            In LaTeX math mode, you create superscripts using the caret symbol (<code>^</code>). For a single character,
            you can place it directly after the caret. For multiple characters, wrap them in curly braces.
          </p>

          <pre><code>{`% Single character superscript
$x^2$

% Multiple characters require braces
$x^{2n}$
$e^{i\\pi}$

% Without braces, only the first character is raised
$x^10$    % renders as x^1 followed by 0
$x^{10}$  % renders correctly as x to the power of 10`}</code></pre>

          <p>
            The braces tell LaTeX to treat everything inside them as a single group. This is one of the most
            common sources of errors for beginners &mdash; always use braces when your superscript contains more
            than one character.
          </p>

          {/* ── Subscripts ── */}
          <h2>Basic Subscripts</h2>
          <p>
            Subscripts work the same way as superscripts, but use the underscore character (<code>_</code>) instead
            of the caret. Again, single characters can be placed directly after the underscore, while multiple
            characters need curly braces.
          </p>

          <pre><code>{`% Single character subscript
$x_i$

% Multiple characters require braces
$x_{i+1}$
$a_{max}$

% Without braces, only the first character is lowered
$x_10$    % renders as x_1 followed by 0
$x_{10}$  % renders correctly as x sub 10`}</code></pre>

          <p>
            Subscripts are widely used for indexing variables, chemical formulas, and labeling quantities
            in scientific notation. A multi-letter subscript such as <code>{`a_{max}`}</code> is set in
            italic like a product of variables; if it is a word rather than a product, write{' '}
            <code>{`a_{\\max}`}</code> (operator) or <code>{`a_{\\mathrm{max}}`}</code> (upright text).
          </p>

          {/* ── Multi-character ── */}
          <h2>Multi-Character Scripts: x^&#123;10&#125; vs x^10</h2>
          <p>
            The rule behind every subscript and superscript in LaTeX is that <code>^</code> and{' '}
            <code>_</code> take exactly <em>one</em> token. A single digit, a single letter, or a
            single command such as <code>\alpha</code> or <code>\infty</code> counts as one token;
            anything else needs braces to become one group. This is the classic mistake:
          </p>
          <pre><code>{`$x^10$      % x¹0  – only the 1 is raised, the 0 sits beside it
$x^{10}$    % x¹⁰  – correct

$a_max$     % a_m followed by "ax" at full size
$a_{max}$   % correct

$e^-x$      % e⁻x – only the minus sign is raised
$e^{-x}$    % correct

$x^\\alpha$      % fine: \\alpha is a single token
$x^\\alpha\\beta$ % x^α followed by β – braces needed: $x^{\\alpha\\beta}$
$2^n+1$          % 2ⁿ + 1, which is not 2^{n+1}`}</code></pre>
          <p>
            A good habit is to brace every script, even single characters:{' '}
            <code>{`x^{2}`}</code> costs two keystrokes and never surprises you later when you
            change <code>2</code> to <code>10</code>. Most editors, including Octree, also
            highlight unbalanced braces so a missing <code>&#125;</code> is caught before you
            compile.
          </p>

          {/* ── Exponents and powers ── */}
          <h2>Exponents and Powers</h2>
          <p>
            Exponents are just superscripts, so everything above applies. Here are the forms that
            come up most often, from squared and cubed through negative and fractional powers,
            scientific notation and towers of exponents:
          </p>
          <pre><code>{`$x^2$                 % x squared
$x^3$                 % x cubed
$x^{n}$               % x to the n
$x^{-1}$              % reciprocal
$x^{-2} = \\frac{1}{x^2}$
$x^{1/2} = \\sqrt{x}$  % fractional exponent
$y = x^{\\frac{3}{2}}$ % or x^{3/2} to keep the exponent compact
$(x+1)^2$             % power of a bracketed expression
$\\left(\\frac{a}{b}\\right)^2$

% Exponent rules
$a^{m+n} = a^m a^n$
$(a^m)^n = a^{mn}$
$\\frac{x^{n}}{x^{m}} = x^{n-m}$

% Exponential function and powers of ten
$e^{i\\pi} + 1 = 0$
$e^{x} = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$
$2^{10} = 1024$
$6.022 \\times 10^{23}$
$10^{-3}$

% Towers: braces nest from the top down
$a^{b^{c}}$      % a^(b^c)
$2^{2^{2^{2}}}$`}</code></pre>
          <p>
            Two style points. A fractional exponent is usually better as <code>{`x^{3/2}`}</code>{' '}
            than <code>{`x^{\\frac{3}{2}}`}</code>, because a stacked fraction inside a superscript
            is tiny and hard to read. And the base of the natural exponential is set italic by
            default (<code>e^x</code>); some journals ask for an upright{' '}
            <code>{`\\mathrm{e}^{x}`}</code>, and for a long exponent <code>\exp(...)</code> is
            clearer than a superscript. For the full story on fractions and roots, see{' '}
            <Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link>.
          </p>

          {/* ── Squared, cubed and units ── */}
          <h2>Squared, Cubed and Units</h2>
          <p>
            For areas and volumes the exponent belongs to the unit, and the unit should be
            upright: <code>{`$5\\,\\mathrm{m}^2$`}</code> gives 5 m² with a thin space between the
            number and the unit. The <code>siunitx</code> package does this consistently and
            understands <code>\squared</code> and <code>\cubed</code>:
          </p>
          <pre><code>{`% Plain LaTeX
$5\\,\\mathrm{m}^2$
$9.81\\,\\mathrm{m/s^2}$
$25\\,\\mathrm{cm}^{3}$

% siunitx (version 3 syntax)
\\usepackage{siunitx}
\\qty{5}{\\metre\\squared}              % 5 m²
\\qty{9.81}{\\metre\\per\\second\\squared} % 9.81 m/s²
\\qty{25}{\\centi\\metre\\cubed}         % 25 cm³
\\unit{\\kilo\\gram\\per\\metre\\cubed}   % unit alone: kg/m³

% siunitx version 2 names still work
\\si{\\metre\\squared}

% In a sentence without math mode
an area of 5 m\\textsuperscript{2}`}</code></pre>
          <p>
            Outside LaTeX, the squared symbol is Unicode U+00B2 (²) and cubed is U+00B3 (³); our
            blog post on{' '}
            <Link href="https://www.useoctree.com/blog/squared-symbol-superscript-numbers-how-to-type">
              typing the squared symbol and superscript numbers
            </Link>{' '}
            covers the keyboard shortcuts for Windows, Mac, Word and Google Docs. In a LaTeX source
            file, prefer <code>^2</code>: pasting the ² character works under XeLaTeX and LuaLaTeX
            and with <code>utf8</code> input in pdfLaTeX, but it is typeset as a text character,
            not a math superscript, and will not align with <code>^</code> exponents next to it.
          </p>

          {/* ── Combining ── */}
          <h2>Combining Subscripts and Superscripts</h2>
          <p>
            LaTeX allows you to apply both a subscript and a superscript to the same base element.
            The order in which you write them does not matter &mdash; LaTeX will position them correctly.
          </p>

          <pre><code>{`% Subscript and superscript on the same element
$x_i^2$
$x^2_i$    % same result as above

% More complex examples
$a_{n}^{2}$
$T_{\\mu\\nu}^{\\alpha\\beta}$   % tensor notation

% Simultaneous notation in physics
$${'{}'}^{14}_{6}\\mathrm{C}$    % carbon-14 isotope notation
$${'{}'}^{A}_{Z}X$             % general isotope notation`}</code></pre>

          <p>
            When combining subscripts and superscripts, LaTeX automatically handles the vertical positioning.
            Both are attached to the same base, so they appear neatly aligned.
          </p>

          <h3>x_i^2 versus &#123;x_i&#125;^2</h3>
          <p>
            There is a subtle difference between stacking the scripts on the base and applying a
            superscript to an already-subscripted group:
          </p>
          <pre><code>{`$x_i^2$      % i and 2 stacked, both attached to x
$${'{'}x_i${'}'}^2$    % 2 is a superscript of the group (x_i): it sits further right
$(x_i)^2$    % the explicit, unambiguous form
$x_{i}{}^{2}$ % an empty group staggers the scripts (used for tensors)`}</code></pre>
          <p>
            The staggered form matters in tensor notation, where <code>{`T^{\\mu}{}_{\\nu}`}</code>{' '}
            keeps the index order visible; for ordinary variables, <code>x_i^2</code> is what you
            want.
          </p>

          {/* ── Nested ── */}
          <h2>Nested Subscripts and Superscripts</h2>
          <p>
            You can nest subscripts and superscripts inside each other for more complex expressions.
            Each level of nesting requires its own set of braces.
          </p>

          <pre><code>{`% Nested superscript (e to the x squared)
$e^{x^2}$

% Nested subscript
$a_{i_{j}}$

% Deeply nested expressions
$e^{e^{e^x}}$    % tower of exponentials
$x_{a_{b_{c}}}$  % triple-nested subscript

% Practical example: Gaussian function
$e^{-\\frac{x^2}{2\\sigma^2}}$`}</code></pre>

          <p>
            Each nesting level is set one size smaller, down to a minimum: first-level scripts
            use <em>scriptstyle</em>, second-level and deeper use <em>scriptscriptstyle</em>, and
            nothing gets smaller than that. While LaTeX supports arbitrary nesting depth, keep
            readability in mind. For very complex expressions, consider breaking them into smaller
            parts using <code>\newcommand</code>, or write <code>\exp(...)</code> instead of a
            tall tower.
          </p>

          {/* ── limits / nolimits ── */}
          <h2>Limits on Big Operators: \limits and \nolimits</h2>
          <p>
            Large operators like <code>\sum</code>, <code>\prod</code>, <code>\lim</code>, and
            <code>\int</code> have a special behavior: in display mode, their subscripts and
            superscripts appear directly below and above the operator (&ldquo;limits&rdquo;
            position). In inline mode, they appear to the side so the line does not grow taller.
          </p>

          <pre><code>{`% Display style: limits appear above and below
\\[
  \\sum_{i=1}^{n} x_i \\qquad
  \\prod_{k=1}^{n} k \\qquad
  \\lim_{x \\to \\infty} f(x)
\\]

% Inline style: limits appear to the side
The sum $\\sum_{i=1}^{n} x_i$ is computed inline.

% Force display-style limits in inline mode
The sum $\\sum\\limits_{i=1}^{n} x_i$ stacks its bounds.
The sum $\\displaystyle\\sum_{i=1}^{n} x_i$ is full size.

% Force inline-style limits in display mode
\\[
  \\sum\\nolimits_{i=1}^{n} x_i
  \\qquad
  \\textstyle\\sum_{i=1}^{n} x_i
\\]

% Integrals put their bounds beside the sign even in display mode
\\[
  \\int_0^1 f(x)\\,dx \\qquad \\int\\limits_0^1 f(x)\\,dx
\\]

% \\max, \\min, \\lim and \\sup take limits too
\\[
  \\max_{x \\in S} f(x) \\qquad \\operatorname*{argmax}_{x} f(x)
\\]`}</code></pre>

          <p>
            <code>\limits</code> and <code>\nolimits</code> go immediately after the operator and
            before the scripts. Use <code>\limits</code> sparingly inline, because it increases the
            line height; <code>\displaystyle</code> is usually the better tool when you want a
            full-size operator in a paragraph. To define your own operator that takes limits, use{' '}
            <code>{`\\DeclareMathOperator*{\\argmin}{arg\\,min}`}</code> (note the star) in the
            preamble. The <Link href="/learn/integrals-sums-limits">integrals, sums and limits</Link>{' '}
            guide goes deeper.
          </p>

          {/* ── Prescripts ── */}
          <h2>Prescripts: Scripts on the Left</h2>
          <p>
            Isotope notation, some tensor conventions, and the transpose written as{' '}
            <sup>t</sup>A all put a script <em>before</em> the base. Attach the scripts to an empty
            group <code>&#123;&#125;</code> so they have something to hang on:
          </p>
          <pre><code>{`% Empty-group trick (no package needed)
$${'{}'}^{14}_{6}\\mathrm{C}$     % carbon-14
$${'{}'}_{92}^{235}\\mathrm{U}$   % uranium-235
$${'{}'}^{t}A$                   % transpose, French style

% mathtools \\prescript{sup}{sub}{base} aligns the prescripts properly
\\usepackage{mathtools}
$\\prescript{14}{6}{\\mathrm{C}}$
$\\prescript{}{i}{x}$          % subscript only
$\\prescript{t}{}{A}$          % superscript only

% amsmath \\sideset for big operators: scripts on both sides
$\\sideset{_a^b}{_c^d}\\sum$
$\\sideset{}{'}\\sum_{i} a_i$   % primed sum`}</code></pre>
          <p>
            The empty-group version works everywhere but can leave the left scripts slightly
            misaligned with the right ones; <code>\prescript</code> from <code>mathtools</code>{' '}
            fixes that. <code>\sideset</code> only works on big operators such as{' '}
            <code>\sum</code> and <code>\prod</code>.
          </p>

          {/* ── Chemistry ── */}
          <h2>Chemical Formulas: mhchem</h2>
          <p>
            You can write chemistry with plain scripts, <code>{`$\\mathrm{H_2O}$`}</code>, and
            keep the element symbols upright with <code>\mathrm</code>. For anything beyond a
            formula or two, the <code>mhchem</code> package&apos;s <code>\ce</code> command is
            easier to type, sets charges and isotopes correctly, and handles whole reactions:
          </p>
          <pre><code>{`\\usepackage[version=4]{mhchem}

\\ce{H2O}                 % H₂O
\\ce{CO2}                 % CO₂
\\ce{SO4^2-}              % sulfate ion with charge
\\ce{Fe^{3+}}             % ferric ion
\\ce{^{14}_{6}C}          % carbon-14 with prescripts
\\ce{2H2 + O2 -> 2H2O}    % reaction with arrow
\\ce{CaCO3 ->[\\Delta] CaO + CO2}  % condition above the arrow

% The same with plain math
$\\mathrm{H_2O}$, $\\mathrm{SO_4^{2-}}$, $\\mathrm{CO_2}$

% In running text
Water is H\\textsubscript{2}O.`}</code></pre>
          <p>
            <code>\ce</code> works in both text and math mode. Numbers that follow an element
            symbol become subscripts automatically, a leading number is a stoichiometric
            coefficient, and <code>^</code> gives a charge or mass number.
          </p>

          {/* ── Text mode ── */}
          <h2>Subscripts and Superscripts in Text Mode</h2>
          <p>
            The caret and underscore operators only work in math mode; in text they stop
            compilation with <em>Missing $ inserted</em>. To add superscripts and subscripts in
            regular text, use the <code>\textsuperscript&#123;&#125;</code> and{' '}
            <code>\textsubscript&#123;&#125;</code> commands.
          </p>

          <pre><code>{`% Superscript in text mode
This is the 1\\textsuperscript{st} edition.
The 2\\textsuperscript{nd} floor.
March 3\\textsuperscript{rd}, 2026.
E = mc\\textsuperscript{2}       % but $E = mc^2$ is better for math
See the note\\textsuperscript{*}  % footnote-style marker

% Subscript in text mode
H\\textsubscript{2}O is water.
CO\\textsubscript{2} is carbon dioxide.

% \\textsubscript has been part of the LaTeX kernel since 2015.
% Only for a very old installation add: \\usepackage{fixltx2e}`}</code></pre>

          <p>
            Both commands use the current text font, so they inherit bold or italic from their
            surroundings, and they can be used inside headings, captions and tables. Use them for
            ordinal numbers, trademarks (<code>{`\\textsuperscript{TM}`}</code>), chemical
            formulas written outside of math mode, and marker symbols. For actual mathematics,
            switch to math mode instead: <code>$x^2$</code> uses the math font and spacing, while{' '}
            <code>{`x\\textsuperscript{2}`}</code> is just small text.
          </p>

          <h3>Ordinals: 1st, 2nd, 3rd</h3>
          <p>
            Many style guides (including Chicago and APA) prefer ordinals on the baseline, so
            plain <code>1st</code> is often the right answer. If you want them raised, write the
            suffix with <code>\textsuperscript</code> or let the <code>nth</code> package work out
            the suffix for you:
          </p>
          <pre><code>{`1\\textsuperscript{st}, 2\\textsuperscript{nd}, 3\\textsuperscript{rd}, 4\\textsuperscript{th}

\\usepackage[super]{nth}
\\nth{1}, \\nth{2}, \\nth{23}   % 1st, 2nd, 23rd, raised; drop [super] for baseline`}</code></pre>

          {/* ── Common Use Cases ── */}
          <h2>Common Use Cases</h2>
          <p>
            Subscripts and superscripts appear across many disciplines. Here are the most common scenarios:
          </p>

          <table>
            <thead>
              <tr>
                <th>Use Case</th>
                <th>LaTeX Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chemistry</td>
                <td><code>{`$\\mathrm{H_2O}$`}</code> or <code>{`\\ce{H2O}`}</code></td>
                <td>Chemical formulas with subscript atom counts</td>
              </tr>
              <tr>
                <td>Exponents</td>
                <td><code>$x^n$</code></td>
                <td>Powers and polynomial terms</td>
              </tr>
              <tr>
                <td>Units</td>
                <td><code>{`$5\\,\\mathrm{m}^2$`}</code></td>
                <td>Squared and cubed units, upright</td>
              </tr>
              <tr>
                <td>Derivatives</td>
                <td><code>$f&apos;(x)$</code></td>
                <td>Prime notation for derivatives</td>
              </tr>
              <tr>
                <td>Tensors</td>
                <td><code>{`$T_{\\mu\\nu}$`}</code></td>
                <td>Tensor indices in physics</td>
              </tr>
              <tr>
                <td>Isotopes</td>
                <td><code>{`$${'{}'}^{14}_{6}\\mathrm{C}$`}</code></td>
                <td>Nuclear isotope notation</td>
              </tr>
              <tr>
                <td>Sequences</td>
                <td><code>{`$a_{n+1}$`}</code></td>
                <td>Indexed sequences and series</td>
              </tr>
              <tr>
                <td>Limits</td>
                <td><code>{`$\\lim_{x \\to 0}$`}</code></td>
                <td>Limit notation in calculus</td>
              </tr>
              <tr>
                <td>Ordinals</td>
                <td><code>{`1\\textsuperscript{st}`}</code></td>
                <td>Raised suffix in text</td>
              </tr>
            </tbody>
          </table>

          {/* ── Prime ── */}
          <h2>Prime Notation</h2>
          <p>
            In LaTeX, the apostrophe character (<code>&apos;</code>) is a shorthand for a superscript prime symbol.
            This is commonly used for derivatives and transformed variables.
          </p>

          <pre><code>{`% Single prime (first derivative)
$f'(x)$

% Double prime (second derivative)
$f''(x)$

% Triple prime (third derivative)
$f'''(x)$

% Combining primes with subscripts
$f'_n(x)$

% Equivalent explicit notation
$f^{\\prime}(x)$
$f^{\\prime\\prime}(x)$

% Using primes with other superscripts
$f'^2(x)$          % prime squared
$f^{\\prime 2}(x)$  % same thing, explicit`}</code></pre>

          <p>
            The apostrophe shorthand is generally preferred because it&apos;s easier to type and produces
            identical output to the explicit <code>\prime</code> command. It is also the one case
            where two superscripts in a row (<code>f&apos;^2</code>) do not trigger the double
            superscript error, because LaTeX merges the prime into the following script.
          </p>

          {/* ── amsmath ── */}
          <h2>The amsmath Package</h2>
          <p>
            The <code>amsmath</code> package from the American Mathematical Society provides advanced
            commands for positioning subscripts and superscripts in specialized contexts.
          </p>

          <pre><code>{`\\usepackage{amsmath}

% \\overset: place a symbol above another
$\\overset{!}{=}$        % "!" above "="
$\\overset{\\sim}{x}$     % tilde above x

% \\underset: place a symbol below another
$\\underset{n \\to \\infty}{\\lim}$

% \\sideset: add subscripts/superscripts to large operators
$\\sideset{_a^b}{_c^d}{\\sum}$

% \\substack: stacked subscripts (multi-line conditions)
$\\sum_{\\substack{i=1 \\\\ i \\neq j}}^{n} a_i$

% \\stackrel: deprecated, use \\overset instead
% $\\stackrel{\\text{def}}{=}$`}</code></pre>

          <p>
            The <code>\substack</code> command is particularly useful for sums and products with
            multiple conditions in the subscript position.
          </p>

          {/* ── Quick Reference ── */}
          <h2>Quick Reference Table</h2>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Example</th>
                <th>Output Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>^</code></td>
                <td><code>$x^2$</code></td>
                <td>x squared</td>
              </tr>
              <tr>
                <td><code>_</code></td>
                <td><code>$x_i$</code></td>
                <td>x sub i</td>
              </tr>
              <tr>
                <td><code>{`^{}`}</code></td>
                <td><code>{`$x^{2n}$`}</code></td>
                <td>x to the 2n</td>
              </tr>
              <tr>
                <td><code>{`_{}`}</code></td>
                <td><code>{`$x_{i+1}$`}</code></td>
                <td>x sub i+1</td>
              </tr>
              <tr>
                <td><code>_i^j</code></td>
                <td><code>$x_i^j$</code></td>
                <td>x sub i, superscript j</td>
              </tr>
              <tr>
                <td><code>{`{}^{}_{}`}</code></td>
                <td><code>{`$${'{}'}^{14}_{6}\\mathrm{C}$`}</code></td>
                <td>Prescripts (isotope)</td>
              </tr>
              <tr>
                <td><code>\prescript</code></td>
                <td><code>{`$\\prescript{14}{6}{\\mathrm{C}}$`}</code></td>
                <td>Aligned prescripts (mathtools)</td>
              </tr>
              <tr>
                <td><code>\limits</code></td>
                <td><code>{`$\\sum\\limits_{i=1}^{n}$`}</code></td>
                <td>Bounds above and below, even inline</td>
              </tr>
              <tr>
                <td><code>\nolimits</code></td>
                <td><code>{`$\\sum\\nolimits_{i=1}^{n}$`}</code></td>
                <td>Bounds beside the operator</td>
              </tr>
              <tr>
                <td><code>\textsuperscript</code></td>
                <td><code>{`1\\textsuperscript{st}`}</code></td>
                <td>1st (in text mode)</td>
              </tr>
              <tr>
                <td><code>\textsubscript</code></td>
                <td><code>{`H\\textsubscript{2}O`}</code></td>
                <td>H2O (in text mode)</td>
              </tr>
              <tr>
                <td><code>\ce</code></td>
                <td><code>{`\\ce{SO4^2-}`}</code></td>
                <td>Chemical formula (mhchem)</td>
              </tr>
              <tr>
                <td><code>\qty</code></td>
                <td><code>{`\\qty{5}{\\metre\\squared}`}</code></td>
                <td>5 m² (siunitx)</td>
              </tr>
              <tr>
                <td><code>&apos;</code></td>
                <td><code>$f&apos;(x)$</code></td>
                <td>f prime of x</td>
              </tr>
              <tr>
                <td><code>\overset</code></td>
                <td><code>{`$\\overset{!}{=}$`}</code></td>
                <td>= with ! above</td>
              </tr>
              <tr>
                <td><code>\underset</code></td>
                <td><code>{`$\\underset{x}{\\min}$`}</code></td>
                <td>min with x below</td>
              </tr>
              <tr>
                <td><code>\substack</code></td>
                <td><code>{`$\\sum_{\\substack{i\\\\j}}$`}</code></td>
                <td>Sum with stacked subscripts</td>
              </tr>
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
                <td><em>Double superscript</em></td>
                <td>Two <code>^</code> on one base: <code>$x^a^b$</code></td>
                <td><code>{`$x^{ab}$`}</code> or <code>{`$${'{'}x^a${'}'}^b$`}</code>, depending on what you mean</td>
              </tr>
              <tr>
                <td><em>Double subscript</em></td>
                <td>Two <code>_</code> on one base: <code>$x_i_j$</code></td>
                <td><code>{`$x_{ij}$`}</code> or <code>{`$x_{i_j}$`}</code></td>
              </tr>
              <tr>
                <td><em>Missing &#123; inserted</em></td>
                <td>Nothing usable after <code>^</code> or <code>_</code>: <code>$x^$</code>, <code>$x_\$</code>, <code>$x^\left($</code></td>
                <td>Put a token or a braced group after the operator</td>
              </tr>
              <tr>
                <td><em>Missing &#125; inserted</em> / <em>Extra &#125;</em></td>
                <td>Unbalanced braces in a nested script</td>
                <td>Count braces; most editors highlight the matching pair</td>
              </tr>
              <tr>
                <td><em>Missing $ inserted</em></td>
                <td><code>^</code> or <code>_</code> used in text, or a literal underscore in a file name or URL</td>
                <td>Use <code>$...$</code>, <code>\textsuperscript</code>, or <code>\_</code> for a literal underscore</td>
              </tr>
              <tr>
                <td>Only the first character is raised</td>
                <td><code>$x^10$</code>, <code>$a_max$</code></td>
                <td>Braces: <code>{`$x^{10}$`}</code>, <code>{`$a_{max}$`}</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \textsubscript</em></td>
                <td>LaTeX older than 2015</td>
                <td>Update TeX Live, or <code>{`\\usepackage{fixltx2e}`}</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \prescript</em> / <em>\ce</em> / <em>\qty</em></td>
                <td>Package not loaded</td>
                <td>Add <code>mathtools</code>, <code>mhchem</code> or <code>siunitx</code> to the preamble</td>
              </tr>
              <tr>
                <td>Limits beside Σ instead of above it</td>
                <td>Inline math uses text style</td>
                <td><code>\limits</code> or <code>\displaystyle</code>, or move to display math</td>
              </tr>
              <tr>
                <td>Superscript looks like text, not math</td>
                <td><code>{`x\\textsuperscript{2}`}</code> used for an exponent</td>
                <td>Write <code>$x^2$</code></td>
              </tr>
            </tbody>
          </table>

          <pre><code>{`% WRONG: multi-character without braces
$x^10$         % renders as x^1 then 0
$a_max$        % renders as a_m then ax

% CORRECT: use braces
$x^{10}$
$a_{max}$

% WRONG: ^ outside math mode
This is x^2    % Missing $ inserted

% CORRECT: use math mode or text commands
This is $x^2$
This is x\\textsuperscript{2}

% WRONG: double superscript
$x^a^b$        % error: Double superscript

% CORRECT: group appropriately
$x^{ab}$       % a and b together as superscript
$${'{'}x^a${'}'}^b$      % b is superscript of (x^a)

% WRONG: nothing after the operator
$x^$           % Missing { inserted

% CORRECT
$x^{}$         % empty group is allowed (rarely useful)`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you do superscripts in LaTeX?</h3>
          <p>
            In math mode use the caret: <code>$x^2$</code> gives x squared and{' '}
            <code>{`$x^{10}$`}</code> gives x to the tenth. Wrap anything longer than one character
            in braces. In normal text use <code>{`\\textsuperscript{...}`}</code>, for example{' '}
            <code>{`1\\textsuperscript{st}`}</code>.
          </p>
          <h3>How do you write a subscript in LaTeX?</h3>
          <p>
            Use the underscore in math mode: <code>$x_i$</code> or, for more than one character,{' '}
            <code>{`$x_{i+1}$`}</code>. In running text use <code>{`\\textsubscript{...}`}</code>,
            so water is <code>{`H\\textsubscript{2}O`}</code>. Both text commands are built into
            LaTeX since 2015.
          </p>
          <h3>How do I write squared in LaTeX?</h3>
          <p>
            Type <code>$x^2$</code> for x squared and <code>$x^3$</code> for x cubed. For units
            write <code>{`$5\\,\\mathrm{m}^2$`}</code>, or load siunitx and write{' '}
            <code>{`\\qty{5}{\\metre\\squared}`}</code>. In plain text,{' '}
            <code>{`m\\textsuperscript{2}`}</code> also works.
          </p>
          <h3>Why does $x^10$ only raise the 1?</h3>
          <p>
            The <code>^</code> and <code>_</code> operators take exactly one token. In{' '}
            <code>$x^10$</code> that token is the digit 1, so the 0 is typeset at normal size next
            to it. Write <code>{`$x^{10}$`}</code> with braces so the whole number is the exponent.
          </p>
          <h3>What does &ldquo;Double superscript&rdquo; mean?</h3>
          <p>
            You attached two superscripts to the same base, as in <code>$x^a^b$</code>. LaTeX cannot
            tell whether you mean x<sup>ab</sup> or (x<sup>a</sup>)<sup>b</sup>, so you have to group
            one of them: <code>{`$x^{ab}$`}</code> or <code>{`$${'{'}x^a${'}'}^b$`}</code>.
            &ldquo;Double subscript&rdquo; is the same problem with underscores.
          </p>
          <h3>How do I put a subscript and a superscript on the same symbol?</h3>
          <p>
            Write both after the base in either order: <code>$x_i^2$</code> and <code>$x^2_i$</code>{' '}
            give the same result, with the two scripts stacked. For a prescript on the left, as in
            isotope notation, use <code>{`$${'{}'}^{14}_{6}\\mathrm{C}$`}</code> or{' '}
            <code>{`\\prescript{14}{6}{\\mathrm{C}}`}</code> from mathtools.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Now that you&apos;ve mastered subscripts and superscripts, explore these related topics:</p>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> &mdash; Fractions, roots, inline vs display math and the amsmath environments</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums, and Limits</Link> &mdash; Big operators, <code>\limits</code>, Σ notation and partial derivatives</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> &mdash; Complete reference for mathematical symbols</li>
            <li><Link href="/learn/brackets">Brackets and Parentheses in LaTeX</Link> &mdash; <code>\left</code>, <code>\right</code> and sizing delimiters around powers</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &mdash; Raised markers done properly with <code>\footnote</code></li>
            <li><Link href="https://www.useoctree.com/blog/squared-symbol-superscript-numbers-how-to-type">How to type the squared symbol and superscript numbers</Link> &mdash; Keyboard shortcuts outside LaTeX</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &mdash; Test your LaTeX code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &mdash; Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> &mdash; Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> &mdash; Generate BibTeX citations from DOIs</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &mdash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &mdash; Browse math operators and Greek letters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX math" title="Related LaTeX Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree &mdash; the AI-powered LaTeX editor that catches a missing brace before
              you compile and explains errors like &ldquo;Double superscript&rdquo; in plain English.
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
