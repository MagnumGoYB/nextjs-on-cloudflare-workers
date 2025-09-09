import { Chip } from '@heroui/chip'
import { Divider } from '@heroui/divider'
import dayjs from 'dayjs'
import { AcmeIcon } from '@/components/icons/acme'
import { ThemeSwitcher } from '@/components/theme-switcher'

export function SiteFooter() {
  const currentYear = dayjs().year()

  return (
    <footer className="flex w-full flex-col bg-default-50/80 dark:bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 md:order-2 md:items-end">
          <ThemeSwitcher />
        </div>
        <div className="mt-4 md:order-1 md:mt-0">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <div className="flex items-center">
              <AcmeIcon size={34} />
              <span className="font-medium text-small">ACME</span>
            </div>
            <Divider className="h-4" orientation="vertical" />
            <Chip
              className="border-none px-0 text-default-500"
              color="success"
              variant="dot"
            >
              All systems operational
            </Chip>
          </div>
          <p className="text-center text-default-400 text-tiny md:text-start">
            &copy; {currentYear} Acme Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
