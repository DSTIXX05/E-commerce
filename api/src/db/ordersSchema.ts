// import { timestamp } from 'drizzle-orm/gel-core';
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { usersTable } from './usersSchema';
import { productsTable } from './productSchema';
import { z } from 'zod';
// import { create } from '@types/lodash';

export const ordersTable = pgTable('orders', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar('status', { length: 50 }).notNull().default('New'),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

export const orderItemsTable = pgTable('order_items', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  userId: true,
  status: true,
  createdAt: true,
});

// export const insertOrderWithItemsSchema = createInsertSchema(
//   orderItemsTable
// ).extend({
//   items: createInsertSchema(orderItemsTable).array(),
// });

export const insertOrderItemSchema = createInsertSchema(orderItemsTable);

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  item: z.array(insertOrderItemSchema),
});
