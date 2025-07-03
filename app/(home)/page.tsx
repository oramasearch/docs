import { Hero } from '@/lib/components/hero'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'

// text-lg/leading-none/normal

export default function HomePage() {
  return (
    <div>
      <Hero
        title='Smarter search starts here'
        description='Orama gives you everything you need to create fast, powerful, and flexible search experiences.From full-text to vector search, local to cloud, all backed by modern AI.'
      />
      <section>
        <div className='mx-auto max-w-fd-container flex flex-col justify-center items-center px-4'>
          <p>Search here...</p>
        </div>
      </section>
      <section className='my-8'>
        <div className='mx-auto max-w-fd-container flex flex-col justify-center items-center px-4'>
          <h2 className='text-2xl xl:text-4xl leading-none text-fd-base-foreground my-3 font-extrabold'>
            Getting started
          </h2>
          <p className='text-xs leading-normal text-fd-muted-foreground'>
            Check out our docsand dive into your next Orama Experience
          </p>
          <div className='mt-6 w-full flex flex-col items-center gap-3'>
            <Link
              href='#'
              className='max-w-60 w-full block py-2 px-4 text-center rounded-md bg-fd-primary text-fd-primary-foreground hover:bg-fd-base-primary/90 transition-colors duration-200 shadow-md shadow-fd-base-primary/20'
            >
              Get started
            </Link>
            <a
              href='#'
              className='w-full max-w-60 block py-2 px-4 text-center rounded-md bg-fd-primary text-fd-base-foreground hover:bg-fd-base-primary/90 transition-colors duration-200 shadow-md shadow-fd-base-primary/20'
              rel='noopener noreferrer'
              target='_blank'
            >
              View on GitHub
              <GithubIcon className='inline ml-2 size-4' />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
