import type { OAuth2Tokens } from 'better-auth'
import type { genericOAuth } from 'better-auth/plugins'
import { env } from '@/env'

type GenericOAuthConfig = Parameters<typeof genericOAuth>[0]['config'][number]

export const config = {
  clientId: env.FEISHU_CLIENT_ID,
  clientSecret: env.FEISHU_CLIENT_SECRET,
  providerId: 'feishu',
  authorizationUrl: 'https://accounts.feishu.cn/open-apis/authen/v1/authorize',
  tokenUrl: 'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
  userInfoUrl: 'https://open.feishu.cn/open-apis/authen/v1/user_info',
  scopes: [
    'contact:user.email:readonly',
    'contact:user.phone:readonly',
    'offline_access',
  ],
  getUserInfo,
} satisfies GenericOAuthConfig

type UserInfoResponse = {
  code: number
  msg: string
  data: {
    name: string
    en_name: string
    avatar_url: string
    avatar_big: string
    avatar_middle: string
    avatar_thumb: string
    open_id: string
    user_id?: string
    email?: string
    enterprise_email?: string
    mobile?: string
  }
}

async function getUserInfo(tokens: OAuth2Tokens) {
  const response = await fetch(config.userInfoUrl, {
    headers: {
      Authorization: `${tokens.tokenType} ${tokens.accessToken}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch user profile from Feishu')
  }
  const body = await response.json()
  const { code, msg, data } = body as UserInfoResponse
  if (code !== 0) {
    console.error('Feishu API error', { code, msg })
    throw new Error('Failed to fetch user profile from Feishu API')
  }
  const email = data.enterprise_email || data.email
  if (!email) {
    console.error('Feishu user info has no email', data)
    throw new Error('Feishu account has no email or enterprise_email')
  }
  const image =
    data.avatar_big ||
    data.avatar_middle ||
    data.avatar_url ||
    data.avatar_thumb
  const name = data.name || data.en_name || email.split('@')[0]
  const updatedAt = new Date()
  return {
    name,
    email,
    image,
    updatedAt,
    id: data.open_id,
    createdAt: updatedAt,
    emailVerified: true,
  }
}
