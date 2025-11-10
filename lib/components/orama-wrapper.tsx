'use client'

import type { FC, ReactNode } from 'react'

import ChatTabs from '@/components/chat-tabs'

interface OramaWrapperProps {
  children: ReactNode
}

const OramaWrapper: FC<OramaWrapperProps> = ({ children }) => {
  return (
    <div className='pt-(--fd-nav-height) h-screen'>
      <ChatTabs initialContent={children} />
    </div>
  )
}

export default OramaWrapper
