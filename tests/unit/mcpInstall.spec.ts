import { describe, expect, it } from 'vitest'

import {
  API_KEY_PLACEHOLDER,
  MCP_URL,
  agentsMdSnippet,
  claudeCodeCommand,
  codexToml,
  cursorInstallUrl,
  genericMcpJson,
  vscodeAddMcpCommand,
  vscodeMcpJson,
} from '@/utilities/mcpInstall'

const decodeCursorConfig = (link: string) => {
  const url = new URL(link)
  const config = url.searchParams.get('config')
  expect(config).toBeTruthy()
  return { url, config: JSON.parse(Buffer.from(config!, 'base64').toString('utf8')) }
}

describe('cursorInstallUrl', () => {
  it('uses the documented deeplink and decodes to the server entry', () => {
    const { url, config } = decodeCursorConfig(cursorInstallUrl())
    expect(url.protocol).toBe('cursor:')
    expect(url.host).toBe('anysphere.cursor-deeplink')
    expect(url.pathname).toBe('/mcp/install')
    expect(url.searchParams.get('name')).toBe('octree')
    expect(config).toEqual({
      url: MCP_URL,
      headers: { Authorization: `Bearer ${API_KEY_PLACEHOLDER}` },
    })
  })

  it('carries a real key and survives base64 characters like + and /', () => {
    const key = 'oct_live_abc?>?>+/=='
    const { config } = decodeCursorConfig(cursorInstallUrl(key))
    expect(config.headers.Authorization).toBe(`Bearer ${key}`)
  })
})

describe('VS Code', () => {
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
  it('generic mcpServers config is valid JSON', () => {
    expect(JSON.parse(genericMcpJson()).mcpServers.octree.url).toBe(MCP_URL)
  })

  it('Claude Code command matches the documented syntax', () => {
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
})
