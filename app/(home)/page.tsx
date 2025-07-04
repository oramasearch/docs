import { Hero } from '@/lib/components/hero'
import { SmartSearch } from '@/lib/components/smart-search'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Hero
        title='Smarter search starts here'
        description='Orama gives you everything you need to create fast, powerful, and flexible search experiences.From full-text to vector search, local to cloud, all backed by modern AI.'
      />
      <section>
        <div className='mx-auto max-w-fd-container flex flex-col justify-center items-center'>
          <div className='text-center max-w-[960px] w-90/100 md:w-80/100 lg:w-90/100'>
            <SmartSearch />
          </div>
        </div>
      </section>
      <section>
        <div className='mx-auto max-w-fd-container flex flex-col justify-center items-center'>
          <div className='text-center max-w-[960px] w-90/100 md:w-80/100 lg:w-90/100 py-12'>
            <h2 className='text-2xl xl:text-4xl leading-none text-foreground my-3 font-extrabold'>
              Getting started
            </h2>
            <p className='text-xs lg:text-lg leading-normal text-muted-foreground'>
              Check out our docsand dive into your next Orama Experience
            </p>
            <div className='mt-6 w-full flex flex-col items-center gap-3 lg:flex-row lg:gap-6 lg:justify-center'>
              <Link
                href='#'
                className='max-w-60 w-full block py-2 px-4 text-center rounded-md bg-primary text-primary-foreground hover:bg-fd-base-primary/90 transition-colors duration-200 shadow-md shadow-fd-base-primary/20'
              >
                Get started
              </Link>
              <a
                href='#update-me'
                className='w-full max-w-60 flex items-center justify-center py-2 px-4 text-center rounded-md bg-input/30 text-foreground hover:bg-fd-base-primary/90 transition-colors duration-200 shadow-md shadow-fd-base-primary/20'
                rel='noopener noreferrer'
                target='_blank'
              >
                View on GitHub
                <GithubIcon className='inline ml-2 size-4' />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
