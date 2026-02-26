import { integer, numeric, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets',{
    id: serial('id').primaryKey(),
    name: varchar ('name').notNull(),
    amount : varchar ('amount').notNull(),
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const Expenses = pgTable('expenses',{
    id: serial('id').primaryKey(),
    name: varchar ('name').notNull(),
    amount: numeric ('amount').notNull(),
    budgetId: integer('budgetId').notNull().references(() => Budgets.id),
    createdAt: varchar('createdAt').notNull()
})