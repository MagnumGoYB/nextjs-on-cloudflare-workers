'use client'

import { domAnimation, LazyMotion, m, useAnimation } from 'motion/react'
import { type ImgHTMLAttributes, useEffect, useState } from 'react'

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const FadeInImage = (
  props: Required<Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>>,
) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const animationControls = useAnimation()

  useEffect(() => {
    if (isLoaded) {
      animationControls.start('visible')
    }
  }, [isLoaded, animationControls])

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="hidden"
        className="absolute inset-0 h-full w-full"
        animate={animationControls}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        variants={animationVariants}
      >
        {/** biome-ignore lint/performance/noImgElement: img */}
        <img alt={props.alt} src={props.src} onLoad={() => setIsLoaded(true)} />
      </m.div>
    </LazyMotion>
  )
}

export default FadeInImage
