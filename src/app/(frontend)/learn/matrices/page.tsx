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

const breadcrumbs = getLearnBreadcrumbs('Matrices', 'matrices')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'matrices',
  title: 'Matrices in LaTeX: pmatrix, bmatrix, Matrix Brackets and Determinants',
  seoTitle: 'LaTeX Matrices: pmatrix, bmatrix and Brackets',
  description: 'Matrices in LaTeX with amsmath: matrix brackets compared (pmatrix, bmatrix, vmatrix), smallmatrix inline, augmented matrices, transpose and determinants.',
  keywords: 'latex matrix, latex matrices, matrix brackets latex, latex pmatrix, latex bmatrix, latex vmatrix, latex Bmatrix, latex Vmatrix, latex determinant, latex augmented matrix, latex identity matrix, latex transpose, latex smallmatrix, latex matrix inline, latex hdotsfor, latex ddots vdots cdots, MaxMatrixCols, nicematrix, latex amsmath matrix, latex array, how to write matrix in latex, latex matrix examples',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do I write a matrix in LaTeX?',
    answer:
      'Load amsmath and, inside math mode, use one of the matrix environments. Columns are separated by & and rows by \\\\: \\[ \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\]. pmatrix gives round brackets, bmatrix square brackets, vmatrix vertical bars for a determinant, and matrix no brackets.',
  },
  {
    question: 'What is the difference between pmatrix and bmatrix?',
    answer:
      'Only the brackets. pmatrix wraps the matrix in parentheses ( ), bmatrix in square brackets [ ]. The capitalised Bmatrix gives curly braces { }, vmatrix single bars | | for determinants, and Vmatrix double bars for norms. The content syntax is identical.',
  },
  {
    question: 'How do I write a matrix inline in text?',
    answer:
      'Use smallmatrix inside \\left( ... \\right), or the mathtools shortcuts psmallmatrix and bsmallmatrix: $\\begin{psmallmatrix} a & b \\\\ c & d \\end{psmallmatrix}$. The matrix is set at a reduced size so it fits the line height.',
  },
  {
    question: 'How do I make an augmented matrix with a vertical line?',
    answer:
      'The amsmath matrix environments cannot draw internal lines, so use array with a | in the column specification and add the brackets yourself: \\left[\\begin{array}{cc|c} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{array}\\right].',
  },
  {
    question: 'Why do I get "Extra alignment tab has been changed to \\cr"?',
    answer:
      'A row has more & separators than the matrix allows. Either you have a stray & in one row, or the matrix has more than 10 columns, which is the amsmath default. Raise the limit in the preamble with \\setcounter{MaxMatrixCols}{20}.',
  },
  {
    question: 'How do I write the transpose of a matrix?',
    answer:
      'Add a superscript to the matrix or its name: A^{\\mathsf{T}} (upright sans-serif T, the ISO recommendation), A^\\top (the ⊤ symbol), or plainly A^{T}. Use the same form throughout the document.',
  },
]

export default async function MatricesPage() {
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
            &larr; Back to Learn
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1>Matrices in LaTeX: pmatrix, bmatrix, Matrix Brackets and Determinants</h1>
          <p className="lead">
            Matrices in LaTeX come from the <code>amsmath</code> package: write the entries with{' '}
            <code>&amp;</code> between columns and <code>\\</code> between rows, and pick the
            environment by the matrix brackets you want &mdash; <code>pmatrix</code> for
            parentheses, <code>bmatrix</code> for square brackets, <code>vmatrix</code> for a
            determinant. This guide compares all six environments, then covers inline{' '}
            <code>smallmatrix</code>, augmented matrices with a vertical line, dots for large
            matrices, identity and zero matrices, transpose and determinant notation, matrices
            inside fractions, the column limit, the <code>nicematrix</code> package, and the
            errors you will meet.
          </p>

          {/* ── Comparison table ── */}
          <h2>Matrix Brackets Compared</h2>
          <table>
            <thead>
              <tr>
                <th>Environment</th>
                <th>Brackets</th>
                <th>Looks like</th>
                <th>Use it for</th>
                <th>Package</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>matrix</code></td>
                <td>none</td>
                <td><span className="whitespace-nowrap">a&nbsp;b<br />c&nbsp;d</span></td>
                <td>Bare grid; add your own delimiters with <code>\left</code> and <code>\right</code></td>
                <td>amsmath</td>
              </tr>
              <tr>
                <td><code>pmatrix</code></td>
                <td>( )</td>
                <td><span className="whitespace-nowrap">(a&nbsp;b<br />&nbsp;c&nbsp;d)</span></td>
                <td>The default choice: vectors, transformation matrices, most textbooks</td>
                <td>amsmath</td>
              </tr>
              <tr>
                <td><code>bmatrix</code></td>
                <td>[ ]</td>
                <td><span className="whitespace-nowrap">[a&nbsp;b<br />&nbsp;c&nbsp;d]</span></td>
                <td>Linear algebra, systems of equations, engineering texts</td>
                <td>amsmath</td>
              </tr>
              <tr>
                <td><code>Bmatrix</code></td>
                <td>&#123; &#125;</td>
                <td><span className="whitespace-nowrap">&#123;a&nbsp;b<br />&nbsp;c&nbsp;d&#125;</span></td>
                <td>Rare: sets of vectors, some physics conventions</td>
                <td>amsmath</td>
              </tr>
              <tr>
                <td><code>vmatrix</code></td>
                <td>| |</td>
                <td><span className="whitespace-nowrap">|a&nbsp;b<br />&nbsp;c&nbsp;d|</span></td>
                <td>Determinants</td>
                <td>amsmath</td>
              </tr>
              <tr>
                <td><code>Vmatrix</code></td>
                <td>&#8214; &#8214;</td>
                <td><span className="whitespace-nowrap">&#8214;a&nbsp;b<br />&nbsp;c&nbsp;d&#8214;</span></td>
                <td>Matrix norms</td>
                <td>amsmath</td>
              </tr>
              <tr>
                <td><code>smallmatrix</code></td>
                <td>none (add <code>\left(</code>)</td>
                <td>small grid</td>
                <td>Inline matrices in running text</td>
                <td>amsmath</td>
              </tr>
              <tr>
                <td><code>psmallmatrix</code>, <code>bsmallmatrix</code>, &hellip;</td>
                <td>( ), [ ], &hellip;</td>
                <td>small, with brackets</td>
                <td>Inline matrices without typing <code>\left</code></td>
                <td>mathtools</td>
              </tr>
              <tr>
                <td><code>array</code></td>
                <td>none (add <code>\left[</code>)</td>
                <td>grid with optional lines</td>
                <td>Augmented matrices, column alignment, internal rules</td>
                <td>LaTeX kernel</td>
              </tr>
            </tbody>
          </table>
          <p>
            All of them share the same internal syntax. The one thing to remember is that a
            matrix environment must sit inside math mode (<code>\[...\]</code>,{' '}
            <code>$...$</code>, <code>equation</code>, <code>align</code>); on its own it fails
            with <em>Missing $ inserted</em>.
          </p>

          <pre><code>{`\\usepackage{amsmath}

% All six matrix types with the same content
\\[
\\begin{matrix} a & b \\\\ c & d \\end{matrix} \\quad
\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\quad
\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}
\\]

\\[
\\begin{Bmatrix} a & b \\\\ c & d \\end{Bmatrix} \\quad
\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} \\quad
\\begin{Vmatrix} a & b \\\\ c & d \\end{Vmatrix}
\\]`}</code></pre>

          {/* ── Basic ── */}
          <h2>Basic Matrix with amsmath</h2>
          <p>
            The most basic matrix environment is <code>matrix</code>, provided by the
            <code>amsmath</code> package. Entries in each row are separated by <code>&amp;</code>,
            and rows are terminated by <code>\\</code>. The environment must be placed inside
            a math environment such as <code>\[...\]</code> or <code>equation</code>.
          </p>

          <pre><code>{`\\usepackage{amsmath}

\\[
\\begin{matrix}
  1 & 2 & 3 \\\\
  4 & 5 & 6 \\\\
  7 & 8 & 9
\\end{matrix}
\\]`}</code></pre>

          <p>
            This produces a plain grid of numbers with no surrounding brackets or delimiters.
            Each column is automatically centred. You do not need to specify the number of
            columns &mdash; LaTeX infers it from the content. Do not put <code>\\</code> after
            the last row; it adds an empty row and extra height to the brackets.
          </p>

          <pre><code>{`% A 2x2 matrix
\\[
\\begin{matrix}
  a & b \\\\
  c & d
\\end{matrix}
\\]

% Row and column vectors
\\[
\\begin{pmatrix} x_1 & x_2 & x_3 \\end{pmatrix}
\\qquad
\\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix}
\\]

% Bare matrix with hand-picked brackets
\\[
\\left(\\begin{matrix} a & b \\\\ c & d \\end{matrix}\\right)
\\]`}</code></pre>

          {/* ── pmatrix ── */}
          <h2>Parenthesized Matrices (pmatrix)</h2>
          <p>
            The <code>pmatrix</code> environment is perhaps the most widely used matrix type.
            It wraps the matrix in round parentheses and is the standard choice for vectors,
            transformation matrices, and general-purpose linear algebra notation.
          </p>

          <pre><code>{`% A 3x3 matrix in parentheses
\\[
A = \\begin{pmatrix}
  1 & 0 & 0 \\\\
  0 & 1 & 0 \\\\
  0 & 0 & 1
\\end{pmatrix}
\\]

% A column vector
\\[
\\mathbf{v} = \\begin{pmatrix}
  x \\\\
  y \\\\
  z
\\end{pmatrix}
\\]

% A row vector
\\[
\\mathbf{w}^{\\mathsf{T}} = \\begin{pmatrix}
  w_1 & w_2 & w_3
\\end{pmatrix}
\\]

% Rotation matrix applied to a vector
\\[
R\\mathbf{v} = \\begin{pmatrix}
  \\cos\\theta & -\\sin\\theta \\\\
  \\sin\\theta & \\cos\\theta
\\end{pmatrix}
\\begin{pmatrix} x \\\\ y \\end{pmatrix}
\\]`}</code></pre>

          {/* ── bmatrix ── */}
          <h2>Bracketed Matrices (bmatrix)</h2>
          <p>
            The <code>bmatrix</code> environment surrounds the matrix with square brackets.
            This style is standard in many linear algebra textbooks and is commonly used
            for coefficient matrices and augmented matrices.
          </p>

          <pre><code>{`% A 3x3 matrix in square brackets
\\[
A = \\begin{bmatrix}
  2 & -1 & 0 \\\\
  -1 & 2 & -1 \\\\
  0 & -1 & 2
\\end{bmatrix}
\\]

% The zero vector
\\[
\\mathbf{0} = \\begin{bmatrix}
  0 \\\\
  0 \\\\
  0
\\end{bmatrix}
\\]

% A matrix equation
\\[
\\begin{bmatrix}
  a_{11} & a_{12} \\\\
  a_{21} & a_{22}
\\end{bmatrix}
\\begin{bmatrix}
  x_1 \\\\
  x_2
\\end{bmatrix}
=
\\begin{bmatrix}
  b_1 \\\\
  b_2
\\end{bmatrix}
\\]`}</code></pre>

          {/* ── vmatrix ── */}
          <h2>Determinants (vmatrix) and \det</h2>
          <p>
            The <code>vmatrix</code> environment uses vertical bars as delimiters, which is
            the standard notation for determinants. The <code>Vmatrix</code> environment uses
            double vertical bars, typically for matrix norms. When the determinant is written as
            a function, use <code>\det</code>, which sets &ldquo;det&rdquo; upright with correct
            spacing; <code>|A|</code> is the compact alternative.
          </p>

          <pre><code>{`% 2x2 determinant, three equivalent notations
\\[
\\det A = \\det(A) = |A| = \\begin{vmatrix}
  a & b \\\\
  c & d
\\end{vmatrix}
= ad - bc
\\]

% 3x3 determinant
\\[
\\begin{vmatrix}
  a_{11} & a_{12} & a_{13} \\\\
  a_{21} & a_{22} & a_{23} \\\\
  a_{31} & a_{32} & a_{33}
\\end{vmatrix}
\\]

% Matrix norm with Vmatrix
\\[
\\|A\\| = \\begin{Vmatrix}
  a & b \\\\
  c & d
\\end{Vmatrix}
\\]

% Determinants used in Cramer's rule: matrices inside \\frac
\\[
x = \\frac{
  \\begin{vmatrix} b_1 & a_{12} \\\\ b_2 & a_{22} \\end{vmatrix}
}{
  \\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix}
}
\\]`}</code></pre>

          {/* ── smallmatrix ── */}
          <h2>Inline Matrices: smallmatrix</h2>
          <p>
            The <code>smallmatrix</code> environment produces a compact matrix suitable for
            inline use within running text. It adds no brackets of its own, so wrap it in{' '}
            <code>\left(</code> &hellip; <code>\right)</code>; or load <code>mathtools</code>,
            which provides <code>psmallmatrix</code>, <code>bsmallmatrix</code>,{' '}
            <code>vsmallmatrix</code> and friends with the brackets built in.
          </p>

          <pre><code>{`% Inline small matrix with parentheses
The rotation matrix
$\\left(\\begin{smallmatrix} \\cos\\theta & -\\sin\\theta \\\\
\\sin\\theta & \\cos\\theta \\end{smallmatrix}\\right)$
rotates a vector by $\\theta$ radians.

% Inline small matrix with square brackets
The matrix
$\\left[\\begin{smallmatrix} a & b \\\\ c & d \\end{smallmatrix}\\right]$
has determinant $ad - bc$.

% mathtools shortcuts
\\usepackage{mathtools}
If $A = \\begin{psmallmatrix} 1 & 2 \\\\ 3 & 4 \\end{psmallmatrix}$
and $I = \\begin{bsmallmatrix} 1 & 0 \\\\ 0 & 1 \\end{bsmallmatrix}$,
then $A + I = \\begin{psmallmatrix} 2 & 2 \\\\ 3 & 5 \\end{psmallmatrix}$.`}</code></pre>
          <p>
            A two-row <code>smallmatrix</code> still pokes slightly above and below the line, so
            the lines around it are pushed apart a little. For anything taller than two rows,
            use a display.
          </p>

          {/* ── Augmented ── */}
          <h2>Augmented Matrices: array with a Vertical Line</h2>
          <p>
            Augmented matrices &mdash; used to represent systems of linear equations &mdash;
            include a vertical line separating the coefficient matrix from the constants
            column. The amsmath matrix environments cannot draw internal lines, so use the{' '}
            <code>array</code> environment with a <code>|</code> in the column specification and
            add the outer brackets with <code>\left[</code> and <code>\right]</code>.
          </p>

          <pre><code>{`% Augmented matrix using array
\\[
\\left[\\begin{array}{ccc|c}
  1 & 0 & 0 & 3 \\\\
  0 & 1 & 0 & 5 \\\\
  0 & 0 & 1 & -2
\\end{array}\\right]
\\]

% A system of equations in augmented form, with a row operation
\\[
\\left[\\begin{array}{cc|c}
  2 & 1 & 8 \\\\
  1 & 3 & 13
\\end{array}\\right]
\\xrightarrow{R_1 \\leftrightarrow R_2}
\\left[\\begin{array}{cc|c}
  1 & 3 & 13 \\\\
  2 & 1 & 8
\\end{array}\\right]
\\]

% [A | I] for Gauss-Jordan inversion
\\[
\\left[\\begin{array}{cc|cc}
  1 & 2 & 1 & 0 \\\\
  3 & 4 & 0 & 1
\\end{array}\\right]
\\]`}</code></pre>

          <p>
            The <code>c</code> columns in <code>array</code> are set slightly wider apart than
            in <code>pmatrix</code>; add <code>@&#123;&#125;</code> at the ends of the
            specification to trim the outer padding. You can also define a reusable augmented
            matrix environment in your preamble:
          </p>

          <pre><code>{`% Define a reusable augmented bmatrix environment
\\newenvironment{amatrix}[1]{%
  \\left[\\begin{array}{@{}*{#1}{c}|c@{}}
}{%
  \\end{array}\\right]
}

% Usage: \\begin{amatrix}{number of coefficient columns}
\\[
\\begin{amatrix}{3}
  1 & 2 & 3 & 4 \\\\
  5 & 6 & 7 & 8 \\\\
  9 & 10 & 11 & 12
\\end{amatrix}
\\]`}</code></pre>

          {/* ── Dots ── */}
          <h2>Dots in Large Matrices: \cdots, \vdots, \ddots and \hdotsfor</h2>
          <p>
            For a general m&times;n matrix you show the pattern rather than every entry.{' '}
            <code>\cdots</code> runs across a row, <code>\vdots</code> down a column,{' '}
            <code>\ddots</code> along the diagonal, and amsmath&apos;s{' '}
            <code>\hdotsfor&#123;n&#125;</code> fills n columns of a row with dots in one go:
          </p>
          <pre><code>{`\\[
A = \\begin{pmatrix}
  a_{11} & a_{12} & \\cdots & a_{1n} \\\\
  a_{21} & a_{22} & \\cdots & a_{2n} \\\\
  \\vdots & \\vdots & \\ddots & \\vdots \\\\
  a_{m1} & a_{m2} & \\cdots & a_{mn}
\\end{pmatrix}
\\]

% \\hdotsfor{4} replaces four cells with a row of dots
\\[
\\begin{pmatrix}
  1 & 2 & 3 & 4 \\\\
  \\hdotsfor{4} \\\\
  5 & 6 & 7 & 8
\\end{pmatrix}
\\qquad
\\begin{pmatrix}
  1 & 2 & 3 \\\\
  \\hdotsfor[2]{3} \\\\   % optional argument stretches the dot spacing
  7 & 8 & 9
\\end{pmatrix}
\\]`}</code></pre>

          {/* ── Special ── */}
          <h2>Identity, Zero and Diagonal Matrices</h2>
          <p>
            Certain matrices appear frequently in mathematics and have standard notations.
          </p>

          <h3>Identity matrix</h3>
          <pre><code>{`% 3x3 identity matrix
\\[
I_3 = \\begin{pmatrix}
  1 & 0 & 0 \\\\
  0 & 1 & 0 \\\\
  0 & 0 & 1
\\end{pmatrix}
\\]

% General n x n identity matrix
\\[
I_n = \\begin{pmatrix}
  1 & 0 & \\cdots & 0 \\\\
  0 & 1 & \\cdots & 0 \\\\
  \\vdots & \\vdots & \\ddots & \\vdots \\\\
  0 & 0 & \\cdots & 1
\\end{pmatrix}
\\]

% Symbols for the identity: I, bold I, blackboard 1 (needs the bbm or dsfont package)
$I$, $\\mathbf{I}$, $\\mathrm{Id}$`}</code></pre>

          <h3>Zero matrix</h3>
          <pre><code>{`% Zero matrix, written O or bold 0
\\[
O_{m \\times n} = \\mathbf{0} = \\begin{pmatrix}
  0 & 0 & \\cdots & 0 \\\\
  0 & 0 & \\cdots & 0 \\\\
  \\vdots & \\vdots & \\ddots & \\vdots \\\\
  0 & 0 & \\cdots & 0
\\end{pmatrix}
\\]`}</code></pre>

          <h3>Diagonal matrix</h3>
          <pre><code>{`% Diagonal matrix
\\[
D = \\begin{pmatrix}
  d_1 & 0 & \\cdots & 0 \\\\
  0 & d_2 & \\cdots & 0 \\\\
  \\vdots & \\vdots & \\ddots & \\vdots \\\\
  0 & 0 & \\cdots & d_n
\\end{pmatrix}
\\]

% Using \\operatorname{diag}
\\[
D = \\operatorname{diag}(d_1, d_2, \\ldots, d_n)
\\]`}</code></pre>

          <h3>Triangular matrices</h3>
          <pre><code>{`% Upper triangular matrix
\\[
U = \\begin{pmatrix}
  u_{11} & u_{12} & u_{13} & \\cdots & u_{1n} \\\\
  0 & u_{22} & u_{23} & \\cdots & u_{2n} \\\\
  0 & 0 & u_{33} & \\cdots & u_{3n} \\\\
  \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\
  0 & 0 & 0 & \\cdots & u_{nn}
\\end{pmatrix}
\\]

% Lower triangular matrix
\\[
L = \\begin{pmatrix}
  l_{11} & 0 & 0 & \\cdots & 0 \\\\
  l_{21} & l_{22} & 0 & \\cdots & 0 \\\\
  l_{31} & l_{32} & l_{33} & \\cdots & 0 \\\\
  \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\
  l_{n1} & l_{n2} & l_{n3} & \\cdots & l_{nn}
\\end{pmatrix}
\\]`}</code></pre>

          {/* ── Operations ── */}
          <h2>Matrix Operations: Transpose, Inverse, Multiplication</h2>

          <h3>Transpose: ^&#123;\mathsf&#123;T&#125;&#125;, ^\top or ^&#123;T&#125;</h3>
          <p>
            There are three common ways to write the transpose, and all are superscripts on the
            matrix. ISO 80000-2 recommends an upright T, which <code>\mathsf&#123;T&#125;</code>{' '}
            gives; <code>\top</code> is the &ldquo;tee&rdquo; symbol &#8868;; and a plain italic{' '}
            <code>T</code> is the simplest. Pick one and define a macro so the document is
            consistent:
          </p>
          <pre><code>{`\\newcommand{\\T}{\\mathsf{T}}   % then write A^{\\T}

\\[
A^{\\mathsf{T}} \\qquad A^\\top \\qquad A^{T} \\qquad A^{\\intercal}  % amssymb
\\]

% Transposing an explicit matrix
\\[
\\begin{bmatrix}
  1 & 2 \\\\
  3 & 4 \\\\
  5 & 6
\\end{bmatrix}^{\\mathsf{T}}
=
\\begin{bmatrix}
  1 & 3 & 5 \\\\
  2 & 4 & 6
\\end{bmatrix}
\\]

% Related: conjugate transpose, inverse transpose
\\[
(AB)^{\\mathsf{T}} = B^{\\mathsf{T}} A^{\\mathsf{T}} \\qquad
A^{*} \\quad A^{\\dagger} \\quad A^{H} \\qquad
A^{-\\mathsf{T}} = (A^{-1})^{\\mathsf{T}}
\\]`}</code></pre>

          <h3>Inverse and matrices inside \frac</h3>
          <p>
            A matrix environment is just a box, so it can go anywhere a symbol can: inside a
            fraction, under a root, raised to a power.
          </p>
          <pre><code>{`% 2x2 inverse formula: a matrix inside \\frac
\\[
A^{-1} = \\frac{1}{\\det A}
\\begin{pmatrix}
  d & -b \\\\
  -c & a
\\end{pmatrix}
= \\frac{1}{ad - bc}
\\begin{pmatrix}
  d & -b \\\\
  -c & a
\\end{pmatrix}
\\]

% A matrix as the numerator, and a matrix raised to a power
\\[
\\mathbf{u} = \\frac{\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}}{\\sqrt{5}}
\\qquad
\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}^{-1}
\\qquad
\\frac{1}{2}\\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}
\\]

% Inverse properties
\\[
A A^{-1} = A^{-1} A = I \\qquad (AB)^{-1} = B^{-1} A^{-1}
\\]`}</code></pre>

          <h3>Matrix multiplication</h3>
          <pre><code>{`\\[
\\begin{pmatrix}
  a & b \\\\
  c & d
\\end{pmatrix}
\\begin{pmatrix}
  e & f \\\\
  g & h
\\end{pmatrix}
=
\\begin{pmatrix}
  ae + bg & af + bh \\\\
  ce + dg & cf + dh
\\end{pmatrix}
\\]

% Matrix-vector multiplication
\\[
\\begin{bmatrix}
  1 & 2 \\\\
  3 & 4
\\end{bmatrix}
\\begin{bmatrix}
  x \\\\
  y
\\end{bmatrix}
=
\\begin{bmatrix}
  x + 2y \\\\
  3x + 4y
\\end{bmatrix}
\\]

% Dimensions and entry notation
\\[
A \\in \\mathbb{R}^{m \\times n}, \\qquad A = (a_{ij})_{m \\times n}, \\qquad
\\operatorname{tr}(A), \\quad \\operatorname{rank}(A)
\\]`}</code></pre>

          {/* ── Systems ── */}
          <h2>Systems of Linear Equations</h2>
          <p>
            Matrices are the natural way to represent systems of linear equations in the
            compact form <code>Ax = b</code>. LaTeX can display both the expanded system
            and its matrix form side by side.
          </p>

          <pre><code>{`% System of equations in matrix form
\\[
\\underbrace{
  \\begin{bmatrix}
    a_{11} & a_{12} & a_{13} \\\\
    a_{21} & a_{22} & a_{23} \\\\
    a_{31} & a_{32} & a_{33}
  \\end{bmatrix}
}_{A}
\\underbrace{
  \\begin{bmatrix}
    x_1 \\\\
    x_2 \\\\
    x_3
  \\end{bmatrix}
}_{\\mathbf{x}}
=
\\underbrace{
  \\begin{bmatrix}
    b_1 \\\\
    b_2 \\\\
    b_3
  \\end{bmatrix}
}_{\\mathbf{b}}
\\]`}</code></pre>

          <pre><code>{`% Expanded system alongside matrix form
\\[
\\begin{cases}
  2x + y - z = 8 \\\\
  -3x - y + 2z = -11 \\\\
  -2x + y + 2z = -3
\\end{cases}
\\quad \\Longleftrightarrow \\quad
\\begin{bmatrix}
  2 & 1 & -1 \\\\
  -3 & -1 & 2 \\\\
  -2 & 1 & 2
\\end{bmatrix}
\\begin{bmatrix}
  x \\\\ y \\\\ z
\\end{bmatrix}
=
\\begin{bmatrix}
  8 \\\\ -11 \\\\ -3
\\end{bmatrix}
\\]`}</code></pre>

          {/* ── Block ── */}
          <h2>Block Matrices</h2>
          <p>
            Block matrices are large matrices composed of submatrix blocks. Use nested matrix
            environments, or <code>array</code> with <code>|</code> and <code>\hline</code> to
            draw the block boundaries.
          </p>

          <pre><code>{`% Block matrix with visual separation
\\[
M = \\left[\\begin{array}{cc|cc}
  A_{11} & A_{12} & B_{11} & B_{12} \\\\
  A_{21} & A_{22} & B_{21} & B_{22} \\\\
  \\hline
  C_{11} & C_{12} & D_{11} & D_{12} \\\\
  C_{21} & C_{22} & D_{21} & D_{22}
\\end{array}\\right]
\\]

% Block diagonal matrix
\\[
\\begin{bmatrix}
  A & 0 \\\\
  0 & B
\\end{bmatrix}
=
\\begin{bmatrix}
  a_{11} & a_{12} & 0 & 0 \\\\
  a_{21} & a_{22} & 0 & 0 \\\\
  0 & 0 & b_{11} & b_{12} \\\\
  0 & 0 & b_{21} & b_{22}
\\end{bmatrix}
\\]

% Block matrix notation
\\[
M = \\begin{pmatrix}
  A & B \\\\
  C & D
\\end{pmatrix}
\\quad \\text{where } A, B, C, D \\text{ are submatrices}
\\]`}</code></pre>

          {/* ── Sizing ── */}
          <h2>Matrix Sizing: More Than 10 Columns</h2>
          <p>
            amsmath limits its matrix environments to 10 columns. An 11th column fails with{' '}
            <em>Extra alignment tab has been changed to \cr</em>. Raise the limit with the{' '}
            <code>MaxMatrixCols</code> counter in the preamble:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\setcounter{MaxMatrixCols}{20}

\\[
\\begin{pmatrix}
  1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12
\\end{pmatrix}
\\]`}</code></pre>
          <p>
            A wide matrix may still overflow the line; reduce the font with{' '}
            <code>\small</code> before the display, use <code>\cdots</code> to abbreviate, or
            switch to <code>array</code>, which has no column limit.
          </p>

          {/* ── nicematrix ── */}
          <h2>The nicematrix Package</h2>
          <p>
            When you need row and column labels, highlighted blocks, dotted lines that cross
            several cells, or exact control over rules, the <code>nicematrix</code> package
            extends every amsmath environment with a <code>Nice</code> variant and adds{' '}
            <code>first-row</code> and <code>first-col</code> for labels outside the brackets:
          </p>
          <pre><code>{`\\usepackage{nicematrix}

\\[
\\begin{pNiceMatrix}
  1 & 2 \\\\
  3 & 4
\\end{pNiceMatrix}
\\qquad
\\begin{bNiceArray}{cc|c}      % augmented matrix with brackets built in
  1 & 2 & 3 \\\\
  4 & 5 & 6
\\end{bNiceArray}
\\qquad
\\begin{pNiceMatrix}[first-row,first-col]
    & x & y \\\\
  a & 1 & 2 \\\\
  b & 3 & 4
\\end{pNiceMatrix}
\\]`}</code></pre>
          <p>
            nicematrix needs two compilation runs for its rules and labels to appear. The older{' '}
            <code>blkarray</code> and <code>kbordermatrix</code> packages do the same job for
            labelled matrices with less flexibility.
          </p>

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
                <td><em>LaTeX Error: Environment pmatrix undefined</em></td>
                <td><code>amsmath</code> not loaded</td>
                <td><code>{`\\usepackage{amsmath}`}</code> in the preamble</td>
              </tr>
              <tr>
                <td><em>Missing $ inserted</em></td>
                <td>Matrix environment used outside math mode</td>
                <td>Wrap it in <code>\[...\]</code>, <code>$...$</code> or <code>equation</code></td>
              </tr>
              <tr>
                <td><em>Extra alignment tab has been changed to \cr</em></td>
                <td>A row has too many <code>&amp;</code>, or more than 10 columns</td>
                <td>Fix the stray <code>&amp;</code>, or <code>{`\\setcounter{MaxMatrixCols}{20}`}</code></td>
              </tr>
              <tr>
                <td><em>Misplaced alignment tab character &amp;</em></td>
                <td><code>&amp;</code> outside any matrix, table or align</td>
                <td>Check that the <code>\begin</code> is present; write <code>\&amp;</code> for a literal ampersand</td>
              </tr>
              <tr>
                <td><em>Missing \right. inserted</em> / <em>Extra \right</em></td>
                <td>Unbalanced <code>\left</code> and <code>\right</code> around an <code>array</code></td>
                <td>Every <code>\left</code> needs a <code>\right</code> in the same line of the display; use <code>\right.</code> for an invisible one</td>
              </tr>
              <tr>
                <td><em>Illegal character in array arg</em></td>
                <td>Wrong column spec, e.g. <code>{`\\begin{array}{2}`}</code> or a typo such as <code>cc:c</code></td>
                <td>Use <code>l</code>, <code>c</code>, <code>r</code> and <code>|</code> only</td>
              </tr>
              <tr>
                <td>Brackets too tall, empty row at the bottom</td>
                <td><code>\\</code> after the last row</td>
                <td>Remove the trailing <code>\\</code></td>
              </tr>
              <tr>
                <td>Inline matrix spreads the lines apart</td>
                <td>Full-size <code>pmatrix</code> in <code>$...$</code></td>
                <td>Use <code>smallmatrix</code> / <code>psmallmatrix</code>, or a display</td>
              </tr>
              <tr>
                <td>Vertical line missing in augmented matrix</td>
                <td>Used <code>pmatrix</code>, which has no column spec</td>
                <td><code>{`\\left(\\begin{array}{cc|c} ... \\end{array}\\right)`}</code></td>
              </tr>
              <tr>
                <td>Dots do not line up along the diagonal</td>
                <td>Mixed <code>\cdots</code>, <code>\vdots</code> and <code>\ddots</code> in the wrong cells</td>
                <td><code>\ddots</code> only on the diagonal cell; <code>\hdotsfor</code> for a full row</td>
              </tr>
            </tbody>
          </table>

          {/* ── Quick ref ── */}
          <h2>Quick Reference Table</h2>
          <table>
            <thead>
              <tr>
                <th>Command / Environment</th>
                <th>Output</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\begin&#123;matrix&#125;</code></td>
                <td>Plain matrix (no delimiters)</td>
                <td>Requires <code>amsmath</code></td>
              </tr>
              <tr>
                <td><code>\begin&#123;pmatrix&#125;</code></td>
                <td>Parenthesized matrix ( )</td>
                <td>Most common for vectors</td>
              </tr>
              <tr>
                <td><code>\begin&#123;bmatrix&#125;</code></td>
                <td>Bracketed matrix [ ]</td>
                <td>Common in linear algebra texts</td>
              </tr>
              <tr>
                <td><code>\begin&#123;Bmatrix&#125;</code></td>
                <td>Braced matrix &#123; &#125;</td>
                <td>Set-theoretic notation</td>
              </tr>
              <tr>
                <td><code>\begin&#123;vmatrix&#125;</code></td>
                <td>Determinant | |</td>
                <td>Standard determinant notation</td>
              </tr>
              <tr>
                <td><code>\begin&#123;Vmatrix&#125;</code></td>
                <td>Norm &#8214; &#8214;</td>
                <td>Double vertical bars</td>
              </tr>
              <tr>
                <td><code>\begin&#123;smallmatrix&#125;</code></td>
                <td>Compact inline matrix</td>
                <td>Wrap with <code>\left(\right)</code>, or <code>psmallmatrix</code> from mathtools</td>
              </tr>
              <tr>
                <td><code>\begin&#123;array&#125;&#123;cc|c&#125;</code></td>
                <td>Augmented matrix</td>
                <td>Use <code>|</code> for the vertical line; add <code>\left[</code> <code>\right]</code></td>
              </tr>
              <tr>
                <td><code>&amp;</code></td>
                <td>Column separator</td>
                <td>Separates entries in a row</td>
              </tr>
              <tr>
                <td><code>\\</code></td>
                <td>Row separator</td>
                <td>Ends the current row; none after the last</td>
              </tr>
              <tr>
                <td><code>\cdots</code>, <code>\vdots</code>, <code>\ddots</code></td>
                <td>Horizontal, vertical, diagonal dots</td>
                <td>Show the pattern of a large matrix</td>
              </tr>
              <tr>
                <td><code>\hdotsfor&#123;n&#125;</code></td>
                <td>Row of dots across n columns</td>
                <td>amsmath</td>
              </tr>
              <tr>
                <td><code>A^&#123;\mathsf&#123;T&#125;&#125;</code>, <code>A^\top</code>, <code>A^&#123;T&#125;</code></td>
                <td>Transpose</td>
                <td>Pick one form per document</td>
              </tr>
              <tr>
                <td><code>A^&#123;-1&#125;</code></td>
                <td>Inverse</td>
                <td>Superscript -1</td>
              </tr>
              <tr>
                <td><code>\det A</code>, <code>|A|</code></td>
                <td>Determinant</td>
                <td>Upright &quot;det&quot; operator, or <code>vmatrix</code> for the explicit form</td>
              </tr>
              <tr>
                <td><code>\operatorname&#123;diag&#125;</code>, <code>\operatorname&#123;tr&#125;</code></td>
                <td>Diagonal, trace operators</td>
                <td>Upright operator names</td>
              </tr>
              <tr>
                <td><code>\setcounter&#123;MaxMatrixCols&#125;&#123;20&#125;</code></td>
                <td>Allow more than 10 columns</td>
                <td>Preamble, amsmath</td>
              </tr>
              <tr>
                <td><code>\begin&#123;pNiceMatrix&#125;</code></td>
                <td>Matrix with labels, blocks, rules</td>
                <td>nicematrix</td>
              </tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I write a matrix in LaTeX?</h3>
          <p>
            Load <code>amsmath</code> and, inside math mode, use one of the matrix environments.
            Columns are separated by <code>&amp;</code> and rows by <code>\\</code>:{' '}
            <code>{`\\[ \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\]`}</code>.{' '}
            <code>pmatrix</code> gives round brackets, <code>bmatrix</code> square brackets,{' '}
            <code>vmatrix</code> vertical bars for a determinant, and <code>matrix</code> no
            brackets.
          </p>
          <h3>What is the difference between pmatrix and bmatrix?</h3>
          <p>
            Only the brackets. <code>pmatrix</code> wraps the matrix in parentheses ( ),{' '}
            <code>bmatrix</code> in square brackets [ ]. The capitalised <code>Bmatrix</code>{' '}
            gives curly braces &#123; &#125;, <code>vmatrix</code> single bars | | for
            determinants, and <code>Vmatrix</code> double bars for norms. The content syntax is
            identical.
          </p>
          <h3>How do I write a matrix inline in text?</h3>
          <p>
            Use <code>smallmatrix</code> inside <code>\left( ... \right)</code>, or the mathtools
            shortcuts <code>psmallmatrix</code> and <code>bsmallmatrix</code>:{' '}
            <code>{`$\\begin{psmallmatrix} a & b \\\\ c & d \\end{psmallmatrix}$`}</code>. The matrix
            is set at a reduced size so it fits the line height.
          </p>
          <h3>How do I make an augmented matrix with a vertical line?</h3>
          <p>
            The amsmath matrix environments cannot draw internal lines, so use{' '}
            <code>array</code> with a <code>|</code> in the column specification and add the
            brackets yourself:{' '}
            <code>{`\\left[\\begin{array}{cc|c} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{array}\\right]`}</code>.
          </p>
          <h3>Why do I get &ldquo;Extra alignment tab has been changed to \cr&rdquo;?</h3>
          <p>
            A row has more <code>&amp;</code> separators than the matrix allows. Either you have a
            stray <code>&amp;</code> in one row, or the matrix has more than 10 columns, which is
            the amsmath default. Raise the limit in the preamble with{' '}
            <code>{`\\setcounter{MaxMatrixCols}{20}`}</code>.
          </p>
          <h3>How do I write the transpose of a matrix?</h3>
          <p>
            Add a superscript to the matrix or its name: <code>{`A^{\\mathsf{T}}`}</code> (upright
            sans-serif T, the ISO recommendation), <code>A^\top</code> (the &#8868; symbol), or
            plainly <code>{`A^{T}`}</code>. Use the same form throughout the document.
          </p>

          <h2>Next Steps</h2>
          <p>Now that you can create matrices in LaTeX, explore more mathematical typesetting topics:</p>
          <ul>
            <li>
              <Link href="/learn/brackets">Brackets and Parentheses in LaTeX</Link> &ndash; <code>\left</code>, <code>\right</code>, manual sizes and every delimiter you can put around a matrix
            </li>
            <li>
              <Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Comprehensive guide to writing math in LaTeX
            </li>
            <li>
              <Link href="/learn/integrals-sums-limits">Integrals, Sums &amp; Limits</Link> &ndash; Typeset calculus and analysis notation
            </li>
            <li>
              <Link href="/learn/multiline-equations">Multiline Equations</Link> &ndash; align, split and matrix equations over several lines
            </li>
            <li>
              <Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> &ndash; Complete reference for mathematical symbols
            </li>
            <li>
              <Link href="/learn/tables">LaTeX Tables</Link> &ndash; When the grid is data rather than a matrix
            </li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test your LaTeX code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> &ndash; Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> &ndash; Generate BibTeX citations from DOIs</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and Greek letters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX matrix" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree &ndash; the AI-powered LaTeX editor that turns &ldquo;3 by 3 identity
              matrix in square brackets&rdquo; into compiled LaTeX in seconds.
            </p>
            <Link
              href="https://app.useoctree.com"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Try Octree Free &rarr;
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
