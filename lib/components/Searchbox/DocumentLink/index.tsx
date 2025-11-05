'use client'

import Link from 'next/link'
import type { FC } from 'react'

import styles from './index.module.css'

export type Document = {
  path: string
  section: string
  title?: string
}

type DocumentLinkProps = {
  document: Document
  className?: string
  children?: React.ReactNode
  'data-focus-on-arrow-nav'?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const DocumentLink: FC<DocumentLinkProps> = ({
  document,
  className = styles.documentLink,
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
        <span className={styles.documentTitle}>{document.title}</span>
      )}
    </Link>
  )
}
