'use client'

import { useState, useRef, useEffect } from 'react'
import { SearchInput, SearchRoot, SearchResults } from '@orama/ui/components'
import { useArrowKeysNavigation } from '@orama/ui/hooks'
import { FileText, SearchIcon } from 'lucide-react'
import { collectionManager } from '../data'
import { useRouter } from 'next/navigation'

type SearchDropdownProps = {
  placeholder?: string
}

export const DropdownSearch: React.FC<SearchDropdownProps> = ({
  placeholder = 'Search...'
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: arrowNavRef, onKeyDown } = useArrowKeysNavigation()
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value
    if (searchTerm.trim() === '') {
      setOpen(false)
      return
    }
    setOpen(true)
  }

  return (
    <div ref={containerRef} className='search-dropdown'>
      <SearchRoot client={collectionManager}>
        <section
          ref={arrowNavRef}
          className='relative'
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            onKeyDown(e.nativeEvent)
          }}
        >
          <SearchInput.Wrapper className='flex items-center gap-2 w-full p-3 py-2 rounded-md border border-input bg-input/30 shadow-inner shadow-input/20 focus-within:outline-none'>
            <SearchIcon size={16} />
            <SearchInput.Input
              aria-label='Search'
              placeholder={placeholder}
              onChange={changeHandler}
              className='focus:outline-none w-full'
            />
          </SearchInput.Wrapper>

          {open && (
            <SearchResults.Wrapper className='max-h-80 overflow-auto empty:hidden absolute h-auto top-full right-0 mt-2 w-md bg-popover border border-input rounded-lg shadow-lg z-50 suggestion-animate opacity-0'>
              <SearchResults.NoResults className='empty:hidden'>
                {(searchTerm) =>
                  searchTerm ? (
                    <div className='p-4 text-center text-sm text-gray-500'>
                      No results found for{' '}
                      <span className='font-semibold'>"{searchTerm}"</span>
                    </div>
                  ) : null
                }
              </SearchResults.NoResults>

              <SearchResults.List className='w-full'>
                {(result) => (
                  <>
                    {result.document.path ? (
                      <SearchResults.Item
                        key={result.id}
                        as='button'
                        type='button'
                        onClick={(e) => {
                          router.push(result.document.path as string)
                          setOpen(false)
                        }}
                        data-focus-on-arrow-nav
                        className='text-left w-full flex items-center gap-3 p-3 hover:bg-accent focus:bg-accent focus:outline-0 transition-colors duration-200 border-b border-gray-100 dark:border-gray-600 last:border-b-0'
                      >
                        <div className='flex-shrink-0'>
                          <FileText className='w-4 h-4 text-secondary-foreground' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-secondary-foreground truncate'>
                              {result.document?.title as string}
                            </p>
                          </div>
                          <p className='text-xs mt-1 line-clamp-2'>
                            {result.document?.content
                              ? `${(result.document?.content as string).slice(0, 120)}...`
                              : ''}
                          </p>
                        </div>
                      </SearchResults.Item>
                    ) : null}
                  </>
                )}
              </SearchResults.List>
            </SearchResults.Wrapper>
          )}
        </section>
      </SearchRoot>
    </div>
  )
}
