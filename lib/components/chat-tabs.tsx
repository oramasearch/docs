'use client'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from 'fumadocs-ui/components/tabs'
import { useState, useEffect } from 'react'
import { Plus, X, MessageSquare, MessagesSquare } from 'lucide-react'
import { usePathname } from 'next/navigation'

type Item = {
  id: string
  label: string
  prompt?: string
  chatStatus?: 'idle' | 'active' | 'processing'
  icon?: React.ReactNode
  content?: React.ReactNode
  closable?: boolean
}

type TabsProps = {
  items: Item[]
}

export default function ChatTabs({ items }: TabsProps) {
  const [tabChat, setTabChat] = useState(0)
  const [selectedTab, setSelectedTab] = useState(items[0].id)
  const [itemsWithChat, setItemsWithChat] = useState<Item[]>([])

  // const API_KEY = process.env.NEXT_PUBLIC_ORAMA_INDEX_API_KEY
  // const ENDPOINT = process.env.NEXT_PUBLIC_ORAMA_INDEX_ENDPOINT

  const canInitChat = true

  const path = usePathname()

  useEffect(() => {
    if (path && items[0]?.id) {
      setSelectedTab(items[0].id)
    }
  }, [path, items])

  const handleClick = () => {
    // set prompt
    setItemsWithChat((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === `tab-${tabChat}`) {
          return {
            ...item,
            prompt: 'What is Orama Core?',
            chatStatus: 'processing' as const
          }
        }
        return item
      })
      return updatedItems
    })
  }

  const addNewChatTab = (label?: string) => {
    if (!canInitChat) return

    setTabChat(tabChat + 1)

    const updatedItemsWithChat = [
      ...itemsWithChat,
      {
        id: `tab-${tabChat}`,
        label: label || 'Untitled',
        prompt: undefined,
        closable: true,
        chatStatus: 'idle' as const
      }
    ]

    setItemsWithChat(updatedItemsWithChat)
    setSelectedTab(`tab-${tabChat}`)
  }

  return (
    <>
      <Tabs
        value={selectedTab}
        className='overflow-clip grow border-0'
        onValueChange={(value) => {
          setSelectedTab(value)
        }}
      >
        <TabsList className='sticky top-[calc(var(--fd-nav-height))] z-20 flex items-center w-full border-b bg-fd-background border-fd-border self-star'>
          {items.map((item) => (
            <TabsTrigger
              value={item.id}
              key={item.id}
              className='flex items-center gap-x-1 text-gray-400 truncate max-w-40 over px-2 py-2'
            >
              <span className='truncate'>{item.label}</span>
            </TabsTrigger>
          ))}
          {itemsWithChat.map((item, index) => (
            <TabsTrigger
              value={item.id}
              key={item.id}
              className='flex items-center gap-x-2 text-gray-400 truncate max-w-40 over px-2 py-2'
            >
              {item.chatStatus === 'idle' ? (
                <MessageSquare className='w-3 h-3 min-w-3' />
              ) : (
                <MessagesSquare className='w-4 h-4 min-w-4' />
              )}
              <span className='truncate'>{item.label}</span>
              {item.closable && (
                <button
                  type='button'
                  tabIndex={0}
                  aria-label='Close tab'
                  onClick={(e) => {
                    e.stopPropagation()
                    const previousTab = itemsWithChat[index - 1]
                    const newItems = itemsWithChat.filter(
                      (i) => i.id !== item.id
                    )
                    if (selectedTab === item.id) {
                      setSelectedTab(previousTab ? previousTab.id : items[0].id)
                    }
                    setItemsWithChat(newItems)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      const previousTab = itemsWithChat[index - 1]
                      const newItems = itemsWithChat.filter(
                        (i) => i.id !== item.id
                      )
                      if (selectedTab === item.id) {
                        setSelectedTab(
                          previousTab ? previousTab.id : items[0].id
                        )
                      }
                      setItemsWithChat(newItems)
                    }
                  }}
                  // display on hover only
                  className='whitespace-nowrap ml-2 text-sm font-medium transition-colors hover:text-fd-accent-foreground'
                >
                  <X className='w-3 h-3' style={{ fill: 'currentColor' }} />
                </button>
              )}
            </TabsTrigger>
          ))}
          {canInitChat && (
            <button
              type='button'
              onClick={() => addNewChatTab()}
              className='whitespace-nowrap border-b border-transparent py-2 text-sm font-medium transition-colors hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-fd-primary data-[state=active]:text-fd-primary flex items-center gap-x-1 text-gray-600'
            >
              <Plus size={16} />
              New chat
            </button>
          )}
        </TabsList>
        {items.map((item) => (
          <TabsContent
            value={item.id}
            key={item.id}
            className={item.id === selectedTab ? 'flex' : 'hidden'}
          >
            {item.content}
          </TabsContent>
        ))}
        {canInitChat &&
          itemsWithChat.map((item) => (
            <TabsContent
              value={item.id}
              key={item.id}
              className={item.id === selectedTab ? 'p-0 flex' : 'hidden'}
              forceMount
              hidden={item.id !== selectedTab}
            >
              <div
                id='nd-chatbot'
                className='flex w-full min-w-0 flex-col h-chat p-8'
              >
                {/* <OramaChatBox
                  index={{
                    api_key: API_KEY,
                    endpoint: ENDPOINT
                  }}
                  style={{ height: 'inherit' }}
                  onStartConversation={(conversation) => {
                    setItemsWithChat((prevItems) => {
                      const updatedItems = prevItems.map((item) => {
                        if (
                          item.id === `tab-${tabChat}` &&
                          item.label === 'Untitled'
                        ) {
                          return {
                            ...item,
                            label: conversation.detail.userPrompt,
                            chatStatus: 'processing' as const
                          }
                        }
                        return item
                      })
                      return updatedItems
                    })
                  }}
                  onClearChat={() => {
                    setItemsWithChat((prevItems) => {
                      const updatedItems = prevItems.map((item) => {
                        if (item.id === `tab-${tabChat}`) {
                          return {
                            ...item,
                            label: 'Untitled',
                            chatStatus: 'idle' as const
                          }
                        }
                        return item
                      })
                      return updatedItems
                    })
                  }}
                  colorScheme='dark'
                  themeConfig={{
                    radius: {
                      '--textarea-radius': '0.5rem'
                    },
                    shadow: {
                      '--textarea-shadow': 'none'
                    }
                  }}
                  prompt={item.prompt}
                /> */}
              </div>
            </TabsContent>
          ))}
      </Tabs>
    </>
  )
}
