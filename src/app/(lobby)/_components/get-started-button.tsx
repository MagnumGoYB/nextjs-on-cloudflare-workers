'use client'

import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { getCachedUser, signIn } from '@/lib/actions/user'

export function GetStartedButton() {
  const router = useRouter()

  const handleGetStarted = async () => {
    const user = await getCachedUser()
    user ? router.push('/dashboard') : signIn()
  }

  return (
    <Button
      className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] font-medium text-background text-small leading-5"
      radius="full"
      endContent={
        <span className="iconify solar--arrow-right-linear flex-none text-xl outline-hidden [&>path]:stroke-2" />
      }
      onPress={handleGetStarted}
    >
      Get Started
    </Button>
  )
}
