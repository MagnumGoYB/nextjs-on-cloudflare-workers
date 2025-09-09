import { snakeCase } from 'es-toolkit/string'
import { siteConfig } from './site'

export type AuthConfig = typeof authConfig

const version = siteConfig.version
const appName = snakeCase(siteConfig.name)

export const authConfig = {
  cookiePrefix: `v${version}_${appName}_`,
  cookieCacheMaxAge: 60, // Cache duration in seconds
  storagePrefix: `v${version}_${appName}`,
  sessionDuration: 60 * 60 * 24 * 7, // 7 days
  trustedOrigins: [siteConfig.url],
}
