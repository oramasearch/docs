'use client'
import type { FC, PropsWithChildren } from 'react'
import { useEffect, useState, useRef } from 'react'

import { useSearchbox } from '@/providers/searchboxProvider'

import { ChatInput } from './chat-input'
import { ChatInteractionsContainer } from './chat-interactions'
import { Footer } from './footer'
import { MobileTopBar } from './mobile-top-bar'
import { Search } from './search'
import { SlidingChatPanel } from './sliding-chat-panel'

export const InnerSearchboxModal: FC<PropsWithChildren> = () => {
  const searchbox = useSearchbox()
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const displaySearch =
    !isMobileScreen || (isMobileScreen && searchbox?.mode === 'search')

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.innerWidth < 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  return (
    <>
      {isMobileScreen && (
        <MobileTopBar
          isChatOpen={searchbox?.mode === 'chat'}
          onSelect={searchbox?.switchTo}
        />
      )}
      {displaySearch && <Search ref={searchInputRef} />}
      {isMobileScreen && searchbox?.mode === 'chat' && (
        <>
          <div className='flex grow flex-col overflow-hidden px-4 pb-4'>
            <div className='grow overflow-hidden'>
              <ChatInteractionsContainer />
            </div>
            <div className='mt-4'>
              <ChatInput />
            </div>
          </div>
          <Footer />
        </>
      )}
      {!isMobileScreen && searchbox?.mode === 'chat' && (
        <SlidingChatPanel
          open={searchbox?.isChatOpen}
          onClose={() => {
            searchbox?.closeChatAndReset(() => {
              searchInputRef.current?.focus()
            })
          }}
        />
      )}
    </>
  )
}
