'use client'

import { Search as SearchIcon } from 'lucide-react'
import { SearchInput } from '@orama/ui/components'
import type { FC, PropsWithChildren } from 'react'

import { useSearchbox } from '@/providers/searchboxProvider'

import { Footer } from '../Footer'
import { SearchResultsWrapper } from '../SearchResults'
import styles from './index.module.css'

type SearchProps = PropsWithChildren & React.RefAttributes<HTMLInputElement>

export const Search: FC<SearchProps> = ({ ref }) => {
  const searchbox = useSearchbox()
  const isSearchMode = searchbox?.mode === 'search'

  return (
    <div className={styles.searchContainer}>
      <SearchInput.Wrapper className={styles.searchInputWrapper}>
        <SearchIcon />
        <SearchInput.Input
          inputId='orama-doc-search'
          ariaLabel='Search documents'
          placeholder='Search documents'
          tabIndex={isSearchMode ? 0 : -1}
          aria-hidden={!isSearchMode}
          className={styles.searchInput}
          searchParams={{
            groupBy: {
              properties: ['siteSection']
            },
            facets: {
              siteSection: {}
            }
          }}
          ref={ref}
        />
      </SearchInput.Wrapper>

      <SearchResultsWrapper />
      <Footer />
    </div>
  )
}
