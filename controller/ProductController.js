import Product from "../modules/Product.js";
import { isAdmin } from "./UserController.js";

// Creating a product
export function createProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  const product = new Product(req.body);

  product
    .save()
    .then(() => {
      res.json({
        message: "Product saved successfully..!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating product..!",
        error: error.message,
      });
    });
}

// Get deatails of a product
export function getAllProducts(req, res) {
  if (isAdmin(req)) {
    Product.find()
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error fetching products..!",
          error: error.message,
        });
      });
  } else {
    Product.find({ isAvailable: true })
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error fetching products..!",
          error: error.message,
        });
      });
  }
}

// Delete products
export function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Only Admins can delete products..!",
    });
    return;
  }

  const productId = req.params.productId;

  Product.deleteOne({ productId: productId }).then(() => {
    res.json({
      message: "Product deleted successfully..!",
    });
  });
}

//Update product
export function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Only admins can update products..!",
    });
    return;
  }

  const productId = req.params.productId;
  const updateData = req.body;
  Product.updateOne({ productId: productId }, { $set: updateData })
    .then(() => {
      res.json({
        message: "Product updated successfully..!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to update product",
        error: error.message,
      });
    });
}

// Get deatails of a product by productId
export function getProductByProductId(req, res) {
  const productId = req.params.productId;
  Product.findOne({ productId: productId })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error fetching products..!",
        error: error.message,
      });
    });
}
