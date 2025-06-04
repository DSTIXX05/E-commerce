import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import _ from 'lodash';
import { createInsertSchema } from 'drizzle-zod';
import { productsTable } from '../db/productSchema.js';

export function validateData(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      req.cleanBody = _.pick(
        req.body,
        //@ts-ignore
        schema.keyof().options
        // req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
      );
      // console.log('The cleaned body is:', req.cleanBody);
      // console.log(createInsertSchema(productsTable).keyof().options);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(400).json({ error: 'Invalid data', details: errorMessages });
      } else if (error && typeof error === 'object' && 'message' in error) {
        // Try to parse the message if it's a JSON string
        let details;
        try {
          details = JSON.parse((error as Error).message);
        } catch {
          details = (error as Error).message;
        }
        res.status(500).json({
          error: 'Internal Server Error',
          details,
        });
      }
    }
  };
}
