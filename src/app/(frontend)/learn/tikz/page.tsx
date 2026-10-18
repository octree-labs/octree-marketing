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

const breadcrumbs = getLearnBreadcrumbs('Learn TikZ', 'tikz')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'tikz',
  title: 'Learn TikZ – Create Diagrams in LaTeX Tutorial 2025',
  description: 'Master TikZ for creating diagrams, flowcharts, graphs, and illustrations in LaTeX. Free tutorial covering shapes, nodes, arrows, styling, trees, and advanced techniques.',
  keywords: 'tikz timeline, tikz block diagram, tikz neural network, tikz flowchart examples, tikz mindmap, tikz circuit diagrams, learn tikz, tikz tutorial, tikz examples, tikz diagrams, tikz graphs, tikz arrows, tikz nodes, latex diagrams, latex graphics',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

export default async function LearnTikzPage() {
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
          <h1>Learn TikZ</h1>
          <p className="lead">
            TikZ is a powerful package for creating graphics directly in LaTeX. 
            From simple diagrams to complex illustrations, TikZ can do it all.
          </p>

          <h2>What is TikZ?</h2>
          <p>
            TikZ (pronounced &quot;teeks&quot;) stands for &quot;TikZ ist kein Zeichenprogramm&quot; 
            (German for &quot;TikZ is not a drawing program&quot;). It&apos;s a LaTeX package that 
            allows you to create high-quality graphics programmatically using a simple syntax.
          </p>

          <h2>Why Use TikZ?</h2>
          <ul>
            <li><strong>Vector Graphics</strong> – Produces crisp, scalable graphics that look perfect at any size.</li>
            <li><strong>Consistent Styling</strong> – Graphics match your document&apos;s fonts and style automatically.</li>
            <li><strong>Programmable</strong> – Use loops, conditionals, and calculations to generate complex graphics.</li>
            <li><strong>Reproducible</strong> – Graphics are defined in code, making them easy to version control and modify.</li>
          </ul>

          <h2>Getting Started</h2>
          <p>First, include the TikZ package in your preamble:</p>
          
          <pre><code>{`\\usepackage{tikz}
\\usetikzlibrary{arrows.meta, shapes, positioning}`}</code></pre>

          <h2>Your First TikZ Drawing</h2>
          <pre><code>{`\\begin{tikzpicture}
  \\draw (0,0) -- (2,0) -- (2,2) -- (0,2) -- cycle;
\\end{tikzpicture}`}</code></pre>
          <p>This draws a simple square. The <code>--</code> operator connects points, and <code>cycle</code> closes the path.</p>

          <h2>Basic Shapes</h2>
          <pre><code>{`\\begin{tikzpicture}
  % Rectangle
  \\draw (0,0) rectangle (2,1);
  
  % Circle
  \\draw (4,0.5) circle (0.5);
  
  % Ellipse
  \\draw (6,0.5) ellipse (0.7 and 0.4);
  
  % Arc
  \\draw (8,0) arc (0:180:0.5);
\\end{tikzpicture}`}</code></pre>

          <h2>Styling Lines and Fills</h2>
          <pre><code>{`\\begin{tikzpicture}
  % Colored and filled
  \\draw[blue, thick, fill=blue!20] (0,0) rectangle (2,1);
  
  % Dashed line
  \\draw[dashed, red] (3,0) -- (5,1);
  
  % Dotted with arrow
  \\draw[dotted, ->, thick] (6,0) -- (8,1);
  
  % Custom line width
  \\draw[line width=2pt] (9,0) -- (11,1);
\\end{tikzpicture}`}</code></pre>

          <h2>Nodes and Labels</h2>
          <p>Nodes are the building blocks for diagrams:</p>
          <pre><code>{`\\begin{tikzpicture}
  % Simple node
  \\node at (0,0) {Hello};
  
  % Styled node
  \\node[draw, circle] at (2,0) {A};
  
  % Rectangle node with fill
  \\node[draw, rectangle, fill=yellow!30] at (4,0) {Box};
  
  % Named nodes for connections
  \\node[draw, circle] (a) at (0,-2) {1};
  \\node[draw, circle] (b) at (2,-2) {2};
  \\draw[->] (a) -- (b);
\\end{tikzpicture}`}</code></pre>

          <h2>Flowcharts</h2>
          <pre><code>{`\\begin{tikzpicture}[
  node distance=2cm,
  startstop/.style={rectangle, rounded corners, draw, fill=red!30},
  process/.style={rectangle, draw, fill=blue!30},
  decision/.style={diamond, draw, fill=green!30, aspect=2}
]
  \\node[startstop] (start) {Start};
  \\node[process, below of=start] (process1) {Process};
  \\node[decision, below of=process1] (decision) {Decision?};
  \\node[process, below of=decision] (process2) {Action};
  \\node[startstop, below of=process2] (stop) {End};
  
  \\draw[->] (start) -- (process1);
  \\draw[->] (process1) -- (decision);
  \\draw[->] (decision) -- node[right] {Yes} (process2);
  \\draw[->] (process2) -- (stop);
  \\draw[->] (decision.east) -- ++(1,0) |- node[near start, above] {No} (process1.east);
\\end{tikzpicture}`}</code></pre>

          <h2>Graphs and Trees</h2>
          <pre><code>{`\\usetikzlibrary{graphs, graphdrawing}
\\usegdlibrary{trees}

\\begin{tikzpicture}
  \\graph[tree layout, grow=down, sibling distance=2cm] {
    root -> {
      child1 -> {grandchild1, grandchild2},
      child2,
      child3 -> grandchild3
    }
  };
\\end{tikzpicture}`}</code></pre>

          <h2>Coordinate Systems</h2>
          <pre><code>{`\\begin{tikzpicture}
  % Cartesian coordinates
  \\draw (0,0) -- (2,1);
  
  % Polar coordinates (angle:radius)
  \\draw (0,0) -- (45:2);
  
  % Relative coordinates
  \\draw (0,0) -- ++(1,0) -- ++(0,1) -- ++(-1,0) -- cycle;
  
  % Named coordinates
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (2,1);
  \\draw (A) -- (B);
\\end{tikzpicture}`}</code></pre>

          <h2>Loops and Calculations</h2>
          <pre><code>{`\\begin{tikzpicture}
  % Draw multiple circles using foreach
  \\foreach \\x in {0,1,2,3,4} {
    \\draw (\\x,0) circle (0.3);
  }
  
  % Pentagon using calculations
  \\foreach \\i in {1,...,5} {
    \\draw ({90+72*\\i}:1) -- ({90+72*(\\i+1)}:1);
  }
\\end{tikzpicture}`}</code></pre>

          <h2>Useful Libraries</h2>
          <table>
            <thead>
              <tr>
                <th>Library</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>arrows.meta</code></td>
                <td>Advanced arrow tips</td>
              </tr>
              <tr>
                <td><code>positioning</code></td>
                <td>Relative node positioning</td>
              </tr>
              <tr>
                <td><code>shapes</code></td>
                <td>Additional node shapes</td>
              </tr>
              <tr>
                <td><code>calc</code></td>
                <td>Coordinate calculations</td>
              </tr>
              <tr>
                <td><code>decorations</code></td>
                <td>Path decorations</td>
              </tr>
              <tr>
                <td><code>patterns</code></td>
                <td>Fill patterns</td>
              </tr>
            </tbody>
          </table>

          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/pgfplots">Learn PGFPlots</Link> – Create data visualizations</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> – Master the xcolor package for colorful diagrams</li>
            <li><Link href="/learn/latex">Learn LaTeX Basics</Link> – Review fundamentals</li>
          </ul>

          <h2>Free TikZ Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/tikz-generator" target="_blank" rel="noopener noreferrer">TikZ Generator</Link> – Generate TikZ code with AI from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/tools/image-to-tikz" target="_blank" rel="noopener noreferrer">Image to TikZ</Link> – Convert images and diagrams to TikZ code</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your TikZ code with live preview</li>
          </ul>

          <RelatedPosts searchTerm="TikZ" title="Related TikZ Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Create TikZ diagrams with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI can help you generate TikZ code from descriptions. Just describe what you want!
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

