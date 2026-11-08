import type { Metadata } from 'next/types'

import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { CodeBlock, CodeTabs } from '@/components/Developers/code-block'
import { generateBreadcrumbSchema } from '@/utilities/generateBreadcrumbs'
import { getServerSideURL } from '@/utilities/getURL'
import { learnOgImagePath, generateFaqSchema, type FaqItem } from '@/utilities/learnMetadata'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import * as s from './samples'

export const dynamic = 'force-static'
export const revalidate = 3600

const PATH = '/developers'
const TITLE = 'LaTeX Compile API & MCP Server for AI Agents'
const DESCRIPTION =
  'Compile LaTeX to PDF from any AI agent or script: one API key, a REST API and an MCP server for Claude Code and Cursor. Full TeX Live, PDF in seconds.'
const KEYWORDS =
  'latex compile api, latex to pdf api, latex mcp server, compile latex programmatically, latex api, latex rest api, mcp latex, claude code latex, latex compiler api, pdflatex api'
const LAST_UPDATED = '2026-11-08'

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Developers', url: PATH },
])

const faq: FaqItem[] = [
  {
    question: 'Is the Octree LaTeX compile API free?',
    answer:
      'Yes. Every Octree account can create API keys, and the free plan includes 30 compiles per day through the REST API and the MCP server. Octree Pro raises the limit to 1,000 compiles per day.',
  },
  {
    question: 'Which LaTeX packages are installed?',
    answer:
      'The API runs the same compiler as the Octree editor at app.useoctree.com: a full TeX Live installation driven by latexmk, so packages such as amsmath, TikZ, pgfplots, biblatex, beamer and the common thesis and resume classes are already there. pdfLaTeX is the default and the engine that v1 supports; other engines may not be available yet.',
  },
  {
    question: 'Can I compile multi-file projects and images?',
    answer:
      'Multi-file projects, yes: send a files array of { path, content } objects plus the name of the main file, and \\input, \\include and .bib files resolve as they would on disk. In v1 every file is text; binary assets such as PNG or PDF images are coming. A request can carry up to 50 files and 2 MB of source.',
  },
  {
    question: 'What are the rate limits?',
    answer:
      'Limits are per account per day: 30 compiles on the free plan and 1,000 on Pro. When you run out, the API answers HTTP 429 with error quota_exceeded, the limit, how many you have used, when the count resets and a link to upgrade. GET /api/v1/me and the get_quota MCP tool show your current usage.',
  },
  {
    question: 'Do you store the documents I compile through the API?',
    answer:
      'No. On the API and MCP path the LaTeX source and the PDF are not stored after the response is sent. Projects you create in the Octree editor are saved to your account as usual; that is separate from the API.',
  },
  {
    question: 'How are API keys secured?',
    answer:
      'Keys start with oct_live_ and are shown once, when you create them. Octree keeps only a hash of each key, so a key cannot be read back, only revoked. You can have up to 5 keys per account and revoke any of them in Settings.',
  },
  {
    question: 'Should my agent use the REST API or the MCP server?',
    answer:
      'Use the MCP server when the agent is an MCP client (Claude Code, Cursor, Windsurf and others): it gets compile_latex, check_latex and get_quota as tools with no glue code. Use the REST API from scripts, CI jobs, backends and agent frameworks that call HTTP directly. Both use the same API key and the same daily limit.',
  },
]

const toc = [
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'rest-api', label: 'REST API reference' },
  { id: 'errors', label: 'Errors and status codes' },
  { id: 'limits', label: 'Limits and keys' },
  { id: 'mcp', label: 'MCP server reference' },
  { id: 'agents', label: 'How an agent should use it' },
  { id: 'faq', label: 'FAQ' },
]

const articleSchema = () => {
  const siteUrl = getServerSideURL()
  const url = `${siteUrl}${PATH}`
  const organization = {
    '@type': 'Organization',
    name: 'Octree',
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.svg` },
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: TITLE,
    description: DESCRIPTION,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${siteUrl}${learnOgImagePath(TITLE, 'Developers')}`,
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
    inLanguage: 'en',
    author: organization,
    publisher: organization,
  }
}

/** Inline code that may wrap anywhere, so long URLs do not widen the page on phones. */
const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="[overflow-wrap:anywhere]">{children}</code>
)

export default function DevelopersPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faq)) }}
      />

      <div className="container">
        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          {/* ───────────────────────────── Hero ───────────────────────────── */}
          <p className="not-prose mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            Octree for agents
          </p>
          <h1>
            Compile LaTeX from any AI agent
            <span className="mt-2 block text-2xl font-normal text-muted-foreground">
              The LaTeX compile API and MCP server
            </span>
          </h1>
          <p className="lead">
            One API key, two ways in: a REST endpoint that turns LaTeX into a PDF, and an MCP server
            that gives Claude Code, Cursor and other agents a <Code>compile_latex</Code> tool. Send
            the source, get the PDF back in seconds, or a list of errors with file and line when it
            does not compile. It is the same compiler (TeX Live, latexmk) that runs the{' '}
            <a href="https://app.useoctree.com">Octree editor</a>, so there is nothing to install
            and every package is already there.
          </p>
          <div className="not-prose flex flex-wrap gap-3">
            <Link
              href={s.API_KEYS_URL}
              className={buttonVariants()}
              data-cta-location="developers_hero"
            >
              Get an API key
            </Link>
            <Link href="#mcp" className={buttonVariants({ variant: 'outline' })}>
              Open the MCP docs
            </Link>
          </div>

          <ul>
            <li>
              <strong>REST:</strong> <Code>POST {s.COMPILE_URL}</Code>
            </li>
            <li>
              <strong>MCP:</strong> <Code>{s.MCP_URL}</Code> (Streamable HTTP)
            </li>
            <li>
              <strong>Auth:</strong> <Code>Authorization: Bearer oct_live_…</Code>
            </li>
            <li>
              <strong>Free:</strong> 30 compiles a day; Pro: 1,000 a day
            </li>
          </ul>

          <nav
            aria-label="On this page"
            className="not-prose my-8 rounded-lg border border-border p-4"
          >
            <p className="mb-2 text-sm font-semibold">On this page</p>
            <ol className="grid gap-1 text-sm sm:grid-cols-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* ───────────────────────────── Quickstart ───────────────────────────── */}
          <h2 id="quickstart" className="scroll-mt-24">
            Quickstart
          </h2>
          <p>
            Create a key under <a href={s.API_KEYS_URL}>Settings → API keys</a> in the Octree app.
            It starts with <Code>oct_live_</Code> and is shown once, so copy it somewhere safe. Then
            pick your client:
          </p>
          <CodeTabs
            ariaLabel="Quickstart"
            tabs={[
              {
                label: 'Claude Code',
                note: 'Add Octree as a remote MCP server, then ask Claude to compile main.tex.',
                code: `${s.claudeCode}\n\n# then, in Claude Code:\n# > ${s.claudeCodePrompt}`,
              },
              {
                label: 'curl',
                note: 'Returns JSON with the PDF base64-encoded, or a list of errors.',
                code: s.curlJson,
              },
              {
                label: 'curl (raw PDF)',
                note: 'Set "response": "pdf" (or send Accept: application/pdf) to get the PDF bytes directly.',
                code: s.curlPdf,
              },
              { label: 'Python', note: 'Compiles main.tex and saves out.pdf.', code: s.python },
              { label: 'Node', note: 'Node 18+ (built-in fetch), as an ES module.', code: s.node },
            ]}
          />

          <h3>Cursor, Windsurf and any other MCP client</h3>
          <p>
            Clients that read an <Code>mcpServers</Code> config take a remote server with a URL and
            headers. In Cursor this goes in <Code>~/.cursor/mcp.json</Code> (or{' '}
            <Code>.cursor/mcp.json</Code> in a project); Windsurf and other clients use the same
            shape in their own MCP config file, some under the name <Code>serverUrl</Code> instead
            of <Code>url</Code>.
          </p>
          <CodeBlock title="mcp.json" code={s.mcpConfig} />
          <p>
            Keep the key out of shared repositories: put it in your user-level config, or use your
            client&rsquo;s environment-variable substitution if it has one.
          </p>

          {/* ───────────────────────────── REST ───────────────────────────── */}
          <h2 id="rest-api" className="scroll-mt-24">
            REST API Reference
          </h2>
          <p>
            Base URL <Code>{s.API_BASE}</Code>. Every request needs{' '}
            <Code>Authorization: Bearer oct_live_…</Code>. Request bodies are JSON.
          </p>

          <h3 id="compile">POST /api/v1/compile</h3>
          <p>Compile LaTeX to PDF. Send either a single document or a set of files:</p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Code>latex</Code>
                  </td>
                  <td>string</td>
                  <td>
                    A complete single-file document. Use this or <Code>files</Code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>files</Code>
                  </td>
                  <td>
                    <Code>{'{ path, content }[]'}</Code>
                  </td>
                  <td>
                    Project files with relative paths, e.g. <Code>sections/intro.tex</Code>,{' '}
                    <Code>refs.bib</Code>. Text files in v1.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>main</Code>
                  </td>
                  <td>string</td>
                  <td>
                    Path of the file to compile when you send <Code>files</Code>, e.g.{' '}
                    <Code>main.tex</Code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>engine</Code>
                  </td>
                  <td>string, optional</td>
                  <td>
                    <Code>pdflatex</Code> (default). Other engines may be unsupported in v1.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>response</Code>
                  </td>
                  <td>
                    <Code>&quot;json&quot;</Code> | <Code>&quot;pdf&quot;</Code>
                  </td>
                  <td>
                    <Code>json</Code> (default) returns the object below; <Code>pdf</Code> returns
                    the raw PDF. <Code>Accept: application/pdf</Code> does the same as{' '}
                    <Code>pdf</Code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <CodeTabs
            ariaLabel="Request body"
            tabs={[
              { label: 'Single file', code: s.requestSingle },
              { label: 'Multi-file', code: s.requestFiles },
            ]}
          />

          <p>
            A document that compiles returns <Code>ok: true</Code> with the PDF base64-encoded. A
            document with LaTeX errors is still a successful request: HTTP 200 with{' '}
            <Code>ok: false</Code> and the errors.
          </p>
          <CodeTabs
            ariaLabel="Response"
            tabs={[
              { label: '200 compiled', code: s.responseOk },
              { label: '200 LaTeX error', code: s.responseLatexError },
              { label: '429 quota', code: s.responseQuota },
            ]}
          />
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Code>ok</Code>
                  </td>
                  <td>
                    <Code>true</Code> if a PDF was produced.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>pdf_base64</Code>
                  </td>
                  <td>The PDF, base64-encoded (success only).</td>
                </tr>
                <tr>
                  <td>
                    <Code>pages</Code>
                  </td>
                  <td>Page count, when known.</td>
                </tr>
                <tr>
                  <td>
                    <Code>duration_ms</Code>
                  </td>
                  <td>Compile time in milliseconds.</td>
                </tr>
                <tr>
                  <td>
                    <Code>warnings</Code>
                  </td>
                  <td>LaTeX warnings from a successful compile.</td>
                </tr>
                <tr>
                  <td>
                    <Code>errors</Code>
                  </td>
                  <td>
                    <Code>{'{ file, line, message, kind }[]'}</Code> when <Code>ok</Code> is false.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>log_tail</Code>
                  </td>
                  <td>The last lines of the LaTeX log.</td>
                </tr>
                <tr>
                  <td>
                    <Code>suggestion</Code>
                  </td>
                  <td>Optional hint for fixing the first error.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <Code>kind</Code> is one of <Code>missing_package</Code>,{' '}
            <Code>undefined_control_sequence</Code>, <Code>missing_dollar</Code>,{' '}
            <Code>missing_brace</Code>, <Code>latex_error</Code> or <Code>timeout</Code>, so an
            agent can branch on the error type without parsing the log.
          </p>

          <h3 id="me">GET /api/v1/me</h3>
          <p>Your plan and today&rsquo;s usage. Useful as a key check before a batch job.</p>
          <CodeBlock title="request" code={s.meRequest} />
          <CodeBlock title="200" code={s.meResponse} />

          <h3 id="openapi">GET /api/v1/openapi.json</h3>
          <p>
            The OpenAPI description of the API, at{' '}
            <a href={`${s.API_BASE}/api/v1/openapi.json`}>{s.API_BASE}/api/v1/openapi.json</a>. Load
            it into Postman or an agent framework that builds tools from OpenAPI.
          </p>

          <h3 id="errors" className="scroll-mt-24">
            Errors and status codes
          </h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>200</td>
                  <td>
                    Request handled. Check <Code>ok</Code>: the document compiled, or it has LaTeX
                    errors listed in <Code>errors</Code>.
                  </td>
                </tr>
                <tr>
                  <td>401</td>
                  <td>Missing, invalid or revoked API key.</td>
                </tr>
                <tr>
                  <td>413</td>
                  <td>Source too large: over 2 MB or more than 50 files.</td>
                </tr>
                <tr>
                  <td>429</td>
                  <td>
                    Daily quota used up. Body: <Code>error: &quot;quota_exceeded&quot;</Code>,{' '}
                    <Code>limit</Code>, <Code>used</Code>, <Code>resets_at</Code>,{' '}
                    <Code>upgrade_url</Code>.
                  </td>
                </tr>
                <tr>
                  <td>503</td>
                  <td>The compiler is temporarily unavailable. Retry with backoff.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="limits" className="scroll-mt-24">
            Limits and keys
          </h3>
          <ul>
            <li>
              <strong>Free:</strong> 30 compiles per day. <strong>Pro:</strong> 1,000 compiles per
              day. REST and MCP share the same count.
            </li>
            <li>
              <strong>Request size:</strong> up to 2 MB of source and 50 files.
            </li>
            <li>
              <strong>Keys:</strong> <Code>oct_live_…</Code>, up to 5 per account, shown once,
              stored hashed, revocable at any time in <a href={s.API_KEYS_URL}>Settings</a>.
            </li>
          </ul>

          {/* ───────────────────────────── MCP ───────────────────────────── */}
          <h2 id="mcp" className="scroll-mt-24">
            MCP Server Reference
          </h2>
          <p>
            The Octree LaTeX MCP server lives at <Code>{s.MCP_URL}</Code>. It speaks the Streamable
            HTTP transport and is stateless, so there is no session to set up or keep alive.
            Authenticate with the same API key in an <Code>Authorization: Bearer oct_live_…</Code>{' '}
            header.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Input</th>
                  <th>Returns</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Code>compile_latex</Code>
                  </td>
                  <td>
                    <Code>latex</Code>, or <Code>files</Code> + <Code>main</Code>
                  </td>
                  <td>
                    A short summary (pages, time, warnings or errors) and the PDF as a resource.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>check_latex</Code>
                  </td>
                  <td>
                    <Code>latex</Code>, or <Code>files</Code> + <Code>main</Code>
                  </td>
                  <td>
                    Errors only, with file, line and kind. The fast loop for an agent fixing a
                    document.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>get_quota</Code>
                  </td>
                  <td>none</td>
                  <td>Plan, daily limit and compiles used today.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="agents" className="scroll-mt-24">
            How an agent should use it
          </h3>
          <p>
            Write the <Code>.tex</Code> files first. Call <Code>check_latex</Code> and fix what it
            reports, using the file, line and <Code>kind</Code> of each error, until it comes back
            clean. Then call <Code>compile_latex</Code> once to get the PDF. Each check returns only
            the errors, not a PDF, so the fix loop stays small, and the agent never has to read a
            raw LaTeX log. If you write instructions for your agent (a <Code>CLAUDE.md</Code>,
            Cursor rules or a system prompt), this one line is enough:
          </p>
          <CodeBlock
            title="agent instructions"
            code="To build LaTeX, use the octree MCP tools: run check_latex until there are no errors, then compile_latex once to get the PDF."
          />

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2 id="faq" className="scroll-mt-24">
            Frequently Asked Questions
          </h2>
          {faq.map((item) => (
            <React.Fragment key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </React.Fragment>
          ))}

          {/* ───────────────────────────── Next steps ───────────────────────────── */}
          <h2>Learn More</h2>
          <ul>
            <li>
              <Link href="/learn/latex">Learn LaTeX</Link> – The basics your agent&rsquo;s documents
              are built on
            </li>
            <li>
              <Link href="/learn/tikz">TikZ</Link> and <Link href="/learn/pgfplots">PGFPlots</Link>{' '}
              – Diagrams and plots that compile through the API like any other package
            </li>
            <li>
              <Link href="/learn/bibliography-examples">Bibliography examples</Link> – Send a{' '}
              <Code>.bib</Code> file in <Code>files</Code> and cite as usual
            </li>
            <li>
              <a href="https://app.useoctree.com">Octree editor</a> – The same compiler with an AI
              editor, PDF preview and saved projects
            </li>
          </ul>

          {/* ───────────────────────────── CTA ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Give your agent a LaTeX compiler</h3>
            <p className="text-muted-foreground mb-4">
              Create a free API key, add one line to Claude Code or Cursor, and your agent can turn
              LaTeX into a PDF: 30 compiles a day free, 1,000 on Pro.
            </p>
            <Link
              href={s.API_KEYS_URL}
              className={buttonVariants()}
              data-cta-location="developers_footer"
            >
              Get an API key →
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  const image = {
    url: learnOgImagePath(TITLE, 'Developers'),
    width: 1200,
    height: 630,
    alt: TITLE,
  }

  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: KEYWORDS,
    alternates: { canonical: PATH },
    openGraph: mergeOpenGraph({
      title: TITLE,
      description: DESCRIPTION,
      type: 'article',
      url: PATH,
      images: [image],
    }),
    twitter: {
      card: 'summary_large_image',
      title: TITLE,
      description: DESCRIPTION,
      images: [image],
    },
  }
}
