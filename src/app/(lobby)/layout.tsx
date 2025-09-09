import type { PropsWithChildren, ReactNode } from 'react'
import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'
import { getCachedUser } from '@/lib/actions/user'

export const dynamic = 'force-dynamic'

interface LobbyLayoutProps extends PropsWithChildren<{ modal: ReactNode }> {}

export default async function LobbyLayout({
  children,
  modal,
}: LobbyLayoutProps) {
  const user = await getCachedUser()
  return (
    <div className="relative grid min-h-screen">
      <SiteHeader user={user} isBordered />
      <main className="flex items-center justify-center">
        {children}
        {modal}
      </main>
      <SiteFooter />
    </div>
  )
}
