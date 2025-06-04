import { Router } from 'express';
import { z } from 'zod';
const router = Router();

import {
  listProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController.js';

import { validateData } from '../../middlewares/validationMiddleware.js';
import {
  createProductSchema,
  updateProductSchema,
} from './../../db/productSchema.js';

import { verifyToken, verifySeller } from '../../middlewares/authMiddleware.js';

// Generate the Zod schema from your Drizzle table
// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.coerce.number(), // Accepts string or number and converts to number
//   description: z.string().optional(),
//   image: z.string().optional(),
// });

router.get('/', listProduct);

router.get('/:id', getProductById);

router.post(
  '/',
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);

router.put(
  '/:id',
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);

router.delete('/:id', verifyToken, verifySeller, deleteProduct);

export default router;
