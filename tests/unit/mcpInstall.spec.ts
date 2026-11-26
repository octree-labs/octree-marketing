import { describe, expect, it } from 'vitest'

import {
  API_KEY_PLACEHOLDER,
  DEVICE_CODE_URL,
  DEVICE_GRANT_TYPE,
  DEVICE_TOKEN_URL,
  MCP_URL,
  OAUTH_AUTHORIZATION_SERVER_URL,
  OAUTH_PROTECTED_RESOURCE_URL,
  agentsMdSnippet,
  claudeCodeCommand,
  codexToml,
  cursorInstallUrl,
  deviceFlowCurl,
  deviceFlowPython,
  genericMcpJson,
  vscodeAddMcpCommand,
  vscodeMcpJson,
  vscodeMcpJsonOAuth,
} from '@/utilities/mcpInstall'

const decodeCursorConfig = (link: string) => {
  const url = new URL(link)
  const config = url.searchParams.get('config')
  expect(config).toBeTruthy()
  return { url, config: JSON.parse(Buffer.from(config!, 'base64').toString('utf8')) }
}

describe('cursorInstallUrl', () => {
  it('uses the documented deeplink and, without a key, decodes to a URL-only entry (OAuth)', () => {
    const { url, config } = decodeCursorConfig(cursorInstallUrl())
    expect(url.protocol).toBe('cursor:')
    expect(url.host).toBe('anysphere.cursor-deeplink')
    expect(url.pathname).toBe('/mcp/install')
    expect(url.searchParams.get('name')).toBe('octree')
    expect(config).toEqual({ url: MCP_URL })
  })

  it('adds the Authorization header when given a key', () => {
    const { config } = decodeCursorConfig(cursorInstallUrl(API_KEY_PLACEHOLDER))
    expect(config).toEqual({
      url: MCP_URL,
      headers: { Authorization: `Bearer ${API_KEY_PLACEHOLDER}` },
    })
  })

  it('treats an empty key as OAuth', () => {
    expect(decodeCursorConfig(cursorInstallUrl('')).config).toEqual({ url: MCP_URL })
  })

  it('carries a real key and survives base64 characters like + and /', () => {
    const key = 'oct_live_abc?>?>+/=='
    const { config } = decodeCursorConfig(cursorInstallUrl(key))
    expect(config.headers.Authorization).toBe(`Bearer ${key}`)
  })
})

const parseAddMcp = (cmd: string) =>
  JSON.parse(cmd.replace(/^code --add-mcp '/, '').replace(/'$/, ''))

describe('VS Code', () => {
  it('code --add-mcp without a key has no headers (OAuth)', () => {
    expect(parseAddMcp(vscodeAddMcpCommand())).toEqual({
      name: 'octree',
      type: 'http',
      url: MCP_URL,
    })
  })

  it('OAuth mcp.json has only the URL and no inputs', () => {
    const json = JSON.parse(vscodeMcpJsonOAuth)
    expect(json).toEqual({ servers: { octree: { type: 'http', url: MCP_URL } } })
  })

  it('code --add-mcp argument is valid JSON with a name and http transport', () => {
    const cmd = vscodeAddMcpCommand('oct_live_x')
    const json = JSON.parse(cmd.replace(/^code --add-mcp '/, '').replace(/'$/, ''))
    expect(json).toEqual({
      name: 'octree',
      type: 'http',
      url: MCP_URL,
      headers: { Authorization: 'Bearer oct_live_x' },
    })
  })

  it('mcp.json uses a secret input for the key', () => {
    const json = JSON.parse(vscodeMcpJson)
    expect(json.servers.octree).toEqual({
      type: 'http',
      url: MCP_URL,
      headers: { Authorization: 'Bearer ${input:octree-api-key}' },
    })
    expect(json.inputs[0]).toMatchObject({ id: 'octree-api-key', password: true })
  })
})

describe('other snippets', () => {
  it('generic mcpServers config: URL only without a key, header with one', () => {
    expect(JSON.parse(genericMcpJson()).mcpServers.octree).toEqual({ url: MCP_URL })
    expect(JSON.parse(genericMcpJson('k')).mcpServers.octree).toEqual({
      url: MCP_URL,
      headers: { Authorization: 'Bearer k' },
    })
  })

  it('Claude Code command matches the documented syntax', () => {
    expect(claudeCodeCommand()).toBe(`claude mcp add --transport http octree ${MCP_URL}`)
    expect(claudeCodeCommand('k')).toBe(
      `claude mcp add --transport http octree ${MCP_URL} --header "Authorization: Bearer k"`,
    )
  })

  it('Codex config reads the key from the environment', () => {
    expect(codexToml).toContain('[mcp_servers.octree]')
    expect(codexToml).toContain('bearer_token_env_var = "OCTREE_API_KEY"')
  })

  it('AGENTS.md snippet names the tools and the env var', () => {
    expect(agentsMdSnippet).toContain('check_latex')
    expect(agentsMdSnippet).toContain('compile_latex')
    expect(agentsMdSnippet).toContain('Bearer $OCTREE_API_KEY')
  })

  it('AGENTS.md snippet falls back to the device flow when no key is configured', () => {
    expect(agentsMdSnippet).toContain(DEVICE_CODE_URL)
    expect(agentsMdSnippet).toContain(DEVICE_TOKEN_URL)
    expect(agentsMdSnippet).toContain('verification_uri_complete')
  })
})

describe('OAuth and device flow endpoints', () => {
  it('discovery URLs live on the app origin', () => {
    expect(OAUTH_PROTECTED_RESOURCE_URL).toBe(
      'https://app.useoctree.com/.well-known/oauth-protected-resource',
    )
    expect(OAUTH_AUTHORIZATION_SERVER_URL).toBe(
      'https://app.useoctree.com/.well-known/oauth-authorization-server',
    )
  })

  it('device flow samples use the RFC 8628 grant type and both endpoints', () => {
    expect(DEVICE_CODE_URL).toBe('https://app.useoctree.com/api/v1/device/code')
    expect(DEVICE_TOKEN_URL).toBe('https://app.useoctree.com/api/v1/device/token')
    expect(DEVICE_GRANT_TYPE).toBe('urn:ietf:params:oauth:grant-type:device_code')
    for (const sample of [deviceFlowCurl, deviceFlowPython]) {
      expect(sample).toContain(DEVICE_CODE_URL)
      expect(sample).toContain(DEVICE_TOKEN_URL)
      expect(sample).toContain(DEVICE_GRANT_TYPE)
      expect(sample).toContain('authorization_pending')
      expect(sample).toContain('slow_down')
    }
    expect(deviceFlowPython).toContain('verification_uri_complete')
    expect(deviceFlowCurl).toContain('"client_name":"my-cli"')
  })
})
