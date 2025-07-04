import type { ReactNode } from 'react'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { baseOptions } from '@/app/layout.config'
import { Footer } from '@/lib/components/footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions}>
      <div className='min-h-screen flex flex-col'>
        <div className='flex-1'>
          {/*
            The main content of the page will be rendered here.
            This is where the children passed to this layout will appear.
          */}
          {children}
        </div>
        <Footer />
      </div>
    </HomeLayout>
  )
}
