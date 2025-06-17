import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { ordersTable } from '../../db/ordersSchema.js';

export async function createOrder(req: Request, res: Response) {
  try {
    console.log(req.cleanBody);
    const userId = Number(req.userId);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const [order] = await db
      .insert(ordersTable)
      .values({ userId: userId })
      .returning();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'invalid Order data' });
  }
}
