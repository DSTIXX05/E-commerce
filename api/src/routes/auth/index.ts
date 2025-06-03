import { Router } from 'express';
import { createUserSchema } from '../../db/usersSchema';
import { validateData } from '../..//middlewares/validationMiddleware';
import bcrypt from 'bcryptjs';
const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
  const data = req.cleanBody;

  const hashedPassword = await bcrypt.hash(data.password, 10);
  console.log(data, hashedPassword);
  res.send(200);
});

router.post('/login', validateData(createUserSchema), (req, res) => {
  res.send(200);
});

export default router;
