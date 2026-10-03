import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByProductId,
  updateProduct,
} from "../controller/ProductController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProductByProductId);

productRouter.post("/", createProduct);

productRouter.delete("/:productId", deleteProduct);

productRouter.put("/:productId", updateProduct);

export default productRouter;
