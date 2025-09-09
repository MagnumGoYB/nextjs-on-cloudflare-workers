import type { SVGProps } from 'react'

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}
