import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@heroui/navbar'
import { AcmeIcon } from '@/components/icons/acme'
import { ThemeToggler } from '@/components/theme-toggler'
import { CurrentUser } from '@/components/user/current-user'
import { SignInButton } from '@/components/user/sign-in-button'
import type { User } from '@/types/user'

type SiteHeaderProps = {
  user: User | null
  isBordered?: boolean
}

export function SiteHeader({ user, isBordered }: SiteHeaderProps) {
  return (
    <div className="w-full">
      <Navbar
        isBordered={isBordered}
        maxWidth="xl"
        classNames={{
          item: 'data-[active=true]:text-primary',
          wrapper: 'px-4 sm:px-6',
        }}
      >
        <NavbarBrand>
          <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
          <AcmeIcon />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>

        <NavbarContent
          className="ml-auto h-12 max-w-fit items-center gap-0"
          justify="end"
        >
          <NavbarItem className="hidden lg:flex">
            <ThemeToggler classNames={{ icon: 'text-2xl text-default-500' }} />
          </NavbarItem>
          {user ? (
            <NavbarItem className="pl-2">
              <CurrentUser user={user} />
            </NavbarItem>
          ) : (
            <NavbarItem className="pl-2">
              <SignInButton
                radius="full"
                variant="flat"
                className="font-medium"
              />
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  )
}
