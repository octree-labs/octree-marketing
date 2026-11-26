import type { Metadata } from 'next/types'

import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { CodeBlock, CodeTabs, CopyChip } from '@/components/Developers/code-block'
import { ConnectAgent } from '@/components/Developers/connect-agent'
import { Code, InlineText } from '@/components/Developers/inline-text'
import { FaqList, RefList, type RefItem } from '@/components/Developers/reference'
import { generateBreadcrumbSchema } from '@/utilities/generateBreadcrumbs'
import { getServerSideURL } from '@/utilities/getURL'
import { stripInlineCode } from '@/utilities/inlineCode'
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
import { cn } from '@/utilities/ui'

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

/**
 * FAQ copy. `Backticks` mark inline code on the page; the FAQPage JSON-LD gets
 * the same text with the backticks stripped.
 */
const faq: FaqItem[] = [
  {
    question: 'How do I compile LaTeX from Claude Code?',
    answer:
      'Run `claude mcp add --transport http octree https://app.useoctree.com/api/mcp`, then type `/mcp` in Claude Code, pick octree and choose Authenticate to sign in to Octree in the browser. No API key is needed; if you prefer one, add `--header "Authorization: Bearer YOUR_OCTREE_API_KEY"` to the command instead. Claude Code then has the `compile_latex`, `check_latex` and `get_quota` tools: ask it to write your document and compile it with Octree, and it checks the source, fixes the reported errors and returns the PDF.',
  },
  {
    question: 'How do I add the Octree MCP server to Cursor or VS Code?',
    answer:
      "In Cursor, press Add to Cursor on this page, then click Needs login next to Octree in Cursor's MCP settings to sign in in the browser. In VS Code, run the `code --add-mcp` command shown above or add the `.vscode/mcp.json` snippet; VS Code asks you to sign in the first time the server starts. Both also accept an API key in an `Authorization` header if you prefer.",
  },
  {
    question: 'Do I need an API key?',
    answer:
      'No. MCP clients that support sign-in (Claude, Claude Code, Cursor, VS Code) connect with OAuth: add `https://app.useoctree.com/api/mcp` with no headers, sign in to Octree in the browser and click Allow. Headless agents, CLIs and scripts can get a key without opening Settings through the device flow: POST `https://app.useoctree.com/api/v1/device/code`, show the user the activation link, and poll `/api/v1/device/token` until it returns a key. You can still create API keys yourself under Settings → API keys and send them as `Authorization: Bearer oct_live_…`.',
  },
  {
    question: 'Is Octree listed in the MCP Registry?',
    answer: `Yes. Octree is in the official MCP Registry as \`${MCP_REGISTRY_NAME}\`, a remote Streamable HTTP server at \`https://app.useoctree.com/api/mcp\` that accepts OAuth sign-in or an API key in the \`Authorization\` header.`,
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
      'Multi-file projects, yes: send a `files` array of `{ path, content }` objects plus the name of the `main` file, and `\\input`, `\\include` and `.bib` files resolve as they would on disk. In v1 every file is text; binary assets such as PNG or PDF images are coming. A request can carry up to 50 files and 2 MB of source.',
  },
  {
    question: 'What are the rate limits?',
    answer:
      'Limits are per account per day: 30 compiles on the free plan and 1,000 on Pro. When you run out, the API answers HTTP 429 with error `quota_exceeded`, the limit, how many you have used, when the count resets and a link to upgrade. `GET /api/v1/me` and the `get_quota` MCP tool show your current usage and when it resets (midnight UTC). `check_latex` counts toward the same limit.',
  },
  {
    question: 'Do you store the documents I compile through the API?',
    answer:
      'No. On the API and MCP path the LaTeX source and the PDF are not stored after the response is sent. Projects you create in the Octree editor are saved to your account as usual; that is separate from the API.',
  },
  {
    question: 'How are API keys and connected apps secured?',
    answer:
      'Keys start with `oct_live_` and are shown once, when you create them (or once to the agent, in the device flow). Octree keeps only a hash of each key, so a key cannot be read back, only revoked. You can have up to 5 keys per account and revoke any of them in Settings. Apps connected with OAuth get short-lived tokens that can only compile and check LaTeX (scope `compile`), never read your projects, and you can disconnect them under Settings → Connected apps.',
  },
  {
    question: 'Should my agent use the REST API or the MCP server?',
    answer:
      'Use the MCP server when the agent is an MCP client (Claude Code, Cursor, Windsurf and others): it gets `compile_latex`, `check_latex` and `get_quota` as tools with no glue code. Use the REST API from scripts, CI jobs, backends and agent frameworks that call HTTP directly. Both accept the same credentials and share the same daily limit.',
  },
]

/** Plain-text FAQ for the FAQPage JSON-LD. */
const faqPlain: FaqItem[] = faq.map((item) => ({
  question: item.question,
  answer: stripInlineCode(item.answer),
}))

const toc = [
  { id: 'connect', label: 'Connect your agent' },
  { id: 'device-flow', label: 'Device flow' },
  { id: 'agents-md', label: 'AGENTS.md snippet' },
  { id: 'quickstart', label: 'REST quickstart' },
  { id: 'rest-api', label: 'API reference' },
  { id: 'mcp', label: 'MCP tools' },
  { id: 'faq', label: 'FAQ' },
]

const deviceSteps: string[] = [
  `**Request a code.** \`POST ${DEVICE_CODE_URL}\` with JSON \`{"client_name":"my-cli"}\`. The answer has \`device_code\`, \`user_code\`, \`verification_uri_complete\`, \`expires_in\` (900 seconds) and \`interval\` (5 seconds).`,
  `**Show the link.** Ask the user to open \`verification_uri_complete\`, sign in and click Allow.`,
  `**Poll for the key.** Every \`interval\` seconds, \`POST ${DEVICE_TOKEN_URL}\` with the form fields \`grant_type=urn:ietf:params:oauth:grant-type:device_code\` and \`device_code\`. \`authorization_pending\` means keep polling, \`slow_down\` means poll less often (use the returned \`interval\`), \`access_denied\` and \`expired_token\` are final. On success it returns \`api_key\` (\`oct_live_…\`), \`token_type\`, \`mcp_url\` and \`rest_base\`, once: store the key, for example as \`OCTREE_API_KEY\`. It is an ordinary API key, listed and revocable under Settings → API keys.`,
]

const requestFields: RefItem[] = [
  {
    term: '`latex`',
    meta: 'string',
    description:
      'A complete single-file document (it must contain `\\documentclass`), compiled as `main.tex`. Use this or `files`.',
  },
  {
    term: '`files`',
    meta: '`{ path, content }[]`',
    description:
      'Project files with relative, forward-slash paths, e.g. `sections/intro.tex`, `refs.bib`. Up to 50 files, text only in v1.',
  },
  {
    term: '`main`',
    meta: 'string, optional',
    description:
      'With `files` only: the `.tex` file to compile. Defaults to `main.tex` if present, else the first `.tex` file containing `\\documentclass`. The main file must contain `\\documentclass`, or the request is rejected with 400.',
  },
  {
    term: '`response`',
    meta: '`"json"` | `"pdf"`',
    description:
      '`json` (default) returns the object below; `pdf` returns the raw PDF. `Accept: application/pdf` does the same as `pdf`; an explicit `response` field wins over the header. Failures are JSON either way.',
  },
]

const responseFields: RefItem[] = [
  { term: '`ok`', description: '`true` if a PDF was produced.' },
  { term: '`pdf_base64`', description: 'The PDF, base64-encoded (success only).' },
  { term: '`pages`', description: 'Page count, when known.' },
  { term: '`duration_ms`', description: 'Compile time in milliseconds.' },
  {
    term: '`warnings`',
    description:
      'Always `[]` on success in v1; warnings show up only in the log of a failed compile.',
  },
  {
    term: '`errors`',
    description:
      '`{ file, line, message, kind }[]` when `ok` is false. `kind` is one of `missing_package`, `undefined_control_sequence`, `missing_dollar`, `missing_brace` or `latex_error`, so an agent can branch on the error type without parsing the log.',
  },
  {
    term: '`log_tail`',
    description: "The last lines of the LaTeX log when the compile fails; `''` on success.",
  },
  { term: '`suggestion`', description: 'Optional hint for fixing the first error.' },
]

const errorCodes: RefItem[] = [
  {
    term: '200',
    meta: 'no error',
    description:
      'Request handled. Check `ok`: the document compiled, or it has LaTeX errors listed in `errors`.',
  },
  {
    term: '400',
    meta: '`invalid_request`',
    description:
      'Malformed body, e.g. invalid JSON, neither `latex` nor `files`, more than 50 files, a bad or duplicate path, or a main file without `\\documentclass`.',
  },
  {
    term: '401',
    meta: '`unauthorized`',
    description:
      'Missing, invalid, expired or revoked credentials. The body includes `device_authorization_endpoint` and `token_endpoint` so an agent can start the device flow.',
  },
  {
    term: '413',
    meta: '`payload_too_large`',
    description: 'Source over 2 MB, or a request body over 4 MB.',
  },
  {
    term: '429',
    meta: '`quota_exceeded`',
    description:
      'Daily quota used up. Also returns `limit`, `used`, `resets_at` and `upgrade_url`.',
  },
  {
    term: '429',
    meta: '`rate_limited`',
    description:
      'Too many failed key attempts from your IP address (10 a minute). Check the key and wait for `Retry-After` seconds.',
  },
  {
    term: '503',
    meta: '`service_unavailable`',
    description: 'The API key check is temporarily unavailable. Retry with backoff.',
  },
  {
    term: '503',
    meta: '`compile_unavailable`',
    description:
      'The compiler is busy or temporarily unavailable. Retry after `Retry-After` seconds.',
  },
  {
    term: '504',
    meta: '`compile_timeout`',
    description:
      'The compile took too long. Simplify the document or split the work. A timeout is not a LaTeX error.',
  },
]

const linkClass = 'font-medium text-foreground underline underline-offset-4'

const limits: RefItem[] = [
  {
    term: 'Daily compiles',
    description:
      'Free: 30 a day. Pro: 1,000 a day. Reset at midnight UTC. REST and MCP share the same count, and `check_latex` counts like a compile.',
  },
  { term: 'Request size', description: 'Up to 2 MB of source and 50 files.' },
  {
    term: 'API keys',
    description: (
      <>
        <Code>oct_live_…</Code>, up to 5 per account, shown once, stored hashed, revocable at any
        time in{' '}
        <a href={s.API_KEYS_URL} className={linkClass}>
          Settings
        </a>
        . Keys from the device flow count toward the 5.
      </>
    ),
  },
  {
    term: 'Connected apps',
    description: (
      <>
        Apps signed in with OAuth use short-lived tokens limited to compiling, do not count toward
        the key limit, and can be disconnected under{' '}
        <a href={CONNECTED_APPS_URL} className={linkClass}>
          Settings → Connected apps
        </a>
        .
      </>
    ),
  },
]

const authMethods: RefItem[] = [
  {
    term: 'OAuth 2.1 sign-in',
    meta: 'Claude, Claude Code, Cursor, VS Code and other MCP clients with sign-in',
    description: `Add the MCP URL with no headers; the client follows the 401 to \`${OAUTH_PROTECTED_RESOURCE_URL}\` and \`${OAUTH_AUTHORIZATION_SERVER_URL}\`, registers itself (dynamic client registration or a client ID metadata document), and signs in with PKCE. Scope \`compile\`.`,
  },
  {
    term: 'Device flow (RFC 8628)',
    meta: 'Headless agents, CLIs, scripts',
    description: (
      <>
        <a href="#device-flow" className={linkClass}>
          Request a code, show the link, poll
        </a>
        ; ends with an API key.
      </>
    ),
  },
  {
    term: 'API key',
    meta: 'CI, backends, clients without OAuth',
    description: (
      <>
        Create one under{' '}
        <a href={s.API_KEYS_URL} className={linkClass}>
          Settings → API keys
        </a>
        , send <Code>Authorization: Bearer oct_live_…</Code>.
      </>
    ),
  },
]

const mcpTools: RefItem[] = [
  {
    term: '`compile_latex`',
    meta: 'Input: `latex`, or `files` + `main`',
    description: 'A short summary (pages and time, or the errors) and the PDF as a resource.',
  },
  {
    term: '`check_latex`',
    meta: 'Input: `latex`, or `files` + `main`',
    description:
      'Errors only, with file, line and kind. The fast loop for an agent fixing a document. Counts toward the daily quota.',
  },
  {
    term: '`get_quota`',
    meta: 'No input',
    description: 'Plan, daily limit, compiles used today and `resets_at`.',
  },
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

/** Renders "**Lead.** rest" with the lead in bold, the rest through InlineText. */
const Step: React.FC<{ text: string }> = ({ text }) => {
  const match = /^\*\*(.+?)\*\*\s*(.*)$/s.exec(text)
  if (!match) return <InlineText text={text} />
  return (
    <>
      <strong className="text-foreground">{match[1]}</strong> <InlineText text={match[2] ?? ''} />
    </>
  )
}

const H2: React.FC<{ id?: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-24">
    {children}
  </h2>
)

const H3: React.FC<{ id?: string; children: React.ReactNode }> = ({ id, children }) => (
  <h3 id={id} className="scroll-mt-24 [overflow-wrap:anywhere]">
    {children}
  </h3>
)

const outlineButton = cn(buttonVariants({ variant: 'outline' }), 'rounded-[10px]')

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqPlain)) }}
      />

      <div className="container min-w-0">
        <article className="prose prose-lg dark:prose-invert mx-auto min-w-0 max-w-4xl break-words prose-h2:mt-14 prose-h3:mt-10">
          {/* ───────────────────────────── Hero ───────────────────────────── */}
          <header className="not-prose">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
              Octree for agents
            </p>
            <h1 className="text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
              Compile LaTeX from any AI agent
            </h1>
            <p className="mt-2 text-xl text-muted-foreground">
              The LaTeX MCP server and compile API
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Give Claude, Claude Code, Cursor or any MCP client a <Code>compile_latex</Code> tool
              by signing in with your Octree account, or call one REST endpoint. Send LaTeX and get a
              PDF back in seconds, or errors with file and line, from the same TeX Live compiler that
              runs the{' '}
              <a href="https://app.useoctree.com" className={linkClass}>
                Octree editor
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#connect" className={buttonVariants()} data-cta-location="developers_hero">
                Connect your agent
              </Link>
              <Link href={s.API_KEYS_URL} className={outlineButton}>
                Get an API key
              </Link>
            </div>
            <div className="mt-6 flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap">
              <CopyChip label="MCP" value={s.MCP_URL} trackLocation="developers:hero_mcp_url" />
              <CopyChip
                label="REST"
                value={`POST ${s.COMPILE_URL}`}
                copyText={s.COMPILE_URL}
                trackLocation="developers:hero_rest_url"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              OAuth sign-in, the{' '}
              <a href="#device-flow" className={linkClass}>
                device flow
              </a>{' '}
              or an API key · Free: 30 compiles a day, Pro: 1,000 · In the MCP Registry as{' '}
              <Code>{MCP_REGISTRY_NAME}</Code>
            </p>

            <nav aria-label="On this page" className="mt-8 border-y border-border py-3">
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="inline-block py-1 text-muted-foreground hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>

          {/* ───────────────────────────── Connect ───────────────────────────── */}
          <H2 id="connect">Connect your agent</H2>
          <p>
            Every client uses the same MCP server, <Code>{s.MCP_URL}</Code>. Sign in with your
            Octree account when the client asks, with no key to copy. The agent then has three
            tools: <Code>compile_latex</Code>, <Code>check_latex</Code> and <Code>get_quota</Code>.
          </p>
          <ConnectAgent />

          {/* ───────────────────────────── Device flow ───────────────────────────── */}
          <H2 id="device-flow">Headless agents: device flow</H2>
          <p>
            An agent, CLI or script with no browser can still get a key without anyone opening
            Settings, using the OAuth device authorization grant (RFC 8628). It shows the user a link
            such as <Code>https://app.useoctree.com/activate?code=WDJB-MJHT</Code> and receives an API
            key once they click Allow.
          </p>
          <ol className="not-prose my-6 space-y-4">
            {deviceSteps.map((step, i) => (
              <li key={i} className="flex min-w-0 gap-4">
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-sm font-medium text-foreground"
                >
                  {i + 1}
                </span>
                <p className="m-0 min-w-0 flex-1 text-[15px] leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                  <span className="sr-only">Step {i + 1}: </span>
                  <Step text={step} />
                </p>
              </li>
            ))}
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
            Agents can find this on their own: a request without credentials gets HTTP 401 with{' '}
            <Code>device_authorization_endpoint</Code> and <Code>token_endpoint</Code> in the JSON
            body.
          </p>

          {/* ───────────────────────────── AGENTS.md ───────────────────────────── */}
          <H2 id="agents-md">AGENTS.md / CLAUDE.md snippet</H2>
          <p>
            Paste this into <Code>AGENTS.md</Code>, <Code>CLAUDE.md</Code> or your Cursor rules so
            coding agents compile LaTeX through Octree instead of looking for a local TeX install.
            Without a key, it tells the agent to start the device flow and ask you to open the link.
          </p>
          <CodeBlock title="AGENTS.md" code={agentsMdSnippet} trackLocation="developers:agents_md" />

          {/* ───────────────────────────── Quickstart ───────────────────────────── */}
          <H2 id="quickstart">Call the REST API</H2>
          <p>
            From scripts, CI jobs and backends, use an API key from Settings or the{' '}
            <a href="#device-flow">device flow</a>, stored in <Code>OCTREE_API_KEY</Code>:
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
                note: (
                  <>
                    Set <Code>&quot;response&quot;: &quot;pdf&quot;</Code> (or send{' '}
                    <Code>Accept: application/pdf</Code>) to get the PDF bytes directly.
                  </>
                ),
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

          {/* ───────────────────────────── REST reference ───────────────────────────── */}
          <H2 id="rest-api">REST API reference</H2>
          <p>
            Base URL <Code>{s.API_BASE}</Code>. Every request needs{' '}
            <Code>Authorization: Bearer oct_live_…</Code> (an API key, or an OAuth access token).
            Request bodies are JSON.
          </p>

          <H3 id="compile">POST /api/v1/compile</H3>
          <p>
            Compile LaTeX to PDF from a single document or a set of files. There is no engine
            option: documents compile with pdfLaTeX, and the compiler switches to XeLaTeX or LuaLaTeX
            automatically when the document needs it (for example when it loads{' '}
            <Code>fontspec</Code>).
          </p>
          <RefList label="Request fields" items={requestFields} />
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
          <RefList label="Response fields" items={responseFields} />

          <H3 id="me">GET /api/v1/me</H3>
          <p>
            Your plan, today&rsquo;s usage and <Code>resets_at</Code>, the next reset (midnight UTC,
            ISO 8601). Useful as a key check before a batch job.
          </p>
          <CodeTabs
            ariaLabel="GET /api/v1/me"
            tabs={[
              { label: 'Request', code: s.meRequest },
              { label: '200 response', code: s.meResponse },
            ]}
          />

          <H3 id="openapi">GET /api/v1/openapi.json</H3>
          <p>
            The OpenAPI description of the API, at{' '}
            <a
              href={`${s.API_BASE}/api/v1/openapi.json`}
              className="[overflow-wrap:anywhere]"
            >
              {s.API_BASE}/api/v1/openapi.json
            </a>
            . Load it into Postman or an agent framework that builds tools from OpenAPI.
          </p>

          <H3 id="errors">Errors and status codes</H3>
          <p>
            Every error response is JSON with an <Code>error</Code> code and a human-readable{' '}
            <Code>message</Code>.
          </p>
          <RefList label="Status codes" items={errorCodes} />

          <H3 id="limits">Limits and keys</H3>
          <RefList label="Limits" items={limits} />

          <H3 id="auth">Authentication</H3>
          <RefList label="Authentication methods" items={authMethods} />

          {/* ───────────────────────────── MCP ───────────────────────────── */}
          <H2 id="mcp">MCP server reference</H2>
          <p>
            The Octree LaTeX MCP server lives at <Code>{s.MCP_URL}</Code>. It speaks the Streamable
            HTTP transport and is stateless, so there is no session to set up or keep alive. Sign in
            with OAuth (the MCP authorization spec) or send an API key in an{' '}
            <Code>Authorization: Bearer oct_live_…</Code> header; see{' '}
            <a href="#auth">Authentication</a>.
          </p>
          <RefList label="MCP tools" items={mcpTools} />

          <H3 id="agents">How an agent should use it</H3>
          <p>
            Write the <Code>.tex</Code> files first, with <Code>\documentclass</Code> in the main
            file. Call <Code>check_latex</Code> and fix every reported error, using its file, line and{' '}
            <Code>kind</Code>, until it comes back clean; then call <Code>compile_latex</Code> once
            for the PDF. Each check counts toward the daily quota and returns only errors, never a
            raw LaTeX log, so the fix loop stays small. To tell coding agents in a repository to work
            this way, use the <a href="#agents-md">AGENTS.md / CLAUDE.md snippet</a>.
          </p>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <H2 id="faq">Frequently asked questions</H2>
          <FaqList items={faq} />

          {/* ───────────────────────────── Next steps ───────────────────────────── */}
          <H2>Learn more</H2>
          <ul>
            <li>
              <Link href="/learn/latex">Learn LaTeX</Link>: the basics your agent&rsquo;s documents
              are built on
            </li>
            <li>
              <Link href="/learn/tikz">TikZ</Link> and <Link href="/learn/pgfplots">PGFPlots</Link>:
              diagrams and plots that compile through the API like any other package
            </li>
            <li>
              <Link href="/learn/bibliography-examples">Bibliography examples</Link>: send a{' '}
              <Code>.bib</Code> file in <Code>files</Code> and cite as usual
            </li>
            <li>
              <a href="https://app.useoctree.com">Octree editor</a>: the same compiler with an AI
              editor, PDF preview and saved projects
            </li>
          </ul>

          {/* ───────────────────────────── CTA ───────────────────────────── */}
          <div className="not-prose mt-12 rounded-lg border border-primary/10 bg-primary/5 p-6">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Give your agent a LaTeX compiler
            </h3>
            <p className="mb-4 text-muted-foreground">
              Add one URL to Claude, Claude Code or Cursor, sign in with your free Octree account,
              and your agent can turn LaTeX into a PDF: 30 compiles a day free, 1,000 on Pro.
            </p>
            <Link href="#connect" className={buttonVariants()} data-cta-location="developers_footer">
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
