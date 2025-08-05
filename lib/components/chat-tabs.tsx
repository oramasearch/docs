'use client'
import { PromptTextArea, ChatInteractions, ChatRoot } from '@orama/ui/components'
import { useEffect, useRef, useState } from 'react'
import { X, ArrowDown, Search, ArrowRight, FileText, SparklesIcon, Plus, Link2, Copy, RefreshCw } from 'lucide-react'
import type { Interaction } from '@orama/core'
import { Tabs } from '@orama/ui/components'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollableContainer } from '@orama/ui/hooks'
import { collectionManager } from '../data'

type Document = {
  path: string
  title: string
  content: string
}

type TabsProps = {
  initialContent: React.ReactNode
}

export default function ChatTabs({ initialContent }: TabsProps) {
  const [tabID, setTabID] = useState(0)
  const [selectedTab, setSelectedTab] = useState('tab-0')
  const [prompt, setPrompt] = useState<string | null>(null)

  const pathname = usePathname()
  const router = useRouter()

  const newChatRef = useRef<HTMLDivElement>(null)
  const firstTabRef = useRef<HTMLDivElement>(null)
  const prevPath = useRef(pathname)

  const { containerRef, containerElement, showGoToBottomButton, scrollToBottom, recalculateGoToBottomButton } =
    useScrollableContainer()

  useEffect(() => {
    if (prevPath.current !== pathname || !containerElement) {
      resetToFirstTab()
      prevPath.current = pathname
    }
  }, [pathname, containerElement])

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

  const resetToFirstTab = () => {
    setSelectedTab('tab-0')
    firstTabRef.current?.click()
  }

  const handleSourceClick = (document: Document) => {
    if (document.path) {
      router.push(document.path)
      resetToFirstTab()
    }
  }

  return (
    <>
      <Tabs.Wrapper
        defaultTab={selectedTab}
        className="flex flex-col border-0 bg-transparent my-0 rounded-none h-full w-full"
        onTabChange={value => {
          setSelectedTab(value)
        }}
        orientation="horizontal"
      >
        <div className="flex shrink-0 gap-2 overflow-y-auto bg-input/30 px-6 pt-3 pl-(--fd-sidebar-width) -ml-(--fd-sidebar-width) w-screen">
          <Tabs.List className="flex items-stretch pl-4">
            <Tabs.Button
              tabId="tab-0"
              className={`transition-colors inline-flex items-center gap-2 w-full px-4 py-2 text-sm font-small rounded-t-md whitespace-nowrap text-left cursor-pointer ${
                selectedTab === 'tab-0'
                  ? 'text-foreground bg-background from-medium'
                  : 'bg-input/30 text-muted-foreground font-normal'
              }`}
            >
              <FileText className="size-4" />
              <span className="truncate max-w-[120px] block" ref={firstTabRef}>
                Documentation
              </span>
            </Tabs.Button>
          </Tabs.List>
          <Tabs.DynamicList className="flex gap-2 empty:hidden items-stretch">
            {item => (
              <div className="flex gap-2 items-center relative">
                <Tabs.Button
                  tabId={item.id}
                  className={`transition-colors inline-flex items-center gap-2 w-full px-4 py-2 pr-8 text-sm font-small rounded-t-md whitespace-nowrap text-left cursor-pointer ${
                    selectedTab === item.id
                      ? 'text-foreground bg-background font-medium'
                      : 'bg-input/30 text-muted-foreground font-normal'
                  }`}
                >
                  <SparklesIcon className="size-4" />
                  <span className="truncate max-w-[120px] block">
                    {item.prompt
                      ? item.prompt.length > 20
                        ? `${item.prompt.slice(0, 20)}...`
                        : item.prompt
                      : item.label}
                  </span>
                </Tabs.Button>
                <Tabs.Close
                  tabId={item.id}
                  className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-3 h-3" />
                </Tabs.Close>
              </div>
            )}
          </Tabs.DynamicList>
          <Tabs.List className="flex items-stretch">
            <Tabs.Trigger
              tabId={`tab-${tabID + 1}`}
              onClick={() => setTabID(tabID + 1)}
              className="flex gap-1 items-center truncate max-w-40 over px-4 py-2 cursor-pointer bg-input/30 text-muted-foreground font-normal text-sm rounded-t-md"
              prompt={prompt || undefined}
            >
              <Plus className="size-4" />
              <span ref={newChatRef}>New Chat</span>
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <div className="flex-1 min-h-96 overflow-y-auto">
          <Tabs.Panel tabId="tab-0" className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 grid" style={{ gridTemplateColumns: '1fr 250px' }}>
              {initialContent}
            </div>
          </Tabs.Panel>
          <Tabs.DynamicPanels>
            {(item, chatTabs, setChatTabs) => (
              <ChatRoot client={collectionManager}>
                <Tabs.DynamicPanel tabId={item.id} className="max-w-7xl mx-auto h-full">
                  <div className="flex flex-col h-full">
                    {/* SCROLLABLE BLOCK */}
                    <div ref={containerRef} className="flex-1 overflow-y-auto">
                      <ChatInteractions.Wrapper
                        onScroll={recalculateGoToBottomButton}
                        onStreaming={recalculateGoToBottomButton}
                        onNewInteraction={(interaction: Interaction) => {
                          scrollToBottom({ animated: true })
                          if (!chatTabs?.find(chat => chat.id === item.id)?.prompt) {
                            if (typeof setChatTabs === 'function') {
                              setChatTabs([
                                ...(chatTabs ?? []).map(chat =>
                                  chat.id === item.id ? { ...item, prompt: interaction.query } : chat
                                )
                              ])
                            }
                          }
                        }}
                      >
                        {interaction => (
                          <div key={interaction.id} className="p-4 flex flex-col gap-4">
                            <ChatInteractions.UserPrompt className="text-3xl font-medium pt-8 pb-4 text-foreground">
                              {interaction.query}
                            </ChatInteractions.UserPrompt>
                            <ChatInteractions.Loading interaction={interaction}>
                              <div className="animate-pulse space-y-4">
                                <div className="h-3 bg-gray-800 rounded w-3/4" />
                                <div className="h-3 bg-gray-800 rounded w-1/2" />
                                <div className="h-3 bg-gray-800 rounded w-5/6" />
                              </div>
                            </ChatInteractions.Loading>
                            <ChatInteractions.Sources interaction={interaction} className="flex gap-3 justify-stretch">
                              {(document, i) => (
                                <button
                                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    handleSourceClick(document as Document)
                                  }}
                                  type="button"
                                  className="cursor-pointer block text-left rounded-md p-2 bg-input/30 text-xs h-full hover:bg-input/60 transition-colors duration-200"
                                  key={i}
                                >
                                  <h3 className="flex gap-1 font-semibold text-secondary-foreground line-clamp-2">
                                    <Link2 className="size-4" />
                                    {(document.title as string).slice(0, 30) || ''}
                                    {(document.title as string).length > 30 ? '...' : ''}
                                  </h3>
                                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                                    {(document.content as string).slice(0, 60)}
                                    ...
                                  </p>
                                </button>
                              )}
                            </ChatInteractions.Sources>
                            <ChatInteractions.AssistantMessage
                              markdownClassnames={{
                                p: 'my-2',
                                pre: 'rounded-md [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:my-3 [&_pre]:text-xs [&_pre]:whitespace-break-spaces wrap-break-word',
                                code: 'p-1 rounded'
                              }}
                            >
                              {interaction.response}
                            </ChatInteractions.AssistantMessage>

                            {!interaction.loading && (
                              <ChatInteractions.UserActions className="flex items-center gap-6 justify-end transition-opacity duration-500 ease-in-out delay-150 opacity-100">
                                <ChatInteractions.CopyMessage className="cursor-pointer" interaction={interaction}>
                                  {copied =>
                                    copied ? (
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">Copied!</span>
                                        <Copy className="w-4 h-4" />
                                      </div>
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )
                                  }
                                </ChatInteractions.CopyMessage>
                                <ChatInteractions.RegenerateLatest className="cursor-pointer" interaction={interaction}>
                                  <RefreshCw className="w-4 h-4" />
                                </ChatInteractions.RegenerateLatest>
                              </ChatInteractions.UserActions>
                            )}
                          </div>
                        )}
                      </ChatInteractions.Wrapper>
                    </div>

                    {/* BOTTOM BLOCK */}
                    <div className={'rounded-b-md flex flex-col items-center justify-between relative px-4'}>
                      {showGoToBottomButton && (
                        <button
                          className="ml-2 px-2 py-1 rounded text-sm absolute -top-8 right-4 [&_svg]:text-current"
                          onClick={() => scrollToBottom()}
                          type="button"
                        >
                          <ArrowDown className="w-5 h-5" />
                        </button>
                      )}
                      <PromptTextArea.Wrapper className="flex items-center gap-2 w-full p-3 my-6 bg-input/30 border border-input rounded-md max-w-4xl focus-within:border-ring">
                        <div className="flex-1 flex gap-2 items-center">
                          <Search className="w-5 h-5" />
                          <PromptTextArea.Field
                            rows={1}
                            id="prompt-input-2"
                            name="prompt-input-2"
                            placeholder="Ask something..."
                            className="peer flex-1 border-0 focus:outline-none text-red"
                            askOptions={{
                              related: {
                                enabled: true,
                                size: 3,
                                format: 'question'
                              }
                            }}
                            autoFocus
                          />
                        </div>
                        <PromptTextArea.Button
                          className={
                            'py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed bg-primary rounded-md text-primary-foreground'
                          }
                        >
                          <ArrowRight className="w-4 h-4" />
                          <span className="sr-only">Send</span>
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
