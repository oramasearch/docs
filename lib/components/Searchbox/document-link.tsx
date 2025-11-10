'use client'

import Link from 'next/link'
import type { FC } from 'react'

export type Document = {
  path: string
  section: string
  title?: string
  content?: string
}

type DocumentLinkProps = {
  document: Document
  className?: string
  children?: React.ReactNode
  'data-focus-on-arrow-nav'?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const DocumentLink: FC<DocumentLinkProps> = ({
  document,
  className = 'rounded-xl bg-white px-4 py-2 text-neutral-900 duration-300 hover:bg-neutral-200 focus:bg-neutral-200 motion-safe:transition-colors lg:bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-200 hover:dark:bg-neutral-900 focus:dark:bg-neutral-900 [&_svg]:size-5',
  children,
  'data-focus-on-arrow-nav': dataFocusOnArrowNav,
  ...props
}) => {
  const href = document.path?.toLowerCase()

  return (
    <Link
      href={href}
      className={className}
      data-focus-on-arrow-nav={dataFocusOnArrowNav}
      {...props}
    >
      {children || (
        <span className='max-w-full overflow-hidden truncate text-ellipsis whitespace-nowrap text-sm font-semibold'>
          {document.title}
        </span>
      )}
    </Link>
  )
}
