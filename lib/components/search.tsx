'use client'

import { Search as SearchIcon } from 'lucide-react'
import { SearchInput } from '@orama/ui/components'
import type { FC, PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'

import { useSearchbox } from '@/providers/searchboxProvider'

import { Footer } from '@/lib/components/footer-searchbox'
import { SearchResultsWrapper } from '@/components/search-results'

type SearchProps = PropsWithChildren & React.RefAttributes<HTMLInputElement>

export const Search: FC<SearchProps> = ({ ref }) => {
  const searchbox = useSearchbox()
  const isSearchMode = searchbox?.mode === 'search'

  const pathname = usePathname()
  const pathSegment = pathname.split('/')[2]
  const datasourceIDMap: Record<string, string> = {
    'orama-js': process.env.NEXT_PUBLIC_ORAMA_JS_DATASOURCE_ID as string,
    cloud: process.env.NEXT_PUBLIC_ORAMA_CLOUD_DATASOURCE_ID as string
  }
  const datasourceIDs = datasourceIDMap[pathSegment]

  return (
    <div className='flex grow flex-col overflow-hidden'>
      <SearchInput.Wrapper className='relative [&_svg]:absolute [&_svg]:left-3 [&_svg]:top-1/2 [&_svg]:size-4 [&_svg]:-translate-y-1/2 [&_svg]:text-neutral-500 [&_svg]:dark:text-neutral-600'>
        <SearchIcon />
        <SearchInput.Input
          inputId='orama-doc-search'
          ariaLabel='Search documents'
          placeholder='Search documents'
          tabIndex={isSearchMode ? 0 : -1}
          aria-hidden={!isSearchMode}
          className='w-full border-b border-neutral-200 bg-transparent py-4 pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none dark:border-neutral-900 dark:text-neutral-200 dark:placeholder:text-neutral-600'
          searchParams={{
            groupBy: {
              properties: ['category']
            },
            facets: {
              category: {}
            },
            ...(!datasourceIDs ? {} : { datasourceIDs: [datasourceIDs] })
          }}
          ref={ref}
        />
      </SearchInput.Wrapper>

      <SearchResultsWrapper />
      <Footer />
    </div>
  )
}
