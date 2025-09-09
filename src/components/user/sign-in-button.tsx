import type { ButtonProps } from '@heroui/button'
import { Button } from '@heroui/button'
import { signIn } from '@/lib/actions/user'

interface SignInButtonProps extends ButtonProps {}

export function SignInButton(props: SignInButtonProps) {
  return (
    <Button {...props} onPress={signIn}>
      Sign in
    </Button>
  )
}
