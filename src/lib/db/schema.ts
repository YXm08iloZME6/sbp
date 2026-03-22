import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  langs: varchar().array().notNull(),
  email: varchar({ length: 255 }),
  github: varchar({ length: 255 }),
  exp: integer().notNull(),
  page: varchar({ length: 255 }).notNull(),
  sendEmail: boolean().notNull(),
})

export const userInsertSchema = createInsertSchema(users)
