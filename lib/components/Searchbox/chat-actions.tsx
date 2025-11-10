'use client'

import {
  FileCheck,
  ClipboardIcon,
  RotateCcwIcon,
  ThumbsDown
} from 'lucide-react'
import type { Interaction } from '@orama/core'
import { ChatInteractions } from '@orama/ui/components'
import classNames from 'classnames'
import type { FC } from 'react'
import { useState } from 'react'

type ChatActionsProps = {
  interaction: Interaction
}

export const ChatActions: FC<ChatActionsProps> = ({ interaction }) => {
  const [isDisliked, setIsDisliked] = useState(false)

  const dislikeMessage = () => setIsDisliked(!isDisliked)

  if (!interaction.response) {
    return null
  }

  return (
    <div className='flex items-center justify-end'>
      <ul className='flex list-none items-center gap-2 p-0'>
        <li>
          <ChatInteractions.RegenerateLatest
            className='cursor-pointer rounded-full p-2 text-neutral-800 duration-300 hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none motion-safe:transition-colors dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900 [&_svg]:size-4'
            interaction={interaction}
          >
            <RotateCcwIcon />
          </ChatInteractions.RegenerateLatest>
        </li>
        <li>
          <ChatInteractions.CopyMessage
            className='cursor-pointer rounded-full p-2 text-neutral-800 duration-300 hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none motion-safe:transition-colors dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900 [&_svg]:size-4'
            interaction={interaction}
          >
            {(copied: boolean) =>
              copied ? (
                <FileCheck className='text-fd-primary' />
              ) : (
                <ClipboardIcon />
              )
            }
          </ChatInteractions.CopyMessage>
        </li>
        {!interaction.loading && (
          <li>
            <button
              className={classNames(
                'cursor-pointer rounded-full p-2 text-neutral-800 duration-300 hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none motion-safe:transition-colors dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900 [&_svg]:size-4',
                {
                  'text-neutral-900 dark:text-neutral-800': isDisliked
                }
              )}
              onClick={dislikeMessage}
              type='button'
            >
              <ThumbsDown />
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
