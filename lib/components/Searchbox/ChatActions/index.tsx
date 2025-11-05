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

import styles from './index.module.css'

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
    <div className={styles.chatActionsContainer}>
      <ul className={styles.chatActionsList}>
        <li>
          <ChatInteractions.RegenerateLatest
            className={styles.chatAction}
            interaction={interaction}
          >
            <RotateCcwIcon />
          </ChatInteractions.RegenerateLatest>
        </li>
        <li>
          <ChatInteractions.CopyMessage
            className={styles.chatAction}
            interaction={interaction}
          >
            {(copied: boolean) =>
              copied ? (
                <FileCheck className={styles.chatActionIconSelected} />
              ) : (
                <ClipboardIcon />
              )
            }
          </ChatInteractions.CopyMessage>
        </li>
        {!interaction.loading && (
          <li>
            <button
              className={classNames(styles.chatAction, {
                [styles.chatActionDisaliked]: isDisliked
              })}
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
