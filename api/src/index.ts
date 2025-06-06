import express, { json, urlencoded } from 'express';
import productRouter from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';
import serverless from 'serverless-http';

const port = 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productRouter);
app.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    console.log(`app running on port ${port}`);
  });
}
export const handler = serverless(app);
