'use client'

import { ArrowDownIcon, ArrowUpIcon, CornerDownRight } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export const Footer = () => {
  const { resolvedTheme } = useTheme()

  const oramaLogo = `https://website-assets.oramasearch.com/orama-when-${resolvedTheme}.svg`

  return (
    <div className='flex justify-center border-t border-neutral-200 bg-neutral-100 p-4 align-baseline lg:justify-between lg:rounded-b-xl dark:border-neutral-900 dark:bg-neutral-950'>
      <div className='hidden items-center gap-2 lg:flex'>
        <div className='flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-600'>
          <kbd className='font-ibm-plex-mono rounded-md bg-neutral-200 p-1 text-xs dark:bg-neutral-900 [&_svg]:size-4'>
            <CornerDownRight />
          </kbd>
          <span>select</span>
        </div>
        <div className='flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-600'>
          <kbd className='font-ibm-plex-mono rounded-md bg-neutral-200 p-1 text-xs dark:bg-neutral-900 [&_svg]:size-4'>
            <ArrowDownIcon />
          </kbd>
          <kbd className='font-ibm-plex-mono rounded-md bg-neutral-200 p-1 text-xs dark:bg-neutral-900 [&_svg]:size-4'>
            <ArrowUpIcon />
          </kbd>
          <span>navigate</span>
        </div>
        <div className='flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-600'>
          <kbd className='font-ibm-plex-mono rounded-md bg-neutral-200 p-1 text-xs dark:bg-neutral-900 [&_svg]:size-4'>
            esc
          </kbd>
          <span>close</span>
        </div>
      </div>
      <div>
        <a
          href='https://www.orama.com/?utm_source=nodejs.org&utm_medium=powered-by'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 text-sm text-neutral-800 dark:text-neutral-600'
        >
          <small>Powered by</small>
          <Image
            src={oramaLogo}
            alt='Powered by Orama'
            width='62'
            height='12'
          />
        </a>
      </div>
    </div>
  )
}
