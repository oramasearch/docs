'use client'

import { Sparkles } from 'lucide-react'
import { FacetTabs, SearchResults, SlidingPanel } from '@orama/ui/components'
import { useSearch } from '@orama/ui/hooks/useSearch'
import classNames from 'classnames'
import type { FC } from 'react'

import { useSearchbox } from '@/providers/searchboxProvider'

import type { Document } from './document-link'
import { EmptyResults } from './empty-results'
import { SearchItem } from './search-item'

export const SearchResultsWrapper: FC = () => {
  const {
    context: { searchTerm, selectedFacet }
  } = useSearch()
  const searchbox = useSearchbox()
  const isSearchMode = searchbox?.mode === 'search'

  return (
    <div className='flex grow flex-col overflow-y-auto'>
      <div className='hidden border-b border-neutral-200 p-2 lg:block dark:border-neutral-900 [&_svg]:size-4'>
        <SlidingPanel.Trigger
          onClick={() => searchbox?.switchTo('chat')}
          className={classNames(
            'flex w-full cursor-pointer items-center gap-2 rounded-lg border border-transparent bg-transparent p-3 text-sm duration-300 hover:bg-neutral-300 focus-visible:border-fd-primary focus-visible:outline-none motion-safe:transition-colors dark:hover:bg-neutral-900 dark:focus-visible:border-fd-primary',
            {
              'bg-neutral-300 dark:bg-neutral-900': searchTerm
            }
          )}
          tabIndex={isSearchMode ? 0 : -1}
          aria-hidden={!isSearchMode}
          initialPrompt={searchTerm || undefined}
          data-focus-on-arrow-nav
        >
          <Sparkles />
          <span>
            {searchTerm ? `${searchTerm} - ` : ''}
            Get summary
          </span>
        </SlidingPanel.Trigger>
      </div>

      <div className='grow overflow-y-auto px-5 pt-3 text-muted-foreground lg:grow-0 [&::-webkit-scrollbar]:size-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-neutral-900'>
        <SearchResults.Wrapper>
          <FacetTabs.Wrapper className='mb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
            <FacetTabs.List
              className='flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden'
              itemClassName='min-w-fit'
            >
              {(group, isSelected) => (
                <>
                  <FacetTabs.Item
                    isSelected={group.name === selectedFacet}
                    group={group}
                    filterBy='category'
                    searchParams={{
                      term: searchTerm ?? ''
                    }}
                    tabIndex={isSearchMode ? 0 : -1}
                    aria-hidden={!isSearchMode}
                    className={classNames(
                      'flex cursor-pointer items-center gap-2 rounded-3xl border px-3 py-1 text-sm duration-300 focus:outline-none focus-visible:bg-neutral-300 motion-safe:transition-colors dark:border-neutral-900 dark:focus-visible:bg-neutral-900 text-primary',
                      {
                        'border-fd-primary!': isSelected,
                        'border-neutral-800!': !isSelected
                      }
                    )}
                  >
                    {group.name}
                    <span className='text-muted-foreground/60'>
                      ({group.count})
                    </span>
                  </FacetTabs.Item>
                </>
              )}
            </FacetTabs.List>
          </FacetTabs.Wrapper>

          <SearchResults.Loading>
            <div className='flex flex-col gap-5 py-6'>
              {[...Array(3)].map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={index} className='flex items-center gap-4'>
                  <div className='dark:animate-pulse-dark animate-pulse rounded-md h-6 w-5 shrink-0' />
                  <div className='flex flex-1 flex-col gap-2'>
                    <div className='dark:animate-pulse-dark animate-pulse rounded-md h-3 w-1/3' />
                    <div className='dark:animate-pulse-dark animate-pulse rounded-md h-3 w-2/3' />
                  </div>
                </div>
              ))}
            </div>
          </SearchResults.Loading>

          <EmptyResults />

          <SearchResults.GroupsWrapper
            className='relative items-start overflow-y-auto'
            groupBy='category'
          >
            {(group) => (
              <div
                key={group.name}
                className='mb-3 border-t border-neutral-200 dark:border-neutral-900 first:border-0'
              >
                <h2 className='mb-3 mt-4 pl-2 text-sm font-semibold text-muted-foreground/70'>
                  {group.name}
                </h2>
                <SearchResults.GroupList group={group}>
                  {(hit) => <SearchItem document={hit.document as Document} />}
                </SearchResults.GroupList>
              </div>
            )}
          </SearchResults.GroupsWrapper>
        </SearchResults.Wrapper>
      </div>
    </div>
  )
}
