import { useState, useRef, useEffect } from 'react'
import { SearchInput, SearchRoot, SearchResults } from '@orama/ui/components'
import { useArrowKeysNavigation } from '@orama/ui/hooks'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { collectionManager } from '../data'

type SearchDropdownProps = {
  placeholder?: string
}

export const DropdownSearch: React.FC<SearchDropdownProps> = ({
  placeholder = 'Search...'
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: arrowNavRef, onKeyDown } = useArrowKeysNavigation()

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

  return (
    <div ref={containerRef}>
      <SearchRoot client={collectionManager}>
        <section
          ref={arrowNavRef}
          className='relative'
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            onKeyDown(e.nativeEvent)
          }}
        >
          <SearchInput.Wrapper>
            <SearchInput.Input
              aria-label='Search'
              placeholder={placeholder}
              onChange={(e) => {
                setOpen(true)
              }}
            />
          </SearchInput.Wrapper>

          {open && (
            <section className='absolute h-auto top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden'>
              <SearchResults.Wrapper className='max-h-80 overflow-auto'>
                <SearchResults.NoResults>
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
                          data-focus-on-arrow-nav
                          as={Link}
                          href={result.document.path}
                          onClick={() => setOpen(false)}
                          className='text-left w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-0 focus:bg-gray-50 dark:focus:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-600 last:border-b-0'
                        >
                          <div className='flex-shrink-0'>
                            <FileText className='w-4 h-4 text-gray-400' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
                              {(result.document?.title as string) ?? ''}
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2'>
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
            </section>
          )}
        </section>
      </SearchRoot>
    </div>
  )
}
