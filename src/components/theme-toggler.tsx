'use client'

import { Button, cn } from '@heroui/react'
import { useIsSSR } from '@react-aria/ssr'
import { useTheme } from 'next-themes'

interface ThemeTogglerProps {
  classNames?: {
    button?: string
    icon?: string
    lightIcon?: string
    darkIcon?: string
  }
}

export function ThemeToggler({ classNames }: ThemeTogglerProps) {
  const isSSR = useIsSSR()
  const { theme, resolvedTheme, systemTheme, setTheme } = useTheme()

  const handleToggle = () => {
    if (isSSR) return
    if (theme === 'system') {
      setTheme(systemTheme === 'light' ? 'dark' : 'light')
      return
    }
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (isSSR) return null

  return (
    <Button
      isIconOnly
      radius="full"
      variant="light"
      aria-label="Toggle theme"
      className={classNames?.button}
      onPress={handleToggle}
    >
      {resolvedTheme === 'dark' ? (
        <span
          className={cn(
            'iconify solar--moon-linear',
            classNames?.icon,
            classNames?.darkIcon,
          )}
        />
      ) : (
        <span
          className={cn(
            'iconify solar--sun-linear',
            classNames?.icon,
            classNames?.lightIcon,
          )}
        />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
