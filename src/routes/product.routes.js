import { Router } from "express";
import { ManagerProduct, Product } from "../manager/ManagerProduct.js";
import { validateProduct } from "../utils/validateProduct.js";

const router = Router();

const manager = new ManagerProduct("../data/product.json");

router.get("/", (req, res) => {
  const products = manager.getProducts();
  res.json({
    products,
  });
});

router.post("/", validateProduct, async (req, res) => {
  const { id, title, description, price, stock, status } = req.body;

  const product = new Product(id, title, description, price, stock, status);

  try {
    await manager.saveProduct(product);
    io.emit("product", manager.getProducts());

    res.json({
      message: "Product created",
      product,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({
      error: "Id is required",
    });
  }

  try {
    await manager.deleteProduct(Number(id));
    io.emit("delete_products", manager.getProducts());

    res.json({
      message: "Product deleted",
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

export default router;
