'use client'

import { Search, ArrowLeftIcon, SparklesIcon } from 'lucide-react'
import { Modal } from '@orama/ui/components/Modal'
import classNames from 'classnames'
import type { FC } from 'react'
import { useState } from 'react'

import '@orama/ui/styles.css'

export const MobileTopBar: FC<{
  isChatOpen: boolean
  onSelect?: (mode: 'search' | 'chat') => void
}> = ({ isChatOpen, onSelect }) => {
  const [animated, setAnimated] = useState(false)

  function selectMode(mode: 'search' | 'chat') {
    onSelect?.(mode)

    if (!animated) {
      setAnimated(true)
    }
  }

  return (
    <div className='relative flex justify-center p-4 lg:hidden'>
      <Modal.Close
        className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-900 dark:text-neutral-200 [&_svg]:size-4 cursor-pointer'
        aria-label='Close search modal'
      >
        <ArrowLeftIcon />
      </Modal.Close>
      <div className='rounded-4xl flex bg-neutral-200 p-1 text-sm text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200'>
        <button
          type='button'
          className={classNames(
            'flex items-center gap-1 px-4 py-1 [&_svg]:size-4 cursor-pointer',
            {
              'before:rounded-4xl relative z-10 text-white before:absolute before:inset-0 before:z-[-1] before:bg-black motion-safe:transition-colors dark:text-neutral-900 dark:before:bg-white':
                !isChatOpen,
              'before:animate-slide-to-left': !isChatOpen && animated
            }
          )}
          onClick={() => selectMode('search')}
        >
          <span>Search</span>
          <Search />
        </button>
        <button
          type='button'
          className={classNames(
            'flex items-center gap-1 px-4 py-1 [&_svg]:size-4 cursor-pointer',
            {
              'before:rounded-4xl relative z-10 text-white before:absolute before:inset-0 before:z-[-1] before:bg-black motion-safe:transition-colors dark:text-neutral-900 dark:before:bg-white':
                isChatOpen,
              'before:animate-slide-to-right': isChatOpen && animated
            }
          )}
          onClick={() => selectMode('chat')}
        >
          <SparklesIcon />
          <span>Ask AI</span>
        </button>
      </div>
    </div>
  )
}
