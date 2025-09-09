'use client'

import { HeroUIProvider, type ToastProps, ToastProvider } from '@heroui/react'
import type { RouterOptions } from '@react-types/shared'
import { QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { useCallback } from 'react'
import { makeQueryClient } from '@/lib/make-query-client'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
  toastProps?: ToastProps
}

export function Providers({
  children,
  themeProps,
  toastProps,
}: ProvidersProps) {
  const router = useRouter()
  const queryClient = makeQueryClient()

  const navigate = useCallback(
    (href: string, options?: RouterOptions) => {
      router.push(href, options)
    },
    [router],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={navigate} locale="zh-CN">
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        <ToastProvider toastProps={{ timeout: 3000, ...toastProps }} />
      </HeroUIProvider>
    </QueryClientProvider>
  )
}
