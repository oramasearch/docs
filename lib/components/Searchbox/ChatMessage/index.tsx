import type { Interaction } from '@orama/core'
import { ChatInteractions } from '@orama/ui/components'
import type { FC } from 'react'

import { ChatActions } from '../ChatActions'
import ChatSources from '../ChatSources'

type ChatMessageProps = {
  interaction: Interaction
}

const TypingIndicator: FC = () => (
  <div className='flex items-center gap-1 rounded-xl bg-neutral-200 p-4 dark:bg-neutral-950'>
    <span className='animate-dot-move size-1 rounded-full bg-neutral-500 dark:bg-neutral-400' />
    <span className='animate-dot-move-delay-200 size-1 rounded-full bg-neutral-500 dark:bg-neutral-400' />
    <span className='animate-dot-move-delay-400 size-1 rounded-full bg-neutral-500 dark:bg-neutral-400' />
  </div>
)

export const ChatMessage: FC<ChatMessageProps> = ({ interaction }) => {
  if (!interaction) {
    return null
  }

  return (
    <>
      <ChatInteractions.UserPrompt className='py-3 [&_p]:max-w-2xl [&_p]:rounded-xl [&_p]:text-neutral-900 [&_p]:dark:text-neutral-200'>
        <p>{interaction?.query}</p>
      </ChatInteractions.UserPrompt>

      <ChatSources interaction={interaction} />

      <ChatInteractions.Loading interaction={interaction}>
        <div className='rounded-xl bg-neutral-100 px-4 py-1 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-200'>
          <TypingIndicator />
        </div>
      </ChatInteractions.Loading>

      {interaction.response && (
        <div className='my-2 rounded-xl bg-neutral-100 px-4 py-1 text-neutral-900 empty:hidden dark:bg-neutral-950 dark:text-neutral-200'>
          <ChatInteractions.AssistantMessage
            className=''
            markdownClassnames={{
              p: 'my-2 leading-relaxed',
              pre: 'my-6 text-md overflow-x-auto hljs [&_pre]:bg-neutral-900! [&_pre]:text-sm [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:whitespace-break-spaces wrap-break-word',
              code: 'px-2 py-1 rounded text-sm whitespace-pre-wrap hljs bg-neutral-300 dark:bg-neutral-900',
              table: 'w-full border-collapse my-6',
              thead: 'dark:bg-neutral-900',
              th: 'border border-neutral-300 dark:border-neutral-900 px-3 py-2 text-left font-semibold',
              td: 'border border-neutral-300 dark:border-neutral-900 px-3 py-2',
              tr: 'border-b border-white/10',
              h1: 'text-2xl font-bold mb-4 mt-6',
              h2: 'text-xl font-bold mb-3 mt-5',
              h3: 'text-lg font-extrabold my-3',
              ul: 'list-disc pl-10 my-4',
              ol: 'list-decimal pl-4 my-4',
              li: 'mb-0 [&_p]:mb-0',
              hr: 'border-t border-neutral-300 dark:border-neutral-900 my-6',
              blockquote: 'border-l-4 pl-4 my-4 italic',
              a: 'underline'
            }}
          >
            {interaction.response || ''}
          </ChatInteractions.AssistantMessage>
          <ChatActions interaction={interaction} />
        </div>
      )}
    </>
  )
}
