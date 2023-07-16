import { Router } from "express";
import CartsManager from "../manager/carts.manager.js";

const router = Router();
const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
  const result = await cartsManager.list();
  res.send(result);
});

router.get("/:idc/:idp", async (req, res) => {
  const idc = parseInt(req.params.idc);
  const idp = parseInt(req.params.idp);

  const result = await cartsManager.addProduct(idc, idp);
  res.send(result);
});

router.post("/", async (req, res) => {
  const result = await cartsManager.create();
  res.send(result);
});

export default router;
