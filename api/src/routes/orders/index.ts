import { Router } from 'express';
import { createOrder } from './orderController';
import { validateData } from './../../middlewares/validationMiddleware.js';
import { verifyToken } from './../../middlewares/authMiddleware.js';
import { insertOrderWithItemsSchema } from '../../db/ordersSchema.js';

const router = Router();

router.post(
  '/',
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);

export default router;
