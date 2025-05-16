import express from "express";
import productRouter from "./routes/products/index";
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
