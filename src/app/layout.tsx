import { cn } from '@heroui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { inter, roboto_mono } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import { Providers } from './providers'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  keywords: siteConfig.keywords,
  description: siteConfig.description,
  authors: { name: siteConfig.name, url: siteConfig.url },
  openGraph: siteConfig.og,
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: 'device-width',
  height: 'device-height',
  viewportFit: 'contain',
  userScalable: false,
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en" translate="no">
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          roboto_mono.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            defaultTheme: siteConfig.defaultTheme,
            enableSystem: true,
          }}
        >
          {children}
          <TailwindIndicator />
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
        {/* <Script src="https://lf-scm-cn.feishucdn.com/lark/op/h5-js-sdk-1.5.44.js" /> */}
      </body>
    </html>
  )
}
