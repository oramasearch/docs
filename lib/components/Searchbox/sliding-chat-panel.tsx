'use client'

import { X } from 'lucide-react'
import { SlidingPanel } from '@orama/ui/components'
import type { FC, PropsWithChildren } from 'react'

import { ChatInput } from './chat-input'
import { ChatInteractionsContainer } from './chat-interactions'

type SlidingChatPanelProps = PropsWithChildren<{
  open: boolean
  onClose: () => void
}>

export const SlidingChatPanel: FC<SlidingChatPanelProps> = ({
  open,
  onClose
}) => {
  return (
    <>
      <SlidingPanel.Wrapper open={open} onClose={onClose}>
        <SlidingPanel.Content
          position='bottom'
          className='fixed bottom-0 left-0 box-border h-[95vh] w-full overflow-hidden rounded-lg border border-neutral-300 bg-white p-0 text-white duration-300 motion-safe:ease-in-out dark:border-neutral-900 dark:bg-zinc-950'
        >
          <SlidingPanel.Close
            className='absolute right-6 top-2 z-20 cursor-pointer rounded-full p-2 text-neutral-700 duration-300 hover:bg-white/20 focus:bg-white/20 focus:outline-none motion-safe:transition-colors dark:text-white [&_svg]:size-5'
            aria-label='Close chat panel'
          >
            <X />
          </SlidingPanel.Close>

          <div className='relative mx-auto flex h-full max-w-4xl flex-col justify-between py-6'>
            <ChatInteractionsContainer />
            <div className='relative'>
              <ChatInput />
            </div>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel.Wrapper>
    </>
  )
}
