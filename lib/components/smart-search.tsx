'use client'

import {
  SearchRoot,
  SearchInput,
  SearchResults,
  Suggestions,
  ChatRoot
} from '@orama/ui/components'
import { Sparkles } from 'lucide-react'
import { CollectionManager } from '@orama/core'
import { useEffect, useState } from 'react'

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
  const [showBorderAnim, setShowBorderAnim] = useState(true)

  useEffect(() => {
    setMounted(true)
    const timeout = setTimeout(() => setShowBorderAnim(false), 2000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <SearchRoot client={collectionManager}>
      <ChatRoot client={collectionManager}>
        <div className='p-4 rounded-3xl border border-b w-full relative'>
          <SearchInput.Wrapper className='mx-auto'>
            <SearchInput.Input
              className='w-full p-3 rounded-md border border-input bg-input/30 shadow-inner shadow-input/20 focus:outline-none'
              placeholder='Search for docs, guides, or examples...'
            />
          </SearchInput.Wrapper>
          <SearchResults.NoResults>
            {(searchTerm) =>
              searchTerm ? (
                <p className='text-center text-muted-foreground'>
                  No results found for{' '}
                  <span className='font-semibold'>{searchTerm}</span>
                </p>
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
          <SearchResults.Wrapper className='mx-auto mt-4 empty:hidden'>
            <SearchResults.List className='w-full'>
              {(result, index) => (
                <SearchResults.Item key={result.id}>
                  <p>{(result.document?.title as string) ?? ''}</p>
                </SearchResults.Item>
              )}
            </SearchResults.List>
          </SearchResults.Wrapper>
        </div>
      </ChatRoot>
    </SearchRoot>
  )
}
