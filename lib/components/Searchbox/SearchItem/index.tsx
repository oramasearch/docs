'use client'

import { FileText } from 'lucide-react'
import { SearchResults } from '@orama/ui/components'
import { useReducer, type FC } from 'react'

import searchReducer, { searchState } from '@/reducers/searchboxReducer'

import { DocumentLink } from '../DocumentLink'
import type { Document } from '../DocumentLink'
import styles from './index.module.css'
import { getFormattedPath } from './utils'

type SearchItemProps = {
  document: Document
}

export const SearchItem: FC<SearchItemProps> = ({ document }) => {
  const [state] = useReducer(searchReducer, searchState)
  const isSearchMode = state.mode === 'search'
  return (
    <SearchResults.Item className={styles.searchResultsItem}>
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
              <p className={styles.searchResultsItemDescription}>
                {getFormattedPath(document.path, document.title)}
              </p>
            )}
        </div>
      </DocumentLink>
    </SearchResults.Item>
  )
}
