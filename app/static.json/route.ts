import type { OramaDocument } from 'fumadocs-core/search/orama-cloud'
import { NextResponse } from 'next/server'
import { source } from '@/lib/source'

export const revalidate = false

export async function GET(): Promise<Response> {
  const pages = source.getPages()
  const results = await Promise.all(
    pages.map(async page => {
      return {
        id: page.url,
        structured: page.data.structuredData,
        tag: page.slugs[0],
        url: page.url,
        title: page.data.title,
        description: page.data.description
      } satisfies OramaDocument
    })
  )

  return NextResponse.json(results)
}
