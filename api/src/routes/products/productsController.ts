import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable } from '../../db/productSchema';

export function listProduct(req: Request, res: Response) {
  res.send('ListProducts');
}

export function getProductById(req: Request, res: Response) {
  res.send('getProductById');
}

export async function createProduct(req: Request, res: Response) {
  try {
    console.log(req.body);
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

export function updateProduct(req: Request, res: Response) {
  console.log('Code got here');
  res.send('updateProduct');
}

export function deleteProduct(req: Request, res: Response) {
  res.send('deleteProduct');
}
