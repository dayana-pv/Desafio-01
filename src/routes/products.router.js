import { Router } from "express";
import ProductsManager from "../manager/products.manager.js";

const router = Router();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
  const result = await productsManager.list();
  //res.send(result);

  const limit = parseInt(req.query.limit);

  if (limit >= 0) {
    const limitProducts = result.slice(0, limit);
    return res.status(200).json(limitProducts);
  }
  res.status(200).json(result);
});

router.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const result = await productsManager.idProduct(pid);
  if (!result) res.send({ status: "error", message: "Producto no encontrado" });
  else res.status(200).json(result);
  //res.send(result);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const result = await productsManager.create(data);

  res.send(result);
});

router.put("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = req.body;
  const result = await productsManager.update(pid, product);

  res.send(result);
});

router.delete("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const result = await productsManager.delete(pid);
  //if (!result) res.send({ error: "Producto no encontrado" });
  //else res.status(200).json(result);

  res.send(result);
});

export default router;
