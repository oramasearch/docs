import * as marked from 'marked'
import { source } from '@/lib/source'
import { getOramaText } from '@/lib/get-llm-text'

export const revalidate = false

export async function GET() {
  const scan = source.getPages().map(getOramaText)
  const scanned = (await Promise.all(scan)).map(doc => ({
    ...doc,
    content: processMarkdownWithMarked(doc.content)
  }))

  const fullJSON = JSON.stringify(scanned, null, 2)

  return new Response(fullJSON)
}
