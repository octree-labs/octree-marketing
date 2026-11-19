import type { Metadata } from 'next/types'
import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const page = {
  slug: 'document-classes',
  title: 'LaTeX Document Classes: article, report, book and Options',
  seoTitle: 'LaTeX Document Classes: article, report, book',
  description:
    'Choose a LaTeX document class, compare article, report and book, set paper and font options, and fix class errors with complete examples.',
  keywords:
    'latex document classes, documentclass, article report book, latex class options, twoside',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-19'
const faq: FaqItem[] = [
  {
    question: 'What is the difference between article, report, and book?',
    answer:
      'article uses sections without chapters. report adds chapters and normally a separate title page. book adds front, main, and back matter, defaults to two-sided layout, and normally starts chapters on right-hand pages.',
  },
  {
    question: 'Can I use two document classes in one file?',
    answer:
      'No. Select one document class and add packages for extra functionality. If a publisher provides a class, follow its template rather than trying to combine it with article or report.',
  },
  {
    question: 'Why does 14pt not work with article?',
    answer:
      'The standard article class supports 10pt, 11pt, and 12pt. An unsupported size can produce an unused-option warning. Choose a class that supports the requested size, such as extarticle, and check the resulting layout.',
  },
  {
    question: 'Does twoside make the printer print double-sided?',
    answer:
      'No. twoside changes the document layout for odd and even pages. Duplex printing is a separate printer setting. Inspect inner margins and chapter openings before printing and binding.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'What the document class controls',
    paragraphs: [
      'A document class defines the broad structure and default appearance of a LaTeX document. It supplies sectioning commands, title formatting, page styles, numbering conventions, and default dimensions. Packages then add features or change selected settings. You load exactly one class with \\documentclass; loading several classes is not a way to combine their features.',
      'The class declaration comes before package loading and before \\begin{document}. Put optional settings in square brackets, separated by commas, and the class name in braces without the .cls extension. The document environment contains the material to typeset. Settings and definitions between the declaration and that environment form the preamble.',
      'Start with the simplest class that supports your structure. A ten-page report can be an article if sections are sufficient; page count does not determine the class. Conversely, a short sample of a thesis may need report because its chapter headings, figure numbers, and contents entries must match the eventual long document.',
    ],
    code: '\\documentclass[12pt,a4paper]{article}\n\\title{A Short Research Note}\n\\author{Ada Lovelace}\n\\date{}\n\\begin{document}\n\\maketitle\n\\begin{abstract}\nA brief summary of the research question and result.\n\\end{abstract}\n\\section{Introduction}\nAn article begins its main hierarchy with sections.\n\\subsection{Scope}\nThis example needs no additional packages.\n\\end{document}',
  },
  {
    title: 'Compare article, report, book, and specialist classes',
    paragraphs: [
      'The standard article class has sections but no \\chapter command. Its title normally shares a page with the text, and it supplies an abstract environment. This makes it a useful starting point for assignments, short technical reports, and papers without a required publisher template. Its default layout is one-sided.',
      'The standard report class adds chapters and normally gives the title its own page. It also supplies an abstract environment. Chapters may begin on the next available page by default, rather than always on a right-hand page. Use it for structured reports or a thesis when your institution does not require a particular class.',
      "The standard book class is two-sided by default and normally opens chapters on right-hand pages. It supplies \\frontmatter, \\mainmatter, and \\backmatter for book divisions. It does not supply the standard abstract environment: use an appropriate chapter heading if you need an abstract, or follow the publisher's template.",
      'Other classes solve different problems. beamer builds slides using frames; letter provides letter-specific structure; standalone can create cropped figures. These are not interchangeable skins for an article. A conference class such as IEEEtran may impose its own title, author, and bibliography interfaces, so read the supplied sample before migrating content.',
    ],
  },
  {
    title: 'Set font size, paper size, and columns deliberately',
    paragraphs: [
      'The standard article, report, and book classes support 10pt, 11pt, and 12pt base font sizes, with 10pt the default. The option changes the base size and related dimensions, not every printed character to an identical size. Headings, footnotes, and captions still use their own size rules.',
      'Use a4paper or letterpaper to select the intended sheet size explicitly. The standard classes default to letterpaper, so a document intended for A4 should say so. Paper size and margins are separate decisions: the geometry package is a convenient way to request exact margins rather than changing internal lengths by hand.',
      'twocolumn requests two-column text in the standard classes. It affects line width, float behavior, and the space available for equations; it does not turn every object into a full-width object. Test a representative equation and table before committing to the layout. For publisher submissions, let the class handle columns rather than reproducing its appearance manually.',
      'Other useful options include titlepage, notitlepage, draft, and final. draft marks overfull text lines with black bars and can make packages such as graphicx substitute boxes for images. Remove it for delivery. An option can be recognized by a package even if the class itself does not use it.',
    ],
    code: '\\documentclass[11pt,a4paper,twocolumn]{article}\n\\usepackage[margin=25mm]{geometry}\n\\title{A Two-Column Note}\n\\author{Ada Lovelace}\n\\date{}\n\\begin{document}\n\\maketitle\n\\section{Results}\nShort paragraphs fit within the narrower text column.\n\\[\n  E = mc^2\n\\]\n\\end{document}',
  },
  {
    title: 'Understand oneside, twoside, and blank pages',
    paragraphs: [
      'oneside uses the same layout on successive pages. twoside distinguishes odd right-hand pages from even left-hand pages, allowing mirrored margins and different running headers. It does not instruct a printer to use duplex mode. You still choose double-sided printing in the print dialog.',
      "Do not assume twoside automatically creates a generous binding margin. The standard class layout and a geometry configuration can have different inner-to-outer margin ratios. If binding needs extra space, request inner and outer margins explicitly, and consider geometry's bindingoffset when your printing requirements call for it.",
      'openright and openany control chapter openings in chapter-based standard classes. book defaults to openright; report defaults to openany. A blank page before a new book chapter is often intentional. Choose openany if chapters may start on either side, rather than deleting blank pages from the finished PDF.',
      "Inspect facing pages, not just page one. Chapter-opening pages often use a different page style from ordinary pages, so a header missing on a chapter's first page may be correct. For an online-only document, oneside can avoid the alternating text-block position that readers notice in single-page PDF view.",
    ],
    code: '\\documentclass[12pt,a4paper,twoside,openany]{report}\n\\usepackage[inner=30mm,outer=22mm,top=25mm,bottom=25mm]{geometry}\n\\begin{document}\n\\chapter{Introduction}\nThis is an odd page with the inner margin on the left.\n\\newpage\nThis is an even page with the inner margin on the right.\n\\chapter{Methods}\nThis chapter starts on the next available page.\n\\end{document}',
  },
  {
    title: 'Use front matter and chapter structure in a book',
    paragraphs: [
      'In book, \\frontmatter switches to lowercase Roman page numbers and suppresses chapter numbering while retaining chapter headings. \\mainmatter starts Arabic page numbering and numbered chapters. \\backmatter suppresses chapter numbering again without restarting the page counter. These commands are not standard article or report features.',
      'Compile the example twice so the table of contents receives its entries and page numbers. A larger book may need another pass after pagination changes. Check the title of each division, the printed page numbers, and the contents together; a successful compiler run alone does not establish that the structure matches your submission requirements.',
    ],
    code: '\\documentclass[openany]{book}\n\\begin{document}\n\\frontmatter\n\\tableofcontents\n\\chapter{Preface}\nWhy this book was written.\n\\mainmatter\n\\chapter{Foundations}\n\\section{First principles}\nThe main argument begins here.\n\\backmatter\n\\chapter{Afterword}\nClosing observations.\n\\end{document}',
  },
  {
    title: 'When to choose KOMA-Script or memoir',
    paragraphs: [
      'KOMA-Script offers scrartcl, scrreprt, and scrbook as alternatives with extensive typography and layout controls. Its option syntax includes settings such as fontsize=11pt and parskip=half. memoir provides a broad book-oriented feature set, including chapter styles and page-layout commands. Both can reduce the need for separate customization packages.',
      'Treat a class change as a migration, not a guaranteed drop-in replacement. Check package compatibility, headings, title pages, captions, and the table of contents. Avoid loading a package merely because an old template used it: the new class may already provide that feature or recommend a different interface.',
      'Use the required institutional or publisher class when one exists. Keep its .cls file and required supporting files with the project, subject to their license. Do not edit the installed class to make a local change; use documented options or a separate customization file so updates remain manageable.',
    ],
  },
  {
    title: 'Diagnose class errors before adjusting the layout',
    paragraphs: [
      'An Unused global option warning means no loaded class or package consumed the option. Check spelling first: a4 is not the standard a4paper option, and article does not support 14pt. Use a suitable extended-size class if that size is genuinely required, rather than assuming LaTeX accepted the request.',
      'If \\chapter is undefined, verify that the selected class supports chapters. If a .cls file is missing, check the class name and project files before installing unrelated packages. When abstract is undefined in book, choose a chapter-based abstract or another appropriate class instead of copying an environment definition blindly.',
      'After any class change, rebuild and inspect a representative title page, section, equation, figure, table, and bibliography. Check warnings as well as errors. A document can compile while using an ignored option or producing unexpected blank pages, so compare the PDF against the actual formatting requirements.',
    ],
  },
]

export default async function LearnPage() {
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
          <h1>{page.title}</h1>
          <p className="lead">
            {
              'Choose article for a paper without chapters, report for a longer document with chapters, and book for a book with front matter and two-sided layout. Put \\documentclass[12pt,a4paper]{article} at the top of the file. If a publisher or university supplies a template, use its class instead of choosing your own.'
            }
          </p>
          {sections.map(({ title, paragraphs, code }) => (
            <section key={title}>
              <h2>{title}</h2>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {code && (
                <pre>
                  <code>{code}</code>
                </pre>
              )}
            </section>
          ))}
          <h2>Frequently asked questions</h2>
          {faq.map(({ question, answer }) => (
            <section key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </section>
          ))}
          <h2>Related guides</h2>
          <ul>
            <li>
              <Link href="/learn/sections">Sections and chapters</Link>
            </li>
            <li>
              <Link href="/learn/page-size-margins">Page size and margins</Link>
            </li>
            <li>
              <Link href="/learn/page-numbering">Page numbering</Link>
            </li>
          </ul>
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Test the example in your own document</h2>
            <p className="text-muted-foreground mb-4">
              Open a small project in Octree, paste a complete example, and compile it before moving
              the changes into your main document. Check the PDF as well as the error log.
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
