import type { Interaction, AnyObject } from '@orama/core'
import { ChatInteractions } from '@orama/ui/components'
import type { FC } from 'react'
import { Link2 } from 'lucide-react'

import type { Document } from '@/components/document-link'
import { DocumentLink } from '@/components/document-link'

type ChatSourcesProps = {
  interaction: Interaction
}

export const ChatSources: FC<ChatSourcesProps> = ({ interaction }) => {
  if (!interaction?.sources) {
    return null
  }

  return (
    <ChatInteractions.Sources
      interaction={interaction}
      className='mb-4 flex flex-nowrap items-center gap-3 overflow-x-scroll scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      itemClassName=''
    >
      {(document: AnyObject, index: number) => (
        <div
          className='flex max-w-full items-center gap-2 text-base'
          key={index}
        >
          {!!document.title && typeof document.title === 'string' && (
            <DocumentLink
              document={document as Document}
              className='w-3xs rounded-xl bg-neutral-100 px-4 py-2 text-neutral-900 duration-300 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none motion-safe:transition-colors dark:bg-neutral-900 dark:text-neutral-200 hover:dark:bg-neutral-700 focus:dark:bg-neutral-700'
              data-focus-on-arrow-nav
            >
              <h3 className='text-sm flex gap-1 font-semibold text-secondary-foreground line-clamp-2 items-center'>
                <Link2 className='size-4' />
                {(document.title as string).slice(0, 30) || ''}
                {(document.title as string).length > 30 ? '...' : ''}
              </h3>
              <p className='text-muted-foreground text-xs mt-1 line-clamp-2'>
                {(document.content as string).slice(0, 60)}
                ...
              </p>
            </DocumentLink>
          )}
        </div>
      )}
    </ChatInteractions.Sources>
  )
}
