// import { Router } from 'express';

// const router = Router();

// import {
//   listProduct,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from './productsController';

// import { validateData } from '../../../middlewares/validationMiddleware';

// import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// import { z } from 'zod';
// import { productsTable } from '../../db/productSchema';

// // const createProductSchema = z.object({
// //   name: z.string(),
// //   price: z.number(), //you can pass in custom errors here as object {'message': 'actual message'}
// // });

// // const createProductSchema = createInsertSchema(productsTable);
// // console.log(createInsertSchema);

// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.number(),
//   description: z.string().optional(),
//   image: z.string().optional(),
// });

// router.get('/', listProduct);

// router.get('/:id', getProductById);

// router.post('/', validateData(createProductSchema), createProduct);

// router.put('/:id', updateProduct);

// router.delete('/:id', deleteProduct);

// export default router;

import { Router } from 'express';

const router = Router();

import {
  listProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController';

import { validateData } from '../../../middlewares/validationMiddleware';

import { createInsertSchema } from 'drizzle-zod';
import { productsTable } from '../../db/productSchema';

// Generate the Zod schema from your Drizzle table
const createProductSchema = createInsertSchema(productsTable);

// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.number(),
//   description: z.string().optional(),
//   image: z.string().optional(),
// });
// console.log(createProductSchema);

router.get('/', listProduct);

router.get('/:id', getProductById);

router.post('/', validateData(createProductSchema), createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
