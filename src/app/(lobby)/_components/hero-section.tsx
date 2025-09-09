import FadeInImage from '@/components/fade-in-image'
import { siteConfig } from '@/config/site'
import { GetStartedButton } from './get-started-button'

export function HeroSection() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-8 py-15">
      <div className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
        <div className="text-center font-bold text-[clamp(40px,10vw,44px)] leading-[1.2] tracking-tighter sm:w-[620px] sm:text-[64px]">
          <div className="bg-hero-section-title bg-clip-text text-transparent">
            {siteConfig.slogan}
          </div>
        </div>
        <p className="text-center font-normal text-default-500 leading-7 sm:w-[566px] sm:text-[18px]">
          {siteConfig.description}
        </p>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <GetStartedButton />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 top-[-25%] z-10 not-dark:hidden scale-150 select-none sm:scale-125">
        <FadeInImage
          alt="Gradient background"
          src="/images/backgrounds/bg-gradient.png"
        />
      </div>
    </div>
  )
}
