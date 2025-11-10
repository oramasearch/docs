'use client'

import { Search } from 'lucide-react'
import { SearchRoot, ChatRoot, Modal } from '@orama/ui/components'
import type { FC } from 'react'

import { SearchboxProvider } from '@/providers/searchboxProvider'

import { InnerSearchboxModal } from './inner-searchbox-modal'
import { collectionManager } from '@/data/index'

const Searchbox: FC = () => {
  return (
    <SearchboxProvider>
      <div className='[&_*]:antialiased'>
        <Modal.Root>
          <Modal.Trigger
            type='button'
            disabled={!collectionManager}
            enableCmdK
            className='flex w-full grow cursor-pointer items-center justify-between gap-1 rounded-xl border border-neutral-300 bg-white p-1.5 text-neutral-900 duration-300 hover:bg-neutral-100 motion-safe:transition-colors dark:border-neutral-900 dark:bg-neutral-950 dark:text-neutral-200 hover:dark:bg-neutral-900 min-w-[200px]'
          >
            <div className='relative flex flex-nowrap items-center gap-1 text-sm [&_svg]:size-4'>
              <Search />
              Search...
            </div>
            <span className='hidden rounded-md bg-neutral-300 px-2 py-1 text-sm text-neutral-800 lg:inline dark:bg-neutral-900 dark:text-neutral-400'>
              ⌘ K
            </span>
          </Modal.Trigger>

          <Modal.Wrapper
            closeOnOutsideClick
            closeOnEscape
            className='fixed left-0 top-0 z-50 mx-auto my-0 flex w-svw! h-svh! items-start justify-center lg:pt-[5vh] dark:bg-zinc-900/80!'
          >
            <SearchRoot client={collectionManager}>
              <ChatRoot
                client={collectionManager}
                askOptions={{ throttle_delay: 50 }}
              >
                <Modal.Inner className='fixed bottom-0 top-0 mx-auto! mb-0! lg:mt-12! flex h-full max-w-none bg-white lg:bottom-auto lg:top-auto lg:h-auto lg:max-w-3xl lg:bg-neutral-100 dark:bg-zinc-950 lg:dark:bg-neutral-950'>
                  <Modal.Content className='flex h-full flex-col border-neutral-200 lg:h-auto lg:max-h-[70vh] lg:border dark:border-neutral-900'>
                    <InnerSearchboxModal />
                  </Modal.Content>
                </Modal.Inner>
              </ChatRoot>
            </SearchRoot>
          </Modal.Wrapper>
        </Modal.Root>
      </div>
    </SearchboxProvider>
  )
}

export default Searchbox
