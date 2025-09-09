'use client'

import { Button, ScrollShadow, Tab, Tabs, Tooltip } from '@heroui/react'
import { usePathname } from 'next/navigation'

export function DashboardNavbar() {
  const pathname = usePathname()

  return (
    <div className="w-full px-4 lg:px-8">
      <ScrollShadow
        hideScrollBar
        className="-mx-2 flex justify-between gap-8"
        orientation="horizontal"
      >
        <Tabs
          selectedKey={pathname}
          aria-label="Dashboard Navigation Tabs"
          classNames={{
            cursor: 'bg-default-200 shadow-none',
            tabContent: 'font-medium',
          }}
          radius="full"
          variant="light"
        >
          <Tab key="/dashboard" title="Dashboard" href="/dashboard" />
          <Tab key="/analytics" title="Analytics" href="/analytics" />
          <Tab key="/team" title="Team" href="/team" />
          <Tab key="/settings" title="Settings" href="/settings" />
        </Tabs>
        <div className="flex items-center">
          <Tooltip closeDelay={0} content="New deployment" placement="bottom">
            <Button isIconOnly radius="full" size="sm" variant="faded">
              <span className="iconify lucide--plus w-4 text-default-500" />
            </Button>
          </Tooltip>
        </div>
      </ScrollShadow>
    </div>
  )
}
