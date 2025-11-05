'use client'

import { Sparkles } from 'lucide-react'
import { SearchResults, Suggestions } from '@orama/ui/components'
import type { FC } from 'react'

import { useSearchbox } from '@/providers/searchboxProvider'

import styles from './index.module.css'

export const EmptyResults: FC = () => {
  const searchbox = useSearchbox()
  const isSearchMode = searchbox?.mode === 'search'

  return (
    <SearchResults.NoResults>
      {(term) => (
        <>
          {term ? (
            <div className={styles.noResultsWrapper}>
              <p>No results found for "{term}"</p>
            </div>
          ) : (
            <Suggestions.Wrapper className={styles.suggestionsWrapper}>
              <p className={styles.suggestionsTitle}>Suggestions</p>
              <Suggestions.Item
                onClick={() => searchbox?.switchTo('chat')}
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                className={styles.suggestionItem}
              >
                <Sparkles />
                components.search.suggestionOne
              </Suggestions.Item>
              <Suggestions.Item
                onClick={() => searchbox?.switchTo('chat')}
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                className={styles.suggestionItem}
              >
                <Sparkles />
                components.search.suggestionTwo
              </Suggestions.Item>
              <Suggestions.Item
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                onClick={() => searchbox?.switchTo('chat')}
                className={styles.suggestionItem}
              >
                <Sparkles />
                components.search.suggestionThree
              </Suggestions.Item>
            </Suggestions.Wrapper>
          )}
        </>
      )}
    </SearchResults.NoResults>
  )
}
