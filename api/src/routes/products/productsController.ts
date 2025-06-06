import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { productsTable } from '../../db/productSchema.js';
import { eq } from 'drizzle-orm';
// import _ from 'lodash';
import { createProductSchema } from './../../db/productSchema.js';

export async function listProduct(req: Request, res: Response) {
  try {
    const product = await db.select().from(productsTable);

    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).send({ message: 'Product not found!' });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    // console.log(req.userId);
    // const data = _.pick(req.body, Object.keys(createProductSchema.shape));
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateProduct(req: Request, res: Response) {
  // console.log('Code got here');
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;
    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product was not found!' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'product was not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
