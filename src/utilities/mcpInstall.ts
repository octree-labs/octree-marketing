/**
 * Install links and config snippets for the Octree MCP server, shared by
 * /developers and /llms.txt so every client sees the same URL and auth.
 *
 * Two ways to authenticate:
 * - OAuth 2.1 (MCP authorization spec): clients that support it discover the
 *   authorization server from the 401 and open a browser to sign in, so the
 *   snippets carry no key at all. Builders called without a key produce this
 *   form.
 * - An API key in an Authorization header. Builders called with a key (or
 *   API_KEY_PLACEHOLDER) produce this form.
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
export const APP_BASE = 'https://app.useoctree.com'
export const MCP_URL = `${APP_BASE}/api/mcp`
export const MCP_REGISTRY_NAME = 'com.useoctree/octree'
export const API_KEYS_URL = `${APP_BASE}/settings/account#api-keys`
export const CONNECTED_APPS_URL = `${APP_BASE}/settings/account#connected-apps`
export const API_KEY_PLACEHOLDER = 'YOUR_OCTREE_API_KEY'
export const API_KEY_ENV = 'OCTREE_API_KEY'

/** OAuth 2.1 discovery (RFC 9728 and RFC 8414). */
export const OAUTH_PROTECTED_RESOURCE_URL = `${APP_BASE}/.well-known/oauth-protected-resource`
export const OAUTH_AUTHORIZATION_SERVER_URL = `${APP_BASE}/.well-known/oauth-authorization-server`
export const OAUTH_SCOPE = 'compile'

/** Device authorization (RFC 8628) for headless agents, CLIs and scripts. */
export const DEVICE_CODE_URL = `${APP_BASE}/api/v1/device/code`
export const DEVICE_TOKEN_URL = `${APP_BASE}/api/v1/device/token`
export const ACTIVATE_URL = `${APP_BASE}/activate`
export const DEVICE_GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:device_code'

const authHeader = (key: string) => ({ Authorization: `Bearer ${key}` })

/** Base64 of a UTF-8 string, in the browser and in Node. */
const toBase64 = (text: string): string =>
  typeof Buffer !== 'undefined'
    ? Buffer.from(text, 'utf8').toString('base64')
    : btoa(String.fromCharCode(...new TextEncoder().encode(text)))

/**
 * The server entry Cursor (and most mcpServers clients) take. Without a key it
 * is just the URL, and the client signs in with OAuth; with a key it adds the
 * Authorization header.
 */
export const cursorServerConfig = (key?: string) =>
  key ? { url: MCP_URL, headers: authHeader(key) } : { url: MCP_URL }

/** One-click install link for Cursor: OAuth without a key, header auth with one. */
export const cursorInstallUrl = (key?: string): string => {
  const params = new URLSearchParams({
    name: MCP_SERVER_NAME,
    config: toBase64(JSON.stringify(cursorServerConfig(key))),
  })
  return `cursor://anysphere.cursor-deeplink/mcp/install?${params.toString()}`
}

/** `code --add-mcp` adds the server to the VS Code user profile. */
export const vscodeAddMcpCommand = (key?: string): string =>
  `code --add-mcp '${JSON.stringify({
    name: MCP_SERVER_NAME,
    type: 'http',
    url: MCP_URL,
    ...(key ? { headers: authHeader(key) } : {}),
  })}'`

/** .vscode/mcp.json with OAuth: VS Code opens a browser to sign in. Safe to commit. */
export const vscodeMcpJsonOAuth = JSON.stringify(
  { servers: { [MCP_SERVER_NAME]: { type: 'http', url: MCP_URL } } },
  null,
  2,
)

/** .vscode/mcp.json with a key: VS Code prompts for it once and stores it as a secret. */
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

/** Claude Code: without a key, run /mcp afterwards to sign in in the browser. */
export const claudeCodeCommand = (key?: string): string =>
  `claude mcp add --transport http ${MCP_SERVER_NAME} ${MCP_URL}` +
  (key ? ` --header "Authorization: Bearer ${key}"` : '')

/** ~/.codex/config.toml: Codex reads the key from the environment. */
export const codexToml = `# ~/.codex/config.toml  (then: export ${API_KEY_ENV}=oct_live_...)
[mcp_servers.${MCP_SERVER_NAME}]
url = "${MCP_URL}"
bearer_token_env_var = "${API_KEY_ENV}"`

/** Generic mcpServers config (Windsurf, Cline, Cursor's mcp.json and others). */
export const genericMcpJson = (key?: string): string =>
  JSON.stringify({ mcpServers: { [MCP_SERVER_NAME]: cursorServerConfig(key) } }, null, 2)

/** Device flow from a terminal: start, show the link, poll until the user allows it. */
export const deviceFlowCurl = `# 1. Start: returns a one-time link for the user
curl -s -X POST ${DEVICE_CODE_URL} \\
  -H "Content-Type: application/json" -d '{"client_name":"my-cli"}'
# {"device_code":"…","user_code":"WDJB-MJHT",
#  "verification_uri":"${ACTIVATE_URL}",
#  "verification_uri_complete":"${ACTIVATE_URL}?code=WDJB-MJHT",
#  "expires_in":900,"interval":5}

# 2. Ask the user to open verification_uri_complete and click Allow.

# 3. Poll every 5 seconds with the device_code
curl -s -X POST ${DEVICE_TOKEN_URL} \\
  -d grant_type=${DEVICE_GRANT_TYPE} \\
  -d device_code=DEVICE_CODE
# {"error":"authorization_pending", …}   keep polling
# {"error":"slow_down","interval":10}    poll less often
# {"error":"access_denied"} / {"error":"expired_token"}   stop

# 4. Once allowed (returned once; store it):
# {"api_key":"oct_live_…","token_type":"bearer",
#  "mcp_url":"${MCP_URL}","rest_base":"${APP_BASE}/api/v1"}`

/** Device flow in Python: ends with an API key the script stores and reuses. */
export const deviceFlowPython = `import time, requests

start = requests.post("${DEVICE_CODE_URL}",
                      json={"client_name": "my-cli"}, timeout=30).json()
print("Open this link to connect Octree:", start["verification_uri_complete"])

interval, deadline = start["interval"], time.time() + start["expires_in"]
while time.time() < deadline:
    time.sleep(interval)
    r = requests.post("${DEVICE_TOKEN_URL}", data={
        "grant_type": "${DEVICE_GRANT_TYPE}",
        "device_code": start["device_code"],
    }, timeout=30)
    body = r.json()
    if r.ok:
        api_key = body["api_key"]  # shown once: save it, e.g. as ${API_KEY_ENV}
        break
    if body["error"] == "slow_down":
        interval = body.get("interval", interval + 5)
    elif body["error"] != "authorization_pending":
        raise SystemExit(body["error"])  # access_denied or expired_token
else:
    raise SystemExit("expired_token")`

/** Paste into AGENTS.md or CLAUDE.md so coding agents compile LaTeX through Octree. */
export const agentsMdSnippet = `## LaTeX

Compile LaTeX with the Octree MCP server (\`${MCP_SERVER_NAME}\`, ${MCP_URL}); do not install TeX locally.

- Keep \\documentclass in the main .tex file; pass every project file (.tex, .bib, .cls) as files + main.
- Run \`check_latex\` and fix every reported error (file, line, kind) before checking again.
- When it comes back clean, call \`compile_latex\` once and save the PDF.
- Each call counts toward the daily quota (free 30, Pro 1,000); \`get_quota\` shows what is left.
- No MCP client? POST the same JSON to ${APP_BASE}/api/v1/compile with
  \`Authorization: Bearer $${API_KEY_ENV}\` (docs: https://www.useoctree.com/developers).
- No ${API_KEY_ENV} and the MCP server is not connected? Get a key with the device flow:
  POST ${DEVICE_CODE_URL}, ask the user to open the returned
  verification_uri_complete link, then poll ${DEVICE_TOKEN_URL} every 5 s until it
  returns api_key. Keep it in ${API_KEY_ENV}, never in a committed file.`
