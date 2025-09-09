import { getCloudflareContext } from '@opennextjs/cloudflare'
import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { admin, genericOAuth } from 'better-auth/plugins'
import { withCloudflare } from 'better-auth-cloudflare'
import { authConfig } from '@/config/auth'
import { siteConfig } from '@/config/site'
import { getDb } from '@/db'
import { env } from '@/env'
import { generateId } from '@/lib/id'
import { config as feishu } from './generic-oauth/feishu'

async function authBuilder() {
  const db = await getDb()
  const { cf, env: cfEnv } = getCloudflareContext()

  return betterAuth(
    withCloudflare(
      {
        cf,
        d1: {
          db,
          options: {
            usePlural: true,
            debugLogs: env.APP_ENV === 'development',
          },
        },
        autoDetectIpAddress: true,
        geolocationTracking: true,
        kv: cfEnv.CACHE,
        r2: {
          bucket: cfEnv.STORAGE,
          maxFileSize: 2 * 1024 * 1024, // 2MB
          allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
          additionalFields: {
            isPublic: { type: 'boolean', required: false },
            category: { type: 'string', required: false },
            description: { type: 'string', required: false },
          },
        },
        // hooks: {
        //   upload: {
        //     before: async (file, ctx) => {
        //       if (ctx.session === null) {
        //         return null // Blocks upload
        //       }

        //       const isPaidUser = (userId: string) => true // example
        //       if (isPaidUser(ctx.session.user.id) === false) {
        //         return null // Blocks upload
        //       }

        //     },
        //     after: async (file, ctx) => {
        //       console.log('File uploaded:', file)
        //     },
        //   },
        //   download: {
        //     before: async (file, ctx) => {
        //       if (
        //         file.isPublic === false &&
        //         file.userId !== ctx.session?.user.id
        //       ) {
        //         return null // Blocks download
        //       }
        //     },
        //   },
        // },
        // },
      },
      {
        plugins: [genericOAuth({ config: [feishu] }), nextCookies(), admin()],
        baseURL: siteConfig.url,
        secret: env.BETTER_AUTH_SECRET,
        appName: siteConfig.name,
        trustedOrigins: authConfig.trustedOrigins,
        session: {
          expiresIn: authConfig.sessionDuration,
          cookieCache: {
            enabled: true,
            maxAge: authConfig.cookieCacheMaxAge,
          },
        },
        account: {
          updateAccountOnSignIn: true,
          accountLinking: { enabled: true },
        },
        advanced: {
          cookiePrefix: authConfig.cookiePrefix,
          database: {
            useNumberId: false,
            generateId: () => generateId(),
          },
        },
        emailAndPassword: { enabled: false },
        rateLimit: { enabled: true },
        telemetry: { enabled: false },
      },
    ),
  )
}

let authInstance: Awaited<ReturnType<typeof authBuilder>> | null = null

export async function initAuth() {
  if (!authInstance) {
    authInstance = await authBuilder()
  }
  return authInstance
}
