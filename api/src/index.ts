import express, { json, urlencoded } from 'express';
import productRouter from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';
import serverless from 'serverless-http';
import orderRoutes from './routes/orders/index.js';

const port = 3000;

const app = express();
// app.use(json());

app.use((req, res, next) => {
  if (Buffer.isBuffer(req.body)) {
    try {
      req.body = JSON.parse(req.body.toString());
    } catch (e) {
      // ignore, let validation fail
      res.send(e);
    }
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('body-parser', json());

app.post('/test', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'Test endpoint hit', data: req.body });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productRouter);
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);

if (process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    console.log(`app running on port ${port}`);
  });
}

// export const handler = serverless(app);
export const handler = serverless(app, {
  request: {
    // Forces parsing of the body as JSON if Content-Type is application/json
    body: {
      parse: true,
    },
  },
});
