'use client'

import { Send, CirclePause } from 'lucide-react'
import { PromptTextArea, Suggestions } from '@orama/ui/components'
import { useChat } from '@orama/ui/hooks'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'

export const ChatInput: FC = () => {
  const {
    context: { interactions }
  } = useChat()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const suggestions = [
    'components.search.suggestionOne',
    'components.search.suggestionTwo',
    'components.search.suggestionThree'
  ]

  const hasInteractions = !!interactions?.length

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      {!hasInteractions && (
        <Suggestions.Wrapper className='mb-4 flex items-center gap-2 overflow-x-auto px-1 text-sm lg:justify-center [&::-webkit-scrollbar]:hidden'>
          {suggestions.map((suggestion) => (
            <Suggestions.Item
              className='flex size-max cursor-pointer whitespace-nowrap rounded-full border border-neutral-300 bg-neutral-200 px-3 py-1 text-neutral-900 duration-300 hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none motion-safe:transition-colors dark:border-neutral-900 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900'
              key={suggestion}
            >
              {suggestion}
            </Suggestions.Item>
          ))}
        </Suggestions.Wrapper>
      )}
      <div className='px-1'>
        <PromptTextArea.Wrapper className='flex items-center rounded-2xl border border-neutral-300 bg-neutral-100 py-2 pl-3 pr-1 dark:border-neutral-900 dark:bg-neutral-950'>
          <PromptTextArea.Field
            id='orama-chat-input'
            name='chat-input'
            placeholder={'components.search.chatPlaceholder'}
            rows={1}
            maxLength={500}
            autoFocus
            ref={textareaRef}
            className='flex-1 border-0 bg-transparent text-neutral-900 focus:outline-none dark:text-neutral-200'
          />
          <PromptTextArea.Button
            abortContent={<CirclePause />}
            className='cursor-pointer rounded-xl bg-fd-primary p-2 text-white duration-300 focus:bg-fd-primary/75 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-200/60 disabled:text-neutral-800 motion-safe:transition-colors dark:bg-fd-primary dark:text-neutral-400 focus:dark:bg-fd-primary/75 disabled:dark:bg-neutral-900/60 [&_svg]:size-4'
          >
            <Send />
          </PromptTextArea.Button>
        </PromptTextArea.Wrapper>
        <div className='pt-1 text-center text-xs text-neutral-800 sm:text-sm dark:text-neutral-500'>
          <small>components.search.disclaimer</small>
        </div>
      </div>
    </>
  )
}
