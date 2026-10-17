import type { Metadata } from 'next/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Zap, Server } from 'lucide-react'
import { DocsSidebar } from './docs-sidebar'
import { CodeSnippet } from './code-snippet'
import { ResponseTabs } from './response-tabs'

export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Compile API Documentation',
  description:
    'A high-performance LaTeX compilation service featuring intelligent caching and incremental compilation for fast PDF generation.',
  alternates: { canonical: '/docs/compile-api' },
  openGraph: {
    title: 'Octree Compile API Documentation',
    description:
      'A high-performance LaTeX compilation service featuring intelligent caching and incremental compilation.',
    type: 'website',
    url: '/docs/compile-api',
  },
}

export default function CompileApiDocsPage() {
  return (
    <div className="container relative py-12 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <DocsSidebar />

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-4xl prose dark:prose-invert">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Compile API</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A high-performance LaTeX compilation service featuring intelligent caching and
              incremental compilation for fast PDF generation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-500" />
                    Base URL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="text-sm bg-muted px-2 py-1.5 rounded font-mono">
                    https://compile.useoctree.com
                  </code>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Up to 49x faster on cache hits (~10ms) and 30-40% faster on text edits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-16">
            {/* Health Check */}
            <section id="health-check" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-xs font-bold tracking-wider text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-1 rounded font-mono">
                  GET
                </span>
                Health Check
              </h2>
              <p className="text-muted-foreground mb-6">
                Verify the compilation service is running and accessible.
              </p>

              <div className="not-prose">
                <CodeSnippet code="curl https://compile.useoctree.com/health" />
              </div>
            </section>

            <hr className="border-border" />

            {/* Multi-file Compile */}
            <section id="compile-multi-file" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-semibold m-0 flex items-center gap-3">
                  <span className="text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-1 rounded font-mono">
                    POST
                  </span>
                  Compile Multi-File Project
                </h2>
                <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium not-prose">
                  Recommended
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Send a JSON payload with multiple files, assets, and project identifiers to take full
                advantage of intelligent caching and incremental compilation.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                    Headers
                  </h4>
                  <div className="not-prose inline-flex bg-muted/50 border rounded-md px-3 py-1.5 text-sm font-mono">
                    <span className="text-muted-foreground mr-2">Content-Type:</span>
                    application/json
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
                    Payload Parameters
                  </h4>
                  <div className="not-prose border rounded-lg divide-y overflow-hidden text-sm bg-card">
                    <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 hover:bg-muted/50 transition-colors">
                      <div className="font-mono font-medium text-foreground">files</div>
                      <div className="text-muted-foreground font-mono text-xs">Array</div>
                      <div className="md:col-span-2 text-muted-foreground">
                        Array of objects containing <code className="bg-muted px-1 py-0.5 rounded border">path</code> and{' '}
                        <code className="bg-muted px-1 py-0.5 rounded border">content</code> for each file.
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 hover:bg-muted/50 transition-colors">
                      <div className="font-mono font-medium text-foreground">projectId</div>
                      <div className="text-muted-foreground font-mono text-xs">String</div>
                      <div className="md:col-span-2 text-muted-foreground">
                        Unique identifier for the project. Essential for enabling caching across requests.
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 hover:bg-muted/50 transition-colors">
                      <div className="font-mono font-medium text-foreground">lastModifiedFile</div>
                      <div className="text-muted-foreground font-mono text-xs">String (Optional)</div>
                      <div className="md:col-span-2 text-muted-foreground">
                        Hint for the compiler to optimize incremental rebuilds.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                      Example Request
                    </h4>
                    <div className="not-prose">
                      <CodeSnippet
                        code={`curl -X POST https://compile.useoctree.com/compile \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{ 
    "files": [
      {
        "path": "main.tex",
        "content": "\\\\documentclass{article}\\n\\\\begin{document}\\nHello World!\\n\\\\end{document}"
      }
    ],
    "projectId": "my-project-123",
    "lastModifiedFile": "main.tex"
  }' \\
  --output output.pdf`}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                      Response Structure
                    </h4>
                    <div className="not-prose">
                      <ResponseTabs
                        tabs={[
                          {
                            status: '200',
                            label: 'OK',
                            code: `// Returns binary PDF data directly.\nContent-Type: application/pdf\nContent-Disposition: attachment; filename="output.pdf"`,
                          },
                          {
                            status: '400',
                            label: 'Bad Request',
                            code: `Content-Type: application/json\n{\n  "error": "Compilation failed",\n  "logs": "Detailed compilation logs..."\n}`,
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* Caching & Performance Strategy */}
            <section id="performance-caching" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6">Caching & Performance Strategy</h2>
              <p className="text-muted-foreground mb-6">
                When providing a <code className="text-foreground bg-muted px-1.5 py-0.5 rounded text-sm font-mono before:content-none after:content-none">projectId</code> in the JSON payload, the API uses a robust caching strategy to optimize compilation times significantly:
              </p>
              
              <div className="grid gap-6 not-prose">
                <Card className="bg-muted/30 border-none shadow-none">
                  <CardContent className="p-6 flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground">Content Hashing</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Entire file sets are hashed. If the hash matches a cached entry, the resulting PDF is returned instantly in approximately 10ms.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-none shadow-none">
                  <CardContent className="p-6 flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground">Incremental Builds</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Temp directories preserve <code className="bg-muted border px-1 rounded font-mono text-xs text-foreground">.aux</code> and <code className="bg-muted border px-1 rounded font-mono text-xs text-foreground">.bbl</code> files. When only <code className="bg-muted border px-1 rounded font-mono text-xs text-foreground">.tex</code> files change, the compiler intelligently skips bibtex, resulting in 30-40% faster compiles.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-none shadow-none">
                  <CardContent className="p-6 flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground">Eviction Policy</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Projects are automatically evicted from memory after 30 minutes of inactivity, with a maximum of 15 actively cached projects maintained via an LRU cache.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <p className="text-muted-foreground mt-8">
                Interested in an API key for this endpoint? Reach out for API key at{' '}
                <a href="mailto:basil@useoctree.online">basil@useoctree.online</a> for $20 USD / month
                (unlimited files).
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
