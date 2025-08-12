import type { ReactNode } from 'react'
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs'

import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { baseOptions } from '@/app/layout.config'
import { source } from '@/lib/source'
import OramaWrapper from '@/lib/components/orama-wrapper'
import { DropdownSearch } from '@/lib/components/dropdown-search'

function Logo() {
  return (
    <div className='flex items-center text-base'>
      <img
        src='/logo/orama-logo.svg'
        className='h-6 mr-2'
        alt='OramaSearch Inc. Logo'
      />
      Orama
    </div>
  )
}

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  nav: {
    transparentMode: 'always',
    title: <Logo />,
    children: <DropdownSearch />
  },
  tree: source.pageTree,
  searchToggle: {
    enabled: false
  },
  sidebar: {
    tabs: {
      transform(option, node) {
        const meta = source.getNodeMeta(node)
        if (!meta || !node.icon) return option

        const color = `var(--${meta.file.dirname}-color, var(--color-fd-foreground))`

        return {
          ...option,
          icon: (
            <div
              className='rounded-md p-1 shadow-lg ring-2 [&_svg]:size-6.5 md:[&_svg]:size-5'
              style={
                {
                  color,
                  border: `1px solid color-mix(in oklab, ${color} 50%, transparent)`,
                  '--tw-ring-color': `color-mix(in oklab, ${color} 20%, transparent)`
                } as object
              }
            >
              {node.icon}
            </div>
          )
        }
      }
    }
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...docsOptions}>
      <OramaWrapper>{children}</OramaWrapper>
    </DocsLayout>
  )
}
