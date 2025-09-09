export type WithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
