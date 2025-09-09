import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'drizzle-kit'

function getLocalD1DB() {
  const basePath = path.resolve('.wrangler')
  const dbFile = fs
    .readdirSync(basePath, { encoding: 'utf-8', recursive: true })
    .find((f) => f.endsWith('.sqlite'))

  if (!dbFile) {
    throw new Error(`.sqlite file not found in ${basePath}`)
  }

  return path.resolve(basePath, dbFile)
}

export default defineConfig({
  strict: true,
  dialect: 'sqlite',
  casing: 'snake_case',
  schema: './src/db/schemas/index.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: getLocalD1DB(),
  },
})
