import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { boolean, createdAt, timestamp, updatedAt } from './_helpers'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  role: text('role'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
})

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  impersonatedBy: text('impersonated_by'),
  timezone: text('timezone'),
  city: text('city'),
  country: text('country'),
  region: text('region'),
  regionCode: text('region_code'),
  colo: text('colo'),
  latitude: text('latitude'),
  longitude: text('longitude'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: createdAt().notNull(),
  updatedAt: updatedAt().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  scope: text('scope'),
  password: text('password'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const verifications = sqliteTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
})

export const userFiles = sqliteTable('user_files', {
  id: text('id').primaryKey(),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  contentType: text('content_type').notNull(),
  size: integer('size').notNull(),
  r2Key: text('r2_key').notNull(),
  category: text('category'),
  description: text('description'),
  isPublic: boolean('is_public')
    .$defaultFn(() => false)
    .notNull(),
  uploadedAt: timestamp('uploaded_at').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})
