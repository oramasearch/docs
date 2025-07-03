import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { RootProvider } from 'fumadocs-ui/provider'
import { Footer } from '@/lib/components/footer'
import { Inter } from 'next/font/google'
import './global.css'

const inter = Inter({
  subsets: ['latin']
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <body className='flex flex-col min-h-screen'>
        <RootProvider>{children}</RootProvider>
        <Footer />
      </body>
    </html>
  )
}
