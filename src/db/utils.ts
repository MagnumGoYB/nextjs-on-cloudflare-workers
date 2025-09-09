export function takeFirst<T>(items: T[]) {
  return items.at(0)
}

export function takeFirstOrThrow<T>(items: T[]) {
  const first = takeFirst(items)

  if (!first) {
    throw new Error('First item not found')
  }

  return first
}

export function takeLast<T>(items: T[]) {
  return items.at(-1)
}

export function takeLastOrThrow<T>(items: T[]) {
  const last = takeLast(items)

  if (!last) {
    throw new Error('Last item not found')
  }

  return last
}
