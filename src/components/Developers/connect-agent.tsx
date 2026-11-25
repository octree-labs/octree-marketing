'use client'

import React, { useId, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { EVENTS, track } from '@/lib/analytics'
import {
  API_KEY_PLACEHOLDER,
  API_KEYS_URL,
  MCP_URL,
  claudeCodeCommand,
  codexToml,
  cursorInstallUrl,
  genericMcpJson,
  vscodeAddMcpCommand,
  vscodeMcpJson,
} from '@/utilities/mcpInstall'

import { CodeBlock } from './code-block'

const KEY_PATTERN = /^oct_live_[A-Za-z0-9_-]+$/

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] [overflow-wrap:anywhere]">
    {children}
  </code>
)

const ClientCard: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({
  id,
  title,
  children,
}) => (
  <section id={id} className="scroll-mt-24 rounded-lg border border-border p-4 sm:p-5">
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <div className="space-y-3 text-sm text-muted-foreground">{children}</div>
  </section>
)

/**
 * "Connect your agent": install buttons and copyable configs for each MCP
 * client. An optional key field fills the snippets in the browser only; the
 * key is never sent anywhere or included in analytics.
 */
export const ConnectAgent: React.FC = () => {
  const inputId = useId()
  const [rawKey, setRawKey] = useState('')
  const trimmed = rawKey.trim()
  const keyValid = KEY_PATTERN.test(trimmed)
  const key = keyValid ? trimmed : API_KEY_PLACEHOLDER

  const onInstall = (client: string) => () =>
    track(EVENTS.CTA_CLICKED, { location: `developers:${client}`, action: 'install' })

  // ph-no-capture keeps PostHog autocapture and session replay out of this block, so a
  // pasted key never leaves the page through an href or recorded text.
  return (
    <div className="ph-no-capture not-prose my-6 space-y-4">
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-5">
        <p className="mb-3 text-sm">
          <strong>1. Get a key.</strong> Create one under Settings → API keys. It starts with{' '}
          <Code>oct_live_</Code> and is shown once.
        </p>
        <a
          href={API_KEYS_URL}
          className={buttonVariants({ size: 'sm' })}
          data-cta-location="developers:get_key"
        >
          Create an API key
        </a>
        <label htmlFor={inputId} className="mt-4 mb-1 block text-sm">
          <strong>2. Optional:</strong> paste it to fill in the snippets below. It stays in this
          browser tab.
        </label>
        <input
          id={inputId}
          type="password"
          autoComplete="off"
          spellCheck={false}
          placeholder="oct_live_…"
          value={rawKey}
          onChange={(e) => setRawKey(e.target.value)}
          className="w-full max-w-md rounded-md border border-border bg-background px-3 py-1.5 font-mono text-sm"
        />
        {trimmed && !keyValid && (
          <p className="mt-1 text-xs text-destructive">
            That does not look like an Octree key (oct_live_…); the snippets keep the placeholder.
          </p>
        )}
      </div>

      <div className="grid gap-4">
        <ClientCard id="connect-cursor" title="Cursor">
          <p>
            One click opens Cursor&rsquo;s install prompt with the server filled in.
            {keyValid ? null : (
              <>
                {' '}
                Then replace <Code>{API_KEY_PLACEHOLDER}</Code> with your key in Cursor Settings →
                MCP (or <Code>~/.cursor/mcp.json</Code>).
              </>
            )}
          </p>
          <a
            href={cursorInstallUrl(key)}
            onClick={onInstall('cursor')}
            className={buttonVariants({ size: 'sm' })}
          >
            Add to Cursor
          </a>
        </ClientCard>

        <ClientCard id="connect-claude-code" title="Claude Code">
          <p>Run once in a terminal, then ask Claude to write and compile your document.</p>
          <CodeBlock
            title="bash"
            code={claudeCodeCommand(key)}
            trackLocation="developers:claude_code"
          />
        </ClientCard>

        <ClientCard id="connect-claude" title="Claude (claude.ai and Claude Desktop)">
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Open <strong>Customize → Connectors</strong>, click <strong>+ Add</strong>, then{' '}
              <strong>Add custom connector</strong>.
            </li>
            <li>
              Name it <Code>Octree</Code> and enter the URL <Code>{MCP_URL}</Code>.
            </li>
            <li>
              Choose <strong>No sign in</strong>, and under <strong>Request headers</strong> add{' '}
              <Code>Authorization</Code> with the value <Code>Bearer {key}</Code>.
            </li>
            <li>
              Click <strong>Add</strong>, then turn it on in a chat from{' '}
              <strong>+ → Connectors</strong>.
            </li>
          </ol>
          <p>
            On Team and Enterprise plans an owner adds it under Organization settings → Connectors.
            Sign-in with your Octree account (OAuth) is on the way, so Claude, ChatGPT and other
            clients will be able to connect without pasting a key; the key keeps working.
          </p>
        </ClientCard>

        <ClientCard id="connect-vscode" title="VS Code (GitHub Copilot)">
          <p>Add it to your VS Code profile from a terminal:</p>
          <CodeBlock
            title="bash"
            code={vscodeAddMcpCommand(key)}
            trackLocation="developers:vscode"
          />
          <p>
            Or, per workspace, put this in <Code>.vscode/mcp.json</Code>. VS Code asks for the key
            the first time the server starts and stores it as a secret, so the file is safe to
            commit.
          </p>
          <CodeBlock
            title=".vscode/mcp.json"
            code={vscodeMcpJson}
            trackLocation="developers:vscode_json"
          />
        </ClientCard>

        <ClientCard id="connect-codex" title="Codex CLI">
          <p>
            Codex reads the key from the <Code>OCTREE_API_KEY</Code> environment variable.
          </p>
          <CodeBlock title="config.toml" code={codexToml} trackLocation="developers:codex" />
        </ClientCard>

        <ClientCard id="connect-other" title="Windsurf, Cline and other MCP clients">
          <p>
            Clients with an <Code>mcpServers</Code> config take a remote server as a URL and headers
            (some call the field <Code>serverUrl</Code>). Keep the key in your user-level config,
            not a shared repository.
          </p>
          <CodeBlock
            title="mcp.json"
            code={genericMcpJson(key)}
            trackLocation="developers:mcp_json"
          />
        </ClientCard>
      </div>
    </div>
  )
}
