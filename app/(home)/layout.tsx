import type { ReactNode } from 'react'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { baseOptions } from '@/app/layout.config'
import { Footer } from '@/lib/components/footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <HomeLayout {...baseOptions}>
        <div className='flex flex-col flex-1'>
          <div className='flex-1'>{children}</div>
          <Footer />
        </div>
      </HomeLayout>
    </div>
  )
}
