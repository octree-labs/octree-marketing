import type { Metadata } from 'next/types'

import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { CodeBlock, CodeTabs } from '@/components/Developers/code-block'
import { ConnectAgent } from '@/components/Developers/connect-agent'
import { generateBreadcrumbSchema } from '@/utilities/generateBreadcrumbs'
import { getServerSideURL } from '@/utilities/getURL'
import { learnOgImagePath, generateFaqSchema, type FaqItem } from '@/utilities/learnMetadata'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import {
  CONNECTED_APPS_URL,
  DEVICE_CODE_URL,
  DEVICE_TOKEN_URL,
  MCP_REGISTRY_NAME,
  OAUTH_AUTHORIZATION_SERVER_URL,
  OAUTH_PROTECTED_RESOURCE_URL,
  agentsMdSnippet,
  deviceFlowCurl,
  deviceFlowPython,
} from '@/utilities/mcpInstall'

import * as s from './samples'

export const dynamic = 'force-static'
export const revalidate = 3600

const PATH = '/developers'
const TITLE = 'LaTeX MCP Server & Compile API for AI Agents'
const DESCRIPTION =
  'Connect Claude, Claude Code, Cursor, VS Code or Codex to a LaTeX compiler in one step: an MCP server and REST API that turn LaTeX into PDF with full TeX Live.'
const KEYWORDS =
  'latex mcp server, claude code latex, cursor latex mcp, latex compile api, latex to pdf api, latex mcp server, compile latex programmatically, latex api, latex rest api, mcp latex, claude code latex, latex compiler api, pdflatex api'
const LAST_UPDATED = '2026-11-25'

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Developers', url: PATH },
])

const faq: FaqItem[] = [
  {
    question: 'How do I compile LaTeX from Claude Code?',
    answer:
      'Run claude mcp add --transport http octree https://app.useoctree.com/api/mcp, then type /mcp in Claude Code, pick octree and choose Authenticate to sign in to Octree in the browser. No API key is needed; if you prefer one, add --header "Authorization: Bearer YOUR_OCTREE_API_KEY" to the command instead. Claude Code then has the compile_latex, check_latex and get_quota tools: ask it to write your document and compile it with Octree, and it checks the source, fixes the reported errors and returns the PDF.',
  },
  {
    question: 'How do I add the Octree MCP server to Cursor or VS Code?',
    answer:
      "In Cursor, press Add to Cursor on this page, then click Needs login next to Octree in Cursor's MCP settings to sign in in the browser. In VS Code, run the code --add-mcp command shown above or add the .vscode/mcp.json snippet; VS Code asks you to sign in the first time the server starts. Both also accept an API key in an Authorization header if you prefer.",
  },
  {
    question: 'Do I need an API key?',
    answer:
      'No. MCP clients that support sign-in (Claude, Claude Code, Cursor, VS Code) connect with OAuth: add https://app.useoctree.com/api/mcp with no headers, sign in to Octree in the browser and click Allow. Headless agents, CLIs and scripts can get a key without opening Settings through the device flow: POST https://app.useoctree.com/api/v1/device/code, show the user the activation link, and poll /api/v1/device/token until it returns a key. You can still create API keys yourself under Settings → API keys and send them as Authorization: Bearer oct_live_….',
  },
  {
    question: 'Is Octree listed in the MCP Registry?',
    answer: `Yes. Octree is in the official MCP Registry as ${MCP_REGISTRY_NAME}, a remote Streamable HTTP server at https://app.useoctree.com/api/mcp that accepts OAuth sign-in or an API key in the Authorization header.`,
  },
  {
    question: 'Is the Octree LaTeX compile API free?',
    answer:
      'Yes. Every Octree account can connect agents with OAuth or create API keys, and the free plan includes 30 compiles per day through the REST API and the MCP server. Octree Pro raises the limit to 1,000 compiles per day.',
  },
  {
    question: 'Which LaTeX packages are installed?',
    answer:
      'The API runs the same compiler as the Octree editor at app.useoctree.com: a full TeX Live installation driven by latexmk, so packages such as amsmath, TikZ, pgfplots, biblatex, beamer and the common thesis and resume classes are already there. Documents compile with pdfLaTeX by default; when a document needs XeLaTeX or LuaLaTeX (for example it loads fontspec), the compiler switches automatically. Shell escape is disabled, so packages that need it, such as minted, do not run.',
  },
  {
    question: 'Can I compile multi-file projects and images?',
    answer:
      'Multi-file projects, yes: send a files array of { path, content } objects plus the name of the main file, and \\input, \\include and .bib files resolve as they would on disk. In v1 every file is text; binary assets such as PNG or PDF images are coming. A request can carry up to 50 files and 2 MB of source.',
  },
  {
    question: 'What are the rate limits?',
    answer:
      'Limits are per account per day: 30 compiles on the free plan and 1,000 on Pro. When you run out, the API answers HTTP 429 with error quota_exceeded, the limit, how many you have used, when the count resets and a link to upgrade. GET /api/v1/me and the get_quota MCP tool show your current usage and when it resets (midnight UTC). check_latex counts toward the same limit.',
  },
  {
    question: 'Do you store the documents I compile through the API?',
    answer:
      'No. On the API and MCP path the LaTeX source and the PDF are not stored after the response is sent. Projects you create in the Octree editor are saved to your account as usual; that is separate from the API.',
  },
  {
    question: 'How are API keys and connected apps secured?',
    answer:
      'Keys start with oct_live_ and are shown once, when you create them (or once to the agent, in the device flow). Octree keeps only a hash of each key, so a key cannot be read back, only revoked. You can have up to 5 keys per account and revoke any of them in Settings. Apps connected with OAuth get short-lived tokens that can only compile and check LaTeX (scope compile), never read your projects, and you can disconnect them under Settings → Connected apps.',
  },
  {
    question: 'Should my agent use the REST API or the MCP server?',
    answer:
      'Use the MCP server when the agent is an MCP client (Claude Code, Cursor, Windsurf and others): it gets compile_latex, check_latex and get_quota as tools with no glue code. Use the REST API from scripts, CI jobs, backends and agent frameworks that call HTTP directly. Both accept the same credentials and share the same daily limit.',
  },
]

const toc = [
  { id: 'connect', label: 'Connect your agent' },
  { id: 'device-flow', label: 'Headless agents: device flow' },
  { id: 'agents-md', label: 'AGENTS.md / CLAUDE.md snippet' },
  { id: 'quickstart', label: 'Call the REST API' },
  { id: 'rest-api', label: 'REST API reference' },
  { id: 'errors', label: 'Errors and status codes' },
  { id: 'limits', label: 'Limits and keys' },
  { id: 'auth', label: 'Authentication' },
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
            Two ways in: an MCP server that gives Claude, Claude Code, Cursor and other agents a{' '}
            <Code>compile_latex</Code> tool (sign in with your Octree account, no key needed), and a
            REST endpoint that turns LaTeX into a PDF. Send the source, get the PDF back in seconds,
            or a list of errors with file and line when it does not compile. It is the same compiler
            (TeX Live, latexmk) that runs the <a href="https://app.useoctree.com">Octree editor</a>,
            so there is nothing to install and every package is already there.
          </p>
          <div className="not-prose flex flex-wrap gap-3">
            <Link href="#connect" className={buttonVariants()} data-cta-location="developers_hero">
              Connect your agent
            </Link>
            <Link href={s.API_KEYS_URL} className={buttonVariants({ variant: 'outline' })}>
              Get an API key
            </Link>
          </div>

          <ul>
            <li>
              <strong>REST:</strong> <Code>POST {s.COMPILE_URL}</Code>
            </li>
            <li>
              <strong>MCP:</strong> <Code>{s.MCP_URL}</Code> (Streamable HTTP), in the MCP Registry
              as <Code>{MCP_REGISTRY_NAME}</Code>
            </li>
            <li>
              <strong>Auth:</strong> OAuth sign-in for MCP clients, the{' '}
              <a href="#device-flow">device flow</a> for headless agents, or{' '}
              <Code>Authorization: Bearer oct_live_…</Code>
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

          {/* ───────────────────────────── Connect ───────────────────────────── */}
          <h2 id="connect" className="scroll-mt-24">
            Connect Your Agent
          </h2>
          <p>
            Every client below talks to the same MCP server, <Code>{s.MCP_URL}</Code>. The simplest
            way in is to sign in with your Octree account (OAuth), with no key to copy; an API key
            in an <Code>Authorization: Bearer</Code> header works everywhere too. Once connected,
            the agent has three tools: <Code>compile_latex</Code>, <Code>check_latex</Code> and{' '}
            <Code>get_quota</Code>.
          </p>
          <ConnectAgent />

          <h2 id="device-flow" className="scroll-mt-24">
            Headless Agents: Device Flow
          </h2>
          <p>
            An agent, CLI or script with no browser of its own can still get a key without anyone
            opening Settings, using the OAuth device authorization grant (RFC 8628). It asks Octree
            for a code, shows the user a link such as{' '}
            <Code>https://app.useoctree.com/activate?code=WDJB-MJHT</Code>, and polls until the user
            signs in and clicks <strong>Allow</strong>. It then receives an API key, once.
          </p>
          <ol>
            <li>
              <Code>POST {DEVICE_CODE_URL}</Code> with JSON{' '}
              <Code>{'{"client_name":"my-cli"}'}</Code>. The answer has <Code>device_code</Code>,{' '}
              <Code>user_code</Code>, <Code>verification_uri_complete</Code>,{' '}
              <Code>expires_in</Code> (900 seconds) and <Code>interval</Code> (5 seconds).
            </li>
            <li>
              Show the user <Code>verification_uri_complete</Code>.
            </li>
            <li>
              Every <Code>interval</Code> seconds, <Code>POST {DEVICE_TOKEN_URL}</Code> with the
              form fields <Code>grant_type=urn:ietf:params:oauth:grant-type:device_code</Code> and{' '}
              <Code>device_code</Code>. Until the user decides it answers 400{' '}
              <Code>authorization_pending</Code>; <Code>slow_down</Code> means poll less often (use
              the returned <Code>interval</Code>); <Code>access_denied</Code> and{' '}
              <Code>expired_token</Code> are final.
            </li>
            <li>
              On success it returns <Code>api_key</Code> (<Code>oct_live_…</Code>),{' '}
              <Code>token_type</Code>, <Code>mcp_url</Code> and <Code>rest_base</Code>. The key is
              returned only once: store it, for example as <Code>OCTREE_API_KEY</Code>. It is an
              ordinary API key, listed and revocable under Settings → API keys.
            </li>
          </ol>
          <CodeTabs
            ariaLabel="Device flow"
            tabs={[
              {
                label: 'curl',
                note: 'Each step, with the responses shown as comments.',
                code: deviceFlowCurl,
                trackLocation: 'developers:device_curl',
              },
              {
                label: 'Python',
                note: 'Prints the link, polls, and ends with api_key.',
                code: deviceFlowPython,
                trackLocation: 'developers:device_python',
              },
            ]}
          />
          <p>
            Agents can find this on their own: a request to the API or the MCP server without
            credentials gets HTTP 401 with <Code>device_authorization_endpoint</Code> and{' '}
            <Code>token_endpoint</Code> in the JSON body, next to a message saying what to do.
          </p>

          <h2 id="agents-md" className="scroll-mt-24">
            AGENTS.md / CLAUDE.md Snippet
          </h2>
          <p>
            Paste this into <Code>AGENTS.md</Code>, <Code>CLAUDE.md</Code> or your Cursor rules so
            coding agents in your repository compile LaTeX through Octree instead of looking for a
            local TeX install. When no key is configured, it tells the agent to start the device
            flow and ask you to open the activation link.
          </p>
          <CodeBlock
            title="AGENTS.md"
            code={agentsMdSnippet}
            trackLocation="developers:agents_md"
          />

          {/* ───────────────────────────── Quickstart ───────────────────────────── */}
          <h2 id="quickstart" className="scroll-mt-24">
            Call the REST API
          </h2>
          <p>
            From scripts, CI jobs and backends, call the REST API with an API key from Settings or
            the <a href="#device-flow">device flow</a>. Put it in <Code>OCTREE_API_KEY</Code>:
          </p>
          <CodeTabs
            ariaLabel="REST quickstart"
            tabs={[
              {
                label: 'curl',
                note: 'Returns JSON with the PDF base64-encoded, or a list of errors.',
                code: s.curlJson,
                trackLocation: 'developers:curl',
              },
              {
                label: 'curl (raw PDF)',
                note: 'Set "response": "pdf" (or send Accept: application/pdf) to get the PDF bytes directly.',
                code: s.curlPdf,
                trackLocation: 'developers:curl_pdf',
              },
              {
                label: 'Python',
                note: 'Compiles main.tex and saves out.pdf.',
                code: s.python,
                trackLocation: 'developers:python',
              },
              {
                label: 'JavaScript',
                note: 'Node 18+ (built-in fetch), as an ES module.',
                code: s.node,
                trackLocation: 'developers:javascript',
              },
            ]}
          />

          {/* ───────────────────────────── REST ───────────────────────────── */}
          <h2 id="rest-api" className="scroll-mt-24">
            REST API Reference
          </h2>
          <p>
            Base URL <Code>{s.API_BASE}</Code>. Every request needs{' '}
            <Code>Authorization: Bearer oct_live_…</Code> (an API key, or an OAuth access token).
            Request bodies are JSON.
          </p>

          <h3 id="compile">POST /api/v1/compile</h3>
          <p>
            Compile LaTeX to PDF. Send either a single document or a set of files. There is no
            engine option: documents compile with pdfLaTeX, and the compiler switches to XeLaTeX or
            LuaLaTeX automatically when the document needs it (for example when it loads{' '}
            <Code>fontspec</Code>).
          </p>
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
                    A complete single-file document (it must contain <Code>\documentclass</Code>),
                    compiled as <Code>main.tex</Code>. Use this or <Code>files</Code>.
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
                    Project files with relative, forward-slash paths, e.g.{' '}
                    <Code>sections/intro.tex</Code>, <Code>refs.bib</Code>. Up to 50 files, text
                    only in v1.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>main</Code>
                  </td>
                  <td>string</td>
                  <td>
                    Optional, with <Code>files</Code> only: the <Code>.tex</Code> file to compile.
                    Defaults to <Code>main.tex</Code> if present, else the first <Code>.tex</Code>{' '}
                    file containing <Code>\documentclass</Code>. The main file must contain{' '}
                    <Code>\documentclass</Code>, or the request is rejected with 400.
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
                    <Code>pdf</Code>; an explicit <Code>response</Code> field wins over the header.
                    Failures are JSON either way.
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
                  <td>
                    Always <Code>[]</Code> on success in v1; warnings show up only in the log of a
                    failed compile.
                  </td>
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
                  <td>
                    The last lines of the LaTeX log when the compile fails;{' '}
                    <Code>&apos;&apos;</Code> on success.
                  </td>
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
            <Code>missing_brace</Code> or <Code>latex_error</Code>, so an agent can branch on the
            error type without parsing the log. A compile that runs out of time is not a LaTeX
            error: it is HTTP 504 <Code>compile_timeout</Code>.
          </p>

          <h3 id="me">GET /api/v1/me</h3>
          <p>
            Your plan, today&rsquo;s usage and <Code>resets_at</Code>, the next reset (midnight UTC,
            ISO 8601). Useful as a key check before a batch job.
          </p>
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
                  <th>
                    <Code>error</Code>
                  </th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>200</td>
                  <td>none</td>
                  <td>
                    Request handled. Check <Code>ok</Code>: the document compiled, or it has LaTeX
                    errors listed in <Code>errors</Code>.
                  </td>
                </tr>
                <tr>
                  <td>400</td>
                  <td>
                    <Code>invalid_request</Code>
                  </td>
                  <td>
                    Malformed body, e.g. invalid JSON, neither <Code>latex</Code> nor{' '}
                    <Code>files</Code>, more than 50 files, a bad or duplicate path, or a main file
                    without <Code>\documentclass</Code>.
                  </td>
                </tr>
                <tr>
                  <td>401</td>
                  <td>
                    <Code>unauthorized</Code>
                  </td>
                  <td>
                    Missing, invalid, expired or revoked credentials. The body includes{' '}
                    <Code>device_authorization_endpoint</Code> and <Code>token_endpoint</Code> so an
                    agent can start the device flow.
                  </td>
                </tr>
                <tr>
                  <td>413</td>
                  <td>
                    <Code>payload_too_large</Code>
                  </td>
                  <td>Source over 2 MB, or a request body over 4 MB.</td>
                </tr>
                <tr>
                  <td>429</td>
                  <td>
                    <Code>quota_exceeded</Code>
                  </td>
                  <td>
                    Daily quota used up. Also returns <Code>limit</Code>, <Code>used</Code>,{' '}
                    <Code>resets_at</Code> and <Code>upgrade_url</Code>.
                  </td>
                </tr>
                <tr>
                  <td>429</td>
                  <td>
                    <Code>rate_limited</Code>
                  </td>
                  <td>
                    Too many failed key attempts from your IP address (10 a minute). Check the key
                    and wait for <Code>Retry-After</Code> seconds.
                  </td>
                </tr>
                <tr>
                  <td>503</td>
                  <td>
                    <Code>service_unavailable</Code>
                  </td>
                  <td>The API key check is temporarily unavailable. Retry with backoff.</td>
                </tr>
                <tr>
                  <td>503</td>
                  <td>
                    <Code>compile_unavailable</Code>
                  </td>
                  <td>
                    The compiler is busy or temporarily unavailable. Retry after{' '}
                    <Code>Retry-After</Code> seconds.
                  </td>
                </tr>
                <tr>
                  <td>504</td>
                  <td>
                    <Code>compile_timeout</Code>
                  </td>
                  <td>The compile took too long. Simplify the document or split the work.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Every error response is JSON with an <Code>error</Code> code and a human-readable{' '}
            <Code>message</Code>.
          </p>

          <h3 id="limits" className="scroll-mt-24">
            Limits and keys
          </h3>
          <ul>
            <li>
              <strong>Free:</strong> 30 compiles per day. <strong>Pro:</strong> 1,000 compiles per
              day, reset at midnight UTC. REST and MCP share the same count, and{' '}
              <Code>check_latex</Code> counts like a compile.
            </li>
            <li>
              <strong>Request size:</strong> up to 2 MB of source and 50 files.
            </li>
            <li>
              <strong>Keys:</strong> <Code>oct_live_…</Code>, up to 5 per account, shown once,
              stored hashed, revocable at any time in <a href={s.API_KEYS_URL}>Settings</a>. Keys
              from the device flow count toward the 5.
            </li>
            <li>
              <strong>Connected apps:</strong> apps signed in with OAuth use short-lived tokens
              limited to compiling, do not count toward the key limit, and can be disconnected under{' '}
              <a href={CONNECTED_APPS_URL}>Settings → Connected apps</a>.
            </li>
          </ul>

          <h3 id="auth" className="scroll-mt-24">
            Authentication
          </h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Best for</th>
                  <th>How</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>OAuth 2.1 sign-in</td>
                  <td>Claude, Claude Code, Cursor, VS Code and other MCP clients with sign-in</td>
                  <td>
                    Add the MCP URL with no headers; the client follows the 401 to{' '}
                    <Code>{OAUTH_PROTECTED_RESOURCE_URL}</Code> and{' '}
                    <Code>{OAUTH_AUTHORIZATION_SERVER_URL}</Code>, registers itself (dynamic client
                    registration or a client ID metadata document), and signs in with PKCE. Scope{' '}
                    <Code>compile</Code>.
                  </td>
                </tr>
                <tr>
                  <td>Device flow (RFC 8628)</td>
                  <td>Headless agents, CLIs, scripts</td>
                  <td>
                    <a href="#device-flow">Request a code, show the link, poll</a>; ends with an API
                    key.
                  </td>
                </tr>
                <tr>
                  <td>API key</td>
                  <td>CI, backends, clients without OAuth</td>
                  <td>
                    Create one under <a href={s.API_KEYS_URL}>Settings → API keys</a>, send{' '}
                    <Code>Authorization: Bearer oct_live_…</Code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ───────────────────────────── MCP ───────────────────────────── */}
          <h2 id="mcp" className="scroll-mt-24">
            MCP Server Reference
          </h2>
          <p>
            The Octree LaTeX MCP server lives at <Code>{s.MCP_URL}</Code>. It speaks the Streamable
            HTTP transport and is stateless, so there is no session to set up or keep alive.
            Authenticate by signing in with OAuth (the MCP authorization spec), or with an API key
            in an <Code>Authorization: Bearer oct_live_…</Code> header. See{' '}
            <a href="#auth">Authentication</a>.
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
                    A short summary (pages and time, or the errors) and the PDF as a resource.
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
                    document. Counts toward the daily quota.
                  </td>
                </tr>
                <tr>
                  <td>
                    <Code>get_quota</Code>
                  </td>
                  <td>none</td>
                  <td>
                    Plan, daily limit, compiles used today and <Code>resets_at</Code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 id="agents" className="scroll-mt-24">
            How an agent should use it
          </h3>
          <p>
            Write the <Code>.tex</Code> files first, with <Code>\documentclass</Code> in the main
            file. Call <Code>check_latex</Code> and fix what it reports, using the file, line and{' '}
            <Code>kind</Code> of each error, until it comes back clean. Then call{' '}
            <Code>compile_latex</Code> once to get the PDF. Every check counts toward the daily
            quota, so fix all reported errors before checking again. Each check returns only the
            errors, not a PDF, so the fix loop stays small, and the agent never has to read a raw
            LaTeX log. To tell coding agents in a repository to work this way, use the{' '}
            <a href="#agents-md">AGENTS.md / CLAUDE.md snippet</a>.
          </p>

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
              Add one URL to Claude, Claude Code or Cursor, sign in with your free Octree account,
              and your agent can turn LaTeX into a PDF: 30 compiles a day free, 1,000 on Pro.
            </p>
            <Link
              href="#connect"
              className={buttonVariants()}
              data-cta-location="developers_footer"
            >
              Connect your agent →
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
