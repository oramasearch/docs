'use client'
import {
  PromptTextArea,
  ChatInteractions,
  ChatRoot
} from '@orama/ui/components'
import { useState } from 'react'
import { X, ArrowDown } from 'lucide-react'
import { CollectionManager } from '@orama/core'
import { Tabs } from '@orama/ui/components'
import { useScrollableContainer } from '@orama/ui/hooks'

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
  collectionID: 'ooo4f22zau7q7ta4i1grlgji',
  apiKey: 'WvStWzar7tqdX3FOZbhCMDWSQsWAewUu',
  cluster: {
    readURL: 'https://atlantis.cluster.oramacore.com'
  }
})

type TabsProps = {
  initialContent: React.ReactNode
}

export default function ChatTabs({ initialContent }: TabsProps) {
  const [tabID, setTabID] = useState(0)
  const [selectedTab, setSelectedTab] = useState('tab-0')

  const {
    containerRef,
    showGoToBottomButton,
    scrollToBottom,
    recalculateGoToBottomButton
  } = useScrollableContainer()

  return (
    <>
      <Tabs.Wrapper
        defaultTab={selectedTab}
        className='flex flex-col border-0 bg-transparent my-0 rounded-none h-full'
        onTabChange={(value) => {
          setSelectedTab(value)
        }}
        orientation='horizontal'
      >
        <div className='flex items-center space-x-1 w-full overflow-y-auto'>
          <Tabs.List>
            <Tabs.Button
              tabId='tab-0'
              className={`w-full px-4 py-2 text-sm font-medium whitespace-nowrap text-left focus:border-blue-600 focus:border-l-4 ${
                selectedTab === 'tab-0'
                  ? 'bg-white text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className='truncate max-w-[120px] block'>
                Documentation
              </span>
            </Tabs.Button>
          </Tabs.List>
          <Tabs.DynamicList className='flex empty:hidden'>
            {(item) => (
              <div className='flex items-center relative'>
                <Tabs.Button
                  tabId={item.id}
                  className={`px-4 py-2 pr-8 text-sm font-medium whitespace-nowrap text-left focus:border-b-4 ${
                    selectedTab === item.id
                      ? 'border-red border-b-4'
                      : 'border-b-0'
                  }`}
                >
                  <span className='truncate max-w-[120px] block'>
                    {item.prompt
                      ? item.prompt.length > 20
                        ? `${item.prompt.slice(0, 20)}...`
                        : item.prompt
                      : item.label}
                  </span>
                </Tabs.Button>
                <Tabs.Close
                  tabId={item.id}
                  className={
                    'absolute right-2 top-1/2 transform -translate-y-1/2'
                  }
                >
                  <X className='w-3 h-3' />
                </Tabs.Close>
              </div>
            )}
          </Tabs.DynamicList>
          <Tabs.List>
            <Tabs.Trigger
              tabId={`tab-${tabID + 1}`}
              onClick={() => setTabID(tabID + 1)}
              className='flex items-center gap-x-1 text-gray-400 truncate max-w-40 over px-2 py-2 cursor-pointer'
              data-focus-on-arrow-nav
              data-focus-on-arrow-nav-left-right
            >
              New Chat
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <div className={'flex-1 min-h-96 overflow-y-auto'}>
          <Tabs.Panel tabId='tab-0' className='h-full flex flex-col'>
            <div className='flex-1 overflow-y-auto p-4'>{initialContent}</div>
          </Tabs.Panel>
          <Tabs.DynamicPanels>
            {(item, chatTabs, setChatTabs) => (
              <ChatRoot client={collectionManager}>
                <Tabs.DynamicPanel tabId={item.id} className='h-full'>
                  <div className='flex flex-col h-full'>
                    {/* SCROLLABLE BLOCK */}
                    <div ref={containerRef} className='flex-1 overflow-y-auto'>
                      <ChatInteractions.Wrapper
                        onScroll={recalculateGoToBottomButton}
                        onStreaming={recalculateGoToBottomButton}
                        onNewInteraction={(interaction: Interaction) => {
                          scrollToBottom({ animated: true })
                          if (
                            !chatTabs?.find((chat) => chat.id === item.id)
                              ?.prompt
                          ) {
                            if (typeof setChatTabs === 'function') {
                              setChatTabs([
                                ...(chatTabs ?? []).map((chat) =>
                                  chat.id === item.id
                                    ? { ...item, prompt: interaction.query }
                                    : chat
                                )
                              ])
                            }
                          }
                        }}
                      >
                        {(interaction) => (
                          <div
                            key={interaction.id}
                            className='p-4 flex flex-col gap-2'
                          >
                            <ChatInteractions.UserPrompt>
                              {interaction.query}
                            </ChatInteractions.UserPrompt>
                            <ChatInteractions.Loading interaction={interaction}>
                              <div className='animate-pulse h-4 w-3/4 rounded' />
                            </ChatInteractions.Loading>
                            <ChatInteractions.AssistantMessage
                              markdownClassnames={{
                                p: 'my-2',
                                pre: 'rounded-md [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:my-3 [&_pre]:text-xs [&_pre]:whitespace-break-spaces wrap-break-word',
                                code: 'p-1 rounded'
                              }}
                            >
                              {interaction.response}
                            </ChatInteractions.AssistantMessage>
                          </div>
                        )}
                      </ChatInteractions.Wrapper>
                    </div>

                    {/* BOTTOM BLOCK */}
                    <div
                      className={
                        'rounded-b-md flex flex-col items-center justify-between relative'
                      }
                    >
                      {showGoToBottomButton && (
                        <button
                          className={
                            'ml-2 px-2 py-1 rounded text-sm absolute -top-8 right-4 [&_svg]:text-current'
                          }
                          onClick={() => scrollToBottom()}
                          type='button'
                        >
                          <ArrowDown className='w-5 h-5' />
                        </button>
                      )}
                      <PromptTextArea.Wrapper
                        className={'flex items-center gap-2 w-full p-3'}
                      >
                        <PromptTextArea.Field
                          rows={1}
                          id='prompt-input-2'
                          name='prompt-input-2'
                          placeholder='Ask something...'
                          className={
                            'flex-1 py-2 px-2 border focus:outline-none'
                          }
                        />
                        <PromptTextArea.Button
                          className={
                            'py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed'
                          }
                        >
                          Send
                        </PromptTextArea.Button>
                      </PromptTextArea.Wrapper>
                    </div>
                  </div>
                </Tabs.DynamicPanel>
              </ChatRoot>
            )}
          </Tabs.DynamicPanels>
        </div>
      </Tabs.Wrapper>
    </>
  )
}
