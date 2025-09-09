import { container } from '@/components/primitives'
import { HeroSection } from './_components/hero-section'

export default async function AppPage() {
  return (
    <section
      className={container({
        className: 'relative max-w-6xl gap-0 overflow-hidden bg-background',
      })}
    >
      <HeroSection />
    </section>
  )
}
