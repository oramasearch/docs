'use client'

import { SearchRoot, SearchInput, SearchResults } from '@orama/ui/components'
import { CollectionManager } from '@orama/core'

const collectionManager = new CollectionManager({
  url: 'https://atlantis.cluster.oramacore.com',
  collectionID: 'ooo4f22zau7q7ta4i1grlgji',
  readAPIKey: 'WvStWzar7tqdX3FOZbhCMDWSQsWAewUu'
})

export function SmartSearch() {
  return (
    <SearchRoot client={collectionManager}>
      <div className='text-center max-w-5xl w-90/100 md:w-80/100 lg:w-90/100'>
        <SearchInput.Wrapper className='mx-auto'>
          <SearchInput.Input
            className='w-full h-12 px-4 text-sm lg:text-lg leading-none font-normal text-foreground bg-input rounded-md shadow-sm shadow-fd-base-primary/20 focus:ring-2 focus:ring-fd-base-primary/20 focus:outline-none'
            placeholder='Search for docs, guides, or examples...'
          />
        </SearchInput.Wrapper>
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
    </SearchRoot>
  )
}
