import { getCloudflareContext } from '@opennextjs/cloudflare'
import { drizzle } from 'drizzle-orm/d1'
import { env } from '@/env'
import * as schema from './schemas'

export async function getDb() {
  const { env: cfEnv } = await getCloudflareContext({ async: true })
  return drizzle(cfEnv.DB, {
    schema,
    casing: 'snake_case',
    logger: env.APP_ENV === 'development',
  })
}
