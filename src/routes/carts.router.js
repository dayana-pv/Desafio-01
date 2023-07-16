import { Router } from "express";
import CartsManager from "../manager/carts.manager.js";

const router = Router();
const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
  const result = await cartsManager.list();
  res.send(result);
});

router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const result = await cartsManager.idCart(cid);
  if (!result) res.send({ status: "error", message: "Carrito no encontrado" });
  else res.status(200).json(result);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const data = req.body;
  data.id = pid;

  //const result = await cartsManager.addCarts(cid, data);
  await cartsManager.addCarts(cid, data);

  res.send({ status: "success", message: "Producto añadido!" });
  //res.send(result);
});

router.post("/", async (req, res) => {
  //const result = await cartsManager.create();
  await cartsManager.create();

  res.send({ status: "success", message: "Carrito añadido!" });
  //res.send(result);
});

export default router;
