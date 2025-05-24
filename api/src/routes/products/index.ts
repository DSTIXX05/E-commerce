import { Router } from 'express';
import { z } from 'zod';
const router = Router();

import {
  listProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController';

import { validateData } from '../../middlewares/validationMiddleware';
import {
  createProductSchema,
  updateProductSchema,
} from './../../db/productSchema';

// Generate the Zod schema from your Drizzle table
// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.coerce.number(), // Accepts string or number and converts to number
//   description: z.string().optional(),
//   image: z.string().optional(),
// });

router.get('/', listProduct);

router.get('/:id', getProductById);

router.post('/', validateData(createProductSchema), createProduct);

router.put('/:id', validateData(updateProductSchema), updateProduct);

router.delete('/:id', deleteProduct);

export default router;
