'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { initAuth } from '@/lib/auth'
import type { User } from '@/types/user'

const auth = await initAuth()

export const getCachedUser = cache(currentUser)

async function currentUser(): Promise<User | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) return null
    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      avatar: session.user.image ?? null,
      role: session.user.role ?? null,
      isBanned: !!session.user.banned,
    } satisfies User
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function signIn() {
  const { url } = await auth.api.signInWithOAuth2({
    body: { providerId: 'feishu' },
  })
  redirect(url)
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() })
  revalidatePath('/')
  redirect('/')
}
