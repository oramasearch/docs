'use client'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from 'fumadocs-ui/components/tabs'
import {
  PromptTextArea,
  ChatInteractions,
  ChatRoot
} from '@orama/ui/components'
import { useState, useEffect } from 'react'
import {
  Plus,
  X,
  MessageSquare,
  MessagesSquare,
  ArrowBigDown,
  ArrowDown01,
  Clipboard,
  ArrowRight
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { CollectionManager } from '@orama/core'
import { useScrollableContainer } from '@orama/ui/hooks'
import Link from 'next/link'

type Item = {
  id: string
  label: string
  prompt?: string
  chatStatus?: 'idle' | 'active' | 'processing'
  icon?: React.ReactNode
  content?: React.ReactNode
  closable?: boolean
}

const collectionManager = new CollectionManager({
  url: 'https://atlantis.cluster.oramacore.com',
  collectionID: 'ooo4f22zau7q7ta4i1grlgji',
  readAPIKey: 'WvStWzar7tqdX3FOZbhCMDWSQsWAewUu'
})

type TabsProps = {
  items: Item[]
}

export default function ChatTabs({ items }: TabsProps) {
  const [tabChat, setTabChat] = useState(0)
  const [selectedTab, setSelectedTab] = useState(items[0].id)
  const [itemsWithChat, setItemsWithChat] = useState<Item[]>([])
  const {
    containerRef,
    showGoToBottomButton,
    scrollToBottom,
    recalculateGoToBottomButton
  } = useScrollableContainer()

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
        className='flex flex-col border-0 bg-transparent my-0 rounded-none h-full'
        onValueChange={(value) => {
          setSelectedTab(value)
        }}
      >
        <div className='z-20'>
          <TabsList className='w-full border-b bg-fd-background border-fd-border overflow-auto'>
            {items.map((item) => (
              <TabsTrigger
                value={item.id}
                key={item.id}
                className='flex items-center gap-x-1 text-gray-400 truncate max-w-40 over px-2 py-2 cursor-pointer'
              >
                <span className='truncate'>{item.label}</span>
              </TabsTrigger>
            ))}
            {itemsWithChat.map((item, index) => (
              <div key={item.id} className='flex items-center gap-x-2 relative'>
                <TabsTrigger
                  value={item.id}
                  className='flex items-center gap-x-2 text-gray-400 truncate max-w-40 over px-2 py-2 pr-6 cursor-pointer'
                >
                  {item.chatStatus === 'idle' ? (
                    <MessageSquare className='w-3 h-3 min-w-3' />
                  ) : (
                    <MessagesSquare className='w-4 h-4 min-w-4' />
                  )}
                  <span className='truncate'>{item.label}</span>
                </TabsTrigger>
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
                        setSelectedTab(
                          previousTab ? previousTab.id : items[0].id
                        )
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
                    className='whitespace-nowrap ml-2 text-sm font-medium transition-colors hover:text-fd-accent-foreground cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none'
                  >
                    <X className='w-3 h-3' style={{ fill: 'currentColor' }} />
                  </button>
                )}
              </div>
            ))}
            {canInitChat && (
              <TabsTrigger
                value='new-chat'
                onClick={() => addNewChatTab()}
                className='whitespace-nowrap border-b border-transparent py-2 text-sm font-medium transition-colors hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-fd-primary data-[state=active]:text-fd-primary flex items-center gap-x-1 text-gray-600 cursor-pointer'
              >
                <Plus size={16} />
                New chat
              </TabsTrigger>
            )}
          </TabsList>
        </div>
        {items.map((item) => (
          <TabsContent
            value={item.id}
            key={item.id}
            className={
              item.id === selectedTab ? 'flex overflow-auto' : 'hidden'
            }
          >
            {item.content}
          </TabsContent>
        ))}
        {canInitChat &&
          itemsWithChat.map((item) => (
            <TabsContent
              value={item.id}
              key={item.id}
              className={item.id === selectedTab ? 'p-0 flex h-full' : 'hidden'}
              forceMount
              hidden={item.id !== selectedTab}
            >
              <div id='nd-chatbot' className='flex w-full min-w-0 flex-col'>
                <ChatRoot client={collectionManager}>
                  <div className='container mx-auto max-w-6xl px-4 h-full'>
                    <div className='h-full flex flex-col gap-2 justify-between'>
                      <div className='flex-1 flex flex-col min-h-0'>
                        <ChatInteractions.Wrapper
                          ref={containerRef}
                          onScroll={recalculateGoToBottomButton}
                          onStreaming={recalculateGoToBottomButton}
                          onNewInteraction={() => {
                            scrollToBottom({ animated: true })
                          }}
                          className='items-start relative overflow-y-auto h-full'
                        >
                          {(interaction, index, totalInteractions) => (
                            <>
                              <ChatInteractions.UserPrompt>
                                <p className='text-3xl leading-normal medium'>
                                  {interaction.query}
                                </p>
                              </ChatInteractions.UserPrompt>

                              {interaction.loading && !interaction.response ? (
                                <p>Loading...</p>
                              ) : (
                                <>
                                  <ChatInteractions.Sources
                                    sources={
                                      Array.isArray(interaction.sources)
                                        ? interaction.sources
                                        : []
                                    }
                                    // className={styles.chatSources}
                                    // itemClassName={styles.chatSourceItem}
                                  >
                                    {(document, index: number) => (
                                      <div key={index}>
                                        <Link data-focus-on-arrow-nav href='#'>
                                          <span>
                                            {
                                              document?.pageSectionTitle as string
                                            }
                                          </span>
                                        </Link>
                                      </div>
                                    )}
                                  </ChatInteractions.Sources>

                                  <div>
                                    <ChatInteractions.AssistantMessage>
                                      {interaction.response}
                                    </ChatInteractions.AssistantMessage>

                                    {!interaction.loading && (
                                      <div>
                                        <ul>
                                          {index === totalInteractions && (
                                            <li>
                                              <ChatInteractions.RegenerateLatest>
                                                {/* <ArrowDown01 /> */}
                                                Retry
                                              </ChatInteractions.RegenerateLatest>
                                            </li>
                                          )}
                                          <li>
                                            <ChatInteractions.CopyMessage
                                              interaction={interaction}
                                              // copiedContent={
                                              //   <DocumentCheckIcon
                                              //     className={
                                              //       styles.chatActionIconSelected
                                              //     }
                                              //   />
                                              // }
                                            >
                                              <Clipboard />
                                            </ChatInteractions.CopyMessage>
                                          </li>
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </ChatInteractions.Wrapper>
                      </div>
                      <div className='relative flex-shrink-0 py-10'>
                        <PromptTextArea.Wrapper className='flex items-center gap-2 w-full border border-input rounded-md focus:outline-none focus:border-input rounded-md p-3 bg-input/30'>
                          <PromptTextArea.Field
                            className='border-none focus:outline-none grow placeholder:text-muted-foreground text-fd-accen'
                            rows={1}
                            placeholder='What do you want to know?'
                          />
                          <PromptTextArea.Button
                            aria-label='Send message'
                            className='flex items-center justify-center p-2 bg-fd-primary text-fd-primary-foreground rounded-md hover:bg-fd-primary/90 transition-colors duration-200'
                          >
                            <ArrowRight className='w-4 h-4' />
                          </PromptTextArea.Button>
                        </PromptTextArea.Wrapper>
                      </div>
                    </div>
                  </div>
                </ChatRoot>
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
