import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { DM_Sans, DM_Mono, Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { PostHogProvider } from '@/components/providers/posthog'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const siteUrl = getServerSideURL()

const satoshi = localFont({
  src: [
    {
      path: '../fonts/Satoshi-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const spaceGrotesk = Space_Grotesk({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
})

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Octree',
  alternateName: ['Octree', 'Octree AI LaTeX Editor'],
  url: siteUrl,
  publisher: {
    '@type': 'Organization',
    name: 'Octree',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/favicon.svg`,
    },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Octree',
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  sameAs: [
    'https://twitter.com/useoctree',
    'https://github.com/octree-labs',
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(satoshi.className, dmSans.variable, dmMono.variable, spaceGrotesk.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
          suppressHydrationWarning
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          suppressHydrationWarning
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"697514dfd884d00011e90a5d"})},document.head.appendChild(o)}initApollo();`,
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17915594708"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17915594708');
            gtag('config', 'G-2G3ZGGMJ2Y');
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <PostHogProvider>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            {children}
            <Footer />
          </PostHogProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Octree',
  title: {
    default: 'Octree – AI LaTeX Editor',
    template: '%s | Octree',
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@useoctree',
  },
}
