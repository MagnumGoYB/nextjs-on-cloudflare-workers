import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { DashboardNavbar } from '@/components/layouts/dashboard-navbar'
import { SiteHeader } from '@/components/layouts/site-header'
import { getCachedUser } from '@/lib/actions/user'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await getCachedUser()

  if (!user) redirect('/')

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto flex w-full max-w-[1280px] flex-col items-center">
        <div className="flex w-full justify-center lg:mt-6">
          <DashboardNavbar />
        </div>
        <div className="flex w-full">{children}</div>
      </main>
    </div>
  )
}
