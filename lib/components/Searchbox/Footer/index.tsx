'use client'

import { ArrowDownIcon, ArrowUpIcon, CornerDownRight } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import styles from './index.module.css'

export const Footer = () => {
  const { resolvedTheme } = useTheme()

  const oramaLogo = `https://website-assets.oramasearch.com/orama-when-${resolvedTheme}.svg`

  return (
    <div className={styles.footer}>
      <div className={styles.shortcutWrapper}>
        <div className={styles.shortcutItem}>
          <kbd className={styles.shortcutKey}>
            <CornerDownRight />
          </kbd>
          <span className={styles.shortcutLabel}>select</span>
        </div>
        <div className={styles.shortcutItem}>
          <kbd className={styles.shortcutKey}>
            <ArrowDownIcon />
          </kbd>
          <kbd className={styles.shortcutKey}>
            <ArrowUpIcon />
          </kbd>
          <span className={styles.shortcutLabel}>navigate</span>
        </div>
        <div className={styles.shortcutItem}>
          <kbd className={styles.shortcutKey}>esc</kbd>
          <span className={styles.shortcutLabel}>close</span>
        </div>
      </div>
      <div>
        <a
          href='https://www.orama.com/?utm_source=nodejs.org&utm_medium=powered-by'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.poweredByLink}
        >
          <small>Powered by</small>
          <Image
            src={oramaLogo}
            alt='Powered by Orama'
            width='62'
            height='12'
          />
        </a>
      </div>
    </div>
  )
}
