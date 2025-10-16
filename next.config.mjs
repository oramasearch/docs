import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/open-source/:path*',
        destination: '/orama-js/:path*',
      },
    ]
  }
}

export default withMDX(config)
