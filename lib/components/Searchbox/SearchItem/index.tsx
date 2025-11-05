'use client'

import { FileText } from 'lucide-react'
import { SearchResults } from '@orama/ui/components'
import { useReducer, type FC } from 'react'

import searchReducer, { searchState } from '@/reducers/searchboxReducer'

import { DocumentLink } from '../DocumentLink'
import type { Document } from '../DocumentLink'
import { getFormattedPath } from './utils'

type SearchItemProps = {
  document: Document
}

export const SearchItem: FC<SearchItemProps> = ({ document }) => {
  const [state] = useReducer(searchReducer, searchState)
  const isSearchMode = state.mode === 'search'
  return (
    <SearchResults.Item className='[&>a]:flex [&>a]:items-center [&>a]:gap-4 [&>a]:rounded-lg [&>a]:border [&>a]:border-transparent [&>a]:px-2 [&>a]:py-3 [&>a]:text-sm [&>a]:outline-none [&>a]:duration-300 [&>a]:hover:bg-neutral-300 [&>a]:focus-visible:border-green-600 [&>a]:focus-visible:bg-transparent [&>a]:motion-safe:transition-colors [&>a]:dark:bg-zinc-950 [&>a]:dark:hover:bg-neutral-900 [&>a]:lg:dark:bg-neutral-950 [&_svg]:size-5 [&_svg]:shrink-0'>
      <DocumentLink
        document={document as Document}
        tabIndex={isSearchMode ? 0 : -1}
        aria-hidden={!isSearchMode}
        data-focus-on-arrow-nav
      >
        <FileText />
        <div>
          {typeof document?.title === 'string' && <h3>{document.title}</h3>}
          {typeof document?.title === 'string' &&
            typeof document?.path === 'string' && (
              <p className='text-sm text-neutral-600 dark:text-neutral-700'>
                {getFormattedPath(document.path, document.title)}
              </p>
            )}
        </div>
      </DocumentLink>
    </SearchResults.Item>
  )
}
