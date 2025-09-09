import { integer } from 'drizzle-orm/sqlite-core'

export const timestamp = (name: string) => integer(name, { mode: 'timestamp' })
export const boolean = (name: string) => integer(name, { mode: 'boolean' })

export const createdAt = () =>
  timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull()
export const updatedAt = () =>
  timestamp('updated_at')
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
export const deletedAt = () => timestamp('deleted_at')

export const timestamps = {
  createdAt: createdAt(),
  updatedAt: updatedAt(),
  deletedAt: deletedAt(),
}
