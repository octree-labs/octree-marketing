import type { Metadata } from 'next/types'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'
import { RelatedPosts } from '@/components/Learn/related-posts'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('LaTeX Comments', 'comments')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function LaTeXCommentsPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          <h1>LaTeX Comments: Single-Line, Multi-Line and Block Comments</h1>
          <p className="lead">
            A LaTeX comment starts with <code>%</code> and runs to the end of the line. That is
            the whole built-in syntax: there is no multi-line comment in TeX itself. This guide
            covers the percent sign and its one surprising side effect, the three ways to comment
            out a block (<code>comment</code> package, <code>verbatim</code> package,{' '}
            <code>\iffalse</code>), editor shortcuts, todo notes in the margin, and how to keep
            draft-only content out of the final PDF.
          </p>

          {/* ── Percent ── */}
          <h2>Single-Line Comments with %</h2>
          <p>
            Everything after <code>%</code> on a line is ignored by the compiler. It can sit on a
            line of its own or after some code:
          </p>
          <pre><code>{`% This whole line is a comment.
\\section{Results}   % the section title is typeset, this note is not
The experiment ran for 12 hours. % TODO: check the exact duration`}</code></pre>

          <h3>Why % at the end of a line matters</h3>
          <p>
            A comment also removes the line break itself. Normally TeX turns the end of a line into
            a space; <code>%</code> discards that space together with any leading whitespace on the
            next line. That is why package code and macro definitions end lines with{' '}
            <code>%</code>: without it, every line break inside the definition would leak a space
            into the output.
          </p>
          <pre><code>{`\\newcommand{\\mylogo}{%
  \\textbf{Oc}%
  \\textit{tree}%
}
% Without the three % signs, "Oc tree" would be printed with a space.`}</code></pre>
          <p>
            The same trick joins two words across a line break in running text:{' '}
            <code>super%</code> followed by <code>script</code> on the next line prints
            &ldquo;superscript&rdquo;.
          </p>

          <h3>A literal percent sign</h3>
          <p>
            To print <code>%</code> in the text, escape it with a backslash. Forgetting this is a
            classic bug: the rest of the line silently disappears.
          </p>
          <pre><code>{`Accuracy improved by 12\\% over the baseline.   % correct
Accuracy improved by 12% over the baseline.    % everything after 12 is gone`}</code></pre>

          {/* ── comment package ── */}
          <h2>Multi-Line Comments with the comment Package</h2>
          <p>
            The <code>comment</code> package provides a <code>comment</code> environment whose
            body is skipped entirely. The text inside does not have to be valid LaTeX: unbalanced
            braces, broken commands and half-written environments are all fine.
          </p>
          <pre><code>{`\\usepackage{comment}

\\begin{comment}
This paragraph is a first draft { with an unbalanced brace
and a \\badcommand that does not exist.
\\begin{figure}  % never processed
\\end{comment}`}</code></pre>
          <p>
            One strict rule: <code>\begin{'{'}comment{'}'}</code> and{' '}
            <code>\end{'{'}comment{'}'}</code> must each stand on a line of their own, with no
            leading spaces and nothing after them. The package reads the file line by line looking
            for exactly that line, so <code>{`text \\end{comment}`}</code> or an indented{' '}
            <code>\end{'{'}comment{'}'}</code> is not recognised and the comment runs to the end
            of the file.
          </p>

          <h3>Named blocks: \includecomment and \excludecomment</h3>
          <p>
            The same package lets you define your own environments and switch them on or off from
            the preamble, which is how many people manage solutions, reviewer-only notes or
            alternative versions:
          </p>
          <pre><code>{`\\usepackage{comment}
\\includecomment{solution}   % typeset solution blocks
\\excludecomment{note}       % drop note blocks

\\begin{solution}
The answer is 42.
\\end{solution}

\\begin{note}
Reviewer 2 asked for a longer proof here.
\\end{note}`}</code></pre>
          <p>
            Swap <code>\includecomment</code> for <code>\excludecomment</code> to produce the
            student version. The begin and end lines follow the same line-of-their-own rule.
          </p>

          {/* ── verbatim package ── */}
          <h2>The verbatim Package&apos;s comment Environment</h2>
          <p>
            If you already load <code>verbatim</code> (for <code>\verbatiminput</code>, say), it
            provides a <code>comment</code> environment too, with the same name and the same
            effect. Do not load both packages; pick one.
          </p>
          <pre><code>{`\\usepackage{verbatim}

\\begin{comment}
Skipped, just like with the comment package.
\\end{comment}`}</code></pre>
          <p>
            Its implementation is a little more forgiving: <code>\end{'{'}comment{'}'}</code>{' '}
            may be indented. Anything else on that line is dropped with a warning, so the habit of
            keeping it alone on its line still applies.
          </p>

          {/* ── iffalse ── */}
          <h2>\iffalse ... \fi: Commenting Out Without a Package</h2>
          <p>
            TeX&apos;s conditional primitives give you a block comment with no package at all.
            Text between <code>\iffalse</code> and <code>\fi</code> is skipped:
          </p>
          <pre><code>{`\\iffalse
This block is not typeset. Braces { do not } need { to balance.
\\fi`}</code></pre>
          <p>
            There is one rule to remember. While skipping, TeX still counts conditionals, so
            every <code>\if...</code> inside the block must have its own <code>\fi</code>, and the
            block must not contain a stray <code>\fi</code> or <code>\else</code>: the first
            unmatched one ends the comment early and the rest is typeset. This bites when you
            comment out code that itself uses conditionals. Braces, on the other hand, do not have
            to balance for TeX &ndash; but your editor&apos;s brace matching and code folding will
            get confused, which is the practical reason to prefer the <code>comment</code>{' '}
            package for long blocks.
          </p>
          <p>
            You will also see <code>\if0 ... \fi</code> in older documents. <code>\if</code>{' '}
            compares the next two character tokens, so <code>\if0</code> followed by a line break
            compares <code>0</code> with a space and is false. It breaks as soon as the commented
            text happens to start with <code>0</code>; <code>\iffalse</code> has no such edge case.
          </p>

          <h3>A macro that swallows its argument</h3>
          <p>A third no-package option is a command that discards whatever it is given:</p>
          <pre><code>{`\\newcommand{\\ignore}[1]{}

\\ignore{This sentence is read by TeX but never typeset.}`}</code></pre>
          <p>
            Here the braces <em>must</em> balance and <code>\verb</code> cannot appear inside,
            because TeX reads the argument as normal tokens. Do not call it <code>\comment</code>:
            that name is used internally by the <code>comment</code> environment.
          </p>

          {/* ── Editors ── */}
          <h2>Commenting Out in Your Editor</h2>
          <p>
            For a few lines, the fastest route is the editor&apos;s toggle-comment shortcut, which
            inserts or removes <code>%</code> at the start of every selected line:
          </p>
          <ul>
            <li><strong>VS Code</strong> (with LaTeX Workshop) and <strong>Overleaf</strong>: <kbd>Ctrl</kbd>+<kbd>/</kbd> (<kbd>Cmd</kbd>+<kbd>/</kbd> on macOS)</li>
            <li><strong>TeXstudio</strong> and <strong>Texmaker</strong>: <kbd>Ctrl</kbd>+<kbd>T</kbd> to comment, <kbd>Ctrl</kbd>+<kbd>U</kbd> to uncomment</li>
            <li><strong>Octree</strong>: comments are highlighted in the editor, and you can select a block and ask the AI assistant to comment it out, wrap it in a <code>comment</code> environment, or restore it</li>
          </ul>

          {/* ── todonotes ── */}
          <h2>Todo Notes in the Margin: todonotes</h2>
          <p>
            Comments are invisible in the PDF. For notes that should be seen by co-authors, use the{' '}
            <code>todonotes</code> package, which draws colored boxes in the margin or inline:
          </p>
          <pre><code>{`\\usepackage[colorinlistoftodos]{todonotes}

\\listoftodos  % optional: a list of all notes, like a table of contents

The results\\todo{Add the 2026 data} are summarised in Table~2.

\\todo[inline]{Rewrite this section after the review.}
\\todo[color=green!30, author=Ada]{Double-check the units.}
\\todo[noline]{A note without the connecting line.}

\\missingfigure{Plot of accuracy versus training time}`}</code></pre>
          <ul>
            <li><code>{`\\todo{...}`}</code> &ndash; margin note with a line pointing at the text</li>
            <li><code>{`\\todo[inline]{...}`}</code> &ndash; a full-width box in the text flow; use this inside floats and other places where margin notes are not allowed</li>
            <li><code>{`\\missingfigure{...}`}</code> &ndash; a placeholder box for a figure you still have to make</li>
            <li><code>\listoftodos</code> &ndash; a list of every note, with page numbers</li>
          </ul>
          <p>
            To remove every note from the final version, load the package with the{' '}
            <code>disable</code> option: <code>{`\\usepackage[disable]{todonotes}`}</code>. All
            commands still exist, so the document compiles unchanged. With{' '}
            <code>obeyFinal</code>, notes disappear automatically when the class option{' '}
            <code>final</code> is set.
          </p>

          <h3>Notes squeezed or in the wrong place</h3>
          <p>
            Margin notes are <code>\marginpar</code>s, so they need a wide enough margin. If
            todonotes prints <em>&ldquo;The length marginparwidth is less than 2cm&rdquo;</em> or
            the boxes overlap the text, set the width before loading the package, and pass the
            same value as the note width:
          </p>
          <pre><code>{`\\setlength{\\marginparwidth}{2.5cm}
\\usepackage[textwidth=2.5cm]{todonotes}

% Notes on the wrong side of a two-sided document:
\\reversemarginpar`}</code></pre>

          <h3>Alternatives: todo, fixme and changes</h3>
          <p>
            The <code>todo</code> package is a lighter cousin: <code>{`\\todo{...}`}</code> and{' '}
            <code>\todos</code> for the list, without TikZ. The <code>fixme</code> package grades
            notes by severity (<code>\fxnote</code>, <code>\fxwarning</code>,{' '}
            <code>\fxerror</code>, <code>\fxfatal</code>) and, in its final mode, turns any
            remaining <code>\fxfatal</code> into a compile error so nothing slips through. The{' '}
            <code>changes</code> package tracks edits rather than notes: <code>\added</code>,{' '}
            <code>\deleted</code> and <code>\replaced</code> show colored markup in drafts and
            collapse to clean text with <code>{`\\usepackage[final]{changes}`}</code>.
          </p>

          {/* ── typeout ── */}
          <h2>Notes to the Console: \typeout and \message</h2>
          <p>
            Sometimes the note is for whoever runs the compiler, not the reader.{' '}
            <code>\typeout</code> prints a line to the terminal and the <code>.log</code> file;{' '}
            <code>\message</code> is the underlying TeX primitive and does not start a new line.
          </p>
          <pre><code>{`\\typeout{*** Draft build: Table 2 still uses placeholder numbers ***}
\\message{compiling chapter 3}`}</code></pre>

          {/* ── Comments in tables and math ── */}
          <h2>Comments Inside tabular and align</h2>
          <p>
            <code>%</code> works anywhere, including table rows and multi-line equations. The one
            thing to watch is position: a comment after <code>&amp;</code> but before{' '}
            <code>\\</code> swallows the <code>\\</code> and merges the row with the next one.
            Put the comment after the row terminator:
          </p>
          <pre><code>{`\\begin{tabular}{lr}
  Item & Value \\\\ % header row
  A    & 12    \\\\ % first data row
  B    & 7     % WRONG: the \\\\ on this line is now part of the comment \\\\
\\end{tabular}

\\begin{align}
  f(x) &= x^2 + 1 \\\\ % definition
  f'(x) &= 2x         % derivative - no \\\\ needed on the last line
\\end{align}`}</code></pre>
          <p>
            Commenting out an entire row works the same way: put <code>%</code> at the very start
            of the line, so that the row&apos;s <code>\\</code> goes with it.
          </p>

          {/* ── verbatim gotcha ── */}
          <h2>Gotcha: Comments Inside verbatim</h2>
          <p>
            Inside <code>verbatim</code>, <code>lstlisting</code> and <code>\verb</code>, every
            character is printed literally. A <code>%</code> there is not a comment, and a{' '}
            <code>\begin{'{'}comment{'}'}</code> there is not skipped &ndash; both appear in the
            output. The reverse is also true: a <code>comment</code> environment cannot contain{' '}
            <code>\end{'{'}comment{'}'}</code> on its own line, because that line ends the comment
            even inside a listing. If you need to show the <code>comment</code> environment in a
            code sample, write the closing line with a space in front or break it up.
          </p>

          {/* ── Conditional content ── */}
          <h2>Draft and Final Versions with Conditionals</h2>
          <p>
            When the same source has to produce two documents &ndash; a draft with notes and a
            clean final copy &ndash; a single switch in the preamble is cleaner than commenting
            blocks in and out. Plain TeX&apos;s <code>\newif</code> is enough:
          </p>
          <pre><code>{`\\newif\\ifdraft
\\drafttrue   % change to \\draftfalse for the final version

\\ifdraft
  \\usepackage[colorinlistoftodos]{todonotes}
\\else
  \\usepackage[disable]{todonotes}
\\fi

\\begin{document}
\\ifdraft
  \\textbf{DRAFT -- not for distribution}
\\fi
...`}</code></pre>
          <p>
            Note that the <code>ifdraft</code> package defines a command with the same name,{' '}
            <code>{`\\ifdraft{draft code}{final code}`}</code>, keyed to the class option{' '}
            <code>draft</code>; use one or the other, not both. The <code>etoolbox</code> package
            offers the same idea with less TeX syntax:
          </p>
          <pre><code>{`\\usepackage{etoolbox}
\\newtoggle{draft}
\\toggletrue{draft}      % \\togglefalse{draft} for the final version

\\iftoggle{draft}{%
  \\todo[inline]{Still missing: related work.}%
}{}`}</code></pre>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{comment}
\\setlength{\\marginparwidth}{2.5cm}
\\usepackage[textwidth=2.5cm, colorinlistoftodos]{todonotes}

\\newif\\ifdraft
\\drafttrue

\\excludecomment{reviewernote}   % \\includecomment{reviewernote} for the referee copy

\\newcommand{\\unit}[1]{%
  \\,\\mathrm{#1}%
}

\\begin{document}
\\ifdraft\\listoftodos\\fi

\\section{Method}
We sampled at $44.1\\unit{kHz}$ and discarded 3\\% of the frames.\\todo{Cite the
sampling paper} The remaining frames were aligned by hand.

\\begin{reviewernote}
The alignment step was added after the first round of reviews.
\\end{reviewernote}

\\begin{comment}
Old method, kept for reference:
We sampled at 22 kHz and used automatic alignment { which never
\\end{comment}

\\begin{tabular}{lr}
  Frames  & 1200 \\\\ % before filtering
  Kept    & 1164 \\\\ % after filtering
\\end{tabular}

\\ifdraft
  \\todo[inline]{Add the comparison with the 2025 baseline.}
\\fi
\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>How</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Comment to end of line</td><td><code>% text</code></td></tr>
              <tr><td>Literal percent sign</td><td><code>\%</code></td></tr>
              <tr><td>Suppress the space at a line break</td><td><code>%</code> at the end of the line</td></tr>
              <tr><td>Block comment (package)</td><td><code>{`\\usepackage{comment}`}</code>, then <code>{`\\begin{comment} ... \\end{comment}`}</code> on their own lines</td></tr>
              <tr><td>Block comment (no package)</td><td><code>{`\\iffalse ... \\fi`}</code> (no unmatched <code>\fi</code> inside)</td></tr>
              <tr><td>Switchable blocks</td><td><code>{`\\includecomment{name}`}</code> / <code>{`\\excludecomment{name}`}</code></td></tr>
              <tr><td>Margin note</td><td><code>{`\\todo{text}`}</code> (todonotes)</td></tr>
              <tr><td>Inline note</td><td><code>{`\\todo[inline]{text}`}</code></td></tr>
              <tr><td>Figure placeholder</td><td><code>{`\\missingfigure{text}`}</code></td></tr>
              <tr><td>List of all notes</td><td><code>\listoftodos</code></td></tr>
              <tr><td>Hide all notes</td><td><code>{`\\usepackage[disable]{todonotes}`}</code></td></tr>
              <tr><td>Fix squeezed margin notes</td><td><code>{`\\setlength{\\marginparwidth}{2.5cm}`}</code> before loading todonotes</td></tr>
              <tr><td>Message on the console</td><td><code>{`\\typeout{text}`}</code></td></tr>
              <tr><td>Draft/final switch</td><td><code>\newif\ifdraft</code> + <code>\drafttrue</code>, or etoolbox <code>{`\\newtoggle{draft}`}</code></td></tr>
            </tbody>
          </table>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>With the draft under control, keep building the document:</p>
          <ul>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; hyperref, \url, \href and clickable cross-references</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Footnotes in tables, headings and captions</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; booktabs, multicolumn and longtable</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; The xcolor names used by todonotes and changes</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check what a commented-out block does with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from a text description</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Clean up drafts faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor comments out blocks, finds the unescaped percent sign that
              ate half a paragraph, and compiles your document in seconds.
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
  return {
    title: 'LaTeX Comments: Single-Line, Multi-Line and Block Comments',
    description: 'How to comment in LaTeX: single-line comments with %, multi-line and block comments with the comment package, \\iffalse ... \\fi, commenting out in editors, todo notes with todonotes, and draft/final switches.',
    keywords: 'latex comment, latex multiline comment, latex comment block, latex comment out, comment environment latex, latex todo notes, latex comment package, latex verbatim comment, latex iffalse, latex percent sign, todonotes, latex block comment, latex comment multiple lines',
    openGraph: mergeOpenGraph({
      title: 'LaTeX Comments: Single-Line, Multi-Line and Block Comments',
      description: 'Comments in LaTeX: the % sign, block comments with the comment package and \\iffalse, editor shortcuts, todonotes, and draft/final conditionals.',
      type: 'article',
      url: '/learn/comments',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'LaTeX Comments: Single-Line and Block Comments',
      description: 'Comment out one line or a whole block in LaTeX, add todo notes, and keep drafts out of the final PDF.',
    },
    alternates: {
      canonical: '/learn/comments',
    },
  }
}
