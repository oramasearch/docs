'use client'

import { X } from 'lucide-react'
import { SlidingPanel } from '@orama/ui/components'
import type { FC, PropsWithChildren } from 'react'

import { ChatInput } from '../ChatInput'
import styles from './index.module.css'
import { ChatInteractionsContainer } from '../ChatInteractions'

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
          className={styles.slidingPanelContentWrapper}
        >
          <SlidingPanel.Close
            className={styles.slidingPanelCloseButton}
            aria-label='Close chat panel'
          >
            <X />
          </SlidingPanel.Close>

          <div className={styles.slidingPanelInner}>
            <ChatInteractionsContainer />
            <div className={styles.slidingPanelBottom}>
              <ChatInput />
            </div>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel.Wrapper>
    </>
  )
}
