'use client'

import React, { useId, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { EVENTS, track } from '@/lib/analytics'
import {
  API_KEY_PLACEHOLDER,
  API_KEYS_URL,
  CONNECTED_APPS_URL,
  MCP_URL,
  claudeCodeCommand,
  codexToml,
  cursorInstallUrl,
  genericMcpJson,
  vscodeAddMcpCommand,
  vscodeMcpJson,
  vscodeMcpJsonOAuth,
} from '@/utilities/mcpInstall'

import { CodeBlock } from './code-block'

const KEY_PATTERN = /^oct_live_[A-Za-z0-9_-]+$/

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] [overflow-wrap:anywhere]">
    {children}
  </code>
)

const KeyOption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-3 border-t border-border pt-3">
    <p className="font-medium text-foreground">Or use an API key</p>
    {children}
  </div>
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
 * client. Sign-in with OAuth is the default path and needs no key; each card
 * then shows the API-key alternative. An optional key field fills those key
 * snippets in the browser only; the key is never sent anywhere or included in
 * analytics.
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
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-5 text-sm">
        <p className="mb-2">
          <strong>Sign in, no key needed.</strong> Add <Code>{MCP_URL}</Code> to your client with no
          headers. On first use it opens a browser, you sign in to Octree and click{' '}
          <strong>Allow</strong>, and the client is connected. Apps connected this way can only
          compile and check LaTeX (scope <Code>compile</Code>); disconnect them any time under{' '}
          <a href={CONNECTED_APPS_URL} className="underline">
            Settings → Connected apps
          </a>
          .
        </p>
        <p className="mb-3 text-muted-foreground">
          Prefer a key, or using a client without OAuth sign-in? Create one under Settings → API
          keys (it starts with <Code>oct_live_</Code> and is shown once) and use the{' '}
          <em>Or use an API key</em> snippet in each card.
        </p>
        <a
          href={API_KEYS_URL}
          className={buttonVariants({ size: 'sm', variant: 'outline' })}
          data-cta-location="developers:get_key"
        >
          Create an API key
        </a>
        <label htmlFor={inputId} className="mt-4 mb-1 block">
          <strong>Optional:</strong> paste a key to fill in the key snippets below. It stays in this
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
            One click opens Cursor&rsquo;s install prompt with the server filled in. Cursor then
            shows <strong>Needs login</strong> next to Octree: click it to sign in in the browser.
          </p>
          <a
            href={cursorInstallUrl()}
            onClick={onInstall('cursor')}
            className={buttonVariants({ size: 'sm' })}
          >
            Add to Cursor
          </a>
          <KeyOption>
            {keyValid ? (
              <>
                <p>This link adds the server with your key in the Authorization header.</p>
                <a
                  href={cursorInstallUrl(key)}
                  onClick={onInstall('cursor_key')}
                  className={buttonVariants({ size: 'sm', variant: 'outline' })}
                >
                  Add to Cursor with this key
                </a>
              </>
            ) : (
              <p>
                Paste a key above for an install link with the key filled in, or add it yourself in{' '}
                <Code>~/.cursor/mcp.json</Code> with the <Code>mcpServers</Code> snippet at the end
                of this section.
              </p>
            )}
          </KeyOption>
        </ClientCard>

        <ClientCard id="connect-claude-code" title="Claude Code">
          <p>
            Add the server, then run <Code>/mcp</Code> inside Claude Code, pick{' '}
            <strong>octree</strong> and choose <strong>Authenticate</strong> to sign in in the
            browser.
          </p>
          <CodeBlock
            title="bash"
            code={claudeCodeCommand()}
            trackLocation="developers:claude_code"
          />
          <KeyOption>
            <CodeBlock
              title="bash"
              code={claudeCodeCommand(key)}
              trackLocation="developers:claude_code_key"
            />
          </KeyOption>
        </ClientCard>

        <ClientCard id="connect-claude" title="Claude (claude.ai and Claude Desktop)">
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Open <strong>Customize → Connectors</strong>, click <strong>+ Add</strong>, then{' '}
              <strong>Add custom connector</strong>.
            </li>
            <li>
              Name it <Code>Octree</Code> and enter the URL <Code>{MCP_URL}</Code>. Leave the OAuth
              client ID and secret empty: Claude registers itself.
            </li>
            <li>
              Click <strong>Add</strong>, then <strong>Connect</strong>. Sign in to Octree and click{' '}
              <strong>Allow</strong> on the &ldquo;Allow Octree&rdquo; screen.
            </li>
            <li>
              Turn it on in a chat from <strong>+ → Connectors</strong>.
            </li>
          </ol>
          <p>
            On Team and Enterprise plans an owner adds the connector under Organization settings →
            Connectors; each member then connects their own Octree account.
          </p>
          <KeyOption>
            <p>
              Choose <strong>No sign in</strong> instead, and under <strong>Request headers</strong>{' '}
              add <Code>Authorization</Code> with the value <Code>Bearer {key}</Code>.
            </p>
          </KeyOption>
        </ClientCard>

        <ClientCard id="connect-vscode" title="VS Code (GitHub Copilot)">
          <p>
            Add it to your VS Code profile from a terminal. When the server first starts, VS Code
            asks to sign in and opens the browser.
          </p>
          <CodeBlock title="bash" code={vscodeAddMcpCommand()} trackLocation="developers:vscode" />
          <p>
            Or, per workspace, put this in <Code>.vscode/mcp.json</Code>. It holds no secret, so it
            is safe to commit.
          </p>
          <CodeBlock
            title=".vscode/mcp.json"
            code={vscodeMcpJsonOAuth}
            trackLocation="developers:vscode_json"
          />
          <KeyOption>
            <CodeBlock
              title="bash"
              code={vscodeAddMcpCommand(key)}
              trackLocation="developers:vscode_key"
            />
            <p>
              Or in <Code>.vscode/mcp.json</Code>: VS Code asks for the key the first time the
              server starts and stores it as a secret, so this file is safe to commit too.
            </p>
            <CodeBlock
              title=".vscode/mcp.json"
              code={vscodeMcpJson}
              trackLocation="developers:vscode_json_key"
            />
          </KeyOption>
        </ClientCard>

        <ClientCard id="connect-codex" title="Codex CLI">
          <p>
            Codex reads an API key from the <Code>OCTREE_API_KEY</Code> environment variable. No key
            yet? Create one in Settings, or get one from a terminal with the{' '}
            <a href="#device-flow" className="underline">
              device flow
            </a>
            .
          </p>
          <CodeBlock title="config.toml" code={codexToml} trackLocation="developers:codex" />
        </ClientCard>

        <ClientCard id="connect-other" title="Windsurf, Cline and other MCP clients">
          <p>
            Clients that support MCP sign-in (OAuth) only need the URL (some call the field{' '}
            <Code>serverUrl</Code>):
          </p>
          <CodeBlock title="mcp.json" code={genericMcpJson()} trackLocation="developers:mcp_json" />
          <KeyOption>
            <p>
              For clients without OAuth, add the key as a header. Keep it in your user-level config,
              not a shared repository.
            </p>
            <CodeBlock
              title="mcp.json"
              code={genericMcpJson(key)}
              trackLocation="developers:mcp_json_key"
            />
          </KeyOption>
        </ClientCard>
      </div>
    </div>
  )
}
