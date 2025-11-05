'use client'

import {
  SearchRoot,
  SearchInput,
  SearchResults,
  Suggestions,
  ChatRoot
} from '@orama/ui/components'
import { useRouter } from 'next/navigation'
import { useArrowKeysNavigation } from '@orama/ui/hooks'
import { FileText, Search, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collectionManager, promptSuggestions } from '../data'

export function SmartSearch() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { ref, onKeyDown } = useArrowKeysNavigation()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (prompt: string) => {
    localStorage.setItem('orama_suggested_prompt', prompt)
    router.push('/docs/cloud')
  }

  return (
    <SearchRoot client={collectionManager}>
      <ChatRoot client={collectionManager}>
        <section
          className='p-4 rounded-3xl border border-b border-border w-full relative bg-fd-background'
          ref={ref}
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            onKeyDown(e.nativeEvent)
          }}
        >
          <SearchInput.Wrapper className='mx-auto'>
            <SearchInput.Input
              className='w-full p-3 rounded-md border border-input bg-input/30 shadow-inner shadow-input/20 focus:outline-none'
              placeholder='Search for docs, guides, or examples...'
            />
          </SearchInput.Wrapper>
          <SearchResults.Wrapper className='mx-auto empty:hidden overflow-auto'>
            <SearchResults.NoResults>
              {(searchTerm) =>
                searchTerm ? (
                  <div className='h-64 flex flex-col items-center justify-center'>
                    <p>
                      No results found for{' '}
                      <span className='font-semibold'>"{searchTerm}"</span>
                    </p>
                    <p className='text-muted-foreground py-2'>
                      Try searching for something else!
                    </p>
                  </div>
                ) : (
                  <Suggestions.Wrapper className='mx-auto py-3 mt-2'>
                    <ul className='w-full flex flex-wrap gap-4 items-center justify-center'>
                      {promptSuggestions.map((suggestion, index) => (
                        <li
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          key={index}
                          className={`text-xs text-muted-foreground opacity-0 ${
                            mounted
                              ? `suggestion-animate suggestion-delay-${index}`
                              : ''
                          }`}
                        >
                          <Suggestions.Item
                            className='cursor-pointer px-3 py-2 bg-input/30 rounded-md border border-input shadow-inner shadow-input/20 hover:bg-input/50 hover:text-base-foreground transition-colors duration-200'
                            onClick={() => {
                              handleSearch(suggestion)
                            }}
                          >
                            <Sparkles className='inline mr-2 size-4' />
                            {suggestion}
                          </Suggestions.Item>
                        </li>
                      ))}
                    </ul>
                  </Suggestions.Wrapper>
                )
              }
            </SearchResults.NoResults>
            <SearchResults.Loading>
              <div className='flex flex-col gap-2 h-64 mt-4'>
                {[...Array(5)].map((_, index) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    className='text-left w-full flex items-center gap-2 p-2 rounded-lg hover:bg-accent focus:outline-0 focus:bg-accent transition-colors duration-200'
                  >
                    <div className='flex-0'>
                      {/* add avatar circle */}
                      <div className='h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse' />
                    </div>
                    <div className='flex-1 flex gap-2 flex-wrap'>
                      <div className='h-4 w-2/5 rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse' />
                      <div className='h-4 w-full rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse' />
                    </div>
                  </div>
                ))}
              </div>
            </SearchResults.Loading>
            <SearchResults.List className='w-full h-64 mt-4'>
              {(result) => (
                <>
                  {result.document.path ? (
                    <SearchResults.Item
                      key={result.id}
                      data-focus-on-arrow-nav
                      as={Link}
                      href={result.document.path}
                      className='text-left w-full flex items-center gap-2 p-2 rounded-lg hover:bg-accent focus:outline-0 focus:bg-accent transition-colors duration-200'
                    >
                      <div className='flex-0'>
                        <FileText className='w-4 h-4' />
                      </div>
                      <div className='flex-1'>
                        <p className='text-sm text-secondary-foreground font-medium'>
                          {(result.document?.title as string) ?? ''}
                        </p>
                        <p className='text-xs text-secondary-foreground min-w-0 mt-1'>
                          {result.document?.content
                            ? `${(result.document?.content as string).slice(0, 140)}...`
                            : ''}
                        </p>
                      </div>
                    </SearchResults.Item>
                  ) : null}
                </>
              )}
            </SearchResults.List>
          </SearchResults.Wrapper>
        </section>
      </ChatRoot>
    </SearchRoot>
  )
}
