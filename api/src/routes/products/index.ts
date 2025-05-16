import { Router } from "express";

const router = Router();

import {
  listProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";

router.get("/", listProduct);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
