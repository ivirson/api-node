const { Router } = require("express");
const verifyToken = require("../../../middlewares/verify-token");
const usersController = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get("/", usersController.findAll);
usersRouter.get("/:id", verifyToken, usersController.findById);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", verifyToken, usersController.update);
usersRouter.delete("/:id", verifyToken, usersController.delete);

module.exports = usersRouter;
