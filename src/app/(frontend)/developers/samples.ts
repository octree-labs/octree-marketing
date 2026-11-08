/**
 * Code samples for /developers. Kept as String.raw so LaTeX and JSON
 * backslashes appear exactly as a reader should type them.
 */

export const API_BASE = 'https://app.useoctree.com'
export const MCP_URL = `${API_BASE}/api/mcp`
export const COMPILE_URL = `${API_BASE}/api/v1/compile`
export const API_KEYS_URL = `${API_BASE}/settings#api-keys`

export const claudeCode = String.raw`claude mcp add --transport http octree https://app.useoctree.com/api/mcp \
  --header "Authorization: Bearer oct_live_…"`

export const claudeCodePrompt =
  'Write main.tex for a two-page lab report and compile it with Octree.'

export const mcpConfig = String.raw`{
  "mcpServers": {
    "octree": {
      "url": "https://app.useoctree.com/api/mcp",
      "headers": {
        "Authorization": "Bearer oct_live_…"
      }
    }
  }
}`

export const curlJson = String.raw`export OCTREE_API_KEY=oct_live_…

curl https://app.useoctree.com/api/v1/compile \
  -H "Authorization: Bearer $OCTREE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"latex":"\\documentclass{article}\\begin{document}Hello\\end{document}"}'`

export const curlPdf = String.raw`curl https://app.useoctree.com/api/v1/compile \
  -H "Authorization: Bearer $OCTREE_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/pdf" \
  -d '{"latex":"\\documentclass{article}\\begin{document}Hello\\end{document}","response":"pdf"}' \
  -o out.pdf`

export const python = String.raw`import base64, os, requests

resp = requests.post(
    "https://app.useoctree.com/api/v1/compile",
    headers={"Authorization": f"Bearer {os.environ['OCTREE_API_KEY']}"},
    json={"latex": open("main.tex").read()},
    timeout=120,
)
resp.raise_for_status()
data = resp.json()
if data["ok"]:
    open("out.pdf", "wb").write(base64.b64decode(data["pdf_base64"]))
else:
    for e in data["errors"]:
        print(f'{e["file"]}:{e["line"]}: {e["message"]}')`

export const node = String.raw`import { readFile, writeFile } from "node:fs/promises";

const res = await fetch("https://app.useoctree.com/api/v1/compile", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.OCTREE_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ latex: await readFile("main.tex", "utf8") }),
});
if (!res.ok) throw new Error("HTTP " + res.status + ": " + (await res.text()));
const data = await res.json();
if (data.ok) await writeFile("out.pdf", Buffer.from(data.pdf_base64, "base64"));
else console.error(data.errors);`

export const requestSingle = String.raw`{
  "latex": "\\documentclass{article}\\begin{document}Hello\\end{document}",
  "response": "json"
}`

export const requestFiles = String.raw`{
  "files": [
    { "path": "main.tex", "content": "\\documentclass{article}\n\\begin{document}\n\\input{sections/intro}\n\\cite{knuth84}\n\\bibliographystyle{plain}\n\\bibliography{refs}\n\\end{document}" },
    { "path": "sections/intro.tex", "content": "\\section{Introduction}\nHello." },
    { "path": "refs.bib", "content": "@book{knuth84, author={Knuth, Donald E.}, title={The TeXbook}, year={1984}, publisher={Addison-Wesley}}" }
  ],
  "main": "main.tex",
  "engine": "pdflatex"
}`

export const responseOk = String.raw`{
  "ok": true,
  "pdf_base64": "JVBERi0xLjUKJcfsj6IK…",
  "pages": 1,
  "duration_ms": 1840,
  "warnings": [],
  "log_tail": "Output written on main.pdf (1 page, 10432 bytes)."
}`

export const responseLatexError = String.raw`{
  "ok": false,
  "errors": [
    {
      "file": "main.tex",
      "line": 7,
      "message": "Undefined control sequence. \\foo",
      "kind": "undefined_control_sequence"
    }
  ],
  "log_tail": "! Undefined control sequence.\nl.7 \\foo …",
  "suggestion": "…",
  "duration_ms": 960
}`

export const responseQuota = String.raw`{
  "error": "quota_exceeded",
  "limit": 30,
  "used": 30,
  "resets_at": "2026-11-09T00:00:00Z",
  "upgrade_url": "https://…"
}`

export const meRequest = String.raw`curl https://app.useoctree.com/api/v1/me \
  -H "Authorization: Bearer $OCTREE_API_KEY"`

export const meResponse = String.raw`{
  "user_id": "3f6c…",
  "plan": "free",
  "daily_limit": 30,
  "used_today": 4
}`
