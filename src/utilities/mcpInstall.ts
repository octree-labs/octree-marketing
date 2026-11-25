/**
 * Install links and config snippets for the Octree MCP server, shared by
 * /developers and /llms.txt so every client sees the same URL and key header.
 *
 * Formats checked against the client docs (2026-11):
 * - Cursor: cursor://anysphere.cursor-deeplink/mcp/install?name=NAME&config=BASE64,
 *   where config is JSON.stringify of the server entry (no name wrapper).
 *   https://cursor.com/docs/mcp/install-links
 * - VS Code: `code --add-mcp '<json with name>'` and .vscode/mcp.json with a
 *   top-level "servers" key. VS Code does not document an install deeplink, so
 *   none is built here.
 * - Codex: [mcp_servers.NAME] in ~/.codex/config.toml with bearer_token_env_var.
 */

export const MCP_SERVER_NAME = 'octree'
export const MCP_URL = 'https://app.useoctree.com/api/mcp'
export const MCP_REGISTRY_NAME = 'com.useoctree/octree'
export const API_KEYS_URL = 'https://app.useoctree.com/settings/account#api-keys'
export const API_KEY_PLACEHOLDER = 'YOUR_OCTREE_API_KEY'
export const API_KEY_ENV = 'OCTREE_API_KEY'

const authHeader = (key: string) => ({ Authorization: `Bearer ${key}` })

/** Base64 of a UTF-8 string, in the browser and in Node. */
const toBase64 = (text: string): string =>
  typeof Buffer !== 'undefined'
    ? Buffer.from(text, 'utf8').toString('base64')
    : btoa(String.fromCharCode(...new TextEncoder().encode(text)))

/** The server entry Cursor (and most mcpServers clients) take: url + headers. */
export const cursorServerConfig = (key = API_KEY_PLACEHOLDER) => ({
  url: MCP_URL,
  headers: authHeader(key),
})

/** One-click install link for Cursor. */
export const cursorInstallUrl = (key = API_KEY_PLACEHOLDER): string => {
  const params = new URLSearchParams({
    name: MCP_SERVER_NAME,
    config: toBase64(JSON.stringify(cursorServerConfig(key))),
  })
  return `cursor://anysphere.cursor-deeplink/mcp/install?${params.toString()}`
}

/** `code --add-mcp` adds the server to the VS Code user profile. */
export const vscodeAddMcpCommand = (key = API_KEY_PLACEHOLDER): string =>
  `code --add-mcp '${JSON.stringify({
    name: MCP_SERVER_NAME,
    type: 'http',
    url: MCP_URL,
    headers: authHeader(key),
  })}'`

/** .vscode/mcp.json: VS Code prompts for the key once and stores it as a secret. */
export const vscodeMcpJson = JSON.stringify(
  {
    inputs: [
      {
        type: 'promptString',
        id: 'octree-api-key',
        description: 'Octree API key (oct_live_...)',
        password: true,
      },
    ],
    servers: {
      [MCP_SERVER_NAME]: {
        type: 'http',
        url: MCP_URL,
        headers: { Authorization: 'Bearer ${input:octree-api-key}' },
      },
    },
  },
  null,
  2,
)

export const claudeCodeCommand = (key = API_KEY_PLACEHOLDER): string =>
  `claude mcp add --transport http ${MCP_SERVER_NAME} ${MCP_URL} --header "Authorization: Bearer ${key}"`

/** ~/.codex/config.toml: Codex reads the key from the environment. */
export const codexToml = `# ~/.codex/config.toml  (then: export ${API_KEY_ENV}=oct_live_...)
[mcp_servers.${MCP_SERVER_NAME}]
url = "${MCP_URL}"
bearer_token_env_var = "${API_KEY_ENV}"`

/** Generic mcpServers config (Windsurf, Cline, Cursor's mcp.json and others). */
export const genericMcpJson = (key = API_KEY_PLACEHOLDER): string =>
  JSON.stringify({ mcpServers: { [MCP_SERVER_NAME]: cursorServerConfig(key) } }, null, 2)

/** Paste into AGENTS.md or CLAUDE.md so coding agents compile LaTeX through Octree. */
export const agentsMdSnippet = `## LaTeX

Compile LaTeX with the Octree MCP server (\`${MCP_SERVER_NAME}\`, ${MCP_URL}); do not install TeX locally.

- Keep \\documentclass in the main .tex file; pass every project file (.tex, .bib, .cls) as files + main.
- Run \`check_latex\` and fix every reported error (file, line, kind) before checking again.
- When it comes back clean, call \`compile_latex\` once and save the PDF.
- Each call counts toward the daily quota (free 30, Pro 1,000); \`get_quota\` shows what is left.
- No MCP client? POST the same JSON to https://app.useoctree.com/api/v1/compile with
  \`Authorization: Bearer $${API_KEY_ENV}\` (docs: https://www.useoctree.com/developers).`
