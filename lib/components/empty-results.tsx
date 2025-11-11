'use client'

import { Sparkles } from 'lucide-react'
import { SearchResults, Suggestions } from '@orama/ui/components'
import type { FC } from 'react'

import { useSearchbox } from '@/providers/searchboxProvider'

export const EmptyResults: FC = () => {
  const searchbox = useSearchbox()
  const isSearchMode = searchbox?.mode === 'search'

  return (
    <SearchResults.NoResults>
      {(term) => (
        <>
          {term ? (
            <div className='pb-31 flex h-full items-center justify-center pt-10 text-sm text-neutral-800 dark:text-neutral-500'>
              <p>No results found for "{term}"</p>
            </div>
          ) : (
            <Suggestions.Wrapper className='flex min-h-0 flex-1 flex-col overflow-y-auto pb-4 text-neutral-900 dark:text-neutral-200'>
              <p className='my-3 text-xs font-semibold uppercase text-neutral-800 dark:text-neutral-500'>
                Suggestions
              </p>
              <Suggestions.Item
                onClick={() => searchbox?.switchTo('chat')}
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                className='flex cursor-pointer items-center gap-2 rounded-lg border border-transparent py-2 text-sm text-fd-primary focus-visible:border-fd-primary focus-visible:outline-none dark:text-fd-primary dark:focus-visible:border-fd-primary [&_svg]:size-5'
              >
                <Sparkles />
                What is Orama?
              </Suggestions.Item>
              <Suggestions.Item
                onClick={() => searchbox?.switchTo('chat')}
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                className='flex cursor-pointer items-center gap-2 rounded-lg border border-transparent py-2 text-sm text-fd-primary focus-visible:border-fd-primary focus-visible:outline-none dark:text-fd-primary dark:focus-visible:border-fd-primary [&_svg]:size-5'
              >
                <Sparkles />
                Does Orama integrate with Shopify?
              </Suggestions.Item>
              <Suggestions.Item
                tabIndex={isSearchMode ? 0 : -1}
                aria-hidden={!isSearchMode}
                onClick={() => searchbox?.switchTo('chat')}
                className='flex cursor-pointer items-center gap-2 rounded-lg border border-transparent py-2 text-sm text-fd-primary focus-visible:border-fd-primary focus-visible:outline-none dark:text-fd-primary dark:focus-visible:border-fd-primary [&_svg]:size-5'
              >
                <Sparkles />
                How do I create an answer session?
              </Suggestions.Item>
            </Suggestions.Wrapper>
          )}
        </>
      )}
    </SearchResults.NoResults>
  )
}
