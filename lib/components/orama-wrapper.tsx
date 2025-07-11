'use client'

import ChatTabs from './chat-tabs'

interface OramaWrapperProps {
  children: React.ReactNode
}

const OramaWrapper: React.FC<OramaWrapperProps> = ({ children }) => {
  return (
    <div className='pt-(--fd-nav-height) h-screen'>
      <ChatTabs
        items={[
          {
            id: 'documentation',
            label: 'Documentation',
            content: children
          }
        ]}
      />
    </div>
  )
}

export default OramaWrapper
