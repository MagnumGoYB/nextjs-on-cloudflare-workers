import { adminClient, genericOAuthClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { cloudflareClient } from 'better-auth-cloudflare'
import { siteConfig } from '@/config/site'

export const authClient = createAuthClient({
  baseURL: siteConfig.url,
  plugins: [cloudflareClient(), genericOAuthClient(), adminClient()],
})
