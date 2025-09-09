import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const appEnvSchema = z
  .enum(['development', 'production'])
  .default('development')

export const env = createEnv({
  server: {
    APP_ENV: appEnvSchema,
    BETTER_AUTH_SECRET: z.string(),
    FEISHU_CLIENT_ID: z.string(),
    FEISHU_CLIENT_SECRET: z.string(),
  },
  client: {},
  runtimeEnv: {
    APP_ENV: process.env.APP_ENV,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    FEISHU_CLIENT_ID: process.env.FEISHU_CLIENT_ID,
    FEISHU_CLIENT_SECRET: process.env.FEISHU_CLIENT_SECRET,
  },
  emptyStringAsUndefined: true,
})
