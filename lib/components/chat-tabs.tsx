'use client'
import {
  PromptTextArea,
  ChatInteractions,
  ChatRoot
} from '@orama/ui/components'
import { useEffect, useRef, useState } from 'react'
import {
  X,
  ArrowDown,
  Search,
  ArrowRight,
  FileText,
  SparklesIcon,
  Plus
} from 'lucide-react'
import { CollectionManager, Interaction } from '@orama/core'
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
  const [prompt, setPrompt] = useState<string | null>(null)

  const newChatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrompt = localStorage.getItem('orama_suggested_prompt')
      setPrompt(storedPrompt)
    }
  }, [])

  useEffect(() => {
    if (!prompt) return

    const element = newChatRef.current
    if (element) {
      element.click()

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('orama_suggested_prompt')
        setPrompt(null)
      }
    }
  }, [prompt])

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
        <div className='flex gap-2 w-full overflow-y-auto bg-input/30 px-6 pt-3'>
          <Tabs.List className='flex items-stretch'>
            <Tabs.Button
              tabId='tab-0'
              className={`transition-colors inline-flex items-center gap-2 w-full px-4 py-2 text-sm font-small rounded-t-md whitespace-nowrap text-left cursor-pointer ${
                selectedTab === 'tab-0'
                  ? 'text-foreground bg-background from-medium'
                  : 'bg-input/30 text-muted-foreground font-normal'
              }`}
            >
              <FileText className='size-4' />
              <span className='truncate max-w-[120px] block'>
                Documentation
              </span>
            </Tabs.Button>
          </Tabs.List>
          <Tabs.DynamicList className='flex gap-2 empty:hidden items-stretch'>
            {(item) => (
              <div className='flex gap-2 items-center relative'>
                <Tabs.Button
                  tabId={item.id}
                  className={`transition-colors inline-flex items-center gap-2 w-full px-4 py-2 pr-8 text-sm font-small rounded-t-md whitespace-nowrap text-left cursor-pointer ${
                    selectedTab === item.id
                      ? 'text-foreground bg-background font-medium'
                      : 'bg-input/30 text-muted-foreground font-normal'
                  }`}
                >
                  <SparklesIcon className='size-4' />
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
                  className='cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2'
                >
                  <X className='w-3 h-3' />
                </Tabs.Close>
              </div>
            )}
          </Tabs.DynamicList>
          <Tabs.List className='flex items-stretch'>
            <Tabs.Trigger
              tabId={`tab-${tabID + 1}`}
              onClick={() => setTabID(tabID + 1)}
              className='flex gap-1 items-center truncate max-w-40 over px-4 py-2 cursor-pointer bg-input/30 text-muted-foreground font-normal text-sm rounded-t-md'
              prompt={prompt || undefined}
            >
              {/* TODO: Trigger must support ref */}
              <Plus className='size-4' />
              <span ref={newChatRef}>New Chat</span>
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <div className='flex-1 min-h-96 overflow-y-auto'>
          <Tabs.Panel tabId='tab-0' className='h-full flex flex-col'>
            <div className='flex-1 overflow-y-auto p-4'>{initialContent}</div>
          </Tabs.Panel>
          <Tabs.DynamicPanels>
            {(item, chatTabs, setChatTabs) => (
              <ChatRoot client={collectionManager}>
                <Tabs.DynamicPanel
                  tabId={item.id}
                  className='max-w-7xl mx-auto h-full'
                >
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
                            <ChatInteractions.UserPrompt className='text-3xl font-medium pt-8 pb-4'>
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
                        'rounded-b-md flex flex-col items-center justify-between relative px-4'
                      }
                    >
                      {showGoToBottomButton && (
                        <button
                          className='ml-2 px-2 py-1 rounded text-sm absolute -top-8 right-4 [&_svg]:text-current'
                          onClick={() => scrollToBottom()}
                          type='button'
                        >
                          <ArrowDown className='w-5 h-5' />
                        </button>
                      )}
                      <PromptTextArea.Wrapper className='flex items-center gap-2 w-full p-3 my-6 bg-input/30 border border-input rounded-md max-w-4xl focus-within:border-ring'>
                        <div className='flex-1 flex gap-2 items-center'>
                          <Search className='w-5 h-5' />
                          <PromptTextArea.Field
                            rows={1}
                            id='prompt-input-2'
                            name='prompt-input-2'
                            placeholder='Ask something...'
                            className='peer flex-1 border-0 focus:outline-none text-red'
                          />
                        </div>
                        <PromptTextArea.Button
                          className={
                            'py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed bg-primary rounded-md text-primary-foreground'
                          }
                        >
                          <ArrowRight className='w-4 h-4' />
                          <span className='sr-only'>Send</span>
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
