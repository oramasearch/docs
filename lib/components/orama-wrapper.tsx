'use client'

import { useEffect, useState } from 'react'
import ChatTabs from './chat-tabs'

interface OramaWrapperProps {
  children: React.ReactNode
}

const OramaWrapper: React.FC<OramaWrapperProps> = ({ children }) => {
  return (
    <div className='pt-(--fd-nav-height) h-screen'>
      <ChatTabs initialContent={children} />
    </div>
  )
}

export default OramaWrapper
