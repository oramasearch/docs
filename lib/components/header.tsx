'use client'

import { DropdownSearch } from './dropdown-search'

export function Header() {
  return (
    <header className='fixed top-(--fd-banner-height) z-40 box-content backdrop-blur-lg w-full transition-colors lg:[--fd-padding:1rem] py-4 shadow-sm border-b border-base'>
      <div className='mx-auto max-w-fd-container flex flex-col lg:flex-row items-center justify-between'>
        <div className='flex items-center text-base'>
          <img
            src='/logo/orama-logo.svg'
            className='h-6 mr-2'
            alt='OramaSearch Inc. Logo'
          />
          Orama
        </div>
        <DropdownSearch />
      </div>
    </header>
  )
}
