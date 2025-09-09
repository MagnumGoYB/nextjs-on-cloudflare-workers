import { Chip } from '@heroui/chip'
import { env } from '@/env'

export function TailwindIndicator() {
  if (env.APP_ENV === 'production') return null

  return (
    <Chip
      variant="bordered"
      radius="full"
      startContent={
        <span className="iconify-color logos--tailwindcss-icon ml-0.5 size-4" />
      }
      className="fixed bottom-2 left-2 z-50 flex items-center justify-center font-medium font-mono"
      classNames={{
        content: 'pr-0.5',
      }}
    >
      <span className="block sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </span>
      <span className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</span>
      <span className="hidden lg:block xl:hidden 2xl:hidden">lg</span>
      <span className="hidden xl:block 2xl:hidden">xl</span>
      <span className="hidden 2xl:block">2xl</span>
    </Chip>
  )
}
