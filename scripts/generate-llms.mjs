import { readFileSync, writeFileSync } from 'node:fs'
import ts from 'typescript'

const root = new URL('../', import.meta.url)

function entries(path, name) {
  const source = ts.createSourceFile(path, readFileSync(new URL(path, root), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  let array
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === name) array = node.initializer
    ts.forEachChild(node, visit)
  }
  visit(source)
  if (!array || !ts.isArrayLiteralExpression(array)) throw new Error(`Missing registry: ${name}`)
  return array.elements.map((element) => {
    if (!ts.isObjectLiteralExpression(element)) throw new Error(`Unsupported entry in ${name}`)
    return Object.fromEntries(element.properties.flatMap((property) => {
      if (!ts.isPropertyAssignment(property)) return []
      const value = property.initializer
      if (ts.isStringLiteralLike(value)) return [[property.name.getText(source), value.text]]
      if (ts.isTaggedTemplateExpression(value) && value.tag.getText(source) === 'r' && ts.isNoSubstitutionTemplateLiteral(value.template)) {
        return [[property.name.getText(source), value.template.getText(source).slice(1, -1)]]
      }
      return []
    }))
  })
}

const guides = entries('src/app/(frontend)/learn/page.tsx', 'learnTopics')
const errors = entries('src/data/latex-errors.ts', 'latexErrors')
const clean = (text) => text.replace(/[«»]/g, '').replace(/\s+/g, ' ').trim()
const links = (items, prefix) => items.map(({ slug, title, description }) => {
  if (!slug || !title || !description) throw new Error('Incomplete discovery entry')
  return `- [${clean(title)}](https://www.useoctree.com/learn/${prefix}${slug}): ${clean(description)}`
}).join('\n')
const inventory = `## Learning guides\n\n${links(guides, '')}\n\n## LaTeX errors and warnings\n\n${links(errors, 'errors/')}\n\n## Tools\n\n- [Octree tools](https://tools.useoctree.com): LaTeX converters, preview, templates and reference tools.\n- [Current tool inventory](https://tools.useoctree.com/llms.txt): Canonical tool links and descriptions.\n- [LaTeX preview](https://tools.useoctree.com/tools/latex-preview): Compile LaTeX to a PDF preview.\n- [Markdown to LaTeX](https://tools.useoctree.com/tools/markdown-to-latex): Convert Markdown into LaTeX.\n- [Citation generator](https://tools.useoctree.com/tools/citation-generator): Generate citation entries.\n`

writeFileSync(new URL('public/llms.txt', root), `# Octree\n\n> Octree is an AI-assisted LaTeX editor with document editing, PDF compilation and AI chat.\n\n## Product and documentation\n\n- [Website](https://www.useoctree.com): Product information and current plans.\n- [Editor](https://app.useoctree.com): Sign in to write and compile a document.\n- [Learning hub](https://www.useoctree.com/learn): Code-based LaTeX tutorials.\n- [Blog](https://www.useoctree.com/blog): Articles and comparisons.\n- [Developer documentation](https://www.useoctree.com/developers): LaTeX compilation API and MCP server.\n- [Full reference](https://www.useoctree.com/llms-full.txt): API reference and learning inventory.\n- [Contact](https://www.useoctree.com/contact): Contact Octree.\n\nPlan limits and prices can change; use the website and the signed-in billing screen rather than treating this discovery file as a price list.\n\n${inventory}`)

const fullPath = new URL('public/llms-full.txt', root)
const full = readFileSync(fullPath, 'utf8').split('\n## Learning guides\n')[0].trimEnd()
writeFileSync(fullPath, `${full}\n\n${inventory}`)
console.log(`Generated discovery entries for ${guides.length} guides and ${errors.length} errors`)
