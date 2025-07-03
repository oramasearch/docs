import { Hero } from '@/lib/components/hero'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <Hero
        title='Smarter search starts here'
        description='Orama gives you everything you need to create fast, powerful, and flexible search experiences.From full-text to vector search, local to cloud, all backed by modern AI.'
      />
    </div>
  )
}
