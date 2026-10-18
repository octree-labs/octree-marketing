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

const breadcrumbs = getLearnBreadcrumbs('Subscripts & Superscripts', 'subscripts-superscripts')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'subscripts-superscripts',
  title: 'Subscripts and Superscripts in LaTeX – Guide 2026',
  description: 'Learn how to write subscripts and superscripts in LaTeX. Complete guide covering math mode, text mode, combined notation, chemistry formulas, and advanced techniques with amsmath.',
  keywords: 'latex subscript, latex superscript, latex exponent, latex power, latex underscore, latex caret, subscript in latex, superscript in latex, latex math notation, latex chemistry formulas, textsuperscript latex, textsubscript latex',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

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
          <h1>Subscripts and Superscripts in LaTeX</h1>
          <p className="lead">
            Subscripts and superscripts are essential building blocks of mathematical, scientific, and technical writing in LaTeX.
            From chemical formulas like H₂O to polynomial exponents like x², from footnote markers to tensor notation,
            mastering subscript and superscript syntax is fundamental to producing professional documents.
          </p>

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
            in scientific notation.
          </p>

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
${"{}"}^{14}_{6}C$    % carbon-14 isotope notation
${"{}"}^{A}_{Z}X$    % general isotope notation`}</code></pre>

          <p>
            When combining subscripts and superscripts, LaTeX automatically handles the vertical positioning.
            Both are attached to the same base, so they appear neatly aligned.
          </p>

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
            While LaTeX supports arbitrary nesting depth, keep readability in mind. For very complex
            expressions, consider breaking them into smaller parts using <code>\newcommand</code> or
            restructuring the formula.
          </p>

          <h2>Subscripts and Superscripts in Text Mode</h2>
          <p>
            The caret and underscore operators only work in math mode. To add superscripts and subscripts
            in regular text, use the <code>\textsuperscript&#123;&#125;</code> and <code>\textsubscript&#123;&#125;</code> commands.
          </p>

          <pre><code>{`% Superscript in text mode
This is the 1\\textsuperscript{st} edition.
The 2\\textsuperscript{nd} floor.
March 3\\textsuperscript{rd}, 2026.

% Subscript in text mode (requires fixltx2e or newer LaTeX)
H\\textsubscript{2}O is water.
CO\\textsubscript{2} is carbon dioxide.

% Note: \\textsubscript is available natively in
% LaTeX versions from 2015 onward.
% For older versions, add \\usepackage{fixltx2e}`}</code></pre>

          <p>
            These commands are especially useful for ordinal numbers (1st, 2nd, 3rd),
            chemical formulas written outside of math mode, and footnote-style markers.
          </p>

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
                <td><code>$H_2O$</code></td>
                <td>Chemical formulas with subscript atom counts</td>
              </tr>
              <tr>
                <td>Exponents</td>
                <td><code>$x^n$</code></td>
                <td>Powers and polynomial terms</td>
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
                <td><code>{`${"{}"}^{14}_{6}C$`}</code></td>
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
            </tbody>
          </table>

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
            identical output to the explicit <code>\prime</code> command.
          </p>

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

          <h2>Limits-Style Subscripts</h2>
          <p>
            Large operators like <code>\sum</code>, <code>\prod</code>, <code>\lim</code>, and
            <code>\int</code> have a special behavior: in display mode, their subscripts and
            superscripts appear directly below and above the operator. In inline mode, they appear
            to the side.
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
The sum $\\displaystyle\\sum_{i=1}^{n} x_i$ uses display style.

% Force inline-style limits in display mode
\\[
  \\textstyle\\sum_{i=1}^{n} x_i
\\]

% Use \\limits and \\nolimits for explicit control
$\\sum\\limits_{i=1}^{n}$     % force limits style
$\\sum\\nolimits_{i=1}^{n}$   % force inline style`}</code></pre>

          <p>
            The <code>\limits</code> and <code>\nolimits</code> commands give you fine-grained control
            over whether subscripts and superscripts appear in limits position (above/below) or inline
            position (to the side).
          </p>

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

          <h2>Common Mistakes</h2>
          <p>
            Here are the most frequent errors when working with subscripts and superscripts in LaTeX,
            and how to avoid them:
          </p>

          <ul>
            <li>
              <strong>Forgetting braces for multi-character subscripts/superscripts</strong> &mdash; Writing
              <code>$x^10$</code> instead of <code>{`$x^{10}$`}</code>. Without braces, only the first
              character is raised or lowered.
            </li>
            <li>
              <strong>Using ^ or _ outside math mode</strong> &mdash; The caret and underscore are math-mode
              operators. Using them in text mode causes a compilation error. Use
              <code>\textsuperscript&#123;&#125;</code> and <code>\textsubscript&#123;&#125;</code> instead.
            </li>
            <li>
              <strong>Double subscripts or superscripts</strong> &mdash; Writing <code>$x^a^b$</code> causes
              an error. Use <code>{`$x^{ab}$`}</code> or <code>{`${'{'}x^a{'}'}^b$`}</code> depending on your intent.
            </li>
            <li>
              <strong>Missing dollar signs</strong> &mdash; Forgetting to enter math mode before using
              subscript or superscript operators. Always wrap expressions in <code>$...$</code> or
              <code>\[...\]</code>.
            </li>
            <li>
              <strong>Unbalanced braces</strong> &mdash; Every opening brace must have a matching closing brace.
              Complex nested expressions are especially prone to this error.
            </li>
          </ul>

          <pre><code>{`% WRONG: multi-character without braces
$x^10$         % renders as x^1 then 0
$a_max$        % renders as a_m then ax

% CORRECT: use braces
$x^{10}$
$a_{max}$

% WRONG: ^ outside math mode
This is x^2    % compilation error

% CORRECT: use math mode or text commands
This is $x^2$
This is x\\textsuperscript{2}

% WRONG: double superscript
$x^a^b$        % error: Double superscript

% CORRECT: group appropriately
$x^{ab}$       % a and b together as superscript
${"{x^a}"}^b$      % b is superscript of (x^a)`}</code></pre>

          <h2>Next Steps</h2>
          <p>Now that you&apos;ve mastered subscripts and superscripts, explore these related topics:</p>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> &mdash; Comprehensive guide to writing math in LaTeX</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums, and Limits</Link> &mdash; Advanced calculus notation with limits-style operators</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> &mdash; Complete reference for mathematical symbols</li>
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
              Try Octree &mdash; the AI-powered LaTeX editor that makes writing faster and easier.
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
