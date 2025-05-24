import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const productsTable = pgTable('products', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  image: varchar('image', { length: 255 }),
  price: doublePrecision().notNull(),
});

export const createProductSchema = createInsertSchema(productsTable);

export const updateProductSchema = createInsertSchema(productsTable).partial();
// console.log(createInsertSchema(productsTable).keyof().options); //returns an array
