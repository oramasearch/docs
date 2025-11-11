'use client'

import Searchbox from '@/components/searchbox'

export function Header() {
  return (
    <header className='fixed top-(--fd-banner-height) bg-fd-background z-40 box-content w-full transition-colors lg:[--fd-padding:1rem] py-4 shadow-sm border-b border-border'>
      <div className='mx-auto max-w-fd-container flex flex-row items-center justify-between px-4'>
        <div className='flex items-center text-base'>
          <img
            src='/logo/orama-logo.svg'
            className='h-6 mr-2'
            alt='OramaSearch Inc. Logo'
          />
          Orama
        </div>
        <Searchbox />
      </div>
    </header>
  )
}
