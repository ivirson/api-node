const { Router } = require("express");
const verifyToken = require("../../../middlewares/verify-token");
const productsController = require("../controllers/products.controller");

const productsRouter = Router();

productsRouter.get("/", verifyToken, productsController.findAll);
productsRouter.get("/:id", verifyToken, productsController.findById);
productsRouter.post("/", verifyToken, productsController.create);
productsRouter.put("/:id", verifyToken, productsController.update);
productsRouter.delete("/:id", verifyToken, productsController.delete);

module.exports = productsRouter;
