'use client'

import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
import { nextTabIndex, tabIdFromHash } from '@/utilities/tabNav'
import { cn } from '@/utilities/ui'

import { CodeBlock } from './code-block'
import { Code } from './inline-text'

const KEY_PATTERN = /^oct_live_[A-Za-z0-9_-]+$/

export const CLIENT_IDS = ['claude-code', 'cursor', 'claude', 'vscode', 'codex', 'other'] as const
export type ClientId = (typeof CLIENT_IDS)[number]

const CLIENT_TABS: Record<ClientId, { tab: string; title: string }> = {
  'claude-code': { tab: 'Claude Code', title: 'Claude Code' },
  cursor: { tab: 'Cursor', title: 'Cursor' },
  claude: { tab: 'Claude', title: 'Claude (claude.ai and Claude Desktop)' },
  vscode: { tab: 'VS Code', title: 'VS Code (GitHub Copilot)' },
  codex: { tab: 'Codex', title: 'Codex CLI' },
  other: { tab: 'Other', title: 'Windsurf, Cline and other MCP clients' },
}

/** Hash aliases, so links such as /developers#windsurf land on the right tab. */
const HASH_ALIASES: Record<string, ClientId> = {
  claudecode: 'claude-code',
  'vs-code': 'vscode',
  copilot: 'vscode',
  'claude-desktop': 'claude',
  'claude-ai': 'claude',
  'codex-cli': 'codex',
  windsurf: 'other',
  cline: 'other',
}

/** Panel ids keep the old card anchors (#connect-cursor, …) working. */
const panelId = (id: ClientId) => `connect-${id}`
const tabId = (id: ClientId) => `connect-${id}-tab`

const linkClass = 'font-medium text-foreground underline underline-offset-4'

const KeyField: React.FC<{
  id: string
  value: string
  onChange: (value: string) => void
  invalid: boolean
}> = ({ id, value, onChange, invalid }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm">
      <span className="font-medium text-foreground">Optional:</span> paste a key to fill it into
      the snippets. It stays in this browser tab.
    </label>
    <input
      id={id}
      type="password"
      autoComplete="off"
      spellCheck={false}
      autoCapitalize="off"
      placeholder="oct_live_…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid || undefined}
      className="h-10 w-full max-w-md rounded-md border border-border bg-background px-3 font-mono text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    />
    {invalid && (
      <p className="mt-1.5 text-xs text-destructive">
        That does not look like an Octree key (oct_live_…); the snippets keep the placeholder.
      </p>
    )}
  </div>
)

/** "Use an API key instead": closed by default; its snippets stay in the HTML. */
const KeyDisclosure: React.FC<{
  fieldId: string
  rawKey: string
  setRawKey: (value: string) => void
  invalid: boolean
  children: React.ReactNode
}> = ({ fieldId, rawKey, setRawKey, invalid, children }) => (
  <details className="group mt-5 rounded-lg border border-border">
    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
      Use an API key instead
      <ChevronDown
        aria-hidden
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
      />
    </summary>
    <div className="min-w-0 space-y-4 border-t border-border px-4 pb-4 pt-4">
      <p>
        Create one under{' '}
        <a href={API_KEYS_URL} className={linkClass} data-cta-location="developers:get_key">
          Settings → API keys
        </a>
        . It starts with <Code>oct_live_</Code> and is shown once.
      </p>
      <KeyField id={fieldId} value={rawKey} onChange={setRawKey} invalid={invalid} />
      <div className="min-w-0 space-y-3">{children}</div>
    </div>
  </details>
)

/**
 * "Connect your agent": a client picker with the OAuth sign-in setup first and
 * the API-key variant behind a disclosure. All panels are server-rendered (the
 * inactive ones hidden), so every snippet is in the HTML. The optional key
 * field fills the key snippets in the browser only; the key lives in component
 * state and is never sent anywhere or included in analytics.
 */
export const ConnectAgent: React.FC = () => {
  const baseId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Partial<Record<ClientId, HTMLButtonElement | null>>>({})
  const [active, setActive] = useState<ClientId>('claude-code')
  const [rawKey, setRawKey] = useState('')
  const trimmed = rawKey.trim()
  const keyValid = KEY_PATTERN.test(trimmed)
  const keyInvalid = trimmed !== '' && !keyValid
  const key = keyValid ? trimmed : API_KEY_PLACEHOLDER

  // Deep links: #cursor, #connect-cursor (old card anchors) and aliases select a tab.
  useEffect(() => {
    const apply = () => {
      const id = tabIdFromHash(window.location.hash, CLIENT_IDS, {
        prefix: 'connect-',
        aliases: HASH_ALIASES,
      })
      if (!id) return
      setActive(id)
      requestAnimationFrame(() => rootRef.current?.scrollIntoView({ block: 'start' }))
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [])

  const select = useCallback((id: ClientId, focus = false) => {
    setActive(id)
    if (focus) tabRefs.current[id]?.focus()
    try {
      window.history.replaceState(window.history.state, '', `#${id}`)
    } catch {
      // Some embedded browsers block history changes; the tab still switches.
    }
  }, [])

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const next = nextTabIndex(CLIENT_IDS.indexOf(active), e.key, CLIENT_IDS.length)
    if (next === null) return
    e.preventDefault()
    select(CLIENT_IDS[next]!, true)
  }

  const onInstall = (client: string) => () =>
    track(EVENTS.CTA_CLICKED, { location: `developers:${client}`, action: 'install' })

  const disclosure = (id: ClientId, children: React.ReactNode) => (
    <KeyDisclosure
      fieldId={`${baseId}-key-${id}`}
      rawKey={rawKey}
      setRawKey={setRawKey}
      invalid={keyInvalid}
    >
      {children}
    </KeyDisclosure>
  )

  const panels: Record<ClientId, React.ReactNode> = {
    'claude-code': (
      <>
        <p>
          Add the server, then run <Code>/mcp</Code> in Claude Code, pick <strong>octree</strong>{' '}
          and choose <strong>Authenticate</strong> to sign in in the browser.
        </p>
        <CodeBlock title="bash" code={claudeCodeCommand()} trackLocation="developers:claude_code" />
        {disclosure(
          'claude-code',
          <CodeBlock
            title="bash"
            code={claudeCodeCommand(key)}
            trackLocation="developers:claude_code_key"
            className="my-0"
          />,
        )}
      </>
    ),
    cursor: (
      <>
        <p>
          One click opens Cursor&rsquo;s install prompt with the server filled in. Cursor then shows{' '}
          <strong>Needs login</strong> next to Octree: click it to sign in in the browser.
        </p>
        <div className="mt-4">
          <a href={cursorInstallUrl()} onClick={onInstall('cursor')} className={buttonVariants()}>
            Add to Cursor
          </a>
        </div>
        {disclosure(
          'cursor',
          <>
            {keyValid ? (
              <div>
                <p className="mb-3">This link adds the server with your key in the header.</p>
                <a
                  href={cursorInstallUrl(key)}
                  onClick={onInstall('cursor_key')}
                  className={cn(buttonVariants({ variant: 'outline' }), 'rounded-[10px]')}
                >
                  Add to Cursor with this key
                </a>
              </div>
            ) : (
              <p>
                Paste a key above for an install link with the key filled in, or add this to{' '}
                <Code>~/.cursor/mcp.json</Code>:
              </p>
            )}
            <CodeBlock
              title="~/.cursor/mcp.json"
              code={genericMcpJson(key)}
              trackLocation="developers:cursor_json_key"
              className="my-0"
            />
          </>,
        )}
      </>
    ),
    claude: (
      <>
        <ol className="list-decimal space-y-1.5 pl-5 marker:text-muted-foreground">
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
            <strong>Allow</strong>.
          </li>
          <li>
            Turn it on in a chat from <strong>+ → Connectors</strong>.
          </li>
        </ol>
        <p className="mt-3 text-sm">
          On Team and Enterprise plans an owner adds the connector under Organization settings →
          Connectors; each member then connects their own Octree account.
        </p>
        {disclosure(
          'claude',
          <p>
            Choose <strong>No sign in</strong> instead, and under <strong>Request headers</strong>{' '}
            add <Code>Authorization</Code> with the value <Code>Bearer {key}</Code>.
          </p>,
        )}
      </>
    ),
    vscode: (
      <>
        <p>
          Add it to your VS Code profile from a terminal. When the server first starts, VS Code asks
          you to sign in and opens the browser.
        </p>
        <CodeBlock title="bash" code={vscodeAddMcpCommand()} trackLocation="developers:vscode" />
        <p>
          Or, per workspace, in <Code>.vscode/mcp.json</Code> (no secret, safe to commit):
        </p>
        <CodeBlock
          title=".vscode/mcp.json"
          code={vscodeMcpJsonOAuth}
          trackLocation="developers:vscode_json"
        />
        {disclosure(
          'vscode',
          <>
            <CodeBlock
              title="bash"
              code={vscodeAddMcpCommand(key)}
              trackLocation="developers:vscode_key"
              className="my-0"
            />
            <p>
              Or in <Code>.vscode/mcp.json</Code>: VS Code asks for the key the first time the
              server starts and stores it as a secret, so this file is safe to commit too.
            </p>
            <CodeBlock
              title=".vscode/mcp.json"
              code={vscodeMcpJson}
              trackLocation="developers:vscode_json_key"
              className="my-0"
            />
          </>,
        )}
      </>
    ),
    codex: (
      <>
        <p>
          Codex reads an API key from the <Code>OCTREE_API_KEY</Code> environment variable. Create
          one under{' '}
          <a href={API_KEYS_URL} className={linkClass} data-cta-location="developers:get_key">
            Settings → API keys
          </a>
          , or get one from a terminal with the{' '}
          <a href="#device-flow" className={linkClass}>
            device flow
          </a>
          .
        </p>
        <CodeBlock title="~/.codex/config.toml" code={codexToml} trackLocation="developers:codex" />
      </>
    ),
    other: (
      <>
        <p>
          Clients that support MCP sign-in (OAuth) only need the URL (some call the field{' '}
          <Code>serverUrl</Code>):
        </p>
        <CodeBlock title="mcp.json" code={genericMcpJson()} trackLocation="developers:mcp_json" />
        {disclosure(
          'other',
          <>
            <p>
              For clients without OAuth, add the key as a header. Keep it in your user-level
              config, not a shared repository.
            </p>
            <CodeBlock
              title="mcp.json"
              code={genericMcpJson(key)}
              trackLocation="developers:mcp_json_key"
              className="my-0"
            />
          </>,
        )}
      </>
    ),
  }

  // ph-no-capture keeps PostHog autocapture and session replay out of this block, so a
  // pasted key never leaves the page through an href or recorded text.
  return (
    <div ref={rootRef} className="ph-no-capture not-prose my-6 min-w-0 scroll-mt-24">
      <div
        role="tablist"
        aria-label="MCP client"
        onKeyDown={onTabKeyDown}
        className="flex min-w-0 gap-1 overflow-x-auto rounded-lg border border-border bg-muted/40 p-1"
      >
        {CLIENT_IDS.map((id) => (
          <button
            key={id}
            ref={(el) => {
              tabRefs.current[id] = el
            }}
            id={tabId(id)}
            type="button"
            role="tab"
            aria-selected={id === active}
            aria-controls={panelId(id)}
            tabIndex={id === active ? 0 : -1}
            onClick={() => select(id)}
            className={cn(
              'h-10 shrink-0 whitespace-nowrap rounded-md px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              id === active
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
            )}
          >
            {CLIENT_TABS[id].tab}
          </button>
        ))}
      </div>

      {CLIENT_IDS.map((id) => (
        <section
          key={id}
          id={panelId(id)}
          role="tabpanel"
          aria-labelledby={tabId(id)}
          tabIndex={0}
          hidden={id !== active}
          className="mt-3 min-w-0 scroll-mt-24 rounded-lg border border-border p-4 text-[15px] leading-relaxed text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
        >
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            {CLIENT_TABS[id].title}
          </h3>
          {panels[id]}
        </section>
      ))}

      <p className="mt-3 text-sm text-muted-foreground">
        Apps connected with sign-in can only compile and check LaTeX (scope <Code>compile</Code>).
        Disconnect them any time under{' '}
        <a href={CONNECTED_APPS_URL} className={linkClass}>
          Settings → Connected apps
        </a>
        .
      </p>
    </div>
  )
}
