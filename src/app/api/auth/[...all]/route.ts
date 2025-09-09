import { initAuth } from '@/lib/auth'

async function handleAuthRequest(req: Request) {
  const auth = await initAuth()
  return auth.handler(req)
}

export const POST = handleAuthRequest
export const GET = handleAuthRequest
