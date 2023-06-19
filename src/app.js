import express from "express";
import Product from "./ProductManager.js";

const app = express();
app.use(express.json());

const product = new Product("products.json");

app.get("/products", async (req, res) => {
  const products = await product.getProduct();

  const limit = parseInt(req.query.limit);

  if (limit >= 0) {
    const limitProducts = products.slice(0, limit);
    return res.status(200).json(limitProducts);
  }
  res.status(200).json(products);
});

app.get("/products/:id", async (req, res) => {
  const products = await product.getProduct();
  const id = parseInt(req.params.id);

  const productId = products.find((item) => item.id === id);

  if (!productId) res.send({ error: "Producto no encontrado" });
  else res.status(200).json(productId);
});

app.listen(8080);
