import fs from 'node:fs'
import { createHash } from 'node:crypto'
import { globSync } from 'glob'
import { compile } from '@mdx-js/mdx'

function hash(string: string) {
  return createHash('md5').update(string).digest('hex')
}

async function main() {
  const docsPath = new URL('../content/docs', import.meta.url)
  const allDocs = globSync('**/*.mdx', {
    cwd: docsPath,
    absolute: true,
    nodir: true
  })

  const docsContent = []

  for (const path of allDocs) {
    const content = fs.readFileSync(path, 'utf-8')
    const relativePath = path.replace(docsPath.pathname, '')

    docsContent.push({
      id: hash(path),
      absolutePath: path,
      relativePath,
      content,
      markdown: await compile(content)
    })
  }

  console.log(docsContent)
}

main()
