const { Router } = require("express");
const productsController = require("../controllers/products.controller");

const productsRouter = Router();

productsRouter.get("/", productsController.findAll);
productsRouter.get("/:id", productsController.findById);
productsRouter.post("/", productsController.create);
productsRouter.put("/:id", productsController.update);
productsRouter.delete("/:id", productsController.delete);

module.exports = productsRouter;
