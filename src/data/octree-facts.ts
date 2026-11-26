/**
 * Plain facts about Octree, shared by /llms.txt, /llms-full.txt and the
 * "What is Octree?" / comparison guides, so AI assistants and readers see the
 * same answer everywhere. Prices mirror the app's Stripe catalog
 * (octree repo: lib/stripe-prices.ts, lib/regional-pricing.ts); update both
 * together.
 */

import {
  API_KEY_PLACEHOLDER,
  API_KEYS_URL,
  CONNECTED_APPS_URL,
  DEVICE_CODE_URL,
  DEVICE_GRANT_TYPE,
  DEVICE_TOKEN_URL,
  MCP_REGISTRY_NAME,
  MCP_URL,
  OAUTH_AUTHORIZATION_SERVER_URL,
  OAUTH_PROTECTED_RESOURCE_URL,
  claudeCodeCommand,
  cursorInstallUrl,
  vscodeAddMcpCommand,
} from '@/utilities/mcpInstall'

export const OCTREE_SUMMARY =
  'Octree is an AI-powered LaTeX editor that runs in the browser. You write or import a LaTeX project, ask the AI assistant to draft, fix or restructure it, review each proposed edit before it is applied, and compile to PDF with a full TeX Live toolchain, with nothing to install.'

export const OCTREE_SHORT_SUMMARY =
  'Octree is an AI-powered, browser-based LaTeX editor: write or import a project, let the AI propose edits you accept or reject, and compile to PDF with TeX Live.'

export const SITE_LINKS = {
  www: 'https://www.useoctree.com',
  app: 'https://app.useoctree.com',
  signUp: 'https://app.useoctree.com/auth/sign-up',
  tools: 'https://tools.useoctree.com',
  toolsLlms: 'https://tools.useoctree.com/llms.txt',
  toolsLlmsFull: 'https://tools.useoctree.com/llms-full.txt',
  templates: 'https://tools.useoctree.com/templates',
  github: 'https://github.com/octree-labs/octree',
} as const

/**
 * How an AI agent connects to Octree's compile API, for /llms.txt and
 * /llms-full.txt. The commands come from src/utilities/mcpInstall.ts, which
 * also renders the /developers install section.
 */
export const AGENT_CONNECT_LINES: string[] = [
  `MCP server: ${MCP_URL} (Streamable HTTP, stateless). Official MCP Registry name: ${MCP_REGISTRY_NAME}.`,
  `Auth, option 1 (no API key): OAuth 2.1 sign-in per the MCP authorization spec. Add the URL with no headers; the client discovers ${OAUTH_PROTECTED_RESOURCE_URL} and ${OAUTH_AUTHORIZATION_SERVER_URL}, registers itself (dynamic client registration or a client ID metadata document), and signs in with PKCE. Scope: compile. Users disconnect apps at ${CONNECTED_APPS_URL}.`,
  `Auth, option 2 (headless agents, CLIs, scripts): device flow (RFC 8628). POST ${DEVICE_CODE_URL} with {"client_name":"my-cli"}, show the user verification_uri_complete, poll POST ${DEVICE_TOKEN_URL} (form grant_type=${DEVICE_GRANT_TYPE}&device_code=...) every 5 s until it returns {"api_key":"oct_live_..."} (once). Unauthenticated 401 responses include device_authorization_endpoint and token_endpoint.`,
  `Auth, option 3: header \`Authorization: Bearer oct_live_...\` with an API key from ${API_KEYS_URL}.`,
  'Tools: compile_latex (LaTeX to PDF), check_latex (errors only, with file, line and kind), get_quota (plan and compiles left today).',
  'Limits: 30 compiles a day free, 1,000 a day on Pro, shared by REST and MCP, reset at midnight UTC.',
  `Claude Code: \`${claudeCodeCommand()}\`, then /mcp → octree → Authenticate (or add --header "Authorization: Bearer ${API_KEY_PLACEHOLDER}").`,
  `Cursor one-click install (OAuth sign-in): ${cursorInstallUrl()}`,
  `VS Code: \`${vscodeAddMcpCommand()}\` (VS Code asks to sign in when the server starts).`,
  `Claude (claude.ai, Claude Desktop): Customize → Connectors → + Add → Add custom connector, URL ${MCP_URL}, leave OAuth client ID and secret empty, Add, then Connect and click Allow on the Octree screen.`,
  `Codex: in ~/.codex/config.toml add [mcp_servers.octree] with url = "${MCP_URL}" and bearer_token_env_var = "OCTREE_API_KEY".`,
  'REST: POST https://app.useoctree.com/api/v1/compile with {"latex": "..."} or {"files": [...], "main": "main.tex"}; GET https://app.useoctree.com/api/v1/me for quota.',
  'OpenAPI: https://app.useoctree.com/api/v1/openapi.json. Docs and install buttons: https://www.useoctree.com/developers.',
]

/** Pricing as shown on www.useoctree.com and in the app (USD list prices). */
export const PRICING = {
  free: 'Free: $0. 5 AI edits per day, unlimited projects and files, PDF compile and preview.',
  proMonthly:
    'Pro: $9.99 per month. 500 AI edits per month, AI document generation, PDF and ZIP export, priority support.',
  proAnnual: 'Pro annual: $79 per year (about $6.58 a month, roughly 34% less than monthly).',
  semester: 'Semester pass: $29 for 4 months of Pro, billed once per term.',
  credits: 'Extra AI edits: a one-off pack of 100 edits for $5.',
  regional:
    'Regional prices: visitors in many lower- and middle-income countries are charged less, about 40% or 60% off the list price (for example $5.99 or $3.99 a month for Pro monthly), chosen automatically from the country.',
  enterprise: 'Enterprise: custom pricing, including a privately hosted AI model.',
} as const

export const PRICING_LINES = Object.values(PRICING)

export const KEY_FEATURES: string[] = [
  'AI editing: describe a change in plain language ("turn this list into a table", "fix the compile error") and the assistant proposes line-level edits that you accept or reject.',
  'AI document generation: start a complete LaTeX document (paper, report, resume, slides) from a chat prompt and attached files.',
  'Compile to PDF in the browser with TeX Live and latexmk; pdfLaTeX, XeLaTeX and LuaLaTeX are chosen automatically, with BibTeX/Biber for bibliographies.',
  'PDF preview with SyncTeX, so clicking the PDF jumps to the matching source line.',
  'Import a .tex file or a ZIP project; an Overleaf export (Download, Source) works as-is.',
  'Compile API and remote MCP server so AI agents such as Claude Code and Cursor can compile LaTeX to PDF.',
  'Open source under the LGPL-3.0 licence (github.com/octree-labs/octree).',
  'Free companion tools: math-to-LaTeX, image-to-TikZ, LaTeX preview, converters, templates and a symbol reference at tools.useoctree.com.',
]

export const KNOWN_LIMITS: string[] = [
  'No real-time multi-user collaboration yet (listed as coming soon).',
  'No offline mode: Octree needs an internet connection.',
  'Downloading the PDF or the project ZIP needs Pro or a one-off $4.99 export for that document; the free plan compiles and previews.',
  'Smaller template gallery than Overleaf; templates live on tools.useoctree.com.',
]

/** Guides on www that answer "what is Octree" and comparison questions. */
export const answerPages: { slug: string; title: string; description: string }[] = [
  {
    slug: 'what-is-octree',
    title: 'What is Octree?',
    description:
      'What Octree is, who it is for, what the AI does, pricing (free, Pro $9.99/month, annual, semester and regional prices) and its current limits.',
  },
  {
    slug: 'octree-vs-overleaf',
    title: 'Octree vs Overleaf',
    description:
      'An honest comparison of Octree and Overleaf: AI editing, compiling, collaboration, pricing, offline use and templates, including where Overleaf is the better choice.',
  },
  {
    slug: 'best-ai-latex-editors',
    title: 'Best AI LaTeX Editors (2026)',
    description:
      'The AI LaTeX editors you can use in 2026 (Octree, Overleaf AI, Bibby, OpenAI Prism until it closes, and an editor plus a coding assistant), what each does and what it costs.',
  },
]
