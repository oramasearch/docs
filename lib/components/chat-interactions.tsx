'use client'

import { ArrowDown } from 'lucide-react'
import type { Interaction } from '@orama/core'
import { ChatInteractions } from '@orama/ui/components'
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer'

import { ChatMessage } from '@/components/chat-message'

export const ChatInteractionsContainer = () => {
  const {
    containerRef,
    scrollToBottom,
    recalculateGoToBottomButton,
    showGoToBottomButton
  } = useScrollableContainer()

  return (
    <>
      <div
        ref={containerRef}
        className='relative mb-6 flex h-full flex-1 flex-col items-start overflow-auto px-1 [&::-webkit-scrollbar]:size-1.5 [&::-webkit-scrollbar-track]:rounded-md [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-neutral-900'
      >
        <ChatInteractions.Wrapper
          onScroll={recalculateGoToBottomButton}
          onStreaming={recalculateGoToBottomButton}
          onNewInteraction={() => scrollToBottom({ animated: true })}
          className='flex w-full flex-wrap gap-6 [&>div]:w-full'
        >
          {(interaction: Interaction) => (
            <ChatMessage interaction={interaction} />
          )}
        </ChatInteractions.Wrapper>
      </div>
      {showGoToBottomButton && (
        <button
          type='button'
          onClick={() => scrollToBottom({ animated: true })}
          className='absolute bottom-36 left-1/2 inline-flex -translate-x-1/2 items-center justify-center rounded-xl bg-neutral-200 p-2 text-neutral-900 duration-300 focus:bg-neutral-300 focus:outline-none motion-safe:transition-colors lg:bottom-28 dark:bg-neutral-900 dark:text-neutral-200 focus:dark:bg-neutral-800 [&_svg]:size-4 cursor-pointer'
          aria-label='Scroll to bottom'
        >
          <ArrowDown />
        </button>
      )}
    </>
  )
}
