import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'
import { posthogRelayRewrites } from './src/lib/posthogRelay.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      // Media is served directly from the public Vercel Blob store.
      {
        hostname: '**.public.blob.vercel-storage.com',
        protocol: 'https',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  // posthog-js posts to paths with trailing slashes (/e/, /flags/); a 308 to
  // the slash-less path would drop the request body. See src/lib/posthogRelay.js.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return posthogRelayRewrites(process.env.NEXT_PUBLIC_POSTHOG_HOST)
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
