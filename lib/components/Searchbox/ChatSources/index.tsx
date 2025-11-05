import type { Interaction, AnyObject } from '@orama/core'
import { ChatInteractions } from '@orama/ui/components'
import type { FC } from 'react'

import type { Document } from '../DocumentLink'
import { DocumentLink } from '../DocumentLink'

type ChatSourcesProps = {
  interaction: Interaction
}

const ChatSources: FC<ChatSourcesProps> = ({ interaction }) => {
  if (!interaction?.sources) {
    return null
  }

  return (
    <ChatInteractions.Sources
      interaction={interaction}
      className='mb-4 flex flex-nowrap items-center gap-3 overflow-x-scroll scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    >
      {(document: AnyObject, index: number) => (
        <div
          className='flex max-w-full items-center gap-2 text-base'
          key={index}
        >
          {!!document.title && typeof document.title === 'string' && (
            <DocumentLink
              document={document as Document}
              className='w-3xs rounded-xl bg-neutral-100 px-4 py-2 text-neutral-900 duration-300 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none motion-safe:transition-colors dark:bg-neutral-950 dark:text-neutral-200 hover:dark:bg-neutral-900 focus:dark:bg-neutral-900'
              data-focus-on-arrow-nav
            >
              <span className='max-w-full overflow-hidden truncate text-ellipsis whitespace-nowrap text-sm font-semibold'>
                {document.title && document.title.length > 25
                  ? `${document.title.substring(0, 25)}...`
                  : document.title}
              </span>
            </DocumentLink>
          )}
        </div>
      )}
    </ChatInteractions.Sources>
  )
}

export default ChatSources
