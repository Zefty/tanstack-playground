
import { env } from '@/lib/env/server'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/server/db/drizzle',
  schema: './src/server/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
