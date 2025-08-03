import type { Page } from '@/lib/source'

import dedent from 'dedent'
import remarkMdx from 'remark-mdx'
import remarkGfm from 'remark-gfm'
import { remark } from 'remark'
import { fileGenerator, remarkDocGen, remarkInstall } from 'fumadocs-docgen'
import { remarkAutoTypeTable } from 'fumadocs-typescript'
import { remarkInclude } from 'fumadocs-mdx/config'

const processor = remark()
  .use(remarkMdx)
  .use(remarkInclude)
  .use(remarkGfm)
  .use(remarkAutoTypeTable)
  .use(remarkDocGen, { generators: [fileGenerator()] })
  .use(remarkInstall)

export async function getLLMText(page: Page) {
  const category = page.slugs[0]

  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content
  })

  return dedent`# ${category}: ${page.data.title}
  URL: ${page.url}
  Source: https://raw.githubusercontent.com/oramasearch/docs/refs/heads/main/content/docs/${page.file.path}

  ${page.data.description}
        
  ${processed.value}`
}

export async function getOramaText(page: Page) {
  const category = page.slugs[0]

  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content
  })

  return {
    url: page.url,
    category: category,
    title: page.data.title,
    description: page.data.description,
    content: processed.value
  }
}
