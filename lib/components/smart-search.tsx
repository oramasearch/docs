'use client'

import {
  SearchRoot,
  SearchInput,
  SearchResults,
  Suggestions,
  ChatRoot
} from '@orama/ui/components'
import { useArrowKeysNavigation } from '@orama/ui/hooks'
import { FileText, Sparkles } from 'lucide-react'
import { CollectionManager } from '@orama/core'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const collectionManager = new CollectionManager({
  url: 'https://atlantis.cluster.oramacore.com',
  collectionID: 'ooo4f22zau7q7ta4i1grlgji',
  readAPIKey: 'WvStWzar7tqdX3FOZbhCMDWSQsWAewUu'
})

// TOOD: this shoule be ai generated
const suggestions = [
  'When I should use Orama JS?',
  'What is the power of Orama?',
  'What are the minimum requirements for Orama Core?',
  'I’d like to install Orama on my server',
  'How many datasource can Orama support?'
]

export function SmartSearch() {
  const [mounted, setMounted] = useState(false)
  const { ref, onKeyDown } = useArrowKeysNavigation()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SearchRoot client={collectionManager}>
      <ChatRoot client={collectionManager}>
        <section
          className='p-4 rounded-3xl border border-b w-full relative bg-fd-background'
          ref={ref}
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            console.log('KeyDown', e.nativeEvent, ref.current)
            onKeyDown(e.nativeEvent)
          }}
        >
          <SearchInput.Wrapper className='mx-auto'>
            <SearchInput.Input
              className='w-full p-3 rounded-md border border-input bg-input/30 shadow-inner shadow-input/20 focus:outline-none'
              placeholder='Search for docs, guides, or examples...'
            />
          </SearchInput.Wrapper>
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
                  <Suggestions.List className='w-full flex flex-wrap gap-4 items-center justify-center'>
                    {suggestions.map((suggestion, index) => (
                      <Suggestions.Item
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className={`text-xs text-muted-foreground opacity-0 ${
                          mounted
                            ? `suggestion-animate suggestion-delay-${index}`
                            : ''
                        }`}
                        itemClassName='cursor-pointer px-3 py-2 bg-input/30 rounded-md border border-input shadow-inner shadow-input/20 hover:bg-input/50 hover:text-base-foreground transition-colors duration-200'
                      >
                        <Sparkles className='inline mr-2 size-4' />
                        {suggestion}
                      </Suggestions.Item>
                    ))}
                  </Suggestions.List>
                </Suggestions.Wrapper>
              )
            }
          </SearchResults.NoResults>
          <SearchResults.Wrapper className='mx-auto mt-4 empty:hidden h-64 overflow-auto'>
            <SearchResults.List className='w-full'>
              {(result, index) => (
                <SearchResults.Item
                  key={result.id}
                  data-focus-on-arrow-nav
                  as={Link}
                  href='#replace-me'
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
              )}
            </SearchResults.List>
          </SearchResults.Wrapper>
        </section>
      </ChatRoot>
    </SearchRoot>
  )
}
