import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))
await jiti.import('./src/env')

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    useCache: true,
  },
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
}

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

initOpenNextCloudflareForDev()
