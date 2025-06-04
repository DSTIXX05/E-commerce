import { Router } from 'express';
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from '../../db/usersSchema.js';
import { validateData } from '../..//middlewares/validationMiddleware.js';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();
    //@ts-ignore
    user.password = undefined;
    res.status(201).json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post('/login', validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    res.status(200);

    if (!user) {
      res.status(401).json({ error: 'Authentication failed!' });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.status(401).json({ error: 'Authenticaton failed line 49' });
    }

    //create a jwt token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res
        .status(500)
        .json({ error: 'JWT secret is not defined in environment variables.' });
      return;
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
      expiresIn: '30d',
    });

    //@ts-ignore
    delete user.password;

    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
