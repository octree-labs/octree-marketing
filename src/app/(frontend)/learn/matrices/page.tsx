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

const breadcrumbs = getLearnBreadcrumbs('Matrices', 'matrices')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'matrices',
  title: 'Matrices in LaTeX – Complete Guide 2026',
  description: 'Learn how to create matrices in LaTeX using amsmath. Guide covers pmatrix, bmatrix, vmatrix, augmented matrices, determinants, identity matrices, and matrix operations.',
  keywords: 'latex matrix, latex pmatrix, latex bmatrix, latex vmatrix, latex determinant, latex augmented matrix, latex identity matrix, latex matrix multiplication, latex amsmath matrix, latex array, how to write matrix in latex, latex matrix examples',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

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
          <h1>Matrices in LaTeX</h1>
          <p className="lead">
            Matrices are fundamental structures in linear algebra, physics, computer science,
            and engineering. LaTeX&apos;s <code>amsmath</code> package provides a comprehensive
            set of environments for typesetting matrices of every kind &mdash; from simple
            undelimited grids to determinants, augmented matrices, and block matrices. This
            guide covers every matrix environment you will need, with practical examples you
            can copy directly into your documents.
          </p>

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
            columns &mdash; LaTeX infers it from the content.
          </p>

          <pre><code>{`% A 2x2 matrix
\\[
\\begin{matrix}
  a & b \\\\
  c & d
\\end{matrix}
\\]

% A 1x3 row vector
\\[
\\begin{matrix}
  x_1 & x_2 & x_3
\\end{matrix}
\\]`}</code></pre>

          <h2>Matrix Types</h2>
          <p>
            The <code>amsmath</code> package provides six matrix environments, each producing
            different surrounding delimiters. All share the same internal syntax &mdash; only
            the brackets differ:
          </p>

          <table>
            <thead>
              <tr>
                <th>Environment</th>
                <th>Bracket Style</th>
                <th>Typical Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>matrix</code></td>
                <td>None</td>
                <td>Plain grid, manual delimiters</td>
              </tr>
              <tr>
                <td><code>pmatrix</code></td>
                <td>Parentheses ( )</td>
                <td>General-purpose matrices, vectors</td>
              </tr>
              <tr>
                <td><code>bmatrix</code></td>
                <td>Square brackets [ ]</td>
                <td>Linear algebra, systems of equations</td>
              </tr>
              <tr>
                <td><code>Bmatrix</code></td>
                <td>Curly braces &#123; &#125;</td>
                <td>Set notation, special contexts</td>
              </tr>
              <tr>
                <td><code>vmatrix</code></td>
                <td>Vertical lines | |</td>
                <td>Determinants</td>
              </tr>
              <tr>
                <td><code>Vmatrix</code></td>
                <td>Double vertical lines || ||</td>
                <td>Norms, double-bar delimiters</td>
              </tr>
            </tbody>
          </table>

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
\\mathbf{w}^T = \\begin{pmatrix}
  w_1 & w_2 & w_3
\\end{pmatrix}
\\]

% Matrix with fractions
\\[
R = \\begin{pmatrix}
  \\cos\\theta & -\\sin\\theta \\\\
  \\sin\\theta & \\cos\\theta
\\end{pmatrix}
\\]`}</code></pre>

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

          <h2>Determinants (vmatrix)</h2>
          <p>
            The <code>vmatrix</code> environment uses vertical bars as delimiters, which is
            the standard notation for determinants. The <code>Vmatrix</code> environment uses
            double vertical bars, typically for matrix norms.
          </p>

          <pre><code>{`% 2x2 determinant
\\[
\\det(A) = \\begin{vmatrix}
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
\\begin{Vmatrix}
  a & b \\\\
  c & d
\\end{Vmatrix}
\\]

% Determinant used in Cramer's rule
\\[
x = \\frac{
  \\begin{vmatrix} b_1 & a_{12} \\\\ b_2 & a_{22} \\end{vmatrix}
}{
  \\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix}
}
\\]`}</code></pre>

          <h2>Small Matrices</h2>
          <p>
            The <code>smallmatrix</code> environment produces a compact matrix suitable for
            inline use within running text. It must be wrapped in delimiter commands manually
            since it does not add brackets on its own.
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

% Multiple inline matrices
If $A = \\left(\\begin{smallmatrix} 1 & 2 \\\\ 3 & 4 \\end{smallmatrix}\\right)$
and $B = \\left(\\begin{smallmatrix} 5 & 6 \\\\ 7 & 8 \\end{smallmatrix}\\right)$,
then $A + B = \\left(\\begin{smallmatrix} 6 & 8 \\\\ 10 & 12 \\end{smallmatrix}\\right)$.`}</code></pre>

          <h2>Augmented Matrices</h2>
          <p>
            Augmented matrices &mdash; used to represent systems of linear equations &mdash;
            include a vertical line separating the coefficient matrix from the constants
            column. LaTeX does not have a built-in augmented matrix environment, but you
            can create one using the <code>array</code> environment with a vertical bar
            in the column specification.
          </p>

          <pre><code>{`% Augmented matrix using array
\\[
\\left[\\begin{array}{ccc|c}
  1 & 0 & 0 & 3 \\\\
  0 & 1 & 0 & 5 \\\\
  0 & 0 & 1 & -2
\\end{array}\\right]
\\]

% A system of equations in augmented form
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

% Row echelon form
\\[
\\left[\\begin{array}{ccc|c}
  1 & 2 & -1 & 3 \\\\
  0 & 1 & 3 & 7 \\\\
  0 & 0 & 1 & 2
\\end{array}\\right]
\\]`}</code></pre>

          <p>
            You can also define a reusable augmented matrix command in your preamble to
            avoid repeating the <code>array</code> setup:
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

          <h2>Block Matrices</h2>
          <p>
            Block matrices are large matrices composed of submatrix blocks. In LaTeX, you
            can typeset these using nested matrix environments or by using spacing and
            horizontal/vertical lines to indicate the block structure.
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

          <h2>Special Matrices</h2>
          <p>
            Certain matrices appear frequently in mathematics and have standard notations.
            LaTeX provides the dot commands <code>\ddots</code> (diagonal dots),
            <code>\vdots</code> (vertical dots), and <code>\cdots</code> (centred horizontal
            dots) for indicating patterns in large matrices.
          </p>

          <h3>Identity Matrix</h3>
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
\\]`}</code></pre>

          <h3>Zero Matrix</h3>
          <pre><code>{`% General zero matrix
\\[
O_{m \\times n} = \\begin{pmatrix}
  0 & 0 & \\cdots & 0 \\\\
  0 & 0 & \\cdots & 0 \\\\
  \\vdots & \\vdots & \\ddots & \\vdots \\\\
  0 & 0 & \\cdots & 0
\\end{pmatrix}
\\]`}</code></pre>

          <h3>Diagonal Matrix</h3>
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

          <h3>Symmetric and Triangular Matrices</h3>
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

          <h2>Matrix Operations</h2>
          <p>
            LaTeX can elegantly display matrix operations including multiplication, transposition,
            and inversion. Here are common examples of how to typeset these operations.
          </p>

          <h3>Matrix Multiplication</h3>
          <pre><code>{`% Matrix multiplication
\\[
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
\\]`}</code></pre>

          <h3>Transpose</h3>
          <pre><code>{`% Transpose notation
\\[
A^T = \\begin{pmatrix}
  1 & 2 \\\\
  3 & 4 \\\\
  5 & 6
\\end{pmatrix}^T
=
\\begin{pmatrix}
  1 & 3 & 5 \\\\
  2 & 4 & 6
\\end{pmatrix}
\\]

% Transpose properties
\\[
(AB)^T = B^T A^T
\\]`}</code></pre>

          <h3>Inverse</h3>
          <pre><code>{`% 2x2 inverse formula
\\[
A^{-1} = \\frac{1}{\\det(A)}
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

% Inverse properties
\\[
A A^{-1} = A^{-1} A = I
\\]

\\[
(AB)^{-1} = B^{-1} A^{-1}
\\]`}</code></pre>

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

          <pre><code>{`% Concrete example
\\[
\\begin{bmatrix}
  2 & 1 & -1 \\\\
  -3 & -1 & 2 \\\\
  -2 & 1 & 2
\\end{bmatrix}
\\begin{bmatrix}
  x \\\\
  y \\\\
  z
\\end{bmatrix}
=
\\begin{bmatrix}
  8 \\\\
  -11 \\\\
  -3
\\end{bmatrix}
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

          <h2>Borders and Labeling</h2>
          <p>
            Sometimes you need to add row and column labels to a matrix for clarity. You
            can accomplish this using the <code>array</code> environment with additional
            rows and columns for labels, or by using packages like <code>blkarray</code>.
          </p>

          <pre><code>{`% Matrix with row and column labels using array
\\[
\\begin{array}{c|ccc}
  & x_1 & x_2 & x_3 \\\\
  \\hline
  y_1 & 1 & 2 & 3 \\\\
  y_2 & 4 & 5 & 6 \\\\
  y_3 & 7 & 8 & 9
\\end{array}
\\]`}</code></pre>

          <pre><code>{`% Labeled matrix with kbordermatrix (requires package)
% \\usepackage{kbordermatrix}
\\[
\\kbordermatrix{
  & c_1 & c_2 & c_3 \\\\
  r_1 & 1 & 2 & 3 \\\\
  r_2 & 4 & 5 & 6 \\\\
  r_3 & 7 & 8 & 9
}
\\]`}</code></pre>

          <pre><code>{`% Using blkarray for labeled block matrices
\\usepackage{blkarray}

\\[
\\begin{blockarray}{cccc}
  & x_1 & x_2 & x_3 \\\\
  \\begin{block}{c(ccc)}
    y_1 & a_{11} & a_{12} & a_{13} \\\\
    y_2 & a_{21} & a_{22} & a_{23} \\\\
    y_3 & a_{31} & a_{32} & a_{33} \\\\
  \\end{block}
\\end{blockarray}
\\]`}</code></pre>

          <h2>Quick Reference Table</h2>
          <p>
            Here is a summary of all the key matrix commands and environments covered in
            this guide:
          </p>

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
                <td>Norm || ||</td>
                <td>Double vertical bars</td>
              </tr>
              <tr>
                <td><code>\begin&#123;smallmatrix&#125;</code></td>
                <td>Compact inline matrix</td>
                <td>Wrap with <code>\left(\right)</code></td>
              </tr>
              <tr>
                <td><code>\begin&#123;array&#125;&#123;cc|c&#125;</code></td>
                <td>Augmented matrix</td>
                <td>Use <code>|</code> for vertical separator</td>
              </tr>
              <tr>
                <td><code>&amp;</code></td>
                <td>Column separator</td>
                <td>Separates entries in a row</td>
              </tr>
              <tr>
                <td><code>\\</code></td>
                <td>Row separator</td>
                <td>Ends the current row</td>
              </tr>
              <tr>
                <td><code>\cdots</code></td>
                <td>Horizontal dots</td>
                <td>Pattern across columns</td>
              </tr>
              <tr>
                <td><code>\vdots</code></td>
                <td>Vertical dots</td>
                <td>Pattern down rows</td>
              </tr>
              <tr>
                <td><code>\ddots</code></td>
                <td>Diagonal dots</td>
                <td>Diagonal pattern</td>
              </tr>
              <tr>
                <td><code>A^T</code></td>
                <td>Transpose</td>
                <td>Superscript T</td>
              </tr>
              <tr>
                <td><code>A^&#123;-1&#125;</code></td>
                <td>Inverse</td>
                <td>Superscript -1</td>
              </tr>
              <tr>
                <td><code>\det(A)</code></td>
                <td>Determinant function</td>
                <td>Upright &quot;det&quot; operator</td>
              </tr>
              <tr>
                <td><code>\operatorname&#123;diag&#125;</code></td>
                <td>Diagonal operator</td>
                <td>For diagonal matrix shorthand</td>
              </tr>
            </tbody>
          </table>

          <h2>Next Steps</h2>
          <p>Now that you can create matrices in LaTeX, explore more mathematical typesetting topics:</p>
          <ul>
            <li>
              <Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Comprehensive guide to writing math in LaTeX
            </li>
            <li>
              <Link href="/learn/integrals-sums-limits">Integrals, Sums &amp; Limits</Link> &ndash; Typeset calculus and analysis notation
            </li>
            <li>
              <Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> &ndash; Complete reference for mathematical symbols
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
              Try Octree &ndash; the AI-powered LaTeX editor that makes writing faster and easier.
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
