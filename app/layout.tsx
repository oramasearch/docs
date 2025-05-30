import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Providers } from './providers';
import { Inter } from 'next/font/google'
import './global.css'

const inter = Inter({
  subsets: ['latin']
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
