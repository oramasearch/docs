import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/open-source/:path*',
        destination: '/docs/orama-js/:path*',
        permanent: true,
      },
    ]
  }
}

export default withMDX(config)
