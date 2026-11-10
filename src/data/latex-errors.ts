/**
 * LaTeX error and warning reference rendered at /learn/errors and
 * /learn/errors/<slug>. Every `broken` snippet reproduces `expect` in the log
 * and every `fixed` snippet compiles cleanly (checked with tectonic, or
 * pdfLaTeX where `engine` says so).
 *
 * Prose fields support one piece of inline markup: «text» renders as <code>.
 * It is stripped for structured data and meta tags.
 */
import type { FaqItem } from '@/utilities/learnMetadata'

export type LatexErrorGroup =
  | 'commands'
  | 'math'
  | 'environments'
  | 'lengths'
  | 'packages'
  | 'warnings'
  | 'fatal'

export interface LatexErrorGroupInfo {
  id: LatexErrorGroup
  title: string
  intro: string
}

export interface LatexErrorVariant {
  /** A closely related message covered on the same page. */
  message: string
  /** The log line(s) for it. */
  log?: string
  /** One or two paragraphs; «code» markup allowed. */
  text: string[]
}

export interface LatexErrorEntry {
  /** URL segment under /learn/errors. */
  slug: string
  /** The message exactly as LaTeX prints it (without the leading "! "). Used as the H1. */
  message: string
  /** Short name for links and breadcrumbs, e.g. "Missing $ inserted". */
  shortName: string
  /** Full <title>, "LaTeX error: …" or "LaTeX warning: …", at most 60 characters. */
  title: string
  /** Meta description, at most 155 characters. */
  description: string
  keywords: string
  severity: 'error' | 'warning'
  group: LatexErrorGroup
  /** One line for the index. «code» allowed. */
  summary: string
  /** One paragraph: cause and fix. «code» allowed. */
  quickAnswer: string
  /** The log excerpt as it appears, including the "! " prefix and "l.<n>" context lines. */
  log: string
  /** 2–4 common causes. «code» allowed. */
  causes: string[]
  /** Paragraphs explaining the fix, shown before the snippets. «code» allowed. */
  fix: string[]
  /** A minimal complete document that reproduces the message. */
  broken: string
  /** The same document, corrected; compiles without the message. */
  fixed: string
  /** Substring of the log that the broken snippet must produce (verification only). */
  expect: string
  /** Engine used to verify the snippets. Defaults to XeLaTeX (tectonic). */
  engine?: 'xelatex' | 'pdflatex'
  variants?: LatexErrorVariant[]
  /** Exactly three related error slugs. */
  related: [string, string, string]
  /** 3–4 questions, rendered visibly and as FAQPage JSON-LD. «code» allowed. */
  faq: FaqItem[]
  /** Longer article on the blog, if there is one. */
  blogPost?: { href: string; title: string }
}

export const latexErrorGroups: LatexErrorGroupInfo[] = [
  {
    id: 'commands',
    title: 'Commands, braces and arguments',
    intro: 'Misspelled or missing commands, unbalanced braces and arguments that never end.',
  },
  {
    id: 'math',
    title: 'Math mode',
    intro: 'Symbols outside math, unmatched delimiters and amsmath environments used in the wrong place.',
  },
  {
    id: 'environments',
    title: 'Environments, lists and tables',
    intro: 'Unmatched \\begin and \\end, list items outside lists, and alignment problems in tables.',
  },
  {
    id: 'lengths',
    title: 'Lengths and numbers',
    intro: 'A length or number was expected and something else was found.',
  },
  {
    id: 'packages',
    title: 'Packages, files and fonts',
    intro: 'Missing files, package option conflicts, encodings and fonts.',
  },
  {
    id: 'warnings',
    title: 'Warnings: references, floats and boxes',
    intro: 'The PDF is produced, but citations, references, figures or lines are not what you expect.',
  },
  {
    id: 'fatal',
    title: 'Fatal errors',
    intro: 'Messages that stop the run entirely. The real cause is usually printed just above them.',
  },
]

const r = String.raw
/** TeX quotes names as `name'; a backtick cannot appear inside String.raw. */
const q = (name: string) => `\`${name}'`

export const latexErrors: LatexErrorEntry[] = [
  {
    slug: 'undefined-control-sequence',
    message: 'Undefined control sequence.',
    shortName: 'Undefined control sequence',
    title: 'LaTeX error: Undefined control sequence',
    description:
      'What "! Undefined control sequence" means in LaTeX: a misspelled command or a missing package. How to find the command in the log and fix it.',
    keywords:
      'undefined control sequence, latex undefined control sequence, undefined control sequence latex, ! undefined control sequence, undefined control sequence overleaf, latex error undefined control sequence',
    severity: 'error',
    group: 'commands',
    summary: 'A command LaTeX does not know: misspelled, or its package is not loaded.',
    quickAnswer:
      'LaTeX met a command (a word starting with a backslash) that is not defined anywhere. Either the name is misspelled («\\textbol» instead of «\\textbf»), or the command comes from a package you have not loaded («\\includegraphics» needs «\\usepackage{graphicx}», «\\mathbb» needs «amssymb»). The last command on the «l.<n>» line of the log is the unknown one: correct the spelling or add the «\\usepackage» line to the preamble.',
    log: r`! Undefined control sequence.
l.5 The set \mathbb
                   {R} of real numbers.`,
    causes: [
      'A typo in the command name: «\\textbol», «\\beign», «\\fraq», or a wrong capital letter («\\Alpha» does not exist in standard LaTeX).',
      'The command belongs to a package that is not loaded: «\\mathbb» and «\\mathfrak» (amssymb), «\\includegraphics» (graphicx), «\\url» (url or hyperref), «\\SI» (siunitx), «\\toprule» (booktabs).',
      'A backslash in text that was meant literally, such as a Windows path «C:\\Users\\data» or a stray «\\» before a word.',
      'A command defined only in one class or template (for example «\\email» or «\\affiliation») used with a different document class.',
    ],
    fix: [
      'Read the line after the error: the log breaks it exactly after the unknown command, so the last token on the «l.<n>» line is the culprit. Here it is «\\mathbb», which is defined by the amssymb package, not by LaTeX itself.',
      'If the spelling is right, search for the package that provides the command and load it in the preamble. If the backslash was meant to be printed, write «\\textbackslash» instead.',
    ],
    broken: r`\documentclass{article}

\begin{document}

The set \mathbb{R} of real numbers.

\end{document}`,
    fixed: r`\documentclass{article}
\usepackage{amssymb}

\begin{document}

The set $\mathbb{R}$ of real numbers.

\end{document}`,
    expect: 'Undefined control sequence',
    related: ['missing-dollar-inserted', 'environment-undefined', 'file-not-found'],
    faq: [
      {
        question: 'How do I find which command is undefined?',
        answer:
          'Look at the line in the log that starts with «l.» and a number. TeX splits it at the point where it stopped, so the last command on the first half is the undefined one. The number is the line in your source file.',
      },
      {
        question: 'Why do I get Undefined control sequence for \\mathbb or \\includegraphics?',
        answer:
          'These commands are not part of core LaTeX. Add «\\usepackage{amssymb}» for «\\mathbb» and «\\usepackage{graphicx}» for «\\includegraphics» to the preamble, before «\\begin{document}».',
      },
      {
        question: 'Can I ignore Undefined control sequence and still get a PDF?',
        answer:
          'In nonstop mode LaTeX skips the unknown command and keeps going, so a PDF may appear, but whatever the command should have produced is missing. Fix the error rather than relying on that output.',
      },
      {
        question: 'Why does the error point to the preamble?',
        answer:
          'A command used in the preamble, such as «\\setlength{\\parskip}» with a misspelled length or a «\\newcommand» body that uses an unknown macro, is reported there. If the error appears when a macro you defined is used, the unknown command is inside your definition.',
      },
    ],
    blogPost: {
      href: '/blog/undefined-control-sequence-latex-error-fix',
      title: 'Undefined control sequence in LaTeX: causes and fixes',
    },
  },
  {
    slug: 'missing-dollar-inserted',
    message: 'Missing $ inserted.',
    shortName: 'Missing $ inserted',
    title: 'LaTeX error: Missing $ inserted',
    description:
      'Why LaTeX says "Missing $ inserted": a math symbol like _, ^ or \\alpha outside math mode, or a blank line inside an equation. How to fix it.',
    keywords:
      'missing $ inserted, latex missing $ inserted, missing dollar inserted latex, ! missing $ inserted, missing $ inserted overleaf, underscore latex error',
    severity: 'error',
    group: 'math',
    summary: 'A math-only symbol («_», «^», «\\alpha») was used in text, or math mode was left early.',
    quickAnswer:
      'TeX found something that only works in math mode, such as «_», «^», «\\alpha» or «\\frac», while it was typesetting ordinary text, so it inserted a «$» to switch into math. The usual culprit is an unescaped underscore in a file name or variable («data_2024.csv»), or a formula typed without «$...$». Wrap real math in «$...$» and write a literal underscore as «\\_».',
    log: r`! Missing $ inserted.
<inserted text> 
                $
l.5 The file is called data_
                            2024.csv and holds x^2 values.`,
    causes: [
      'An underscore or caret in text: file names, identifiers, URLs or e-mail addresses such as «my_file.tex».',
      'A math command in text: «\\alpha», «\\leq», «\\frac{1}{2}» written without surrounding «$».',
      'A blank line inside «$...$», «\\[...\\]» or an equation environment: the paragraph break ends math mode.',
      'Math-only commands inside «\\text{...}» or in a section title without «$».',
    ],
    fix: [
      'Escape characters that are meant as text («\\_», «\\textasciicircum») and put every formula inside «$...$» for inline math or «\\[...\\]» for display math. For long identifiers or paths, «\\texttt{data\\_2024.csv}» or the url package\'s «\\path{...}» avoids escaping each character.',
      'If the error points into an equation, look for an empty line inside it and delete it.',
    ],
    broken: r`\documentclass{article}

\begin{document}

The file is called data_2024.csv and holds x^2 values.

\end{document}`,
    fixed: r`\documentclass{article}

\begin{document}

The file is called data\_2024.csv and holds $x^2$ values.

\end{document}`,
    expect: 'Missing $ inserted',
    related: ['extra-brace-or-forgotten-dollar', 'double-subscript', 'undefined-control-sequence'],
    faq: [
      {
        question: 'How do I type an underscore in LaTeX text?',
        answer:
          'Write «\\_». In code or file names, «\\texttt{my\\_file}» works, and «\\url{...}» or «\\path{...}» from the url package accept the underscore without escaping.',
      },
      {
        question: 'Why does Missing $ inserted appear in my equation?',
        answer:
          'Most often there is a blank line inside the equation or align environment. A blank line ends the paragraph, which is not allowed in math, so TeX closes math mode. Remove the empty line or replace it with a «%» comment line.',
      },
      {
        question: 'Why does \\alpha give Missing $ inserted?',
        answer:
          'Greek letters and most symbols are math-mode commands. Write «$\\alpha$» in running text. If you need it in a section title or caption, the dollars are needed there too.',
      },
    ],
  },
  {
    slug: 'missing-right-inserted',
    message: 'Missing \\right. inserted.',
    shortName: 'Missing \\right. inserted',
    title: 'LaTeX error: Missing \\right. inserted',
    description:
      'Fix "Missing \\right. inserted" and "Extra \\right" in LaTeX: every \\left needs a \\right in the same group, even across lines of align.',
    keywords:
      'missing \\right. inserted, missing right inserted latex, extra \\right, latex left right error, \\left without \\right, left right across lines align, latex missing right',
    severity: 'error',
    group: 'math',
    summary: 'A «\\left» delimiter without its «\\right», often split across lines of align.',
    quickAnswer:
      'Every «\\left» must be closed by a «\\right» in the same formula and the same group. TeX reports «Missing \\right. inserted» when it reaches the end of the formula, a «&» or a «\\\\» with a «\\left» still open. In multi-line equations close each line with «\\right.» (an invisible delimiter) and reopen the next with «\\left.», or use fixed sizes such as «\\bigl(» and «\\bigr)», which do not need to pair.',
    log: r`! Missing \right. inserted.
<inserted text> 
                \right .
l.5 The ratio is $f(x) = \left( \frac{a}{b}$
                                            .`,
    causes: [
      'A «\\left(» whose «\\right)» was forgotten or deleted.',
      'A «\\left ... \\right» pair split across «&» or «\\\\» in align, split or an array. Each cell and each line is its own group; inside align the same mistake is reported as «Extra }, or forgotten \\right».',
      'The pair split across braces, for example «{\\left( x} \\right)», so the two halves are in different groups.',
    ],
    fix: [
      'Add the «\\right)» before the formula ends. In a multi-line equation, close the delimiter in the same line and cell. When a bracket has to span two lines, end the first line with an invisible «\\right.» and start the second with «\\left.», or use manual sizes («\\Bigl(» ... «\\Bigr)»), which work across lines because they are not paired.',
    ],
    broken: r`\documentclass{article}

\begin{document}

The ratio is $f(x) = \left( \frac{a}{b}$.

\end{document}`,
    fixed: r`\documentclass{article}

\begin{document}

The ratio is $f(x) = \left( \frac{a}{b} \right)$.

\end{document}`,
    expect: r`Missing \right. inserted`,
    variants: [
      {
        message: 'Extra \\right.',
        log: r`! Extra \right.
l.5 Text $ (a+b) \right)
                         $`,
        text: [
          'The mirror image: a «\\right» with no matching «\\left» before it in the same group. It usually happens when the «\\left» was deleted, or when it sits on the previous line of an align or inside a different pair of braces.',
          'Add the missing «\\left», or drop the «\\right» and write the plain delimiter. In multi-line formulas use «\\left.» at the start of the line to give the «\\right» a partner.',
        ],
      },
    ],
    related: ['missing-dollar-inserted', 'split-wont-work-here', 'extra-alignment-tab'],
    faq: [
      {
        question: 'What does \\right. mean?',
        answer:
          '«\\right.» is an invisible closing delimiter. It satisfies the pairing rule without printing anything, which is how you close a «\\left» on one line of a multi-line equation.',
      },
      {
        question: 'Can \\left and \\right span several lines of align?',
        answer:
          'No. Each line, and each cell between «&» signs, is typeset separately, so the pair must be complete on one line. Use «\\left( ... \\right.» on the first line and «\\left. ... \\right)» on the next, or fixed sizes like «\\Bigl(» and «\\Bigr)».',
      },
      {
        question: 'What causes Extra \\right?',
        answer:
          'A «\\right» that has no «\\left» in the same group. Check for a deleted «\\left», or a pair split across «&», «\\\\» or braces.',
      },
    ],
  },
  {
    slug: 'missing-brace-inserted',
    message: 'Missing } inserted.',
    shortName: 'Missing } inserted',
    title: 'LaTeX error: Missing } inserted',
    description:
      'What "Missing } inserted" means in LaTeX: a group that never closed before math ended, a table cell or \\item started. Common causes and fixes.',
    keywords:
      'missing } inserted, latex missing } inserted, missing brace inserted latex, ! missing } inserted, missing } inserted equation, missing } inserted table',
    severity: 'error',
    group: 'commands',
    summary: 'A brace group was still open when math mode or a table cell ended.',
    quickAnswer:
      'TeX had an open «{» group when it reached a point where the group must already be closed, such as the closing «$» of a formula, so it inserted a «}» itself. Look for an unbalanced brace near the line shown in the log, typically in a subscript, a superscript or a group like «{\\bf ...}», and add the missing «}» where it belongs.',
    log: r`! Missing } inserted.
<inserted text> 
                }
l.5 The term $x_{i$
                  grows with $i$.`,
    causes: [
      'An unclosed brace in a formula: «$x_{i$» or «$e^{-x$». (If the open brace belongs to a command argument such as «\\frac{a}{b», TeX keeps reading and reports «File ended while scanning use of \\frac» instead.)',
      'A brace opened in one table cell or align column and closed in the next one, across «&».',
      'Verbatim material (verbatim, lstlisting) inside a command argument or a Beamer frame without the «[fragile]» option.',
      'A brace inside «\\left\\{» or a set written as «{...}» instead of «\\{...\\}».',
    ],
    fix: [
      'Count the braces in the formula on the reported line and close the open group before the formula ends. Editors that highlight matching braces make this quick.',
      'If you meant to print a brace, escape it: «\\{» and «\\}».',
    ],
    broken: r`\documentclass{article}

\begin{document}

The term $x_{i$ grows with $i$.

\end{document}`,
    fixed: r`\documentclass{article}

\begin{document}

The term $x_{i}$ grows with $i$.

\end{document}`,
    expect: 'Missing } inserted',
    related: ['extra-brace-or-forgotten-dollar', 'too-many-braces', 'runaway-argument'],
    faq: [
      {
        question: 'Why does LaTeX insert a } on its own?',
        answer:
          'TeX tries to recover so it can continue. When a group has to end, for instance at the end of a formula, it adds the missing «}» and reports it. The output after that point may still be wrong, so fix the source.',
      },
      {
        question: 'I get Missing } inserted in a Beamer frame with code. Why?',
        answer:
          'Frames that contain verbatim or lstlisting need «\\begin{frame}[fragile]». Without it Beamer reads the frame as an argument and the special characters break the brace structure.',
      },
      {
        question: 'How do I find an unbalanced brace in a long document?',
        answer:
          'Start from the line number after «l.» in the log. If that does not help, comment out half of the document at a time until the error disappears; the problem is in the half you removed last.',
      },
    ],
  },
  {
    slug: 'extra-brace-or-forgotten-dollar',
    message: 'Extra }, or forgotten $.',
    shortName: 'Extra }, or forgotten $',
    title: 'LaTeX error: Extra }, or forgotten $',
    description:
      'Fix "Extra }, or forgotten $" in LaTeX: a closing brace without an opening one, or a brace closed inside math that was opened outside it.',
    keywords:
      'extra }, or forgotten $, extra } or forgotten $ latex, latex extra brace error, ! extra }, or forgotten $, forgotten dollar latex',
    severity: 'error',
    group: 'commands',
    summary: 'A «}» with no matching «{», or a group that crosses a «$» boundary.',
    quickAnswer:
      'TeX met a «}» that does not close anything in the current mode. Either there is one closing brace too many, or a group was opened outside math and closed inside it (or the other way round), for example «\\textbf{$x}$». Remove the extra «}» or move it so each «{...}» pair lies completely inside or completely outside the «$...$».',
    log: r`! Extra }, or forgotten $.
<recently read> \egroup 
                        
l.5 The value \textbf{$x = 3}
                             $ is important.`,
    causes: [
      'An extra closing brace, often left behind after deleting a command such as «\\textbf{».',
      'Braces and dollars interleaved: «\\textbf{$x}$» or «${x$}».',
      'A literal brace meant as text, written «}» instead of «\\}».',
    ],
    fix: [
      'Make the brace and the math mode nest properly: either put the whole formula inside the argument («\\textbf{$x = 3$}») or keep the command inside math («$\\mathbf{x} = 3$»). If the brace is simply extra, delete it.',
    ],
    broken: r`\documentclass{article}

\begin{document}

The value \textbf{$x = 3}$ is important.

\end{document}`,
    fixed: r`\documentclass{article}

\begin{document}

The value \textbf{$x = 3$} is important.

\end{document}`,
    expect: 'Extra }, or forgotten $',
    related: ['missing-brace-inserted', 'too-many-braces', 'missing-dollar-inserted'],
    faq: [
      {
        question: 'What is the difference between Extra } and Too many }\'s?',
        answer:
          '«Extra }, or forgotten $» is raised inside a paragraph or math when a «}» closes nothing in the current mode. «Too many }\'s» is the same mistake at the outer level of the document, between paragraphs.',
      },
      {
        question: 'How do I print a curly brace?',
        answer: 'Write «\\{» and «\\}» in text and math. In math, «\\left\\{» gives a large brace, as in a cases definition.',
      },
      {
        question: 'The line in the log looks fine. Where is the extra brace?',
        answer:
          'TeX reports the brace where it noticed the imbalance. Check the lines just before it, and any macro you defined with «\\newcommand» that is used on that line.',
      },
    ],
  },
  {
    slug: 'too-many-braces',
    message: "Too many }'s.",
    shortName: "Too many }'s",
    title: "LaTeX error: Too many }'s",
    description:
      "What \"Too many }'s\" means in LaTeX: a closing brace with no open group, usually left after deleting a command. How to find and remove it.",
    keywords:
      "too many }'s, latex too many braces, too many }'s latex, ! too many }'s, latex extra closing brace",
    severity: 'error',
    group: 'commands',
    summary: 'A closing brace at the outer level of the document that closes nothing.',
    quickAnswer:
      "TeX found a «}» when no group was open at all. It almost always comes from deleting the beginning of a command such as «\\textit{» or «\\begin{center}» replacement braces and leaving its closing brace behind. Delete the stray «}» on the line shown after «l.», or put back the command it belonged to.",
    log: r`! Too many }'s.
l.5 This sentence is fine.}
                           `,
    causes: [
      'A command deleted together with its opening brace but not its closing brace.',
      'Copy-pasted text that ended mid-group, bringing one «}» too many.',
      'A «}» meant to be printed, which needs «\\}».',
    ],
    fix: [
      'Remove the brace TeX points at, or restore the opening «{» (or command) it was meant to close. If you meant a visible brace, write «\\}».',
    ],
    broken: r`\documentclass{article}

\begin{document}

This sentence is fine.}

\end{document}`,
    fixed: r`\documentclass{article}

\begin{document}

This sentence is fine.

\end{document}`,
    expect: "Too many }'s",
    related: ['extra-brace-or-forgotten-dollar', 'missing-brace-inserted', 'runaway-argument'],
    faq: [
      {
        question: "Why do I get Too many }'s instead of Extra }?",
        answer:
          "Which message you get depends on where the brace is. Between paragraphs, at the outer level, TeX says «Too many }'s»; inside a paragraph or formula it usually says «Extra }, or forgotten $».",
      },
      {
        question: "Does Too many }'s break the PDF?",
        answer:
          'TeX ignores the extra brace and continues, so the PDF usually looks right. Still remove it: a stray brace can close a group you meant to keep open and change fonts or settings for the rest of the document.',
      },
      {
        question: 'How do I find the stray brace quickly?',
        answer:
          'Go to the line number after «l.» in the log. The brace is at the end of the first part of that line, where TeX broke it.',
      },
    ],
  },
  {
    slug: 'runaway-argument',
    message: 'Runaway argument?',
    shortName: 'Runaway argument',
    title: 'LaTeX error: Runaway argument?',
    description:
      'Fix "Runaway argument?" and "Paragraph ended before ... was complete" in LaTeX: an argument whose closing brace is missing. How to find it.',
    keywords:
      'runaway argument, latex runaway argument, runaway argument? latex, file ended while scanning use of, runaway argument paragraph ended',
    severity: 'error',
    group: 'commands',
    summary: 'A command argument that never ends: its closing brace is missing.',
    quickAnswer:
      'TeX started reading the argument of a command and could not find the closing «}» before a blank line (or the end of the file). It prints «Runaway argument?» followed by the start of the argument it was reading, then a second error such as «Paragraph ended before \\textbf was complete» or «File ended while scanning use of ...». The text after «Runaway argument?» shows you where the argument starts: add its closing brace.',
    log: r`Runaway argument?
{This text should be bold, but the brace never closes. \par Next para\ETC.
! File ended while scanning use of \textbf .
<inserted text> 
                \par 
<*> main.tex`,
    causes: [
      'A missing closing brace in «\\textbf{», «\\section{», «\\caption{», «\\footnote{» and similar commands.',
      'A blank line inside an argument of a command that does not accept paragraphs, such as «\\author», «\\label» or «\\cite». Then the follow-up error is «Paragraph ended before ... was complete».',
      'A missing «}» in a «.bib» field, which makes the bibliography run away (the message then appears while reading the «.bbl» file).',
    ],
    fix: [
      'Use the text printed after «Runaway argument?»: it is the beginning of the unterminated argument. Find it in the source and add the «}» at the end of the intended text.',
      'If the argument really needs several paragraphs, use an environment or a declaration instead, for example «{\\bfseries ...}» or a «\\begin{quote}».',
    ],
    broken: r`\documentclass{article}

\begin{document}

\textbf{This text should be bold, but the brace never closes.

Next paragraph.

\end{document}`,
    fixed: r`\documentclass{article}

\begin{document}

\textbf{This text should be bold, and now the brace closes.}

Next paragraph.

\end{document}`,
    expect: 'Runaway argument?',
    related: ['paragraph-ended-before-complete', 'missing-brace-inserted', 'emergency-stop'],
    faq: [
      {
        question: 'What does File ended while scanning use of mean?',
        answer:
          'It is the same runaway argument, detected at the end of the file instead of at a blank line. The command named in the message is the one whose closing brace is missing.',
      },
      {
        question: 'Why does Runaway argument point to my bibliography?',
        answer:
          'An unbalanced brace in a «.bib» entry, such as «title = {A {GPU} method,», is copied into the «.bbl» file. Check the entry printed after «Runaway argument?», fix it in the «.bib» file, and delete the old «.bbl» before compiling again.',
      },
      {
        question: 'Is Runaway argument an error or a warning?',
        answer:
          'It is a diagnostic printed right before the real error. The error that follows it («Paragraph ended before ...» or «File ended while scanning ...») stops the compile in most editors.',
      },
    ],
  },
  {
    slug: 'paragraph-ended-before-complete',
    message: 'Paragraph ended before \\author was complete.',
    shortName: 'Paragraph ended before … was complete',
    title: 'LaTeX error: Paragraph ended before … was complete',
    description:
      'Fix "Paragraph ended before \\x was complete" in LaTeX: a blank line inside an argument such as \\author, \\label or \\cite, or a missing brace.',
    keywords:
      'paragraph ended before was complete, latex paragraph ended before, paragraph ended before \\author was complete, paragraph ended before \\label was complete, paragraph ended before \\@citex was complete, paragraph ended before \\addcontentsline was complete',
    severity: 'error',
    group: 'commands',
    summary: 'A blank line ended a command argument that may not contain paragraphs.',
    quickAnswer:
      'Some LaTeX commands refuse a paragraph break inside their argument. When TeX meets a blank line (or «\\par») while reading the argument of the command named in the message, it stops with this error. Either there really is a blank line inside the argument, for example between two authors in «\\author{...}», or the closing «}» is missing so the argument ran into the next paragraph. Remove the blank line (use «\\and» or «\\\\» to separate lines) or add the brace.',
    log: r`Runaway argument?
{Ada Lovelace 
! Paragraph ended before \author  was complete.
<to be read again> 
                   \par 
l.5 `,
    causes: [
      'A blank line used to separate authors or affiliations in «\\author{...}» or «\\title{...}».',
      'A blank line or missing «}» in «\\label», «\\ref» or «\\cite» (reported as «\\label», «\\@citex@checkblank» or similar).',
      'A two-paragraph «\\caption», reported as «Paragraph ended before \\addcontentsline was complete» because the caption text is also written to the list of figures.',
      'A macro you defined with «\\newcommand*», whose arguments may not contain paragraphs.',
    ],
    fix: [
      'Read the command name in the message and the text after «Runaway argument?», which is the start of the argument. Remove the blank line inside it. Separate several authors with «\\and», and break lines inside a title or author block with «\\\\».',
      'Recent LaTeX releases let «\\textbf», «\\section» and most formatting commands contain paragraphs, so a missing brace there is reported later as «File ended while scanning use of ...» instead.',
    ],
    broken: r`\documentclass{article}

\title{A Study of Braces}
\author{Ada Lovelace

Charles Babbage}

\begin{document}
\maketitle
\end{document}`,
    fixed: r`\documentclass{article}

\title{A Study of Braces}
\author{Ada Lovelace \and Charles Babbage}

\begin{document}
\maketitle
\end{document}`,
    expect: r`Paragraph ended before \author`,
    related: ['runaway-argument', 'missing-brace-inserted', 'no-line-here-to-end'],
    faq: [
      {
        question: 'How do I put several authors in \\author without a blank line?',
        answer:
          'Separate them with «\\and», which sets them side by side, or with «\\\\» for a new line. Affiliations can go on the next line after «\\\\» or in «\\thanks{...}».',
      },
      {
        question: 'Why does a caption give Paragraph ended before \\addcontentsline was complete?',
        answer:
          'The caption contains a blank line. Captions are copied to the list of figures, which cannot take a paragraph break. Remove the blank line, or use «\\caption[Short entry]{Long caption}» and keep the long text to a single paragraph.',
      },
      {
        question: 'Is this error the same as Runaway argument?',
        answer:
          'They come together. «Runaway argument?» shows the argument TeX was reading; «Paragraph ended before ... was complete» is the error that stopped it.',
      },
    ],
  },
  {
    slug: 'command-already-defined',
    message: 'LaTeX Error: Command \\R already defined.',
    shortName: 'Command \\x already defined',
    title: 'LaTeX error: Command already defined',
    description:
      'Fix "LaTeX Error: Command \\x already defined" in LaTeX: \\newcommand clashes with an existing macro. Rename it or use \\renewcommand.',
    keywords:
      'command already defined, latex command already defined, newcommand already defined, latex error command already defined, renewcommand, providecommand, or name \\end... illegal',
    severity: 'error',
    group: 'commands',
    summary: '«\\newcommand» used a name that a package or LaTeX already defines.',
    quickAnswer:
      '«\\newcommand» refuses to overwrite a command that already exists, so you do not silently break LaTeX or a package. Pick a different name, or use «\\renewcommand» if you really want to replace the existing command. «\\providecommand» defines the command only if it does not exist yet, which is handy in shared preambles.',
    log: r`! LaTeX Error: Command \R already defined.
               Or name \end... illegal, see p.192 of the manual.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...                                              
                                                  
l.4 \newcommand{\R}{\mathbb{R}}`,
    causes: [
      'A name that a package already uses, for example «\\R», «\\C» or «\\G» from some packages, or «\\vec», «\\comment» and «\\proof».',
      'The same «\\newcommand» twice, often because two included files or a template and your preamble both define it.',
      'A name starting with «\\end», which «\\newcommand» rejects («Or name \\end... illegal»).',
    ],
    fix: [
      'Rename your macro to something unused (for example «\\Real» or «\\reals»), or, when you deliberately want your own version, use «\\renewcommand». Check what the old command did before replacing it: overwriting something like «\\vec» or «\\c» can break other parts of the document.',
    ],
    broken: r`\documentclass{article}
\usepackage{amssymb}
\newcommand{\R}{\mathbb{R}}
\newcommand{\R}{\mathbb{R}}

\begin{document}

Let $x \in \R$.

\end{document}`,
    fixed: r`\documentclass{article}
\usepackage{amssymb}
\providecommand{\R}{}
\renewcommand{\R}{\mathbb{R}}

\begin{document}

Let $x \in \R$.

\end{document}`,
    expect: 'already defined',
    related: ['undefined-control-sequence', 'illegal-parameter-number', 'option-clash'],
    faq: [
      {
        question: 'What is the difference between \\newcommand and \\renewcommand?',
        answer:
          '«\\newcommand» only defines commands that do not exist and errors otherwise. «\\renewcommand» only redefines commands that do exist and errors if the name is unknown. «\\providecommand» defines it only when it is missing.',
      },
      {
        question: 'How do I check whether a command is already defined?',
        answer:
          'Put «\\show\\R» (with your command name) in the preamble and compile. The log shows «undefined» if the name is free, or its current definition otherwise.',
      },
      {
        question: 'Why does a template give Command already defined?',
        answer:
          'The template and a package you added define the same name, or the class already provides it. Remove your duplicate definition or switch it to «\\renewcommand».',
      },
    ],
  },
  {
    slug: 'illegal-parameter-number',
    message: 'Illegal parameter number in definition of \\greet.',
    shortName: 'Illegal parameter number in definition',
    title: 'LaTeX error: Illegal parameter number in definition',
    description:
      'Fix "Illegal parameter number in definition" in LaTeX: #2 used in a macro that takes fewer arguments, or a # inside a nested definition.',
    keywords:
      'illegal parameter number in definition, latex illegal parameter number, newcommand #1 error, latex hash in macro, ## in newcommand',
    severity: 'error',
    group: 'commands',
    summary: 'A macro body uses «#2» (or «#») for an argument that the definition does not declare.',
    quickAnswer:
      'Inside a definition, «#1», «#2» and so on refer to the macro\'s arguments. If you use «#2» in a «\\newcommand» declared with only one argument (or none), TeX cannot substitute it and stops. Declare the right number of arguments in square brackets, «\\newcommand{\\greet}[2]{...}», or, for a literal hash or a nested definition, write «##».',
    log: r`! Illegal parameter number in definition of \greet.
<to be read again> 
                   2
l.3 \newcommand{\greet}[1]{Hello #1 and #2!}
                                            `,
    causes: [
      'The argument count in square brackets is too small: «[1]» with «#2» in the body, or no «[n]» at all.',
      'A definition nested inside another one, where the inner macro\'s parameters must be written «##1».',
      'A literal «#» in the body, for example a colour like «#ff0000» or a URL fragment, which must be «\\#».',
    ],
    fix: [
      'Count the highest «#n» in the body and put that number in brackets after the command name. If the «#» belongs to an inner definition, double it; if it is meant to be printed, write «\\#».',
    ],
    broken: r`\documentclass{article}

\newcommand{\greet}[1]{Hello #1 and #2!}

\begin{document}

\greet{Ada}{Alan}

\end{document}`,
    fixed: r`\documentclass{article}

\newcommand{\greet}[2]{Hello #1 and #2!}

\begin{document}

\greet{Ada}{Alan}

\end{document}`,
    expect: 'Illegal parameter number in definition',
    related: ['command-already-defined', 'undefined-control-sequence', 'misplaced-alignment-tab'],
    faq: [
      {
        question: 'How many arguments can a LaTeX command have?',
        answer:
          'Up to nine, «#1» to «#9». Declare the count with «\\newcommand{\\name}[n]{...}». If you need more, group them with a key-value interface or split the macro.',
      },
      {
        question: 'When do I need ## instead of #?',
        answer:
          'When a definition contains another definition, such as a «\\newcommand» inside «\\newenvironment», the inner macro\'s arguments are written «##1». The single «#1» refers to the outer macro.',
      },
      {
        question: 'How do I print a # symbol inside a macro?',
        answer: 'Write «\\#». A bare «#» is always read as a parameter marker, inside or outside a definition.',
      },
    ],
  },
  {
    slug: 'environment-undefined',
    message: 'LaTeX Error: Environment align undefined.',
    shortName: 'Environment undefined',
    title: 'LaTeX error: Environment align undefined',
    description:
      'What "LaTeX Error: Environment ... undefined" means, why align, figure* or tikzpicture trigger it, and the one-line \\usepackage fix.',
    keywords:
      'latex environment undefined, environment align undefined, latex error environment undefined, environment tikzpicture undefined, environment equation* undefined, environment lstlisting undefined',
    severity: 'error',
    group: 'environments',
    summary: 'A «\\begin{...}» name LaTeX does not know: usually a missing package or a typo.',
    quickAnswer: r`LaTeX found «\begin{align}» (or another name) but no package has defined an environment with that name. Either the package that provides it is not loaded (amsmath for «align», tikz for «tikzpicture», listings for «lstlisting») or the name is misspelled. Add the right «\usepackage» to the preamble or correct the spelling, and the error goes away.`,
    log: r`! LaTeX Error: Environment align undefined.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.3 \begin{align}`,
    causes: [
      r`The package that defines the environment is not loaded: «align», «gather», «multline» and «align*» need «amsmath»; «tikzpicture» needs «tikz»; «lstlisting» needs «listings»; «subfigure» needs «subcaption».`,
      r`A typo in the name, such as «\begin{itemise}», «\begin{equation*}» without amsmath, or «\begin{figur}».`,
      r`The environment is defined by a document class you are not using, for example «frame» outside Beamer or «abstract» in a class that has none.`,
      r`A custom environment is used before its «\newenvironment» definition, or the definition sits in a file that is not «\input».`,
    ],
    fix: [
      r`Read the name in the message, then find out where it comes from. The usual suspects are amsmath (align, gather, multline, the starred math environments, pmatrix and bmatrix), tikz, listings, subcaption, algorithm and algorithmic.`,
      r`Load that package in the preamble, before «\begin{document}». If the name is your own, make sure «\newenvironment» comes before the first use.`,
    ],
    broken: r`\documentclass{article}
\begin{document}
\begin{align}
  a &= b + c
\end{align}
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage{amsmath}
\begin{document}
\begin{align}
  a &= b + c
\end{align}
\end{document}`,
    expect: 'Environment align undefined',
    related: ['undefined-control-sequence', 'file-not-found', 'begin-ended-by-end'],
    faq: [
      {
        question: 'Which package do I need for the align environment?',
        answer: r`amsmath. Add «\usepackage{amsmath}» to the preamble. It also provides «align*», «gather», «multline», «split», «cases» and the matrix environments.`,
      },
      {
        question: 'Why is equation* undefined when equation works?',
        answer: r`Plain LaTeX defines «equation» but not the starred version. «equation*» comes from amsmath, so loading amsmath fixes it. Without amsmath you can use «\[ ... \]» for an unnumbered display.`,
      },
      {
        question: 'How do I fix "Environment tikzpicture undefined"?',
        answer: r`Load TikZ with «\usepackage{tikz}». If you already do, check that the line is not commented out and that it comes before «\begin{document}».`,
      },
      {
        question: 'Can an undefined environment be a spelling mistake?',
        answer: r`Yes. LaTeX matches names exactly and is case-sensitive, so «\begin{Itemize}» or «\begin{enumarate}» give the same error. Compare the name in the message with the documentation.`,
      },
    ],
  },
  {
    slug: 'begin-ended-by-end',
    message: r`LaTeX Error: \begin{itemize} on input line 4 ended by \end{enumerate}.`,
    shortName: r`\begin{x} ended by \end{y}`,
    title: r`LaTeX error: \begin{itemize} ended by \end{enumerate}`,
    description:
      'Fix "LaTeX Error: \\begin{x} on input line n ended by \\end{y}": find the environment that was never closed or the \\end with the wrong name.',
    keywords:
      'latex begin ended by end, latex error begin ended by end, begin document ended by end, begin itemize ended by end document, latex mismatched begin end, latex unclosed environment',
    severity: 'error',
    group: 'environments',
    summary: 'An «\\end» does not match the most recent open «\\begin»: a typo or an environment left open.',
    quickAnswer: r`Every «\begin{x}» must be closed by «\end{x}», and environments must close in the reverse order they were opened. LaTeX reached an «\end{enumerate}» while the innermost open environment was still «itemize», opened on input line 4. Change the «\end» to the matching name, or add the missing «\end» for the inner environment before closing the outer one.`,
    log: r`! LaTeX Error: \begin{itemize} on input line 4 ended by \end{enumerate}.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.7 \end{enumerate}`,
    causes: [
      r`A copy-paste or rename left the «\begin» and «\end» with different names, for example «\begin{itemize}» closed by «\end{enumerate}».`,
      r`An inner environment was never closed, so the outer «\end» arrives first: «\begin{figure}» with a forgotten «\end{center}» inside it, or a nested list without its own «\end».`,
      r`«\begin{document} ended by \end{...}» or «... ended by \end{document}» means something was left open until the very end of the file.`,
      r`A «\begin» or «\end» was commented out with «%», or a verbatim or listing environment swallowed the closing line.`,
    ],
    fix: [
      r`The message names both ends: the «\begin» with its input line number and the «\end» on the «l.» line. Go to the input line given, follow the environment down and check every nested «\begin» has its own «\end» in reverse order.`,
      r`A consistent indentation makes this obvious: each «\end» should line up with its «\begin».`,
    ],
    broken: r`\documentclass{article}
\begin{document}
Steps:
\begin{itemize}
  \item Install a TeX distribution
  \item Compile the document
\end{enumerate}
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
Steps:
\begin{itemize}
  \item Install a TeX distribution
  \item Compile the document
\end{itemize}
\end{document}`,
    expect: r`ended by \end{enumerate}`,
    related: ['environment-undefined', 'missing-item', 'too-many-braces'],
    faq: [
      {
        question: r`What does "\begin{document} ended by \end{itemize}" mean?`,
        answer: r`There is an «\end{itemize}» with no matching «\begin{itemize}» in front of it, so the only open environment is the document itself. Delete the stray «\end» or add the missing «\begin».`,
      },
      {
        question: r`What does "\begin{itemize} ended by \end{document}" mean?`,
        answer: r`A list was opened and never closed, and LaTeX reached the end of the document with it still open. Add «\end{itemize}» where the list should finish.`,
      },
      {
        question: 'Is the line number in the message where the mistake is?',
        answer: r`The number after "on input line" is where the unclosed environment began. The «l.» line at the bottom of the log is where the mismatched «\end» was found. The mistake is somewhere between the two.`,
      },
    ],
  },
  {
    slug: 'missing-begin-document',
    message: r`LaTeX Error: Missing \begin{document}.`,
    shortName: r`Missing \begin{document}`,
    title: r`LaTeX error: Missing \begin{document}`,
    description:
      'Why LaTeX says "Missing \\begin{document}" when the line is there: text or a stray character in the preamble, a BOM, or a broken .sty or .bib file.',
    keywords:
      'missing begin document, latex missing begin document, latex error missing begin document, missing \\begin{document} latex, preamble text error latex',
    severity: 'error',
    group: 'environments',
    summary: 'Something printable sits in the preamble, before «\\begin{document}».',
    quickAnswer: r`The preamble, everything between «\documentclass» and «\begin{document}», may only contain definitions and settings. As soon as LaTeX meets something it would typeset (a word, a stray character after a command, or an invisible character) it complains that the document has not started yet. Find the printable text on or just before the «l.» line in the log and move it below «\begin{document}» or delete it.`,
    log: r`! LaTeX Error: Missing \begin{document}.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.3 D
     raft version`,
    causes: [
      r`Text written in the preamble, such as a title or a note, instead of after «\begin{document}».`,
      r`A stray character after a preamble command, for example «\usepackage{amsmath}.» or a leftover «]» from a «\usepackage[...]{...}» line.`,
      r`An invisible character such as a byte order mark (BOM) or non-breaking space at the start of the file, typical after copying from Word or a web page.`,
      r`A broken file read in the preamble, for example a «.bib» file passed to «\input», or a «.tex» file with a «\begin{document}» of its own included from the preamble.`,
    ],
    fix: [
      r`Look at the «l.» line in the log: LaTeX shows the text it was about to print. Move it below «\begin{document}», or delete the stray character.`,
      r`If the line shown looks empty, the culprit is an invisible character. Retype the line, or save the file as UTF-8 without BOM.`,
    ],
    broken: r`\documentclass{article}
\usepackage{amsmath}
Draft version
\begin{document}
Hello.
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage{amsmath}
\begin{document}
Draft version

Hello.
\end{document}`,
    expect: r`Missing \begin{document}`,
    related: ['begin-ended-by-end', 'inputenc-unicode-character', 'command-already-defined'],
    faq: [
      {
        question: r`Why do I get "Missing \begin{document}" when my file has \begin{document}?`,
        answer: r`Because something printable appears before it. LaTeX does not search for «\begin{document}»; it stops at the first character it would typeset. The «l.» line in the log shows that character.`,
      },
      {
        question: 'Can a package cause "Missing \\begin{document}"?',
        answer: r`Rarely, but yes: a corrupt or wrongly named file loaded in the preamble, such as a «.bib» loaded with «\input» or a «.sty» saved as HTML, prints text and triggers the error. The log shows which file was open.`,
      },
      {
        question: 'How do I find an invisible character in the preamble?',
        answer: r`Open the file in an editor that shows invisible characters, or delete and retype the first lines. A byte order mark at the very start is the most common one; saving as "UTF-8 without BOM" removes it.`,
      },
    ],
  },
  {
    slug: 'missing-item',
    message: r`LaTeX Error: Something's wrong--perhaps a missing \item.`,
    shortName: r`Perhaps a missing \item`,
    title: r`LaTeX error: Something's wrong--perhaps a missing \item`,
    description:
      'Fix "Something\'s wrong--perhaps a missing \\item": text in a list before the first \\item, an empty thebibliography, or \\\\ at the start of a line.',
    keywords:
      "something's wrong perhaps a missing item, perhaps a missing item latex, latex missing item error, thebibliography missing item, latex itemize error, latex enumerate error",
    severity: 'error',
    group: 'environments',
    summary: 'Text inside a list before the first «\\item», or an empty bibliography or list.',
    quickAnswer: r`Inside itemize, enumerate, description and thebibliography, everything must belong to an «\item» (or «\bibitem»). LaTeX raises this error when it finds text before the first item, or when it is asked to end a line or a list that has no items at all. Put an «\item» in front of the first text, or remove the empty list.`,
    log: r`! LaTeX Error: Something's wrong--perhaps a missing \item.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.5   \item S
             econd point`,
    causes: [
      r`Text placed right after «\begin{itemize}» or «\begin{enumerate}» without an «\item» in front of it.`,
      r`An empty «thebibliography» environment, which BibTeX writes when no «\cite» matched a «.bib» entry. The error then points at the «.bbl» file.`,
      r`A «\\» or «\newline» used where no line has started, for example right at the beginning of a list item or of a table cell in a «p» column.`,
      r`Other environments built on lists, such as «quote» or «center», used with a line break before any text.`,
    ],
    fix: [
      r`Put «\item» before the first piece of text in the list. If the text is meant as a heading for the list, move it above «\begin{itemize}».`,
      r`For a bibliography error, cite at least one entry and check that BibTeX or Biber ran without errors; deleting the stale «.bbl» and recompiling also helps.`,
    ],
    broken: r`\documentclass{article}
\begin{document}
\begin{itemize}
  First point
  \item Second point
\end{itemize}
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
\begin{itemize}
  \item First point
  \item Second point
\end{itemize}
\end{document}`,
    expect: 'perhaps a missing \\item',
    related: ['lonely-item', 'begin-ended-by-end', 'no-line-here-to-end'],
    faq: [
      {
        question: 'Why does my bibliography give "perhaps a missing \\item"?',
        answer: r`The «.bbl» file contains an empty «thebibliography» environment, usually because nothing was cited or BibTeX found no matching keys. Add a «\cite», check the keys and the «.bib» path, delete the «.bbl» and compile again.`,
      },
      {
        question: 'Can \\\\ cause "perhaps a missing \\item"?',
        answer: r`Yes. Inside a list, a «\\» before any text has started tries to end a line in a list that has no item yet. Remove the «\\» or use «\vspace» for space.`,
      },
      {
        question: 'Is this the same as "Lonely \\item"?',
        answer: r`No, it is the opposite case. "Perhaps a missing \item" is a list without an item where text needs one; "Lonely \item" is an «\item» used outside any list.`,
      },
    ],
  },
  {
    slug: 'lonely-item',
    message: r`LaTeX Error: Lonely \item--perhaps a missing list environment.`,
    shortName: r`Lonely \item`,
    title: r`LaTeX error: Lonely \item (missing list environment)`,
    description:
      'What "Lonely \\item--perhaps a missing list environment" means and how to fix it: wrap the \\item lines in itemize, enumerate or description.',
    keywords:
      'lonely item latex, lonely item perhaps a missing list environment, latex lonely item error, latex item outside list, latex itemize missing',
    severity: 'error',
    group: 'environments',
    summary: 'An «\\item» outside itemize, enumerate or description.',
    quickAnswer: r`«\item» only works inside a list environment. LaTeX found one with no open «itemize», «enumerate» or «description» around it, usually because the «\begin{itemize}» line is missing, misspelled or commented out, or the list was closed too early. Wrap the items in a list environment.`,
    log: r`! LaTeX Error: Lonely \item--perhaps a missing list environment.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.4 \item M
           ilk`,
    causes: [
      r`The «\begin{itemize}» or «\begin{enumerate}» line is missing, or was commented out with «%».`,
      r`The list was closed with «\end{itemize}» before the last «\item».`,
      r`Items copied from one document into another without the surrounding list environment.`,
    ],
    fix: [
      r`Put «\begin{itemize}» before the first «\item» and «\end{itemize}» after the last. Use «enumerate» for a numbered list and «description» for labelled items.`,
    ],
    broken: r`\documentclass{article}
\begin{document}
Shopping list:
\item Milk
\item Bread
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
Shopping list:
\begin{itemize}
  \item Milk
  \item Bread
\end{itemize}
\end{document}`,
    expect: r`Lonely \item`,
    related: ['missing-item', 'environment-undefined', 'begin-ended-by-end'],
    faq: [
      {
        question: 'How do I make a list without bullets so \\item still works?',
        answer: r`Keep the list environment and remove the label: «\begin{itemize}» with «\item[]», or with the enumitem package «\begin{itemize}[label={}]». An «\item» on its own outside a list is never allowed.`,
      },
      {
        question: 'Can \\item be used in a table?',
        answer: r`Only inside a list that is itself inside a «p{...}» column, for example «\begin{itemize} \item ... \end{itemize}» in the cell. In an «l», «c» or «r» column a list cannot be used at all.`,
      },
      {
        question: 'Why does Beamer report "Lonely \\item"?',
        answer: r`For the same reason as any other class: the «\item» lines on the frame are not inside «itemize» or «enumerate». Check that the list's «\begin» is inside the same frame as its items.`,
      },
    ],
  },
  {
    slug: 'misplaced-alignment-tab',
    message: 'Misplaced alignment tab character &.',
    shortName: 'Misplaced alignment tab character &',
    title: 'LaTeX error: Misplaced alignment tab character &',
    description:
      'Fix "Misplaced alignment tab character &": escape a literal ampersand as \\&, or put the & inside a table, align or matrix where it belongs.',
    keywords:
      'misplaced alignment tab character, misplaced alignment tab character &, latex ampersand error, latex & in text, latex escape ampersand, misplaced alignment tab character bibtex',
    severity: 'error',
    group: 'environments',
    summary: 'A literal «&» in normal text; write «\\&».',
    quickAnswer: r`In LaTeX «&» is not a character but the column separator for tables and aligned equations. Outside tabular, align, matrix and similar environments it has nowhere to go, so LaTeX reports a misplaced alignment tab. To print an ampersand write «\&». If the «&» was meant as a column separator, the surrounding environment is missing or was closed too early.`,
    log: r`! Misplaced alignment tab character &.
l.3 Published by Smith &
                         Sons in 2024.`,
    causes: [
      r`A literal ampersand in text, a title, a caption, a URL or an author list: «Smith & Sons», «R&D».`,
      r`An ampersand in a «.bib» field such as «publisher = {Wiley & Sons}» or «journal = {IEEE Trans. Pattern Anal. & Mach. Intell.}».`,
      r`Equation code with «&» written outside «align», for example in «equation» or «$...$», or after an «align» was closed.`,
    ],
    fix: [
      r`Escape it: «\&» prints an ampersand everywhere, including in titles, captions and BibTeX fields. In a URL inside «\url{...}» or «\href{...}» the raw «&» is allowed.`,
      r`If the «&» is an alignment point, use an environment that supports it: «align» instead of «equation», or put the row back inside its «tabular».`,
    ],
    broken: r`\documentclass{article}
\begin{document}
Published by Smith & Sons in 2024.
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
Published by Smith \& Sons in 2024.
\end{document}`,
    expect: 'Misplaced alignment tab character &',
    related: ['extra-alignment-tab', 'missing-dollar-inserted', 'hrule-here-except-with-leaders'],
    faq: [
      {
        question: 'How do I type an ampersand in LaTeX?',
        answer: r`Write «\&». The same applies to the other special characters: «\%», «\$», «\#», «\_», «\{» and «\}».`,
      },
      {
        question: 'Why does my bibliography give "Misplaced alignment tab character &"?',
        answer: r`A field in the «.bib» file, often the publisher or journal name, contains a bare «&». BibTeX copies it into the «.bbl» file unchanged. Change it to «\&» in the «.bib» file and recompile.`,
      },
      {
        question: 'Why do I get this error inside an equation?',
        answer: r`The «equation» environment and «$...$» do not support alignment. Use «align» (or «aligned» inside «equation») from amsmath when you need «&» to line up parts of an equation.`,
      },
    ],
  },
  {
    slug: 'extra-alignment-tab',
    message: r`Extra alignment tab has been changed to \cr.`,
    shortName: 'Extra alignment tab',
    title: r`LaTeX error: Extra alignment tab has been changed to \cr`,
    description:
      'Fix "Extra alignment tab has been changed to \\cr": a table row has more & cells than the column spec, or a row is missing its \\\\.',
    keywords:
      'extra alignment tab has been changed to cr, extra alignment tab latex, latex tabular too many columns, latex table extra column error, extra alignment tab align',
    severity: 'error',
    group: 'environments',
    summary: 'A table row has more «&» separators than the column specification allows.',
    quickAnswer: r`The column specification of a tabular, such as «{ll}», fixes the number of columns. A row with n columns may contain at most n−1 «&». LaTeX found one «&» too many, so it ended the row there («\cr») and pushed the rest into a new row. Add the missing column to the specification («{lll}»), or remove the extra «&» or add the forgotten «\\» at the end of the previous row.`,
    log: r`! Extra alignment tab has been changed to \cr.
<recently read> \endtemplate 
                             
l.4   Name & Age &
                   City \\`,
    causes: [
      r`The column specification has fewer columns than the rows, typically after adding a column to the data and not to «\begin{tabular}{...}».`,
      r`A missing «\\» at the end of a row, so two rows run together into one with too many cells.`,
      r`A literal «&» in cell text that should have been «\&».`,
      r`In amsmath environments: more than two columns per pair in «cases», or too many «&» for the number of columns of a «matrix» (default 10) or «alignat».`,
    ],
    fix: [
      r`Count the «&» on the row named on the «l.» line and compare with the number of column letters in the specification. Add a column letter, or remove the extra separator.`,
      r`If the counts match, look at the row above for a missing «\\», and at the cell text for an unescaped «&».`,
    ],
    broken: r`\documentclass{article}
\begin{document}
\begin{tabular}{ll}
  Name & Age & City \\
  Ada  & 36  & London \\
\end{tabular}
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
\begin{tabular}{lll}
  Name & Age & City \\
  Ada  & 36  & London \\
\end{tabular}
\end{document}`,
    expect: r`Extra alignment tab has been changed to \cr`,
    related: ['misplaced-alignment-tab', 'hrule-here-except-with-leaders', 'overfull-hbox'],
    faq: [
      {
        question: 'How many & can a table row have?',
        answer: r`One fewer than the number of columns. A «{lcr}» table has three columns, so each row has at most two «&». Fewer is fine: missing cells are left empty.`,
      },
      {
        question: 'Why does a matrix with many columns give this error?',
        answer: r`amsmath matrices allow 10 columns by default. For more, set «\setcounter{MaxMatrixCols}{20}» in the preamble.`,
      },
      {
        question: 'Does \\multicolumn count as one column?',
        answer: r`No. «\multicolumn{3}{c}{...}» takes the place of three columns, so the row needs two fewer «&» than a normal row. Miscounting spans is a common cause of this error.`,
      },
    ],
  },
  {
    slug: 'no-line-here-to-end',
    message: "LaTeX Error: There's no line here to end.",
    shortName: "There's no line here to end",
    title: "LaTeX error: There's no line here to end",
    description:
      'Fix "There\'s no line here to end": \\\\ used after a blank line, at the start of a paragraph or after a list. Use \\vspace or a blank line instead.',
    keywords:
      "there's no line here to end, latex no line here to end, latex \\\\ error, latex newline error, latex double backslash blank line, no line here to end itemize",
    severity: 'error',
    group: 'environments',
    summary: 'A «\\\\» or «\\newline» where no line of text has started.',
    quickAnswer: r`«\\» ends the current line of a paragraph. If no paragraph is running (right after a blank line, after a list or display, or at the start of the document) there is no line to end, and LaTeX stops. Do not use «\\» to make vertical space: separate paragraphs with a blank line and add space with «\vspace{1em}», «\medskip» or «\bigskip».`,
    log: r`! LaTeX Error: There's no line here to end.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.6 S
     econd paragraph after some extra space.`,
    causes: [
      r`«\\» on its own line after a blank line, used to add extra space between paragraphs.`,
      r`«\\» right after «\end{itemize}», «\end{figure}», «\maketitle» or a display equation, where the paragraph has already ended.`,
      r`«\\» directly after «\begin{center}», «\begin{flushleft}» or at the start of a «\parbox» or minipage before any text.`,
    ],
    fix: [
      r`Delete the «\\» and use a blank line to start a new paragraph. For extra space write «\vspace{\baselineskip}», «\medskip» or «\bigskip» on a line of its own.`,
      r`If you want the whole document to have space between paragraphs, use the parskip package instead of manual breaks.`,
    ],
    broken: r`\documentclass{article}
\begin{document}
First paragraph.

\\
Second paragraph after some extra space.
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
First paragraph.

\bigskip
Second paragraph after some extra space.
\end{document}`,
    expect: "There's no line here to end",
    related: ['missing-item', 'overfull-hbox', 'not-in-outer-par-mode'],
    faq: [
      {
        question: 'How do I add a blank line between paragraphs in LaTeX?',
        answer: r`Leave a blank line in the source to start a new paragraph, then add space with «\medskip», «\bigskip» or «\vspace{1em}». For space between all paragraphs, load «\usepackage{parskip}».`,
      },
      {
        question: 'Why is the error reported on the next line, not on the \\\\?',
        answer: r`«\\» looks ahead to check for a «*» or an optional «[...]» argument before acting, so the «l.» line in the log shows the first character after it.`,
      },
      {
        question: 'Can I use \\\\ after \\end{itemize}?',
        answer: r`No. After a list LaTeX is between paragraphs, so there is no line to end. Use a blank line or «\vspace» there instead.`,
      },
    ],
  },
  {
    slug: 'not-in-outer-par-mode',
    message: 'LaTeX Error: Not in outer par mode.',
    shortName: 'Not in outer par mode',
    title: 'LaTeX error: Not in outer par mode',
    description:
      'Fix "Not in outer par mode": a figure, table or \\marginpar placed inside a minipage, \\parbox, box, table cell or another float. Use \\captionof instead.',
    keywords:
      'not in outer par mode, latex not in outer par mode, figure inside minipage error, latex float inside parbox, marginpar not in outer par mode, table inside figure latex error',
    severity: 'error',
    group: 'environments',
    summary: 'A figure, table or «\\marginpar» inside a box, minipage or table cell.',
    quickAnswer: r`Floats (figure and table) and margin notes can only be placed in the main text flow, which LaTeX calls outer paragraph mode. Inside a minipage, «\parbox», «\fbox», a table cell, a footnote or another float they cannot float, so LaTeX refuses. Put the figure on the outside and the minipages inside it, or drop the float and use «\captionof» from the caption package for the caption.`,
    log: r`! LaTeX Error: Not in outer par mode.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.5     \centering`,
    causes: [
      r`«\begin{figure}» or «\begin{table}» inside a «minipage», often while trying to put two figures side by side.`,
      r`A float inside a «\parbox», «\fbox», «\colorbox», a tcolorbox, a table cell or a footnote.`,
      r`A float nested in another float, such as a table inside a figure.`,
      r`«\marginpar» or «\todo» (todonotes) used inside a box, a float or a footnote.`,
    ],
    fix: [
      r`Reverse the nesting: one «figure» on the outside, minipages (or subfigures) inside it, with a «\caption» in each minipage.`,
      r`If the content must stay in a box, drop the float environment and caption it with «\captionof{figure}{...}» from the caption package. For todonotes inside boxes use «\todo[inline]{...}».`,
    ],
    broken: r`\documentclass{article}
\begin{document}
\begin{minipage}{0.45\textwidth}
  \begin{figure}
    \centering
    \rule{3cm}{2cm}
    \caption{Left plot}
  \end{figure}
\end{minipage}
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
\begin{figure}
  \centering
  \begin{minipage}{0.45\textwidth}
    \centering
    \rule{3cm}{2cm}
    \caption{Left plot}
  \end{minipage}
\end{figure}
\end{document}`,
    expect: 'Not in outer par mode',
    related: ['too-many-unprocessed-floats', 'begin-ended-by-end', 'no-line-here-to-end'],
    faq: [
      {
        question: 'How do I put two figures side by side without this error?',
        answer: r`Use one «figure» environment containing two minipages of width «0.48\textwidth», each with its own image and «\caption». Or load subcaption and use «subfigure» environments inside the figure.`,
      },
      {
        question: 'How do I add a caption to an image inside a minipage or box?',
        answer: r`Load the caption package and write «\captionof{figure}{Your caption}» after the image. It numbers and lists the caption like a figure without creating a float.`,
      },
      {
        question: 'Why does \\todo give "Not in outer par mode"?',
        answer: r`todonotes puts notes in the margin with «\marginpar», which is not allowed in floats, footnotes, tables or boxes. Use «\todo[inline]{...}» in those places.`,
      },
    ],
  },
  {
    slug: 'hrule-here-except-with-leaders',
    message: "You can't use `\\hrule' here except with leaders.",
    shortName: "You can't use \\hrule here",
    title: "LaTeX error: You can't use \\hrule here except with leaders",
    description:
      'Fix "You can\'t use `\\hrule\' here except with leaders": \\hrule in a table cell, box or math. Use \\hline in tables and \\rule elsewhere.',
    keywords:
      "you can't use hrule here except with leaders, latex hrule error, hrule in tabular, latex horizontal line in table, hrule leaders latex, latex rule in mbox",
    severity: 'error',
    group: 'environments',
    summary: 'A TeX «\\hrule» inside a table cell, box or math; use «\\hline» or «\\rule».',
    quickAnswer: r`«\hrule» is a primitive that draws a rule across a vertical list, between lines. Inside a horizontal context, such as a cell of an «l», «c» or «r» table column, an «\mbox», a «\makebox» or math, it is not allowed. In tables use «\hline» (or «\midrule» from booktabs) at the start of a row, and in running text use «\rule{\linewidth}{0.4pt}» on its own line.`,
    log: r`! You can't use ` + '`' + r`\hrule' here except with leaders.
<recently read> \hrule 
                       
l.5   \hrule`,
    causes: [
      r`«\hrule» used in a tabular to separate rows; in the table it lands inside the first cell of the next row.`,
      r`«\hrule» inside «\mbox», «\makebox», «\fbox» or a header defined with fancyhdr, which are horizontal boxes.`,
      r`«\hrule» in math mode, for example inside an equation to draw a line.`,
    ],
    fix: [
      r`In a table, replace «\hrule» with «\hline», or with «\toprule», «\midrule» and «\bottomrule» from booktabs. These must come right after «\\» or at the start of the table.`,
      r`Anywhere else, use «\rule{width}{thickness}», which works in horizontal mode, for example «\noindent\rule{\linewidth}{0.4pt}».`,
    ],
    broken: r`\documentclass{article}
\begin{document}
\begin{tabular}{ll}
  Item  & Price \\
  \hrule
  Apple & 1.20 \\
\end{tabular}
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
\begin{tabular}{ll}
  Item  & Price \\
  \hline
  Apple & 1.20 \\
\end{tabular}
\end{document}`,
    expect: "You can't use `\\hrule' here except with leaders",
    related: ['extra-alignment-tab', 'misplaced-alignment-tab', 'not-in-outer-par-mode'],
    faq: [
      {
        question: 'What is the difference between \\hrule and \\rule?',
        answer: r`«\hrule» is a TeX primitive that only works between paragraphs and always spans the full width of the box it is in. «\rule{w}{h}» is a LaTeX command that makes a box of a given size, so it can be used inside text, cells and boxes.`,
      },
      {
        question: 'How do I draw a horizontal line in a LaTeX table?',
        answer: r`Use «\hline» after the «\\» of a row, or the booktabs rules «\toprule», «\midrule» and «\bottomrule». For a line under some columns only, use «\cline{2-3}» or «\cmidrule{2-3}».`,
      },
      {
        question: 'What does "except with leaders" mean?',
        answer: r`Leaders repeat a box or rule to fill space, as in a dotted table of contents line. TeX allows a rule in that construction only, which is why it mentions leaders. For ordinary documents the fix is «\hline» or «\rule».`,
      },
    ],
  },
  {
    slug: 'double-subscript',
    message: 'Double subscript',
    shortName: 'Double subscript',
    title: 'LaTeX error: Double subscript',
    description:
      'Fix the LaTeX "Double subscript" and "Double superscript" errors: group the indices with braces, as in x_{ij}, x_{i_j} or x^{2^3}.',
    keywords:
      'double subscript latex, latex double subscript error, double superscript latex, latex double superscript, x_i_j latex, nested subscript latex, subscript of subscript latex',
    severity: 'error',
    group: 'math',
    summary: 'Two «_» (or two «^») in a row on the same base; group the inner one with braces.',
    quickAnswer:
      'TeX allows one subscript and one superscript per base. In «$a_i_j$» the second «_» has no base of its own, so TeX stops with "Double subscript" (and «x^2^3» gives "Double superscript"). Decide what you mean and say it with braces: «a_{ij}» for a two-letter index, «a_{i_j}» for a subscript on the subscript, or «{a_i}_j» for a subscript on the whole expression.',
    log: "! Double subscript.\nl.3 The entry $a_i_\n                   j$ of the matrix.\nI treat `x_1_2' essentially like `x_1{}_2'.",
    causes: [
      'A multi-character index typed without braces, such as «a_i_j» for the matrix entry a with indices i and j.',
      'A nested script (a subscript of a subscript) written as «x_n_k» instead of «x_{n_k}».',
      'A macro that already adds a subscript, used with another «_» after it, for example «\\newcommand{\\xi}{x_i}» followed by «\\xi_j».',
      'A prime after a superscript, as in «f^2\'»: the prime is itself a superscript. Write «f\'^2», which LaTeX merges into one superscript, or «{f^2}\'».',
    ],
    fix: [
      'Put everything that belongs in one index inside a single pair of braces. «a_{ij}» typesets both letters as one subscript; «a_{i,j}» adds a comma, which reads better with longer indices.',
      'If you really want a script on a script, nest it: «x_{n_k}» puts k below n. To attach a second subscript to an expression that already has one, brace the expression first: «{a_i}_j».',
    ],
    broken: r`\documentclass{article}
\begin{document}
The entry $a_i_j$ of the matrix.
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
The entry $a_{ij}$ of the matrix, the sequence $x_{n_k}$
and the power $x^{2^3}$.
\end{document}`,
    expect: 'Double subscript',
    variants: [
      {
        message: 'Double superscript',
        log: r`! Double superscript.
l.3 $x^2^
         3$`,
        text: [
          'The same rule applies to superscripts: «x^2^3» has two «^» on one base. Write «x^{2^3}» for a tower of powers or «{x^2}^3» for (x²)³, which most readers would rather see as «(x^2)^3».',
          'A prime counts as a superscript, so «f^2\'» triggers it too. Put the prime first, «f\'^2», which LaTeX combines into a single superscript, or brace the power: «{f^2}\'».',
        ],
      },
    ],
    related: ['missing-dollar-inserted', 'missing-brace-inserted', 'extra-brace-or-forgotten-dollar'],
    faq: [
      {
        question: 'How do I write a subscript with two letters in LaTeX?',
        answer:
          'Put both letters in braces: «a_{ij}». Without braces only the first character after the underscore becomes the subscript, and a second underscore causes the "Double subscript" error.',
      },
      {
        question: 'How do I write a subscript of a subscript?',
        answer:
          'Nest it inside braces: «x_{n_k}» puts k as a subscript of n, which is itself the subscript of x. The inner script is set in an even smaller size automatically.',
      },
      {
        question: 'Why do I get "Double superscript" with a prime?',
        answer:
          'In math mode a prime is a superscript, so «f^2\'» puts two superscripts on f. Write the prime first, «f\'^2», which LaTeX merges into one superscript, or brace the power: «{f^2}\'».',
      },
    ],
  },
  {
    slug: 'bad-math-environment-delimiter',
    message: 'LaTeX Error: Bad math environment delimiter',
    shortName: 'Bad math environment delimiter',
    title: 'LaTeX error: Bad math environment delimiter',
    description:
      'Why LaTeX reports "Bad math environment delimiter": an opening \\[ or \\( where a closing \\] or \\) belongs, or nested math. How to fix it.',
    keywords:
      'bad math environment delimiter, latex bad math environment delimiter, \\[ \\] latex error, display math error latex, \\( \\) latex error, math mode delimiter latex',
    severity: 'error',
    group: 'math',
    summary: 'An opening «\\[» or «\\(» used where a closing one belongs, or math mode opened twice.',
    quickAnswer:
      'LaTeX checks that «\\[» and «\\(» are only used in text mode and «\\]» and «\\)» only in math mode. The error means one of them appeared in the wrong mode: usually a display closed with «\\[» instead of «\\]», a «\\[» inside «$...$» or an equation, or a stray «\\]» with no opening. Make every «\\[» end with «\\]» and every «\\(» with «\\)», and never open one inside another math environment.',
    log: r`! LaTeX Error: Bad math environment delimiter.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.4 \[ E = mc^2 \[`,
    causes: [
      'A display closed with «\\[» instead of «\\]», a typo that is easy to miss because the two look alike.',
      'A «\\[ ... \\]» or «\\( ... \\)» placed inside an «equation», «align» or «$...$», so math mode is opened twice.',
      'A closing «\\]» or «\\)» with no matching opening, often left behind after deleting part of a formula.',
      'Using «\\[» to mean a literal bracket in text, for example after «\\\\» at the end of a line (that is «\\\\[...]» with an optional length, not math).',
    ],
    fix: [
      'Look at the line in the log and match each delimiter to its partner. Display math is «\\[ ... \\]», inline math is «\\( ... \\)» or «$ ... $», and the two kinds must not be mixed or nested.',
      'If the formula is already inside «equation» or «align», delete the extra «\\[ \\]» around it: those environments start math mode themselves.',
    ],
    broken: r`\documentclass{article}
\begin{document}
The equation
\[ E = mc^2 \[
holds.
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
The equation
\[ E = mc^2 \]
holds.
\end{document}`,
    expect: 'Bad math environment delimiter',
    related: ['missing-dollar-inserted', 'split-wont-work-here', 'missing-right-inserted'],
    faq: [
      {
        question: 'What is the difference between \\[ \\] and $$ $$ in LaTeX?',
        answer:
          'Both produce display math, but «\\[ ... \\]» is the LaTeX form: it checks that it is opened and closed correctly and gets the vertical spacing right. «$$ ... $$» is plain TeX, gives no such check and can produce inconsistent spacing, so prefer «\\[ \\]» or the «equation*» environment.',
      },
      {
        question: 'Can I put \\[ \\] inside an equation environment?',
        answer:
          'No. «equation», «align», «gather» and similar environments already switch to math mode, so a «\\[» inside them opens math a second time and causes this error. Remove the inner delimiters.',
      },
      {
        question: 'How do I find which delimiter is wrong?',
        answer:
          'The «l.» line in the log shows where LaTeX noticed the problem, normally the delimiter itself. Check the formulas just above it as well: a missing «\\]» earlier leaves LaTeX in math mode, and the next «\\[» is then the one reported.',
      },
    ],
  },
  {
    slug: 'split-wont-work-here',
    message: "Package amsmath Error: \\begin{split} won't work here",
    shortName: "\\begin{split} won't work here",
    title: "LaTeX error: \\begin{split} won't work here",
    description:
      "Fix amsmath's \\begin{split} won't work here: split must sit inside equation, gather or another math display, never on its own or inside align.",
    keywords:
      "begin split won't work here, split won't work here latex, amsmath split error, latex split environment, split inside equation, split vs align latex",
    severity: 'error',
    group: 'math',
    summary: '«split» used outside a math display; wrap it in «equation» (or use «align»).',
    quickAnswer:
      '«split» is not a display on its own: it only splits one equation into lines inside a math environment such as «equation», «equation*» or «gather». Used directly in text, or inside «align» where each line is already an equation, amsmath stops with this error. Wrap the «split» in «\\begin{equation} ... \\end{equation}», or replace it with «align» if every line should be a separate equation.',
    log: r`! Package amsmath Error: \begin{split} won't work here.

See the amsmath package documentation for explanation.
Type  H <return>  for immediate help.
 ...

l.6 \end{split}`,
    causes: [
      '«\\begin{split}» written directly in the text, as if it were a display environment like «align».',
      '«split» placed inside «align», «multline» or another environment that already handles line breaking.',
      '«split» inside «$...$» inline math, where amsmath does not allow it.',
    ],
    fix: [
      'Put the «split» inside an equation environment. The whole block then gets one equation number, centred vertically, and the «&» in each line aligns the relation signs.',
      'If you want a number on every line, you do not need «split» at all: use «align» directly.',
    ],
    broken: r`\documentclass{article}
\usepackage{amsmath}
\begin{document}
\begin{split}
  (a+b)^2 &= a^2 + 2ab + b^2
\end{split}
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage{amsmath}
\begin{document}
\begin{equation}
\begin{split}
  (a+b)^2 &= (a+b)(a+b) \\
          &= a^2 + 2ab + b^2
\end{split}
\end{equation}
\end{document}`,
    expect: "\\begin{split} won't work here",
    related: ['bad-math-environment-delimiter', 'misplaced-alignment-tab', 'environment-undefined'],
    faq: [
      {
        question: 'What is the difference between split and align?',
        answer:
          '«align» is a display environment in which every line is its own equation and gets its own number. «split» goes inside an equation and turns it into several lines that share a single number.',
      },
      {
        question: 'Can I use split without an equation number?',
        answer:
          'Yes. Put it inside «equation*» (or «\\[ ... \\]») instead of «equation». The split works the same way and no number is printed.',
      },
      {
        question: 'Does split work inside align?',
        answer:
          'No. «align» already splits lines and aligns them, so amsmath refuses a «split» inside it. Use «aligned» if you need a sub-block inside an «align» line.',
      },
    ],
  },
  {
    slug: 'illegal-unit-of-measure',
    message: 'Illegal unit of measure (pt inserted)',
    shortName: 'Illegal unit of measure',
    title: 'LaTeX error: Illegal unit of measure (pt inserted)',
    description:
      'Fix "Illegal unit of measure (pt inserted)" in LaTeX: a length such as \\vspace{2} needs a unit like 2cm, 2em or 12pt. Common causes and fixes.',
    keywords:
      'illegal unit of measure, illegal unit of measure pt inserted, latex illegal unit of measure, latex length units, vspace error latex, includegraphics width error, latex units cm pt em',
    severity: 'error',
    group: 'lengths',
    summary: 'A length was given without a unit (or with an unknown one); write «2cm», «1em», «0.5\\textwidth».',
    quickAnswer:
      'Every length in LaTeX needs a unit. When TeX reads a number where it expects a length, such as «\\vspace{2}» or «width=5» in «\\includegraphics», it finds no unit after it and stops with this error, then assumes «pt». Add a unit: «\\vspace{2cm}», «width=5cm» or a relative length like «0.8\\textwidth». The units TeX knows are pt, pc, in, bp, cm, mm, dd, cc, sp, em and ex.',
    log: r`! Illegal unit of measure (pt inserted).
<to be read again> 
                   \relax 
l.4 \vspace{2}`,
    causes: [
      'A number with no unit in a length argument: «\\vspace{2}», «\\hspace{1}», «\\setlength{\\parindent}{0}».',
      'An unsupported unit such as «px» or «%», or a misspelling like «2 cms».',
      'A «[» at the start of the line after «\\\\»: LaTeX reads «\\\\[...]» as an optional spacing, so «\\\\ [1, 2]» is taken as a length «1,» with a bad unit.',
      'A key such as «width=» or «height=» in «\\includegraphics» or TikZ given a bare number.',
    ],
    fix: [
      'Add the unit to the length. Absolute units (cm, mm, in, pt) are fine for fixed space; relative ones (em, ex, «\\textwidth», «\\linewidth») scale with the font or the page.',
      'Zero is the one value that still needs a unit: write «0pt» (or «\\z@» in package code), not «0».',
    ],
    broken: r`\documentclass{article}
\begin{document}
First paragraph.
\vspace{2}
Second paragraph.
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
First paragraph.
\vspace{2cm}
Second paragraph.
\end{document}`,
    expect: 'Illegal unit of measure',
    related: ['missing-number-treated-as-zero', 'dimension-too-large', 'no-line-here-to-end'],
    faq: [
      {
        question: 'What units can I use for lengths in LaTeX?',
        answer:
          'pt (point), pc (pica), in, bp (big point), cm, mm, dd, cc and sp are absolute; em and ex depend on the current font. You can also scale an existing length, as in «0.5\\textwidth» or «2\\baselineskip».',
      },
      {
        question: 'Why does LaTeX say "pt inserted"?',
        answer:
          'After reporting the error TeX recovers by pretending you wrote pt after the number. If you press on, the document compiles with a length in points, which is rarely what you meant, so fix the unit rather than ignore it.',
      },
      {
        question: 'Can I use pixels or percent in LaTeX?',
        answer:
          'No. TeX has no px or % unit. For a fraction of the page use «0.5\\textwidth» or «0.5\\linewidth»; for an image size in pixels pick a physical width instead, such as «width=6cm».',
      },
      {
        question: 'Why do I get this error after \\\\ in a table or address?',
        answer:
          'A line break «\\\\» takes an optional length in square brackets. If the next line starts with «[», LaTeX reads it as that length and fails on the content. Write «\\\\ {}[1, 2]» or «\\\\ \\relax [1, 2]».',
      },
    ],
  },
  {
    slug: 'missing-number-treated-as-zero',
    message: 'Missing number, treated as zero',
    shortName: 'Missing number, treated as zero',
    title: 'LaTeX error: Missing number, treated as zero',
    description:
      'Fix "Missing number, treated as zero" in LaTeX: a number or length was expected, often after \\\\ followed by [ or an empty length argument.',
    keywords:
      'missing number treated as zero, latex missing number treated as zero, missing number latex, latex \\\\ bracket error, setlength error latex, latex counter error',
    severity: 'error',
    group: 'lengths',
    summary: 'TeX expected a number or length and found text, often a «[» right after «\\\\».',
    quickAnswer:
      'TeX was reading a number or a length and the next token was not a digit. The most common trigger is a line starting with «[» after «\\\\»: LaTeX takes «\\\\[...]» as optional vertical space and tries to read «[a, b]» as a length. Other causes are an empty or misspelled argument to «\\setlength», «\\vspace», «\\setcounter» or «\\includegraphics». Put «{}» between «\\\\» and the bracket, or give the command a real number or length.',
    log: r`! Missing number, treated as zero.
<to be read again> 
                   a
l.4 [a, b]
           in this case.`,
    causes: [
      'A «[» at the start of the line after «\\\\», read as the optional spacing argument of the line break.',
      'An empty or non-numeric argument where a number is required: «\\vspace{}», «\\setcounter{page}{one}», «\\hspace{\\mylength}» with an undefined length.',
      'A length or counter name that does not exist, for example a misspelled «\\textwdith».',
      'A command that takes a numeric argument used without it, such as «\\linewidth» in text or «\\the» before a non-register.',
    ],
    fix: [
      'If the line after «\\\\» starts with a bracket, separate the two with an empty group: «\\\\{}[a, b]». In a table, «\\\\ \\relax» works the same way.',
      'Otherwise read the command shown in the log and give it what it expects: a number for counters, a number with a unit for lengths.',
    ],
    broken: r`\documentclass{article}
\begin{document}
The interval is\\
[a, b] in this case.
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
The interval is\\{}
[a, b] in this case.
\end{document}`,
    expect: 'Missing number, treated as zero',
    related: ['illegal-unit-of-measure', 'dimension-too-large', 'undefined-control-sequence'],
    faq: [
      {
        question: 'Why does "Missing number" often come with "Illegal unit of measure"?',
        answer:
          'Both come from the same failed attempt to read a length. TeX first finds no number (and uses zero), then finds no unit (and uses pt). Fixing the first error makes the second one go away.',
      },
      {
        question: 'How do I start a line with a square bracket after \\\\?',
        answer:
          'Write «\\\\{}» or «\\\\ \\relax» before the bracket, or use «\\newline». The empty group stops LaTeX from treating the bracket as the optional spacing argument of the line break.',
      },
      {
        question: 'Can an undefined length cause this error?',
        answer:
          'Yes. If «\\mylength» was never created with «\\newlength», using it where a length is expected can produce "Missing number" or "Undefined control sequence". Declare it with «\\newlength{\\mylength}» and set it with «\\setlength» first.',
      },
    ],
  },
  {
    slug: 'dimension-too-large',
    message: 'Dimension too large',
    shortName: 'Dimension too large',
    title: 'LaTeX error: Dimension too large',
    description:
      'Fix "Dimension too large" in LaTeX: TeX lengths stop at about 5.75 m (16383.99pt). Common in pgfplots and TikZ with big data; rescale or use fpu.',
    keywords:
      'dimension too large, latex dimension too large, pgfplots dimension too large, tikz dimension too large, 16383.99999pt, latex maximum length',
    severity: 'error',
    group: 'lengths',
    summary: 'A length went above TeX\'s maximum of 16383.99999pt (about 5.75 m); usually TikZ or pgfplots data.',
    quickAnswer:
      'TeX stores lengths as fixed-point numbers, and the largest is 16383.99999pt, roughly 5.75 metres. Any length or intermediate calculation beyond that stops with "Dimension too large". In practice it comes from plotting large values in TikZ or pgfplots, scaling an image enormously, or a typo such as «20000pt». Scale the data down, let pgfplots compute the axis (it uses floating point), or correct the length.',
    log: r`! Dimension too large.
<to be read again> 
                   \relax 
l.3 Left\hspace{20000pt}`,
    causes: [
      'A length written larger than 16383.99pt, often a typo like «\\hspace{20000pt}» or a missing decimal point.',
      'TikZ coordinates or plots with large numbers, for example «\\draw (0,0) -- (20000,0);» or plotting «exp(x)» over a wide range.',
      'pgfplots data with very large or very small values combined with manual axis computations, or «axis equal» with very different ranges.',
      'Scaling a box or image by a large factor with «\\scalebox» or «scale=».',
    ],
    fix: [
      'Correct or rescale the length so it stays below 16383pt. For a plain typo that is the whole fix.',
      'For plots, let pgfplots do the arithmetic: it computes in floating point and maps the data onto the axis. In TikZ use the «fpu» library or divide the data by a constant and label the axis with the scale (for example «$\\times 10^4$»). Restricting the plot with «domain=» and «restrict y to domain=» avoids huge intermediate values.',
    ],
    broken: r`\documentclass{article}
\begin{document}
Left\hspace{20000pt}Right
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
Left\hspace{2cm}Right
\end{document}`,
    expect: 'Dimension too large',
    related: ['illegal-unit-of-measure', 'missing-number-treated-as-zero', 'tex-capacity-exceeded'],
    faq: [
      {
        question: 'What is the largest length in LaTeX?',
        answer:
          '16383.99999pt, which is about 575.8 cm or 5.75 m. TeX uses the same limit for every length, including intermediate values inside TikZ and pgfplots calculations.',
      },
      {
        question: 'How do I fix Dimension too large in pgfplots?',
        answer:
          'Restrict the plotted range with «domain=» or «restrict y to domain=», avoid «\\addplot» expressions that blow up (such as exp of large numbers), and check that the axis is not forced to «axis equal» across very different ranges. Dividing the data by a constant and noting the scale on the axis also works.',
      },
      {
        question: 'Why does TikZ say Dimension too large with ordinary numbers?',
        answer:
          'TikZ does its arithmetic in TeX lengths, so a coordinate of a few thousand units in cm already exceeds the limit. Use the «fpu» library for the calculation, or scale the picture with «x=» and «y=» so the coordinates stay small.',
      },
    ],
  },
  {
    slug: 'tex-capacity-exceeded',
    message: 'TeX capacity exceeded, sorry',
    shortName: 'TeX capacity exceeded',
    title: 'LaTeX error: TeX capacity exceeded, sorry',
    description:
      'Why LaTeX says "TeX capacity exceeded, sorry [input stack size]": almost always an infinite loop, such as a command redefined in terms of itself.',
    keywords:
      'tex capacity exceeded, tex capacity exceeded sorry, input stack size latex, main memory size latex, latex infinite loop, renewcommand recursion latex, save size latex',
    severity: 'error',
    group: 'fatal',
    summary: 'TeX ran out of memory, almost always because of a command that calls itself.',
    quickAnswer:
      'The bracket names the memory TeX ran out of. "input stack size" or "grouping levels" nearly always mean infinite recursion: a command redefined in terms of itself, such as «\\renewcommand{\\ref}[1]{(\\ref{#1})}». Save the original first with «\\let\\oldref\\ref» and call «\\oldref» in the new definition. "main memory size" or "pool size" can also come from a genuinely huge document or plot; then split the work or use externalized TikZ figures or LuaLaTeX, which allocates memory dynamically.',
    log: r`! TeX capacity exceeded, sorry [input stack size=10000].
\ref #1->(\ref {#1
                  })
l.5 See Section~\ref{sec:intro}`,
    causes: [
      'A command redefined to call itself: «\\renewcommand{\\ref}[1]{(\\ref{#1})}» or «\\renewcommand{\\emph}[1]{\\textbf{\\emph{#1}}}».',
      'Two macros that call each other, or a loop whose stop condition is never reached.',
      'A fragile command in a moving argument (section title, caption) that expands into itself, often with old packages.',
      'A genuinely large job: huge TikZ or pgfplots figures, very long tables, or thousands of labels (reported as main memory, save size or hash size).',
    ],
    fix: [
      'Read the line just under the error: it shows the macro that was expanding, here «\\ref». If you redefined that command, keep a copy of the original with «\\let» and use the copy inside the new definition.',
      'For memory problems with large figures, externalize them («\\usetikzlibrary{external}» with «\\tikzexternalize») or compile with LuaLaTeX, whose memory grows as needed.',
    ],
    broken: r`\documentclass{article}
\renewcommand{\ref}[1]{(\ref{#1})}
\begin{document}
\section{Intro}\label{sec:intro}
See Section~\ref{sec:intro}.
\end{document}`,
    fixed: r`\documentclass{article}
\let\oldref\ref
\renewcommand{\ref}[1]{(\oldref{#1})}
\begin{document}
\section{Intro}\label{sec:intro}
See Section~\ref{sec:intro}.
\end{document}`,
    expect: 'TeX capacity exceeded',
    engine: 'pdflatex',
    related: ['command-already-defined', 'emergency-stop', 'dimension-too-large'],
    faq: [
      {
        question: 'Can I just increase TeX memory?',
        answer:
          'Only if the document is really that large. Limits such as main_memory can be raised in texmf.cnf, but an infinite loop will exhaust any amount of memory, so first check whether a command calls itself. "input stack size" almost always means recursion.',
      },
      {
        question: 'How do I redefine a command using its old definition?',
        answer:
          'Copy it first with «\\let\\oldcmd\\cmd», then use «\\oldcmd» in the new definition: «\\renewcommand{\\cmd}[1]{...\\oldcmd{#1}...}». For commands with optional arguments use «\\NewCommandCopy» (LaTeX 2020 and later) instead of «\\let».',
      },
      {
        question: 'Why does this happen with large TikZ or pgfplots figures?',
        answer:
          'Each figure is built in TeX memory before it is written out. Many plot points can exceed main memory. Reduce «samples=», externalize the figures, or compile with LuaLaTeX.',
      },
    ],
  },
  {
    slug: 'emergency-stop',
    message: 'Emergency stop',
    shortName: 'Emergency stop',
    title: 'LaTeX error: Emergency stop',
    description:
      'What "Emergency stop" means in LaTeX: the run was aborted, usually by a missing \\end{document}, a missing file or an earlier error. How to find the cause.',
    keywords:
      'emergency stop latex, latex emergency stop, job aborted no legal end found, job aborted file error in nonstop mode, latex fatal error, no output pdf file produced',
    severity: 'error',
    group: 'fatal',
    summary: 'The run was aborted; the reason is in the line after it or in the error just above.',
    quickAnswer:
      '"Emergency stop" is not a cause in itself: TeX prints it when it cannot continue in non-interactive mode. Read the line marked «***» below it. "no legal \\end found" means the file ended without «\\end{document}»; "file error in nonstop mode" means a file could not be found; "cannot \\read from terminal" means LaTeX wanted to ask you something, usually a missing package. Fix the error printed just above, then compile again.',
    log: r`! Emergency stop.
<*> broken.tex
          
*** (job aborted, no legal \end found)`,
    causes: [
      'The document has no «\\end{document}», or it is commented out or inside an unclosed environment, so the file ends while TeX is still waiting.',
      'A file named in «\\input», «\\include» or «\\documentclass» does not exist ("file error in nonstop mode").',
      'A missing package: LaTeX asks for another file name, and in nonstop mode it cannot read the answer ("cannot \\read from terminal").',
      'A compiler set to stop at the first error (halt-on-error), so any earlier error ends in an emergency stop.',
    ],
    fix: [
      'Scroll up to the first line beginning with «!» and fix that error; the emergency stop is its consequence. If it is the only error, check the «***» line.',
      'For "no legal \\end found", make sure the main file ends with «\\end{document}» and that every environment opened before it is closed.',
    ],
    broken: r`\documentclass{article}
\begin{document}
Some text.`,
    fixed: r`\documentclass{article}
\begin{document}
Some text.
\end{document}`,
    expect: 'Emergency stop',
    engine: 'pdflatex',
    related: ['i-cant-find-file', 'file-not-found', 'tex-capacity-exceeded'],
    faq: [
      {
        question: 'What does "job aborted, no legal \\end found" mean?',
        answer:
          'TeX reached the end of the file without seeing «\\end{document}». Add it at the end of the main file, and check that it is not commented out or swallowed by an unclosed brace or verbatim environment.',
      },
      {
        question: 'Why is no PDF produced after an emergency stop?',
        answer:
          'The run is aborted before LaTeX can finish the pages, so the log ends with "Fatal error occurred, no output PDF file produced". Fix the error and compile again.',
      },
      {
        question: 'Why does an online editor show Emergency stop when my local LaTeX asks a question?',
        answer:
          'Locally, TeX may stop and prompt for a file name or a key press. Online editors and build tools run in nonstop mode, where TeX cannot ask, so the same situation ends in "Emergency stop" instead.',
      },
    ],
  },
  {
    slug: 'i-cant-find-file',
    message: "I can't find file `chapter1'",
    shortName: "I can't find file",
    title: "LaTeX error: I can't find file",
    description:
      'Fix "I can\'t find file" in LaTeX: the file passed to \\input or the compiler does not exist at that path. Check the name, folder and braces.',
    keywords:
      "i can't find file latex, latex i can't find file, input file not found latex, latex input error, job aborted file error in nonstop mode, latex file path",
    severity: 'error',
    group: 'packages',
    summary: 'A file read with «\\input» (or the main file) does not exist under that name or path.',
    quickAnswer:
      'TeX tried to open a file and it was not there. In a LaTeX document this usually comes from «\\input chapter1» without braces, or from a path or name that does not match the actual file: a different folder, wrong capitalisation, a space in the name or a missing extension. Check that the file exists relative to the main «.tex» file and write «\\input{chapters/chapter1}». The message also appears when the compiler is given a file name that does not exist.',
    log: "! I can't find file `chapter1'.\nl.3 \\input chapter1\n                   \n*** (job aborted, file error in nonstop mode)",
    causes: [
      'The file is missing or in another folder: paths in «\\input» are relative to the main file, not to the file containing the command.',
      'The name differs in case or spelling (Linux servers and online editors are case-sensitive: «Chapter1.tex» is not «chapter1.tex»).',
      'A file name with spaces or special characters, which TeX reads only up to the space.',
      'The compiler was started on a file name that does not exist, for example the wrong main file in the project settings.',
    ],
    fix: [
      'Make the file exist where LaTeX looks for it, and refer to it with braces and the path from the main file: «\\input{chapters/chapter1}». Rename files to avoid spaces.',
      'In the example below «filecontents» writes «chapter1.tex» so the snippet is self-contained; in a real project it is a separate file next to the main one.',
    ],
    broken: r`\documentclass{article}
\begin{document}
\input chapter1
\end{document}`,
    fixed: r`\begin{filecontents*}[overwrite]{chapter1.tex}
This is the first chapter.
\end{filecontents*}
\documentclass{article}
\begin{document}
\input{chapter1}
\end{document}`,
    expect: "I can't find file",
    engine: 'pdflatex',
    related: ['file-not-found', 'emergency-stop', 'missing-begin-document'],
    faq: [
      {
        question: 'What is the difference between this and "File not found"?',
        answer:
          '"I can\'t find file" is the low-level TeX message, printed when the primitive «\\input» or the compiler cannot open a file. "LaTeX Error: File `x\' not found" is LaTeX\'s own message for «\\usepackage», «\\documentclass» and braced «\\input{...}».',
      },
      {
        question: 'Should I use \\input or \\include?',
        answer:
          '«\\input{file}» inserts the file exactly where it is, anywhere in the document. «\\include{file}» starts a new page and works with «\\includeonly» to compile selected chapters. Both need the file to exist under that path.',
      },
      {
        question: 'Why does it work on my computer but not online?',
        answer:
          'Online editors usually run on Linux, where file names are case-sensitive, and only see the files you uploaded. Check the capitalisation and that every input file is part of the project.',
      },
    ],
  },
  {
    slug: 'file-not-found',
    message: "LaTeX Error: File `graphix.sty' not found",
    shortName: 'File not found',
    title: "LaTeX error: File `x.sty' not found (missing package)",
    description:
      'Fix "LaTeX Error: File `x.sty\' not found": the package name is misspelled or not installed. How to check the name and install missing packages.',
    keywords:
      "file not found latex, latex error file sty not found, sty not found, latex package not found, file cls not found, install latex package, tlmgr install, miktex missing package",
    severity: 'error',
    group: 'packages',
    summary: 'A package or class named in «\\usepackage» or «\\documentclass» is misspelled or not installed.',
    quickAnswer:
      'LaTeX could not find the «.sty» file for a package (or the «.cls» file for a class). Either the name is wrong, as in «\\usepackage{graphix}» instead of «graphicx», or the package is not installed in your TeX distribution. Check the spelling on CTAN; if it is right, install it with «tlmgr install <name>» on TeX Live or the MiKTeX console, or put the «.sty» file next to your document. Online editors such as Octree come with a full TeX Live, so there a missing file almost always means a typo.',
    log: "! LaTeX Error: File `graphix.sty' not found.\n\nType X to quit or <RETURN> to proceed,\nor enter new name. (Default extension: sty)\n\nEnter file name: \n! Emergency stop.",
    causes: [
      'A typo in the package name: «graphix» for «graphicx», «amsmaths» for «amsmath», «hyperrefs» for «hyperref».',
      'A package that is not installed, typical of minimal TeX Live, BasicTeX or TinyTeX installations.',
      'A custom class or style file from a journal or university template that was not copied next to the main file.',
      'An old package that was renamed or removed from CTAN (for example «epsfig» or «subfigure» on some systems).',
    ],
    fix: [
      'Correct the name. CTAN (ctan.org) lists every package; the file name is what goes in «\\usepackage».',
      'If the name is right, install the package: «tlmgr install graphics» on TeX Live (the package that contains a file is shown by «tlmgr search --global --file graphicx.sty»), or let MiKTeX install it on the fly. For a template class, upload the «.cls» or «.sty» to the same folder as the document.',
    ],
    broken: r`\documentclass{article}
\usepackage{graphix}
\begin{document}
Text.
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage{graphicx}
\begin{document}
Text.
\end{document}`,
    expect: "File `graphix.sty' not found",
    engine: 'pdflatex',
    related: ['i-cant-find-file', 'undefined-control-sequence', 'option-clash'],
    faq: [
      {
        question: 'How do I install a missing LaTeX package?',
        answer:
          'On TeX Live run «tlmgr install <package>» (with sudo on Linux and macOS system installs). MiKTeX installs missing packages automatically or through the MiKTeX Console. You can also download the «.sty» from CTAN and place it in the same folder as your «.tex» file.',
      },
      {
        question: 'What does "File `x.cls\' not found" mean?',
        answer:
          'The document class is missing. Journal and thesis templates often ship their own «.cls» file: copy it next to your main file, or correct the name in «\\documentclass».',
      },
      {
        question: 'Why is the package missing online but not on my computer?',
        answer:
          'It may be a local file you never uploaded, such as a custom «.sty» in your project folder. Upload it alongside the document. Standard CTAN packages are already installed in online editors with a full TeX Live.',
      },
    ],
  },
  {
    slug: 'option-clash',
    message: 'LaTeX Error: Option clash for package amsmath.',
    shortName: 'Option clash for package',
    title: 'LaTeX error: Option clash for package',
    description:
      'Fix "Option clash for package" in LaTeX: a package was loaded twice with different options, often by another package. Pass the options once, first.',
    keywords:
      'option clash for package, latex option clash, option clash for package hyperref, option clash for package xcolor, option clash for package amsmath, passoptionstopackage, latex package loaded twice',
    severity: 'error',
    group: 'packages',
    summary: 'A package is loaded twice with different options, often once by another package.',
    quickAnswer:
      'LaTeX loads each package only once. If a package has already been loaded (by you, by the document class or by another package) and a later «\\usepackage» asks for it again with options the first load did not have, LaTeX cannot apply them and stops with an option clash. Load the package once with all the options it needs, or put «\\PassOptionsToPackage{options}{package}» before the first package that loads it.',
    log: r`! LaTeX Error: Option clash for package amsmath.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.4 \begin
          {document}`,
    causes: [
      'Another package loads it first without options: «mathtools» loads «amsmath», «tikz» loads «xcolor» and «graphicx», «biblatex» and many templates load «hyperref».',
      'The document class already loads the package, and the preamble loads it again with options (common with journal and thesis classes and «hyperref» or «geometry»).',
      'The same package appears twice in a long preamble, copied from two different sources, with different options each time.',
    ],
    fix: [
      'Find who loads the package first. Search the log for the package file (here «amsmath.sty»): the file printed just before it is the one that loaded it.',
      'Then either move your «\\usepackage[options]{package}» above that package, give the options to the package that loads it (mathtools passes its options on to amsmath), or write «\\PassOptionsToPackage{fleqn}{amsmath}» at the very top of the preamble, before «\\documentclass» if the class is the one loading it.',
    ],
    broken: r`\documentclass{article}
\usepackage{mathtools}       % loads amsmath without options
\usepackage[fleqn]{amsmath}  % asks again with fleqn
\begin{document}
\[ E = mc^2 \]
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage[fleqn]{amsmath}  % options on the first load
\usepackage{mathtools}       % amsmath is already loaded: no clash
\begin{document}
\[ E = mc^2 \]
\end{document}`,
    expect: 'Option clash for package amsmath',
    related: ['command-already-defined', 'file-not-found', 'babel-unknown-option'],
    faq: [
      {
        question: 'What does "Option clash for package" mean in LaTeX?',
        answer:
          'It means the package named in the message was already loaded, and a later «\\usepackage» asked for it with options that were not used the first time. LaTeX never loads a package twice, so it cannot honour the new options and reports a clash.',
      },
      {
        question: 'How do I fix "Option clash for package hyperref" or "xcolor"?',
        answer:
          'Those two are usually loaded early by the class or by another package (for example tikz loads xcolor). Put «\\PassOptionsToPackage{table,dvipsnames}{xcolor}» or the hyperref options at the top of the file, before «\\documentclass», or use «\\hypersetup{...}» after hyperref is loaded instead of passing options again.',
      },
      {
        question: 'Can I just ignore an option clash?',
        answer:
          'Pressing Enter lets LaTeX continue, but the options you asked for are not applied, so the result is not what you wanted. Fix the loading order instead; it is usually a one-line change.',
      },
      {
        question: 'Does loading the same package twice without options cause an error?',
        answer:
          'No. A second «\\usepackage{name}» with no options, or with a subset of the options already used, is silently ignored. The clash only happens when the second load asks for an option the first did not use.',
      },
    ],
  },
  {
    slug: 'babel-unknown-option',
    message: "Package babel Error: Unknown option 'engish'.",
    shortName: 'Package babel Error: Unknown option',
    title: 'LaTeX error: Package babel Error: Unknown option',
    description:
      'Fix "Package babel Error: Unknown option" in LaTeX: a misspelled language name or a language file that is not installed. Check the name, then install it.',
    keywords:
      'package babel error unknown option, babel unknown option, babel error, latex babel language not found, babel ldf not found, babel english, babel spanish, babelprovide',
    severity: 'error',
    group: 'packages',
    summary: 'The language name given to babel is misspelled or its language file is not installed.',
    quickAnswer:
      'babel treats every option as a language name and looks for a matching definition file («engish.ldf» for «engish»). When there is no such file, either because the name is misspelled or because that language is not installed, it stops with this error. Correct the spelling («english», «ngerman», «spanish», «french»), install the language support if your distribution splits it out, or use «\\babelprovide» for languages babel only supports through ini files.',
    log: r`! Package babel Error: Unknown option 'engish'.
(babel)                Suggested actions:
(babel)                * Make sure you haven't misspelled it
(babel)                * Check in the babel manual that it's supported
(babel)                * If supported and it's a language, you may
(babel)                  need in some distributions a separate
(babel)                  installation
(babel)                * If installed, check there isn't an old
(babel)                  version of the required files in your system`,
    causes: [
      'A typo in the language name: «engish», «englsh», «portugese».',
      'A name babel does not use: «german» is the old spelling (use «ngerman»), «chinese» and «arabic» need «\\babelprovide» or the ini-based loader, «en» is not a language option.',
      'The language is spelled correctly but not installed: TeX Live and MiKTeX ship many languages as separate packages (for example «babel-spanish»).',
      'An option meant for another package, such as «utf8» or «T1», was passed to babel or given as a global class option that babel picked up.',
    ],
    fix: [
      'Fix the spelling first; the name in quotes in the message is exactly what babel received. Then, if the name is right, install the language: on TeX Live «tlmgr install babel-spanish», on MiKTeX the package manager installs it on demand. Online editors such as Octree ship the full TeX Live, so a correct name is all you need.',
      'Languages without a classic «.ldf» file are loaded with «\\babelprovide[import]{language}» or with «\\usepackage[provide=*]{babel}».',
    ],
    broken: r`\documentclass{article}
\usepackage[engish]{babel}
\begin{document}
Hello, world.
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage[english]{babel}
\begin{document}
Hello, world.
\end{document}`,
    expect: "Unknown option 'engish'",
    related: ['option-clash', 'file-not-found', 'inputenc-unicode-character'],
    faq: [
      {
        question: 'Why does babel say "Unknown option" for a language that exists?',
        answer:
          'Either the name is not the one babel uses (for example «ngerman» rather than «german-new», «brazilian» or «portuguese»), or the language files are not installed. Check the spelling against the babel manual and install the matching babel-language package.',
      },
      {
        question: 'What are the correct babel names for common languages?',
        answer:
          'english, british, american, ngerman, french, spanish, italian, portuguese, brazilian, dutch, polish, russian, greek, turkish. For Chinese, Japanese, Arabic and Hindi use «\\babelprovide» or, with XeLaTeX or LuaLaTeX, polyglossia or the ini-based loader.',
      },
      {
        question: 'Can I load several languages with babel?',
        answer:
          'Yes: «\\usepackage[french,english]{babel}». The last one is the main language. Switch inside the text with «\\selectlanguage{french}» or «\\foreignlanguage{french}{texte}».',
      },
    ],
  },
  {
    slug: 'inputenc-unicode-character',
    message: 'LaTeX Error: Unicode character ≈ (U+2248) not set up for use with LaTeX.',
    shortName: 'Unicode character not set up for use with LaTeX',
    title: 'LaTeX error: Unicode character not set up for use',
    description:
      'Fix "Unicode character not set up for use with LaTeX" (inputenc error): pdfLaTeX has no glyph for a pasted symbol. Use the LaTeX command or XeLaTeX.',
    keywords:
      'unicode character not set up for use with latex, package inputenc error unicode character, inputenc error, latex unicode character error, declareunicodecharacter, newunicodechar, pdflatex unicode, latex special characters error',
    severity: 'error',
    group: 'packages',
    engine: 'pdflatex',
    summary: 'pdfLaTeX met a pasted Unicode symbol (≈, →, emoji, CJK) that it has no definition for.',
    quickAnswer:
      'pdfLaTeX reads UTF-8, but it only knows how to typeset the characters its font encodings cover. A symbol pasted from a PDF, Word or a website, such as ≈, →, ✓, a non-breaking zero-width space or a Chinese character, has no definition, so LaTeX stops. Replace it with the LaTeX command («$\\approx$», «$\\rightarrow$»), map it once with «\\DeclareUnicodeCharacter{2248}{\\ensuremath{\\approx}}», or compile with XeLaTeX or LuaLaTeX and a font that contains the character.',
    log: r`! LaTeX Error: Unicode character ≈ (U+2248)
               not set up for use with LaTeX.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.4 The result is ≈
                    3.14.`,
    causes: [
      'Math symbols typed or pasted as Unicode in text: ≈, ≤, →, ±, ×, Greek letters.',
      'Invisible characters copied from a PDF or web page: zero-width space (U+200B), soft hyphen, or a non-breaking space in a place where it matters.',
      'Emoji, CJK or other scripts that need a different engine and font.',
      'An older TeX Live in which the same problem is reported as «Package inputenc Error: Unicode character ... not set up for use with LaTeX».',
    ],
    fix: [
      'Look at the line after «l.» in the log: the character is printed there and its code point is in the message (here U+2248). Replace it with the proper LaTeX command, which is usually the cleanest fix for math symbols.',
      'If the character appears many times (for example in pasted data), declare it once in the preamble with «\\DeclareUnicodeCharacter{2248}{\\ensuremath{\\approx}}» (or «\\newunicodechar{≈}{\\ensuremath{\\approx}}» from the newunicodechar package). For whole passages in another script, switch to XeLaTeX or LuaLaTeX with fontspec.',
    ],
    broken: r`\documentclass{article}
\usepackage[utf8]{inputenc}
\begin{document}
The result is ≈ 3.14.
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage[utf8]{inputenc}
% Either write $\approx$ in the text, or map the character once:
\DeclareUnicodeCharacter{2248}{\ensuremath{\approx}}
\begin{document}
The result is ≈ 3.14, or $\approx 3.14$ written as a command.
\end{document}`,
    expect: '(U+2248)',
    variants: [
      {
        message: 'Package inputenc Error: Unicode character ≈ (U+2248) not set up for use with LaTeX.',
        text: [
          'This is the same error as printed by older LaTeX releases, where the «inputenc» package did the UTF-8 decoding. The causes and fixes are identical: replace the character, declare it with «\\DeclareUnicodeCharacter», or move to XeLaTeX or LuaLaTeX.',
        ],
      },
    ],
    related: ['missing-dollar-inserted', 'font-shape-undefined', 'babel-unknown-option'],
    faq: [
      {
        question: 'How do I find the invisible character LaTeX complains about?',
        answer:
          'The message gives its code point, for example U+200B (zero-width space) or U+00A0 (no-break space). Search for it in your editor (many accept \\u200B in a regular-expression search) or retype the words around the position shown after «l.» in the log.',
      },
      {
        question: 'Does XeLaTeX fix "Unicode character not set up for use with LaTeX"?',
        answer:
          'Yes, as long as the font you use contains the character. XeLaTeX and LuaLaTeX read Unicode directly, so the error disappears; if the font lacks the glyph you get a "Missing character" warning in the log and a blank in the PDF instead.',
      },
      {
        question: 'What is the LaTeX command for a symbol I pasted?',
        answer:
          'Common ones: ≈ is «\\approx», ≤ is «\\leq», → is «\\rightarrow», ± is «\\pm», × is «\\times», ° is «\\textdegree» or «^\\circ» in math, ✓ is «\\checkmark» from amssymb. The Octree symbol reference lists the rest.',
      },
    ],
  },
  {
    slug: 'font-shape-undefined',
    message: "LaTeX Font Warning: Font shape `OT1/cmr/bx/sc' undefined",
    shortName: 'Font shape undefined',
    title: "LaTeX warning: Font shape `OT1/cmr/bx/sc' undefined",
    description:
      'Fix "Font shape undefined" in LaTeX: the font has no such weight or shape (bold small caps, bold monospace), so LaTeX substitutes. Pick a font that has it.',
    keywords:
      'font shape undefined, latex font warning font shape undefined, font shape ot1/cmr/bx/sc undefined, some font shapes were not available defaults substituted, fontspec font cannot be found, latex bold small caps, latex font not found',
    severity: 'warning',
    group: 'packages',
    engine: 'pdflatex',
    summary: 'The current font has no such weight, shape or encoding, so LaTeX substitutes another one.',
    quickAnswer:
      'A LaTeX font shape is encoding/family/series/shape, for example «OT1/cmr/bx/sc» is Computer Modern, bold, small caps. If the font has no file for that combination, LaTeX prints this warning and uses the nearest shape it has, usually upright bold, so the text silently looks wrong. Read the four parts of the message to see what was missing and switch to a font family that has it, add «\\usepackage[T1]{fontenc}», or drop the combination (for example use «\\textsc» without bold).',
    log: `LaTeX Font Warning: Font shape ${q('OT1/cmr/bx/sc')} undefined
(Font)              using ${q('OT1/cmr/bx/n')} instead on input line 5.

LaTeX Font Warning: Some font shapes were not available, defaults substituted.`,
    causes: [
      'A combination the font simply does not have: bold small caps or bold italic small caps in Computer Modern or Latin Modern, slanted or bold typewriter text.',
      'The OT1 default encoding: several families only provide their full set of shapes in T1 (load «\\usepackage[T1]{fontenc}»).',
      'A family name that is not installed or misspelled in «\\fontfamily{...}», which falls back to the default family.',
      'With XeLaTeX or LuaLaTeX and fontspec, a font installed without its bold or italic files.',
    ],
    fix: [
      'Decode the message: «OT1/cmr/bx/sc» means encoding OT1, family cmr, series bx (bold extended), shape sc (small caps). The second line says what LaTeX used instead. Pick a font family that has the missing shape: TeX Gyre Pagella and Termes («tgpagella», «tgtermes») have bold small caps, Latin Modern does not.',
      'If you do not need the combination, remove it: «\\textsc» alone works in the default font. The final «Some font shapes were not available» line is only a summary and goes away with the individual warnings.',
    ],
    broken: r`\documentclass{article}
\begin{document}
\textbf{\textsc{Bold Small Caps}} in the default font.
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage[T1]{fontenc}
\usepackage{tgpagella} % TeX Gyre Pagella has bold small caps
\begin{document}
\textbf{\textsc{Bold Small Caps}} in Pagella.
\end{document}`,
    expect: 'Font shape `OT1/cmr/bx/sc',
    variants: [
      {
        message: 'Package fontspec Error: The font "Helvetica Neue Pro" cannot be found.',
        log: r`! Package fontspec Error: The font "Helvetica Neue Pro" cannot be found.

For immediate help type H <return>.
 ...

l.4 \begin
          {document}`,
        text: [
          'With XeLaTeX and LuaLaTeX, «\\setmainfont{Name}» looks the font up by name among the fonts installed on the machine that compiles. If no font has that exact name, fontspec stops. Check the name the system reports (on Linux and macOS «fc-list | grep -i helvetica»), remember that a font installed on your laptop is not installed on a server or online editor, and for portable documents prefer fonts that ship with TeX Live («TeX Gyre Heros», «Libertinus Serif», «Source Sans Pro») or load the font from files with «\\setmainfont{MyFont-Regular.otf}[Path=fonts/, BoldFont=MyFont-Bold.otf]».',
        ],
      },
    ],
    related: ['inputenc-unicode-character', 'file-not-found', 'option-clash'],
    faq: [
      {
        question: 'How do I read a font shape like T1/lmr/bx/sc?',
        answer:
          'It is encoding/family/series/shape. Encoding: OT1, T1 or TU. Family: cmr, lmr, ptm and so on. Series: m (medium), b or bx (bold). Shape: n (upright), it (italic), sl (slanted), sc (small caps).',
      },
      {
        question: 'Why is my bold small caps text not bold small caps?',
        answer:
          'Because Computer Modern and Latin Modern have no bold small caps. LaTeX warns "Font shape undefined" and falls back to bold upright. Use a family that has them, such as TeX Gyre Pagella, Termes or Libertinus, or the bold-extra package for Computer Modern.',
      },
      {
        question: 'Can I ignore "Some font shapes were not available, defaults substituted"?',
        answer:
          'The PDF is produced, but some text is set in a different shape from the one you asked for. Scroll up to the individual "Font shape ... undefined" warnings to see which ones, and decide whether the substitute is acceptable.',
      },
      {
        question: 'What does "The font cannot be found" mean in fontspec?',
        answer:
          'fontspec could not find a font with that name on the system doing the compile. Check the exact name, install the font there, or load it from .otf/.ttf files in your project with the Path option.',
      },
    ],
  },
  {
    slug: 'hyperref-token-not-allowed',
    message: "Package hyperref Warning: Token not allowed in a PDF string (Unicode): removing `math shift'",
    shortName: 'Token not allowed in a PDF string',
    title: 'LaTeX warning: Token not allowed in a PDF string',
    description:
      'Fix the hyperref warning "Token not allowed in a PDF string": math or a command in a section title cannot go into PDF bookmarks. Use \\texorpdfstring.',
    keywords:
      'token not allowed in a pdf string, hyperref warning token not allowed, removing math shift, removing superscript, texorpdfstring, hyperref bookmarks math, latex section title math hyperref',
    severity: 'warning',
    group: 'packages',
    summary: 'Math or a command in a section title cannot be copied into the PDF bookmarks.',
    quickAnswer:
      'hyperref turns every section title into a PDF bookmark, and bookmarks are plain text. When a title contains math («$...$»), a superscript, «\\\\» or a formatting command, hyperref cannot convert it, removes the token and warns. The PDF still compiles, but the bookmark reads oddly ("Energy E = mc2"). Give hyperref a plain-text version with «\\texorpdfstring{$E = mc^2$}{E = mc²}».',
    log: `Package hyperref Warning: Token not allowed in a PDF string (Unicode):
(hyperref)                removing ${q('math shift')} on input line 4.

Package hyperref Warning: Token not allowed in a PDF string (Unicode):
(hyperref)                removing ${q('superscript')} on input line 4.`,
    causes: [
      'Inline math in a «\\section», «\\subsection», «\\chapter» or «\\caption» title: the «math shift» token is the «$».',
      'Superscripts, subscripts or math commands in a title («^», «_», «\\alpha»).',
      'A line break «\\\\» or a command such as «\\footnote», «\\cite» or a user macro in the title, reported as «removing \\\\» or «removing \\cite».',
    ],
    fix: [
      'Wrap the part hyperref cannot handle in «\\texorpdfstring{TeX version}{text version}»: the first argument is typeset in the document, the second goes into the bookmark. The text version may contain Unicode such as ² or α.',
      'For a line break in a title, give a short title for the table of contents and bookmarks with «\\section[Short title]{Long\\\\title}». Footnotes in titles belong after the optional argument too.',
    ],
    broken: r`\documentclass{article}
\usepackage{hyperref}
\begin{document}
\section{Energy $E = mc^2$}
Text.
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage{hyperref}
\begin{document}
\section{Energy \texorpdfstring{$E = mc^2$}{E = mc²}}
Text.
\end{document}`,
    expect: 'Token not allowed in a PDF string',
    related: ['reference-undefined', 'citation-undefined', 'missing-dollar-inserted'],
    faq: [
      {
        question: 'Is "Token not allowed in a PDF string" an error?',
        answer:
          'No, it is a warning. The PDF is produced and the section title looks right on the page. Only the PDF bookmark (the outline panel in a PDF viewer) is affected, because hyperref dropped the parts it could not convert.',
      },
      {
        question: 'How do I use math in a section title with hyperref?',
        answer:
          'Write «\\section{Results for \\texorpdfstring{$\\alpha$}{alpha}}». The first argument is used in the document and the table of contents, the second in the bookmark; it can be Unicode, such as α.',
      },
      {
        question: 'How do I turn off the PDF bookmarks instead?',
        answer:
          'Load hyperref with «\\usepackage[bookmarks=false]{hyperref}». That removes the warning together with the bookmarks, which most readers use for navigation, so «\\texorpdfstring» is usually the better fix.',
      },
    ],
  },
  {
    slug: 'image-file-not-found',
    message: `Package pdftex.def Error: File ${q('figures/results.png')} not found: using draft setting.`,
    shortName: 'Image file not found (pdftex.def)',
    title: 'LaTeX error: Image file not found (pdftex.def)',
    description:
      'Fix "Package pdftex.def Error: File not found: using draft setting": the image path in \\includegraphics does not match a file the compiler can see.',
    keywords:
      'pdftex.def error file not found, file not found using draft setting, latex image not found, includegraphics file not found, latex figure not showing, graphicspath, latex image path, latex png not found',
    severity: 'error',
    group: 'packages',
    engine: 'pdflatex',
    summary: '«\\includegraphics» names an image file that does not exist at that path.',
    quickAnswer:
      'graphicx could not find the file named in «\\includegraphics», so it stops (or, if you continue, draws an empty frame: the "draft setting"). The path is relative to the main «.tex» file, not to the chapter file that contains the command, and it must match the real name exactly, including folder, case and extension. Correct the path, upload the image to the project, or tell LaTeX where to look with «\\graphicspath{{figures/}}».',
    log: r`! Package pdftex.def Error: File ` + q('figures/results.png') + r` not found: using draft setting.

See the pdftex.def package documentation for explanation.
Type  H <return>  for immediate help.
 ...

l.6 ...s[width=0.6\textwidth]{figures/results.png}`,
    causes: [
      'The image is in a different folder from the one in the path, or the path is written relative to a chapter file in a subfolder; LaTeX always resolves it from the folder of the main document.',
      'The name differs in case or extension: «Results.PNG» on disk versus «results.png» in the source works on macOS and Windows but fails on Linux and on online compilers.',
      'The image was never uploaded to the online project, or the file name contains spaces or extra dots that the driver misreads.',
      'With XeLaTeX the same problem is reported as «LaTeX Error: File `figures/results.png\' not found», and an unsupported format (such as «.eps» with pdfLaTeX on an old TeX Live) gives "Unknown graphics extension" instead.',
    ],
    fix: [
      'Check the exact path and name of the file next to your main «.tex» file and copy it into «\\includegraphics». You can leave out the extension and let graphicx try «.pdf», «.png» and «.jpg» in turn. If all figures live in one folder, add «\\graphicspath{{figures/}}» to the preamble and refer to them by file name only.',
      'The fixed example uses «example-image-a», a placeholder image that ships with TeX Live (package «mwe»), so it compiles anywhere; in your document use the path of your own file.',
    ],
    broken: r`\documentclass{article}
\usepackage{graphicx}
\begin{document}
\begin{figure}[h]
  \centering
  \includegraphics[width=0.6\textwidth]{figures/results.png}
  \caption{Training loss.}
\end{figure}
\end{document}`,
    fixed: r`\documentclass{article}
\usepackage{graphicx}
\begin{document}
\begin{figure}[h]
  \centering
  % The file must exist at this path, relative to the main .tex file
  \includegraphics[width=0.6\textwidth]{example-image-a}
  \caption{Training loss.}
\end{figure}
\end{document}`,
    expect: 'not found: using draft setting',
    related: ['file-not-found', 'i-cant-find-file', 'too-many-unprocessed-floats'],
    faq: [
      {
        question: 'What does "using draft setting" mean?',
        answer:
          'If you tell LaTeX to continue after the error, graphicx behaves as if the draft option were on for that image: it leaves a box of the right size with the file name in it instead of the picture. The PDF is produced, but the figure is missing.',
      },
      {
        question: 'Why does the image work on my computer but not online?',
        answer:
          'Usually because of case: macOS and Windows treat Figure.PNG and figure.png as the same file, Linux servers do not. Make the name in the source match the file exactly, and make sure the image was uploaded into the same folder structure.',
      },
      {
        question: 'Is the path relative to the chapter file or the main file?',
        answer:
          'To the main file. When chapters/intro.tex is included with \\input or \\include, an image next to it must still be referenced as chapters/image.png, or added to \\graphicspath.',
      },
      {
        question: 'Do I need to write the file extension?',
        answer:
          'No. \\includegraphics{results} tries the supported extensions in order (.pdf, .png, .jpg and others for pdfLaTeX). Leaving it out also lets you swap a PNG for a vector PDF later without editing the source.',
      },
    ],
  },
  {
    slug: 'citation-undefined',
    message: "LaTeX Warning: Citation `vaswani2017' on page 1 undefined",
    shortName: 'Citation undefined',
    title: 'LaTeX warning: Citation undefined',
    description:
      'Fix "LaTeX Warning: Citation undefined" and [?] in the PDF: the key is misspelled, missing from the .bib file, or BibTeX/Biber has not run yet.',
    keywords:
      'citation undefined, latex warning citation undefined, latex citation question mark, there were undefined references, bibtex citation undefined, biber citation undefined, latex cite not working, empty bibliography',
    severity: 'warning',
    group: 'warnings',
    summary: 'A «\\cite» key has no matching bibliography entry yet, so the PDF shows [?].',
    quickAnswer:
      'LaTeX resolves «\\cite{key}» from the «.aux» file written by the previous run and the bibliography produced by BibTeX or Biber. Until a matching entry exists, the citation prints as [?] or bold «key» and the log warns. Check that the key is spelled exactly as in the «.bib» file or «\\bibitem», that the «.bib» file is found and the entry is valid, then run LaTeX, BibTeX/Biber, LaTeX, LaTeX (an online editor or latexmk does this sequence for you).',
    log: `LaTeX Warning: Citation ${q('vaswani2017')} on page 1 undefined on input line 3.

LaTeX Warning: There were undefined references.`,
    causes: [
      'The key in «\\cite» does not match the key in the «.bib» file or «\\bibitem» exactly (keys are case-sensitive): «vaswani2017» versus «vaswani2017attention».',
      'BibTeX or Biber has not been run, or failed: look in the «.blg» file for "I couldn\'t open database file" or syntax errors in the entry.',
      'The bibliography is never printed: «\\bibliography{refs}» or «\\printbibliography» is missing, or the «.bib» file name is wrong.',
      'Mixing systems: «\\addbibresource» (biblatex) with BibTeX, or «\\bibliographystyle» together with biblatex.',
    ],
    fix: [
      'Copy the key from the warning and search for it in your bibliography. If it is not there, add the entry or correct the key in «\\cite». If it is there, compile the full sequence (LaTeX, BibTeX or Biber, LaTeX twice) and read the «.blg» log for problems with the «.bib» file.',
      'The example below uses «thebibliography» so it is self-contained; with a «.bib» file the fix is the same: the key in «\\cite» must match the key on the first line of the entry.',
    ],
    broken: r`\documentclass{article}
\begin{document}
Transformers were introduced by Vaswani et al.~\cite{vaswani2017}.
\begin{thebibliography}{9}
\bibitem{vaswani2017attention} A. Vaswani et al.
  Attention is all you need. NeurIPS, 2017.
\end{thebibliography}
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
Transformers were introduced by Vaswani et al.~\cite{vaswani2017attention}.
\begin{thebibliography}{9}
\bibitem{vaswani2017attention} A. Vaswani et al.
  Attention is all you need. NeurIPS, 2017.
\end{thebibliography}
\end{document}`,
    expect: 'Citation `vaswani2017\' on page 1 undefined',
    related: ['reference-undefined', 'file-not-found', 'too-many-unprocessed-floats'],
    faq: [
      {
        question: 'Why does my citation show as [?] in the PDF?',
        answer:
          '[?] is how LaTeX prints a citation it cannot resolve. Either the key does not match any bibliography entry, or BibTeX/Biber has not run since you added it. Fix the key, then compile LaTeX, BibTeX or Biber, and LaTeX twice.',
      },
      {
        question: 'How do I run BibTeX in the right order?',
        answer:
          'pdflatex main, bibtex main (or biber main for biblatex), pdflatex main, pdflatex main. latexmk -pdf main does this automatically, and online editors like Octree run it on every compile.',
      },
      {
        question: 'The key is correct but the citation is still undefined. Why?',
        answer:
          'Usually the .bib file is not being read: check the file name in «\\bibliography{}» or «\\addbibresource{}» (biblatex needs the .bib extension), and open the .blg file, which reports missing files and broken entries such as an unescaped & or a missing comma.',
      },
      {
        question: 'What does "There were undefined references" mean?',
        answer:
          'It is the summary at the end of the run. It appears whenever at least one «\\cite» or «\\ref» could not be resolved; scroll up for the individual "Citation ... undefined" or "Reference ... undefined" warnings.',
      },
    ],
  },
  {
    slug: 'reference-undefined',
    message: "LaTeX Warning: Reference `sec:result' on page 1 undefined",
    shortName: 'Reference undefined',
    title: 'LaTeX warning: Reference undefined',
    description:
      'Fix "LaTeX Warning: Reference undefined" and ?? in the PDF: a \\ref with no matching \\label, a typo, or a missing second compile. Plus duplicate labels.',
    keywords:
      'reference undefined, latex warning reference undefined, latex ref question marks, latex ?? reference, label multiply defined, there were multiply-defined labels, latex label not working, latex ref shows ??',
    severity: 'warning',
    group: 'warnings',
    summary: 'A «\\ref» or «\\eqref» has no matching «\\label», so the PDF shows ??.',
    quickAnswer:
      'LaTeX writes every «\\label» to the «.aux» file and reads it on the next run, so on the first run every «\\ref» prints ?? and warns. If the warning survives a second compile, the key in «\\ref» does not match any «\\label» exactly: look for a typo, a missing label, or a label in a file that is not included. Labels for figures and tables must come after «\\caption», otherwise they point to the section instead.',
    log: `LaTeX Warning: Reference ${q('sec:result')} on page 1 undefined on input line 4.

LaTeX Warning: There were undefined references.`,
    causes: [
      'Only one compile run: references always need two (online editors and latexmk rerun automatically).',
      'A typo or different spelling: «\\ref{sec:result}» against «\\label{sec:results}». Keys are case-sensitive.',
      'The «\\label» is missing, commented out, or in a chapter file that is excluded by «\\includeonly».',
    ],
    fix: [
      'Compile twice first. If the warning is still there, copy the key from the message and search for «\\label{» with that key; correct whichever side is wrong.',
      'For figures and tables, put «\\label» after «\\caption» (or inside it). A label placed before the caption silently refers to the current section, which is a different bug: no warning, but the wrong number.',
    ],
    broken: r`\documentclass{article}
\begin{document}
\section{Results}\label{sec:results}
The loss drops quickly (see Section~\ref{sec:result}).
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
\section{Results}\label{sec:results}
The loss drops quickly (see Section~\ref{sec:results}).
\end{document}`,
    expect: 'Reference `sec:result\' on page 1 undefined',
    variants: [
      {
        message: "LaTeX Warning: Label `fig:loss' multiply defined.",
        log: `LaTeX Warning: Label ${q('fig:loss')} multiply defined.

LaTeX Warning: There were multiply-defined labels.`,
        text: [
          'The same key was used by two «\\label» commands, so every «\\ref» to it points to whichever came last. It happens when a figure or equation is copied and pasted with its label, or when two chapter files use the same short labels. Search for the key and rename one of them; a prefix convention such as «fig:», «tab:», «eq:» and «sec:» plus a chapter name avoids the clash.',
          'A label inside an environment that is typeset twice (some «tabularx» or measurement-based packages) can also trigger it; move the label out of the measured content.',
        ],
      },
    ],
    related: ['citation-undefined', 'too-many-unprocessed-floats', 'hyperref-token-not-allowed'],
    faq: [
      {
        question: 'Why does \\ref show ?? in my PDF?',
        answer:
          'Either LaTeX has only run once (references resolve on the second run) or no «\\label» with exactly that key exists. Compile again; if ?? remains, fix the key so «\\ref» and «\\label» match.',
      },
      {
        question: 'Why does my figure reference show the section number?',
        answer:
          'The «\\label» comes before «\\caption». The figure number is set by «\\caption», so a label above it picks up the current section number. Move the label after the caption.',
      },
      {
        question: 'How do I fix "There were multiply-defined labels"?',
        answer:
          'Scroll up to the "Label ... multiply defined" warnings, search for each key and rename the duplicates. References to that key will otherwise point to the last label with that name.',
      },
    ],
  },
  {
    slug: 'overfull-hbox',
    message: 'Overfull \\hbox (51.91441pt too wide) in paragraph at lines 3--4',
    shortName: 'Overfull \\hbox',
    title: 'LaTeX warning: Overfull \\hbox (too wide) in paragraph',
    description:
      'Fix "Overfull \\hbox (too wide) in paragraph" and "Underfull \\hbox (badness 10000)": a line that sticks into the margin, or one stretched too far.',
    keywords:
      'overfull hbox, overfull hbox too wide in paragraph, underfull hbox badness 10000, latex text in margin, latex line too long, latex url overflow, sloppy latex, microtype overfull, underfull hbox badness 10000 in paragraph',
    severity: 'warning',
    group: 'warnings',
    summary: 'A line could not be broken and sticks out into the right margin.',
    quickAnswer:
      'LaTeX could not find a good place to break a line, so it set the line too wide and it sticks into the margin by the amount shown. The usual culprits are long words it cannot hyphenate: URLs, file paths, code in «\\texttt», long formulas. Let the text break (load «xurl» for URLs, rephrase, or add a hyphenation hint with «\\-»), move the long item onto its own line, or load «microtype», which removes many small overfull boxes. A few points too wide is invisible and can be ignored.',
    log: r`Overfull \hbox (51.91441pt too wide) in paragraph at lines 3--4
[]\OT1/cmr/m/n/10 Install the pack-age with \OT1/cmtt/m/n/10 pip install transformers-accelerate-datasets-evaluate
 []`,
    causes: [
      'A long unbreakable string: a URL, a file path, a command in «\\texttt» (typewriter text is never hyphenated), an email address or a DOI.',
      'Display or inline math that is wider than the line, or a table or image wider than «\\textwidth».',
      'Words LaTeX does not know how to hyphenate, typically in a language not loaded with babel or polyglossia.',
    ],
    fix: [
      'The log line shows the offending text with its font codes; the line numbers point to the paragraph. For URLs use «\\url{}» with «\\usepackage{xurl}», which allows breaks anywhere. For code, set it on its own line or in a «verbatim» or «lstlisting» block. For prose, «\\usepackage{microtype}» fixes many cases by itself.',
      'As a last resort, «\\sloppy» or the «sloppypar» environment lets LaTeX stretch the spaces instead of overflowing. For images and tables, scale them to «\\linewidth».',
    ],
    broken: r`\documentclass{article}
\begin{document}
Install the package with \texttt{pip install transformers-accelerate-datasets-evaluate}
and restart the kernel before you run the notebook.
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
Install the package with
\begin{center}
  \texttt{pip install transformers-accelerate-datasets-evaluate}
\end{center}
and restart the kernel before you run the notebook.
\end{document}`,
    expect: 'Overfull \\hbox',
    variants: [
      {
        message: 'Underfull \\hbox (badness 10000) in paragraph at lines 3--5',
        log: r`Underfull \hbox (badness 10000) in paragraph at lines 3--5`,
        text: [
          'The opposite problem: LaTeX had to stretch the spaces in a line far beyond what looks good. Badness 10000 is the maximum. The most common cause is «\\\\» at the end of a paragraph or used to make vertical space, or «\\\\» right after a blank line; use a blank line for a new paragraph and «\\vspace» or «\\bigskip» for space instead. In narrow columns and table cells («p{2cm}»), use «\\raggedright» so lines do not have to be justified.',
          'Underfull boxes do not change the content and are usually only cosmetic. Fix the ones you can see as gappy lines in the PDF and ignore the rest.',
        ],
      },
    ],
    related: ['hyperref-token-not-allowed', 'too-many-unprocessed-floats', 'no-line-here-to-end'],
    faq: [
      {
        question: 'Can I ignore Overfull \\hbox warnings?',
        answer:
          'Small ones, yes: anything under a couple of points is invisible. Large ones mean text runs into the margin and may be cut off when printed, so look at the page in question and fix those.',
      },
      {
        question: 'How do I stop URLs going into the margin?',
        answer:
          'Write them with «\\url{...}» and load «\\usepackage{xurl}» (or «\\usepackage[hyphens]{url}» before hyperref). Both let LaTeX break the URL at more places, including after slashes and letters.',
      },
      {
        question: 'What does "Underfull \\hbox (badness 10000)" mean?',
        answer:
          'A line was stretched as far as possible because there was not enough text to fill it. It is usually caused by «\\\\» used to end a paragraph or to make space; replace it with a blank line or «\\vspace».',
      },
      {
        question: 'How do I find where the overfull box is in the PDF?',
        answer:
          'The warning gives the source line numbers ("at lines 3--4"). Adding «\\overfullrule=5pt» to the preamble also draws a black bar next to every overfull line in the PDF.',
      },
    ],
  },
  {
    slug: 'too-many-unprocessed-floats',
    message: 'LaTeX Error: Too many unprocessed floats.',
    shortName: 'Too many unprocessed floats',
    title: 'LaTeX error: Too many unprocessed floats',
    description:
      'Fix "Too many unprocessed floats" in LaTeX: figures and tables pile up because one cannot be placed. Relax the placement options or add \\clearpage.',
    keywords:
      'too many unprocessed floats, latex too many unprocessed floats, float(s) lost, latex float lost, latex figures pile up, clearpage figures, placeins floatbarrier, morefloats, extrafloats',
    severity: 'error',
    group: 'warnings',
    summary: 'Figures or tables pile up behind one that LaTeX cannot place, until it runs out of float slots.',
    quickAnswer:
      'LaTeX keeps figures and tables in order: if one float cannot be placed, every later one of the same type waits behind it. When too many are waiting at once, LaTeX runs out of storage and stops. The blocker is usually a float with restrictive options («[h]», «[t]», «[p]» alone) or one too large for the allowed area. Give floats flexible placement «[htbp]», and add «\\clearpage» (or «\\FloatBarrier» from «placeins») after a long run of figures so the queue is flushed.',
    log: r`! LaTeX Error: Too many unprocessed floats.

See the LaTeX manual or LaTeX Companion for explanation.
Type  H <return>  for immediate help.
 ...

l.19 \ifnum\fig<60 \repeat`,
    causes: [
      'A float that may only go somewhere it cannot: «[p]» for a small figure that never fills a float page, «[t]» or «[b]» for a figure taller than the top or bottom area, «[h]» when there is no room here.',
      'Many figures or tables in a row with little text between them, such as an appendix of plots, so pages never break to give LaTeX places to put them.',
      'Floats inside a part of the document that never ends a page, such as a very long single paragraph.',
    ],
    fix: [
      'Use «[htbp]» (or omit the option) so each float has several places it may go, and make sure large figures are smaller than about 0.7 of the text height or are allowed on their own page with «p».',
      'After a long series of figures or tables, add «\\clearpage», which places all waiting floats on pages of their own, or load «placeins» and use «\\FloatBarrier». LaTeX already provides more float storage than in older versions; «\\extrafloats{100}» adds more but only postpones a real blockage.',
    ],
    broken: r`\documentclass{article}
\begin{document}
% A small figure that may only go on a page of floats
\begin{figure}[p]
  \centering
  \rule{6cm}{1cm}
  \caption{Overview.}
\end{figure}
% ...and many figures after it, which must wait behind it
\newcount\fig
\loop
  \begin{figure}[t]
    \centering
    \rule{6cm}{1cm}
    \caption{Result \the\fig.}
  \end{figure}
  Paragraph about result \the\fig.\par
  \advance\fig by 1
\ifnum\fig<60 \repeat
\end{document}`,
    fixed: r`\documentclass{article}
\begin{document}
\begin{figure}[htbp]
  \centering
  \rule{6cm}{1cm}
  \caption{Overview.}
\end{figure}
\newcount\fig
\loop
  \begin{figure}[htbp]
    \centering
    \rule{6cm}{1cm}
    \caption{Result \the\fig.}
  \end{figure}
  Paragraph about result \the\fig.\par
  \advance\fig by 1
\ifnum\fig<60 \repeat
\end{document}`,
    expect: 'Too many unprocessed floats',
    variants: [
      {
        message: 'LaTeX Error: Float(s) lost.',
        log: r`! LaTeX Error: Float(s) lost.`,
        text: [
          'A float or a «\\marginpar» was created somewhere LaTeX cannot output it, so it disappeared. Typical causes are a «\\marginpar» or «\\todo» (todonotes) inside a figure, table or footnote, and a figure or table placed inside a box or another float. The error is reported at the end of the document, so search for margin notes and nested floats; use «\\todo[inline]» inside floats, and «\\captionof» from the caption package instead of a figure environment inside a minipage.',
        ],
      },
    ],
    related: ['not-in-outer-par-mode', 'reference-undefined', 'overfull-hbox'],
    faq: [
      {
        question: 'How do I force LaTeX to place all pending figures?',
        answer:
          '«\\clearpage» ends the page and puts every waiting float on following pages. «\\FloatBarrier» from the placeins package does the same without forcing a page break when there are none waiting.',
      },
      {
        question: 'Should I use [H] from the float package to avoid this?',
        answer:
          '«[H]» places the figure exactly here, so it never queues, which avoids the error. The cost is large white gaps when the figure does not fit on the current page; «[htbp]» with an occasional «\\clearpage» usually looks better.',
      },
      {
        question: 'Does the morefloats package still help?',
        answer:
          'Current LaTeX already has more float storage and provides «\\extrafloats{n}» to add more, which is what morefloats did. It only helps when you really have many floats waiting legitimately; if one float is blocked, the queue grows until it overflows again.',
      },
    ],
  },
]

export const getLatexError = (slug: string): LatexErrorEntry | undefined =>
  latexErrors.find((entry) => entry.slug === slug)

/** Removes the «code» markup, for meta tags and JSON-LD. */
export const stripCodeMarkup = (text: string): string => text.replace(/[«»]/g, '')

export const latexErrorAppUrl = (slug: string): string =>
  `https://app.useoctree.com/?utm_source=www&utm_medium=learn&utm_campaign=latex-errors&utm_content=${slug}`
